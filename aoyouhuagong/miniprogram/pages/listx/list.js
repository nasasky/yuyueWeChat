var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();

Page({

  data: {
    pic: ''
  },



  onLoad: function(options) {
    var that = this



    console.log(options)


    that.setData({
      id: options.id
    })


    wx.setNavigationBarTitle({

      title: '活动详情',

    })
    wx.hideToast();


    wx.showToast({
      title: '加载君正在加载',
      icon: 'loading',
      duration: 100000
    })
  },


  onReady: function() {

  },


  onShow: function() {


    var user_name = wx.getStorageSync('user_name');
    console.log(user_name)
    var password = wx.getStorageSync('password');
    console.log(user_name)
    var nick_name = wx.getStorageSync('nick_name');
    var avatar = wx.getStorageSync('avatar');

    if (user_name == "") {


      wx.redirectTo({
        url: '../loginx/loginx?id=' + this.data.id,
      })
    }


    this.setData({
      user_name: user_name,
      nick_name: nick_name,
      avatar: avatar,
    })





    var id = this.data.id;
    console.log(id)
    var that = this

    wx.request({

      url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_detail',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'

      },
      method: "POST",

      data: {
        id: id,

      },


      success: function(res) {        

        console.log(res.data)




        that.setData({

          lists: res.data,



        })

        var h_content = res.data.h_content;
        WxParse.wxParse('h_content', 'html', h_content, that, 5);
      }

    }) 
    setTimeout(function() {
      wx.hideToast()
    }, 1000)

  },

  onRequest: function(e) {
    var id = this.data.id;
    var that = this;
    console.log(id)
    var username = wx.getStorageSync('user_name');
    console.log(username)
    wx.request({
      url: 'https://hg.airyee.com/tools/small_program.ashx?action=cancel_activity',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'

      },
      data: {
        id: id,
        username: username
      },


      success: function(res) {
        console.log(res.data)
        that.setData({

          list: res.data,



        })
        var str = res.data.msg;
        if (res.data.status == 0) {
          wx.showModal({
            content: str,
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })



        } else {

          wx.showModal({
            content: str,
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')

                wx.reLaunch({

                  url: "../user/user"
                })

              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })



        }



      }

    })






  },




  onHide: function() {

  },


  onUnload: function() {

  },


  onPullDownRefresh: function() {

  },


  onReachBottom: function() {

  },


  onShareAppMessage: function() {

  }


})