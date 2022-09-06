<template>
  <div class="citySelect">
    <div class="selectBox">
      <el-select ref="city1"
                 v-model="province_id"
                 focus
                 filterable
                 placeholder="省份"
                 class="text item"
                 @change="getCity">
        <el-option v-for="item in province"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
          {{ item.name }}
        </el-option>
      </el-select>
    </div>
    <div class="selectBox">
      <el-select ref="city2"
                 v-model="city_id"
                 filterable
                 placeholder="城市"
                 class="text item"
                 @change="getArea">
        <el-option v-for="item in city"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
          {{ item.name }}
        </el-option>
      </el-select>
    </div>
    <div class="selectBox"
         v-if="showArea">
      <el-select ref="city3"
                 v-model="area_id"
                 filterable
                 placeholder="区域"
                 class="text item"
                 @change="setData">
        <el-option v-for="item in area"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
          {{ item.name }}
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  name: "shopSearchCity",
  props: {
    title: {
      type: String,
    },
    returnValue: {
      //所有改变都返回值
      type: Boolean,
      default: false,
    },
    showArea: {
      type: Boolean,
      default: false,
    },
    // 是否在下拉菜单中加上“全部”
    isAll: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      province_id: null,
      city_id: null,
      area_id: null,
      province: [],
      city: [],
      area: [],
      defaultData: {
        id: "00000",
        name: "",
      },
    };
  },
  created () {
    //this.getCity(this.defaultData, 0);
  },
  watch: {
    province_id (n, o) {
      if (n == 0) {
        this.city_id = 0;
        this.area_id = 0;
        this.getArea(this.city_id, this.area_id);
      }
    },
  },
  methods: {
    //清空结果
    resetData () {
      this.province_id = null;
      this.city_id = null;
      this.area_id = null;
      this.province = [];
      this.city = [];
      this.area = [];
      this.getProvince();
    },
    // 获取一级城市列表
    getProvince (p, c, a) {
      console.log(p, c, a);
      //填充省份数据
      this.$store.dispatch("shop/getCitySelectList", "00000").then((res) => {
        this.province = res.data;
        if (this.isAll) {
          this.province.unshift({
            first_char: "B",
            hot: 0,
            id: 0,
            letter: "QB",
            name: "全部",
            open: 1,
            province_id: 0,
          });
        }
        if (!this.showArea) {
          //不需要设置区域的场景
          // if ((p && c) || p == 0) {
          this.province_id = p;
          this.city_id = c;
          this.getCity(p, c);
          // }
        } else {
          //需要设置区域的场景
          if (
            (p && c && a) ||
            p === 0 ||
            (p && c === 0) ||
            (p && c && a === 0)
          ) {
            this.province_id = p;
            this.city_id = c;
            this.area_id = a;
            this.getCity(p, c);
            this.getArea(c, a);
          }
        }
      });
    },
    getCity (p, c) {
      //console.info("getCity", p, c);
      if (p === 0 && this.isAll) {
        this.city = [
          {
            first_char: "B",
            hot: 0,
            id: 0,
            letter: "QB",
            name: "全部",
            open: 1,
            province_id: 0,
          },
        ];
        this.area_id = 0;
        if (this.returnValue) {
          this.setData();
        }
      } else {
        this.area_id = null;
        this.$store.dispatch("shop/getCitySelectList", p).then((res) => {
          this.city = res.data;
          if (this.isAll) {
            this.city.unshift({
              first_char: "B",
              hot: 0,
              id: 0,
              letter: "QB",
              name: "全部",
              open: 1,
              province_id: 0,
            });
          }
          if (c || c == 0) {
            this.city_id = c;
          }
          if (c == undefined) {
            this.city_id = null;
          }
          if (this.returnValue) {
            this.setData();
          }
        });
      }
    },
    getArea (c, a) {
      if (c === 0 && this.isAll) {
        this.area = [
          {
            first_char: "B",
            hot: 0,
            id: 0,
            letter: "QB",
            name: "全部",
            open: 1,
            province_id: 0,
          },
        ];
        this.area_id = 0;
        if (this.returnValue) {
          this.setData();
        }
      } else {
        if (!this.showArea) {
          this.setData();
        } else {
          this.$store.dispatch("shop/getCitySelectList", c).then((res) => {
            this.area = res.data;
            if (this.isAll) {
              this.area.unshift({
                first_char: "B",
                hot: 0,
                id: 0,
                letter: "QB",
                name: "全部",
                open: 1,
                province_id: 0,
              });
            }
            if (c || c == 0) {
              this.city_id = c;
            }
            if (c == undefined) {
              this.city_id = null;
              console.info("isNull");
            }
            if (a || a == 0) {
              this.area_id = a;
            } else {
              this.area_id = null;
            }
            if (this.returnValue) {
              this.setData();
            }
          });
        }
      }
    },
    setData () {
      let result = {
        province_id: this.province_id,
        city_id: this.city_id,
        area_id: this.area_id,
      };
      this.$emit("setCityAreaName", result);
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
