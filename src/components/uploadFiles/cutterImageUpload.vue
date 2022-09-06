<template>
  <div class="image-box">
    <div
      class="img-div"
      v-for="(item, index) in file_list"
      :key="index"
      :style="
        option.showImageWidth && option.showImageHeight
          ? 'width:' +
            option.showImageWidth +
            'px;height:' +
            option.showImageHeight +
            'px;'
          : ''
      "
    >
      <img
        class="d-img"
        :style="
          option.showImageWidth && option.showImageHeight
            ? 'width:' +
              option.showImageWidth +
              'px;height:' +
              option.showImageHeight +
              'px;'
            : ''
        "
        :src="item.url"
        alt=""
        @mouseover="picMouseover(index)"
        @mouseleave="picMouseleave()"
        @click="showImg(item.url)"
      />

      <div
        class="del-icon"
        v-show="showBtnIndex == index"
        @click="deletePotoFun(index)"
        @mouseover="picMouseover(index)"
        @mouseleave="picMouseleave()"
      >
        <i class="delete-i el-icon-delete"></i>
      </div>
    </div>
    <el-alert
      v-show="file_list.length >= limit"
      :title="
        '图片数已经到达限制数：' + limit + '张。 请删掉一些图片后才能上传。'
      "
      type="warning"
      :closable="false"
    >
    </el-alert>
    <Imgcutter
      v-show="file_list.length < limit"
      @cutDown="cutDown"
      :boxHeight="option.boxHeight"
      :cutWidth="option.cutWidth"
      :cutHeight="option.cutHeight"
      :sizeChange="option.sizeChange"
      :isModal="option.isModal == undefined ? true : option.isModal"
    ></Imgcutter>
    <el-dialog :visible.sync="dialogVisible">
      <img :key="dialogImageUrl" width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
  name: "cutterImageUpload",
  props: {
    fileList: { type: Array }, //图片列表
    option: { type: Object }, //cutter参数
    root: { type: String }, //上传路径
    limit: { type: Number, default: 1 }, //上传数量限制
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
      loading: false,
      file_list: [],
      showBtnIndex: null,
      oss_url: this.GetImageOssUrl(),
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  watch: {
    fileList: function (v) {
      this.file_list = v ? v : [];
    },
  },
  methods: {
    showImg(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    picMouseover(i) {
      this.showBtnIndex = i;
    },
    picMouseleave() {
      this.showBtnIndex = null;
    },
    //删除图片
    deletePotoFun(i) {
      this.$confirm("确定删除吗？").then(() => {
        this.file_list.splice(i, 1);
        this.$emit("upload", this.file_list);
      });
    },
    clearAllImage() {
      this.file_list = [];
    },
    getAllImage() {
      return this.file_list;
    },
    cutDown: function (img) {
      const isLt2M = img.file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message({
          message: "上传失败，图片不能大于2M，请重新选择图片",
          type: "warning",
        });
      } else {
        var formData = new FormData();
        formData.append("file[]", img.file);
        formData.append("root", this.root);
        this.$ajax
          .post("/api/file/uploads", formData, this.header)
          .then((res) => {
            if (res.data.code == 0) {
              this.file_list.push({
                url: this.oss_url + res.data.data.url_path[0],
              });
              this.$emit("upload", this.file_list);
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image-box {
  .img-div {
    width: 148px;
    display: inline-block;
    margin: 0 6px 4px 0;
    position: relative;
    z-index: 0;
    .d-img {
      width: 146px;
      height: 146px;
      display: inline-block;
      border: 1px solid #eeeeee;
      border-radius: 6px;
    }
    .v-img {
      width: 146px;
      height: 146px;
      display: inline-block;
      border: 1px solid #eeeeee;
      border-radius: 6px;
    }
    .del-icon {
      position: absolute;
      z-index: 1;
      top: 10px;
      right: 10px;
      width: 24px;
      height: 24px;
      border-radius: 100%;
      line-height: 24px;
      text-align: center;
      background: #fff;
    }
    .del-icon2 {
      position: absolute;
      z-index: 2;
      top: 10px;
      right: 10px;
      width: 24px;
      height: 24px;
      border-radius: 100%;
      line-height: 24px;
      text-align: center;
      .delete-i {
        font-size: 12px !important;
        color: #ffffff;
        position: relative;
        top: -2px;
        line-height: 24px !important;
      }
    }
  }
}
</style>
