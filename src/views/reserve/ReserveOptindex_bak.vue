<template>
  <div class="shopSet">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!-- <el-tab-pane label="套餐订单" name="first" v-if="type_id == 2">
          <filter-item 
          :pickerOptions='pickerOptions' 
          :activeName="activeName" 
          @filtrateFun='filtrateParent'>
          </filter-item>

          <package-order 
          :tableListData="tableListData"
          :activeName="activeName"
          @reserveChildren="sortReserveFun">
          </package-order>
      </el-tab-pane>-->
      <el-tab-pane label="预定订单" name="first">
        <filter-item
          :pickerOptions="pickerOptions"
          :activeName="activeName"
          :merchants="merchants"
          @filtrateFun="filtrateParent"
        ></filter-item>

        <reserve-table
          :tableListData="tableListData"
          :activeName="activeName"
          :merchants="merchants"
          @reserveChildren="sortReserveFun"
        ></reserve-table>
      </el-tab-pane>
      <el-tab-pane label="消费账单" name="second">
        <filter-item
          :pickerOptions="pickerOptions"
          :activeName="activeName"
          :merchants="merchants"
          @filtrateFun="filtrateParent"
        ></filter-item>
        <meal-table
          :tableListData="tableListData"
          :activeName="activeName"
          :merchants="merchants"
          @reserveChildren="sortReserveFun"
        ></meal-table>
      </el-tab-pane>
    </el-tabs>
    <el-button
      v-show="activeName == 'first'"
      class="addbtn"
      type="primary"
      @click="addOpen"
      >添加预定</el-button
    >
    <!-- <div class="pageTitle">
          <span class="title-s">{{pageTitle}}</span>
          <span><el-button class="addbtn" type="primary" @click="addOpen">添加预定</el-button></span>
    </div>-->
    <div class="pagination">
      <el-pagination
        :current-page="curPage"
        :hide-on-single-page="true"
        @current-change="pageChange"
        background
        layout="prev, pager, next"
        :page-size="15"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 新增内容 -->
    <el-dialog title="添加预定" :visible.sync="insertDialog">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="到店时间" prop="reserve_time">
          <el-date-picker
            v-model="ruleForm.reserve_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="客户手机" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="请输入客户手机"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户姓名" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入客户姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <template>
            <el-radio v-model="ruleForm.gender" label="1">男</el-radio>
            <el-radio v-model="ruleForm.gender" label="2">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="座位" prop="palceName">
          <el-autocomplete
            class="inline-input"
            v-model="palceName"
            :fetch-suggestions="querySearch"
            placeholder="请输入座位名称"
            :trigger-on-focus="false"
            @select="handleSelect"
            @input="PlaceType"
            clearable
          ></el-autocomplete>
        </el-form-item>
        <!-- <el-form-item label="预定人数" prop="people_num">
                <el-input v-model="ruleForm.people_num" type="number" placeholder="请输入预定人数"></el-input>
        </el-form-item>-->
        <el-form-item label="营销人员" prop="staffName">
          <el-autocomplete
            class="inline-input"
            v-model="staffName"
            :fetch-suggestions="querySearchStaff"
            placeholder="请输入营销人员名称"
            :trigger-on-focus="false"
            @select="handleSelectStaff"
            clearable
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="预定备注" prop="remark">
          <el-input
            v-model="ruleForm.remark"
            placeholder="请输入备注信息"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertDialog = false">取 消</el-button>
        <el-button type="primary" @click="insertItem('ruleForm')"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改内容 -->
    <el-dialog title="排队详情" :visible.sync="updateDialog">
      <div slot="title" class="header-title">
        <span class="title-queueNo">排队号：{{ ruleForm.queue_no }}</span>
      </div>
      <div>
        <div class="t-01">排队时间：{{ ruleForm.create_time }}</div>
        <div class="t-01">位置类型：{{ ruleForm.place_type_name }}</div>
      </div>
      <div class="de-box">
        <div class="t-box2">
          <img class="u-img" :src="ruleForm.user_avatar" alt />
          <div class="box2-nav">
            <div class="t-02">{{ ruleForm.user_nickname }}</div>
            <div class="t-02">{{ ruleForm.phone }}</div>
          </div>
        </div>
        <div class="t-box1">
          <div class="t-01">预订金额：{{ ruleForm.total_deposit }}</div>
          <div class="t-01">支付状态：{{ ruleForm.status }}</div>
          <div class="t-01">支付时间：{{ ruleForm.finish_time }}</div>
        </div>
      </div>
      <div class="zt-box">
        <span class="s-01">状态：</span>
        <span v-if="ruleForm.status == 0">排队中</span>
        <span v-if="ruleForm.status == 1">已到号</span>
        <span v-if="ruleForm.status == 2">已过号</span>
        <span v-if="ruleForm.status == 3">已退款</span>
      </div>
      <span slot="footer" class="dialog-footer" v-show="ruleForm.status == 0">
        <el-button @click="updataQueueFun(2, ruleForm.queue_id)"
          >过号</el-button
        >
        <el-button type="primary" @click="updataQueueFun(1, ruleForm.queue_id)"
          >叫号</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import filterItem from "./components/filterItem";
import reserveTable from "./components/reserveTable";
import packageOrder from "./components/packageOrder"; //废弃
import mealTable from "./components/mealTable";
export default {
  name: "currenPage",
  components: {
    filterItem,
    reserveTable,
    packageOrder,
    mealTable,
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号码"));
      }
      setTimeout(() => {
        if (!this.mobileReg.test(value)) {
          callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
          this.uStatus = true;
        }
      }, 200);
    };
    return {
      // 商家/店铺ID
      merchants: {
        shop_id: 0,
        merchant_id: 0,
      },
      pageSign: 0,
      uStatus: false,
      mobileReg: /^1[3-9][0-9]{9}$/,
      soVal: "",
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      curPage: 1, //删除框的标题
      total: 10, //删除框的标题
      tableListData: [], //页面表单的内容
      value: "",
      ruleForm: {
        shop_id: 0,
        merchant_id: 0,
        place_id: "",
        name: "",
        reserve_time: "",
        phone: "",
        gender: "1",
        sale_staff_id: "",
        remark: "",
      },
      rules: {
        reserve_time: [
          { required: true, message: "请选择预定时间", trigger: "change" },
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        place_id: [
          { required: true, message: "请选择预定座位", trigger: "change" },
        ],
      },
      user_nickname: "",
      placeTypeArr: [],
      sortStatus: false,
      statusArr: [
        { text: "排队中", value: "0" },
        { text: "已到号", value: "1" },
        { text: "已过号", value: "2" },
        { text: "已退款", value: "3" },
      ],
      order: "asc",
      sortVal: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value2: "",
      activeName: "first",
      restaurants: [],
      PlaceTypeData: [],
      palceName: "",
      staffName: "",
      staffarr: [],
      type_id: "",
      isReserve: false,
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
    this.ruleForm.shop_id = this.merchants.shop_id;
    this.ruleForm.merchant_id = this.merchants.merchant_id;
    this.shopType(() => {
      this.getTableList();
    });
    this.PlaceType();
    this.staffList();
  },
  computed: {
    pageTitle() {
      return this._getVuex("pageTitle");
    },
  },
  methods: {
    shopType(fun) {
      var data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.api.shop.getShopDetail(data).then((res) => {
        this.type_id = res.data.data.type_id;
        fun();
      });
    },
    /* 获取预定订单 */
    getTableList(parameter) {
      this.pageSign = 0;
      var data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page: this.curPage,
      };
      if (parameter != "" && undefined) {
        data = parameter;
      }
      this.api.reserve.getReserveList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 获取团购订单 */
    getGroupBuyList() {
      this.pageSign = 0;
      let data = { page: this.curPage };
      this.api.reserve.getGroupBuyList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 获取账单订单 */
    getBillList(parameter) {
      this.pageSign = 0;
      let data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page: this.curPage,
      };
      if (parameter != "" && undefined) {
        data = parameter;
      }
      this.api.reserve.getBillList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    //table排序
    sortReserveFun(sortVal, order) {
      this.pageSign = 5;
      let data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page: this.curPage,
        sort: sortVal,
        order: order,
      };
      if (this.activeName == "first") {
        this.getTableList(data);
      } else if (this.activeName == "second") {
        this.getBillList(data);
      }
    },
    //筛选
    filtrateParent(
      soVal,
      classvalue,
      statusvalue,
      start_time,
      end_time,
      placevalue
    ) {
      this.pageSign = 6;
      let data = {};
      if (this.activeName == "first") {
        data = {
          merchant_id: this.merchants.merchant_id,
          shop_id: this.merchants.shop_id,
          page: this.curPage,
          query: soVal,
          order_type: classvalue,
          status: statusvalue,
          start_time: start_time,
          end_time: end_time,
        };
        this.getTableList(data);
      } else if (this.activeName == "second") {
        data = {
          page: this.curPage,
          query: soVal,
          status: statusvalue,
          start_time: start_time,
          end_time: end_time,
          place_id: placevalue,
        };
        this.getBillList(data);
      }
    },
    //tab切换
    handleClick(tab, event) {
      if (this.activeName == "first") {
        this.getTableList();
        // this.isReserve = true
      } else if (this.activeName == "second") {
        this.getBillList();
        // this.isReserve = false
      }
    },
    //添加预定快速查找员工姓名
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      // 调用 callback 返回建议列表的数据

      cb(restaurants);
    },
    handleSelect(item) {
      this.ruleForm.place_id = item.id;
    },
    //获取座位类型
    PlaceType() {
      var data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page_size: 10000,
      };
      this.api.shop.getPlaceType(data).then((res) => {
        let itemArr = [];
        res.data.data.map((item) => {
          itemArr.push({
            value: item.name,
            id: item.type_id,
          });
        });
        this.restaurants = itemArr;
      });
    },
    //添加预定快速查找员工姓名
    querySearchStaff(queryString, cb) {
      var staffarrt = this.staffarr;
      // 调用 callback 返回建议列表的数据
      cb(staffarrt);
    },
    handleSelectStaff(item) {
      this.ruleForm.sale_staff_id = item.id;
    },
    //获取员工列表
    staffList() {
      const data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page_size: 0,
      };
      this.api.staff.userList(data).then((res) => {
        let itemArr = [];
        res.data.data.map((item) => {
          itemArr.push({
            value: item.staff_name,
            id: item.staff_id,
          });
        });
        this.staffarr = itemArr;
      });
    },
    //添加预定
    addOpen() {
      this.insertDialog = true;
    },
    /* 添加预定 */
    insertItem(formName) {
      this.ruleForm.gender = Number(this.ruleForm.gender);
      var data = this.ruleForm;
      this.api.reserve.submitReserve(data).then((res) => {
        this.getTableList();
        this.insertDialog = false;
        this.$refs[formName].resetFields();
      });
    },

    //过号、叫号
    updataQueueFun(i, queue_id) {
      const data = {
        queue_id: queue_id,
        status: i,
      };
      this.api.reserve.updateQueue(data).then((res) => {
        this.getTableList();
        this.updateDialog = false;
      });
    },
    //显示过号条数
    showGuohao(val) {
      this.pageSign = 2;
      let data = { page: this.curPage, page_size: val, status: 2 };
      this.api.reserve.getQueueList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },

    /* 打开修改窗口 */
    openUpdateDialog(index, row) {
      //console.log(row)
      this.ruleForm = row;
      this.updateDialog = true;
    },
    /* 改变页数 */
    pageChange(page) {
      this.curPage = page;
      if (this.pageSign == 0) {
        this.getTableList();
      } else if (this.pageSign == 1) {
        this.seachFun();
      } else if (this.pageSign == 2) {
        this.showGuohao();
      } else if (this.pageSign == 3) {
        this.filterGetPlacetypeGoods();
      } else if (this.pageSign == 4) {
        this.filterGetStatusGoods();
      } else if (this.pageSign == 5) {
        this.sortDataFun();
      } else if (this.pageSign == 6) {
        this.filtrateParent();
      }
    },
    seachFun() {
      this.pageSign = 1;
      let data = { page: this.curPage, query: this.soVal };
      this.api.reserve.getQueueList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.shopSet {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 15px 15px;
  padding: 15px 15px;
  position: relative;
  .addbtn {
    position: absolute;
    right: 20px;
    top: 10px;
  }
  .pageTitle {
    .title-s {
      margin: 10px 0 20px 0;
      font-size: 24px;
      color: #0a0a0a;
    }
    .addbtn {
      margin-left: 10px;
    }
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
    text-align: right;
  }
  .zx-btn01 {
    float: right;
  }
  .zx-box1 {
    margin-right: 15px;
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
  .header-title {
    display: flex;
    .title-name {
      flex: 1;
    }
    .title-queueNo {
      margin-right: 40px;
    }
  }
  .t-01 {
    color: #666;
    line-height: 24px;
  }
  .de-box {
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    margin: 20px 0;
    .t-box1 {
      flex: 1;
      margin-left: 40px;
      .t-01 {
        line-height: 24px;
      }
    }
    .t-box2 {
      display: flex;
      .u-img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        background-color: #eeeeee;
      }
      .box2-nav {
        flex: 1;
        margin-left: 8px;
        .t-02 {
          line-height: 20px;
        }
      }
    }
  }
  .zt-box {
    display: flex;
    .s-01 {
      margin-right: 10px;
    }
  }
}
</style>
