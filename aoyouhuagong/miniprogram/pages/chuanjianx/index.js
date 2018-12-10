Page({
  data: {
    img_url: [],
    content: '',
    shijian: '',
    hx_index: '0',
    xingbie: ''

  },
  onLoad: function(options) {
    var that = this
    wx.getStorage({
      key: 'user_name',
      success: function(res) {
        that.setData({
          dianhua: res.data
        })
      },
    })

  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })

  },
  bindDateChangev: function(e) {
    this.setData({
      time: e.detail.value
    })

  },
  bindDateChangex: function(e) {
    this.setData({
      datex: e.detail.value
    })

  },


  bindPickerChange_hx: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      hx_index: e.detail.value,
    })
    var ins = e.detail.value;
    console.log('我携带的', ins)
  },


  input: function(e) {
    this.setData({
      content: e.detail.value,

    })

  },
  inputx: function(e) {

    this.setData({
      mingcheng: e.detail.value,

    })

  },
  inputdi: function(e) {

    this.setData({
      didian: e.detail.value,

    })

  },

  minger: function(e) {

    this.setData({
      minger: e.detail.value,

    })

  },

  feiyong: function(e) {

    this.setData({
      feiyong: e.detail.value,

    })

  },
  dianhua: function(e) {

    this.setData({
      dianhua: e.detail.value,

    })

  },

  duifang: function(e) {

    this.setData({
      duifang: e.detail.value,

    })

  },

  onShow: function(e) {

    var user_name = wx.getStorageSync('user_name');
    console.log(user_name)
    var password = wx.getStorageSync('password');
    console.log(user_name)
    var nick_name = wx.getStorageSync('nick_name');
    var avatar = wx.getStorageSync('avatar');

    if (user_name == "") {


      wx.redirectTo({
        url: "../login/login"
      })
    } else {


      wx.redirectTo({
        url: "../user/user"
      })

    }
    this.setData({
      user_name: user_name,
      nick_name: nick_name,
      avatar: avatar,
    })






    var that = this;
    wx.request({
      url: 'https://hg.airyee.com/tools/small_program.ashx?action=club_list',

      method: 'POST',
      data: {

      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {

        that.setData({

          pic_array: res.data.list,
        })

      }
    });




  },


  chooseimage: function() {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

        if (res.tempFilePaths.length > 0) {


          if (res.tempFilePaths.length == 9) {
            that.setData({
              hideAdd: 1
            })
          } else {
            that.setData({
              hideAdd: 0
            })
          }


          let img_url = that.data.img_url;
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            img_url.push(res.tempFilePaths[i])
          }
          that.setData({
            img_url: img_url
          })

        }

      }
    })
  },




  formSubmit: function(e) {

    if (e.detail.value.mingcheng == "") {

      wx.showToast({

        title: '活动名称不能空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.didian == "") {

      wx.showToast({

        title: '地点不能空',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.minger == "") {

      wx.showToast({

        title: '名额不能空',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.feiyong == "") {

      wx.showToast({

        title: '费用不能空',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.dianhua == "") {

      wx.showToast({

        title: '电话不能空',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.content == "") {

      wx.showToast({

        title: '内容不能空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else if (e.detail.value.xingbie == "") {

      wx.showToast({

        title: '请选择类别!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function() {

        wx.hideToast()

      }, 2000)

    } else {

      var that = this;
      var user_name = wx.getStorageSync('user_name');
      console.log(user_name)

      var content = that.data.content;
      var shijian = that.data.date;
      var time = that.data.time;
      var shijianx = that.data.datex;
      var didian = that.data.didian;
      var mingcheng = that.data.mingcheng;
      var minger = that.data.minger;
      var feiyong = that.data.feiyong;
      var dianhua = that.data.dianhua;
      var duifang = that.data.duifang;
      var xingbie = e.detail.value.xingbie;
      console.log('picker的携带值为' + e.detail.value.picker_hx)
      var ins = this.data.pic_array[e.detail.value.picker_hx - 1].id
      console.log('vb', ins)
      wx.request({
        url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_fa',

        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT


        data: {
          user_name: user_name,

          ins: ins,
          mingcheng: mingcheng,
          shijian: shijian,
          shijianx: shijianx,
          time: time,
          didian: didian,
          minger: minger,
          feiyong: feiyong,
          dianhua: dianhua,
          content: content,
          duifang: duifang,
          xingbie: xingbie
        },

        header: {

          "Content-Type": "application/x-www-form-urlencoded"

        },
        success: function(res) {
          console.log(res.data);
          that.setData({

            list: res.data,

               

          })
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

            wx.showToast({

              title: '提交成功！！！',

              icon: 'success',

              duration: 1000,

            })

            that.setData({
              form_info: '',
              time: '',
              date: '',
              datex: ''
            })

            console.log(that.data.list.id)
            wx.redirectTo({
              url: '../tu/tu?id=' + that.data.list.id,
            })


          }

        }


      })
    }



  },








})