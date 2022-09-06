<template>
  <el-row>
    <el-col :span="18">
      <div class="amap-wrapper">
        <!-- <el-amap-search-box
          class="search-box"
          :search-option="searchOption"
          :on-search-result="onSearchResult"
          :default="address"
        ></el-amap-search-box> -->
        <el-amap
          ref="searchBox"
          class="amap-box"
          :vid="'amap-vue'"
          :center="mapCenter"
          :zoom="zoom"
        >
          <el-amap-marker
            v-for="(marker, index) in markers"
            :position="marker.position"
            :events="marker.events"
            :vid="index"
            :key="'p_' + index"
            :draggable="true"
            :label="getLable(marker)"
          ></el-amap-marker>
        </el-amap>
      </div>
    </el-col>
    <el-col :span="6">
      <div style="padding: 0px 10px 0px 10px; height: 500px; overflow: auto">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-input
              placeholder="请输入内容"
              v-model="searchAddress"
              @change="searchPoint"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchPoint"
              ></el-button>
            </el-input>
          </div>
          <el-alert
            v-if="points.length == 0"
            title="没有搜索结果，请尝试搜索店铺所在地址，如：xxx路xxx号"
            type="warning"
            :closable="false"
          >
          </el-alert>
          <el-collapse v-model="activeNames" @change="handleChange" accordion>
            <el-collapse-item
              v-for="(item, index) in points"
              :title="item.name"
              :name="index"
              :key="'m_' + index"
            >
              <div style="color: #c0c4cc">
                <div>{{ item.address }}</div>
                <div>{{ item.type }}</div>
                <div>{{ item.tel }}</div>
                <div style="text-align: right">
                  <el-button
                    v-if="
                      selectIndex == index &&
                      points[index]['firstMarker']['address'] !==
                        points[index]['address']
                    "
                    size="mini"
                    @click="backPoint(points[index]['firstMarker'])"
                    >恢复原地址</el-button
                  >

                  <el-button
                    type="primary"
                    size="mini"
                    @click="clickPoint(item)"
                    >选定该地址</el-button
                  >
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Amap",
  props: {},
  watch: {},
  data() {
    return {
      city: "柳州",
      searchAddress: "",
      selectIndex: 0,
      activeNames: null,
      zoom: 15,
      firstMarker: {},
      points: [],
      hasPoints: false,
      markers: [
        // [121.59996, 31.197646],
        // [121.40018, 31.197622],
        // [121.69991, 31.207649],
      ],
      searchOption: {
        city: "柳州",
      },
      mapCenter: [109.428608, 24.326292],

      events: {
        click: (obj) => {
          console.info(obj);
        },
      },
    };
  },
  methods: {
    concert(v) {},
    backPoint(val) {
      this.setLocation(val, true);
    },
    newLocation(city, address) {
      this.city = city;
      this.searchAddress = address;
      this.searchPoint();
    },
    setLocation(val, isPoints) {
      console.info("setLocation", val);
      if (val.position != undefined) {
        this.city = val.city != undefined ? val.city : "柳州";
        this.firstMarker = Object.assign({}, val);
        this.markers = [val];
        if (!isPoints) {
          this.points = [val];
          this.points[0]["firstMarker"] = this.firstMarker;
        }
        this.searchAddress = val.name;
        this.mapCenter = [val.lng, val.lat];
        this.zoom = 18;
        this.markers[0].events = {
          click: (obj) => {
            this.submitPoint(this.markers[0]);
          },

          dragend: (e) => {
            console.log("---event---: dragend", e);
            this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
            this.markers[0].lng = e.lnglat.lng;
            this.markers[0].lat = e.lnglat.lat;
            this.markers[0].firstMarker = this.firstMarker;
            this.points[this.selectIndex].firstMarker = this.firstMarker;
            this.getAddressInfo([e.lnglat.lng, e.lnglat.lat], (address) => {
              console.info(address);
              this.markers[0].address = address;
            });
            this.mapCenter = [e.lnglat.lng, e.lnglat.lat];
            this.$message.info(
              "坐标被手动更改，单击标点或者点击地址列表上的“标记该地址”进行确认。"
            );
          },
        };
      }
    },
    getAddressInfo(lnglat, callBack) {
      let self = this;
      var geocoder = new AMap.Geocoder();
      geocoder.getAddress(lnglat, function (status, result) {
        if (status === "complete" && result.regeocode) {
          var address = result.regeocode.formattedAddress;
          //self.markers[0] = address;
          callBack(address);
        } else {
          console.error("根据经纬度查询地址失败");
        }
      });
    },
    searchPoint() {
      console.info(this.city);
      let pSearch = new AMap.PlaceSearch({
        city:
          this.city != undefined
            ? this.city == ""
              ? "柳州"
              : this.city
            : "柳州",
      });
      pSearch.search(this.searchAddress, (s, r) => {
        console.info(s, r);
        if (s == "complete") {
          this.onSearchResult(r.poiList.pois);
        } else {
          this.onSearchResult([]);
        }
      });
    },
    onSearchResult(pois) {
      this.markers = [];
      this.points = [];
      let latSum = 0;
      let lngSum = 0;
      this.activeNames = null;
      if (pois.length > 0) {
        pois.forEach((poi) => {
          let obj = poi;
          let position = [poi.location.lng, poi.location.lat];
          obj.city = this.city;
          obj.position = position;
          obj.lng = poi.location.lng;
          obj.lat = poi.location.lat;
          obj.firstMarker = Object.assign({}, obj);
          obj.events = {
            click: (obj) => {
              this.submitPoint(
                //{
                // lng: this.markers[0].lng, //obj.lnglat.lng,
                // lat: this.markers[0].lat, //obj.lnglat.lat,
                // address: this.markers[0].address,

                //}
                this.markers[0]
              );
            },
            dragend: (e) => {
              console.log("---event---: dragend", e);
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
              this.markers[0].lng = e.lnglat.lng;
              this.markers[0].lat = e.lnglat.lat;
              this.markers[0].firstMarker = obj.firstMarker;
              this.mapCenter = [e.lnglat.lng, e.lnglat.lat];
              this.getAddressInfo([e.lnglat.lng, e.lnglat.lat], (address) => {
                console.info(address);
                this.markers[0].address = address;
              });
              this.$message.info(
                "坐标被手动更改，单击标点或者点击地址列表上的“标记该地址”进行确认。"
              );
            },
          };
          this.points.push(obj);
        });
        if (this.points.length > 0) {
          this.handleChange(0);
        }
      } else {
      }
    },
    clickPoint(obj) {
      console.info(obj);
      this.submitPoint(obj);
    },
    getLable(obj) {
      return {
        offset: [30, 0], //设置文本标注偏移量
        content:
          '<div style="padding:5px;"><h4 style="margin-top:0px">' +
          obj.name +
          '</h4><div style="padding:3px;">' +
          obj.address +
          '</div><div style="padding:3px;">' +
          (obj.type ? obj.type : "") +
          '</div><div style="padding:3px;">' +
          (obj.tel ? obj.type : "") +
          '</div><div style="margin-top:10px;text-align:right;color:#409EFF">可以拖动标点到达指定位置</div></div></div>', //设置文本标注内容
        direction: "center", //设置文本标注方位
      };
    },
    submitPoint(obj) {
      console.info(obj);
      this.$emit("chooseLocation", obj);
    },
    handleChange(i) {
      console.info(i);
      if (Number(i) >= 0 && !isNaN(i)) {
        this.selectIndex = Number(i);
        this.setLocation(this.points[Number(i)], true);
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
