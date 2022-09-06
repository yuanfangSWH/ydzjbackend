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
        v-model="bill_no"
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
          <span>{{ scope.row.bill_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="bill_id" label="账单id" width="100" />
      <el-table-column prop="bill_no" label="账单号" width="100" />
      <el-table-column prop="merchant_id" label="商家id" width="100" />
      <el-table-column prop="shop_id" label="店铺id" width="100" />
      <el-table-column prop="shop_name" label="店铺名称" width="100" />
      <el-table-column prop="place_id" label="预订id" width="100" />
      <el-table-column prop="place_type_id" label="座位id" width="100" />
      <el-table-column prop="place_name" label="座位名称" width="100" />
      <el-table-column prop="staff_id" label="操作员工id" width="100" />
      <el-table-column prop="staff_name" label="操作员工姓名" width="100" />
      <el-table-column prop="sale_staff_id" label="销售id" width="100" />
      <el-table-column prop="sale_staff_name" label="销售姓名" width="100" />
      <el-table-column prop="user_id" label="用户id" width="100" />
      <el-table-column
        prop="user_unionid"
        label="用户微信unionid"
        width="100"
      />
      <el-table-column prop="ugb_id" label="预订套餐id" width="100" />
      <el-table-column prop="start_time" label="开始时间" width="100" />
      <el-table-column prop="end_time" label="结束时间" width="100" />
      <el-table-column prop="duration_time" label="持续时间" width="100" />
      <el-table-column prop="create_time" label="账单创建时间" width="100" />
      <el-table-column prop="modify_time" label="账单修改时间" width="100" />
      <el-table-column prop="delete_time" label="删除时间" width="100" />
      <el-table-column
        prop="business_time"
        label="归属的营业时间"
        width="100"
      />
      <el-table-column prop="shopping_ids" label="下单id集合" width="100" />
      <el-table-column
        prop="sign_bill_staff_id"
        label="挂账签单员工id"
        width="100"
      />
      <el-table-column
        prop="sign_bill_staff_name"
        label="挂账签单员工名字"
        width="100"
      />
      <el-table-column prop="total_amount" label="账单总金额" width="100" />
      <el-table-column prop="total_point" label="获得总积分" width="100" />
      <el-table-column prop="pay_amount" label="付款总金额" width="100" />
      <el-table-column prop="refund_amount" label="退款总金额" width="100" />
      <el-table-column
        prop="coupon_amount"
        label="优惠券支付总金额"
        width="100"
      />
      <el-table-column prop="people_num" label="消费人数" width="100" />
      <el-table-column prop="coupon_id" label="优惠券ID" width="100" />
      <el-table-column prop="point_use" label="消耗积分兑换" width="100" />
      <el-table-column
        prop="point_amount"
        label="积分兑换支付总金额"
        width="100"
      />
      <el-table-column
        prop="card_amount"
        label="会员卡支付总金额"
        width="100"
      />
      <el-table-column prop="card_id" label="会员卡ID" width="100" />
      <el-table-column prop="round_amount" label="抹零金额" width="100" />
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">删除</span>
          <span v-else-if="scope.row.status == 1">未完成结算</span>
          <span v-else-if="scope.row.status == 2">已结算</span>
          <span v-else-if="scope.row.status == 3">挂账</span>
          <span v-else-if="scope.row.status == 4">清账</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="140" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="batchDelete(scope.row)"
            >点单记录</el-button
          >
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
    <!-- 弹框 -->
    <el-dialog
      :title="
        '当前为第' +
        singleKey +
        '条数据 | 该用户点单记录共：' +
        singleLength +
        ' 条数据'
      "
      :visible.sync="diantk"
      width="50%"
    >
      <div>
        <el-form
          :v-model="singleData"
          label-width="300px"
          class="demo-ruleForm"
        >
          <el-form-item label="点单id">
            {{ singleData.shopping_id }}
          </el-form-item>
          <el-form-item label="商家ID">
            {{ singleData.merchant_id }}
          </el-form-item>
          <el-form-item label="店铺ID">
            {{ singleData.shop_id }}
          </el-form-item>
          <el-form-item label="店铺名称">
            {{ singleData.shop_name }}
          </el-form-item>
          <el-form-item label="支付订单号">
            {{ singleData.order_no }}
          </el-form-item>
          <el-form-item label="账单ID">
            {{ singleData.bill_id }}
          </el-form-item>
          <el-form-item label="账单号">
            {{ singleData.bill_no }}
          </el-form-item>
          <el-form-item label="操作员工ID">
            {{ singleData.staff_id }}
          </el-form-item>
          <el-form-item label="操作员工姓名">
            {{ singleData.staff_name }}
          </el-form-item>
          <el-form-item label="销售员工ID">
            {{ singleData.sale_staff_id }}
          </el-form-item>
          <el-form-item label="销售员工名字">
            {{ singleData.sale_staff_name }}
          </el-form-item>
          <el-form-item label="预订订单ID">
            {{ singleData.reserve_id }}
          </el-form-item>
          <el-form-item label="位置ID">
            {{ singleData.place_id }}
          </el-form-item>
          <el-form-item label="位置名称">
            {{ singleData.place_name }}
          </el-form-item>
          <el-form-item label="位置类型ID">
            {{ singleData.place_type_id }}
          </el-form-item>
          <el-form-item label="位置类型名称">
            {{ singleData.place_type_name }}
          </el-form-item>
          <el-form-item label="支付金额">
            {{ singleData.total_amount }}
          </el-form-item>
          <el-form-item label="获得积分">
            {{ singleData.total_point }}
          </el-form-item>
          <el-form-item label="发起支付时间">
            {{ singleData.create_time }}
          </el-form-item>
          <el-form-item label="支付时间">
            {{ singleData.pay_time }}
          </el-form-item>
          <el-form-item label="完成时间">
            {{ singleData.finish_time }}
          </el-form-item>
          <el-form-item label="归属的营业时间">
            {{ singleData.business_time }}
          </el-form-item>
          <el-form-item label="备注">
            {{ singleData.remark }}
          </el-form-item>
          <el-form-item label="支付方式">
            <span v-if="singleData.pay_type == 1">支付宝</span>
            <span v-else-if="singleData.pay_type == 2">微信</span>
            <span v-else-if="singleData.pay_type == 3">银行卡</span>
            <span v-else-if="singleData.pay_type == 4">信用卡</span>
            <span v-else-if="singleData.pay_type == 5">现金</span>
            <span v-else-if="singleData.pay_type == 6">App用户余额</span>
            <span v-else-if="singleData.pay_type == 7">商家签单</span>
            <span v-else-if="singleData.pay_type == 8">先消费后结算</span>
          </el-form-item>
          <el-form-item label="状态">
            <span v-if="singleData.status == 1">待付款</span>
            <span v-else-if="singleData.status == 2"
              >用户取消订单（未支付或超时）</span
            >
            <span v-else-if="singleData.status == 3"
              >厨房已接单（准备中，厨房）</span
            >
            <span v-else-if="singleData.status == 4"
              >已完成（东西已上，维权中，已退款）</span
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="pagination">
        <el-pagination
          :current-page="singleKey"
          :hide-on-single-page="true"
          @current-change="singPage"
          :page-size="Number(1)"
          background
          layout="prev, pager, next"
          :total="singleLength"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserBill",
  data() {
    return {
      //点单数据
      singleData: "",
      singleValue: "",
      singleKey: 1,
      singleLength: 0,
      singleNunm: "下一页",
      //用户ID
      user_id: "",
      //页码
      curPage: 1,
      //数据总数
      total: 1,
      //是否全选
      allQL: false,
      diantk: false,
      tableListData: [], //列表内容
      multipleSelection: [], //批量选中ID
      searchValue: "", //搜索的值
      bill_no: "",
      //状态的值
      status: "",
      //状态的数组
      stateData: [
        {
          id: 0,
          name: "删除",
        },
        {
          id: 1,
          name: "未完成结算",
        },
        {
          id: 2,
          name: "已结算",
        },
        {
          id: 3,
          name: "挂账",
        },
        {
          id: 4,
          name: "清账",
        },
      ],
    };
  },
  created() {
    this.user_id = Number(this.$route.query.user_id);
    this.getTableList();
  },
  methods: {
    // 打开弹框
    batchDelete(row) {
      this.singleKey = 1;
      this.singleValue = row.shopping;
      this.singleData = row.shopping[0];
      this.singleLength = row.shopping.length;
      this.diantk = true;
    },
    //弹框分页
    singPage(page) {
      this.singleKey = page;
      this.singleData = this.singleValue[page - 1];
    },
    //重置
    resetData() {
      this.status = "";
      this.bill_no = "";
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
        bill_no: this.bill_no,
        //订单状态
        status: this.status,
        //关键字
        name: this.searchValue,
        //页码
        page: this.curPage,
        //拉取数量
        page_size: 10,
      };
      this.api.user.UserBill(data).then((res) => {
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
