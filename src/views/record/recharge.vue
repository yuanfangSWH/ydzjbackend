<template>
  <div class="shopSet">
    <div class="filterBox">
      <div class="g-title1">充值数据</div>
      <recharge-item @filtrateFun='prantFun'></recharge-item>
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
          prop="recharge_id"
          label="ID"
          width="80" sortable="custom">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="订单时间"
          width="" sortable="custom">
        </el-table-column>
        <el-table-column
          prop="pay_time"
          label="到账时间"
          width="" sortable="custom">
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
          label="充值方式"
          >
          <template slot-scope="scope">
            <span v-if="scope.row.pay_log.pay_type == 0">未选方式</span>
            <span v-if="scope.row.pay_log.pay_type == 1">支付宝</span>
            <span v-if="scope.row.pay_log.pay_type == 2">微信</span>
            <span v-if="scope.row.pay_log.pay_type == 9">苹果支付</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_log.pay_source"
          label="支付来源"
          >
        </el-table-column>
        <el-table-column
          prop="pay_currency"
          label="充值Y币"
          >
        </el-table-column>
        <el-table-column
          prop="user_currency"
          label="充值后余额"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          >
        </el-table-column>
        <!-- <el-table-column
          prop="address"
          label="状态"
          >
          <template slot-scope="scope">
            <span v-if="scope.row.status == 3 || scope.row.status == 12">预订中</span>
            <span v-if="scope.row.status == 4">已预订</span>
            <span v-if="scope.row.status == 6">退款中</span>
            <span v-if="scope.row.status == 2 || scope.row.status == 5">已取消</span>
            <span v-if="scope.row.status == 10">拒绝退款</span>
          </template>
        </el-table-column> -->
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
import rechargeItem from "./components/rechargeItem"
export default {
  name: 'reportRecharge',
  components: {
    rechargeItem
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
      pay_type:'',
      start:'',
      end:'',
      status:'',
      charts_type:1,
      pay_source:'',
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
    getData() {
      let data = {
        pay_source: String(this.pay_source),
        status: this.status,
        pay_type: this.pay_type,
        charts_type: Number(this.charts_type),
        start: this.start,
        end: this.end,
        sort: this.sortVal, 
        order: this.order,
        page: this.curPage,
        page_size:10
      };
      // console.log(data)
      if (this.start == "") {
        delete data.start;
      }
      if (this.end == "") {
        delete data.end;
      }
      if(this.charts_type == 4 && !this.start && !this.end){
        this.$message({
          message: "请选择开始日期和结束日期！",
          type: "error",
        });
        return false
      }
      this.api.record.rechargeList(data).then((res) => {
        this.dataItem = res.data.data;
        this.total = res.data.count ? res.data.count:0;
      });
    },
    getChart(func) {
      let data = {
        pay_source: String(this.pay_source),
        status: this.status,
        pay_type: this.pay_type,
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
      this.api.record.rechargeCharts(data).then((res) => {
        this.chartData = res.data;
        this.chartData.axis_data = this.chartData.axis_data.reverse()
        this.chartData.count = this.chartData.count.reverse()
        let arr = []
        this.chartData.amount.forEach(element => {
          element = element/100
          arr.push(element)
        });
        this.chartData.amount = arr.reverse()
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
      if (this.shop_type == "") {
        delete data.shop_type;
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
    prantFun(pay_type, pay_source, status, start, end, charts_type, n) {
      this.curPage = 1
      this.pay_type = pay_type;
      this.pay_source = pay_source
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
                  data: ['充值笔数', '充值金额']
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
              name:"充值笔数",
              type: 'value'
            },{
              name:"充值金额",
              type: 'value'
            }],
            series: [
              {
                name:'充值笔数',
                type:'line',
                yAxisIndex:0,
                data:_this.chartData.count
              },{
                name:'充值金额',
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