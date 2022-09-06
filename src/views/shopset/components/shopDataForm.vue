<!--
 * @Author: 朱强
 * @Date: 2021-01-28 11:48:45
 * @LastEditTime: 2021-02-03 15:06:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\shopset\components\shopDataForm.vue
-->
<template>
  <div>
    <el-form :model="addItem"
             :rules="rules"
             ref="insertItem"
             label-width="180px"
             class="updateArea"
             style=" overflow: auto">
      <el-form-item label="店铺名称"
                    prop="name">
        <el-input v-model="addItem.name"
                  style="width: 400px !important" />
      </el-form-item>
      <el-form-item label="店铺类型"
                    prop="type_id">
        <el-select v-model="addItem.type_id"
                   placeholder="请选择店铺类型">
          <el-option v-for="item in shopTypeList"
                     :key="item.type_id"
                     :label="item.type_name"
                     :value="item.type_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="营业时间"
                    prop="business_start_time">
        <el-time-picker v-model="addItem.business_start_time"
                        clearable
                        value-format="HH:mm"
                        format="HH:mm"
                        placeholder="选择开始时间"></el-time-picker>
        -
        <el-time-picker v-model="addItem.business_stop_time"
                        clearable
                        value-format="HH:mm"
                        format="HH:mm"
                        placeholder="选择结束时间"></el-time-picker>
      </el-form-item>
      <!-- <el-form-item label="店铺英文简称" prop="ename">
          <el-input v-model="addItem.ename" />
        </el-form-item> -->
      <el-form-item label="省市区">
        <citySelectex @setCityAreaName="setCityAreaName" />
      </el-form-item>
      <el-form-item label="地址"
                    prop="address">
        <el-input v-model="addItem.address">
          <el-button slot="append"
                     @click="selectLocation">定位</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="商家电话"
                    prop="phone">
        <div style="">
          <el-input ref="shopPhone" v-model="addItem.phone" @keyup.native="validatePhone" placeholder="暂无电话"
                    style="width:400px !important; margin-right:10px" />
          <div class="form-shan"
                style="color:#666; font-size:12px; line-height:20px">(多个电话用英文半角分号分隔。如：0772-2663398;0772-5051498)</div>
          <div class="form-shan" style="color:#f00; font-size:12px;line-height:20px" v-if="isError">输入的电话号码不正确，请重新输入</div>
        </div>

      </el-form-item>
      <el-form-item label="人均消费"
                    prop="basic_price">
        <el-input v-model="addItem.basic_price" />
      </el-form-item>
      <el-form-item label="店铺logo"
                    prop="logo">
        <img class="comimg"
             v-if="imageUrl"
             :src="imageUrl" />
        <Imgcutter @cutDown="cutDown"
                   :boxHeight="600"
                   :cutWidth="500"
                   :cutHeight="500"
                   :sizeChange="false"></Imgcutter>
      </el-form-item>
      <!-- <el-form-item label="营业状态"
                      prop="business_status">
          <el-radio-group v-model="addItem.business_status">
            <el-radio :label="1">营业中</el-radio>
            <el-radio :label="0">暂停营业</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="addItem.business_status == 0"
                      label="暂停营业公告">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="请输入内容"
                    v-model="addItem.notice">
          </el-input>
        </el-form-item>

        <el-form-item label="审核状态"
                      prop="status">
          <el-radio-group v-model="addItem.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常显示</el-radio>
            <el-radio :label="2">审核中</el-radio>
          </el-radio-group>
        </el-form-item> -->

      <!-- <el-form-item label="销量" prop="order_all_count">
          <el-input v-model="addItem.order_all_count" />
        </el-form-item>
        <el-form-item label="平台佣金比" prop="commission_rate">
          <el-input v-model="addItem.commission_rate" />
        </el-form-item>
        <el-form-item label="允许最大预订天数" prop="reserve_days">
          <el-input v-model="addItem.reserve_days" />
        </el-form-item> -->

      <!-- <el-form-item label="预订是否支持选位" prop="reserve_choose_place">
          <el-select
            v-model="addItem.reserve_choose_place"
            placeholder="请选择状态"
          >
            <el-option key="0" label="关闭" value="0"></el-option>
            <el-option key="1" label="开启" value="1"></el-option>
          </el-select>
        </el-form-item> -->
      <!-- <el-form-item label="是否允许周末取酒" prop="week_take_out_wine">
          <el-select
            v-model="addItem.week_take_out_wine"
            placeholder="请选择状态"
          >
            <el-option key="0" label="不允许" value="0"></el-option>
            <el-option key="1" label="允许" value="1"></el-option>
          </el-select>
        </el-form-item> -->

      <!-- <el-form-item label="是否支持VR"
                      prop="vr">
          <el-radio-group v-model="addItem.vr">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="addItem.vr == 1"
                      label="VR地址">
          <el-input placeholder="请输入VR地址"
                    v-model="addItem.vr_url">
          </el-input>
        </el-form-item>

        <el-form-item label="是否预定"
                      prop="reserve">
          <el-radio-group v-model="addItem.reserve">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否支持选座"
                      prop="choose_place">
          <el-radio-group v-model="addItem.choose_place">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否支持选择到达时间段"
                      prop="choose_time">
          <el-radio-group v-model="addItem.choose_time">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="addItem.choose_time == 1"
                      label="预订最ggg晚到达时间"
                      prop="reserve_latest_arrive">
          <el-time-picker v-model="addItem.reserve_latest_arrive"
                          value-format="HH:mm"
                          format="HH:mm"
                          placeholder="选择时间"></el-time-picker>
        </el-form-item>

        <el-form-item label="是否支持退款"
                      prop="refund">
          <el-radio-group v-model="addItem.refund">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item> -->
      <!-- <el-form-item label="是否支持菜单"
                      prop="menu">
          <el-radio-group v-model="addItem.menu">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item> -->
      <!-- <el-form-item label="拥有套餐数量" prop="group_buy_num">
          <el-input
            placeholder="请输入数量"
            v-model.number="addItem.group_buy_num"
          >
          </el-input>
        </el-form-item> -->

      <!-- <el-form-item label="是否支持SVG"
                      prop="svg">
          <el-radio-group v-model="addItem.svg">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item> -->

      <el-form-item v-if="addItem.svg == 1"
                    label="SVG地址">
        <el-input placeholder="请输入SVG地址"
                  v-model="addItem.svg_url">
        </el-input>
      </el-form-item>

      <!-- <el-form-item label="是否预定" prop="reserve">
        <el-radio-group v-model="addItem.reserve">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否支持SVG" prop="svg">
        <el-radio-group v-model="addItem.svg">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="addItem.svg == 1" label="SVG地址">
        <el-input placeholder="请输入SVG地址" v-model="addItem.svg_url">
        </el-input>
      </el-form-item>

      <el-form-item label="是否支持选座" prop="choose_place">
        <el-radio-group v-model="addItem.choose_place">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否支持选择到达时间段" prop="choose_time">
        <el-radio-group v-model="addItem.choose_time">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="addItem.choose_time == 0"
        label="预订最晚到达时间"
        prop="reserve_latest_arrive"
      >
        <el-time-picker
          v-model="addItem.reserve_latest_arrive"
          value-format="HH:mm:ss"
          format="HH:mm:ss"
          :default-value="new Date('Mon Sep 01 2020 00:00:00 GMT+0800')"
          :picker-options="{
            selectableRange: '00:00:00 - 23:59:00',
          }"
          placeholder="选择时间"
        ></el-time-picker>
      </el-form-item>
      <el-form-item label="是否支持退款" prop="refund">
        <el-radio-group v-model="addItem.refund">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="拥有套餐数量" prop="group_buy_num">
        <el-input
          placeholder="请输入数量"
          v-model.number="addItem.group_buy_num"
        >
        </el-input>
      </el-form-item> -->
    </el-form>
    <div class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary"
                 @click="validation('insertItem')">确定</el-button>
    </div>

    <!-- 定位地图组件 -->
    <el-dialog title="位置标注"
               :visible.sync="mapForAdd.dialogVisible"
               custom-class="baidu-map"
               @opened="newLocation"
               :modal="false">
      <amap ref="MapComponent"
            @chooseLocation="chooseLocation"
            :address="addItem.name"
            :city="mapCity" />
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import citySelectex from "@/components/citySelectEX";
import amap from "@/components/Amap";
import _ from "lodash";
export default {
  name: "shopDataForm",
  //   model: {
  //     prop: "testDataForm",
  //     event: "updateFormData",
  //   },
  components: {
    citySelectex,
    amap,
  },
  props: {
    visible: { type: Boolean, default: true },
    //testDataForm: { type: Object },
  },
  data () {
    return {
      addItem: {},
      imageUrl: "",
      province_id: "",
      city_id: "",
      area_id: "",
      mapCity: "",
      locationData: {},
      header: {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=--------------------------AAAAA",
          AccessToken: getToken(),
        },
      },
      mapForAdd: {
        dialogVisible: false,
        mapHeight: 450,
        height: "80%",
        width: "85%",
        longitude: "",
        latitude: "",
        title: "选择目标位置",
      },
      rules: {
        name: [{ required: true, message: "请填写店铺名称", trigger: "blur" }],
      },
      shopTypeList: [],
      isPhone: /^([0-9]{3,4}-)?[0-9]{7,8}$/,
      isMob: /^1[3456789]\d{9}$/,
      isError:false,
      validRule: /^\d[\d\-\;]*$/
    };
  },
  watch: {
  },
  methods: {
    // 校验商家电话的输入
    validatePhone() {
      this.form.phone = this.form.phone.replace(/\s+/g,"");
      if(this.addItem.phone) {
        if(this.validRule.test(this.addItem.phone)){
          this.isError = false
          // if(this.addItem.phone.indexOf(";") != -1){
          //   var arr = []
          //   arr = this.addItem.phone.split(';')
          //   arr.forEach(item => {
          //     if(item){
          //         if(this.isMob.test(item)||this.isPhone.test(item)){
          //         this.isError = false
          //       }else{
          //         this.isError = true
          //         this.$refs['shopPhone'].focus()
          //         this.addItem.phone = ''
          //       }
          //     }
          //   })
          // }else{
          //   if(this.isMob.test(this.addItem.phone)||this.isPhone.test(this.addItem.phone)){
          //     this.isError = false
          //   }else{
          //     this.isError = true
          //     this.$refs['shopPhone'].focus()
          //     this.addItem.phone = ''
          //   }
          // }
        }else{
          this.isError = true
          this.$refs['shopPhone'].focus()
          this.addItem.phone = ''
          return false
        }
      }else{
        this.isError = false
      }
    },
    setFormData (obj) {
      this.addItem = obj;
      this.addItem.status = 2; //默认状态“审核中”
      console.info(this.addItem);
    },
    //剪切后触发方法
    cutDown: function (img) {
      console.info(img);
      const isLt2M = img.file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message({
          message: "上传失败，图片不能大于2M，请重新选择图片",
          type: "warning",
        });
      } else {
        var formData = new FormData();
        formData.append("file[]", img.file);
        formData.append("root", "shop");
        this.$ajax
          .post("/api/file/uploads", formData, this.header)
          .then((res) => {
            if (res.data.code == 0) {
              this.imageUrl = img.dataURL;
              this.addItem.logo = res.data.data.url_path[0];
            } else {
              this.imageUrl = "";
              this.addItem.logo = "";
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
      }
    },
    // 打开地图对话框
    selectLocation (e) {
      //地图搜索关键字
      //setTimeout(() => {
      //this.$refs.MapComponent.concert(this.mapKeyword);
      //}, 0);
      this.mapForAdd.dialogVisible = !this.mapForAdd.dialogVisible;
    },
    //打开地图对话框后
    newLocation () {
      this.$refs.MapComponent.newLocation(this.mapCity, this.addItem.name);
    },
    // 地图中选择位置
    chooseLocation (obj) {
      this.locationData = obj;
      this.addItem.latitude = obj.lat;
      this.addItem.longitude = obj.lng;
      this.addItem.address = obj.address; //obj.province + obj.city + obj.district + obj.addr;
      this.mapForAdd.dialogVisible = false;
    },
    setCityAreaName (areaName) {
      console.info(areaName);
      this.province_id = areaName.province;
      this.city_id = areaName.city;
      this.area_id = areaName.area;
      this.mapCity = String(areaName.city_name);
      if (!this.updateDialog) {
        this.mapKeyword = areaName.mapKeyword;
      }
    },
    handleCancel () {
      this.$emit("update:visible", false);
    },
    /* 获取店铺类型 */
    getShopTypeList () {
      let data = { page: 1 };
      this.$store.dispatch("shop/getShopType", data).then((res) => {
        this.shopTypeList = res.data;
        this.type_idData = res.data;
      });
    },
    //统一验证方法
    validation (data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          this.insertItem();
        } else {
          return false;
        }
      });
    },

    /* 新增 */
    insertItem () {
      var datas = {
        name: this.addItem.name,
        type_id: this.addItem.type_id,
        province_id: Number(this.province_id),
        city_id: Number(this.city_id),
        area_id: Number(this.area_id),
        address: this.addItem.address,
        latitude: this.addItem.latitude,
        longitude: this.addItem.longitude,
        basic_price: this.addItem.basic_price
          ? this.CalculateData(this.addItem.basic_price, "*")
          : 0,
        // score: this.addItem.score ? parseInt(this.addItem.score) : 0,
        logo: this.addItem.logo,
        business_start_time: this.ValueTime(this.addItem.business_start_time),
        business_stop_time: this.ValueTime(this.addItem.business_stop_time),
        // order_all_count: parseInt(this.addItem.order_all_count),
        // merchant_id: this.addItem.merchant_id,
        phone: this.addItem.phone,
        //ename: this.addItem.ename,
        commission_rate: Number(this.addItem.commission_rate),
        status: parseInt(this.addItem.status),
        reserve_days: Number(this.addItem.reserve_days),
        // reserve_max_duration: this.addItem.reserve_max_duration,
        // reserve_time_interval: this.addItem.reserve_time_interval,
        reserve_auto_audit: Number(this.addItem.reserve_auto_audit),
        shopping_auto_audit: Number(this.addItem.shopping_auto_audit),
        shopping_pay_online: Number(this.addItem.shopping_pay_online),
        reserve_choose_place: Number(this.addItem.reserve_choose_place),
        week_take_out_wine: Number(this.addItem.week_take_out_wine),
        reserve_latest_arrive: Number(this.addItem.choose_time) ? this.addItem.reserve_latest_arrive : '',
        vr: this.addItem.vr,
        vr_url: this.addItem.vr_url,
        svg: this.addItem.svg,
        svg_url: this.addItem.svg_url,
        choose_place: Number(this.addItem.choose_place),
        choose_time: Number(this.addItem.choose_time),
        refund: Number(this.addItem.refund),
        business_status: Number(this.addItem.business_status),
        notice: this.addItem.notice,
        reserve: Number(this.addItem.reserve),
        //group_buy_num: Number(this.addItem.group_buy_num),
      };
      // console.info("提交数据：", datas);
      this.$store.dispatch("shop/insertShop", datas).then((res) => {
        if (res.code == 0) {
          //处理成功
          this.$emit("handleShopOk", {
            apply_id: this.addItem.apply_id,
            merchant_id: res.data.merchant_id,
            shop_id: res.data.shop_id,
          });
        }
        this.handleCancel();
      });
    },
    ValueTime (v) {
      return v ? v : "";
    },
  },
  created () {
    this.getShopTypeList();
  },
};
</script>
<style lang="scss" scoped>
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.comimg {
  width: 150px;
  height: 150px;
}
.el-button--primary,
.btn-primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
.shanxdiv {
  margin-bottom: 10px;
  display: flex;
}
.dialog-footer {
  margin: 20px 0px 20px 0px;
  text-align: right;
}
.shopSet {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 15px 15px;
  padding: 15px 15px;
  .pageTitle {
    margin: 10px 0 20px 0;
    font-size: 24px;
    color: #0a0a0a;
  }
  .add-box {
    margin: 10px 0;
  }
  .pagination {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
  }
  .searchInput {
    width: 90% !important;
  }
  .el-form-item {
    width: 80% !important;
    .el-input {
      min-width: 200px !important;
      width: 200px !important;
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
      width: 50% !important;
    }
  }
}

.updateArea {
  .el-input {
    width: auto !important;
  }
  color: #fff;
}
</style>