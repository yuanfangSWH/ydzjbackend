<template>
  <div class="box">
    <div class="f-title">
      <i class="filter-i el-icon-document-copy"></i>预定查询
    </div>
    <div class="filterBox" :class="[isWhite ? 'span02' : '']">
      <div class="navBox">
        <div class="nav01">
          <span class="span01">包厢类型：</span>
          <div class="nav01-child">
            <el-select v-model="type_id" placeholder="请选择" @change="typeFun">
              <el-option
                v-for="(item, index) in placeTypeData"
                :key="index"
                :label="item.name"
                :value="item.type_id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="nav01">
          <span class="span01">客人姓名：</span>
          <div class="nav01-child">
            <el-input type="text" placeholder="请输入客人姓名" v-model="name" />
          </div>
        </div>
        <div class="nav01">
          <span class="span01">联系电话：</span>
          <div class="nav01-child">
            <el-input
              type="text"
              placeholder="请输入手机号码"
              v-model="phone"
            />
          </div>
        </div>
      </div>
      <div class="navBox">
        <div class="nav01">
          <span class="span01">预定时间：</span>
          <div class="nav01-child">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm"
              v-model="dateValue"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="dateFun"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="nav01">
          <span class="span01">预订人：</span>
          <div class="nav01-child">
            <el-select
              v-model="sale_staff_name"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in restaurants"
                :key="index"
                :label="item.staff_name"
                :value="item.staff_name"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="nav01">
          <span class="span01">预定类型：</span>
          <div class="nav01-child">
            <el-select
              v-model="leixing"
              placeholder="请选择"
              @change="onlineFun"
            >
              <el-option
                v-for="item in reserveType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <div class="navBox">
        <div class="nav01">
          <span class="span01">预定状态：</span>
          <div class="nav01-child">
            <el-select v-model="ydzt" placeholder="请选择" @change="statusFun">
              <el-option
                v-for="(item, index) in reserveStatus"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="nav01">
          <span class="span01">排队号码：</span>
          <div class="nav01-child">
            <el-input type="text" placeholder="排队号码" v-model="queue_no" />
          </div>
        </div>
        <div class="nav01">
          <span class="span01">是否过生日：</span>
          <div class="nav01-child">
            <el-checkbox v-model="checked" @change="birthdayFun"
              >生日</el-checkbox
            >
          </div>
        </div>
      </div>

      <div class="navBox">
        <el-button type="warning" @click="soFun">搜索</el-button>
        <el-button type="info" @click="clearFun">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isWhite: Boolean,
    isHome: Number,
    merchant_id: Number,
    shop_id: Number,
  },
  data() {
    return {
      placeTypeData: [],
      reserveType: [
        {
          value: "0",
          label: "线上",
        },
        {
          value: "1",
          label: "线下",
        },
        {
          value: "2",
          label: "线上客服",
        },
      ],
      leixing: "",
      ydzt: "",
      reserve_way: "", //预定类型
      type_id: "", //包厢类型
      dateValue: "",
      checked: false,
      is_birthday: "",
      name: "",
      phone: "",
      start_time: "",
      end_time: "",
      sale_staff_name: "",
      status: "", //预定状态
      queue_no: "",
      reserveStatus: [
        {
          value: "1",
          label: "待支付", //查看修改
        },
        {
          value: "2",
          label: "用户取消订单", //查看
        },
        {
          value: "3",
          label: "已支付", //查看修改
        },
        {
          value: "4",
          label: "已预订", //全部
        },
        {
          value: "5",
          label: "商家取消", //查看修改
        },
        {
          value: "6",
          label: "退款中", //查看修改
        },
        {
          value: "7",
          label: "消费中", //查看
        },
        {
          value: "8",
          label: "已结账", //查看
        },
        {
          value: "9",
          label: "退款成功", //查看
        },
      ],
      restaurants: [],
    };
  },
  created() {
    console.log(this.isHome);
    this.getPlaceType();
    this.getStaffFun();
  },
  methods: {
    getPlaceType() {
      let datas = {
        page_size: 10000,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      //this.$store.dispatch("shop/getPlaceType", data).then((res) => {
      this.api.shop.getPlaceType(datas).then(({ data }) => {
        let res = data;
        this.placeTypeData = res.data;
      });
    },
    getStaffFun() {
      let datas = {
        page_size: 10000,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      //this.$store.dispatch("mainConsole/selectStaff", data).then((res) => {
      this.api.shop.shopMainSelectStaff(datas).then(({ data }) => {
        let res = data;
        this.restaurants = res.data;
      });
    },

    typeFun(val) {
      this.type_id = val;
    },
    dateFun(val) {
      this.start_time = val[0];
      this.end_time = val[1];
    },
    onlineFun(val) {
      this.reserve_way = Number(val);
    },
    statusFun(val) {
      // console.log(typeof val)
      this.status = Number(val);
    },
    birthdayFun(val) {
      if (val) {
        this.is_birthday = 1;
      } else {
        this.is_birthday = 0;
      }
    },
    soFun() {
      if (this.isHome == 1) {
        this.$emit(
          "childrenFun",
          this.type_id,
          this.start_time,
          this.end_time,
          this.status,
          this.name,
          this.sale_staff_name,
          this.queue_no,
          this.reserve_way,
          this.is_birthday,
          this.phone
        );
      } else {
        sessionStorage.setItem("reserveKdata", "");
        sessionStorage.setItem("reserveKcount", "");
        this.$emit(
          "childrenFn",
          this.type_id,
          this.start_time,
          this.end_time,
          this.status,
          this.name,
          this.sale_staff_name,
          this.queue_no,
          this.reserve_way,
          this.is_birthday,
          this.phone
        );
      }
    },
    clearFun() {
      this.leixing = "";
      this.ydzt = "";
      this.reserve_way = ""; //预定类型
      this.type_id = ""; //包厢类型
      this.dateValue = "";
      this.checked = false;
      this.is_birthday = "";
      this.name = "";
      this.phone = "";
      this.start_time = "";
      this.end_time = "";
      this.sale_staff_name = "";
      this.status = ""; //预定状态
      this.queue_no = "";
    },
  },
};
</script>

<style scoped>
.box >>> .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #ffffff;
}
.filter-i {
  color: #ffbe11;
  margin: 0 5px;
}
.f-title {
  font-size: 16px;
  color: #ffbe11;
  padding: 10px 10px 0;
}
.filterBox {
  display: flex;
  align-items: center;
}
.navBox {
  margin-right: 30px;
}
.nav01 {
  display: flex;
  margin-top: 12px;
  align-items: center;
}
.nav01 .span01 {
  width: 120px;
  text-align: right;
  float: left;
}
.span02 .span01 {
  color: #ffffff;
}
</style>