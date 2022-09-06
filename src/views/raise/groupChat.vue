<template>
  <div class="shopSet">
    <div class="nav1">
      <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
      <div class="n-list">
        <span class="nav-s1">主 题：</span
        ><span class="nav-s2">{{ cfData.title }}</span>
      </div>
      <div class="n-list">
        <span class="nav-s1">发布者：</span
        ><span class="nav-s2">{{ gInfo.admin_nick_name }}</span>
      </div>
      <div class="n-list">
        <span class="nav-s1">店 铺：</span
        ><span class="nav-s2">{{ gInfo.shop_name }}</span>
      </div>
    </div>
    <Message
      :type="activeKey"
      :broken="broken"
      :hideUserList="hideUserList"
      :showUserList="showUserList"
      :msgNum="msgNum"
      @childFun="parentFun"
      ref="messageList"
    />
    <!-- @EmediaModalFun="EmediaModalFun" -->
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息" :visible.sync="usertx" width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
    <!-- 返回上一页 -->
    <goBack></goBack>
  </div>
</template>

<script>
import WebIM from "../../utils/WebIM";
import Message from "../../components/chat/message.vue";
import chat from "../../utils/chat";
export default {
  name: "",
  components: {
    Message,
  },
  data() {
    return {
      //用户详情弹框
      usertx: false,
      cf_id: "",
      username: "",
      password: "",
      group_no: null,
      //
      activeKey: "group",
      broken: false,
      collapsed: false,
      imUser: [],
      msgNum: 10, //消息个数
      cfData: {},
      gInfo: {},
    };
  },
  created() {
    if (this.$route.query.cf_id) {
      this.cf_id = this.$route.query.cf_id;
      this.getGroupchat(this.cf_id);
    }
  },
  methods: {
    //用户详情弹框
    userInformation(user_id) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(user_id);
      }, 0);
    },
    parentFun(n, i) {
      if (i == 1) {
        this.msgNum = n;
        Vue.$store.commit("getCount", this.msgNum);
        chat.getHistoryMessage();
      } else if (i == 2) {
        this.deleteMenber(n);
      } else {
        this.userInformation(n);
      }
    },
    // T除
    deleteMenber(id) {
      let data = {
        id: [id],
      };
      this.api.raise.EnrollDelete(data).then((res) => {
        // console.log('踢人',res)
        if (res.data.code == 0) {
          chat.getHistoryMessage();
          this.$message({
            message: "" + res.data.msg,
            type: "success",
          });
        }
      });
    },
    getGroupchat(cf_id) {
      let data = {
        cf_id: cf_id,
      };
      this.api.raise.groupChatData(data).then((res) => {
        this.cfData = res.data.data.crow_funding;
        this.gInfo = res.data.data.group_info;
        this.password = res.data.data.web_im.im_password;
        this.username = res.data.data.web_im.im_user;
        this.group_no = res.data.data.group_info.group_no;
        this.imUser = res.data.data.im_user;
        Vue.$store.commit("getUsers", this.imUser);
        Vue.$store.commit("getCount", this.msgNum);
        this.loginIm(this.password, this.username, res.data.data.web_im.app_key);
      });
    },
    loginIm(password, username, appkey) {
      let options = {
        user: username.toLowerCase(),
        pwd: password,
        // appKey: WebIM.config.appkey,
        appKey: appkey,
        that: this,
      };
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ userId: username, password: password, appkey: appkey })
      );
      localStorage.setItem("group_no", this.group_no);
      WebIM.conn.open(options);
    },
    //
    hideUserList() {
      this.$data.collapsed = true;
    },
    showUserList() {
      this.$data.collapsed = false;
    },
    // EmediaModalFun(v){
    //     this.$refs.emediaModal.showEmediaModal();
    //     this.$refs.emediaModal.showCallerWait(v);
    // },
  },
  destroyed() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("group_no");
    WebIM.conn.close();
    Vue.$store.commit("resMsgs");
  },
};
</script>

<style scoped>
.shopSet {
  margin: 15px 15px;
}
.nav1 {
  background: #fff;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  padding: 15px 15px;
}
.pageTitle {
  margin: 10px 0 20px 0;
  font-size: 24px;
  color: #0a0a0a;
}
.n-list {
  font-size: 16px;
  color: #0a0a0a;
  line-height: 28px;
}
.nav-s2 {
  color: #666;
}
</style>