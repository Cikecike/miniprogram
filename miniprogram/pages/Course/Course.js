// pages/ShoppingCart/ShoppingCart.js

const app = getApp()
let startX, endX;
let moveFlag = true; // 判断执行滑动事件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip_address:"www.universaryunion.xyz",
    //周数导航索引
    curPage: 0,
    curIndexNav: 0,
    background_color: "#c3ccdb",
    course_JSON: [],
    opacity: 0.8,
    score_JSON: '',
    course_Table: [],

    scrollLeft: 0,
    scrollViewWidth: 750,
    ani_left: '',
    ani_right: '',

    day_order: {
      '星期一': 1,
      '星期二': 2,
      '星期三': 3,
      '星期四': 4,
      '星期五': 5,
      '星期六': 6,
      '星期日': 7
    },


    //个人登录信息
    uno: "",
    pwd: "",

    //查询信息
    // xnm:"2019",
    // xqm: ["12", "3"], //3表示第一学期，12表示第二学期，空表示全部


    reflash_status: false,

    year: '2018',
    term: '2'



  },

  adddetial: function() {
    wx.navigateTo({
      url: '../../otherPackages/pages/scoreBrowser/scoreBrowser',
      success: function(res) {
        console.log("Successfully")
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },

  //自定义滑动事件
  touchStart: function(e) {
    startX = e.touches[0].pageX; // 获取触摸时的原点
    //console.log(startX)
    moveFlag = true;
  },

  // 触摸移动事件
  touchMove: function(e) {
    // console.log("touch")
    let that = this
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 80) {
        console.log("move right");
        this.moveright(that);
        moveFlag = false;
      }
      if (startX - endX > 80) {
        console.log("move left");
        this.moveleft(that);
        moveFlag = false;
      }
    }
  },

  // 触摸结束事件
  touchEnd: function(e) {
    moveFlag = true; // 回复滑动事件
  },

  //向左滑动操作
  moveleft(that) {
    if (that.data.curPage < 21) {
      let n = that.data.curPage
      that.setData({
        curPage: n + 1,
        curIndexNav: n + 1
      })
      wx.showToast({
        title: "第" + (that.data.curPage + 1).toString() + "周",
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        duration: 1500
      })

      if (that.data.curPage > 1) {
        let t = that.data.scrollLeft + 82
        that.setData({
          scrollLeft: t
        })

        // console.log("scrollLeft", this.data.scrollLeft)
      }



      that.week_changed();
      //console.log(that.data.curPage)

      that.changeTitle(that.data.curPage)

    } else {
      wx.showToast({
        title: '右边已经没有了',
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        duration: 2000
      })
      return
    }


    // //渐变动画效果
    // let animation = wx.createAnimation({
    //   duration: 1000,
    //   timingFunction: 'ease',
    //   delay: 100
    // });
    // animation.opacity(0.2).translate(-500, 0).step()
    // this.setData({
    //   ani_left: animation.export()
    // })
    // setTimeout(function () {
    //   that.setData({
    //     ani_right: ''
    //   });
    // }, 800)
  },

  //向右滑动操作
  moveright(that) {
    //console.log(that.data.curPage)
    if (that.data.curPage >= 0) {
      let n = that.data.curPage
      that.setData({
        curPage: n - 1,
        curIndexNav: n - 1
      })

      if (that.data.curPage)
        wx.showToast({
          title: "第" + (that.data.curPage + 1).toString() + "周",
          icon: 'none', //如果要纯文本，不要icon，将值设为'none'
          duration: 1500
        })


      that.changeTitle(that.data.curPage)

      if (that.data.curPage > 0) {
        let t = that.data.scrollLeft - 82
        that.setData({
          scrollLeft: t
        })

        // console.log("scrollLeft", this.data.scrollLeft)
      }

      that.week_changed()

    } else {
      wx.showToast({
        title: '左边已经没有了',
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        duration: 2000
      })
      return
    }

  },

  week_changed: function() {

    this.setData({
      course_Table: []
    })

    //布局数组初始化
    for (let i = 0; i < 7; i++) {
      let str = "course_Table[" + i.toString() + "]"
      //console.log(str)
      this.setData({
        [str]: []
      })
      for (let j = 0; j < 5; j++) {
        let str2 = "course_Table[" + i.toString() + "]" + "[" + j.toString() + "]"
        //console.log(str2)
        this.setData({
          [str2]: -1
        })
        //console.log(that.data.course_Table[i][j])
      }
    }

    if (this.data.curPage == -1) {
      for (let i = 0; i < this.data.course_JSON.length; i++) {


        let xq = this.data.course_JSON[i]['xqjmc'] - 1
        let jc = parseInt(parseInt(this.data.course_JSON[i]['jcs'][0]) / 2)

        let str = "course_Table[" + xq.toString() + "]" + "[" + jc.toString() + "]"

        let len = this.data.course_JSON[i]['jcs'].replace("周", "").split("-")


        let len_str = "course_JSON[" + i.toString() + "]" + ".c_len"


        let p = parseInt(len[1]) - parseInt(len[0])

        this.setData({
          [len_str]: p
        })
        // console.log(len_str, p)


        this.setData({
          [str]: i
        })
      }

      for (let xq = 0; xq < 7; xq++) {
        for (let jc = 0; jc < 4; jc++) {
          let no = this.data.course_Table[xq][jc]

          if (no >= 0) {
            // console.log("re:", this.data.course_JSON[no].c_len)
            if (this.data.course_JSON[no].c_len == 3) {
              let str = "course_Table[" + xq.toString() + "]" + "[" + (jc + 1).toString() + "]"
              this.setData({
                [str]: -3
              })
            } else if (this.data.course_JSON[no].c_len == 2) {
              let str = "course_Table[" + xq.toString() + "]" + "[" + (jc + 1).toString() + "]"
              this.setData({
                [str]: -2
              })
            }
          }

        }
      }

      return
    }



    var week = []

    //获取组件坐标布局
    for (let i = 0; i < this.data.course_JSON.length; i++) {
      // console.log(this.data.course_JSON)

      week = this.data.course_JSON[i]['zcd']
      // console.log(this.data.curIndexNav >= parseInt(week[0]) && this.data.curIndexNav <= parseInt(week[1]),week)

      var flag = false

      if (week.length > 1) {
        // flag = (this.data.curIndexNav + 1 >= parseInt(week[0])) && (this.data.curIndexNav + 1 <= parseInt(week[1]))
        for (let i = 0; i < week.length; i++) {
          if (week[i] == this.data.curIndexNav + 1) {
            flag = true
            break
          }
        }
      } else {
        // console.log(week)
        flag = (this.data.curIndexNav + 1 == parseInt(week[0]))
      }

      if (flag) {
        let xq = this.data.course_JSON[i]['xqjmc'] - 1

        let jc = parseInt(parseInt(this.data.course_JSON[i]['jcs'][0]) / 2)

        let str = "course_Table[" + xq.toString() + "]" + "[" + jc.toString() + "]"

        let len = this.data.course_JSON[i]['jcs'].split("-")

        let len_str = "course_JSON[" + i.toString() + "]" + ".c_len"


        let p = parseInt(len[1]) - parseInt(len[0])
        this.setData({
          [len_str]: p
        })

        this.setData({
          [str]: i
        })
        // console.log(p,i,this.data.course_JSON[i])
      }

      //规格化table
      for (let xq = 0; xq < 7; xq++) {
        for (let jc = 0; jc < 4; jc++) {
          let no = this.data.course_Table[xq][jc]

          if (no >= 0) {
            // console.log("no", this.data.course_JSON[no])
            if (this.data.course_JSON[no].c_len == 3) {
              let str = "course_Table[" + xq.toString() + "]" + "[" + (jc + 1).toString() + "]"
              this.setData({
                [str]: -3
              })
            } else if (this.data.course_JSON[no].c_len == 2) {
              let str = "course_Table[" + xq.toString() + "]" + "[" + (jc + 1).toString() + "]"
              this.setData({
                [str]: -2
              })
            }
          }
        }
      }

    }

  },


  changeTitle: function(n) {
    if (this.data.curPage == -1) {
      wx.setNavigationBarTitle({
        title: "本学期所有课程"
      })
      return
    }

    wx.setNavigationBarTitle({
      title: "第" + (n + 1).toString() + "周",
    })



  },




  //点击周数导航
  activeNav(e) {
    //console.log(e.target.dataset.index);
    this.setData({
      curIndexNav: e.target.dataset.index,
      curPage: e.target.dataset.index
    })

    wx.setNavigationBarTitle({
      title: "第" + String(e.target.dataset.index + 1) + "周",
    })


    //顶栏tab动态居中 
    let offsetLeft = e.currentTarget.offsetLeft
    this.setData({
      scrollLeft: offsetLeft - this.data.scrollViewWidth / 2.5
    })
    console.log("scrollLeft", this.data.scrollLeft)

    this.week_changed()
  },

  activeNav_all(e) {
    this.setData({
      curIndexNav: -1,
      curPage: -1
    })

    wx.setNavigationBarTitle({
      title: "本学期所有课程"
    })
    this.week_changed()

    // console.log(this.data.course_JSON[1].c)
  },

  // setOpacity:function(op){
  //   this.setData({
  //     opacity: op
  //   })
  // },
  // setColor:function(){
  //   let r = Math.floor(Math.random() * 255);
  //   let g = Math.floor(Math.random() * 255);
  //   let b = Math.floor(Math.random() * 255);
  //   let color_bg = 'rgb(' + r + ',' + g + ',' + b + ')';
  //   this.setData({
  //     background_color: '#fcdfcc'
  //   })
  //   console.log(this.data.background_color)
  // },


  isset: function(key) {
    let val = wx.getStorageSync(key)
    return val !== '' && val !== null & val !== undefined
  },


  //本地缓存操作
  Load_cache: function() {
    console.log("Load_cache")
    if (this.isset("uno") && this.isset("pwd")) {
      let u = wx.getStorageSync('uno')
      let p = wx.getStorageSync('pwd')
      console.log("u,p", u, p)

      this.setData({
        uno: u,
        pwd: p,
      })
      console.log("Load_cache true")
      return true
    } else {
      console.log("Load_cache false")
      return false
    }

  },


  Course_CacheSaver: function() {
    wx.setStorage({
      key: 'course_Json',
      data: this.data.course_JSON
    })
    wx.setStorage({
      key: 'course_Table',
      data: this.data.course_Table
    })
  },


  Course_CacheLoader: function() {
    console.log("Course_CacheLoader")
    if (this.isset("course_Json") && this.isset("course_Table")) {
      var c_Json = wx.getStorageSync('course_Json')
      var c_Table = wx.getStorageSync('course_Table')
      console.log(c_Json, c_Table)
      this.setData({
        course_JSON: c_Json,
        course_Table: c_Table,
      })
      console.log('Course_Cache exists')
    } else{
      console.log('Course_Cache not exists')
    }
    

    console.log(this.data.course_JSON)

    if (this.data.course_Json == [] && this.data.course_Table == []) {
      //无本地缓存
      return false
    }
    return true
  },

  //本地缓存操作

  Login_cas: function() {
    var that = this

    var uno = this.data.uno
    var pwd = this.data.pwd

    console.log("login:", this.data)
    wx.request({
      url: "https://"+that.data.ip_address+"/Login",
      method: 'POST',
      data: {
        uno: that.data.uno,
        pwd: that.data.pwd,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {

        console.log("count", that.data.uno, that.data.pwd)
        console.log("cas res", res.data)
        if (res.data&&res.statusCode==200) {
          wx.showToast({
            title: '登录成功',
            icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            duration: 2000
          })
          wx.hideLoading()
          //刷新课表
          that.GetCourse()
        }
      },
      fail: function(res) {
        wx.hideLoading()
        console.log("登录失败")
        that.requestFailed()
      },
      complete: function(res) {

      },
    })
  },

  GetCourse: function() {
    console.log("获取课表")
    wx.showLoading({
      title: '加载课表中',
    })
    let that = this
    wx.request({
      url: "https://"+this.data.ip_address+"/Course",
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
        console.log("GetCourse res",res)
        that.setData({
          reflash_status: false
        })
        if (res.data != false && res.statusCode == 200) {
          wx.removeStorageSync("course_Json")
          wx.removeStorageSync("course_Table")
          // console.log("获取课程成功", res.data)
          try {
            let value = res.data
            console.log("course:", value)
            that.setData({
              course_JSON: value
            })
            //布局数组初始化
            for (let i = 0; i < 7; i++) {
              let str = "course_Table[" + i.toString() + "]"
              //console.log(str)
              that.setData({
                [str]: []
              })
              for (let j = 0; j < 5; j++) {
                let str2 = "course_Table[" + i.toString() + "]" + "[" + j.toString() + "]"
                //console.log(str2)
                that.setData({
                  [str2]: -1
                })
              }
            }

            //获取组件坐标布局

            for (let i = 0; i < that.data.course_JSON.length; i++) {
              // if (that.data.course_JSON[i]['xqjmc'].search("星期")){
              //   that.data.course_JSON[i]['xqjmc'] = that.data.day_order[that.data.course_JSON[i]['xqjmc']]
              // }
              that.data.course_JSON[i]['xqjmc'] = that.data.day_order[that.data.course_JSON[i]['xqjmc']]
              //that.data.course_JSON[i]['jc'] = parseInt(that.data.course_JSON[i]['jc'][0])

              let xq = that.data.course_JSON[i]['xqjmc'] - 1
              let jc = parseInt(parseInt(that.data.course_JSON[i]['jcs'][0]) / 2)

              let str = "course_Table[" + xq.toString() + "]" + "[" + jc.toString() + "]"

              let len = that.data.course_JSON[i]['jcs'].split("-")
              // console.log("len",len)
              let len_str = "course_JSON[" + i.toString() + "]" + ".c_len"

              // that.data.course_JSON[i].c_len = (parseInt(len[1]) - parseInt(len[0])).toString()
              let p = parseInt(len[1]) - parseInt(len[0])

              that.setData({
                [len_str]: p
              })
              that.setData({
                [str]: i
              })
              // console.log(that.data.course_JSON[i])
              // console.log("x:", xq, "y:", jc, "index:", that.data.course_Table[xq][jc])
            }
            // console.log(that.data.course_Table)

            for (let xq = 0; xq < 7; xq++) {
              for (let jc = 0; jc < 4; jc++) {
                let no = that.data.course_Table[xq][jc]
                if (no >= 0) {
                  // console.log("no", that.data.course_JSON[no])
                  if (that.data.course_JSON[no].c_len == 3) {
                    let str = "course_Table[" + xq.toString() + "]" + "[" + (jc + 1).toString() + "]"
                    that.setData({
                      [str]: -3
                    })
                  } else if (that.data.course_JSON[no].c_len == 2) {
                    let str = "course_Table[" + xq.toString() + "]" + "[" + (jc + 1).toString() + "]"
                    that.setData({
                      [str]: -2
                    })
                  }
                }
              }
            }

          } catch (e) {
            console.log("同步更新失败", e)
          }
          wx.showToast({
            title: '课表同步完成',
            icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            duration: 2000
          })
          that.Course_CacheSaver()
        }
        // console.log(that.data.course_JSON)
      },
      fail: function(res) {
        wx.hideLoading()
        console.log("获取失败")
        that.requestFailed()
      },
      complete: function(res) {
        that.setData({
          reflash_status: true
        })
        wx.hideLoading()
        wx.stopPullDownRefresh();
      },
    })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "第1周",
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // wx.clearStorage()
    wx.showLoading({
      title: '加载中',
    })
    console.log("Timer:",this.GetTimer())
    this.setData({
      curIndexNav: -1,
      curPage: -1
    })
    //调用组件方法
    // this.setcolor = this.selectComponent("#course");
    // this.setcolor.setColor('#c3ccdb')
    // this.setOpacity(0.9)

    if (!this.Course_CacheLoader()) {
      if (this.Load_cache()) {
        this.Login_cas()
        this.week_changed()
      } else {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '本地无账号信息缓存，请跳转个人信息页配置',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: "../../otherPackages/pages/InfoConfigPage/InfoConfigPage",
              })

            } else {
              console.log('点击取消回调')

            }
          }
        })
      }
    } else {
      this.week_changed()
    }

    //顶部tab居中显示
    wx.createSelectorQuery().select(".nav").boundingClientRect((rect) => {
      this.data.scrollViewWidth = Math.round(rect.width)
    }).exec()
    wx.hideLoading()
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

  ResetPageinfo: function() {
    this.setData({
      curIndexNav: -1,
      curPage: -1,
    })
  },




  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("onPullDownRefresh")
    console.log("this.data")

    if (this.Load_cache()) {

      wx.showLoading({
        title: '获取登录信息中',
      })
      this.Login_cas()
      this.GetCourse()
      this.ResetPageinfo()
    } else {
      wx.stopPullDownRefresh();
      wx.showModal({
        title: '提示',
        content: '本地无账号信息缓存，请跳转个人信息页配置',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "../../otherPackages/pages/InfoConfigPage/InfoConfigPage",
            })
            return
          } else {
            console.log('点击取消回调')
            return
          }
        }
      })
    }
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