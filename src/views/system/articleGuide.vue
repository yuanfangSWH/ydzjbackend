<template>
  <div class="articleOperation">
    <p>{{ title }}</p>
    <div>
      <el-form
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文章标题:" prop="title">
          <el-input v-model="formData.title" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="文章排序:">
          <el-input type="Number" v-model="formData.sort"></el-input>
        </el-form-item>
      </el-form>
      <editorBar
        @editorData="getEditorData"
        :editorContentData="formData.content"
        root="article"
      ></editorBar>
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item style="margin-top: 20px">
          <el-button
            type="primary"
            style="margin-right: 30px"
            @click="submitForm('ruleForm')"
            >{{ btnVal }}</el-button
          >
          <el-button
            @click="
              () => {
                this.$router.go(-1);
              }
            "
            >返回</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import editorBar from "../articleManage/components/wangEditor";
export default {
  name: "articleYD",
  data() {
    return {
      imageUploadUrl: this.api.articleManage.uploadsImage,
      title: "",
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
      },
      formData: {
        class_id: 0,
        title: "",
        status: 1,
        type: 3, //固定为新手教程
        content: "",
        sort: "",
      },
      btnVal: "新增",
      dialogVisible: false,
      imageInit: false,
    };
  },
  components: {
    editorBar,
  },
  created() {
    if (this.$route.query.id) {
      this.title = "编辑文章";
      this.btnVal = "修改";
      this.imageInit = true;
      this.getArticleDetile(this.$route.query.id);
    } else {
      this.title = "新增文章";
    }
  },
  methods: {
    getArticleDetile(id) {
      this.api.articleManage.articleDetail({ id }).then((res) => {
        let { data } = res.data;
        let { content, title, article_id, sort, status, type } = data;
        this.formData = {
          content,
          title,
          article_id,
          sort,
          status,
          type,
        };
      });
    },
    // 获取富文本子组件传来的数据
    getEditorData(data) {
      // console.log(data);
      this.formData.content = data;
    },
    submitForm(formName) {
      this.formData.sort = Number(this.formData.sort);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            this.api.articleManage.editArticle(this.formData).then((res) => {
              console.log(res);
              this.$message.success("修改成功！");
              this.$router.push({ path: "/articleManage" });
              this.$router.back();
            });
          } else {
            this.api.articleManage.addArticle(this.formData).then((res) => {
              this.$message.success("新增成功！");
              //this.$router.push({ path: "/articleManage" });
              this.$router.back();
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // resetForm (formName) {
    //   this.$refs[formName].resetFields();
    // }
  },
};
</script>

<style lang="scss">
.articleOperation {
  background-color: #fff;
  margin: 20px;
  padding: 20px 20px 40px;
  height: 100%;
  .el-form-item {
    label {
      // font-family: "微软雅黑";
      font-weight: 200;
    }
    .el-form-item__content {
      .el-input {
        width: 240px;
      }
    }
  }
  .avatar {
    width: 150px;
    height: 150px;
  }
  .imageType {
    display: flex;
    .imageInit {
      width: 150px;
      height: 150px;
      border-radius: 5px;
      margin-right: 20px;
    }
  }
}
</style>