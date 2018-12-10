const app = getApp()

Page({

  data: {
    id: '',
    time: '12:00',
    tel: '',
    index: 0,

  },


  onLoad: function(options) {
    console.log(options)
    this.setData({
      id: options.id,
      tel: options.tel,
    })
    wx.setNavigationBarTitle({

      title: '报名活动',

    })
    var that = this
    wx.getStorage({
      key: 'user_name',
      success: function(res) {
        that.setData({
          user_name: res.data
        })
      },
    })
    wx.getStorage({
      key: 'nick_name',
      success: function(res) {
        console.log(res.data)
        that.setData({
          nick_name: res.data
        })
      },
    })




  },







  formSubmit: function(e) {


    if (e.detail.value.user_name == "") {

      wx.showToast({

        title: '手机号不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.nick_name == "") {

      wx.showToast({

        title: '姓名不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.suixing == "") {

      wx.showToast({

        title: '随行人数不能为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else {
      var that = this
      var id = this.data.id;
      var tel = this.data.tel;
      console.log(id)
      wx.request({

        url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_bao',

        header: {

          "Content-Type": "application/x-www-form-urlencoded"

        },

        method: "POST",

        data: {

          id: id,
          tel: tel,
          user_name: e.detail.value.user_name,
          nick_name: e.detail.value.nick_name,
          suixing: e.detail.value.suixing,

        },

        success: function(res) {


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

                  wx.switchTab({
                    url: "../user/user"
                  })

                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })




          }

        },


      })

    }

  },


})