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
      <span class="t-s01">订单号：</span
      ><el-input
        style="width: 350px; margin-right: 10px"
        placeholder="搜索订单号"
        v-model="order_no"
        clearable
      ></el-input>
      <el-button class="sosuo" type="primary" @click="screening"
        >筛选</el-button
      >
      <el-button class="sosuo" type="info" @click="resetData"
        >清空条件</el-button
      >
    </div>
    <div class="shanxdiv">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="充值" name="chonzhi"></el-tab-pane>
        <el-tab-pane label="兑换消费" name="yuehuang"></el-tab-pane>
      </el-tabs>
    </div>
    <el-table
      v-show="status == 1"
      ref="multipNum"
      stripe
      :data="tableListData"
      tooltip-effect="dark"
      style="width: 100%"
      @sort-change="screeningData"
    >
      <el-table-column prop="log_id" label="ID" />

      <el-table-column sortable="custom" prop="create_time" label="时间" />
      <el-table-column label="用户">
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
      <el-table-column prop="order_no" label="订单号" />
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">充值</span>
          <span v-else-if="scope.row.status == 2">
            <div>购买礼物</div>
            <div>
              <el-image
                style="width: 20px; height: 20px"
                :src="scope.row.gift.image"
              ></el-image
              >X{{ scope.row.gift_num }}
            </div>
          </span>
          <span v-else-if="scope.row.status == 3">打赏</span>
          <span v-else-if="scope.row.status == 4">获赏</span>
        </template>
      </el-table-column>
      <el-table-column prop="currency" label="Y币">
        <template slot-scope="scope">
          <div
            style="color: #89c37b"
            v-if="String(scope.row.currency).indexOf('-') != -1"
          >
            {{ scope.row.currency }}
          </div>
          <div style="color: #e47b76" v-else>+{{ scope.row.currency }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="currency_after" label="剩余Y币" />

      <el-table-column prop="recharge_log.status" label="状态" />
    </el-table>
    <el-table
      v-show="status == 2"
      ref="multipNum"
      stripe
      :data="tableListData"
      tooltip-effect="dark"
      style="width: 100%"
      @sort-change="screeningData"
    >
      <el-table-column prop="log_id" label="ID" />

      <el-table-column sortable="custom" prop="create_time" label="时间" />
      <el-table-column label="用户">
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
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">充值</span>
          <span v-else-if="scope.row.status == 2">
            <div>购买礼物</div>
            <div>
              <el-image
                style="width: 20px; height: 20px"
                :src="scope.row.gift.image"
              ></el-image
              >X{{ scope.row.gift_num }}
            </div>
          </span>
          <span v-else-if="scope.row.status == 3">打赏</span>
          <span v-else-if="scope.row.status == 4">获赏</span>
        </template>
      </el-table-column>
      <el-table-column prop="currency" label="Y币">
        <template slot-scope="scope">
          <div
            style="color: #89c37b"
            v-if="String(scope.row.currency).indexOf('-') != -1"
          >
            {{ scope.row.currency }}
          </div>
          <div style="color: #e47b76" v-else>+{{ scope.row.currency }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="currency_after" label="剩余Y币" />
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
      order_no: "",
      status: 1,
      activeName: "chonzhi",
    };
  },
  created() {
    //判断是否存储有筛选条件
    var data = this.$store.state.screeningData.YBchange;
    if (data) {
      if (data.Yuanfang) {
        this.activeName = data.activeName;
        this.user = data.user;
        this.order_no = data.order_no;
        this.status = data.status;
        this.start_time = data.start_time;
        this.end_time = data.end_time;
        this.curPage = data.curPage;
        //初始化VUEX筛选存储
        var value = this.$store.state.screeningData;
        var groupData = {
          YBchange: { Yuanfang: false },
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
    //TAB
    handleClick() {
      if (this.activeName == "chonzhi") {
        this.status = 1;
        this.getTableList();
      } else {
        this.status = 2;
        this.getTableList();
      }
    },
    ConditionsF() {
      var data = this.$store.state.screeningData;
      var groupData = {
        YBchange: {
          activeName: this.activeName,
          user: this.user,
          order_no: this.order_no,
          status: this.status,
          start_time: this.start_time,
          end_time: this.end_time,
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
      this.order_no = "";
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
        order_no: this.order_no,
        status: this.status,
        start_time: this.start_time,
        end_time: this.end_time,
        page: this.curPage,
      };
      this.api.billChange.YcurrencyDetail(data).then((res) => {
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
