Page({

  data: {
    name: '',
    phone: '',
    code: '',
    iscode: null,
    codename: '获取验证码'
  },

  getPhoneValue: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCodeValue: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  getCode: function() {
    var a = this.data.phone;
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      var that = this
      var phone = this.data.phone;
      wx.request({
        url: 'https://hg.airyee.com/tools/small_program.ashx?action=send_sms_code',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'

        },
        method: "POST",
        data: {
          phone: phone
        },

        success(res) {
          console.log(res.data)
          _this.setData({
            iscode: res.data.msg
          })
          var num = 61;
          var timer = setInterval(function() {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              _this.setData({
                codename: '重新发送',
                disabled: false
              })

            } else {
              _this.setData({
                codename: num + "s"
              })
            }
          }, 1000)
        }
      })

    }


  },

  getVerificationCode() {
    this.getCode();
    var _this = this
    _this.setData({
      disabled: true
    })
  },

  save: function() {

    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;

    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.code == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (this.data.code != this.data.iscode) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1000
      })
      console.log(this.data.code)
      console.log(this.data.iscode)
      return false;
    } else {


      var that = this
      var username = this.data.phone;
      wx.request({
        url: 'https://hg.airyee.com/tools/small_program.ashx?action=code_user_login',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'

        },
        method: "POST",
        data: {
          username: username
        },

        success(res) {

          console.log(res.data);

          var str = res.data.msg;


          if (res.data.status == 0) {

            wx.showModal({
              content: str,
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

          } else {

            var that = this;
            console.log('第二次' + res.data.user_name)
            var user_name = username;
            var nick_name = res.data.nick_name;
            var avatar = res.data.avatar;

            console.log('保存' + username)

            wx.setStorageSync('user_name', user_name);
            wx.setStorageSync('nick_name', nick_name);
            wx.setStorageSync('avatar', avatar);
            console.log(username)



            wx.switchTab({
              url: '/pages/allx/allx',
            })


            wx.showToast({

              title: '登录成功',

              icon: 'success',

              duration: 1000,

            })



          }

        }
      })
    }

  },

  onLoad: function(options) {

  },


  onReady: function() {

  },


  onShow: function() {

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