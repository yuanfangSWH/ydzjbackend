<template>
  <div class="shopSet">
    <div class="add-box">
      <el-button type="danger" @click="batchDelete" :disabled="!multipleSelection.length>0">删除</el-button>
      <el-button type="primary" @click="addPlace()">新增</el-button>
    </div>

    <el-table
      ref="multipNum_area"
      @filter-change="filterTagTable"
      @sort-change="sortFilterFun"
      stripe
      :data="placeAreaData"
      tooltip-effect="dark"
      border
      style="width: 100%"
      @selection-change="selectArea"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="全选/ID" width="150" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
          <span>{{ scope.row.area_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="area_name"
        label="类型名称"
        sortable="custom"
        width="220"
        :filter-multiple="false"
        :filters="placeTypeArr"
        filter-placement="bottom-end"
        :column-key=" 'area_name' "
      />
      <el-table-column
        label="状态"
        width="120"
        :filter-multiple="false"
        :filters="placeStatusArr"
        filter-placement="bottom-end"
        :column-key=" 'status' "
      >
        <template slot-scope="scope">
          <!-- <i v-show="scope.row.status===1" class="el-icon-check"></i> -->
          <span v-if="scope.row.status == 0">禁用</span>
          <span v-if="scope.row.status == 1">正常</span>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作">
        <!-- <template slot="header" slot-scope="scope">
          <el-input v-model="search" class="search" size="mini" placeholder="输入关键字搜索" :data-str="scope" />
        </template>-->
        <template slot-scope="scope">
          <el-button size="mini" @click="updateDialog(scope.$index, JSON.parse(JSON.stringify(scope.row)),'area')">修改</el-button>
          <el-button size="mini" type="danger" @click="openDelDialog(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="curPage"
        :hide-on-single-page="true"
        @prev-click="prePage"
        @current-change="pageChange"
        @next-click="nextPage"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 弹窗 -->
    <el-dialog :title="placeDialogTitle" :visible.sync="placeDialog" @close="closeDialog">
      <!-- 添加区域表单 -->
      <el-form v-show="showAddAreaBox" ref="addArea" label-width="80px" class="addArea">
        <el-form-item label="区域名称">
          <el-input v-model="placeAreaData.area_name" />
        </el-form-item>
        <el-button type="primary" @click="addArea">添加</el-button>
      </el-form>

      <!-- 修改区域表单 -->
      <el-form v-show="showUpdateAreaBox" ref="updateArea" label-width="80px" class="updateArea">
        <el-form-item label="区域名称">
          <el-input v-model="currenAreaItem.area_name" />
        </el-form-item>
        <el-form-item label="区域状态">
          <el-switch
            v-model="currenAreaItem.status"
            :data-str="currenAreaItem.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-button type="primary" @click="updateArea">保存</el-button>
      </el-form>
    </el-dialog>

    <!-- 删除区域 -->
    <el-dialog :title="deltitle" :visible.sync="deleteDialog" width="30%">
      <span>确定要删除此区域吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteArea">确定</el-button>
      </span>
    </el-dialog>
    <!-- 批量删除区域 -->
    <el-dialog title="批量删除" :visible.sync="batchdialogVisible" width="30%">
      <span class="s-title">确定要删除以下区域吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">{{item}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="multiDelete">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ShopSet",
  props: {
    merchants: { shop_id: "", merchant_id: "" },
  },
  data() {
    return {
      msg: "座位区域设置",
      placeDialogTitle: "",
      deltitle: "",
      shopInfoData: {},
      areaForm: [
        {
          area_name: "",
          id: "",
        },
      ], // 添加数据
      placeAreaData: [
        {
          area_name: "",
          id: "",
        },
      ], // 展示数据
      currenAreaItem: {
        id: "", // 当前下标
        area_name: "", // 当前行
        status: "", // 当前行
      },
      multipleSelection: "",
      curPage: 1, //删除框的标题
      total: 0, //删除框的标题
      placeDialog: false,
      showAddAreaBox: false,
      showUpdateAreaBox: false,
      deleteDialog: false,
      batchdialogVisible: false,
      search: "",
      currenDeleteRow: {},
      nameArr: [],
      placeTypeArr: [],
      placeStatusArr: [
        { text: "正常", value: 1 },
        { text: "禁用", value: 0 },
      ],
    };
  },
  created() {
    this.getPlaceAreaInfo();
  },
  methods: {
    openDelDialog(item) {
      this.currenDeleteRow = item;
      this.deleteDialog = true;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipNum_area.toggleRowSelection(row);
          this.$refs.multipNum_type.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipNum_area.clearSelection();
        this.$refs.multipNum_type.clearSelection();
      }
      console.log("num:", this.multipleSelection);
    },
    //批量删除
    batchDelete() {
      if (this.multipleSelection) {
        this.batchdialogVisible = true;
      } else {
        this.$message({
          message: "请先勾选要删除的规则",
          type: "warning",
        });
      }
    },
    /* 选择区域表的行 */
    selectArea(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.area_id);
        this.nameArr.push(item.area_name);
      });
    },
    /* 获取区域信息 */
    getPlaceAreaInfo() {
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.$store.dispatch("shop/getPlaceArea", datas).then((res) => {
        // console.log(res)
        this.placeAreaData = res.data;
        this.placeAreaData.forEach((item, index) => {
          this.placeTypeArr.push({
            text: item.area_name,
            value: item.area_name,
          });
        });
        // this.placeTypeArr
        this.total = res.count;
      });
    },
    /* 获取区域信息 */
    getTableList(page) {
      let data = { page: page };
      this.$store.dispatch("shop/getPlaceArea", data).then((res) => {
        // console.log(res)
        this.placeAreaData = res.data;
        this.placeAreaData.forEach((item, index) => {
          this.placeTypeArr.push({
            text: item.area_name,
            value: item.area_name,
          });
        });
        // this.placeTypeArr
        this.total = res.count;
      });
    },
    //table筛选
    filterTagTable(filters) {
      this.filterMethod(filters);
    },
    //table筛选
    filterMethod(val) {
      //val = val.join(',')
      var key = [];
      var value = [];
      for (var i in val) {
        key.push(i);
        value.push(val[i]);
      }
      key = key.join(",");
      value = value.join(",");
      let data = {};
      if (key == "status") {
        data = { page: this.curPage, status: value };
      } else if (key == "area_name") {
        data = { page: this.curPage, area_name: value };
      }
      this.$store.dispatch("shop/getPlaceArea", data).then((res) => {
        this.placeAreaData = res.data;
        this.total = res.count;
      });
    },
    //table排序
    sortMethod(val) {
      let order = "asc";
      this.sortStatus = !this.sortStatus;
      if (this.sortStatus) {
        order = "asc"; //正序
      } else {
        order = "desc"; //倒序
      }
      let data = { page: this.curPage, sort: val, order: order };
      this.$store.dispatch("shop/getPlaceArea", data).then((res) => {
        this.placeAreaData = res.data;
        this.total = res.count;
      });
    },
    //table排序
    sortFilterFun(column) {
      this.sortMethod(column.prop);
    },
    /* 添加按钮打开窗口 */
    addPlace() {
      this.placeDialog = true;
      this.showAddAreaBox = true;
      this.showAddTypeBox = false;
      this.showUpdateAreaBox = false;
      this.showAddTypeBox = false;
      this.placeDialogTitle = "添加位置区域";
    },
    /* 修改按钮打开窗口 */
    updateDialog(index, row) {
      this.placeDialog = true;
      this.placeDialogTitle = "修改座位区域";
      this.currenAreaItem = {
        id: row.area_id,
        area_name: row.area_name,
        status: row.status ? true : false,
      };
      // console.log('row:', row)
      // console.log('areaItem:', this.currenAreaItem)
      this.showUpdateAreaBox = true;
      this.showAddAreaBox = false;
      this.showAddTypeBox = false;
      this.showUpdateTypeBox = false;
    },
    /* 关闭窗口 */
    closeDialog() {
      this.showAddAreaBox = false;
      this.showUpdateAreaBox = false;
    },
    /* 多行删除 */
    multiDelete() {
      const data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: this.multipleSelection,
      };
      this.$store.dispatch("shop/deletePlaceArea", data).then((res) => {
        // console.log(res)
        this.getPlaceAreaInfo();
        this.batchdialogVisible = false;
      });
    },
    /* 删除单行区域 */
    deleteArea() {
      const data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: [this.currenDeleteRow.area_id],
      };
      this.$store.dispatch("shop/deletePlaceArea", data).then((res) => {
        // console.log(res)
        this.getPlaceAreaInfo();
        this.deleteDialog = false;
      });
    },
    /* 添加区域 */
    addArea() {
      const data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        area_name: this.placeAreaData.area_name,
      };
      this.$store.dispatch("shop/createPlaceArea", data).then((res) => {
        this.getPlaceAreaInfo();
        this.showAddAreaBox = true;
        this.showUpdateAreaBox = false;
        this.showAddTypeBox = false;
        this.showUpdateTypeBox = false;
        this.placeDialog = false;
      });
    },
    /* 修改区域 */
    updateArea() {
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        area_id: this.currenAreaItem.id,
        area_name: this.currenAreaItem.area_name,
        status: this.currenAreaItem.status ? 1 : 0,
      };
      this.$store.dispatch("shop/updatePlaceArea", datas).then((res) => {
        this.getPlaceAreaInfo();
        this.showAddAreaBox = true;
        this.showUpdateAreaBox = false;
        this.showAddTypeBox = false;
        this.showUpdateTypeBox = false;
        this.placeDialog = false;
      });
    },

    /* 上一页 */
    prePage() {
      this.curPage -= 1;
      this.getTableList(this.curPage);
    },
    /* 改变页数 */
    pageChange(page) {
      this.curPage = page;
      this.getTableList(this.curPage);
    },
    /* 下一页 */
    nextPage() {
      this.curPage += 1;
      this.getTableList(this.curPage);
    },
  },
};
</script>

<style lang='scss' scoped>
.search {
  position: relative;
}
.add-box {
  margin: 10px 0;
}
.pagination {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
}
.searchInput {
  float: right;
  width: 350px;
}
</style>
