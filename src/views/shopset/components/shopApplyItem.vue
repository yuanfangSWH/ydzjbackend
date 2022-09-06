<!--
 * @Author: 朱强
 * @Date: 2021-01-27 11:39:35
 * @LastEditTime: 2021-02-03 16:47:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\shopset\components\shopApplyItem.vue
-->
<template>
  <div>
    <el-table ref="multipNum_type"
              stripe
              :data="tableListData"
              @sort-change="sortFilterFun"
              @selection-change="handleSelectionChange"
              tooltip-effect="dark"
              style="width: 100%"
              v-loading="loading">
      <el-table-column type="selection" width="55" />
      <el-table-column label="ID"
                       width="120"
                       prop="apply_id"
                       sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.apply_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name"
                       label="店铺名称" />
      <el-table-column prop="type_name"
                       label="店铺类型" />
      <el-table-column prop="phone"
                       label="联系电话" />
      <el-table-column prop="address" label="地址信息">
        <template slot-scope="scope">
          {{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.address}}
        </template>          
      </el-table-column>
      <el-table-column prop="create_time"
                       label="创建时间" />
      <el-table-column prop="info" label="商家留言" width="350">
        <template slot-scope="scope">
          <el-tooltip class="item" v-if="scope.row.info"
                    effect="dark"
                    :content="scope.row.info"
                    placement="bottom"
                    :disabled="getShow(scope.row.info)">
            <div>{{ getAgent(scope.row.info) }}</div>
          </el-tooltip>
          <div v-else style="color:#ccc">--</div>
        </template>
      </el-table-column>
      <el-table-column prop="mark" label="备注" width="350">
        <template slot-scope="scope">
          <el-tooltip class="item" v-if="scope.row.mark"
                    effect="dark"
                    :content="scope.row.mark"
                    placement="bottom"
                    :disabled="getShow(scope.row.mark)">
            <div>{{ getAgent(scope.row.mark) }}</div>
          </el-tooltip>
          <div v-else style="color:#ccc">--</div>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="250">
        <template slot-scope="scope">
          <el-button v-if="status == 0 || status == 2"
                     size="mini"
                     @click="handleApply(scope.row, 1)">通过</el-button>
          <el-button v-if="status == 0"
                     size="mini"
                     @click="handleApply(scope.row, 2)"
                     type="warning">拒绝</el-button>
          <el-button size="mini"
                     @click="handleApply(scope.row, 4)">备注</el-button>
          <el-button v-if="
              status == 1 && scope.row.merchant_id > 0 && scope.row.shop_id > 0
            "
                     size="mini"
                     type="primary"
                     @click="
              $router.push({
                path: '/shopInfo',
                query: {
                  merchant_id: scope.row.merchant_id,
                  shop_id: scope.row.shop_id,
                  from: 'shopApple',
                },
              })
            ">查看</el-button>
          <el-button v-if="status != 0"
                     size="mini"
                     type="danger"
                     @click="handleApply(scope.row, 3)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "shopApplyItem",
  props: {
    shopData: { type: Array },
    status: { type: Number, default: 0 },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    shopData (v) {
      this.tableListData = v;
      this.$emit("update:loading", false);
    },
  },
  data () {
    return {
      tableListData: [],
    };
  },
  methods: {
    // 内容过长，鼠标移入显示全部
    getAgent (v) {
      return v.length > 20 ? v.substring(0, 20) + " ..." : v;
    },
    getShow (v) {
      return v.length > 20 ? false : true;
    },
    sortFilterFun (v) {
      this.$emit("sortFun", v);
    },
    handleApply (id, v) {
      this.$emit("applyFun", id, v);
    },
    handleSelectionChange(val) {
      this.$emit("applyFun", val, '');
    }
  },
  created () { },
};
</script>
<style lang="sass" scoped>
</style>