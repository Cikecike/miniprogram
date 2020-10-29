// components/courseBlock.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cName: String,
    address: String,
    c_id: String,
    t_name: String,
    c_property:String,
    c_week:String,
    c_time:String,
    c_jc:String,
    t_title:String,



    _color: String,
    op: Number,
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
     * 生命周期函数--监听页面初次渲染完成
     */
  onReady: function () {
    //  页面初次渲染完成后，使用选择器选择组件实例节点，返回匹配到组件实例对象  
  },

  translator:function(){

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /*
    setColor: function () {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      var color_bg = 'rgb(' + r + ',' + g + ',' + b + ')';
      console.log(color_bg)
      this.data.background_color = color_bg
      console.log(this.data.background_color)
    }*/
    powerDrawer: function (e) {
      var currentStatu = e.currentTarget.dataset.statu;
      this.util(currentStatu)
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
    }
  }

})