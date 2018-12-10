var app = getApp();


Page({
  data: {

    list: [],
    data: [],


  },
  onLoad: function(options) {






  },



  onReady: function() {

  },
  onShow: function() {

    var user_name = wx.getStorageSync('user_name'); //获取本地缓存中的userIdEnc //用户唯一识别码
    console.log(user_name)
    var password = wx.getStorageSync('password');

    var that = this
    wx.request({
      header: {
        'user_name': wx.getStorageSync('user_name')
      },
      url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_detail',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'

      },
      method: "POST",

      data: {
        id: '5',

      },


      success: function(res) {        
        console.log(res.data)




        that.setData({

          lists: res.data,



        })


      }
    }) 
  },
  onHide: function() {

  },
  onUnload: function() {

  }
})








// const app = getApp();
// Page({
//   onLoad: function() {
//     let token = wx.getStorageSync('token');
//     if (token == '') { //第一次登录，获取登录状态 
//       app.getToken().then(function(res) {
//         _this.getData(); //此时token必然已经获取到，且getData()在此时才会执行
//       })
//     } else { //有token的情况直接获取数据
//       _this.getData();
//     }
//   }, //获取数据 
//   getData: function() {
//     wx.request({
//       header: {
//         'token': wx.getStorageSync('token')
//       },
//       url: 'https://xxxxx.xxxxx',
//       method: 'GET',
//       success: res => {
//         console.log(res);
//       }
//     })
//   }
// })