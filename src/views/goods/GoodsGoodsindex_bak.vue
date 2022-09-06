<template>
  <div class="shopSet">
    <div class="page-title">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <div class="btn-nav">
        <el-button type="danger" @click="batchDelete">删除</el-button>
        <el-button type="primary" @click="addOpen">新增单品</el-button>
        <el-button type="primary" @click="addGroupOpen">新增商品套餐</el-button>
      </div>
      <div class="so-nav">
        <el-input
          class="so-ipt"
          placeholder="请输入商品名称"
          suffix-icon="el-icon-search"
          v-model="soVal"
          @change="seachFun"
        ></el-input>
        <el-button class="sosuo" type="primary" @click="seachFun"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="addClassBtn" @click="addGoodsClassOpen">新建分类</div>
    <div>
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        tab-position="left"
        @tab-click="tabFun"
      >
        <el-tab-pane
          v-for="item in GoodsClass"
          :key="item.class_id"
          :label="item.class_name"
          :name="item.class_id"
        >
          <span slot="label">
            {{ item.class_name }}
            <i
              class="edit-icon el-icon-edit-outline"
              v-show="editableTabsValue == item.class_id"
              @click="editClass(item)"
            ></i>
          </span>
          <el-table
            ref="multipleTable"
            :data="options"
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @filter-change="filterTagTable"
            @sort-change="sortFilterFun"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              prop="goods_id"
              label="全选/ID"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="商品名称"
              width="280"
            ></el-table-column>
            <el-table-column
              prop="goods_class.class_name"
              label="分类"
              width="200"
            ></el-table-column>
            <el-table-column
              prop="goods_class.class_count"
              label="规格"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="market_price"
              sortable="custom"
              label="原价"
              width="120"
            >
              <template slot-scope="scope">{{
                scope.row.market_price / 100
              }}</template>
            </el-table-column>
            <el-table-column
              prop="discount"
              sortable="custom"
              label="折扣"
              width="120"
            >
              <template slot-scope="scope">{{
                scope.row.discount / 100
              }}</template>
            </el-table-column>
            <el-table-column
              prop="price"
              sortable="custom"
              label="现价"
              width="120"
            >
              <template slot-scope="scope">{{
                scope.row.price / 100
              }}</template>
            </el-table-column>
            <el-table-column
              prop="sort"
              sortable="custom"
              label="排序"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              :filter-multiple="false"
              :filters="statusArr"
              filter-placement="bottom-end"
              :column-key="'status'"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0">下架</span>
                <span v-else-if="scope.row.status == 1">售完</span>
                <span v-else-if="scope.row.status == 2">正常</span>
                <span v-else-if="scope.row.status == 3">删除</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >查看/编辑</el-button
                >
                <el-button @click="delClick(scope.row)" type="text" size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="pagination">
      <el-pagination
        :current-page="page"
        :hide-on-single-page="true"
        @current-change="pageChange"
        background
        layout="prev, pager, next"
        :total="count"
      ></el-pagination>
    </div>
    <!-- 编辑分类 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="classForm"
        :rules="rules"
        ref="classForm"
        label-width="150px"
        class="demo-classForm"
      >
        <el-form-item label="分类名称" prop="class_name">
          <el-input v-model="classForm.class_name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="class_sort">
          <el-input v-model="classForm.class_sort"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="classForm.status"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="delClass(classForm.class_id, classForm.class_name)"
            >删除分类</el-button
          >
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm('classForm')"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增分类 -->
    <el-dialog
      title="新增商品分类"
      :visible.sync="dialogVisibleAdd"
      width="30%"
    >
      <el-form
        :model="classFormAdd"
        :rules="rules"
        ref="classFormAdd"
        label-width="150px"
        class="demo-classForm"
      >
        <el-form-item label="分类名称" prop="class_name">
          <el-input v-model="classFormAdd.class_name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="class_sort">
          <el-input v-model="classFormAdd.class_sort"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="classFormAdd.status"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormAdd('classFormAdd')"
            >添加</el-button
          >
          <el-button @click="resetForm('classFormAdd')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 删除商品 -->
    <el-dialog :title="deltitle" :visible.sync="deldialogVisible" width="30%">
      <span>确定要删除此商品吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deldialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelFun">确定</el-button>
      </span>
    </el-dialog>
    <!-- 批量删除 -->
    <el-dialog title="批量删除" :visible.sync="batchdialogVisible" width="30%">
      <span class="s-title">确定要删除以下商品吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
        {{ item }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelbatch">确定</el-button>
      </span>
    </el-dialog>
    <!-- 删除分类 -->
    <el-dialog
      :title="delClasstitle"
      :visible.sync="deldialogClass"
      width="30%"
    >
      <span>确定要删除此分类吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deldialogClass = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelClassFun">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Goods",
  data() {
    return {
      pageSign: 0,
      soVal: "",
      options: [],
      multipleSelection: "",
      value: true,
      page: 1,
      count: 0,
      detaileData: [],
      dialogVisible: false,
      title: "",
      goods_id: 0,
      sortStatus: false,
      // 商家/店铺ID
      merchants: {
        shop_id: 0,
        merchant_id: 0,
      },
      dataForm: {
        goods_id: 0,
        name: "",
        price: 0,
        vip_price: 0,
        unit: "",
        image: "",
        images: "", //商品是否多图 0否 1是
        status: 0,
      },
      rules: {
        class_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      classFormAdd: {
        class_name: "",
        class_sort: "",
        status: 1,
      },
      classForm: {
        class_id: 0,
        class_name: "",
        class_sort: "",
        status: false,
      },
      deldialogVisible: false,
      deldialogClass: false,
      delClasstitle: "",
      deltitle: "",
      dialogVisibleAdd: false,
      dataFormAdd: {
        name: "",
        price: 0,
        vip_price: 0,
        unit: "",
        image: "",
        images: "", //商品是否多图 0否 1是
        status: 0,
      },
      batchdialogVisible: false,
      nameArr: [],
      statusArr: [
        { text: "下架", value: "0" },
        { text: "售完", value: "1" },
        { text: "正常", value: "2" },
        { text: "删除", value: "3" },
      ],
      order: "asc",
      sortVal: "",
      GoodsClass: [],
      class_id: 0,
      editableTabsValue: "52",
    };
  },
  created() {
    if (this.$route.query.shop_id && this.$route.query.merchant_id) {
      this.merchants.shop_id = Number(this.$route.query.shop_id);
      this.merchants.merchant_id = Number(this.$route.query.merchant_id);
      /* 把店铺商家ID数据存入VUEX */
      this.$store.dispatch("updateVuex", {
        key: "merchantsData",
        value: this.merchants,
      });
    } else {
      var dpID = this.$store.state.merchantsData;
      this.merchants.shop_id = Number(dpID.shop_id);
      this.merchants.merchant_id = Number(dpID.merchant_id);
    }
    this.getGoodsClass(() => {
      this.getGoodsList();
    });
  },
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
      this.sortStatus = value;
      if (key == "status" && value) {
        this.filterGetGoodsList();
      } else {
        this.getGoodsList();
      }
    },
    filterGetGoodsList() {
      this.pageSign = 2;
      let data = {
        page: this.page,
        status: this.sortStatus,
        class_id: this.class_id,
      };
      this.$store.dispatch("goods/getGoodsList", data).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
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
      this.sortDataFun();
    },
    //table排序
    sortFilterFun(column) {
      this.sortMethod(column.prop);
    },
    sortDataFun() {
      this.pageSign = 3;
      let data = {
        page: this.page,
        sort: this.sortVal,
        order: this.order,
        class_id: this.class_id,
      };
      this.$store.dispatch("goods/getGoodsList", data).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
    },
    tabFun() {
      this.class_id = Number(this.editableTabsValue);
      this.getGoodsList();
    },
    // 获取商品列表
    getGoodsList() {
      this.pageSign = 0;
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page: this.page,
        class_id: this.class_id,
      };
      this.$store.dispatch("goods/getGoodsList", datas).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
    },
    //查看、修改商品
    handleClick(row) {
      if (row.is_combo == 0) {
        this.$router.push({
          path: "/goods/editGoods?goods_id=" + row.goods_id,
          query: {
            shop_id: this.merchants.merchant_id,
            merchant_id: this.merchants.shop_id,
          },
        });
      } else {
        this.$router.push({
          path: "/goods/editGroupGoods?goods_id=" + row.goods_id,
          query: {
            shop_id: this.merchants.merchant_id,
            merchant_id: this.merchants.shop_id,
          },
        });
      }
    },
    //新增商品
    addOpen() {
      this.$router.push({
        path: "/goods/addGoods",
        query: {
          shop_id: this.merchants.merchant_id,
          merchant_id: this.merchants.shop_id,
        },
      });
    },
    //新增商品套餐
    addGroupOpen() {
      this.$router.push({
        path: "/goods/addGroupGoods",
        query: {
          shop_id: this.merchants.merchant_id,
          merchant_id: this.merchants.shop_id,
        },
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //删除
    delClick(row) {
      this.deldialogVisible = true;
      this.goods_id = row.goods_id;
      this.deltitle = "删除-" + row.name;
    },
    //确认删除
    confirmDelFun() {
      let arr = [];
      arr.push(this.goods_id);
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: arr,
      };
      this.$store.dispatch("goods/deleteGoods", datas).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.getGoodsList();
        this.deldialogVisible = false;
      });
    },
    //批量删除
    batchDelete() {
      if (this.multipleSelection) {
        this.batchdialogVisible = true;
      } else {
        this.$message({
          message: "请先勾选要删除的分类",
          type: "warning",
        });
      }
    },
    //确认批量删除
    confirmDelbatch() {
      console.log("23", this.multipleSelection);
      const datas = {
        id: this.multipleSelection,
      };
      this.$store.dispatch("goods/deleteGoods", datas).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.getGoodsList();
        this.batchdialogVisible = false;
      });
    },
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
    },
    pageChange(val) {
      this.page = val;
      if (this.pageSign == 0) {
        this.getGoodsList();
      } else if (this.pageSign == 1) {
        this.seachFun();
      } else if (this.pageSign == 2) {
        this.filterGetGoodsList();
      } else if (this.pageSign == 3) {
        this.sortDataFun();
      }
    },
    seachFun() {
      this.pageSign = 1;
      const datas = {
        page: this.page,
        name: this.soVal,
      };
      this.$store.dispatch("goods/getGoodsList", datas).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
    },
    // 获取分类列表
    getGoodsClass(fun) {
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.$store.dispatch("goods/getGoodsClass", datas).then((res) => {
        /* 把分类数据存入VUEX */
        this.$store.dispatch("updateVuex", {
          key: "classification",
          value: res.data,
        });
        this.GoodsClass = res.data;
        this.GoodsClass.forEach((item, index) => {
          if (index == 0) {
            this.class_id = item.class_id;
            this.editableTabsValue = item.class_id + "";
          }
          item.class_id = String(item.class_id);
          let obj = item;
          obj.name = index + 1 + "";
        });
        fun();
      });
    },
    //查看、修改商品分类
    editClass(row) {
      this.classForm = row;
      if (this.classForm.status == 1) {
        this.classForm.status = true;
      } else {
        this.classForm.status = false;
      }
      this.dialogVisible = true;
      this.title = "编辑-" + this.classForm.class_name;
    },
    //修改提交商品分类
    submitForm(formName) {
      //this.dialogVisible = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.classForm.status == true) {
            this.classForm.status = 1;
          } else {
            this.classForm.status = 0;
          }
          delete this.classForm.name;
          this.classForm.class_sort = Number(this.classForm.class_sort);
          this.classForm.class_id = Number(this.classForm.class_id);
          const datas = {
            merchant_id: this.merchants.merchant_id,
            shop_id: this.merchants.shop_id,
            class_id: this.classForm.class_id,
            class_name: this.classForm.class_name,
            class_sort: this.classForm.class_sort,
            status: this.classForm.status,
          };
          this.$store.dispatch("goods/updateGoodsClass", datas).then((res) => {
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
            this.getGoodsClass();
            this.dialogVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增商品分类弹框
    addGoodsClassOpen() {
      this.dialogVisibleAdd = true;
    },
    //新增商品分类
    submitFormAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.classFormAdd.class_sort = Number(this.classFormAdd.class_sort);
          if (this.classFormAdd.status == true) {
            this.classFormAdd.status = 1;
          } else {
            this.classFormAdd.status = 0;
          }
          const datas = {
            merchant_id: this.merchants.merchant_id,
            shop_id: this.merchants.shop_id,
            class_name: this.classFormAdd.class_name,
            class_sort: this.classFormAdd.class_sort,
            status: this.classFormAdd.status,
          };
          this.$store.dispatch("goods/addGoodsClass", datas).then((res) => {
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
            this.getGoodsClass();
            this.dialogVisibleAdd = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除分类
    delClass(class_id, name) {
      this.deldialogClass = true;
      this.class_id = class_id;
      this.delClasstitle = name;
    },
    //确认删除分类(废弃)
    confirmDelClassFunBSY() {
      // var arr = [];
      // arr = this.class_id.split(",");
      // arr = arr.map((i) => parseInt(i, 0));
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: this.class_id,
      };
      this.$store.dispatch("goods/deleteGoodsClass", datas).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.getGoodsClass();
        this.deldialogClass = false;
        this.dialogVisible = false;
      });
    },
    //确认删除分类
    confirmDelClassFun() {
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: this.class_id,
      };
      this.$store.dispatch("goods/deleteGoodsClass", datas).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.getGoodsClass();
        this.deldialogClass = false;
        this.dialogVisible = false;
      });
    },
  },
};
</script>

<style scoped>
.shopSet {
  margin: 15px;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #dfdfdf;
}
.add-box {
  margin: 10px 0;
  display: flex;
}
.s-title {
  font-size: 14px;
  font-weight: bold;
}
.gz-name {
  padding-top: 10px;
}
.btn-nav {
  flex: 1;
  display: flex;
}
.so-nav {
  width: 350px;
  display: flex;
}
.sosuo {
  margin-left: 10px;
}
.so-ipt {
  border-color: #cecece;
}
.el-input__suffix {
  color: #000 !important;
  font-weight: bold;
}
.pagination {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
}
.el-button--text {
  color: #0a0a0a;
}
.addClassBtn {
  margin-left: 22px;
  width: 104px;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: #dda100;
  margin-bottom: 10px;
  text-align: center;
  border-radius: 25px;
  background: #fff6df;
  border: 1px solid #ffbe11;
}
.shopSet >>> .el-tabs__item.is-active {
  color: #0a0a0a;
}
.shopSet >>> .el-tabs__item:hover {
  color: #0a0a0a;
}
.edit-icon {
  margin-left: 6px;
  color: #dda100;
}
.shopSet >>> .el-tabs--left .el-tabs__header.is-left {
  width: 150px;
}
.shopSet >>> .el-tabs--left.el-tabs--card .el-tabs__nav {
  border-bottom: none;
}
</style>
