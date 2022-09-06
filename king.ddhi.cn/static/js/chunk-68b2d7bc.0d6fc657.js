(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-68b2d7bc"],{"09fc":function(e,t,r){"use strict";var i=r("5913"),n=r.n(i);n.a},"180f":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"shopSet"},[i("div",{staticClass:"add-box"},[i("el-button",{attrs:{type:"danger"},on:{click:e.batchDelete}},[e._v("删除")]),i("el-button",{attrs:{type:"primary"},on:{click:e.addPrinter}},[e._v("新增")]),i("el-input",{staticClass:"searchInput",attrs:{placeholder:"请输入要搜索的内容","prefix-icon":"el-icon-search"},on:{change:e.searchDatas},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}})],1),i("el-table",{ref:"multipNum_type",staticStyle:{width:"100%"},attrs:{stripe:"",data:e.printListData,"tooltip-effect":"dark"},on:{"sort-change":e.sortFilterFun,"selection-change":e.selectPrinter}},[i("el-table-column",{attrs:{type:"selection",width:"55"}}),i("el-table-column",{attrs:{label:"全选/ID",width:"120",sortable:"custom"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.printer_id))])]}}])}),i("el-table-column",{attrs:{prop:"name",label:"打印机名称",width:"150"}}),i("el-table-column",{attrs:{prop:"brand",label:"型号",width:"150"}}),i("el-table-column",{attrs:{prop:"sn",label:"编号",width:"150",sortable:"custom"}}),i("el-table-column",{attrs:{prop:"status",label:"状态",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.status?i("span",[e._v("禁用")]):e._e(),1==t.row.status?i("span",[e._v("正常")]):e._e()]}}])}),i("el-table-column",{attrs:{align:"right",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"mini"},on:{click:function(r){e.updateDialog(t.$index,JSON.parse(JSON.stringify(t.row)),"type")}}},[e._v("修改/查看")]),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){return e.openDelDialog(t.row)}}},[e._v("删除")])]}}])})],1),i("div",{staticClass:"pagination"}),i("el-dialog",{attrs:{title:e.printerDialogTitle,visible:e.printDetail,width:"50%"},on:{"update:visible":function(t){e.printDetail=t}}},[i("el-form",{ref:"updateForm",staticClass:"demo-ruleForm",attrs:{model:e.currenPrinter,rules:e.rulesForm,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"打印机型号",prop:"brand"}},[i("el-input",{model:{value:e.currenPrinter.brand,callback:function(t){e.$set(e.currenPrinter,"brand",t)},expression:"currenPrinter.brand"}})],1),i("el-form-item",{attrs:{label:"打印机名称",prop:"name"}},[i("el-input",{model:{value:e.currenPrinter.name,callback:function(t){e.$set(e.currenPrinter,"name",t)},expression:"currenPrinter.name"}})],1),i("el-form-item",{attrs:{label:"编号",prop:"sn"}},[i("el-input",{model:{value:e.currenPrinter.sn,callback:function(t){e.$set(e.currenPrinter,"sn",t)},expression:"currenPrinter.sn"}})],1),i("el-form-item",{attrs:{label:"终端密钥",prop:"key"}},[i("el-input",{model:{value:e.currenPrinter.key,callback:function(t){e.$set(e.currenPrinter,"key",t)},expression:"currenPrinter.key"}})],1),i("el-form-item",{attrs:{label:"打印联数",prop:"times"}},[i("el-input",{model:{value:e.currenPrinter.times,callback:function(t){e.$set(e.currenPrinter,"times",t)},expression:"currenPrinter.times"}})],1),i("el-form-item",{attrs:{label:"自定义信息",prop:"custom_info"}},[i("el-input",{model:{value:e.currenPrinter.custom_info,callback:function(t){e.$set(e.currenPrinter,"custom_info",t)},expression:"currenPrinter.custom_info"}}),i("br"),i("el-checkbox",{model:{value:e.currenPrinter.custom_info_larger,callback:function(t){e.$set(e.currenPrinter,"custom_info_larger",t)},expression:"currenPrinter.custom_info_larger"}},[e._v("是否放大自定义信息")])],1),i("el-form-item",{attrs:{label:"二维码"}},[i("el-checkbox",{model:{value:e.currenPrinter.show_qr,callback:function(t){e.$set(e.currenPrinter,"show_qr",t)},expression:"currenPrinter.show_qr"}},[e._v("是否显示二维码")])],1),i("el-form-item",{attrs:{label:"商家信息"}},[i("el-checkbox",{model:{value:e.currenPrinter.show_phone,callback:function(t){e.$set(e.currenPrinter,"show_phone",t)},expression:"currenPrinter.show_phone"}},[e._v("是否显示商家信息")])],1),i("el-form-item",{attrs:{label:"状态"}},[i("el-checkbox",{model:{value:e.currenPrinter.status,callback:function(t){e.$set(e.currenPrinter,"status",t)},expression:"currenPrinter.status"}},[e._v("是否启用")])],1),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.updatePrinter("updateForm")}}},[e._v("保存")]),i("el-button",{on:{click:function(t){return e.resetForm("updateForm")}}},[e._v("取消")])],1),i("el-form-item",{staticClass:"printerImg"},[i("img",{staticStyle:{width:"418px",height:"530px"},attrs:{src:r("a023")}})])],1)],1),i("el-dialog",{ref:"addForm",attrs:{title:"新增打印机",visible:e.showAddDialog,width:"50%"},on:{"update:visible":function(t){e.showAddDialog=t}}},[i("el-form",{ref:"updateForm",staticClass:"demo-ruleForm",attrs:{model:e.addPrinterData,rules:e.rulesForm,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"打印机名称",prop:"name"}},[i("el-input",{model:{value:e.addPrinterData.name,callback:function(t){e.$set(e.addPrinterData,"name",t)},expression:"addPrinterData.name"}})],1),i("el-form-item",{attrs:{label:"型号",prop:"brand"}},[i("el-input",{model:{value:e.addPrinterData.brand,callback:function(t){e.$set(e.addPrinterData,"brand",t)},expression:"addPrinterData.brand"}})],1),i("el-form-item",{attrs:{label:"编号",prop:"sn"}},[i("el-input",{model:{value:e.addPrinterData.sn,callback:function(t){e.$set(e.addPrinterData,"sn",t)},expression:"addPrinterData.sn"}})],1),i("el-form-item",{attrs:{label:"终端密钥",prop:"key"}},[i("el-input",{model:{value:e.addPrinterData.key,callback:function(t){e.$set(e.addPrinterData,"key",t)},expression:"addPrinterData.key"}})],1),i("el-form-item",{attrs:{label:"打印联数",prop:"times"}},[i("el-input",{model:{value:e.addPrinterData.times,callback:function(t){e.$set(e.addPrinterData,"times",t)},expression:"addPrinterData.times"}})],1),i("el-form-item",{attrs:{label:"自定义信息"}},[i("el-input",{model:{value:e.addPrinterData.custom_info,callback:function(t){e.$set(e.addPrinterData,"custom_info",t)},expression:"addPrinterData.custom_info"}}),i("el-checkbox",{model:{value:e.currenPrinter.custom_info_larger,callback:function(t){e.$set(e.currenPrinter,"custom_info_larger",t)},expression:"currenPrinter.custom_info_larger"}},[e._v("是否放大自定义信息")])],1),i("el-form-item",{attrs:{label:"二维码"}},[i("el-checkbox",{model:{value:e.currenPrinter.show_qr,callback:function(t){e.$set(e.currenPrinter,"show_qr",t)},expression:"currenPrinter.show_qr"}},[e._v("是否显示二维码")])],1),i("el-form-item",{attrs:{label:"商家信息"}},[i("el-checkbox",{model:{value:e.currenPrinter.show_phone,callback:function(t){e.$set(e.currenPrinter,"show_phone",t)},expression:"currenPrinter.show_phone"}},[e._v("是否显示商家信息")])],1),i("el-form-item",{attrs:{label:"状态"}},[i("el-checkbox",{model:{value:e.currenPrinter.status,callback:function(t){e.$set(e.currenPrinter,"status",t)},expression:"currenPrinter.status"}},[e._v("是否启用")])],1),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.insertPrinter("updateForm")}}},[e._v("保存")]),i("el-button",{on:{click:function(t){return e.resetForm("updateForm")}}},[e._v("取消")])],1)],1)],1),i("el-dialog",{attrs:{title:"删除打印机-"+e.deltitle,visible:e.deleteDialog,width:"30%"},on:{"update:visible":function(t){e.deleteDialog=t}}},[i("span",[e._v("确定要删除此打印机吗")]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.deleteDialog=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.deletePrinter("one")}}},[e._v("确定")])],1)]),i("el-dialog",{attrs:{title:"删除打印机",visible:e.mutilDeletePrinterBox,width:"50%"},on:{"update:visible":function(t){e.mutilDeletePrinterBox=t}}},[i("span",{staticClass:"s-title"},[e._v("确定要删除以下打印机吗?")]),e._l(e.nameArr,(function(t,r){return i("div",{key:r,staticClass:"gz-name"},[e._v(" "+e._s(t)+" ")])})),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.mutilDeletePrinterBox=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.deletePrinter("mutil")}}},[e._v("确定")])],1)],2)],1)},n=[],a=(r("4160"),r("b0c0"),r("a9e3"),r("159b"),r("ade3")),s={name:"ShopSet",data:function(){return{merchants:{shop_id:0,merchant_id:0},msg:"店铺打印机",srcList:[],searchValue:"",printDetail:!1,mutilDeletePrinterBox:!1,deleteDialog:!1,showUpdateDialog:!1,showAddDialog:!1,printerDialogTitle:"",currenDeleteRow:{},deltitle:"",curPage:1,total:0,multipleSelection:"",nameArr:[],printListData:[Object(a["a"])({printer_id:"",name:"",brand:"",sn:"",status:""},"printer_id","")],addPrinterData:{name:"",brand:"",sn:"",key:"",times:null,custom_info:"",custom_info_larger:"",show_qr:"",show_phone:""},currenPrinter:{shop_id:0,merchant_id:0,printer_id:"",name:"",brand:"",sn:"",status:"",key:"",times:null,custom_info:"",custom_info_larger:"",show_qr:"",show_phone:""},rulesForm:{name:[{required:!0,message:"请输入打印机名称",trigger:"blur"}],brand:[{required:!0,message:"请输入品牌名称",trigger:"blur"}],sn:[{required:!0,message:"请输入终端编号",trigger:"blur"}],times:[{required:!0,message:"请输入打印联数",trigger:"blur"}],key:[{required:!0,message:"请输入终端密钥",trigger:"blur"}],custom_info:[{required:!0,message:"请输入自定义信息",trigger:"blur"}]}}},created:function(){if(this.$route.query.shop_id&&this.$route.query.merchant_id)this.merchants.shop_id=Number(this.$route.query.shop_id),this.merchants.merchant_id=Number(this.$route.query.merchant_id),this.$store.dispatch("updateVuex",{key:"merchantsData",value:this.merchants});else{var e=this.$store.state.merchantsData;this.merchants.shop_id=Number(e.shop_id),this.merchants.merchant_id=Number(e.merchant_id)}this.getPrinterList(this.curPage)},methods:{getPrinterList:function(e){var t=this,r={merchant_id:this.merchants.merchant_id,shop_id:this.merchants.shop_id,page:e};this.$store.dispatch("shop/printerList",r).then((function(e){console.log(e),t.printListData=e.data,t.total=e.count}))},updatePrinter:function(e){var t=this;this.currenPrinter.times=parseInt(this.currenPrinter.times),this.currenPrinter.custom_info_larger=!0===this.currenPrinter.custom_info_larger?1:0,this.currenPrinter.show_qr=!0===this.currenPrinter.show_qr?1:0,this.currenPrinter.show_phone=!0===this.currenPrinter.show_phone?1:0,this.currenPrinter.shop_id=this.merchants.shop_id,this.currenPrinter.merchant_id=this.merchants.merchant_id,this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;t.$store.dispatch("shop/updatePrinter",t.currenPrinter).then((function(e){t.$message({message:e.msg,type:"success"}),t.getPrinterList(t.curPage),t.printDetail=!1}))}))},sortMethod:function(e){var t=this,r="asc";this.sortStatus=!this.sortStatus,r=this.sortStatus?"asc":"desc";var i={page:this.curPage,sort:e,order:r};this.$store.dispatch("shop/printerList",i).then((function(e){t.printListData=e.data,t.total=e.count}))},sortFilterFun:function(e){this.sortMethod(e.prop)},searchDatas:function(){var e=this,t={name:this.searchValue};this.$store.dispatch("shop/printerList",t).then((function(t){e.printListData=t.data,e.total=t.count}))},openDelDialog:function(e){this.deltitle=e.name,this.currenDeleteRow=e,this.deleteDialog=!0},addPrinter:function(){this.showAddDialog=!0},insertPrinter:function(){var e=this,t={merchant_id:this.merchants.merchant_id,shop_id:this.merchants.shop_id,name:this.addPrinterData.name,brand:this.addPrinterData.brand,sn:this.addPrinterData.sn,key:this.addPrinterData.key,times:parseInt(this.addPrinterData.times),custom_info:this.addPrinterData.custom_info,custom_info_larger:this.addPrinterData.custom_info_larger?1:0,show_qr:this.addPrinterData.show_qr?1:0,show_phone:this.addPrinterData.show_phone?1:0};this.$store.dispatch("shop/insertPrinter",t).then((function(t){e.$message({message:"添加成功",type:"success"}),e.getPrinterList(e.curPage),e.resetForm("updateForm"),e.showAddDialog=!1}))},batchDelete:function(){this.multipleSelection?this.mutilDeletePrinterBox=!0:this.$message({message:"请先勾选要删除的打印机",type:"warning"})},deletePrinter:function(e){var t=this,r=[];r.push(this.currenDeleteRow.printer_id);var i="one"===e?{id:r}:{id:this.multipleSelection},n={merchant_id:this.merchants.merchant_id,shop_id:this.merchants.shop_id,id:i};this.$store.dispatch("shop/deletePrinter",n).then((function(e){t.$message({message:""+e.msg,type:"success"}),t.getPrinterList(t.curPage),t.mutilDeletePrinterBox=!1,t.deleteDialog=!1}))},updateDialog:function(e,t){this.printDetail=!0,this.printerDialogTitle="打印机管理-"+t.name,this.currenPrinter={printer_id:t.printer_id,name:t.name,sn:t.sn,brand:t.brand,status:t.status,key:t.key,times:t.times,custom_info:t.custom_info,custom_info_larger:t.custom_info_larger,show_qr:t.show_qr,show_phone:t.show_phone}},selectPrinter:function(e){var t=this;this.multipleSelection="",this.nameArr=[],e.forEach((function(e,r){t.multipleSelection+=(r>0?",":"")+e.printer_id,t.nameArr.push(e.name)}))},prePage:function(){this.curPage-=1,this.getPrinterList(this.curPage)},pageChange:function(e){this.curPage=e,this.getPrinterList(this.curPage)},nextPage:function(){this.curPage+=1,this.getPrinterList(this.curPage)},resetForm:function(e){this.$refs[e].resetFields()}}},o=s,l=(r("27d3"),r("09fc"),r("2877")),c=Object(l["a"])(o,i,n,!1,null,"76b00210",null);t["default"]=c.exports},"27d3":function(e,t,r){"use strict";var i=r("aa7e"),n=r.n(i);n.a},5913:function(e,t,r){},a023:function(e,t,r){e.exports=r.p+"static/img/print1.a8c30706.png"},aa7e:function(e,t,r){}}]);
//# sourceMappingURL=chunk-68b2d7bc.0d6fc657.js.map