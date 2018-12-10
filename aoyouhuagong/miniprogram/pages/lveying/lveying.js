var GetList = function(that) {
  that.setData({
    hidden: false
  });

  var id = that.data.id
  wx.request({

    url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_canyu',

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "POST",

    data: {

      id: id

    },

    success: function(res) {

      var list = that.data.list;
      console.log(list)
      for (var i = 0; i < res.data.list.length; i++) {
        list.push(res.data.list[i]);
      }
      that.setData({
        list: list
      });

      that.setData({
        hidden: true
      });


    }

  });


}
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    hiddenitem: false,


  },
  onLoad: function(options) {

    console.log(options)
    this.setData({
      id: options.id,

    })

    wx.setNavigationBarTitle({

      title: '活动人数',

    })

    var that = this;

    wx.getSystemInfo({
      success: function(res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },

  onShow: function() {

    var that = this;
    GetList(that);
    var id = this.data.id;
  },











})