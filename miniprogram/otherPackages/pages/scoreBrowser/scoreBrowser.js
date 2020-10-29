// pages/BrowseGoods/BrowseGoods.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    srcAddress: ["../../../images/reflash.png", "../../../images/reflash.gif"], //转变gif提示动态加载
    imgSrc: "../../../images/reflash.png",
    ip_address: "www.universaryunion.xyz",

    uno: String,
    pwd: String,
    year: String,
    term: String,


    score_JSON: [],
  },



  GetScore: function() {
    console.log("GetingScore")
    if (this.CheckCache()) {

      wx.showLoading({
        title: '加载中',
      })
      var str1 = this.data.srcAddress[1]
      this.setData({
        imgSrc: str1
      })
      var that = this
      wx.request({
        url: "https://"+that.data.ip_address+"/Score",
        method: 'POST',
        data: {
          uno: that.data.uno,
          pwd: that.data.pwd,
          year: that.data.year,
          term: that.data.term,

        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          console.log("Getscore:",res.data)
          if (res.data != false) {
            wx.removeStorageSync("score_JSON")
            // console.log("获取课程成功", res.data)
            try {
              that.setData({
                score_JSON: res.data
              })

              wx.setStorage({
                key: 'score_JSON',
                data: res.data
              })
              console.log(res.data)

            } catch (e) {
              console.log("同步更新失败", e)
            }
            wx.showToast({
              title: '成绩同步完成',
              icon: 'none', //如果要纯文本，不要icon，将值设为'none'
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '成绩同步失败',
              icon: 'none', //如果要纯文本，不要icon，将值设为'none'
              duration: 2000
            })
          }
        },
        fail: function(res) {
          wx.hideLoading()
          console.log("获取失败")
          that.requestFailed()
        },
        complete: function(res) {
          wx.hideLoading()
          //弹窗提示
          var str2 = that.data.srcAddress[0]
          that.setData({
            imgSrc: str2
          })
          // console.log(that.data.course_JSON)

        },
      })
    } else { //账号缓存为空
      wx.showModal({
        title: '提示',
        content: '本地无账号信息缓存，请跳转个人信息页配置',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "../InfoConfigPage/InfoConfigPage",
            })

          } else {
            console.log('点击取消回调')

          }
        }
      })
    }




  },


  requestFailed: function(contents) {
    wx.showModal({
      title: '课表获取失败',
      content: '请检查你的网络或服务器暂时出现问题',
      success: function(res) {
        if (res.confirm) {
          console.log('点击确认回调')
        } else {
          console.log('点击取消回调')
        }
      }
    })
  },

  GetTimer: function() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    if (month > 2 && month <= 8) {
      this.setData({
        term: 2
      })
    } else {
      this.setData({
        term: 1
      })
    }

    this.setData({
      year: year - 1
    })

    return [year, month];
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  isset: function(key) {
    let val = wx.getStorageSync(key)
    return val !== '' && val !== null & val !== undefined
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  CheckCache: function() {
    if (this.isset('uno') && this.isset('pwd')) {
      console.log("Cache defined")
      return true
    }
    console.log("Cache not defined")
    return false
  },


  onReady: function() {
    if (this.isset('uno') && this.isset('pwd')) {
      let u = wx.getStorageSync('uno')
      let p = wx.getStorageSync('pwd')
      this.setData({
        uno: u,
        pwd: p,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '本地无账号信息缓存，请跳转个人信息页配置',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "../InfoConfigPage/InfoConfigPage",
            })

          } else {
            console.log('点击取消回调')

          }
        }
      })
    }

    console.log(this.GetTimer())
    if (this.isset('score_JSON')) {
      var s = wx.getStorageSync('score_JSON')
      console.log("s", s)
      console.log(s)
      this.setData({
        score_JSON: s,
      })
    }



    console.log("score", this.data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.GetScore()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})