<template>
  <div class="shopSet">
    <div class="add-box">
      <div class="btn-nav">
        <el-button type="warning"
                   plain
                   @click="handleRoleBox">返回</el-button>
        <el-button type="danger"
                   @click="batchDelete">删除</el-button>
        <el-button type="primary"
                   @click="insertItemtk">新增</el-button>

        <el-select style="margin-right: 10px"
                   v-model="status"
                   placeholder="请选择状态">
          <el-option key="0"
                     label="停用"
                     value="0"> </el-option>
          <el-option key="1"
                     label="启用"
                     value="1"> </el-option>
        </el-select>
        <el-button type="primary"
                   @click="screening">筛选</el-button>
        <el-button type="info"
                   @click="resetData">重置</el-button>
      </div>
      <div class="so-nav">
        <el-input class="searchInput"
                  placeholder="请输入要搜索的内容"
                  prefix-icon="el-icon-search"
                  v-model="searchValue"
                  @change="searchDatas"></el-input>
        <el-button class="sosuo"
                   type="primary"
                   @click="searchDatas">搜索</el-button>
      </div>
    </div>
    <el-table ref="multipNum"
              stripe
              :data="tableListData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="selectItem">
      <el-table-column type="selection"
                       width="55" />
      <el-table-column label="全选/角色ID"
                       width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name"
                       label="角色名称"
                       width="150" />
      <el-table-column prop="commission"
                       label="提成"
                       width="150" />
      <el-table-column prop="gift_amount"
                       label="赠送额度"
                       width="150" />
      <el-table-column label="员工状态"
                       width="120">
        <template slot-scope="scope">
          <span v-show="scope.row.status == 0">停用</span>
          <span v-show="scope.row.status == 1">正常</span>
        </template>
      </el-table-column>
      <el-table-column align="right"
                       label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="
              openUpdateDialog(
                scope.$index,
                JSON.parse(JSON.stringify(scope.row)),
                'edit'
              )
            ">修改</el-button>
          <el-button size="mini"
                     @click="
              openUpdateDialog(
                scope.$index,
                JSON.parse(JSON.stringify(scope.row)),
                'role'
              )
            ">权限</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="openDelDialog(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination :current-page="curPage"
                     :hide-on-single-page="true"
                     @current-change="pageChange"
                     background
                     layout="prev, pager, next"
                     :total="total"></el-pagination>
    </div>

    <!-- 新增内容 -->
    <el-dialog title="新增"
               :visible.sync="insertDialog">
      <el-form :model="addItem"
               ref="formName"
               label-width="80px"
               class="updateArea">
        <el-form-item label="角色名称"
                      prop="name">
          <el-input v-model="addItem.name" />
        </el-form-item>
        <el-form-item label="提成"
                      prop="commission">
          <el-input v-model="addItem.commission" />(0至99)
        </el-form-item>
        <el-form-item label="赠送额度"
                      prop="gift_amount">
          <el-input v-model="addItem.gift_amount" />
        </el-form-item>
        <el-form-item label="状态"
                      prop="status">
          <el-switch v-model="status_ui"
                     active-color="#13ce66"></el-switch>
        </el-form-item>
        <el-form-item label="是否锁定"
                      prop="lock">
          <el-switch v-model="lock_ui"
                     active-color="#13ce66"></el-switch>
        </el-form-item>
        <el-form-item label="权限设置">
          <el-tree :data="menuData"
                   show-checkbox
                   node-key="id"
                   :default-expand-all="true"
                   ref="tree"
                   :props="defaultProps"></el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="insertDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="insertItem">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改内容 -->
    <el-dialog :title="'修改'"
               :visible.sync="updateDialog">
      <el-form ref="updateArea"
               label-width="80px"
               class="updateArea">
        <el-form-item label="角色名称">
          <el-input v-show="curOpenType == 'edit'"
                    v-model="currenItem.name" />
          <span v-show="curOpenType == 'role'">{{ currenItem.name }}</span>
        </el-form-item>
        <div v-show="curOpenType == 'edit'">
          <el-form-item label="提成">
            <el-input v-model="currenItem.commission" />(0至99)
          </el-form-item>
          <el-form-item label="赠送额度">
            <el-input v-model="currenItem.gift_amount" />
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="status_ui"
                       active-color="#13ce66"></el-switch>
          </el-form-item>
          <el-form-item label="是否锁定">
            <el-switch v-model="lock_ui"
                       active-color="#13ce66"></el-switch>
          </el-form-item>
        </div>
        <div v-show="curOpenType == 'role'">
          <el-form-item label="权限设置">
            <el-tree :data="menuData"
                     show-checkbox
                     node-key="id"
                     :default-expand-all="true"
                     ref="tree"
                     :props="defaultProps"
                     :default-checked-keys="updateQ"></el-tree>
          </el-form-item>
        </div>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="multiUpdate">确定</el-button>
      </span>
    </el-dialog>

    <!-- 删除单个内容 -->
    <el-dialog :title="'删除-' + currenDeleteRow.name"
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
  </div>
</template>

<script>
export default {
  name: "staffRole",
  props: {
    merchants: Object,
  },
  data () {
    return {
      status: "",
      //是否全选权限
      allQL: false,
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
      //组件UI
      status_ui: true,
      lock_ui: false,
      //添加
      addItem: {
        shop_id: "",
        merchant_id: "",
        name: "",
        commission: "",
        gift_amount: "",
        status: 1,
        lock: 0,
        menu_ids: [],
      },
      //修改
      currenItem: {},
      currenDeleteRow: "", //当前选中的删除行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      searchValue: "", //搜索的值
      //树形菜单配置
      defaultProps: {
        children: "children",
        label: "label",
      },
      //权限菜单数据
      menuData: [],
      updateQ: [],
      //打开编辑框类型 编辑内容，还是编辑权限。默认编辑内容
      curOpenType: "edit",
    };
  },
  created () {
    this.addItem.shop_id = Number(this.merchants.shop_id);
    this.addItem.merchant_id = Number(this.merchants.merchant_id);
    this.currenItem.merchant_id = Number(this.merchants.merchant_id);
    this.currenItem.shop_id = Number(this.merchants.shop_id);
    this.getTableList();
    this.menuAllTree();
  },
  methods: {
    handleRoleBox () {
      this.$emit("handleRoleBox", false);
    },
    getCheckedNodes () {
      //返回目前被选中的节点的 key 所组成的数组
      var arr1 = this.$refs.tree.getCheckedKeys();
      var arr2 = this.$refs.tree.getHalfCheckedKeys();
      if (arr2 != "") {
        return arr1.concat(arr2);
      } else {
        return arr1;
      }
    },
    //重置
    resetData () {
      this.status = "";
      this.curPage = 1;
      this.getTableList();
    },
    //筛选
    screening () {
      this.curPage = 1;
      this.getTableList();
    },
    /* 获取表单内容 */
    getTableList () {
      let data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        status: this.status,
        page: this.curPage,
        name: this.searchValue,
      };
      this.api.staff.juesList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 获取权限菜单树型内容 */
    menuAllTree () {
      this.api.staff.menuAllTree().then((res) => {
        this.menuData = res.data.data;
      });
    },
    /* 搜索 */
    searchDatas () {
      this.curPage = 1;
      this.getTableList();
    },
    //打开添加弹框
    insertItemtk () {
      this.insertDialog = true;
      this.status_ui = true;
      this.lock_ui = false;
    },
    /* 新增 */
    insertItem () {
      var data = this.addItem;
      if (this.status_ui) {
        data.status = 1;
      } else {
        data.status = 0;
      }
      if (this.lock_ui) {
        data.lock = 1;
      } else {
        data.lock = 0;
      }
      data.menu_ids = this.getCheckedNodes();
      data.gift_amount = Number(data.gift_amount);
      data.commission = Number(data.commission);
      this.api.staff.juesInsert(data).then((res) => {
        this.$refs["formName"].resetFields();
        this.getTableList();
        this.insertDialog = false;
      });
    },

    /* 打开修改窗口 */
    openUpdateDialog (index, row, t) {
      this.curOpenType = t;
      this.updateDialog = true;
      this.currenItem = row;
      this.permissionsID(this.currenItem.id);
      if (this.currenItem.status == 1) {
        this.status_ui = true;
      } else {
        this.status_ui = false;
      }
      if (this.currenItem.lock == 1) {
        this.lock_ui = true;
      } else {
        this.lock_ui = false;
      }
    },
    //查询角色所拥有的权限菜单树型
    permissionsID (id) {
      var data = {
        role_id: id,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.api.staff.RoleMenuIDList(data).then((res) => {
        var group = res.data.data.menu_id;
        //遍历删除掉1
        for (var i = 0; i < group.length; i++) {
          if (group[i] == 1) {
            group.splice(i, 1);
            break;
          }
        }
        this.updateQ = group;
      });
    },
    /* 修改 */
    multiUpdate () {
      var data = this.currenItem;
      if (this.status_ui) {
        data.status = 1;
      } else {
        data.status = 0;
      }
      if (this.lock_ui) {
        data.lock = 1;
      } else {
        data.lock = 0;
      }
      data.gift_amount = Number(data.gift_amount);
      data.commission = Number(data.commission);
      this.UpdateQ(data.id);
      this.api.staff.juesUpdate(data).then((res) => {
        this.getTableList();
        this.updateDialog = false;
      });
    },
    //修改保存角色的权限菜单
    UpdateQ (id) {
      var data = {
        role_id: id,
        menu_ids: this.getCheckedNodes(),
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.api.staff.setRoleMenu(data).then((res) => { });
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
    openDelDialog (row) {
      this.currenDeleteRow = row;
      this.deleteDialog = true;
    },
    /* 删除选项 */
    deleteItem (type) {
      var id = [];
      if (type == "one") {
        //单删除
        id[0] = this.currenDeleteRow.id;
      } else if (type == "mutil") {
        //多选删除
        id = this.multipleSelection;
      }
      var data = {
        id: id,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.api.staff.juesDelete(data).then((res) => {
        this.getTableList();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
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
    /* 改变页数 */
    pageChange (page) {
      this.curPage = page;
      this.getTableList();
    },
  },
};
</script>

<style scoped>
.el-button--primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
.shopSet {
  margin: 15px;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #dfdfdf;
}
.add-box {
  margin: 10px 0;
  display: flex;
}
.s-title {
  font-size: 14px;
  font-weight: bold;
}
.gz-name {
  padding-top: 10px;
}
.btn-nav {
  flex: 1;
  display: flex;
}
.btnBox {
  display: flex;
  border: 1px solid #dfdfdf;
  background: #f8f8f8;
  height: 40px;
  line-height: 38px;
  border-radius: 3px;
}
.g-btn {
  font-size: 14px;
  color: #2e2e2e;
  float: left;
  width: 70px;
  height: 38px;
  text-align: center;
  cursor: pointer;
}
.jia-btn {
  border-right: 1px solid #dfdfdf;
}
.so-nav {
  display: flex;
}
.sosuo {
  margin-left: 10px;
}
.so-ipt {
  border-color: #cecece;
  margin-left: 10px;
}
.el-input__suffix {
  color: #000 !important;
  font-weight: bold;
}
.pagination {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
}
.el-button--text {
  color: #0a0a0a;
}
.addClassBtn {
  margin-left: 22px;
  width: 104px;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: #dda100;
  margin-bottom: 10px;
  text-align: center;
  border-radius: 25px;
  background: #fff6df;
  border: 1px solid #ffbe11;
}
.shopSet >>> .el-tabs__item.is-active {
  color: #0a0a0a;
}
.shopSet >>> .el-tabs__item:hover {
  color: #0a0a0a;
}
.edit-icon {
  margin-left: 6px;
  color: #dda100;
}
.shopSet >>> .el-tabs--left .el-tabs__header.is-left {
  width: 150px;
}
.shopSet >>> .el-tabs--left.el-tabs--card .el-tabs__nav {
  border-bottom: none;
}
.pagebox {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
</style>