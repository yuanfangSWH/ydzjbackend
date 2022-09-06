<template>
  <div class="shopSet">
    <div class="add-box">
      <el-button
        type="danger"
        @click="batchDelete"
        :disabled="!multipleSelection.length > 0"
        >删除</el-button
      >
      <el-button type="primary" @click="addPlaceOpen">新增</el-button>
      <el-button type="warning" plain @click="handleRuleBox">返回</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="options"
      @sort-change="sortFilterFun"
      border
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        fixed
        prop="rule_id"
        label="全选/ID"
        sortable="custom"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="name"
        sortable="true"
        label="规则名称"
        width="120"
      ></el-table-column>
      <el-table-column prop="allow_week_days" label="可预订星期">
        <template slot-scope="scope">
          {{ showWeekDay(scope.row.allow_week_days) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="allow_special_date"
        label="可预订指定日期"
      ></el-table-column>
      <el-table-column
        prop="not_allow_special_date"
        label="不可预订指定日期"
      ></el-table-column>
      <el-table-column prop="modify_time_text" label="最后修改时间">
      </el-table-column>
      <el-table-column sortable="custom" label="状态">
        <template slot-scope="scope">
          <!-- <i v-if="scope.row.status == 1" class="el-icon-check"></i> -->
          <span v-if="scope.row.status == 0">禁用</span>
          <span v-if="scope.row.status == 1">正常</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看/修改</el-button
          >
          <el-button @click="delClick(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      ref="pagination"
      :hide-on-single-page="value"
      background
      layout="prev, pager, next"
      :total="count"
      @current-change="pageChange"
    ></el-pagination>
    <!-- 编辑规则 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="规则名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="允许预定星期" prop="allow_week_days">
          <el-checkbox-group v-model="ruleForm.allow_week_days">
            <el-checkbox label="星期一"></el-checkbox>
            <el-checkbox label="星期二"></el-checkbox>
            <el-checkbox label="星期三"></el-checkbox>
            <el-checkbox label="星期四"></el-checkbox>
            <el-checkbox label="星期五"></el-checkbox>
            <el-checkbox label="星期六"></el-checkbox>
            <el-checkbox label="星期日"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="允许预定指定日期" required>
          <el-col :span="11">
            <el-form-item prop="allow_special_date">
              <el-date-picker
                type="dates"
                value-format="yyyy-MM-dd"
                v-model="ruleForm.allow_special_date"
                placeholder="选择一个或多个日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="不允许预定指定日期" required>
          <el-col :span="11">
            <el-form-item prop="not_allow_special_date">
              <el-date-picker
                type="dates"
                value-format="yyyy-MM-dd"
                v-model="ruleForm.not_allow_special_date"
                placeholder="选择一个或多个日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="ruleForm.status"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false" type="warning"
            >取消</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增规则 -->
    <el-dialog title="新增规则" :visible.sync="dialogVisibleAdd" width="30%">
      <el-form
        :model="ruleFormAdd"
        :rules="rules"
        ref="ruleFormAdd"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="规则名称" prop="name">
          <el-input v-model="ruleFormAdd.name"></el-input>
        </el-form-item>
        <el-form-item label="允许预定星期" prop="allow_week_days">
          <el-checkbox-group v-model="ruleFormAdd.allow_week_days">
            <el-checkbox label="星期一"></el-checkbox>
            <el-checkbox label="星期二"></el-checkbox>
            <el-checkbox label="星期三"></el-checkbox>
            <el-checkbox label="星期四"></el-checkbox>
            <el-checkbox label="星期五"></el-checkbox>
            <el-checkbox label="星期六"></el-checkbox>
            <el-checkbox label="星期日"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="允许预定指定日期" required>
          <el-col :span="11">
            <el-form-item prop="allow_special_date">
              <el-date-picker
                type="dates"
                value-format="yyyy-MM-dd"
                v-model="ruleFormAdd.allow_special_date"
                placeholder="选择一个或多个日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="不允许预定指定日期" required>
          <el-col :span="11">
            <el-form-item prop="not_allow_special_date">
              <el-date-picker
                type="dates"
                value-format="yyyy-MM-dd"
                v-model="ruleFormAdd.not_allow_special_date"
                placeholder="选择一个或多个日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="ruleFormAdd.status"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisibleAdd = false" type="warning"
            >取消</el-button
          >
          <el-button @click="resetForm('ruleFormAdd')">重置</el-button>
          <el-button type="primary" @click="submitFormAdd('ruleFormAdd')"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 删除规则 -->
    <el-dialog :title="deltitle" :visible.sync="deldialogVisible" width="30%">
      <span>确定要删除此规则吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deldialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelFun">确定</el-button>
      </span>
    </el-dialog>
    <!-- 批量删除规则 -->
    <el-dialog title="批量删除" :visible.sync="batchdialogVisible" width="30%">
      <span class="s-title">确定要删除以下规则吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
        {{ item }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelbatch">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PlaceRuleindex",
  props: {
    merchants: { shop_id: "", merchant_id: "" },
  },
  data() {
    return {
      msg: "座位规则",
      shopInfoData: {},
      options: [],
      multipleSelection: [],
      value: true,
      page: 1,
      count: 0,
      detaileData: [],
      dialogVisible: false,
      title: "",
      rule_id: 0,
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
      ruleForm: {
        shop_id: "",
        merchant_id: "",
        rule_id: 0,
        name: "",
        allow_special_date: "",
        not_allow_special_date: "",
        status: true,
        allow_week_days: [],
      },
      rules: {
        name: [{ required: true, message: "请输入规则名称", trigger: "blur" }],
        allow_special_date: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        not_allow_special_date: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        allow_week_days: [
          {
            required: true,
            message: "请至少选择一个预定星期",
            trigger: "change",
          },
        ],
      },
      deldialogVisible: false,
      deltitle: "",
      dialogVisibleAdd: false,
      ruleFormAdd: {
        shop_id: "",
        merchant_id: "",
        name: "",
        allow_special_date: [],
        not_allow_special_date: [],
        status: true,
        allow_week_days: [],
      },
      batchdialogVisible: false,
      nameArr: [],
    };
  },
  created() {
    this.getPlaceList();
  },
  methods: {
    showWeekDay(v) {
      let weeks = v.split(",");
      let result = "";
      for (let i in weeks) {
        let w = Number(weeks[i]);
        let str = w > 0 ? "周" + w : "周日";
        result += result == "" ? str : " " + str;
      }
      return result;
    },
    handleRuleBox() {
      this.$emit("handleRuleBox", false);
    },
    //查看、修改
    handleClick(row) {
      var value = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: row.rule_id,
      };
      const datas = value;
      this.$store.dispatch("shop/getPlaceDetail", datas).then((res) => {
        this.detaileData = res.data;
        var reg = RegExp(/，/);
        if (this.detaileData.allow_special_date.match(reg)) {
          // 包含
          this.detaileData.allow_special_date = this.detaileData.allow_special_date.split(
            "，"
          );
        } else {
          this.detaileData.allow_special_date = this.detaileData.allow_special_date.split(
            ","
          );
        }
        if (this.detaileData.allow_week_days.match(reg)) {
          // 包含
          this.detaileData.allow_week_days = this.detaileData.allow_week_days.split(
            "，"
          );
        } else {
          this.detaileData.allow_week_days = this.detaileData.allow_week_days.split(
            ","
          );
        }
        if (this.detaileData.not_allow_special_date.match(reg)) {
          // 包含
          this.detaileData.not_allow_special_date = this.detaileData.not_allow_special_date.split(
            "，"
          );
        } else {
          this.detaileData.not_allow_special_date = this.detaileData.not_allow_special_date.split(
            ","
          );
        }

        for (var i = 0; i < this.detaileData.allow_week_days.length; i++) {
          if (this.detaileData.allow_week_days[i] == "1") {
            this.detaileData.allow_week_days[i] = "星期一";
          } else if (this.detaileData.allow_week_days[i] == "2") {
            this.detaileData.allow_week_days[i] = "星期二";
          } else if (this.detaileData.allow_week_days[i] == "3") {
            this.detaileData.allow_week_days[i] = "星期三";
          } else if (this.detaileData.allow_week_days[i] == "4") {
            this.detaileData.allow_week_days[i] = "星期四";
          } else if (this.detaileData.allow_week_days[i] == "5") {
            this.detaileData.allow_week_days[i] = "星期五";
          } else if (this.detaileData.allow_week_days[i] == "6") {
            this.detaileData.allow_week_days[i] = "星期六";
          } else if (this.detaileData.allow_week_days[i] == "0") {
            this.detaileData.allow_week_days[i] = "星期日";
          }
        }
        if (this.detaileData.status == 1) {
          this.detaileData.status = true;
        } else {
          this.detaileData.status = false;
        }
        this.ruleForm = this.detaileData;
        this.dialogVisible = true;
        this.title = "编辑-" + this.detaileData.name;
      });
    },
    //修改提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const datas = Object.assign({}, this.ruleForm);
          for (var i = 0; i < datas.allow_week_days.length; i++) {
            if (datas.allow_week_days[i] == "星期一") {
              datas.allow_week_days[i] = "1";
            } else if (datas.allow_week_days[i] == "星期二") {
              datas.allow_week_days[i] = "2";
            } else if (datas.allow_week_days[i] == "星期三") {
              datas.allow_week_days[i] = "3";
            } else if (datas.allow_week_days[i] == "星期四") {
              datas.allow_week_days[i] = "4";
            } else if (datas.allow_week_days[i] == "星期五") {
              datas.allow_week_days[i] = "5";
            } else if (datas.allow_week_days[i] == "星期六") {
              datas.allow_week_days[i] = "6";
            } else if (datas.allow_week_days[i] == "星期日") {
              datas.allow_week_days[i] = "0";
            }
          }
          datas.allow_special_date = datas.allow_special_date.join(",");
          datas.not_allow_special_date = datas.not_allow_special_date.join(",");
          datas.allow_week_days = datas.allow_week_days.join(",");
          datas.status = datas.status === true ? 1 : 0;
          datas.merchant_id = Number(this.merchants.merchant_id);
          datas.shop_id = Number(this.merchants.shop_id);

          this.$store.dispatch("shop/updatPlace", datas).then((res) => {
            if (res.code == 0) {
              this.$message({
                message: "" + res.msg,
                type: "success",
              });
              this.getPlaceList();
            } else {
              this.$message.error(res.msg);
            }
            this.dialogVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //删除
    delClick(row) {
      this.deldialogVisible = true;
      this.rule_id = row.rule_id;
      this.deltitle = "删除-" + row.name;
    },
    //确认删除
    confirmDelFun() {
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: [this.rule_id],
      };
      this.$store.dispatch("shop/deletePlace", datas).then((res) => {
        if (res.code == 0) {
          this.$message({
            message: "" + res.msg,
            type: "success",
          });
          this.getPlaceList();
        } else {
          this.$message.error(res.msg);
        }
        this.deldialogVisible = false;
      });
    },
    //批量删除
    batchDelete() {
      if (this.multipleSelection) {
        this.batchdialogVisible = true;
      } else {
        this.$message({
          message: "请先勾选要删除的规则",
          type: "warning",
        });
      }
    },
    //确认批量删除
    confirmDelbatch() {
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: this.multipleSelection,
      };
      this.$store.dispatch("shop/deletePlace", datas).then((res) => {
        if (res.code == 0) {
          this.$message({
            message: "" + res.msg,
            type: "success",
          });
          this.getPlaceList();
        } else {
          this.$message.error(res.msg);
        }
        this.batchdialogVisible = false;
      });
    },
    //新增规则弹框
    addPlaceOpen() {
      this.dialogVisibleAdd = true;
    },
    //新增规则
    submitFormAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const datas = Object.assign({}, this.ruleFormAdd);
          for (var i = 0; i < datas.allow_week_days.length; i++) {
            if (datas.allow_week_days[i] == "星期一") {
              datas.allow_week_days[i] = "1";
            } else if (datas.allow_week_days[i] == "星期二") {
              datas.allow_week_days[i] = "2";
            } else if (datas.allow_week_days[i] == "星期三") {
              datas.allow_week_days[i] = "3";
            } else if (datas.allow_week_days[i] == "星期四") {
              datas.allow_week_days[i] = "4";
            } else if (datas.allow_week_days[i] == "星期五") {
              datas.allow_week_days[i] = "5";
            } else if (datas.allow_week_days[i] == "星期六") {
              datas.allow_week_days[i] = "6";
            } else if (datas.allow_week_days[i] == "星期日") {
              datas.allow_week_days[i] = "0";
            }
          }
          datas.allow_special_date = datas.allow_special_date.join(",");
          datas.not_allow_special_date = datas.not_allow_special_date.join(",");
          datas.allow_week_days = datas.allow_week_days.join(",");
          if (datas.status == true) {
            datas.status = 1;
          } else {
            datas.status = 0;
          }
          datas.merchant_id = Number(this.merchants.merchant_id);
          datas.shop_id = Number(this.merchants.shop_id);

          this.$store.dispatch("shop/addPlaceRule", datas).then((res) => {
            if (res.code == 0) {
              this.$message({
                message: "" + res.msg,
                type: "success",
              });
              this.getPlaceList();
            } else {
              this.$message.error(res.msg);
            }
            this.dialogVisibleAdd = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取座位规则列表
    getPlaceList() {
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page: this.page,
      };
      this.$store.dispatch("shop/getPlaceRule", datas).then((res) => {
        this.options = res.data;
        this.count = res.count;
        this.$refs.pagination.internalCurrentPage = this.page;
      });
    },
    //table排序
    sortMethod(val) {
      let data = {
        page: this.page,
        sort: val.prop,
        order: this.sortableList[val.order],
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.$store.dispatch("shop/getPlaceRule", data).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
    },
    //table排序
    sortFilterFun(column) {
      this.sortMethod(column);
    },
    handleSelectionChange(val) {
      var arr = [];
      this.multipleSelection = [];
      for (var i = 0; i < val.length; i++) {
        arr.push(val[i].rule_id);
        this.nameArr.push(val[i].name);
      }
      arr = Array.from(new Set(arr));
      this.nameArr = Array.from(new Set(this.nameArr));
      this.multipleSelection = arr;
    },
    pageChange(val) {
      this.page = val;
      this.getPlaceList();
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
