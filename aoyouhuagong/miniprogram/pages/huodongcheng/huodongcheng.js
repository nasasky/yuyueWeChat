
const app = getApp()

Page({

  data: {


  },

 
  onLoad: function(options) {
    wx.setNavigationBarTitle({
    
      title: '发起活动成功',

    })

   


  },

 

  goB: function(e) {

    wx.switchTab({
      url: "../allx/allx"
    })
  },



})