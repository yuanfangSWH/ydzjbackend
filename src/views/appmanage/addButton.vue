<template>
  <div class="appBox">
    <div class="page-title">新增导航菜单</div>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="140px"
      class="demo-ruleForm"
    >
      <el-form-item label="名称" prop="title">
        <el-input
          class="formIpt"
          v-model="ruleForm.title"
          placeholder="请输入菜单名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="别名" prop="alias">
        <el-input
          class="formIpt"
          v-model="ruleForm.alias"
          placeholder="请输入菜单别名"
        ></el-input>
      </el-form-item>
      <el-form-item label="版本控制" prop="ver">
        <el-input placeholder="版本号" v-model="verNum" class="">
          <el-select
            v-model="verPrefix"
            slot="prepend"
            placeholder="条件符"
            style="width: 100px"
          >
            <el-option label="等于" value=""></el-option>
            <el-option label="大于" value=">"></el-option>
            <el-option label="大于等于" value=">="></el-option>
            <el-option label="小于" value="<"></el-option>
            <el-option label="小于等于" value="<="></el-option>
            <el-option label="不等于" value="<>"></el-option>
          </el-select>
        </el-input>
        <!-- <el-input
          class="formIpt"
          v-model="ruleForm.ver"
          placeholder="请输入版本控制，例：>=100"
        ></el-input> -->
      </el-form-item>
      <el-form-item label="导航图标" required>
        <el-col :span="4">
          <el-form-item prop="icon_active">
            <div style="text-align: center">
              <div>选中图标</div>
              <uploadFiles
                class="uploadTemp"
                @theIMG="parentFun"
                :imageUrl="fileListActive"
                :root="app"
                :defaltIcon="1"
              />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="icon">
            <div style="text-align: center">
              <div>未选图标</div>
              <uploadFiles
                class="uploadTemp"
                @theIMG="parentFun"
                :imageUrl="fileList"
                :root="app"
                :defaltIcon="2"
              />
            </div>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="连接" prop="url">
        <el-input
          class="formIpt"
          v-model="ruleForm.url"
          placeholder="请输入跳转链接，例：ydzj://index"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="value"
          active-color="#ffbe11"
          inactive-color="#d9d9d9"
          @change="statusChange"
        >
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确定</el-button
        >
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadFiles from "@/components/uploadFiles";
export default {
  components: {
    uploadFiles,
  },
  data() {
    return {
      app: "app",
      fileList: "",
      fileListActive: "",
      verPrefix: "",
      verNum: "",
      ruleForm: {
        title: "",
        ver: "",
        icon: "",
        icon_active: "",
        url: "",
        status: 1,
      },
      rules: {
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        ver: [
          {
            required: true,
            message: "请输入版本控制，例：>=100",
            trigger: "blur",
          },
        ],
        icon: [
          { required: true, message: "请上传导航未选中图标", trigger: "blur" },
        ],
        icon_active: [
          { required: true, message: "请上传导航选中图标", trigger: "blur" },
        ],
        url: [
          {
            required: true,
            message: "请输入跳转链接，例：ydzj://index",
            trigger: "blur",
          },
        ],
      },
      value: true,
    };
  },
  methods: {
    statusChange(val) {
      // console.log(val)
      this.ruleForm.status = val ? 1 : 0;
    },
    setVer() {
      let ver = this.ruleForm.ver;
      this.ver = ver;
      console.info(ver);
      if (ver) {
        if (ver.indexOf("<>") == 0) {
          this.verPrefix = "<>";
          this.verNum = ver.split("<>")[1];
        } else if (ver.indexOf(">=") == 0) {
          this.verPrefix = ">=";
          this.verNum = ver.split(">=")[1];
        } else if (ver.indexOf("<=") == 0) {
          this.verPrefix = "<=";
          this.verNum = ver.split("<=")[1];
        } else if (ver.indexOf(">") == 0) {
          this.verPrefix = ">";
          this.verNum = ver.split(">")[1];
        } else if (ver.indexOf("<") == 0) {
          this.verPrefix = "<";
          this.verNum = ver.split("<")[1];
        } else {
          this.verPrefix = "";
          this.verNum = ver;
        }
      }
    },
    submitForm(formName) {
      this.ruleForm.ver = this.verPrefix + this.verNum;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.ruleForm;
          console.info(data);
          this.api.appmanage.insertButton(data).then((res) => {
            this.$message({
              message: "" + res.data.msg,
              type: "success",
            });
            this.$router.push("/buttonList");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.push("/buttonList");
    },
    parentFun(url, n) {
      if (n == 1) {
        this.ruleForm.icon_active = url;
        this.fileListActive = url;
      } else {
        this.ruleForm.icon = url;
        this.fileList = url;
      }
      // if (i == 1 && n == 2) {
      //   this.fileList = url;
      // } else if (i == 1 && n == 1) {
      //   this.fileListActive = url;
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-upload-list__item .el-progress {
  width: 40%;
}
.el-button--primary {
  color: #000;
  background-color: #ffbe11 !important;
  border-color: #ffbe11 !important;
}
.appBox {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 15px 15px;
  padding: 15px 15px;
  .demo-ruleForm {
    .formIpt {
      width: 40%;
    }
  }
}
</style>