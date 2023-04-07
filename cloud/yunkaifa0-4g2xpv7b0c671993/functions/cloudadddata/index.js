// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

/**/

const db = cloud.database()
const _ = db.command

/**/


// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('lists').add({
    data:{
      isWearing: event.isWearing,
      num: event.num,
      uidValue: event.uidValue,
      updateTime: event.updateTime
    }
  })

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}