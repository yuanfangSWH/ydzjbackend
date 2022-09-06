<!--
 * @Author: your name
 * @Date: 2021-04-06 09:59:47
 * @LastEditTime: 2021-05-06 10:14:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\point\components\mallForm.vue
-->
<template>
  <div>
    <el-form
      ref="formData"
      :model="formData"
      :rules="rules"
      label-width="180px"
      style="height: 65vh; overflow: auto"
    >
      <el-tabs v-model="formActiveName" type="border-card">
        <el-tab-pane label="基本信息" name="first">
          <el-form-item label="商品标题" prop="name">
            <el-input v-model="formData.name" />
          </el-form-item>
          <!-- <el-form-item
            v-if="formData.type == 2"
            label="副标题"
            prop="sub_name"
          >
            <el-input v-model="formData.sub_name" />
          </el-form-item>
          <el-form-item v-if="formData.type == 1" label="副标题" prop="remark">
            <el-input v-model="formData.remark" />
          </el-form-item> -->
          <el-form-item label="副标题" prop="sub_name">
            <el-input v-model="formData.sub_name" />
          </el-form-item>
          <el-form-item label="市场价" prop="price">
            <el-input v-model="formData.price" />
          </el-form-item>
          <el-form-item label="兑换积分" prop="point">
            <el-input v-model.number="formData.point" />
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-radio-group
              v-model="formData.type"
              @change="handleMallType"
              :disabled="formData.item_id != undefined"
            >
              <el-radio :label="1">券</el-radio>
              <el-radio :label="2">实物</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="formData.type == 1"
            label="首单免费领"
            prop="is_free"
          >
            <el-radio-group v-model="formData.is_free">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formData.type == 2" label="图片" prop="image">
            <div class="addPic" @click="addPicDialogVisible = true">
              <div v-if="!formData.image && !localPath">
                <i class="addicon el-icon-plus"></i>
                <div style="">选择图片</div>
              </div>
              <div v-if="formData.image && !localPath">
                <el-image
                  class="addPic"
                  fit="cover"
                  :src="formData.image"
                ></el-image>
              </div>
              <div v-if="formData.image && localPath">
                <el-image
                  class="addPic"
                  fit="cover"
                  :src="localPath"
                ></el-image>
              </div>
            </div>
          </el-form-item>
          <el-form-item
            v-if="formData.type == 1"
            label="有效期(天)"
            prop="expire_day"
          >
            <el-input v-model.number="formData.expire_day" />
          </el-form-item>

          <el-form-item label="可领取时间" prop="start_time">
            <el-date-picker
              class="datePicker"
              v-model="startAndendDate"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              @change="dateChange"
            ></el-date-picker>
            <span style="margin-left: 10px; color: #909399"
              >设置时间即为限时领取商品</span
            >
          </el-form-item>

          <!-- <el-form-item label="有效地区">
      <citySelectex
        ref="citySelect"
        :isCancel="false"
        :isArea="false"
        :isAll="true"
        @setCityAreaName="setCityAreaName"
      ></citySelectex>
    </el-form-item> -->

          <el-form-item
            v-if="!formData.item_id && formData.type == 1"
            label="关联商家"
            prop="shop_id"
          >
            <el-select
              class="sjiasrxz"
              v-model="formData.shop_id"
              multiple
              :multiple-limit="1"
              filterable
              remote
              reserve-keyword
              placeholder="请搜索商家名称"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in shopOptions"
                :key="item.shop_id"
                :label="
                  item.name +
                  ' [ ' +
                  item.type_name +
                  ' ] ' +
                  item.province +
                  ' ' +
                  item.city +
                  ' ' +
                  item.area
                "
                :value="item.shop_id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="排序" prop="sort">
            <el-input v-model.number="formData.sort" />
          </el-form-item>

          <el-form-item label="库存" prop="stock">
            <el-radio-group v-model="formData.stock">
              <el-radio :label="0">不启用</el-radio>
              <el-radio :label="1">启用</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            v-if="formData.stock == 1"
            label="库存量"
            prop="stock_all"
          >
            <el-input v-model.number="formData.stock_all" />
          </el-form-item>

          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio :label="1">上架</el-radio>
              <el-radio :label="2">下架</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="图文详情" name="second">
          <my-editor
            @change="getEditorData"
            :inicontent="formData.summary"
            :height="editorHeight"
            root="goods_media"
            :picstore="'goods'"
            ref="my-editor"
          ></my-editor>
        </el-tab-pane>
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
    </el-form>
    <div class="btnBox" style="text-align: right; margin: 0px">
      <el-button
        type="warning"
        plain
        @click="handleCancelFormData"
        style="margin-left: 50px"
        >取消</el-button
      >
      <el-button
        type="primary"
        @click="handleSubmitFormData"
        style="margin-left: 10px"
        :loading="loading"
        >提交</el-button
      >
    </div>
  </div>
</template>
<script>
import pictureStore from "@/components/pictureStore/picture";
import citySelectex from "@/components/citySelectEX";
import ueditor from "@/components/ueditor";
import { number } from "echarts/lib/export";

export default {
  name: "mallForm",
  components: {
    "picture-store": pictureStore,
    citySelectex: citySelectex,
    "my-editor": ueditor,
  },
  props: {},

  data() {
    return {
      editorHeight: 0,
      formActiveName: "first",
      addPicDialogVisible: false,
      startAndendDate: ["", ""],
      shopOptions: [],
      loading: false,
      formData: {
        item_id: null,
        type: 1,
        name: "",
        sub_name: "",
        remark: "",
        price: null,
        point: 0,
        start_time: "",
        end_time: "",
        sort: 0,
        stock: 0,
        stock_all: 0,
        status: 1,
        image: "",
        summary: "",
        province_id: 0,
        city_id: 0,
        merchant_id: "",
        shop_id: 0,
        expire_day: 0,
        is_free: 0,
      },
      rules: {
        name: [{ required: true, message: "请设置商品标题", trigger: "blur" }],
        sub_name: [
          { required: true, message: "请设置商品副标题", trigger: "blur" },
        ],
        // remark: [
        //   { required: true, message: "请设置商品副标题", trigger: "blur" },
        // ],
        //price: [{ type: "float", message: "须为数字" }],
        point: [{ required: true, message: "须为数字", trigger: "blur" }],
        sort: [{ type: "number", message: "须为数字" }],
        stock: [{ type: "number", message: "须为数字" }],
        expire_day: [{ type: "number", message: "须为数字" }],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "未来一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "未来一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "未来三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "未来一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 365);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      root: "goods_media",
      localPath: "",
    };
  },
  methods: {
    //输入商家名称查询方法
    remoteMethod(query) {
      if (query !== "") {
        this.api.zhixun.getShop({ keyword: query }).then((res) => {
          this.list = res.data.data;
        });
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.shopOptions = this.list.filter((item) => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.shopOptions = [];
      }
    },
    setCityAreaName(v) {
      //console.info(v);
      //if (v.province && v.city) {
      this.formData.province_id = v.province;
      this.formData.city_id = v.city;
      //}
    },
    //日期选择
    dateChange(val) {
      if (val) {
        this.formData.start_time = val[0];
        this.formData.end_time = val[1];
      }
    },
    setFormData(obj) {
      this.formData = obj;
      this.startAndendDate = [obj.start_time, obj.end_time];
      // this.$nextTick(() => {
      //   this.$refs.citySelect.passData(
      //     this.formData.province_id,
      //     this.formData.city_id
      //   );
      // });
    },
    parentImg(url, localPath, n) {
      this.formData.image = url;
      this.localPath = n == 0 ? "" : localPath;
      this.addPicDialogVisible = false;
    },
    handleCancelFormData() {
      this.$emit("cancel");
    },
    handleSubmitFormData() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          let datas = Object.assign({}, this.formData);
          datas.price = this.CalculateData(datas.price, "*");
          let apiName =
            datas.item_id == undefined ? "pointMallInsert" : "pointMallUpdate";
          if (apiName == "pointMallUpdate") {
            delete datas["shop_id"];
            delete datas["merchant_id"];
            delete datas["shop_name"];
            delete datas["type"];
          } else {
            datas.shop_id = datas.shop_id ? datas.shop_id[0] : null;
            datas.merchant_id = datas.shop_id;
          }
          if (datas.point <= 0) {
            this.$message({
              message: "兑换积分必须大于0",
              type: "warning",
            });
            return;
          }
          if (this.$refs["my-editor"].isSource()) {
            this.$message({
              message:
                "图文详情正处于源码编辑状态，无法提交。请切换回正常状态。",
              type: "warning",
            });
            return;
          }
          //datas.price = datas.price <= 0 ? null : Number(datas.price);
          console.info("提交数据", datas);
          //return;
          this.loading = true;
          this.api.point[apiName](datas).then(({ data }) => {
            console.info(data);
            this.loading = false;
            this.$emit("reload");
            this.$emit("cancel");
            this.$message({
              message: data.msg,
              type: data.code == 0 ? "success" : "warning",
            });
          });
        }
      });
    },
    handleMallType() {
      // if (this.formData.type == 1) {
      //   this.formData.image = "";
      // }
      // if (this.formData.type == 2) {
      //   this.formData.expire_day = 0;
      //   this.formData.is_free = 0;
      //   this.merchant_id = null;
      //   this.shop_id = null;
      // }
    },
    getEditorData(data) {
      this.formData.summary = data;
    },
  },
  created() {
    this.editorHeight = window.innerHeight * 0.45; //动态设置图文编辑器高度
  },
};
</script>
<style lang="scss" scoped>
.el-button--primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
.el-form-item {
  //   width: 80% !important;
  .el-input {
    min-width: 400px !important;
    width: 80% !important;
  }
  .el-textarea {
    min-width: 200px !important;
    width: 280px !important;
  }
  .el-form-item__label {
    width: 120px !important;
  }
  .el-form-item__content {
    margin-left: 120px !important;
  }
  .el-select,
  .el-textarea,
  .el-cascader,
  .el-date-editor--timerange.el-input__inner {
    min-width: 200px !important;
    width: 80% !important;
  }
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
#edui_fixedlayer {
  z-index: 3005 !important;
}
</style>
