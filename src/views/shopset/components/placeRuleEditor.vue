<!--
 * @Author: 朱强
 * @Date: 2021-01-18 09:43:33
 * @LastEditTime: 2021-01-25 10:31:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\shopset\components\placeRuleEditor.vue
-->
<template>
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
    <div style="text-align: right">
      <el-button @click="submitCancel">取消</el-button>
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
        :loading="loading"
        >保存</el-button
      >
    </div>
  </el-form>
</template>
<script>
export default {
  name: "placeRuleEditor",
  props: {
    formData: { type: Object },
  },
  data() {
    return {
      loading: false,
      ruleForm: {},
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
    };
  },
  created() {
    this.ruleForm = Object.assign({}, this.formData);
    console.info("created", this.ruleForm);
  },
  methods: {
    submitCancel() {
      this.$emit("submit-cancel");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let datas = Object.assign({}, this.ruleForm);
          console.info(datas);
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
              datas.allow_week_days[i] = "7";
            }
          }
          datas.allow_special_date = datas.allow_special_date.join(",");
          datas.not_allow_special_date = datas.not_allow_special_date.join(",");
          datas.allow_week_days = datas.allow_week_days.join(",");
          datas.status = datas.status === true ? 1 : 0;
          datas.merchant_id = Number(datas.merchant_id);
          datas.shop_id = Number(datas.shop_id);

          let apiPath =
            datas.rule_id == undefined
              ? "shop/addPlaceRule"
              : "shop/updatPlace";
          this.$emit("submitStart");
          this.$store.dispatch(apiPath, datas).then((res) => {
            if (res.code == 0) {
              this.$message({
                message: "" + res.msg,
                type: "success",
              });
              this.$emit("submit-ok");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-button--primary,
.btn-primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
</style>