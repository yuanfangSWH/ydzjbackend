<template>
  <div class="shopSet">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-alert
          v-if="PlaceType.length == 0"
          title="目前没有座位的分类信息，请先去新增座位的分类信息……"
          type="warning"
          :closable="false"
        >
        </el-alert>

        <el-card :shadow="type_id == 0 ? 'never' : 'always'"
          ><div
            :class="
              'goods-class-list-left' +
              (type_id == 0 ? ' goods-class-list-selected' : '')
            "
            @click="tabFun(0)"
          >
            <i class="el-icon-folder-opened">显示全部</i>
          </div>
        </el-card>

        <el-card
          v-for="(item, index) in PlaceType"
          :key="'placeType_' + index"
          :shadow="type_id == item.type_id ? 'never' : 'always'"
        >
          <div
            @click="tabFun(item.type_id)"
            :style="{ color: item.status == 0 ? '#ccc' : '' }"
            :class="
              'goods-class-list-left' +
              (type_id == item.type_id ? ' goods-class-list-selected' : '')
            "
          >
            {{ item.name }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="20">
        <div class="add-box">
          <div class="btn-nav">
            <el-button type="warning" plain @click="handleGroupBox"
              >返回</el-button
            >
            <el-button type="primary" @click="addOpen">新增套餐</el-button>
          </div>
          <div class="so-nav">
            <div class="btnBox">
              <div class="g-btn jia-btn" @click="putawayFun(1)">上架</div>
              <div class="g-btn jia-btn" @click="putawayFun(0)">下架</div>
              <div class="g-btn" @click="batchDelete">删除</div>
            </div>
            <el-input
              class="so-ipt"
              placeholder="请输入套餐名"
              suffix-icon="el-icon-search"
              v-model="soVal"
              @change="seachFun"
            >
            </el-input>
            <el-button class="sosuo" type="primary" @click="seachFun"
              >搜索</el-button
            >
          </div>
        </div>
        <el-tabs type="border-card" v-model="tabStatus" @tab-click="oneTabFun">
          <el-tab-pane label="已上架套餐">
            <div>
              <groupbuy-item
                :options="options"
                :merchants="merchants"
                @childFun="parentFun"
                @edit="editGroupBuyOpenAndClose"
              ></groupbuy-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已下架套餐">
            <div>
              <groupbuy-item
                :options="options"
                :merchants="merchants"
                @childFun="parentFun"
                @edit="editGroupBuyOpenAndClose"
              ></groupbuy-item>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="pagebox">
          <el-pagination
            ref="pagination"
            :hide-on-single-page="true"
            background
            layout="prev, pager, next,jumper"
            :total="count"
            @current-change="pageChange"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <div></div>

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
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
        {{ item }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelbatch">确定</el-button>
      </span>
    </el-dialog>

    <!--添加新套餐-->
    <el-dialog
      title="添加套餐"
      :visible.sync="addGroupBuyDialogVisible"
      destroy-on-close
      :close-on-click-modal="false"
      width="70%"
    >
      <add-group-buy
        :merchants="merchants"
        :place-type="PlaceType"
        :type_id="type_id"
        @close="addGroupBuyOpenAndClose"
        @reload="getGroupBuyList"
      />
    </el-dialog>
    <!--编辑套餐-->
    <el-dialog
      title="编辑套餐"
      :visible.sync="editGroupBuyDialogVisible"
      destroy-on-close
      :close-on-click-modal="false"
      width="70%"
      @opened="showEditGroupBy"
    >
      <edit-group-buy
        ref="editGroupBuyRef"
        :merchants="merchants"
        :place-type="PlaceType"
        @close="editGroupBuyOpenAndClose"
        @reload="getGroupBuyList"
      />
    </el-dialog>
  </div>
</template>

<script>
import groupbuyItem from "./GroubuyItem";
import addGroupBuy from "./addGroupBuy";
import editGroupBuy from "./editGroupBuy";

export default {
  name: "GroupBuy",
  components: {
    groupbuyItem,
    addGroupBuy,
    editGroupBuy,
  },
  props: {
    enable: {
      type: Boolean,
      default: false,
    },
    merchants: {
      type: Object,
    },
  },
  data() {
    return {
      groupByData: {}, //需要编辑的套餐数据
      addGroupBuyDialogVisible: false, //添加新套餐弹出框
      editGroupBuyDialogVisible: false, //编辑套餐弹出框
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
      tabStatus: "0",
      group_status: 1, //默认查看已上架
    };
  },
  watch: {
    enable: {
      immediate: true,
      handler(val) {
        if (val) {
          this.reloadData();
        }
      },
    },
  },
  created() {},
  methods: {
    handleGroupBox() {
      this.$emit("handleGroupBox");
    },
    addOpen() {
      if (this.PlaceType.length > 0) {
        this.addGroupBuyOpenAndClose();
      } else {
        this.$message({
          message:
            "目前没有座位的分类信息，请先去新增座位的分类信息才能继续操作。",
          type: "warning",
          duration: 8000,
          showClose: true,
        });
        return;
      }
    },
    addGroupBuyOpenAndClose(isReload) {
      this.addGroupBuyDialogVisible = !this.addGroupBuyDialogVisible;
      if (isReload === true) {
        this.getGroupBuyList();
      }
    },

    //弹出窗口完全渲染后执行
    showEditGroupBy() {
      const datas = {
        shop_id: this.merchants.merchant_id,
        merchant_id: this.merchants.shop_id,
        id: this.groupByData.gb_id,
      };
      this.$refs["editGroupBuyRef"].getGroudbuyDetaile(datas);
    },
    editGroupBuyOpenAndClose(row, isReload) {
      this.groupByData = row;
      this.editGroupBuyDialogVisible = !this.editGroupBuyDialogVisible;
      if (isReload === true) {
        this.getGroupBuyList();
      }
    },
    reloadData() {
      console.info("重载数据...");
      this.getPlaceType(() => {
        this.getGroupBuyList();
      });
    },
    parentFun(Val, order, key, n) {
      if (n == 1) {
        //排序
        this.sortVal = Val;
        this.order = order;
        this.sortDataFun();
        // }else if(n == 2){//筛选
        //   this.f_status = Val
        //   if(key=='status' && Val){
        //     this.filterGetGoodsList()
        //   }else{
        //     this.getGroupBuyList()
        //   }
      } else if (n == 3) {
        //删除单个套餐
        this.deldialogVisible = true;
        this.gb_id = Val;
        this.deltitle = key;
      } else if (n == 4) {
        //删除多个套餐
        if (Val.length == 0) {
          this.multipleSelection = "";
          this.nameArr = [];
        } else {
          this.multipleSelection = Val;
          this.nameArr = key;
        }
      }
    },
    //table排序
    // sortMethod(val) {
    //   this.sortVal = val
    //   this.sortStatus = !this.sortStatus
    //   if(this.sortStatus){
    //     this.order='asc'//正序
    //   }else{
    //     this.order='desc'//倒序
    //   }
    //   //接口逻辑
    //   this.sortDataFun()
    // },
    // //table排序
    // sortFilterFun(column) {
    //   this.sortMethod(column.prop)
    // },
    sortDataFun() {
      this.pageSign = 2;
      let datas = {
        page: this.page,
        sort: this.sortVal,
        order: this.order,
        type_id: this.type_id,
        status: this.group_status,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      if (this.type_id == 0) {
        delete datas.type_id;
      }
      this.$store.dispatch("goods/getGroupBuyList", datas).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
    },
    //查看、修改
    handleClick(row) {
      this.$router.push({
        path: "/goods/editGroupBuy",
        qeruy: {
          gb_id: row.gb_id,
          merchant_id: this.merchants.merchant_id,
          shop_id: this.merchants.shop_id,
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
        id: idArr,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
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
        id: this.multipleSelection,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
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
    // 批量上下架
    putawayFun(n) {
      let k = n;
      if (this.multipleSelection.length > 0) {
        const datas = {
          gb_id: this.multipleSelection,
          status: Number(n),
          merchant_id: this.merchants.merchant_id,
          shop_id: this.merchants.shop_id,
        };
        //this.$store.dispatch("goods/goodsUpDown", datas).then((res) => {
        this.api.goods.groupUpDown(datas).then(({ data }) => {
          let res = data;
          this.$message({
            message: "" + res.msg,
            type: "success",
          });
          if (k == 1) {
            this.tabStatus = "0";
          }
          this.getGroupBuyList();
          this.batchdialogVisible = false;
        });
      } else {
        this.$message({
          message: "请先勾选要操作的商品",
          type: "warning",
        });
      }
    },
    // 获取商品列表
    getGroupBuyList() {
      this.addGroupBuyDialogVisible = false;
      this.editGroupBuyDialogVisible = false;
      this.pageSign = 0;
      this.group_status = 1;
      const datas = {
        page: this.page,
        type_id: this.type_id,
        status: this.group_status,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      if (this.type_id == 0) {
        delete datas.type_id;
      }
      this.$store.dispatch("goods/getGroupBuyList", datas).then((res) => {
        this.options = res.data;
        this.count = res.count;
        this.$refs.pagination.internalCurrentPage = this.page;
      });
    },
    // 获取已下架商品列表
    getSoldOutList() {
      this.pageSign = 3;
      this.group_status = 0;
      const datas = {
        page: this.page,
        type_id: this.type_id,
        status: this.group_status,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      if (this.type_id == 0) {
        delete datas.type_id;
      }
      this.$store.dispatch("goods/getGroupBuyList", datas).then((res) => {
        this.options = res.data;
        this.count = res.count;
        this.$refs.pagination.internalCurrentPage = this.page;
      });
    },
    // handleSelectionChange(val) {
    //     // console.log(val)
    //   var arr=[]
    //   for(var i=0; i<val.length; i++){
    //     arr.push(val[i].gb_id)
    //     this.nameArr.push(val[i].title)
    //   }
    //   arr = Array.from(new Set(arr))
    //   this.nameArr = Array.from(new Set(this.nameArr))
    //   this.multipleSelection = arr
    // },
    pageChange(val) {
      this.page = val;
      if (this.pageSign == 0) {
        this.getGroupBuyList();
      } else if (this.pageSign == 1) {
        this.seachFun();
      } else if (this.pageSign == 2) {
        this.sortDataFun();
      } else if (this.pageSign == 3) {
        this.getSoldOutList();
      }
    },
    seachFun() {
      this.pageSign = 1;
      const datas = {
        page: this.page,
        title: this.soVal,
        type_id: this.type_id,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      if (this.type_id == 0) {
        delete datas.type_id;
      }
      this.$store.dispatch("goods/getGroupBuyList", datas).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
    },
    // 获取座位类型列表
    getPlaceType(fun) {
      const datas = {
        page_size: 10000,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      //this.$store.dispatch("shop/getPlaceType", datas).then((res) => {
      this.api.shop.getPlaceType(datas).then(({ data }) => {
        let res = data;
        this.PlaceType = res.data;
        // this.PlaceType.forEach((item, index) => {
        //   if (index == 0) {
        //     this.type_id = item.type_id;
        //     this.editableTabsValue = item.type_id + "";
        //   }
        //   item.type_id = String(item.type_id);
        //   // let obj = item
        //   // obj.name = index + 1 + ''
        // });
        fun();
      });
    },
    tabFun(type_id) {
      this.type_id = Number(type_id);
      this.page = 1;
      if (this.tabStatus == "1") {
        // 已下架
        this.getSoldOutList();
      } else {
        // 全部商品
        this.getGroupBuyList();
      }
    },
    oneTabFun(val) {
      if (val.index == "1") {
        // 已下架
        this.getSoldOutList();
      } else {
        // 全部商品
        this.getGroupBuyList();
      }
    },
  },
};
</script>

<style scoped>
.el-button--primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
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
.btnBox {
  display: flex;
  border: 1px solid #dfdfdf;
  background: #f8f8f8;
  height: 40px;
  line-height: 38px;
  border-radius: 3px;
}
.g-btn {
  font-size: 14px;
  color: #2e2e2e;
  float: left;
  width: 70px;
  height: 38px;
  text-align: center;
  cursor: pointer;
}
.jia-btn {
  border-right: 1px solid #dfdfdf;
}
.so-nav {
  display: flex;
}
.sosuo {
  margin-left: 10px;
}
.so-ipt {
  border-color: #cecece;
  margin-left: 10px;
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
.goods-class-list,
.goods-class-list-left,
.goods-class-list-right {
  cursor: pointer;
  height: 40px;
  font-size: 16px;
}
.goods-class-list-left {
  float: left;
  width: 100%;
}
.goods-class-list-right {
  float: right;
  font-size: 14px;
  color: #909399;
}
.goods-class-list-selected {
  color: #e6a23c;
  font-weight: bold;
}
</style>
