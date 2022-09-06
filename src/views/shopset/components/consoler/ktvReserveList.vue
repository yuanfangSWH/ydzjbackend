<!--
 * @Author: 朱强
 * @Date: 2021-01-27 16:22:55
 * @LastEditTime: 2021-01-27 16:26:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\shopset\components\consoler\ktvReserveList.vue
-->
<template>
  <div class="lightTheme">
    <div class="ktvReserveList shopSet mutilPlace">
      <div class="topNav">
        <!--<span class="topNavItem goBack cursor" @click="goBack"><i class="iconfont icon-xiangzuo"></i></span>
            <span class="topNavItem">{{curPlaceInfo[3]}}</span>
            <div class="placeTypeInfo">
                <span><i class="iconfont "></i>低消：{{curPlaceInfo[9]}}</span>
                <span><i class="iconfont "></i>区域：{{curPlaceInfo[14]}}</span>
                <span><i class="iconfont "></i>类型：{{curPlaceInfo[15]}}</span>
                <span><i class="iconfont "></i>容纳人数：{{curPlaceInfo[8]}}人</span>
            </div>    -->
      </div>

      <div class="placeList" id="listDivHeight"></div>

      <div
        class="mainContent"
        :style="'min-height:' + (mainContentHeight - 20) + 'px'"
      >
        <div class="itemBox">
          <filter-item
            :isWhite="isWhite"
            :isHome="isHome"
            @childrenFn="parentFun"
          ></filter-item>
        </div>
        <span class="topNavItem">{{ title }}</span>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            fixed
            prop="place_type_name"
            label="包厢类型"
            width="150"
          >
          </el-table-column>
          <el-table-column prop="reserve_time" label="预定时间" width="180">
          </el-table-column>
          <el-table-column prop="staff_name" label="预订人" width="120">
          </el-table-column>
          <el-table-column prop="name" label="客人姓名" width="120">
          </el-table-column>
          <el-table-column prop="people_num" label="客人数" width="120">
          </el-table-column>
          <el-table-column prop="phone" label="联系电话" width="140">
          </el-table-column>
          <el-table-column prop="create_time" label="登记时间" width="180">
            <template slot-scope="scope">
              {{ formatDate(scope.row.create_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="预定状态" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">待支付</span>
              <span v-if="scope.row.status == 2">用户取消订单</span>
              <span v-if="scope.row.status == 3">已支付</span>
              <span v-if="scope.row.status == 4">已预订</span>
              <span v-if="scope.row.status == 5">商家取消</span>
              <span v-if="scope.row.status == 6">退款中</span>
              <span v-if="scope.row.status == 7">消费中</span>
              <span v-if="scope.row.status == 8">已结账</span>
              <span v-if="scope.row.status == 9">退款成功</span>
            </template>
          </el-table-column>
          <el-table-column prop="reserve_way" label="预定类型" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.reserve_way == 0">线上</span>
              <span v-else-if="scope.row.reserve_way == 1">线下</span>
              <span v-else>线上客服</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button
                v-if="
                  scope.row.status == 1 ||
                  scope.row.status == 4 ||
                  scope.row.status == 3 ||
                  scope.row.status == 6
                "
                @click="editFun(scope.row)"
                type="text"
                size="small"
                >查看/修改</el-button
              >

              <el-button
                v-if="
                  scope.row.status == 2 ||
                  scope.row.status == 5 ||
                  scope.row.status == 7 ||
                  scope.row.status == 8 ||
                  scope.row.status == 9 ||
                  scope.row.status == 10
                "
                @click="lookFun(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >

              <el-button
                v-if="scope.row.status == 4"
                @click="openFun(scope.row)"
                type="text"
                size="small"
                >开箱</el-button
              >

              <el-button
                @click="cancleFun(scope.row)"
                v-if="scope.row.status == 4"
                type="text"
                size="small"
                >撤订</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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
      </div>
    </div>
  </div>
</template>

<script>
import filterItem from "../components/filterItem.vue";
import dateItem from "../components/dateItem";
export default {
  name: "ktvReserveList",
  components: {
    filterItem,
    dateItem,
  },
  data() {
    return {
      themeValue: true, //主题颜色
      num: 1,
      // curPlaceInfo: [],
      title: "查询结果",
      placeListHeight: 75,
      mainContentHeight: 0,
      shopSetHeight: document.documentElement.clientHeight,
      shopSetWidth: document.documentElement.clientWidth,

      tcData: [],
      timeList: [],
      curunt: 0,
      staffArr: [],
      hasReserve: false,
      reserveData: {},
      type_id: 0,
      isWhite: true,
      isHome: 2,
      tableData: [],
      page: 1,
      count: 0,
      reserve_way: "", //预定类型
      type_id: "", //包厢类型
      is_birthday: "",
      name: "",
      phone: "",
      start_time: "",
      end_time: "",
      sale_staff_name: "",
      status: "", //预定状态
      queue_no: "",
      openData: {
        reserve_id: 0,
        place_id: "",
        sale_staff_id: 0,
        sale_staff_name: "",
        people_num: 0,
      },
    };
  },
  created() {
    // this.curPlaceInfo = sessionStorage.getItem('curPlaceInfo').split(',')
    if (sessionStorage.getItem("reserveKdata")) {
      this.tableData = sessionStorage.getItem("reserveKdata");
      this.count = Number(sessionStorage.getItem("reserveKcount"));
      this.tableData = JSON.parse(this.tableData);
    }
    if (localStorage.getItem("themeValue") == "true") {
      this.themeValue = true;
    } else {
      this.themeValue = false;
    }
  },
  mounted() {
    let placeLists = document.getElementById("listDivHeight").offsetHeight;
    this.mainContentHeight = this.shopSetHeight - placeLists - 70;
    window.onresize = () => {
      this.shopSetHeight = document.documentElement.clientHeight;
      this.shopSetWidth = document.documentElement.clientWidth;

      let placeLists = document.getElementById("listDivHeight").offsetHeight;
      this.mainContentHeight = this.shopSetHeight - placeLists - 70;
    };
  },
  methods: {
    parentFun(
      type_id,
      start_time,
      end_time,
      status,
      name,
      sale_staff_name,
      queue_no,
      reserve_way,
      is_birthday,
      phone
    ) {
      this.type_id = type_id;
      this.reserve_way = reserve_way;
      this.is_birthday = is_birthday;
      this.name = name;
      this.phone = phone;
      this.start_time = start_time;
      this.end_time = end_time;
      this.sale_staff_name = sale_staff_name;
      this.status = status;
      this.queue_no = queue_no;
      let data = {
        page: this.page,
        type_id,
        start_time,
        end_time,
        status,
        name,
        sale_staff_name,
        queue_no,
        reserve_way,
        is_birthday,
        phone,
      };
      if (type_id == "") {
        delete data.type_id;
      }
      if (start_time == "") {
        delete data.start_time;
      }
      if (end_time == "") {
        delete data.end_time;
      }
      if (status == "") {
        delete data.status;
      }
      if (name == "") {
        delete data.name;
      }
      if (sale_staff_name == "") {
        delete data.sale_staff_name;
      }
      if (queue_no == "") {
        delete data.queue_no;
      }
      if (reserve_way == "") {
        delete data.reserve_way;
      }
      if (is_birthday == "") {
        delete data.is_birthday;
      }
      if (phone == "") {
        delete data.phone;
      }
      this.$store.dispatch("mainConsole/filterReserve", data).then((res) => {
        this.tableData = res.data;
        this.count = res.count;
      });
    },
    // 时间戳转日期格式
    formatDate(value) {
      //10位时间戳转换
      let date = new Date(parseInt(value) * 1000);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      let second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + "- " + h + ":" + minute;
      // return m + "月" + d + "日 " + h + ":" + minute + ":"+second;
    },
    pageChange(val) {
      this.page = val;
      this.parentFun(
        this.type_id,
        this.start_time,
        this.end_time,
        this.status,
        this.name,
        this.sale_staff_name,
        this.queue_no,
        this.reserve_way,
        this.is_birthday,
        this.phone
      );
    },
    // 查看/修改
    editFun(row) {
      this._toRouter("/kReserveDetaile?reserve_id=" + row.reserve_id);
    },
    //查看
    lookFun(row) {
      this._toRouter(
        "/kReserveDetaile?reserve_id=" + row.reserve_id + "&onlyLook=1"
      );
    },
    //开台
    openFun(row) {
      if (row.place_id) {
        this.openData.place_id = Number(row.place_id);
      }
      this.openData.reserve_id = row.reserve_id;
      this.openData.sale_staff_id = row.sale_staff_id;
      this.openData.sale_staff_name = row.sale_staff_name;
      this.openData.people_num = row.people_num;
      if (this.openData.place_id) {
        //有座位id，直接开箱
        let data = this.openData;
        this.$store.dispatch("mainConsole/opentable", data).then((res) => {
          this.$message({
            message: "" + res.msg,
            type: "success",
          });
          this.$router.push({ path: "/mainConsoler" });
        });
      } else {
        //线上预订没有座位id，回到控制台选择座位开箱
        this._toRouter(
          "/mainConsoler?reserve_id=" + row.reserve_id + "&isFromReserve=1"
        );
      }
    },
    //撤订
    cancleFun(row) {
      this._toRouter("/cancelOrder?reserve_id=" + row.reserve_id);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.ktvReserveList {
  .topNav {
    background-size: auto 100px;
    height: 70px;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
    text-align: center;
    line-height: 38px;
    .cursor {
      cursor: pointer;
    }
    .topNavBtn {
      border-radius: 3px;
      font-weight: bold;
    }
    .topNavItem {
      margin: 0 5px;
    }
    .placeTypeInfo {
      border-radius: 3px;
      min-width: 430px;
      height: 38px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-left: 20px;
      span {
        margin: 0 10px;
      }
    }
    .topLeft {
      float: left;
      margin-left: 20px;
      .topIcon01 {
        margin-right: 5px;
      }
      .el-button {
        border-radius: 5px;
        border: none !important;
      }
    }
  }

  .placeList {
    padding-top: 25px;
    margin-left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .mutilPlaceName {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: center;
      padding-left: 0;
      li {
        position: relative;
        border-radius: 3px;
        width: 110px;
        height: 40px;
        margin: 5px;
        text-align: left;
        padding-left: 20px;
        line-height: 44px;
        cursor: pointer;
        transition: all 0.2s linear;
        &:hover {
          padding-left: 30px;
        }
        &:after {
          content: "X";
          width: 20px;
          height: 20px;
          line-height: 22px;
          text-align: center;
          float: right;
          margin-top: 10px;
          margin-right: 5px;
          font-size: 12px;
          transition: all 0.2s linear;
        }
        &:hover::after {
          transform: rotateZ(180deg);
        }
      }
    }
  }

  .mainContent {
    margin: 0 20px 20px 20px;
    .itemBox {
      padding-bottom: 30px;
    }
    .changeStatusForm {
      padding: 40px;
      .btn {
        margin-left: 43px;
      }
      .changeStatusBtn {
        width: 100px;
        height: 38px;
        font-weight: bold;
      }
      .span-box {
        max-width: 500px;
        display: inline-block;
        .time-span {
          height: 34px;
          line-height: 34px;
          border-radius: 6px;
          padding: 0 14px;
          display: inline-block;
          margin: 0 15px 10px 0;
          cursor: pointer;
        }
      }
      .kt-span01 {
        margin-right: 10px;
      }
    }
    .el-select,
    .el-textarea,
    .el-cascader,
    .el-input {
      width: 200px !important;
    }
    .topNavItem {
      width: 100%;
      font-size: 18px;
      padding: 20px 0 20px 20px;
      display: inline-block;
    }
    ::v-deep .el-form-item__label {
      width: 100px;
    }
    .addTextarea {
      width: 400px !important;
    }
    .pagination {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      padding: 15px 0;
    }
  }
  .tc-name {
    width: 100% !important;
    margin: 0 0 10px;
  }
}
</style>

