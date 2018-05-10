export default async (url = '', data = {}, type = 'GET', responseType = "json", method = 'fetch') => {
    type = type.toUpperCase()
  
    let dataStr = '' // 数据字符串拼接
    Object.keys(data).forEach(key => {
      dataStr += `${key}=${data[key]}&`
    })
    if (dataStr.length) {
      dataStr = dataStr.substr(0, dataStr.length - 1)
    }
    if (type === 'GET' && dataStr.length) {
      url = url + '?' + dataStr
    }
    if (window.fetch && method === 'fetch') { // window.fetch
      let requestConfig = {
        credentials: 'include',
        method: type,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'force-cache'
      }
      if (type === 'POST') {
        requestConfig.headers = {
          "Content-Type": "application/x-www-form-urlencoded"
        }
        // options.body = qs.stringify(request)
  
        Object.defineProperty(requestConfig, 'body', {
          // value: JSON.stringify(data)
          value: dataStr
        })
      }
      try {
        const response = await fetch(url, requestConfig)
        let responseResult;
        if (responseType === 'text') {
          responseResult = await response.text()
        } else {
          responseResult = await response.json()
          if (responseResult.status === 999999) {
            console.log("系统错误")
          }
        }
        // console.info(url)
        // console.log(responseResult)
  
        return responseResult
      } catch (error) {
        console.log("网络错误")
        throw new Error(error)
      }
    } else { // XMLHttpRequest
      return new Promise((resolve, reject) => {
        let requestObj = new XMLHttpRequest()
        let sendData = ''
        if (type === 'POST') {
          // sendData = JSON.stringify(data)
          sendData = dataStr
        }
        requestObj.open(type, url, true) // true规定请求是否异步
        requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        requestObj.send(sendData)
  
        requestObj.onreadystatechange = () => {
          if (requestObj.readyState === 4) { // 4 = 'loaded'
            if (requestObj.status === 200) { // 200 = OK
              let obj = requestObj.response
              if (typeof obj !== 'object' && responseType === 'json') {
                obj = JSON.parse(obj)
              }
              resolve(obj)
            } else {
              reject(requestObj)
            }
          }
        }
      })
    }
  }
  