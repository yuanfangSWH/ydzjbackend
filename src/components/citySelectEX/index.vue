<template>
  <div class="citySelect">
    <div class="selectBox">
      <el-select
        ref="city1"
        v-model="city1"
        focus
        :filterable="filterable"
        placeholder="省份"
        class="text item"
      >
        <el-option
          v-for="item in level1City"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
          <div @click="getCity(item, 1)">{{ item.name }}</div>
        </el-option>
      </el-select>
    </div>
    <div class="selectBox" v-if="isShowSelect(1)">
      <el-select
        ref="city2"
        v-model="city2"
        :filterable="filterable"
        placeholder="城市"
        class="text item"
      >
        <el-option
          v-for="item in level2City"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
          <div @click="getCity(item, 2)">{{ item.name }}</div>
        </el-option>
      </el-select>
    </div>
    <div class="selectBox" v-if="isArea && isShowSelect(2)">
      <el-select
        ref="city3"
        v-model="city3"
        :filterable="filterable"
        placeholder="区域"
        class="text item"
      >
        <el-option
          v-for="item in level3City"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
          <div @click="getCity(item, 3)">{{ item.name }}</div>
        </el-option>
      </el-select>
    </div>
    <div class="selectBox" v-if="isCancel">
      <el-button type="warning" plain @click="cancelFun">取消</el-button>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  props: {
    title: {
      type: String,
    },
    isArea: {
      type: Boolean,
      default: true,
    },
    isCancel: {
      type: Boolean,
      default: false,
    },
    // 是否在下拉菜单中加上“全部”
    isAll: {
      type: Boolean,
      default: false,
    },
    //是否支持筛选
    filterable: {
      type: Boolean,
      default: true,
    },
    //是否显示所有控件
    showAll: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      curtitle: this.title,
      direction: "btt",
      defaultData: {
        id: "00000",
        name: "",
      },
      level1City: [],
      level2City: [],
      level3City: [],
      city1: "",
      city2: "",
      city3: "",
      address1: "",
      address2: "",
      address3: "",
    };
  },
  created() {
    this.getCity(this.defaultData, 0);
  },
  methods: {
    isShowSelect(v) {
      if (this.showAll) {
        return true;
      } else {
        if (v == 1) {
          return this.city1 > 0;
        }
        if (v == 2) {
          return this.city2 > 0;
        }
      }
    },
    // 获取一级城市列表
    getCity(item, type) {
      var params = item.id;
      if (type == 1) {
        this.city2 = "";
        this.city3 = "";
      } else if (type == 2) {
        this.city3 = "";
      }
      if (type != (this.isArea ? 3 : 2)) {
        this.$store.dispatch("shop/getCitySelectList", params).then((res) => {
          if (type === 0) {
            this.level1City = res.data;
            if (this.isAll) {
              this.level1City = this.level1City.slice();
              this.level1City.unshift({
                first_char: "",
                hot: 0,
                id: 0,
                letter: "",
                name: "全部",
                open: 1,
                province_id: 0,
              });
            }
            // console.log('111',this.level1City)
            this.level2City = [];
          } else if (type === 1) {
            this.level2City = res.data;
            if (this.isAll) {
              this.level2City = this.level2City.slice();
              this.level2City.unshift({
                first_char: "",
                hot: 0,
                id: 0,
                letter: "",
                name: "全部",
                open: 1,
                province_id: 0,
              });
            }
            // console.log('222',this.level2City)
            this.level3City = [];
            this.city1 = item.id;
            this.address1 = item.name;
            var cityArea = {
              province: this.city1,
              city: this.city2,
              area: this.city3,
              mapKeyword: this.address1 + "" + this.address2,
              city_name: this.address2,
            };
            this.$emit("setCityAreaName", cityArea);
          } else if (type === 2) {
            this.level3City = res.data;
            if (this.isAll) {
              this.level3City = this.level3City.slice();
              this.level3City.unshift({
                city_id: 0,
                first_char: "",
                hot: 0,
                id: 0,
                letter: "",
                name: "全部",
                open: 1,
                province_id: 0,
              });
            }
            // console.log('333',this.level3City)
            this.city2 = item.id;
            this.address2 = item.name;
            var cityArea = {
              province: this.city1,
              city: this.city2,
              area: this.city3,
              mapKeyword: this.address1 + "" + this.address2,
              city_name: this.address2,
            };
            this.$emit("setCityAreaName", cityArea);
          }
        });
      } else {
        if (!this.isArea) {
          this.city2 = item.id;
          this.address2 = item.name;
          var cityArea = {
            province: this.city1,
            city: this.city2,
            mapKeyword: this.address1 + "" + this.address2,
            city_name: this.address2,
          };
          this.$emit("setCityAreaName", cityArea);
        } else {
          this.city3 = item.id;
          this.address3 = item.name;
          var cityArea = {
            province: this.city1,
            city: this.city2,
            area: this.city3,
            mapKeyword: this.address1 + "" + this.address2,
            city_name: this.address2,
          };
          this.$emit("setCityAreaName", cityArea);
        }
      }
    },
    //重置数据
    resetData() {
      this.city1 = "";
      this.city2 = "";
      this.city3 = "";
      this.getCity(
        {
          id: "00000",
          name: "",
        },
        0
      );
    },
    //设置数据
    passData(city1, city2, city3) {
      this.getCity({ id: city1, name: "" }, 1);
      this.getCity({ id: city2, name: "" }, 2);
      this.getCity({ id: city3, name: "" }, 3);
    },
    cancelFun() {
      this.resetData();
      var cityArea = {
        province: 0,
        city: 0,
        area: 0,
        mapKeyword: "",
        city_name: "",
      };
      this.$emit("setCityAreaName", cityArea);
    },
  },
};
</script>

<style lang="scss" scoped>
.citySelect {
  display: flex;
}
.selectBox {
  margin-right: 10px;
}
</style>
