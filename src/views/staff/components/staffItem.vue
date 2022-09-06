<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="options"
      stripe
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="sortFilterFun"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column fixed prop="staff_id" label="全选/ID" width="80">
      </el-table-column>
      <el-table-column prop="staff_name" label="员工名称" sortable="true" />
      <el-table-column prop="staff_account" label="工号" sortable="true" />
      <el-table-column prop="role_id" label="角色">
        <template slot-scope="scope">
          {{ scope.row.role_name }}
        </template>
      </el-table-column>
      <el-table-column prop="staff_gift_balance" label="剩余赠送额度" />
      <el-table-column prop="staff_gift_amount" label="赠送额度" />
      <el-table-column prop="staff_commission" label="提成">
        <template slot-scope="scope"
          >{{ scope.row.staff_commission }} %</template
        >
      </el-table-column>
      <el-table-column
        prop="staff_create_time"
        sortable="custom"
        label="加入时间"
      />
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看/编辑</el-button
          >
          <el-button
            v-if="!isDelete"
            @click="delClick(scope.row)"
            type="text"
            size="small"
            >删除</el-button
          >
          <el-button
            v-if="isDelete"
            @click="recoveryClick(scope.row)"
            type="text"
            size="small"
            >还原</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "staffItem",
  props: {
    options: Array,
    merchants: Object,
    isDelete: Boolean,
  },
  data() {
    return {
      sortVal: "",
      sortStatus: false,
      order: "asc",
      multipleSelection: "",
      nameArr: [],
    };
  },
  mounted() {},
  methods: {
    //table筛选
    filterTagTable(filters) {
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
    },

    //table排序
    sortFilterFun(column) {
      console.info(column);
      this.$emit("sortFun", column);
    },
    //批量删除操作
    handleSelectionChange(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.staff_id);
        this.nameArr.push(item.name);
      });
      this.$emit("deleteFun", {
        list: this.multipleSelection,
        isDelete: false,
      });
    },
    //查看、修改商品
    handleClick(row) {
      this.$emit("editStaff", row);
    },
    // 删除单个
    delClick(row) {
      this.$emit("deleteFun", { list: [row.staff_id], isDelete: true });
    },
    //回复单个
    recoveryClick(row) {
      this.$emit("recoveryFun", { list: [row.staff_id], isRecovery: true });
    },
  },
};
</script>

<style scoped>
</style>