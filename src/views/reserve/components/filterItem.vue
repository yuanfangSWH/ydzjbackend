<template>
  <div class="add-box">
    <div class="so-nav">
      <div class="so-box1">
        <span class="s01">搜索</span>
        <el-input
          class="so-ipt"
          placeholder="请输入订单编号或手机号"
          suffix-icon="el-icon-search"
          v-model="soVal"
        ></el-input>
      </div>
      <div class="so-box1">
        <span class="s01">时间</span>
        <div class>
          <el-date-picker
            class="datePicker"
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            @change="dateChange"
          ></el-date-picker>
        </div>
      </div>
    </div>
    <div class="selectBox">
      <div
        v-if="activeName == 'first'"
        class="zx-box1"
        style="margin-bottom: 10px"
      >
        <span class="queue-s01">类别</span>
        <el-select
          class="se-nav"
          v-model="classvalue"
          placeholder="请选择"
          @change="showClass"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div
        v-if="activeName == 'third'"
        class="zx-box1"
        style="margin-bottom: 10px"
      >
        <span class="queue-s01">座位</span>
        <el-select
          class="se-nav"
          v-model="placevalue"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in placeArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="zx-box1" v-if="activeName == 'first'">
        <span class="queue-s01">状态</span>
        <el-select
          class="se-nav"
          v-model="statusvalue"
          placeholder="请选择"
          @change="showStatus"
        >
          <el-option
            v-for="item in StatusArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="zx-box1" v-if="activeName == 'second'">
        <span class="queue-s01">状态</span>
        <el-select
          class="se-nav"
          v-model="statusvalue"
          placeholder="请选择"
          @change="showStatus"
        >
          <el-option
            v-for="item in gbStatusArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="zx-box1" v-if="activeName == 'third'">
        <span class="queue-s01">状态</span>
        <el-select
          class="se-nav"
          v-model="statusvalue"
          placeholder="请选择"
          @change="showStatus"
        >
          <el-option
            v-for="item in mealStatusArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="btnBox">
      <span>
        <el-button class="sosuo" type="primary" @click="filtrateFun"
          >筛选</el-button
        >
      </span>
      <span style="margin-left: 10px">
        <el-button class="sosuo" type="primary">清空条件</el-button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "filterItem",
  props: {
    pickerOptions: Object,
    activeName: String,
    // 商家/店铺ID
    merchants: {
      shop_id: Number,
      merchant_id: Number,
    },
  },
  data() {
    return {
      soVal: "",
      value2: "",
      classvalue: "",
      statusvalue: "",
      start_time: "",
      end_time: "",
      placevalue: "",
      options: [
        {
          value: "online",
          label: "线上",
        },
        {
          value: "offline",
          label: "线下",
        },
      ],
      placeArr: [],
      StatusArr: [
        { value: "1", label: "待支付" },
        { value: "2", label: "用户取消订单" },
        { value: "3", label: "已支付" },
        { value: "4", label: "已预订" },
        { value: "5", label: "商家取消" },
        { value: "6", label: "用户申请退款中" },
        { value: "7", label: "用户退款失败" },
        { value: "8", label: "消费中" },
        { value: "9", label: "已结账" },
        { value: "10", label: "退款成功" },
      ],
      gbStatusArr: [
        { value: "0", label: " 删除" },
        { value: "1", label: "未完成结算" },
        { value: "2", label: "已结算" },
        { value: "3", label: "挂账" },
        { value: "4", label: "清账" },
      ],
      mealStatusArr: [
        { value: "1", label: "未完成结算" },
        { value: "2", label: "已结算" },
        { value: "3", label: "挂账签单" },
      ],
    };
  },
  mounted() {
    this.getPlaceType();
  },
  methods: {
    getPlaceType() {
      var data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page_size: 10000,
      };
      this.api.shop.getPlaceType(data).then((res) => {
        let itemArr = [];
        res.data.data.map((item) => {
          itemArr.push({
            value: item.type_id,
            label: item.name,
          });
        });
        this.placeArr = itemArr;
      });
    },
    //日期选择
    dateChange(val) {
      if (val) {
        this.start_time = val[0];
        this.end_time = val[1];
      }
    },
    //类别筛选
    showClass(val) {},
    //座位筛选
    showPlace(val) {
      // console.log(val)
    },
    //状态筛选
    showStatus(val) {},
    filtrateFun() {
      this.$emit(
        "filtrateFun",
        this.soVal,
        this.classvalue,
        this.statusvalue,
        this.start_time,
        this.end_time,
        this.placevalue
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.add-box {
  margin: 10px 0;
  .selectBox {
    float: left;
    margin: 15px 0 15px 20px;
    width: 400px;
    .se-nav {
      margin: 0 8px;
      width: 334px;
    }
  }
  .btnBox {
    float: left;
    margin-bottom: 15px;
    margin-top: 16px;
    .sosuo {
      float: left;
      background-color: #f4f4f4 !important;
      border: 1px solid #cecece;
      color: #0a0a0a;
      width: 90px;
      margin-right: 10px;
    }
  }
}
.so-nav {
  width: 504px;
  float: left;
  margin-bottom: 15px;
  .so-box1 {
    width: 504px;
    display: inline-block;
    position: relative;
    margin: 10px 0 0 0;
    .s01 {
      width: 74px;
      line-height: 40px;
      float: left;
    }
    .sosuo {
      margin-left: 10px;
      float: left;
      background-color: #f4f4f4 !important;
      border: 1px solid #cecece;
      color: #0a0a0a;
      width: 90px;
    }
    .so-ipt {
      border-color: #cecece;
      float: left;
      width: 327px;
    }
    .el-input__suffix {
      color: #000 !important;
      font-weight: bold;
    }
    .datePicker {
      width: 426px;
    }
  }
}
</style>