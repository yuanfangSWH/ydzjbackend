<template>
  <div>
    <div class="shopSet" v-if="!showRoleBox">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-card
            ><div class="goods-class-list-left" @click="addNewDept">
              <i class="el-icon-plus">新建部门</i>
            </div>
          </el-card>
          <el-card :shadow="dept_id == 0 ? 'never' : 'always'"
            ><div
              :class="
                'goods-class-list-left' +
                (dept_id == 0 ? ' goods-class-list-selected' : '')
              "
              @click="tabFun(0)"
            >
              <i class="el-icon-folder-opened">显示全部</i>
            </div>
          </el-card>
          <!-- <el-card :shadow="'never'">
            <div
              @click="tabFun(0)"
              class="goods-class-list-left goods-class-list-selected"
            >
              全部
            </div>
          </el-card> -->

          <draggable
            class="list-group"
            v-model="deptListData"
            :options="{ animation: 20 }"
            @change="draggableChangeClass"
          >
            <el-card
              v-for="(item, index) in deptListData"
              :key="'class' + index"
              :shadow="dept_id == item.dept_id ? 'never' : 'always'"
            >
              <div
                @click="tabFun(item.dept_id)"
                :class="
                  'goods-class-list-left' +
                  (dept_id == item.dept_id
                    ? ' goods-class-list-selected'
                    : '') +
                  (item.dept_status != 1 ? ' shixiao' : '')
                "
              >
                {{ item.dept_name }}
              </div>
              <i
                class="el-icon-edit"
                style="float: right; color: #dda100; cursor: pointer"
                v-if="dept_id == item.dept_id"
                @click="editClass(item)"
              ></i>
              <!-- <span class="goods-class-list-right" v-if="item.dept_status == 1">
                <el-button
                  type="warning"
                  size="mini"
                  @click="changeStatusClass(item, false)"
                  >禁用</el-button
                >
              </span>
              <span class="goods-class-list-right" v-if="item.dept_status == 0">
                <el-button type="" size="mini" @click="editClass(item)"
                  >编辑</el-button
                >
                <el-button
                  type=""
                  size="mini"
                  @click="changeStatusClass(item, true)"
                  >启用</el-button
                >
              </span> -->
            </el-card>
          </draggable>
        </el-col>
        <el-col :span="20"
          ><div class="add-box">
            <div v-if="!is_delete" class="btn-nav">
              <el-button type="primary" @click="handleNewStaff"
                >新增员工</el-button
              >
              <el-button
                type="primary"
                :disabled="!multipleSelection.length > 0"
                @click="handleDeleteStaff"
                >删除</el-button
              >
              <el-button type="warning" @click="handleDeleteBox(true)" plain
                >回收站</el-button
              >
              <el-button type="warning" plain @click="handleRoleBox"
                >角色权限</el-button
              >
            </div>
            <div v-if="is_delete" class="btn-nav">
              <el-button
                type="primary"
                @click="handleRecoveryStaff"
                :disabled="!multipleSelection.length > 0"
                >还原</el-button
              >
              <el-button type="warning" plain @click="handleDeleteBox(false)"
                >返回</el-button
              >
            </div>
            <div class="so-nav">
              <el-input
                class="so-ipt"
                placeholder="请输入员工名称"
                suffix-icon="el-icon-search"
                v-model="soVal"
                @change="getAllStaff(0, 1)"
              >
              </el-input>
              <el-button class="sosuo" type="primary" @click="getAllStaff(0, 1)"
                >搜索</el-button
              >
            </div>
          </div>
          <staff-item
            :options="staffListData"
            :merchants="merchants"
            :is-delete="is_delete"
            @editStaff="handleEditStaff"
            @deleteFun="deleteStaff"
            @recoveryFun="recoveryStaff"
            @sortFun="sortStaff" />
          <div class="pagebox">
            <el-pagination
              ref="pagination"
              :hide-on-single-page="value"
              background
              layout="prev, pager, next,jumper"
              :total="count"
              @current-change="pageChange"
            >
            </el-pagination></div
        ></el-col>
      </el-row>
      <el-dialog
        :title="staffForm.staff_id == 0 ? '新建员工' : '编辑员工'"
        :visible.sync="staffDialog"
        destroy-on-close
        :close-on-click-modal="false"
      >
        <el-form
          :model="staffForm"
          ref="staffForm"
          label-width="80px"
          class="addType"
          :rules="staffRules"
        >
          <el-form-item label="姓名" prop="staff_name">
            <el-input v-model="staffForm.staff_name" />
          </el-form-item>
          <el-form-item label="手机" prop="staff_phone">
            <el-input v-model="staffForm.staff_phone" />
          </el-form-item>
          <el-form-item label="工号" prop="staff_account">
            <el-input
              placeholder="请输入内容"
              v-model="staffForm.staff_account"
            >
              <template slot="prepend">YD</template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="staff_password">
            <el-input v-model="staffForm.staff_password" />
          </el-form-item>
          <el-form-item label="部门" prop="dept_id">
            <el-select v-model="staffForm.dept_id" placeholder="请选择">
              <el-option
                v-for="item in deptListData"
                :key="item.dept_id"
                :label="item.dept_name"
                :value="item.dept_id"
              >
              </el-option>
            </el-select>
            <el-button @click="addNewDept" icon="el-icon-plus"></el-button>
          </el-form-item>
          <el-form-item label="角色" prop="role_id">
            <el-select v-model="staffForm.role_id" placeholder="请选择">
              <el-option
                v-for="item in roleListData"
                :key="item.role_id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提成" prop="staff_commission">
            <el-input v-model.number="staffForm.staff_commission">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="赠送金额" prop="staff_gift_amount">
            <el-input v-model.number="staffForm.staff_gift_amount" />
            <div>注：每月自动重置。</div>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch
              v-model="staffForm.staff_status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <div style="text-align: right">
            <el-button type="" @click="staffDialog = false">取消</el-button>
            <el-button type="primary" @click="submitStaff" :loading="isLoading"
              >保存</el-button
            >
          </div>
        </el-form>
      </el-dialog>

      <el-dialog
        :title="deptForm.dept_id == 0 ? '新建部门' : '编辑部门'"
        :visible.sync="deptDialog"
      >
        <el-form
          :model="deptForm"
          ref="deptForm"
          label-width="80px"
          class="addType"
          :rules="deptRules"
        >
          <el-form-item label="部门名称" prop="dept_name">
            <el-input v-model="deptForm.dept_name" />
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch
              v-model="deptForm.dept_status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <div style="text-align: right">
            <el-button type="" @click="deptDialog = false">取消</el-button>
            <el-button
              v-if="deptForm.dept_id > 0"
              type="danger"
              @click="deleteDept"
              >删除</el-button
            >
            <el-button type="primary" @click="submitDept" :loading="isLoading"
              >提交</el-button
            >
          </div>
        </el-form>
      </el-dialog>
    </div>
    <staff-role
      :merchants="merchants"
      v-if="showRoleBox && enable"
      @handleRoleBox="handleRoleBox"
    />
  </div>
</template>
<script>
import staffItem from "./staffItem";
import staffRole from "./staffRole";
import _ from "lodash";
export default {
  name: "staffMain",
  components: { staffItem, staffRole },
  data() {
    return {
      showRoleBox: false,
      isLoading: false,
      deptDialog: false,
      staffDialog: false,
      soVal: "",
      options: [],
      multipleSelection: [],
      value: true,
      page: 1,
      count: 0,
      detaileData: [],
      title: "",
      gb_id: 0,
      is_delete: false,
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
      order: "",
      sort: "",
      deptRules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        sort: [
          { required: true, message: "必须排序", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
      },
      staffRules: {
        staff_name: [
          { required: true, message: "请输入名称", trigger: "blur" },
        ],
        staff_phone: [
          { required: true, message: "请输入手机", trigger: "blur" },
        ],
        staff_account: [
          { required: true, message: "请输入工号", trigger: "blur" },
        ],
        dept_id: [{ required: true, message: "请选择部门", trigger: "blur" }],
        role_id: [{ required: true, message: "请选择角色", trigger: "blur" }],
        min_people_num: [
          { required: true, message: "请输入最少人数", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        staff_commission: [
          { required: true, message: "请输入提成", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        staff_gift_amount: [
          { required: true, message: "请输入可赠送金额", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
      },
      deptForm: {
        dept_id: 0,
        dept_name: "",
        dept_status: 1,
      },
      staffForm: {
        staff_id: 0,
        staff_name: "",
        staff_phone: "",
        staff_account: "",
        staff_password: "",
        dept_id: null,
        role_id: null,
        staff_commission: null,
        staff_gift_amount: 0,
        staff_status: 1,
      },
      deptListData: [],
      roleListData: [],
      staffListData: [],
      dept_id: 0,
      editableTabsValue: "0",
      tabStatus: "0",
    };
  },
  props: {
    merchants: Object,
    enable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    draggableChangeClass(obj) {
      let classSort = [];
      for (let i in this.deptListData) {
        this.deptListData[i].dept_sort = this.deptListData.length - 1 - i;
        classSort.push({
          dept_id: this.deptListData[i].dept_id,
          dept_sort: Number(this.deptListData[i].dept_sort),
        });
      }
      let datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        dept: classSort,
      };
      this.api.staff.deptSetSort(datas).then(({ data }) => {
        let res = data.data;
        this.getDept();
      });
    },

    //打开角色界面
    handleRoleBox() {
      this.showRoleBox = !this.showRoleBox;
      console.info(this.showRoleBox);
      if (!this.showRoleBox) {
        this.getRole(); //重载角色
      }
    },
    handleEditStaff(row) {
      console.info(row);

      this.staffForm = row;
      this.isLoading = false;
      this.staffDialog = true;
    },
    editDept(obj) {
      this.isLoading = false;
      this.deptForm = obj;
      this.deptDialog = true;
    },
    tabFun(dept_id) {
      this.dept_id = Number(dept_id);
      if (this.dept_id > 0) {
        this.getAllStaff(this.dept_id);
      } else if (this.dept_id == 0) {
        this.getAllStaff(0);
      } else {
      }
    },

    /**
     * @description: 新增部门。弹出新增部门对话框，并初始化新增部门数据
     * @return void
     */
    addNewDept() {
      this.deptForm = {
        dept_id: 0,
        dept_name: "",
        dept_status: 1,
      };
      this.deptDialog = true;
    },

    /**
     * @description: 获得部门数据，并赋给this.deptListData
     * @param {Function} fun 获得数据后回调函数
     * @return void
     */
    getDept(fun) {
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        //dept_status: 1,
      };
      this.api.staff.deptList(datas).then(({ data }) => {
        let res = data;
        this.deptListData = res.data;
        // this.deptListData.forEach((item, index) => {
        //   if (index == 0) {
        //     this.dept_id = item.dept_id;
        //     //this.editableTabsValue = item.dept_id + "";
        //   }
        //   item.dept_id = item.dept_id;
        // });
        this.editableTabsValue = "0";
        if (fun) fun();
      });
    },

    /**
     * @description: 获得指定部门ID的员工数据，并赋给 this.staffListData
     * @param {Number} deptId 部门ID
     * @return void
     */
    getAllStaff(deptId, p) {
      if (Number(p) > 0) {
        this.page = p;
      }
      let datas = {
        page: this.page,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        sort: this.sort,
        order: this.order,
        dept_id: deptId,
        query: this.soVal,
      };
      if (deptId == 0) {
        delete datas.dept_id;
      }
      if (this.is_delete) {
        datas.is_delete = 1;
      } else {
        delete datas.is_delete;
      }
      this.api.staff.userList(datas).then(({ data }) => {
        let res = data;
        this.staffListData = res.data;
        this.count = res.count;
        this.$refs.pagination.internalCurrentPage = this.page;
        if (this.staffListData) {
          //计算金额
          for (var i = 0; i < this.staffListData.length; i++) {
            this.staffListData[i].staff_gift_amount = this.CalculateData(
              this.staffListData[i].staff_gift_amount,
              "/"
            );
            this.staffListData[i].staff_gift_balance = this.CalculateData(
              this.staffListData[i].staff_gift_balance,
              "/"
            );
          }
        }
      });
    },
    //提交员工
    submitStaff() {
      this.$refs["staffForm"].validate((valid) => {
        if (valid) {
          let datas = _.cloneDeep(this.staffForm);
          datas.staff_id = Number(this.staffForm.staff_id);
          datas.staff_gift_amount = this.CalculateData(
            datas.staff_gift_amount,
            "*"
          );
          delete datas.operator_id;
          delete datas.operator_name;
          delete datas.staff_gift_balance;
          delete datas.staff_create_time;
          delete datas.role_name;
          datas.staff_id = Number(this.staffForm.staff_id);
          datas.dept_id = Number(this.staffForm.dept_id);
          datas.merchant_id = Number(this.merchants.merchant_id);
          datas.shop_id = Number(this.merchants.shop_id);

          console.info("提交的数据", datas);
          this.isLoading = true;
          if (datas.staff_id == 0) {
            delete datas.place_id;
            //this.$store.dispatch("shop/addPlaceList", datas).then((res) => {
            this.api.staff
              .userInsert(datas)
              .then(({ data }) => {
                let res = data;
                this.$message({
                  message: res.msg,
                  type: res.code == 0 ? "success" : "error",
                });
                this.isLoading = false;
                this.staffDialog = false;
                this.reloadData();
              })
              .catch((e) => {
                this.isLoading = false;
              });
          } else {
            //this.$store.dispatch("shop/updatPlaceList", datas).then((res) => {
            this.api.staff
              .userUpdate(datas)
              .then(({ data }) => {
                let res = data;
                this.$message({
                  message: res.msg,
                  type: res.code == 0 ? "success" : "error",
                });
                this.isLoading = false;
                this.staffDialog = false;
                this.reloadData();
              })
              .catch((e) => {
                this.isLoading = false;
              });
          }
        } else {
          this.isLoading = false;
        }
      });
    },
    //编辑部门
    editClass(obj) {
      this.deptForm = Object.assign({}, obj);
      this.deptDialog = true;
    },
    //禁用/启用部门
    changeStatusClass(row, status) {
      this.dept_id = row.dept_id;
      const datas = Object.assign({}, row);
      datas.status = status ? 1 : 0;
      datas.merchant_id = Number(this.merchants.merchant_id);
      datas.shop_id = Number(this.merchants.shop_id);
      datas.dept_id = Number(datas.dept_id);
      datas.dept_status = status ? 1 : 0;
      this.isLoading = true;
      this.api.staff
        .deptUpdate(datas)
        .then(({ data }) => {
          this.isLoading = false;
          let res = data;
          this.$message({
            message: "" + res.msg,
            type: "success",
          });
          this.reloadData();
        })
        .catch((e) => {
          console.error(e);
          this.isLoading = false;
        });
    },
    //提交分类
    submitDept() {
      this.$refs["deptForm"].validate((valid) => {
        if (valid) {
          this.deptForm.dept_id = Number(this.deptForm.dept_id);
          let datas = _.cloneDeep(this.deptForm);
          datas.shop_id = Number(this.merchants.shop_id);
          datas.merchant_id = Number(this.merchants.merchant_id);
          this.isLoading = true;
          if (datas.dept_id == 0) {
            delete datas.dept_id;
            //this.$store.dispatch("shop/createPlaceType", datas).then((res) => {
            this.api.staff
              .deptInsert(datas)
              .then(({ data }) => {
                let res = data;
                this.$message({
                  message: res.msg,
                  type: res.code == 0 ? "success" : "error",
                });
                this.isLoading = false;
                this.deptDialog = false;
                this.reloadData();
              })
              .catch((e) => {
                this.isLoading = false;
              });
          } else {
            //this.$store.dispatch("shop/updatePlaceType", datas).then((res) => {
            this.api.staff
              .deptUpdate(datas)
              .then(({ data }) => {
                let res = data;
                this.$message({
                  message: res.msg,
                  type: res.code == 0 ? "success" : "error",
                });
                this.isLoading = false;
                this.deptDialog = false;
                this.reloadData();
              })
              .catch((e) => {
                this.isLoading = false;
              });
          }
        }
      });
    },
    //删除部门
    deleteDept() {
      if (Number(this.deptForm.dept_id) > 0) {
        this.$confirm("确定要删除吗？", "提示", {
          type: "warning",
        }).then(() => {
          let datas = {
            id: [Number(this.deptForm.dept_id)],
            merchant_id: Number(this.merchants.merchant_id),
            shop_id: Number(this.merchants.shop_id),
          };
          this.api.staff.deptDelete(datas).then(({ data }) => {
            let res = data;
            this.$message({
              message: res.msg,
              type: res.code == 0 ? "success" : "error",
            });
            this.reloadData();
          });
        });
      }
    },
    //获得所有权限
    getRole() {
      let datas = {
        page_size: 1000000,
        merchant_id: Number(this.merchants.merchant_id),
        shop_id: Number(this.merchants.shop_id),
        status: 1,
      };
      this.api.staff.juesList(datas).then(({ data }) => {
        let res = data;
        this.roleListData = res.data;
      });
    },
    //翻页
    pageChange(val) {
      this.page = val;
      this.getAllStaff(this.dept_id);
    },
    //重载数据
    reloadData() {
      this.getDept(() => {
        this.getAllStaff(0);
        this.getRole();
      });
    },
    //切换回收站
    handleDeleteBox(v) {
      this.is_delete = v;
      this.reloadData();
    },
    deleteStaff(items) {
      this.multipleSelection = items.list;
      if (items.isDelete) {
        this.handleDeleteStaff();
      }
    },
    handleDeleteStaff() {
      if (this.multipleSelection.length > 0) {
        this.$confirm("确定删除吗？", "提示").then(() => {
          let datas = {
            id: this.multipleSelection,
            merchant_id: Number(this.merchants.merchant_id),
            shop_id: Number(this.merchants.shop_id),
          };
          //this.$store.dispatch("shop/deletePlaceList", datas).then((res) => {
          this.api.staff.userDelete(datas).then(({ data }) => {
            let res = data;
            this.multipleSelection = [];
            this.getAllStaff();
          });
        });
      }
    },

    recoveryStaff(items) {
      this.multipleSelection = items.list;
      if (items.isRecovery) {
        this.handleRecoveryStaff();
      }
    },
    handleRecoveryStaff() {
      if (this.multipleSelection.length > 0) {
        this.$confirm("确定还原吗？", "提示").then(() => {
          let datas = {
            id: this.multipleSelection,
            merchant_id: Number(this.merchants.merchant_id),
            shop_id: Number(this.merchants.shop_id),
          };
          //this.$store.dispatch("shop/recoveryPlaceList", datas).then((res) => {
          this.api.staff.userRecovery(datas).then(({ data }) => {
            let res = data;
            this.multipleSelection = [];
            this.getAllStaff();
          });
        });
      }
    },
    sortStaff(obj) {
      this.sort = obj.order ? obj.prop : "";
      this.order = obj.order ? this.sortableList[obj.order] : "";
      this.page = 1;
      this.getAllStaff();
    },
    //点击新建员工
    handleNewStaff() {
      if (this.deptListData.length == 0) {
        this.$confirm("尚未设置部门，请先新建部门...", "提示", {
          confirmButtonText: "新建部门",
        })
          .then(() => {
            this.addNewDept();
          })
          .catch((e) => {
            console.log(e);
          });
        return;
      }
      this.staffForm = {
        staff_id: 0,
        staff_name: "",
        staff_phone: "",
        staff_account: "",
        staff_password: "",
        dept_id: null,
        role_id: null,
        staff_commission: null,
        staff_gift_amount: 0,
        staff_status: 1,
      };
      this.isLoading = false;

      this.staffDialog = true;
    },
  },
  watch: {
    enable: {
      immediate: true,
      handler(val) {
        if (val) {
          this.reloadData();
        }
      },
    },
  },
  created() {
    //this.reloadData();
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
.goods-class-list,
.goods-class-list-left,
.goods-class-list-right {
  cursor: pointer;
  height: 40px;
  font-size: 16px;
}
.goods-class-list-left {
  float: left;
  min-width: 50%;
}
.goods-class-list-right {
  float: right;
  font-size: 14px;
  color: #909399;
}
.goods-class-list-selected {
  color: #e6a23c;
  font-weight: bold;
}
.shixiao {
  color: #ccc !important;
}
</style>
