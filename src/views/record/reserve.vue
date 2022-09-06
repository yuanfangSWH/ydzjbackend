<template>
  <div class="shopSet">
    <div class="filterBox">
      <div class="g-title1">预订数据</div>
      <reserve-item @filtrateFun='prantFun'></reserve-item>
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
        <el-table-column prop="order_no"
                         label="预订单号"
                         width="">
        </el-table-column>
        <el-table-column prop="shop_name"
                         label="店铺信息"
                         width="">
          <!-- <template slot-scope="scope">
            <div>{{scope.row.shop_name}}</div>
          </template> -->
        </el-table-column>
        <el-table-column prop=""
                         label="订座信息"
                         width="">
          <template slot-scope="scope">
            <div>{{scope.row.place_type_name}}({{scope.row.place_type_info.min_people_num}}-{{scope.row.place_type_info.max_people_num}}人)</div>
          </template>
        </el-table-column>
        <el-table-column prop="total_money"
                         label="预订金额">
          <template slot-scope="scope">
            <span>{{scope.row.total_money/100}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reserve_time"
                         label="预订时间"
                         width="180">
        </el-table-column>
        <!-- <el-table-column
          prop="reserve_way"
          label="类别"
          >
          <template slot-scope="scope">
            <span v-if="scope.row.reserve_way == 0">线上</span>
            <span v-if="scope.row.reserve_way == 1">线下</span>
            <span v-if="scope.row.reserve_way == 2">线上客服</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="address"
                         label="预订用户">
          <template slot-scope="scope">
            <div>
              <!-- <el-image :src='scope'></el-image> -->
              <div>{{scope.row.name}}</div>
              <div>{{scope.row.phone}}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="create_time"
                         label="提交预订时间"
                         sortable="custom">
        </el-table-column>
        <el-table-column prop="address"
                         label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 3 || scope.row.status == 12">预订中</span>
            <span v-if="scope.row.status == 4">已预订</span>
            <span v-if="scope.row.status == 6">退款中</span>
            <span v-if="scope.row.status == 2 || scope.row.status == 5">已取消</span>
            <span v-if="scope.row.status == 10">拒绝退款</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination :current-page='curPage'
                       :hide-on-single-page="true"
                       @current-change="pageChange"
                       background
                       layout="prev, pager, next"
                       :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
import reserveItem from "./components/reserveItem"
export default {
  name: 'reportReserve',
  components: {
    reserveItem
  },
  data () {
    return {
      sortStatus: false,
      order: 'desc',
      sortVal: 'create_time',
      curPage: 1,
      total: 0,
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
      data1: [],
      phone: '',
      shop_type: '',
      sale_staff_name: '',//营销
      staff_name: '',//操作员
      start: '',
      end: '',
      status: '',
      charts_type: 1,
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
        shop_type: this.shop_type,
        status: this.status,
        charts_type: this.charts_type,
        start: this.start,
        end: this.end,
        sort: this.sortVal,
        order: this.order,
        page: this.curPage,
        page_size: 10
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
      if(this.charts_type == 4 && !this.start && !this.end){
        this.$message({
          message: "请选择开始日期和结束日期！",
          type: "error",
        });
        return false
      }
      this.api.record.reserveList(data).then((res) => {
        this.dataItem = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    getChart (func) {
      this.data1 = []
      let data = {
        start: this.start,
        end: this.end,
        shop_type: this.shop_type,
        status: this.status,
        charts_type: this.charts_type
      }
      if (this.start == "") {
        delete data.start;
      }
      if (this.end == "") {
        delete data.end;
      }
      if(this.charts_type == 4 && !this.start && !this.end){
        return false
      }
      this.api.record.reserveCharts(data).then((res) => {
        this.chartData = res.data;
        this.chartData.axis_data = this.chartData.axis_data.reverse()
        this.chartData.count = this.chartData.count.reverse()
        if (this.chartData.amount) {
          for (var i = 0; i < this.chartData.amount.length; i++) {
            this.chartData.amount[i] = this.chartData.amount[i] / 100;
          }
        }
        this.chartData.amount = this.chartData.amount.reverse()
        // if (this.chartData.amount) {
        //   this.data1.push(
        //     {
        //       name: '预定数量',
        //       type: 'line',
        //       stack: '总量',
        //       data: this.chartData.count,
        //     },
        //     {
        //       name: '预定金额',
        //       type: 'line',
        //       stack: '总量',
        //       data: this.chartData.amount,
        //     }
        //   );
        // } else {
        //   // this.chartData.chart.name = [];
        //   this.data1 = []
        // }
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
    prantFun (shop_type, status, start, end, charts_type, n) {
      this.curPage = 1
      this.data1 = [];
      this.shop_type = shop_type;
      this.status = status
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
          data: ['预订数量', '预订金额']
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
          name: "预订数量",
          type: 'value'
        }, {
          name: "预订金额",
          type: 'value'
        }],
        series: [
          {
            name: '预订数量',
            type: 'line',
            yAxisIndex: 0,
            data: _this.chartData.count
          }, {
            name: '预订金额',
            type: 'line',
            yAxisIndex: 1,
            data: _this.chartData.amount
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