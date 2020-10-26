// miniprogram/otherPackages/pages/Aticle_poster/Aticle_poster.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    title:'',
    content:'',
    cover_img_url:'',
    address:"",
  },

  check: function () {
    //检查内容是否合规
  },
  
  inputBlur: function () {
    this.setData({
      input_focus: false
    })
  },
  
  input_1: function () {
    this.setData({
      input_focus_1:true,
    })
  },

  input_2: function () {
    this.setData({
      input_focus_2:true,
    })
  },

  input_3: function () {
    this.setData({
      input_focus_3:true,
    })
  },
  


  title_Input:function(e){
    var data = e.detail.value
    this.setData({
      title: data
    })
  },
  coverurl_Input:function(e){
    var data = e.detail.value
    this.setData({
      cover_url: data
    })
  },
  contents_Input:function(e){
    var data = e.detail.value
    this.setData({
      content: data
    })
  },

  postAritc: function (dataset) {
    wx.showLoading({
      title: '文章发布中',
    })
    var that=this
    wx.request({
      url: that.data.address + '/Artic_Post',
      method: 'POST',
      data: dataset,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.hasOwnProperty('status')) {
          wx.showModal({
            title: '提交失败',
            content: res.data['Warning'],
            success: function (res) {
              if (res.confirm) {
                console.log('点击确认回调')
              } else {
                console.log('点击取消回调')
              }
            }
          })
        }
        else {
          wx.showToast({
            title: '内容已提交',
            duration: 2000,
          })
          wx.reLaunch({
            url: '../../../pages/HomePage/HomePage',
          })
           

        }
      },
      fail: function (res) {
        wx.showModal({
          title: '无法连接到服务器',
          content: '请检查网络或稍后刷新重试',
          success: function (res) {
            if (res.confirm) {
              console.log('点击确认回调')
            } else {
              console.log('点击取消回调')
            }
          }
        })
      },
      complete: function (res) {
        wx.hideLoading({
          success: (res) => { },
        })
        wx.stopPullDownRefresh({
          success: (res) => { },
          fail: (res) => { },
          complete: (res) => { },
        })

      },
    })
  },

  Submit: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确认提交',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确认回调')
          var then = that
          wx.getUserInfo({
            success: function (res) {
              var userInfo=res.userInfo
              console.log(userInfo)
              var dataset={}

              dataset['author']=userInfo.nickName
              dataset['artic_title']=then.data.title
              dataset['artic_summary']=then.data.content
              dataset['content']=then.data.content
              dataset['cover_img_url']=then.data.cover_url
              console.log(dataset)

              
              that.postAritc(dataset)
            }
          })

        } else {
          console.log('点击取消回调')
          return
        }
      }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    this.setData({
        address: app.globalData.address
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})