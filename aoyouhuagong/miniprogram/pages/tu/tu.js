Page({
  data: {
    img_url: [],
    content: ''
  },

  onLoad: function(options) {

    wx.setNavigationBarTitle({

      title: '上传活动图片',

    })
    var that = this



    console.log(options)


    that.setData({
      id: options.id

    })



  },
  input: function(e) {
    this.setData({
      content: e.detail.value
    })
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

  send: function() {
    var that = this;
    var id = this.data.id;

    that.img_upload()
  },

  img_upload: function() {
    let that = this;
    var id = this.data.id;
    let img_url = that.data.img_url;
    let img_url_ok = [];

    for (let i = 0; i < img_url.length; i++) {
      wx.uploadFile({

        url: 'https://hg.airyee.com/tools/small_program.ashx?action=activity_img',
        filePath: img_url[i],
        name: 'file',
        formData: {
          'user': 'test',
          id: id

        },
        success: function(res) {
          console.log('上传成功');
          console.log(res.data)
          wx.showToast({

            title: '上传成功！！！',
            icon: 'loading',
            duration: 1500

          })
          wx.redirectTo({
            url: '../xiangqingc/xiangqingc',
          })




        },
        fail: function(res) {
          console.log('上传失败')
        }
      })
    }
  },

  delImg: function(e) {
    var index = e.currentTarget.dataset.index;
    var img_url = this.data.img_url;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除此商品吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          img_url.splice(index, 1);
        } else if (res.cancel) {
          return false
          console.log('用户点击取消')
        }
        that.setData({
          img_url: img_url
        });
      }
    })
  },


  goc: function(e) {

    wx.redirectTo({
      url: "../huodongcheng/huodongcheng"
    })
  },


})