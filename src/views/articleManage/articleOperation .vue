<template>
  <div class="articleOperation">
    <p>{{title}}</p>
    <div>
      <el-form :model="formData"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="文章标题:"
                      prop="article_title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="文章地址:"
                      prop="url">
          <el-input v-model="formData.url">
            <template slot="prepend">Http://</template>
          </el-input>
        </el-form-item>
        <el-form-item label="文章排序:"
                      op="sort">
          <el-input v-model="formData.sort">
          </el-input>
        </el-form-item>
        <el-form-item label="文章图标:"
                      prop="image">
          <!-- <el-upload class="avatar-uploader"
                     list-type="picture-card"
                     action="/file/uploads"
                     :data="{root:'article'}"
                     :headers="{AccessToken:this._getToken()}"
                     :limit="1"
                     :show-file-list="false"
                     :on-preview="handlePictureCardPreview"
                     :before-upload="beforeAvatarUpload"> -->
            <!-- :on-success="handleSuccess"  -->
          <!-- <img v-if="formData.url"
                 :src="formData.url"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%"
                   :src="formData.url"
                   alt="">
            </el-dialog>
          </el-upload> -->
          <div class="imageType">
            <img class="imageInit"
                 v-if="imageInit"
                 :src="formData.image"
                 alt="">
            <el-upload action="/file/uploads"
                       list-type="picture-card"
                       :headers="{AccessToken:this._getToken()}"
                       :limit="1"
                       :data="{root:'article'}"
                       :on-success="handleSuccess"
                       :before-upload="beforeAvatarUpload"
                       name="file[]"
                       :on-remove="handleRemove">
              <i class="el-icon-plus"></i>

            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%"
                   :src="formData.image">
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item label="文章状态:"
                      prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <editorBar @editorData="getEditorData"
                   :editorContentData="formData.content"></editorBar>
        <el-form-item style="margin-top:20px">
          <el-button type="primary"
                     style="margin-right: 30px;"
                     @click="submitForm('ruleForm')">{{btnVal}}</el-button>
          <el-button @click="()=>{this.$router.go(-1)}">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import editorBar from './components/wangEditor';
import uploadFilesEX from "@/components/uploadFilesEX";
export default {
  name: 'articleOperation',
  data () {
    return {
      imageUploadUrl: this.api.articleManage.uploadsImage,
      title: '',
      formData: {
        // class_id: 1,
        article_id: '',
        title: '',
        url: '',
        image: '',
        status: '',
        content: '',
        sort: '',
      },
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        url: [{ required: true, message: '请输入文章地址', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入文章排序', trigger: 'blur' }],
        url: [{ required: true, message: '请输入文章图标', trigger: 'blur' }],
        status: [{ required: true, message: '请输入文章状态', trigger: 'blur' }],
      },
      btnVal: '新增',
      dialogVisible: false,
      imageInit: false
    }
  },
  components: {
    editorBar,
    uploadFilesEX
  },
  created () {
    if (this.$route.query.id) {
      this.title = '编辑文章'
      this.btnVal = '修改'
      this.imageInit = true
      this.getArticleDetile(this.$route.query.id)
    } else {
      this.title = '新增文章'
    }
  },
  methods: {
    getArticleDetile (id) {
      this.api.articleManage.articleDetail({ id }).then(res => {
        let { data } = res.data
        let { content, title, url, image, article_id, sort, status } = data
        this.formData = {
          content,
          title,
          url,
          status,
          content,
          sort,
          image,
          status,
          article_id
        }
        console.log(this.formData);
      })
    },
    // 获取富文本子组件传来的数据
    getEditorData (data) {
      // console.log(data);
      this.formData.content = data;
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      this.imageInit = false
      return true;
    },
    handleRemove (file, fileList) {
      this.formData.image = null
      setTimeout(() => {
        document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'inline-block'
      }, 200)
    },
    handleSuccess (res) {
      this.formData.image = res.data ? res.data.url_path[0] : res;
      document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'none'
      // this.dialogVisible = true;
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            this.api.articleManage.editArticle(this.formData).then(res => {
              console.log(res);
              this.$message.success('修改成功！')
              this.$router.push({ path: '/articleManage' })
            })
          } else {
            this.api.articleManage.addArticle(this.formData).then(res => {
              this.$message.success('新增成功！')
              this.$router.push({ path: '/articleManage' })
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // resetForm (formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
}
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