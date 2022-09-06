<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <el-button type="success" @click="billDetail">TA的收入</el-button>
    </div>
    <div class="shanxdiv">
      <el-input
        style="width: 300px"
        placeholder="订单号"
        v-model="order_no"
        clearable
      ></el-input>
      <div class="rucwz2">|</div>
      <el-date-picker
        v-model="create_time_start"
        type="datetime"
        placeholder="选择开始时间"
        value-format="yyyy-MM-dd HH:mm"
        format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
      <div class="rucwz">-</div>
      <el-date-picker
        v-model="create_time_end"
        type="datetime"
        placeholder="选择结束时间"
        value-format="yyyy-MM-dd HH:mm"
        format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
    </div>
    <div class="shanxdiv">
      <el-select
        style="margin-right: 10px"
        v-model="status"
        placeholder="选择状态"
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
      @filter-change="filterTagTable"
    >
      <el-table-column prop="log_id" label="ID" width="200" />
      <el-table-column prop="create_time" label="时间" width="300" />
      <el-table-column prop="order_no" label="订单号" width="400">
        <template slot-scope="scope">
          <div class="muzhicss" style="color: #4e9df8">
            {{ scope.row.order_no }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="300" />
      <el-table-column
        label="类型"
        width="200"
        column-key="type"
        :filters="[
          { text: '收入', value: 1 },
          { text: '支出', value: 2 },
        ]"
        :filter-multiple="false"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.currency.substr(0, 1) == '+'">收入</span>
          <span v-else-if="scope.row.currency.substr(0, 1) == '-'">支出</span>
        </template>
      </el-table-column>
      <el-table-column prop="currency" label="Y币" width="400" />
      <el-table-column prop="currency_after" label="剩余Y币" width="400" />
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

    <!-- 详情 -->
    <el-dialog title="详情" :visible.sync="xiangtx" width="50%"> </el-dialog>
    <!-- 返回上一页 -->
    <go-back ></go-back>
  </div>
</template>

<script>
export default {
  name: "UserInformation",
  data() {
    return {
      temporaryData: [],
      xiangtx: false,
      //页码
      curPage: 1,
      //数据总数
      total: 1,
      tableListData: [], //列表内容
      //状态的值
      status: "",
      //状态的数组
      stateData: [
        {
          id: 1,
          name: "充值",
        },
        {
          id: 2,
          name: "兑换消费",
        },
        {
          id: 3,
          name: "打赏",
        },
        {
          id: 4,
          name: "获赏",
        },
      ],
      //订单号
      order_no: "",
      //用户id
      user_id: "",
      //开始时间
      create_time_start: "",
      //结束时间
      create_time_end: "",
      //类型
      type: "",
    };
  },
  created() {
    this.user_id = Number(this.$route.query.user_id);
    //判断是否存储有筛选条件
    var data = this.$store.state.screeningData.billY;
    if (data) {
      if (data.Yuanfang) {
        this.create_time_start = data.create_time_start;
        this.create_time_end = data.create_time_end;
        this.order_no = data.order_no;
        this.status = data.status;
        this.curPage = data.curPage;
        //初始化VUEX筛选存储
        var value = this.$store.state.screeningData;
        var groupData = {
          billY: { Yuanfang: false },
        };
        Object.assign(value, groupData);
        this.$store.dispatch("updateVuex", {
          key: "screeningData",
          value: value,
        });
      }
    }
    this.getTableList();
  },
  methods: {
    billDetail() {
      this.ConditionsF();
      this.$router.push({
        path: "/billD",
        query: {
          user_id: this.user_id,
        },
      });
    },
    ConditionsF() {
      var data = this.$store.state.screeningData;
      var groupData = {
        billY: {
          create_time_start: this.create_time_start,
          create_time_end: this.create_time_end,
          order_no: this.order_no,
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
    //筛选
    filterTagTable(data) {
      if (data.type != "") {
        this.type = Number(data.type[0]);
      } else {
        this.type = "";
      }
      this.getTableList();
    },
    //详情(废弃)
    Detailed(data) {
      //this.xiangtx = true;
    },
    //重置
    resetData() {
      this.create_time_start = "";
      this.create_time_end = "";
      this.order_no = "";
      this.status = "";
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
        create_time_start: this.create_time_start,
        create_time_end: this.create_time_end,
        user_id: this.user_id,
        order_no: this.order_no,
        status: this.status,
        type: this.type,
        //页码
        page: this.curPage,
        //拉取数量
        page_size: 10,
      };
      this.api.user.Currency(data).then((res) => {
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
.tilmwz {
  font-size: 16px;
  color: #000;
  text-align: center;
  line-height: 40px;
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
