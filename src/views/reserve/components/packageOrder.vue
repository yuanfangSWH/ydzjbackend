<template>
<div>
    <el-table stripe :data="tableListData"  tooltip-effect="dark" style="width: 100%"
         @sort-change="sortFilterFun">
            <!-- <el-table-column type="selection" width="55" /> -->
            <el-table-column prop="order_no" label="订单号" width="250" />
            <el-table-column prop="title" label="名称" width="150" />
            <el-table-column
              prop="total_price"
              label="金额"
              sortable="custom"
              width="120">
              <template slot-scope="scope">
                {{scope.row.total_price/100}}
              </template>
            </el-table-column>
            <el-table-column prop="" label="用户信息" width="150">
              <template slot-scope="scope">
                {{scope.row.name}}<br />{{scope.row.phone}}
              </template>
            </el-table-column>
            <el-table-column
              prop="start_time"
              label="下单时间"
              sortable="custom"
              width="180">
            </el-table-column>
            <el-table-column prop="finish_time" label="使用时间 " sortable="custom" width="150" />
            <el-table-column prop="end_time" label="过期时间" sortable="custom" width="150" />
            <el-table-column prop="staff_name" label="操作员" width="150" />
            <el-table-column
              prop="status"
              label="状态"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 1">已付款</span>
                <span v-if="scope.row.status == 2">已完成</span>
                <span v-if="scope.row.status == 3">商家已取消</span>
                <span v-if="scope.row.status == 6">退款中</span>
                <span v-if="scope.row.status == 7">已退款</span>
                <span v-if="scope.row.status == 8">退款拒绝</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" align="right" label="操作">
                <template slot-scope="scope">
                  <el-button size="small" @click="openUpdateDialog(2,scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>  
</div>
</template>

<script>
export default {
    name:"packageOrder",
    props:{
        tableListData: Array,
        // 商家/店铺ID
    merchants: {
      shop_id: Number,
      merchant_id: Number,
    }
    },
    data() {
        return{
            sortVal:'',
            order:'asc',
            sortStatus:false
        }
    },
    methods:{
        openUpdateDialog(i, row) {
          this.$router.push({ path:'/groupBuyDetaile?group_buy_id=' + row.id})
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
          this.$emit('reserveChildren',this.sortVal, this.order)
        },
        //table排序
        sortFilterFun(column) {
          this.sortMethod(column.prop)
        },
    }
}
</script>
<style lang="scss" scoped>
 
</style>