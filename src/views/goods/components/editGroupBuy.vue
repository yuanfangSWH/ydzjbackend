<template>
  <div class="shopSet">
    <div class="formBox">
      <el-form
        style="height: 500px; overflow: auto"
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
            placeholder="请输入套餐名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="座位分类" prop="type_id">
          <el-select v-model="ruleForm.type_id" placeholder="座位分类">
            <el-option
              v-for="(item, index) in showPlaceType"
              v-if="item.status > 0"
              :key="index"
              :label="item.name"
              :value="item.type_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原价" prop="original_price">
          <el-input
            class="gb-ipt"
            v-model="ruleForm.original_price"
            placeholder="请输入套餐原价"
          ></el-input>
        </el-form-item>
        <el-form-item label="现价" prop="reference_price">
          <el-input
            class="gb-ipt"
            v-model="ruleForm.reference_price"
            placeholder="请输入套餐现价"
          ></el-input>
        </el-form-item>

        <el-form-item label="套餐描述" prop="summary_text">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入套餐描述"
            class="gb-ipt"
            v-model="ruleForm.summary_text"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input
            class="gb-ipt"
            v-model="ruleForm.sort"
            placeholder="请输入套餐排序"
          ></el-input>
        </el-form-item>

        <el-form-item label="可订日期" prop="date_type">
          <el-radio-group v-model="ruleForm.date_type">
            <el-radio :label="1">节假日</el-radio>
            <el-radio :label="2">自定义</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="ruleForm.date_type == 2" prop="allow_week_days">
          <el-checkbox-group v-model="ruleForm.allow_week_days">
            <el-checkbox label="星期一"></el-checkbox>
            <el-checkbox label="星期二"></el-checkbox>
            <el-checkbox label="星期三"></el-checkbox>
            <el-checkbox label="星期四"></el-checkbox>
            <el-checkbox label="星期五"></el-checkbox>
            <el-checkbox label="星期六"></el-checkbox>
            <el-checkbox label="星期日"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否上架" prop="status">
          <el-switch
            v-model="ruleForm.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <div class="btnBox">
        <el-button type="warning" @click="resetForm('ruleForm')"
          >清除输入</el-button
        >
        <el-button type="" @click="$emit('close', false)">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确定</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import uploadFiles from "@/components/uploadFiles/cutterImageUpload.vue";
import _ from "lodash";
import { number } from "echarts/lib/export";
export default {
  name: "editGroupBuyComponents",
  components: { uploadFiles },
  props: {
    merchants: { type: Object },
    placeType: { type: Array },
    type_id: { type: Number, default: 0 },
  },
  data() {
    return {
      isLoading: false,
      imageUrl: [],
      ruleForm: {
        shop_id: 0,
        merchant_id: 0,
        title: "",
        summary_text: "",
        original_price: "",
        reference_price: "",
        type_id: "",
        type_name: "",
        allow_week_days: [],
      },
      rules: {
        title: [{ required: true, message: "请输入套餐名称", trigger: "blur" }],
        original_price: [
          { required: true, message: "请输入套餐原价", trigger: "blur" },
        ],
        reference_price: [
          { required: true, message: "请输入套餐价格", trigger: "blur" },
        ],
        type_id: [
          { required: true, message: "请选择座位类型", trigger: "change" },
        ],
        summary_text: [
          { required: true, message: "请输入套餐名称", trigger: "blur" },
        ],
      },
      limit: 6,
      restaurants: [],
      options: [],
      checked: false,
      showPlaceType: [],
    };
  },
  created() {
    // this.ruleForm.shop_id = Number(this.$route.query.shop_id);
    // this.ruleForm.merchant_id = Number(this.$route.query.merchant_id);
    this.showPlaceType = Object.assign([], this.placeType);
    this.showPlaceType.splice(0, 0, { type_id: 0, name: "全部" });
  },
  watch: {
    type_id: {
      immediate: true,
      handler(val) {
        if (val) {
          this.ruleForm.type_id = val;
        }
      },
    },
  },
  methods: {
    uploadTheImages(files) {
      console.info(files);
      let images = [];
      for (let i in files) {
        images.push(this.GetImageUrl(files[i]["url"]));
      }
      this.ruleForm.image = images.join(",");
    },
    checkboxFun(e) {
      for (var i = 0; i < this.ruleForm.week_price.length; i++) {
        if (i == e) {
          this.ruleForm.week_price[i].checked = !this.ruleForm.week_price[i]
            .checked;
        }
      }
    },
    timeFun(val) {
      this.ruleForm.allow_hours = val.join("-");
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
      var datas = {
        name: this.ruleForm.goods_detail[i].goods_name,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.$store
        .dispatch("goods/getGroupBuySelectGoods", datas)
        .then((res) => {
          let itemArr = [];
          res.data.map((item) => {
            itemArr.push({
              value: item.name,
            });
          });
          this.restaurants = itemArr;
        });
    },
    handleChange(value) {
      console.log(value);
      // this.ruleForm.sum = value
    },

    getGroudbuyDetaile(datas) {
      this.$store.dispatch("goods/getGroupBuyDetail", datas).then((res) => {
        this.ruleForm = Object.assign({}, res.data);

        this.ruleForm.original_price =
          Number(this.ruleForm.original_price) / 100;
        this.ruleForm.reference_price =
          Number(this.ruleForm.reference_price) / 100;
        this.ruleForm.status = Number(this.ruleForm.status);

        let weeks = res.data.allow_week_days.split(",");
        this.ruleForm.allow_week_days = [];
        for (var i = 0; i < weeks.length; i++) {
          if (weeks[i] == "1") {
            this.ruleForm.allow_week_days.push("星期一");
          } else if (weeks[i] == "2") {
            this.ruleForm.allow_week_days.push("星期二");
          } else if (weeks[i] == "3") {
            this.ruleForm.allow_week_days.push("星期三");
          } else if (weeks[i] == "4") {
            this.ruleForm.allow_week_days.push("星期四");
          } else if (weeks[i] == "5") {
            this.ruleForm.allow_week_days.push("星期五");
          } else if (weeks[i] == "6") {
            this.ruleForm.allow_week_days.push("星期六");
          } else if (weeks[i] == "0") {
            this.ruleForm.allow_week_days.push("星期日");
          }
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const datas = _.cloneDeep(this.ruleForm);

          datas.original_price = Number(datas.original_price) * 100;
          datas.reference_price = Number(datas.reference_price) * 100;

          datas.type_id = Number(datas.type_id);
          datas.sort = Number(datas.sort);
          datas.merchant_id = Number(this.merchants.merchant_id);
          datas.shop_id = Number(this.merchants.shop_id);

          if (datas.date_type == 2) {
            if (datas.allow_week_days.length == 0) {
              this.$message({ message: "必须设置可定日期", type: "warning" });
              return;
            }
          } else {
            datas.allow_week_days = [];
          }

          for (var i = 0; i < datas.allow_week_days.length; i++) {
            if (datas.allow_week_days[i] == "星期一") {
              datas.allow_week_days[i] = "1";
            } else if (datas.allow_week_days[i] == "星期二") {
              datas.allow_week_days[i] = "2";
            } else if (datas.allow_week_days[i] == "星期三") {
              datas.allow_week_days[i] = "3";
            } else if (datas.allow_week_days[i] == "星期四") {
              datas.allow_week_days[i] = "4";
            } else if (datas.allow_week_days[i] == "星期五") {
              datas.allow_week_days[i] = "5";
            } else if (datas.allow_week_days[i] == "星期六") {
              datas.allow_week_days[i] = "6";
            } else if (datas.allow_week_days[i] == "星期日") {
              datas.allow_week_days[i] = "0";
            }
          }

          let typeObj = _.find(this.showPlaceType, function (o) {
            return o.type_id == datas.type_id;
          });
          datas.type_name = typeObj.name != undefined ? typeObj.name : "";
          if (datas.type_name == "") {
            this.$message({ message: "请选择座位分类", type: "warning" });
            return;
          }

          datas.allow_week_days = datas.allow_week_days.join(",");
          console.info("提交的数据：", datas);
          this.isLoading = true;
          this.$store
            .dispatch("goods/updateGroupBuy", datas)
            .then((res) => {
              this.isLoading = false;
              this.ruleForm.title = "";
              this.$emit("reload");
              this.$message({
                message: "" + res.msg,
                type: "success",
              });
            })
            .catch((e) => {
              console.error(e);
              this.isLoading = false;
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
        goods_num: null,
        goods_unit: "",
        goods_price: "",
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
.el-button--primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
.shopSet {
  margin: 15px;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #dfdfdf;
}
.formBox {
  width: 100%;
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
  width: 90px !important;
}
.price-ipt {
  width: 100px;
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
/* .el-form-item{
  width: 80% !important;
}
.el-input{
  min-width: 200px;
  width: 50%;
} */
.gb-ipt {
  max-width: 400px;
}
.inline-input {
  width: 300px !important;
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
.uni-span {
  margin-left: 10px;
}
.btnBox {
  margin-top: 20px;
}
</style>
