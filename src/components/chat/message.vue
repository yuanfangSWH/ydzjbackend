<template>
  <div class="messagebox">
    <!-- {{messageList}} -->
    <div class="messagebox-content" ref="msgContent">
      <!-- <template v-if="messageList.length"> -->
         <div
        v-for="(item, i) in messageList"
        :key="i"
        class="message-group"
        :style="{ float: item.bySelf ? 'right' : 'left' }"
      >
        <!-- 自己发言 -->
        <div class="x-box" v-if="item.bySelf">
          <div class="g-tx" style="margin-right:10px">
            <div class="tx-div" @click="userInformation(userIdFun(item.userName))"><img style="width:40px; height:40px;border-radius: 100%;" :src="avatarFun(item.userName)" /></div>
            <!-- <div class="tchu">T除</div> -->
          </div>
          <div class="g-content">
            <div
              :style="{
                'text-align': item.bySelf ? 'left' : 'right',
                display: 'inline-block',
                width: '100%',
              }"
            >
              <h4
                :style="{
                  float: item.bySelf ? 'left' : 'right',
                  margin: 0,
                  display: 'inline-block',
                }"
              >
                <i class="sex-i" :class="[genderFun(item.userName) == 1 ? 'boyIcon':'girlIcon']"></i>
                <span class="age-s" :class="[genderFun(item.userName) == 1 ? 'boyColor':'girlColor']">{{ageFun(item.userName)}}</span>
                {{ nameFun(item.userName) }}
              <span style="float:right; margin-left:5px; font-weight: normal; font-size:12px; position: relative;
    top: 2px;"> (发起者)</span>
              </h4>
              <!-- 聊天时间 -->
              <div
                v-if="item.status !== 'recall'"
                class="time-style"
                :style="{
                  float: item.bySelf ? 'left' : 'right',
                  display: 'inline-block',
                }"
              >
                {{ renderTime(item.time) }}
                {{ item.bySelf ? status[item.status] : "" }}
              </div>
            </div>
            <span class="xiaoxi-s" style="user-select: none">
              <!-- 图片消息 -->
              <img
                :key="item.msg"
                :src="item.msg ? item.msg : ''"
                v-if="item.type === 'img'"
                class="img-style"
                :style="{ float: item.bySelf ? 'left' : 'right' }"
              />
              <!-- 文件card -->
              <div
                v-else-if="item.type === 'file'"
                class="file-style"
                :style="{ float: item.bySelf ? 'left' : 'right' }"
              >
                <el-card :body-style="{ padding: '0px' }">
                  <div style="padding: 14px">
                    <h2>文件</h2>
                    <span>
                      <h3>{{ item.filename }}</h3>
                    </span>
                    <div class="bottom clearfix">
                      <span>{{ readablizeBytes(item.file_length) }}</span>
                      <a :href="item.msg" :download="item.filename">点击下载</a>
                    </div>
                  </div>
                </el-card>
              </div>
              <!-- 音频消息 -->
              <div
                v-else-if="item.type === 'audio'"
                :style="{ float: item.bySelf ? 'left' : 'right' }"
              >
                <audio :src="item.msg" controls></audio>
              </div>
              <!-- 视频消息 -->
              <div v-else-if="item.type === 'video'">
                <video :src="item.msg" width="100%" controls></video>
              </div>
              <!-- 聊天消息 -->
              <div v-else style="position: relative;">
                <p style="user-select: text"
                v-html="renderTxt(item.msg)"
                :class="{ byself: item.bySelf }"
                ></p>
                <i class="x-icon2 el-icon-caret-righ"></i>
              </div>
            
            </span>
          </div>
        </div>
        
        <!-- 他人发言 -->
        <div class="x-box" v-else>
          <div class="g-content" style="margin-right:10px">
            <div
              :style="{
                'text-align': 'right',
                display: 'inline-block',
                width: '100%',
              }"
            >
              <h4
                :style="{
                  float: item.bySelf ? 'left' : 'right',
                  margin: 0,
                  display: 'inline-block',
                }"
              >
                {{ nameFun(item.userName) }}
                <i class="sex-i" :class="[genderFun(item.userName) == 1 ? 'boyIcon':'girlIcon']"></i>
                <span class="age-s" :class="[genderFun(item.userName) == 1 ? 'boyColor':'girlColor']">{{ageFun(item.userName)}}</span>
              </h4>
              <!-- 聊天时间 -->
              <div
                v-if="item.status !== 'recall'"
                class="time-style"
                :style="{
                  float: item.bySelf ? 'left' : 'right',
                  display: 'inline-block',
                }"
              >
                {{ renderTime(item.time) }}
                {{ item.bySelf ? status[item.status] : "" }}
              </div>
            </div>
            <span class="xiaoxi-s" style="user-select: none">
              <!-- 图片消息 -->
              <img
                :key="item.msg"
                :src="item.msg ? item.msg : ''"
                v-if="item.type === 'img'"
                class="img-style"
                :style="{ float: item.bySelf ? 'left' : 'right' }"
              />
              <!-- 文件card -->
              <div
                v-else-if="item.type === 'file'"
                class="file-style"
                :style="{ float: item.bySelf ? 'left' : 'right' }"
              >
                <el-card :body-style="{ padding: '0px' }">
                  <div style="padding: 14px">
                    <h2>文件</h2>
                    <span>
                      <h3>{{ item.filename }}</h3>
                    </span>
                    <div class="bottom clearfix">
                      <span>{{ readablizeBytes(item.file_length) }}</span>
                      <a :href="item.msg" :download="item.filename">点击下载</a>
                    </div>
                  </div>
                </el-card>
              </div>
              <!-- 音频消息 -->
              <div
                v-else-if="item.type === 'audio'"
                :style="{ float: item.bySelf ? 'left' : 'right' }"
              >
                <audio :src="item.msg" controls></audio>
              </div>
              <!-- 视频消息 -->
              <div v-else-if="item.type === 'video'">
                <video :src="item.msg" width="100%" controls></video>
              </div>
              <!-- 聊天消息 -->
              <div v-else>
                <p style="user-select: text; float:right"
                v-html="renderTxt(item.msg)"
                :class="{ byself: item.bySelf }"
                ></p>
                <i class="x-icon el-icon-caret-righ"></i>
              </div>
            
            </span>
          </div>
          <div class="g-tx">
            <div class="tx-div" @click="userInformation(userIdFun(item.userName))"><img style="width:40px; height:40px;border-radius: 100%;" :src="avatarFun(item.userName)" /></div>
            <div class="tchu" v-if="statusFun(item.userName) != 4 && statusFun(item.userName) != 5" @click="delMenber(enrollIdFun(item.userName))">T除</div>
            <div class="tchu" style="color:#bbb" v-else>已T除</div>
          </div>
        </div>
      </div>
      <!-- </template> -->
      <!-- <div v-else>
        暂无消息
      </div> -->
      <div class="ftbox">
        <div class="moreMsgs" @click="loadMoreMsgs">{{ loadText }}</div>
        <div class="moreMsgs ng30" @click="refreshFun">刷新消息</div>
      </div>
    </div>
  </div>
</template>

<script>
import emoji from "../../utils/emoji";
import "./index.less";
import { mapActions, mapGetters } from "vuex";
import { msgsList } from "@/utils/chat";
import moment from "moment";
import { set } from 'js-cookie';
export default {
  data() {
    return {
      messageList: Vue.$store.state.chat.msgList,
      imUser: Vue.$store.state.chat.imUser,
      activedKey: {
        contact: "",
        group: "",
        chatroom: "",
      },
      message: "",
      isHttps: window.location.protocol === "https:",
      loadText: "加载更多",
      status: {
        sending: "发送中",
        sent: "已发送",
        read: "已读",
      },
      nowIsVideo: false,
      imgUrl: null,
      imgStatus: true
    };
  },

  // beforeMount() {
  //   if (this.type === "contact") {
  //     this.onGetContactUserList();
  //   } else if (this.type === "group") {
  //     this.onGetGroupUserList();
  //   } else if (this.type === "chatroom") {
  //     this.onGetChatroomUserList();
  //   }
  // },
  watch:{
    messageList(n,o){
      // console.log('有值')
      // console.log(n)
    }
  },
  updated() {
    // console.log("数据", this.$store);
    this.scollBottom();
  },
  created() {
    
  },
  mounted() {
    
  },
  computed: {
    ...mapGetters({
      contact: "onGetContactUserList",
      // group: "onGetGroupUserList",
      chatroom: "onGetChatroomUserList",
      msgList: "onGetCurrentChatObjMsg",
    }),
    userList() {
      return {
        contact: this.contact,
        group: this.group,
        chatroom: this.chatroom,
      };
    },
    // selectedKeys() {
    //   return [this.getKey(this.activedKey[this.type]) || ""];
    // },
  },
  props: [
    "type", // 聊天类型 contact, group, chatroom
    "username", // 选中的聊天对象
    "broken", // 是否适应移动端
    "showUserList",
    "hideUserList",
    "msgNum"
  ],
  methods: {
    ...mapActions([
      "onGetContactUserList",
      // "onGetGroupUserList",
      "onGetChatroomUserList",
      "onGetCurrentChatObjMsg",
      "onSendText",
      "onCallVideo",
      "onCallVoice",
      "getGroupMembers",
      "getHistoryMessage",
      "onAddBlack",
      "onDelteFirend",
      "onGetGroupinfo",
      "recallMessage",
      "onGetGroupBlack",
    ]),
    // getKey(item, type) {
    //   let key = "";
    //   switch (type) {
    //     case "contact":
    //       key = item.name;
    //       break;
    //     case "group":
    //       key = item.groupid;
    //       break;
    //     case "chatroom":
    //       key = item.id;
    //       break;
    //     default:
    //       break;
    //   }
    //   return key;
    // },
    // getCurrentMsg(props) {
    //   this.onGetCurrentChatObjMsg({
    //     type: props,
    //     id: this.getKey(this.activedKey[props], props),
    //   });
    // },
    // select(key) {
    //   this.$data.activedKey[this.type] = key;
    //   const me = this;
    //   me.$data.loadText = "加载更多";

    //   if (this.type === "group") {
    //     this.$router.push({ name: this.type, params: { id: key.groupid } });
    //     this.onGetCurrentChatObjMsg({ type: this.type, id: key.groupid });

    //     setTimeout(() => {
    //       Vue.$store.commit("updateMessageStatus", {
    //         action: "oneUserReadMsgs",
    //         readUser: key.groupid,
    //       });
    //       this.$forceUpdate();
    //     }, 100);

    //     if (!this.msgList) {
    //       this.getHistoryMessage({ name: key.groupid, isGroup: true });
    //     }
    //   }
    // },
    loadMoreMsgs() {
      if(this.loadText == "加载更多"){
        this.msgNum += 10
        this.$emit('childFun', this.msgNum, 1)
      }
      if(this.messageList.length < this.msgNum){
        this.loadText = "已无更多数据"
        return
      }else{
        this.loadText = "加载更多"
      }
    },
    refreshFun() {
      // this.$emit('childFun', this.msgNum, 1)
       location.reload(true);
    },
    // T除
    delMenber(id) {
      this.$emit('childFun', id, 2)
    },
    userInformation(id) {
      this.$emit('childFun', id, 3)
    },
    // onSendTextMsg() {
    //   if (this.$data.message == "" || this.$data.message == "\n") {
    //     this.$data.message = "";
    //     return;
    //   }
    //   this.onSendText({
    //     chatType: this.type,
    //     chatId: this.$data.activedKey[this.type],
    //     message: this.$data.message,
    //   });
    //   this.$data.message = "";
    // },

    // selectEmoji(v) {
    //   this.$data.message = v;
    //   this.$refs.txtDom.focus();
    // },
    isImg(url) {
      return url.indexOf(".png") != -1 ? true : false;
    },
    customEmoji(value) {
      const imgUrl = require(`../../../static/faces/${value}`);
      return `<img src="${imgUrl}" style="width:20px" />`;
    },

    renderTxt(txt = "") {
      let rnTxt = [];
      let match = null;
      const regex = /(\[.*?\])/g;
      let start = 0;
      let index = 0;
      while ((match = regex.exec(txt))) {
        index = match.index;
        if (index > start) {
          rnTxt.push(txt.substring(start, index));
        }
        if (match[1] in emoji.obj) {
          const v = emoji.obj[match[1]];
          rnTxt.push(this.customEmoji(v));
        } else {
          rnTxt.push(match[1]);
        }
        start = index + match[1].length;
      }
      rnTxt.push(txt.substring(start, txt.length));
      let dom = "";
      // console.log(rnTxt)
      rnTxt.forEach((item) => {
        dom = dom + item;
      });
      return dom;
    },

    callVideo() {
      if (this.type == "contact") {
        const val = this.$data.activedKey[this.type].name;
        this.$emit("EmediaModalFun", val);
        const videoSetting = JSON.parse(localStorage.getItem("videoSetting"));
        const recMerge = (videoSetting && videoSetting.recMerge) || false;
        const rec = (videoSetting && videoSetting.rec) || false;
        this.onCallVideo({
          chatType: this.type,
          to: this.$data.activedKey[this.type].name,
          rec,
          recMerge,
        });
      } else if (this.type == "group") {
        this.getGroupMembers(this.$data.activedKey[this.type].groupid);
        this.$refs.addAvMembertModal.show();
      }
    },
    callVoice() {
      const val = this.$data.activedKey[this.type].name;
      this.$emit("EmediaModalFun", val);
      const videoSetting = JSON.parse(localStorage.getItem("videoSetting"));
      const recMerge = (videoSetting && videoSetting.recMerge) || false;
      const rec = (videoSetting && videoSetting.rec) || false;
      this.onCallVoice({
        chatType: this.type,
        to: this.$data.activedKey[this.type].name,
        rec,
        recMerge,
      });
    },
    readablizeBytes(value) {
      let s = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
      let e = Math.floor(Math.log(value) / Math.log(1024));
      return (value / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
    },

    // TODO 可以抽离到utils
    renderTime(time) {
      const nowStr = new Date();
      const localStr = time ? new Date(time) : nowStr;
      const localMoment = moment(localStr);
      const localFormat = localMoment.format("MM-DD hh:mm A");
      return localFormat;
    },
    getLastMsg(item) {
      const { name, params } = this.$route;
      const chatList = this.$store.state.chat.msgList[name];
      let userId = "";
      if (name == "contact") {
        userId = item.name;
      } else if (name == "group") {
        userId = item.groupid;
      } else {
        userId = item.id;
      }
      const currentMsgs = chatList[userId] || [];
      const lastMsg = currentMsgs.length
        ? currentMsgs[currentMsgs.length - 1].msg
        : "";
      const msgTime = currentMsgs.length
        ? this.renderTime(currentMsgs[currentMsgs.length - 1].time)
        : "";
      return { lastMsg, msgTime };
    },
    scollBottom() {
      setTimeout(() => {
        const dom = this.$refs.msgContent;
        if (!dom) return;
        dom.scrollTop = dom.scrollHeight;
      }, 0);
    },
    handleCommand(item) {
      let name = "";
      if (this.type === "contact") {
        name = this.$data.activedKey[this.type].name;
      } else if (this.type === "group") {
        name = this.$data.activedKey[this.type].groupid;
      } else if (this.type === "chatroom") {
        name = this.$data.activedKey[this.type].id;
      }
      this.recallMessage({ to: name, message: item });
    },
    closeGroupMessage() {
      //退出群组或解散群组时关闭聊天框
      this.$data.activedKey["group"] = "";
    },
    closeContactMessage() {
      //删除好友时关闭当前聊天框
      this.$data.activedKey["contact"] = "";
    },
    // changeIsVideoState(v) {
    //   v ? (this.$data.nowIsVideo = true) : (this.$data.nowIsVideo = false);
    // }
    avatarFun(id) {
      if(this.imUser){
        let userArr = this.imUser[0]
        for(var i=0; i<userArr.length; i++){
          if(id == userArr[i].im_user){
            return userArr[i].avatar
          }
        }
      }
    },
    genderFun(id) {
      if(this.imUser){
        let userArr = this.imUser[0]
        for(var i=0; i<userArr.length; i++){
          if(id == userArr[i].im_user){
            return userArr[i].gender
          }
        }
      }
    },
    ageFun(id) {
      if(this.imUser){
        let userArr = this.imUser[0]
        for(var i=0; i<userArr.length; i++){
          if(id == userArr[i].im_user){
            return userArr[i].age
          }
        }
      }
    },
    enrollIdFun(id) {
      if(this.imUser){
        let userArr = this.imUser[0]
        for(var i=0; i<userArr.length; i++){
          if(id == userArr[i].im_user){
            return userArr[i].cf_enroll_id
          }
        }
      }
    },
    userIdFun(id) {
      if(this.imUser){
        let userArr = this.imUser[0]
        for(var i=0; i<userArr.length; i++){
          if(id == userArr[i].im_user){
            return userArr[i].user_id
          }
        }
      }
    },
    nameFun(id) {
      if(this.imUser){
        let userArr = this.imUser[0]
        for(var i=0; i<userArr.length; i++){
          if(id == userArr[i].im_user){
            return userArr[i].nick_name
          }
        }
      }
    },
    statusFun(id) {
      if(this.imUser){
        let userArr = this.imUser[0]
        for(var i=0; i<userArr.length; i++){
          if(id == userArr[i].im_user){
            return userArr[i].cf_status
          }
        }
      }
    }
  },
  components: {
    // ChatEmoji,
    // UpLoadImage,
    // UpLoadFile,
    // RecordAudio,
    // MultiAVModal,
    // EmediaModal,
  },
  destroyed(){
      Vue.$store.commit('resMsgs')
  }
};
</script>

<style scoped lang='less'>
.sex-i{ width: 10px; height: 10px; display: inline-block;}
.boyIcon{ background: url(../../assets/boy.png) no-repeat; background-size: 100% auto;}
.girlIcon{ background: url(../../assets/girl.png) no-repeat; background-size: 100% auto;}
.girlColor{ color: #EE81A8;}
.boyColor{ color: #81A0EC;}
.ge-s{ margin-right: 8px;}
.byself {
  float: right;
}
.recallMsg {
  font-size: 12px;
  color: #aaa;
  width: 100%;
  text-align: center;
}
.custom-title {
  font-weight: 500;
}
.ftbox{ width: 100%; display: inline-block; margin-top: 20px; text-align: center; border-top: 1px solid #eeeeee;}
.moreMsgs {
  display: inline-block;
  background: #f1f1f1 !important;
  font-size: 14px;
  padding: 10px 30px;
  margin-top: 10px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
}
.ng30{ margin-left: 30px;}
.status {
  display: inline;
  position: relative;
  top: 20px;
  font-size: 12px;
  left: -6px;
  color: #736c6c;
  float: left;
}
.unreadNum {
  float: left;
  width: 100%;
}
.icon-style {
  display: inline-block;
  background-color: #f04134;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: white;
  line-height: 1.5;
  text-align: center;
}
.emoji-style {
  width: 22px;
  float: left;
}
.img-style {
  max-width: 350px;
}
.time-style {
  clear: both;
  margin-left: 2px;
  margin-top: 3px;
  font-size: 12px;
  color: #888c98;
}
.file-style {
  width: 240px;
  margin: 2px 2px 2px 0;
  font-size: 13px;
  h2 {
    border-bottom: 1px solid #e0e0e0;
    font-weight: 300;
    text-align: left;
  }
  h3 {
    max-width: 100%;
    font-size: 15px;
    height: 20px;
    line-height: 20px;
    font-weight: 600;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    margin-bottom: 20px;
  }
  .bottom {
    span {
      color: #999999;
      text-align: left;
    }
  }
  a {
    color: #999999;
    float: right;
    text-decoration: none;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>

