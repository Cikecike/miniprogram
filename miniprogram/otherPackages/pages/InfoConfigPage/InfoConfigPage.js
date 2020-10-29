// miniprogram/otherPackages/pages/InfoConfigPage.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoMess: '',
    userName: '',
    userN: '',//暂存
    passWd: '',//暂存
    passW: ''
  },

  //用户名和密码输入框事件
  userNameInput: function (e) {
    this.setData({
      userN: e.detail.value
    })
    console.log(this.data.userN)
  },

  passWdInput: function (e) {
    this.setData({
      passW: e.detail.value
    })
    console.log(this.data.passW)
  },
  //登录按钮点击事件，调用参数要用：this.data.参数；
  //设置参数值，要使用this.setData({}）方法

  loginBtnClick: function () {
    console.log("submit")
    if (this.data.userN.length == 0 || this.data.passW.length == 0) {
      this.setData({
        infoMess: '温馨提示：用户名和密码不能为空！',
      })
    } else {
      this.setData({
        infoMess: '',
        userName:this.data.userN,
        passWd:this.data.passW
      })
      wx.setStorage({
        key: 'uno',
        data: this.data.userName
      })
      wx.setStorage({
        key: 'pwd',
        data: this.data.passWd
      })
    }
    wx.showModal({
      title: '提示',
      content: '信息缓存成功',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确认回调')
        } else {
          console.log('点击取消回调')
        }
      }
    })

  },
  //重置按钮点击事件
  resetBtnClick: function (e) {
    wx.showModal({
      title: '提示',
      content: '是否确认更改并清除缓存',
      success: function (res) {
        if (res.confirm) {
          console.log('缓存清除')
          this.setData({
            userN:"",
            passW:"",
          })
          wx.clearStorage(); 
        } else {
          console.log('点击取消回调')
        }
      }
    })

  },


    /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.getStorage({
      key: 'uno',
      success: function (res) {
        var myData = res.data;//读取key值为myData的缓存数据
        that.setData({
          userN:myData
        })
      }
    })
    wx.getStorage({
      key: 'pwd',
      success: function (res) {
        var myData = res.data;//读取key值为myData的缓存数据
        that.setData({
          passW:myData
        })
      }
    })
    console.log(this.data)
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