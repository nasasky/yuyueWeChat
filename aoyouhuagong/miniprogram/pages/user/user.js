
var app = getApp();
Page({
  data:{
   
  },
 
  
  onReady:function(){
    
  },

  
  onShow: function () {
   
   
    var user_name = wx.getStorageSync('user_name'); 
    console.log(user_name)
    var password = wx.getStorageSync('password');
    console.log(user_name)
    var nick_name =wx.getStorageSync('nick_name');
    var avatar = wx.getStorageSync('avatar');
  
    if (user_name == "") {
    

      wx.redirectTo({ url: "../login/login" })
    } else {

     
      wx.redirectTo({ url: "../user/user" })

    }
    this.setData({
      user_name: user_name,
      nick_name:nick_name,
      avatar:avatar,
    })



    
    
  },
  
  goB: function (e) {

    wx.redirectTo({

      url: '../home/home'

    })

  },
})
