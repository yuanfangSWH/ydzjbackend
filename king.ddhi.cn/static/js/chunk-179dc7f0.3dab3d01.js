(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-179dc7f0"],{"2b9d":function(t,e,i){"use strict";var a=i("ed98"),s=i.n(a);s.a},"3d93":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"shopSet"},[i("div",{staticClass:"pageTitle"},[t._v(t._s(this._getVuex("pageTitle")))]),i("div",{staticClass:"shanxdiv"},[i("el-input",{staticStyle:{width:"350px","margin-right":"10px"},attrs:{placeholder:"用户ID/手机号",clearable:""},model:{value:t.searchOption.user,callback:function(e){t.$set(t.searchOption,"user",e)},expression:"searchOption.user"}}),i("el-input",{staticStyle:{width:"350px","margin-right":"10px"},attrs:{placeholder:"设备号",clearable:""},model:{value:t.searchOption.registration_id,callback:function(e){t.$set(t.searchOption,"registration_id",e)},expression:"searchOption.registration_id"}}),i("el-input",{staticStyle:{width:"350px","margin-right":"10px"},attrs:{placeholder:"IP",clearable:""},model:{value:t.searchOption.ip,callback:function(e){t.$set(t.searchOption,"ip",e)},expression:"searchOption.ip"}}),i("el-date-picker",{staticClass:"datePicker",attrs:{type:"datetimerange","picker-options":t.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right","value-format":"yyyy-MM-dd HH:mm",format:"yyyy-MM-dd HH:mm"},on:{change:t.dateChange},model:{value:t.searchTime,callback:function(e){t.searchTime=e},expression:"searchTime"}}),i("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:t.screening}},[t._v("筛选")]),i("el-button",{attrs:{type:"info"},on:{click:t.resetData}},[t._v("清空条件")])],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipNum",staticStyle:{width:"100%"},attrs:{stripe:"",data:t.tableListData,"tooltip-effect":"dark"},on:{"sort-change":t.handleDataSort}},[i("el-table-column",{attrs:{prop:"create_time",label:"登录时间",width:"180",sortable:"true"}}),i("el-table-column",{attrs:{prop:"nickname",label:"用户"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.User?i("div",[t._v(t._s(e.row.User.nickname))]):t._e(),e.row.User?i("div",[t._v(t._s(e.row.admin_phone))]):t._e()]}}])}),i("el-table-column",{attrs:{prop:"app_version",label:"APP",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",[t._v("V "+t._s(e.row.app_version))]),i("div",[t._v(t._s(e.row.channel))])]}}])}),i("el-table-column",{attrs:{prop:"ip",label:"IP"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",[t._v(t._s(e.row.ipaddress))]),i("div",[t._v(t._s(e.row.address))])]}}])}),i("el-table-column",{attrs:{prop:"address",label:"地区"}}),i("el-table-column",{attrs:{label:"经纬度"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-link",{attrs:{type:"primary"},on:{click:function(i){return t.showTheMap(e.row.longitude,e.row.latitude)}}},[t._v(t._s(e.row.longitude)+","+t._s(e.row.latitude))])]}}])}),i("el-table-column",{attrs:{prop:"device_brand",label:"品牌/型号"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",[t._v(t._s(e.row.device_brand))]),i("div",[t._v(t._s(e.row.device_type))])]}}])}),i("el-table-column",{attrs:{label:"系统"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",[t._v(t._s(e.row.platform))]),i("div",[t._v(t._s(e.row.os_version))])]}}])}),i("el-table-column",{attrs:{prop:"registration_id",label:"设备号"}})],1),i("div",{staticClass:"pagination"},[i("el-pagination",{attrs:{"current-page":t.searchOption.page,"hide-on-single-page":!0,background:"",layout:"prev, pager, next",total:t.total},on:{"current-change":t.pageChange}})],1),i("el-dialog",{attrs:{title:"位置信息",visible:t.mapForAdd.dialogVisible,"custom-class":"baidu-map",width:"80%"},on:{"update:visible":function(e){return t.$set(t.mapForAdd,"dialogVisible",e)}}},[i("amap",{attrs:{location:t.locationData}})],1),i("el-dialog",{attrs:{title:"详情信息",visible:t.detailsDialog,width:"50%"},on:{"update:visible":function(e){t.detailsDialog=e}}},[i("el-form",{staticClass:"demo-ruleForm",attrs:{"v-model":t.detailsData,"label-width":"150px"}},[i("el-form-item",{attrs:{label:"日志ID："}},[t._v(" "+t._s(t.detailsData.log_id)+" ")]),i("el-form-item",{attrs:{label:"管理员："}},[t._v(" "+t._s(t.detailsData.AdminName)+" (ID："+t._s(t.detailsData.admin_id)+") ")]),i("el-form-item",{attrs:{label:"IP："}},[t._v(" "+t._s(t.detailsData.log_ip)+" ")]),i("el-form-item",{attrs:{label:"操作时间："}},[t._v(" "+t._s(t.detailsData.log_time)+" ")]),i("el-form-item",{attrs:{label:"操作内容："}},[t._v(" "+t._s(t.detailsData.log_content)+" ")]),i("el-form-item",{attrs:{label:"操作接口："}},[t._v(" "+t._s(t.detailsData.log_url)+" ")]),i("el-form-item",{attrs:{label:"POST参数内容："}},[i("div",{staticStyle:{width:"400px",height:"100px",overflow:"auto"}},[t._v(" "+t._s(t.detailsData.log_req_raw)+" ")])])],1)],1)],1)},s=[],r=(i("a9e3"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"amap-wrapper"},[i("el-amap",{staticClass:"amap-box",attrs:{vid:"amap-vue",center:t.mapCenter,zoom:t.zoom}},t._l(t.markers,(function(t,e){return i("el-amap-marker",{key:"p_"+e,attrs:{position:t.position,vid:e}})})),1)],1)}),o=[],n={name:"ShowMap",props:{location:{type:Object}},watch:{location:{immediate:!0,handler:function(t){t&&(this.markers=[t],this.points=[t],this.mapCenter=[t.lng,t.lat],this.zoom=18)}}},data:function(){return{points:[],markers:[],mapCenter:[]}},methods:{}},l=n,c=(i("2b9d"),i("2877")),d=Object(c["a"])(l,r,o,!1,null,"2546e0ce",null),p=d.exports,u={name:"userLogin",components:{amap:p},data:function(){return{locationData:[],searchOption:{user:"",ip:"",city_id:"",registration_id:"",order:"",sort:"",page:1,login_time_start:"",login_time_end:""},searchTime:["",""],detailsDialog:!1,total:1,tableListData:[],detailsData:{},loading:!1,mapForAdd:{dialogVisible:!1,mapHeight:450,height:"80%",width:"85%",longitude:"",latitude:"",title:"目标位置"},sortableList:{ascending:"asc",descending:"desc",asc:"ascending",desc:"descending"},pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-6048e5),t.$emit("pick",[i,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-2592e6),t.$emit("pick",[i,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-7776e6),t.$emit("pick",[i,e])}}]}}},created:function(){this.iniPageParam(),this.getTableList()},watch:{$route:function(t,e){this.iniPageParam(),this.getTableList()}},methods:{iniPageParam:function(){this.searchOption={user:this.$route.query.user,city_id:this.$route.query.city_id,ip:this.$route.query.ip,registration_id:this.$route.query.registration_id,order:this.$route.query.order,sort:this.$route.query.sort,page:this.$route.query.page?Number(this.$route.query.page):1,login_time_start:this.$route.query.login_time_start,login_time_end:this.$route.query.login_time_end},this.searchTime[0]=this.$route.query.login_time_start?this.$route.query.login_time_start:"",this.searchTime[1]=this.$route.query.login_time_end?this.$route.query.login_time_end:""},handleDataSort:function(t){this.searchOption.sort=t.order?t.prop:"",this.searchOption.order=t.order?this.sortableList[t.order]:"",this.searchOption.page=1,this.pageChange()},dateChange:function(t){t&&(this.searchOption.login_time_start=t[0],this.searchOption.login_time_end=t[1])},resetData:function(){this.searchOption={user:"",ip:"",city_id:"",registration_id:"",order:"",sort:"",page:1,login_time_start:"",login_time_end:""},this.searchTime=["",""],this.getTableList()},screening:function(){this.searchOption.page=1,this.pageChange()},getTableList:function(){var t=this,e=this.searchOption;this.api.system.UserLogin(e).then((function(e){t.tableListData=e.data.data,t.total=e.data.count}))},detailsDelDialog:function(t){this.detailsData=t,this.detailsDialog=!0},pageChange:function(t){this.searchTime||(this.searchTime=["",""],this.searchOption.login_time_start=this.searchTime[0],this.searchOption.login_time_end=this.searchTime[1]),t&&(this.searchOption.page=t),this.$router.push({path:"/userLogin",query:this.searchOption})},showTheMap:function(t,e,i){this.mapForAdd.longitude=t,this.mapForAdd.latitude=e,this.locationData={lng:t,lat:e,address:"",position:[t,e]},this.mapForAdd.dialogVisible=!this.mapForAdd.dialogVisible},closeMaps:function(t){this.mapForAdd.dialogVisible=t}}},h=u,m=(i("a15c"),Object(c["a"])(h,a,s,!1,null,"3897de4b",null));e["default"]=m.exports},"75e1":function(t,e,i){},a15c:function(t,e,i){"use strict";var a=i("75e1"),s=i.n(a);s.a},ed98:function(t,e,i){}}]);
//# sourceMappingURL=chunk-179dc7f0.3dab3d01.js.map