<template>
  <div class="advertiseEdit">
    <div class="title">
      <span>{{ title }} </span>
    </div>
    <div class="formBox">
      <div class="leftForm">
        <el-form
          :model="formData"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="广告名称" placeholder="请输入内容" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="上传广告图" prop="content">
            <div style="display: flex">
              <div id="uploadImage" style="position: relative">
                <el-image
                  alt=""
                  :src="formData.content"
                  style="margin-right: 20px"
                >
                </el-image>
                <i class="el-icon-delete" @click="delImage"></i>
              </div>
              <el-upload
                action="/api/file/uploads"
                name="file[]"
                :data="{ root: 'ads' }"
                :limit="1"
                :headers="{ AccessToken: this._getToken() }"
                list-type="picture-card"
                :on-exceed="handleExceed"
                :on-success="handleSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </div>
          </el-form-item>
          <el-form-item label="跳转链接" placeholder="请输入内容">
            <el-input
              v-model="formData.href"
              class="long-input-box"
              :title="formData.href"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="投放平台"
                        prop="platform">
            <el-select v-model="formData.platform"
                       placeholder="请选择">
              <el-option v-for="item in platformList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="有效时间"
                        placeholder="请输入内容"
                        prop="start_time">
            <el-date-picker v-model="formData.start_time"
                            type="datetime"
                            placeholder="设置开始时间">
            </el-date-picker>- <el-date-picker v-model="formData.end_time"
                            type="datetime"
                            placeholder="选择结束时间">
            </el-date-picker>
          </el-form-item> -->
          <el-form-item label="有效时间">
            <el-row style="width: 800px">
              <el-col :span="8">
                <el-form-item prop="start_time">
                  <el-date-picker
                    v-model="formData.start_time"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm"
                    placeholder="设置开始时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1"> - </el-col>
              <el-col :span="6">
                <el-form-item prop="end_time">
                  <el-date-picker
                    v-model="formData.end_time"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm"
                    placeholder="选择结束时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            label="排序"
            prop="sort"
            :rules="[
              { required: true, message: '请输入排序', trigger: 'blur' },
              { type: 'number', message: '排序必须为数字值', trigger: 'blur' },
            ]"
          >
            <el-input
              placeholder="请输入排序值"
              type="sort"
              v-model.number="formData.sort"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <!-- <el-select v-model="formData.status"
                       placeholder="请选择">
              <el-option v-for="item in statusList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select> -->
            <el-switch
              v-model="formData.status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="需要登录" prop="need_login">
            <el-switch
              v-model="formData.need_login"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="版本控制" prop="ver">
            <el-input
              placeholder="版本号"
              v-model="verNum"
              class="input-with-select"
            >
              <el-select
                v-model="verPrefix"
                slot="prepend"
                placeholder="条件符"
              >
                <el-option label="等于" value=""></el-option>
                <el-option label="大于" value=">"></el-option>
                <el-option label="大于等于" value=">="></el-option>
                <el-option label="小于" value="<"></el-option>
                <el-option label="小于等于" value="<="></el-option>
                <el-option label="不等于" value="<>"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('ruleForm')" type="primary"
              >保存</el-button
            >
            <el-button
              @click="
                () => {
                  this.$emit('handleCloseVisible', false);
                }
              "
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      title: "",
      ver: "",
      verPrefix: "",
      verNum: "",
      formData: {
        name: "",
        type: null,
        status: 1,
        pos_id: null,
        sort: 0,
        href: null,
        content: null,
        gender: null,
        ver: null,
        hits: null,
        summary: null,
        ad_id: null,
        end_time: null,
        start_time: null,
        need_login: 0,
      },
      platformList: [
        { label: "全平台", value: 0 },
        { label: "android", value: 1 },
        { label: "ios", value: 2 },
        { label: "小程序", value: 3 },
      ],
      statusList: [
        { label: "启用", value: 1 },

        { label: "禁用", value: 0 },
      ],
      rules: {
        name: { required: true, message: "请输入广告名称", trigger: "blur" },
        // sort: [{ required: true, message: '请输入排序', trigger: 'blur' },
        //   { type: 'number', required: true, message: '请输入数字', trigger: 'change' },
        // ],
        href: { required: true, message: "请输入跳转链接", trigger: "blur" },
        content: { required: true, message: "请上传示例图", trigger: "change" },
        status: { required: true, message: "请选择状态", trigger: "change" },
        // start_time: { required: true, message: '请选择开始时间', trigger: 'blur' },
        // end_time: { required: true, message: '请选择结束时间', trigger: 'blur' },
      },
      dialogImageUrl: "",
      dialogVisible: false,
      adTableData: [],
    };
  },
  props: {
    ad_id: {
      default: null,
    },
  },
  watch: {
    ad_id(newVal, oldVal) {
      this.ad_id = newVal;
      if (this.ad_id) {
        this.title = "编辑广告";
        this.advertiseDetail();
      } else {
        this.resetParams();
        this.title = "新增广告";
      }
    },
  },
  created() {
    this.formData.pos_id = parseInt(this.$route.query.id);
    if (this.ad_id) {
      this.title = "编辑广告";
      this.advertiseDetail();
    } else {
      this.title = "新增广告";
    }
  },
  mounted() {
    if (!this.ad_id) {
      document.getElementById("uploadImage").style.display = "none";
    }
  },
  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed() {
      this.$message.error("超出最大上传数量！");
    },
    delImage() {
      document.getElementById("uploadImage").style.transform =
        "translateY(-10px)";
      document.getElementById("uploadImage").style.opacity = 0;
      setTimeout(() => {
        document.getElementById("uploadImage").style.display = "none";
        this.formData.content = null;
      }, 300);
    },
    // 上传成功
    handleSuccess(res) {
      document.getElementById("uploadImage").style.display = "none";
      this.formData.content = res.data ? res.data.url_path[0] : res;
    },
    // 提交
    submitForm(formName) {
      this.formData.ver = this.verPrefix + this.verNum;
      console.info(this.formData);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ad_id) {
            this.editAdvertise();
          } else {
            this.addAdvertise();
          }
        } else {
          return false;
        }
      });
    },
    // 新增
    addAdvertise() {
      this.formData.start_time = moment(this.formData.start_time).format(
        "YYYY-MM-DD HH:mm"
      );
      this.formData.end_time = moment(this.formData.end_time).format(
        "YYYY-MM-DD HH:mm"
      );
      console.log(this.formData.start_time, this.formData.end_time);
      this.formData.sort = parseInt(this.formData.sort);
      this.api.advertiseManage.addAdvertise(this.formData).then((res) => {
        this.$message.success("新增成功！");
        // this.$router.push({ path: '/advertiseManage' })
        this.$emit("handleCloseVisible", false, "success");
      });
    },
    // 编辑
    editAdvertise() {
      this.api.advertiseManage.editAdvertise(this.formData).then((res) => {
        this.$message.success("编辑成功！");
        // this.$router.push({ path: '/advertiseManage' })
        this.$emit("handleCloseVisible", false, "success");
      });
    },
    // 获取详情
    advertiseDetail() {
      this.api.advertiseManage
        .advertiseDetail({ ad_id: this.ad_id })
        .then((res) => {
          let {
            pos_id,
            name,
            sort,
            href,
            status,
            content,
            start_time,
            ad_id,
            end_time,
            ver,
            need_login,
          } = res.data.data;
          let obj = {
            name,
            sort,
            href,
            status,
            content,
            start_time,
            pos_id,
            ad_id,
            end_time,
            ver,
            need_login,
          };
          this.formData = Object.assign({}, this.formData, obj);
          this.setVer();
          if (document.querySelector(".el-upload-list__item>img")) {
            document
              .querySelector(".el-upload-list__item>img")
              .setAttribute("src", content);
          }
        });
    },
    setVer() {
      let ver = this.formData.ver;
      this.ver = ver;
      console.info(ver);
      if (ver) {
        if (ver.indexOf("<>") == 0) {
          this.verPrefix = "<>";
          this.verNum = ver.split("<>")[1];
        } else if (ver.indexOf(">=") == 0) {
          this.verPrefix = ">=";
          this.verNum = ver.split(">=")[1];
        } else if (ver.indexOf("<=") == 0) {
          this.verPrefix = "<=";
          this.verNum = ver.split("<=")[1];
        } else if (ver.indexOf(">") == 0) {
          this.verPrefix = ">";
          this.verNum = ver.split(">")[1];
        } else if (ver.indexOf("<") == 0) {
          this.verPrefix = "<";
          this.verNum = ver.split("<")[1];
        } else {
          this.verPrefix = "";
          this.verNum = ver;
        }
      }
    },
    resetParams() {
      this.formData = {
        name: "",
        type: null,
        status: 1,
        pos_id: null,
        sort: null,
        href: null,
        content: null,
        gender: null,
        ver: null,
        hits: null,
        summary: null,
        ad_id: null,
        end_time: null,
        start_time: null,
        ver: null,
      };
      if (document.querySelector(".el-upload-list__item")) {
        document.querySelector(".el-upload-list__item").style.display = "none";
      }
      if (document.querySelector("#uploadImage")) {
        document.querySelector("#uploadImage").style.display = "none";
      }
    },
  },
};
</script>

<style lang="scss">
.long-input-box .el-input__inner {
  width: 500px !important;
}
.advertiseEdit {
  background-color: #fff;
  margin: 20px;
  padding-top: 20px;
  padding-bottom: 40px;
  .title {
    overflow: hidden;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    > span {
      margin-left: 10px;
      font-size: 22px;
    }
    .el-button {
      float: right;
      margin-right: 20px;
      width: 100px;
    }
  }
  .el-input__inner,
  .el-textarea__inner {
    width: 240px;
  }
  #uploadImage {
    position: relative;
    width: 148px;
    height: 148px;
    margin-right: 20px;
    border-radius: 10px;
    transition: transform 0.3s, opacity 0.3s;
    .el-image {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
      color: #fff;
      font-size: 18px;
      display: none;
      cursor: pointer;
    }
  }
  #uploadImage:hover i {
    display: inline-block;
  }
}
</style>