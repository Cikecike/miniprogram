// components/Tabbar/Tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gethomepage:function(){
      wx.reLaunch({
        url: '../../pages/HomePage/HomePage',
      })
    },
    getcourse: function () {
      wx.reLaunch({
        url: '../../pages/Course/Course',
      })
    },
    getuserpage: function () {
      wx.reLaunch({
        url: '../../pages/userpage/userpage',
      })
    }

  }
})
