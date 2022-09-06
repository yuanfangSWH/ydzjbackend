<template>
  <div class="shopSet">
    <div class="page-title">{{ this._getVuex("pageTitle") }}</div>
    <el-form :v-model="ruleForm" label-width="300px" class="demo-ruleForm">
      <el-form-item label="举报ID：">
        {{ ruleForm.ReportInfo.report_id }}
      </el-form-item>
      <el-form-item label="举报人ID：">
        {{ ruleForm.ReportInfo.user_id }}
      </el-form-item>
      <el-form-item label="被举报人ID：">
        {{ ruleForm.ReportInfo.info_id }}
      </el-form-item>
      <el-form-item label="场景值：">
        {{ ruleForm.ReportInfo.scene }}
      </el-form-item>
      <el-form-item label="举报类型：">
        {{ ruleForm.ReportInfo.type }}
      </el-form-item>
      <el-form-item label="描述：">
        {{ ruleForm.ReportInfo.desc }}
      </el-form-item>
      <el-form-item label="举报时间：">
        {{ ruleForm.ReportInfo.time }}
      </el-form-item>
      <el-form-item label="状态：">
        {{ ruleForm.ReportInfo.status }}
      </el-form-item>
      <el-form-item label="举报图片信息：">
        <div v-if="ruleForm.ReportPics != ''">
          <el-image
            class="xiangche"
            v-for="(item, key) in ruleForm.ReportPics"
            :key="key"
            :src="item.pic_path"
          ></el-image>
        </div>
        <div v-else>空</div>
      </el-form-item>
      <div class="jbr">
        <el-form-item label="举报用户ID：">
          {{ ruleForm.ReportUser.user_id }}
        </el-form-item>
        <el-form-item label="举报用户昵称：">
          {{ ruleForm.ReportUser.nickname }}
        </el-form-item>
        <el-form-item label="等级：">
          {{ ruleForm.ReportUser.level }}
        </el-form-item>
        <el-form-item label="邀请码：">
          {{ ruleForm.ReportUser.invite_code }}
        </el-form-item>
        <el-form-item label="头像：">
          <el-image :src="ruleForm.ReportUser.avatar"></el-image>
        </el-form-item>
        <el-form-item label="年龄：">
          {{ ruleForm.ReportUser.age }}
        </el-form-item>
        <el-form-item label="生肖：">
          {{ ruleForm.ReportUser.zodiac }}
        </el-form-item>
        <el-form-item label="星座：">
          {{ ruleForm.ReportUser.constellation }}
        </el-form-item>
        <el-form-item label="签名：">
          {{ ruleForm.ReportUser.signature }}
        </el-form-item>
        <el-form-item label="性别：">
          <span v-if="ruleForm.ReportUser.gender == 0">未知</span>
          <span v-else-if="ruleForm.ReportUser.gender == 1">男</span>
          <span v-else-if="ruleForm.ReportUser.gender == 2">女</span>
        </el-form-item>
        <el-form-item label="国家：">
          {{ ruleForm.ReportUser.country }}
        </el-form-item>
        <el-form-item label="省份：">
          {{ ruleForm.ReportUser.province }}
        </el-form-item>
        <el-form-item label="城市：">
          {{ ruleForm.ReportUser.city }}
        </el-form-item>
        <el-form-item label="区域：">
          {{ ruleForm.ReportUser.area }}
        </el-form-item>
        <el-form-item label="可用积分：">
          {{ ruleForm.ReportUser.available_point }}
        </el-form-item>
        <el-form-item label="注册时间：">
          {{ ruleForm.ReportUser.reg_time }}
        </el-form-item>
        <el-form-item label="上次活动时间：">
          {{ ruleForm.ReportUser.last_time }}
        </el-form-item>
        <el-form-item label="距离：">
          {{ ruleForm.ReportUser.distance }}
        </el-form-item>
        <el-form-item label="是否可见：">
          <span v-if="ruleForm.ReportUser.visible == 0">隐藏</span>
          <span v-else>可见</span>
        </el-form-item>
        <el-form-item label="状态：">
          <span v-if="ruleForm.ReportUser.status == 0">禁用</span>
          <span v-else-if="ruleForm.ReportUser.status == 1">正常</span>
          <span v-else-if="ruleForm.ReportUser.status == 2">禁言</span>
        </el-form-item>
      </div>
      <div class="bjbr">
        <el-form-item label="被举报用户ID：">
          {{ ruleForm.ReportedUser.user_id }}
        </el-form-item>
        <el-form-item label="被举报用户昵称：">
          {{ ruleForm.ReportedUser.nickname }}
        </el-form-item>
        <el-form-item label="等级：">
          {{ ruleForm.ReportedUser.level }}
        </el-form-item>
        <el-form-item label="邀请码：">
          {{ ruleForm.ReportedUser.invite_code }}
        </el-form-item>
        <el-form-item label="头像：">
          <el-image :src="ruleForm.ReportedUser.avatar"></el-image>
        </el-form-item>
        <el-form-item label="年龄：">
          {{ ruleForm.ReportedUser.age }}
        </el-form-item>
        <el-form-item label="生肖：">
          {{ ruleForm.ReportedUser.zodiac }}
        </el-form-item>
        <el-form-item label="星座：">
          {{ ruleForm.ReportedUser.constellation }}
        </el-form-item>
        <el-form-item label="签名：">
          {{ ruleForm.ReportedUser.signature }}
        </el-form-item>
        <el-form-item label="性别：">
          <span v-if="ruleForm.ReportedUser.gender == 0">未知</span>
          <span v-else-if="ruleForm.ReportedUser.gender == 1">男</span>
          <span v-else-if="ruleForm.ReportedUser.gender == 2">女</span>
        </el-form-item>
        <el-form-item label="国家：">
          {{ ruleForm.ReportedUser.country }}
        </el-form-item>
        <el-form-item label="省份：">
          {{ ruleForm.ReportedUser.province }}
        </el-form-item>
        <el-form-item label="城市：">
          {{ ruleForm.ReportedUser.city }}
        </el-form-item>
        <el-form-item label="区域：">
          {{ ruleForm.ReportedUser.area }}
        </el-form-item>
        <el-form-item label="可用积分：">
          {{ ruleForm.ReportedUser.available_point }}
        </el-form-item>
        <el-form-item label="注册时间：">
          {{ ruleForm.ReportedUser.reg_time }}
        </el-form-item>
        <el-form-item label="上次活动时间：">
          {{ ruleForm.ReportedUser.last_time }}
        </el-form-item>
        <el-form-item label="距离：">
          {{ ruleForm.ReportedUser.distance }}
        </el-form-item>
        <el-form-item label="是否可见：">
          <span v-if="ruleForm.ReportedUser.visible == 0">隐藏</span>
          <span v-else>可见</span>
        </el-form-item>
        <el-form-item label="状态：">
          <span v-if="ruleForm.ReportedUser.status == 0">禁用</span>
          <span v-else-if="ruleForm.ReportedUser.status == 1">正常</span>
          <span v-else-if="ruleForm.ReportedUser.status == 2">禁言</span>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //举报ID
      report_id: "",
      //举报信息
      ruleForm: {
        ReportInfo: {
          report_id: "",
          user_id: "",
          info_id: "",
          info_id: "",
          scene: "",
          type: "",
          desc: "",
          time: "",
          status: "",
        },
        ReportUser: {
          user_id: "",
          nickname: "",
          level: "",
          invite_code: "",
          avatar: "",
          age: "",
          zodiac: "",
          constellation: "",
          signature: "",
          gender: "",
          country: "",
          province: "",
          city: "",
          area: "",
          available_point: "",
          reg_time: "",
          last_time: "",
          distance: "",
          visible: "",
          status: "",
        },
        ReportedUser: {},
        ReportPics: {
          pic_id: "",
          report_id: "",
          user_id: "",
          pic_path: "",
          create_time: "",
        },
      },
    };
  },
  created() {
    this.report_id = Number(this.$route.query.report_id);
    this.getUserDetail();
  },
  methods: {
    //举报记录详情
    getUserDetail() {
      var data = {
        report_id: this.report_id,
      };
      this.api.user.ReportDetail(data).then((res) => {
        this.ruleForm = res.data.data;
      });
    },
  },
};
</script>

<style scoped>
.jbr {
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: rgb(198, 227, 240);
  margin-bottom: 20px;
}
.bjbr {
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: rgb(252, 209, 201);
}
.mainBox >>> .el-input {
  width: 50% !important;
}
.shopSet {
  margin: 15px;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #dfdfdf;
}
.el-button--warning {
  background-color: #ffbe11;
  box-shadow: 0px 4px 4px rgba(255, 190, 17, 0.5);
  border: none;
  color: #0a0a0a;
  font-size: 15px;
}
.el-button--info {
  background-color: #f1f1f1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border: none;
  color: #0a0a0a;
  font-size: 15px;
}
.el-form-item {
  width: 50% !important;
}
.el-input {
  min-width: 200px !important;
  width: 50% !important;
}
.form-shan {
  margin-left: 10px;
}
.form-shan2 {
  margin-left: 10px;
  color: #aaaaaa;
  display: inline-block;
}
.el-button--primary {
  background-color: #1f1f1f;
  border: none;
}
.attrBox {
  border: 1px solid #cecece;
  background: #f4f4f4;
  padding: 20px 20px 0;
  width: 60%;
  margin: 20px 0;
}
.box01 {
  display: flex;
  margin-bottom: 20px;
}
.m-nav {
  flex: 1;
}
.el-button--primary {
  background-color: #1f1f1f;
  border: none;
}
.attr-s01 {
  margin-right: 10px;
}
.box02 {
  padding-left: 10%;
}
.btnBox {
  margin-top: 20px;
}
.shopSet >>> .timeNav {
  width: 120px !important;
  margin-right: 10px;
}
.timeBox {
  display: flex;
}
.time-span {
  margin: 0 5px;
}
.xiangche {
  margin-right: 10px;
}
</style>