import request from '@/utils/request'

//组局列表
function groupGroupparty(params) {
    return request({
        url: '/groupparty/list',
        method: 'get',
        params
    })
}
//组局关闭
function groupDelete(data) {
    return request({
        url: '/groupparty/delete',
        method: 'post',
        data
    })
}
//组局恢复
function groupRecovery(data) {
    return request({
        url: '/groupparty/recovery',
        method: 'post',
        data
    })
}
//组局更新
function groupUpdate(data) {
    return request({
        url: '/groupparty/update',
        method: 'post',
        data
    })
}
//组局违规处理
function groupExamine(data) {
    return request({
        url: '/groupparty/examine',
        method: 'post',
        data
    })
}
//报名列表
function groupEnroll(params) {
    return request({
        url: '/groupparty/enroll/list',
        method: 'get',
        params
    })
}
//报名T除
function EnrollDelete(data) {
    return request({
        url: '/groupparty/enroll/delete',
        method: 'post',
        data
    })
}
//排行
function groupRank(params) {
    return request({
        url: '/groupparty/rank',
        method: 'get',
        params
    })
}
//通过审核
function EnrollAudit(data) {
    return request({
        url: '/groupparty/audit',
        method: 'post',
        data
    })
}
export default {
    groupGroupparty,
    groupDelete,
    groupRecovery,
    groupUpdate,
    groupEnroll,
    groupExamine,
    EnrollDelete,
    groupRank,
    EnrollAudit
}