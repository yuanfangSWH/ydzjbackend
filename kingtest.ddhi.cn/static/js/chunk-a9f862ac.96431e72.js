(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a9f862ac"],{6714:function(t,e,a){"use strict";var s=a("ad8e"),l=a.n(s);l.a},ad8e:function(t,e,a){},cad1:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"shopSet"},[a("div",{staticClass:"pageTitle"},[t._v(t._s(this._getVuex("pageTitle")))]),a("div",{staticClass:"add-box"},[a("el-input",{staticClass:"searchInput",attrs:{placeholder:"请输入要搜索的内容","prefix-icon":"el-icon-search"},on:{change:t.searchDatas},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}})],1),a("div",{staticClass:"shanxdiv"},[a("el-input",{staticClass:"ewmsou",staticStyle:{width:"200px"},attrs:{placeholder:"请输入顾客ID"},model:{value:t.customer_id,callback:function(e){t.customer_id=e},expression:"customer_id"}}),a("el-button",{attrs:{type:"primary"},on:{click:t.screening}},[t._v("筛选")]),a("el-button",{attrs:{type:"info"},on:{click:t.resetData}},[t._v("重置")])],1),a("el-table",{ref:"multipNum",staticStyle:{width:"100%"},attrs:{stripe:"",data:t.tableListData,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"customer_id",label:"顾客ID",width:"150"}}),a("el-table-column",{attrs:{prop:"nickname",label:"昵称",width:"200"}}),a("el-table-column",{attrs:{prop:"level",label:"等级",width:"150"}}),a("el-table-column",{attrs:{prop:"phone",label:"电话",width:"250"}}),a("el-table-column",{attrs:{label:"头像",width:"150"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("el-image",{attrs:{src:t.row.avatar}})]}}])}),a("el-table-column",{attrs:{prop:"gender",label:"性别",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.gender?a("span",[t._v("未知")]):1==e.row.gender?a("span",[t._v("男")]):2==e.row.gender?a("span",[t._v("女")]):t._e()]}}])}),a("el-table-column",{attrs:{prop:"money",label:"余额",width:"150"}}),a("el-table-column",{attrs:{prop:"frozen_money",label:"冻结的金额",width:"150"}}),a("el-table-column",{attrs:{prop:"point",label:"用户积分",width:"150"}}),a("el-table-column",{attrs:{prop:"available_point",label:"用户可用积分",width:"150"}}),a("el-table-column",{attrs:{prop:"last_time",label:"上次活动时间",width:"150"}}),a("el-table-column",{attrs:{prop:"last_ip",label:"上次活动IP",width:"150"}}),a("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.detailData(e.row)}}},[t._v("顾客详情")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{"current-page":t.curPage,"hide-on-single-page":!0,background:"",layout:"prev, pager, next",total:t.total},on:{"current-change":t.pageChange}})],1),a("el-dialog",{attrs:{title:"顾客详情",visible:t.detailDialog,width:"30%"},on:{"update:visible":function(e){t.detailDialog=e}}},[a("el-form",{staticClass:"updateArea",attrs:{"label-width":"150px"}},[a("el-form-item",{attrs:{label:"顾客id"}},[t._v(" "+t._s(t.UserGiftShop.customer_id)+" ")]),a("el-form-item",{attrs:{label:"昵称"}},[t._v(" "+t._s(t.UserGiftShop.nickname)+" ")]),a("el-form-item",{attrs:{label:"等级"}},[t._v(" "+t._s(t.UserGiftShop.level)+" ")]),a("el-form-item",{attrs:{label:"头像"}},[a("el-image",{attrs:{src:t.UserGiftShop.avatar}})],1),a("el-form-item",{attrs:{label:"电话"}},[t._v(" "+t._s(t.UserGiftShop.phone)+" ")]),a("el-form-item",{attrs:{label:"生日"}},[t._v(" "+t._s(t.UserGiftShop.birthday)+" ")]),a("el-form-item",{attrs:{label:"签名"}},[t._v(" "+t._s(t.UserGiftShop.signature)+" ")]),a("el-form-item",{attrs:{label:"性别"}},[0==t.UserGiftShop.gender?a("span",[t._v("未知")]):1==t.UserGiftShop.gender?a("span",[t._v("男")]):2==t.UserGiftShop.gender?a("span",[t._v("女")]):t._e()]),a("el-form-item",{attrs:{label:"微信移动应用OPENID"}},[t._v(" "+t._s(t.UserGiftShop.app_openid)+" ")]),a("el-form-item",{attrs:{label:"微信网站应用OPENID"}},[t._v(" "+t._s(t.UserGiftShop.web_openid)+" ")]),a("el-form-item",{attrs:{label:"微信公众号OPENID"}},[t._v(" "+t._s(t.UserGiftShop.biz_openid)+" ")]),a("el-form-item",{attrs:{label:"微信小程序OPENID"}},[t._v(" "+t._s(t.UserGiftShop.weapp_openid)+" ")]),a("el-form-item",{attrs:{label:"微信开放平台UNIONID"}},[t._v(" "+t._s(t.UserGiftShop.unionid)+" ")]),a("el-form-item",{attrs:{label:"国家"}},[t._v(" "+t._s(t.UserGiftShop.country)+" ")]),a("el-form-item",{attrs:{label:"省份"}},[t._v(" "+t._s(t.UserGiftShop.province)+" ")]),a("el-form-item",{attrs:{label:"城市"}},[t._v(" "+t._s(t.UserGiftShop.city)+" ")]),a("el-form-item",{attrs:{label:"地区"}},[t._v(" "+t._s(t.UserGiftShop.area)+" ")]),a("el-form-item",{attrs:{label:"余额"}},[t._v(" "+t._s(t.UserGiftShop.money)+" ")]),a("el-form-item",{attrs:{label:"冻结的金额"}},[t._v(" "+t._s(t.UserGiftShop.frozen_money)+" ")]),a("el-form-item",{attrs:{label:"用户积分"}},[t._v(" "+t._s(t.UserGiftShop.point)+" ")]),a("el-form-item",{attrs:{label:"用户可用积分"}},[t._v(" "+t._s(t.UserGiftShop.available_point)+" ")]),a("el-form-item",{attrs:{label:"注册时间"}},[t._v(" "+t._s(t.UserGiftShop.reg_time)+" ")]),a("el-form-item",{attrs:{label:"上次活动时间"}},[t._v(" "+t._s(t.UserGiftShop.last_time)+" ")]),a("el-form-item",{attrs:{label:"上次活动IP"}},[t._v(" "+t._s(t.UserGiftShop.last_ip)+" ")]),a("el-form-item",{attrs:{label:"验证字符串"}},[t._v(" "+t._s(t.UserGiftShop.auth_key)+" ")]),a("el-form-item",{attrs:{label:"最后所在经度"}},[t._v(" "+t._s(t.UserGiftShop.longitude)+" ")]),a("el-form-item",{attrs:{label:"最后所在纬度"}},[t._v(" "+t._s(t.UserGiftShop.latitude)+" ")]),a("el-form-item",{attrs:{label:"是否可见"}},[0==t.UserGiftShop.visible?a("span",[t._v("隐身")]):1==t.UserGiftShop.visible?a("span",[t._v("可见")]):t._e()]),a("el-form-item",{attrs:{label:"状态"}},[0==t.UserGiftShop.status?a("span",[t._v("禁用")]):1==t.UserGiftShop.status?a("span",[t._v("正常")]):2==t.UserGiftShop.status?a("span",[t._v("禁言")]):t._e()]),a("el-form-item",{attrs:{label:"注册来源"}},[0==t.UserGiftShop.reg_source?a("span",[t._v("未知")]):1==t.UserGiftShop.reg_source?a("span",[t._v("APP")]):2==t.UserGiftShop.reg_source?a("span",[t._v("公众号")]):3==t.UserGiftShop.reg_source?a("span",[t._v("小程序")]):t._e()])],1)],1)],1)},l=[],i={name:"customerList",data:function(){return{detailDialog:!1,UserGiftShop:[],customer_id:"",curPage:1,total:1,searchValue:"",tableListData:[]}},created:function(){this.getTableList()},methods:{resetData:function(){this.customer_id="",this.curPage=1,this.getTableList()},screening:function(){this.curPage=1,this.getTableList()},getTableList:function(){var t=this,e={customer_id:this.customer_id,name:this.searchValue,page:this.curPage};this.api.customer.customerData(e).then((function(e){t.tableListData=e.data.data,t.total=e.data.count}))},searchDatas:function(){this.curPage=1,this.getTableList()},detailData:function(t){this.UserGiftShop=t,this.detailDialog=!0},pageChange:function(t){this.curPage=t,this.getTableList()}}},r=i,o=(a("6714"),a("2877")),n=Object(o["a"])(r,s,l,!1,null,"ecf92e6a",null);e["default"]=n.exports}}]);
//# sourceMappingURL=chunk-a9f862ac.96431e72.js.map