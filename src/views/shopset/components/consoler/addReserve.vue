<!--
 * @Author: 朱强
 * @Date: 2021-01-22 10:05:42
 * @LastEditTime: 2021-01-25 15:28:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\shopset\components\addReserve.vue
-->

<template>
  <div class="lightTheme">
    <div class="mutilPlace">
      <div class="placeList" id="listDivHeight"></div>
      <div class="mainContent">
        <span class="topNavItem">{{ title }}</span>
        <el-form
          class="changeStatusForm"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item label="客户手机" prop="phone">
            <el-input
              v-model="ruleForm.phone"
              placeholder="请输入客户手机"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户姓名">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入客户姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="性  别">
            <el-radio-group v-model="ruleForm.gender">
              <el-radio :label="1">先生</el-radio>
              <el-radio :label="2">女士</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="客人数">
            <el-input-number
              v-model="ruleForm.people_num"
              :min="1"
              label="人数"
            ></el-input-number>
          </el-form-item>
          <!-- <el-form-item label="套餐类型" required v-if="type_id == 2">
                    <el-radio-group v-model="ruleForm.gb_id" @change="tcChangeFun">
                        <el-radio class="tc-name" v-for="(item, index) in tcData" :key="index" :label="item.gb_id">{{item.title}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="到店日期" required v-if="type_id == 2">
                    <el-date-picker
                    v-model="ruleForm.dateTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="到店时间" prop="reserve_time" v-if="type_id == 2">
                    <div class="span-box"><span class="time-span" v-for="(item, index) in timeList" :key="index" @click="checkTime(item, index)" :class="[curunt == index ? 'sActive':'']">{{item}}</span></div>
                </el-form-item> -->
          <el-form-item label="到店时间" prop="reserve_time">
            <!-- 量贩式 -->
            <el-date-picker
              v-if="type_id == 2"
              v-model="ruleForm.reserve_time"
              :default-value="ruleForm.reserve_time"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
            >
            </el-date-picker>
            <!-- 酒吧 -->
            <el-date-picker
              v-else
              v-model="ruleForm.reserve_time"
              type="date"
              :default-value="ruleForm.reserve_time"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="营  销">
            <el-select
              v-model="ruleForm.sale_staff_id"
              filterable
              placeholder="请选择"
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
          <el-form-item label="预定类型">
            <span>线下</span>
          </el-form-item>
          <el-form-item label="是否过生日">
            <el-radio-group v-model="ruleForm.is_birthday">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">不是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="预定备注" prop="remark">
            <el-input
              class="addTextarea"
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="ruleForm.remark"
            >
            </el-input>
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
  name: "addReserve",
  components: {},
  props: {
    type_id: { type: Number, default: 0 },
    merchant_id: { type: Number, default: 0 },
    shop_id: { type: Number, default: 0 },
    place_id: { type: Number, default: 0 },
    reserveTime: { type: String, default: "" },
    isMutilPlace: { type: Boolean, default: false },
  },
  data() {
    return {
      themeValue: true,
      curPlaceInfo: "",
      title: "添加预定",
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
      ruleForm: {
        merchant_id: 0,
        shop_id: 0,
        // dateTime:'',
        place_id: "", //座位id（酒吧必填，量贩式不填）
        sale_staff_id: "",
        reserve_time: "",
        phone: "",
        name: "",
        gender: 1,
        people_num: 1,
        remark: "",
        is_birthday: 0,
        // gb_id:'',
        // total_deposit:'',
        // type_id:''//座位类型ID（量贩式必填，酒吧不填）
      },
      rules: {
        phone: [{ required: true, message: "请输入客户手机", trigger: "blur" }],
        reserve_time: [
          { required: true, message: "请选择预定时间", trigger: "change" },
        ],
      },
      tcData: [],
      timeList: [],
      curunt: 0,
      staffArr: [],
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
      if (this.type_id != 2) {
        this.ruleForm.reserve_time = this.reserveTime;
      }
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
      this.ruleForm.place_id = this.place_id;
      if (this.$route.query.place_id) {
        this.placeInfo();
      }
      this.staffUser();
      if (localStorage.getItem("themeValue") == "true") {
        this.themeValue = true;
      } else {
        this.themeValue = false;
      }
    },
    // 座位详情
    placeInfo() {
      let datas = {};
      if (this.showKaitai) {
        datas = { id: this.ruleForm.place_id };
      } else {
        datas = { id: this.ruleForm.place_id, date: this.reserveTime };
      }
      datas.merchant_id = Number(this.merchant_id);
      datas.shop_id = Number(this.shop_id);
      //this.$store.dispatch("mainConsole/getPlaceDetail", data).then((res) => {
      this.api.shop.shopMainPlaceDetail(datas).then(({ data }) => {
        let res = data;
        this.curPlaceInfo = res.data;
      });
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
      });
    },
    checkTime(time, index) {
      this.ruleForm.reserve_time = time;
      this.curunt = index;
    },
    // 量贩式添加预订时的套餐列表
    selectGroupBuy() {
      let data = {
        // 'type_id': Number(this.curPlaceInfo.type_id)
        type_id: 41,
      };
      this.$store.dispatch("mainConsole/selectGroupBuy", data).then((res) => {
        this.tcData = res.data;
        // this.ruleForm.gb_id = this.tcData[0].gb_id
        this.timeList = this.tcData[0].select_time;
        this.ruleForm.reserve_time = this.timeList[0];
      });
    },
    // tcChangeFun(val) {
    //     for(var i = 0; i<this.tcData.length; i++){
    //         if(this.tcData[i].gb_id == val){
    //             this.timeList = this.tcData[i].select_time
    //         }
    //     }
    // },
    goBack() {
      this.$router.go(-1);
    },
    multiUpdate() {
      if (this.ruleForm.sale_staff_id == "") {
        this.ruleForm.sale_staff_id = 0;
      }
      this.ruleForm.place_id = Number(this.ruleForm.place_id);
      console.log(this.ruleForm.reserve_time);
      this.ruleForm.merchant_id = this.merchant_id;
      this.ruleForm.shop_id = this.shop_id;
      let datas = Object.assign({}, this.ruleForm);
      //this.$store.dispatch("mainConsole/addReserve", data).then((res) => {
      this.api.shop.shopMainReserveSubmit(datas).then(({ data }) => {
        let res = data;
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.ruleForm.phone = "";
        this.ruleForm.name = "";
        //this.$router.push({ path: "/mainConsoler" });
      });
    },
    handleCloseOpenPlace() {
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
.mutilPlace {
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
  }
  .tc-name {
    width: 100% !important;
    margin: 0 0 10px;
  }
}
</style>

