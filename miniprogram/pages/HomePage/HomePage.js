// pages/BrowseGoods/BrowseGoods.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address:null,
    // Article:null,
    //测试数据
    Article:[
      {
        'Artic_key':1,
        'Artic_Title':"Test",
        "Artic_summary":"",
      },
    ],

    PopStatus:false,


    SwiperList: [
      "swiper/6.jpg",
    ]
  },
  //bindKeyInput: function (e) {
  //  this.setData({
  //    inputValue: e.detail.value
  //  })
  //},

  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    //return {
    //  value: value.replace(/11/g, '2'),
    //  cursor: pos
    //}
    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },

  bindHideKeyboard: function (e) {
    if (e.detail.value === '123') {
      // 收起键盘
       wx.hideKeyboard()
    }
  },



  //获取文章列表
  Get_Article:function(){
    var that=this
    wx.showLoading({
      title: '努力加载中',
    })

    wx.request({
      url: that.data.address+'/GetArticList',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {

        if(res.data.hasOwnProperty('status')){
          wx.showModal({
            title: '数据拉取失败',
            content: res.data['Warning'],
            success: function(res) {
              if (res.confirm) {
                console.log('点击确认回调')
              } else {
                console.log('点击取消回调')
              }
            }
          })
        }
        else{
          console.log("Arcticle_Res:", res)
          that.setData({
            Article:res.data
          })
          // that.setData({
          //   Article:null,
          // })
        }
          
      },
      fail: function(res) {
        wx.showModal({
          title: '无法连接到服务器',
          content: '请检查网络或稍后刷新重试',
          success: function(res) {
            if (res.confirm) {
              console.log('点击确认回调')
            } else {
              console.log('点击取消回调')
            }
          }
        })
      },
      complete: function(res) {
        wx.hideLoading({
          success: (res) => {},
        })
        wx.stopPullDownRefresh({
          success: (res) => {},
          fail: (res) => {},
          complete: (res) => {},
        })

      },
    })
  },


  checkPrivilege:function(){
    var that=this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          console.log("请授权")
          that.setData({
            PopStatus:true,
          })
          // wx.showToast({
          //   title: '未获取权限',
          //   duration: 2000,
          // })
        } else{
          console.log("已经授权")
          wx.navigateTo({
            url: '../../otherPackages/pages/Aticle_poster/Aticle_poster',
          })
        }
      },
    })
  },

  adddetial:function(){
    this.checkPrivilege()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    this.setData({
        address: app.globalData.address,
        PopStatus:!wx.getStorageSync('privilege_status'),
    })

    this.Get_Article();
    var that=this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          console.log("请授权")
          that.setData({
            PopStatus:true,
          })
          // wx.showToast({
          //   title: '未获取权限',
          //   duration: 2000,
          // })
        } else{
          console.log("已经授权")
          that.setData({
            PopStatus:false,
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading({
      success: (res) => {},
    })
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
    this.Get_Article()
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

  },




  turnTo: function () {
    wx.navigateTo({
      url: '../../otherPackages/pages/COVID-19/COVID-19',
      success: function (res) { console.log("Successfully load COVID-19") },
      fail: function (res) { console.log(res) },
      complete: function (res) { },
    })
  },
})


