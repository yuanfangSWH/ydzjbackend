<template>
  <div>
    <el-table
      stripe
      :data="tableListData"
      tooltip-effect="dark"
      style="width: 100%"
      @sort-change="sortFilterFun"
    >
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column prop="order_no" label="订单号" width="250" />
      <el-table-column prop="order_type" label="类别" width="150" />
      <el-table-column prop="total_deposit" label="金额" sortable="custom" width="120">
        <template slot-scope="scope">{{scope.row.total_deposit/100}}</template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="150" />
      <el-table-column prop="phone" label="手机号" width="150" />
      <el-table-column prop="reserve_time" label="下单时间" sortable="custom" width="180"></el-table-column>
      <el-table-column prop="place_name" label="座位" width="150" />
      <el-table-column prop="place_type_name" label="座位类型" width="150" />
      <el-table-column prop="sale_staff_name" label="营销" width="150" />
      <el-table-column prop="staff_name" label="操作员" width="150" />
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">待支付</span>
          <span v-if="scope.row.status == 2">用户取消订单（未支付或超时）</span>
          <span v-if="scope.row.status == 3">已支付（待审核）</span>
          <span v-if="scope.row.status == 4">已预订（锁定，商家审核通过）</span>
          <span v-if="scope.row.status == 5">商家取消（支付了，预定没过，商家未理）</span>
          <span v-if="scope.row.status == 6">用户申请退款中</span>
          <span v-if="scope.row.status == 7">用户退款失败（商家拒绝）</span>
          <span v-if="scope.row.status == 8">消费中（开了账单）</span>
          <span v-if="scope.row.status == 9">已结账（消费已完成，可评价）</span>
          <span v-if="scope.row.status == 10">退款成功（商家同意、超时没处理）</span>
        </template>
      </el-table-column>
      <!-- 没有接口 -->
      <!-- <el-table-column fixed="right" align="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="openUpdateDialog(1,scope.row)">查看详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  name: "reserveOrder",
  props: {
    tableListData: Array,
    activeName: String,
    // 商家/店铺ID
    merchants: {
      shop_id: Number,
      merchant_id: Number,
    },
  },
  data() {
    return {
      sortVal: "",
      order: "asc",
      sortStatus: false,
    };
  },
  methods: {
    openUpdateDialog(i, row) {
      this.$router.push({
        path: "/orderDatile",
        query: {
          reserve_id: row.reserve_id,
          i: i,
          shop_id: this.merchants.shop_id,
          merchant_id: this.merchants.merchant_id,
        },
      });
    },
    //table排序
    sortMethod(val) {
      this.sortVal = val;
      this.sortStatus = !this.sortStatus;
      if (this.sortStatus) {
        this.order = "asc"; //正序
      } else {
        this.order = "desc"; //倒序
      }
      //接口逻辑
      this.$emit("reserveChildren", this.sortVal, this.order);
    },
    //table排序
    sortFilterFun(column) {
      this.sortMethod(column.prop);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>