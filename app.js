// app.js

App({

  onLaunch() {

    if (!wx.cloud){
      console.error("不支持云服务");
    } else {
      wx.cloud.init({
        env: 'yunkaifa0-4g2xpv7b0c671993',
        traceUser: true,
      })
    }
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    nfcStat: false
  }
})
