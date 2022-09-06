<template>
  <div class="shopSet">
    <div class="filterBox">
      <div class="g-title1">优惠券报表</div>
      <coupon-item @filtrateFun='prantFun'></coupon-item>
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
        <el-table-column prop="coupon_id"
                         label="ID"
                         width="80"
                          sortable="custom">
        </el-table-column>
        <el-table-column prop="create_time"
                         label="时间"
                         width=""
                          sortable="custom">
        </el-table-column>
        <el-table-column prop=""
                         label="用户"
                         width="230">
          <template slot-scope="scope">
            <div style="display: flex; align-items: center"
                 @click="userInformation(scope.row.user.user_id)">
              <el-image style="width: 30px; height: 30px; border-radius: 100%"
                        fit="fill"
                        :src="scope.row.user.avatar"></el-image>
              <div style="flex: 1; margin-left: 5px">
                <div>
                  {{ scope.row.user.nickname }}（<span v-if="scope.row.user.gender == 1">男</span><span v-else>女</span>/{{ scope.row.user.age }}岁）
                </div>
                <div>
                  {{scope.row.user.phone}}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop=""
                         label="领取/使用"
                         width="">
          <template slot-scope="scope">
            <span>{{scope.row.order_no?'使用':'领取'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="coupon_name"
                         label="优惠券"
                         width="">
        </el-table-column>
        <el-table-column prop="use_end_time"
                         label="有效期至"
                         width="">
        </el-table-column>
        <el-table-column prop="order_no"
                         label="预定订单"
                         width="">
          <template slot-scope="scope">
            <span>{{scope.row.order_no?scope.row.order_no:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status"
                         label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">未使用</span>
            <span v-if="scope.row.status == 2">已使用</span>
            <span v-if="scope.row.status == 3">已失效</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination :current-page='curPage'
                       :hide-on-single-page="true"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size.sync="page_size"
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
import couponItem from "./components/couponItem"
export default {
  name: 'reportcoupon',
  components: {
    couponItem
  },
  data () {
    return {
      usertx: false,
      sortStatus: false,
      order: 'desc',
      sortVal: 'create_time',
      curPage: 1,
      total: 0,
      dataItem: [],
      chartData: {},
      start: '',
      end: '',
      status: 1,
      charts_type: 1,
      chartName: '',
      keyword: '',
      type: 1,
      page_size: 10,
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
        status: this.status,
        charts_type: this.charts_type,
        start: this.start,
        end: this.end,
        keyword: this.keyword,
        type: this.type,
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
      this.api.record.couponList(data).then((res) => {
        this.dataItem = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    getChart (func) {
      let data = {
        status: this.status,
        keyword: this.keyword,
        type: this.type,
        charts_type: this.charts_type,
        start: this.start,
        end: this.end,
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
      this.api.record.couponCharts(data).then((res) => {
        this.chartData = res.data;
        this.chartData.axis_data = this.chartData.axis_data.reverse()
        this.chartData.exchange_count = this.chartData.exchange_count.reverse()//兑换次数
        this.chartData.first_order_count = this.chartData.first_order_count.reverse()//首单领取
        this.chartData.reserve_count = this.chartData.reserve_count.reverse()//预定数
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
    prantFun (keyword, type, status, start, end, charts_type, n) {
      this.curPage = 1
      this.keyword = keyword;
      this.type = type;
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
          data: ['预订数', '首单领取', '积分兑换']
        },
        color: ['#FFBE11', '#B8B8B8', '#2183cf'],
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
          name: "预订数",
          type: 'value',
          position: 'left'
        }, {
          name: "首单领取",
          type: 'value',
          position: 'right',
          offset: -80
        }, {
          name: "积分兑换",
          type: 'value',
          position: 'right'
        }],
        series: [
          {
            name: '预订数',
            type: 'line',
            yAxisIndex: 0,
            data: _this.chartData.reserve_count
          }, {
            name: '首单领取',
            type: 'line',
            yAxisIndex: 1,
            data: _this.chartData.first_order_count
          }, {
            name: '积分兑换',
            type: 'line',
            yAxisIndex: 2,
            data: _this.chartData.exchange_count
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
    }
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