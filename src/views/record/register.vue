<template>
  <div class="shopSet">
    <div class="filterBox">
      <div class="g-title1">注册数据</div>
      <register-item @filtrateFun='prantFun'></register-item>
    </div>
    <div class="navBox navBox-1">
      <div id="myChart"
           :style="{width: '100%', height: '322px'}"></div>
    </div>
    <div class="navBox-2">
      <el-table :data="dataItem"
                style="width: 100%"
                stripe
                tooltip-effect="dark"
                @sort-change="sortFilterFun">
        <el-table-column prop="user_id"
                         label="ID"
                         width="100"
                         sortable="custom">
        </el-table-column>
        <el-table-column prop=""
                         label="用户"
                         width="230">
          <template slot-scope="scope">
            <div style="display: flex; align-items: center"
                 @click="userInformation(scope.row.user_id)">
              <el-image style="width: 30px; height: 30px; border-radius: 100%"
                        fit="fill"
                        :src="scope.row.avatar"></el-image>
              <div style="flex: 1; margin-left: 5px">
                {{ scope.row.nickname }}（<span v-if="scope.row.gender == 1">男</span><span v-else>女</span>/{{ scope.row.age }}岁）
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="phone"
                         label="电话"
                         width="">
        </el-table-column>
        <el-table-column prop="income"
                         label="D币">
        </el-table-column>
        <el-table-column prop="currency"
                         label="Y币">
        </el-table-column>
        <el-table-column prop=""
                         label="实名"
                         width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.certificate">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="city"
                         label="城市"
                         width="100">
        </el-table-column>
        <el-table-column prop="reg_time"
                         label="注册时间"
                         sortable="custom">
        </el-table-column>
        <el-table-column prop="login_time"
                         label="登录时间"
                         sortable="custom">
        </el-table-column>
        <el-table-column prop="address"
                         label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">禁用</span>
            <span v-if="scope.row.status == 1">正常</span>
            <span v-if="scope.row.status == 2">禁言</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination :current-page='curPage'
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size.sync="page_size"
                       :hide-on-single-page="true"
                       @current-change="pageChange"
                       @size-change="handlePageSizeChange"
                       background
                       layout="sizes,prev, pager, next,jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息"
               :visible.sync="usertx"
               width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
import registerItem from "./components/registerItem"
export default {
  name: 'reportRegister',
  components: {
    registerItem
  },
  data () {
    return {
      usertx: false,
      sortStatus: false,
      order: 'desc',
      sortVal: 'reg_time',
      curPage: 1,
      total: 0,
      page_size: 10,
      dataItem: [],
      chartData: {
        chart: {
          axis_data: [],
          name: [],
          reserve_count: [],
          reserve_money: []
        },
        summary: {
          offline_count: 0,
          online_count: 0,
          reserve_count: 0,
          reserve_money: 0,
          staff_commission: 0,
          total_money: 0
        }
      },
      start: '',
      end: '',
      charts_type: 1,
      province_id: 0,
      city_id: 0,
      app_version: '',
      os: '',
      is_children: 1,
      channel: '',
      chartName: ''
    }
  },
  created () {
    this.getData()
    this.getChart(() => {
      this.drawLine()
    })
  },
  mounted () {

  },
  methods: {
    getData () {
      let data = {
        charts_type: Number(this.charts_type),
        start: this.start,
        end: this.end,
        province_id: this.province_id,
        city_id: this.city_id,
        app_version: this.app_version,
        os: this.os,
        is_children: this.is_children,
        channel: this.channel,
        sort: this.sortVal,
        order: this.order,
        page: this.curPage,
        page_size: this.page_size,
      };
      if (this.start == "") {
        delete data.start;
      }
      if (this.end == "") {
        delete data.end;
      }
      if (this.charts_type == 4 && !this.start && !this.end) {
        this.$message({
          message: "请选择开始日期和结束日期！",
          type: "error",
        });
        return false
      }
      this.api.record.registerList(data).then((res) => {
        this.dataItem = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    getChart (func) {
      let data = {
        charts_type: Number(this.charts_type),
        start: this.start,
        end: this.end,
        province_id: this.province_id,
        city_id: this.city_id,
        app_version: this.app_version,
        os: this.os,
        is_children: this.is_children,
        channel: this.channel
      }
      if (this.start == "") {
        delete data.start;
      }
      if (this.end == "") {
        delete data.end;
      }
      if (this.charts_type == 4 && !this.start && !this.end) {
        return false
      }
      this.api.record.registerCharts(data).then((res) => {
        this.chartData = res.data;
        this.chartData.axis_data = this.chartData.axis_data.reverse()
        this.chartData.ios_count = this.chartData.ios_count.reverse()
        this.chartData.android_count = this.chartData.android_count.reverse()
        func()
      });
    },
    // 导出excel
    excelFun () {
      let data = {
        start: this.start,
        end: this.end,
        shop_type: Number(this.shop_type),
        status: Number(this.status),
        page: this.curPage,
        sort: this.sortVal,
        order: this.order
      };
      if (this.start == "") {
        delete data.start;
      }
      if (this.end == "") {
        delete data.end;
      }
      if (this.shop_type == "") {
        delete data.shop_type;
      }
      if (this.status == "") {
        delete data.status;
      }
      if (this.sortVal == "") {
        delete data.sortVal;
      }
      this.$store.dispatch("report/reserveExport", data).then((res) => {
        let blob = new Blob([res.data]);
        let link = document.createElement("a");
        let evt = document.createEvent("HTMLEvents");
        let fileName = decodeURI(escape(res.headers['content-disposition'].split('filename="')[1].split('"')[0]));
        evt.initEvent("click", false, false);
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(link.href);
      });
    },
    prantFun (province_id, city_id, app_version, os, is_children, channel, start, end, charts_type, n) {
      this.curPage = 1
      this.province_id = province_id;
      this.city_id = city_id
      this.app_version = app_version
      this.os = os
      this.is_children = is_children
      this.channel = channel
      this.start = start;
      this.end = end;
      this.charts_type = charts_type;
      if (n != 1) {
        this.getData();
        this.getChart(() => {
          this.drawLine()
        })
      } else {
        // this.excelFun();
      }
    },
    drawLine () {
      var _this = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: _this.chartData.name
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Android注册用户', 'IOS注册用户']
        },
        color: ['#FFBE11', '#B8B8B8'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: _this.chartData.axis_data
        },
        yAxis: [{
          name: "Android注册用户",
          type: 'value'
        }, {
          name: "IOS注册用户",
          type: 'value'
        }],
        series: [
          {
            name: 'Android注册用户',
            type: 'line',
            yAxisIndex: 0,
            data: _this.chartData.android_count
          }, {
            name: 'IOS注册用户',
            type: 'line',
            yAxisIndex: 1,
            data: _this.chartData.ios_count
          }
        ]
      }, true);
    },
    //table排序
    sortMethod (val) {
      this.sortVal = val
      this.sortStatus = !this.sortStatus
      if (this.sortStatus) {
        this.order = 'asc'//正序
      } else {
        this.order = 'desc'//倒序
      }
      //接口逻辑
      this.sortDataFun()
    },
    //table排序
    sortFilterFun (column) {
      this.sortMethod(column.prop)
    },
    sortDataFun () {
      this.curPage = 1
      this.getData()
    },
    /* 改变页数 */
    pageChange (page) {
      this.curPage = page
      this.getData()
      // this.getChart(() => {
      //   this.drawLine()
      // })
    },
    handlePageSizeChange (v) {
      this.pageChange();
    },
    //用户详情弹框
    userInformation (user_id) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(user_id);
      }, 0);
    },
  }
}
</script>

<style lang='scss' scoped>
.shopSet {
  margin: 15px 15px;
  .filterBox {
    background: #ffffff;
    padding: 20px;
    border: 1px solid #dfdfdf;
    display: inline-block;
    width: 100%;
    .g-title1 {
      display: flex;
      font-size: 24px;
      color: #0a0a0a;
    }
  }
  .navBox {
    display: flex;
    background: #ffffff;
    padding: 20px;
    border: 1px solid #dfdfdf;
  }
  .navBox-1 {
    display: flex;
    margin-top: 20px;
    text-align: center;
    .tc-nav {
      flex: 1;
      align-items: center;
      justify-content: center;
      text-align: center;
      .tc-t1 {
        font-size: 18px;
        color: #0a0a0a;
        margin-bottom: 8px;
      }
      .tc-t2 {
        font-size: 30px;
        font-weight: bold;
      }
      .t-color1 {
        color: #dda100;
      }
      .t-color2 {
        color: #41b300;
      }
      .t-color3 {
        color: #3988ff;
      }
      .tc-t3 {
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
  .navBox-2 {
    margin-top: 20px;
    text-align: center;
    background: #ffffff;
    padding: 20px;
    border: 1px solid #dfdfdf;
    .pagination {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      padding: 15px 0;
    }
  }
}
</style>