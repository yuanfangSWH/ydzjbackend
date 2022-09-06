<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">天天总后台管理系统</h3>
      </div>

      <el-form-item v-if="loginType == 1" prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user1" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item v-if="loginType == 1" prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item v-if="loginType == 2" prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="phone"
          v-model="loginForm.phone"
          placeholder="请输入手机号"
          name="phone"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item v-if="loginType == 2" prop="captcha">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="captcha"
          v-model="loginForm.captcha"
          class="captcha"
          placeholder="请输入短信验证码"
          name="captcha"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
        <el-button class="getCaptcha" plain @click="getCaptcha"
          >获取短信验证码</el-button
        >
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登 录</el-button
      >

      <div class="tips">
        <!-- <el-radio v-model="loginType" label="1">账号登录</el-radio>
        <el-radio v-model="loginType" label="2">手机登录</el-radio> -->

        <el-link
          v-show="loginType == 2"
          v-model="loginType"
          :underline="false"
          class="accountLogin"
          @click="loginType = 1"
          >账号登录</el-link
        >
        <el-link
          v-show="loginType == 1"
          v-model="loginType"
          :underline="false"
          class="phoneLogin"
          @click="loginType = 2"
          >手机登录</el-link
        >
        <el-link :underline="false" class="forgot" @click="forgotPsw"
          >忘记密码?</el-link
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername, validPhone } from "@/utils/validate";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback();
        // callback(new Error('请输入正确的用户名'))
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位字符"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      ajaxConfig: {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
      loginForm: {
        username: "",
        password: "",
        phone: "",
        captcha: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        phone: [{ required: true, trigger: "blur", validator: validatePhone }],
      },
      captchaData: {
        phone: "",
        scene: 1,
      },
      loading: false,
      loginType: 1,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    console.info(this.getSystem());
  },
  methods: {
    /* 获取验证码 */
    getCaptcha(data) {
      this.captchaData.phone = this.loginForm.phone;
      this.$store
        .dispatch("login/getCaptcha", this.captchaData)
        .then((res) => {})
        .catch(() => {
          this.loading = false;
        });
    },
    getSystem() {
      var os = navigator.platform;
      var userAgent = navigator.userAgent;
      var info = "";
      var tempArray = "";
      if (os.indexOf("Win") > -1) {
        if (userAgent.indexOf("Windows NT 5.0") > -1) {
          info += "Win2000";
        } else if (userAgent.indexOf("Windows NT 5.1") > -1) {
          info += "WinXP";
        } else if (userAgent.indexOf("Windows NT 5.2") > -1) {
          info += "Win2003";
        } else if (userAgent.indexOf("Windows NT 6.0") > -1) {
          info += "WindowsVista";
        } else if (
          userAgent.indexOf("Windows NT 6.1") > -1 ||
          userAgent.indexOf("Windows 7") > -1
        ) {
          info += "Win7";
        } else if (userAgent.indexOf("Windows 8") > -1) {
          info += "Win8";
        } else if (userAgent.indexOf("Windows NT 10") > -1) {
          info += "Win10";
        } else {
          info += "Windows";
        }
      } else if (os.indexOf("Mac") > -1) {
        if (userAgent.indexOf("Mac OS X 11") > -1) {
          info += "Mac OS X 11";
        } else if (userAgent.indexOf("Mac OS X 10") > -1) {
          info += "Mac OS X 10";
        } else if (userAgent.indexOf("Mac OS X 9") > -1) {
          info += "Mac OS X 9";
        } else {
          info += "Mac OS";
        }
      } else if (os.indexOf("X11") > -1) {
        info += "Unix";
      } else if (os.indexOf("Linux") > -1) {
        info += "Linux";
      } else {
        info += "Other";
      }
      info += "/";
      if (/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)) {
        tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
        info += tempArray[1] + tempArray[2];
      } else if (/MSIE \d+\.\d+/.test(userAgent)) {
        tempArray = /MS(IE) (\d+\.\d+)/.exec(userAgent);
        info += tempArray[1] + tempArray[2];
      } else if (/[Cc]hrome\/\d+/.test(userAgent)) {
        tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
        info += tempArray[1] + tempArray[2];
      } else if (
        /[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)
      ) {
        tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(
          userAgent
        );
        info += tempArray[3] + tempArray[1];
      } else if (/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)) {
        tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
        info += tempArray[1] + tempArray[2];
      } else {
        info += "unknown";
      }
      return info;
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          //console.log(this.loginType)
          const loginApi =
            this.loginType === 1 ? "login/login" : "login/phoneLogin";
          // console.log(loginApi)
          //const loginData = this.loginType === '1' ? this.loginForm : this.loginForm
          let data = this.loginForm;
          if (this.loginType === 1) data["os"] = this.getSystem();
          this.$store
            .dispatch(loginApi, data)
            .then((res) => {
              // console.log('login sussess：', res)
              //sessionStorage.setItem('userInfo', JSON.stringify(res.data))
              localStorage.setItem("userInfoBackend", JSON.stringify(res.data));
              //this.$store.commit("userinfo", res);
              this._setVuex("userinfo", res.data);
              localStorage.setItem(
                "strawberry",
                JSON.stringify(res.data.oss_url)
              );
              //this.getShopList()
              this.$router.push({ path: "/HomeIndex" });
              // if (res.data.shop_id === 0) {
              //   this.$router.push({ path: '/shopset' })
              // } else {
              //   this.$router.push({ path: '/' })
              // }
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    /* 获取登录后的商家列表 */
    getShopList() {
      this.$store.dispatch("shop/getShopInfo").then((res) => {
        sessionStorage.setItem("shopList", JSON.stringify(res.data));
      });
    },

    forgotPsw() {
      this.$router.push({ path: "/forgot" });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .captcha {
      width: 60% !important;
    }
    .forgot {
      cursor: pointer;
      color: #fff;
      float: right;
    }
    .accountLogin,
    .phoneLogin {
      cursor: pointer;
      color: #fff;
      &:hover {
        color: aqua;
      }
    }
    // .getCaptcha{
    //   color: #fff;
    //   cursor: pointer;
    // }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    .el-radio {
      color: #fff !important;
    }
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
