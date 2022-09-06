<!--
 * @Author: 朱强
 * @Date: 2021-01-22 16:52:26
 * @LastEditTime: 2021-01-22 17:26:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\shopset\components\consoler\mutilPlace.vue
-->


<template>
  <div class="lightTheme">
    <div class="mutilPlace">
      <div class="placeList" id="listDivHeight">
        <ul class="mutilPlaceName">
          <li
            v-for="(item, index) in mutilPlaceData"
            :key="index"
            @click="deletePlace(item, index)"
          >
            {{ item.place_name }}
          </li>
        </ul>
      </div>

      <div
        class="mainContent"
        :style="'min-height:' + (mainContentHeight - 20) + 'px'"
      >
        <el-form class="changeStatusForm">
          <el-form-item label="修改状态">
            <el-select
              v-model="changeOption"
              placeholder="请选择"
              @change="statusChange"
            >
              <el-option
                v-for="item in placeStatusOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="btn">
            <el-button class="changeStatusBtn" @click="handleCloseOpenPlace"
              >取 消</el-button
            >
            <el-button
              class="changeStatusBtn submitBtn"
              type="primary"
              @click="multiUpdate"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mutilPlace",
  components: {},
  props: {
    type_id: { type: Number, default: 0 },
    merchant_id: { type: Number, default: 0 },
  },
  data() {
    return {
      themeValue: true, //主题颜色
      title: "多选操作",
      mutilPlaceData: [],
      choosePlaceData: [],
      placeId: [],
      changeOption: 1,
      placeStatusOption: [
        { value: 1, label: "空闲" },
        { value: 2, label: "消费中" },
        { value: 3, label: "故障" },
        { value: 4, label: "已结账" },
        { value: 5, label: "清洁中" },
        { value: 6, label: "锁定" },
      ],
      placeListHeight: 75,
      mainContentHeight: 0,
      shopSetHeight: document.documentElement.clientHeight,
      shopSetWidth: document.documentElement.clientWidth,
      shop_id: 0,
    };
  },
  created() {
    this.mutilPlaceData = JSON.parse(sessionStorage.getItem("mutilPlaceData"));
    // console.log('111',this.mutilPlaceData)
    this.choosePlaceData = sessionStorage.getItem("choosePlaceData").split(",");
    // console.log('222',this.choosePlaceData)
    this.shop_id = Number(sessionStorage.getItem("shop_id"));
    if (localStorage.getItem("themeValue") == "true") {
      this.themeValue = true;
    } else {
      this.themeValue = false;
    }
  },
  mounted() {
    let placeLists = document.getElementById("listDivHeight").offsetHeight;
    this.mainContentHeight = this.shopSetHeight - placeLists - 70;
    window.onresize = () => {
      this.shopSetHeight = document.documentElement.clientHeight;
      this.shopSetWidth = document.documentElement.clientWidth;

      let placeLists = document.getElementById("listDivHeight").offsetHeight;
      this.mainContentHeight = this.shopSetHeight - placeLists - 70;
    };
  },
  methods: {
    statusChange(val) {
      this.changeOption = val;
    },
    goBack() {
      this.$router.go(-1);
    },
    toPath(path) {
      sessionStorage.setItem("choosePlaceData", this.choosePlaceData);
      sessionStorage.setItem(
        "mutilPlaceData",
        JSON.stringify(this.mutilPlaceData)
      );
      this._toRouter(path);
    },
    deletePlace(item, index) {
      this.choosePlaceData.splice(
        this.choosePlaceData.findIndex((item) => item === index),
        1
      );
      this.mutilPlaceData.splice(
        this.mutilPlaceData.findIndex((items) => items === item),
        1
      );
      if (this.mutilPlaceData.length == 0) {
        this.mutilPlaceData = [];
        this.choosePlaceData = [];
        this.showPlaceMutil = false;
      }
      sessionStorage.setItem(
        "mutilPlaceData",
        JSON.stringify(this.mutilPlaceData)
      );
    },
    multiUpdate() {
      for (var i = 0; i < this.mutilPlaceData.length; i++) {
        this.placeId[i] = Number(this.mutilPlaceData[i].place_id);
      }
      let data = {
        shop_id: this.shop_id,
        place_id: this.placeId,
        status: this.changeOption,
      };
      this.$store.dispatch("mainConsole/SetPlaceStatus", data).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.$router.push("/mainConsoler");
      });
    },
    handleCloseOpenPlace() {},
  },
};
</script>

<style lang="scss" scoped>
.mutilPlace {
  // background: #000000;
  .topNav {
    background: #1a1a1a url("/static/img/topbg.076c01a6.png") no-repeat right
      top;
    background-size: auto 100px;
    height: 70px;
    width: 100%;
    color: #fff;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
    text-align: center;
    line-height: 38px;
    .cursor {
      cursor: pointer;
    }
    .topNavBtn {
      background: #ffbe11;
      border-radius: 3px;
      font-weight: bold;
      color: #0a0a0a;
    }
    .topNavItem {
      margin: 0 5px;
    }
  }

  .placeList {
    margin-left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .mutilPlaceName {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: center;
      padding-left: 0;
      li {
        position: relative;
        background: #2e2e2e;
        border-radius: 3px;
        color: #fff;
        width: 110px;
        height: 40px;
        margin: 5px;
        text-align: left;
        padding-left: 20px;
        line-height: 44px;
        cursor: pointer;
        transition: all 0.2s linear;
        &:hover {
          padding-left: 30px;
        }
        &:after {
          content: "X";
          width: 20px;
          height: 20px;
          line-height: 22px;
          text-align: center;
          float: right;
          margin-top: 10px;
          margin-right: 5px;
          font-size: 12px;
          transition: all 0.2s linear;
        }
        &:hover::after {
          transform: rotateZ(180deg);
        }
      }
    }
  }

  .mainContent {
    // background: #2E2E2E;
    margin: 0 20px 20px 20px;
    .changeStatusForm {
      padding: 40px;
      color: #fff;
      .btn {
        margin-left: 67px;
      }
      .changeStatusBtn {
        width: 100px;
        height: 38px;
        background: #fff;
        font-weight: bold;
      }
      .submitBtn {
        background: #ffbe11;
        color: #0a0a0a;
      }
    }
  }
}
</style>

