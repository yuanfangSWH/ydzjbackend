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
      <el-table-column prop="bill_no" label="订单号" width="250" />
      <el-table-column prop="place_name" label="座位" width="150" />
      <el-table-column prop="total_amount" label="总金额" sortable="custom" width="120"></el-table-column>
      <el-table-column prop="pay_amount" label="实收金额" sortable="custom" width="150" />
      <el-table-column prop label="用户信息" width="150">
        <template slot-scope="scope">
          {{scope.row.nickname}}
          <br />
          {{scope.row.user_phone}}
        </template>
      </el-table-column>
      <el-table-column prop="start_time" label="下单时间" sortable="custom" width="180"></el-table-column>
      <el-table-column prop="sale_staff_name" label="营销" width="150" />
      <el-table-column prop="staff_name" label="操作员" width="150" />
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">删除</span>
          <span v-if="scope.row.status == 1">未完成结算</span>
          <span v-if="scope.row.status == 2">已结算</span>
          <span v-if="scope.row.status == 3">挂账</span>
          <span v-if="scope.row.status == 4">清账</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="openUpdateDialog(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "mealTable",
  props: {
    tableListData: Array,
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
    openUpdateDialog(row) {
      this.$router.push({
        path: "/billDetail",
        query: {
          bill_id: row.bill_id,
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