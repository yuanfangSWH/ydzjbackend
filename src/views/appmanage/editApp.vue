<template>
  <div class="appBox">
    <div v-if="ruleForm.platform == 'IOS'">
      <div class="page-title">编辑IOS版本</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="包名" prop="name">
          <el-input
            class="formIpt"
            v-model="ruleForm.name"
            placeholder="请输入包名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input
            class="formIpt"
            v-model="ruleForm.version"
            placeholder="请输入版本号，例：1.0.0"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="更新内容" prop="summary">
          <el-input
            class="formIpt"
            type="textarea"
            clearable
            :autosize="{ minRows: 2, maxRows: 10 }"
            v-model="ruleForm.summary"
            placeholder="填写版本更新内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="审核中" prop="in_review">
          <el-switch
            v-model="ruleForm.in_review"
            :active-value="1"
            :inactive-value="0"
            active-color="#ffbe11"
            inactive-color="#d9d9d9"
            :disabled="isChecksh"
            @change="switchInreview"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="强制更新" prop="coerce_update">
          <el-switch
            v-model="ruleForm.coerce_update"
            :active-value="1"
            :inactive-value="0"
            active-color="#ffbe11"
            inactive-color="#d9d9d9"
            :disabled="isCheck"
            @change="switchCoerce"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="提示更新" prop="prompt_update">
          <el-switch
            v-model="ruleForm.prompt_update"
            :active-value="1"
            :inactive-value="0"
            active-color="#ffbe11"
            inactive-color="#d9d9d9"
            :disabled="isCheck"
            @change="switchPrompt"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="是否发布" prop="status">
          <el-switch
            v-model="value4"
            active-color="#ffbe11"
            inactive-color="#d9d9d9"
            @change="switchStatusIos"
          >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm', 'IOS')"
            >保存</el-button
          >
          <el-button @click="resetForm('ruleForm', 'IOS')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <div class="page-title">编辑Android版本</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="包名" prop="name">
          <el-input
            class="formIpt"
            v-model="ruleForm.name"
            placeholder="请输入包名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input
            class="formIpt"
            v-model="ruleForm.version"
            placeholder="请输入版本号，例：100"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="更新内容" prop="summary">
          <el-input
            class="formIpt"
            type="textarea"
            clearable
            :autosize="{ minRows: 2, maxRows: 10 }"
            v-model="ruleForm.summary"
            placeholder="填写版本更新内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道" prop="channel">
          <el-input
            class="formIpt"
            v-model="ruleForm.channel"
            placeholder="请输入渠道，例：100"
            clearable
          ></el-input>
          <div class="zhushi">
            (注：夜店之家-100；应用宝-101；360-102；华为-103；小米-104；OPPO-105；VIVO-106；魅族-107)
          </div>
        </el-form-item>
        <el-form-item label="上传包" required>
          <el-col :span="6">
            <el-form-item prop="url">
              <el-upload
                class="upload-demo"
                action="/file/uploads"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :http-request="uploadFile"
                :before-upload="beforeAvatarUpload"
                :on-change="handleChange"
                :multiple="false"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip">
                  <div>{{ textInfo }}</div>
                  <div class="tipText">
                    注：包名的命名规则必须为（<b>包名_渠道_版本号</b>.apk）
                  </div>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="强制更新" prop="coerce_update">
          <el-switch
            v-model="ruleForm.coerce_update"
            :active-value="1"
            :inactive-value="0"
            active-color="#ffbe11"
            inactive-color="#d9d9d9"
            @change="switchCoerce"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="提示更新" prop="prompt_update">
          <el-switch
            v-model="ruleForm.prompt_update"
            :active-value="1"
            :inactive-value="0"
            active-color="#ffbe11"
            inactive-color="#d9d9d9"
            @change="switchPrompt"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="是否发布" prop="status">
          <el-switch
            v-model="value3"
            active-color="#ffbe11"
            inactive-color="#d9d9d9"
            @change="switchStatus"
          >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm', 'Android')"
            >确定</el-button
          >
          <el-button @click="resetForm('ruleForm', 'Android')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      ruleForm: {
        id: "",
        name: "",
        version: "",
        summary: "",
        channel: "",
        platform: "ANDROID",
        url: "",
        coerce_update: 0,
        prompt_update: 0,
        status: 1,
        in_review: 0,
      },
      // upData:{},
      rules: {
        name: [{ required: true, message: "请输入包名", trigger: "blur" }],
        version: [
          { required: true, message: "请输入版本号，例1.0.0", trigger: "blur" },
        ],
        summary: [
          { required: true, message: "请输入更新内容", trigger: "blur" },
        ],
        channel: [
          { required: true, message: "请输入渠道，例：100", trigger: "blur" },
        ],
        url: [{ required: true, message: "请先上传包", trigger: "blur" }],
        // in_review: [{required: true, message: "请输选择是否审核中", trigger: "change"}]
      },
      value1: false,
      value2: false,
      value3: false,
      value4: false,
      fileList: [],
      header: {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=--------------------------AAAAA",
          AccessToken: getToken(),
        },
      },
      DataImg: [],
      fileData: "",
      textInfo: "未选择任何文件",
      loading: "",
      //
      myDate: "",
      year: "", //获取年
      month: "", //获取月，默认从0开始，所以要加一
      date: "", //获取日
      hours: "", //获取小时
      minutes: "", //获取分
      seconds: "", //获取秒
      weekend: "", //获取星期几，这里获得到的是数字1-7，所以我下面自己new了一个数组把获取到的数字当下标
      weeks: [],
      day: "", //这样就是显示的星期x了
      apkArr: [],
      isChecksh: false,
      isCheck: false,
      ossBucket: "ddhi",
      status:1
    };
  },
  created() {
    if (process.env.NODE_ENV == "staging") {
      this.ossBucket = "ddhitest";
    } else {
      this.ossBucket = "ddhi";
    }
    if (this.$route.query.id) {
      this.ruleForm.id = this.$route.query.id;
      this.ruleForm.platform = this.$route.query.platform;
      this.status = this.$route.query.status
      this.getDetaile();
    }
    this.changeTime();
  },
  methods: {
    // 获取当前时间
    changeTime() {
      (this.myDate = new Date()),
        (this.year = this.myDate.getFullYear()), //获取年
        (this.month = this.myDate.getMonth() + 1), //获取月，默认从0开始，所以要加一
        (this.date = this.myDate.getDate()), //获取日
        (this.hours = this.myDate.getHours()), //获取小时
        (this.minutes = this.myDate.getMinutes()), //获取分
        (this.seconds = this.myDate.getSeconds()), //获取秒
        (this.weekend = this.myDate.getDay()), //获取星期几，这里获得到的是数字1-7，所以我下面自己new了一个数组把获取到的数字当下标
        (this.weeks = new Array(
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        )),
        (this.day = this.weeks[this.weekend]); //这样就是显示的星期x了
      if (this.month < 10) {
        this.month = "0" + this.month;
      }
      if (this.date < 10) {
        this.date = "0" + this.date;
      }
      if (this.hours < 10) {
        this.hours = "0" + this.hours;
      }
      if (this.minutes < 10) {
        this.minutes = "0" + this.minutes;
      }
      if (this.seconds < 10) {
        this.seconds = "0" + this.seconds;
      }
    },
    getDetaile() {
      this.fileList = [];
      let data = {
        id: this.ruleForm.id,
      };
      this.api.appmanage.appDetail(data).then((res) => {
        this.ruleForm = res.data.data;
        this.value1 = this.ruleForm.coerce_update ? true : false;
        this.value2 = this.ruleForm.prompt_update ? true : false;
        this.value3 = this.ruleForm.status ? true : false;
        this.value4 = this.ruleForm.status ? true : false;
        this.apkArr[0] = this.ruleForm.name;
        this.apkArr[1] = this.ruleForm.channel;
        this.apkArr[2] = this.ruleForm.version;
        if (this.ruleForm.coerce_update == 1 || this.ruleForm.prompt_update == 1) {
          this.isChecksh = true;
        }
        if (this.ruleForm.in_review == 1) {
          this.isCheck = true;
        }
        if (this.ruleForm.url) {
          this.textInfo = "";
        }
        let arr1 = [];
        arr1 = this.ruleForm.url.split("/");
        this.fileList.push({
          name: arr1[arr1.length - 1],
          url: this.ruleForm.url,
        });
        //  let arr = []
        //  if(this.ruleForm.url){
        //       arr = this.ruleForm.url.split('http://oss.ddhi.cn/')
        //       this.ruleForm.url = arr[1]
        //  }
      });
    },
    switchCoerce(val) {
      //console.info(val);
      if (val == 1) {
        this.ruleForm.prompt_update = 0;
      }
      //强制更新
      // if (val) {
      //   this.isChecksh = true;
      //   this.value4 = false;
      //   this.value2 = false;
      // } else {
      //   this.isChecksh = false;
      // }
      // this.ruleForm.coerce_update = this.value1 ? 1 : 0;
      // this.ruleForm.prompt_update = this.value1 ? 0 : 1;
    },
    switchPrompt(val) {
      if (val == 1) {
        this.ruleForm.coerce_update = 0;
      }
      //提示更新
      // if (val) {
      //   this.isChecksh = true;
      //   this.value4 = false;
      //   this.value1 = false;
      // } else {
      //   this.isChecksh = false;
      // }
      // this.ruleForm.prompt_update = this.value2 ? 1 : 0;
      // this.ruleForm.coerce_update = this.value2 ? 0 : 1;
    },
    switchStatus(val) {
      this.ruleForm.status = this.value3 ? 1 : 0;
    },
    switchStatusIos(val) {
      this.ruleForm.status = this.value4 ? 1 : 0;
    },
    switchInreview(val) {
      if (val == 1) {
        this.isCheck = true;
        this.ruleForm.prompt_update = 0;
        this.ruleForm.coerce_update = 0;
      } else {
        this.isCheck = false;
      }
      //this.ruleForm.in_review = this.value4 ? 1 : 0;
    },
    // 提交更新
    submitForm(formName, type) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.ruleForm;
          if (this.ruleForm.platform == "IOS") {
            //IOS
            delete data.channel;
            delete data.url;
            this.api.appmanage.updateApp(data).then((res) => {
              this.$message({
                message: "" + res.data.msg,
                type: "success",
              });
              this.$router.push("/appList?type="+type+"&status="+this.status);
            });
          } else {
            //安卓
            if (this.apkArr.length != 3) {
              this.$message({
                message: "apk包的命名规则不对哦",
                type: "error",
              });
            } else {
              var isnum1 = /^\d+$/.test(this.apkArr[1]);
              // var isnum2 = /^\d+$/.test(this.apkArr[2]);
              if (!isnum1) {
                this.$message({
                  message: "apk包的命名规则不对哦",
                  type: "error",
                });
              } else {
                delete data.in_review;
                this.api.appmanage.updateApp(data).then((res) => {
                  this.$message({
                    message: "" + res.data.msg,
                    type: "success",
                  });
                  this.$router.push("/appList?type="+type+"&status="+this.status);
                });
              }
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName, type) {
      this.$refs[formName].resetFields();
      this.$router.push("/appList?type="+type+"&status="+this.status);
    },
    handleRemove(file, fileList) {
      // console.log('删除',file);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，请先删除原有文件再上传新文件`
      );
    },
    // 文件状态改变时的钩子 添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      this.fileData = file;
      this.DataImg.push(file.raw);
    },
    beforeAvatarUpload(file) {
      let fileType = file.name.split(".")[file.name.split(".").length - 1];
      const isAPK = fileType === "apk";
      if (!isAPK) {
        this.$message.error("上传包文件只能是 apk 格式!");
      }
      return isAPK;
    },
    uploadFile(options) {
      var _this = this;
      _this.fileList = [];
      let data = {};
      this.api.appmanage.getfileSts(data).then((res) => {
        _this.openFullScreen();
        //阿里云oss配置
        let OSS = require("ali-oss");
        let client = new OSS({
          accessKeyId: res.data.data.Credentials.AccessKeyId,
          accessKeySecret: res.data.data.Credentials.AccessKeySecret,
          stsToken: res.data.data.Credentials.SecurityToken,
          bucket: _this.ossBucket,
        });
        async function put() {
          try {
            // object表示上传到OSS的名字，可自己定义
            // file浏览器中需要上传的文件，支持HTML5 file 和 Blob类型
            let r1 = await client.put(
              "app/" +
                _this.year +
                "/" +
                _this.month +
                "/" +
                _this.date +
                "/" +
                options.file.name,
              options.file
            );
            // console.log('put success: %j', r1);
            if (r1.url) {
              _this.loading.close();
              _this.textInfo = "文件已上传成功";
            }
            _this.ruleForm.url = r1.url;
            // 获取包名、渠道、版本号
            var apkUrl = r1.url;
            if (apkUrl.indexOf("/") != -1) {
              _this.apkArr = apkUrl.split("/");
            }
            if (apkUrl.indexOf(".apk") != -1) {
              _this.apkArr = _this.apkArr[_this.apkArr.length - 1].split(
                ".apk"
              );
            }
            _this.ruleForm.name = _this.apkArr[0];
            if (apkUrl.indexOf("_") != -1) {
              _this.apkArr = _this.apkArr[0].split("_");
            }
            _this.ruleForm.channel = _this.apkArr[1];
            _this.ruleForm.version = _this.apkArr[2];
            //end
            _this.fileList.push({
              name: options.file.name,
              url: r1.url,
            });
            // let r2 = await client.get(options.file.name);
            // console.log('get success: %j', r2);
          } catch (e) {
            console.error("error: %j", e);
          }
        }
        put();
      });
    },
    // 显示加载中
    openFullScreen() {
      this.loading = this.$loading({
        lock: true,
        text: "文件正在上传，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      // setTimeout(() => {
      //   this.loading.close();
      // }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-upload__tip {
  line-height: 24px;
}
.tipText {
  line-height: 24px;
  color: #f00;
}
.el-button--primary {
  color: #000;
  background-color: #ffbe11 !important;
  border-color: #ffbe11 !important;
}
.appBox {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 15px 15px;
  padding: 15px 15px;
  .demo-ruleForm {
    .formIpt {
      width: 40%;
    }
  }
  .zhushi {
    font-size: 12px;
    color: #666;
  }
}
</style>