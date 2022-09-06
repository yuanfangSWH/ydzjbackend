<template>
  <div class="shopSet">
    <div class="page-title">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <div class="btn-nav">
        <el-button type="primary" @click="addOpen">新增单品</el-button>
        <el-button type="primary" @click="addGroupOpen">新增商品套餐</el-button>
      </div>
      <div class="so-nav">
        <div class="btnBox">
          <div class="g-btn jia-btn" @click="putawayFun(1)">上架</div>
          <div class="g-btn jia-btn" @click="putawayFun(2)">下架</div>
          <div class="g-btn" @click="batchDelete">删除</div>
        </div>
        <el-input
          class="so-ipt"
          placeholder="请输入商品名称"
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
    <div class="addClassBtn" @click="addGoodsClassOpen">新建分类</div>
    <div>
      <el-tabs type="border-card" v-model="tabStatus" @tab-click="oneTabFun">
        <el-tab-pane label="全部商品">
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
                <span slot="label"
                  >{{ item.class_name
                  }}<i
                    class="edit-icon el-icon-edit-outline"
                    v-show="
                      editableTabsValue == item.class_id &&
                      item.class_id != -1 &&
                      item.class_id != -2
                    "
                    @click="editClass(item)"
                  ></i
                ></span>
                <goods-item
                  :options="options"
                  :merchants="merchants"
                  @childFun="parentFun"
                ></goods-item>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已下架">
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
                <span slot="label"
                  >{{ item.class_name
                  }}<i
                    class="edit-icon el-icon-edit-outline"
                    v-show="
                      editableTabsValue == item.class_id &&
                      item.class_id != -1 &&
                      item.class_id != -2
                    "
                    @click="editClass(item)"
                  ></i
                ></span>
                <goods-item
                  :options="options"
                  @childFun="parentFun"
                ></goods-item>
              </el-tab-pane>
            </el-tabs>
          </div>
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
      >
      </el-pagination>
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
  </div>
</template>

<script>
import qs from "qs";
import goodsItem from "./components/goodsItem";
export default {
  name: "Goods",
  components: {
    goodsItem,
  },
  data() {
    return {
      shop_id: "",
      merchant_id: "",
      merchants: {
        shop_id: "",
        merchant_id: "",
      },
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
      f_status: 1,
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
      tabStatus: "0",
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
    $route(to, from) {
      this.iniPageParam();
      this.getGoodsList();
    },
  },
  created() {
    this.iniPageParam();
    this.getGoodsClass(() => {
      this.getGoodsList();
      //this.pageChange();
    });
  },
  methods: {
    /*初始化页面参数*/
    iniPageParam() {
      this.merchant_id = this.$route.query.merchant_id;
      this.shop_id = this.$route.query.shop_id;
      this.merchants = {
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      this.order = this.$route.query.order;
      this.sortVal = this.$route.query.sort;
      this.page = this.$route.query.page ? Number(this.$route.query.page) : 1;
      this.pageSign = this.$route.query.pageSign;
      this.soVal = this.$route.query.soVal;
      this.class_id = this.$route.query.class_id;
      this.editableTabsValue = this.class_id ? String(this.class_id) : "0";
      this.status = this.$route.query.status ? this.$route.query.status : "1";
      this.tabStatus = this.$route.query.tabStatus;
    },
    parentFun(Val, order, key, n) {
      if (n == 1) {
        //排序
        this.sortVal = Val;
        this.order = order;
        this.sortDataFun();
      } else if (n == 2) {
        //筛选
        this.f_status = Val;
        if (key == "status" && Val) {
          this.filterGetGoodsList();
        } else {
          this.getGoodsList();
        }
      } else if (n == 3) {
        //删除单个商品
        this.deldialogVisible = true;
        this.goods_id = Val;
        this.deltitle = key;
      } else if (n == 4) {
        //删除单个商品
        if (Val.length == 0) {
          this.multipleSelection = "";
          this.nameArr = [];
        } else {
          this.multipleSelection = Val;
          this.nameArr = key;
        }
      }
    },
    //table筛选
    // filterTagTable(filters){
    //   this.filterMethod(filters)
    // },
    //table筛选
    // filterMethod(val) {
    //   var key = []
    //   var value = []
    //   for (var i in val) {
    //       key.push(i)
    //       value.push(val[i])
    //   }
    //   key = key.join(',')
    //   value = value.join(',')
    //   //接口逻辑
    //   this.f_status = value
    //   if(key=='status' && value){
    //     this.filterGetGoodsList()
    //   }else{
    //     this.getGoodsList()
    //   }
    // },
    filterGetGoodsList() {
      this.pageSign = 2;
      let data = {
        page: this.page,
        status: this.f_status,
        class_id: this.class_id,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      this.$store.dispatch("goods/getGoodsList", data).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
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
      this.pageSign = 3;
      let data = {
        page: this.page,
        sort: this.sortVal,
        order: this.order,
        class_id: this.class_id,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      this.$store.dispatch("goods/getGoodsList", data).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
    },
    tabFun() {
      this.class_id = Number(this.editableTabsValue);
      // if (this.tabStatus == "1") {
      //   // 已下架
      //   this.getSoldOutList();
      // } else {
      //   // 全部商品=
      //   this.getGoodsList();
      // }
      this.pageChange();
    },
    oneTabFun(val) {
      if (val.index == "1") {
        // 已下架
        this.status = "2";
      } else {
        // 全部商品
        this.status = "1";
      }
      this.pageChange();
    },
    // 获取商品列表
    getGoodsList() {
      // return false
      this.pageSign = 0;
      const datas = {
        shop_id: this.shop_id,
        merchant_id: this.merchant_id,
        page: this.page,
        class_id: this.class_id,
        pageSign: this.pageSign,
        name: this.soVal,
        status: this.status,
        tabStatus: this.tabStatus,
        page: this.page,
        sortVal: this.sortVal,
      };
      this.$store.dispatch("goods/getGoodsList", datas).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
    },
    // 获取已下架商品列表
    getSoldOutList() {
      this.pageSign = 4;
      const datas = {
        page: this.page,
        class_id: this.class_id,
        status: 2,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      this.$store.dispatch("goods/getGoodsList", datas).then((res) => {
        this.options = res.data;
        this.count = res.count;
      });
    },

    //新增商品
    addOpen() {
      this.$router.push({
        path: "/goods/addGoods",
        query: { merchant_id: this.merchant_id, shop_id: this.shop_id },
      });
    },
    //新增商品套餐
    addGroupOpen() {
      this.$router.push({
        path: "/goods/addGroupGoods",
        query: { merchant_id: this.merchant_id, shop_id: this.shop_id },
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //确认删除单个商品
    confirmDelFun() {
      let arr = [];
      arr.push(this.goods_id);
      const datas = {
        id: arr,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
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
          message: "请先勾选要删除的商品",
          type: "warning",
        });
      }
    },
    //确认批量删除
    confirmDelbatch() {
      // console.log('23',this.multipleSelection)
      const datas = {
        id: this.multipleSelection,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
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
    // 批量上下架
    putawayFun(n) {
      let k = n;
      if (this.multipleSelection) {
        const datas = {
          id: this.multipleSelection,
          status: Number(n),
          merchant_id: this.merchant_id,
          shop_id: this.shop_id,
        };
        this.$store.dispatch("goods/goodsUpDown", datas).then((res) => {
          this.$message({
            message: "" + res.msg,
            type: "success",
          });
          if (k == 1) {
            this.tabStatus = "0";
          }
          this.getGoodsList();
          this.batchdialogVisible = false;
        });
      } else {
        this.$message({
          message: "请先勾选要操作的商品",
          type: "warning",
        });
      }
    },

    // handleSelectionChange(val) {
    //   var arr=[]
    //   for(var i=0; i<val.length; i++){
    //     arr.push(val[i].goods_id)
    //     this.nameArr.push(val[i].name)
    //   }
    //   this.multipleSelection = arr
    //   // arr = Array.from(new Set(arr))
    //   this.nameArr = Array.from(new Set(this.nameArr))
    //   // this.multipleSelection = arr.join(',')
    // },
    pageChange(val) {
      console.info(this.status);
      this.page = val ? val : 1;
      this.$router.push({
        path: "/goods",
        query: {
          merchant_id: this.merchant_id,
          shop_id: this.shop_id,
          order: this.order,
          sortVal: this.sortVal,
          page: this.page,
          pageSign: this.pageSign,
          soVal: this.soVal,
          class_id: this.class_id,
          status: this.status,
          tabStatus: this.tabStatus,
        },
      });
      // if (this.pageSign == 0) {
      //   this.getGoodsList();
      // } else if (this.pageSign == 1) {
      //   this.seachFun();
      // } else if (this.pageSign == 2) {
      //   this.filterGetGoodsList();
      // } else if (this.pageSign == 3) {
      //   this.sortDataFun();
      // } else if (this.pageSign == 4) {
      //   this.getSoldOutList();
      // }
    },
    seachFun() {
      this.pageSign = 1;
      this.pageChange();
      // const datas = {
      //   page: this.page,
      //   name: this.soVal,
      //   merchant_id: this.merchant_id,
      //   shop_id: this.shop_id,
      // };
      // this.$store.dispatch("goods/getGoodsList", datas).then((res) => {
      //   this.options = res.data;
      //   this.count = res.count;
      // });
    },
    // 获取分类列表
    getGoodsClass(fun) {
      const datas = {
        page_size: 10000,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      this.$store.dispatch("goods/getGoodsClass", datas).then((res) => {
        this.GoodsClass = res.data;
        this.GoodsClass.forEach((item, index) => {
          if (index == 0) {
            this.class_id = this.class_id ? this.class_id : item.class_id;
            this.editableTabsValue = this.class_id
              ? String(this.class_id)
              : item.class_id + "";
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
          const datas = this.classForm;
          datas.merchant_id = this.merchant_id;
          datas.shop_id = this.shop_id;
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
          //this.classFormAdd.allow_special_date = this.classFormAdd.allow_special_date.join(',')
          this.classFormAdd.class_sort = Number(this.classFormAdd.class_sort);
          if (this.classFormAdd.status == true) {
            this.classFormAdd.status = 1;
          } else {
            this.classFormAdd.status = 0;
          }
          const datas = this.classFormAdd;
          datas.merchant_id = this.merchant_id;
          datas.shop_id = this.shop_id;
          console.log(datas);
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
    //确认删除分类
    confirmDelClassFun() {
      var arr = [];
      arr = this.class_id.split(",");
      arr = arr.map((i) => parseInt(i, 0));
      const datas = {
        id: arr,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
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
