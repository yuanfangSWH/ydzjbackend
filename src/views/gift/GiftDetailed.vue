<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <div class="rucwz2">用户</div>
      <el-input style="width: 350px; margin-right: 10px"
                placeholder="搜索用户ID/昵称"
                v-model="user"
                clearable></el-input>
      <div class="rucwz2">购买时间</div>
      <el-date-picker v-model="create_time_start"
                      type="datetime"
                      placeholder="设置开始时间"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm">
      </el-date-picker>
      <div class="rucwz">-</div>
      <el-date-picker style="margin-right: 10px"
                      v-model="create_time_end"
                      type="datetime"
                      placeholder="设置结束时间"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm">
      </el-date-picker>
      <el-button class="filter-btn"
                 type="primary"
                 @click="screening">筛选</el-button>
      <el-button class="filter-btn"
                 type="info"
                 @click="resetData">清空条件</el-button>
    </div>
    <el-table ref="multipNum"
              stripe
              :data="tableListData"
              tooltip-effect="dark"
              style="width: 100%"
              @sort-change="screeningData">
      <el-table-column sortable="custom"
                       prop="log_id"
                       label="ID"
                       width="200" />
      <el-table-column label="用户"
                       width="300">
        <template slot-scope="scope">
          <div class="duio muzhicss"
               @click="userInformation(scope.row)">
            <el-image class="ustrimg"
                      style="width: 50px; height: 50px"
                      :src="scope.row.user.avatar"
                      fit="cover"></el-image>
            <div>
              <div class="bjgt">{{ scope.row.user.nickname }}</div>
              <div class="bjgt">ID:{{ scope.row.user.user_id }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="image"
                       label="礼物"
                       width="200">
        <template slot-scope="scope">
          <div style="display: flex">
            <el-image class="liwimgcss"
                      style="width: 60px; height: 60px"
                      fit="contain"
                      v-if="scope.row.gift"
                      :src="scope.row.gift.image"></el-image>
            <div class="liwzcss">X{{ scope.row.gift_num }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="total_amount"
                       label="单价(Y币)"
                       width="150">
        <template slot-scope="scope">
          <div style="color: #eab43f">{{ scope.row.gift_price }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="total_amount"
                       label="总价值(Y币)"
                       width="150">
        <template slot-scope="scope">
          <div style="color: #eab43f">{{ scope.row.total_amount }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="total_point"
                       label="总积分">
        <template slot-scope="scope">
          <div style="color: #559a4a">{{ scope.row.total_point }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_time"
                       label="购买时间"
                       width="150"
                       align="center" />
    </el-table>
    <div class="pagination">
      <el-pagination :current-page="curPage"
                     :hide-on-single-page="true"
                     @current-change="pageChange"
                     background
                     :page-size.sync="page_size"
                     @size-change="handlePageSizeChange"
                     :page-sizes="[10, 20, 30,50]"
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
export default {
  name: "GiftDetailed",
  data () {
    return {
      usertx: false,
      //礼物ID
      gift_id: "",
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
    };
  },
  created () {
    if (this.$route.query.gift_id) {
      this.gift_id = Number(this.$route.query.gift_id);
    }
    this.getTableList();
  },
  methods: {
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
        type: 1,
        gift_id: this.gift_id,
        sort: this.sort,
        order: this.order,
        user: this.user,
        create_time_start: this.create_time_start,
        create_time_end: this.create_time_end,
        page: this.curPage,
        page_size: this.page_size,
      };
      this.api.gift.HistoryData(data).then((res) => {
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
.liwimgcss {
  display: block;
}
.liwzcss {
  width: 200px;
  font-size: 16px;
  line-height: 60px;
  margin-left: 10px;
}
.shanxdiv {
  margin-bottom: 10px;
  display: flex;
  .filter-btn {
    float: left;
    background-color: #f4f4f4 !important;
    border: 1px solid #cecece;
    color: #0a0a0a;
  }
  .rucwz2 {
    color: #0a0a0a;
  }
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
