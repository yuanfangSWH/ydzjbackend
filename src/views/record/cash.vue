<template>
  <div class="shopSet">
    <div class="filterBox">
      <div class="g-title1">提现数据</div>
      <cash-item @filtrateFun='prantFun'></cash-item>
    </div>
    <div class="navBox navBox-1">
      <div id="myChart" :style="{width: '100%', height: '322px'}"></div>
    </div>
    <div class="navBox-2">
      <el-table
        :data="dataItem"
        style="width: 100%"
        stripe 
        tooltip-effect="dark"
        @sort-change="sortFilterFun"
        >
        <el-table-column
          prop="cash_id"
          label="ID"
          width="80" sortable="custom">
        </el-table-column>
        <el-table-column
          prop="audit_time"
          label="审核时间"
          width="" sortable="custom">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="提现时间"
          width="" sortable="custom">
        </el-table-column>
        <el-table-column
          prop="order_no"
          label="订单号"
          width="">
        </el-table-column>
        <el-table-column prop=""
                       label="用户"
                       width="230">
          <template slot-scope="scope">
            <div
                style="display: flex; align-items: center"
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
        <el-table-column
          prop=""
          label="提现方式"
          >
          <template slot-scope="scope">
          <span v-if="scope.row.type == 1">微信</span>
          <span v-else-if="scope.row.type == 2">支付宝</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="income"
          label="提现酒力"
          >
          <template slot-scope="scope">
          <div>
            <span style="color: #6fbe44">-{{ scope.row.income }}</span
            >酒力={{ scope.row.income / 10 }}元
          </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="income_after"
          label="酒力余额"
          >
        </el-table-column>
        <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1" style="color: #6fbe44"
            >机器审核</span
          >
          <span v-else-if="scope.row.status == 2" style="color: #eab154"
            >人工审核中</span
          >
          <div class="muzhicss" v-else-if="scope.row.status == 3">
            <el-tooltip
              effect="dark"
              :content="scope.row.audit_reason"
              placement="bottom"
            >
              <span style="color: #e26b66">审核被拒绝</span>
            </el-tooltip>
          </div>
          <span v-else-if="scope.row.status == 4" style="color: #4e9df8"
            >人工审核通过</span
          >
          <span v-else-if="scope.row.status == 5" style="color: #4e9df8"
            >提现成功</span
          >
          <div class="muzhicss" v-else-if="scope.row.status == 6">
            <!-- <el-tooltip
              effect="dark"
              :content="whyF(scope.row)"
              placement="bottom"
            >
              <span style="color: #4e9df8">提现失败</span>
            </el-tooltip> -->
            <span style="color: #4e9df8">提现失败</span>
          </div>
        </template>
      </el-table-column>
      </el-table>
      <div class="pagination">
          <el-pagination 
          :current-page='curPage' 
          :hide-on-single-page="true" 
          @current-change="pageChange" 
          background 
          layout="prev, pager, next" 
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
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
import cashItem from "./components/cashItem"
export default {
  name: 'reportRecharge',
  components: {
    cashItem
  },
  data() {
    return {
      usertx:false,
      sortStatus:false,
      order:'desc',
      sortVal:'create_time',
      curPage:1,
      total:0,
      dataItem:[],
      chartData:{
        chart:{
          axis_data:[],
          name:[],
          reserve_count:[],
          reserve_money:[]
        },
        summary:{
          offline_count: 0,
          online_count: 0,
          reserve_count: 0,
          reserve_money: 0,
          staff_commission: 0,
          total_money: 0
        }
      },
      type:'',
      start:'',
      end:'',
      status:'',
      charts_type:1,
      chartName:''
    }
  },
  created() {
    this.getData()
    this.getChart(() => {
      this.drawLine()
    })
  },
  mounted(){
    
  },
  methods: {
    // 判断用那个当原因
    whyF(row) {
      if (JSON.stringify(row.wxpay) == "null") {
        if (row.alipay.resp_sub_msg != "") {
          return row.alipay.resp_sub_msg;
        } else {
          return row.alipay.resp_msg;
        }
      } else if (JSON.stringify(row.alipay) == "null") {
        return row.wxpay.resp_err_code_des;
      }
    },
    getData() {
      let data = {
        status: this.status,
        type: this.type,
        charts_type: Number(this.charts_type),
        start: this.start,
        end: this.end,
        sort: this.sortVal, 
        order: this.order,
        page: this.curPage,
        page_size:10
      };
      console.log(data)
      if (this.start == "") {
        delete data.start;
      }
      if (this.end == "") {
        delete data.end;
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
      this.api.record.cashList(data).then((res) => {
        this.dataItem = res.data.data;
        this.total = res.data.count ? res.data.count:0;
      });
    },
    getChart(func) {
      let data = {
        status: this.status,
        type: this.type,
        charts_type: Number(this.charts_type),
        start: this.start,
        end: this.end,
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
      this.api.record.cashCharts(data).then((res) => {
        this.chartData = res.data;
        this.chartData.axis_data = this.chartData.axis_data.reverse()
        this.chartData.count = this.chartData.count.reverse()
        if (this.chartData.amount) {
          for (var i = 0; i < this.chartData.amount.length; i++) {
            this.chartData.amount[i] = this.chartData.amount[i] / 100;
          }
        }
        this.chartData.amount = this.chartData.amount.reverse()
        func()
      });
    },
    // 导出excel
    excelFun() {
      let data = {
        start: this.start,
        end: this.end,
        shop_type: Number(this.shop_type),
        status: Number(this.status),
        page:this.curPage,
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
    prantFun(type, status, start, end, charts_type, n) {
      this.curPage = 1
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
    drawLine(){
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
                  data: ['提现笔数', '提现金额']
              },
            color:['#FFBE11','#B8B8B8'], 
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
              name:"提现笔数",
              type: 'value'
            },{
              name:"提现金额",
              type: 'value'
            }],
            series: [
              {
                name:'提现笔数',
                type:'line',
                yAxisIndex:0,
                data:_this.chartData.count
              },{
                name:'提现金额',
                type:'line',
                yAxisIndex:1,
                data:_this.chartData.amount
              }
            ]
        }, true);
    },
    //table排序
    sortMethod(val) {
      this.sortVal = val
      this.sortStatus = !this.sortStatus
      if(this.sortStatus){
        this.order='asc'//正序
      }else{
        this.order='desc'//倒序
      }
      //接口逻辑
      this.sortDataFun()
    },
    //table排序
    sortFilterFun(column) {
      this.sortMethod(column.prop)
    },
    sortDataFun() {
      this.curPage = 1
      this.getData()
    },
    /* 改变页数 */
    pageChange(page){
        this.curPage = page
        this.getData()
        // this.getChart(() => {
        //   this.drawLine()
        // })
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
  .shopSet{
    margin: 15px 15px;
    .filterBox{
      background: #ffffff;
      padding: 20px;
      border: 1px solid #DFDFDF;
      display: inline-block;
      width: 100%;
      .g-title1{
        display: flex;
        font-size: 24px;
        color: #0A0A0A;
      }
    }
    .navBox{
        display: flex;
        background: #ffffff;
        padding: 20px;
        border: 1px solid #DFDFDF;
    }
    .navBox-1{
        display: flex;
        margin-top: 20px;
        text-align: center;
        .tc-nav{
          flex: 1;
          align-items: center;
          justify-content: center;
          text-align: center;
          .tc-t1{font-size: 18px; color: #0A0A0A; margin-bottom: 8px;}
          .tc-t2{ font-size: 30px; font-weight: bold;}
          .t-color1{ color: #DDA100;}
          .t-color2{ color:#41B300;}
          .t-color3{ color: #3988FF;}
          .tc-t3{font-size: 16px; font-weight: 500;}
        }
    }
    .navBox-2{
        margin-top: 20px;
        text-align: center;
        background: #ffffff;
        padding: 20px;
        border: 1px solid #DFDFDF;
        .pagination{
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            padding: 15px 0;
        }
    }
  }
  </style>