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
        <el-form-item label="套餐名称" prop="name">
          <el-input
            class="gb-ipt"
            v-model="ruleForm.name"
            placeholder="请输入套餐名"
          ></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="alias">
          <el-input
            class="gb-ipt"
            v-model="ruleForm.alias"
            placeholder="请输入套餐副标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="class_id">
          <el-select v-model="ruleForm.class_id" placeholder="请选择商品分类">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.class_name"
              :value="item.class_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="套餐原价" prop="market_price">
          <el-input
            class="gb-ipt"
            v-model="ruleForm.market_price"
            placeholder="请输入套餐原价"
          ></el-input>
        </el-form-item>
        <el-form-item label="折扣" prop="discount">
          <el-input class="gb-ipt" v-model="ruleForm.discount"></el-input
          ><span class="form-shan"
            >折
            <i style="color: #aaaaaa; font-style: normal">（例：98折，输入98）</i></span
          >
        </el-form-item>
        <el-form-item label="套餐价格" required>
          <el-input
            class="gb-ipt"
            v-model="computedPrice"
            placeholder="请输入套餐价格"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="允许预定星期" prop="allow_week_days">
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
                <el-form-item label="使用时间范围" prop="allow_hours">
                    <div class="timeBox">
                        <el-time-picker
                            v-model="value1"
                            placeholder="任意时间点"
                            value-format='HH:mm'
                            format='HH:mm'>
                        </el-time-picker>
                        <span class="time-span">-</span>
                        <el-time-picker
                            v-model="value2"
                            placeholder="任意时间点"
                            value-format='HH:mm'
                            format='HH:mm'>
                        </el-time-picker>
                    </div>
                </el-form-item> -->
        <el-form-item label="套餐组合" prop="combo">
          <div class="groupBox" v-for="(item, i) in ruleForm.combo" :key="i">
            <el-autocomplete
              class="inline-input"
              v-model="ruleForm.combo[i].name"
              :fetch-suggestions="querySearch"
              placeholder="请输入商品名称"
              :trigger-on-focus="false"
              @select="handleSelect"
              @input="inputFun(i)"
            ></el-autocomplete>
            <div>
              <el-input-number
                class="num-ipt"
                v-model="ruleForm.combo[i].num"
                controls-position="right"
                @change="handleChange"
                :min="1"
              ></el-input-number>
            </div>
            <el-input
              class="danwei-ipt"
              v-model="ruleForm.combo[i].unit"
              placeholder="单位"
            ></el-input>
            <i
              v-if="i == ruleForm.combo.length - 1"
              class="add-icon el-icon-circle-plus"
              @click="addGoodsDetail(i)"
            ></i>
            <i v-else class="close-icon el-icon-error" @click="removeGoodsDetail(i)"></i>
          </div>
        </el-form-item>
        <el-form-item label="套餐组合" prop="image">
          <uploadFiles
            class="uploadTemp"
            @childrenFun="parentFun"
            :limit="limit"
            :TfileList="fileList"
            root="goods"
          />
          <span class="zhushi"
            >（请上传100*100的图片尺寸，不得超过2M，不得超过 {{ limit }} 张）</span
          >
        </el-form-item>
        <!-- <el-form-item label="购买须知" prop="summary">
                    <div class="groupBox" v-for="(item, i) in ruleForm.summary" :key="i">
                        <el-input class="n-ipt2" v-model="ruleForm.summary[i].item_name" placeholder="请输入小标题"></el-input>
                        <el-input class="danwei-ipt2" v-model="ruleForm.summary[i].item_content" placeholder="请输入内容"></el-input>
                        <i v-if="i == ruleForm.summary.length-1" class="add-icon el-icon-circle-plus" @click="addSummary(i)"></i>
                        <i v-else class="close-icon el-icon-error" @click="removeSummary(i)"></i>
                    </div> 
                </el-form-item> -->
        <el-form-item label="排序" prop="sort">
          <el-input
            class="gb-ipt"
            v-model="ruleForm.sort"
            placeholder="请输入套餐排序"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="1">上架</el-radio>
            <el-radio :label="2">下架</el-radio>
          </el-radio-group>
          <!-- <el-checkbox v-model="checked">上架</el-checkbox> -->
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
import uploadFiles from "@/components/uploadFiles/newUploadFiles.vue";
import _ from "lodash";
export default {
  name: "editGroupGoods",
  components: { uploadFiles },
  data() {
    return {
      merchant_id: "",
      shop_id: "",
      ruleForm: {
        goods_id: "",
        class_id: "",
        name: "",
        alias: "",
        price: "",
        discount: "",
        unit: "",
        image: "",
        images: 1,
        status: 1,
        market_price: "",
        m_price: "",
        sort: 0,
        combo: [],
        is_combo: 1,
        // allow_week_days:[],
        // allow_hours:'00:00-23:59'
      },
      rules: {
        name: [{ required: true, message: "请输入套餐名称", trigger: "blur" }],
        class_id: [{ required: true, message: "请选择商品分类", trigger: "change" }],
        market_price: [{ required: true, message: "请输入套餐原价", trigger: "blur" }],
        price: [{ required: true, message: "请输入套餐价格", trigger: "blur" }],
        combo: [{ required: true, message: "请输入套餐组合信息", trigger: "blur" }],
        image: [{ required: true, message: "请上传套餐图片", trigger: "on-change" }],
        // summary: [
        //     { required: true, message: '请填写购买须知', trigger: 'blur' }
        // ],
        // allow_week_days: [
        //     { required: true, message: '请选择预定星期', trigger: 'change' }
        // ],
        // allow_hours: [
        //     { required: true, message: '请选择时间范围', trigger: 'change' }
        // ]
      },
      value1: [],
      value2: [],
      limit: 6,
      restaurants: [],
      options: [],
      // allow_week_days:[],
      imgArr: [],
      fileList: [],
      isAddImg: false,
    };
  },
  created() {
    this.iniPageParam();
    this.getGoodsClass();
    this.ruleForm.goods_id = this.$route.query.goods_id;
    if (this.ruleForm.goods_id) {
      this.getGoodsDetaile();
    }
  },
  computed: {
    computedPrice() {
      if (this.ruleForm.discount == "") {
        return this.ruleForm.market_price;
      } else {
        return (
          (Number(this.ruleForm.market_price) * Number(this.ruleForm.discount)) / 100
        );
      }
    },
  },
  methods: {
    iniPageParam() {
      this.merchant_id = this.$route.query.merchant_id;
      this.shop_id = this.$route.query.shop_id;
    },
    getGoodsDetaile() {
      const datas = {
        id: this.ruleForm.goods_id,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      this.$store.dispatch("goods/getGoodsDetail", datas).then((res) => {
        this.ruleForm = res.data;
        var img = this.ruleForm.image;
        this.imgArr = img.split(",");
        this.imgArr.forEach((item) => {
          let obj = new Object();
          obj.url = item;
          this.fileList.push(obj);
        });
        this.ruleForm.combo = this.ruleForm.combo ? JSON.parse(this.ruleForm.combo) : "";
        // this.ruleForm.market_price=Number(this.ruleForm.market_price)/100
        this.ruleForm.price = Number(this.ruleForm.price) / 100;
        this.ruleForm.market_price = Number(this.ruleForm.market_price) / 100;
        // this.ruleForm.allow_hours = this.ruleForm.allow_hours.split('-')
        // this.value1 = this.ruleForm.allow_hours[0]
        // this.value2 = this.ruleForm.allow_hours[1]
        // let arr = this.ruleForm.allow_week_days.split(',')
        // for(var i=0; i<arr.length; i++){
        //     if(arr[i] == '1'){
        //         arr[i] = '星期一'
        //     }else if(arr[i] == '2'){
        //         arr[i] = '星期二'
        //     }else if(arr[i] == '3'){
        //         arr[i] = '星期三'
        //     }else if(arr[i] == '4'){
        //         arr[i] = '星期四'
        //     }else if(arr[i] == '5'){
        //         arr[i] = '星期五'
        //     }else if(arr[i] == '6'){
        //         arr[i] = '星期六'
        //     }else if(arr[i] == '0'){
        //         arr[i] = '星期日'
        //     }
        // }
        // this.ruleForm.allow_week_days = arr
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
        name: this.ruleForm.combo[i].name,
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
    handleChange(value) {
      // console.log(value);
      // this.ruleForm.sum = value
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const datas = _.cloneDeep(this.ruleForm);
          datas.merchant_id = this.merchant_id;
          datas.shop_id = this.shop_id;

          datas.discount = Number(datas.discount);
          datas.market_price = Number(datas.market_price) * 100;
          datas.sort = Number(datas.sort);
          datas.price = Number(this.computedPrice);

          // for(var i=0; i<this.ruleForm.allow_week_days.length; i++){
          //     if(this.ruleForm.allow_week_days[i] == '星期一'){
          //     this.ruleForm.allow_week_days[i] = '1'
          //     }else if(this.ruleForm.allow_week_days[i] == '星期二'){
          //     this.ruleForm.allow_week_days[i] = '2'
          //     }else if(this.ruleForm.allow_week_days[i] == '星期三'){
          //     this.ruleForm.allow_week_days[i] = '3'
          //     }else if(this.ruleForm.allow_week_days[i] == '星期四'){
          //     this.ruleForm.allow_week_days[i] = '4'
          //     }else if(this.ruleForm.allow_week_days[i] == '星期五'){
          //     this.ruleForm.allow_week_days[i] = '5'
          //     }else if(this.ruleForm.allow_week_days[i] == '星期六'){
          //     this.ruleForm.allow_week_days[i] = '6'
          //     }else if(this.ruleForm.allow_week_days[i] == '星期日'){
          //     this.ruleForm.allow_week_days[i] = '0'
          //     }
          // }
          // this.ruleForm.allow_week_days = this.ruleForm.allow_week_days.join(',')
          // this.ruleForm.allow_hours = this.value1 +'-'+this.value2
          if (datas.image.constructor == Array) {
            datas.image = datas.image.join(",");
          } else {
            if (!this.isAddImg) {
              var arr = [],
                arr2 = [],
                src = "",
                arr3 = [];
              arr = datas.image.split(",");
              for (var i = 0; i < arr.length; i++) {
                arr2 = arr[i].split("/upload");
                arr[i] = "/upload" + arr2[1];
              }
              datas.image = arr.join(",");
            }
          }

          this.$store.dispatch("goods/updateGoods", datas).then((res) => {
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
            this.$router.push({
              path: "/shopInfo",
              query: {
                shop_id: this.shop_id,
                merchant_id: this.merchant_id,
                tab: "shopGoods",
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
    parentFun(path, isAdd) {
      let pathArr = [];
      pathArr = path;
      // this.ruleForm.image = pathArr.join(',')
      if (this.ruleForm.image == "") {
        this.ruleForm.image = pathArr.join(",");
      } else {
        if (isAdd) {
          this.isAddImg = true;
          var arr = [],
            arr2 = [],
            src = "",
            arr3 = [];
          arr = this.ruleForm.image.split(",");
          for (var i = 0; i < arr.length; i++) {
            arr2 = arr[i].split("/upload");
            arr[i] = "/upload" + arr2[1];
          }
          this.ruleForm.image = arr.join(",") + "," + pathArr.join(",");
        } else {
          this.isAddImg = true;
          this.ruleForm.image = pathArr.join(",");
        }
      }
    },
    addGoodsDetail(i) {
      this.ruleForm.combo.push({
        name: "",
        num: 1,
        unit: "",
      });
    },
    removeGoodsDetail(i) {
      this.ruleForm.combo.splice(i, 1);
    },
    // 获取分类列表
    getGoodsClass() {
      const datas = {
        page_size: 10000,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      this.$store.dispatch("goods/getGoodsClass", datas).then((res) => {
        this.options = res.data;
      });
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
.imgbigbox {
  display: flex;
}
.imgNav {
  height: 148px;
  width: 148px;
}
.timeBox {
  display: flex;
}
.time-span {
  margin: 0 5px;
}
</style>
