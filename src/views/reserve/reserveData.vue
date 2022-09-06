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
        class="ewmsou"
        style="width: 200px"
        placeholder="请输入商家ID"
        v-model="merchant_id"
      ></el-input>
      <el-input
        class="ewmsou"
        style="width: 200px"
        placeholder="请输入店铺ID"
        v-model="shop_id"
      ></el-input>
      <el-input
        class="ewmsou"
        placeholder="请输入手机号"
        v-model="phone"
      ></el-input>
      <el-date-picker
        class="datePicker"
        style="margin-right: 10px"
        v-model="SJvalue"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        value-format="yyyy-MM-dd HH:mm"
        format="yyyy-MM-dd HH:mm"
        @change="dateChange"
      ></el-date-picker>
      <el-select
        style="margin-right: 10px"
        v-model="status"
        placeholder="选择状态"
      >
        <el-option
          v-for="item in statusData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-select
        style="margin-right: 10px"
        v-model="order"
        placeholder="选择排序"
      >
        <el-option
          v-for="(item, key) in orderData"
          :key="key"
          :label="item.name"
          :value="item.value"
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
    >
      <el-table-column prop="reserve_id" label="预订ID" width="150" />
      <el-table-column prop="order_no" label="订单号" width="200" />
      <el-table-column prop="gender" label="性别" width="150"
        >1
        <template slot-scope="scope">
          <span v-if="scope.row.gender == 0">女</span>
          <span v-else-if="scope.row.gender == 1">男</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column prop="order_type" label="类别" width="150" />
      <el-table-column prop="phone" label="手机号" width="150" />
      <el-table-column prop="place_name" label="座位名称" width="350" />
      <el-table-column prop="status" label="状态" width="150">
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
          <span v-else-if="scope.row.status == 11">商家同意退款</span>
        </template>
      </el-table-column>
      <el-table-column prop="sale_staff_name" label="销售员工" width="150" />
      <el-table-column prop="staff_name" label="操作员工" width="150" />
      <el-table-column prop="total_deposit" label="订金" width="150" />
      <el-table-column fixed="right" align="center" label="操作" width="200">
        <template slot-scope="scope">
          <div style="margin-bottom: 10px" v-if="scope.row.status == 3">
            <el-button size="mini" @click="reservationDialog1(scope.row)"
              >确认预订</el-button
            >
          </div>
          <div>
            <el-button size="mini" @click="reservationDialog2(scope.row)"
              >取消预订</el-button
            >
          </div>
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

    <el-dialog
      :title="'订单号' + YuDinData.order_no"
      :visible.sync="reservationtk1"
      width="30%"
    >
      <span>确认预定吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reservationtk1 = false">取 消</el-button>
        <el-button type="primary" @click="changeData1()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="'订单号' + YuDinData.order_no"
      :visible.sync="reservationtk2"
      width="30%"
    >
      <span>取消预定吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reservationtk2 = false">取 消</el-button>
        <el-button type="primary" @click="changeData2()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "reserveData",
  data() {
    return {
      merchant_id: "",
      shop_id: "",
      phone: "",
      //排序
      order: "",
      orderData: [
        {
          value: "ASC",
          name: "正序",
        },
        {
          value: "DESC",
          name: "倒序",
        },
      ],
      //状态的值
      status: "",
      //状态的数组
      statusData: [
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
        {
          id: 11,
          name: "商家同意退款",
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      //开始时间
      start_time: "",
      //结束时间
      end_time: "",
      //页码
      curPage: 1,
      //数据总数
      total: 1,
      reservationtk1: false,
      reservationtk2: false,
      //弹框数据
      YuDinData: [],
      searchValue: "", //搜索的值
      SJvalue: "",
      tableListData: [],
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //日期选择
    dateChange(val) {
      if (val) {
        this.start_time = val[0];
        this.end_time = val[1];
      }
    },
    //重置
    resetData() {
      this.SJvalue = "";
      this.start_time = "";
      this.end_time = "";
      this.merchant_id = "";
      this.shop_id = "";
      this.phone = "";
      this.order = "";
      this.status = "";
      this.curPage = 1;
      this.getTableList();
    },
    //筛选
    screening() {
      this.curPage = 1;
      this.getTableList();
    },
    /*, 获取表单内容 */
    getTableList() {
      var data = {
        start_time: this.start_time,
        end_time: this.end_time,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
        phone: this.phone,
        order: this.order,
        status: this.status,
        //关键字
        name: this.searchValue,
        //页码
        page: this.curPage,
      };
      this.api.reserve.getReserveList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 搜索 */
    searchDatas() {
      this.curPage = 1;
      this.getTableList();
    },
    /* 打开确认窗口 */
    reservationDialog1(row) {
      this.reservationtk1 = true;
      this.YuDinData = row;
    },
    /* 打开取消窗口 */
    reservationDialog2(row) {
      this.reservationtk2 = true;
      this.YuDinData = row;
    },
    //确认
    changeData1() {
      var data = {
        reserve_id: this.YuDinData.reserve_id,
      };
      this.api.reserve.confirmReserve(data).then((res) => {
        this.getTableList();
        this.reservationtk1 = false;
      });
    },
    //取消
    changeData2() {
      var data = {
        reserve_id: this.YuDinData.reserve_id,
      };
      this.api.reserve.cancelReserver(data).then((res) => {
        this.getTableList();
        this.reservationtk2 = false;
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
