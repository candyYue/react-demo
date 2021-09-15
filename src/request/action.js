import api from './api'
import request from '../request'
export const getHotVideo = (data) => {
    return request(api.getVideo, data, 'post')
}

export const getRiskArea = () => {
    return request(api.getRiskArea,{key:'1b9dd1cf2597b9d407ef44c9a565b08a'})
}

export const getRisk = (data) => {
    return request(api.getRisk,data)
}