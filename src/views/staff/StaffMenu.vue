<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <!-- <el-button type="danger" @click="batchDelete">删除</el-button>
            <el-button type="danger" @click="insertDialog = true">新增</el-button>
      <el-button type="danger" @click="batchDelete">批量修改</el-button>-->
      <el-input
        class="searchInput"
        placeholder="请输入要搜索的内容"
        prefix-icon="el-icon-search"
        v-model="searchValue"
        @change="searchDatas"
      ></el-input>
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
      <el-table-column label="全选/ID" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="150" />
      <el-table-column prop="status" label="状态" width="150">
        <template slot-scope="scope">
          <i v-show="scope.row.status === 1" class="el-icon-check"></i>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作">
        <!-- <template slot-scope="scope">
                 <el-button size="mini" @click="openUpdateDialog(scope.$index, scope.row,'type')">修改</el-button>
                <el-button size="mini" type="danger" @click="openDelDialog(scope.row)">删除</el-button>
        </template>-->
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="curPage"
        :hide-on-single-page="true"
        @prev-click="pageChange(curPage - 1)"
        @current-change="pageChange"
        @next-click="pageChange(curPage + 1)"
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
        <el-form-item label="新增项一">
          <el-input v-model="addItem.name" />
        </el-form-item>
        <el-form-item label="新增项二">
          <el-input v-model="addItem.status" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="insertDialog = false">取 消</el-button>
        <el-button type="primary" @click="insertItem">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量修改内容 -->
    <el-dialog title="批量修改" :visible.sync="mutilUpdateDialog">
      <span class="s-title">已选：</span>
      <span class="gz-name" v-for="(item, index) in nameArr" :key="index">{{
        item
      }}</span>

      <el-form ref="updateArea" label-width="80px" class="updateArea">
        <el-form-item label="批量修改项一">
          <el-input v-model="batchUpdateData.item" />
        </el-form-item>
        <el-form-item label="批量修改项二">
          <el-input v-model="batchUpdateData.item" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="mutilUpdateDialog = false">取 消</el-button>
        <el-button type="primary" @click="multiUpdate">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改内容 -->
    <el-dialog :title="updateDialogTitle" :visible.sync="updateDialog">
      <el-form ref="updateArea" label-width="80px" class="updateArea">
        <el-form-item label="修改项一">
          <el-input v-model="batchUpdateData.item" />
        </el-form-item>
        <el-form-item label="修改项二">
          <el-input v-model="batchUpdateData.item" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="multiUpdate">确定</el-button>
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
  name: "currenPage",
  data() {
    return {
      mutilUpdateDialog: false, //打开批量修改框
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      curPage: 1,
      total: 13,
      rulesForm: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        brand: [{ required: true, message: "请输入人数", trigger: "blur" }],
        info: [{ required: true, message: "请输入描述信息", trigger: "blur" }],
        times: [{ required: true, message: "请输入打印联数", trigger: "blur" }],
        key: [{ required: true, message: "请输入终端密钥", trigger: "blur" }],
        custom_info: [
          { required: true, message: "请输入自定义信息", trigger: "blur" },
        ],
      },
      tableListData: [
        { id: 1, name: "hahah", status: 1 },
        { id: 2, name: "hahah", status: 1 },
        { id: 3, name: "hahah", status: 1 },
        { id: 4, name: "hahah", status: 1 },
        { id: 5, name: "hahah", status: 1 },
        { id: 6, name: "hahah", status: 1 },
        { id: 7, name: "hahah", status: 1 },
        { id: 8, name: "hahah", status: 1 },
      ], //页面表单的内容
      addItem: { id: "", name: "", status: "" }, //当前选中的项
      currenItem: { id: 1, name: "hahah", status: 1 }, //当前选中的项
      batchUpdateData: { item: "" }, //批量修改
      currenDeleteRow: "", //当前选中的删除行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      updateDialogTitle: "", //修改框的标题
      deltitle: "", //删除框的标题
      searchValue: "", //搜索的值
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    /* 获取表单内容 */
    getTableList() {
      var data = { name: this.searchValue, page: this.curPage };
      this.api.staff.staffMenu(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 搜索 */
    searchDatas() {
      this.curPage = 1;
      this.getTableList();
    },
    /* 删除选项 */
    deleteItem(type) {
      const datas =
        type === "one"
          ? { id: this.currenDeleteRow.printer_id }
          : { id: this.multipleSelection };
      this.$store.dispatch("staff/deleteItem", datas).then((res) => {
        this.getTableList(this.curPage);
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    /* 新增 */
    insertItem() {
      const datas = this.addItem;
      this.$store.dispatch("staff/insertItem", datas).then((res) => {
        this.$refs["formName"].resetFields();
        this.getTableList(this.curPage);
        this.insertDialog = false;
      });
    },
    /* 批量修改 */
    multiUpdate() {
      const datas = this.currenItem;
      this.$store.dispatch("staff/updateItem", datas).then((res) => {
        this.getTableList(this.curPage);
        this.updateDialog = false;
      });
    },
    /* 打开批量删除框 */
    batchDelete() {
      if (this.multipleSelection) {
        this.mutilDeleteDialog = true;
      } else {
        this.$message({
          message: "请先勾选要删除的打印机",
          type: "warning",
        });
      }
    },
    /* 打开删除框 */
    openDelDialog(item) {
      this.deltitle = item.name;
      this.currenDeleteRow = item;
      this.deleteDialog = true;
    },
    /* 打开修改窗口 */
    openUpdateDialog(index, row) {
      this.updateDialog = true;
      this.updateDialogTitle = "修改-" + row.name;
      this.currenItem = {
        id: row.id,
        name: row.name,
      };
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.id);
        this.nameArr.push(item.name);
      });
    },
    /* 改变页数 */
    pageChange(page) {
      this.curPage = page;
      this.getTableList(this.curPage);
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
}
</style>
