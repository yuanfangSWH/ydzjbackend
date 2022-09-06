<template>
  <div class="uploadFiles">
    <el-upload
      v-show="this.root != ''"
      class="upload-demo"
      action="/api/file/uploads"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :on-error="failureMethods"
      :before-upload="beforeAvatarUpload"
      :http-request="uploadImg"
      list-type="picture"
    >
      <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
    </el-upload>
    <h4 v-show="this.root == ''">没有设置路径“root”...</h4>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  name: "uploadImgEX",
  props: {
    root: { type: String, default: "" },
  },
  data() {
    return {
      header: {
        headers: {
          "Content-Type": "multipart/form-data; boundary=--------------------------AAAAA",
          AccessToken: getToken(),
        },
      },
      //上传插件数据列表
      fileList: [],
      //上传数据
      DataImg: { url: "", uid: 0 },
      //返回父类的数据
      IMGdata: [],
    };
  },
  methods: {
    concert() {
      this.fileList = [];
    },
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      for (var i = 0; i < this.IMGdata.length; i++) {
        if (this.IMGdata[i].uid == file.uid) {
          this.IMGdata.splice(i, 1);
          this.$emit("theIMGEX", this.IMGdata);
          break;
        }
      }
    },
    //限制图片大小
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 文件状态改变时的钩子 添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      this.DataImg.url = file.raw;
      this.DataImg.uid = file.uid;
    },
    /* 上传文件 */
    uploadImg(option) {
      var upData = new FormData();
      upData.append("file[]", this.DataImg.url);
      this.$ajax.post("/api/file/uploads", upData, this.header).then((res) => {
        if (res.data.code == 0) {
          this.IMGdata.push({
            url: res.data.data.url_path[0],
            uid: this.DataImg.uid,
          });
          this.$emit("theIMGEX", this.IMGdata);
        }
      });
    },

    //文件上传失败时的钩子
    failureMethods() {
      this.$message({
        message: "上传图片失败，网络质量不佳或未知错误，请重试",
        type: "warning",
      });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
