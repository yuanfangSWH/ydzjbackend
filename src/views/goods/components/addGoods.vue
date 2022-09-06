<template>
  <div class="shopSet">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <div style="height: 500px; overflow: auto">
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
            <!-- 卓为说去掉小标题和折扣 -->
            <!-- <el-form-item label="商品小标题"
                          prop="alias">
              <el-input v-model="ruleForm.alias"></el-input>
            </el-form-item> -->
            <el-form-item label="商品分类" prop="class_id">
              <el-select
                v-model="ruleForm.class_id"
                placeholder="请选择商品分类"
              >
                <el-option
                  v-for="(item, index) in goodsClass"
                  v-if="item.status > 0"
                  :key="index"
                  :label="item.class_name"
                  :value="item.class_id"
                ></el-option>
              </el-select>
              <el-button
                @click="addNewGoodsClass"
                icon="el-icon-plus"
              ></el-button>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
              <el-input v-model="ruleForm.unit"></el-input
              ><span class="form-shan2">(例：大杯、小杯、L、ml等)</span>
            </el-form-item>
            <el-form-item label="图片" prop="image">
              <div class="addPic" @click="addPicDialogVisible = true">
                <div v-if="!ruleForm.image && !localPath">
                  <i class="addicon el-icon-plus"></i>
                  <div style="">选择图片</div>
                </div>
                <div v-if="ruleForm.image && !localPath">
                  <el-image
                    class="addPic"
                    fit="cover"
                    :src="ruleForm.image"
                  ></el-image>
                </div>
                <div v-if="ruleForm.image && localPath">
                  <el-image
                    class="addPic"
                    fit="cover"
                    :src="localPath"
                  ></el-image>
                </div>
              </div>
              <!-- <uploadFiles ref="uploadImages"
                           class="uploadTemp"
                           :limit="limit"
                           :fileList="imageUrl"
                           :option="{
                  boxHeigth: 600,
                  cutWidth: 500,
                  cutHeight: 500,
                  sizeChange: false,
                }"
                           root="goods"
                           @upload="uploadTheImages" /> -->
            </el-form-item>
            <!-- <el-form-item label="原价">
              <el-input v-model.number="ruleForm.m_price"
                        @change="calc"></el-input><span class="form-shan">元</span>
            </el-form-item> -->
            <el-form-item label="原价">
              <el-input v-model="ruleForm.m_price"></el-input
              ><span class="form-shan">元</span>
            </el-form-item>
            <!-- <el-form-item label="折扣">
              <el-input v-model.number="ruleForm.discount"
                        @change="calcPrice" @blur="discountFun"></el-input><span class="form-shan">
                %
                <i style="color: #aaaaaa; font-style: normal">（例：9.8折，输入98）</i></span>
                <span class="form-shan" v-if="discountStatus">
                <i style="color: #f00; font-style: normal">折扣应为1到100的正整数</i></span>
            </el-form-item> -->
            <!-- <el-form-item label="现价"
                          prop="price"
                          required>
              <el-input v-model.number="ruleForm.price"
                        @change="calcDiscount"></el-input><span class="form-shan">元</span>
            </el-form-item> -->
            <el-form-item label="现价" prop="price" required>
              <el-input v-model="ruleForm.price"></el-input
              ><span class="form-shan">元</span>
            </el-form-item>
            <el-form-item label="是否营销" prop="is_atmosphere">
              <el-radio-group v-model="ruleForm.is_atmosphere">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
              <span class="form-shan2">(注：营销专员，推荐商品)</span>
            </el-form-item>
            <el-form-item label="是否赠品" prop="allow_giving">
              <el-radio-group v-model="ruleForm.allow_giving">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="ruleForm.status">
                <el-radio :label="1">上架</el-radio>
                <el-radio :label="2">下架</el-radio>
              </el-radio-group>
              <!-- <el-checkbox v-model="checked">上架</el-checkbox> -->
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model.number="ruleForm.sort"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="second">
        <div style="height: 500px; overflow: scroll">
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
                  >
                    <el-option
                      v-for="item in attrOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
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
                    clearable
                    v-model="dataList[i].attr_val[j].name"
                    placeholder="请输入内容"
                  >
                    <!-- <i slot="suffix" class="el-input__icon el-icon-close"></i> -->
                  </el-input>
                </span>
              </div>
              <div class="m-nav">
                <span class="attr-s01">价格</span>
                <span>
                  <el-input
                    v-model="dataList[i].attr_val[j].incr_price"
                    placeholder="请输入价格"
                  >
                  </el-input
                  ><span style="margin-left: 5px">元</span>
                </span>
              </div>
              <div>
                <el-button type="primary" @click="deleteSubAttrVal(i, j)"
                  >删除</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <div class="btnBox">
        <el-button type="warning" @click="resetForm('ruleForm')"
          >清除输入</el-button
        >
        <el-button type="" @click="$emit('close', false)">取消</el-button>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          :loading="loading"
          >添加</el-button
        >
      </div>
    </el-tabs>
    <el-dialog
      title="上传图片"
      :visible.sync="addPicDialogVisible"
      width="50%"
      append-to-body
    >
      <!-- 本地上传或从图片库选择图片（组件） -->
      <picture-store @childImg="parentImg" :root="root"></picture-store>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPicDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPicDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import uploadFiles from "@/components/uploadFiles";
import pictureStore from "@/components/pictureStore/picture";
import { getToken } from "@/utils/auth";
export default {
  name: "addGoodsComponent",
  components: { uploadFiles, pictureStore },
  props: {
    goodsClass: {
      type: Array,
    },
    merchants: { type: Object },
    classId: { type: Number },
  },
  data() {
    return {
      discountStatus: false,
      loading: false,
      //用props
      //   merchant_id: null,
      //   shop_id: null,
      imageUrl: [],
      header: {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=--------------------------AAAAA",
          AccessToken: getToken(),
        },
      },
      activeName: "first",
      atmosphereChecked: false,
      givingChecked: false,
      ruleForm: {
        merchant_id: null,
        shop_id: null,
        class_id: "",
        name: "",
        alias: "",
        price: "",
        discount: "",
        unit: "份",
        // save_days:'',
        image: "",
        images: 0,
        status: 1,
        market_price: "",
        m_price: "",
        sort: 0,
        goods_attr: [],
        is_combo: 0,
        is_atmosphere: 0,
        allow_giving: 0,
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        class_id: [
          { required: true, message: "请选择商品分类", trigger: "change" },
        ],
        unit: [{ required: true, message: "请输入商品单位", trigger: "blur" }],
        image: [
          { required: false, message: "请选择商品主图", trigger: "on-change" },
        ],
        m_price: [
          { required: true, message: "请输入商品原价", trigger: "blur" },
        ],
        discount: [{ type: "number", message: "必须为数字值" }],
        price: [{ required: true, message: "请输入商品现价", trigger: "blur" }],
        is_atmosphere: [
          { required: true, message: "请设置是否营销", trigger: "change" },
        ],
        allow_giving: [
          { required: true, message: "请设置是否赠品", trigger: "change" },
        ],
        sort: [{ type: "number", message: "必须为数字值" }],
      },
      value1: "",
      value2: "",
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
      limit: 1,
      addPicDialogVisible: false,
      root: "goods_media",
      localPath: "",
    };
  },
  watch: {
    // merchants: {
    //   immediate: true,
    //   handler(val1, val2) {
    //   },
    // },classId
    classId: {
      immediate: true,
      handler(val1, val2) {
        // console.log(val1, val2);
        if (!val1) return false;
        this.classId = val1;
        this.ruleForm.class_id = val1;
      },
    },
  },
  created() {
    // this.merchant_id = Number(this.$route.query.merchant_id);
    // this.shop_id = Number(this.$route.query.shop_id);
  },
  computed: {
    computedPrice() {
      if (this.ruleForm.discount == "") {
        return this.ruleForm.m_price;
      } else {
        return (
          (Number(this.ruleForm.m_price) * Number(this.ruleForm.discount)) / 100
        );
      }
    },
  },
  methods: {
    calc() {
      if (
        (this.ruleForm.price && !this.ruleForm.discount) ||
        (this.ruleForm.price && this.ruleForm.m_price)
      ) {
        this.calcDiscount();
      } else if (this.ruleForm.discount && !this.ruleForm.price) {
        this.calcPrice();
      }
    },
    // 计算价格
    calcPrice() {
      if (this.ruleForm.m_price) {
        this.ruleForm.price =
          (this.ruleForm.m_price * this.ruleForm.discount) / 100;
      }
    },
    // 计算折扣
    calcDiscount() {
      if (this.ruleForm.m_price) {
        this.ruleForm.discount = Math.round(
          parseInt(
            ((this.ruleForm.price * 100) / this.ruleForm.m_price) * 100
          ) / 100
        );
      }
    },
    addNewGoodsClass() {
      this.$emit("addNewGoodsClass");
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    addAttr() {
      this.dataList.push({
        name: "",
        required: "请选择",
        attr_val: [
          {
            name: "",
            incr_price: 0,
          },
        ],
      });
      this.showBtn = true;
    },
    addAttrVal(i) {
      this.dataList[i].attr_val.push({
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

    /**
     * @description: 图片裁剪组件完成上传操作后回调
     * @param {Array} files 上传后服务器端返回的文件列表
     * @return void
     */
    uploadTheImages(files) {
      console.info(files);
      this.imageUrl = files;
      this.isAddImg = true;
      let images = [];
      for (let i in files) {
        images.push(this.GetImageUrl(files[i]["url"]));
      }
      this.ruleForm.image = images.join(",");
    },

    /**
     * @description: 提交表单
     * @param {*} formName 表单名称，即ref名称
     * @return {*}
     */
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const datas = Object.assign({}, this.ruleForm);
          for (var i = 0; i < _this.dataList.length; i++) {
            _this.dataList[i].required = Number(_this.dataList[i].required);
            for (var j = 0; j < _this.dataList[i].attr_val.length; j++) {
              _this.dataList[i].attr_val[j].incr_price = Number(
                _this.dataList[i].attr_val[j].incr_price
              );
            }
          }
          datas.goods_attr = this.dataList;
          datas.discount = Number(datas.discount);
          datas.market_price = Number(datas.m_price) * 100;
          datas.class_id = Number(datas.class_id);
          datas.sort = Number(datas.sort);
          // datas.price = Number(this.computedPrice) * 100;
          datas.price = Number(datas.price) * 100;
          datas.merchant_id = Number(this.merchants.merchant_id);
          datas.shop_id = Number(this.merchants.shop_id);

          delete datas.m_price;
          this.loading = true;
          this.$store
            .dispatch("goods/addGoods", datas)
            .then((res) => {
              this.loading = false;
              this.ruleForm.name = "";
              this.ruleForm.image = "";
              this.imageUrl = [];
              // this.$refs.uploadImages.clearAllImage();
              this.$emit("reload");
              this.$message({
                message: "" + res.msg,
                type: "success",
              });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm = {
        merchant_id: null,
        shop_id: null,
        class_id: "",
        name: "",
        alias: "",
        price: "",
        discount: "",
        unit: "份",
        // save_days:'',
        image: "",
        images: 0,
        status: 1,
        market_price: "",
        m_price: "",
        sort: 0,
        goods_attr: [],
        is_combo: 0,
        is_atmosphere: 0,
        allow_giving: 0,
      };
      //this.$router.push({ path: "/goods" });
    },
    discountFun() {
      if (this.ruleForm.discount > 100 || this.ruleForm.discount < 1) {
        this.discountStatus = true;
        this.ruleForm.discount = null;
      } else {
        this.discountStatus = false;
      }
    },
    parentImg(url, localPath, n) {
      this.ruleForm.image = url;
      this.localPath = n == 0 ? "" : localPath;
      this.addPicDialogVisible = false;
    },
  },
};
</script>

<style scoped>
.nonespan {
  width: 100%;
  text-align: center;
  display: inline-block;
  margin-top: 20px;
  color: #999;
}
.mainBox >>> .el-input {
  width: 100% !important;
}
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
  width: 80% !important;
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
  width: 100%;
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
.shopSet >>> .timeNav {
  width: 120px !important;
  margin-right: 10px;
}
.timeBox {
  display: flex;
}
.time-span {
  margin: 0 5px;
}
.comimg {
  width: 150px;
  height: 150px;
  padding: 10px;
  position: relative;
}
.addPic {
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  background: #fafafa;
  cursor: pointer;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 28px;
}
.addicon {
  font-size: 28px;
  margin-top: 20px;
}
</style>
