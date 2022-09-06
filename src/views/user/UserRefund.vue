<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <el-input
        class="searchInput"
        placeholder="请输入要搜索的内容"
        prefix-icon="el-icon-search"
        v-model="searchValue"
        @change="searchDatas"
      ></el-input>
    </div>

    <el-table
      ref="multipNum"
      stripe
      :data="tableListData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selectItem"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="全选/ID" width="70">
        <template slot-scope="scope">
          <span>{{ scope.row.refund_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="refund_id" label="退款id" width="70" />
      <el-table-column prop="refund_order_no" label="退款订单号" width="200" />
      <el-table-column label="退款方式" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.refund_type == 1">支付宝</span>
          <span v-else-if="scope.row.refund_type == 2">微信</span>
        </template>
      </el-table-column>
      <el-table-column label="退款场景" width="100">
        <template slot-scope="scope">
          <span v-if="scope.refund_scene == 1">预订</span>
          <span v-else-if="scope.refund_scene == 2">点单</span>
          <span v-else-if="scope.refund_scene == 3">充值</span>
          <span v-else-if="scope.refund_scene == 4">团购套餐</span>
          <span v-else-if="scope.refund_scene == 5">排队</span>
          <span v-else-if="scope.refund_scene == 6">众筹</span>
          <span v-else-if="scope.refund_scene == 7">礼物</span>
          <span v-else-if="scope.refund_scene == 8">商家会员卡充值</span>
          <span v-else-if="scope.refund_scene == 9">账单</span>
        </template>
      </el-table-column>
      <el-table-column prop="order_no" label="支付订单号" width="200" />
      <el-table-column prop="merchant_id" label="商家ID" width="70" />
      <el-table-column prop="shop_id" label="店铺ID" width="70" />
      <el-table-column prop="info_id" label="业务ID" width="70" />
      <el-table-column prop="info_name" label="业务名" width="220" />
      <el-table-column prop="user_id" label="用户ID" width="70" />
      <el-table-column prop="amount" label="退款金额" width="100" />
      <el-table-column prop="reason" label="退款原因" width="300" />
      <el-table-column prop="create_time" label="发布时间" width="150" />
      <el-table-column prop="modify_time" label="修改时间" width="150" />
      <el-table-column prop="check_time" label="审核时间" width="150" />
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.status == 0">删除</span>
          <span v-else-if="scope.status == 1">待商家审核</span>
          <span v-else-if="scope.status == 2">商家同意</span>
          <span v-else-if="scope.status == 3">商家拒绝</span>
          <span v-else-if="scope.status == 4">退款成功</span>
          <span v-else-if="scope.status == 5">退款失败</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="curPage"
        :hide-on-single-page="true"
        @current-change="pageChange"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserBill",
  data() {
    return {
      //用户ID
      user_id: "",
      //页码
      curPage: 1,
      //数据总数
      total: 1,
      //是否全选
      allQL: false,
      tableListData: [], //列表内容
      multipleSelection: [], //批量选中ID
      searchValue: "", //搜索的值
    };
  },
  created() {
    this.user_id = Number(this.$route.query.user_id);
    this.getTableList();
  },
  methods: {
    /*, 获取表单内容 */
    getTableList() {
      var data = {
        //用户ID
        user_id: this.user_id,
        //关键字
        name: this.searchValue,
        //页码
        page: this.curPage,
        //拉取数量
        page_size: 10,
      };
      this.api.user.UserRefund(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },

    /* 搜索 */
    searchDatas() {
      this.curPage = 1;
      this.getTableList();
    },
    /* 选择表的行 */
    selectItem(val) {
      //批量选中ID
      this.multipleSelection = [];
      val.forEach((item) => {
        this.multipleSelection.push(item.user_id);
        this.nameArr.push(item.nickname);
      });
    },
    /* 改变页数 */
    pageChange(page) {
      this.curPage = page;
      this.getTableList();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table {
  overflow: auto;
}
.zjiang {
  font-size: 24px;
  line-height: 36px;
  color: darkgrey;
  padding-left: 4px;
  padding-right: 4px;
}
.xialdiv {
  padding-top: 30px;
  padding-bottom: 50px;
}
.gz-lieb {
  display: flex;
}
.shanxdiv {
  margin-bottom: 10px;
  display: flex;
}
.shopSet {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 15px 15px;
  padding: 15px 15px;
  .pageTitle {
    margin: 10px 0 20px 0;
    font-size: 24px;
    color: #0a0a0a;
  }
  .add-box {
    height: 50px;
    margin: 10px 0;
    margin-bottom: 10px;
  }
  .ewmsou {
    float: left;
    width: 300px;
    margin-right: 10px;
  }
  .pagination {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
  }
  .searchInput {
    float: right;
    width: 350px;
  }
  .el-form-item {
    width: 50% !important;
    .el-input {
      min-width: 400px !important;
      width: 50% !important;
    }
    .el-textarea {
      min-width: 200px !important;
      width: 280px !important;
    }
    .el-form-item__label {
      width: 120px !important;
    }
    .el-form-item__content {
      margin-left: 120px !important;
    }
    .el-select,
    .el-textarea,
    .el-cascader,
    .el-date-editor--timerange.el-input__inner {
      min-width: 200px !important;
      width: 50% !important;
    }
  }
}
</style>
