<template>
  <div class="videoBox">
    <el-upload
      v-show="this.root != ''"
      v-loading="loading"
      action="/api/file/uploads"
      :show-file-list="false"
      :before-upload="beforeUploadVideo"
      :http-request="handleUploadSTS"
      list-type="picture-card"
    >
      <i class="el-icon-plus"></i>
      <el-progress
        v-if="videoFlag == true"
        type="circle"
        :percentage="videoUploadPercent"
        style="margin-top: 30px"
      ></el-progress>
    </el-upload>
    <h4 v-show="this.root == ''">没有设置路径“root”...</h4>
    <P class="text"
      >视频建议960p以上分辨率，且不超过50M。<br />数量不能超过
      {{ limit }} 个视频。</P
    >
    <!-- <el-button type="primary" @click="handleUploadSTS">选择视频</el-button> -->
  </div>
</template>

<script>
import { getToken } from "@/utils/auth"; // get token from cookie
export default {
  props: {
    root: { type: String, default: "" },
    limit: { type: Number, default: 1 },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    tags: { type: String, default: "" },
    scene: { type: String, default: "news" },
  },
  data() {
    return {
      isUploadOk: false,
      region:
        process.env.NODE_ENV == "production" ? "cn-shanghai" : "cn-beijing",
      userId: "1994484675040235",
      workFlow: {
        w1: "6629b72dd776e84f573cdc2aefe4a642",
        w2: "7e35f1b2bb20acbf6bb8a4274a29a44c",
        size: 2 * (1024 * 1024), //2M，字节长度决定工作流 大于2m用w2，小于2m用w1
      },
      templateGroup: {
        w1:
          process.env.NODE_ENV == "production"
            ? "cba30254267006d7de58437381c1e4a5"
            : "8d73c5674fcc496b133e52f11ad4e2f8",
        w2:
          process.env.NODE_ENV == "production"
            ? "939e436684def94f2659cf044336cb10"
            : "7f86eadb0b561e2cb629f629c59ec053",
        size: 2 * (1024 * 1024), //2M，字节长度决定模板 大于2m用w2，小于2m用w1
      },

      uploader: null, //OSS上传对象
      uploadInfo: {}, //上传视频信息，用于VOD列表
      clentSts: {}, //STS信息
      videoAuth: {},
      videoForm: {
        Video: "",
      },
      loading: false,
      videoFlag: false,
      videoUploadPercent: 0,
      statusText: "",
      fileLists: [],
      header: {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=--------------------------AAAAA",
          AccessToken: getToken(),
        },
      },
    };
  },
  created() {
    //console.info(process.env.NODE_ENV, this.templateGroup);
  },
  methods: {
    //
    setUploadInfo(obj) {
      this.uploadInfo = obj;
    },
    // 验证方法：验证视频格式和视频大小
    beforeUploadVideo(file) {
      const isLt10M = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt10M) {
        this.$message.error("上传视频大小不能超过50MB哦!");
        return false;
      }
    },

    startUpload() {
      console.info("o");
      if (this.uploader != null) {
        console.info("yes");
        let result = this.uploader.startUpload();
        this.isUploadOk = false;
        console.info(result);
      }
    },
    // 覆盖默认的上传行为，可以自定义上传的实现
    async handleUploadSTS(option) {
      try {
        let _this = this;

        //console.info("获得的上传地址和凭证：", this.videoAuth);

        this.uploader = this.createUploader();

        let userData_auth = { Vod: {} };
        console.info("UserData：", JSON.stringify(userData_auth));

        this.uploader.addFile(
          option.file,
          null,
          null,
          null,
          JSON.stringify(userData_auth)
        );
        this.isUploadOk = true;

        this.startUpload();
      } catch (error) {
        console.error(error);
        option.onError("上传失败");
        this.$error(error.message);
      }
    },
    uploadOk(obj) {
      //console.info(obj);
      // let { data } = await this.api.shop.shopVideoInsert({
      //   shop_id: Number(this.uploadInfo.shop_id),
      //   video_id: obj.videoId,
      // });
      // console.info(data);
      //this.$message({
      //   message: "上传成功，视频转码需要一定时间，稍后会在视频资源库中显示",
      //   type: "success",
      //   duration: 5000,
      // });
      setTimeout(() => {
        this.$emit("childrenFun", obj);
      }, 800);
    },
    createUploader() {
      let self = this;
      let uploader = new AliyunUpload.Vod({
        timeout: self.timeout || 60000,
        partSize: self.partSize || 1048576,
        parallel: self.parallel || 5,
        retryCount: self.retryCount || 3,
        retryDuration: self.retryDuration || 2,
        region: self.region,
        userId: self.userId,
        // 添加文件成功
        addFileSuccess: function (uploadInfo) {
          self.uploadDisabled = false;
          self.resumeDisabled = false;
          self.statusText = "添加文件成功, 等待上传...";
          console.log("addFileSuccess: ", uploadInfo);
        },
        // 开始上传
        onUploadstarted: function (uploadInfo) {
          console.info("开始上传的uploadInfo：", uploadInfo);

          let datas = {
            title: self.title,
            description: self.description,
            file_name: uploadInfo.file.name,
            tags: self.tags,
            scene: self.scene,
            template_group_id:
              uploadInfo.file.size < self.templateGroup.size
                ? self.templateGroup.w1
                : self.templateGroup.w2,
          };
          console.info("getAuth参数：", datas);
          console.info("uploader：", uploader == self.uploadInfo);

          //获得上传凭据和地址
          let auth = self.api.media.videoUploadAuth(datas).then((auth) => {
            self.videoAuth = auth.data.data;
            console.info("onUploadstarted", self.videoAuth);
            uploader.setUploadAuthAndAddress(
              uploadInfo,
              self.videoAuth.upload_auth,
              self.videoAuth.upload_address,
              self.videoAuth.video_id
            );
            self.statusText = "文件开始上传...";
            console.log(
              "onUploadStarted:" +
                uploadInfo.file.name +
                ", endpoint:" +
                uploadInfo.endpoint +
                ", bucket:" +
                uploadInfo.bucket +
                ", object:" +
                uploadInfo.object
            );
          });
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
          console.info(uploadInfo);
          console.log(
            "onUploadSucceed: " +
              uploadInfo.file.name +
              ", endpoint:" +
              uploadInfo.endpoint +
              ", bucket:" +
              uploadInfo.bucket +
              ", object:" +
              uploadInfo.object
          );
          self.statusText = "文件上传成功!";
          self.uploadOk(uploadInfo);
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
          console.log(
            "onUploadFailed: file:" +
              uploadInfo.file.name +
              ",code:" +
              code +
              ", message:" +
              message
          );
          self.statusText = "文件上传失败!";
        },
        // 取消文件上传
        onUploadCanceled: function (uploadInfo, code, message) {
          console.log(
            "Canceled file: " +
              uploadInfo.file.name +
              ", code: " +
              code +
              ", message:" +
              message
          );
          self.statusText = "文件已暂停上传";
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress: function (uploadInfo, totalSize, progress) {
          console.log(
            "onUploadProgress:file:" +
              uploadInfo.file.name +
              ", fileSize:" +
              totalSize +
              ", percent:" +
              Math.ceil(progress * 100) +
              "%"
          );
          let progressPercent = Math.ceil(progress * 100);
          self.stsProgress = progressPercent;
          self.statusText = "文件上传中...";
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo) {
          self.statusText = "文件超时...";
        },
        // 全部文件上传结束
        onUploadEnd: function (uploadInfo) {
          console.log("onUploadEnd: uploaded all the files", uploadInfo);
          self.statusText = "文件上传完毕";
        },
      });
      return uploader;
    },
  },
};
</script>

<style scoped>
.videoBox >>> .el-upload--text {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  line-height: 146px;
  vertical-align: top;
}
.videoBox >>> .el-upload--text i {
  font-size: 28px;
  color: #8c939d;
}
.videoBox .text {
  font-size: 14px;
  color: #8c939d;
}
</style>
