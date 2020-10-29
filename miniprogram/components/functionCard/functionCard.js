// components/functionCard/functionCard.js
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
    getcourse: function () {
      wx.switchTab({//只能跳转tab
        url: '../../pages/Course/Course',
      })
    },
    getscore: function () {
      wx.navigateTo({
        url: '../../otherPackages/pages/scoreBrowser/scoreBrowser',
      })
    },
  }
})
