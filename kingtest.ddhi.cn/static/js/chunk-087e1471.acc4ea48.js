(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-087e1471"],{"14d3":function(e,t,a){"use strict";var i=a("97cb"),r=a.n(i);r.a},2991:function(e,t,a){},"4ae5":function(e,t,a){"use strict";var i=a("2991"),r=a.n(i);r.a},"97cb":function(e,t,a){},"9cca":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"uploadFiles"},[a("el-upload",{directives:[{name:"show",rawName:"v-show",value:""!=this.root,expression:"this.root != ''"}],staticClass:"avatar-uploader",attrs:{action:"/api/file/uploads","show-file-list":!1,"file-list":e.fileList,limit:1,"http-request":e.uploadImg,"on-change":e.handleChange,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),a("h4",{directives:[{name:"show",rawName:"v-show",value:""==this.root,expression:"this.root == ''"}]},[e._v("没有设置路径“root”...")])],1)},r=[],s=(a("a9e3"),a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("5f87")),o={name:"uploadImg",props:{defaltIcon:Number,root:{type:String,default:""}},data:function(){return{header:{headers:{"Content-Type":"multipart/form-data; boundary=--------------------------AAAAA",AccessToken:Object(s["a"])()}},fileList:[],DataImg:[],imageUrl:""}},methods:{concert:function(e){this.imageUrl=e},beforeAvatarUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message.error("上传图片大小不能超过 2MB!"),t},handleChange:function(e,t){console.log(e.size);var a=e.size/1024/1024<2;console.log(e.size/1024/1024),console.log(e.size/1024/1024<2),a?(this.DataImg=e.raw,this.imageUrl=URL.createObjectURL(e.raw)):(this.fileList=[],this.DataImg=[])},uploadImg:function(e){var t=this,a=new FormData;a.append("file[]",this.DataImg),a.append("root",this.root),this.$ajax.post("/api/file/uploads",a,this.header).then((function(e){0==e.data.code?(t.fileList=[],t.DataImg=[],t.$emit("theIMG",e.data.data.url_path[0],t.defaltIcon)):(t.fileList=[],t.DataImg=[],t.imageUrl="",t.$message({message:e.data.msg,type:"warning"}))}))}}},l=o,n=(a("14d3"),a("2877")),u=Object(n["a"])(l,i,r,!1,null,null,null);t["a"]=u.exports},c50a:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"shopSet"},[a("div",{staticClass:"pageTitle"},[e._v(e._s(e.pageTitle))]),a("div",{staticClass:"add-box"},[a("div",{staticClass:"btn-nav"},[a("el-button",{attrs:{type:"primary"},on:{click:e.insertTK}},[e._v("新增")]),a("el-button",{attrs:{type:"danger",disabled:!e.multipleSelection.length>0},on:{click:e.batchDelete}},[e._v("删除")])],1),a("div",{staticClass:"so-nav"},[a("el-input",{staticClass:"searchInput",attrs:{placeholder:"请输入要搜索的内容","prefix-icon":"el-icon-search"},on:{change:e.searchDatas},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}}),a("el-button",{attrs:{type:"primary"},on:{click:e.searchDatas}},[e._v("搜索")])],1)]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipNum",staticStyle:{width:"100%"},attrs:{stripe:"",data:e.tableListData,"default-sort":e.defaultSort,"tooltip-effect":"dark"},on:{"selection-change":e.selectItem,"sort-change":e.handleShopSort}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{prop:"type_id",label:"全选/ID",width:"120",sortable:"true"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.type_id))])]}}])}),a("el-table-column",{attrs:{label:"类型图片",width:"80"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-image",{attrs:{src:e.row.type_icon,fit:"fit"}})]}}])}),a("el-table-column",{attrs:{prop:"type_name",label:"类型名称",width:"200"}}),a("el-table-column",{attrs:{prop:"refund_rate",label:"退款手续费比率",sortable:"true"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{color:"#e6a23c"}},[e._v(e._s(t.row.refund_rate)+" %")])]}}])}),a("el-table-column",{attrs:{prop:"refund_platform_commission",label:"退款手续费平台抽成",sortable:"true"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{color:"#67c23a"}},[e._v(e._s(t.row.refund_platform_commission)+" %")])]}}])}),a("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.type_status?a("span",{staticStyle:{color:"#f56c6c","font-weight":"bold"}},[a("i",{staticClass:"el-icon-close"})]):e._e(),1==t.row.type_status?a("span",{staticStyle:{color:"#409eff","font-weight":"bold"}},[a("i",{staticClass:"el-icon-check"})]):e._e()]}}])}),a("el-table-column",{attrs:{align:"right",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.openUpdateDialog(t.$index,JSON.parse(JSON.stringify(t.row)),"type")}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.openDelDialog(t.row)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{"current-page":e.curPage,"hide-on-single-page":!0,background:"",layout:"prev, pager, next",total:e.total},on:{"prev-click":function(t){return e.pageChange(e.curPage-1)},"current-change":e.pageChange,"next-click":function(t){return e.pageChange(e.curPage+1)}}})],1),a("el-dialog",{attrs:{title:"新增",visible:e.insertDialog},on:{"update:visible":function(t){e.insertDialog=t}}},[a("el-form",{ref:"formName",staticClass:"updateArea",attrs:{model:e.addItem,"label-width":"200px",rules:e.rulesForm}},[a("el-form-item",{attrs:{label:"类型名称",prop:"type_name"}},[a("el-input",{staticClass:"inputap",model:{value:e.addItem.type_name,callback:function(t){e.$set(e.addItem,"type_name",t)},expression:"addItem.type_name"}})],1),a("el-form-item",{attrs:{label:"图标",prop:"type_icon"}},[a("uploadFiles",{ref:"uploadImg",attrs:{root:"shop","image-url":e.addItem.type_icon},on:{theIMG:e.theIMG}})],1),a("el-form-item",{attrs:{label:"退款手续费比率",prop:"refund_rate"}},[a("el-input",{staticClass:"inputap",model:{value:e.addItem.refund_rate,callback:function(t){e.$set(e.addItem,"refund_rate",t)},expression:"addItem.refund_rate"}})],1),a("el-form-item",{attrs:{label:"退款手续费平台抽成",prop:"refund_platform_commission"}},[a("el-input",{staticClass:"inputap",model:{value:e.addItem.refund_platform_commission,callback:function(t){e.$set(e.addItem,"refund_platform_commission",t)},expression:"addItem.refund_platform_commission"}}),e._v(" % ")],1),a("el-form-item",{attrs:{label:"排序",prop:"type_displayorder"}},[a("el-input",{staticClass:"inputap",model:{value:e.addItem.type_displayorder,callback:function(t){e.$set(e.addItem,"type_displayorder",t)},expression:"addItem.type_displayorder"}}),e._v(" % ")],1),a("el-form-item",{attrs:{label:"状态",prop:"type_status"}},[a("el-select",{attrs:{placeholder:"请选择状态"},model:{value:e.addItem.type_status,callback:function(t){e.$set(e.addItem,"type_status",t)},expression:"addItem.type_status"}},[a("el-option",{key:"0",attrs:{label:"禁用",value:"0"}}),a("el-option",{key:"1",attrs:{label:"正常",value:"1"}})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.insertDialog=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.insertItem}},[e._v("确定")])],1)],1),a("el-dialog",{attrs:{title:e.updateDialogTitle,visible:e.updateDialog},on:{"update:visible":function(t){e.updateDialog=t}}},[a("el-form",{ref:"updateArea",staticClass:"updateArea",attrs:{"label-width":"200px",rules:e.rulesForm}},[a("el-form-item",{attrs:{label:"类型名称",prop:"type_name"}},[a("el-input",{staticClass:"inputap",model:{value:e.currenItem.type_name,callback:function(t){e.$set(e.currenItem,"type_name",t)},expression:"currenItem.type_name"}})],1),a("el-form-item",{attrs:{label:"图标",prop:"type_icon"}},[a("uploadFiles",{ref:"uploadImg",attrs:{root:"shop"},on:{theIMG:e.theIMG}})],1),a("el-form-item",{attrs:{label:"退款手续费比率",prop:"type_refund_rate"}},[a("el-input",{staticClass:"inputap",model:{value:e.currenItem.type_refund_rate,callback:function(t){e.$set(e.currenItem,"type_refund_rate",t)},expression:"currenItem.type_refund_rate"}}),e._v(" % ")],1),a("el-form-item",{attrs:{label:"退款手续费平台抽成",prop:"type_refund_platform_commission"}},[a("el-input",{staticClass:"inputap",model:{value:e.currenItem.type_refund_platform_commission,callback:function(t){e.$set(e.currenItem,"type_refund_platform_commission",t)},expression:"currenItem.type_refund_platform_commission"}}),e._v(" % ")],1),a("el-form-item",{attrs:{label:"排序值"}},[a("el-input",{staticClass:"inputap",model:{value:e.currenItem.type_displayorder,callback:function(t){e.$set(e.currenItem,"type_displayorder",t)},expression:"currenItem.type_displayorder"}})],1),a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{placeholder:"请选择状态"},model:{value:e.currenItem.type_status,callback:function(t){e.$set(e.currenItem,"type_status",t)},expression:"currenItem.type_status"}},[a("el-option",{key:"0",attrs:{label:"禁用",value:"0"}}),a("el-option",{key:"1",attrs:{label:"正常",value:"1"}})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.updateDialog=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.multiUpdate}},[e._v("确定")])],1)],1),a("el-dialog",{attrs:{title:"删除-"+e.deltitle,visible:e.deleteDialog,width:"30%"},on:{"update:visible":function(t){e.deleteDialog=t}}},[a("span",[e._v("确定要删除此项吗")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.deleteDialog=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.deleteItem("one")}}},[e._v("确定")])],1)]),a("el-dialog",{attrs:{title:"删除",visible:e.mutilDeleteDialog,width:"50%"},on:{"update:visible":function(t){e.mutilDeleteDialog=t}}},[a("span",{staticClass:"s-title"},[e._v("确定要删除以下内容吗?")]),e._l(e.nameArr,(function(t,i){return a("div",{key:i,staticClass:"gz-name"},[e._v(" "+e._s(t)+" ")])})),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.mutilDeleteDialog=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.deleteItem("mutil")}}},[e._v("确定")])],1)],2)],1)},r=[],s=(a("4160"),a("a9e3"),a("159b"),a("9cca")),o={name:"ShopType",data:function(){return{loading:!1,order:"",sort:"",sortableList:{ascending:"asc",descending:"desc",asc:"ascending",desc:"descending"},defaultSort:{},fileList:[{name:"01.jpeg",url:""}],mutilUpdateDialog:!1,updateDialog:!1,insertDialog:!1,mutilDeleteDialog:!1,deleteDialog:!1,curPage:1,total:13,rulesForm:{type_name:[{required:!0,message:"请输入名称",trigger:"blur"}],type_icon:[{required:!0,message:"请设置logo",trigger:"blur"}],type_refund_rate:[{required:!0,message:"请输入退款手续费比例",trigger:"blur"}],refund_rate:[{required:!0,message:"请输入退款手续费比例",trigger:"blur"}],type_refund_platform_commission:[{required:!0,message:"退款手续费平台抽成",trigger:"blur"}],refund_platform_commission:[{required:!0,message:"退款手续费平台抽成",trigger:"blur"}]},tableListData:[],addItem:{type_name:"",type_icon:"",type_displayorder:0,type_status:"1",refund_rate:"",refund_platform_commission:""},currenItem:{type_id:1,type_name:"hahah",type_icon:"hahah",type_displayorder:0,type_status:"1"},currenDeleteRow:"",multipleSelection:[],nameArr:[],updateDialogTitle:"",deltitle:"",searchValue:""}},components:{uploadFiles:s["a"]},created:function(){this.iniPageParam(),this.getTableList(this.curPage)},watch:{$route:function(e,t){this.iniPageParam(),this.getTableList(this.curPage)}},computed:{pageTitle:function(){return this._getVuex("pageTitle")}},methods:{iniPageParam:function(){this.curPage=this.$route.query.page?Number(this.$route.query.page):1,this.order=this.$route.query.order,this.sort=this.$route.query.sort,this.searchValue=this.$route.query.query?decodeURIComponent(this.$route.query.query):"",this.defaultSort={prop:this.sort,order:this.sortableList[this.order]}},handleShopSort:function(e){this.sort=e.order?e.prop:"",this.order=e.order?this.sortableList[e.order]:"",this.curPage=1,this.pageChange(this.curPage)},getTableList:function(e){var t=this;this.loading=!0;var a={page:e,name:this.searchValue};this.$store.dispatch("shop/getShopType",a).then((function(e){t.loading=!1,t.tableListData=e.data,t.total=e.count}))},searchDatas:function(){var e=this,t={name:this.searchValue};this.loading=!0,this.$store.dispatch("shop/getShopType",t).then((function(t){console.log(t),e.loading=!1,e.tableListData=t.data,e.total=t.count}))},deleteItem:function(e){var t=this,a="one"===e?{id:[this.currenDeleteRow.type_id]}:{id:this.multipleSelection};this.loading=!0,this.$store.dispatch("shop/deleteShopType",a).then((function(e){t.loading=!1,t.getTableList(t.curPage),t.mutilDeleteDialog=!1,t.deleteDialog=!1}))},insertTK:function(){var e=this;setTimeout((function(){e.$refs.uploadImg.concert("")}),0),this.addItem.type_status="1",this.insertDialog=!0},insertItem:function(){var e=this,t={refund_rate:Number(this.addItem.refund_rate),refund_platform_commission:Number(this.addItem.refund_platform_commission),type_name:this.addItem.type_name,type_icon:this.addItem.type_icon,type_displayorder:parseInt(this.addItem.type_displayorder),type_status:Number(this.addItem.type_status)};this.loading=!0,this.$store.dispatch("shop/insertShopType",t).then((function(t){e.loading=!1,e.$refs["formName"].resetFields(),e.getTableList(e.curPage),e.insertDialog=!1}))},multiUpdate:function(){var e=this,t={refund_rate:Number(this.currenItem.type_refund_rate),refund_platform_commission:Number(this.currenItem.type_refund_platform_commission),type_id:this.currenItem.type_id,type_name:this.currenItem.type_name,type_icon:this.currenItem.type_icon,type_displayorder:parseInt(this.currenItem.type_displayorder),type_status:Number(this.currenItem.type_status)};this.$store.dispatch("shop/updateShopType",t).then((function(t){e.getTableList(e.curPage),e.updateDialog=!1}))},batchDelete:function(){this.multipleSelection.length>0?this.mutilDeleteDialog=!0:this.$message({message:"请先勾选要删除的类型",type:"warning"})},openDelDialog:function(e){this.deltitle=e.type_name,this.currenDeleteRow=e,this.deleteDialog=!0},openUpdateDialog:function(e,t){this.updateDialog=!0,this.updateDialogTitle="修改-"+t.type_name;var a=this;setTimeout((function(){a.$refs.uploadImg.concert(t.type_icon)}),0),this.currenItem={type_id:t.type_id,type_name:t.type_name,type_icon:t.type_icon,type_displayorder:t.type_displayorder,type_refund_rate:t.refund_rate,type_refund_platform_commission:t.refund_platform_commission,type_status:String(t.type_status)}},theIMG:function(e){console.info(e),this.addItem.type_icon=e,this.currenItem.type_icon=e},selectItem:function(e){var t=this;this.multipleSelection=[],this.nameArr=[],e.forEach((function(e,a){t.multipleSelection.push(e.type_id),t.nameArr.push(e.type_name)}))},pageChange:function(e){this.curPage=e,this.$router.push({path:"/shopType",query:{page:e,query:this.searchValue?encodeURIComponent(this.searchValue):"",sort:this.sort,order:this.order}})}}},l=o,n=(a("4ae5"),a("2877")),u=Object(n["a"])(l,i,r,!1,null,"6cbae98c",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-087e1471.acc4ea48.js.map