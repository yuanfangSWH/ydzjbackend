<template>
  <div class="videoBox">
    <el-upload
      v-show="this.root != ''"
      style="width: 148px"
      v-loading="loading"
      action="/api/file/uploads"
      :show-file-list="false"
      :on-success="handleVideoSuccess"
      :before-upload="beforeUploadVideo"
      :on-progress="uploadVideoProcess"
      :on-change="handleChange"
      :http-request="handleUploadSTS"
      list-type="picture-card"
    >
      <video
        v-if="videoForm.Video != '' && videoFlag == false"
        :src="videoForm.Video"
        class="avatar"
        controls="controls"
      >
        您的浏览器不支持视频播放
      </video>
      <i
        v-else-if="videoForm.Video == '' && videoFlag == false"
        class="el-icon-plus"
      ></i>
      <el-progress
        v-if="videoFlag == true"
        type="circle"
        :percentage="videoUploadPercent"
        style="margin-top: 30px"
      ></el-progress>
    </el-upload>
    <h4 v-show="this.root == ''">没有设置路径“root”...</h4>
    <P class="text"
      >请保证视频格式正确，且不超过{{ videoMaxSize }}M。数量不能超过
      {{ limit }} 个视频。</P
    >
    <!-- <el-button type="primary" @click="handleUploadSTS">选择视频</el-button> -->
  </div>
</template>

<script>
import { getToken } from "@/utils/auth"; // get token from cookie
export default {
  props: {
    shop: Boolean,
    root: { type: String, default: "" },
    limit: { type: Number, default: 3 },
  },
  data() {
    return {
      videoMaxSize: 50, //视频上传最大限制
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
      let isLt10M = file.size / 1024 / 1024 < this.videoMaxSize;
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
    // 上传进度显示：
    uploadVideoProcess(event, file, fileList) {
      // this.videoFlag = true;
      // this.videoUploadPercent = file.percentage.toFixed(0);

      // console.log(event.percent, file, fileList)
      this.videoFlag = true;
      // this.videoUploadPercent = file.percentage.toFixed(0)
      // this.videoUploadPercent = event.percent.toFixed(0)
      this.videoUploadPercent = Math.floor(event.percent);
    },
    // 上传成功：
    handleVideoSuccess(res, file) {
      //获取上传图片地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if (res.status == 200) {
        this.videoForm.videoUploadId = res.data.uploadId;
        this.videoForm.Video = res.data.uploadUrl;
      } else {
        this.$message.error("视频上传失败，请重新上传！");
      }
    },
    handleChange(file, fileList) {
      // console.log('change',fileList)
      this.fileLists.push(file.raw);
    },
    /* 上传文件 */
    uploadImg(option) {
      // console.log('option',option)
      var upData = new FormData();
      this.loading = true;
      let _this = this;
      this.fileLists.forEach(function (file) {
        // 因为要上传多个文件，所以需要遍历
        upData.append("file[]", file, file.name);
        upData.append("root", _this.root);
      });
      this.$ajax.defaults.headers.common["token"] = getToken();
      this.$ajax
        .post("/api/file/uploads", upData, this.header)
        .then((res) => {
          this.loading = false;
          let path = res.data.data.url_path; //上传多张
          // let singlePath = path[path.length-1] //只可以上传一张
          if (this.shop) {
            this.$emit("childrenFun", path, "1");
          }
        })
        .catch(() => {
          this.loading = false;
        });
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
        let userData_sts = {
          Vod: {
            Title: _this.uploadInfo.title,
            CateId: "1000220325",
            Description: "店铺视频相册",
            WorkflowId:
              option.file.size < this.workFlow.size
                ? this.workFlow.w1
                : this.workFlow.w2,
            UserData: {
              Extend: {
                scene: "shop",
                shop_id: this.uploadInfo.shop_id,
              },
            },
          },
        };
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
    async uploadOk(obj) {
      console.info(obj);
      let { data } = await this.api.shop.shopVideoInsert({
        shop_id: Number(this.uploadInfo.shop_id),
        video_id: obj.videoId,
      });
      console.info(data);
      this.$message.success(
        data.msg + " 视频转码需要一定时间，稍后会在列表中显示。"
      );
      setTimeout(() => {
        this.$emit("childrenFun");
      }, 1000);
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
            merchant_id: Number(self.uploadInfo.merchant_id),
            shop_id: Number(self.uploadInfo.shop_id),
            title: self.uploadInfo.title,
            description: "店铺视频",
            file_name: uploadInfo.file.name,
            tags: "店铺视频",
            // workflow_id:
            //   uploadInfo.file.size < self.workFlow.size
            //     ? self.workFlow.w1
            //     : self.workFlow.w2,
            template_group_id:
              uploadInfo.file.size < self.templateGroup.size
                ? self.templateGroup.w1
                : self.templateGroup.w2,
          };
          console.info("getAuth参数：", datas);
          console.info("uploader：", uploader == self.uploadInfo);

          //获得上传凭据和地址
          let auth = self.api.shop.shopVideoGetAuth(datas).then((auth) => {
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
  width: 148px;
  height: 148px;
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
