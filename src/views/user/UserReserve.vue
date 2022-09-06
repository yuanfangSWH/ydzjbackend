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
    <div class="shanxdiv">
      <el-input
        style="margin-right: 10px; width: 300px"
        placeholder="输入订单号"
        v-model="order_no"
      ></el-input>
      <el-input
        style="margin-right: 10px; width: 300px"
        placeholder="输入商家id"
        v-model="merchant_id"
      ></el-input>
      <el-input
        style="margin-right: 10px; width: 300px"
        placeholder="输入店铺id"
        v-model="shop_id"
      ></el-input>
      <el-select
        style="margin-right: 10px"
        v-model="status"
        placeholder="请选择状态"
      >
        <el-option
          v-for="item in stateData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button type="primary" @click="screening">筛选</el-button>
      <el-button type="info" @click="resetData">重置</el-button>
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
          <span>{{ scope.row.reserve_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reserve_id" label="预订id" width="100" />
      <el-table-column prop="order_no" label="订单号" width="100" />
      <el-table-column prop="merchant_id" label="商家id" width="100" />
      <el-table-column prop="shop_id" label="店铺id" width="100" />
      <el-table-column prop="shop_name" label="店铺名称" width="100" />
      <el-table-column prop="staff_id" label="员工id" width="100" />
      <el-table-column prop="staff_name" label="员工名称" width="100" />
      <el-table-column prop="sale_staff_id" label="销售id" width="100" />
      <el-table-column prop="sale_staff_name" label="销售名称" width="100" />
      <el-table-column prop="queue_id" label="排队id" width="100" />
      <el-table-column prop="bill_id" label="账单id" width="100" />
      <el-table-column prop="place_type_id" label="座位类型id" width="100" />
      <el-table-column prop="place_type_name" label="座位类型" width="100" />
      <el-table-column prop="place_id" label="座位id" width="100" />
      <el-table-column prop="place_name" label="座位名称" width="100" />
      <el-table-column prop="plan_id" label="预订方案id" width="100" />
      <el-table-column prop="cf_id" label="众筹id" width="100" />
      <el-table-column prop="ugb_id" label="套餐id" width="100" />
      <el-table-column label="预订方式" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.reserve_way == 0">线下</span>
          <span v-else-if="scope.row.reserve_way == 1">线上</span>
        </template>
      </el-table-column>
      <el-table-column label="是否生日" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.is_birthday == 0">否</span>
          <span v-else-if="scope.row.is_birthday == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="people_num" label="预订人数" width="100" />
      <el-table-column prop="name" label="联系人" width="100" />
      <el-table-column label="性别" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.gender == 1">男</span>
          <span v-else-if="scope.row.gender == 2">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" width="100" />
      <el-table-column prop="reserve_time" label="预计到达时间" width="100" />
      <el-table-column prop="remark" label="用户备注" width="100" />
      <el-table-column prop="merchant_remark" label="商家备注" width="100" />
      <el-table-column prop="total_deposit" label="总定金" width="100" />
      <el-table-column prop="total_money" label="总消费金额" width="100" />
      <el-table-column prop="total_point" label="获得积分" width="100" />
      <el-table-column prop="create_time" label="预订创建时间" width="100" />
      <el-table-column prop="BusinessTime" label="归属的营业时间" width="100" />
      <el-table-column prop="modify_time" label="预订修改时间" width="100" />
      <el-table-column prop="finish_time" label="预订完成时间" width="100" />
      <el-table-column prop="check_time" label="审核时间" width="100" />
      <el-table-column prop="pay_time" label="支付时间" width="100" />
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">待支付</span>
          <span v-else-if="scope.row.status == 2">用户取消订单</span>
          <span v-else-if="scope.row.status == 3">已支付</span>
          <span v-else-if="scope.row.status == 4">已预订</span>
          <span v-else-if="scope.row.status == 5">商家取消</span>
          <span v-else-if="scope.row.status == 6">用户申请退款中</span>
          <span v-else-if="scope.row.status == 7">用户退款失败</span>
          <span v-else-if="scope.row.status == 8">消费中</span>
          <span v-else-if="scope.row.status == 9">已结账</span>
          <span v-else-if="scope.row.status == 10">退款成功</span>
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
      order_no: "",
      //状态的值
      status: "",
      //状态的数组
      stateData: [
        {
          id: 1,
          name: "待支付",
        },
        {
          id: 2,
          name: "用户取消订单",
        },
        {
          id: 3,
          name: "已支付",
        },
        {
          id: 4,
          name: "已预订",
        },
        {
          id: 5,
          name: "商家取消",
        },
        {
          id: 6,
          name: "用户申请退款中",
        },
        {
          id: 7,
          name: "用户退款失败",
        },
        {
          id: 8,
          name: "消费中",
        },
        {
          id: 9,
          name: "已结账",
        },
        {
          id: 10,
          name: "退款成功",
        },
      ],
      merchant_id: "",
      shop_id: "",
    };
  },
  created() {
    this.user_id = Number(this.$route.query.user_id);
    this.getTableList();
  },
  methods: {
    //重置
    resetData() {
      this.status = "";
      this.order_no = "";
      this.merchant_id = "";
      this.shop_id = "";
      this.curPage = 1;
      this.getTableList();
      this.$refs.citySelect.resetData();
    },
    //筛选
    screening() {
      this.curPage = 1;
      this.getTableList();
    },
    /*, 获取表单内容 */
    getTableList() {
      var data = {
        //用户ID
        user_id: this.user_id,
        //订单号
        order_no: this.order_no,
        //商家id
        merchant_id: this.merchant_id,
        //店铺id
        shop_id: this.shop_id,
        //订单状态
        status: this.status,
        //关键字
        name: this.searchValue,
        //页码
        page: this.curPage,
        //拉取数量
        page_size: 10,
      };
      this.api.user.UserReserve(data).then((res) => {
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
    margin: 10px 0;
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
