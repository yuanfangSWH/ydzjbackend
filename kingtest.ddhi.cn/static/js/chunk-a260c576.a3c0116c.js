(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a260c576"],{"6a2f":function(t,e,a){"use strict";var l=a("9acd"),s=a.n(l);s.a},"6bdf":function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"shopSet"},[a("div",{staticClass:"pageTitle"},[t._v(t._s(this._getVuex("pageTitle")))]),a("div",{staticClass:"add-box"},[a("el-input",{staticClass:"searchInput",attrs:{placeholder:"请输入要搜索的内容","prefix-icon":"el-icon-search"},on:{change:t.searchDatas},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}})],1),a("div",{staticClass:"shanxdiv"},[a("el-input",{staticStyle:{"margin-right":"10px",width:"300px"},attrs:{placeholder:"输入订单号"},model:{value:t.bill_no,callback:function(e){t.bill_no=e},expression:"bill_no"}}),a("el-select",{staticStyle:{"margin-right":"10px"},attrs:{placeholder:"请选择状态"},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},t._l(t.stateData,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1),a("el-button",{attrs:{type:"primary"},on:{click:t.screening}},[t._v("筛选")]),a("el-button",{attrs:{type:"info"},on:{click:t.resetData}},[t._v("重置")])],1),a("el-table",{ref:"multipNum",staticStyle:{width:"100%"},attrs:{stripe:"",data:t.tableListData,"tooltip-effect":"dark"},on:{"selection-change":t.selectItem}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{label:"全选/ID",width:"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.bill_id))])]}}])}),a("el-table-column",{attrs:{prop:"bill_id",label:"账单id",width:"100"}}),a("el-table-column",{attrs:{prop:"bill_no",label:"账单号",width:"100"}}),a("el-table-column",{attrs:{prop:"merchant_id",label:"商家id",width:"100"}}),a("el-table-column",{attrs:{prop:"shop_id",label:"店铺id",width:"100"}}),a("el-table-column",{attrs:{prop:"shop_name",label:"店铺名称",width:"100"}}),a("el-table-column",{attrs:{prop:"place_id",label:"预订id",width:"100"}}),a("el-table-column",{attrs:{prop:"place_type_id",label:"座位id",width:"100"}}),a("el-table-column",{attrs:{prop:"place_name",label:"座位名称",width:"100"}}),a("el-table-column",{attrs:{prop:"staff_id",label:"操作员工id",width:"100"}}),a("el-table-column",{attrs:{prop:"staff_name",label:"操作员工姓名",width:"100"}}),a("el-table-column",{attrs:{prop:"sale_staff_id",label:"销售id",width:"100"}}),a("el-table-column",{attrs:{prop:"sale_staff_name",label:"销售姓名",width:"100"}}),a("el-table-column",{attrs:{prop:"user_id",label:"用户id",width:"100"}}),a("el-table-column",{attrs:{prop:"user_unionid",label:"用户微信unionid",width:"100"}}),a("el-table-column",{attrs:{prop:"ugb_id",label:"预订套餐id",width:"100"}}),a("el-table-column",{attrs:{prop:"start_time",label:"开始时间",width:"100"}}),a("el-table-column",{attrs:{prop:"end_time",label:"结束时间",width:"100"}}),a("el-table-column",{attrs:{prop:"duration_time",label:"持续时间",width:"100"}}),a("el-table-column",{attrs:{prop:"create_time",label:"账单创建时间",width:"100"}}),a("el-table-column",{attrs:{prop:"modify_time",label:"账单修改时间",width:"100"}}),a("el-table-column",{attrs:{prop:"delete_time",label:"删除时间",width:"100"}}),a("el-table-column",{attrs:{prop:"business_time",label:"归属的营业时间",width:"100"}}),a("el-table-column",{attrs:{prop:"shopping_ids",label:"下单id集合",width:"100"}}),a("el-table-column",{attrs:{prop:"sign_bill_staff_id",label:"挂账签单员工id",width:"100"}}),a("el-table-column",{attrs:{prop:"sign_bill_staff_name",label:"挂账签单员工名字",width:"100"}}),a("el-table-column",{attrs:{prop:"total_amount",label:"账单总金额",width:"100"}}),a("el-table-column",{attrs:{prop:"total_point",label:"获得总积分",width:"100"}}),a("el-table-column",{attrs:{prop:"pay_amount",label:"付款总金额",width:"100"}}),a("el-table-column",{attrs:{prop:"refund_amount",label:"退款总金额",width:"100"}}),a("el-table-column",{attrs:{prop:"coupon_amount",label:"优惠券支付总金额",width:"100"}}),a("el-table-column",{attrs:{prop:"people_num",label:"消费人数",width:"100"}}),a("el-table-column",{attrs:{prop:"coupon_id",label:"优惠券ID",width:"100"}}),a("el-table-column",{attrs:{prop:"point_use",label:"消耗积分兑换",width:"100"}}),a("el-table-column",{attrs:{prop:"point_amount",label:"积分兑换支付总金额",width:"100"}}),a("el-table-column",{attrs:{prop:"card_amount",label:"会员卡支付总金额",width:"100"}}),a("el-table-column",{attrs:{prop:"card_id",label:"会员卡ID",width:"100"}}),a("el-table-column",{attrs:{prop:"round_amount",label:"抹零金额",width:"100"}}),a("el-table-column",{attrs:{label:"状态",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.status?a("span",[t._v("删除")]):1==e.row.status?a("span",[t._v("未完成结算")]):2==e.row.status?a("span",[t._v("已结算")]):3==e.row.status?a("span",[t._v("挂账")]):4==e.row.status?a("span",[t._v("清账")]):t._e()]}}])}),a("el-table-column",{attrs:{fixed:"right",width:"140",align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.batchDelete(e.row)}}},[t._v("点单记录")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{"current-page":t.curPage,"hide-on-single-page":!0,background:"",layout:"prev, pager, next",total:t.total},on:{"current-change":t.pageChange}})],1),a("el-dialog",{attrs:{title:"当前为第"+t.singleKey+"条数据 | 该用户点单记录共："+t.singleLength+" 条数据",visible:t.diantk,width:"50%"},on:{"update:visible":function(e){t.diantk=e}}},[a("div",[a("el-form",{staticClass:"demo-ruleForm",attrs:{"v-model":t.singleData,"label-width":"300px"}},[a("el-form-item",{attrs:{label:"点单id"}},[t._v(" "+t._s(t.singleData.shopping_id)+" ")]),a("el-form-item",{attrs:{label:"商家ID"}},[t._v(" "+t._s(t.singleData.merchant_id)+" ")]),a("el-form-item",{attrs:{label:"店铺ID"}},[t._v(" "+t._s(t.singleData.shop_id)+" ")]),a("el-form-item",{attrs:{label:"店铺名称"}},[t._v(" "+t._s(t.singleData.shop_name)+" ")]),a("el-form-item",{attrs:{label:"支付订单号"}},[t._v(" "+t._s(t.singleData.order_no)+" ")]),a("el-form-item",{attrs:{label:"账单ID"}},[t._v(" "+t._s(t.singleData.bill_id)+" ")]),a("el-form-item",{attrs:{label:"账单号"}},[t._v(" "+t._s(t.singleData.bill_no)+" ")]),a("el-form-item",{attrs:{label:"操作员工ID"}},[t._v(" "+t._s(t.singleData.staff_id)+" ")]),a("el-form-item",{attrs:{label:"操作员工姓名"}},[t._v(" "+t._s(t.singleData.staff_name)+" ")]),a("el-form-item",{attrs:{label:"销售员工ID"}},[t._v(" "+t._s(t.singleData.sale_staff_id)+" ")]),a("el-form-item",{attrs:{label:"销售员工名字"}},[t._v(" "+t._s(t.singleData.sale_staff_name)+" ")]),a("el-form-item",{attrs:{label:"预订订单ID"}},[t._v(" "+t._s(t.singleData.reserve_id)+" ")]),a("el-form-item",{attrs:{label:"位置ID"}},[t._v(" "+t._s(t.singleData.place_id)+" ")]),a("el-form-item",{attrs:{label:"位置名称"}},[t._v(" "+t._s(t.singleData.place_name)+" ")]),a("el-form-item",{attrs:{label:"位置类型ID"}},[t._v(" "+t._s(t.singleData.place_type_id)+" ")]),a("el-form-item",{attrs:{label:"位置类型名称"}},[t._v(" "+t._s(t.singleData.place_type_name)+" ")]),a("el-form-item",{attrs:{label:"支付金额"}},[t._v(" "+t._s(t.singleData.total_amount)+" ")]),a("el-form-item",{attrs:{label:"获得积分"}},[t._v(" "+t._s(t.singleData.total_point)+" ")]),a("el-form-item",{attrs:{label:"发起支付时间"}},[t._v(" "+t._s(t.singleData.create_time)+" ")]),a("el-form-item",{attrs:{label:"支付时间"}},[t._v(" "+t._s(t.singleData.pay_time)+" ")]),a("el-form-item",{attrs:{label:"完成时间"}},[t._v(" "+t._s(t.singleData.finish_time)+" ")]),a("el-form-item",{attrs:{label:"归属的营业时间"}},[t._v(" "+t._s(t.singleData.business_time)+" ")]),a("el-form-item",{attrs:{label:"备注"}},[t._v(" "+t._s(t.singleData.remark)+" ")]),a("el-form-item",{attrs:{label:"支付方式"}},[1==t.singleData.pay_type?a("span",[t._v("支付宝")]):2==t.singleData.pay_type?a("span",[t._v("微信")]):3==t.singleData.pay_type?a("span",[t._v("银行卡")]):4==t.singleData.pay_type?a("span",[t._v("信用卡")]):5==t.singleData.pay_type?a("span",[t._v("现金")]):6==t.singleData.pay_type?a("span",[t._v("App用户余额")]):7==t.singleData.pay_type?a("span",[t._v("商家签单")]):8==t.singleData.pay_type?a("span",[t._v("先消费后结算")]):t._e()]),a("el-form-item",{attrs:{label:"状态"}},[1==t.singleData.status?a("span",[t._v("待付款")]):2==t.singleData.status?a("span",[t._v("用户取消订单（未支付或超时）")]):3==t.singleData.status?a("span",[t._v("厨房已接单（准备中，厨房）")]):4==t.singleData.status?a("span",[t._v("已完成（东西已上，维权中，已退款）")]):t._e()])],1)],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{"current-page":t.singleKey,"hide-on-single-page":!0,"page-size":Number(1),background:"",layout:"prev, pager, next",total:t.singleLength},on:{"current-change":t.singPage}})],1)])],1)},s=[],i=(a("4160"),a("a9e3"),a("159b"),{name:"UserBill",data:function(){return{singleData:"",singleValue:"",singleKey:1,singleLength:0,singleNunm:"下一页",user_id:"",curPage:1,total:1,allQL:!1,diantk:!1,tableListData:[],multipleSelection:[],searchValue:"",bill_no:"",status:"",stateData:[{id:0,name:"删除"},{id:1,name:"未完成结算"},{id:2,name:"已结算"},{id:3,name:"挂账"},{id:4,name:"清账"}]}},created:function(){this.user_id=Number(this.$route.query.user_id),this.getTableList()},methods:{batchDelete:function(t){this.singleKey=1,this.singleValue=t.shopping,this.singleData=t.shopping[0],this.singleLength=t.shopping.length,this.diantk=!0},singPage:function(t){this.singleKey=t,this.singleData=this.singleValue[t-1]},resetData:function(){this.status="",this.bill_no="",this.curPage=1,this.getTableList(),this.$refs.citySelect.resetData()},screening:function(){this.curPage=1,this.getTableList()},getTableList:function(){var t=this,e={user_id:this.user_id,bill_no:this.bill_no,status:this.status,name:this.searchValue,page:this.curPage,page_size:10};this.api.user.UserBill(e).then((function(e){t.tableListData=e.data.data,t.total=e.data.count}))},searchDatas:function(){this.curPage=1,this.getTableList()},selectItem:function(t){var e=this;this.multipleSelection=[],t.forEach((function(t){e.multipleSelection.push(t.user_id),e.nameArr.push(t.nickname)}))},pageChange:function(t){this.curPage=t,this.getTableList()}}}),n=i,r=(a("6a2f"),a("2877")),o=Object(r["a"])(n,l,s,!1,null,"18b943d2",null);e["default"]=o.exports},"9acd":function(t,e,a){}}]);
//# sourceMappingURL=chunk-a260c576.a3c0116c.js.map