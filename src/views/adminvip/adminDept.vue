<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <el-button class="b-btn" type="danger" @click="batchDelete"
        >删除</el-button
      >
      <el-button class="b-btn" type="success" @click="insertItemtk"
        >新增</el-button
      >
      <el-button class="b-btn" type="warning" @click="returnF">返回</el-button>
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
        v-model="dept_status"
        placeholder="请选择状态"
      >
        <el-option :key="0" label="禁用" :value="0"> </el-option>
        <el-option :key="1" label="正常" :value="1"> </el-option>
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
      <el-table-column label="全选/部门ID" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.dept_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dept_name" label="部门名称" width="150" />
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              openUpdateDialog(
                scope.$index,
                JSON.parse(JSON.stringify(scope.row)),
                'type'
              )
            "
            >修改</el-button
          >
          <el-button size="mini" type="danger" @click="openDelDialog(scope.row)"
            >删除</el-button
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

    <!-- 新增内容 -->
    <el-dialog title="新增" :visible.sync="insertDialog">
      <el-form
        :model="addItem"
        ref="formName"
        label-width="80px"
        class="updateArea"
      >
        <el-form-item label="部门名称" prop="dept_name">
          <el-input v-model="addItem.dept_name" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addItem.dept_status" placeholder="请选择">
            <el-option label="停用" :value="0"></el-option>
            <el-option label="正常" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="insertDialog = false">取 消</el-button>
        <el-button type="primary" @click="insertItem">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改内容 -->
    <el-dialog :title="'修改'" :visible.sync="updateDialog">
      <el-form ref="updateArea" label-width="80px" class="updateArea">
        <el-form-item label="部门名称">
          <el-input v-model="currenItem.dept_name" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="currenItem.dept_status" placeholder="请选择">
            <el-option label="停用" :value="0"></el-option>
            <el-option label="正常" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="multiUpdate">确定</el-button>
      </span>
    </el-dialog>

    <!-- 删除单个内容 -->
    <el-dialog
      :title="'删除-' + currenDeleteRow.dept_name"
      :visible.sync="deleteDialog"
      width="30%"
    >
      <span>确定要删除此项吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量删除 -->
    <el-dialog title="删除" :visible.sync="mutilDeleteDialog" width="50%">
      <span class="s-title">确定要删除以下内容吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
        {{ item }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mutilDeleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem('mutil')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "currenPage",
  data() {
    return {
      dept_status: "",
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      curPage: 1, //删除框的标题
      total: 13, //删除框的标题
      rulesForm: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      tableListData: [], //页面表单的内容
      addItem: {}, //添加
      currenItem: {}, //修改
      currenDeleteRow: "", //当前选中的删除行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      searchValue: "", //搜索的值
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //返回
    returnF() {
      this.$router.go(-1);
    },
    //重置
    resetData() {
      this.dept_status = "";
      this.curPage = 1;
      this.getTableList();
    },
    //筛选
    screening() {
      this.curPage = 1;
      this.getTableList();
    },
    /* 获取表单内容 */
    getTableList() {
      let data = {
        dept_status: this.dept_status,
        page: this.curPage,
        dept_name: this.searchValue,
      };
      this.api.adminvip.deptData(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 搜索 */
    searchDatas() {
      this.curPage = 1;
      this.getTableList();
    },
    //打开添加弹框
    insertItemtk() {
      this.insertDialog = true;
      this.addItem.dept_status = 1;
    },
    /* 新增 */
    insertItem() {
      var data = this.addItem;
      this.api.adminvip.deptInsert(data).then((res) => {
        this.$refs["formName"].resetFields();
        this.getTableList();
        this.insertDialog = false;
      });
    },

    /* 打开修改窗口 */
    openUpdateDialog(index, row) {
      this.updateDialog = true;
      this.currenItem = row;
    },
    /* 修改 */
    multiUpdate() {
      var data = this.currenItem;
      this.api.adminvip.deptUpdate(data).then((res) => {
        this.getTableList();
        this.updateDialog = false;
      });
    },
    /* 打开批量删除框 */
    batchDelete() {
      if (this.multipleSelection != "") {
        this.mutilDeleteDialog = true;
      } else {
        this.$message({
          message: "请先勾选要删除的数据",
          type: "warning",
        });
      }
    },
    /* 打开删除框 */
    openDelDialog(row) {
      this.currenDeleteRow = row;
      this.deleteDialog = true;
    },
    /* 删除选项 */
    deleteItem(type) {
      var id = [];
      if (type == "one") {
        id[0] = this.currenDeleteRow.dept_id;
      } else if (type == "mutil") {
        id = this.multipleSelection;
      }
      var data = {
        id: id,
      };
      this.api.adminvip.deptDelete(data).then((res) => {
        this.getTableList();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.dept_id);
        this.nameArr.push(item.dept_name);
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
.b-btn {
  background-color: #0a0a0a !important;
  border: 1px solid #0a0a0a;
  color: #ffffff;
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
