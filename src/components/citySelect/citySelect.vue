<template>
  <div class="citySelect">
    <div class="selectBox">
      <el-select
        ref="city1"
        v-model="city1"
        focus
        filterable
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
    <div class="selectBox">
      <el-select
        ref="city2"
        v-model="city2"
        filterable
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
    <div class="selectBox">
      <el-select
        ref="city3"
        v-model="city3"
        filterable
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
  </div>
</template>

<script>
import { log } from "util";
export default {
  props: {
    title: {
      type: String,
    },
    cityData: {
      type: Object,
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
    // 获取一级城市列表
    getCity(item, type) {
      var params = item.id;
      if (type < 3) {
        this.$store.dispatch("shop/getCitySelectList", params).then((res) => {
          if (type === 0) {
            this.level1City = res.data;
            this.level2City = [];
          } else if (type === 1) {
            this.level2City = res.data;
            this.level3City = [];
            this.city1 = item.id;
            this.address1 = item.name;
          } else if (type === 2) {
            this.level3City = res.data;
            this.city2 = item.id;
            this.address2 = item.name;
          }
          //this.returnCityData();
        });
      } else {
        this.address3 = item.name;
        this.city3 = item.id;
        this.returnCityData();
      }
    },
    //返回数据
    returnCityData() {
      this.$emit("setCityAreaName", {
        province: { name: this.address1, id: this.city1 },
        city: { name: this.address2, id: this.city2 },
        area: { name: this.address3, id: this.city3 },
      });
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
