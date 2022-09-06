<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <span class="t-s01">用户</span>
      <el-input
        style="width: 350px; margin-right: 10px"
        placeholder="用户ID/手机号"
        v-model="searchOption.keyword"
        clearable
        @change="screening"
      ></el-input>

      <span class="t-s01 t-s02">类型</span>
      <el-select v-model="searchOption.type" placeholder="请选择">
        <el-option label="全部" :value="null"></el-option>
        <el-option
          v-for="(item, index) in pointType"
          :key="index"
          :label="item"
          :value="index + 1"
        >
        </el-option>
      </el-select>

      <span class="t-s01 t-s02">时间</span>
      <el-date-picker
        class="datePicker"
        v-model="searchTime"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        @change="dateChange"
      ></el-date-picker>
      <el-button type="primary" @click="screening" style="margin-left: 10px"
        >筛选</el-button
      >
      <el-button type="info" @click="resetData">清空条件</el-button>
    </div>
    <el-table
      ref="multipNum"
      stripe
      :data="tableListData"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
      @sort-change="handleDataSort"
    >
      <el-table-column prop="log_id" label="ID" width="80" sortable="true" />
      <el-table-column prop="create_time" label="时间" sortable="true" />
      <el-table-column label="用户">
        <template slot-scope="scope">
          <div
            class="duio muzhicss"
            @click="userInformation(scope.row)"
            v-if="scope.row.user"
          >
            <el-image
              class="ustrimg"
              :src="scope.row.user.avatar"
              fit="cover"
            ></el-image>
            <div>
              <div class="bjgt">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.user.nickname"
                  placement="bottom"
                  :disabled="getShow(scope.row.user.nickname)"
                >
                  <div :title="getAgent(scope.row.user.nickname)">
                    {{ getAgent(scope.row.user.nickname) }}（电话:{{
                      scope.row.user.phone
                    }}）
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="积分来源">
        <template slot-scope="scope">
          {{ pointType[scope.row.type - 1] }}
          <div v-if="scope.row.order_no != 0">
            <el-button
              type="text"
              @click="
                $router.push({
                  path: '/bookingList',
                  query: { order_no: scope.row.order_no, from: 'pointMall' },
                })
              "
            >
              订单：{{ scope.row.order_no }}
            </el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="device_brand" label="积分">
        <template slot-scope="scope">
          <span :style="'color:' + (scope.row.type > 1 ? '#67C23A' : '#F56C6C')"
            >{{ scope.row.type == 1 ? "-" : "" }}{{ scope.row.point }}</span
          >
        </template>
      </el-table-column>

      <el-table-column prop="point_after" label="剩余积分" />
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="searchOption.page"
        :hide-on-single-page="true"
        @current-change="pageChange"
        background
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="searchOption.page_size"
        @size-change="handlePageSizeChange"
        layout="sizes,prev, pager, next,jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息" :visible.sync="usertx" width="70%">
      <userBounced ref="userBounced" fromPath="UserInformation"></userBounced>
    </el-dialog>
    <go-back v-if="showBack"></go-back>
    <el-backtop
      target=".main-container"
      :bottom="showBack ? 105 : 40"
    ></el-backtop>
  </div>
</template>

<script>
export default {
  name: "pointLog",
  components: {},
  data() {
    return {
      loading: false,
      showBack: false,
      //用户详情弹框
      usertx: false,
      mapIndex: null,
      locationData: [],
      searchOption: {
        keyword: "",
        order: "",
        sort: "",
        page: 1,
        start: "",
        end: "",
        type: "",
        page_size: 10,
      },
      pointType: ["使用", "签到获得", "任务获得", "完善信息", "实名认证"],
      searchTime: ["", ""],
      detailsDialog: false, //打开详情框
      total: 1,
      tableListData: [], //页面表单的内容
      detailsData: {},
      loading: false,

      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
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
    };
  },
  created() {
    this.iniPageParam();
    this.getTableList();
  },
  watch: {
    $route(to, from) {
      this.iniPageParam();
      this.getTableList();
    },
  },
  methods: {
    handlePageSizeChange() {
      this.pageChange();
    },
    //用户详情弹框
    userInformation(row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user_id);
      }, 0);
    },
    // 内容过长，鼠标移入显示全部
    getAgent(v) {
      return v.length > 10 ? v.substring(0, 10) + " ..." : v;
    },
    getShow(v) {
      return v.length > 10 ? false : true;
    },
    iniPageParam() {
      if (this.$route.query.from != undefined) {
        this.showBack = true;
      }
      this.searchOption = {
        keyword: this.$route.query.keyword,
        order: this.$route.query.order,
        sort: this.$route.query.sort,
        page: this.$route.query.page ? Number(this.$route.query.page) : 1,
        start: this.$route.query.start,
        end: this.$route.query.end,
        type: this.$route.query.type ? Number(this.$route.query.type) : null,
        page_size: this.$route.query.page_size
          ? Number(this.$route.query.page_size)
          : this.page_size,
      };
      this.searchTime[0] = this.$route.query.start
        ? decodeURIComponent(this.$route.query.start)
        : "";
      this.searchTime[1] = this.$route.query.end
        ? decodeURIComponent(this.$route.query.end)
        : "";
    },
    /* 表格的排序发生变化 */
    handleDataSort(obj) {
      this.searchOption.sort = obj.order ? obj.prop : "";
      this.searchOption.order = obj.order ? this.sortableList[obj.order] : "";
      this.searchOption.page = 1;
      this.pageChange();
      //this.getTableList();
    },
    //日期选择
    dateChange(val) {
      if (val) {
        this.searchOption.start = val[0];
        this.searchOption.end = val[1];
      }
    },
    //清空条件
    resetData() {
      this.searchOption = {
        keyword: "",
        // order: "",
        // sort: "",
        page: 1,
        start: "",
        end: "",
        type: "",
        page_size: 10,
      };
      this.searchTime = ["", ""];
      //this.getTableList();
      this.pageChange();
    },
    //筛选
    screening() {
      this.searchOption.page = 1;
      this.pageChange();
    },
    /* 获取列表内容 */
    getTableList() {
      var data = this.searchOption;
      this.loading = true;
      this.api.point.pointLogList(data).then((res) => {
        this.loading = false;
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 打开详情框 */
    detailsDelDialog(data) {
      this.detailsData = data;
      this.detailsDialog = true;
    },
    /* 改变页数 */
    pageChange(p) {
      if (!this.searchTime) {
        this.searchTime = ["", ""];
        this.searchOption.start = encodeURIComponent(this.searchTime[0]);
        this.searchOption.end = encodeURIComponent(this.searchTime[1]);
      }
      if (p) this.searchOption.page = p;
      this.$router.push({
        path: "/point/log",
        query: this.searchOption,
      });

      // this.getTableList();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button--primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
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
.t-s01 {
  line-height: 34px;
  font-size: 15px;
  margin-right: 10px;
}
.t-s02 {
  margin-left: 20px;
}
</style>
