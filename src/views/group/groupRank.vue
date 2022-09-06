<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="filterBox">
      <div class="so-nav">
        <div class="so-box1">
          <span class="s01">搜索</span>
          <el-input class="so-ipt"
                    clearable
                    placeholder="搜索用户ID/昵称/手机号"
                    v-model="soVal">
          </el-input>
        </div>
        <div class="so-box1">
          <span class="s01">时间选择</span>
          <div class="">
            <el-date-picker class="datePicker"
                            v-model="value2"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"
                            value-format="yyyy-MM-dd HH:mm"
                            format="yyyy-MM-dd HH:mm"
                            @change="dateChange">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="btnBox">
        <span>
          <el-button class="sosuo"
                     type="primary"
                     @click="filtrateFun">筛选</el-button>
        </span>
        <span style="margin-left: 10px">
          <el-button class="sosuo"
                     type="primary"
                     @click="clearFun">清空条件</el-button>
        </span>
      </div>
    </div>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="累计礼物消费"
                   name="first"></el-tab-pane>
      <el-tab-pane label="累计参与人数"
                   name="second"></el-tab-pane>
      <el-tab-pane label="累计发布次数"
                   name="third"></el-tab-pane>
    </el-tabs>
    <!-- @filter-change="filterTagTable" -->
    <el-table ref="multipleTable"
              :data="dataOptions"
              stripe
              style="width: 100%"
              @sort-change="sortFilterFun">
      <el-table-column prop="user_id"
                       label="ID"
                       width="120"
                       sortable="custom">
      </el-table-column>
      <el-table-column prop=""
                       label="发布者"
                       width="350">
        <template slot-scope="scope">
          <div class="duio muzhicss"
               @click="userInformation(scope.row)">
            <el-image class="ustrimg"
                      v-if="scope.row.avatar"
                      :src="scope.row.avatar"
                      fit="cover"></el-image>
            <div>
              <div class="bjgt">
                <el-tooltip class="item"
                            effect="dark"
                            :content="scope.row.nickname"
                            placement="bottom"
                            :disabled="getShow2(scope.row.nickname)">
                  <div :title="getAgent2(scope.row.nickname)">
                    {{ getAgent2(scope.row.nickname) }}（<span v-if="scope.row.gender == 0">未知</span>
                    <span v-else-if="scope.row.gender == 1">男</span>
                    <span v-else-if="scope.row.gender == 2">女</span>/{{
                      scope.row.age
                    }}岁）
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="gift_value"
                       label="累计礼物消费"
                       width="200"
                       sortable="custom">
      </el-table-column>
      <el-table-column prop="enroll_count"
                       label="累计参与人数"
                       width="200"
                       sortable="custom">
      </el-table-column>
      <el-table-column prop="gp_count"
                       label="累计发布次数"
                       sortable="custom">
      </el-table-column>
      <!-- <el-table-column
                fixed="right"
                label="操作" align='right'>
                <template slot-scope="scope">
                    <el-button v-if="is_delete != 1 && status != 3" @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button v-if="status == 1" @click="delClick(scope.row)" type="text" size="small">下架</el-button>
                    <el-button v-if="is_delete == 1" @click="restoreFun(scope.row)" type="text" size="small">上架</el-button>
                    <el-button v-if="is_delete == 1 || status == 3" @click="editFun(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column> -->
    </el-table>
    <div class="pagebox">
      <el-pagination v-if="count"
                     :hide-on-single-page="value"
                     background
                     layout="sizes,prev, pager, next,jumper"
                     :page-sizes="[10, 20, 50, 100]"
                     :page-size.sync="page_size"
                     @size-change="handlePageSizeChange"
                     :total="count"
                     :current-page="page"
                     @current-change="pageChange">
      </el-pagination>
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
  data () {
    return {
      usertx: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      soVal: "",
      value2: "",
      start: "",
      end: "",
      rank_type: "gift_value",
      activeName: "first",
      page: 1,
      count: 0,
      status: 1,
      dataOptions: [],
      sortVal: "",
      sortStatus: false,
      order: "desc",
      value: true,
      page_size: 10,
    };
  },
  created () {
    this.dataFun();
  },
  methods: {
    //日期选择
    dateChange (val) {
      if (val) {
        this.start = val[0];
        this.end = val[1];
      } else {
        this.start = "";
        this.end = "";
      }
    },
    filtrateFun () {
      this.page = 1;
      this.dataFun();
    },
    clearFun () {
      this.page = 1;
      this.soVal = "";
      this.start = "";
      this.end = "";
      this.value2 = "";
      this.dataFun();
    },
    dataFun () {
      let data = {
        rank_type: this.rank_type,
        start: this.start,
        end: this.end,
        user: this.soVal,
        page: this.page,
        sort: this.sortVal,
        order: this.order,
        page_size: this.page_size,
      };
      this.api.group.groupRank(data).then((res) => {
        this.dataOptions = res.data.data;
        this.count = res.data.count;
      });
    },
    //TAB
    handleClick () {
      this.page = 1;
      this.soVal = "";
      if (this.activeName == "first") {
        this.rank_type = "gift_value";
        this.dataFun();
      } else if (this.activeName == "second") {
        this.rank_type = "enroll_count";
        this.dataFun();
      } else {
        this.rank_type = "gp_count";
        this.dataFun();
      }
    },
    //table排序
    sortFilterFun (column) {
      this.sortMethod(column.prop);
    },
    sortMethod (val) {
      this.sortVal = val;
      this.sortStatus = !this.sortStatus;
      if (this.sortStatus) {
        this.order = "asc"; //正序
      } else {
        this.order = "desc"; //倒序
      }
      //接口逻辑
      this.dataFun();
    },
    pageChange (val) {
      this.page = val;
      this.dataFun();
    },
    handlePageSizeChange (v) {
      this.pageChange();
    },
    //用户详情弹框
    userInformation (row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user_id);
      }, 0);
    },
    // 内容过长，鼠标移入显示全部
    getAgent2 (v) {
      return v.length > 6 ? v.substring(0, 6) + " ..." : v;
    },
    getShow2 (v) {
      return v.length > 10 ? false : true;
    },
  },
};
</script>

<style lang="scss" scoped>
.shopSet {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 15px 15px;
  padding: 15px 15px;
}
.pageTitle {
  margin: 10px 0 20px 0;
  font-size: 24px;
  color: #0a0a0a;
}
.filterBox {
  display: inline-block;
  width: 100%;
}
.so-nav {
  width: 550px;
  float: left;
  margin-bottom: 15px;
  .so-box1 {
    width: 514px;
    display: inline-block;
    position: relative;
    margin: 10px 0 0 0;
    .s01 {
      width: 74px;
      line-height: 40px;
      float: left;
      margin-right: 10px;
      text-align: right;
    }
    .sosuo {
      margin-left: 10px;
      float: left;
      background-color: #f4f4f4 !important;
      border: 1px solid #cecece;
      color: #0a0a0a;
      width: 90px;
    }
    .so-ipt {
      border-color: #cecece;
      float: left;
      width: 426px;
    }
    .el-input__suffix {
      color: #000 !important;
      font-weight: bold;
    }
    .datePicker {
      width: 426px;
    }
  }
}
.btnBox {
  float: left;
  margin-bottom: 15px;
  margin-top: 16px;
  .sosuo {
    float: left;
    background-color: #f4f4f4 !important;
    border: 1px solid #cecece;
    color: #0a0a0a;
    width: 90px;
    margin-right: 10px;
  }
}
.pagebox {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
</style>