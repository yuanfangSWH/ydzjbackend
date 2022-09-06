<template>
  <div class="uploadFiles">
    <!-- <el-dialog :visible.sync="dialogVisible">
      <img :key="dialogImageUrl" width="100%" :src="dialogImageUrl" alt />
    </el-dialog>-->
    <!-- 超出数量的弹窗 -->
    <!-- <el-dialog title="提示" :visible.sync="chaochudialogVisible" width="30%">
      <span>{{tishi}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chaochudialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="chaochudialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>-->
    <el-upload
      class="upload-demo"
      action="/"
      :limit="limit"
      :file-list="fileListSVG"
      :http-request="uploadSVG"
      :before-upload="beforeAvatarUpload"
      :on-error="failureMethods"
      :on-change="handleChange"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传不超过20M的SVG文件</div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  name: "UploadSvg",
  props: {
    //选中的数据
    currenItem: {},
  },
  data() {
    return {
      cheSVG: "",
      limit: 1,
      //请求头部
      header: {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=--------------------------AAAAA",
          AccessToken: getToken(),
        },
      },
      clentSts: {},
      fileListSVG: [],
      dialogImageUrl: "",
      dialogVisible: false,
      chaochudialogVisible: false,
      tishi: "",
      isAdd: true,
      //确认状态
      is_confirmed: false,
    };
  },
  methods: {
    //限制
    beforeAvatarUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message({
          message: "上传SVG文件大小不能超过 20MB!",
          type: "warning",
        });
      }
      return isLt20M;
    },
    // 文件状态改变时的钩子 添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      this.fileListSVG.push(file.raw);
    },
    /* 覆盖默认的上传行为 - 上传SVG文件 */
    uploadSVG(option) {
      var _this = this;
      var upData = new FormData();
      upData.append("upload", this.fileListSVG[0]);
      upData.append("merchant_id", _this.currenItem.merchant_id);
      upData.append("shop_id", _this.currenItem.shop_id);
      upData.append("is_confirmed", _this.is_confirmed);
      this.cheSVG = this.fileListSVG;
      this.$ajax
        .post("/api/shopset/shop/uploadSvg", upData, this.header)
        .then((res) => {
          if (res.data.code != 0) {
            //弹框确认
            this.$confirm(res.data.msg, "提示", {
              confirmButtonText: "继续上传",
              cancelButtonText: "放弃",
              type: "warning",
            })
              .then(() => {
                _this.is_confirmed = true;
                _this.uploadSVG();
              })
              .catch(() => {
                _this.fileListSVG = [];
                _this.is_confirmed = false;
              });
          } else {
            this.fileListSVG = [];
            this.is_confirmed = false;
            this.$emit("theSVG", res.data.data.svg_url);
          }
        });
    },
    //文件上传失败时的钩子
    failureMethods() {
      this.$message({
        message: "上传SVG文件失败，网络质量不佳或未知错误，请重试",
        type: "warning",
      });
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
