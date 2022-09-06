<template>
  <div class="lightTheme">
    <div
      v-if="!dialogAddReserve && !dialogOpenPlace"
      class="shopSet consolePlaceInfo"
    >
      <div class="topNav">
        <!-- <span class="topNavItem goBack cursor" @click="goBack"
          ><i class="iconfont icon-xiangzuo"></i
        ></span> -->
        <span class="topNavItem" style="margin-right: 20px"
          >{{ curPlaceInfo.place_name }}({{
            curPlaceInfo.max_people_num
          }})</span
        >
        <div class="placeTypeInfo">
          <span
            ><i class="iconfont"></i>低消：{{
              curPlaceInfo.basic_price / 100
            }}</span
          >
          <span
            ><i class="iconfont"></i>区域：{{ curPlaceInfo.area_name }}</span
          >
          <span
            ><i class="iconfont"></i>类型：{{ curPlaceInfo.type_name }}</span
          >
          <span
            ><i class="iconfont"></i>容纳人数：{{
              curPlaceInfo.max_people_num
            }}人</span
          >
        </div>
        <el-select
          v-model="changeOption"
          placeholder="请选择"
          class="topNavItem updateStatus cursor"
          @change="changePlaceStatus"
        >
          <el-option
            v-for="item in placeStatusOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button class="topNavBtn cursor topNavItem" @click="handleAddReserve"
          >添加预订</el-button
        >

        <el-button
          class="topNavBtn cursor topNavItemBtn"
          @click="toPath('/ordermeal?place_id=' + place_id)"
          v-if="this.curPlaceInfo.place_status == 2"
          >点单/账单</el-button
        >
        <el-button
          class="topNavBtn cursor topNavItemBtn"
          @click="toPath('/changePlace')"
          v-if="this.curPlaceInfo.place_status == 2"
          >换台</el-button
        >
        <el-button
          class="topNavBtn cursor topNavItemBtn"
          @click="toPath('/changeSecend')"
          v-if="this.curPlaceInfo.place_status == 5"
          >二次开台</el-button
        >
        <el-button
          v-show="showKaitai"
          class="topNavBtn cursor topNavItemBtn"
          @click="handleOpenPlace"
          v-if="this.curPlaceInfo.place_status != 2"
          >开台</el-button
        >
        <el-button
          class="topNavBtn cursor topNavItemBtn"
          @click="toPath('/bingTai?place_id=' + place_id)"
          v-if="this.curPlaceInfo.place_status == 2"
          >并台</el-button
        >
      </div>
      <div class="mainContent">
        <div class="subBox">
          <el-tabs
            type="border-card"
            class="tabNav tabBg"
            @tab-click="handleTabClick"
          >
            <el-tab-pane label="最新消息" class="tabNav">
              <el-table
                ref="multipNum_type"
                stripe
                :data="messageList"
                tooltip-effect="dark"
                style="width: 100%"
              >
                <el-table-column prop="user" label="昵称">
                  <template slot-scope="scope">
                    <span>{{ scope.row.user.nickname }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="call_info" label="消息" />
                <el-table-column prop="create_time" label="时间" />
                <el-table-column prop="status" label="状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 0" class="undo"
                      >待处理</span
                    >
                    <span v-if="scope.row.status == 1" class="doing"
                      >处理中</span
                    >
                    <span v-if="scope.row.status == 2" class="done"
                      >已处理</span
                    >
                  </template>
                </el-table-column>
                <el-table-column align="right" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      v-if="scope.row.status == 0"
                      type="danger"
                      @click="placeCallProcess(scope.row.call_id, 1)"
                      >处理</el-button
                    >
                    <el-button
                      size="mini"
                      v-if="scope.row.status == 1"
                      type="danger"
                      @click="placeCallProcess(scope.row.call_id, 2)"
                      >完成</el-button
                    >
                    <!-- <el-button size="mini"
                               @click="updateDialog(scope.row)">查看</el-button> -->
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane v-if="0 == 1" label="查看排队" class="tabNav">
              <el-table
                ref="multipNum_type"
                stripe
                :data="queueList"
                tooltip-effect="dark"
                style="width: 100%"
              >
                <el-table-column prop="queue_no" label="排队号" />
                <el-table-column prop="create_time" label="排队时间" />
                <el-table-column prop="place_type_name" label="类型" />
                <el-table-column prop="status" label="状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 0" class="undo"
                      >待叫号</span
                    >
                    <span v-if="scope.row.status == 1" class="done"
                      >已叫号</span
                    >
                  </template>
                </el-table-column>
                <el-table-column align="right" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      v-if="scope.row.status == 0"
                      @click="openDelDialog(scope.row, 1)"
                      >叫号</el-button
                    >
                    <el-button
                      size="mini"
                      type="danger"
                      @click="openDelDialog(scope.row, 2)"
                      >过号</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane label="预订信息" class="tabNav">
              <div v-if="!isBill">
                <!-- 线上 -->
                <div
                  class="reserveInfoBox"
                  v-if="
                    reserveTableData != '' && reserveTableData.reserve_way == 1
                  "
                >
                  <div class="info-left">
                    <div>
                      <span class="t-span01">预留姓名：</span
                      ><span class="t-span02">{{ reserveTableData.name }}</span>
                    </div>
                    <div>
                      <span class="t-span01">预留手机号：</span
                      ><span class="t-span02">{{
                        reserveTableData.phone
                      }}</span>
                    </div>
                    <div>
                      <span class="t-span01">预订时间：</span
                      ><span class="t-span02">{{
                        reserveTableData.create_time
                      }}</span>
                    </div>
                    <div>
                      <span class="t-span01">到店时间：</span
                      ><span class="t-span02">{{
                        reserveTableData.reserve_time
                      }}</span>
                    </div>
                    <div>
                      <span class="t-span01">预订途径：</span>
                      <span
                        class="t-span02"
                        v-if="reserveTableData.reserve_way == 1"
                        >线下</span
                      >
                      <span
                        class="t-span02"
                        v-else-if="reserveTableData.reserve_way == 0"
                        >线上</span
                      >
                      <span class="t-span02" v-else>线上客服</span>
                    </div>
                    <div>
                      <span class="t-span01">预订状态：</span>
                      <span class="t-span02" v-if="reserveTableData.status == 1"
                        >待支付</span
                      >
                      <span class="t-span02" v-if="reserveTableData.status == 2"
                        >用户取消订单</span
                      >
                      <span class="t-span02" v-if="reserveTableData.status == 3"
                        >已支付</span
                      >
                      <span class="t-span02" v-if="reserveTableData.status == 4"
                        >已预订</span
                      >
                      <span class="t-span02" v-if="reserveTableData.status == 5"
                        >商家取消</span
                      >
                      <span class="t-span02" v-if="reserveTableData.status == 6"
                        >用户申请退款中</span
                      >
                      <span class="t-span02" v-if="reserveTableData.status == 7"
                        >消费中</span
                      >
                      <span class="t-span02" v-if="reserveTableData.status == 8"
                        >已结账</span
                      >
                      <span class="t-span02" v-if="reserveTableData.status == 9"
                        >退款成功</span
                      >
                    </div>
                  </div>
                  <div class="info-right" v-if="reserveTableData.status == 3">
                    <el-button type="success" @click="checkPassFun"
                      >审核通过</el-button
                    >
                    <el-button type="danger" @click="checkNoPassFun"
                      >审核不通过</el-button
                    >
                  </div>
                  <div class="info-right" v-if="reserveTableData.status == 4">
                    <el-button type="success" @click="cancelFun"
                      >取消预订</el-button
                    >
                  </div>
                </div>
                <!-- 线下 -->
                <div class="reserveInfoBox" v-else-if="reserveTableData != ''">
                  <div class="info-left">
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <div class="t-span01">预留姓名：</div>
                      <el-input
                        style="flex: 1"
                        placeholder="请输入姓名"
                        suffix-icon="el-icon-edit"
                        v-model="reserveTableData.name"
                      ></el-input>
                    </div>
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <div class="t-span01">预留手机号：</div>
                      <el-input
                        style="flex: 1"
                        placeholder="请输入手机号"
                        suffix-icon="el-icon-edit"
                        v-model="reserveTableData.phone"
                      ></el-input>
                    </div>
                    <div>
                      <span class="t-span01">预订时间：</span
                      ><span class="t-span02">{{
                        reserveTableData.create_time
                      }}</span>
                    </div>
                    <div>
                      <span class="t-span01">到店时间：</span
                      ><span class="t-span02">{{
                        reserveTableData.reserve_time
                      }}</span>
                    </div>
                    <div>
                      <span class="t-span01">操作员：</span
                      ><span class="t-span02">{{
                        reserveTableData.staff_name
                      }}</span>
                    </div>
                    <div>
                      <span class="t-span01">预订途径：</span>
                      <span
                        class="t-span02"
                        v-if="reserveTableData.reserve_way == 1"
                        >线下</span
                      >
                      <span
                        class="t-span02"
                        v-else-if="reserveTableData.reserve_way == 0"
                        >线上</span
                      >
                      <span class="t-span02" v-else>线上客服</span>
                    </div>
                  </div>
                  <div class="info-right">
                    <el-button type="success" @click="submitChange"
                      >提交修改</el-button
                    >
                    <el-button type="danger" @click="cancelFun"
                      >取消预订</el-button
                    >
                    <el-button type="warning" @click="transitionFun"
                      >预订转换</el-button
                    >
                  </div>
                </div>
                <div class="zanwu" v-else>暂无数据</div>
              </div>
              <div class="billBox" v-else>
                <div>联系人：{{ billData.name }}</div>
                <div>手机号码：{{ billData.phone }}</div>
                <div>人数：{{ billData.bill.people_num }}</div>
                <div>预订时间：{{ billData.bill.start_time }}</div>
                <div>座位名称：{{ billData.bill.place_name }}</div>
                <div>营销：{{ billData.bill.staff_name }}</div>
              </div>
            </el-tab-pane>
          </el-tabs>

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
        <el-dialog title="预订转换" :visible.sync="dialogVisible" width="30%">
          <div>
            座位：
            <el-select
              v-model="place_name"
              filterable
              placeholder="请选择"
              @change="inputFun"
            >
              <el-option
                v-for="item in restaurants"
                :key="item.place_id"
                :label="item.place_name"
                :value="item.place_id"
              >
              </el-option>
            </el-select>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePlaceFun">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- 添加预订 -->
    <div v-if="dialogAddReserve" class="">
      <add-reserve
        :merchant_id="merchant_id"
        :shop_id="shop_id"
        :type_id="type_id"
        :place_id="place_id"
        :reserveTime="reserveTime"
        @handleCancel="handleCancelAddReserve"
      />
    </div>
    <!-- 开台 -->
    <div v-if="dialogOpenPlace" class="">
      <open-place
        :merchant_id="merchant_id"
        :shop_id="shop_id"
        :type_id="type_id"
        :place_id="place_id"
        :reserveTime="reserveTime"
        @handleCancel="handleCancelOpenPlace"
      />
    </div>
  </div>
</template>

<script>
import addReserve from "./addReserve";
import openPlace from "./openPlace";
export default {
  name: "PlaceInfo",
  components: {
    addReserve,
    openPlace,
  },
  props: {
    type_id: { type: Number, default: 0 },
    merchant_id: { type: Number, default: 0 },
    shop_id: { type: Number, default: 0 },
    place_id: { type: Number, default: 0 },
    reserveTime: { type: String, default: "" },
  },
  data() {
    return {
      dialogVisible: false,
      dialogAddReserve: false, //添加预订窗口是否弹出
      dialogOpenPlace: false, //添加开台窗口是否弹出
      msg: "座位详情",
      singlePage: true,
      messageList: [],
      queueList: [],
      reserveList: {},
      curPlaceInfo: "",
      placeStatusOption: [
        { value: 1, label: "空闲" },
        { value: 2, label: "消费中" },
        { value: 3, label: "故障" },
        { value: 4, label: "已结账" },
        { value: 5, label: "清洁中" },
        { value: 6, label: "锁定" },
      ],
      changeOption: 2,
      count: 0,
      page: 1,
      pageSign: 0,
      mainContentHeight: 0,
      shopSetHeight: document.documentElement.clientHeight,
      shopSetWidth: document.documentElement.clientWidth,
      hour: "",
      minute: "",
      reserveTableData: "",
      itemData: {},
      ruleForm: {
        reserve_id: "",
        phone: "",
        name: "",
        remark: "",
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      },
      bill_id: 0,
      billData: {},
      isBill: false,
      reserve_id: 0,
      restaurants: [],
      place_name: "",
      searchPlace: [],
      showKaitai: true,
    };
  },
  watch: {
    place_id: {
      immediate: true,
      handler(val) {
        if (val) {
          this.iniCom();
        }
      },
    },
  },
  created() {},
  mounted() {
    this.mainContentHeight = this.shopSetHeight - 70;
    window.onresize = () => {
      this.shopSetHeight = document.documentElement.clientHeight;
      this.shopSetWidth = document.documentElement.clientWidth;

      this.mainContentHeight = this.shopSetHeight - 70;
    };
  },
  methods: {
    //初始化数据
    iniCom() {
      // this.curPlaceInfo = sessionStorage.getItem('curPlaceInfo').split(',')
      //this.type_id = sessionStorage.getItem("type_id");
      //this.reserveTime = this.$route.query.reserveTime;

      this.dialogAddReserve = false;
      this.dialogOpenPlace = false;
      // 是否显示开台
      var date = new Date();
      var pyear = date.getFullYear();
      var pmonth = date.getMonth() + 1;
      var pdate = date.getDate();
      if (pmonth < 10) {
        pmonth = "0" + pmonth;
      }
      if (pdate < 10) {
        pdate = "0" + pdate;
      }
      var p_time = pyear + "-" + pmonth + "-" + pdate;
      if (this.reserveTime != p_time) {
        this.showKaitai = false;
      } else {
        this.showKaitai = true;
      }
      //this.place_id = this.$route.query.place_id;
      if (this.place_id > 0) {
        this.placeInfo(() => {
          this.placeReserve();
          this.getNewMessageList();
          this.placeStatus();
        });
      }

      this.placeList();
    },

    //添加预订
    handleAddReserve() {
      this.dialogOpenPlace = false;
      this.dialogAddReserve = true;
    },
    //取消添加预订
    handleCancelAddReserve() {
      this.dialogOpenPlace = false;
      this.dialogAddReserve = false;
    },
    //开台
    handleOpenPlace() {
      this.dialogAddReserve = false;
      this.dialogOpenPlace = true;
    },
    handleCancelOpenPlace() {
      this.dialogAddReserve = false;
      this.dialogOpenPlace = false;
    },
    // 座位列表
    placeList() {
      let datas = {
        page_size: 10000,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      //this.$store.dispatch("shop/placeList", data).then((res) => {
      this.api.shop.placeList(datas).then(({ data }) => {
        let res = data;
        this.restaurants = res.data;
      });
    },
    // 座位详情
    placeInfo(fun) {
      let datas = {};
      if (this.showKaitai) {
        datas = { id: this.place_id };
      } else {
        datas = { id: this.place_id, date: this.reserveTime };
      }
      datas.merchant_id = Number(this.merchant_id);
      datas.shop_id = Number(this.shop_id);
      //this.$store.dispatch("shop/getPlaceDetail", data).then((res) => {
      this.api.shop.shopMainPlaceDetail(datas).then(({ data }) => {
        let res = data;
        this.curPlaceInfo = res.data;
        fun();
      });
    },
    inputFun(val) {
      this.place_id = val;
    },
    // 修改线下预订
    submitChange() {
      this.ruleForm.reserve_id = this.reserveTableData.reserve_id;
      this.ruleForm.phone = this.reserveTableData.phone;
      this.ruleForm.name = this.reserveTableData.name;
      this.ruleForm.remark = this.reserveTableData.remark;
      let data = this.ruleForm;
      this.$store.dispatch("mainConsole/editReserve", data).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.placeReserve();
      });
    },
    // 撤订
    cancelFun() {
      this._toRouter("/cancelOrder", { reserve_id: this.reserve_id });
    },
    // 预订转换
    transitionFun() {
      this.dialogVisible = true;
    },
    changePlaceFun() {
      let data = {
        place_id: this.place_id,
        reserve_id: this.reserve_id,
      };
      this.$store.dispatch("mainConsole/reserveChange", data).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.dialogVisible = false;
        // this.placeReserve()
        this._toRouter("/mainConsoler");
      });
    },
    placeStatus() {
      for (var i = 0; i < this.placeStatusOption.length; i++) {
        if (
          this.placeStatusOption[i].value ==
          Number(this.curPlaceInfo.place_status)
        ) {
          this.changeOption = Number(this.curPlaceInfo.place_status);
        }
      }
      // console.log('座位状态',this.changeOption)
    },
    changePlaceStatus() {
      let idArr = [];
      idArr.push(Number(this.curPlaceInfo.place_id));
      let datas = {
        place_id: idArr,
        status: this.changeOption,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      //this.$store.dispatch("mainConsole/SetPlaceStatus", data).then((res) => {
      this.api.shop.shopMainSetPlaceStatus(datas).then(({ data }) => {
        let res = data;
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        // this._toRouter('/mainConsoler')
      });
    },
    getNewMessageList() {
      this.pageSign = 0;
      let datas = {
        page: this.page,
        is_main: 1,
        place_id: Number(this.curPlaceInfo.place_id),
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      //this.$store.dispatch("mainConsole/placeCall", data).then((res) => {
      this.api.shop.shopMainPlaceCall(datas).then(({ data }) => {
        let res = data;
        this.messageList = res.data;
        this.count = res.count;
      });
    },
    placeCallProcess(call_id, status) {
      let data = {
        status: status,
        call_id: call_id,
      };
      this.$store.dispatch("mainConsole/placeCallProcess", data).then((res) => {
        this.getNewMessageList();
      });
    },
    placeQueue() {
      this.pageSign = 1;
      let datas = {
        //page: this.page,
        place_type_id: this.curPlaceInfo.type_id,
        is_main: 1,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      //this.$store.dispatch("mainConsole/placeQueue", data).then((res) => {
      this.api.shop.shopMainPlaceQueue(datas).then(({ data }) => {
        let res = data;
        console.log(res);
        this.count = res.count;
        this.queueList = res.data;
      });
    },
    placeReserve() {
      this.pageSign = 2;
      var date = new Date();
      this.hour = date.getHours();
      this.minute = date.getMinutes();
      if (this.hour < 10) {
        this.hour = "0" + this.hour;
      }
      if (this.minute < 10) {
        this.minute = "0" + this.minute;
      }
      var timeStr = this.hour + ":" + this.minute;
      var times = "";
      times = this.reserveTime + " " + timeStr;
      let datas = {};
      if (this.type_id == 2) {
        datas = {
          page: this.page,
          place_id: this.curPlaceInfo.place_id,
          time: times,
        };
      } else {
        datas = {
          page: this.page,
          place_id: this.curPlaceInfo.place_id,
          time: this.reserveTime,
        };
      }
      datas.merchant_id = this.merchant_id;
      datas.shop_id = this.shop_id;
      //this.$store.dispatch("mainConsole/placeReserve", data).then((res) => {
      this.api.shop.shopMainPlaceReserve(datas).then(({ data }) => {
        let res = data;
        this.count = res.count;
        if (res.data && res.data.reserve) {
          sessionStorage.setItem(
            "reserveDataOpen",
            JSON.stringify(res.data.reserve)
          );
          this.reserveTableData = res.data.reserve;
          this.reserve_id = res.data.reserve.reserve_id;
          this.place_id = res.data.reserve.place_id;
          this.place_name = res.data.reserve.place_name;
          this.isBill = false;
        } else if (res.data && res.data.bill) {
          this.isBill = true;
          this.bill_id = res.data.bill.bill_id;
          this.billData = res.data;
        }
      });
    },
    //叫号
    openDelDialog(row, status) {
      let data = {
        queue_id: row.queue_id,
        status: status,
      };
      this.$store.dispatch("mainConsole/callQueue", data).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.placeQueue();
      });
    },
    handleTabClick(tab, event) {
      console.info(tab.index);
      // if (tab.index == 0) {
      //   this.getNewMessageList();
      // } else if (tab.index == 1) {
      //   this.placeQueue();
      // } else if (tab.index == 2) {
      //   this.placeReserve();
      // } else if (tab.index == 3) {
      //   this.placeQueue();
      // }
      if (tab.index == 0) {
        this.getNewMessageList();
      } else if (tab.index == 1) {
        this.placeReserve();
      }
    },
    updateDialog(row) {
      // console.log('查看',row)
      let data = {
        call_id: row.call_id,
      };
      this.$store.dispatch("mainConsole/callDetail", data).then((res) => {});
    },
    goBack() {
      this.$router.go(-1);
    },
    toPath(path) {
      if (this.bill_id) {
        this._toRouter(path, { bill_id: this.bill_id });
      } else if (this.reserve_id) {
        this._toRouter(path, { reserve_id: this.reserve_id });
      } else {
        this._toRouter(path);
      }
    },
    pageChange(page) {
      this.page = page;
      if (this.pageSign == 0) {
        this.getNewMessageList();
      } else if (this.pageSign == 1) {
        this.placeQueue();
      } else if (this.pageSign == 2) {
        this.placeReserve();
      } else if (this.pageSign == 3) {
        this.placeQueue();
      }
    },
    // 审核通过
    checkPassFun() {
      let data = {
        reserve_id: this.reserve_id,
      };
      this.$store.dispatch("reserve/confirmReserve", data).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this._toRouter("/mainConsoler");
      });
    },
    // 审核不通过
    checkNoPassFun() {
      let data = {
        reserve_id: this.reserve_id,
      };
      this.$store.dispatch("reserve/cancelReserver", data).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this._toRouter("/mainConsoler");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.shopSet {
  background: #000000;
  .topNav {
    background-color: #000000;
    background-size: auto 100px;
    height: 70px;
    width: 100%;
    color: #fff;
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

    .placeTypeInfo {
      background: #2e2e2e;
      border: 1px solid #555555;
      border-radius: 3px;
      min-width: 430px;
      height: 38px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        margin: 0 10px;
      }
    }
    .topNavBtn {
      background: #ffbe11;
      border-radius: 3px;
      font-weight: bold;
      color: #0a0a0a;
    }
    .topNavItem {
      margin-left: 15px;
      border: none !important;
      // width: 90px;
      height: 38px;
    }
    .goBack {
      width: 25px;
      height: 38px;
      i {
        font-size: 20px;
      }
    }
    .topNavItemBtn {
      margin-left: 10px;
      height: 38px;
      border: none !important;
    }
    .updateStatus {
      width: 150px;
    }
  }
  .mainContent {
    width: 100%;
    // height: 990px;
    padding: 20px;
    // .tabBg{
    //     height: 100%;
    // }
    .tabNav {
      border: none;
      color: #fff !important;
      .bottomBtn {
        margin-top: 10px;
      }
      .undo {
        color: #da0202;
      }
      .doing {
        color: #dda100;
      }
      .done {
        color: #8c8c8c;
      }
    }
  }
}
</style>
<style lang="scss">
.consolePlaceInfo .tabNav .el-tabs__header {
  border: none !important;
}
.consolePlaceInfo .tabNav .is-active {
  border: none !important;
}
.consolePlaceInfo .tabNav .reserveForm .el-form-item {
  display: block !important;
  margin: 0;
}
.consolePlaceInfo .topNav .updateStatus .el-input__inner {
  border: none;
}
.subBox {
  .billBox {
    font-size: 14px;
    line-height: 40px;
    margin-left: 60px;
  }
  .reserveInfoBox {
    display: flex;
    font-size: 14px;
    .info-left {
      margin-right: 60px;
      div {
        margin-top: 20px;
      }
    }
    .info-right {
      display: flex;
      align-items: center;
      .el-button--danger {
        color: #fff;
        background-color: #f56c6c;
        border-color: #f56c6c;
      }
      .tx-img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        margin-right: 10px;
      }
      .xm-nav {
        line-height: 26px;
      }
    }
  }
  .zanwu {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
    padding: 40px 0;
  }
}
.pagination {
  width: 100%;
  text-align: center;
}
</style>


