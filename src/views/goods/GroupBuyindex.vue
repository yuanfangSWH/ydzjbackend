<template>
  <div class="shopSet">
    <div class="page-title">{{this._getVuex('pageTitle')}}</div>
    <div class="add-box">
      <div class="btn-nav">
        <el-button type="danger" @click="batchDelete">删除</el-button>
        <el-button type="primary" @click="addOpen">新增</el-button>
      </div>
      <div class="so-nav">
        <el-input
          class="so-ipt"
          placeholder="请输入套餐名"
          suffix-icon="el-icon-search"
          v-model="soVal"
          @change="seachFun"
        ></el-input>
        <el-button class="sosuo" type="primary">搜索</el-button>
      </div>
    </div>
    <div>
      <el-tabs v-model="editableTabsValue" type="card" tab-position="left" @tab-click="tabFun">
        <el-tab-pane :key="index" v-for="(item, index) in PlaceType" :name="item.type_id">
          <span slot="label">{{item.name}}</span>
          <el-table
            ref="multipleTable"
            :data="options"
            stripe
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @sort-change="sortFilterFun"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column fixed prop="gb_id" label="全选/ID" width="150"></el-table-column>
            <el-table-column prop="title" label="名称" width="300">
              <template slot-scope="scope">
                <div class="imgnav">
                  <el-image
                    class="groupBuyImg"
                    style="width: 50px; height: 50px"
                    :src="scope.row.image"
                    fit="fill"
                  ></el-image>
                  <span class="title-s">{{scope.row.title}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="total_price" sortable="custom" label="价格" width="90">
              <template slot-scope="scope">
                <div class="yellow-t">{{scope.row.total_price/100}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="sales" sortable="custom" label="近30天销售" width="150">
              <template slot-scope="scope">
                <div class="green-t">{{scope.row.sales}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" sortable="custom" label="发布时间" width="180"></el-table-column>
            <el-table-column prop="expire_time" sortable="custom" label="到期时间"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <div style="margin-bottom: 10px">
                  <el-button @click="packageTK(scope.row)" size="mini">查看套餐组合</el-button>
                </div>
                <div></div>
                <el-button @click="handleClick(scope.row)" size="mini">编辑</el-button>
                <el-button @click="delClick(scope.row)" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="pagebox">
      <el-pagination
        :hide-on-single-page="value"
        background
        layout="prev, pager, next"
        :total="count"
        @current-change="pageChange"
      ></el-pagination>
    </div>
    <!-- 套餐弹框 -->
    <el-dialog  :visible.sync="packageVisible" width="30%">
       <el-table
            :data="packageData"
            stripe
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column prop="goods_name" sortable="custom" label="商品名称" width="180"></el-table-column>
            <el-table-column prop="goods_num" sortable="custom" label="数量" width="180"></el-table-column>
            <el-table-column prop="goods_unit" sortable="custom" label="单位" width="180"></el-table-column>
            <el-table-column prop="goods_price" sortable="custom" label="价格" width="180"></el-table-column>
          </el-table>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog :title="deltitle" :visible.sync="deldialogVisible" width="30%">
      <span>确定要删除此套餐吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deldialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelFun">确定</el-button>
      </span>
    </el-dialog>
    <!-- 批量删除 -->
    <el-dialog title="批量删除" :visible.sync="batchdialogVisible" width="30%">
      <span class="s-title">确定要删除以下套餐吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">{{item}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelbatch">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "GroupBuy",
  data() {
    return {
      packageVisible:false,
      pageSign: 0,
      soVal: "",
      options: [],
      multipleSelection: "",
      value: true,
      page: 1,
      count: 0,
      detaileData: [],
      title: "",
      gb_id: 0,
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
        type_id: 0,
        class_name: "",
        class_sort: "",
        status: false,
      },
      deldialogVisible: false,
      deltitle: "",
      dialogVisibleAdd: false,
      deldialogClass: false,
      delClasstitle: "",
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
      order: "asc",
      sortVal: "",
      sortStatus: false,
      PlaceType: [],
      type_id: 0,
      editableTabsValue: "1",
      // 商家/店铺ID
      merchants: {
        shop_id: 0,
        merchant_id: 0,
      },
      //套餐弹框数据
      packageData:""
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
    this.getPlaceType(() => {
      this.getGroupBuyList();
    });
  },
  methods: {
    //打开套餐弹框
    packageTK(row){
      this.packageData=row.goods_detail;
      this.packageVisible=true;
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
      this.pageSign = 2;
      let datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page: this.page,
        sort: this.sortVal,
        order: this.order,
        type_id: this.type_id,
      };
      this.$store.dispatch("goods/getGroupBuyList", datas).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
    },
    //查看、修改
    handleClick(row) {
      this.$router.push({
        path: "/GroupBuyindex/editGroupBuy?gb_id=" + row.gb_id,
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
      this.gb_id = row.gb_id;
      this.deltitle = "删除-" + row.title;
    },
    //确认删除
    confirmDelFun() {
      let idArr = [];
      idArr.push(this.gb_id);
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: idArr,
      };
      this.$store.dispatch("goods/deleteGroupBuy", datas).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.getGroupBuyList();
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
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: this.multipleSelection,
      };
      this.$store.dispatch("goods/deleteGroupBuy", datas).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.getGroupBuyList();
        this.batchdialogVisible = false;
      });
    },
    //新增商品
    addOpen() {
      this.$router.push({
        path: "/GroupBuyindex/addGroupBuy",
        query: {
          shop_id: this.merchants.merchant_id,
          merchant_id: this.merchants.shop_id,
        },
      });
    },
    // 获取商品列表
    getGroupBuyList() {
      this.pageSign = 0;
      const datas = {
        shop_id: this.merchants.merchant_id,
        merchant_id: this.merchants.shop_id,
        page: this.page,
        type_id: this.type_id,
      };
      this.$store.dispatch("goods/getGroupBuyList", datas).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
    },
    handleSelectionChange(val) {
      // console.log(val)
      var arr = [];
      for (var i = 0; i < val.length; i++) {
        arr.push(val[i].gb_id);
        this.nameArr.push(val[i].title);
      }
      arr = Array.from(new Set(arr));
      this.nameArr = Array.from(new Set(this.nameArr));
      this.multipleSelection = arr;
    },
    pageChange(val) {
      this.page = val;
      if (this.pageSign == 0) {
        this.getGroupBuyList();
      } else if (this.pageSign == 1) {
        this.seachFun();
      } else if (this.pageSign == 2) {
        this.sortDataFun();
      }
    },
    seachFun() {
      this.pageSign = 1;
      const datas = {
        page: this.page,
        title: this.soVal,
      };
      this.$store.dispatch("goods/getGroupBuyList", datas).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
    },
    // 获取座位类型列表
    getPlaceType(fun) {
      const data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.api.shop.getPlaceType(data).then((res) => {
        this.PlaceType = res.data.data;
        this.PlaceType.forEach((item, index) => {
          if (index == 0) {
            this.type_id = item.type_id;
            this.editableTabsValue = item.type_id + "";
          }
          item.type_id = String(item.type_id);
        });
        fun();
      });
    },
    tabFun() {
      this.type_id = Number(this.editableTabsValue);
      this.getGroupBuyList();
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
.pagebox {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
.imgnav {
  display: flex;
  align-items: center;
  line-height: 50px;
}
.groupBuyImg {
  width: 50px;
  height: 50px;
  background-color: #eeeeee;
  display: inline-block;
  border: 1px solid #dfdfdf;
}
.title-s {
  margin-left: 10px;
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
