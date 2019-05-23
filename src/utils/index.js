function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime
}

export function promisify(original){
  return function(opt) {
    return new Promise((resolve, reject) => {
      opt = Object.assign({
        success: resolve,
        fail: reject
      }, opt)
      original(opt)
    })
  }
}

// 获取定位
export function getLocation(wx, options){
  return promisify(wx.getSetting)().then(res => {
    const scope = res.authSetting['scope.userLocation'];
    if (scope == undefined) {
      return promisify(wx.authorize)({
        scope: 'scope.userLocation'
      }).then(res => {
        return promisify(wx.getLocation)();
      });
    }else if(scope == false){
      wx.showModal({
        title: '是否授权当前位置',
        content: '需要获取您的地理位置，请确认授权，否则定位功能将无法使用',
        success: function (tip) {
          if (tip.confirm) {
            wx.openSetting({
              success(){
                return promisify(wx.getLocation)();
              }
            });
          }
        }
      });
    }else{
      return promisify(wx.getLocation)();
    }
  });
}

