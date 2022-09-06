<template>
  <div class="shopSet">
    <div class="formBox"
         style="height: 700px; overflow: auto">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="130px"
               class="demo-ruleForm">
        <el-form-item label="套餐名称"
                      prop="name">
          <el-input class="gb-ipt"
                    v-model="ruleForm.name"
                    placeholder="请输入套餐名"></el-input>
        </el-form-item>
        <!-- <el-form-item label="副标题"
                      prop="alias">
          <el-input class="gb-ipt"
                    v-model="ruleForm.alias"
                    placeholder="请输入套餐副标题"></el-input>
        </el-form-item> -->
        <el-form-item label="商品分类"
                      prop="class_id">
          <el-select v-model="ruleForm.class_id"
                     placeholder="请选择商品分类">
            <el-option v-for="(item, index) in goodsClass"
                       :key="index"
                       :label="item.class_name"
                       :value="item.class_id"></el-option>
          </el-select>
          <el-button @click="addNewGoodsClass"
                     icon="el-icon-plus"></el-button>
        </el-form-item>
        <el-form-item label="套餐原价">
          <!-- prop="m_price" -->
          <el-input class="gb-ipt"
                    v-model.number="ruleForm.m_price"
                    @change="calc"
                    placeholder="请输入套餐原价"></el-input>
        </el-form-item>
        <el-form-item label="折扣">
          <!-- prop="discount" -->
          <el-input class="gb-ipt"
                    v-model.number="ruleForm.discount"
                    @change="calcPrice" @blur="discountFun"></el-input><span class="form-shan">
            <!-- @blur="calcPrice"></el-input><span class="form-shan"> -->
            %
            <i style="color: #aaaaaa; font-style: normal">（例：9.8折，输入98）</i>
          </span>
          <span class="form-shan" v-if="discountStatus">
                <i style="color: #f00; font-style: normal">折扣应为1到100的正整数</i></span>
        </el-form-item>
        <el-form-item label="套餐价格"
                      prop="price"
                      required>
          <el-input class="gb-ipt"
                    v-model.number="ruleForm.price"
                    @change="calcDiscount"
                    placeholder="请输入套餐价格"></el-input>
        </el-form-item>
        <el-form-item label="描述"
                      prop="summary">
          <el-input type="textarea" class="formtextarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入商品描述" v-model="ruleForm.summary" maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="套餐组合"
                      prop="combo">
          <div class="groupBox"
               v-for="(item, i) in ruleForm.combo"
               :key="i">
            <el-autocomplete class="inline-input"
                             v-model="ruleForm.combo[i].name"
                             :fetch-suggestions="querySearch"
                             placeholder="请输入商品名称"
                             :trigger-on-focus="false"
                             @select="handleSelect"
                             @input="inputFun(i)"></el-autocomplete>
            <div>
              <el-input-number class="num-ipt"
                               v-model="ruleForm.combo[i].num"
                               controls-position="right"
                               @change="handleChange"
                               :min="1"></el-input-number>
            </div>
            <el-input class="danwei-ipt"
                      v-model="ruleForm.combo[i].unit"
                      placeholder="单位"></el-input>
            <i v-if="i == ruleForm.combo.length - 1"
               class="add-icon el-icon-circle-plus"
               @click="addGoodsDetail(i)"></i>
            <i v-else
               class="close-icon el-icon-error"
               @click="removeGoodsDetail(i)"></i>
          </div>
        </el-form-item>
        <el-form-item label="套餐组合"
                      prop="image">
          <!-- <uploadFiles
            class="uploadTemp"
            @childrenFun="parentFun"
            :limit="limit"
            root="goods"
          /> -->
          <!-- <uploadFiles ref="uploadImages"
                       class="uploadTemp"
                       :limit="limit"
                       :fileList="[]"
                       :option="{
              boxHeigth: 600,
              cutWidth: 500,
              cutHeight: 500,
              sizeChange: false,
            }"
                       root="goods"
                       @upload="uploadTheImages" />
          <span class="zhushi">（请上传100*100的图片尺寸，不得超过2M，不得超过6张）</span> -->
          <div class="addPic" @click="addPicDialogVisible = true">
            <div v-if="!ruleForm.image && !localPath">
              <i class="addicon el-icon-plus"></i>
              <div style="">选择图片</div>
            </div>
            <div v-if="ruleForm.image && !localPath">
              <el-image class="addPic" fit="cover" :src="ruleForm.image"></el-image>
            </div>
            <div v-if="ruleForm.image && localPath">
              <el-image class="addPic" fit="cover" :src="localPath"></el-image>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="排序"
                      prop="sort">
          <el-input class="gb-ipt"
                    v-model="ruleForm.sort"
                    placeholder="请输入套餐排序"></el-input>
        </el-form-item>
        <el-form-item label="状态"
                      prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="1">上架</el-radio>
            <el-radio :label="2">下架</el-radio>
          </el-radio-group>
          <!-- <el-checkbox v-model="checked">上架</el-checkbox> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="btnBox">
      <el-button type="warning"
                 @click="resetForm('ruleForm')">清除输入</el-button>
      <el-button @click="$emit('close', false)">取消</el-button>
      <el-button type="primary"
                 @click="submitForm('ruleForm')">添加</el-button>
    </div>
    <!-- 图库 -->
    <el-dialog
      title="上传图片"
      :visible.sync="addPicDialogVisible"
      width="50%"
      append-to-body>
      <!-- 本地上传或从图片库选择图片（组件） -->
      <picture-store @childImg="parentImg" :root="root"></picture-store>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPicDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPicDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import uploadFiles from "@/components/uploadFiles";
import pictureStore from "@/components/pictureStore/picture"
import _ from "lodash";
export default {
  name: "addGroupGoods",
  components: { uploadFiles, pictureStore },
  props: {
    goodsClass: {
      type: Array,
    },
    merchants: { type: Object },
    classId: { type: Number },
  },
  data () {
    return {
      discountStatus:false,
      ruleForm: {
        class_id: "",
        name: "",
        // alias: "",
        price: null,
        discount: "",
        summary:'',
        unit: "",
        image: "",
        images: 1,
        status: 1,
        market_price: "",
        m_price: "",
        sort: 0,
        combo: [
          {
            name: "",
            num: 0,
            unit: "",
          },
        ],
        is_combo: 1,
      },
      rules: {
        name: [{ required: true, message: "请输入套餐名称", trigger: "blur" }],
        class_id: [
          { required: true, message: "请选择商品分类", trigger: "change" },
        ],
        market_price: [
          { required: true, message: "请输入套餐原价", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        price: [
          { required: true, message: "请输入套餐价格", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        discount: [{ type: "number", message: "必须为数字值" }],
        combo: [
          { required: true, message: "请输入套餐组合信息", trigger: "blur" },
        ],
        image: [
          { required: false, message: "请上传套餐图片", trigger: "on-change" },
        ],
        sort: [{ type: "number", message: "必须为数字值" }],
      },
      value1: "",
      value2: "",
      limit: 6,
      restaurants: [],
      addPicDialogVisible:false,
      fileListActive:'',
      root:'goods_media',
      localPath:''
    };
  },
  created () {
    // this.iniPageParam();
    // this.getGoodsClass();
  },
  computed: {
    computedPrice () {
      if (this.ruleForm.discount == "") {
        return this.ruleForm.m_price;
      } else {
        return (
          (Number(this.ruleForm.m_price) * Number(this.ruleForm.discount)) / 100
        );
      }
    },
  },
  watch: {
    classId: {
      immediate: true,
      handler (val1, val2) {
        if (!val1) return false;
        this.classId = val1;
        this.ruleForm.class_id = val1
      },
    },
  },
  methods: {
    // calcPrice () {
    //   if (this.ruleForm.m_price) {
    //     this.computedPrice = this.ruleForm.m_price * this.ruleForm.discount / 1000
    //   }
    // },
    calc () {
      if ((this.ruleForm.price && !this.ruleForm.discount) || (this.ruleForm.price && this.ruleForm.m_price)) {
        this.calcDiscount()
      } else if (this.ruleForm.discount && !this.ruleForm.price) {
        this.calcPrice()
      }
    },
    // 计算价格
    calcPrice () {
      if (this.ruleForm.m_price) {
        this.ruleForm.price = this.ruleForm.m_price * this.ruleForm.discount / 100
      }
    },
    // 计算折扣
    calcDiscount () {
      if (this.ruleForm.m_price) {
        this.ruleForm.discount = Math.round(parseInt((this.ruleForm.price * 100 / this.ruleForm.m_price) * 100) / 100)
      }
    },
    addNewGoodsClass () {
      this.$emit("addNewGoodsClass");
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants;
      // 调用 callback 返回建议列表的数据
      cb(restaurants);
    },
    handleSelect (item) {
      //console.log(item);
    },
    inputFun (i) {
      const datas = {
        name: this.ruleForm.combo[i].name,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.$store
        .dispatch("goods/getGroupBuySelectGoods", datas)
        .then((res) => {
          let itemArr = [];
          if (res.data) {
            res.data.map((item) => {
              itemArr.push({
                value: item.name,
              });
            });
          }
          this.restaurants = itemArr;
        });
    },
    handleChange (value) {
      console.log(value);
      // this.ruleForm.sum = value
    },
    uploadTheImages (files) {
      console.info(files);
      this.isAddImg = true;
      let images = [];
      for (let i in files) {
        images.push(files[i]["url"]);
      }
      this.ruleForm.image = images.join(",");
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const datas = _.cloneDeep(this.ruleForm);
          datas.shop_id = Number(this.merchants.shop_id);
          datas.merchant_id = Number(this.merchants.merchant_id);
          datas.class_id = Number(datas.class_id);
          datas.discount = Number(datas.discount);
          datas.market_price = Number(datas.m_price) * 100;
          datas.sort = Number(datas.sort);
          // datas.price = Number(this.computedPrice) * 100;
          datas.price = Number(this.ruleForm.price) * 100;
          if (datas.image.constructor == Array) {
            datas.image = datas.image.join(",");
          } else {
            var arr = [],
              arr = datas.image.split(",");
            for (var i = 0; i < arr.length; i++) {
              arr[i] = this.GetImageUrl(arr[i]);
            }
            datas.image = arr.join(",");
          }
          var arr = []
          for(var i=0; i<datas.combo.length; i++) {
            if(datas.combo[i].name != ''){
              arr.push(datas.combo[i])
            }
          }
          datas.combo = arr
          // console.info("提交编辑数据：", datas);
          this.$store.dispatch("goods/addGoods", datas).then((res) => {
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
            this.ruleForm.name = "";
            this.ruleForm.image = "";
            // this.$refs.uploadImages.clearAllImage();
            this.$emit("reload");
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.ruleForm = {
        class_id: "",
        name: "",
        // alias: "",
        price: null,
        discount: "",
        unit: "",
        image: "",
        images: 1,
        status: 1,
        market_price: "",
        m_price: "",
        sort: 0,
        combo: [
          {
            name: "",
            num: 0,
            unit: "",
          },
        ],
        is_combo: 1,
      }
    },
    parentFun(url, n, localPath) {
      this.ruleForm.image = url;
      this.localPath = localPath
      this.fileListActive = url;
    },
    addGoodsDetail (i) {
      this.ruleForm.combo.push({
        name: "",
        num: 1,
        unit: "",
      });
    },
    removeGoodsDetail (i) {
      this.ruleForm.combo.splice(i, 1);
    },
    // addSummary (i) {
    //   this.ruleForm.summary.push({
    //     item_name: "",
    //     item_content: "",
    //   });
    // },
    // removeSummary (i) {
    //   this.ruleForm.summary.splice(i, 1);
    // },
    discountFun() {
      if(this.ruleForm.discount>100 || this.ruleForm.discount<1){
        this.discountStatus = true
        this.ruleForm.discount = null
      }else{
        this.discountStatus = false
      }
    },
    parentImg(url, localPath, n) {
      this.ruleForm.image = url
      this.localPath = n == 0 ? '':localPath
      this.addPicDialogVisible = false
    }
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
.btnBox {
  margin-top: 20px;
}
.addPic{
  border: 1px solid #DCDFE6;
  border-radius: 6px;
  background: #fafafa; cursor: pointer;
  width: 100px; height: 100px; text-align: center; line-height: 28px;
}
.addicon{ font-size: 28px; margin-top: 20px;}
.formtextarea{ width: 600px;}
</style>
