<template>
  <div>
    <div class="palceBox">
      <el-button
        style="float: left; margin: 0px 10px 10px 0px; cursor: pointer"
        @click="handleSelectedArea('newArea')"
        >新建区域</el-button
      >
        <span class="span01 span02" :class="0 == cAreaId ? 'activeBtn' : ''"
        @click="handleSelectedArea(0)">全部区域</span>
      <draggable
        style="float: left;"
        class="list-group"
        v-model="placeAreaData"
        :options="{ animation: 20 }"
        @change="draggableChangeClass"
      >
        <span class="span01 span03" :class="item.area_id == cAreaId ? 'activeBtn' : ''"
          v-for="(item, index) in placeAreaData"
          :key="index"
          @click="handleSelectedArea(item)">{{ item.area_name }}
          <i
            style="color: #e6a23c"
            class="edit-icon el-icon-edit-outline"
            v-if="cAreaId == item.area_id"
            @click="editArea(item)"
          ></i></span>
      </draggable>
    </div>
    <!-- <el-radio-group
      v-model="selectedArea"
      style="margin-top: 10px; margin-bottom: 10px"
      @change="handleSelectedArea"
    >
      <el-radio-button label="0">全部区域</el-radio-button>
      <draggable
        class="list-group"
        v-model="placeAreaData"
        :options="{ animation: 20 }"
        @change="draggableChangeClass"
      >
        <el-radio-button
          v-for="(item, index) in placeAreaData"
          :label="getAareaLabel(item)"
          :key="index"
          >{{ item.area_name }}
          <i
            class="edit-icon el-icon-edit-outline"
            v-if="cAreaId == item.area_id"
            @click="editArea(item)"
          ></i
        ></el-radio-button>
      </draggable>
      <el-radio-button label="newArea"
        ><i class="el-icon-plus" /> 新建区域</el-radio-button
      >
    </el-radio-group> -->

    <el-dialog
      :title="areaForm.area_id == 0 ? '新建区域' : '编辑区域'"
      :visible.sync="areaDialog"
      @closed="selectedArea = '0'"
    >
      <el-form
        :model="areaForm"
        ref="areaForm"
        label-width="80px"
        class="addArea"
        :rules="areaRules"
      >
        <el-form-item label="区域名称" prop="area_name">
          <el-input v-model="areaForm.area_name" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="areaForm.sort" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="areaForm.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <div style="text-align: right">
          <el-button type="" @click="areaDialog = false">取消</el-button>
          <el-button
            v-if="areaForm.area_id > 0"
            type="danger"
            @click="deleteArea"
            >删除</el-button
          >
          <el-button type="primary" @click="submitArea" :loading="isLoading"
            >保存</el-button
          >
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  name: "PlaceArea",
  props: {
    merchants: {
      type: Object,
    },
  },
  data() {
    return {
      isLoading: false,
      placeAreaData: [],
      selectedArea: "0",
      cAreaId: 0,
      areaForm: {
        area_id: 0,
        area_name: "",
        sort: 0,
        status: 1,
      },
      areaDialog: false,
      areaRules: {
        area_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        sort: [
          { required: true, message: "必须排序", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
      },
    };
  },
  methods: {
    draggableChangeClass(obj) {
      let classSort = [];
      for (let i in this.placeAreaData) {
        this.placeAreaData[i].sort = this.placeAreaData.length - 1 - i;
        classSort.push({
          area_id: this.placeAreaData[i].area_id,
          sort: Number(this.placeAreaData[i].sort),
        });
      }
      let datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        area: classSort,
      };
      this.api.shop.placetareaSetSort(datas).then(({ data }) => {
        let res = data.data;
        this.getPlaceAreaData();
      });
    },
    submitArea() {
      this.$refs["areaForm"].validate((valid) => {
        if (valid) {
          this.areaForm.area_id = Number(this.areaForm.area_id);
          let datas = _.cloneDeep(this.areaForm);
          datas.shop_id = Number(this.merchants.shop_id);
          datas.merchant_id = Number(this.merchants.merchant_id);
          this.isLoading = true;
          if (datas.area_id == 0) {
            delete datas.type_id;
            this.$store.dispatch("shop/createPlaceArea", datas).then((res) => {
              this.$message({
                message: res.msg,
                type: res.code == 0 ? "success" : "error",
              });
              this.reloadData();
            });
          } else {
            this.$store.dispatch("shop/updatePlaceArea", datas).then((res) => {
              this.$message({
                message: res.msg,
                type: res.code == 0 ? "success" : "error",
              });
              this.reloadData();
            });
          }
        }
      });
    },
    reloadData() {
      this.isLoading = false;
      this.areaDialog = false;
      this.getPlaceAreaData();
    },
    editArea(row) {
      this.isLoading = false;
      this.areaForm = row;
      this.areaDialog = true;
    },
    getPlaceAreaData() {
      let data = this.merchants;
      this.$store.dispatch("shop/getPlaceArea", data).then((res) => {
        this.placeAreaData = res.data;
        this.$emit("getPlaceAreaData", this.placeAreaData);
      });
    },
    handleSelectedArea(v) {
      if (v == "newArea") {
        this.isLoading = false;
        this.areaForm = {
          area_id: 0,
          area_name: "",
          sort: 0,
          status: 1,
        };
        this.areaDialog = true;
      } else {
        let obj = v == "0" ? { area_name: "", area_id: 0 } : v;
        this.cAreaId = Number(obj.area_id);
        this.$emit("selectedArea", obj);
      }
    },
    getAareaLabel(item) {
      let v = {
        name: item.area_name,
        id: item.area_id,
      };
      return JSON.stringify(v);
    },

    //删除分类
    deleteArea() {
      if (Number(this.areaForm.area_id) > 0) {
        this.$confirm("确定要删除吗？", "提示", {
          type: "warning",
        }).then(() => {
          let datas = {
            id: [Number(this.areaForm.area_id)],
            merchant_id: Number(this.merchants.merchant_id),
            shop_id: Number(this.merchants.shop_id),
          };
          this.$store.dispatch("shop/deletePlaceArea", datas).then((res) => {
            this.$message({
              message: res.msg,
              type: res.code == 0 ? "success" : "error",
            });
            this.reloadData();
          });
        });
      }
    },
  },
  created() {
    this.getPlaceAreaData();
  },
};
</script>
<style scoped>
.el-button--primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
.span01{ float: left; margin: 0px 0 10px 0px; cursor: pointer;  border: 1px solid #DCDFE6; font-size: 14px; height: 40px; line-height: 40px; padding: 0 20px;}
.span02{ border-top-left-radius: 4px; border-bottom-left-radius: 4px;}
.span03{ border-left: none !important;}
.activeBtn{ background-color: #fdf6ec; color: #2e2e2e;}
.list-group span:last-child{border-top-right-radius: 4px; border-bottom-right-radius: 4px;}
</style>