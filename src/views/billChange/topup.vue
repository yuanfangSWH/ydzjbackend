<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <span class="t-s01">用户：</span>
      <el-input style="width: 350px; margin-right: 10px"
                placeholder="搜索用户ID或昵称或手机"
                v-model="user"
                clearable></el-input>
      <span class="t-s01 t-s02">充值时间：</span>
      <el-date-picker v-model="create_time_start"
                      type="datetime"
                      placeholder="充值开始时间"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm">
      </el-date-picker>
      <div class="rucwz">-</div>
      <el-date-picker style="margin-right: 10px"
                      v-model="create_time_end"
                      type="datetime"
                      placeholder="充值结束时间"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm">
      </el-date-picker>
    </div>
    <div class="shanxdiv">
      <span class="t-s01">订单号：</span>
      <el-input style="width: 350px; margin-right: 10px"
                placeholder="搜索订单号"
                v-model="order_no"
                clearable></el-input>
      <span class="t-s01 t-s02">状态：</span>
      <el-select style="margin-right: 10px"
                 v-model="status"
                 placeholder="选择状态">
        <el-option v-for="item in statusData"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
      <span class="t-s01 t-s02">渠道：</span>
      <el-select style="margin-right: 10px"
                 v-model="channel"
                 placeholder="选择渠道">
        <el-option v-for="item in channelData"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
      <span class="t-s01 t-s02">平台：</span>
      <el-select style="margin-right: 10px"
                 v-model="platfrom"
                 placeholder="选择平台">
        <el-option label="IOS"
                   :value="1"></el-option>
        <el-option label="安卓"
                   :value="2"></el-option>
      </el-select>
      <el-button class="sosuo"
                 type="primary"
                 @click="screening">筛选</el-button>
      <el-button class="sosuo"
                 type="info"
                 @click="resetData">清空条件</el-button>
    </div>
    <el-table ref="multipNum"
              stripe
              :data="tableListData"
              tooltip-effect="dark"
              style="width: 100%"
              @sort-change="screeningData">
      <el-table-column prop="recharge_id"
                       label="ID"
                       width="200" />

      <el-table-column sortable="custom"
                       prop="create_time"
                       label="订单时间"
                       width="200" />
      <el-table-column sortable="custom"
                       prop="pay_time"
                       label="到账时间"
                       width="200" />
      <el-table-column prop="order_no"
                       label="订单号"
                       width="300" />
      <el-table-column label="用户"
                       width="300">
        <template slot-scope="scope">
          <div class="duio muzhicss"
               @click="userInformation(scope.row)">
            <el-image class="ustrimg"
                      :src="scope.row.user.avatar"
                      fit="cover"></el-image>
            <div>
              <div class="bjgt">
                {{ scope.row.user.nickname }}（<span v-if="scope.row.user.gender == 1">男</span><span v-else>女</span>/{{ scope.row.user.age }}岁）
              </div>
              <div class="bjgt">ID:{{ scope.row.user.user_id }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="pay_log.pay_source"
                       label="平台"
                       width="200" />
      <el-table-column label="渠道"
                       width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.pay_log.pay_type == 0">未选方式</span>
          <span v-else-if="scope.row.pay_log.pay_type == 1">支付宝</span>
          <span v-else-if="scope.row.pay_log.pay_type == 2">微信</span>
          <span v-else-if="scope.row.pay_log.pay_type == 3">银行卡</span>
          <span v-else-if="scope.row.pay_log.pay_type == 4">信用卡</span>
          <span v-else-if="scope.row.pay_log.pay_type == 5">现金</span>
          <span v-else-if="scope.row.pay_log.pay_type == 6">App用户余额</span>
          <span v-else-if="scope.row.pay_log.pay_type == 7">商家签单</span>
          <span v-else-if="scope.row.pay_log.pay_type == 8">先消费后结算</span>
          <span v-else-if="scope.row.pay_log.pay_type == 9">苹果支付</span>
        </template>
      </el-table-column>
      <el-table-column prop="total_currency"
                       label="充值(Y币)"
                       width="200">
        <template slot-scope="scope">
          <div style="color: #d7a138">+{{ scope.row.total_currency }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="user_currency"
                       label="充值后余额(Y币)"
                       width="200">
        <template slot-scope="scope">
          {{ scope.row.user_currency == 0 ? "-" : scope.row.user_currency }}
        </template>
      </el-table-column>
      <el-table-column prop="status"
                       label="状态"
                       width="200" />
    </el-table>
    <div class="pagination">
      <el-pagination :current-page="curPage"
                     :hide-on-single-page="true"
                     @current-change="pageChange"
                     :page-size.sync="page_size"
                     @size-change="handlePageSizeChange"
                     :page-sizes="[10, 20, 50, 100]"
                     background
                     layout="sizes,prev, pager, next,jumper"
                     :total="total"></el-pagination>
    </div>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息"
               :visible.sync="usertx"
               width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
import changeTime from "../../utils/getdate"; //获取当前时间
export default {
  name: "GiftDetailed",
  data () {
    return {
      usertx: false,
      //页码
      curPage: 1,
      page_size: 10,
      //总数
      total: 1,
      tableListData: [], //页面表单的内容
      //用户ID搜索
      user: "",
      create_time_start: "",
      create_time_end: "",
      //排序
      sort: "",
      order: "",
      order_no: "",
      status: "",
      statusData: [
        {
          id: 0,
          name: "待付款",
        },
        {
          id: 1,
          name: "已付款",
        },
        {
          id: 2,
          name: "已完成",
        },
        {
          id: 3,
          name: "用户取消",
        },
        {
          id: 4,
          name: "商家已取消",
        },
        {
          id: 5,
          name: "支付超时关闭",
        },
        {
          id: 6,
          name: "数据异常",
        },
        {
          id: 7,
          name: "退款中",
        },
        {
          id: 8,
          name: "已退款",
        },
        {
          id: 9,
          name: "退款拒绝",
        },
      ],
      channel: "",
      channelData: [
        {
          id: 0,
          name: "未选方式",
        },
        {
          id: 1,
          name: "支付宝",
        },
        {
          id: 2,
          name: "微信",
        },
        {
          id: 3,
          name: "银行卡",
        },
        {
          id: 4,
          name: "信用卡",
        },
        {
          id: 9,
          name: "苹果支付",
        },
      ],
      platfrom: "",
    };
  },
  created () {
    //判断是否存储有筛选条件
    var data = this.$store.state.screeningData.topup;
    if (data) {
      if (data.Yuanfang) {
        this.user = data.user;
        this.order_no = data.order_no;
        this.status = data.status;
        this.channel = data.channel;
        this.platfrom = data.platfrom;
        this.create_time_start = data.create_time_start;
        this.create_time_end = data.create_time_end;
        this.curPage = data.curPage;
        //初始化VUEX筛选存储
        var value = this.$store.state.screeningData;
        var groupData = {
          topup: { Yuanfang: false },
        };
        Object.assign(value, groupData);
        this.$store.dispatch("updateVuex", {
          key: "screeningData",
          value: value,
        });
      }
    }
    if (this.$route.query.formHome) {
      this.create_time_start = changeTime() + " 00:00";
      this.create_time_end = changeTime() + " 23:59";
      this.status = 1;
    }
    this.getTableList();
  },
  beforeDestroy () {
    if (this.usertx) {
      this.ConditionsF();
    }
  },
  methods: {
    ConditionsF () {
      var data = this.$store.state.screeningData;
      var groupData = {
        topup: {
          user: this.user,
          order_no: this.order_no,
          status: this.status,
          channel: this.channel,
          platfrom: this.platfrom,
          create_time_start: this.create_time_start,
          create_time_end: this.create_time_end,
          curPage: this.curPage,
          Yuanfang: true,
        },
      };
      Object.assign(data, groupData);
      //将筛选条件存储到VUEX
      this.$store.dispatch("updateVuex", {
        key: "screeningData",
        value: data,
      });
    },
    //TAB筛选
    screeningData (column) {
      if (column.order) {
        this.sort = column.prop;
        this.order = column.order == "ascending" ? "ASC" : "DESC";
      } else {
        this.sort = "";
        this.order = "";
      }
      this.getTableList();
    },
    //用户详情弹框
    userInformation (row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user.user_id);
      }, 0);
    },
    //重置
    resetData () {
      this.user = "";
      this.order_no = "";
      this.status = "";
      this.channel = "";
      this.platfrom = "";
      this.create_time_start = "";
      this.create_time_end = "";
      this.curPage = 1;
      this.getTableList();
    },
    //筛选
    screening () {
      this.curPage = 1;
      this.getTableList();
    },
    /* 获取列表内容 */
    getTableList () {
      var data = {
        sort: this.sort,
        order: this.order,
        user: this.user,
        order_no: this.order_no,
        status: this.status,
        channel: this.channel,
        platfrom: this.platfrom,
        create_time_start: this.create_time_start,
        create_time_end: this.create_time_end,
        page: this.curPage,
        page_size: this.page_size,
      };
      this.api.billChange.rechargeList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 改变页数 */
    pageChange (page) {
      this.curPage = page;
      this.getTableList();
    },
    handlePageSizeChange (v) {
      this.pageChange();
    },
  },
};
</script>

<style lang="scss" scoped>
.sosuo {
  margin-left: 10px;
  float: left;
  background-color: #f4f4f4 !important;
  border: 1px solid #cecece;
  color: #0a0a0a;
  width: 90px;
}
.t-s01 {
  line-height: 34px;
  font-size: 15px;
}
.t-s02 {
  margin-left: 20px;
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
