var app = getApp();


Page({
  data: {
    user_name: "",
    password: "",
    userinfo: "",

  },


  onLoad: function(options) {
    var that = this



    console.log(options)


    that.setData({
      id: options.id

    })

  },







  listenerUsernameInput: function(e) {
    this.data.user_name = e.detail.value;
  },

  listenerPasswordInput: function(e) {
    this.data.password = e.detail.value;
  },

  loginAction: function() {

    var user_name = this.data.user_name;
    var password = this.data.password;
    var that = this;
    console.log(user_name);
    console.log(password);
    if (user_name === "") {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 2000,
        success: () => console.log('用户名不能为空！')
      })
      return;
    }
    if (password === "") {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000,
        success: () => console.log('密码不能为空！')
      })
      return;
    }



    var id = this.data.id;
    console.log('登录' + id)

    wx.request({
      method: "POST",
      url: 'https://hg.airyee.com/tools/small_program.ashx?action=user_login',
      data: JSON.stringify({
        user_name: user_name,
        password: password
      }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },



      success: function(res) {

        console.log(res.data);
        var code = res.data.msg;
        console.log(code);





        if (code === "登录成功") {
          console.log('我来过了');

          var user_name = res.data.user_name;
          var nick_name = res.data.nick_name;
          var avatar = res.data.avatar;
          console.log(user_name);
          console.log(nick_name);
          console.log(avatar);



          app.globalData.user_name = res.data.user_name;



          wx.setStorageSync('user_name', user_name);
          wx.setStorageSync('password', password);
          wx.setStorageSync('nick_name', nick_name);
          wx.setStorageSync('avatar', avatar);

          console.log("登录成功的user_name：" + user_name);

          console.log('我的值')

          wx.showToast({

            icon: 'success',
            title: '登录成功',
            duration: 1000,

          })



          wx.redirectTo({

            url: '/pages/list/list?id=' + id,

          })

          that.setData({
            list: res.data,

          })

        } else {

          wx.showModal({
            content: code,
            showCancel: false,
            confirmColor: "#4E77CC",
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })



        }




      },
      fail: function() {
        // util.hideToast();
        console.log("登录失败");
        wx.showToast({
          title: '服务器接口出问题??，请稍后重试',
          icon: 'none',
          duration: 2000,

          success: () => console.log('登录失败')
        })
      }


    })
  },

  gocv: function(e) {
    var id = this.data.id;
    wx.navigateTo({


      url: '../listma/listma?id=' + id,
    })
  },


})