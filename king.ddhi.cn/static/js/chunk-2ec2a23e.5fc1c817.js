(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ec2a23e"],{"517b":function(t,a,e){},5232:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"shopSet"},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.switchTAB,expression:"switchTAB"}]},[e("div",{staticClass:"pageTitle"},[t._v(t._s(this._getVuex("pageTitle")))]),e("div",{staticClass:"shanxdiv-nav"},[e("div",{staticClass:"liwz"},[e("span",{staticClass:"spwz"},[t._v("主 题：")]),e("span",{staticClass:"spwz2"},[t._v(t._s(t.basisData.title))])]),e("div",{staticClass:"liwz"},[e("span",{staticClass:"spwz"},[t._v("发布者：")]),e("span",{staticClass:"spwz2"},[t._v(t._s(t.basisData.nickname))])]),e("div",{staticClass:"liwz"},[e("span",{staticClass:"spwz"},[t._v("店 铺：")]),e("span",{staticClass:"spwz2"},[t._v(t._s(t.basisData.name))])])]),e("div",{staticClass:"shanxdiv_bg"},[e("div",{staticClass:"shanxdiv"},[e("div",{staticClass:"shiheyf"},[t._v("报名者")]),e("el-input",{staticStyle:{width:"350px","margin-right":"10px"},attrs:{placeholder:"搜索报名者ID/昵称"},model:{value:t.user,callback:function(a){t.user=a},expression:"user"}}),e("div",{staticClass:"shiheyf"},[t._v("报名时间")]),e("el-date-picker",{attrs:{type:"datetime",placeholder:"选择开始时间","value-format":"yyyy-MM-dd HH:mm",format:"yyyy-MM-dd HH:mm"},model:{value:t.enroll_time_start,callback:function(a){t.enroll_time_start=a},expression:"enroll_time_start"}}),e("div",{staticClass:"rucwz"},[t._v("-")]),e("el-date-picker",{attrs:{type:"datetime",placeholder:"选择结束时间","value-format":"yyyy-MM-dd HH:mm",format:"yyyy-MM-dd HH:mm"},model:{value:t.enroll_time_end,callback:function(a){t.enroll_time_end=a},expression:"enroll_time_end"}})],1),e("div",{staticClass:"shanxdiv"},[e("div",{staticClass:"shiheyf"},[t._v("取消时间")]),e("el-date-picker",{attrs:{type:"datetime",placeholder:"选择开始时间","value-format":"yyyy-MM-dd HH:mm",format:"yyyy-MM-dd HH:mm"},model:{value:t.cancel_time_start,callback:function(a){t.cancel_time_start=a},expression:"cancel_time_start"}}),e("div",{staticClass:"rucwz"},[t._v("-")]),e("el-date-picker",{attrs:{type:"datetime",placeholder:"选择结束时间","value-format":"yyyy-MM-dd HH:mm",format:"yyyy-MM-dd HH:mm"},model:{value:t.cancel_time_end,callback:function(a){t.cancel_time_end=a},expression:"cancel_time_end"}}),e("div",{staticClass:"shiheyf"},[t._v("状态")]),e("el-select",{staticStyle:{"margin-right":"10px"},attrs:{placeholder:"请选择状态"},model:{value:t.status,callback:function(a){t.status=a},expression:"status"}},t._l(t.statusData,(function(t){return e("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1),e("el-button",{staticClass:"sosuo",attrs:{type:"primary"},on:{click:t.screening}},[t._v("筛选")]),e("el-button",{staticClass:"sosuo",attrs:{type:"info"},on:{click:t.resetData}},[t._v("清空条件")])],1)]),e("el-table",{ref:"multipNum",staticStyle:{width:"100%"},attrs:{stripe:"",data:t.tableListData,"tooltip-effect":"dark"},on:{"selection-change":t.selectItem,"sort-change":t.screeningData}},[e("el-table-column",{attrs:{type:"selection",width:"55"}}),e("el-table-column",{attrs:{label:"ID",width:"220"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("span",[t._v(t._s(a.row.gp_enroll_id))])]}}])}),e("el-table-column",{attrs:{label:"报名者",width:"300"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("div",{staticClass:"duio muzhicss",on:{click:function(e){return t.userInformation(a.row)}}},[a.row.user.avatar?e("el-image",{staticClass:"ustrimg",attrs:{src:a.row.user.avatar}}):t._e(),e("div",[e("div",{staticClass:"bjgt"},[t._v(" "+t._s(a.row.user.nickname)+"（"),1==a.row.user.gender?e("span",[t._v("男")]):e("span",[t._v("女")]),t._v("/"+t._s(a.row.user.age)+"岁） ")])])],1)]}}])}),e("el-table-column",{attrs:{sortable:"custom",label:"礼物",width:"200"}},[[t._v(" "+t._s(t.basisData.average_gift_num)+" ")]],2),e("el-table-column",{attrs:{sortable:"custom",prop:"create_time",label:"报名时间",width:"200"}}),e("el-table-column",{attrs:{sortable:"custom",prop:"audit_time",label:"审核时间",width:"200"}}),e("el-table-column",{attrs:{sortable:"custom",prop:"out_time",label:"取消时间",width:"200"}}),e("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(a){return[1==a.row.status?e("span",[t._v("已报名")]):2==a.row.status?e("span",[t._v("审核通过")]):3==a.row.status?e("span",[t._v("审核不过")]):4==a.row.status?e("span",[t._v("自己退出")]):5==a.row.status?e("span",[t._v("申请到达("+t._s(a.row.apply_arrive_time)+")")]):6==a.row.status?e("span",[t._v("已到达")]):t._e()]}}])})],1),e("div",{staticClass:"pagination"},[e("el-pagination",{attrs:{"current-page":t.curPage,"hide-on-single-page":!0,background:"",layout:"prev, pager, next",total:t.total},on:{"current-change":t.pageChange}})],1),e("el-dialog",{attrs:{title:"T除报名者",visible:t.deleteDialog,width:"30%"},on:{"update:visible":function(a){t.deleteDialog=a}}},[e("span",[t._v('确定要T除"'+t._s(t.nicknameBM)+'"吗')]),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.deleteDialog=!1}}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:function(a){return t.deleteItem("one")}}},[t._v("确定")])],1)]),e("el-dialog",{attrs:{title:"T除报名者",visible:t.mutilDeleteDialog,width:"50%"},on:{"update:visible":function(a){t.mutilDeleteDialog=a}}},[e("span",{staticClass:"s-title"},[t._v("确定要T除以下人员吗?")]),t._l(t.nameArr,(function(a,s){return e("div",{key:s,staticClass:"gz-name"},[t._v(" "+t._s(a)+" ")])})),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.mutilDeleteDialog=!1}}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:function(a){return t.deleteItem("mutil")}}},[t._v("确定")])],1)],2),e("el-dialog",{attrs:{title:"用户信息",visible:t.usertx,width:"70%"},on:{"update:visible":function(a){t.usertx=a}}},[e("userBounced",{ref:"userBounced"})],1)],1),e("GroupDatall",{directives:[{name:"show",rawName:"v-show",value:!t.switchTAB,expression:"!switchTAB"}],ref:"GroupDatail",attrs:{ListData:t.ListData,basisData:t.basisData,userData:t.userData},on:{returnY:t.returnY}}),e("goBack")],1)},i=[],l=(e("4160"),e("a9e3"),e("159b"),function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"biaotou"},[e("div",{staticStyle:{flex:"1"}},[e("el-button",{staticClass:"fanhuian",attrs:{type:"warning"},on:{click:t.returnYM}},[t._v("返回")])],1),e("div",{staticStyle:{width:"200px"}},[e("el-button",{staticClass:"fanhuian",attrs:{type:"primary"},on:{click:t.validation}},[t._v("保存")]),t.areaValue?e("el-button",{staticClass:"fanhuian",attrs:{type:"danger"},on:{click:t.deleteItem}},[t._v("关闭组局")]):e("el-button",{staticClass:"fanhuian",attrs:{type:"danger"}},[t._v("恢复组局")])],1)]),e("div",{staticClass:"yonhdiv"},[e("el-image",{staticClass:"touximg",attrs:{src:t.userData.avatar}}),e("div",{staticClass:"userdiv"},[e("div",{staticClass:"neiwz userdivdl1"},[e("div",{staticClass:"nichenwz"},[e("span",{staticStyle:{"font-weight":"bold"}},[t._v("昵称：")]),t._v(t._s(t.userData.nickname)+" ")]),1==t.userData.gender?e("div",{staticClass:"nianl",staticStyle:{"background-color":"#4e9df8"}},[t._v(" 男 "+t._s(t.userData.age)+" ")]):0==t.userData.gender?e("div",{staticClass:"nianl",staticStyle:{"background-color":"#ea67a7"}},[t._v(" 女 "+t._s(t.userData.age)+" ")]):t._e()]),e("div",{staticClass:"neiwz"},[e("span",{staticStyle:{"font-weight":"bold"}},[t._v("ID：")]),t._v(t._s(t.userData.user_id)+" ")])]),e("div",{staticClass:"userdiv"},[e("div",{staticClass:"neiwz userdivdl2"},[e("span",{staticStyle:{"font-weight":"bold"}},[t._v("状态：")]),1==t.ListData.status?e("span",[t._v("已报名")]):2==t.ListData.status?e("span",[t._v("审核通过")]):3==t.ListData.status?e("span",[t._v("审核不过")]):4==t.ListData.status?e("span",[t._v("被屏蔽")]):5==t.ListData.status?e("span",[t._v("自己退出")]):6==t.ListData.status?e("span",[t._v("被T除")]):t._e()]),e("div",{staticClass:"neiwz"},[e("span",{staticStyle:{"font-weight":"bold"}},[t._v("报名时间：")]),t._v(t._s(t.ListData.create_time)+" ")])]),e("div",{staticClass:"userdiv"},[e("div",{staticClass:"neiwz userdivdl2"},[e("span",{staticStyle:{"font-weight":"bold"}},[t._v("已到场：")]),0==t.ListData.arrive_status?e("span",[t._v("未到达")]):1==t.ListData.arrive_status?e("span",[t._v("申请到达")]):2==t.ListData.arrive_status?e("span",[t._v("确认到达")]):t._e()]),e("div",{staticClass:"neiwz"},[e("span",{staticStyle:{"font-weight":"bold"}},[t._v("取消时间：")]),t._v(t._s(t.ListData.out_time)+" ")])])],1),e("div",{staticClass:"xingdiv"},[e("div",{staticClass:"zhujxin"},[e("div",{staticClass:"biaotwz"},[t._v("组局详情")]),e("el-row",[e("el-col",{staticClass:"zhuiti",staticStyle:{"text-align":"right","font-weight":"bold"},attrs:{span:4}},[t._v("主题：")]),e("el-col",{staticClass:"zhuiti",attrs:{span:20}},[t._v(t._s(t.basisData.title))])],1),e("el-row",{staticStyle:{"margin-top":"20px"}},[e("el-col",{staticClass:"zhuiti",staticStyle:{"text-align":"right","font-weight":"bold"},attrs:{span:4}},[t._v(" 发布者： ")]),e("el-col",{staticClass:"zhuiti",attrs:{span:6}},[t._v(" "+t._s(t.basisData.nickname))]),e("el-col",{staticClass:"zhuiti",staticStyle:{"text-align":"right","font-weight":"bold"},attrs:{span:5}},[t._v("组局人数：")]),e("el-col",{staticClass:"zhuiti",attrs:{span:5}},[t._v(" "+t._s(t.basisData.total_people)+" 人")])],1),e("el-row",{staticStyle:{"margin-top":"20px"}},[e("el-col",{staticClass:"zhuiti",staticStyle:{"text-align":"right","font-weight":"bold"},attrs:{span:5}},[t._v(" 包厢/座位： ")]),e("el-col",{staticClass:"zhuiti",attrs:{span:7}},[t._v(" "+t._s(t.basisData.place_name)+" ")]),e("el-col",{staticClass:"zhuiti",attrs:{span:12}},[e("span",{staticStyle:{"font-weight":"bold"}},[t._v("性别：")]),0==t.basisData.gender_limit?e("span",[t._v("不限")]):1==t.basisData.gender_limit?e("span",[t._v("男")]):2==t.basisData.gender_limit?e("span",[t._v("女")]):t._e()])],1),e("el-row",{staticStyle:{"margin-top":"20px"}},[e("el-col",{staticClass:"zhuiti",staticStyle:{"text-align":"right","font-weight":"bold"},attrs:{span:6}},[t._v(" 活动开始时间： ")]),e("el-col",{staticClass:"zhuiti",attrs:{span:18}},[t._v(t._s(t.basisData.dateline))])],1)],1),e("div",{staticClass:"dianp",staticStyle:{flex:"1"}},[e("div",{staticClass:"biaotwz"},[t._v("店铺信息")]),e("el-row",[e("el-col",{staticClass:"zhuiti",staticStyle:{"text-align":"right","font-weight":"bold"},attrs:{span:10}},[t._v("店铺名称：")]),e("el-col",{staticClass:"zhuiti",attrs:{span:14}},[t._v(t._s(t.basisData.name))])],1),e("el-row",{staticStyle:{"margin-top":"30px"}},[e("el-col",{staticClass:"zhuiti",staticStyle:{"text-align":"center"},attrs:{span:24}},[e("span",{staticStyle:{"font-weight":"bold"}},[t._v("地址：")]),t._v(t._s(t.basisData.address))])],1),e("el-row",{staticStyle:{"margin-top":"30px"}},[e("el-col",{staticClass:"zhuiti",staticStyle:{"text-align":"right","font-weight":"bold"},attrs:{span:10}},[t._v("营业时间：")]),e("el-col",{staticClass:"zhuiti",attrs:{span:14}},[t._v(t._s(t.basisData.business_start_time)+" 至 "+t._s(t.basisData.business_stop_time))])],1)],1),e("div",{staticClass:"dianp",staticStyle:{flex:"1"}},[e("div",{staticClass:"biaotwz"},[t._v("礼物信息")]),e("el-row",[e("el-col",{staticClass:"zhuiti",staticStyle:{"text-align":"center"},attrs:{span:24}},[e("span",{staticStyle:{"font-weight":"bold"}},[t._v("可获得：")]),t._v(t._s(t.ListData.average_gift_num))])],1)],1)])])}),n=[],r={data:function(){return{areaValue:!0,operationData:!1,placeListData:[]}},props:{ListData:{},basisData:{},userData:{}},methods:{validation:function(){""==this.updateData.title?this.$message({message:"请填写主题标题",type:"warning"}):""==this.updateData.total_people?this.$message({message:"请输入人数",type:"warning"}):""==this.updateData.place_name?this.$message({message:"请填写包厢/座位",type:"warning"}):""==this.updateData.dateline?this.$message({message:"请选择活动开始时间",type:"warning"}):this.saveData()},saveData:function(){var t=this,a={gp_id:this.ListData.gp_id,title:this.updateData.title,total_people:this.updateData.total_people,gender_limit:this.updateData.gender_limit,place_name:this.updateData.place_name,dateline:this.updateData.dateline};this.api.group.groupUpdate(a).then((function(a){t.operationData=!0,t.$message({message:"保存成功",type:"success"})}))},concert:function(t,a){var e=this;this.operationData=!1;var s={gp_id:t.gp_id,page:1};this.api.group.groupEnroll(s).then((function(t){e.signData=t.data.data})),this.updateData.title=t.title,this.updateData.total_people=t.total_people,this.updateData.gender_limit=t.gender_limit,this.updateData.place_name=t.place_name,this.updateData.dateline=t.dateline,this.areaValue=0==a},searchDatas:function(t,a){var e=this,s={merchant_id:t,shop_id:a};this.api.shop.placeList(s).then((function(t){e.placeListData=t.data.data}))},returnYM:function(){this.$emit("returnY",this.operationData)},deleteItem:function(){var t=this;this.$confirm("是否将该组局关闭",this.ListData.title,{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var a=new Array;a.push(t.ListData.gp_id);var e={id:a};t.api.group.groupDelete(e).then((function(a){t.operationData=!0,t.areaValue=!1,t.$message({message:"已关闭组局",type:"success"}),t.areaValue=!1}))}))},restoreItem:function(){var t=this;this.$confirm("是否将该组局恢复至原来状态",this.ListData.title,{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var a=new Array;a.push(t.ListData.gp_id);var e={id:a};t.api.group.groupRecovery(e).then((function(a){t.operationData=!0,t.areaValue=!0,t.$message({message:"已恢复组局",type:"success"}),t.areaValue=!0}))}))}}},o=r,c=(e("8dc6"),e("2877")),u=Object(c["a"])(o,l,n,!1,null,"279a34c1",null),d=u.exports,p={name:"groupEnroll",components:{GroupDatall:d},data:function(){return{is_delete:0,switchTAB:!0,enroll_time_start:"",enroll_time_end:"",cancel_time_start:"",cancel_time_end:"",user:"",gp_id:"",sort:"",order:"",status:"",statusData:[{id:1,name:"已报名"},{id:2,name:"审核通过"},{id:3,name:"审核不过"},{id:4,name:"自己退出"},{id:5,name:"申请到达"},{id:6,name:"已到达"}],mutilDeleteDialog:!1,deleteDialog:!1,curPage:1,total:13,rulesForm:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]},tableListData:[],currenDeleteRow:"",multipleSelection:[],nameArr:[],usertx:!1,nicknameBM:"",basisData:{},ListData:{},userData:{}}},created:function(){this.basisData=this.$store.state.temporaryData,this.gp_id=Number(this.$route.query.gp_id),this.getTableList()},methods:{userInformation:function(t){var a=this;this.usertx=!0,setTimeout((function(){a.$refs.userBounced.addID(t.user.user_id)}),0)},screeningData:function(t){t.order?(this.sort=t.prop,this.order="ascending"==t.order?"ASC":"DESC"):(this.sort="",this.order=""),this.getTableList()},Detailed:function(t){this.userData=t.user,this.ListData=t,this.switchTAB=!1},returnY:function(t){this.switchTAB=!0,t&&this.getTableList()},resetData:function(){this.user="",this.status="",this.sort="",this.order="",this.cancel_time_end="",this.cancel_time_start="",this.enroll_time_start="",this.enroll_time_end="",this.curPage=1,this.getTableList()},screening:function(){this.curPage=1,this.getTableList()},getTableList:function(){var t=this,a={enroll_time_start:this.enroll_time_start,enroll_time_end:this.enroll_time_end,cancel_time_start:this.cancel_time_start,cancel_time_end:this.cancel_time_end,user:this.user,gp_id:this.gp_id,sort:this.sort,order:this.order,status:""==this.status?0:this.status,page:this.curPage};this.api.group.groupEnroll(a).then((function(a){t.tableListData=a.data.data,t.total=a.data.count}))},batchDelete:function(){""!=this.multipleSelection?this.mutilDeleteDialog=!0:this.$message({message:"请先勾选要T除的数据",type:"warning"})},openDelDialog:function(t){this.currenDeleteRow=t,this.nicknameBM=t.user.nickname,this.deleteDialog=!0},deleteItem:function(t){var a=this,e=[];"one"==t?e[0]=this.currenDeleteRow.gp_enroll_id:"mutil"==t&&(e=this.multipleSelection);var s={id:e};this.api.group.EnrollDelete(s).then((function(t){a.getTableList(),a.mutilDeleteDialog=!1,a.deleteDialog=!1}))},selectItem:function(t){var a=this;this.multipleSelection=[],this.nameArr=[],t.forEach((function(t,e){a.multipleSelection.push(t.gp_enroll_id),a.nameArr.push(t.user.nickname)}))},pageChange:function(t){this.curPage=t,this.getTableList()}}},_=p,h=(e("6499"),Object(c["a"])(_,s,i,!1,null,"7dccf1ce",null));a["default"]=h.exports},6499:function(t,a,e){"use strict";var s=e("df3e"),i=e.n(s);i.a},"8dc6":function(t,a,e){"use strict";var s=e("517b"),i=e.n(s);i.a},df3e:function(t,a,e){}}]);
//# sourceMappingURL=chunk-2ec2a23e.5fc1c817.js.map