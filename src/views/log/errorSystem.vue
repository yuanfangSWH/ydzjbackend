<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <el-input
        style="width: 350px; margin-right: 10px"
        placeholder="主机名"
        v-model="hostname"
        clearable
      ></el-input>
      <!-- <el-input
        style="width: 350px; margin-right: 10px"
        placeholder="错误代码"
        v-model="code"
        clearable
      ></el-input> -->
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
      <el-button type="primary" @click="screening">筛选</el-button>
      <el-button type="info" @click="resetData">重置</el-button>
    </div>
    <el-table
      ref="multipNum"
      stripe
      :data="tableListData"
      tooltip-effect="dark"
      style="width: 100%"
      @sort-change="handleDataSort"
    >
      <el-table-column prop="id" label="日志ID" width="80" />
      <el-table-column prop="hostname" label="主机名" />
      <el-table-column prop="project" label="项目" />
      <!-- <el-table-column prop="module" label="模块" width="200" />
      <el-table-column prop="code" label="错误代码" width="350" />
      <el-table-column prop="prefix" label="错误标识" width="350" /> -->
      <el-table-column prop="content" label="错误内容" width="550" />
      <el-table-column prop="file" label="错误文件" width="300" />
      <el-table-column prop="line" label="错误文件行数" />
      <el-table-column prop="create_time" label="发生时间" sortable="true" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="detailsDelDialog(scope.row)"
            >详情信息</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="curPage"
        :hide-on-single-page="true"
        @current-change="pageChange"
        background
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="page_size"
        @size-change="handlePageSizeChange"
        layout="sizes,prev, pager, next,jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog title="详情信息" :visible.sync="detailsDialog" width="50%">
      <el-form
        :v-model="detailsData"
        label-width="150px"
        width="100%"
        class="demo-ruleForm"
      >
        <el-form-item label="日志ID：">
          {{ detailsData.id }}
        </el-form-item>
        <el-form-item label="主机名：">
          {{ detailsData.hostname }}
        </el-form-item>
        <el-form-item label="错误内容：">
          {{ detailsData.content }}
        </el-form-item>
        <el-form-item label="错误文件：">
          {{ detailsData.file }}
        </el-form-item>
        <el-form-item label="错误文件行数：">
          {{ detailsData.line }}
        </el-form-item>
        <el-form-item label="追踪调用栈：">
          <el-input
            type="textarea"
            :rows="10"
            width="100%"
            v-model="detailsData.trace"
          ></el-input>
        </el-form-item>
        <el-form-item label="发生时间：">
          {{ detailsData.create_time }}
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
export default {
  name: "currenPage",
  data() {
    return {
      hostname: "",
      start_time: "",
      end_time: "",
      detailsDialog: false, //打开详情框
      curPage: 1,
      total: 1,
      sort: "",
      order: "",
      page_size: 10,
      tableListData: [], //页面表单的内容
      detailsData: {},
      searchTime: ["", ""],
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
    this.getTableList();
  },
  methods: {
    handlePageSizeChange() {
      this.curPage = 1;
      this.pageChange();
    },
    //日期选择
    dateChange(val) {
      if (val) {
        this.start_time = val[0];
        this.end_time = val[1];
      } else {
        this.searchTime = ["", ""];
      }
    },
    //重置
    resetData() {
      this.hostname = "";
      this.curPage = 1;
      this.searchTime = ["", ""];
      this.getTableList();
    },
    //筛选
    screening() {
      this.curPage = 1;
      this.getTableList();
    },
    /* 获取列表内容 */
    getTableList() {
      if (!this.searchTime) {
        this.searchTime = ["", ""];
        this.start_time = this.searchTime[0];
        this.end_time = this.searchTime[1];
      }
      var data = {
        hostname: this.hostname,
        start_time: this.searchTime[0],
        end_time: this.searchTime[1],
        page: this.curPage,
        sort: this.sort,
        order: this.order,
        page_size: this.page_size,
      };
      this.api.system.ErrorList(data).then((res) => {
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
    pageChange(page) {
      this.curPage = page;
      this.getTableList();
    },
    handleDataSort(obj) {
      this.sort = obj.order ? obj.prop : "";
      this.order = obj.order ? this.sortableList[obj.order] : "";
      this.curPage = 1;
      this.getTableList();
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
    width: 90% !important;
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
      width: 100% !important;
    }
  }
}
</style>
