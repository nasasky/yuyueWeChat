//index.js
//获取应用实例
const app = getApp()

Page({

  data: {


  },

  onLoad: function(options) {


    var that = this



    console.log(options) 

   
    that.setData({
      msg: options.msg 

    })



  },






})