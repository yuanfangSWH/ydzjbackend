<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <el-input
        class="searchInput"
        placeholder="请输入任务名称"
        suffix-icon="el-icon-search"
        v-model="searchValue"
        @change="searchDatas"
      >
      </el-input>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableListData"
      stripe
      style="width: 100%"
      @filter-change="filterTagTable"
      @sort-change="screeningData"
    >
      <el-table-column prop="worker_id" label="ID" width="100" />
      <el-table-column prop="name" label="名称" width="250" />
      <el-table-column prop="func_name" label="方法名" width="200" />
      <el-table-column
        column-key="running"
        :filters="[
          { text: '待机', value: 0 },
          { text: '执行中', value: 1 },
        ]"
        :filter-multiple="false"
        label="执行状态"
        width="200"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.running == 0">待机</span>
          <span v-else-if="scope.row.running == 1"
            ><span style="color: #6bbe41">执行中</span></span
          >
        </template>
      </el-table-column>
      <el-table-column
        column-key="err"
        :filters="[
          { text: '出错', value: 0 },
          { text: '正常', value: 1 },
        ]"
        :filter-multiple="false"
        label="执行结果"
        width="200"
      >
        <template slot-scope="scope">
          <el-tooltip
            effect="dark"
            :content="scope.row.err_msg != '' ? scope.row.err_msg : '空'"
            placement="bottom"
          >
            <span v-if="scope.row.err == 0"
              ><span style="color: #e78166">出错</span></span
            >
            <span v-else-if="scope.row.err == 1"
              ><span style="color: #6bbe41">正常</span></span
            >
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="finish_time" label="上次执行时间" width="200" />
      <el-table-column prop="elapsed_time" label="上次执行耗时" width="200" />
      <el-table-column prop="next_time" label="下次执行时间" width="200" />

      <el-table-column prop="timer" label="周期" width="100" />
      <el-table-column
        prop="status"
        label="状态"
        column-key="status"
        :filters="[
          { text: '禁用', value: 0 },
          { text: '启用', value: 1 },
        ]"
        :filter-multiple="false"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">禁用</span>
          <span v-if="scope.row.status == 1">启用</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="performDialog(scope.row)" type="text" size="small"
            >立即执行</el-button
          >
          <el-button
            @click="openUpdateDialog(scope.row)"
            type="text"
            size="small"
            >编辑</el-button
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
        :rules="rules"
        ref="formName"
        label-width="150px"
        class="updateArea"
      >
        <el-form-item label="名称" prop="tag_name">
          <el-input v-model="addItem.tag_name" clearable />
        </el-form-item>
        <el-form-item label="排序" prop="tag_sort">
          <el-input type="Number" v-model="addItem.tag_sort" clearable />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="addItem.status" placeholder="请选择">
            <el-option key="0" label="禁用" :value="0"></el-option>
            <el-option key="1" label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertDialog = false">取 消</el-button>
        <el-button type="primary" @click="validation(1)">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改内容 -->
    <el-dialog
      :title="'修改-' + updateDialogTitle"
      :visible.sync="updateDialog"
    >
      <el-form
        :model="currenItem"
        :rules="rules"
        ref="formName"
        label-width="150px"
        class="updateArea"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="currenItem.name" clearable />
        </el-form-item>
        <el-form-item label="方法名" prop="func_name">
          <el-input v-model="currenItem.func_name" clearable />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="currenItem.desc" clearable />
        </el-form-item>
        <el-form-item label="周期" prop="timer">
          <el-input v-model="currenItem.timer" clearable />
        </el-form-item>
        <el-form-item label="下次执行时间">
          <el-date-picker
            v-model="currenItem.next_time"
            type="datetime"
            placeholder="选择下次执行时间"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
          >
          </el-date-picker>
          <div style="color: #aaaaaa">注意：下次执行时间不填等于立即执行</div>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="currenItem.status" placeholder="请选择">
            <el-option key="0" label="禁用" :value="0"></el-option>
            <el-option key="1" label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="validation(2)">确定</el-button>
      </span>
    </el-dialog>
    <!-- 立即执行 -->
    <el-dialog
      :title="'立即执行-' + deltitle"
      :visible.sync="performtk"
      width="30%"
    >
      <span>确定要立即执行此项吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="performtk = false">取 消</el-button>
        <el-button type="primary" @click="performItem()">确定</el-button>
      </span>
    </el-dialog>
    <!-- 删除单个内容 -->
    <el-dialog
      :title="'删除-' + deltitle"
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
  name: "planList",
  data() {
    return {
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      curPage: 1,
      total: 1,
      rules: {
        name: [{ required: true, message: "请填写名称", trigger: "blur" }],
        func_name: [
          { required: true, message: "请填写方法名", trigger: "blur" },
        ],
        desc: [{ required: true, message: "请填写描述", trigger: "blur" }],
        timer: [{ required: true, message: "请填写周期", trigger: "blur" }],
      },
      tableListData: [], //页面表单的内容
      //添加的内容
      addItem: {},
      //修改数据
      currenItem: {},
      currenDeleteRow: "", //当前选中的删除行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      updateDialogTitle: "", //修改框的标题
      deltitle: "", //删除框的标题
      searchValue: "", //搜索的值
      status: "",
      err: "",
      running: "",
      performtk: false,
      //排序
      sort: "",
      order: "",
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //
    lijizxClick() {},
    //筛选
    filterTagTable(data) {
      if (typeof data.status != "undefined" && data.status != "") {
        this.status = Number(data.status[0]);
      } else {
        this.status = "";
      }
      if (typeof data.err != "undefined" && data.err != "") {
        this.err = Number(data.err[0]);
      } else {
        this.err = "";
      }
      if (typeof data.running != "undefined" && data.running != "") {
        this.running = Number(data.running[0]);
      } else {
        this.running = "";
      }
      this.getTableList();
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
    /* 获取列表内容 */
    getTableList() {
      var data = {
        sort: this.sort,
        order: this.order,
        status: this.status,
        err: this.err,
        running: this.running,
        keyword: this.searchValue,
        page: this.curPage,
        page_size: 0,
      };
      this.api.planwork.planListData(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 搜索 */
    searchDatas() {
      this.curPage = 1;
      this.getTableList();
    },
    //统一验证方法
    validation(data) {
      this.$refs["formName"].validate((valid) => {
        if (valid) {
          if (data == 1) {
            this.insertItem();
          } else {
            this.multiUpdate();
          }
        } else {
          return false;
        }
      });
    },
    //打开添加弹框
    insertItemtk() {
      this.insertDialog = true;
    },
    /* 新增保存 */
    insertItem() {
      this.addItem.tag_sort = Number(this.addItem.tag_sort);
      var data = this.addItem;
      this.api.planwork.TagInsert(data).then((res) => {
        this.$refs["formName"].resetFields();
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.getTableList();
        this.insertDialog = false;
      });
    },
    /* 打开修改窗口 */
    openUpdateDialog(row) {
      this.updateDialog = true;
      this.updateDialogTitle = row.name;
      this.currenItem = row;
    },
    /* 修改保存 */
    multiUpdate() {
      //this.currenItem.tag_sort = Number(this.currenItem.tag_sort);
      var data = this.currenItem;
      this.api.planwork.updatePlan(data).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getTableList();
        this.updateDialog = false;
      });
    },
    //立即执行弹框
    performDialog(data) {
      this.deltitle = data.name;
      this.currenDeleteRow = data;
      this.performtk = true;
    },
    //立即执行
    performItem() {
      var data = {
        worker_id: this.currenDeleteRow.worker_id,
      };
      this.api.planwork.runningPlan(data).then((res) => {
        this.$message({
          message: "立即执行成功",
          type: "success",
        });
        this.getTableList();
        this.performtk = false;
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
    openDelDialog(data) {
      this.deltitle = data.tag_name;
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.tag_id);
        this.nameArr.push(item.tag_name);
      });
    },
    /* 删除选项 */
    deleteItem(type) {
      var tag_id = new Array();
      tag_id.push(this.currenDeleteRow.tag_id);
      var id = type === "one" ? tag_id : this.multipleSelection;
      var data = {
        id: id,
      };
      this.api.planwork.TagDelete(data).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getTableList();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
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