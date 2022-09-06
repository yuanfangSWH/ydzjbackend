<template>
  <div class="shopSet">
    <div class="page-title">{{ this._getVuex("pageTitle") }}</div>
    <div class="formBox">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-form-item label="套餐名称" prop="title">
          <el-input
            class="gb-ipt"
            v-model="ruleForm.title"
            placeholder="请输入套餐名"
          ></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="subtitle">
          <el-input
            class="gb-ipt"
            v-model="ruleForm.subtitle"
            placeholder="请输入套餐副标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="套餐原价" prop="original_price">
          <el-input
            class="gb-ipt"
            v-model="ruleForm.original_price"
            placeholder="请输入套餐原价"
          ></el-input>
        </el-form-item>
        <el-form-item label="套餐价格" prop="total_price">
          <el-input
            class="gb-ipt"
            v-model="ruleForm.total_price"
            placeholder="请输入套餐价格"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间段" required>
          <div class="timeBox">
            <el-time-picker
              v-model="ruleForm.start_time"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59',
              }"
              placeholder="任意时间点"
              value-format="HH:mm"
            ></el-time-picker>
            <span class="time-span">-</span>
            <el-time-picker
              v-model="ruleForm.end_time"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59',
              }"
              placeholder="任意时间点"
              value-format="HH:mm"
            ></el-time-picker>
          </div>
        </el-form-item>
        <el-form-item label="使用时长" prop="max_duration">
          <el-input
            class="gb-ipt"
            v-model="ruleForm.max_duration"
            placeholder="请输入使用时长"
          ></el-input>
          <span class="uni-span">小时</span>
        </el-form-item>
        <el-form-item label="包厢类型" prop="type_id">
          <el-select v-model="ruleForm.type_name" placeholder="请选择包厢类型">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开放日期" prop="week_price">
          <div class="checkBoxnav" v-for="(item, index) in week_price" :key="index">
            <div v-if="item.week == 1">
              <el-checkbox
                v-model="week_price[index].checked"
                @change="checkboxFun(index)"
                >周一</el-checkbox
              >
            </div>
            <div v-if="item.week == 2">
              <el-checkbox
                v-model="week_price[index].checked"
                @change="checkboxFun(index)"
                >周二</el-checkbox
              >
            </div>
            <div v-if="item.week == 3">
              <el-checkbox
                v-model="week_price[index].checked"
                @change="checkboxFun(index)"
                >周三</el-checkbox
              >
            </div>
            <div v-if="item.week == 4">
              <el-checkbox
                v-model="week_price[index].checked"
                @change="checkboxFun(index)"
                >周四</el-checkbox
              >
            </div>
            <div v-if="item.week == 5">
              <el-checkbox
                v-model="week_price[index].checked"
                @change="checkboxFun(index)"
                >周五</el-checkbox
              >
            </div>
            <div v-if="item.week == 6">
              <el-checkbox
                v-model="week_price[index].checked"
                @change="checkboxFun(index)"
                >周六</el-checkbox
              >
            </div>
            <div v-if="item.week == 7">
              <el-checkbox
                v-model="week_price[index].checked"
                @change="checkboxFun(index)"
                >周日</el-checkbox
              >
            </div>
            <div class="mar-num">
              <el-input
                class="price-ipt"
                v-model="week_price[index].price"
                placeholder="金额"
              ></el-input>
            </div>
            <span class="t-01">元</span>
            <div class="mar-num">
              <el-input
                class="price-ipt"
                v-model="week_price[index].allow_buy"
                placeholder="份数"
              ></el-input>
            </div>
            <span class="t-01">份</span>
          </div>
        </el-form-item>
        <el-form-item label="套餐组合" prop="goods_detail">
          <div class="groupBox" v-for="(item, i) in ruleForm.goods_detail" :key="i">
            <el-autocomplete
              class="inline-input"
              v-model="ruleForm.goods_detail[i].goods_name"
              :fetch-suggestions="querySearch"
              placeholder="请输入商品名称"
              :trigger-on-focus="false"
              @select="handleSelect"
              @input="inputFun(i)"
            ></el-autocomplete>
            <div>
              <el-input-number
                class="num-ipt"
                v-model="ruleForm.goods_detail[i].goods_num"
                controls-position="right"
                @change="handleChange"
                :min="1"
              ></el-input-number>
            </div>
            <el-input
              class="danwei-ipt"
              v-model="ruleForm.goods_detail[i].goods_unit"
              placeholder="单位"
            ></el-input>
            <el-input
              class="danwei-ipt"
              v-model="ruleForm.goods_detail[i].goods_price"
              placeholder="金额"
            ></el-input>
            <span>元</span>
            <i
              v-if="i == ruleForm.goods_detail.length - 1"
              class="add-icon el-icon-circle-plus"
              @click="addGoodsDetail(i)"
            ></i>
            <i v-else class="close-icon el-icon-error" @click="removeGoodsDetail(i)"></i>
          </div>
        </el-form-item>
        <el-form-item label="套餐组合" prop="image">
          <uploadFiles ref="uploadImg" @theIMG="theIMG" root="goods" />
          <span class="zhushi">（请上传100*100的图片尺寸，不得超过2M，不得超过6张）</span>
        </el-form-item>
        <el-form-item label="购买须知" prop="summary">
          <div class="groupBox" v-for="(item, i) in ruleForm.summary" :key="i">
            <el-input
              class="n-ipt2"
              v-model="ruleForm.summary[i].item_name"
              placeholder="请输入小标题"
            ></el-input>
            <el-input
              class="danwei-ipt2"
              v-model="ruleForm.summary[i].item_content"
              placeholder="请输入内容"
            ></el-input>
            <i
              v-if="i == ruleForm.summary.length - 1"
              class="add-icon el-icon-circle-plus"
              @click="addSummary(i)"
            ></i>
            <i v-else class="close-icon el-icon-error" @click="removeSummary(i)"></i>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import uploadFiles from "@/components/uploadFiles";
import _ from "lodash";
export default {
  name: "editGroupBuy",
  components: { uploadFiles },
  data() {
    return {
      logos: [],
      ruleForm: {
        shop_id: 0,
        merchant_id: 0,
        gb_id: "",
        week_price: [],
      },
      week_price: [],
      rules: {
        title: [{ required: true, message: "请输入套餐名称", trigger: "blur" }],
        original_price: [{ required: true, message: "请输入套餐原价", trigger: "blur" }],
        total_price: [{ required: true, message: "请输入套餐价格", trigger: "blur" }],
        type_id: [{ required: true, message: "请选择包厢类型", trigger: "change" }],
        goods_detail: [
          {
            type: "array",
            required: true,
            message: "请输入套餐组合信息",
            trigger: "blur",
          },
        ],
        image: [{ required: true, message: "请上传套餐图片", trigger: "on-change" }],
        summary: [{ required: true, message: "请填写购买须知", trigger: "blur" }],
        //week_price: [{ required: true, message: "请选择预定星期", trigger: "change" }],
        start_time: [{ required: true, message: "请选择开始时间", trigger: "change" }],
        end_time: [{ required: true, message: "请选择结束时间", trigger: "change" }],
        max_duration: [{ required: true, message: "请输入使用时长", trigger: "blur" }],
      },
      limit: 6,
      hasImg: false,
      restaurants: [],
      options: [],
      imgArr: [],
      fileList: [],
      isAddImg: false,
    };
  },
  created() {
    this.ruleForm.shop_id = Number(this.$route.query.shop_id);
    this.ruleForm.merchant_id = Number(this.$route.query.merchant_id);
    this.ruleForm.gb_id = this.$route.query.gb_id;
    if (this.ruleForm.gb_id) {
      this.getGroudbuyDetaile();
    }
    this.getGoodsClass();
  },
  methods: {
    checkboxFun(e) {
      // for (var i = 0; i < this.ruleForm.week_price.length; i++) {
      //   if (i == e) {
      //     this.ruleForm.week_price[i].checked = !this.ruleForm.week_price[i].checked;
      //   }
      // }
    },
    // 获取包厢类型
    getGoodsClass() {
      const data = {
        merchant_id: this.ruleForm.merchant_id,
        shop_id: this.ruleForm.shop_id,
      };
      this.api.shop.getPlaceType(data).then((res) => {
        this.options = res.data.data;
      });
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      // 调用 callback 返回建议列表的数据
      cb(restaurants);
    },
    handleSelect(item) {
      //console.log(item);
    },
    inputFun(i) {
      const datas = {
        name: this.ruleForm.goods_detail[i].goods_name,
        shop_id: this.ruleForm.merchant_id,
        merchant_id: this.ruleForm.shop_id,
      };
      this.$store.dispatch("goods/getGroupBuySelectGoods", datas).then((res) => {
        let itemArr = [];
        res.data.map((item) => {
          itemArr.push({
            value: item.name,
          });
        });
        this.restaurants = itemArr;
      });
    },
    getGroudbuyDetaile() {
      const datas = {
        shop_id: this.ruleForm.merchant_id,
        merchant_id: this.ruleForm.shop_id,
        id: this.ruleForm.gb_id,
      };
      this.$store.dispatch("goods/getGroupBuyDetail", datas).then((res) => {
        this.ruleForm = res.data;
        this.$refs.uploadImg.concert(this.ruleForm.image);
        // var img = this.ruleForm.image;
        // this.imgArr = img.split(",");
        // this.imgArr.forEach((item) => {
        //   let obj = new Object();
        //   obj.url = item;
        //   this.fileList.push(obj);
        // });
        this.ruleForm.original_price = Number(this.ruleForm.original_price) / 100;
        this.ruleForm.total_price = Number(this.ruleForm.total_price) / 100;
        for (var i = 0; i < this.ruleForm.goods_detail.length; i++) {
          this.ruleForm.goods_detail[i].goods_price =
            Number(this.ruleForm.goods_detail[i].goods_price) / 100;
        }
        this.week_price = [
          {
            week: 1,
            price: "",
            allow_buy: "",
            checked: false,
          },
          {
            week: 2,
            price: "",
            allow_buy: "",
            checked: false,
          },
          {
            week: 3,
            price: "",
            allow_buy: "",
            checked: false,
          },
          {
            week: 4,
            price: "",
            allow_buy: "",
            checked: false,
          },
          {
            week: 5,
            price: "",
            allow_buy: "",
            checked: false,
          },
          {
            week: 6,
            price: "",
            allow_buy: "",
            checked: false,
          },
          {
            week: 7,
            price: "",
            allow_buy: "",
            checked: false,
          },
        ];
        let week = [],
          price = [],
          allow_buy = [];
        week = res.data.allow_week_days.split(",");
        price = res.data.allow_week_price.split(",");
        allow_buy = res.data.allow_week_buy.split(",");
        let nObj = {};
        nObj.week = week;
        nObj.price = price;
        nObj.allow_buy = allow_buy;
        let aObj = [];
        for (var i = 0; i < nObj.week.length; i++) {
          nObj.week[i] = Number(nObj.week[i]);
          nObj.price[i] = Number(nObj.price[i]) / 100;
          nObj.allow_buy[i] = Number(nObj.allow_buy[i]);
          aObj.push({
            week: 1,
            price: "",
            allow_buy: "",
            checked: true,
          });
          aObj[i].week = nObj.week[i];
          aObj[i].price = nObj.price[i];
          aObj[i].allow_buy = nObj.allow_buy[i];
        }
        for (var i = 0; i < aObj.length; i++) {
          for (var j = 0; j < this.week_price.length; j++) {
            if (aObj[i].week == this.week_price[j].week) {
              this.week_price[j].checked = true;
              this.week_price[j].price = aObj[i].price;
              this.week_price[j].allow_buy = aObj[i].allow_buy;
            }
          }
        }
      });
    },
    handleChange(value) {
      // console.log(value);
      this.ruleForm.sum = value;
    },
    checkWeekPrice(v) {
      if (!v.length) return false;
      for (let i in v) {
        let obj = v[i];
        let isOk = obj.allow_buy > 0 && obj.price > 0 && obj.week > 0;
        if (!isOk) {
          return false;
        }
      }
      return true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const datas = _.cloneDeep(this.ruleForm); // Object.assign({}, this.ruleForm);

          datas.original_price = Number(datas.original_price) * 100;
          datas.total_price = Number(datas.total_price) * 100;
          for (var i = 0; i < datas.goods_detail.length; i++) {
            datas.goods_detail[i].goods_price =
              Number(datas.goods_detail[i].goods_price) * 100;
          }

          datas.week_price = [];
          for (var i = this.week_price.length - 1; i >= 0; i--) {
            if (this.week_price[i].checked) {
              this.week_price[i].price = Number(this.week_price[i].price);
              this.week_price[i].allow_buy = Number(this.week_price[i].allow_buy);
              datas.week_price.push({
                allow_buy: this.week_price[i].allow_buy,
                price: this.week_price[i].price * 100,
                week: this.week_price[i].week,
              });
            }
          }
          //datas.week_price = datas.week_price.filter(Boolean);
          if (!this.checkWeekPrice(datas.week_price)) {
            this.$message.error("必须设置开放日期...");
            return;
          }
          for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].name == datas.type_name) {
              datas.type_id = this.options[i].type_id;
            }
          }
          delete datas.allow_week_buy;
          delete datas.allow_week_days;
          delete datas.allow_week_price;

          this.$store.dispatch("goods/updateGroupBuy", datas).then((res) => {
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
            this.$router.push({
              path: "/ShopInfo",
              query: {
                merchant_id: this.ruleForm.merchant_id,
                shop_id: this.ruleForm.shop_id,
                tab: "shopGroups",
              },
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //图片上传子组件传值
    theIMG(url) {
      this.ruleForm.image = url;
    },
    addGoodsDetail(i) {
      this.ruleForm.goods_detail.push({
        goods_name: "",
        goods_num: 1,
        goods_unit: "",
        goods_price: 0,
      });
    },
    removeGoodsDetail(i) {
      this.ruleForm.goods_detail.splice(i, 1);
    },
    addSummary(i) {
      this.ruleForm.summary.push({
        item_name: "",
        item_content: "",
      });
    },
    removeSummary(i) {
      this.ruleForm.summary.splice(i, 1);
    },
  },
};
</script>
<style scoped>
.shopSet {
  margin: 15px;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #dfdfdf;
}
.formBox {
  width: 60%;
}
.groupBox {
  display: flex;
  margin-bottom: 10px;
}
.num-ipt {
  margin: 0 10px;
  width: 100px;
}
.danwei-ipt {
  margin-right: 10px;
  width: 200px;
}
.price-ipt {
  width: 200px;
}
.t-s01 {
  margin-left: 5px;
}
.close-icon {
  width: 26px;
  height: 26px;
  display: inline-block;
  font-size: 26px;
  margin-left: 10px;
  margin-top: 7px;
}
.add-icon {
  width: 26px;
  height: 26px;
  font-size: 26px;
  display: inline-block;
  color: #ffbe11;
  margin-left: 10px;
  margin-top: 7px;
}
.n-ipt2 {
  width: 200px;
  margin-right: 10px;
}
.danwei-ipt2 {
  width: 360px;
}
.zhushi {
  color: #ef3232;
  font-size: 12px;
}
.gb-ipt {
  max-width: 400px;
}
.uni-span {
  margin-left: 10px;
}
.timeBox {
  display: flex;
}
.time-span {
  margin: 0 5px;
}
.checkBoxnav {
  display: flex;
  margin-bottom: 10px;
}
.mar-num {
  margin: 0 5px 0 30px;
}
</style>
