<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <div style="text-align: center; width:140px"><i class="el-icon-plus"
           style="cursor: pointer; font-size:14px"
           @click="butianjiaItemtk">新增部门</i></div>
      <div style="flex:1; margin-left:20px">
        <div class="shanxdiv"
             v-show="is_delete == 0 && multipleSelection == ''">
          <div style="flex:1">
            <el-button class="b-btn"
                       type="success"
                       @click="insertItemtk">新增成员</el-button>
            <el-button class="y-btn"
                       type="info"
                       @click="Therecyclebin">成员回收站</el-button>
          </div>
          <el-button class="y-btn"
                     type="warning"
                     @click="authorization">角色权限</el-button>
          <!-- <el-button class="y-btn" type="warning" @click="bumgli">部门管理</el-button> -->
        </div>
        <div class="shanxdiv"
             v-show="is_delete == 0 && multipleSelection != ''">
          <el-button class="b-btn"
                     type="danger"
                     @click="batchDelete">批量删除</el-button>
          <el-button class="b-btn"
                     type="danger"
                     @click="batchUpdata">批量修改</el-button>
          <el-button class="y-btn"
                     type="warning"
                     @click="toggleSelection()">取消勾选</el-button>
        </div>
        <div class="shanxdiv"
             v-show="is_delete == 1">
          <el-button class="b-btn"
                     type="danger"
                     @click="batchCDSC">彻底删除</el-button>
          <el-button class="b-btn"
                     type="primary"
                     @click="batchHY">还原</el-button>
          <el-button class="b-btn"
                     type="info"
                     @click="Therecyclebin">返回</el-button>
        </div>
      </div>
    </div>
    <div class="glyshengp">
      <div class="youbliq">
        <el-tabs v-model="activeName"
                 type="card"
                 @tab-click="handleClick"
                 tab-position="left">
          <el-tab-pane v-for="item in deptData"
                       :key="item.dept_id"
                       :name="String(item.dept_id)">
            <span slot="label">{{ item.dept_name
              }}<i v-show="activeName == String(item.dept_id)"
                 style="margin-left: 6px; color: #d7a138"
                 class="el-icon-edit-outline"
                 @click="bumUpdateDialog(JSON.parse(JSON.stringify(item)))"></i></span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="youbli">
        <div class="youblidiv">
          <el-table ref="multipNum"
                    stripe
                    :data="tableListData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="selectItem"
                    @sort-change="screeningData"
                    @filter-change="filterTagTable">
            <el-table-column type="selection" />
            <el-table-column sortable="custom"
                             prop="admin_id"
                             label="全选/ID">
              <template slot-scope="scope">
                <span>{{ scope.row.admin_id }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="admin_name"
                             label="名字" />
            <el-table-column prop="admin_account"
                             label="账号" />
            <el-table-column prop="role_name"
                             label="角色" />
            <el-table-column prop="dept_name"
                             label="部门" />
            <el-table-column prop="admin_phone"
                             label="电话" />
            <el-table-column sortable="custom"
                             prop="admin_create_time"
                             label="加入时间" />
            <el-table-column column-key="admin_status"
                             :filters="[
                { text: '停用', value: 0 },
                { text: '正常', value: 1 },
              ]"
                             :filter-multiple="false"
                             label="状态">
              <template slot-scope="scope">
                <span v-show="scope.row.admin_status == 0">停用</span>
                <span v-show="scope.row.admin_status == 1">正常</span>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="操作">
              <template slot-scope="scope">
                <el-button size="mini"
                           type="text"
                           v-show="is_delete == 0"
                           @click="
                    openUpdateDialog(JSON.parse(JSON.stringify(scope.row)))
                  ">编辑</el-button>
                <el-button size="mini"
                           v-show="is_delete == 0"
                           type="text"
                           @click="openDelDialog(scope.row)">删除</el-button>
                <el-button type="text"
                           size="mini"
                           v-show="is_delete == 1"
                           @click="HYtk(scope.row)">还原</el-button>
                <el-button size="mini"
                           v-show="is_delete == 1"
                           type="text"
                           @click="CDSCtk(scope.row)">彻底删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination :current-page="curPage"
                     :hide-on-single-page="true"
                     @current-change="pageChange"
                     background
                     layout="prev, pager, next"
                     :total="total"></el-pagination>
    </div>

    <!-- 新增内容 -->
    <el-dialog title="新增成员"
               :visible.sync="insertDialog"
               width="30%">
      <el-form :model="addItem"
               :rules="rules"
               ref="formName1"
               label-width="120px"
               class="updateArea">
        <el-form-item label="名字"
                      prop="admin_name">
          <el-input v-model="addItem.admin_name"
                    placeholder="请输入成员名字" />
        </el-form-item>
        <el-form-item label="角色"
                      prop="admin_role">
          <el-select v-model="addItem.admin_role"
                     placeholder="请选择">
            <el-option v-for="item in juesData"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门"
                      prop="dept_id">
          <el-select v-model="addItem.dept_id"
                     placeholder="请选择">
            <el-option v-for="item in deptData"
                       :key="item.dept_id"
                       :label="item.dept_name"
                       :value="item.dept_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号"
                      prop="admin_account">
          <el-input v-model="addItem.admin_account"
                    placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码"
                      prop="admin_password">
          <el-input v-model="addItem.admin_password"
                    show-password
                    placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码"
                      prop="admin_password2">
          <el-input v-model="addItem.admin_password2"
                    show-password
                    placeholder="请再次输入密码" />
        </el-form-item>
        <el-form-item label="手机号"
                      prop="admin_phone">
          <el-input v-model="addItem.admin_phone"
                    placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="admin_email">
          <el-input v-model="addItem.admin_email"
                    placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addItem.admin_status"
                     placeholder="请选择">
            <el-option label="停用"
                       :value="0"></el-option>
            <el-option label="正常"
                       :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="resetForm('formName1')">取 消</el-button>
        <el-button type="primary"
                   @click="validation('formName1')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改内容 -->
    <el-dialog :title="'修改-' + updateDialogTitle"
               :visible.sync="updateDialog"
               width="30%">
      <el-form :model="currenItem"
               ref="formName2"
               :rules="rules"
               label-width="120px"
               class="updateArea">
        <el-form-item label="名字"
                      prop="admin_name">
          <el-input v-model="currenItem.admin_name" />
        </el-form-item>
        <el-form-item label="角色"
                      prop="admin_role">
          <el-select v-model="currenItem.admin_role"
                     placeholder="请选择">
            <el-option v-for="item in juesData"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门"
                      prop="dept_id">
          <el-select v-model="currenItem.dept_id"
                     placeholder="请选择">
            <el-option v-for="item in deptData"
                       :key="item.dept_id"
                       :label="item.dept_name"
                       :value="item.dept_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号"
                      prop="admin_account">
          <el-input v-model="currenItem.admin_account" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="currenItem.admin_password"
                    placeholder="请输入新的密码"
                    show-password />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="currenItem.admin_phone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="currenItem.admin_email" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="currenItem.admin_status"
                     placeholder="请选择">
            <el-option label="停用"
                       :value="0"></el-option>
            <el-option label="正常"
                       :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="validation('formName2')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 新增部门 -->
    <el-dialog title="新增部门"
               :visible.sync="bumintx"
               width="30%">
      <el-form :model="addbum"
               ref="formName3"
               label-width="80px"
               class="updateArea">
        <el-form-item label="部门名称"
                      prop="dept_name">
          <el-input v-model="addbum.dept_name" />
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-select v-model="addbum.dept_status" placeholder="请选择">
            <el-option label="停用" :value="0"></el-option>
            <el-option label="正常" :value="1"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="bumintx = false">取 消</el-button>
        <el-button type="primary"
                   @click="butianjia">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改部门 -->
    <el-dialog title="编辑部门"
               :visible.sync="xgbumintx"
               width="30%">
      <el-form :model="currenbum"
               label-width="80px"
               class="updateArea">
        <el-form-item label="部门名称"
                      prop="dept_name">
          <el-input v-model="currenbum.dept_name"
                    clearable />
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-select v-model="currenbum.dept_status" placeholder="请选择">
            <el-option label="停用" :value="0"></el-option>
            <el-option label="正常" :value="1"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="danger"
                   @click="delDept">删 除</el-button>
        <el-button type="primary"
                   @click="bumUpdate">保存</el-button>
        <el-button @click="xgbumintx = false">取 消</el-button>
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

    <!-- 还原单个内容 -->
    <el-dialog :title="'还原-' + deltitle"
               :visible.sync="restoretk"
               width="30%">
      <span>确定要还原此项吗</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="restoretk = false">取 消</el-button>
        <el-button type="primary"
                   @click="RecoveryF('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量还原 -->
    <el-dialog title="还原"
               :visible.sync="plrestoretk"
               width="50%">
      <span class="s-title">确定要彻底删除以下内容吗?</span>
      <div class="gz-name"
           v-for="(item, index) in nameArr"
           :key="index">
        {{ item }}
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="plrestoretk = false">取 消</el-button>
        <el-button type="primary"
                   @click="RecoveryF('mutil')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 彻底删除单个内容 -->
    <el-dialog :title="'彻底删除-' + deltitle"
               :visible.sync="cdsctk"
               width="30%">
      <span>确定要还原此项吗</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="cdsctk = false">取 消</el-button>
        <el-button type="primary"
                   @click="DeleteF('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量彻底删除 -->
    <el-dialog title="彻底删除"
               :visible.sync="pilcdsctk"
               width="50%">
      <span class="s-title">确定要彻底删除以下内容吗?</span>
      <div class="gz-name"
           v-for="(item, index) in nameArr"
           :key="index">
        {{ item }}
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="pilcdsctk = false">取 消</el-button>
        <el-button type="primary"
                   @click="DeleteF('mutil')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 批量修改成员 -->
    <el-dialog title="批量修改成员"
               :visible.sync="banthUpdata"
               width="30%">
      <el-form :model="banthData"
               ref="formName4"
               :rules="rules"
               label-width="120px"
               class="updateArea">
        <el-form-item label="角色"
                      prop="admin_role">
          <el-select v-model="banthData.admin_role"
                     placeholder="请选择">
            <el-option v-for="item in juesData"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门"
                      prop="dept_id">
          <el-select v-model="banthData.dept_id"
                     placeholder="请选择">
            <el-option v-for="item in deptData"
                       :key="item.dept_id"
                       :label="item.dept_name"
                       :value="item.dept_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="banthData.admin_status"
                     placeholder="请选择">
            <el-option label="停用"
                       :value="0"></el-option>
            <el-option label="正常"
                       :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="resetForm('formName4')">取 消</el-button>
        <el-button type="primary"
                   @click="batchUpdataFun('formName4')">迁移</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "currenPage",
  data () {
    return {
      pilcdsctk: false,
      cdsctk: false,
      plrestoretk: false,
      restoretk: false,
      //是否删除 1是 0否
      is_delete: 0,
      xgbumintx: false,
      bumintx: false,
      activeName: "",
      //员工状态
      admin_status: "",
      //部门ID
      dept_id: "",
      //部门数据
      deptData: [],
      //角色数据
      roleData: [],
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      curPage: 1,
      total: 1,
      rules: {
        admin_role: [
          { required: true, message: "请选择角色", trigger: "blur" },
        ],
        admin_name: [
          { required: true, message: "请输入名字", trigger: "blur" },
        ],
        admin_account: [
          { required: true, message: "请输入账号", trigger: "blur" },
        ],
        admin_password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        admin_password2: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
        ],
        admin_phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        dept_id: [
          { required: true, message: "请选择部门", trigger: "change" },
        ],
      },
      tableListData: [], //页面表单的内容
      //添加部门
      addbum: {
        dept_name: "",
        dept_status: 1,
      },
      //修改部门
      currenbum: {
        dept_name: ""
      },
      //添加的内容
      addItem: {
        //角色ID
        admin_role: "",
        //部门ID
        dept_id: "",
        //员工状态 0 停用 1 正常
        admin_status: 1,
      },
      //修改数据
      currenItem: {
        admin_name: "",
        admin_account: "",
        admin_account: "",
        admin_phone: "",
        admin_email: "",
        //角色ID
        admin_role: "",
        //部门ID
        dept_id: "",
        //ID
        admin_id: "",
        //员工状态 0 停用 1 正常
        admin_status: 1,
      },
      currenDeleteRow: "", //当前选中的删除行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      updateDialogTitle: "", //修改框的标题
      deltitle: "", //删除框的标题
      searchValue: "", //搜索的值
      //角色数据
      juesData: "",
      //排序
      sort: "",
      order: "",
      banthUpdata: false,
      banthData: {
        admin_role: '',
        dept_id: '',
        admin_status: 1
      }
    };
  },
  created () {
    this.getBumeng(1);
    this.getJueshe();
  },
  methods: {
    //打开OR关闭回收站
    Therecyclebin () {
      if (this.is_delete == 0) {
        this.is_delete = 1;
      } else {
        this.is_delete = 0;
      }
      this.getTableList();
    },
    //筛选
    filterTagTable (data) {
      if (data.admin_status != "") {
        this.admin_status = Number(data.admin_status[0]);
      } else {
        this.admin_status = "";
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
      this.dept_id = Number(this.activeName);
      this.addItem.dept_id = Number(this.activeName);
      this.banthData.dept_id = Number(this.activeName);
      this.getTableList();
    },
    //获取部门数据
    getBumeng (key) {
      let data = {
        page: 1,
        page_size: 99,
      };
      this.api.adminvip.deptData(data).then((res) => {
        this.deptData = res.data.data;
        this.activeName = String(res.data.data[0].dept_id);
        this.dept_id = res.data.data[0].dept_id;
        this.addItem.dept_id = res.data.data[0].dept_id;
        this.banthData.dept_id = res.data.data[0].dept_id;
        if (key == 1) {
          this.getTableList();
        }
      });
    },
    //获取角色数据
    getJueshe () {
      let data = {
        status: 1,
        page: 1,
        page_size: 99,
      };
      this.api.adminvip.roleData(data).then((res) => {
        this.juesData = res.data.data;
        this.roleData = res.data.data;
      });
    },
    /* 获取列表内容 */
    getTableList () {
      var data = {
        is_delete: this.is_delete,
        admin_status: this.admin_status,
        dept_id: this.dept_id,
        sort: this.sort,
        order: this.order,
        page: this.curPage,
      };
      this.api.adminvip.userData(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    //角色权限
    authorization () {
      this.$router.push({
        path: "/adminRole",
      });
    },
    //部门管理
    bumgli () {
      this.$router.push({
        path: "/adminDept",
      });
    },
    //统一验证方法
    validation (data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          if (data == "formName1") {
            this.insertItem();//新增成员
          } else {
            this.multiUpdate();
          }
        } else {
          return false;
        }
      });
    },
    //打开添加部门弹框
    butianjiaItemtk () {
      this.bumintx = true;
    },
    //新增部门
    butianjia () {
      if (this.addbum.dept_name != "") {
        var data = this.addbum;
        this.api.adminvip.deptInsert(data).then((res) => {
          this.$refs["formName3"].resetFields();
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.getBumeng(0);
          this.bumintx = false;
        });
      } else {
        this.$message({
          message: "请填写部门名称",
          type: "warning",
        });
      }
    },
    //打开修改部门弹框
    bumUpdateDialog (row) {
      this.currenbum = row;
      this.xgbumintx = true;
    },
    //部门修改保存
    bumUpdate () {
      if (this.currenbum.dept_name != "") {
        var data = this.currenbum;
        this.api.adminvip.deptUpdate(data).then((res) => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.getBumeng();
          this.xgbumintx = false;
        });
      } else {
        this.$message({
          message: "请填写部门名称",
          type: "warning",
        });
      }
    },
    //删除部门
    delDept () {
      if (this.tableListData.length != 0) {
        this.$message({
          message: "该部门下还有成员，请移除后再操作！",
          type: "warning",
        });
      } else {
        var data = {
          id: [this.currenbum.dept_id]
        };
        this.api.adminvip.deptDelete(data).then((res) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getBumeng();
          this.xgbumintx = false;
        });
      }
    },
    //打开添加弹框
    insertItemtk () {
      this.insertDialog = true;
    },
    /* 新增保存 */
    insertItem () {
      console.log('新增成员', this.addItem)
      if (this.addItem.admin_password == this.addItem.admin_password2) {
        var data = JSON.parse(JSON.stringify(this.addItem));
        delete data.admin_password2
        this.api.adminvip.userInsert(data).then((res) => {
          this.$refs["formName1"].resetFields();
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.getTableList();
          this.resetForm('formName1')
          // this.insertDialog = false;

        });
      } else {
        this.$message({
          message: "两次密码不一致",
          type: "warning",
        });
      }
    },
    /* 打开修改窗口 */
    openUpdateDialog (row) {
      this.updateDialog = true;
      this.updateDialogTitle = row.admin_name;
      //修改查询
      var data = {
        id: row.admin_id,
      };
      this.api.adminvip.userDetail(data).then((res) => {
        //角色ID
        this.currenItem.admin_role = res.data.data[0].role_id;
        //部门ID
        this.currenItem.dept_id = res.data.data[0].dept_id;
        //ID
        this.currenItem.admin_id = res.data.data[0].admin_id;
        //名称
        this.currenItem.admin_name = res.data.data[0].admin_name;
        //账号
        this.currenItem.admin_account = res.data.data[0].admin_account;
        //手机号
        this.currenItem.admin_phone = res.data.data[0].admin_phone;
        //邮箱
        this.currenItem.admin_email = res.data.data[0].admin_email;
        //状态 0 停用 1 正常
        this.currenItem.admin_status = res.data.data[0].admin_status;
      });
    },
    /* 修改保存 */
    multiUpdate () {
      var data = this.currenItem;
      this.api.adminvip.userUpdate(data).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getTableList();
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
      this.deltitle = data.admin_name;
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    /* 选择表的行 */
    selectItem (val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.admin_id);
        this.nameArr.push(item.admin_name);
      });
    },
    /* 删除选项 */
    deleteItem (type) {
      var admin_id = new Array();
      admin_id.push(this.currenDeleteRow.admin_id);
      var id = type === "one" ? admin_id : this.multipleSelection;
      var data = {
        id: id,
      };
      this.api.adminvip.userDelete(data).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getTableList();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    /* 打开批量恢复框 */
    batchHY () {
      if (this.multipleSelection != "") {
        this.plrestoretk = true;
      } else {
        this.$message({
          message: "请先勾选要还原的数据",
          type: "warning",
        });
      }
    },
    /* 打开恢复框 */
    HYtk (data) {
      this.deltitle = data.admin_name;
      this.currenDeleteRow = data;
      this.restoretk = true;
    },
    /* 恢复 */
    RecoveryF (type) {
      var admin_id = new Array();
      admin_id.push(this.currenDeleteRow.admin_id);
      var id = type === "one" ? admin_id : this.multipleSelection;
      var data = {
        id: id,
      };
      this.api.adminvip.glyRecovery(data).then((res) => {
        this.$message({
          message: "恢复成功",
          type: "success",
        });
        this.getTableList();
        this.plrestoretk = false;
        this.restoretk = false;
      });
    },
    /* 打开批量彻底删除框 */
    batchCDSC () {
      if (this.multipleSelection != "") {
        this.pilcdsctk = true;
      } else {
        this.$message({
          message: "请先勾选要还原的数据",
          type: "warning",
        });
      }
    },
    /* 打开彻底删除框 */
    CDSCtk (data) {
      this.deltitle = data.admin_name;
      this.currenDeleteRow = data;
      this.cdsctk = true;
    },
    /* 彻底删除 */
    DeleteF (type) {
      var admin_id = new Array();
      admin_id.push(this.currenDeleteRow.admin_id);
      var id = type === "one" ? admin_id : this.multipleSelection;
      var data = {
        id: id,
      };
      this.api.adminvip.realDelete(data).then((res) => {
        this.$message({
          message: "彻底删除成功",
          type: "success",
        });
        this.getTableList();
        this.pilcdsctk = false;
        this.cdsctk = false;
      });
    },
    /* 改变页数 */
    pageChange (page) {
      this.curPage = page;
      this.getTableList();
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipNum.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipNum.clearSelection();
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.insertDialog = false
      this.banthUpdata = false
    },
    // 批量修改成员
    batchUpdata () {
      console.log('5555555', this.multipleSelection)
      this.banthUpdata = true
    },
    batchUpdataFun () {
      let data = {
        id: this.multipleSelection,
        dept_id: this.banthData.dept_id,
        role_id: this.banthData.admin_role,
        status: this.banthData.admin_status
      }
      this.api.adminvip.glybatchUpdate(data).then((res) => {
        this.$message({
          message: "批量修改成功",
          type: "success",
        });
        this.getTableList();
        this.resetForm('formName4')
        // this.insertDialog = false;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.y-btn {
  background-color: #fff6df !important;
  border: 1px solid #ffcf4d;
  color: #000;
}
.b-btn {
  background-color: #0a0a0a !important;
  border: 1px solid #0a0a0a;
  color: #ffffff;
}
.youbliq {
  width: 140px;
}
.youbli {
  flex: 1;
  margin-left: 20px;
}
.youblidiv {
  width: 98%;
}
.glyshengp {
  width: 100%;
  display: flex;
}
.shanxdiv {
  display: flex;
  align-items: center;
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
    width: 100% !important;
    .el-input {
      // min-width: 400px !important;
      width: 80% !important;
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
