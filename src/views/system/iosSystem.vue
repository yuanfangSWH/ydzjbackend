<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <el-button class="b-btn" type="success" @click="insertItemtk"
        >新增</el-button
      >
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
      <el-table-column label="全选/选项ID" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.opt_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="product_id" label="苹果商品ID" width="250" />
      <el-table-column prop="amount" label="充值金额" width="150" />
      <el-table-column prop="currency" label="获得Y币" width="150" />
      <el-table-column prop="give" label="赠送Y币" width="150" />
      <el-table-column label="启用赠送" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">关闭</span>
          <span v-else-if="scope.row.status == 1">启用</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="250" />
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="openUpdateDialog(JSON.parse(JSON.stringify(scope.row)))"
            >编辑</el-button
          >
          <el-button size="mini" type="text" @click="openDelDialog(scope.row)"
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
        :rules="rules"
        ref="formName"
        label-width="150px"
        class="updateArea"
      >
        <el-form-item label="苹果商品ID" prop="product_id">
          <el-input v-model="addItem.product_id" clearable />
        </el-form-item>
        <el-form-item label="充值金额" prop="amount">
          <el-input type="Number" v-model="addItem.amount" clearable />
        </el-form-item>
        <el-form-item label="获得Y币" prop="currency">
          <el-input type="Number" v-model="addItem.currency" clearable />
        </el-form-item>
        <el-form-item label="赠送Y币" prop="give">
          <el-input type="Number" v-model="addItem.give" clearable />
        </el-form-item>
        <el-form-item label="启用赠送" prop="status">
          <el-select v-model="addItem.status" placeholder="请选择">
            <el-option key="0" label="关闭" :value="0"></el-option>
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
        <el-form-item label="苹果商品ID" prop="product_id">
          <el-input v-model="currenItem.product_id" clearable />
        </el-form-item>
        <el-form-item label="充值金额" prop="amount">
          <el-input type="Number" v-model="currenItem.amount" clearable />
        </el-form-item>
        <el-form-item label="获得Y币" prop="currency">
          <el-input type="Number" v-model="currenItem.currency" clearable />
        </el-form-item>
        <el-form-item label="赠送Y币" prop="give">
          <el-input type="Number" v-model="currenItem.give" clearable />
        </el-form-item>
        <el-form-item label="启用赠送" prop="status">
          <el-select v-model="currenItem.status" placeholder="请选择">
            <el-option key="0" label="关闭" :value="0"></el-option>
            <el-option key="1" label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="validation(2)">确定</el-button>
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
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      curPage: 1,
      total: 1,
      rules: {
        product_id: [
          { required: true, message: "请填写苹果商品ID", trigger: "blur" },
        ],
        amount: [
          { required: true, message: "请填写充值金额", trigger: "blur" },
        ],
        currency: [
          { required: true, message: "请填写获得Y币", trigger: "blur" },
        ],
        give: [{ required: true, message: "请填写赠送Y币", trigger: "blur" }],
        status: [
          { required: true, message: "请选择赠送状态", trigger: "blur" },
        ],
      },
      tableListData: [], //页面表单的内容
      //添加的内容
      addItem: {
        status: 1,
      },
      //修改数据
      currenItem: {},
      currenDeleteRow: "", //当前选中的删除行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      updateDialogTitle: "", //修改框的标题
      deltitle: "", //删除框的标题
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    /* 获取列表内容 */
    getTableList() {
      this.api.system.rechargeList("").then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
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
      this.addItem.amount = Number(this.addItem.amount);
      this.addItem.currency = Number(this.addItem.currency);
      this.addItem.give = Number(this.addItem.give);
      var data = this.addItem;
      this.api.system.rechargeInsert(data).then((res) => {
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
      this.updateDialogTitle = row.product_id;
      this.currenItem = row;
    },
    /* 修改保存 */
    multiUpdate() {
      this.currenItem.amount = Number(this.currenItem.amount);
      this.currenItem.currency = Number(this.currenItem.currency);
      this.currenItem.give = Number(this.currenItem.give);
      var data = this.currenItem;
      this.api.system.rechargeUpdate(data).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
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
    openDelDialog(data) {
      this.deltitle = data.product_id;
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.opt_id);
        this.nameArr.push(item.product_id);
      });
    },
    /* 删除选项 */
    deleteItem(type) {
      var opt_id = new Array();
      opt_id.push(this.currenDeleteRow.opt_id);
      var id = type === "one" ? opt_id : this.multipleSelection;
      var data = {
        id: id,
      };
      this.api.system.rechargeDelete(data).then((res) => {
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
