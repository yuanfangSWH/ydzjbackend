<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="dataList"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @filter-change="filterTagTable"
      @sort-change="sortFilterFun"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="goods_id" label="全选/ID" width="150">
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="280">
      </el-table-column>
      <el-table-column prop="goods_class.is_combo" label="类型" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.is_combo">套餐</span>
          <span v-else>单品</span>
        </template>
      </el-table-column>
      <el-table-column prop="goods_class.class_name" label="分类" width="200">
      </el-table-column>
      <!-- <el-table-column prop="goods_class.class_count" label="规格" width="120">
      </el-table-column> -->
      <el-table-column prop="market_price" sortable="custom" label="原价">
        <template slot-scope="scope">
          {{ scope.row.market_price / 100 }}
        </template>
      </el-table-column>
      <el-table-column prop="discount" sortable="custom" label="折扣">
        <template slot-scope="scope"> {{ scope.row.discount }} % </template>
      </el-table-column>
      <el-table-column prop="price" sortable="custom" label="现价">
        <template slot-scope="scope">
          {{ scope.row.price / 100 }}
        </template>
      </el-table-column>
      <el-table-column sortable="custom" label="排序">
        <template slot-scope="scope">
          <el-input
            class="input_pxcss"
            v-model="scope.row.sort"
            :ref="'saveTagInput_' + scope.$index"
            @blur="percentF(scope.row, scope.$index)"
            v-if="scope.$index === sortingid"
          ></el-input>
          <div class="muzhicss" @click="khaki(scope.$index, scope.row)" v-else>
            <span>{{ scope.row.sort }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        :filter-multiple="false"
        :filters="statusArr"
        filter-placement="bottom-end"
        :column-key="'status'"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">删除</span>
          <span v-else-if="scope.row.status == 1">正常</span>
          <span v-else-if="scope.row.status == 2">下架</span>
          <span v-else-if="scope.row.status == 3">售完</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看/编辑</el-button
          >
          <el-button @click="delClick(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "goodsItem",
  props: {
    options: Array,
    merchants: Object,
  },
  data() {
    return {
      dataList: [],
      sortingid: "",
      sortVal: "",
      sortStatus: false,
      order: "asc",
      statusArr: [
        { text: "下架", value: "0" },
        { text: "售完", value: "1" },
        { text: "正常", value: "2" },
        { text: "删除", value: "3" },
      ],
      multipleSelection: "",
      nameArr: [],
    };
  },
  watch: {
    options: {
      immediate: true,
      handler(val) {
        this.dataList = _.cloneDeep(this.options);
      },
    },
  },
  mounted() {},
  methods: {
    khaki(index, row) {
      this.sortingid = index;
      this.sortData = Number(row.sort);
      this.$nextTick(() => {
        this.$refs["saveTagInput_" + index].focus();
      });
    },
    //排序修改
    percentF(row, index) {
      if (this.sortData != row.sort) {
        var datas = {
          id: row.goods_id,
          sort: Number(row.sort),
          merchant_id: this.merchants.merchant_id,
          shop_id: this.merchants.shop_id,
        };
        this.api.goods.goodsSetSort(datas).then((res) => {
          if (res.data.code == 0) {
            this.sortingid = "";
            this.$message({
              message: "修改排序成功",
              type: "success",
            });
          } else {
            this.tableListData[index].sort = this.sortData;
            this.$message({
              message: "修改排序失败",
              type: "warning",
            });
          }
        });
      } else {
        this.sortingid = "";
      }
    },
    //table筛选
    filterTagTable(filters) {
      console.info(filters);
      this.filterMethod(filters);
    },
    //table筛选
    filterMethod(val) {
      var key = [];
      var value = [];
      for (var i in val) {
        key.push(i);
        value.push(val[i]);
      }
      key = key.join(",");
      value = value.join(",");
      //接口逻辑
      this.f_status = value;
      this.$emit("childFun", this.f_status, "", key, 2);
      // if(key=='status' && value){
      //     this.filterGetGoodsList()
      // }else{
      //     this.getGoodsList()
      // }
    },
    // filterGetGoodsList() {
    //     this.pageSign = 2
    //     let data = {page: this.page, status: this.f_status, class_id:this.class_id}
    //     this.$store.dispatch('goods/getGoodsList',data).then((res) => {
    //         this.options = res.data
    //         this.count = res.count
    //     })
    // },
    //table排序
    sortMethod(val) {
      this.sortVal = val;
      this.sortStatus = !this.sortStatus;
      if (this.sortStatus) {
        this.order = "asc"; //正序
      } else {
        this.order = "desc"; //倒序
      }
      //接口逻辑
      // this.sortDataFun()
      this.$emit("childFun", this.sortVal, this.order, "", 1);
    },
    //table排序
    sortFilterFun(column) {
      this.sortMethod(column.prop);
    },
    //批量删除操作
    handleSelectionChange(val) {
      var arr = [];
      for (var i = 0; i < val.length; i++) {
        arr.push(val[i].goods_id);
        this.nameArr.push(val[i].name);
      }
      this.multipleSelection = arr;
      // arr = Array.from(new Set(arr))
      this.nameArr = Array.from(new Set(this.nameArr));
      // this.multipleSelection = arr.join(',')
      this.$emit("childFun", this.multipleSelection, "", this.nameArr, 4);
    },
    //查看、修改商品
    handleClick(row) {
      this.$emit("edit", row, false);
      // if (row.is_combo == 0) {
      //   this.$router.push({
      //     path: "/editGoods?goods_id=" + row.goods_id,
      //     query: {
      //       merchant_id: this.merchants.merchant_id,
      //       shop_id: this.merchants.shop_id,
      //     },
      //   });
      // } else {
      //   this.$router.push({
      //     path: "/editGroupGoods?goods_id=" + row.goods_id,
      //     query: {
      //       merchant_id: this.merchants.merchant_id,
      //       shop_id: this.merchants.shop_id,
      //     },
      //   });
      // }
    },
    // 删除单个
    delClick(row) {
      this.$emit("childFun", row.goods_id, true, "删除-" + row.name, 3);
    },
  },
};
</script>

<style scoped></style>
