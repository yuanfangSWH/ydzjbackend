<template>
  <div class="shopSet">
    <div class="pageTitil">{{pageTitil}}</div>
    <div class="leftCard">
      <div class="userInfo">
        <div class="nameSpan">
          <el-avatar size="small" icon="el-icon-user-solid userIcon"></el-avatar>
          <span class="username">{{evalDetailDatas.shop_name}}</span>
        </div>
        <el-rate class="rateIcon" v-model="rateValue" disabled text-color="#ff9900"></el-rate>
      </div>

      <el-card class="evaluate">
        <span class="evaluateInfo">{{evalDetailDatas.content}}</span>
      </el-card>
      <div class="evaluateImgBox">
        <el-image class="evaluateImg"></el-image>
        <el-image class="evaluateImg"></el-image>
        <el-image class="evaluateImg"></el-image>
        <el-image class="evaluateImg"></el-image>
        <el-image class="evaluateImg"></el-image>
        <el-image class="evaluateImg"></el-image>
      </div>
      <p class="font12">订单号：{{evalDetailDatas.order_no}}</p>
      <div class="orderInfo">
        <el-image class="evaluateImg"></el-image>
        <div class="itemInfo">
          <span>至尊VIP包间，2899总统套餐</span>
          <hr />
          <div class="itemName">
            <span>{{evalDetailDatas.shop_name}}</span>
            <span>￥{{evalDetailDatas.desc_score}}</span>
          </div>
        </div>
      </div>
      <hr class="replyHr" />
      <div class="shopReply" v-if="!showReplyInput">
        <p>
          <i class="iconfont iconyonghu"></i>商家回复：
        </p>
        <el-input type="textarea" v-model="replyValue" placeholder="请输入回复内容..."></el-input>
        <el-button @click="submitReply">回复</el-button>
      </div>
      <div class="shopReply" v-if="showReplyInput">
        <p class="font14">
          <span>
            <i class="iconfont iconyonghu"></i>商家已回复：
          </span>
          <span class="replyTime">{{evalDetailDatas.order_time}}</span>
        </p>
        <el-card class="evaluate">
          <span class="evaluateInfo">{{evalDetailDatas.reply_content}}</span>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商家/店铺ID
      merchants: {
        shop_id: 0,
        merchant_id: 0,
      },
      rateValue: 0,
      evalDetailId: "",
      evalDetailDatas: "",
      replyValue: "",
      replyData: "",
      visible: false,
      showReplyInput: true,
    };
  },
  created() {
    this.merchants.shop_id = Number(this.$route.query.shop_id);
    this.merchants.merchant_id = Number(this.$route.query.merchant_id);
    this.evalDetailId = this.$route.query.evalDetailId;
    this.getevaluateDetail();
  },
  computed: {
    pageTitil() {
      return this._getVuex("pageTitle");
    },
  },
  methods: {
      //评论详情
    getevaluateDetail() {
      const params = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        eval_id: this.evalDetailId,
      };
      this.$store.dispatch("shop/evaluateDetail", params).then((res) => {
        this.evalDetailDatas = res.data;
        this.rateValue = res.data.service_score;
        this.showReplyInput = res.data.reply_content;
      });
    },
    //回复方法
    submitReply() {
      const data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        eval_id: this.evalDetailId,
        reply_content: this.replyValue,
      };
      this.api.shop.evaluateReply(data).then((res) => {
        this.replyData = res.data.data;
        this.replyValue = "";
        this.getevaluateDetail();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.shopSet {
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  background: #fff;
  margin: 20px;
  padding-top: 20px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 100px;
  .pageTitil {
    width: 100%;
    height: 100px;
    font-size: 24px;
    padding-left: 20px;
  }
  .leftCard,
  .rightCard {
    width: 344px;
    background: #f8f8f8;
    padding: 10px;
    .userInfo {
      height: 28px;
      color: black;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .nameSpan {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
      }
      .username {
        padding-left: 10px;
        line-height: 28px;
        font-size: 12px;
      }
      .rateIcon {
        display: inline-block;
      }
    }
    .evaluateImgBox {
      margin-top: 15px;
      .evaluateImg {
        width: 79px;
        height: 79px;
        background: #eee;
        margin-left: 10px;
        margin-top: 5px;
      }
    }
    .orderInfo {
      width: 100%;
      height: 100px;
      background: #ffffff;
      display: flex;
      flex-flow: row nowrap;
      .evaluateImg {
        width: 80px;
        height: 80px;
        background: #eee;
        margin-left: 10px;
        margin-top: 10px;
      }
      .itemInfo {
        padding: 10px;
        width: 380px;
        hr {
          margin: 20px 0;
        }
        .itemName {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
        }
      }
    }
    .replyHr {
      margin: 30px 0;
    }
  }
  .rightCard {
    width: 480px;
  }

  .evaluate {
    margin-top: 20px;
    min-height: 100px;
  }
}
</style>
