<!--
 * @Author: your name
 * @Date: 2021-01-25 14:25:07
 * @LastEditTime: 2021-01-25 15:42:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\shopset\components\consoler\openPlace.vue
-->
<template>
  <div class="lightTheme">
    <div class="openingPlace mutilPlace">
      <div class="placeList" id="listDivHeight"></div>

      <div class="mainContent">
        <span class="topNavItem">{{ title }}</span>
        <el-form
          class="changeStatusForm"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item label="当前预定" v-if="hasReserve">
            <span class="kt-span01">{{ reserveData.reserve_time }}</span
            ><span class="kt-span01"
              >{{ reserveData.name }} {{ reserveData.phone }}</span
            >
          </el-form-item>
          <el-form-item label="当前座位">
            <template>
              <span>{{ curPlaceInfo.place_name }}</span>
            </template>
          </el-form-item>
          <el-form-item label="人数" prop="people_num">
            <el-input-number
              v-model="ruleForm.people_num"
              @change="handleChange"
              :min="1"
              label="人数"
            ></el-input-number>
          </el-form-item>
          <!-- <el-form-item label="套餐类型" required v-if="!hasReserve">
                    <el-radio-group v-model="ruleForm.gb_id" @change="tcChangeFun">
                        <el-radio class="tc-name" v-for="(item, index) in tcData" :key="index" :label="item.gb_id">{{item.title}}</el-radio>
                    </el-radio-group>
                </el-form-item> -->
          <el-form-item label="营  销">
            <el-select
              v-model="ruleForm.sale_staff_id"
              filterable
              placeholder="请选择"
              @change="staffChange"
            >
              <el-option
                v-for="(item, index) in staffArr"
                :key="index"
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
  components: {},
  props: {
    type_id: { type: Number, default: 0 },
    merchant_id: { type: Number, default: 0 },
    shop_id: { type: Number, default: 0 },
    place_id: { type: Number, default: 0 },
    reserveTime: { type: String, default: "" },
    isMutilPlace: { type: Boolean, default: false },
    reserve_id: { type: Number, default: 0 },
  },
  data() {
    return {
      themeValue: true, //主题颜色
      num: 1,
      curPlaceInfo: "",
      title: "开台",
      placeListHeight: 75,
      mainContentHeight: 0,
      shopSetHeight: document.documentElement.clientHeight,
      shopSetWidth: document.documentElement.clientWidth,
      ruleForm: {
        reserve_id: 0, //预订id（有预订填写，没预订不填）
        place_id: "", //必填
        sale_staff_id: "",
        sale_staff_name: "",
        people_num: 1, //必填
        // gb_id: ''//套餐ID（量贩式如果没有预订必填这个参数）
      },
      rules: {
        people_num: [
          { required: true, message: "请输入人数", trigger: "change" },
        ],
        // gb_id: [
        //     { type: 'date', required: true, message: '请选择套餐', trigger: 'change' }
        // ]
      },
      tcData: [],
      timeList: [],
      curunt: 0,
      staffArr: [],
      hasReserve: false,
      reserveData: {},
      showKaitai: true,
    };
  },
  watch: {
    place_id: {
      immediate: true,
      handler(val) {
        if (val) {
          this.iniCom();
        }
      },
    },
  },
  created() {
    //this.iniCom();
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
    iniCom() {
      //this.reserveTime = sessionStorage.getItem("chooseTime");
      // 座位详情投参判断
      var date = new Date();
      var pyear = date.getFullYear();
      var pmonth = date.getMonth() + 1;
      var pdate = date.getDate();
      if (pmonth < 10) {
        pmonth = "0" + pmonth;
      }
      if (pdate < 10) {
        pdate = "0" + pdate;
      }
      var p_time = pyear + "-" + pmonth + "-" + pdate;
      if (this.reserveTime != p_time) {
        this.showKaitai = false;
      } else {
        this.showKaitai = true;
      }
      //
      // this.curPlaceInfo = sessionStorage.getItem('curPlaceInfo').split(',')
      this.ruleForm.place_id = this.place_id;
      if (this.place_id) {
        this.placeInfo();
      }
      this.reserveData = sessionStorage.getItem("reserveDataOpen");
      this.reserveData = JSON.parse(this.reserveData);
      if (this.reserveData) {
        this.ruleForm.people_num = this.reserveData.people_num;
        this.ruleForm.sale_staff_id = this.reserveData.sale_staff_id;
        this.ruleForm.sale_staff_name = this.reserveData.sale_staff_name;
      }
      //this.type_id = sessionStorage.getItem("type_id");
      if (this.reserve_id) {
        this.ruleForm.reserve_id = this.reserve_id;
        this.hasReserve = true;
      } else {
        this.hasReserve = false;
      }
      if (localStorage.getItem("themeValue") == "true") {
        this.themeValue = true;
      } else {
        this.themeValue = false;
      }
      // if(this.ruleForm.place_id && this.type_id == 2){
      //     this.selectGroupBuy()
      // }
      this.staffUser();
    },
    // 座位详情
    placeInfo() {
      let datas = {};
      if (this.showKaitai) {
        datas = { id: this.ruleForm.place_id };
      } else {
        datas = { id: this.ruleForm.place_id, date: this.reserveTime };
      }
      //this.$store.dispatch("mainConsole/getPlaceDetail", data).then((res) => {
      datas.merchant_id = Number(this.merchant_id);
      datas.shop_id = Number(this.shop_id);
      this.api.shop.shopMainPlaceDetail(datas).then(({ data }) => {
        let res = data;
        this.curPlaceInfo = res.data;
      });
    },
    handleChange(value) {
      // console.log(value);
    },
    staffUser() {
      let datas = {
        page_size: 10000,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      //this.$store.dispatch("staff/getList", data).then((res) => {
      this.api.staff.userList(datas).then(({ data }) => {
        let res = data;
        let itemArr = [];
        res.data.map((item) => {
          itemArr.push({
            value: item.staff_id,
            label: item.staff_name,
          });
        });
        this.staffArr = itemArr;
        // console.log(this.staffArr)
      });
    },
    staffChange(val) {
      this.ruleForm.sale_staff_id = val;
      for (var i = 0; i < this.staffArr.length; i++) {
        if (this.ruleForm.sale_staff_id == this.staffArr[i].value) {
          this.ruleForm.sale_staff_name = this.staffArr[i].label;
        }
      }
    },
    // 量贩式添加预订时的套餐列表
    selectGroupBuy() {
      let data = {
        type_id: Number(this.curPlaceInfo.type_id),
        // type_id: 41
      };
      this.$store.dispatch("mainConsole/selectGroupBuy", data).then((res) => {
        this.tcData = res.data;
        this.ruleForm.gb_id = this.tcData[0].gb_id;
        this.timeList = this.tcData[0].select_time;
        this.ruleForm.reserve_time = this.timeList[0];
      });
    },
    tcChangeFun(val) {
      for (var i = 0; i < this.tcData.length; i++) {
        if (this.tcData[i].gb_id == val) {
          this.timeList = this.tcData[i].select_time;
        }
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    //开台
    multiUpdate() {
      if (this.ruleForm.reserve_id) {
        delete this.ruleForm.gb_id;
      } else {
        delete this.ruleForm.reserve_id;
      }
      this.ruleForm.reserve_id = Number(this.ruleForm.reserve_id);
      this.ruleForm.place_id = Number(this.ruleForm.place_id);
      this.ruleForm.sale_staff_id = Number(this.ruleForm.sale_staff_id);
      this.ruleForm.people_num = Number(this.ruleForm.people_num);

      this.ruleForm.merchant_id = this.merchant_id;
      this.ruleForm.shop_id = this.shop_id;
      let datas = Object.assign({}, this.ruleForm);

      //this.$store.dispatch("mainConsole/opentable", data).then((res) => {
      this.api.shop.shopMainOpenTable(datas).then(({ data }) => {
        let res = data;
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        //this.$router.push({ path: "/mainConsoler" });
        this.$emit("handleCancel");
      });
    },
    handleCloseOpenPlace() {
      //this.$router.push({ path: "/mainConsoler" });
      this.$emit("handleCancel");
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button--primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
  color: #fff !important;
}
.openingPlace {
  .topNav {
    background: #1a1a1a url("/static/img/topbg.076c01a6.png") no-repeat right
      top;
    background-size: auto 100px;
    height: 70px;
    width: 100%;
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
      border-radius: 3px;
      font-weight: bold;
    }
    .topNavItem {
      margin: 0 5px;
    }
    .placeTypeInfo {
      border-radius: 3px;
      min-width: 430px;
      height: 38px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-left: 20px;
      span {
        margin: 0 10px;
      }
    }
  }

  .placeList {
    padding-top: 25px;
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
        border-radius: 3px;
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
    margin: 0 20px 20px 20px;
    .changeStatusForm {
      padding: 40px;
      .btn {
        margin-left: 43px;
      }
      .changeStatusBtn {
        width: 100px;
        height: 38px;
        font-weight: bold;
      }
      .span-box {
        max-width: 500px;
        display: inline-block;
        .time-span {
          height: 34px;
          line-height: 34px;
          border-radius: 6px;
          padding: 0 14px;
          display: inline-block;
          margin: 0 15px 10px 0;
          cursor: pointer;
        }
      }
      .kt-span01 {
        margin-right: 10px;
      }
    }
    .el-select,
    .el-textarea,
    .el-cascader,
    .el-input {
      width: 200px !important;
    }
    .topNavItem {
      width: 100%;
      font-size: 18px;
      padding: 20px 0 20px 20px;
      display: inline-block;
    }
    ::v-deep .el-form-item__label {
      width: 100px;
    }
    .addTextarea {
      width: 400px !important;
    }
    .sActive {
      color: #0a0a0a;
      background: #ffbe11 !important;
    }
  }
  .tc-name {
    width: 100% !important;
    margin: 0 0 10px;
  }
}
</style>

