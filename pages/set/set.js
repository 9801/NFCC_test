// pages/set/set.js
const app = getApp()
var nfcStatus = app.globalData.nfcStat
var pageData = {
  data: {
    switch1Checked: nfcStatus,
    switch2Checked: false,
    switch1Style: '',
    switch2Style: 'text-decoration: line-through'
  }
}
for (var i = 1; i <= 2; ++i) {
  (function (index) {
    pageData[`switch${index}Change`] = function (e) {
      console.log(`switch${index}发生change事件，携带值为`, e.detail.value)
      var obj = {}
      obj[`switch${index}Checked`] = e.detail.value
      this.setData(obj)
      obj = {}
      obj[`switch${index}Style`] = e.detail.value ? '' : 'text-decoration: line-through'
      this.setData(obj)
    }
  })(i)
}

Page(
  pageData,
  {

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
  },

  connectWifi:function() {
    var that = this;
    //检测手机型号
    wx.getSystemInfo({
      success: function(res) {
        var system = '';
        if (res.platform == 'android') system = parseInt(res.system.substr(8));
        if (res.platform == 'ios') system = parseInt(res.system.substr(4));
        if (res.platform == 'android' && system < 6) {
            wx.showToast({
                title: '手机版本不支持',
                })
                return
            }
            if (res.platform == 'ios' && system < 11.2) {
                wx.showToast({
                    title: '手机版本不支持',
                })
                return
            }
            //2.初始化 Wi-Fi 模块
            that.startWifi();
        }
    })
},
//初始化 Wi-Fi 模块
startWifi: function() {
  var that=this
  wx.startWifi({
    success: function() {
      //请求成功连接Wifi
      that.Connected();
    },
    fail: function(res) {
      // this.setData({
        wx.showToast({
          title: '接口调用失败',
        })
      // })
    }
  })
},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})


