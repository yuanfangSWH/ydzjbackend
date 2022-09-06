<template>
  <div class="articleOperation" style="width: 900px">
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
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="文章概要:" prop="summary">
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 30 }"
            v-model="formData.summary"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item label="封面图:" prop="image">
          <div class="imageType">
            <uploadFiles
              ref="uploadImages"
              class="uploadTemp"
              :limit="1"
              :fileList="imageUrl"
              :option="{
                boxHeigth: 600,
                cutWidth: 600,
                cutHeight: 227,
                sizeChange: false,
                showImageWidth: 600,
                showImageHeight: 227,
              }"
              root="goods"
              @upload="uploadTheImages"
            />
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="formData.image" />
            </el-dialog>
          </div>
        </el-form-item> -->
        <el-form-item label="封面图" required>
          <el-col :span="4">
            <el-form-item prop="icon_active">
              <div style="text-align: center">
                <!-- <div>上传图片</div> -->
                <uploadFiles
                  class="uploadTemp"
                  ref="uploadImg1"
                  @theIMG="parentFun"
                  :imageUrl="imageUrl"
                  root="goods"
                  :defaltIcon="1"
                />
              </div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="自定义链接">
          <el-input v-model="formData.url"></el-input>
        </el-form-item>
      </el-form>
      <my-editor
        style="margin-top: 10px"
        @change="getEditorData"
        :inicontent="formData.content"
        root="article"
        ref="my-editor"
      ></my-editor>
      <div style="margin-top: 20px">
        <el-button
          type="primary"
          style="margin-right: 20px"
          @click="submitForm('ruleForm')"
          >{{ btnVal }}</el-button
        >
        <!-- <el-button
          @click="
            () => {
              this.$router.go(-1);
            }
          "
          >返回</el-button
        > -->
      </div>
    </div>
    <go-back />
  </div>
</template>

<script>
//import editorBar from "../articleManage/components/wangEditor";
// import uploadFiles from "@/components/uploadFiles/cutterImageUpload";
import ueditor from "@/components/ueditor";
import uploadFiles from "@/components/uploadFiles";
export default {
  name: "articleYD",
  data() {
    return {
      imageUploadUrl: this.api.articleManage.uploadsImage,
      imageUrl: [],
      fileListActive: "",
      title: "",
      formData: {
        // class_id: 1,
        class_id: 0,
        title: "",
        url: "",
        image: "",
        status: 1,
        summary: "",
        type: 2, //固定为推送文章类型
        content: "",
      },
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        summary: [
          { required: true, message: "请输入文章摘要", trigger: "blur" },
        ],
        url: [{ required: true, message: "请输入文章地址", trigger: "blur" }],
        sort: [{ required: true, message: "请输入文章排序", trigger: "blur" }],
        status: [
          { required: true, message: "请输入文章状态", trigger: "blur" },
        ],
      },
      btnVal: "新增",
      dialogVisible: false,
      imageInit: false,
    };
  },
  components: {
    uploadFiles,
    "my-editor": ueditor,
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
    uploadTheImages(files) {
      let images = [];
      for (let i in files) {
        images.push(files[i]["url"]);
      }
      this.formData.image = images.join(",");
    },
    getArticleDetile(id) {
      this.api.articleManage.articleDetail({ id }).then((res) => {
        let { data } = res.data;
        let {
          content,
          title,
          summary,
          url,
          image,
          article_id,
          status,
          type,
        } = data;
        this.formData = {
          content,
          title,
          summary,
          url,
          image,
          article_id,
          status,
          type,
        };

        // let images = this.formData.image.split(",");
        // this.imageUrl = [this.formData.image];
        // for (let i in images) {
        //   this.imageUrl.push({ url: images[i] });
        // }
        this.$refs.uploadImg1.concert(this.formData.image);
        console.log(this.imageUrl);
        console.log(this.formData);
      });
    },
    // 获取富文本子组件传来的数据
    getEditorData(data) {
      // console.log(data);
      this.formData.content = data;
    },
    beforeAvatarUpload(file) {
      this.imageInit = false;
      return true;
    },
    handleRemove(file, fileList) {
      this.formData.image = null;
      setTimeout(() => {
        document.getElementsByClassName(
          "el-upload--picture-card"
        )[0].style.display = "inline-block";
      }, 200);
    },
    handleSuccess(res) {
      this.formData.image = res.data ? res.data.url_path[0] : res;
      document.getElementsByClassName(
        "el-upload--picture-card"
      )[0].style.display = "none";
      // this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$refs["my-editor"].isSource()) {
            this.$message({
              message: "编辑器正处于源码编辑状态，无法提交。请切换回正常状态。",
              type: "warning",
            });
            return;
          }
          if (this.$route.query.id) {
            let datas = Object.assign({}, this.formData);
            datas.image = this.GetImageUrl(datas.image);
            this.api.articleManage.editArticle(datas).then((res) => {
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
    parentFun(url, n) {
      this.formData.image = url;
      // if (i == 1 && n == 2) {
      //   this.fileList = url;
      // } else if (i == 1 && n == 1) {
      //   this.fileListActive = url;
      // }
    },
    // resetForm (formName) {
    //   this.$refs[formName].resetFields();
    // }
  },
};
</script>

<style lang="scss" scope>
.el-button--primary,
.btn-primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
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
        width: 100%;
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
