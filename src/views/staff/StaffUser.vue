<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <el-button
        type="danger"
        @click="batchDelete"
        :disabled="!multipleSelection.length > 0"
        >删除</el-button
      >
      <el-button type="success" @click="insertItemtk">新增</el-button>
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
        v-model="dept_id"
        placeholder="请选择部门"
      >
        <el-option
          v-for="item in deptData"
          :key="item.dept_id"
          :label="item.dept_name"
          :value="item.dept_id"
        >
        </el-option>
      </el-select>
      <el-select
        style="margin-right: 10px"
        v-model="role_id"
        placeholder="请选择角色"
      >
        <el-option
          v-for="item in roleData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-select
        style="margin-right: 10px"
        v-model="staff_status"
        placeholder="请选择状态"
      >
        <el-option key="0" label="停用" value="0"> </el-option>
        <el-option key="1" label="正常" value="1"> </el-option>
      </el-select>
      <el-select
        style="margin-right: 10px"
        v-model="sort"
        placeholder="请选择排序"
      >
        <el-option key="0" label="员工ID" value="staff_id"> </el-option>
        <el-option key="1" label="员工提成" value="staff_commission">
        </el-option>
        <el-option key="2" label="赠送额度" value="staff_gift_amount">
        </el-option>
        <el-option key="3" label="加入时间" value="staff_create_time">
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
      <el-table-column label="全选/员工ID" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.staff_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dept_id" label="部门ID" width="150" />
      <el-table-column prop="dept_name" label="部门名称" width="150" />
      <!-- <el-table-column label="是否锁定" width="120">
        <template slot-scope="scope">
          <span v-show="scope.row.lock_status == 0">正常</span>
          <span v-show="scope.row.lock_status == 1">锁定</span>
          <span v-show="scope.row.lock_status == 2">隐藏</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="role_id" label="角色ID" width="150" />
      <el-table-column prop="role_name" label="角色名称" width="150" />
      <el-table-column
        prop="staff_account"
        label="员工账号（工号）"
        width="150"
      />
      <el-table-column prop="staff_commission" label="员工提成" width="150" />
      <el-table-column prop="staff_create_time" label="加入时间" width="150" />
      <el-table-column prop="staff_gift_amount" label="赠送额度" width="150" />
      <el-table-column prop="staff_name" label="员工名字" width="150" />
      <el-table-column prop="staff_phone" label="员工电话" width="150" />
      <el-table-column label="员工状态" width="120">
        <template slot-scope="scope">
          <span v-show="scope.row.staff_status == 0">停用</span>
          <span v-show="scope.row.staff_status == 1">正常</span>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openUpdateDialog(JSON.parse(JSON.stringify(scope.row)))"
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
        :rules="rules"
        ref="formName1"
        label-width="90px"
        class="updateArea"
      >
        <el-form-item label="部门ID" prop="dept_id">
          <el-select v-model="addItem.dept_id" placeholder="请选择">
            <el-option
              v-for="item in departmentData"
              :key="item.dept_id"
              :label="item.dept_name"
              :value="item.dept_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色ID" prop="role_id">
          <el-select v-model="addItem.role_id" placeholder="请选择">
            <el-option
              v-for="item in juesData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工名称" prop="staff_name">
          <el-input v-model="addItem.staff_name" />
        </el-form-item>
        <el-form-item label="员工账号" prop="staff_account">
          <el-input v-model="addItem.staff_account" />
        </el-form-item>
        <el-form-item label="密码" prop="staff_password">
          <el-input v-model="addItem.staff_password" />
        </el-form-item>
        <el-form-item label="手机号" prop="staff_phone">
          <el-input v-model="addItem.staff_phone" />
        </el-form-item>
        <el-form-item label="员工提成" prop="staff_commission">
          <el-input v-model="addItem.staff_commission" />&nbsp;
          (示例：10表示10%)
        </el-form-item>
        <el-form-item label="赠送额度" prop="staff_gift_amount">
          <el-input v-model="addItem.staff_gift_amount" />
        </el-form-item>
        <el-form-item label="员工状态" prop="staff_status">
          <el-switch
            v-model="staff_status_ui"
            active-color="#13ce66"
          ></el-switch>
        </el-form-item>
        <!-- <el-form-item label="是否锁定" prop="lock">
          <el-switch v-model="lock_ui" active-color="#13ce66"></el-switch>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertDialog = false">取 消</el-button>
        <el-button type="primary" @click="validation('formName1')"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改内容 -->
    <el-dialog
      :title="'修改-' + updateDialogTitle"
      :visible.sync="updateDialog"
    >
      <el-form
        :model="currenItem"
        ref="formName2"
        label-width="90px"
        class="updateArea"
      >
        <el-form-item label="部门ID" prop="dept_id">
          <el-select v-model="currenItem.dept_id" placeholder="请选择">
            <el-option
              v-for="item in departmentData"
              :key="item.dept_id"
              :label="item.dept_name"
              :value="item.dept_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色ID" prop="role_id">
          <el-select v-model="currenItem.role_id" placeholder="请选择">
            <el-option
              v-for="item in juesData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工名称" prop="staff_name">
          <el-input v-model="currenItem.staff_name" />
        </el-form-item>
        <el-form-item label="员工账号" prop="staff_account">
          <el-input v-model="currenItem.staff_account" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="currenItem.staff_password"
            placeholder="请输入新的密码"
          />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="currenItem.staff_phone" />
        </el-form-item>
        <el-form-item label="员工提成">
          <el-input v-model="currenItem.staff_commission" />&nbsp;
          (示例：10表示10%)
        </el-form-item>
        <el-form-item label="赠送额度">
          <el-input v-model="currenItem.staff_gift_amount" />
        </el-form-item>
        <el-form-item label="员工状态">
          <el-switch
            v-model="staff_status_ui"
            active-color="#13ce66"
          ></el-switch>
        </el-form-item>
        <el-form-item label="是否锁定">
          <el-switch v-model="lock_ui" active-color="#13ce66"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="validation('formName2')"
          >确定</el-button
        >
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
      // 商家/店铺ID
      merchants: {
        shop_id: 0,
        merchant_id: 0,
      },
      sort: "",
      staff_status: "",
      //部门ID
      dept_id: "",
      deptData: [],
      //角色ID
      role_id: "",
      roleData: [],
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      curPage: 1,
      total: 1,
      rules: {
        dept_id: [{ required: true, message: "请选择部门", trigger: "blur" }],
        role_id: [{ required: true, message: "请选择角色", trigger: "blur" }],
        staff_name: [
          { required: true, message: "请输入员工名称", trigger: "blur" },
        ],
        staff_account: [
          { required: true, message: "请输入员工账号", trigger: "blur" },
        ],
        staff_password: [
          { required: true, message: "请输入员工密码", trigger: "blur" },
        ],
      },
      tableListData: [], //页面表单的内容
      //添加的内容
      addItem: {
        //商家ID
        shop_id: "",
        //店铺ID
        merchant_id: "",
        //角色ID
        role_id: "",
        //部门ID
        dept_id: "",
        //员工名称
        staff_name: "",
        //员工账号
        staff_account: "",
        //密码
        staff_password: "",
        //手机号
        staff_phone: "",
        //员工提成 15表示15%
        staff_commission: "",
        //赠送额度
        staff_gift_amount: "",
        //员工状态 0 停用 1 正常
        staff_status: 1,
        //是否锁定 0正常 1锁定
        lock: 0,
      },
      //组件控制UI
      staff_status_ui: true,
      lock_ui: false,
      //修改数据
      currenItem: {
        //商家ID
        shop_id: "",
        //店铺ID
        merchant_id: "",
        //角色ID
        role_id: "",
        //部门ID
        dept_id: "",
        //员工ID
        staff_id: "",
        //员工名称
        staff_name: "",
        //员工账号
        staff_account: "",
        //密码
        staff_password: "",
        //手机号
        staff_phone: "",
        //员工提成 15表示15%
        staff_commission: "",
        //赠送额度
        staff_gift_amount: "",
        //员工状态 0 停用 1 正常
        staff_status: 1,
        //是否锁定 0正常 1锁定
        lock: 0,
      },
      currenDeleteRow: "", //当前选中的删除行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      updateDialogTitle: "", //修改框的标题
      deltitle: "", //删除框的标题
      searchValue: "", //搜索的值
      //部门数据
      departmentData: "",
      //角色数据
      juesData: "",
    };
  },
  created() {
    this.merchants.shop_id = Number(this.$route.query.shop_id);
    this.merchants.merchant_id = Number(this.$route.query.merchant_id);
    this.addItem.shop_id = Number(this.$route.query.shop_id);
    this.addItem.merchant_id = Number(this.$route.query.merchant_id);
    this.getTableList();
    this.getBumeng();
    this.getJueshe();
  },
  methods: {
    //重置
    resetData() {
      this.dept_id = "";
      this.role_id = "";
      this.staff_status = "";
      this.sort = "";
      this.curPage = 1;
      this.getTableList();
    },
    //筛选
    screening() {
      this.curPage = 1;
      this.getTableList();
    },
    //获取部门数据
    getBumeng() {
      let data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page: 1,
        page_size: 99,
      };
      this.api.staff.deptList(data).then((res) => {
        this.departmentData = res.data.data;
        this.deptData = res.data.data;
      });
    },
    //获取角色数据
    getJueshe() {
      let data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page: 1,
        page_size: 99,
      };
      this.api.staff.juesList(data).then((res) => {
        this.juesData = res.data.data;
        this.roleData = res.data.data;
      });
    },
    /* 获取列表内容 */
    getTableList() {
      var data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        dept_id: this.dept_id,
        role_id: this.role_id,
        staff_status: this.staff_status,
        sort: this.sort,
        page: this.curPage,
        name: this.searchValue,
      };
      this.api.staff.userList(data).then((res) => {
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
      this.$refs[data].validate((valid) => {
        if (valid) {
          if (data == "formName1") {
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
      this.staff_status_ui = true;
      this.lock_ui = false;
    },
    /* 新增保存 */
    insertItem() {
      if (this.staff_status_ui) {
        this.addItem.staff_status = 1;
      } else {
        this.addItem.staff_status = 0;
      }
      if (this.lock_ui) {
        this.addItem.lock = 1;
      } else {
        this.addItem.lock = 0;
      }
      this.addItem.staff_commission = Number(this.addItem.staff_commission);
      this.addItem.staff_gift_amount = Number(this.addItem.staff_gift_amount);
      var data = this.addItem;
      this.api.staff.userInsert(data).then((res) => {
        this.$refs["formName1"].resetFields();
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
      this.updateDialogTitle = row.staff_name;
      //修改查询
      var data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: row.staff_id,
      };
      this.api.staff.userDetail(data).then((res) => {
        //商家ID
        this.currenItem.shop_id = res.data.data[0].shop_id;
        //店铺ID
        this.currenItem.merchant_id = res.data.data[0].merchant_id;
        //角色ID
        this.currenItem.role_id = res.data.data[0].role_id;
        //部门ID
        this.currenItem.dept_id = res.data.data[0].dept_id;
        //员工ID
        this.currenItem.staff_id = res.data.data[0].staff_id;
        //员工名称
        this.currenItem.staff_name = res.data.data[0].staff_name;
        //员工账号
        this.currenItem.staff_account = res.data.data[0].staff_account;
        //手机号
        this.currenItem.staff_phone = res.data.data[0].staff_phone;
        //员工提成 15表示15%
        this.currenItem.staff_commission = res.data.data[0].staff_commission;
        //赠送额度
        this.currenItem.staff_gift_amount = res.data.data[0].staff_gift_amount;
        //员工状态 0 停用 1 正常
        this.currenItem.staff_status = res.data.data[0].staff_status;
        //是否锁定 0正常 1锁定
        this.currenItem.lock = res.data.data[0].lock;
        if (this.currenItem.staff_status == 1) {
          this.staff_status_ui = true;
        } else {
          this.staff_status_ui = false;
        }
        if (this.currenItem.lock == 1) {
          this.lock_ui = true;
        } else {
          this.lock_ui = false;
        }
      });
    },
    /* 修改保存 */
    multiUpdate() {
      if (this.staff_status_ui) {
        this.currenItem.staff_status = 1;
      } else {
        this.currenItem.staff_status = 0;
      }
      if (this.lock_ui) {
        this.currenItem.lock = 1;
      } else {
        this.currenItem.lock = 0;
      }
      this.currenItem.staff_commission = Number(this.addItem.staff_commission);
      this.currenItem.staff_gift_amount = Number(
        this.addItem.staff_gift_amount
      );
      var data = this.currenItem;
      this.api.staff.userUpdate(data).then((res) => {
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
      this.deltitle = data.staff_name;
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.staff_id);
        this.nameArr.push(item.staff_name);
      });
    },
    /* 删除选项 */
    deleteItem(type) {
      var staff_id = new Array();
      staff_id.push(this.currenDeleteRow.staff_id);
      var id = type === "one" ? staff_id : this.multipleSelection;
      var data = {
        id: id,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.api.staff.userDelete(data).then((res) => {
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
