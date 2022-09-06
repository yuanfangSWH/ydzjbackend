<template>
  <div :class="classObj" class="app-wrapper">
    <div class="layoutTop">
      <div class="topLogo center"><span>总后台</span></div>
      <div class="topLeft center">
        <el-button @click="_toRouter({ path: '/ShopEdit' })"><i class="topIcon01 iconfont icon-control"></i>控制台</el-button>
        <!-- <el-button><i class="topIcon01 iconfont icon-reportform"></i>报表</el-button> -->
      </div>
      <div class="topRight center">
        <div style="position: relative">
          <i class="topIcon02 iconfont icon-smallbell"></i>
          <div class="litkshuz" v-if="monitoringData > 0">
            {{ monitoringData }}
          </div>
        </div>
        <div class="topNav">
          <div class="txnav">
            <img class="a-img" src="../assets/logo.png" alt="" />
          </div>
          <div class="shopNameNav" @click="showFun">
            <span class="name-span">{{ shopName }}</span
            ><i class="topIcon03 el-icon-arrow-down"></i>
          </div>
        </div>
      </div>
      <el-collapse-transition>
        <div class="meauNav" v-show="isShow">
          <div class="meau-box1 transition-box">
            <a
              class="meau-list"
              v-for="(item, index) in meauData"
              :key="index"
              @mousemove="mouseOver(index)"
              @mouseleave="mouseLeave(index)"
              :class="[item.status ? 'active' : '']"
              @click="subFun(item.type)"
            >
              <!-- <img v-if="index == 0 && item.status"
                   class="img"
                   src="../assets/shop2.png" />
              <img v-if="index == 0 && !item.status"
                   class="img"
                   src="../assets/shop3.png" />
              <img v-if="index == 1 && item.status"
                   class="img"
                   src="../assets/set_up.png" />
              <img v-if="index == 1 && !item.status"
                   class="img"
                   src="../assets/set_up2.png" />
              <img v-if="index == 2 && item.status"
                   class="img"
                   src="../assets/cancellation.png" />
              <img v-if="index == 2 && !item.status"
                   class="img"
                   src="../assets/cancellation2.png" /> -->
              <!-- <img class="img" :src="[item.status ? item.icon_active:item.icon]" alt=""> -->
              <span class="t-s01">{{ item.text }}</span>
              <div class="layer-nav" v-if="index == 0">
                <div
                  class="list-nav"
                  v-for="(item2, index2) in subMenuData"
                  :key="index2"
                  @click="changeShop(index2, item2.shopname)"
                >
                  <i
                    class="i-box"
                    :class="[item2.status ? 'el-icon-check' : '']"
                  ></i>
                  <span>{{ item2.shopname }}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </el-collapse-transition>
    </div>
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  mixins: [ResizeMixin],
  data() {
    return {
      mainMenu: JSON.parse(sessionStorage.getItem("staffMenu")),
      userInfo: {},
      meauData: [
        // {
        //   icon: "../assets/shop3.png",
        //   icon_active: "../assets/shop2.png",
        //   text: "切换店铺",
        //   status: false,
        // },
        // {
        //   icon: "../assets/set_up2.png",
        //   icon_active: "../assets/set_up.png",
        //   text: "账号管理",
        //   status: false,
        // },
        {
          icon: "../assets/cancellation2.png",
          icon_active: "../assets/cancellation.png",
          text: "修改密码",
          type: "changePassword",
          status: false,
        },
        {
          icon: "../assets/cancellation2.png",
          icon_active: "../assets/cancellation.png",
          text: "退出登录",
          type: "logout",
          status: false,
        },
      ],
      subMenuData: [
        //   { shopname: "上上酒吧", status: true },
        //   { shopname: "Hourse", status: false },
        //   { shopname: "深色", status: false },
      ],
      active: "",
      isShow: false,
      shopName: "",
      //数据数量
      monitoringData: 0,
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
  created() {
    this.specialTime();
    this.userInfo = JSON.parse(localStorage.getItem("userInfoBackend"));
    this.shopName = this.userInfo.admin.admin_account;
  },
  methods: {
    //定时查询订单数据
    specialTime() {
      this.$notify.closeAll();
      this.api.booking.getNotify().then((res) => {
        if (res.data.code == 0) {
          if (res.data.data.reserve_notify.wait_comfirm_num > 0) {
            this.monitoringData = res.data.data.reserve_notify.wait_comfirm_num;
            this.$notify({
              title: res.data.data.notify_time,
              message:
                "未处理预订中订单" +
                res.data.data.reserve_notify.wait_comfirm_num +
                "条，点击查看订单列表",
              duration: 20000,
              offset: 60,
              onClick: this.startLis,
            });
          }
          setTimeout(this.specialTime, 20000);
        }
      });
    },
    startLis() {
      this.$router.push({
        path: "/bookingList",
        query: {
          from: true,
        },
      });
    },
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    showFun() {
      this.isShow = !this.isShow;
    },
    subFun(type) {
      if (type == "logout") {
        this.$store.dispatch("login/logout").then(() => {
          //重新载入当前文档
          location.reload();
        });
      }
      console.log(type);
      if (type == "changePassword") {
        this._setVuex("pageTitle", "修改密码");
        console.log(111);
        this.$router.push({ path: "/changePassword" });
      }
      this.showFun();
    },
    // 移入
    mouseOver(index) {
      this.meauData.forEach((item, i) => {
        if (i == index) {
          item.status = true;
        } else {
          item.status = false;
        }
      });
    },
    // 移出
    mouseLeave(index) {
      this.meauData.forEach((item, i) => {
        if ((item.status = true)) {
          item.status = false;
        }
        //console.log(item)
      });
    },
    //切换店铺
    changeShop(index, name) {
      this.subMenuData.forEach((item, i) => {
        if (i == index) {
          item.status = true;
        } else {
          item.status = false;
        }
        //console.log(item)
      });
      this.shopName = name;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .layoutTop {
    position: relative;
    width: 100%;
    height: 70px;
    background: $topBarBg url(../assets/topbg.png) no-repeat right top;
    background-size: auto 100px;
    .meauNav {
      position: absolute;
      top: 70px;
      right: 0;
      z-index: 9999;
      .meau-box1 {
        width: 158px;
        background-color: #1a1a1a;
        text-align: center;
        .meau-list {
          width: 158px;
          padding: 0 36px;
          display: inline-block;
          text-align: left;
          height: 50px;
          line-height: 50px;
          position: relative;
          .t-s01 {
            color: #ffffff;
            font-size: 14px;
          }
          .img {
            width: 18px;
            height: 18px;
            margin: 0 10px 0 0;
            position: relative;
            top: 4px;
          }
          .layer-nav {
            position: absolute;
            top: 0;
            left: -129px;
            background: #ffffff;
            box-sizing: border-box;
            border-left: 1px solid #0a0a0a;
            border-bottom: 1px solid #0a0a0a;
            padding: 0 20px;
            display: none;
            .list-nav {
              color: #000;
              .i-box {
                width: 24px;
                display: inline-block;
              }
            }
          }
          &:hover {
            .layer-nav {
              display: block;
            }
          }
        }
        .active {
          // background-color: #ffffff;
          background-color: #ffbe11;
          .t-s01 {
            color: #0a0a0a;
          }
        }
      }
    }
    .topLogo {
      width: 240px;
      float: left;
      color: #ffffff;
      font-size: 18px;
      background-color: $menuBg;
    }
    .topLeft {
      float: left;
      margin-left: 20px;
      .topIcon01 {
        color: #ffbe11;
        margin-right: 5px;
      }
      .el-button {
        background-color: #2e2e2e !important;
        border-radius: 5px;
        border: none !important;
        color: #ffffff !important;
      }
    }
    .topRight {
      float: right;
      .topIcon02 {
        color: #b8b8b8;
      }
      .topNav {
        .txnav {
          float: left;
          width: 36px;
          height: 36px;
          // background-color: #b8b8b8;
          border-radius: 100%;
          text-align: center;
          margin: 0 10px 0 30px;
          .a-img {
            // margin-top: 3px;
            width: 100%;
            height: 100%;
            border-radius: 100%;
          }
        }
        .shopNameNav {
          float: left;
          margin-right: 20px;
          cursor: pointer;
          .name-span {
            color: #ffffff;
            line-height: 36px;
            padding: 0 5px 0 0;
            font-size: 14px;
          }
          .topIcon03 {
            color: #b8b8b8;
            font-size: 0.8rem;
          }
        }
      }
    }
    .center {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
.litkshuz {
  width: 14px;
  height: 14px;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  color: #ffffff;
  background-color: #db4b35;
  border-radius: 10px;
  position: absolute;
  top: -5px;
  right: -7px;
  cursor: pointer;
}
</style>
