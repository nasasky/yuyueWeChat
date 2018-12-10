var page_size = 10;

var app = getApp().globalData
Page({

  data: {

    urls: [
      'https://hg.airyee.com/tools/small_program.ashx?action=can_activity_list',

    ],

    currentUrlIndex: 0,
    page: {
      current: 1,
      total: 10
    },

    list: [],

    hidden: true,

    loadingData: false
  },


  picChange: function(e) {
    var that = this

    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    console.log(that.data.list)

    wx.navigateTo({
      url: '/pages/listx/list?id=' + that.data.list[id].id,

    })
  },


  onLoad: function(options) {

    wx.setNavigationBarTitle({

        title: '参加的活动',

      }),

      this.loadData();
    wx.showToast({
      title: '加载君正在加载',
      icon: 'loading',
      duration: 100000
    })
  },



  loadData: function(fromShow) {
    var that = this
    var that = this,
      urlIndex = that.data.currentUrlIndex;
    wx.request({
      url: that.data.urls[urlIndex],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",

      data: {
        user_name: wx.getStorageSync('user_name'),

        page: that.data.page.current,
        page_size: page_size


      },
      success: function(res) {

        var oldlist = that.data.list
        that.data.page.current = fromShow ? 1 : that.data.page.current
        that.data.page.total = res.data.last
        that.setData({

          list: that.data.page.current && that.data.page.current <= res.data.last ? that.data.list.concat(res.data.list) : res.data.list,
          page: that.data.page
        });

        wx.hideLoading()
        console.log(that.data.page.current && that.data.page.current < res.data.last, that.data.list)

      },

      error: function(r) {
        console.info('error', r);
      },
      complete: function() {}
    });

    setTimeout(function() {
      wx.hideToast()
    }, 1000)

  },


  onShow: function(options) {

  },

  onPullDownRefresh: function() {
    console.info('onPullDownRefresh');
    var that = this
    if (that.data.page.current >= 1 || app.route) {
      that.data.page.current = 1
      that.setData({
        list: [],
        page: that.data.page
      })
      that.loadData(true)
    }


    wx.showNavigationBarLoading();

    wx.showLoading({
      title: '数据加载中...',
    });
    setTimeout(function() {


      wx.stopPullDownRefresh();
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      console.info('下拉数据加载完成.');

    }, 1000);
  },


  onReachBottom: function() {
    var that = this
    console.info('onReachBottom');
    if (that.data.page.current >= 0 && that.data.page.current < that.data.page.total) {
      wx.showLoading({
        title: "上拉加载更多！",
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      that.data.hidden = false,

        that.data.page.current = Number(that.data.page.current) + 1

      var timer = setInterval(function() {
        that.data.hidden = false,
          that.data.loadingData = false
        wx.showLoading({
          title: '数据加载中...',
        });
        that.setData({
          hidden: that.data.hidden,
          loadingData: that.data.loadingData
        })
        that.loadData()

        console.info('上拉数据加载完成.');
        clearInterval(timer)
      }, 2000);


    } else {
      that.data.hidden = true,
        that.data.loadingData = true

      wx.showToast({
        title: '亲！已经到底啦',

        icon: 'succes',
        duration: 2000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
    that.setData({
      hidden: that.data.hidden,
      page: that.data.page,
      loadingData: that.data.loadingData,

    });


    console.log(that.data.hidden)



  }
})