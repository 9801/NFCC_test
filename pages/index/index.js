// index.js
const app = getApp()
// var nfcStatus = app.globalData.nfcStat
Page({
  /**数据库记录获取 */
  getDatabase: function() {
    const db = wx.cloud.database()
  },
  /**NFC读卡 */
  nfcRead: function() {
    console.log('nfc')
    const nfc = wx.getNFCAdapter()
    this.nfc = nfc
    let _this = this
    function discoverHandler(res) {
      console.log('discoverHandler', res)
      const data = new Uint8Array(res.id)
      let str = ""
      data.forEach(e => {
        let item = e.toString(16)
        if (item.length == 1) {
          item = '0' + item
        }
        item = item.toUpperCase()
        console.log(item)
        str += item
      })
      _this.setData({
        newCardCode: str
      })
      console.log(str)
      wx.showToast({
        title: '读取成功！' + str,
        icon: 'none'
      })
      /**对话框 */
      wx.showModal({
        title:'发现NFC标签',
        content:'这是您的矫治器吗？' + str,
        success:function(res){
          if(res.confirm){
            console.log('点击确定并上传数据')
            wx.cloud.callFunction({
              name: 'cloudadddata',
              data: {
                isWearing: true,
                num: 0 + 1,
                uidValue: str,
                updateTime: new Date(),
              },
            })
          }else if(res.cancel){
            console.log('点击取消')
          }else{
            console.log('出现异常')
          }
        }
      })
    }
    nfc.startDiscovery({
      success(res) {
        // nfcStatus = true
        console.log(res)
        wx.showToast({
          title: 'NFC读取功能已开启',
          icon: 'success'
        })
        nfc.onDiscovered(discoverHandler)
      },
      fail(err) {
        // nfcStatus = false
        console.log('failed to discover:', err)
        if(!err.errCode){
          wx.showToast({
            title: 'NFC功能异常:0',
            icon: 'error'
          })
          return
        }
        switch (err.errCode) {
          case 13000:
            wx.showToast({
              title: '设备不支持NFC:' + err.errCode.toString(),
              icon: 'error'
            })
          break;
          case 13001:
            wx.showToast({
              title: '系统NFC开关未打开:' + err.errCode.toString(),
              icon: 'error'
            })
          break;
          case 13019:
            wx.showToast({
            title: '用户未授权:' + err.errCode.toString(),
            icon: 'error'
            })
          break;
          case 13010:
            wx.showToast({
              title: '未知错误:' + err.errCode.toString(),
              icon: 'error'
            })
          break;
          case 13021:
            wx.showToast({
              title: 'NFC已打开:' + err.errCode.toString(),
              icon: 'success'
            })
          break;
          default:
            wx.showToast({
              title: '其他错误:' + err.errCode.toString(),
              icon: 'error'
            })
          break;
        }
      }
    })
  },
  
  onLoad() {
    this.nfcRead()
  }
})







