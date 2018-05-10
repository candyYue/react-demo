import moment from 'moment'

// 时间格式化00:00
export const timeFormat=value=>{
    return moment(value*1000).format('mm:ss')
}