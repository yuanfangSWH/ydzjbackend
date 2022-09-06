<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <el-button class="b-btn"
                 type="danger"
                 @click="batchDelete">删除</el-button>
      <el-button class="b-btn"
                 type="success"
                 @click="insertItemtk">新增</el-button>
      <div class="searchInput">
        <el-input placeholder="行业/职业名称搜索"
                  prefix-icon="el-icon-search"
                  v-model="searchValue"
                  @change="searchDatas"></el-input>
        <el-button class="b-ss"
                   type="success"
                   @click="searchDatas">搜索</el-button>
      </div>
    </div>
    <div class="shanxdiv">
      <el-tabs v-model="activeName"
               type="card"
               @tab-click="handleClick">
        <el-tab-pane label="行业列表"
                     name="industry"></el-tab-pane>
        <el-tab-pane label="职位列表"
                     name="professional"></el-tab-pane>
      </el-tabs>
    </div>
    <el-table ref="multipNum"
              stripe
              :data="tableListData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="selectItem"
              @sort-change="screeningData"
              @filter-change="filterTagTable">
      <el-table-column type="selection"
                       width="80" />
      <el-table-column sortable="custom"
                       prop="id"
                       label="ID"
                       width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom"
                       prop="name"
                       label="名称"
                       width="250" />
      <el-table-column sortable="custom"
                       prop="sort"
                       label="排序"
                       width="200">
        <template slot-scope="scope">
          <el-input class="input_pxcss"
                    v-model="scope.row.sort"
                    ref="saveTagInput"
                    @blur="
              percentF(JSON.parse(JSON.stringify(scope.row)), scope.$index)
            "
                    v-if="scope.$index === sortingid"></el-input>
          <div class="muzhicss"
               @click="khaki(scope.$index, JSON.parse(JSON.stringify(scope.row)))"
               v-else>
            <span>{{ scope.row.sort }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable="custom"
                       prop="create_time"
                       label="添加时间"
                       width="250" />
      <el-table-column column-key="status"
                       :filters="[
          { text: '禁用', value: 0 },
          { text: '启用', value: 1 },
        ]"
                       :filter-multiple="false"
                       label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">禁用</span>
          <span v-else-if="scope.row.status == 1">启用</span>
        </template>
      </el-table-column>
      <el-table-column align="right"
                       width="150"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     size="mini"
                     @click="openUpdateDialog(JSON.parse(JSON.stringify(scope.row)))">编辑</el-button>
          <el-button type="text"
                     size="mini"
                     @click="openDelDialog(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination :current-page="curPage"
                     :hide-on-single-page="true"
                     @current-change="pageChange"
                     background
                     :page-sizes="[10, 20, 50, 100]"
                     :page-size.sync="page_size"
                     @size-change="handlePageSizeChange"
                     layout="sizes,prev, pager, next,jumper"
                     :total="total"></el-pagination>
    </div>

    <!-- 新增内容 -->
    <el-dialog title="新增"
               :visible.sync="insertDialog">
      <el-form :model="addItem"
               :rules="rules"
               ref="formName"
               label-width="90px"
               class="updateArea">
        <el-form-item label="名称"
                      prop="name">
          <el-input v-model="addItem.name"
                    clearable />
        </el-form-item>
        <el-form-item label="排序"
                      prop="sort">
          <el-input type="Number"
                    v-model="addItem.sort" />
        </el-form-item>
        <el-form-item label="状态"
                      prop="status">
          <el-select v-model="addItem.status"
                     placeholder="请选择">
            <el-option :key="0"
                       label="禁用"
                       :value="0"> </el-option>
            <el-option :key="1"
                       label="开启"
                       :value="1"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="insertDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="validation(1)">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改内容 -->
    <el-dialog :title="'修改-' + updateDialogTitle"
               :visible.sync="updateDialog">
      <el-form :model="currenItem"
               ref="formName"
               label-width="90px"
               class="updateArea">
        <el-form-item label="名称"
                      prop="name">
          <el-input v-model="currenItem.name"
                    clearable />
        </el-form-item>
        <el-form-item label="排序">
          <el-input type="Number"
                    v-model="currenItem.sort" />
        </el-form-item>
        <el-form-item label="状态"
                      prop="status">
          <el-select v-model="currenItem.status"
                     placeholder="请选择">
            <el-option :key="0"
                       label="禁用"
                       :value="0"> </el-option>
            <el-option :key="1"
                       label="开启"
                       :value="1"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="validation(2)">确定</el-button>
      </span>
    </el-dialog>

    <!-- 删除单个内容 -->
    <el-dialog :title="'删除-' + deltitle"
               :visible.sync="deleteDialog"
               width="30%">
      <span>确定要删除此项吗</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteItem('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量删除 -->
    <el-dialog title="删除"
               :visible.sync="mutilDeleteDialog"
               width="50%">
      <span class="s-title">确定要删除以下内容吗?</span>
      <div class="gz-name"
           v-for="(item, index) in nameArr"
           :key="index">
        {{ item }}
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="mutilDeleteDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteItem('mutil')">确定</el-button>
      </span>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
export default {
  name: "currenPage",
  data () {
    return {
      //排序暂存值
      sortData: "",
      //排序输入框渲染值
      sortingid: "",
      activeName: "industry",
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      curPage: 1,
      total: 1,
      page_size: 10,
      rules: {
        name: [{ required: true, message: "请填写名称", trigger: "blur" }],
      },
      tableListData: [], //页面表单的内容
      //添加的内容
      addItem: {
        name: "",
        status: 1,
        type: 0,
        sort: "",
      },
      //修改数据
      currenItem: {},
      currenDeleteRow: "", //当前选中的删除行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      updateDialogTitle: "", //修改框的标题
      deltitle: "", //删除框的标题
      searchValue: "", //搜索的值
      //排序
      sort: "",
      order: "",
      type: 0,
    };
  },
  created () {
    this.getTableList();
  },
  methods: {
    //点击显示输入框
    khaki (index, row) {
      this.sortingid = index;
      this.sortData = row.sort;
      console.log(this.sortData);
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus();
      });
    },
    //排序修改
    percentF (row, index) {
      console.log(!row.sort);
      // 判断非数字类型
      if (typeof Number(row.sort) === "number" && isNaN(Number(row.sort))) {
        this.$message({
          message: "请输入纯数字",
          type: "warning",
        });
        // this.sortingid = "";
        // this.tableListData[index].tag_sort = this.sortData
        return false;
      }
      if (row.sort != "" && this.sortData != row.sort) {
        console.log(111);
        this.currenItem = row;
        this.currenItem.sort = Number(this.currenItem.sort);
        this.api.user.ZhiUpdate(this.currenItem).then((res) => {
          if (res.data.code == 0) {
            this.sortingid = "";
            this.$message({
              message: "修改排序成功",
              type: "success",
            });
          } else {
            this.tableListData[index].sort = this.sortData;
            this.$message({
              message: "修改排序失败",
              type: "warning",
            });
          }
        });
      } else if (!row.sort) {
        // 判断是否为空
        this.sortingid = "";
        this.tableListData[index].sort = this.sortData;
      } else {
        this.sortingid = "";
      }
    },
    //筛选
    filterTagTable (data) {
      if (data.status != "") {
        this.status = Number(data.status[0]);
      } else {
        this.status = "";
      }
      this.getTableList();
    },
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
    //TAB
    handleClick () {
      if (this.activeName == "industry") {
        this.type = 0;
        this.addItem.type = 0;
        this.getTableList();
      } else {
        this.type = 1;
        this.addItem.type = 1;
        this.getTableList();
      }
    },
    /* 获取列表内容 */
    getTableList () {
      var data = {
        status: this.status,
        sort: this.sort,
        order: this.order,
        type: this.type,
        keyword: this.searchValue,
        page: this.curPage,
        page_size: this.page_size,
      };
      this.api.user.Professional(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 搜索 */
    searchDatas () {
      this.curPage = 1;
      this.handleClick();
    },
    //统一验证方法
    validation (data) {
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
    insertItemtk () {
      this.insertDialog = true;
    },
    /* 新增保存 */
    insertItem () {
      this.addItem.sort = Number(this.addItem.sort);
      var data = this.addItem;
      this.api.user.ZhiInsert(data).then((res) => {
        this.$refs["formName"].resetFields();
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.handleClick();
        this.insertDialog = false;
      });
    },
    /* 打开修改窗口 */
    openUpdateDialog (row) {
      this.updateDialog = true;
      this.updateDialogTitle = row.name;
      this.currenItem = row;
    },
    /* 修改保存 */
    multiUpdate () {
      this.currenItem.sort = Number(this.currenItem.sort);
      var data = this.currenItem;
      this.api.user.ZhiUpdate(data).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.handleClick();
        this.updateDialog = false;
      });
    },
    /* 打开批量删除框 */
    batchDelete () {
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
    openDelDialog (data) {
      this.deltitle = data.name;
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    /* 选择表的行 */
    selectItem (val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.id);
        this.nameArr.push(item.name);
      });
    },
    /* 删除选项 */
    deleteItem (type) {
      var staff_id = new Array();
      staff_id.push(this.currenDeleteRow.id);
      var id = type === "one" ? staff_id : this.multipleSelection;
      var data = {
        id: id,
      };
      this.api.user.ZhiDelete(data).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.handleClick();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
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
.b-btn {
  background-color: #0a0a0a !important;
  border: 1px solid #0a0a0a;
  color: #ffffff;
}

.shanxdiv {
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
    display: flex;
    .b-ss {
      float: right;
      margin-left: 10px;
      background-color: #0a0a0a !important;
      border: 1px solid #0a0a0a;
      color: #ffffff;
    }
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
