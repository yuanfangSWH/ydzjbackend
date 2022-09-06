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
      <el-table-column fixed prop="gb_id" label="全选/ID" width="150">
      </el-table-column>
      <el-table-column prop="title" label="名称"></el-table-column>
      <el-table-column
        prop="summary_text"
        label="描述"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="original_price"
        sortable="custom"
        label="原价"
        width="90"
      >
        <template slot-scope="scope">
          <div class="yellow-t">{{ scope.row.original_price / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="total_price"
        sortable="custom"
        label="现价"
        width="90"
      >
        <template slot-scope="scope">
          <div class="yellow-t">{{ scope.row.reference_price / 100 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="type_name" label="座位分类"></el-table-column>
      <el-table-column prop="allow_week_days" label="可订日期">
        <template slot-scope="scope">{{ showWeekDay(scope.row) }}</template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="发布时间"
        sortable="custom"
      ></el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看/修改</el-button
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
export default {
  name: "goodsItem",
  props: {
    options: Array,
    merchants: Object,
  },
  data() {
    return {
      sortVal: "",
      sortStatus: false,
      order: "asc",
      // statusArr:[{text:'下架', value:'0'},{text:'售完', value:'1'},{text:'正常', value:'2'},{text:'删除', value:'3'}],
      multipleSelection: "",
      nameArr: [],
    };
  },
  mounted() {},
  methods: {
    showWeekDay(obj) {
      if (obj.date_type == 2) {
        let v = obj.allow_week_days;
        let weeks = v.split(",");
        let result = "";
        for (let i in weeks) {
          let w = Number(weeks[i]);
          let str = w > 0 ? "周" + w : "周日";
          result += result == "" ? str : " " + str;
        }
        return result;
      } else {
        return "节假日";
      }
    },
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
        arr.push(val[i].gb_id);
        this.nameArr.push(val[i].title);
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
      // this.$router.push({
      //   path: "/editGroupBuy",
      //   query: {
      //     gb_id: row.gb_id,
      //     merchant_id: this.merchants.merchant_id,
      //     shop_id: this.merchants.shop_id,
      //   },
      // });
    },
    // 删除单个
    delClick(row) {
      this.$emit("childFun", row.gb_id, true, "删除-" + row.title, 3);
    },
  },
};
</script>

<style scoped></style>
