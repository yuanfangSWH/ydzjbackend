<!--
 * @Author: your name
 * @Date: 2021-01-13 10:27:10
 * @LastEditTime: 2021-01-13 15:04:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\components\Amap\showMap.vue
-->
<template>
  <div class="amap-wrapper">
    <el-amap
      class="amap-box"
      :vid="'amap-vue'"
      :center="mapCenter"
      :zoom="zoom"
    >
      <el-amap-marker
        v-for="(marker, index) in markers"
        :position="marker.position"
        :vid="index"
        :key="'p_' + index"
        :label="getLable(marker)"
      ></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
//109.4326777, 24.326970499999998;
export default {
  name: "ShowMap",
  props: {
    location: {
      type: Object,
    },
  },
  watch: {
    location: {
      immediate: true, // 这句重要
      handler(val) {
        if (val) {
          this.markers = [val];
          this.points = [val];
          this.mapCenter = [val.lng, val.lat];
          this.zoom = 18;
        }
      },
    },
  },
  data() {
    return {
      points: [],
      markers: [],
      mapCenter: [],
    };
  },
  methods: {
    getLable(obj) {
      if (obj.address && obj.name) {
        return {
          offset: [30, 0], //设置文本标注偏移量
          content:
            '<div style="padding:5px;"><h4 style="margin-top:0px">' +
            obj.name +
            '</h4><div style="padding:3px;">' +
            obj.address +
            "</div></div>", //设置文本标注内容
          direction: "center", //设置文本标注方位
        };
      } else {
        return {};
      }
    },
  },
};
</script>

<style scoped>
.amap-wrapper {
  width: 100%;
  height: 500px;
  position: relative;
}
.search-box {
  margin: 10px;
  right: 0px;
  position: absolute;
}
</style>
