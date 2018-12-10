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
    
      title:'活动详情',
      
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


      success: function (res) {        

        console.log(res.data)




        that.setData({

          lists: res.data,

       

        })

        var h_content = res.data.h_content.replace(/\n/g, '<br>')
;
        console.log('ddx'+h_content)
        WxParse.wxParse('h_content', 'html', h_content, that, 5); 
      }
     
    }) 
    setTimeout(function () {
      wx.hideToast()
    }, 1000)

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