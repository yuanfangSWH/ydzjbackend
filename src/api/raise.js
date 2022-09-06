import request from '@/utils/request'

//报名列表
function raiseEnroll(params) {
    return request({
        url: '/crow/enroll/list',
        method: 'get',
        params
    })
}
//报名关闭
function EnrollDelete(data) {
    return request({
        url: '/crow/enroll/delete',
        method: 'post',
        data
    })
}
//拼桌列表
function raiseList(params) {
    return request({
        url: '/crow/list',
        method: 'get',
        params
    })
}
//拼桌关闭
function raiseDelete(data) {
    return request({
        url: '/crow/delete',
        method: 'post',
        data
    })
}
//拼桌打开
function raiseRecovery(data) {
    return request({
        url: '/crow/recovery',
        method: 'post',
        data
    })
}
//拼桌修改
function raiseUpdate(data) {
    return request({
        url: '/crow/update',
        method: 'post',
        data
    })
}
//拼桌列表
function groupChatData(params) {
    return request({
        url: '/crow/groupAdminInfo',
        method: 'get',
        params
    })
}
//拼桌排行
function raiseRank(params) {
    return request({
        url: '/crow/rank',
        method: 'get',
        params
    })
}
export default {
    raiseList,
    raiseDelete,
    raiseUpdate,
    raiseEnroll,
    EnrollDelete,
    raiseRecovery,
    groupChatData,
    raiseRank
}