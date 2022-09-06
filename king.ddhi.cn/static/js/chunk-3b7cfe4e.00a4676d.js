(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b7cfe4e"],{"010b":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"shopSet"},[a("div",{staticClass:"page-title"},[e._v(e._s(this._getVuex("pageTitle")))]),a("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"基本信息",name:"first"}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"130px"}},[a("el-form-item",{attrs:{label:"商品名称",prop:"name"}},[a("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),a("el-form-item",{attrs:{label:"商品小标题",prop:"alias"}},[a("el-input",{model:{value:e.ruleForm.alias,callback:function(t){e.$set(e.ruleForm,"alias",t)},expression:"ruleForm.alias"}})],1),a("el-form-item",{attrs:{label:"商品分类",prop:"class_id"}},[a("el-select",{attrs:{placeholder:"请选择商品分类"},model:{value:e.ruleForm.class_id,callback:function(t){e.$set(e.ruleForm,"class_id",t)},expression:"ruleForm.class_id"}},e._l(e.options,(function(e,t){return a("el-option",{key:t,attrs:{label:e.class_name,value:e.class_id}})})),1)],1),e.ruleForm.unit?a("el-form-item",{attrs:{label:"单位",prop:"unit"}},[a("el-input",{model:{value:e.ruleForm.unit,callback:function(t){e.$set(e.ruleForm,"unit",t)},expression:"ruleForm.unit"}}),a("span",{staticClass:"form-shan2"},[e._v("(例：大杯、小杯、L、ml等)")])],1):e._e(),a("el-form-item",{attrs:{label:"图片",prop:"image"}},[a("uploadFiles",{staticClass:"uploadTemp",attrs:{limit:e.limit,TfileList:e.fileList,root:"goods"},on:{childrenFun:e.parentFun}}),a("span",{staticClass:"form-shan2"},[e._v("(建议尺寸：200x200px)")])],1),a("el-form-item",{attrs:{label:"原价",prop:"m_price"}},[a("el-input",{model:{value:e.ruleForm.m_price,callback:function(t){e.$set(e.ruleForm,"m_price",t)},expression:"ruleForm.m_price"}}),a("span",{staticClass:"form-shan"},[e._v("元")])],1),a("el-form-item",{attrs:{label:"折扣",prop:"discount"}},[a("el-input",{model:{value:e.ruleForm.discount,callback:function(t){e.$set(e.ruleForm,"discount",t)},expression:"ruleForm.discount"}}),a("span",{staticClass:"form-shan"},[e._v("折 "),a("i",{staticStyle:{color:"#aaaaaa","font-style":"normal"}},[e._v("（例：98折，输入98）")])])],1),a("el-form-item",{attrs:{label:"现价",required:""}},[a("el-input",{model:{value:e.computedPrice,callback:function(t){e.computedPrice=t},expression:"computedPrice"}}),a("span",{staticClass:"form-shan"},[e._v("元")])],1),a("el-form-item",{attrs:{label:"是否营销",prop:"is_atmosphere"}},[a("el-radio-group",{model:{value:e.ruleForm.is_atmosphere,callback:function(t){e.$set(e.ruleForm,"is_atmosphere",t)},expression:"ruleForm.is_atmosphere"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),a("el-radio",{attrs:{label:0}},[e._v("否")])],1),a("span",{staticClass:"form-shan2"},[e._v("(注：营销专员，推荐商品)")])],1),a("el-form-item",{attrs:{label:"是否赠品",prop:"allow_giving"}},[a("el-radio-group",{model:{value:e.ruleForm.allow_giving,callback:function(t){e.$set(e.ruleForm,"allow_giving",t)},expression:"ruleForm.allow_giving"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-radio-group",{model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},[a("el-radio",{attrs:{label:1}},[e._v("上架")]),a("el-radio",{attrs:{label:2}},[e._v("下架")])],1)],1),a("el-form-item",{attrs:{label:"排序",prop:"sort"}},[a("el-input",{model:{value:e.ruleForm.sort,callback:function(t){e.$set(e.ruleForm,"sort",t)},expression:"ruleForm.sort"}})],1)],1)],1),a("el-tab-pane",{attrs:{label:"商品属性",name:"second"}},[a("el-button",{attrs:{type:"primary"},on:{click:e.addAttr}},[e._v("添加属性")]),e._l(e.dataList,(function(t,r){return a("div",{key:r,staticClass:"attrBox"},[a("div",{staticClass:"box01"},[a("div",[a("span",{staticClass:"attr-s01"},[e._v("属性名")]),a("span",[a("el-input",{attrs:{placeholder:"请输入属性名"},model:{value:e.dataList[r].name,callback:function(t){e.$set(e.dataList[r],"name",t)},expression:"dataList[i].name"}})],1)]),a("div",{staticClass:"m-nav"},[a("span",{staticClass:"attr-s01"},[e._v("可选类型")]),a("span",[a("el-select",{attrs:{placeholder:"请选择"},on:{change:e.selectChange},model:{value:e.dataList[r].required,callback:function(t){e.$set(e.dataList[r],"required",t)},expression:"dataList[i].required"}},e._l(e.attrOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)]),a("div",{staticClass:"ac-nav"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addAttrVal(r)}}},[e._v("增加属性值")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.deleteAttrVal(r)}}},[e._v("删除")])],1)]),e._l(e.dataList[r].attr_val,(function(t,i){return a("div",{key:i,staticClass:"box01 box02"},[a("div",[a("span",{staticClass:"attr-s01"},[e._v("属性值")]),a("span",[a("el-input",{attrs:{clearable:"",placeholder:"请输入内容"},model:{value:e.dataList[r].attr_val[i].name,callback:function(t){e.$set(e.dataList[r].attr_val[i],"name",t)},expression:"dataList[i].attr_val[j].name"}})],1)]),a("div",{staticClass:"m-nav"},[a("span",{staticClass:"attr-s01"},[e._v("价格")]),a("span",[a("el-input",{attrs:{placeholder:"请输入价格"},model:{value:e.dataList[r].attr_val[i].incr_price,callback:function(t){e.$set(e.dataList[r].attr_val[i],"incr_price",t)},expression:"dataList[i].attr_val[j].incr_price"}}),a("span",{staticStyle:{"margin-left":"5px"}},[e._v("元")])],1)]),a("div",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.deleteSubAttrVal(r,i)}}},[e._v("删除")])],1)])}))],2)}))],2),a("div",{staticClass:"btnBox"},[a("el-button",{attrs:{type:"warning",loading:e.loading},on:{click:function(t){return e.handleSubmitForm("ruleForm")}}},[e._v("保存")]),a("el-button",{attrs:{type:"info"},on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("取消")])],1)],1)],1)},i=[],s=(a("4160"),a("a15b"),a("a434"),a("a9e3"),a("ac1f"),a("1276"),a("159b"),a("ff03")),o=a("2ef0"),l=a.n(o),n={name:"editGoods",components:{uploadFiles:s["a"]},data:function(){return{loading:!1,merchant_id:"",shop_id:"",rVal:"请选择",activeName:"first",options:[],ruleForm:{goods_id:"",class_id:"",name:"",alias:"",price:"",discount:"",unit:"",image:"",images:0,status:1,market_price:"",m_price:"",sort:0,is_combo:0,goods_attr:[],is_atmosphere:0,allow_giving:0},value1:[],value2:[],allow_week_days:[],rules:{name:[{required:!0,message:"请输入活动名称",trigger:"blur"}],class_id:[{required:!0,message:"请选择商品分类",trigger:"change"}],unit:[{required:!0,message:"请输入商品单位",trigger:"blur"}],image:[{required:!0,message:"请选择商品主图",trigger:"on-change"}],m_price:[{required:!0,message:"请输入商品原价",trigger:"blur"}],price:[{required:!0,message:"请输入商品现价",trigger:"blur"}],is_atmosphere:[{required:!0,message:"请设置是否营销",trigger:"change"}],allow_giving:[{required:!0,message:"请设置是否赠品",trigger:"change"}]},attrName:"",attrOptions:[{value:"0",label:"可选"},{value:"1",label:"单选"},{value:"2",label:"多选"}],value:"",showBtn:!1,attrVal:"",attrPrice:"",dataList:[],imgArr:[],fileList:[],limit:1}},created:function(){this.iniPageParam(),this.getGoodsClass(),this.ruleForm.goods_id=this.$route.query.goods_id,this.ruleForm.goods_id&&this.getGoodsDetaile()},computed:{computedPrice:function(){return""==this.ruleForm.discount?Number(this.ruleForm.m_price):Number(this.ruleForm.m_price)*Number(this.ruleForm.discount)/100}},methods:{iniPageParam:function(){this.merchant_id=this.$route.query.merchant_id,this.shop_id=this.$route.query.shop_id},getGoodsDetaile:function(){var e=this,t={id:this.ruleForm.goods_id,merchant_id:this.merchant_id,shop_id:this.shop_id};this.$store.dispatch("goods/getGoodsDetail",t).then((function(t){e.ruleForm=t.data;var a=e.ruleForm.image;e.imgArr=a.split(","),e.imgArr.forEach((function(t){var a=new Object;a.url=t,e.fileList.push(a)})),e.ruleForm.m_price=Number(e.ruleForm.market_price)/100,e.ruleForm.price=Number(e.ruleForm.price)/100,e.ruleForm.goods_attr&&(e.dataList=e.ruleForm.goods_attr,e.dataList.forEach((function(e){0==e.required?e.required="可选":1==e.required?e.required="单选":2==e.required&&(e.required="多选")})))}))},selectChange:function(e){this.dataList.forEach((function(e){"0"==e.required?e.required="可选":"1"==e.required?e.required="单选":"2"==e.required&&(e.required="多选")}))},handleClick:function(e,t){},addAttr:function(){this.dataList.push({group_id:0,name:"",required:"请选择",attr_val:[{attr_id:0,name:"",incr_price:0}]}),this.showBtn=!0},addAttrVal:function(e){this.dataList[e].attr_val.push({attr_id:0,name:"",incr_price:0})},deleteAttrVal:function(e){this.dataList.splice(e,1)},deleteSubAttrVal:function(e,t){this.dataList[e].attr_val.splice(t,1)},handleSubmitForm:function(e){var t=this;this.$confirm("确认提交商品数据吗？","提示").then((function(){t.submitForm(e)}))},submitForm:function(e){var t=this,a=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;var r=l.a.cloneDeep(t.ruleForm);r.merchant_id=Number(t.merchant_id),r.shop_id=Number(t.shop_id);for(var i=0;i<a.dataList.length;i++)if(a.dataList[i].attr_val)for(var s=0;s<a.dataList[i].attr_val.length;s++)a.dataList[i].attr_val[s].incr_price=Number(a.dataList[i].attr_val[s].incr_price);r.discount=Number(r.discount),r.market_price=100*Number(r.m_price),r.sort=Number(r.sort),r.price=100*Number(t.computedPrice),t.is_atmosphere=Number(t.is_atmosphere),t.allow_giving=Number(t.allow_giving),delete r.m_price,r.image.constructor==Array?r.image=r.image.join(","):r.image=t.GetImageUrl(r.image),t.dataList.forEach((function(e){"可选"==e.required?e.required=0:"单选"==e.required?e.required=1:"多选"==e.required&&(e.required=2)})),r.goods_attr=t.dataList,t.loading=!0,t.$store.dispatch("goods/updateGoods",r).then((function(e){t.loading=!1,t.$message({message:""+e.msg,type:"success"}),t.$router.push({path:"/ShopInfo",query:{merchant_id:t.merchant_id,shop_id:t.shop_id,tab:"shopGoods"}})})).catch((function(){t.loading=!1}))}))},resetForm:function(e){this.$refs[e].resetFields(),this.$router.back()},parentFun:function(e){this.ruleForm.image=e},getGoodsClass:function(){var e=this,t={page_size:1e4,merchant_id:this.merchant_id,shop_id:this.shop_id};this.$store.dispatch("goods/getGoodsClass",t).then((function(t){e.options=t.data,e.count=t.count}))}}},c=n,u=(a("1d6b"),a("2877")),d=Object(u["a"])(c,r,i,!1,null,"636981ba",null);t["default"]=d.exports},"1d6b":function(e,t,a){"use strict";var r=a("64af"),i=a.n(r);i.a},4091:function(e,t,a){"use strict";var r=a("b6d3"),i=a.n(r);i.a},"64af":function(e,t,a){},a15b:function(e,t,a){"use strict";var r=a("23e7"),i=a("44ad"),s=a("fc6a"),o=a("a640"),l=[].join,n=i!=Object,c=o("join",",");r({target:"Array",proto:!0,forced:n||!c},{join:function(e){return l.call(s(this),void 0===e?",":e)}})},a434:function(e,t,a){"use strict";var r=a("23e7"),i=a("23cb"),s=a("a691"),o=a("50c4"),l=a("7b0b"),n=a("65f0"),c=a("8418"),u=a("1dde"),d=a("ae40"),m=u("splice"),p=d("splice",{ACCESSORS:!0,0:0,1:2}),h=Math.max,f=Math.min,g=9007199254740991,v="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!m||!p},{splice:function(e,t){var a,r,u,d,m,p,b=l(this),_=o(b.length),F=i(e,_),k=arguments.length;if(0===k?a=r=0:1===k?(a=0,r=_-F):(a=k-2,r=f(h(s(t),0),_-F)),_+a-r>g)throw TypeError(v);for(u=n(b,r),d=0;d<r;d++)m=F+d,m in b&&c(u,d,b[m]);if(u.length=r,a<r){for(d=F;d<_-r;d++)m=d+r,p=d+a,m in b?b[p]=b[m]:delete b[p];for(d=_;d>_-r+a;d--)delete b[d-1]}else if(a>r)for(d=_-r;d>F;d--)m=d+r-1,p=d+a-1,m in b?b[p]=b[m]:delete b[p];for(d=0;d<a;d++)b[d+F]=arguments[d+2];return b.length=_-r+a,u}})},b6d3:function(e,t,a){},baa5:function(e,t,a){var r=a("23e7"),i=a("e58c");r({target:"Array",proto:!0,forced:i!==[].lastIndexOf},{lastIndexOf:i})},ff03:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"uploadFiles"},[a("el-upload",{directives:[{name:"show",rawName:"v-show",value:""!=this.root,expression:"this.root != ''"}],ref:"upload_file",attrs:{action:"/api/file/uploads","list-type":"picture-card",limit:e.limit,"file-list":e.TfileList,"on-preview":e.handlePictureCardPreview,"http-request":e.uploadImg,"on-change":e.handleChange,"on-success":e.handleSuccess,"before-upload":e.beforeAvatarUpload,"on-exceed":e.exceedFun,"on-remove":e.removeFun}},[a("i",{staticClass:"el-icon-plus"})]),a("h4",{directives:[{name:"show",rawName:"v-show",value:""==this.root,expression:"this.root == ''"}]},[e._v("没有设置路径“root”...")]),a("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("img",{key:e.dialogImageUrl,attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})]),a("el-dialog",{attrs:{title:"提示",visible:e.chaochudialogVisible,width:"30%"},on:{"update:visible":function(t){e.chaochudialogVisible=t}}},[a("span",[e._v(e._s(e.tishi))]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.chaochudialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.chaochudialogVisible=!1}}},[e._v("确 定")])],1)])],1)},i=[],s=(a("4160"),a("baa5"),a("b0c0"),a("a9e3"),a("ac1f"),a("1276"),a("159b"),a("96cf"),a("1da1")),o=a("5f87"),l=a("9b15"),n={name:"newUploadFiles",props:{limit:Number,TfileList:Array,shop:Boolean,root:{type:String,default:""}},data:function(){return{header:{headers:{"Content-Type":"multipart/form-data; boundary=--------------------------AAAAA",AccessToken:Object(o["a"])()}},clentSts:{},fileLists:[],dialogImageUrl:"",dialogVisible:!1,chaochudialogVisible:!1,tishi:"",isAdd:!0}},methods:{removeFun:function(e,t){for(var a=[],r=[],i=[],s=0;s<t.length;s++)a=t[s].url.split("/upload"),i[s]="/upload"+a[1],r.push(i[s]);this.isAdd=!1,this.shop||this.$emit("childrenFun",r,this.isAdd)},exceedFun:function(){1==this.limit?(this.chaochudialogVisible=!0,this.tishi="只能上传1张图片，请先删除原有图片，再上传新的图片"):6==this.limit&&(this.chaochudialogVisible=!0,this.tishi="只能上传6张图片，请先删除要替换的图片，再上传新的图片")},handleChange:function(e,t){this.fileLists.push(e.raw)},uploadImg:function(e){var t=this,a=new FormData,r=this;this.fileLists.forEach((function(e){a.append("file[]",e,e.name),a.append("root",r.root)})),this.$ajax.defaults.headers.common["token"]=Object(o["a"])(),this.$ajax.post("/api/file/uploads",a,this.header).then((function(e){t.isAdd=!0;var a=e.data.data.url_path,r=a[a.length-1];1==t.limit?t.$emit("childrenFun",r,t.isAdd):t.shop?t.$emit("childrenFun",a,"0"):t.$emit("childrenFun",a,t.isAdd)}))},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},getFileSts:function(){var e=this;this.$store.dispatch("shop/getFileSts").then((function(t){e.clentSts=t.data.Credentials}))},handleUploadSTS:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,i,o,n,c,u;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,t.$store.dispatch("shop/getFileSts").then((function(e){return e.data.Credentials}));case 3:return t.clentSts=a.sent,console.log("this.clentSts:",t.clentSts),console.log("option:",e),r=e.file,i=r.name.lastIndexOf("."),o=r.name.substr(i),n="product/"+Date.parse(new Date)+o,c=new l({accessKeyId:t.clentSts.AccessKeyId,accessKeySecret:t.clentSts.AccessKeySecret,stsToken:t.clentSts.SecurityToken,region:"oss-cn-hangzhou",bucket:"ddhi"}),a.next=13,c.multipartUpload(n,r,{progress:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log("p:",a),r={},r.percent=100*a,e.onProgress(r);case 4:case"end":return t.stop()}}),t)})));function a(e){return t.apply(this,arguments)}return a}()});case 13:if(u=a.sent,console.log(u),200!==u.res.statusCode){a.next=19;break}return a.abrupt("return",u);case 19:e.onError("上传失败");case 20:a.next=27;break;case 22:a.prev=22,a.t0=a["catch"](0),console.error(a.t0),e.onError("上传失败"),t.$error(a.t0.message);case 27:case"end":return a.stop()}}),a,null,[[0,22]])})))()},handleSuccess:function(e){console.log("response.res.status:",e),200===e.res.status&&console.log("上传了")},beforeAvatarUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message.error("上传图片大小不能超过 2MB!"),t}}},c=n,u=(a("4091"),a("2877")),d=Object(u["a"])(c,r,i,!1,null,"f2a077e6",null);t["a"]=d.exports}}]);
//# sourceMappingURL=chunk-3b7cfe4e.00a4676d.js.map