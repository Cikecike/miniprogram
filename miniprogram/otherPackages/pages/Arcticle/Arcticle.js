// pages/BrowseGoods/BrowseGoods.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    srcAddress: ["../../../images/reflash.png", "../../../images/reflash.gif"], //转变gif提示动态加载
    imgSrc: "../../../images/reflash.png",
    // Img: '\n\n\n\n\nHealtyFruit',
    // Person: {
    //   name: "Li",
    //   years: 15
    // },

    PopStatus: false,
    address: null,
    artic_key: null,
    input_focus: false,
    comment_value: null,
    userInfo: null,
    article: {
      'Title': "",
      'Content': "\n\n\n\n\n\n\n\n\\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
      'Author': "",
      'Time': "",
      'comments': [
        {
          'Comment_key': "",
          'User_img_Url': "",
          'Comer_id': "",
          "Comm_time": "",
          'Comment_text': ""
        },
        {
          'Comment_key': "",
          'User_img_Url': "",
          'Comer_id': "",
          "Comm_time": "",
          'Comment_text': ""
        }
      ],
      'counter': {
        'like': 0,
        'comment': 0,
      },
    },

    //浮动按钮坐标
    flow_y: 130,
    flow_x: 20,

    pre_y:0,
    pre_x:0,
    //标记移动
    moveFlag: false,
    //标记控件是否可放置
    canNotPlace: false,

    // SwiperList: [
    //   "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00523-2175.jpg",
    //   "http://img4.imgtn.bdimg.com/it/u=2855103243,91256791&fm=26&gp=0.jpg",
    //   "http://img2.imgtn.bdimg.com/it/u=3065732479,2765170097&fm=26&gp=0.jpg",
    // ]
  },


  //点击事件  
  clickImg: function (e) {
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var listarry = this.data.SwiperList;
    wx.previewImage({
      urls: listarry, //需要预览的图片http链接列表，注意是数组
      current: listarry[index], // 当前显示图片的http链接，默认是第一个
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  input_: function () {
    this.checkPrivilege()

  },

  inputBlur: function () {
    this.setData({
      input_focus: false
    })
  },

  commentsInput: function (e) {
    var comment = e.detail.value
    this.setData({
      comment_value: comment
    })
    // console.log('comment_value:',this.data.comment_value)
  },

  like_artic: function () {
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          console.log("请授权")
          that.setData({
            PopStatus: true,
          })
        } else {
          wx.login({
            success: res => {
              console.log("已经授权")

              var URL = that.data.address + '/Like_Article?artic_key=' + that.data.artic_key+'&code='+res.code
              wx.request({
                url: URL,
                method: 'GET',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function (res) {
                  // console.log(res)
                  // console.log("Arcticle_Res:", res.data.article)
                  if (res.data.hasOwnProperty('status')) {
                    wx.showToast({
                      title: '点赞失败',
                      icon:'fail',
                      duration: 2000,
                    })
                  }
                  else {
                    if(res.data==true){
                      var data = "article.counter.like"
                      //界面自增1
                      var plus = that.data.article['counter']['like'] + 1
                      that.setData({
                        [data]: plus,
                      })
                      wx.showToast({
                        title: '已点赞',
                        duration: 2000,
                      })
                      
                    }else{
                      var data = "article.counter.like"
                      //界面自增1
                      var plus = that.data.article['counter']['like'] - 1
                      that.setData({
                        [data]: plus,
                      })
                      wx.showToast({
                        title: '已取消',
                        duration: 2000,
                      })
                    }

                  }
                },
                fail: function (res) {
                },
                complete: function (res) {
                  wx.hideLoading()
                },
              })
            },
          })
          

          // console.log(this.data.article['counter']['like'])

        }
      },
    })


  },

  //评论需要授权使用
  checkPrivilege: function () {
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          console.log("请授权")
          that.setData({
            PopStatus: true,
          })
        } else {
          console.log("已经授权")
          that.setData({
            input_focus: true,
          })
        }
      },
    })
  },

  submit: function () {

    this.inputBlur()
    wx.showLoading({
      title: '数据提交中',
    })
    var that = this
    that.data.userInfo = wx.getStorageSync('userInfo')
    // console.log('user:', that.data.userInfo)
    // console.log('commnet',that.data.comment_value)

    //JSON数据提交需要转string，否则Flask后端解析为[object Object] 
    
    wx.login({
      success: res => {
        var data = {
          artic_key: that.data.artic_key,
          args: {
            userInfo: {
              user_img_url: that.data.userInfo.avatarUrl,
              code: res.code,
            },
            comment: that.data.comment_value,
          }
        }
        console.log("data:", JSON.stringify(data));
    
        that.setData({
          comment_value: null
        })
    
        wx.request({
          url: that.data.address + '/WriteComments',
          method: 'POST',
          data: JSON.stringify(data),
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            // console.log("Arcticle_Res:", res.data.article)
            if (res.data.hasOwnProperty('status')) {
              wx.showModal({
                title: '数据拉取失败',
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
              that.getArticle()
            }
          },
          fail: function (res) {
          },
          complete: function (res) {
            wx.hideLoading()
          },
        })
      },
      fail: res => {
        wx.showModal({
          title: '数据拉取失败',
          content: '未获取到权限',
          success: function (res) {
            if (res.confirm) {
              console.log('点击确认回调')
            } else {
              console.log('点击取消回调')
            }
          }
        })
      }
    })

    
  },


  getArticle: function () {

    var str1 = this.data.srcAddress[1]
    this.setData({
      imgSrc: str1
    })

    //加载文章
    var that = this

    wx.showLoading({
      title: '努力加载中',
    })

    wx.request({
      url: that.data.address + '/GetArticle',
      method: 'POST',
      data: {
        article_key: that.data.artic_key,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("Arcticle_Res:", res.data[0])
        if (res.data.hasOwnProperty('status')) {
          wx.showModal({
            title: '内容好像消失了',
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
          that.setData({
            article: res.data[0]
          })
          wx.stopPullDownRefresh({
            success: (res) => { },
          })
          // console.log("Res:",res.data[0])
        }

      },
      fail: function (res) {
      },
      complete: function (res) {
        wx.hideLoading({
          success: (res) => { },
        })
        var str2 = that.data.srcAddress[0]
        that.setData({
          imgSrc: str2
        })
      },
    })
    // wx.hideShareMenu()
  },



  //长按按钮移动控件
  longPress: function (e) {
    console.log(e)
    this.setData({
      moveFlag: true,
      pre_x:e.touches[0].clientX,
      pre_y:e.touches[0].clientY,
    })
    // console.log(e)
    console.log("begin:(", this.data.flow_x, this.data.flow_y, ")")
    // this.setData({
    //   flow_x: 1334-e.touches[0].pageX, // 获取触摸时的原点
    //   flow_y: 750-e.touches[0].pageY,
    // })
    //console.log(startX)

  },

  // 触摸结束事件
  touchEnd: function (e) {
    this.setData({
      moveFlag: false
    })

      // console.log("flow:(", this.data.flow_x, this.data.flow_y, ")")
    //监测按钮放置区域
    if (!((this.data.flow_x < 730) && (this.data.flow_x > 20))&&((this.data.flow_y < 1150) && (this.data.flow_y > 130))) {
      this.setData({
        flow_x: 20, // 转换rpx
        flow_y: 130,
      })
    }
    this.setData({
      flow_x: 20, // 转换rpx
    })
  },

  touchMove: function (e) {
    //根据move差值动态布局
    if (this.data.moveFlag) {
      // console.log("page:(", e.touches[0].pageX, e.touches[0].pageY, ")")
      // console.log(move_x,move_y)

      var x =this.data.flow_x -(e.touches[0].clientX-this.data.pre_x)*2
      var y =this.data.flow_y -(e.touches[0].clientY-this.data.pre_y)*2
      this.setData({
        flow_x: x, // 转换rpx
        flow_y: y,
      })
      // console.log(x,y)
      // this.setData({
      //   flow_x: x, // 转换rpx
      //   flow_y: y,
      // })
      if (!(((x < 730) && (x > 20))&&((y < 1000) && (y > 130)))) {
        this.setData({
          canNotPlace: true,
        })
      } else {
        this.setData({
          canNotPlace: false,
        })
      }
      this.setData({
        pre_x:e.touches[0].clientX,
        pre_y:e.touches[0].clientY,
      })
    }
  },


  catchtouchmove: function () {
    //防止蒙层触摸穿透
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("onLoad:",this.data.article['Title'])
    var app = getApp()

    this.setData({
      address: app.globalData.address,
      artic_key: options['artic_key'],
      PopStatus:!wx.getStorageSync('privilege_status'),
    })

    console.log("arcticle_key:", this.data.artic_key)
    this.getArticle()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // wx.hideLoading()
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
    this.getArticle()
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