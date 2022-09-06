<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <el-button type="danger" @click="batchDelete">批量审核</el-button>

      <el-input
        class="searchInput"
        placeholder="请输入要搜索的内容"
        prefix-icon="el-icon-search"
        v-model="searchValue"
        @change="searchDatas"
      ></el-input>
    </div>
    <div class="shanxdiv">
      <el-select
        style="margin-right: 10px"
        v-model="typeValue"
        placeholder="请选择类型"
      >
        <el-option
          v-for="item in typeData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-select
        style="margin-right: 10px"
        v-model="statusValue"
        placeholder="请选择状态"
      >
        <el-option
          v-for="item in statusData"
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
      @selection-change="selectItem"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="全选/举报ID" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.report_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="user_nickname" label="举报人" width="150" />
      <el-table-column
        prop="reported_user_nickname"
        label="被举报人"
        width="150"
      />
      <el-table-column prop="type" label="举报类型" width="150" />
      <el-table-column prop="desc" label="描述" width="500" />
      <el-table-column prop="create_time" label="举报时间" width="200" />
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">未处理</span>
          <span v-else-if="scope.row.status == 1">已处理</span>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="changek(scope.row)">审核</el-button>
          <el-button size="mini" @click="checkDetail(scope.row)"
            >详情</el-button
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
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 审核 -->
    <el-dialog
      :title="'审核-' + deltitle"
      :visible.sync="deleteDialog"
      width="30%"
    >
      <span>确定要审核该用户吗</span>
      <div class="xialdiv">
        <el-select v-model="stateValue" placeholder="请选择状态">
          <el-option
            v-for="item in stateData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="changeData('one')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 批量审核 -->
    <el-dialog title="批量审核以下用户" :visible.sync="changetx" width="50%">
      <div class="gz-lieb">
        <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
          {{ item }}、
        </div>
      </div>
      <div class="xialdiv">
        <el-select v-model="stateValue" placeholder="请选择状态">
          <el-option
            v-for="item in stateData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changetx = false">取 消</el-button>
        <el-button type="primary" @click="changeData('mutil')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserReport",
  data() {
    return {
      //举报类型
      typeValue: "",
      typeData: [
        {
          id: 1,
          name: "色情暴力低俗",
        },
        {
          id: 2,
          name: "政治敏感",
        },
        {
          id: 3,
          name: "广告营销",
        },
        {
          id: 4,
          name: "违法犯罪",
        },
        {
          id: 5,
          name: "其它",
        },
      ],
      //状态
      statusValue: "",
      statusData: [
        {
          id: 0,
          name: "未处理",
        },
        {
          id: 1,
          name: "已处理",
        },
      ],
      //页码
      curPage: 1,
      //数据总数
      total: 1,
      //是否全选
      allQL: false,
      changetx: false, //打开修改框
      tableListData: [], //列表内容
      multipleSelection: [], //批量选中ID
      nameArr: [], //批量选中的名称
      deltitle: "",
      deleteDialog: false,
      currenDeleteRow: "", //当前选中的删除行
      searchValue: "", //搜索的值
      //状态的值
      stateValue: "",
      //状态的数组
      stateData: [
        {
          id: 0,
          name: "删除",
        },
        {
          id: 1,
          name: "正常",
        },
        {
          id: 2,
          name: "违规",
        },
        {
          id: 3,
          name: "待审核",
        },
      ],
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //详情
    checkDetail(row) {
      this.$router.push({
        path: "/ReportData",
        query: {
          report_id: row.report_id,
        },
      });
    },
    //重置
    resetData() {
      this.typeValue = "";
      this.statusValue = "";
      this.curPage = 1;
      this.getTableList();
    },
    //筛选
    screening() {
      this.curPage = 1;
      this.getTableList();
    },
    /*, 获取表单内容 */
    getTableList() {
      var data = {
        //类型
        type: this.typeValue,
        //状态
        status: this.statusValue,
        //关键字
        name: this.searchValue,
        //页码
        page: this.curPage,
        //拉取数量
        page_size: 10,
      };
      this.api.user.getReport(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 搜索 */
    searchDatas() {
      this.curPage = 1;
      this.getTableList();
    },
    /* 选择表的行 */
    selectItem(val) {
      //批量选中ID
      this.multipleSelection = [];
      //批量选中的名称
      this.nameArr = [];
      val.forEach((item) => {
        this.multipleSelection.push(item.report_id);
        this.nameArr.push(item.user_id);
      });
    },
    // 打开批量审核框
    batchDelete() {
      if (this.multipleSelection != "") {
        this.changetx = true;
        this.stateValue = "";
      } else {
        this.$message({
          message: "请先勾选要审核的用户",
          type: "warning",
        });
      }
    },
    // 打开审核框
    changek(data) {
      this.stateValue = "";
      this.deltitle = data.user_id;
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    //审核
    changeData(type) {
      if (this.stateValue != "") {
        var staff_id = new Array();
        staff_id.push(this.currenDeleteRow.report_id);
        var id = type === "one" ? staff_id : this.multipleSelection;
        var data = {
          eval_id: id,
          status: this.stateValue,
        };
        this.api.user.ReportHandle(data).then((res) => {
          this.getTableList();
          this.changetx = false;
        });
      } else {
        this.$message({
          message: "请选择状态",
          type: "warning",
        });
      }
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
