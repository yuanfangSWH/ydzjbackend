<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <el-input
        style="width: 350px; margin-right: 10px"
        placeholder="用户ID/手机号"
        v-model="searchOption.user"
        clearable
      ></el-input>
      <el-input
        style="width: 350px; margin-right: 10px"
        placeholder="设备号"
        v-model="searchOption.registration_id"
        clearable
      ></el-input>
      <el-input
        style="width: 350px; margin-right: 10px"
        placeholder="IP"
        v-model="searchOption.ip"
        clearable
      ></el-input>
      <el-date-picker
        class="datePicker"
        v-model="searchTime"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        value-format="yyyy-MM-dd HH:mm"
        format="yyyy-MM-dd HH:mm"
        @change="dateChange"
      ></el-date-picker>
      <el-button type="primary" @click="screening" style="margin-left: 10px"
        >筛选</el-button
      >
      <el-button type="info" @click="resetData">清空条件</el-button>
    </div>
    <el-table
      ref="multipNum"
      stripe
      :data="tableListData"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
      @sort-change="handleDataSort"
    >
      <el-table-column
        prop="create_time"
        label="登录时间"
        width="180"
        sortable="true"
      />
      <el-table-column label="用户" width="360">
        <template slot-scope="scope">
          <div
            class="duio muzhicss"
            @click="userInformation(scope.row)"
            v-if="scope.row.user"
          >
            <el-image
              class="ustrimg"
              :src="scope.row.user.avatar"
              fit="cover"
            ></el-image>
            <div>
              <div class="bjgt">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.user.nickname"
                  placement="bottom"
                  :disabled="getShow(scope.row.user.nickname)"
                >
                  <div :title="getAgent(scope.row.user.nickname)">
                    {{ getAgent(scope.row.user.nickname) }}（电话:{{
                      scope.row.user.phone
                    }}）
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="app_version" label="APP" width="120">
        <template slot-scope="scope">
          <div>V {{ scope.row.app_version }}</div>
          <div>{{ scope.row.channel }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="IP">
        <template slot-scope="scope">
          <div>{{ scope.row.ipaddress }}</div>
          <div>{{ scope.row.address }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地区" />
      <el-table-column label="经纬度">
        <template slot-scope="scope">
          <el-popover
            width="800"
            trigger="click"
            @show="mapIndex = scope.$index"
          >
            <amap
              v-if="scope.$index == mapIndex"
              :location="{
                lng: scope.row.longitude,
                lat: scope.row.latitude,
                address: scope.row.address,
                name: scope.row.user.nickname,
                position: [scope.row.longitude, scope.row.latitude],
              }"
            />
            <el-link type="pramary" slot="reference"
              >{{ scope.row.longitude }},{{ scope.row.latitude }}</el-link
            >
          </el-popover>
          <!-- <el-link
            type="primary"
            @click="showTheMap(scope.row.longitude, scope.row.latitude)"
            >{{ scope.row.longitude }},{{ scope.row.latitude }}</el-link
          > -->
        </template>
      </el-table-column>
      <el-table-column prop="device_brand" label="品牌/型号">
        <template slot-scope="scope">
          <div>{{ scope.row.device_brand }}</div>
          <div>{{ scope.row.device_type }}</div>
        </template>
      </el-table-column>
      <el-table-column label="系统">
        <template slot-scope="scope">
          <div>{{ scope.row.platform }}</div>
          <div>{{ scope.row.os_version }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="registration_id" label="设备号" />
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="searchOption.page"
        :hide-on-single-page="true"
        @current-change="pageChange"
        background
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="searchOption.page_size"
        @size-change="handlePageSizeChange"
        layout="sizes,prev, pager, next,jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- <baiduMaps
      :map-height="mapForAdd.mapHeight"
      :height="mapForAdd.height"
      :dialog-visible="mapForAdd.dialogVisible"
      :width="mapForAdd.width"
      :title="mapForAdd.title"
      @closeMap="closeMaps"
      :location="{ lng: mapForAdd.longitude, lat: mapForAdd.latitude }"
    /> -->
    <el-dialog title="详情信息" :visible.sync="detailsDialog" width="50%">
      <el-form :v-model="detailsData" label-width="150px" class="demo-ruleForm">
        <el-form-item label="日志ID：">
          {{ detailsData.log_id }}
        </el-form-item>
        <el-form-item label="管理员：">
          {{ detailsData.AdminName }} (ID：{{ detailsData.admin_id }})
        </el-form-item>
        <el-form-item label="IP：">
          {{ detailsData.log_ip }}
        </el-form-item>
        <el-form-item label="操作时间：">
          {{ detailsData.log_time }}
        </el-form-item>
        <el-form-item label="操作内容：">
          {{ detailsData.log_content }}
        </el-form-item>
        <el-form-item label="操作接口：">
          {{ detailsData.log_url }}
        </el-form-item>
        <el-form-item label="POST参数内容：">
          <div style="width: 400px; height: 100px; overflow: auto">
            {{ detailsData.log_req_raw }}
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息" :visible.sync="usertx" width="70%">
      <userBounced ref="userBounced" fromPath="UserInformation"></userBounced>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
import amap from "@/components/Amap/showMap.vue";
export default {
  name: "userLogin",
  components: {
    amap,
  },
  data() {
    return {
      //用户详情弹框
      usertx: false,
      mapIndex: null,
      locationData: [],
      searchOption: {
        user: "",
        ip: "",
        city_id: "",
        registration_id: "",
        order: "",
        sort: "",
        page: 1,
        login_time_start: "",
        login_time_end: "",
        page_size: 10,
      },
      searchTime: ["", ""],
      detailsDialog: false, //打开详情框
      total: 1,
      tableListData: [], //页面表单的内容
      detailsData: {},
      loading: false,
      mapForAdd: {
        dialogVisible: false,
        mapHeight: 450,
        height: "80%",
        width: "85%",
        longitude: "",
        latitude: "",
        title: "目标位置",
      },
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  created() {
    this.iniPageParam();
    this.getTableList();
  },
  watch: {
    $route(to, from) {
      this.iniPageParam();
      this.getTableList();
    },
  },
  methods: {
    handlePageSizeChange() {
      this.searchOption.page = 1;
      this.pageChange();
    },
    //用户详情弹框
    userInformation(row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user_id);
      }, 0);
    },
    // 内容过长，鼠标移入显示全部
    getAgent(v) {
      return v.length > 10 ? v.substring(0, 10) + " ..." : v;
    },
    getShow(v) {
      return v.length > 10 ? false : true;
    },
    iniPageParam() {
      this.searchOption = {
        user: this.$route.query.user,
        city_id: this.$route.query.city_id,
        ip: this.$route.query.ip,
        registration_id: this.$route.query.registration_id,
        order: this.$route.query.order,
        sort: this.$route.query.sort,
        page: this.$route.query.page ? Number(this.$route.query.page) : 1,
        login_time_start: this.$route.query.login_time_start,
        login_time_end: this.$route.query.login_time_end,
        page_size: this.$route.query.page_size
          ? Number(this.$route.query.page_size)
          : 10,
      };
      this.searchTime[0] = this.$route.query.login_time_start
        ? this.$route.query.login_time_start
        : "";
      this.searchTime[1] = this.$route.query.login_time_end
        ? this.$route.query.login_time_end
        : "";
    },
    /* 表格的排序发生变化 */
    handleDataSort(obj) {
      this.searchOption.sort = obj.order ? obj.prop : "";
      this.searchOption.order = obj.order ? this.sortableList[obj.order] : "";
      this.searchOption.page = 1;
      this.pageChange();
      //this.getTableList();
    },
    //日期选择
    dateChange(val) {
      if (val) {
        this.searchOption.login_time_start = val[0];
        this.searchOption.login_time_end = val[1];
      }
    },
    //清空条件
    resetData() {
      this.searchOption = {
        user: "",
        ip: "",
        city_id: "",
        registration_id: "",
        order: "",
        sort: "",
        page: 1,
        login_time_start: "",
        login_time_end: "",
      };
      this.searchTime = ["", ""];
      this.getTableList();
    },
    //筛选
    screening() {
      this.searchOption.page = 1;
      this.pageChange();
    },
    /* 获取列表内容 */
    getTableList() {
      var data = this.searchOption;
      loading: true;
      this.api.system.UserLogin(data).then((res) => {
        loading: false;
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 打开详情框 */
    detailsDelDialog(data) {
      this.detailsData = data;
      this.detailsDialog = true;
    },
    /* 改变页数 */
    pageChange(p) {
      if (!this.searchTime) {
        this.searchTime = ["", ""];
        this.searchOption.login_time_start = this.searchTime[0];
        this.searchOption.login_time_end = this.searchTime[1];
      }
      if (p) this.searchOption.page = p;
      this.$router.push({
        path: "/userLogin",
        query: this.searchOption,
      });

      // this.getTableList();
    },
    //打开地图
    showTheMap(lng, lat, icon) {
      this.mapForAdd.longitude = lng;
      this.mapForAdd.latitude = lat;
      this.locationData = {
        lng: lng,
        lat: lat,
        address: "",
        position: [lng, lat],
      };
      this.mapForAdd.dialogVisible = !this.mapForAdd.dialogVisible;
    },
    //关闭地图
    closeMaps(v) {
      this.mapForAdd.dialogVisible = v;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button--primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
.shanxdiv {
  margin-bottom: 10px;
  display: flex;
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
    float: right;
    width: 350px;
  }
  .el-form-item {
    width: 50% !important;
    .el-input {
      min-width: 400px !important;
      width: 50% !important;
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
</style>
