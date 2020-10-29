// components/PopTips/PopTips.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModalStatus:Boolean,
    title:String,
    msg:String,
    leftbtText:String,
    rightbtText:String,
    // cancel_status:Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModalStatus: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  close:function(){
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.showToast({
            title: '未获取权限',
            duration: 2000,
          })
        } else{
          this.util("close")
        }
      }
    })

  },
  ok:function(e){
    this.setData({
      rightbtText:"验证权限",
    })
    var that=this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          console.log("请授权")
          that.setData({
            showModalStatus:true,
          })
          // wx.showToast({
          //   title: '未获取权限',
          //   duration: 2000,
          // })
        } else{
          console.log("已经授权")

          //ip地址提交数据进行注册
          var app = getApp()
          var address=app.globalData.address

          wx.setStorageSync('privilege_status', true)

          wx.getUserInfo({
            success:res=>{
              var userInfo=res.userInfo
              app.globalData.userInfo=res.userInfo
              wx.login({
                success: function(res) {
                  console.log(res)
                  if (res.code) {
                    //发起网络请求
                    wx.request({
                      url: address+'/Register',
                      method: 'POST',
                      data: {
                        code: res.code,
                        //JSON嵌套转字符
                        userInfo:JSON.stringify(userInfo),
                      },
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      success: function (res) {
                        console.log("Arcticle_Res:", res.data[0])
                        if (res.data.hasOwnProperty('status')) {
                          wx.showModal({
                            title: '用户注册失败',
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

                          // console.log("Res:",res.data[0])
                        }
                
                      },
                      fail: function (res) {
                      },
                      complete: function (res) {

                      },
                    })



                  } else {
                    console.log('获取code失败' + res.errMsg)
                  }
                }
              });

            }
          })


        
          
          //主动隐去
          that.setData({
            showModalStatus:false,
          })
        }
      },
    })
  },

  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });
    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;
    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })
      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  }
})
