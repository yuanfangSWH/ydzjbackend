<!--
 * @Author: 朱强
 * @Date: 2021-01-18 17:06:38
 * @LastEditTime: 2021-03-16 16:31:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\shopset\components\shopImportItem.vue
-->
<template>
  <el-table
    ref="multipNum"
    stripe
    :data="tableListData"
    tooltip-effect="dark"
    style="width: 100%"
    v-loading="loading"
    @sort-change="handleDataSort"
    @selection-change="selectItem"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="id" label="ID" sortable="true" />
    <el-table-column prop="title" label="店铺名" sortable="true" />
    <el-table-column prop="tel" label="电话" />
    <el-table-column prop="type" label="类型" />
    <el-table-column prop="category" label="类别" />
    <el-table-column prop="province_name" label="省" />
    <el-table-column prop="city_code" label="城市" sortable="true">
      <template slot-scope="scope">
        {{ scope.row.city_name }}
      </template>
    </el-table-column>
    <el-table-column prop="area_code" label="区域" sortable="true">
      <template slot-scope="scope">
        {{ scope.row.area_name }}
      </template>
    </el-table-column>
    <el-table-column prop="address" label="店铺地址" sortable="true" />
    <el-table-column prop="status" label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="text" @click="handleImportShop(scope.row)"
          >导入</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "shopImportItemTx",
  props: {
    shopData: { type: Array },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      multipleSelection: [], //批量选中
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
      searchOption: {
        //article_id: 0,
        sort: "",
        order: "",
        page: 1,
        keyword: "",
      },
      total: 1,
      tableListData: [], //页面表单的内容
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
    };
  },
  watch: {
    shopData(v) {
      this.tableListData = v;
      this.$emit("update:loading", false);
    },
  },
  methods: {
    handleDataSort(obj) {
      this.$emit("handleDataSort", obj);
    },
    selectItem(val) {
      this.$emit("selectItem", val);
    },
    handleImportShop(obj) {
      this.$emit("handleImportShop", obj);
    },
    clearSelect() {
      this.$refs["multipNum"].clearSelection();
    },
  },
  created() {},
};
</script>