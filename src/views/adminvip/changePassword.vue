<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <el-form :model="ruleForm"
             status-icon
             style="margin-top: 40px;"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="原密码"
                    prop="old_password">
        <el-input type="password"
                  clearable
                  v-model="ruleForm.old_password"
                  autocomplete="off" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码"
                    prop="new_password">
        <el-input type="password"
                  v-model="ruleForm.new_password"
                  clearable
                  autocomplete="off" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="password_confirm">
        <el-input type="password"
                  clearable
                  v-model="ruleForm.password_confirm"  placeholder="请确认新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   style="background-color: #f6c045;color:#000;width: 100px;border: none;"
                   @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="()=>{this.$router.go(-1);}"
                   style="background-color: #eeeeee;color:#000;width: 100px;">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "currenPage",
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.new_password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        old_password: '',
        new_password: '',
        password_confirm: ''
      },
      rules: {
        old_password: [
          { required: true, message: '请输入原密码', trigger: 'change' }
        ],
        new_password: [
          { required: true, message: '请输入新密码', trigger: 'change' }
        ],
        password_confirm: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  created () {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.api.adminvip.changePassword(this.ruleForm).then((res) => {
            const { code, msg } = res.data
            if (code == 0) {
              this.$message.success(msg)
            } else {
              this.$message.error(msg)
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.shopSet {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  min-height: calc(100vh - 150px);
  margin: 15px 15px;
  padding: 15px 15px;
  ::v-deep .el-input {
    width: 280px !important;
  }
  ::v-deep input.el-input__inner {
    width: 280px !important;
  }
}
</style>
