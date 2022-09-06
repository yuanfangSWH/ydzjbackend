<template>
  <div class="uploadFiles">
    <el-upload
      v-show="this.root != ''"
      class="avatar-uploader"
      action="/api/file/uploads"
      :show-file-list="false"
      :file-list="fileList"
      :limit="1"
      :http-request="uploadImg"
      :on-change="handleChange"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <h4 v-show="this.root == ''">没有设置路径“root”...</h4>
  </div>
</template>

<script>
//多个页公用上传组件，请勿单独改动
import { getToken } from "@/utils/auth";
export default {
  name: "uploadImg",
  props: {
    defaltIcon: Number,
    root: { type: String, default: "" },
    uploadImage: { type: String, default: "" },
  },
  data() {
    return {
      header: {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=--------------------------AAAAA",
          AccessToken: getToken(),
        },
      },
      //上传插件数据列表
      fileList: [],
      //上传数据
      DataImg: [],
      //显示的图片
      imageUrl: "",
      localPath: "",
      imageInfo: { width: 0, height: 0, size: 0 },
    };
  },
  watch: {
    uploadImage(n, o) {
      this.imageUrl = n;
    },
  },
  methods: {
    concert(url) {
      //var oss_url = localStorage.getItem("strawberry");
      this.imageUrl = url;
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
      let img = new Image();
      this.localPath = URL.createObjectURL(file.raw);
      const isLt2M = file.size / 1024 / 1024 < 2;
      // console.log(file.size / 1024 / 1024);
      // console.log(file.size / 1024 / 1024 < 2);
      if (!isLt2M) {
        this.fileList = [];
        this.DataImg = [];
      } else {
        this.DataImg = file.raw;
        this.imageUrl = URL.createObjectURL(file.raw);
        img.src = this.imageUrl;
        img.onload = () => {
          this.imageInfo.width = img.width;
          this.imageInfo.height = img.height;
          this.imageInfo.size = file.size;
        };
      }
    },
    /* 上传文件 */
    uploadImg(option) {
      console.info(option);
      var upData = new FormData();
      upData.append("file[]", this.DataImg);
      upData.append("root", this.root);
      // this.$ajax.defaults.headers.common["token"] = getToken();
      this.$ajax.post("/api/file/uploads", upData, this.header).then((res) => {
        if (res.data.code == 0) {
          this.fileList = [];
          this.DataImg = [];
          this.$emit(
            "theIMG",
            res.data.data.url_path[0],
            this.defaltIcon,
            this.localPath,
            this.imageUrl,
            this.imageInfo
          );
        } else {
          this.fileList = [];
          this.DataImg = [];
          this.imageUrl = "";
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
        }
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
