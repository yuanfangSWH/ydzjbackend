(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f43e0eb"],{"0640":function(e,t,a){"use strict";var i=a("aa9a"),l=a.n(i);l.a},a434:function(e,t,a){"use strict";var i=a("23e7"),l=a("23cb"),s=a("a691"),n=a("50c4"),o=a("7b0b"),r=a("65f0"),u=a("8418"),c=a("1dde"),d=a("ae40"),m=c("splice"),p=d("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,h=Math.min,g=9007199254740991,b="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!m||!p},{splice:function(e,t){var a,i,c,d,m,p,v=o(this),D=n(v.length),k=l(e,D),I=arguments.length;if(0===I?a=i=0:1===I?(a=0,i=D-k):(a=I-2,i=h(f(s(t),0),D-k)),D+a-i>g)throw TypeError(b);for(c=r(v,i),d=0;d<i;d++)m=k+d,m in v&&u(c,d,v[m]);if(c.length=i,a<i){for(d=k;d<D-i;d++)m=d+i,p=d+a,m in v?v[p]=v[m]:delete v[p];for(d=D;d>D-i+a;d--)delete v[d-1]}else if(a>i)for(d=D-i;d>k;d--)m=d+i-1,p=d+a-1,m in v?v[p]=v[m]:delete v[p];for(d=0;d<a;d++)v[d+k]=arguments[d+2];return v.length=D-i+a,c}})},aa9a:function(e,t,a){},b23f:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"shopSet"},[a("div",{staticClass:"pageTitle"},[e._v(e._s(this._getVuex("pageTitle")))]),a("div",{staticClass:"add-box"},[a("el-button",{staticClass:"b-btn",attrs:{type:"warning"},on:{click:e.returnF}},[e._v("返回")]),a("el-button",{staticClass:"b-btn",attrs:{type:"danger"},on:{click:e.batchDelete}},[e._v("删除")]),a("el-button",{staticClass:"b-btn",attrs:{type:"success"},on:{click:e.insertItemtk}},[e._v("新增")]),a("el-input",{staticClass:"searchInput",attrs:{placeholder:"请输入要搜索的名称","prefix-icon":"el-icon-search"},on:{change:e.searchDatas},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}})],1),a("el-table",{ref:"multipNum",staticStyle:{width:"100%"},attrs:{stripe:"",data:e.tableListData,"tooltip-effect":"dark"},on:{"selection-change":e.selectItem,"filter-change":e.filterTagTable}},[a("el-table-column",{attrs:{type:"selection",width:"100"}}),a("el-table-column",{attrs:{label:"全选/角色ID",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.id))])]}}])}),a("el-table-column",{attrs:{prop:"name",label:"角色名称",width:"400"}}),a("el-table-column",{attrs:{prop:"memo",label:"角色描述",width:"400"}}),a("el-table-column",{attrs:{"column-key":"status",filters:[{text:"停用",value:0},{text:"启用",value:1}],"filter-multiple":!1,label:"状态",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{directives:[{name:"show",rawName:"v-show",value:0==t.row.status,expression:"scope.row.status == 0"}]},[e._v("停用")]),a("span",{directives:[{name:"show",rawName:"v-show",value:1==t.row.status,expression:"scope.row.status == 1"}]},[e._v("启用")])]}}])}),a("el-table-column",{attrs:{align:"right",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){e.openUpdateDialog(t.$index,JSON.parse(JSON.stringify(t.row)),"type")}}},[e._v("修改")]),a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){return e.openDelDialog(t.row)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{"current-page":e.curPage,"hide-on-single-page":!0,background:"",layout:"prev, pager, next",total:e.total},on:{"current-change":e.pageChange}})],1),a("el-dialog",{attrs:{title:"新增",visible:e.insertDialog},on:{"update:visible":function(t){e.insertDialog=t}}},[a("el-form",{ref:"formName1",staticClass:"updateArea",attrs:{model:e.addItem,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"角色名称",prop:"name"}},[a("el-input",{model:{value:e.addItem.name,callback:function(t){e.$set(e.addItem,"name",t)},expression:"addItem.name"}})],1),a("el-form-item",{attrs:{label:"角色描述"}},[a("el-input",{model:{value:e.addItem.memo,callback:function(t){e.$set(e.addItem,"memo",t)},expression:"addItem.memo"}})],1),a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.addItem.status,callback:function(t){e.$set(e.addItem,"status",t)},expression:"addItem.status"}},[a("el-option",{attrs:{label:"停用",value:0}}),a("el-option",{attrs:{label:"启用",value:1}})],1)],1),a("el-form-item",{attrs:{label:"权限设置"}},[a("el-tree",{ref:"tree",attrs:{data:e.menuData,"show-checkbox":"","node-key":"id","default-expand-all":!0,props:e.defaultProps}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.insertDialog=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.validation("formName1")}}},[e._v("确定")])],1)],1),a("el-dialog",{attrs:{title:"修改",visible:e.updateDialog},on:{"update:visible":function(t){e.updateDialog=t}}},[a("el-form",{ref:"formName2",staticClass:"updateArea",attrs:{model:e.currenItem,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"角色名称",prop:"name"}},[a("el-input",{model:{value:e.currenItem.name,callback:function(t){e.$set(e.currenItem,"name",t)},expression:"currenItem.name"}})],1),a("el-form-item",{attrs:{label:"角色描述",prop:"memo"}},[a("el-input",{model:{value:e.currenItem.memo,callback:function(t){e.$set(e.currenItem,"memo",t)},expression:"currenItem.memo"}})],1),a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.currenItem.status,callback:function(t){e.$set(e.currenItem,"status",t)},expression:"currenItem.status"}},[a("el-option",{attrs:{label:"停用",value:0}}),a("el-option",{attrs:{label:"启用",value:1}})],1)],1),a("el-form-item",{attrs:{label:"权限设置"}},[a("el-tree",{ref:"tree",attrs:{data:e.menuData,"show-checkbox":"","node-key":"id","default-expand-all":!0,props:e.defaultProps,"default-checked-keys":e.updateQ}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.updateDialog=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.validation("formName2")}}},[e._v("确定")])],1)],1),a("el-dialog",{attrs:{title:"删除-"+e.currenDeleteRow.name,visible:e.deleteDialog,width:"30%"},on:{"update:visible":function(t){e.deleteDialog=t}}},[a("span",[e._v("确定要删除此项吗")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.deleteDialog=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.deleteItem("one")}}},[e._v("确定")])],1)]),a("el-dialog",{attrs:{title:"删除",visible:e.mutilDeleteDialog,width:"50%"},on:{"update:visible":function(t){e.mutilDeleteDialog=t}}},[a("span",{staticClass:"s-title"},[e._v("确定要删除以下内容吗?")]),e._l(e.nameArr,(function(t,i){return a("div",{key:i,staticClass:"gz-name"},[e._v(" "+e._s(t)+" ")])})),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.mutilDeleteDialog=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.deleteItem("mutil")}}},[e._v("确定")])],1)],2)],1)},l=[],s=(a("99af"),a("4160"),a("a434"),a("b0c0"),a("a9e3"),a("159b"),{name:"currenPage",data:function(){return{status:"",allQL:!1,updateDialog:!1,insertDialog:!1,mutilDeleteDialog:!1,deleteDialog:!1,curPage:1,total:13,rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]},tableListData:[],addItem:{name:"",status:1,menu_ids:[]},currenItem:{},currenDeleteRow:"",multipleSelection:[],nameArr:[],searchValue:"",defaultProps:{children:"children",label:"label"},menuData:[],updateQ:[]}},created:function(){this.getTableList(),this.menuAllTree()},methods:{validation:function(e){var t=this;this.$refs[e].validate((function(a){if(!a)return!1;"formName1"==e?t.insertItem():t.multiUpdate()}))},returnF:function(){this.$router.go(-1)},filterTagTable:function(e){""!=e.status?this.status=Number(e.status[0]):this.status="",this.getTableList()},getCheckedNodes:function(){var e=this.$refs.tree.getCheckedKeys(),t=this.$refs.tree.getHalfCheckedKeys();return""!=t?e.concat(t):e},getTableList:function(){var e=this,t={status:this.status,page:this.curPage,name:this.searchValue};this.api.adminvip.roleData(t).then((function(t){e.tableListData=t.data.data,e.total=t.data.count}))},menuAllTree:function(){var e=this;this.api.adminvip.menuAllTree().then((function(t){e.menuData=t.data.data}))},searchDatas:function(){this.curPage=1,this.getTableList()},insertItemtk:function(){this.insertDialog=!0},insertItem:function(){var e=this,t=this.addItem;t.menu_ids=this.getCheckedNodes(),this.api.adminvip.roleInsert(t).then((function(t){e.$refs["formName"].resetFields(),e.getTableList(),e.insertDialog=!1}))},openUpdateDialog:function(e,t){this.updateDialog=!0,this.currenItem=t,this.permissionsID(this.currenItem.id)},permissionsID:function(e){var t=this,a={role_id:e};this.api.adminvip.RoleMenuIDList(a).then((function(e){for(var a=e.data.data,i=0;i<a.length;i++)if(1==a[i]){a.splice(i,1);break}t.updateQ=a}))},multiUpdate:function(){var e=this,t=this.currenItem;this.UpdateQ(t.id),this.api.adminvip.roleUpdate(t).then((function(t){e.getTableList(),e.updateDialog=!1}))},UpdateQ:function(e){var t={role_id:e,menu_ids:this.getCheckedNodes()};this.api.adminvip.setRoleMenu(t).then((function(e){}))},batchDelete:function(){""!=this.multipleSelection?this.mutilDeleteDialog=!0:this.$message({message:"请先勾选要删除的数据",type:"warning"})},openDelDialog:function(e){this.currenDeleteRow=e,this.deleteDialog=!0},deleteItem:function(e){var t=this,a=[];"one"==e?a[0]=this.currenDeleteRow.id:"mutil"==e&&(a=this.multipleSelection);var i={id:a,merchant_id:this.merchants.merchant_id,shop_id:this.merchants.shop_id};this.api.adminvip.roleDelete(i).then((function(e){t.getTableList(),t.mutilDeleteDialog=!1,t.deleteDialog=!1}))},selectItem:function(e){var t=this;this.multipleSelection=[],this.nameArr=[],e.forEach((function(e,a){t.multipleSelection.push(e.id),t.nameArr.push(e.name)}))},pageChange:function(e){this.curPage=e,this.getTableList()}}}),n=s,o=(a("0640"),a("2877")),r=Object(o["a"])(n,i,l,!1,null,"11bc7819",null);t["default"]=r.exports}}]);
//# sourceMappingURL=chunk-3f43e0eb.f780c00a.js.map