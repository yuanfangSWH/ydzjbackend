<template>
  <div class="shopSet">
    <div>
      <h3>店铺概览</h3>
      <el-row>
        <el-col :xl="3" :lg="4" :md="8" :sm="12" :xs="24">
          <div class="homeImg" @click="toList(6)">
            <el-image
              style="width: 252px; height: 141px"
              :src="require('@/assets/home/7.png')"
            ></el-image>
            <div class="title">今日预定</div>
            <div class="item">{{ overviewCount.reserve_num }}</div>
          </div>
        </el-col>
        <el-col :xl="3" :lg="4" :md="8" :sm="12" :xs="24">
          <div class="homeImg" @click="toList(0)">
            <el-image
              style="width: 252px; height: 141px"
              :src="require('@/assets/home/1.png')"
            ></el-image>
            <div class="title">今日注册</div>
            <div class="item">{{ overviewCount.register_num }}</div>
          </div>
        </el-col>
        <el-col :xl="3" :lg="4" :md="8" :sm="12" :xs="24">
          <div class="homeImg" @click="toList(1)">
            <el-image
              style="width: 252px; height: 141px"
              :src="require('@/assets/home/2.png')"
            ></el-image>
            <div class="title">今日充值</div>
            <div class="item">{{ overviewCount.recharge_num }}</div>
          </div>
        </el-col>
        <el-col :xl="3" :lg="4" :md="8" :sm="12" :xs="24">
          <div class="homeImg" @click="toList(2)">
            <el-image
              style="width: 252px; height: 141px"
              :src="require('@/assets/home/3.png')"
            ></el-image>
            <div class="title">今日提现</div>
            <div class="item">
              {{ CalculateData(overviewCount.withdraw_num, "/") }}
            </div>
          </div>
        </el-col>
        <el-col :xl="3" :lg="4" :md="8" :sm="12" :xs="24">
          <div class="homeImg" @click="toList(3)">
            <el-image
              style="width: 252px; height: 141px"
              :src="require('@/assets/home/4.png')"
            ></el-image>
            <div class="title">今日组局</div>
            <div class="item">{{ overviewCount.group_party_num }}</div>
          </div>
        </el-col>
        <el-col :xl="3" :lg="4" :md="8" :sm="12" :xs="24">
          <div class="homeImg" @click="toList(4)">
            <el-image
              style="width: 252px; height: 141px"
              :src="require('@/assets/home/5.png')"
            ></el-image>
            <div class="title">今日拼桌</div>
            <div class="item">{{ overviewCount.crowd_funding_num }}</div>
          </div>
        </el-col>
        <el-col :xl="3" :lg="4" :md="8" :sm="12" :xs="24">
          <div class="homeImg" @click="toList(5)">
            <el-image
              style="width: 252px; height: 141px"
              :src="require('@/assets/home/6.png')"
            ></el-image>
            <div class="title">总注册量</div>
            <div class="item">{{ overviewCount.total_register_num }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <div style="margin-top: 50px">
        <el-form>
          <el-form-item label="注册用户数：">
            <el-radio-group
              v-model="chartView.view1"
              @change="handleChangeView(1)"
              size="mini"
            >
              <el-radio-button size="mini" label="近30天"></el-radio-button>
              <el-radio-button size="mini" label="近7天"></el-radio-button>
              <el-radio-button size="mini" label="24小时"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div id="chart1" style="width: 100%; height: 400px"></div>
      </div>
      <div style="margin-top: 50px">
        <el-form>
          <el-form-item label="新用户注册渠道：">
            <el-radio-group
              v-model="chartView.view3"
              @change="handleChangeView(3)"
              size="mini"
            >
              <el-radio-button size="mini" label="近30天"></el-radio-button>
              <el-radio-button size="mini" label="近7天"></el-radio-button>
              <el-radio-button size="mini" label="24小时"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div id="chart3" style="width: 100%; height: 400px"></div>
      </div>
      <div style="margin-top: 50px">
        <el-form>
          <el-form-item label="充值统计数：">
            <el-radio-group
              v-model="chartView.view2"
              @change="handleChangeView(2)"
              size="mini"
            >
              <el-radio-button size="mini" label="近30天"></el-radio-button>
              <el-radio-button size="mini" label="近7天"></el-radio-button>
              <el-radio-button size="mini" label="24小时"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div id="chart2" style="width: 100%; height: 400px"></div>
      </div>
    </div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
//require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
  name: "overview",
  components: {},
  data() {
    return {
      msg: "店铺信息编辑",
      shopInfoData: {},
      overviewCount: {
        register_num: 0, //今日注册
        recharge_num: 0, //今日充值
        withdraw_num: 0, //今日提现
        group_party_num: 0, //今日组局
        crowd_funding_num: 0, //今日拼桌
        total_register_num: 0, //总注册数
      },
      chart1_time_type: 3, //默认周视图
      chart2_time_type: 3, //默认周视图
      chart3_time_type: 3, //默认周视图
      chartView: {
        view1: "近30天",
        view2: "近30天",
        view3: "近30天",
      },
      registerChart: {
        name: "",
        count: [],
        axis_data: [],
      },
      rechargeChart: {
        name: "",
        count: [],
        amount: [],
        axis_data: [],
      },
      registerChannelChart: {
        name: "",
        count: [],
        amount: [],
        axis_data: [],
      },
      chart1: null,
      chart2: null,
      chart3: null,
      type_time_option: {
        近30天: 3,
        近7天: 2,
        "24小时": 1,
      },
    };
  },
  created() {},
  methods: {
    handleChangeEditor(content) {
      console.info(content);
    },
    getRegisterChart() {
      this.chart1.showLoading();
      this.api.overview
        .registerChart({ time_type: this.chart1_time_type })
        .then(({ data }) => {
          let res = data.data;
          this.registerChart = res;
          if (this.registerChart) {
            this.showChart1();
          } else {
            this.$message.error(data.msg);
          }
        });
    },
    getRechargeChart() {
      this.chart2.showLoading();
      this.api.overview
        .rechargeChart({ time_type: this.chart2_time_type })
        .then(({ data }) => {
          let res = data.data;
          this.rechargeChart = res;
          for (let i = 0; i < this.rechargeChart.amount.length; i++) {
            this.rechargeChart.amount[i] = this.CalculateData(
              this.rechargeChart.amount[i],
              "/"
            );
          }
          if (this.rechargeChart) {
            this.showChart2();
          } else {
            this.$message.error(data.msg);
          }
        });
    },
    getRegisterChannelChart() {
      this.chart3.showLoading();
      this.api.overview
        .registerChannelChart({ time_type: this.chart3_time_type })
        .then(({ data }) => {
          let res = data.data;
          this.registerChannelChart = res;
          if (this.registerChannelChart) {
            this.showChart3();
          } else {
            this.$message.error(data.msg);
          }
        });
    },
    handleChangeView(v) {
      if (v == 1) {
        this.chart1_time_type = this.type_time_option[
          this.chartView["view" + v]
        ];
        this.getRegisterChart();
      }
      if (v == 2) {
        this.chart2_time_type = this.type_time_option[
          this.chartView["view" + v]
        ];
        this.getRechargeChart();
      }
      if (v == 3) {
        this.chart3_time_type = this.type_time_option[
          this.chartView["view" + v]
        ];
        this.getRegisterChannelChart();
      }
    },
    getOverviewCount() {
      this.api.overview.overviewCount().then(({ data }) => {
        let res = data.data;
        this.overviewCount = res;
        this.overviewCount.recharge_num = this.CalculateData(
          this.overviewCount.recharge_num,
          "/"
        );
      });
    },
    showChart1(dataX, dataY) {
      this.chart1.hideLoading();
      this.chart1.setOption({
        title: {
          text: "", //this.registerChart.name,
        },
        tooltip: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          data: this.registerChart.axis_data,
        },
        yAxis: {},
        series: [
          {
            smooth: true,
            name: "注册数",
            type: "line",
            data: this.registerChart.count,
            label: {
              show: true,
              position: "top",
            },
            itemStyle: { color: "#409EFF" },
          },
        ],
      });
    },
    showChart2() {
      this.chart2.hideLoading();
      this.chart2.setOption({
        title: {
          text: "", //this.rechargeChart.name,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["充值笔数", "充值金额"],
          show: true,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.rechargeChart.axis_data,
        },
        yAxis: [
          {
            name: "充值金额",
            type: "value",
          },
          {
            name: "充值笔数",
            type: "value",
            splitLine: { show: false },
          },
        ],
        series: [
          {
            smooth: true,
            name: "充值金额",
            type: "line",
            yAxisIndex: 0,
            data: this.rechargeChart.amount,
            label: {
              show: true,
              position: "top",
            },
            itemStyle: {
              color: "#E6A23C",
            },
          },
          {
            smooth: true,
            name: "充值笔数",
            type: "line",
            yAxisIndex: 1,
            data: this.rechargeChart.count,
            label: {
              show: true,
              position: "top",
            },
            itemStyle: {
              color: "#409EFF",
            },
          },
        ],
      });
    },
    showChart3() {
      this.chart3.hideLoading();
      this.chart3.setOption({
        legend: {},
        tooltip: {
          trigger: "axis",
          showContent: false,
        },
        dataset: {
          source: this.registerChannelChart.Source,
        },
        xAxis: { type: "category" },
        yAxis: { gridIndex: 0 },
        grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
        series: this.getRegisterChannelChart_line(),
      });
    },
    getRegisterChannelChart_line() {
      let rev = [];
      for (let i in this.registerChannelChart.Source) {
        if (i > 0) {
          rev.push({
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
          });
        }
      }
      // console.info(rev);
      return rev;
    },
    getNumber(s, e) {
      return parseInt(Math.random() * (e - s + 1) + s);
    },
    toList(n) {
      switch (n) {
        case 0: //今日注册
          this.$router.push({ path: "/UserInformation?formHome=0" });
          break;
        case 1: //今日充值
          this.$router.push({ path: "/topup?formHome=1" });
          break;
        case 2: //今日提现
          this.$router.push({ path: "/withdrawal?formHome=2" });
          break;
        case 3: //今日组局
          this.$router.push({ path: "/GroupEetail?formHome=3" });
          break;
        case 4: //今日拼桌
          this.$router.push({ path: "/RaiseCrow?formHome=4" });
          break;
        case 5: //总注册量
          this.$router.push({ path: "/UserInformation?formHome=5" });
          break;
        case 6: //今日预定
          this.$router.push({ path: "/bookingList?formHome=6" });
          break;
        default:
        // break;
      }
    },
  },
  mounted() {
    this.chart1 = echarts.init(document.getElementById("chart1"));
    this.chart2 = echarts.init(document.getElementById("chart2"));
    this.chart3 = echarts.init(document.getElementById("chart3"));
    this.getOverviewCount();
    this.getRegisterChart();
    this.getRechargeChart();
    this.getRegisterChannelChart();
  },
};
</script>

<style lang="scss" scoped>
.homeImg {
  color: #fff;
  width: 252px;
  height: 141px;
  position: relative;
  padding-left: 10px;
  margin-left: -10px;
  margin-right: 20px;
  cursor: pointer;
  .title {
    font-size: 18px;
    top: 40px;
    left: 0px;
    width: 100%;
    text-align: center;
    position: absolute;
  }
  .item {
    font-size: 22px;
    top: 70px;
    left: 0px;
    width: 100%;
    text-align: center;
    position: absolute;
  }
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
