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
      <span class="t-s01">类型</span>
      <el-select v-model="searchOption.item_type" placeholder="请选择商品类型">
        <el-option label="全部" :value="null"></el-option>
        <el-option label="券" :value="1"></el-option>
        <el-option label="实物" :value="2"></el-option>
      </el-select>

      <span class="t-s01 t-s02">是否发货</span>
      <el-select v-model="searchOption.is_deliver" placeholder="请选择发货状态">
        <el-option label="全部" :value="null"></el-option>
        <el-option label="未发货" :value="1"></el-option>
        <el-option label="已发货" :value="2"></el-option>
      </el-select>
      <span class="t-s01 t-s02">兑换时间</span>
      <el-date-picker
        class="datePicker"
        v-model="searchTime"
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
      <el-table-column
        prop="exchange_id"
        label="ID"
        sortable="true"
        width="100"
      />
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
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="consignee" label="收货人">
        <template slot-scope="scope">
          <div>{{ scope.row.consignee }}</div>
          <div style="color: #909399">{{ scope.row.remark }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="兑换商品"></el-table-column>
      <el-table-column prop="goods_class.is_combo" label="类型" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">券</span>
          <span v-if="scope.row.type == 2">实物</span>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="数量" />
      <el-table-column prop="point" label="兑换积分" />

      <el-table-column prop="create_time" label="兑换时间" />
      <el-table-column prop="express_no" label="物流单号" />
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.type == 2"
            @click="handleClick(scope.row)"
            type="text"
            size="small"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
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
    <el-dialog title="查看兑换详情" :visible.sync="detailsDialog" width="30%">
      <el-form label-width="180px">
        <el-form-item label="订单号">{{
          detailsData.exchange_id
        }}</el-form-item>
        <el-form-item label="用户">
          <div class="duio muzhicss" v-if="detailsData.user">
            <el-image
              class="ustrimg"
              :src="detailsData.user.avatar"
              fit="cover"
            ></el-image>
            <div>
              <div class="bjgt">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="detailsData.user.nickname"
                  placement="bottom"
                  :disabled="getShow(detailsData.user.nickname)"
                >
                  <div :title="getAgent(detailsData.user.nickname)">
                    {{ getAgent(detailsData.user.nickname) }}（电话:{{
                      detailsData.user.phone
                    }}）
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="兑换商品">
          {{ detailsData.name }}
        </el-form-item>
        <el-form-item label="数量">
          {{ detailsData.num }}
        </el-form-item>
        <el-form-item label="兑换积分">
          {{ detailsData.point }}
        </el-form-item>
        <el-form-item label="收货地址">
          {{ detailsData.address }}
        </el-form-item>
        <el-form-item label="收货人">
          {{ detailsData.address }}
        </el-form-item>
        <el-form-item label="联系电话">
          {{ detailsData.tel }}
        </el-form-item>
        <el-form-item label="备注">
          {{ detailsData.remark }}
        </el-form-item>
        <el-form-item label="兑换时间">
          {{ detailsData.create_time }}
        </el-form-item>
        <el-form-item label="物流单号">
          <el-input v-model="formData.express_no" />
        </el-form-item>
        <el-form-item label="物流信息">
          <el-input v-model="formData.express_info" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailsDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleChangeExchange"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
export default {
  name: "pointExchange",
  components: {},
  data() {
    return {
      loading: false,
      //用户详情弹框
      usertx: false,
      mapIndex: null,
      formData: {
        exchange_id: null,
        express_no: "",
        express_info: "",
      },
      locationData: [],
      searchOption: {
        keyword: "",
        order: "",
        sort: "",
        page: 1,
        start_time: "",
        end_time: "",
        item_type: "",
        is_deliver: "",
        page_size: 10,
      },
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
      this.searchOption = {
        keyword: this.$route.query.keyword,
        order: this.$route.query.order,
        sort: this.$route.query.sort,
        page: this.$route.query.page ? Number(this.$route.query.page) : 1,
        start_time: this.$route.query.start_time,
        end_time: this.$route.query.end_time,
        item_type: this.$route.query.item_type
          ? Number(this.$route.query.item_type)
          : null,
        is_deliver: this.$route.query.is_deliver
          ? this.$route.query.is_deliver
          : null,
        page_size: this.$route.query.page_size
          ? Number(this.$route.query.page_size)
          : this.page_size,
      };
      this.searchTime[0] = this.$route.query.start
        ? this.$route.query.start
        : "";
      this.searchTime[1] = this.$route.query.end ? this.$route.query.end : "";
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
        start_time: "",
        end_time: "",
        item_type: "",
        is_deliver: "",
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
      this.api.point.pointExchangeList(data).then((res) => {
        this.loading = false;
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 打开详情框 */
    handleClick(data) {
      this.detailsData = data;
      this.detailsDialog = true;
      this.formData.exchange_id = data.exchange_id;
      this.formData.express_no = data.express_no;
      this.formData.express_info = data.ExpressInfo;
    },
    /* 改变页数 */
    pageChange(p) {
      if (!this.searchTime) {
        this.searchTime = ["", ""];
        this.searchOption.start_time = this.searchTime[0];
        this.searchOption.end_time = this.searchTime[1];
      }
      if (p) this.searchOption.page = p;
      this.$router.push({
        path: "/point/exchange",
        query: this.searchOption,
      });

      // this.getTableList();
    },
    handleChangeExchange() {
      let datas = Object.assign({}, this.formData);
      if (datas.exchange_id && datas.express_no && datas.express_info) {
        this.loading = true;
        this.api.point.pointExchangeUpdate(datas).then(({ data }) => {
          this.loading = false;
          this.$message({
            message: data.msg,
            type: data.code == 0 ? "success" : "warning",
          });
          this.getTableList();
          this.detailsDialog = false;
        });
      }
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
