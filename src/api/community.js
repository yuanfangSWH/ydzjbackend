import request from '@/utils/request'

// 帖子列表
function threadlist(params) {
  return request({
    url: '/community/thread/threadlist',
    method: 'get',
    params: params
  })
}
// 评论列表
function commentlist(params) {
  return request({
    url: '/community/comment/commentlist',
    method: 'get',
    params: params
  })
}
// 评论回复列表
function commentreply(params) {
  return request({
    url: '/community/comment/commentreply',
    method: 'get',
    params: params
  })
}
// 帖子详情
function threaddetail(params) {
  return request({
    url: '/community/thread/threaddetail',
    method: 'get',
    params: params
  })
}
// 审核待审核发帖、评论
function GiftInsert(data) {
  return request({
    url: '/community/thread/handling',
    method: 'post',
    data
  })
}
// 设置推荐
function tuijieSet(data) {
  return request({
    url: '/community/thread/set',
    method: 'post',
    data
  })
}
// 删除
function delHandles(data) {
  return request({
    url: '/community/thread/delete',
    method: 'post',
    data
  })
}

//视频导入列表，最右
function importList(params) {
  return request({
    url: '/community/import/list',
    method: 'get',
    params: params
  });
}
//加入视频采集队列，最右
function importAdd(data) {
  return request({
    url: '/community/import/add',
    method: 'post',
    data
  });
}

//视频导入列表，抖音
function dyimportList(params) {
  return request({
    url: '/community/dyimport/list',
    method: 'get',
    params: params
  });
}
//加入视频采集队列，抖音
function dyimportAdd(data) {
  return request({
    url: '/community/dyimport/add',
    method: 'post',
    data
  });
}

//修改外部导入发现数据的内容
function communityModify(data) {
  return request({
    url: '/community/thread/modify',
    method: 'post',
    data
  });
}
//审核评论
function communityAudit(data) {
  return request({
    url: '/community/comment/commentHandling',
    method: 'post',
    data
  });
}
//只看评论列表
function onlyCommunity(params) {
  return request({
    url: '/community/comment/commentOnly',
    method: 'get',
    params: params
  });
}

//资讯分类  /news/content/listclass
function newsListClass(params) {
  return request({
    url: '/news/content/listclass',
    method: 'get',
    params: params
  })
}

//资讯列表
function newsList(params) {
  return request({
    url: '/news/content/list',
    method: 'get',
    params: params
  })
}

//修改资讯分类 /news/content/updateclass
function newsUpdateClass(data) {
  return request({
    url: '/news/content/updateclass',
    method: 'post',
    data
  });
}
//添加资讯分类  /news/content/insertclass
function newsInsertClass(data) {
  return request({
    url: '/news/content/insertclass',
    method: 'post',
    data
  });
}

//删除资讯分类  /news/content/deleteclass
function newsDeleteClass(data) {
  return request({
    url: '/news/content/deleteclass',
    method: 'post',
    data
  });
}

//删除资讯  /news/content/delete
function newsDelete(data) {
  return request({
    url: '/news/content/delete',
    method: 'post',
    data
  });
}

//彻底删除资讯  /news/content/deleteforever
function newsRealDelete(data) {
  return request({
    url: '/news/content/deleteforever',
    method: 'post',
    data
  });
}

//恢复资讯  /news/content/recovery
function newsRecovery(data) {
  return request({
    url: '/news/content/recovery',
    method: 'post',
    data
  });
}

//媒体库分类  /news/content/media/listclass
function newsMediaClass(params) {
  return request({
    url: '/news/content/media/listclass',
    method: 'get',
    params: params
  })
}
//媒体库列表  /news/content/media/list
function newsMediaList(params) {
  return request({
    url: '/news/content/media/list',
    method: 'get',
    params: params
  })
}
//资讯评论列表 /news/comment/list
function newsCommentList(params) {
  return request({
    url: '/news/comment/list',
    method: 'get',
    params: params
  })
}

//处理资讯评论 /news/comment/handing
function newsCommentHanding(data) {
  return request({
    url: '/news/comment/handing',
    method: 'post',
    data
  });
}
export default {
  threadlist,
  commentlist,
  commentreply,
  threaddetail,
  GiftInsert,
  tuijieSet,
  delHandles,
  importList,
  importAdd,
  dyimportList,
  dyimportAdd,
  communityModify,
  communityAudit,
  onlyCommunity,
  newsListClass,
  newsList,
  newsUpdateClass,
  newsInsertClass,
  newsDeleteClass,
  newsDelete,
  newsRealDelete,
  newsRecovery,
  newsMediaClass,
  newsMediaList,
  newsCommentList,
  newsCommentHanding
}
