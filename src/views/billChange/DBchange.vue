<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <span class="t-s01">用户：</span
      ><el-input
        style="width: 350px; margin-right: 10px"
        placeholder="搜索用户ID或昵称或手机"
        v-model="user"
        clearable
      ></el-input>
      <span class="t-s01 t-s02">时间：</span>
      <el-date-picker
        v-model="start_time"
        type="datetime"
        placeholder="充值开始时间"
        value-format="yyyy-MM-dd HH:mm"
        format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
      <div class="rucwz">-</div>
      <el-date-picker
        style="margin-right: 10px"
        v-model="end_time"
        type="datetime"
        placeholder="充值结束时间"
        value-format="yyyy-MM-dd HH:mm"
        format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
    </div>
    <div class="shanxdiv">
      <span class="t-s01">订单号：</span>
      <el-input
        style="width: 350px; margin-right: 10px"
        placeholder="搜索订单号"
        v-model="cash_order_no"
        clearable
      ></el-input>
      <span class="t-s01 t-s02">状态：</span
      ><el-select
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
      <el-button class="sosuo" type="primary" @click="screening"
        >筛选</el-button
      >
      <el-button class="sosuo" type="info" @click="resetData"
        >清空条件</el-button
      >
    </div>
    <el-table
      ref="multipNum"
      stripe
      :data="tableListData"
      tooltip-effect="dark"
      style="width: 100%"
      @sort-change="screeningData"
    >
      <el-table-column sortable="custom" prop="log_id" label="ID" width="200" />

      <el-table-column
        sortable="custom"
        prop="create_time"
        label="时间"
        width="200"
      />
      <el-table-column sortable="custom" prop="type" label="类型" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">收入</span>
          <span v-else-if="scope.row.type == 2">提现</span>
          <span v-else-if="scope.row.type == 3"
            ><el-image class="liwtbcss" :src="scope.row.gift.image"></el-image
            >X{{ scope.row.gift_num }}</span
          >
          <span v-else-if="scope.row.type == 4">扣除</span>
          <span v-else-if="scope.row.type == 5">拉新奖励</span>
          <span v-else-if="scope.row.type == 6">活动</span>
          <span v-else-if="scope.row.type == 7">冻结</span>
          <span v-else-if="scope.row.type == 8">冻结扣除</span>
          <span v-else-if="scope.row.type == 9">冻结退回</span>
        </template>
      </el-table-column>
      <el-table-column prop="income" label="酒力" width="300">
        <template slot-scope="scope">
          <span
            v-if="String(scope.row.income).indexOf('+') != -1"
            style="color: #89c37b"
            >{{ scope.row.income }}</span
          >
          <span
            v-else-if="String(scope.row.income).indexOf('-') != -1"
            style="color: #ffbe11"
            >{{ scope.row.income }}</span
          >
          <span v-else style="color: #f00">{{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="pay_currency" label="酒力" width="300">
        <template slot-scope="scope">
          <div
            style="color: #e47b76"
            v-if="scope.row.income_before < scope.row.income_after"
          >
            +{{ scope.row.income_after - scope.row.income_before }}
          </div>
          <div
            style="color: #89c37b"
            v-else-if="scope.row.income_before > scope.row.income_after"
          >
            -{{ scope.row.income_before - scope.row.income_after }}
          </div>
          <div style="color: #4e9df8" v-else>0</div>
        </template>
      </el-table-column> -->
      <el-table-column label="赠送者" width="300">
        <template slot-scope="scope">
          <div class="duio muzhicss" @click="userInformation(scope.row)">
            <el-image
              class="ustrimg"
              :src="scope.row.user.avatar"
              fit="cover"
            ></el-image>
            <div>
              <div class="bjgt">{{ scope.row.user.nickname }}</div>
              <div class="bjgt">ID:{{ scope.row.user.user_id }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="income_after" label="酒力余额" width="200" />
      <el-table-column prop="status" label="来源" width="300">
        <template slot-scope="scope">
          <div
            class="muzhicss"
            v-if="scope.row.type == 3"
            style="color: #4e9df8"
            @click="tiaozhuju(scope.row)"
          >
            组局（ID：{{ scope.row.gp_id }}）
          </div>
          <div v-else>系统（订单：{{ scope.row.cash_order_no }}）</div>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="描述" width="300" />
      <el-table-column prop="status" label="状态" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">待结算</span>
          <span v-else-if="scope.row.status == 2">已结算</span>
          <span v-else-if="scope.row.status == 3">失效</span>
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
    <div class="qinsrcss" v-show="tableListData == ''">请输入搜索条件</div>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息" :visible.sync="usertx" width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "GiftDetailed",
  data() {
    return {
      usertx: false,
      //页码
      curPage: 1,
      //总数
      total: 1,
      tableListData: [], //页面表单的内容
      //用户ID搜索
      user: "",
      start_time: "",
      end_time: "",
      //排序
      sort: "",
      order: "",
      cash_order_no: "",
      status: "",
      statusData: [
        {
          id: 1,
          name: "待结算",
        },
        {
          id: 2,
          name: "已结算",
        },
        {
          id: 3,
          name: "失效",
        },
      ],
    };
  },
  created() {
    //判断是否存储有筛选条件
    var data = this.$store.state.screeningData.DBchange;
    if (data) {
      if (data.Yuanfang) {
        this.cash_order_no = data.cash_order_no;
        this.start_time = data.start_time;
        this.end_time = data.end_time;
        this.user = data.user;
        this.status = data.status;
        this.curPage = data.curPage;
        //初始化VUEX筛选存储
        var value = this.$store.state.screeningData;
        var groupData = {
          DBchange: { Yuanfang: false },
        };
        Object.assign(value, groupData);
        this.$store.dispatch("updateVuex", {
          key: "screeningData",
          value: value,
        });
        this.getTableList();
      }
    }
  },
  beforeDestroy() {
    if (this.usertx) {
      this.ConditionsF();
    }
  },
  methods: {
    //去组局详情
    tiaozhuju(row) {
      this.ConditionsF();
      this.$router.push({
        path: "/GroupEetail",
        query: {
          gp_id: row.gp_id,
        },
      });
    },
    ConditionsF() {
      var data = this.$store.state.screeningData;
      var groupData = {
        DBchange: {
          cash_order_no: this.cash_order_no,
          start_time: this.start_time,
          end_time: this.end_time,
          user: this.user,
          status: this.status,
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
    screeningData(column) {
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
    userInformation(row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user.user_id);
      }, 0);
    },
    //重置
    resetData() {
      this.user = "";
      this.cash_order_no = "";
      this.status = "";
      this.start_time = "";
      this.end_time = "";
      this.curPage = 1;
      this.getTableList();
    },
    //筛选
    screening() {
      this.curPage = 1;
      this.getTableList();
    },
    /* 获取列表内容 */
    getTableList() {
      var data = {
        sort: this.sort,
        order: this.order,
        user: this.user,
        cash_order_no: this.cash_order_no,
        status: this.status,
        start_time: this.start_time,
        end_time: this.end_time,
        page: this.curPage,
      };
      this.api.billChange.DincomeDetail(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
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
.liwtbcss {
  width: 26px;
  height: 26px;
}
.qinsrcss {
  text-align: center;
  font-size: 24px;
  padding-top: 50px;
  padding-bottom: 50px;
  color: rgb(175, 172, 172);
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
