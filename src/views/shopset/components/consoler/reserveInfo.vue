<template>
  <div class="box">
    <div class="f-title">
      <i class="filter-i el-icon-document-copy"></i>预定信息(点击座位开箱)
    </div>
    <div class="filterBox">
      <div class="navBox">
        <div>包厢类型：{{ kReserveData.reserve.place_type_name }}</div>
        <!-- <div>预定类型：{{kReserveData.reserve.order_type}}</div> -->
        <div>
          预定类型：<span v-if="kReserveData.reserve.rerver_way == 0">线上</span><span v-if="kReserveData.reserve.rerver_way == 1">线下</span><span v-if="kReserveData.reserve.rerver_way == 2">线上客服</span>
        </div>
        <div>
          预定状态：
          <span v-if="kReserveData.reserve.status == 1">待支付</span>
          <span v-if="kReserveData.reserve.status == 2">用户取消订单</span>
          <span v-if="kReserveData.reserve.status == 3">已支付</span>
          <span v-if="kReserveData.reserve.status == 4">已预订</span>
          <span v-if="kReserveData.reserve.status == 5">商家取消</span>
          <span v-if="kReserveData.reserve.status == 6">退款中</span>
          <span v-if="kReserveData.reserve.status == 7">消费中</span>
          <span v-if="kReserveData.reserve.status == 8">已结账</span>
          <span v-if="kReserveData.reserve.status == 9">退款成功</span>
        </div>
        <div>预定时间：{{ kReserveData.reserve.reserve_time }}</div>
        <!-- <div>预定套餐：中包</div> -->
      </div>
      <div class="navBox">
        <div>预订人：{{ kReserveData.reserve.staff_name }}</div>
        <div>客人姓名：{{ kReserveData.reserve.name }}</div>
        <div>联系电话：{{ kReserveData.reserve.phone }}</div>
        <div>客人数：{{ kReserveData.reserve.people_num }}</div>
      </div>
      <div class="navBox">
        <div>排队号码：</div>
        <div>
          是否过生日：
          <span v-if="kReserveData.reserve.is_birthday == 0">否</span>
          <span v-else>是</span>
        </div>
        <div>登记时间：{{ kReserveData.reserve.create_time }}</div>
        <div>备注：{{ kReserveData.reserve.merchant_remark }}</div>
      </div>
      <!-- <div class="navBox">
                <div>撤订人：</div>
                <div>撤订时间：</div>
                <div>撤订原因：</div>
            </div> -->
      <div class="navBox">
        <el-button type="info"
                   @click="goBack">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    kReserveData: Object,
  },
  data () {
    return {};
  },
  created () { },
  methods: {
    goBack () {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.box >>> .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #ffffff;
}
.filter-i {
  color: #ffbe11;
  margin: 0 5px;
}
.f-title {
  font-size: 16px;
  color: #ffbe11;
  padding: 10px 10px 0;
}
.filterBox {
  display: flex;
  align-items: center;
  padding: 20px 0 10px;
}
.navBox {
  margin-left: 40px;
  line-height: 24px;
}
</style>