<template>
  <div>
    <!-- @filter-change="filterTagTable" -->
    <el-table
      ref="multipleTable"
      :data="dataOptions"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="sortFilterFun"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="button_id" label="ID" width="60" sortable="custom">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="alias" label="别名" width="100" sortable="custom">
      </el-table-column>
      <el-table-column prop="ver" label="版本号" width="100" sortable="custom">
      </el-table-column>
      <el-table-column prop="icon" label="未选中图标" width="120">
        <template slot-scope="scope">
          <el-image :src="scope.row.icon"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="icon_active" label="选中图标" width="120">
        <template slot-scope="scope">
          <el-image :src="scope.row.icon_active"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="链接" width="250" sortable="custom">
      </el-table-column>
      <!-- <el-table-column
                prop="ver"
                label="版本"
                width="180">
            </el-table-column> -->
      <el-table-column
        prop="modify_time"
        label="更新时间"
        width="200"
        sortable="custom"
      >
      </el-table-column>
      <!-- <el-table-column
                prop="status"
                label="状态"
                :filter-multiple="false"
                :filters="statusArr"
                filter-placement="bottom-end"
                :column-key=" 'status' ">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">隐藏</span>
                    <span v-if="scope.row.status == 1">显示</span>
                </template>
            </el-table-column> -->
      <el-table-column fixed="right" label="操作" align="right">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            v-if="status == 1"
            @click="delClick(scope.row)"
            type="text"
            size="small"
            >删除</el-button
          >
          <el-button
            v-if="status == 0"
            @click="restoreFun(scope.row)"
            type="text"
            size="small"
            >还原</el-button
          >
          <el-button
            v-if="status == 0"
            @click="realDeleteFun(scope.row)"
            type="text"
            size="small"
            >彻底删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    dataOptions: Array,
    status: Number,
  },
  data() {
    return {
      multipleSelection: [],
      nameArr: [],
      statusArr: [
        { text: "隐藏", value: "0" },
        { text: "显示", value: "1" },
      ],
      sortVal: "",
      sortStatus: false,
      order: "desc",
    };
  },
  methods: {
    handleSelectionChange(val) {
      var arr = [];
      this.nameArr = [];
      for (var i = 0; i < val.length; i++) {
        arr.push(val[i].button_id);
        this.nameArr.push(val[i].title);
      }
      this.multipleSelection = arr;
      // arr = Array.from(new Set(arr))
      this.nameArr = Array.from(new Set(this.nameArr));
      // this.multipleSelection = arr.join(',')
      this.$emit("childrenFun", this.multipleSelection, this.nameArr, 5);
    },
    //table筛选
    filterTagTable(filters) {
      // console.log(filters)
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
      this.$emit("childrenFun", key, value, 1);
    },
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
      this.$emit("childrenFun", this.sortVal, this.order, 2);
    },
    //table排序
    sortFilterFun(column) {
      this.sortMethod(column.prop);
    },
    handleClick(row) {
      this.$emit("childrenFun", row.button_id, "", 3);
    },
    delClick(row) {
      if (row.status == 1) {
        this.$emit("childrenFun", row.button_id, "", 4);
      } else {
        this.$message({
          message: "该数据已是禁用状态了！",
          type: "warning",
        });
      }
    },
    restoreFun(row) {
      this.$emit("childrenFun", row.button_id, "", 6);
    },
    realDeleteFun(row) {
      this.$emit("childrenFun", row.button_id, "", 7);
    },
  },
};
</script>

<style scoped>
</style>