<template>
  <div>
    <el-table ref="multipleTable"
              :data="options"
              stripe
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              @sort-change="sortFilterFun">
      <el-table-column type="selection"
                       width="55"> </el-table-column>
      <el-table-column fixed
                       prop="place_id"
                       label="全选/ID"
                       width="150">
      </el-table-column>
      <el-table-column prop="place_name"
                       label="座位名称"
                       width="300"
                       sortable="true" />
      <el-table-column prop="deposit"
                       label="预定金额"
                       width="200"
                       sortable="true" />
      <el-table-column prop="max_people_num"
                       label="容纳人数">
        <template slot-scope="scope">
          {{ scope.row.min_people_num }} ~ {{ scope.row.max_people_num }}
        </template>
      </el-table-column>
      <el-table-column prop="basic_price"
                       sortable="custom"
                       label="人均消费" />
      <el-table-column prop="type_name"
                       sortable="custom"
                       label="分类" />
      <el-table-column prop="area_name"
                       sortable="custom"
                       label="区域" />
      <el-table-column prop="rule_name"
                       sortable="custom"
                       label="规则" />
      <el-table-column fixed="right"
                       label="操作"
                       width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"
                     type="text"
                     size="small">查看/编辑</el-button>
          <el-button v-if="!isDelete"
                     @click="delClick(scope.row)"
                     type="text"
                     size="small">删除</el-button>
          <el-button v-if="isDelete"
                     @click="recoveryClick(scope.row)"
                     type="text"
                     size="small">还原</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "placeItem",
  props: {
    options: Array,
    merchants: Object,
    isDelete: Boolean,
  },
  data () {
    return {
      sortVal: "",
      sortStatus: false,
      order: "asc",
      // statusArr:[{text:'下架', value:'0'},{text:'售完', value:'1'},{text:'正常', value:'2'},{text:'删除', value:'3'}],
      multipleSelection: "",
      nameArr: [],
    };
  },
  mounted () { },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //table筛选
    filterTagTable (filters) {
      this.filterMethod(filters);
    },
    //table筛选
    filterMethod (val) {
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
    sortFilterFun (column) {
      console.info(column);
      this.$emit("sortFun", column);
    },
    //批量删除操作
    handleSelectionChange (val) {
      console.log(val);
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.place_id);
        this.nameArr.push(item.name);
      });
      this.$emit("deleteFun", {
        list: this.multipleSelection,
        isDelete: false,
      });
    },
    //查看、修改商品
    handleClick (row) {
      this.$emit("editPlace", row);
    },
    // 删除单个
    delClick (row) {
      this.$emit("deleteFun", { list: [row.place_id], isDelete: true });
    },
    //回复单个
    recoveryClick (row) {
      this.$emit("recoveryFun", { list: [row.place_id], isRecovery: true });
    },
  },
};
</script>

<style scoped>
</style>