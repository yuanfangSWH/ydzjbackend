(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-430b8813"],{"1e02":function(t,e,a){},"4cde":function(t,e,a){"use strict";var l=a("1e02"),r=a.n(l);r.a},"6d4b":function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"shopSet"},[a("div",{staticClass:"pageTitle"},[t._v(t._s(this._getVuex("pageTitle")))]),a("div",{staticClass:"shanxdiv"},[a("el-input",{staticClass:"searchInput",attrs:{placeholder:"请输入任务名称","suffix-icon":"el-icon-search"},on:{change:t.searchDatas},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}})],1),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableListData,stripe:""},on:{"filter-change":t.filterTagTable,"sort-change":t.screeningData}},[a("el-table-column",{attrs:{prop:"worker_id",label:"ID",width:"100"}}),a("el-table-column",{attrs:{prop:"name",label:"名称",width:"350"}}),a("el-table-column",{attrs:{prop:"func_name",label:"方法名",width:"300"}}),a("el-table-column",{attrs:{"column-key":"running",filters:[{text:"待机",value:0},{text:"执行中",value:1}],"filter-multiple":!1,label:"执行状态",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.running?a("span",[t._v("待机")]):1==e.row.running?a("span",[a("span",{staticStyle:{color:"#6bbe41"}},[t._v("执行中")])]):t._e()]}}])}),a("el-table-column",{attrs:{"column-key":"err",filters:[{text:"出错",value:0},{text:"正常",value:1}],"filter-multiple":!1,label:"执行结果",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tooltip",{attrs:{effect:"dark",content:""!=e.row.err_msg?e.row.err_msg:"空",placement:"bottom"}},[0==e.row.err?a("span",[a("span",{staticStyle:{color:"#e78166"}},[t._v("出错")])]):1==e.row.err?a("span",[a("span",{staticStyle:{color:"#6bbe41"}},[t._v("正常")])]):t._e()])]}}])}),a("el-table-column",{attrs:{prop:"finish_time",label:"上次执行时间",width:"200"}}),a("el-table-column",{attrs:{prop:"elapsed_time",label:"上次执行耗时",width:"200"}}),a("el-table-column",{attrs:{prop:"next_time",label:"下次执行时间",width:"200"}}),a("el-table-column",{attrs:{prop:"timer",label:"周期",width:"200"}}),a("el-table-column",{attrs:{prop:"status",label:"状态","column-key":"status",filters:[{text:"禁用",value:0},{text:"启用",value:1}],"filter-multiple":!1},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.status?a("span",[t._v("禁用")]):t._e(),1==e.row.status?a("span",[t._v("启用")]):t._e()]}}])}),a("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.performDialog(e.row)}}},[t._v("立即执行")]),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.openUpdateDialog(e.row)}}},[t._v("编辑")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{"current-page":t.curPage,"hide-on-single-page":!0,background:"",layout:"prev, pager, next",total:t.total},on:{"current-change":t.pageChange}})],1),a("el-dialog",{attrs:{title:"新增",visible:t.insertDialog},on:{"update:visible":function(e){t.insertDialog=e}}},[a("el-form",{ref:"formName",staticClass:"updateArea",attrs:{model:t.addItem,rules:t.rules,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"名称",prop:"tag_name"}},[a("el-input",{attrs:{clearable:""},model:{value:t.addItem.tag_name,callback:function(e){t.$set(t.addItem,"tag_name",e)},expression:"addItem.tag_name"}})],1),a("el-form-item",{attrs:{label:"排序",prop:"tag_sort"}},[a("el-input",{attrs:{type:"Number",clearable:""},model:{value:t.addItem.tag_sort,callback:function(e){t.$set(t.addItem,"tag_sort",e)},expression:"addItem.tag_sort"}})],1),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.addItem.status,callback:function(e){t.$set(t.addItem,"status",e)},expression:"addItem.status"}},[a("el-option",{key:"0",attrs:{label:"禁用",value:0}}),a("el-option",{key:"1",attrs:{label:"启用",value:1}})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.insertDialog=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.validation(1)}}},[t._v("确定")])],1)],1),a("el-dialog",{attrs:{title:"修改-"+t.updateDialogTitle,visible:t.updateDialog},on:{"update:visible":function(e){t.updateDialog=e}}},[a("el-form",{ref:"formName",staticClass:"updateArea",attrs:{model:t.currenItem,rules:t.rules,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"名称",prop:"name"}},[a("el-input",{attrs:{clearable:""},model:{value:t.currenItem.name,callback:function(e){t.$set(t.currenItem,"name",e)},expression:"currenItem.name"}})],1),a("el-form-item",{attrs:{label:"方法名",prop:"func_name"}},[a("el-input",{attrs:{clearable:""},model:{value:t.currenItem.func_name,callback:function(e){t.$set(t.currenItem,"func_name",e)},expression:"currenItem.func_name"}})],1),a("el-form-item",{attrs:{label:"描述",prop:"desc"}},[a("el-input",{attrs:{clearable:""},model:{value:t.currenItem.desc,callback:function(e){t.$set(t.currenItem,"desc",e)},expression:"currenItem.desc"}})],1),a("el-form-item",{attrs:{label:"周期",prop:"timer"}},[a("el-input",{attrs:{clearable:""},model:{value:t.currenItem.timer,callback:function(e){t.$set(t.currenItem,"timer",e)},expression:"currenItem.timer"}})],1),a("el-form-item",{attrs:{label:"下次执行时间"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择下次执行时间","value-format":"yyyy-MM-dd HH:mm",format:"yyyy-MM-dd HH:mm"},model:{value:t.currenItem.next_time,callback:function(e){t.$set(t.currenItem,"next_time",e)},expression:"currenItem.next_time"}}),a("div",{staticStyle:{color:"#aaaaaa"}},[t._v("注意：下次执行时间不填等于立即执行")])],1),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.currenItem.status,callback:function(e){t.$set(t.currenItem,"status",e)},expression:"currenItem.status"}},[a("el-option",{key:"0",attrs:{label:"禁用",value:0}}),a("el-option",{key:"1",attrs:{label:"启用",value:1}})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.updateDialog=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.validation(2)}}},[t._v("确定")])],1)],1),a("el-dialog",{attrs:{title:"立即执行-"+t.deltitle,visible:t.performtk,width:"30%"},on:{"update:visible":function(e){t.performtk=e}}},[a("span",[t._v("确定要立即执行此项吗")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.performtk=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.performItem()}}},[t._v("确定")])],1)]),a("el-dialog",{attrs:{title:"删除-"+t.deltitle,visible:t.deleteDialog,width:"30%"},on:{"update:visible":function(e){t.deleteDialog=e}}},[a("span",[t._v("确定要删除此项吗")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.deleteDialog=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.deleteItem("one")}}},[t._v("确定")])],1)]),a("el-dialog",{attrs:{title:"删除",visible:t.mutilDeleteDialog,width:"50%"},on:{"update:visible":function(e){t.mutilDeleteDialog=e}}},[a("span",{staticClass:"s-title"},[t._v("确定要删除以下内容吗?")]),t._l(t.nameArr,(function(e,l){return a("div",{key:l,staticClass:"gz-name"},[t._v(" "+t._s(e)+" ")])})),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.mutilDeleteDialog=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.deleteItem("mutil")}}},[t._v("确定")])],1)],2)],1)},r=[],i=(a("4160"),a("b0c0"),a("a9e3"),a("159b"),{name:"planList",data:function(){return{updateDialog:!1,insertDialog:!1,mutilDeleteDialog:!1,deleteDialog:!1,curPage:1,total:1,rules:{name:[{required:!0,message:"请填写名称",trigger:"blur"}],func_name:[{required:!0,message:"请填写方法名",trigger:"blur"}],desc:[{required:!0,message:"请填写描述",trigger:"blur"}],timer:[{required:!0,message:"请填写周期",trigger:"blur"}]},tableListData:[],addItem:{},currenItem:{},currenDeleteRow:"",multipleSelection:[],nameArr:[],updateDialogTitle:"",deltitle:"",searchValue:"",status:"",err:"",running:"",performtk:!1,sort:"",order:""}},created:function(){this.getTableList()},methods:{lijizxClick:function(){},filterTagTable:function(t){"undefined"!=typeof t.status&&""!=t.status?this.status=Number(t.status[0]):this.status="","undefined"!=typeof t.err&&""!=t.err?this.err=Number(t.err[0]):this.err="","undefined"!=typeof t.running&&""!=t.running?this.running=Number(t.running[0]):this.running="",this.getTableList()},screeningData:function(t){t.order?(this.sort=t.prop,this.order="ascending"==t.order?"ASC":"DESC"):(this.sort="",this.order=""),this.getTableList()},getTableList:function(){var t=this,e={sort:this.sort,order:this.order,status:this.status,err:this.err,running:this.running,keyword:this.searchValue,page:this.curPage,page_size:0};this.api.planwork.planListData(e).then((function(e){t.tableListData=e.data.data,t.total=e.data.count}))},searchDatas:function(){this.curPage=1,this.getTableList()},validation:function(t){var e=this;this.$refs["formName"].validate((function(a){if(!a)return!1;1==t?e.insertItem():e.multiUpdate()}))},insertItemtk:function(){this.insertDialog=!0},insertItem:function(){var t=this;this.addItem.tag_sort=Number(this.addItem.tag_sort);var e=this.addItem;this.api.planwork.TagInsert(e).then((function(e){t.$refs["formName"].resetFields(),t.$message({message:"添加成功",type:"success"}),t.getTableList(),t.insertDialog=!1}))},openUpdateDialog:function(t){this.updateDialog=!0,this.updateDialogTitle=t.name,this.currenItem=t},multiUpdate:function(){var t=this,e=this.currenItem;this.api.planwork.updatePlan(e).then((function(e){t.$message({message:"修改成功",type:"success"}),t.getTableList(),t.updateDialog=!1}))},performDialog:function(t){this.deltitle=t.name,this.currenDeleteRow=t,this.performtk=!0},performItem:function(){var t=this,e={worker_id:this.currenDeleteRow.worker_id};this.api.planwork.runningPlan(e).then((function(e){t.$message({message:"立即执行成功",type:"success"}),t.getTableList(),t.performtk=!1}))},batchDelete:function(){""!=this.multipleSelection?this.mutilDeleteDialog=!0:this.$message({message:"请先勾选要删除的数据",type:"warning"})},openDelDialog:function(t){this.deltitle=t.tag_name,this.currenDeleteRow=t,this.deleteDialog=!0},selectItem:function(t){var e=this;this.multipleSelection=[],this.nameArr=[],t.forEach((function(t,a){e.multipleSelection.push(t.tag_id),e.nameArr.push(t.tag_name)}))},deleteItem:function(t){var e=this,a=new Array;a.push(this.currenDeleteRow.tag_id);var l="one"===t?a:this.multipleSelection,r={id:l};this.api.planwork.TagDelete(r).then((function(t){e.$message({message:"删除成功",type:"success"}),e.getTableList(),e.mutilDeleteDialog=!1,e.deleteDialog=!1}))},pageChange:function(t){this.curPage=t,this.getTableList()}}}),s=i,n=(a("4cde"),a("2877")),o=Object(n["a"])(s,l,r,!1,null,"19f347c3",null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-430b8813.dfd953c1.js.map