(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b2080a5a"],{"3f90":function(t,e,i){"use strict";var a=i("bfbc"),s=i.n(a);s.a},"7ff6":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"shopSet"},[i("div",{staticClass:"pageTitle"},[t._v(t._s(this._getVuex("pageTitle")))]),i("div",{staticClass:"add-box"},[i("div",{staticClass:"btn-nav"},["1"==t.status?i("div",[i("el-button",{attrs:{type:"danger"},on:{click:t.deleteFun}},[t._v("删除")]),i("el-button",{attrs:{type:"primary"},on:{click:t.toRecycle}},[t._v("回收站")])],1):i("div",[i("el-button",{attrs:{type:"danger"},on:{click:t.toBack}},[t._v("返回")]),i("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.batchPass(1)}}},[t._v("还原")])],1)]),i("div",{staticClass:"so-nav"},[i("el-input",{staticClass:"so-ipt",attrs:{placeholder:"请输入用户ID/手机/标题/内容",clearable:""},on:{change:t.searchDatas},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}}),i("el-button",{staticClass:"sosuo",attrs:{type:"danger"},on:{click:t.searchDatas}},[t._v("搜索")])],1)]),t.checkNum?i("div",{staticClass:"checkNav"},[i("div",{staticClass:"c-box01"},[i("i",{staticClass:"el-icon-message-solid"}),i("span",[t._v("您还有"+t._s(t.checkNum)+"条动态未审核，请尽快完成审核哦！")])]),i("div",{staticClass:"c-box02",on:{click:t.toAudit}},[t._v("审核")])]):t._e(),i("el-table",{ref:"multipNum",staticStyle:{width:"100%"},attrs:{stripe:"",data:t.tableListData,"tooltip-effect":"dark"},on:{"selection-change":t.selectItem,"filter-change":t.filterTagTable,"sort-change":t.sortFilterFun}},[i("el-table-column",{attrs:{type:"selection",width:"55"}}),i("el-table-column",{attrs:{label:"ID",width:"100",sortable:"custom"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.thread_id))])]}}])}),i("el-table-column",{attrs:{prop:"title",label:"标题",width:"180"}}),i("el-table-column",{attrs:{prop:"user.nickname",label:"用户",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.user?i("div",{staticStyle:{display:"flex","align-items":"center"},on:{click:function(i){return t.userInformation(e.row)}}},[i("el-image",{staticStyle:{width:"30px",height:"30px","border-radius":"100%"},attrs:{fit:"fill",src:e.row.user.avatar}}),i("div",{staticStyle:{flex:"1","margin-left":"5px"}},[i("div",[t._v(" "+t._s(e.row.user.nickname)+"（"),1==e.row.user.gender?i("span",[t._v("男")]):i("span",[t._v("女")]),t._v("/"+t._s(e.row.user.age)+"岁） ")]),i("div",[t._v("ID："+t._s(e.row.user.user_id))])])],1):t._e()]}}])}),i("el-table-column",{attrs:{prop:"cover",label:"图片/视频",width:"400","filter-multiple":!1,filters:t.threadTypeArr,"filter-placement":"bottom-end","column-key":"cover"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.video?i("div",{staticClass:"videoBox",on:{click:function(i){return t.playFun(e.row,e.$index)}}},[i("video",{attrs:{poster:e.row.cover,width:"150",height:"150",src:e.row.video[0].file_url}}),i("i",{staticClass:"playIcon el-icon-video-play"})]):t._e(),e.row.album?i("div",t._l(e.row.album,(function(a,s){return i("span",{key:s,on:{click:function(i){return t.showImglist(e.row.album_ori,s)}}},[i("el-image",{staticStyle:{width:"150px",height:"150px","margin-right":"5px"},attrs:{fit:"cover",src:a.album_path}})],1)})),0):t._e()]}}])}),i("el-table-column",{attrs:{prop:"content",label:"内容",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.$index===t.sortingid?i("el-input",{ref:"saveTagInput_"+e.$index,staticClass:"input_pxcss",attrs:{type:"textarea",row:3},on:{blur:function(i){return t.percentF(e.row,e.$index)}},model:{value:e.row.content,callback:function(i){t.$set(e.row,"content",i)},expression:"scope.row.content"}}):i("div",{staticClass:"muzhicss",on:{click:function(i){return t.khaki(e.$index,e.row)}}},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.content,placement:"bottom",disabled:t.getShow(e.row.content)}},[i("div",[t._v(t._s(t.getAgent(e.row.content)))])])],1)]}}])}),i("el-table-column",{attrs:{prop:"view_count",label:"访问量",sortable:"custom",width:"100"}}),i("el-table-column",{attrs:{prop:"comment_count",label:"评论",sortable:"custom",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticStyle:{cursor:"pointer"},on:{click:function(i){return t.commentDialog(e.row)}}},[t._v(" "+t._s(e.row.comment_count)+" ")])]}}])}),i("el-table-column",{attrs:{prop:"like_count",label:"点赞",sortable:"custom",width:"100"}}),i("el-table-column",{attrs:{prop:"share_count",label:"分享",sortable:"custom",width:"100"}}),i("el-table-column",{attrs:{prop:"report_count",label:"举报",sortable:"custom",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticStyle:{cursor:"pointer"},on:{click:function(i){return t.reportDialog(e.row)}}},[t._v(" "+t._s(e.row.report_count)+" ")])]}}])}),i("el-table-column",{attrs:{label:"来源",prop:"out_id"},scopedSlots:t._u([{key:"default",fn:function(e){return[""==e.row.out_id?i("span",[t._v("用户")]):i("span",[t._v("外部")])]}}])}),i("el-table-column",{attrs:{prop:"create_time",label:"发布时间",sortable:"custom"}}),i("el-table-column",{attrs:{align:"center",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==t.status?i("div",{staticStyle:{"margin-bottom":"10px"}},[i("div",[i("el-button",{staticStyle:{color:"#f00"},attrs:{size:"mini",type:"text"},on:{click:function(i){return t.deleteSubFun(e.row.thread_id)}}},[t._v("删除")])],1)]):i("div",[i("el-button",{staticStyle:{color:"#41b300"},attrs:{size:"mini",type:"text"},on:{click:function(i){return t.onePassAudit(e.row.thread_id,1)}}},[t._v("还原")])],1)]}}])})],1),i("div",{staticClass:"pagination"},[i("el-pagination",{attrs:{"current-page":t.curPage,"hide-on-single-page":!0,background:"",layout:"prev, pager, next",total:t.total},on:{"current-change":t.pageChange}})],1),i("el-dialog",{attrs:{title:"用户信息",visible:t.usertx,width:"70%"},on:{"update:visible":function(e){t.usertx=e}}},[i("userBounced",{ref:"userBounced"})],1),t.videoData?i("el-dialog",{attrs:{title:t.videoData.title,visible:t.dialogVisibleVideo,"before-close":t.handleClose,width:"50%"},on:{"update:visible":function(e){t.dialogVisibleVideo=e}}},[i("div",{staticStyle:{width:"80%",margin:"0 auto",display:"flex","align-items":"center"},attrs:{id:"v-box"}},[i("video",{staticClass:"videoHeight",attrs:{id:"videos"+t.videoIndex,poster:t.videoData.cover,controls:"controls",loop:"loop",width:"100%",src:t.videoData.video[0].file_url}})])]):t._e(),i("el-dialog",{attrs:{title:"大图预览",visible:t.dialogVisible,width:"50%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[t.dialogVisible?[i("el-carousel",{attrs:{autoplay:!1,"indicator-position":"none",arrow:"always",height:"600px","initial-index":t.imgIndex}},t._l(t.picData,(function(t,e){return i("el-carousel-item",{key:e},[i("div",{staticClass:"imgbox"},[i("el-image",{staticStyle:{height:"600px",width:"auto"},attrs:{fit:"contain",src:t}})],1)])})),1)]:t._e()],2),t.showBack?i("go-back"):t._e()],1)},s=[],o=(i("4160"),i("a15b"),i("ac1f"),i("1276"),i("159b"),i("ade3")),n={name:"threadlist",data:function(){var t;return t={sortingid:"",communityContent:"",showBack:!1,user_id:"",userDialogTK:!1,threadDialogTK:!1,shopDialogTK:!1,UserGiftShop:"",statusSH:"",is_recommend:"",is_top:"",status:"1",statusData:[{id:0,name:"删除"},{id:1,name:"正常"},{id:2,name:"违规"},{id:3,name:"待审核"}],video:"",videoData:[{id:0,name:"全部"},{id:1,name:"视频"}],sort:"",sortData:[{id:1,name:"浏览数"},{id:2,name:"评论数"},{id:3,name:"分享数"},{id:4,name:"被举报数"},{id:5,name:"最后回复时间"}],tuijieValue:"",tuijieData:[{id:0,name:"不推荐"},{id:1,name:"推荐"}],deleteDialog:!1,mutilDeleteDialog:!1,mutilTuijieDialog:!1,curPage:1,total:1,curPage2:1,tableListData:[],currenDeleteRow:"",multipleSelection:[],nameArr:[],deltitle:"",searchValue:"",usertx:!1,sortVal:"",sortStatus:!1,order:"desc",threadTypeArr:[{text:"纯文字",value:"0"},{text:"图片",value:"1"},{text:"视频",value:"2"}],isViedo:!1,thread_id:"",dialogVisibleVideo:!1},Object(o["a"])(t,"videoData",""),Object(o["a"])(t,"videoIndex",0),Object(o["a"])(t,"dialogVisible",!1),Object(o["a"])(t,"picData",[]),Object(o["a"])(t,"imgIndex",0),Object(o["a"])(t,"activeName","first"),Object(o["a"])(t,"checkNum",0),t},created:function(){sessionStorage.getItem("pages")?this.curPage=parseInt(sessionStorage.getItem("pages")):sessionStorage.getItem("curPage")&&(this.curPage=parseInt(sessionStorage.getItem("curPage"))),this.showBack=!!this.$route.query.from,this.$route.query.thread_id&&(this.thread_id=this.$route.query.thread_id),this.getTableList()},methods:{khaki:function(t,e){var i=this;""!=e.out_id?(this.sortingid=t,this.communityContent=e.content,this.$nextTick((function(){i.$refs["saveTagInput_"+t].focus()}))):this.$message({message:"不是外部来源，不允许编辑内容...",type:"warning"})},percentF:function(t,e){var i=this;if(this.communityContent!=t.content){var a={thread_id:t.thread_id,content:t.content};console.info("提交内容数据",a),this.api.community.communityModify(a).then((function(t){0==t.data.code?(i.sortingid="",i.$message({message:"修改内容成功",type:"success"})):(i.tableListData[e].content=i.communityContent,i.$message({message:"修改内容失败",type:"warning"}))}))}else this.sortingid=""},playFun:function(t,e){var i=this;this.videoData=t,this.videoIndex=e,this.dialogVisibleVideo=!0,setTimeout((function(){i.itemPlay(e)}))},itemPlay:function(t){var e=document.getElementById("videos".concat(t)),i=document.body.clientHeight,a=document.getElementById("v-box");a.style.height=i-400+"px",e.play()},handleClose:function(){var t=document.getElementById("videos".concat(this.videoIndex));t.pause(),this.dialogVisibleVideo=!1},getAgent:function(t){return t.length>20?t.substring(0,20)+" ...":t},getShow:function(t){return!(t.length>20)},filterTagTable:function(t){this.filterMethod(t)},filterMethod:function(t){var e=[],i=[];for(var a in t)e.push(a),i.push(t[a]);e=e.join(","),i=i.join(","),this.video=i,this.getTableList()},sortMethod:function(t){this.sortVal=t,this.sortStatus=!this.sortStatus,this.sortStatus?this.order="asc":this.order="desc",this.getTableList()},sortFilterFun:function(t){this.sortMethod(t.prop)},userInformation:function(t){var e=this;this.usertx=!0,setTimeout((function(){e.$refs.userBounced.addID(t.user_id)}),0)},threaddetailDialog:function(t){var e=this,i={thread_id:t};this.api.community.threaddetail(i).then((function(t){e.UserGiftShop=t.data.data,e.threadDialogTK=!0}))},commentDialog:function(t){this.$store.dispatch("updateVuex",{key:"title",value:t.title}),this.$router.push({path:"/commentlist",query:{thread_id:t.thread_id,from:"thread"}}),sessionStorage.removeItem("pages")},reportDialog:function(t){this.$router.push({path:"/reportList",query:{scene:7,thread_id:t.thread_id,from:"thread"}}),sessionStorage.removeItem("pages")},userDialog:function(t){this.UserGiftShop=t,this.userDialogTK=!0},shopDialog:function(t){this.UserGiftShop=t,this.shopDialogTK=!0},resetData:function(){this.sort="",this.video="",this.status="",this.curPage=1,this.getTableList()},screening:function(){this.curPage=1,this.getTableList()},getTableList:function(){var t=this,e={sort:this.sortVal,order:this.order,thread_type:this.video,status:this.status,keyword:this.searchValue,thread_id:this.thread_id,page:this.curPage};this.api.community.threadlist(e).then((function(e){t.tableListData=e.data.data.thread_list,t.total=e.data.count,t.checkNum=e.data.data.wait_review}))},searchDatas:function(){this.curPage=1,this.getTableList()},selectItem:function(t){var e=this;this.multipleSelection=[],this.nameArr=[],t.forEach((function(t,i){e.multipleSelection.push(t.thread_id),e.nameArr.push(t.title)}))},batchPass:function(t){""!=this.multipleSelection?this.passAudit(this.multipleSelection,t):this.$message({message:"请先勾选要审核的数据",type:"warning"})},onePassAudit:function(t,e){this.passAudit([t],e)},passAudit:function(t,e){var i=this,a={thread_id:t,status:e};this.api.community.GiftInsert(a).then((function(t){i.$message({message:""+t.data.msg,type:"success"}),i.getTableList()}))},toRecycle:function(){this.status="0",this.curPage=1,this.sortVal="delete_time",this.order="desc",this.getTableList()},toBack:function(){this.status="1",this.curPage=1,this.order="desc",this.sortVal="",this.getTableList()},deleteFun:function(){""==this.multipleSelection?this.$message({message:"请先勾选要删除的数据",type:"warning"}):this.deleteSubFun(this.multipleSelection)},deleteSubFun:function(t){var e=this,i={};i="number"==typeof t?{thread_id:[t]}:{thread_id:t},this.api.community.delHandles(i).then((function(t){e.$message({message:""+t.data.msg,type:"success"}),e.getTableList()}))},checkImage:function(t){var e=[];return e=t.split("."),"mp4"==e[e.length-1]||"rmvb"==e[e.length-1]||"avi"==e[e.length-1]||"ts"==e[e.length-1]},pageChange:function(t){this.curPage=t,this.getTableList(),sessionStorage.setItem("curPage",t)},handleThreadDetail:function(t){this.$router.push({path:"/threadlistList/threadDetail",query:{thread_id:t}})},showImglist:function(t,e){this.dialogVisible=!0,this.picData=t,this.imgIndex=e},toAudit:function(){sessionStorage.removeItem("curPage"),this.$router.push({path:"/threadlistList",query:{from:"thread",page:this.curPage}}),sessionStorage.removeItem("curPage")}}},r=n,l=(i("3f90"),i("2877")),c=Object(l["a"])(r,a,s,!1,null,"b67d083a",null);e["default"]=c.exports},a15b:function(t,e,i){"use strict";var a=i("23e7"),s=i("44ad"),o=i("fc6a"),n=i("a640"),r=[].join,l=s!=Object,c=n("join",",");a({target:"Array",proto:!0,forced:l||!c},{join:function(t){return r.call(o(this),void 0===t?",":t)}})},bfbc:function(t,e,i){}}]);
//# sourceMappingURL=chunk-b2080a5a.8c2a1e1c.js.map