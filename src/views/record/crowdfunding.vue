<template>
  <div class="shopSet">
    <div class="filterBox">
      <div class="g-title1">拼桌数据</div>
      <crowdfunding-item @filtrateFun='prantFun'></crowdfunding-item>
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
          prop="cf_id"
          label="ID"
          width="80" sortable="custom">
        </el-table-column>
        <el-table-column prop=""
                       label="发布者"
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
          prop="shop.name"
          label="店铺"
          width="">
          <template slot-scope="scope">
            <span style="cursor: pointer;" @click="$router.push('/shopEdit?shop_id='+scope.row.shop.shop_id+'&merchant_id='+scope.row.shop.merchant_id+'&from=true')">{{scope.row.shop.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="主题"
          width="">
        </el-table-column>
        <el-table-column
          prop="total_people"
          label="总人数"
          width="">
        </el-table-column>
        <el-table-column
          prop="total_people"
          label="已报名/已审核"
          width="">
          <template slot-scope="scope">
            {{scope.row.enroll_num}} / {{`男：${scope.row.male_num};女：${scope.row.female_num};`}}
          </template>
        </el-table-column>
        <el-table-column
          prop="place_name"
          label="拼桌方式"
          width="">
          <template slot-scope="scope">
            <span v-if="scope.row.cf_type == 1">全部AA</span>
            <span v-if="scope.row.cf_type == 2">自由拼桌</span>
            <span v-if="scope.row.cf_type == 3">男A女免</span>
            <span v-if="scope.row.cf_type == 4">女A男免</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dateline"
          label="活动时间"
          width="" sortable="custom">
        </el-table-column>
        <el-table-column
          prop=""
          label="起拼金额"
          width="">
          <template slot-scope="scope">
            <span style="color:#dda100">￥{{scope.row.min_amount/100}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="发起时间"
          width="" sortable="custom">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          >
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">禁用</span>
            <span v-if="scope.row.status == 1">报名中</span>
            <span v-if="scope.row.status == 2">取消拼桌</span>
            <span v-if="scope.row.status == 3">截止报名</span>
            <span v-if="scope.row.status == 4">活动中</span>
            <span v-if="scope.row.status == 5">超时关闭</span>
            <span v-if="scope.row.status == 6">已结束</span>
            <span v-if="scope.row.status == 7">违规</span>
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
import crowdfundingItem from "./components/crowdfundingItem"
export default {
  name: 'reportCrowdfunding',
  components: {
    crowdfundingItem
  },
  data() {
    return {
      usertx:false,
      sortStatus:false,
      order:'desc',
      sortVal:'dateline',
      curPage:1,
      total:0,
      dataItem:[],
      chartData:{},
      shop_type:'',
      start:'',
      end:'',
      status:'',
      charts_type:1,
      cf_type:'',
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
        status: this.status,
        shop_type: this.shop_type,
        cf_type: this.cf_type, 
        charts_type: this.charts_type,
        start: this.start,
        end: this.end,
        sort: this.sortVal, 
        order: this.order,
        page: this.curPage,
        page_size:10
      };
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
      this.api.record.crowdfundingList(data).then((res) => {
        this.dataItem = res.data.data;
        this.total = res.data.count ? res.data.count:0;
      });
    },
    getChart(func) {
      let data = {
        status: this.status,
        shop_type: this.shop_type,
        cf_type: this.cf_type,
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
      if(this.charts_type == 4 && !this.start && !this.end){
        return false
      }
      this.api.record.crowdfundingCharts(data).then((res) => {
        this.chartData = res.data.data;
        this.chartData.axis_data = this.chartData.axis_data.reverse()
        this.chartData.count = this.chartData.count.reverse()
        this.chartData.enroll_num = this.chartData.enroll_num.reverse()
        this.chartData.join_num = this.chartData.join_num.reverse()
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
    prantFun(shop_type, cf_type, status, start, end, charts_type, n) {
      this.curPage = 1
      this.shop_type = shop_type;
      this.cf_type = cf_type;
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
                  data: ['拼桌数', '报名人数', '入局人数']
              },
            color:['#FFBE11','#B8B8B8', '#2183cf'], 
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
              name:"拼桌数",
              type: 'value',
              position: 'left'
            },{
              name:"报名人数",
              type: 'value',
              position: 'right',
              offset: -80
            },{
              name:"入局人数",
              type: 'value',
              position: 'right'
            }],
            series: [
              {
                name:'拼桌数',
                type:'line',
                yAxisIndex:0,
                data:_this.chartData.count
              },{
                name:'报名人数',
                type:'line',
                yAxisIndex:1,
                data:_this.chartData.enroll_num
              },{
                name:'入局人数',
                type:'line',
                yAxisIndex:2,
                data:_this.chartData.join_num
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