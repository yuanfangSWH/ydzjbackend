import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('@/views/login/index')
const forgotPsw = () => import('@/views/forgotPsw/index')
const nofound404 = () => import('@/views/404')
const blank = () => import('@/views/blank')
const Layout = () => import('@/layout')

const homeIndex = () => import('@/views/home/index')

//店铺管理
const BusinessEdit = () => import('@/views/shopset/BusinessEdit')
const ShopEdit = () => import('@/views/shopset/ShopEdit')
const ShopType = () => import('@/views/shopset/ShopType')
const ShopInfo = () => import('@/views/shopset/ShopInfo')
const ShopImport = () => import('@/views/shopset/shopImport')
const printerManage = () => import('@/views/shopset/PrinterManage')
const placeManage = () => import('@/views/shopset/Placeindex')
const PhotoList = () => import('@/views/shopset/PhotoList')
const evaluateShopEdit = () => import('@/views/evaluate/EvaluateShopEdit')
const evaluateShopDetail = () => import('@/views/evaluate/EvaluateShopDetail')
const ShopPhone = () => import('@/views/shopset/ShopPhone')
const ShopTag = () => import('@/views/shopset/shoptag')
const ShopEvaluate = () => import('@/views/shopset/shopComment')
//员工管理
const StaffMenu = () => import('@/views/staff/StaffMenu')
const StaffRole = () => import('@/views/staff/StaffRole')
const StaffUser = () => import('@/views/staff/StaffUser')
const StaffDept = () => import('@/views/staff/StaffDept')
//商品管理
const Goods = () => import('@/views/goods/GoodsGoodsindex')
const addGoods = () => import('@/views/goods/addGoods')
const addGroupGoods = () => import('@/views/goods/addGroupGoods')
const editGoods = () => import('@/views/goods/editGoods')
const editGroupGoods = () => import('@/views/goods/editGroupGoods')
const GroupBuyindex = () => import('@/views/goods/GroupBuyindex')
const addGroupBuy = () => import('@/views/goods/addGroupBuy')
const editGroupBuy = () => import('@/views/goods/editGroupBuy')
const goodsClass = () => import('@/views/goods/GoodsClassindex')
const Consoler = () => import('@/views/shopset/Consoler') //控制台
const PictureStore = () => import('@/views/goods/pictureStore')
//订单
const newOrder = () => import('@/views/reserve/ReserveOptindex')
const orderDatile = () => import('@/views/reserve/orderDetaile')
const groupBuyDetaile = () => import('@/views/reserve/groupBuyDetaile')
const billDetail = () => import('@/views/reserve/billDetail')
const reserveData = () => import('@/views/reserve/reserveData')
//用户管理
const UserInformation = () => import('@/views/user/UserInformation')
const UserDetails = () => import('@/views/user/UserDetails')
const billY = () => import('@/views/user/billY')
const billD = () => import('@/views/user/billD')
const UserProfessional = () => import('@/views/user/UserProfessional')
const UserTag = () => import('@/views/user/UserTag')
const UserComments = () => import('@/views/user/UserComments')
const UserReport = () => import('@/views/user/UserReport')
const ReportData = () => import('@/views/user/ReportData')
const UserBill = () => import('@/views/user/UserBill')
const UserRefund = () => import('@/views/user/UserRefund')
const UserReserve = () => import('@/views/user/UserReserve')
const UserGift = () => import('@/views/user/UserGift')
const UserMessage = () => import('@/views/user/UserMessage')
const UserCoupon = () => import('@/views/user/UserCoupon')
const UserImport = () => import('@/views/user/UserImport')
//组局
const GroupEetail = () => import('@/views/group/GroupEetail')
const GroupEnroll = () => import('@/views/group/GroupEnroll')
const GroupRank = () => import('@/views/group/groupRank')
//拼桌
const RaiseCrow = () => import('@/views/raise/RaiseCrow')
const RaiseErroll = () => import('@/views/raise/RaiseErroll')
const groupChat = () => import('@/views/raise/groupChat')
const RaiseRank = () => import('@/views/raise/raiseRank')

// 活动管理
const Activity = () => import('@/views/ActivityManager/activity')
const lauser = () => import('@/views/ActivityManager/lauser')
const lauserDetail = () => import('@/views/ActivityManager/lauserDetail')
const publicity = () => import('@/views/ActivityManager/publicity')
//礼物
const GiftList = () => import('@/views/gift/GiftList')
const GiftDetailed = () => import('@/views/gift/GiftDetailed')
//社区
const threadlistList = () => import('@/views/community/threadlistList')
const threadPassList = () => import('@/views/community/threadPassList')
const threadDetail = () => import('@/views/community/threadDetail')
const commentlist = () => import('@/views/community/commentlist')
const commentreply = () => import('@/views/community/commentreply')
const importList = () => import('@/views/community/importList')
const dyimportList = () => import('@/views/community/dyimportList')
const commentTemporary = () => import('@/views/community/commentTemporary') //--小艳
const NewsContent = () => import('@/views/community/news')
const addInformation = () => import('@/views/community/addInformation')
const mediaStroe = () => import('@/views/community/mediaStroe')
const editorInformation = () => import('@/views/community/editorInformation')
const NewsComment = () => import('@/views/community/newsComment')
//管理员
const adminDept = () => import('@/views/adminvip/adminDept')
const adminRole = () => import('@/views/adminvip/adminRole')
const adminUser = () => import('@/views/adminvip/adminUser')
const changePassword = () => import('@/views/adminvip/changePassword')
//顾客
const customerList = () => import('@/views/customer/customerList')
//配置
const errorSystem = () => import('@/views/log/errorSystem')
const iosSystem = () => import('@/views/system/iosSystem')
const adminLog = () => import('@/views/log/adminLog')
const adminLogin = () => import('@/views/log/adminLogin')
const userLogin = () => import('@/views/log/userLogin')
const SystemPush = () => import('@/views/system/systemPush')
const SystemYD = () => import('@/views/system/systemYD')
const ArticleYD = () => import('@/views/system/articleYD')
const Message = () => import('@/views/system/message')
const ArticleSet = () => import('@/views/system/systemGuide')
const articleGuide = () => import('@/views/system/articleGuide')
const Target = () => import('@/views/system/targetPush')
//文章
const articleManage = () => import('@/views/articleManage/articleManage')
const articleDetile = () => import('@/views/articleManage/articleDetile')
const articleOperation = () => import('@/views/articleManage/articleOperation ')
// APP包管理
const appList = () => import('@/views/appmanage/applist')
const AddApp = () => import('@/views/appmanage/addApp')
const EditApp = () => import('@/views/appmanage/editApp')
const buttonList = () => import('@/views/appmanage/buttonList')
const AddButton = () => import('@/views/appmanage/addButton')
const EditButton = () => import('@/views/appmanage/editButton')
const FeedBack = () => import('@/views/appmanage/feedback')
//广告位
const advertisePlace = () => import('@/views/advertisePlace/advertisePlace')
// const advertiseEdit = () => import('@/views/advertisePlace/advertiseEdit')
// const advertisePlaceDetail = () => import('@/views/advertisePlace/advertisePlaceDetail')
const advertiseManage = () => import('@/views/advertiseManage/advertiseManage')
// 计划任务
const PlanList = () => import('@/views/planwork/planList')
// 举报管理
const ReportList = () => import('@/views/reportManage/reportList')
const ShopCorrect = () => import('@/views/correct/correct')
//账单变化
const topup = () => import('@/views/billChange/topup')
const withdrawal = () => import('@/views/billChange/withdrawal')
const YBchange = () => import('@/views/billChange/YBchange')
const DBchange = () => import('@/views/billChange/DBchange')
//订单
const bookingList = () => import('@/views/booking/bookingList')
// 数据中心
const ReserveRecord = () => import('@/views/record/reserve')
const RegisterData = () => import('@/views/record/register')
const RechargeData = () => import('@/views/record/recharge')
const CashData = () => import('@/views/record/cash')
const GroupPartyData = () => import('@/views/record/groupParty')
const CrowFundingData = () => import('@/views/record/crowdfunding')
const CouponData = () => import('@/views/record/coupon')
// 商务合作
const ShopApply = () => import('@/views/shopset/ShopApply')
const MarketingApply = () => import('@/views/cooperation/MarketingApply')
const AdCooperation = () => import('@/views/cooperation/pubs')


//积分
const pointLog = () => import('@/views/point/log')
const pointMall = () => import('@/views/point/mall')
const pointExchange = () => import('@/views/point/exchange')
Vue.use(Router)

/* Layout */

export const constantRoutes = [{
    path: '/login',
    component: login,
    hidden: true
  },

  {
    path: '/forgot',
    component: forgotPsw,
    hidden: true
  },

  {
    path: '/404',
    component: nofound404,
    hidden: true
  },
  {
    path: '/blank',
    component: blank,
    hidden: true
  },
  {
    path: '/',
    name: 'home',
    menuName: 'OverView',
    redirect: '/homeIndex',
    component: Layout,
    meta: {
      title: '',
      requireAuth: true,
      icon: 'dashboard'
    },
    children: [{
      path: '/homeIndex',
      name: 'HomeIndex',
      menuName: 'OverViewList',
      component: homeIndex,
      meta: {
        title: '概览',
        icon: 'overview'
      }
    }, ]
  },
  /* 订单 */
  {
    path: '/boo',
    name: 'boo',
    hidden: false,
    menuName: "Reserve",
    redirect: '/bookingList',
    component: Layout,
    meta: {
      title: '订单',
      requireAuth: true,
      icon: 'el-icon-document'
    },
    children: [{
      path: '/bookingList',
      name: 'Booking',
      menuName: "reserveList",
      hidden: false,
      component: bookingList,
      meta: {
        title: '订单',
        icon: 'el-icon-document'
      }
    }]
  },
  /* 社区 */
  {
    path: '/threadlist',
    name: 'threadlist',
    menuName: "CommunityManager",
    hidden: false,
    redirect: '/threadPassList',
    component: Layout,
    meta: {
      title: '发现',
      requireAuth: true,
      icon: 'find'
    },
    children: [{
        path: '/threadlistList',
        name: 'threadlistList',
        hidden: true,
        component: threadlistList,
        meta: {
          title: '动态审核',
        }
      }, {
        path: '/threadPassList',
        name: 'threadPassList',
        menuName: "CommunityThread",
        hidden: false,
        component: threadPassList,
        meta: {
          title: '动态列表',
        }
      }, {
        path: '/commentTemporary',
        name: 'commentTemporary',
        menuName: "CommunityComment",
        hidden: false,
        component: commentTemporary,
        meta: {
          title: '评论审核',
        }
      },
      {
        path: '/dyimportList',
        name: 'dyimportList',
        menuName: 'CommunityDYImport',
        hidden: false,
        component: dyimportList,
        meta: {
          title: 'DY导入',
        }
      }, {
        path: '/importList',
        name: 'importList',
        menuName: 'CommunityImport',
        hidden: true,
        component: importList,
        meta: {
          title: 'ZY导入',
        }
      }, {
        path: '/commentlist',
        name: 'commentlist',
        hidden: true,
        component: commentlist,
        meta: {
          title: '评论列表',
        }
      }
    ]
  },
  /* 社区子分支 */
  {
    path: '/comment',
    name: 'Commentlist',
    hidden: true,
    redirect: '/commentlist',
    component: Layout,
    meta: {
      title: '评论列表',
      requireAuth: true,
      icon: 'dashboard'
    },
    children: [{
      path: '/commentreply',
      name: 'commentreply',
      hidden: true,
      component: commentreply,
      meta: {
        title: '回复评论列表',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/threadlistList',
    name: 'threadMenu',
    hidden: true,
    redirect: '/threadlistList',
    component: Layout,
    meta: {
      title: '发现',
      requireAuth: true,
      icon: 'dashboard'
    },
    children: [{
      path: '/threadlistList/threadDetail',
      name: 'threadDetail',
      hidden: true,
      component: threadDetail,
      meta: {
        title: '发现详情',
        icon: 'dashboard'
      }
    }]
  },
  /* 礼物 */
  {
    path: '/Gift',
    name: 'giftList',
    menuName: 'GiftManage',
    hidden: false,
    redirect: '/GiftList',
    component: Layout,
    meta: {
      title: '礼物',
      requireAuth: true,
      icon: 'gift'
    },
    children: [{
        path: '/GiftList',
        name: 'GiftList',
        menuName: 'Gift',
        hidden: false,
        component: GiftList,
        meta: {
          title: '礼物列表',
        }
      },
      {
        path: '/GiftDetailed',
        name: 'GiftDetailed',
        menuName: 'GiftHistory',
        hidden: false,
        component: GiftDetailed,
        meta: {
          title: '购买记录',
        }
      }
    ]
  },
  /* 账单变化 */
  {
    path: '/topuplist',
    name: 'Topup',
    menuName: 'BillManage',
    hidden: false,
    redirect: '/topup',
    component: Layout,
    meta: {
      title: '账变',
      requireAuth: true,
      icon: 'zdbianh'
    },
    children: [{
      path: '/topup',
      name: 'topup',
      menuName: 'BillRecharge',
      hidden: false,
      component: topup,
      meta: {
        title: '充值记录',
      }
    }, {
      path: '/withdrawal',
      name: 'withdrawal',
      menuName: 'Cash',
      hidden: false,
      component: withdrawal,
      meta: {
        title: '提现申请',
      }
    }, {
      path: '/YBchange',
      name: 'YBchange',
      menuName: 'CurrencyDetail',
      hidden: false,
      component: YBchange,
      meta: {
        title: 'Y币账变',
      }
    }, {
      path: '/DBchange',
      name: 'DBchange',
      menuName: 'IncomeDetail',
      hidden: false,
      component: DBchange,
      meta: {
        title: '酒力账变',
      }
    }]
  },
  /* 拼桌 */
  {
    path: '/raisecrow',
    name: 'raiseCrow',
    menuName: "CrowFundingManager",
    hidden: false,
    redirect: '/RaiseCrow',
    component: Layout,
    meta: {
      title: '拼桌',
      requireAuth: true,
      icon: 'table1'
    },
    children: [{
        path: '/RaiseCrow',
        name: 'RaiseCrow',
        menuName: "CrowFunding",
        hidden: false,
        component: RaiseCrow,
        meta: {
          title: '拼桌列表'
        }
      },
      {
        path: '/RaiseErroll',
        name: 'RaiseErroll',
        hidden: true,
        component: RaiseErroll,
        meta: {
          title: '拼桌报名'
        }
      },
      {
        path: '/GroupChat',
        name: 'groupChat',
        hidden: true,
        component: groupChat,
        meta: {
          title: '拼桌群聊'
        }
      },
      {
        path: '/crow/rank',
        name: 'raiseRank',
        menuName: "CrowFundingRank",
        hidden: false,
        component: RaiseRank,
        meta: {
          title: '排行榜'
        }
      }
    ]
  },
  /* 组局 */
  {
    path: '/Eetail',
    name: 'groupEetail',
    hidden: false,
    menuName: "GroupPartyManage",
    redirect: '/GroupEetail',
    component: Layout,
    meta: {
      title: '组局',
      requireAuth: true,
      icon: 'Organization'
    },
    children: [{
        path: '/GroupEetail',
        name: 'GroupEetail',
        menuName: "GroupParty",
        hidden: false,
        component: GroupEetail,
        meta: {
          title: '组局列表'
        }
      },
      {
        path: '/GroupEnroll',
        name: 'GroupEnroll',
        hidden: true,
        component: GroupEnroll,
        meta: {
          title: '组局报名'
        }
      },
      {
        path: '/groupparty/rank',
        name: 'groupRank',
        menuName: "GroupPartyRank",
        hidden: false,
        component: GroupRank,
        meta: {
          title: '排行榜'
        }
      }
    ]
  },
  /* 活动管理 */
  {
    path: '/ActivityManager',
    name: 'ActivityManager',
    hidden: false,
    redirect: '/activity',
    menuName: 'ActivityManager',
    component: Layout,
    meta: {
      title: '活动管理',
      requireAuth: true,
      icon: 'el-icon-goblet'
    },
    children: [{
        path: '/activity',
        name: 'activity',
        hidden: false,
        menuName: 'Activity',
        component: Activity,
        meta: {
          title: '活动列表'
        }
      }, {
        path: '/lauser',
        name: 'lauser',
        hidden: false,
        menuName: 'InvitateActivity',
        component: lauser,
        meta: {
          title: '活动用户'
        }
      },
      {
        path: '/lauserDetail',
        name: 'lauserDetail',
        hidden: true,
        component: lauserDetail,
        meta: {
          title: '详情'
        }
      }, {
        path: '/publicity',
        name: 'publicity',
        hidden: false,
        menuName: 'ActivityPoster',
        component: publicity,
        meta: {
          title: '海报管理'
        }
      }
    ]
  },
  /* 用户列表 */
  {
    path: '/user',
    name: 'userInformation',
    menuName: 'AppUserManage',
    hidden: false,
    redirect: '/UserInformation',
    component: Layout,
    meta: {
      title: '用户',
      requireAuth: true,
      icon: 'user1'
    },
    children: [{
        path: '/UserInformation',
        name: 'UserInformation',
        menuName: 'AppUserUser',
        hidden: false,
        component: UserInformation,
        meta: {
          title: '用户列表',
        }
      },
      {
        path: '/UserMessage',
        name: 'UserMessage',
        hidden: true,
        component: UserMessage,
        meta: {
          title: '用户通知',
        }
      },
      {
        path: '/UserCoupon',
        name: 'UserCoupon',
        hidden: true,
        component: UserCoupon,
        meta: {
          title: 'Ta的优惠券',
        }
      },
      {
        path: '/UserProfessional',
        name: 'UserProfessional',
        menuName: 'Industry',
        hidden: false,
        component: UserProfessional,
        meta: {
          title: '行业职业',
        }
      },
      {
        path: '/UserTag',
        name: 'UserTag',
        menuName: 'Tag',
        hidden: false,
        component: UserTag,
        meta: {
          title: '用户标签',
        }
      },
      {
        path: '/UserImport',
        name: 'UserImport',
        menuName: 'UserImport',
        hidden: false,
        component: UserImport,
        meta: {
          title: '用户导入',
        }
      },
      {
        path: '/UserComments',
        name: 'UserComments',
        hidden: true,
        component: UserComments,
        meta: {
          title: '用户评论',
        }
      },
      {
        path: '/UserReport',
        name: 'UserReport',
        hidden: true,
        component: UserReport,
        meta: {
          title: '用户举报',
        }
      }, {
        path: '/ReportData',
        name: 'ReportData',
        hidden: true,
        component: ReportData,
        meta: {
          title: '举报详情',
        }
      },

    ]
  },
  /* 用户信息子分支 */
  {
    path: '/UserInformation',
    name: 'formation',
    hidden: true,
    redirect: '/UserInformation',
    component: Layout,
    meta: {
      title: '用户信息',
      requireAuth: true,
      icon: 'dashboard'
    },
    children: [{
        path: '/UserDetails',
        name: 'UserDetails',
        hidden: true,
        component: UserDetails,
        meta: {
          title: '用户详情',
          icon: 'dashboard'
        }
      },
      {
        path: '/billY',
        name: 'billY',
        hidden: true,
        component: billY,
        meta: {
          title: 'Y币帐变',
          icon: 'dashboard'
        }
      }, {
        path: '/billD',
        name: 'billD',
        hidden: true,
        component: billD,
        meta: {
          title: '酒力帐变',
          icon: 'dashboard'
        }
      },
      {
        path: '/UserBill',
        name: 'UserBill',
        hidden: true,
        component: UserBill,
        meta: {
          title: '用户账单记录',
          icon: 'dashboard'
        }
      },
      {
        path: '/UserRefund',
        name: 'UserRefund',
        hidden: true,
        component: UserRefund,
        meta: {
          title: '用户退款记录',
          icon: 'dashboard'
        }
      },
      {
        path: '/UserReserve',
        name: 'UserReserve',
        hidden: true,
        component: UserReserve,
        meta: {
          title: '用户预订记录',
          icon: 'dashboard'
        }
      }, {
        path: '/UserGift',
        name: 'UserGift',
        hidden: true,
        component: UserGift,
        meta: {
          title: '礼物记录',
          icon: 'dashboard'
        }
      },
    ]
  },
  {
    path: '/shop',
    name: 'Shop',
    menuName: 'MerchantManage',
    hidden: false,
    redirect: '/shopType',
    component: Layout,
    meta: {
      title: '店铺',
      requireAuth: true,
      icon: 'business'
    },
    children: [{
        path: '/shopType',
        name: 'ShopType',
        menuName: 'ShopType',
        hidden: false,
        component: ShopType,
        meta: {
          title: '商家类型',
        }
      },
      {
        path: '/shopEdit',
        name: 'ShopEdit',
        menuName: 'Shop',
        hidden: false,
        component: ShopEdit,
        meta: {
          title: '商家列表',
        }
      }, {
        path: '/shopImport',
        name: 'ShopImport',
        menuName: 'ShopImport',
        hidden: false,
        component: ShopImport,
        meta: {
          title: '商家导入',
        }
      },
      {
        path: '/shopPhone',
        name: 'ShopPhone',
        menuName: 'ShopImport', //暂时使用店铺导入
        hidden: false,
        component: ShopPhone,
        meta: {
          title: '电话记录',
        }
      },
      {
        path: '/shopset/tag',
        name: 'ShopTagindex',
        menuName: 'ShopTag',
        hidden: false,
        component: ShopTag,
        meta: {
          title: '标签管理',
        }
      }, {
        path: '/shopset/shop/evaluate',
        name: 'ShopEvaluateindex',
        menuName: 'ShopEvaluate',
        hidden: false,
        component: ShopEvaluate,
        meta: {
          title: '商家评论',
        }
      }
    ]
  },
  /* 店铺管理子分支 */
  {
    path: '/shopEdit',
    name: 'shopEdit',
    hidden: true,
    redirect: '/shopEdit',
    component: Layout,
    meta: {
      title: '店铺列表',
      requireAuth: true,
      icon: 'dashboard'
    },
    children: [{
        path: '/goods',
        name: 'Goods',
        hidden: true,
        component: Goods,
        meta: {
          title: '商品管理',
          icon: 'dashboard'
        }
      },
      {
        path: '/ShopInfo',
        name: 'ShopInfo',
        hidden: true,
        component: ShopInfo,
        meta: {
          title: '店铺详情',
          icon: 'dashboard'
        }
      },
      {
        path: '/consoler',
        name: 'Consoler',
        hidden: true,
        component: Consoler,
        meta: {
          title: '店铺控制台',
        }
      },
      {
        path: '/PhotoList',
        name: 'PhotoList',
        hidden: true,
        component: PhotoList,
        meta: {
          title: '商品相册',
          icon: 'dashboard'
        }
      },
      {
        path: '/GroupBuyindex',
        name: 'GroupBuyindex',
        hidden: true,
        component: GroupBuyindex,
        meta: {
          title: '预定套餐',
          icon: 'dashboard'
        }
      },
      {
        path: '/printer',
        name: 'PrinterManage',
        hidden: true,
        component: printerManage,
        meta: {
          title: '店铺打印机',
          icon: 'dashboard'
        }
      },
      {
        path: '/placeManage',
        name: 'PlaceManage',
        hidden: true,
        component: placeManage,
        meta: {
          title: '座位管理',
          icon: 'dashboard'
        }
      },
      {
        path: '/evaluateShopEdit',
        name: 'EvaluateShopEdit',
        hidden: true,
        component: evaluateShopEdit,
        meta: {
          title: '店铺评论',
          icon: 'dashboard'
        }
      },
      {
        path: '/newOrder',
        name: 'NewOrder',
        hidden: true,
        component: newOrder,
        meta: {
          title: '订单管理',
          icon: 'dashboard'
        }
      },
      {
        path: '/staffUser',
        name: 'StaffUser',
        hidden: true,
        component: StaffUser,
        meta: {
          title: '员工',
          icon: 'dashboard'
        }
      },
      {
        path: '/staffRole',
        name: 'StaffRole',
        hidden: true,
        component: StaffRole,
        meta: {
          title: '员工角色',
          icon: 'dashboard'
        }
      },
      {
        path: '/staffDept',
        name: 'StaffDept',
        hidden: true,
        component: StaffDept,
        meta: {
          title: '部门',
          icon: 'dashboard'
        }
      }, {
        path: '/addGoods',
        name: 'addGoods',
        hidden: true,
        component: addGoods,
        meta: {
          title: '添加商品',
          icon: 'dashboard'
        }
      },
      {
        path: '/addGroupGoods',
        name: 'addGroupGoods',
        hidden: true,
        component: addGroupGoods,
        meta: {
          title: '添加商品套餐',
          icon: 'dashboard'
        }
      },
      {
        path: '/editGoods',
        name: 'editGoods',
        hidden: true,
        component: editGoods,
        meta: {
          title: '编辑商品',
          icon: 'dashboard'
        }
      },
      {
        path: '/editGroupGoods',
        name: 'editGroupGoods',
        hidden: true,
        component: editGroupGoods,
        meta: {
          title: '编辑商品套餐',
          icon: 'dashboard'
        }
      }, {
        path: '/addGroupBuy',
        name: 'addGroupBuy',
        hidden: true,
        component: addGroupBuy,
        meta: {
          title: '添加团购套餐',
          icon: 'dashboard'
        }
      },
      {
        path: '/editGroupBuy',
        name: 'editGroupBuy',
        hidden: true,
        component: editGroupBuy,
        meta: {
          title: '编辑团购套餐',
          icon: 'dashboard'
        }
      },
      {
        path: '/pictureStroe',
        name: 'pictureStroe',
        hidden: true,
        component: PictureStore,
        meta: {
          title: '商品图库'
        }
      },
    ]
  },
  /* 店铺评论 */
  {
    path: '/evaluateShopEdit',
    name: 'evaluateShopEdit',
    hidden: true,
    redirect: '/evaluateShopEdit',
    component: Layout,
    meta: {
      title: '店铺评论',
      requireAuth: true,
      icon: 'dashboard'
    },
    children: [{
      path: '/evaluateShopDetail',
      name: 'EvaluateShopDetail',
      hidden: true,
      component: evaluateShopDetail,
      meta: {
        title: '评论详情',
        icon: 'dashboard'
      }
    }, ]
  },
  /* 商品管理 */
  {
    path: '/goods',
    name: 'goods',
    hidden: true,
    redirect: '/goods',
    component: Layout,
    meta: {
      title: '商品管理',
      requireAuth: true,
      icon: 'dashboard'
    },
    children: [{
        path: 'addGoods',
        name: 'addGoods',
        hidden: true,
        component: addGoods,
        meta: {
          title: '添加商品',
          icon: 'dashboard'
        }
      },
      {
        path: 'addGroupGoods',
        name: 'addGroupGoods',
        hidden: true,
        component: addGroupGoods,
        meta: {
          title: '添加商品套餐',
          icon: 'dashboard'
        }
      },
      {
        path: 'editGoods',
        name: 'editGoods',
        hidden: true,
        component: editGoods,
        meta: {
          title: '编辑商品',
          icon: 'dashboard'
        }
      },
      {
        path: 'editGroupGoods',
        name: 'editGroupGoods',
        hidden: true,
        component: editGroupGoods,
        meta: {
          title: '编辑商品套餐',
          icon: 'dashboard'
        }
      },
    ]
  },
  /* 预定套餐 */
  {
    path: '/GroupBuyindex',
    name: 'groupBuyindex',
    hidden: true,
    redirect: '/GroupBuyindex',
    component: Layout,
    meta: {
      title: '预定套餐',
      requireAuth: true,
      icon: 'dashboard'
    },
    children: [{
        path: 'addGroupBuy',
        name: 'addGroupBuy',
        hidden: true,
        component: addGroupBuy,
        meta: {
          title: '添加团购套餐',
          icon: 'dashboard'
        }
      },
      {
        path: 'editGroupBuy',
        name: 'editGroupBuy',
        hidden: true,
        component: editGroupBuy,
        meta: {
          title: '编辑团购套餐',
          icon: 'dashboard'
        }
      },
      {
        path: 'goodsClass',
        name: 'goodsClass',
        hidden: true,
        component: goodsClass,
        meta: {
          title: '编辑团购套餐',
          icon: 'dashboard'
        }
      }
    ]
  },
  /* 资讯 */
  {
    path: '/news',
    name: 'News',
    menuName: "News",
    hidden: false,
    redirect: '/news/content',
    component: Layout,
    meta: {
      title: '资讯',
      requireAuth: true,
      icon: 'el-icon-view'
    },
    children: [{
      path: '/news/content',
      name: 'NewsContentindex',
      menuName: "NewsContent", //暂时使用——朱强addInformation
      hidden: false,
      component: NewsContent,
      meta: {
        title: '资讯管理',
      }
    }, {
      path: '/news/comment',
      name: 'NewsCommentindex',
      menuName: "NewsComment",
      hidden: false,
      component: NewsComment,
      meta: {
        title: '资讯评论',
      }
    }, {
      path: '/news/addInformation',
      name: 'addInformation',
      hidden: true,
      component: addInformation,
      meta: {
        title: '添加资讯',
      }
    }, {
      path: '/news/editorInformation',
      name: 'editorInformation',
      hidden: true,
      component: editorInformation,
      meta: {
        title: '编辑资讯',
      }
    }, {
      path: '/news/mediaStroe',
      name: 'mediaStroe',
      hidden: true,
      component: mediaStroe,
      meta: {
        title: '资讯媒体管理',
      }
    }, ]
  },
  {
    path: '/point',
    name: 'Point',
    menuName: "Point",
    hidden: false,
    redirect: '/point/log',
    component: Layout,
    meta: {
      title: '积分',
      requireAuth: true,
      icon: 'el-icon-coin'
    },
    children: [{
      path: '/point/log',
      name: 'PointLogindex',
      menuName: "PointLog",
      hidden: false,
      component: pointLog,
      meta: {
        title: '积分记录',
      }
    }, {
      path: '/point/mall',
      name: 'PointMallindex',
      menuName: "PointMall",
      hidden: false,
      component: pointMall,
      meta: {
        title: '积分商城',
      }
    }, {
      path: '/point/exchange',
      name: 'PointExchangeindex',
      menuName: "PointExchange",
      hidden: false,
      component: pointExchange,
      meta: {
        title: '积分兑换',
      }
    }]
  },
  /* 订单管理 */
  {
    path: '/newOrder',
    name: 'newOrder',
    hidden: true,
    redirect: '/newOrder',
    component: Layout,
    meta: {
      title: '订单管理',
      requireAuth: true,
      icon: 'el-icon-document'
    },
    children: [{
        path: '/orderDatile',
        name: 'orderDatile',
        hidden: true,
        component: orderDatile,
        meta: {
          title: '订单详情',
          icon: 'el-icon-document'
        }
      },
      {
        path: '/groupBuyDetaile',
        name: 'groupBuyDetaile',
        hidden: true,
        component: groupBuyDetaile,
        meta: {
          title: '订单详情',
          icon: 'dashboard'
        }
      },
      {
        path: '/billDetail',
        name: 'billDetail',
        hidden: true,
        component: billDetail,
        meta: {
          title: '订单详情',
          icon: 'dashboard'
        }
      }
    ]
  },
  /* 预订管理 */
  {
    path: '/reserve',
    name: 'ReserveData',
    hidden: true,
    redirect: '/reserveData',
    component: Layout,
    meta: {
      title: '预订管理',
      requireAuth: true,
      icon: 'dashboard'
    },
    children: [{
      path: '/reserveData',
      name: 'reserveData',
      hidden: false,
      component: reserveData,
      meta: {
        title: '预订列表',
        icon: 'dashboard'
      }
    }]
  },
  /* 顾客管理 */
  {
    path: '/customer',
    name: 'CustomerList',
    hidden: true,
    redirect: '/customerList',
    component: Layout,
    meta: {
      title: '顾客管理',
      requireAuth: true,
      icon: 'dashboard'
    },
    children: [{
      path: '/customerList',
      name: 'customerList',
      hidden: false,
      component: customerList,
      meta: {
        title: '顾客列表',
        icon: 'dashboard'
      }
    }]
  },
  /* 文章管理 */
  {
    path: '/article',
    name: 'article',
    hidden: true,
    redirect: '/articleManage',
    component: Layout,
    meta: {
      title: '文章管理',
      requireAuth: true,
      icon: 'dashboard'
    },
    children: [{
        path: '/articleManage',
        name: 'articleManage',
        hidden: false,
        component: articleManage,
        meta: {
          title: '文章管理',
          icon: 'dashboard'
        }
      },
      {
        path: '/articleDetile',
        name: 'articleDetile',
        hidden: true,
        component: articleDetile,
        meta: {
          title: '文章详情',
          icon: 'dashboard'
        }
      },
      {
        path: '/articleOperation',
        name: 'articleOperation',
        hidden: true,
        component: articleOperation,
        meta: {
          title: '文章操作',
          icon: 'dashboard'
        }
      }
    ]
  },
  /* App */
  {
    path: '/app',
    name: 'app',
    hidden: false,
    menuName: "AppManager",
    redirect: '/appList',
    component: Layout,
    meta: {
      title: 'APP',
      requireAuth: true,
      icon: 'app'
    },
    children: [{
        path: '/appList',
        name: 'appList',
        menuName: "App",
        hidden: false,
        component: appList,
        meta: {
          title: '发布版本',
        }
      },
      {
        path: '/addapp',
        name: 'addApp',
        hidden: true,
        component: AddApp,
        meta: {
          title: '添加APP',
        }
      },
      {
        path: '/editapp',
        name: 'editApp',
        hidden: true,
        component: EditApp,
        meta: {
          title: '编辑APP',
        }
      },
      {
        path: '/buttonList',
        name: 'buttonList',
        menuName: "Button",
        hidden: false,
        component: buttonList,
        meta: {
          title: '导航菜单',
        }
      },
      {
        path: '/addbutton',
        name: 'addButton',
        hidden: true,
        component: AddButton,
        meta: {
          title: '添加按钮',
          icon: 'dashboard'
        }
      },
      {
        path: '/editbutton',
        name: 'editButton',
        hidden: true,
        component: EditButton,
        meta: {
          title: '编辑按钮',
          icon: 'dashboard'
        }
      }, {
        path: '/article/set',
        menuName: "ArticleSet",
        name: 'ArticleSet',
        hidden: false,
        component: ArticleSet,
        meta: {
          title: '新手指南',
        }
      }, {
        path: '/articleGuide',
        name: 'articleGuide',
        hidden: true,
        component: articleGuide,
        meta: {
          title: '指南编辑',
        }
      },
      {
        path: '/feedback',
        name: 'feedback',
        menuName: "Feedback",
        hidden: false,
        component: FeedBack,
        meta: {
          title: '意见反馈',
        }
      }
    ]
  },
  /* 举报管理 */
  {
    path: '/report',
    name: 'report',
    hidden: false,
    redirect: '/reportList',
    menuName: 'ReportManage',
    component: Layout,
    meta: {
      title: '举报',
      requireAuth: true,
      icon: 'el-icon-chat-line-square'
    },
    children: [{
      path: '/reportList',
      name: 'reportList',
      hidden: false,
      menuName: 'Report',
      component: ReportList,
      meta: {
        title: '举报'
      }
    }, {
      path: '/correct',
      name: 'ShopCorrectindex',
      hidden: false,
      menuName: 'ShopCorrect',
      component: ShopCorrect,
      meta: {
        title: '商家纠错'
      }
    }]
  },
  /* 广告位 */
  {
    path: '/advertisePlace',
    name: 'advertisePlace',
    menuName: 'AdsManage',
    hidden: false,
    redirect: '/advertisePlace',
    component: Layout,
    meta: {
      title: '广告',
      requireAuth: true,
      icon: 'AD'
    },
    children: [{
        path: '/advertiseplace',
        name: 'advertisePlace',
        menuName: 'AdPos',
        hidden: false,
        component: advertisePlace,
        meta: {
          title: '广告',
          icon: 'AD'
        }
      },
      {
        path: '/addAdvertise',
        name: 'addAdvertise',
        hidden: true,
        component: advertisePlace,
        meta: {
          title: '广告位新增',
          icon: 'dashboard'
        }
      },
      // { path: '/advertiseEdit', name: 'advertiseEdit', hidden: true, component: advertiseEdit, meta: { title: '广告位编辑', icon: 'dashboard' } },
      // { path: '/advertisePlaceDetail', name: 'advertisePlaceDetail', hidden: true, component: advertisePlaceDetail, meta: { title: '广告位编辑', icon: 'dashboard' } },
      // { path: '/articleOperation', name: 'articleOperation', hidden: true, component: articleOperation, meta: { title: '文章操作', icon: 'dashboard' }}
    ]
  },
  /* 广告 */
  {
    path: '/advertiseManage',
    name: 'advertise',
    hidden: true,
    redirect: '/advertiseplace',
    component: Layout,
    meta: {
      title: '广告',
      requireAuth: true,
      icon: 'dashboard'
    },
    children: [{
        path: '/advertiseList',
        name: 'advertiseManage',
        hidden: true,
        component: advertiseManage,
        meta: {
          title: '广告列表',
          icon: 'dashboard'
        }
      },
      // { path: '/addAdvertise', name: 'addAdvertise', hidden: true, component: advertiseEdit, meta: { title: '广告位新增', icon: 'dashboard' } },
      // { path: '/advertiseEdit', name: 'advertiseEdit', hidden: true, component: advertiseEdit, meta: { title: '广告位编辑', icon: 'dashboard' } },
      // { path: '/advertisePlaceDetail', name: 'advertisePlaceDetail', hidden: true, component: advertisePlaceDetail, meta: { title: '广告位编辑', icon: 'dashboard' } },
      // { path: '/articleOperation', name: 'articleOperation', hidden: true, component: articleOperation, meta: { title: '文章操作', icon: 'dashboard' }}
    ]
  },
  /* 通知 */
  {
    path: '/Notification',
    name: 'Notification',
    menuName: 'NotifyManager',
    hidden: false,
    redirect: '/Notification/systemPush',
    component: Layout,
    meta: {
      title: '通知',
      requireAuth: true,
      icon: 'notice'
    },
    children: [{
        path: '/Notification/message/activity/',
        name: 'messageActivity',
        menuName: 'ActivityMessage',
        hidden: false,
        component: Message,
        props: {
          type: 'activity'
        },
        meta: {
          title: '活动通知',
        }
      },
      {
        path: '/Notification/message/interact/',
        name: 'messageInteract',
        menuName: 'InteractMessage',
        hidden: false,
        component: Message,
        props: {
          type: 'interact'
        },
        meta: {
          title: '互动通知',
        }
      },
      {
        path: '/Notification/message/order/',
        name: 'messageOrder',
        menuName: 'OrderMessage',
        hidden: false,
        component: Message,
        props: {
          type: 'order'
        },
        meta: {
          title: '订单通知',
        }
      },
      {
        path: '/Notification/message/system/',
        name: 'messageSystem',
        menuName: 'SystemMessage',
        hidden: false,
        component: Message,
        props: {
          type: 'system'
        },
        meta: {
          title: '系统通知',
        }
      },
      {
        path: '/Notification/systemYD',
        name: 'systemYD',
        menuName: 'Article',
        hidden: false,
        component: SystemYD,
        meta: {
          title: '夜店小助手',
        }
      },
      {
        path: '/Notification/systemPush',
        name: 'systemPush',
        menuName: 'SystemPush',
        hidden: false,
        component: SystemPush,
        meta: {
          title: '广播推送',
        }
      },
      {
        path: '/system/target',
        name: 'targetPush',
        menuName: 'Target',
        hidden: false,
        component: Target,
        meta: {
          title: '定向推送',
        }
      }
    ]
  },
  /* 通知 子页面 */
  {
    path: '/NotificationSystemYD',
    name: 'NotificationSystemYD',
    hidden: true,
    redirect: '/Notification/systemYD',
    component: Layout,
    meta: {
      title: '夜店小助手',
      requireAuth: true,
    },
    children: [{
      path: '/Notification/systemYD/articleYD/',
      name: 'articleYD',
      hidden: true,
      component: ArticleYD,
      meta: {
        title: '夜店小助手内容',
      }
    }]

  },

  {
    path: '/log',
    name: 'log',
    hidden: false,
    redirect: '/adminLog',
    component: Layout,
    menuName: 'LogManager',
    meta: {
      title: '日志',
      requireAuth: true,
      icon: 'log'
    },
    children: [{
        path: '/adminLog',
        name: 'adminLog',
        menuName: 'AdminLog',
        hidden: false,
        component: adminLog,
        meta: {
          title: '管理操作',
        }
      },
      {
        path: '/userLogin',
        name: 'userLogin',
        menuName: 'UserLogin',
        hidden: false,
        component: userLogin,
        meta: {
          title: '用户登录',
        }
      },
      {
        path: '/adminLogin',
        name: 'adminLogin',
        menuName: 'AdminLogin',
        hidden: false,
        component: adminLogin,
        meta: {
          title: '管理登录',
        }
      },
      {
        path: '/errorSystem',
        name: 'errorSystem',
        menuName: 'Error',
        hidden: false,
        component: errorSystem,
        meta: {
          title: '错误日志',
        }
      }
    ]
  },

  /* 系统设置 */
  {
    path: '/admin',
    name: 'AdminUser',
    menuName: 'System',
    hidden: false,
    redirect: '/adminUser',
    component: Layout,
    meta: {
      title: '系统',
      requireAuth: true,
      icon: 'setup3'
    },
    children: [{
        path: '/adminUser',
        name: 'adminUser',
        menuName: 'Admins',
        hidden: false,
        component: adminUser,
        meta: {
          title: '管理员',
        }
      },
      {
        path: '/adminRole',
        name: 'adminRole',
        hidden: true,
        component: adminRole,
        meta: {
          title: '角色',
        }
      },
      {
        path: '/adminDept',
        name: 'adminDept',
        hidden: true,
        component: adminDept,
        meta: {
          title: '部门',
        }
      },
      {
        path: '/iosSystem',
        name: 'iosSystem',
        menuName: 'Recharge',
        hidden: false,
        component: iosSystem,
        meta: {
          title: 'IOS充值',
        }
      }, {
        path: '/planList',
        name: 'planList',
        menuName: 'CronWorker',
        hidden: false,
        component: PlanList,
        meta: {
          title: '计划任务',
        }
      },
      {
        path: '/changePassword',
        name: 'changePassword',
        hidden: false,
        component: changePassword,
        meta: {
          title: '修改密码',
        }
      }
    ]
  },
  /* 数据中心 */
  {
    path: '/record',
    name: 'Recordindex',
    hidden: false,
    redirect: '/record/reserve',
    menuName: 'RecordManager',
    component: Layout,
    meta: {
      title: '报表',
      requireAuth: true,
      icon: 'el-icon-data-analysis'
    },
    children: [{
      path: '/record/reserve',
      name: 'ReserveDataindex',
      hidden: false,
      menuName: 'ReserveData',
      component: ReserveRecord,
      meta: {
        title: '预订报表'
      }
    }, {
      path: '/record/register',
      name: 'RegisterDataindex',
      hidden: false,
      menuName: 'RegisterData',
      component: RegisterData,
      meta: {
        title: '注册报表'
      }
    }, {
      path: '/record/recharge',
      name: 'RechargeDataindex',
      hidden: false,
      menuName: 'RechargeData',
      component: RechargeData,
      meta: {
        title: '充值报表'
      }
    }, {
      path: '/record/cash',
      name: 'CashDataindex',
      hidden: false,
      menuName: 'CashData',
      component: CashData,
      meta: {
        title: '提现报表'
      }
    }, {
      path: '/record/groupParty',
      name: 'GroupPartyDataindex',
      hidden: false,
      menuName: 'GroupPartyData',
      component: GroupPartyData,
      meta: {
        title: '组局报表'
      }
    }, {
      path: '/record/crowdfunding',
      name: 'CrowFundingDataindex',
      hidden: false,
      menuName: 'CrowFundingData',
      component: CrowFundingData,
      meta: {
        title: '拼桌报表'
      }
    }, {
      path: '/record/coupon',
      name: 'CouponDataindex',
      hidden: false,
      menuName: 'CouponData',
      component: CouponData,
      meta: {
        title: '优惠券报表'
      }
    }]
  },
  /* 商务合作 */
  {
    path: '/cooperationManager',
    name: 'CooperationManager',
    menuName: 'CooperationManager',
    hidden: false,
    redirect: '/shopApply',
    component: Layout,
    meta: {
      title: '商务',
      requireAuth: true,
      icon: 'el-icon-suitcase'
    },
    children: [{
      path: '/shopApply',
      name: 'ShopApplyindex',
      menuName: 'ShopApply',
      hidden: false,
      component: ShopApply,
      meta: {
        title: '商家入驻',
      }
    }, {
      path: '/cooperation/marketing',
      name: 'MarketingApplyindex',
      menuName: 'MarketingApply',
      hidden: false,
      component: MarketingApply,
      meta: {
        title: '营销入驻',
      }
    }, {
      path: '/cooperation/pubs',
      name: 'AdCooperationindex',
      menuName: 'AdCooperation',
      hidden: false,
      component: AdCooperation,
      meta: {
        title: '广告合作',
      }
    }]
  },
]

const createRouter = () => new Router({
  // 解决vue框架页面跳转有白色不可追踪色块的bug
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}



export default router
