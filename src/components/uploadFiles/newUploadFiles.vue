<!-- 从商家后台搬运 -->
<template>
  <div class="uploadFiles">
    <el-upload
      v-show="this.root != ''"
      action="/api/file/uploads"
      list-type="picture-card"
      :limit="limit"
      :file-list="TfileList"
      :on-preview="handlePictureCardPreview"
      :http-request="uploadImg"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :before-upload="beforeAvatarUpload"
      :on-exceed="exceedFun"
      :on-remove="removeFun"
      ref="upload_file"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <h4 v-show="this.root == ''">没有设置路径“root”...</h4>
    <el-dialog :visible.sync="dialogVisible">
      <img :key="dialogImageUrl" width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <!-- 超出数量的弹窗 -->
    <el-dialog title="提示" :visible.sync="chaochudialogVisible" width="30%">
      <span>{{ tishi }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chaochudialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="chaochudialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth"; // get token from cookie

// import { getFileName } from 'ali-oss'
const OSS = require("ali-oss");
export default {
  name: "newUploadFiles",
  props: {
    limit: Number,
    TfileList: Array,
    shop: Boolean,
    root: { type: String, default: "" },
    //dialogVisible:Boolean
  },
  data() {
    return {
      header: {
        headers: {
          "Content-Type": "multipart/form-data; boundary=--------------------------AAAAA",
          AccessToken: getToken(),
        },
      },
      clentSts: {},
      fileLists: [],
      dialogImageUrl: "",
      dialogVisible: false,
      chaochudialogVisible: false,
      tishi: "",
      isAdd: true,
    };
  },
  methods: {
    removeFun(file, fileList) {
      // console.log('被移除的',file)
      // console.log('图片列表',fileList)
      let arr = [],
        arr2 = [],
        arr3 = [];
      for (var i = 0; i < fileList.length; i++) {
        arr = fileList[i].url.split("/upload");
        arr3[i] = "/upload" + arr[1];
        arr2.push(arr3[i]);
      }
      this.isAdd = false;
      // console.log('子', arr2)
      if (this.shop) {
        return;
      } else {
        this.$emit("childrenFun", arr2, this.isAdd);
      }
    },
    exceedFun() {
      if (this.limit == 1) {
        this.chaochudialogVisible = true;
        this.tishi = "只能上传1张图片，请先删除原有图片，再上传新的图片";
      } else if (this.limit == 6) {
        this.chaochudialogVisible = true;
        this.tishi = "只能上传6张图片，请先删除要替换的图片，再上传新的图片";
      }
    },
    // 文件状态改变时的钩子 添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      // console.log('change',fileList)
      this.fileLists.push(file.raw);
    },
    /* 上传文件 */
    uploadImg(option) {
      var upData = new FormData();
      let _this = this;
      this.fileLists.forEach(function (file) {
        // 因为要上传多个文件，所以需要遍历
        upData.append("file[]", file, file.name);
        upData.append("root", _this.root);
      });
      this.$ajax.defaults.headers.common["token"] = getToken();
      this.$ajax.post("/api/file/uploads", upData, this.header).then((res) => {
        this.isAdd = true;
        let path = res.data.data.url_path; //上传多张
        let singlePath = path[path.length - 1]; //只可以上传一张
        //this.$refs["upload_file"].clearFiles();
        if (this.limit == 1) {
          this.$emit("childrenFun", singlePath, this.isAdd);
        } else if (this.shop) {
          this.$emit("childrenFun", path, "0");
        } else {
          this.$emit("childrenFun", path, this.isAdd);
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 获取上传文件参数
    getFileSts() {
      this.$store.dispatch("shop/getFileSts").then((res) => {
        this.clentSts = res.data.Credentials;
      });
    },
    // 覆盖默认的上传行为，可以自定义上传的实现
    async handleUploadSTS(option) {
      // action:http://ddhi.oss-cn-hangzhou.aliyuncs.com
      try {
        this.clentSts = await this.$store.dispatch("shop/getFileSts").then((res) => {
          return res.data.Credentials;
          // console.log('filests:', this.fileSts)
        });
        console.log("this.clentSts:", this.clentSts);
        console.log("option:", option);

        // 拿到上传的文件
        const file = option.file;
        const point = file.name.lastIndexOf(".");
        const suffix = file.name.substr(point);
        // // 定义上传文件的名字+后缀
        const storeAs = "product/" + Date.parse(new Date()) + suffix;

        const client = new OSS({
          accessKeyId: this.clentSts.AccessKeyId,
          accessKeySecret: this.clentSts.AccessKeySecret,
          stsToken: this.clentSts.SecurityToken,
          region: "oss-cn-hangzhou", // oss地区
          bucket: "ddhi",
        });
        // // 调用上传接口
        const ret = await client.multipartUpload(storeAs, file, {
          progress: async function (p) {
            console.log("p:", p);
            const e = {};
            e.percent = p * 100;
            option.onProgress(e);
          },
        });
        console.log(ret);
        if (ret.res.statusCode === 200) {
          // option.onSuccess(ret)
          return ret;
        } else {
          option.onError("上传失败");
        }
      } catch (error) {
        console.error(error);
        option.onError("上传失败");
        this.$error(error.message);
      }
    },

    // 文件上传成功时的钩子
    handleSuccess(response) {
      // this.fileLists = fileList
      console.log("response.res.status:", response);
      if (response.res.status === 200) {
        console.log("上传了");
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
  },
};
</script>

<style lang="scss" scoped>
.uploadFiles {
  position: relative;
  .upload {
    width: 300px;
    height: 200px;
    border: 1px solid #eee;
    text-align: center;
    cursor: pointer;
    transition: all 0.2 linear;
    &:hover {
      border: 1px solid #ccc;
      i {
        margin-top: 18px;
      }
    }
    i {
      margin-top: 20px;
      font-size: 100px;
    }
  }
  .avatar {
    width: 100%;
  }
  .el-upload-dragger {
    height: auto !important;
  }
}
</style>
