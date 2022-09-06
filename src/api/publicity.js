import request from '@/utils/request'

// 列表
function posterList(params) {
    return request({
        url: '/activity/poster/list',
        method: 'get',
        params: params
    })
}
//新增
function posterInsert(data) {
    return request({
        url: '/activity/poster/insert',
        method: 'post',
        data
    })
}

//编辑
function posterUpdate(data) {
    return request({
        url: '/activity/poster/update',
        method: 'post',
        data
    })
}
//删除
function posterDelete(data) {
    return request({
        url: '/activity/poster/delete',
        method: 'post',
        data
    })
}
//恢复
function posterRecovery(data) {
    return request({
        url: '/activity/poster/recovery',
        method: 'post',
        data
    })
}
export default {
    posterList,
    posterInsert,
    posterUpdate,
    posterDelete,
    posterRecovery
}