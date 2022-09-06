import request from '@/utils/request'

// 获取商家信息
function getMerchant(params) {
  return request({
    url: '/shopset/merchant/',
    method: 'get',
    params: params
  })
}
// 获取商铺详情
function getShopDetail(params) {
  return request({
    url: '/shopset/shop/detail',
    method: 'get',
    params: params
  })
}
// 获取位置类型列表
function getPlaceType(params) {
  return request({
    url: '/shopset/placetype/list',
    method: 'get',
    params: params
  })
}
// 商家回复评论
function evaluateReply(data) {
  return request({
    url: '/evaluate/shop/reply',
    method: 'post',
    data
  })
}
// 店铺相册列表
function shopalbumList(params) {
  return request({
    url: '/shopset/shop/album/list',
    method: 'get',
    params: params
  })
}
// 相册类型列表
function shopalbumListTwo(params) {
  return request({
    url: '/shopset/placetype/album/list',
    method: 'get',
    params: params
  })
}
// 相册修改
function PhotoUpdate(data) {
  return request({
    url: '/shopset/shop/album/update',
    method: 'post',
    data
  })
}
// 相册添加
function PhotoInsert(data) {
  return request({
    url: '/shopset/shop/album/insert',
    method: 'post',
    data
  })
}
//分类相册上传
function PhotoInsertOne(data) {
  return request({
    url: '/shopset/placetype/album/insert',
    method: 'post',
    data
  })
}
// 相册删除
function PhotoDelete(data) {
  return request({
    url: '/shopset/shop/album/delete',
    method: 'post',
    data
  })
}
//删除座位相册
function PhotoDeleteTwo(data) {
  return request({
    url: '/shopset/placetype/album/delete',
    method: 'post',
    data
  })
}
//修改店铺相册排序
function PhotoSort(data) {
  return request({
    url: 'shopset/shop/album/update',
    method: 'post',
    data
  })
}
//修改座位相册排序
function PhotoSortOne(data) {
  return request({
    url: '/shopset/placetype/album/update',
    method: 'post',
    data
  })
}
// 座位管理列表
function placeList(params) {
  return request({
    url: '/shopset/place/list',
    method: 'get',
    params: params
  })
}
//回收站还原店铺
function shopRecovery(data) {
  return request({
    url: '/shopset/shop/recovery/',
    method: 'post',
    data
  })
}


//店铺导入列表，腾讯
function shopImportList(params) {
  return request({
    url: '/shopset/shop/import/list',
    method: 'get',
    params: params
  })
}

//店铺导入列表，高德
function shopImportGdList(params) {
  return request({
    url: '/shopset/shop/import/gd/list',
    method: 'get',
    params: params
  })
}


//导入商家,腾讯
function shopImportAdd(data) {
  return request({
    url: '/shopset/shop/import/add',
    method: 'post',
    data
  })
}

//导入商家,高德
function shopImportGdAdd(data) {
  return request({
    url: '/shopset/shop/import/gd/add',
    method: 'post',
    data
  })
}


//获得店铺视频上传的地址和凭证
function shopVideoGetAuth(data) {
  return request({
    url: '/shopset/shop/video/getAuth',
    method: 'post',
    data
  })
}

//新增店铺视频
function shopVideoInsert(data) {
  return request({
    url: '/shopset/shop/video/insert',
    method: 'post',
    data
  })
}

//获得视频列表
function shopVideoList(params) {
  return request({
    url: '/shopset/shop/video/list',
    method: 'get',
    params: params
  })
}
//店铺视频排序
function VideoSort(data) {
  return request({
    url: '/shopset/shop/video/setSort',
    method: 'post',
    data
  })
}

//删除视频
function shopVideoDelete(data) {
  return request({
    url: '/shopset/shop/video/delete',
    method: 'post',
    data
  })
}


//获得打印机型号列表
function printerBrandType(params) {
  return request({
    url: '/shopset/printer/brandType',
    method: 'get',
    params: params
  })
}


//setSort修改座位类型排序/shopset/placetype/setSort
function placetypeSetSort(data) {
  return request({
    url: '/shopset/placetype/setSort',
    method: 'post',
    data
  })
}

//setSort修改座位区域排序 
function placetareaSetSort(data) {
  return request({
    url: '/shopset/placearea/setSort',
    method: 'post',
    data
  })
}


//店铺控制台轮询消息 
function shopMainMessage(params) {
  return request({
    url: '/shopset/shop/main/message',
    method: 'get',
    params: params
  })
}
//店铺控制台获得座位详情/shopset/shop/main/placeDetail
function shopMainPlaceDetail(params) {
  return request({
    url: '/shopset/shop/main/placeDetail',
    method: 'get',
    params: params
  })
}

//预订/消费查看 /shopset/shop/main/placeReserve
function shopMainPlaceReserve(params) {
  return request({
    url: '/shopset/shop/main/placeReserve',
    method: 'get',
    params: params
  })
}

//当前营业时间座位最新消息/shopset/shop/main/placeCall
function shopMainPlaceCall(params) {
  return request({
    url: '/shopset/shop/main/placeCall',
    method: 'get',
    params: params
  })
}

//SetPlaceStatus设置座位状态/shopset/shop/main/setPlaceStatus
function shopMainSetPlaceStatus(data) {
  return request({
    url: '/shopset/shop/main/setPlaceStatus',
    method: 'post',
    data
  })
}


//设置预订审核方式 /shopset/shop/main/setReserveAudit
function shopMainSetReserveAudit(data) {
  return request({
    url: '/shopset/shop/main/setReserveAudit',
    method: 'post',
    data
  })
}

//查看排队/shopset/shop/main/placeQueue
function shopMainPlaceQueue(data) {
  return request({
    url: '/shopset/shop/main/placeQueue',
    method: 'post',
    data
  })
}


//通过座位号或手机号过滤座位/shopset/shop/main/filterPlace
function shopMainFilterPlace(params) {
  return request({
    url: '/shopset/shop/main/filterPlace',
    method: 'get',
    params: params
  })
}

//添加预订 /shopset/shop/main/reserveSubmit
function shopMainReserveSubmit(data) {
  return request({
    url: '/shopset/shop/main/reserveSubmit',
    method: 'post',
    data
  })
}


//SeeSVG查看商家平面图 /shopset/shop/main/seeSVG
function shopMainSeeSVG(params) {
  return request({
    url: '/shopset/shop/main/seeSVG',
    method: 'get',
    params: params
  })
}

//开台/shopset/shop/main/openTable
function shopMainOpenTable(data) {
  return request({
    url: '/shopset/shop/main/openTable',
    method: 'post',
    data
  })
}
//查询营销/shopset/shop/main/selectStaff
function shopMainSelectStaff(params) {
  return request({
    url: '/shopset/shop/main/selectStaff',
    method: 'get',
    params: params
  })
}
//筛选预订套餐/shopset/shop/main/findReserve
function shopMainFindReserve(params) {
  return request({
    url: '/shopset/shop/main/findReserve',
    method: 'get',
    params: params
  })
}



//商家入驻申请列表/cooperation/shop/list
function shopApply(params) {
  return request({
    url: '/cooperation/shop/list',
    method: 'get',
    params: params
  })
}

//处理商家入驻/cooperation/shop/handingApply
function shopHandingApply(data) {
  return request({
    url: '/cooperation/shop/handingApply',
    method: 'post',
    data
  })
}
//删除商家入驻/cooperation/shop/delete
function shopApplyDelete(data) {
  return request({
    url: '/cooperation/shop/delete',
    method: 'post',
    data
  })
}
//批量绑定座位分类 /shopset/place/bindType
function shopPlaceBindType(data) {
  return request({
    url: '/shopset/place/bindType',
    method: 'post',
    data
  })
}

//批量绑定座位区域 /shopset/place/bindArea
function shopPlaceBindArea(data) {
  return request({
    url: '/shopset/place/bindArea',
    method: 'post',
    data
  })
}

//用户拨打商家电话记录 /shopset/shop/shopPhone
function shopPhone(params) {
  return request({
    url: '/shopset/shop/shopPhone',
    method: 'get',
    params: params
  })
}
// 标签列表
function shopTagList(params) {
  return request({
    url: '/shopset/tag/list',
    method: 'get',
    params: params
  })
}
// 新建标签
function tagInsert(data) {
  return request({
    url: '/shopset/tag/insert',
    method: 'post',
    data
  })
}
// 修改标签
function tagUpdate(data) {
  return request({
    url: '/shopset/tag/update',
    method: 'post',
    data
  })
}
// 批量修改标签
function tagHandle(data) {
  return request({
    url: '/shopset/tag/handle',
    method: 'post',
    data
  })
}
// 删除标签
function tagDelete(data) {
  return request({
    url: '/shopset/tag/delete',
    method: 'post',
    data
  })
}
// 全部标签
function shopTagAll(params) {
  return request({
    url: '/shopset/shop/tag/all',
    method: 'get',
    params: params
  })
}
// 标签组列表
function shopTagGroupList(params) {
  return request({
    url: '/shopset/tag/group/list',
    method: 'get',
    params: params
  })
}
// 新建标签组
function tagGroupInsert(data) {
  return request({
    url: '/shopset/tag/group/insert',
    method: 'post',
    data
  })
}
// 修改标签组
function tagGroupUpdate(data) {
  return request({
    url: '/shopset/tag/group/update',
    method: 'post',
    data
  })
}
// 批量修改标签组
function tagGroupHandle(data) {
  return request({
    url: '/shopset/tag/group/handle',
    method: 'post',
    data
  })
}
// 删除标签组
function tagGroupDelete(data) {
  return request({
    url: '/shopset/tag/group/delete',
    method: 'post',
    data
  })
}
// 标签排序
function tagSetSort(data) {
  return request({
    url: '/shopset/tag/setSort',
    method: 'post',
    data
  })
}
// 设置店铺标签
function tagSetShop(data) {
  return request({
    url: '/shopset/shop/tag/setTags',
    method: 'post',
    data
  })
}

// 处理评论
function evaluateHandle(data) {
  return request({
    url: '/shopset/shop/evaluate/handle',
    method: 'post',
    data
  })
}

// 商家评论列表
function shopEvaluateList(params) {
  return request({
    url: '/shopset/shop/evaluate/list',
    method: 'get',
    params: params
  })
}
export default {
  getMerchant,
  getShopDetail,
  getPlaceType,
  evaluateReply,
  shopalbumList,
  shopalbumListTwo,
  PhotoSort,
  PhotoSortOne,
  VideoSort,
  PhotoUpdate,
  PhotoInsert,
  PhotoInsertOne,
  PhotoDelete,
  PhotoDeleteTwo,
  placeList,
  placetypeSetSort,
  placetareaSetSort,
  shopRecovery,
  shopImportList,
  shopImportGdList,
  shopImportAdd,
  shopImportGdAdd,
  shopVideoGetAuth,
  shopVideoInsert,
  shopVideoList,
  shopVideoDelete,
  getShopType,
  printerBrandType,

  shopMainMessage,
  shopMainPlaceDetail,
  shopMainPlaceReserve,
  shopMainPlaceCall,
  shopMainSetPlaceStatus,
  shopMainSetReserveAudit,
  shopMainPlaceQueue,
  shopMainFilterPlace,
  shopMainReserveSubmit,
  shopMainSeeSVG,
  shopMainOpenTable,
  shopMainSelectStaff,
  shopMainFindReserve,

  shopApply,
  shopHandingApply,
  shopApplyDelete,
  shopPlaceBindType,
  shopPlaceBindArea,
  shopPhone,
  shopMark,
  shopTagList,
  tagInsert,
  tagUpdate,
  tagHandle,
  tagDelete,
  shopTagAll,
  shopTagGroupList,
  tagGroupInsert,
  tagGroupUpdate,
  tagGroupHandle,
  tagGroupDelete,
  tagSetSort,
  tagSetShop,
  evaluateHandle,
  shopEvaluateList
}
// 获取商铺信息
export function getShopInfo(token, params) {
  return request({
    url: '/shopset/shop/list',
    method: 'get',
    params: params
  })
}
// 新增商铺
export function insertShop(token, data) {
  return request({
    url: '/shopset/shop/insert',
    method: 'post',
    data
  })
}
// 更新店铺信息
export function updateShop(token, data) {
  return request({
    url: '/shopset/shop/update',
    method: 'post',
    data
  })
}
// 删除店铺
export function deleteShop(token, data) {
  return request({
    url: '/shopset/shop/delete',
    method: 'post',
    data
  })
}


// 获取商铺类型
export function getShopType(token, params) {
  return request({
    url: '/shopset/shoptype/list',
    method: 'get',
    params: params
  })
}
// 获取商铺类型详情
export function getShopTypeDetail(token, params) {
  return request({
    url: '/shopset/shoptype/detail',
    method: 'get',
    params: params
  })
}
// 新增商铺类型
export function insertShopType(token, data) {
  return request({
    url: '/shopset/shoptype/insert',
    method: 'post',
    data
  })
}
// 更新店铺类型信息
export function updateShopType(token, data) {
  return request({
    url: '/shopset/shoptype/update',
    method: 'post',
    data
  })
}
// 删除店铺类型
export function deleteShopType(token, data) {
  return request({
    url: '/shopset/shoptype/delete',
    method: 'post',
    data
  })
}


// 获取商家信息
// export function getMerchant(token, params) {
//   return request({
//     url: '/shopset/merchant/',
//     method: 'get',
//     params: params
//   })
// }
// 获取商家详情
export function getMerchantDetail(token, params) {
  return request({
    url: '/shopset/merchant/detail',
    method: 'get',
    params: params
  })
}
// 新增商家
export function insertMerchant(token, data) {
  return request({
    url: '/shopset/merchant/insert',
    method: 'post',
    data
  })
}
// 更新商家信息
export function updateMerchant(token, data) {
  return request({
    url: '/shopset/merchant/update',
    method: 'post',
    data
  })
}
// 删除商家
export function deleteMerchant(token, data) {
  return request({
    url: '/shopset/merchant/delete',
    method: 'post',
    data
  })
}
// 获取上传文件STS
export function getFileSts() {
  return request({
    url: '/file/sts',
    method: 'get'
  })
}
// 获取二级城市列表
export function getCitySelectList(token, params) {
  return request({
    url: '/shopset/city/select',
    method: 'get',
    params: {
      'id': params
    }
  })
}

// 获取位置区域列表
export function getPlaceArea(token, params) {
  return request({
    url: '/shopset/placearea/list',
    method: 'get',
    params: params
  })
}
// 获取座位规则列表
export function getPlaceRule(token, params) {
  return request({
    url: '/shopset/placerule/list',
    method: 'get',
    params: params
  })
}
// 新增位置类型
export function createPlaceType(token, data) {
  return request({
    url: '/shopset/placetype/insert',
    method: 'post',
    data
  })
}
// 修改位置类型
export function updatePlaceType(token, data) {
  return request({
    url: '/shopset/placetype/update',
    method: 'post',
    data
  })
}

// 删除位置类型
export function deletePlaceType(token, data) {
  return request({
    url: '/shopset/placetype/delete',
    method: 'post',
    data
  })
}




// 新增位置区域
export function createPlaceArea(token, data) {
  return request({
    url: '/shopset/placearea/insert',
    method: 'post',
    data
  })
}

// 修改位置区域
export function updatePlaceArea(token, data) {
  return request({
    url: '/shopset/placearea/update',
    method: 'post',
    data
  })
}

// 删除位置区域
export function deletePlaceArea(token, data) {
  return request({
    url: '/shopset/placearea/delete',
    method: 'post',
    data
  })
}
// 座位规则新增
export function addPlaceRule(token, data) {
  return request({
    url: '/shopset/placerule/insert',
    method: 'post',
    data
  })
}
// 座位规则详情
export function getPlaceDetail(token, params) {
  return request({
    url: '/shopset/placerule/detail',
    method: 'get',
    params
  })
}
// 座位规则更新
export function updatPlace(token, data) {
  return request({
    url: '/shopset/placerule/update',
    method: 'post',
    data
  })
}
// 座位规则删除
export function deletePlace(token, data) {
  return request({
    url: '/shopset/placerule/delete',
    method: 'post',
    data
  })
}
// 座位管理新增
export function addPlaceList(token, data) {
  return request({
    url: '/shopset/place/insert',
    method: 'post',
    data
  })
}
// 座位管理更新
export function updatPlaceList(token, data) {
  return request({
    url: '/shopset/place/update',
    method: 'post',
    data
  })
}
// 座位管理批量更新
export function updatPlaceList_batch(token, data) {
  return request({
    url: '/shopset/place/batch',
    method: 'post',
    data
  })
}
// 座位管理删除
export function deletePlaceList(token, data) {
  return request({
    url: '/shopset/place/delete',
    method: 'post',
    data
  })
}
// 座位管理还原
export function recoveryPlaceList(token, data) {
  return request({
    url: '/shopset/place/recovery',
    method: 'post',
    data
  })
}
// 打印机列表
export function printerList(token, params) {
  return request({
    url: '/shopset/printer/list',
    method: 'get',
    params: params
  })
}

// 添加打印机
export function insertPrinter(token, data) {
  return request({
    url: '/shopset/printer/insert',
    method: 'post',
    data
  })
}

// 删除打印机
export function deletePrinter(token, data) {
  return request({
    url: '/shopset/printer/delete',
    method: 'post',
    data
  })
}

// 修改打印机
export function updatePrinter(token, data) {
  return request({
    url: '/shopset/printer/update',
    method: 'post',
    data
  })
}
// 获取店铺评论列表
export function evaluateList(token, params) {
  return request({
    url: '/evaluate/shop/',
    method: 'get',
    params: params
  })
}

// 获取店铺评论详情
export function evaluateDetail(token, params) {
  return request({
    url: '/evaluate/shop/detail',
    method: 'get',
    params: params
  })
}
// 店铺入驻备注
export function shopMark(data) {
  return request({
    url: '/cooperation/shop/mark',
    method: 'post',
    data
  })
}
