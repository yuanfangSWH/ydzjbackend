(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2f21ded6"],{"02b4":function(e,t,r){"use strict";var a=r("bd55"),s=r.n(a);s.a},bd55:function(e,t,r){},f83b:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"appBox"},["IOS"==e.ruleForm.platform?r("div",[r("div",{staticClass:"page-title"},[e._v("编辑IOS版本")]),r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"包名",prop:"name"}},[r("el-input",{staticClass:"formIpt",attrs:{placeholder:"请输入包名",clearable:""},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),r("el-form-item",{attrs:{label:"版本号",prop:"version"}},[r("el-input",{staticClass:"formIpt",attrs:{placeholder:"请输入版本号，例：1.0.0",clearable:""},model:{value:e.ruleForm.version,callback:function(t){e.$set(e.ruleForm,"version",t)},expression:"ruleForm.version"}})],1),r("el-form-item",{attrs:{label:"更新内容",prop:"summary"}},[r("el-input",{staticClass:"formIpt",attrs:{type:"textarea",clearable:"",autosize:{minRows:2,maxRows:10},placeholder:"填写版本更新内容"},model:{value:e.ruleForm.summary,callback:function(t){e.$set(e.ruleForm,"summary",t)},expression:"ruleForm.summary"}})],1),r("el-form-item",{attrs:{label:"审核中",prop:"in_review"}},[r("el-switch",{attrs:{"active-color":"#ffbe11","inactive-color":"#d9d9d9",disabled:e.isChecksh},on:{change:e.switchInreview},model:{value:e.value4,callback:function(t){e.value4=t},expression:"value4"}})],1),r("el-form-item",{attrs:{label:"强制更新",prop:"coerce_update"}},[r("el-switch",{attrs:{"active-color":"#ffbe11","inactive-color":"#d9d9d9",disabled:e.isCheck},on:{change:e.switchCoerce},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}})],1),r("el-form-item",{attrs:{label:"提示更新",prop:"prompt_update"}},[r("el-switch",{attrs:{"active-color":"#ffbe11","inactive-color":"#d9d9d9",disabled:e.isCheck},on:{change:e.switchPrompt},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}})],1),r("el-form-item",{attrs:{label:"是否发布",prop:"status"}},[r("el-switch",{attrs:{"active-color":"#ffbe11","inactive-color":"#d9d9d9"},on:{change:e.switchStatus},model:{value:e.value3,callback:function(t){e.value3=t},expression:"value3"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("保存")]),r("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("取消")])],1)],1)],1):r("div",[r("div",{staticClass:"page-title"},[e._v("编辑Android版本")]),r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"包名",prop:"name"}},[r("el-input",{staticClass:"formIpt",attrs:{placeholder:"请输入包名",clearable:""},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),r("el-form-item",{attrs:{label:"版本号",prop:"version"}},[r("el-input",{staticClass:"formIpt",attrs:{placeholder:"请输入版本号，例：100",clearable:""},model:{value:e.ruleForm.version,callback:function(t){e.$set(e.ruleForm,"version",t)},expression:"ruleForm.version"}})],1),r("el-form-item",{attrs:{label:"更新内容",prop:"summary"}},[r("el-input",{staticClass:"formIpt",attrs:{type:"textarea",clearable:"",autosize:{minRows:2,maxRows:10},placeholder:"填写版本更新内容"},model:{value:e.ruleForm.summary,callback:function(t){e.$set(e.ruleForm,"summary",t)},expression:"ruleForm.summary"}})],1),r("el-form-item",{attrs:{label:"渠道",prop:"channel"}},[r("el-input",{staticClass:"formIpt",attrs:{placeholder:"请输入渠道，例：100",clearable:""},model:{value:e.ruleForm.channel,callback:function(t){e.$set(e.ruleForm,"channel",t)},expression:"ruleForm.channel"}}),r("div",{staticClass:"zhushi"},[e._v("(注：夜店之家-100；应用宝-101；360-102；华为-103；小米-104；OPPO-105；VIVO-106；魅族-107)")])],1),r("el-form-item",{attrs:{label:"上传包",required:""}},[r("el-col",{attrs:{span:6}},[r("el-form-item",{attrs:{prop:"url"}},[r("el-upload",{staticClass:"upload-demo",attrs:{action:"/file/uploads","on-preview":e.handlePreview,"on-remove":e.handleRemove,"http-request":e.uploadFile,"before-upload":e.beforeAvatarUpload,"on-change":e.handleChange,multiple:!1,limit:1,"on-exceed":e.handleExceed,"file-list":e.fileList}},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("选择文件")]),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[r("div",[e._v(e._s(e.textInfo))]),r("div",{staticClass:"tipText"},[e._v("注：包名的命名规则必须为（"),r("b",[e._v("包名_渠道_版本号")]),e._v(".apk）")])])],1)],1)],1)],1),r("el-form-item",{attrs:{label:"强制更新",prop:"coerce_update"}},[r("el-switch",{attrs:{"active-color":"#ffbe11","inactive-color":"#d9d9d9"},on:{change:e.switchCoerce},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}})],1),r("el-form-item",{attrs:{label:"提示更新",prop:"prompt_update"}},[r("el-switch",{attrs:{"active-color":"#ffbe11","inactive-color":"#d9d9d9"},on:{change:e.switchPrompt},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}})],1),r("el-form-item",{attrs:{label:"是否发布",prop:"status"}},[r("el-switch",{attrs:{"active-color":"#ffbe11","inactive-color":"#d9d9d9"},on:{change:e.switchStatus},model:{value:e.value3,callback:function(t){e.value3=t},expression:"value3"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("确定")]),r("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("取消")])],1)],1)],1)])},s=[],l=(r("c975"),r("b0c0"),r("ac1f"),r("1276"),r("96cf"),r("1da1")),i=r("5f87"),o={data:function(){return{ruleForm:{id:"",name:"",version:"",summary:"",channel:"",platform:"ANDROID",url:"",coerce_update:0,prompt_update:0,status:1,in_review:0},rules:{name:[{required:!0,message:"请输入包名",trigger:"blur"}],version:[{required:!0,message:"请输入版本号，例1.0.0",trigger:"blur"}],summary:[{required:!0,message:"请输入更新内容",trigger:"blur"}],channel:[{required:!0,message:"请输入渠道，例：100",trigger:"blur"}],url:[{required:!0,message:"请先上传包",trigger:"blur"}]},value1:!1,value2:!1,value3:!1,value4:!1,fileList:[],header:{headers:{"Content-Type":"multipart/form-data; boundary=--------------------------AAAAA",AccessToken:Object(i["a"])()}},DataImg:[],fileData:"",textInfo:"未选择任何文件",loading:"",myDate:"",year:"",month:"",date:"",hours:"",minutes:"",seconds:"",weekend:"",weeks:[],day:"",apkArr:[],isChecksh:!1,isCheck:!1}},created:function(){this.$route.query.id&&(this.ruleForm.id=this.$route.query.id,this.ruleForm.platform=this.$route.query.platform,this.getDetaile()),this.changeTime()},methods:{changeTime:function(){this.myDate=new Date,this.year=this.myDate.getFullYear(),this.month=this.myDate.getMonth()+1,this.date=this.myDate.getDate(),this.hours=this.myDate.getHours(),this.minutes=this.myDate.getMinutes(),this.seconds=this.myDate.getSeconds(),this.weekend=this.myDate.getDay(),this.weeks=new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"),this.day=this.weeks[this.weekend],this.month<10&&(this.month="0"+this.month),this.date<10&&(this.date="0"+this.date),this.hours<10&&(this.hours="0"+this.hours),this.minutes<10&&(this.minutes="0"+this.minutes),this.seconds<10&&(this.seconds="0"+this.seconds)},getDetaile:function(){var e=this;this.fileList=[];var t={id:this.ruleForm.id};this.api.appmanage.appDetail(t).then((function(t){e.ruleForm=t.data.data,e.value1=!!e.ruleForm.coerce_update,e.value2=!!e.ruleForm.prompt_update,e.value3=!!e.ruleForm.status,e.value4=!!e.ruleForm.in_review,e.apkArr[0]=e.ruleForm.name,e.apkArr[1]=e.ruleForm.channel,e.apkArr[2]=e.ruleForm.version,1!=e.ruleForm.coerce_update&&1!=e.ruleForm.prompt_update||(e.isChecksh=!0),e.ruleForm.url&&(e.textInfo="");var r=[];r=e.ruleForm.url.split("/"),e.fileList.push({name:r[r.length-1],url:e.ruleForm.url})}))},switchCoerce:function(e){e?(this.isChecksh=!0,this.value4=!1,this.value2=!1):this.isChecksh=!1,this.ruleForm.coerce_update=this.value1?1:0,this.ruleForm.prompt_update=this.value1?0:1},switchPrompt:function(e){e?(this.isChecksh=!0,this.value4=!1,this.value1=!1):this.isChecksh=!1,this.ruleForm.prompt_update=this.value2?1:0,this.ruleForm.coerce_update=this.value2?0:1},switchStatus:function(e){this.ruleForm.status=this.value3?1:0},switchInreview:function(e){e?(this.isCheck=!0,this.value1=!1,this.value2=!1):this.isCheck=!1,this.ruleForm.in_review=this.value4?1:0},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;var r=t.ruleForm;if("IOS"==t.ruleForm.platform)delete r.channel,delete r.url,t.api.appmanage.updateApp(r).then((function(e){t.$message({message:""+e.data.msg,type:"success"}),t.$router.push("/appList")}));else if(3!=t.apkArr.length)t.$message({message:"apk包的命名规则不对哦",type:"error"});else{var a=/^\d+$/.test(t.apkArr[1]);a?(delete r.in_review,t.api.appmanage.updateApp(r).then((function(e){t.$message({message:""+e.data.msg,type:"success"}),t.$router.push("/appList")}))):t.$message({message:"apk包的命名规则不对哦",type:"error"})}}))},resetForm:function(e){this.$refs[e].resetFields(),this.$router.push("/appList")},handleRemove:function(e,t){},handlePreview:function(e){},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件，请先删除原有文件再上传新文件")},handleChange:function(e,t){this.fileData=e,this.DataImg.push(e.raw)},beforeAvatarUpload:function(e){var t=e.name.split(".")[e.name.split(".").length-1],r="apk"===t;return r||this.$message.error("上传包文件只能是 apk 格式!"),r},uploadFile:function(e){var t=this;t.fileList=[];var a={};this.api.appmanage.getfileSts(a).then((function(a){t.openFullScreen();var s=r("9b15"),i=new s({accessKeyId:a.data.data.Credentials.AccessKeyId,accessKeySecret:a.data.data.Credentials.AccessKeySecret,stsToken:a.data.data.Credentials.SecurityToken,bucket:"ddhi"});function o(){return n.apply(this,arguments)}function n(){return n=Object(l["a"])(regeneratorRuntime.mark((function r(){var a,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,i.put("app/"+t.year+"/"+t.month+"/"+t.date+"/"+e.file.name,e.file);case 3:a=r.sent,a.url&&(t.loading.close(),t.textInfo="文件已上传成功"),t.ruleForm.url=a.url,s=a.url,-1!=s.indexOf("/")&&(t.apkArr=s.split("/")),-1!=s.indexOf(".apk")&&(t.apkArr=t.apkArr[t.apkArr.length-1].split(".apk")),t.ruleForm.name=t.apkArr[0],-1!=s.indexOf("_")&&(t.apkArr=t.apkArr[0].split("_")),t.ruleForm.channel=t.apkArr[1],t.ruleForm.version=t.apkArr[2],t.fileList.push({name:e.file.name,url:a.url}),r.next=19;break;case 16:r.prev=16,r.t0=r["catch"](0),console.error("error: %j",r.t0);case 19:case"end":return r.stop()}}),r,null,[[0,16]])}))),n.apply(this,arguments)}o()}))},openFullScreen:function(){this.loading=this.$loading({lock:!0,text:"文件正在上传，请稍后...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})}}},n=o,u=(r("02b4"),r("2877")),c=Object(u["a"])(n,a,s,!1,null,"2bbd18bf",null);t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2f21ded6.10baae54.js.map