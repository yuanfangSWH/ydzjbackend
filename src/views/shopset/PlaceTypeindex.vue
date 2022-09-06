<template>
  <div class="shopSet">
    <div class="add-box">
      <el-button type="danger" @click="batchDelete" :disabled="!multipleSelection.length>0">删除</el-button>
      <el-button type="primary" @click="addPlace()">新增</el-button>
    </div>
    <el-table
      ref="multipNum_type"
      stripe
      :data="placeTypeData"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selectType"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="全选/ID" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
          <span>{{ scope.row.type_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="类型名称" width="150" />
      <el-table-column prop label="订金" width="150">
        <template slot-scope="scope">{{scope.row.deposit/100}}</template>
      </el-table-column>
      <el-table-column prop label="低消" width="150">
        <template slot-scope="scope">{{scope.row.basic_price/100}}</template>
      </el-table-column>
      <el-table-column prop="static" label="状态" width="150">
        <template>
          <i class="el-icon-check"></i>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作">
        <!-- <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" :data-str="scope" />
        </template>-->
        <template slot-scope="scope">
          <el-button size="mini" @click="updateDialog(scope.$index, JSON.parse(JSON.stringify(scope.row)),'type')">修改</el-button>
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
      <!-- 添加类型表单 -->
      <el-form v-show="showAddTypeBox" ref="addType" label-width="80px" class="addType">
        <el-form-item label="类型名称">
          <el-input v-model="typeForm.name" />
        </el-form-item>
        <el-form-item label="低消">
          <el-input v-model="typeForm.basic_price" />
        </el-form-item>
        <el-form-item label="订金">
          <el-input v-model="typeForm.deposit" />
        </el-form-item>
        <el-button type="primary" @click="addType">添加</el-button>
      </el-form>

      <!-- 修改类型表单 -->
      <el-form v-show="showUpdateTypeBox" ref="updateType" label-width="80px" class="updateType">
        <el-form-item label="类型名称">
          <el-input v-model="currenTypeItem.name" />
        </el-form-item>
        <el-form-item label="低消">
          <el-input v-model="currenTypeItem.basic_price" />
        </el-form-item>
        <el-form-item label="订金">
          <el-input v-model="currenTypeItem.deposit" />
        </el-form-item>
        <el-button type="primary" @click="updateType">保存</el-button>
      </el-form>
    </el-dialog>

    <!-- 删除类型 -->
    <el-dialog :title="deltitle" :visible.sync="deleteDialog" width="30%">
      <span>确定要删除此类型吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteType">确定</el-button>
      </span>
    </el-dialog>
    <!-- 批量删规类型 -->
    <el-dialog title="批量删除" :visible.sync="batchdialogVisible" width="30%">
      <span class="s-title">确定要删除以下类型吗?</span>
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
      msg: "座位类型设置",
      placeDialogTitle: "",
      deltitle: "",
      shopInfoData: {},
      placeTypeData: [
        {
          type_id: "",
          name: "",
          min_people_num: "",
          max_people_num: "",
          basic_price: "",
          deposit: "",
          sort: "",
        },
      ], // 展示数据
      typeForm: {
        type_id: "",
        name: "",
        min_people_num: "",
        max_people_num: "",
        basic_price: "",
        deposit: "",
        sort: "",
      }, // 添加数据
      currenTypeItem: {
        type_id: "",
        name: "",
        min_people_num: "",
        max_people_num: "",
        basic_price: "",
        deposit: "",
        sort: "",
      },
      placeDialog: false,
      showAddTypeBox: false,
      showUpdateTypeBox: false,
      deleteDialog: false,
      batchdialogVisible: false,
      search: "",
      curPage: 1, //删除框的标题
      total: 0, //删除框的标题
      currenDeleteRow: {},
      nameArr: [],
      multipleSelection:[],
    };
  },
  created() {
    this.getPlaceTypeInfo();
  },
  methods: {
    openDelDialog(item) {
      this.currenDeleteRow = item;
      this.deleteDialog = true;
    },
    /* 选择类型表的行 */
    selectType(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.type_id);
        this.nameArr.push(item.name);
      });
      console.log("nameArr:", this.nameArr);
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
    /* 获取类型信息 */
    getPlaceTypeInfo() {
      const data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.api.shop.getPlaceType(data).then((res) => {
        this.placeTypeData = res.data.data;
      });
    },
    /* 添加按钮打开窗口 */
    addPlace() {
      this.placeDialog = true;
      this.showAddTypeBox = true;
      // this.showAddAreaBox = false
      // this.showUpdateAreaBox = false
      this.showUpdateTypeBox = false;
      this.placeDialogTitle = "添加位置类型";
    },
    /* 修改按钮打开窗口 */
    updateDialog(index, row) {
      this.placeDialog = true;
      this.currenTypeItem = {
        type_id: row.type_id,
        name: row.name,
        min_people_num: row.min_people_num,
        max_people_num: row.max_people_num,
        basic_price: row.basic_price / 100,
        deposit: row.deposit / 100,
        sort: row.sort,
      };
      // console.log('areaItem:', this.currenTypeItem)
      this.showUpdateTypeBox = true;
      // this.showAddAreaBox = false
      // this.showUpdateAreaBox = false
      this.showAddTypeBox = false;
    },
    /* 添加类型 */
    addType() {
      console.log(this.typeForm);
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        name: this.typeForm.name,
        basic_price: parseInt(this.typeForm.basic_price) * 100,
        deposit: parseInt(this.typeForm.deposit) * 100,
      }; // 添加数据
      this.$store.dispatch("shop/createPlaceType", datas).then((res) => {
        this.getPlaceTypeInfo();
        // this.showAddAreaBox = false
        // this.showUpdateAreaBox = false
        this.showAddTypeBox = false;
        this.showUpdateTypeBox = true;
        this.placeDialog = false;
      });
    },
    /* 修改类型 */
    updateType() {
      const data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        type_id: this.currenTypeItem.type_id,
        name: this.currenTypeItem.name,
        min_people_num: this.currenTypeItem.min_people_num,
        max_people_num: this.currenTypeItem.max_people_num,
        basic_price: this.currenTypeItem.basic_price * 100,
        deposit: this.currenTypeItem.deposit * 100,
        place_sort: this.currenTypeItem.place_sort,
      };
      this.$store.dispatch("shop/updatePlaceType", data).then((res) => {
        this.getPlaceTypeInfo();
        this.showAddAreaBox = true;
        this.showUpdateAreaBox = false;
        this.showAddTypeBox = false;
        this.showUpdateTypeBox = false;
        this.placeDialog = false;
      });
    },
    /* 多行删除 */
    multiDelete() {
      const data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: this.multipleSelection,
      };
      this.$store.dispatch("shop/deletePlaceType", data).then((res) => {
        // console.log(res)
        this.getPlaceTypeInfo();
        this.batchdialogVisible = false;
      });
    },
    /* 删除单行类型 */
    deleteType() {
      const data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: [this.currenDeleteRow.type_id],
      };
      this.$store.dispatch("shop/deletePlaceType", data).then((res) => {
        // console.log(res)
        this.getPlaceTypeInfo();
        this.deleteDialog = false;
      });
    },
    /* 关闭窗口 */
    closeDialog() {
      this.showAddTypeBox = false;
      this.showUpdateTypeBox = false;
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
.shopSet {
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
}
</style>
