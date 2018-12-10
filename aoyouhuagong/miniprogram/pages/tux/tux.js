var GetList = function(that) {
  that.setData({
    hidden: false
  });
  var id = that.data.id


}
Page({
  data: {

    list: [],



  },
  onLoad: function(options) {


    console.log(options)
    this.setData({
      id: options.id,

    })

    wx.setNavigationBarTitle({

      title: '活动掠影',

    })

    var that = this;
    var id = this.data.id;
    wx.request({

      url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_img_list',

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

        if (res.data.status == 0) {

          wx.showToast({

            title: '活动没有相册',
            icon: 'loading',
            duration: 1500

          })

        } else {
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


      },




    });



  },
  onShow: function() {

    var that = this;


  },



  previewImage: function(e) {

    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    console.log('dddd' + index)

    var imgList = [this.data.list[index].img_utl];

    console.log('dds' + imgList)
    wx.previewImage({
      current: this.data.list[index].img_utl,
      urls: imgList,

    })
  }




})