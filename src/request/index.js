import axios from 'axios'
import errorHandler from './statusHandler'
import api from './api'

const CancelToken = axios.CancelToken
const sources = CancelToken.source()
const stringify = (data) => {
  let dataStr = ''
  if (data) {
    Object.keys(data).forEach(key => {
      dataStr += `${key}=${data[key]}&`
    })
    if (dataStr.length) {
      dataStr = dataStr.substr(0, dataStr.length - 1)
    }
  }
  return dataStr
}
const requestList = []
const Axios = axios.create({
  timeout: 60000
})

Axios.interceptors.request.use((config) => {
  let {
    url, data, headers, method
  } = config
  /**
   * 对请求方式的处理
   */
  method = method.toUpperCase()
  switch (method) {
    case 'POST': //  'POST'
      config.headers = Object.assign({}, {
        'Content-Type': 'application/x-www-form-urlencoded',
        'enctype': 'multipart/form-data'
      }, headers)
      if (config.headers['Content-Type'] === 'application/json') {
        config.data = data
      } else {
        const formData = new FormData()
        Object.entries(data).map((item) => {
          formData.append(item[0], item[1])
        })
        config.data = formData
      }
      break
    default: // 'GET'
      const dataStr = stringify(data)
      config.headers = Object.assign({}, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, headers)
      config.url = dataStr.length ? (url + '?' + dataStr) : url
  }

  /**
   * 对超时的处理
   */
  const timeoutList = { // 超时时间设置列表
  }
  let sliceEnd = url.indexOf('?') > -1 ? url.indexOf('?') : url.length
  config.timeout = timeoutList[url.slice(0, sliceEnd)] || config.timeout
  // console.log(url.slice(0, sliceEnd), '---', timeoutList[url.slice(0, sliceEnd)])

  /**
   * 对重复请求的处理 excludeList为不处理重复请求的请求列表
   */
  const excludeList = [
  ]
  const request = excludeList.includes(url) ? url : url + '?' + stringify(data)
  config.cancelToken = new CancelToken((cancel) => {
    sources[request] = cancel
  })
  if (requestList.includes(request)) {
    sources[request]('cancel request:' + request)
  } else {
    requestList.push(request)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// const ignoreStatus = [50113]
Axios.interceptors.response.use((response) => {
  const request = response.url + stringify(response.data)
  requestList.splice(requestList.findIndex(item => item === request), 1)
  const status = response.data.status
  if (errorHandler[status]) {
    errorHandler[status](response)
  } else {
    if (response.config.showError) {
      errorHandler['error'](response)
    }
  }
  return response
}, (error) => {
  const errorMsg = error.message
  if (axios.isCancel(error)) {
    throw new axios.Cancel(errorMsg)
  } else {
    requestList.length = 0
    if (errorMsg.includes('timeout')) {
      errorHandler['timeout']()
    } else {
      errorHandler['network']()
    }
  }
  return Promise.reject(error)
})

// eslint-disable-next-line
export default async (url = '', data = {}, method = 'GET', headers, opts = {
  showError: true
}) => {
  method = method.toUpperCase()
  const options = {
    method,
    url,
    data,
    mode: 'cors',
    cache: 'force-cache',
    credentials: 'include',
    showError: opts.showError,
    headers
  }
  const response = await Axios(options)
  return response.data
}
