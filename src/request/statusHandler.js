// eslint-disable-next-line
export default {
  0: response => response,
  40101: (response) => {
    console.log('获取token失败')
  },
  // 企业
  'error': (response) => { // 其他错误
    console.log('error')
  },
  'timeout': () => {
    console.log('timeout')
  },
  'network': () => { // 服务器异常
    console.log('network')
  }
}
