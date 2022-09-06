<!--
 * @Author: your name
 * @Date: 2021-03-25 09:44:49
 * @LastEditTime: 2021-03-25 15:57:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\community\components\sysPushForm.vue
-->
<template>
  <div>
    <el-form
      :model="detailsData"
      :rules="rules"
      ref="detailsData"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="推送标题：" prop="title">
        <el-input
          style="width: 80%"
          v-model="detailsData.title"
          placeholder="请填写推送标题"
          show-word-limit
          maxlength="30"
        ></el-input>
      </el-form-item>
      <el-form-item label="推送描述：" prop="content">
        <el-input
          style="width: 80%"
          type="textarea"
          v-model="detailsData.content"
          :rows="3"
          show-word-limit
          maxlength="150"
          placeholder="请填写推送描述内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="url">
        <div style="display: flex; align-items: center; width: 80%">
          <div style="flex: 1">
            <el-input
              v-model="detailsData.url"
              placeholder="请输入链接"
            ></el-input>
          </div>
          <el-tooltip class="item" effect="dark" placement="right" height="300">
            <div class="tipText" slot="content">
              https://m.ddhi.cn/user/detail?user_id= 走个人主页<br />
              http://xxx H5(通用Url，走webview)<br />
              ydzj://index 首页 X<br />
              ydzj://scan 扫码<br />
              ydzj://setting 设置<br />
              ydzj://certification 实名认证<br />
              ydzj://cs 客服 //CustomerService<br />
              ydzj://help 新手指南<br />
              ydzj://invite 邀请赚钱<br />
              ydzj://coupon 红包卡券<br />
              ydzj://qr 我的二维码<br />

              ydzj://shop/search 首页待搜索页<br />
              ydzj://shop/search?keyword=搜索词 首页搜索结果页<br />
              ydzj://shop/list?type_id=商家类型ID&area_id=区域ID&sort=排序&keyword=搜索词
              商家列表页<br />
              ydzj://shop/detail?shop_id=商家ID&merchant_id=店铺ID 店铺详情页<br />

              ydzj://thread/list?keyword=搜索词 发现 X<br />
              ydzj://thread/follower 我关注的人发的<br />
              ydzj://thread/detail?id=帖子ID 发现详情<br />
              ydzj://thread/video?id=视频ID 视频详情<br />
              ydzj://thread/issue 发现发布页<br />

              ydzj://groupparty/list?keyword=搜索词&shop_id=商家ID&merchant_id=店铺ID&type_id=商家类型ID&area_id=区域ID&sort=排序方式
              组局列表<br />
              ydzj://groupparty/detail?id=组局ID 组局详情<br />
              ydzj://groupparty/issue 发布组局<br />

              ydzj://crowdfunding/list?keyword=搜索词&shop_id=商家ID&merchant_id=店铺ID&type_id=商家类型ID&area_id=区域ID&sort=排序方式
              拼桌列表<br />
              ydzj://crowdfunding/detail?id=拼桌ID 拼桌详情<br />
              ydzj://crowdfunding/issue 发布拼桌<br />

              ydzj://article/list?type=2 夜店小助手<br />

              ydzj://message/index 消息首页<br />
              ydzj://message/system?type=业务类型&id=业务ID 系统通知列表<br />
              ydzj://message/order?type=业务类型&id=业务ID 订单消息列表<br />
              ydzj://message/interact?type=业务类型&id=业务ID 互动消息列表<br />
              ydzj://message/activity?type=业务类型&id=业务ID 活动通知列表<br />

              ydzj://my/friend 我的好友<br />
              ydzj://my/addfriend 添加好友<br />
              ydzj://my/following 我的关注<br />
              ydzj://my/fans 我的粉丝<br />
              ydzj://my/index 我的主页<br />
              ydzj://my/edit 编辑资料<br />
              ydzj://my/album 我的相册<br />
              ydzj://my/groupparty?scene=场景（1 我发布的组局 2 我参与的组局）
              我的组局<br />
              ydzj://my/crowdfunding?scene=场景(1我发布的 2我报名的) 我的拼桌<br />
              ydzj://my/wallet 我的钱包<br />
              ydzj://my/currency 我的账单<br />
              ydzj://my/income 我的收入<br />
              ydzj://my/like 我喜欢的<br />

              ydzj://user/index?user_id=用户ID Ta的主页<br />

              ydzj://order/list 我的订单所有订单<br />
              ydzj://order/list?status=订单状态 我的订单分状态<br />

              ydzj://reserve/list // 我的所有预订<br />
              ydzj://reserve/list?type=%d // 我的预订分状态<br />
              ydzj://reserve/detail?order_no=%d //
              预订详情（101版本实现复杂，先不用）<br />

              104以后<br />
              ydzj://news/list?keyword=%s // 资讯列表<br />
              ydzj://news/list?mid=%d&keyword=%s // 资讯列表（分类、标签）<br />
              ydzj://news/detail?id=%d // 资讯详情
            </div>
            <i
              class="tip-i el-icon-info"
              style="margin-left: 10px; font-size: 20px"
            ></i>
          </el-tooltip>
        </div>
      </el-form-item>

      <el-form-item label="计划时间：">
        <el-date-picker
          style="width: 80%"
          v-model="detailsData.send_time"
          type="datetime"
          placeholder="设置计划推送时间"
          value-format="yyyy-MM-dd HH:mm"
          format="yyyy-MM-dd HH:mm"
        >
        </el-date-picker>
        注：不填则立即推送
      </el-form-item>
      <el-form-item label="全体推送" prop="target">
        <el-switch
          v-model="detailsData.target"
          active-value="1"
          inactive-value="2"
        >
        </el-switch>
      </el-form-item>
      <el-form-item v-if="detailsData.target == '2'" label="指定性别：">
        <el-checkbox-group v-model="target_sex">
          <el-checkbox label="男"></el-checkbox>
          <el-checkbox label="女"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="detailsData.target == '2'" label="指定系统：">
        <el-checkbox-group v-model="target_os">
          <el-checkbox label="iOS"></el-checkbox>
          <el-checkbox label="Android"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: right">
      <el-button @click="handleCancel" class="y-btn">取消</el-button>
      <el-button
        type="primary"
        @click="handlePushData('detailsData')"
        class="b-btn"
        >确定</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "systemPushForm",
  props: {
    pushclass: {
      type: String,
      default: "news",
    },
  },
  data() {
    return {
      rules: {
        title: [{ required: true, message: "请输入推送标题", trigger: "blur" }],
        // content: [
        //   { required: true, message: "请输入推送内容", trigger: "blur" },
        // ],
        url: [{ required: true, message: "请输入链接", trigger: "blur" }],
      },
      detailsData: {
        push_id: "",
        title: "",
        content: "",
        image: "",
        url: "",
        target: "1",
        target_sex: 0,
        target_os: 0,
        target_ver: "",
        send_time: "",
        article_id: 0,
        news_id: 0,
      },
      target_sex: [],
      target_os: [],
    };
  },
  created() {},
  methods: {
    setData(row) {
      this.detailsData.title = row.title;
      this.detailsData.content = row.summary;
      this.detailsData.image = row.images.length > 0 ? row.images[0] : "";
      this.detailsData.url =
        "ydzj://" +
        this.pushclass +
        "/detail?id=" +
        row[this.pushclass + "_id"];
      this.detailsData[this.pushclass + "_id"] = Number(
        row[this.pushclass + "_id"]
      );
    },
    handleCancel() {
      this.$emit("cancel");
    },
    //推送
    handlePushData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("确定要提交推送吗？", "提示").then(() => {
            this.pushDataOk(formName);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    pushDataOk(formName) {
      let isOk = true;
      let msg = "";
      if (this.detailsData.target == "2") {
        if (this.target_sex.length == 0) {
          isOk = false;
          msg = "必须至少指定一个性别";
        } else if (this.target_os.length == 0) {
          isOk = false;
          msg = "必须至少指定一个系统";
        } else {
          if (this.target_sex.length == 1) {
            this.detailsData.target_sex =
              this.target_sex[0] == "男" ? "1" : "2";
          } else {
            this.detailsData.target_sex = "0";
          }
          if (this.target_os.length == 1) {
            this.detailsData.target_os = this.target_os[0] == "iOS" ? "1" : "2";
          } else {
            this.detailsData.target_os = "0";
          }
        }
      }
      if (isOk) {
        let datas = this.detailsData;
        delete datas.push_id;
        delete datas.image;
        datas.target = Number(this.detailsData.target);
        datas.target_sex = Number(this.detailsData.target_sex);
        datas.target_os = Number(this.detailsData.target_os);
        this.api.system.SystemPushInsert(datas).then(({ data }) => {
          let res = data;
          this.$message({
            message: "" + res.msg,
            type: "success",
          });

          this.pushDialog = false;
        });
      } else {
        this.$message.error(msg);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.y-btn {
  background-color: #fff6df !important;
  border: 1px solid #ffcf4d;
  color: #000;
}
.b-btn {
  background-color: #0a0a0a !important;
  border: 1px solid #0a0a0a;
  color: #ffffff;
}
</style>