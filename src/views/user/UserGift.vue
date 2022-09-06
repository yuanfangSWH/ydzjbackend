<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <el-input
        style="width: 350px; margin-right: 10px"
        placeholder="搜索组局ID"
        v-model="gp_id"
        clearable
      ></el-input>
      <div class="rucwz2">|</div>
      <el-date-picker
        v-model="create_time_start"
        type="datetime"
        placeholder="开始时间"
        value-format="yyyy-MM-dd HH:mm"
        format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
      <div class="rucwz">-</div>
      <el-date-picker
        style="margin-right: 10px"
        v-model="create_time_end"
        type="datetime"
        placeholder="结束时间"
        value-format="yyyy-MM-dd HH:mm"
        format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
      <el-button type="primary" @click="screening">筛选</el-button>
      <el-button type="info" @click="resetData">重置</el-button>
    </div>
    <el-table
      ref="multipNum"
      stripe
      :data="tableListData"
      tooltip-effect="dark"
      style="width: 100%"
      @sort-change="screeningData"
    >
      <el-table-column prop="create_time" label="时间" width="400" />
      <el-table-column label="用户" width="500">
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
      <el-table-column prop="type" label="类型" width="400">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">购买</span>
          <span v-else-if="scope.row.type == 2">使用</span>
          <span v-else-if="scope.row.type == 3">获赠</span>
          <span v-else-if="scope.row.type == 4">冻结退回</span>
          <span v-else-if="scope.row.type == 5">冻结消耗</span>
        </template>
      </el-table-column>
      <el-table-column prop="image" label="礼物" width="400">
        <template slot-scope="scope">
          <div style="display: flex">
            <div
              class="liwzcss2"
              style="color: #e26b66"
              v-show="scope.row.type == 1 || scope.row.type == 4"
            >
              +
            </div>
            <div
              class="liwzcss2"
              style="color: #a2835b"
              v-show="scope.row.type == 2"
            >
              -
            </div>
            <el-image class="liwimgcss" :src="scope.row.gift.image"></el-image>
            <div
              class="liwzcss"
              style="color: #e26b66"
              v-show="scope.row.type == 1 || scope.row.type == 4"
            >
              X{{ scope.row.gift_num }}
            </div>
            <div
              class="liwzcss"
              style="color: #a2835b"
              v-show="scope.row.type == 2"
            >
              X{{ scope.row.gift_num }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="total_point" label="来源" width="400">
        <template slot-scope="scope">
          <div
            class="muzhicss"
            v-if="scope.row.group_party"
            style="color: #4e9df8"
            @click="GroupEetail(scope.row)"
          >
            {{ scope.row.group_party.title }}
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
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息" :visible.sync="usertx" width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
    <!-- 返回上一页 -->
    <go-back></go-back>
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
      //组局ID
      gp_id: "",
      create_time_start: "",
      create_time_end: "",
      //排序
      sort: "",
      order: "",
      //用户ID
      user_id: "",
    };
  },
  created() {
    if (this.$route.query.user_id) {
      this.user_id = Number(this.$route.query.user_id);
    }
    this.getTableList();
  },
  methods: {
    //组局跳转
    GroupEetail(row) {
      this.$router.push({
        path: "/GroupEetail",
        query: {
          gp_id: row.gp_id,
        },
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
      this.gp_id = "";
      this.create_time_start = "";
      this.create_time_end = "";
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
        user_id: this.user_id,
        sort: this.sort,
        order: this.order,
        gp_id: this.gp_id,
        create_time_start: this.create_time_start,
        create_time_end: this.create_time_end,
        page: this.curPage,
      };
      this.api.gift.HistoryData(data).then((res) => {
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
.liwimgcss {
  width: 60px;
  height: 60px;
  display: block;
}
.liwzcss {
  width: 200px;
  font-size: 20px;
  line-height: 60px;
  margin-left: 10px;
}
.liwzcss2 {
  width: 20px;
  font-size: 20px;
  line-height: 60px;
  margin-right: 10px;
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