<template>
  <div class="shopSet">
    <div class="page-title">{{ this._getVuex("pageTitle") }}</div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品小标题" prop="alias">
            <el-input v-model="ruleForm.alias"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="class_id">
            <el-select v-model="ruleForm.class_id" placeholder="请选择商品分类">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.class_name"
                :value="Number(item.class_id)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位" prop="unit" v-if="ruleForm.unit">
            <el-input v-model="ruleForm.unit"></el-input>
            <span class="form-shan2">(例：大杯、小杯、L、ml等)</span>
          </el-form-item>
          <el-form-item label="允许预定星期" prop="allow_week_days">
            <el-checkbox-group v-model="allow_week_days">
              <el-checkbox label="星期一"></el-checkbox>
              <el-checkbox label="星期二"></el-checkbox>
              <el-checkbox label="星期三"></el-checkbox>
              <el-checkbox label="星期四"></el-checkbox>
              <el-checkbox label="星期五"></el-checkbox>
              <el-checkbox label="星期六"></el-checkbox>
              <el-checkbox label="星期日"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="使用时间范围" prop="allow_hours">
            <div class="timeBox">
              <el-time-picker
                v-model="value1"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59',
                }"
                placeholder="任意时间点"
                value-format="HH:mm"
              ></el-time-picker>
              <span class="time-span">-</span>
              <el-time-picker
                v-model="value2"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59',
                }"
                placeholder="任意时间点"
                value-format="HH:mm"
              ></el-time-picker>
            </div>
          </el-form-item>
          <el-form-item label="图片" prop="image">
            <uploadFiles ref="uploadImg" @theIMG="theIMG" />
            <span class="form-shan2">(建议尺寸：200x200px)</span>
          </el-form-item>
          <el-form-item label="原价" prop="market_price">
            <el-input v-model="ruleForm.market_price"></el-input>
            <span class="form-shan">元</span>
          </el-form-item>
          <el-form-item label="折扣" prop="discount">
            <el-input v-model="ruleForm.discount"></el-input>
            <span class="form-shan">
              折
              <i style="color: #aaaaaa; font-style: normal"
                >（例：98折，输入98）</i
              >
            </span>
          </el-form-item>
          <el-form-item label="现价" prop="price">
            <el-input v-model="ruleForm.price"></el-input>
            <span class="form-shan">元</span>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-checkbox v-model="checked" @change="statusChange"
              >上架</el-checkbox
            >
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="ruleForm.sort"></el-input>
          </el-form-item>
          <!-- <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>-->
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="second">
        <el-button type="primary" @click="addAttr">添加属性</el-button>
        <div class="attrBox" v-for="(item, i) in dataList" :key="i">
          <div class="box01">
            <div>
              <span class="attr-s01">属性名</span>
              <span>
                <el-input
                  v-model="dataList[i].name"
                  placeholder="请输入属性名"
                ></el-input>
              </span>
            </div>
            <div class="m-nav">
              <span class="attr-s01">可选类型</span>
              <span>
                <el-select
                  v-model="dataList[i].required"
                  placeholder="请选择"
                  @change="selectChange"
                >
                  <el-option
                    v-for="item in attrOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </div>
            <div class="ac-nav">
              <el-button type="primary" @click="addAttrVal(i)"
                >增加属性值</el-button
              >
              <el-button type="primary" @click="deleteAttrVal(i)"
                >删除</el-button
              >
            </div>
          </div>
          <div
            class="box01 box02"
            v-for="(item2, j) in dataList[i].attr_val"
            :key="j"
          >
            <div>
              <span class="attr-s01">属性值</span>
              <span>
                <el-input
                  v-model="dataList[i].attr_val[j].name"
                  placeholder="请输入内容"
                >
                  <i slot="suffix" class="el-input__icon el-icon-close"></i>
                </el-input>
              </span>
            </div>
            <div class="m-nav">
              <span class="attr-s01">价格</span>
              <span>
                <el-input
                  v-model="dataList[i].attr_val[j].incr_price"
                  placeholder="请输入价格"
                ></el-input>
                <span style="margin-left: 5px">元</span>
              </span>
            </div>
            <div>
              <el-button type="primary" @click="deleteSubAttrVal(i, j)"
                >删除</el-button
              >
            </div>
          </div>
        </div>
      </el-tab-pane>
      <div class="btnBox">
        <el-button type="warning" @click="submitForm('ruleForm')"
          >保存</el-button
        >
        <el-button type="info">取消</el-button>
      </div>
    </el-tabs>
  </div>
</template>
<script>
import uploadFiles from "@/components/uploadFiles";

export default {
  name: "editGoods",
  components: { uploadFiles },
  data() {
    return {
      rVal: "请选择",
      activeName: "first",
      options: [],
      checked: true,
      ruleForm: {
        shop_id: 0,
        merchant_id: 0,
        goods_id: "",
        class_id: "",
        name: "",
        alias: "",
        price: "",
        discount: "",
        unit: "",
        image: "",
        images: 0,
        status: 2,
        market_price: "",
        sort: 0,
        is_combo: 0,
        market_price: "",
        goods_attr: [],
        allow_week_days: [],
        allow_hours: "",
      },
      value1: [],
      value2: [],
      allow_week_days: [],
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        class_id: [
          { required: true, message: "请选择商品分类", trigger: "change" },
        ],
        unit: [{ required: true, message: "请输入商品单位", trigger: "blur" }],
        image: [
          { required: true, message: "请选择商品主图", trigger: "on-change" },
        ],
        market_price: [
          { required: true, message: "请输入商品原价", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品现价", trigger: "blur" }],
        allow_week_days: [
          { required: true, message: "请选择预定星期", trigger: "change" },
        ],
        allow_hours: [
          { required: true, message: "请选择时间范围", trigger: "change" },
        ],
      },
      attrName: "",
      attrOptions: [
        {
          value: "0",
          label: "可选",
        },
        {
          value: "1",
          label: "单选",
        },
        {
          value: "2",
          label: "多选",
        },
      ],
      value: "",
      showBtn: false,
      attrVal: "",
      attrPrice: "",
      dataList: [],
      imgArr: [],
      fileList: [],
      limit: 1,
    };
  },
  created() {
    this.ruleForm.shop_id = Number(this.$route.query.shop_id);
    this.ruleForm.merchant_id = Number(this.$route.query.merchant_id);
    this.options = this.$store.state.classification;
    //this.getGoodsClass();
    this.ruleForm.goods_id = this.$route.query.goods_id;
    if (this.ruleForm.goods_id) {
      this.getGoodsDetaile();
    }
  },
  methods: {
    statusChange() {},
    //   timeFun() {
    //       this.ruleForm.allow_hours = this.value1.join('-')
    //   },
    getGoodsDetaile() {
      const datas = {
        merchant_id: this.ruleForm.merchant_id,
        shop_id: this.ruleForm.shop_id,
        id: this.ruleForm.goods_id,
      };
      this.$store.dispatch("goods/getGoodsDetail", datas).then((res) => {
        this.ruleForm = res.data;
        this.$refs.uploadImg.concert(this.ruleForm.image);
        // var img = this.ruleForm.image;
        // this.imgArr = img.split(",");
        // this.imgArr.forEach((item) => {
        //   let obj = new Object();
        //   obj.url = item;
        //   this.fileList.push(obj);
        // });
        this.ruleForm.market_price = Number(this.ruleForm.market_price) / 100;
        this.ruleForm.price = Number(this.ruleForm.price) / 100;
        this.ruleForm.allow_hours = this.ruleForm.allow_hours.split("-");
        this.value1 = this.ruleForm.allow_hours[0];
        this.value2 = this.ruleForm.allow_hours[1];
        let arr = this.ruleForm.allow_week_days.split(",");
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == "1") {
            arr[i] = "星期一";
          } else if (arr[i] == "2") {
            arr[i] = "星期二";
          } else if (arr[i] == "3") {
            arr[i] = "星期三";
          } else if (arr[i] == "4") {
            arr[i] = "星期四";
          } else if (arr[i] == "5") {
            arr[i] = "星期五";
          } else if (arr[i] == "6") {
            arr[i] = "星期六";
          } else if (arr[i] == "7") {
            arr[i] = "星期日";
          }
        }
        this.allow_week_days = arr;
        if (this.ruleForm.goods_attr) {
          this.dataList = this.ruleForm.goods_attr;
          this.dataList.forEach((item) => {
            if (item.required == 0) {
              item.required = "可选";
            } else if (item.required == 1) {
              item.required = "单选";
            } else if (item.required == 2) {
              item.required = "多选";
            }
          });
          // console.log('000',this.dataList)
        }
      });
    },
    selectChange(val) {
      this.dataList.forEach((item) => {
        if (item.required == "0") {
          item.required = "可选";
        } else if (item.required == "1") {
          item.required = "单选";
        } else if (item.required == "2") {
          item.required = "多选";
        }
      });

      // console.log('444', this.dataList)
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    addAttr() {
      this.dataList.push({
        group_id: 0,
        name: "",
        required: "请选择",
        attr_val: [
          {
            attr_id: 0,
            name: "",
            incr_price: 0,
          },
        ],
      });
      this.showBtn = true;
    },
    addAttrVal(i) {
      this.dataList[i].attr_val.push({
        attr_id: 0,
        name: "",
        incr_price: 0,
      });
    },
    deleteAttrVal(i) {
      this.dataList.splice(i, 1);
    },
    deleteSubAttrVal(i, j) {
      this.dataList[i].attr_val.splice(j, 1);
    },
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for (var i = 0; i < _this.dataList.length; i++) {
            if (_this.dataList[i].attr_val) {
              for (var j = 0; j < _this.dataList[i].attr_val.length; j++) {
                _this.dataList[i].attr_val[j].incr_price = Number(
                  _this.dataList[i].attr_val[j].incr_price
                );
              }
            }
          }
          this.ruleForm.discount = Number(this.ruleForm.discount);
          this.ruleForm.market_price = Number(this.ruleForm.market_price) * 100;
          this.ruleForm.sort = Number(this.ruleForm.sort);
          this.ruleForm.price = Number(this.ruleForm.price) * 100;
          for (var i = 0; i < this.allow_week_days.length; i++) {
            if (this.allow_week_days[i] == "星期一") {
              this.allow_week_days[i] = "1";
            } else if (this.allow_week_days[i] == "星期二") {
              this.allow_week_days[i] = "2";
            } else if (this.allow_week_days[i] == "星期三") {
              this.allow_week_days[i] = "3";
            } else if (this.allow_week_days[i] == "星期四") {
              this.allow_week_days[i] = "4";
            } else if (this.allow_week_days[i] == "星期五") {
              this.allow_week_days[i] = "5";
            } else if (this.allow_week_days[i] == "星期六") {
              this.allow_week_days[i] = "6";
            } else if (this.allow_week_days[i] == "星期日") {
              this.allow_week_days[i] = "7";
            }
          }
          this.ruleForm.allow_week_days = this.allow_week_days.join(",");
          // this.ruleForm.allow_hours = this.value1.join('-')
          this.ruleForm.allow_hours = this.value1 + "-" + this.value2;

          if (this.ruleForm.image.constructor == Array) {
            this.ruleForm.image = this.ruleForm.image.join(",");
          } else {
            var arr = [];
            arr = this.ruleForm.image.split("/upload");
            this.ruleForm.image = "/upload" + arr[1];
          }
          this.dataList.forEach((item) => {
            if (item.required == "可选") {
              item.required = 0;
            } else if (item.required == "单选") {
              item.required = 1;
            } else if (item.required == "多选") {
              item.required = 2;
            }
          });
          this.ruleForm.goods_attr = this.dataList;

          const datas = this.ruleForm;
          this.$store.dispatch("goods/updateGoods", datas).then((res) => {
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
            this.$router.push({ path: "/goods" });
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
    // 获取分类列表(废弃)
    getGoodsClass() {
      const datas = {
        merchant_id: this.ruleForm.merchant_id,
        shop_id: this.ruleForm.shop_id,
      };
      this.$store.dispatch("goods/getGoodsClass", datas).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
    },
  },
};
</script>

<style scoped>
.mainBox >>> .el-input {
  width: 50% !important;
}
.shopSet {
  margin: 15px;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #dfdfdf;
}
.el-button--warning {
  background-color: #ffbe11;
  box-shadow: 0px 4px 4px rgba(255, 190, 17, 0.5);
  border: none;
  color: #0a0a0a;
  font-size: 15px;
}
.el-button--info {
  background-color: #f1f1f1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border: none;
  color: #0a0a0a;
  font-size: 15px;
}
.el-form-item {
  width: 50% !important;
}
.el-input {
  min-width: 200px !important;
  width: 50% !important;
}
.form-shan {
  margin-left: 10px;
}
.form-shan2 {
  margin-left: 10px;
  color: #aaaaaa;
  display: inline-block;
}
.el-button--primary {
  background-color: #1f1f1f;
  border: none;
}
.attrBox {
  border: 1px solid #cecece;
  background: #f4f4f4;
  padding: 20px 20px 0;
  width: 60%;
  margin: 20px 0;
}
.box01 {
  display: flex;
  margin-bottom: 20px;
}
.m-nav {
  flex: 1;
}
.el-button--primary {
  background-color: #1f1f1f;
  border: none;
}
.attr-s01 {
  margin-right: 10px;
}
.box02 {
  padding-left: 10%;
}
.btnBox {
  margin-top: 20px;
}
.timeBox {
  display: flex;
}
.time-span {
  margin: 0 5px;
}
</style>