<template>
  <div class="lightTheme">
    <div class="shopSet" :style="'height:' + shopSetHeight + 'px'">
      <div class="layoutTop">
        <div class="topLeft center">{{ shopName }}</div>
        <div class="adminInfo" id="adminInfo">
          <span style="margin-left: 0px 20px 0px 20px; font-size: 20px">{{
            shopInfoData.name
          }}</span>
        </div>
        <div class="topRight center" style="margin-right: 30px">
          <div class="businessNav">
            <el-select
              v-model="businessVal"
              placeholder="请选择"
              @change="changeBusiness"
              class="kkk"
            >
              <el-option
                v-for="item in businessArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <div class="content">
        <!-- 酒吧 -->
        <div class="topBox flexRow" ref="tapp" v-if="type_id != 2">
          <ul class="reserve_day flexRow">
            <li
              v-for="(item, index) in reserve_days"
              :key="index"
              class="flexRow"
              @click="changeReserve_day(index, item)"
              :class="{ active: curReserveIndex == index }"
            >
              <span>{{ item[1] }}</span>
              <span class="days">{{ item[0] }}</span>
              <i
                v-if="checkStatus && item[0] == getMessage_params"
                class="top-check icon iconfont icon-reserve2"
              ></i>
            </li>
          </ul>
          <div class="c-box">
            <el-button class="searchSVG mr20" @click="getSvg"
              >查看商家平面图<i class="icon iconfont icon-magnifier"></i
            ></el-button>
            <!-- <el-date-picker v-model="searchDay"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            suffix-icon
                            type="date"
                            placeholder="查找指定日期"
                            class="searchDay mr20"> </el-date-picker> -->
            <el-input
              v-model="searchPlaceOrPhone"
              placeholder="搜索座位号或手机"
              clearable
              class="searchPlaceOrPhone mr20"
              @change="filterPlaceFun"
            ></el-input>
            <span><i class="icon iconfont icon-becareful"></i>审核方式 ：</span>
            <el-radio-group
              v-model="checkType"
              class="checkRadio"
              @change="ReserveAuditFun"
            >
              <el-radio :label="1">自动</el-radio>
              <el-radio :label="0">人工</el-radio>
            </el-radio-group>
          </div>
        </div>
        <!-- 量贩式 -->
        <div class="topBox flexRow" ref="tapp" v-else>
          <div v-if="isFromReserve == 1">
            <reserve-info :kReserveData="kReserveData"></reserve-info>
          </div>
          <div v-else>
            <filter-item
              :isHome="isHome"
              :merchant_id="merchant_id"
              :shop_id="shop_id"
              @childrenFun="parentFun"
            ></filter-item>
          </div>
        </div>

        <div
          class="mainContent flexRow"
          :style="'height:' + (shopSetHeight - h1 - 70 - 40) + 'px'"
        >
          <div
            class="placeType"
            :style="'height:' + (shopSetHeight - h1 - 110 - 4) + 'px'"
          >
            <ul
              class="flexRow"
              :style="'height:' + (shopSetHeight - h1 - 110 - 4) + 'px'"
            >
              <li class="downIcon iconBtn flexRow" @click="typeView(0)">
                <i class="icon iconfont icon-weibiaoti1"></i>
              </li>
              <div
                class="typeContent"
                :style="'height:' + (shopSetHeight - h1 - 70 - 40 - 88) + 'px'"
              >
                <div
                  class="typeContentOverFlow"
                  :style="'margin-top:' + typeOffset + 'px;'"
                >
                  <li
                    class="placeTypeLi flexRow"
                    :class="{ active: curPlaceTypeIndex == 999 }"
                    @click="changePlaceType(999, [0, '全部类型'])"
                  >
                    全部类型
                  </li>
                  <li
                    class="placeTypeLi flexRow"
                    :class="{ active: curPlaceTypeIndex == index }"
                    v-for="(item, index) in place_type"
                    :key="index"
                    @click="changePlaceType(index, item)"
                  >
                    {{ item[1] }}
                  </li>
                </div>
              </div>
              <li class="upIcon iconBtn flexRow" @click="typeView(1)">
                <i class="icon iconfont icon-xiangxia"></i>
              </li>
            </ul>
          </div>
          <div class="placeMain">
            <div class="placeArea">
              <ul class="flexRow">
                <li class="leftIcon iconBtn flexRow" @click="areaView(1)">
                  <i class="icon iconfont icon-xiangzuo"></i>
                </li>
                <div
                  class="areaContent"
                  :style="'width:' + (shopSetWidth - 338) + 'px'"
                >
                  <div
                    class="areaContentOverFlow"
                    :style="
                      'margin-left:' +
                      areaOffset +
                      'px;width:' +
                      placeAreaWidth +
                      'px'
                    "
                  >
                    <li
                      class="placeAreaLi flexRow"
                      :class="{ active: curPlaceAreaIndex == 999 }"
                      @click="changePlaceArea(999, [0, '全部区域'])"
                    >
                      全部区域
                    </li>
                    <li
                      class="placeAreaLi flexRow"
                      :class="{ active: curPlaceAreaIndex == index }"
                      @click="changePlaceArea(index, item)"
                      v-for="(item, index) in place_area"
                      :key="index"
                    >
                      {{ item[1] }}
                    </li>
                  </div>
                </div>
                <div class="placeAreaRight" v-if="type_id != 2">
                  <li
                    class="rightIcon iconBtn flexRow"
                    style="align-items: center"
                    @click="areaView(0)"
                  >
                    <i class="icon iconfont icon-xiangyou"></i>
                  </li>
                  <!-- <el-button
                    size="mini"
                    class="placeAreaBtn"
                    v-show="!showMutilCheckBtn"
                    @click="showMutilCheckBtn = !showMutilCheckBtn"
                    >多选操作</el-button
                  > -->
                  <el-button
                    size="mini"
                    class="placeAreaBtn"
                    v-show="showMutilCheckBtn"
                    @click="openMutilDialog"
                    >确定</el-button
                  >
                  <el-button
                    size="mini"
                    class="placeAreaBtn"
                    v-show="showMutilCheckBtn"
                    @click="cancleMutil"
                    >取消</el-button
                  >
                </div>
              </ul>
            </div>
            <div
              class="placeBox"
              :style="'height:' + (shopSetHeight - h1 - 70 - 40 - 44) + 'px'"
            >
              <div class="centerPlace">
                <ul
                  class="placeUl"
                  :style="
                    'height:' +
                    (shopSetHeight - h1 - 70 - 44 - 40 - 81 - 40) +
                    'px'
                  "
                >
                  <!-- :class="{'active':curPlaceIndex == index2, 'darkBg':placeStatusData[index2][1] == 3 || placeStatusData[index2][1] == 6 || placeStatusData[index2][1] == 5}" -->
                  <li
                    class="placeBoxLi"
                    :class="{
                      darkBg: item[13] == 3 || item[13] == 6 || item[13] == 5,
                    }"
                    v-for="(item, index2) in place"
                    :key="index2"
                    @click="placeInfo(index2, item)"
                    v-show="
                      (curPlaceTypeIndex != 999
                        ? item[15] == curPlaceType
                        : true) &&
                      (curPlaceAreaIndex != 999
                        ? item[14] == curPlaceArea
                        : true) &&
                      (placeStatus != 0 ? item[13] == placeStatus : true) &&
                      (curStatus == 1 ? item[18] != 0 : true) &&
                      (curStatus == 2 ? item[20] != 0 : true)
                    "
                  >
                    <div class="iconBox">
                      <!-- <div class="placeQueue">
                                            <i class="iconfont icon-queue" v-show="choosePlaceData.includes(index2,0)"></i>
                                        </div> -->
                      <!-- 有待审核就显示 -->
                      <div class="placeMenu">
                        <i
                          class="iconfont icon-reserve2"
                          v-if="item[19] != 0"
                        ></i>
                      </div>
                      <div class="placeMenu">
                        <i
                          class="foot-icon iconfont icon-call"
                          v-show="item[20] != 0"
                        ></i>
                      </div>
                    </div>

                    <div
                      @click="choosePlace(item)"
                      class="checkBox"
                      v-show="showMutilCheckBtn"
                    >
                      <i
                        class="iconfont icon-tick"
                        v-show="choosePlaceData.includes(index2, 0)"
                      ></i>
                    </div>
                    <!-- 空闲时显示座位图标 -->
                    <i
                      class="iconfont icon-seat2"
                      v-show="
                        item[13] == 1 &&
                        item[18] == 0 &&
                        item[18] == 0 &&
                        item[20] == 0
                      "
                    ></i>
                    <span
                      v-show="
                        item[13] == 1 &&
                        item[18] == 0 &&
                        item[18] == 0 &&
                        item[20] == 0
                      "
                      >{{ item[3] }}({{ item[8] }})</span
                    >
                    <!-- 故障 -->
                    <i
                      class="guzhang iconfont icon-repair"
                      v-show="item[13] == 3 && item[18] == 0 && item[20] == 0"
                    ></i>
                    <span
                      v-show="item[13] == 3 && item[18] == 0 && item[20] == 0"
                      >{{ item[3] }}({{ item[8] }})</span
                    >
                    <!-- 锁定 -->
                    <i
                      class="guzhang iconfont icon-prohibit"
                      v-show="item[13] == 6 && item[18] == 0 && item[20] == 0"
                    ></i>
                    <span
                      v-show="item[13] == 6 && item[18] == 0 && item[20] == 0"
                      >{{ item[3] }}({{ item[8] }})</span
                    >
                    <!-- 清洁中 -->
                    <i
                      class="guzhang iconfont icon-clean"
                      v-show="item[13] == 5 && item[18] == 0 && item[20] == 0"
                    ></i>
                    <span
                      v-show="item[13] == 5 && item[18] == 0 && item[20] == 0"
                      >{{ item[3] }}({{ item[8] }})</span
                    >
                    <!-- 有状态 -->
                    <!-- <span class="placeTitle" :class="['titleStatus'+placeStatusData[index2][1],{'reserveBg':placeStatusData[index2][6]!=0},{'callingBg':item[20]!=0}]" v-show="placeStatusData[index2][1] != 1 || placeStatusData[index2][6] != 0 || item[20] != 0">
                                        {{item[3]}}({{item[8]}})
                                    </span> -->
                    <!-- 1空闲 2消费中 3故障 4已结账 5清洁中 6锁定 -->
                    <!-- 消费中 item[13]为座位状态-->
                    <span
                      class="placeTitle"
                      :class="['titleStatus' + item[13]]"
                      v-show="
                        item[13] != 1 &&
                        item[13] != 3 &&
                        item[13] != 6 &&
                        item[13] != 5
                      "
                    >
                      {{ item[3] }}({{ item[8] }})
                    </span>
                    <!-- 有预定且不是消费中 item[18]为预订数量-->
                    <!-- 莉莉提了bug，要求有预定时显示最大人数，之前是显示预定数量 -->
                    <span
                      class="placeTitle"
                      :class="['reserveBg']"
                      v-show="item[18] != 0 && item[13] != 2"
                    >
                      {{ item[3] }}({{ item[8] }})
                    </span>
                    <!-- item[13] 为座位状态 1空闲 2消费中 3故障 4已结账 5清洁中 6锁定-->
                    <span
                      class="orderInfo"
                      v-show="
                        (((item[13] != 1 && item[18] == 0) ||
                          (item[13] == 1 && item[18] != 0) ||
                          (item[13] == 2 && item[18] != 0)) &&
                          item[13] != 3 &&
                          item[13] != 6 &&
                          item[13] != 5) ||
                        item[18] != 0 ||
                        item[20] != 0
                      "
                    >
                      <span>预定{{ item[10] / 100 }}元</span>
                      <span>{{ item[15] }}</span>
                    </span>
                  </li>
                </ul>
              </div>
              <div
                class="serviceTip"
                :style="'width:' + (shopSetWidth - 84) + 'px'"
              >
                <el-button
                  class="serviceBtn"
                  @click="choosePlaceStatus(9, 0)"
                  :class="{ active: curStatus == 9 }"
                  ><span>全部</span></el-button
                >
                <el-button
                  class="serviceBtn"
                  @click="choosePlaceStatus(1, 0)"
                  :class="{ active: curStatus == 1 }"
                  v-show="type_id != 2"
                >
                  <!-- <i class="foot-icon iconfont icon-reserve2"></i> -->
                  <i class="reserved"></i>
                  <span>已预订 ({{ reserved }})</span>
                </el-button>
                <el-button
                  class="serviceBtn"
                  @click="choosePlaceStatus(2, 0)"
                  :class="{ active: curStatus == 2 }"
                  ><i class="foot-icon iconfont icon-call"></i
                  ><span>呼叫 ({{ calling }})</span></el-button
                >
                <el-button
                  class="serviceBtn"
                  @click="choosePlaceStatus(3, 2)"
                  :class="{ active: curStatus == 3 }"
                  ><i class="consumpting"></i
                  ><span>消费中 ({{ consumpting }})</span></el-button
                >
                <el-button
                  class="serviceBtn"
                  @click="choosePlaceStatus(4, 5)"
                  :class="{ active: curStatus == 4 }"
                  ><i class="foot-icon huiseIcon iconfont icon-clean"></i
                  ><span>清洁中 ({{ cleaning }})</span></el-button
                >
                <el-button
                  class="serviceBtn"
                  @click="choosePlaceStatus(5, 3)"
                  :class="{ active: curStatus == 5 }"
                  ><i class="foot-icon huiseIcon iconfont icon-repair"></i
                  ><span>故障 ({{ fault }})</span></el-button
                >
                <el-button
                  class="serviceBtn"
                  @click="choosePlaceStatus(6, 6)"
                  :class="{ active: curStatus == 6 }"
                  ><i class="foot-icon huiseIcon iconfont icon-prohibit"></i
                  ><span>不开放 ({{ notOpen }})</span></el-button
                >
                <el-button
                  class="serviceBtn"
                  @click="choosePlaceStatus(7, 4)"
                  :class="{ active: curStatus == 7 }"
                  ><i class="closed"></i
                  ><span>已结账 ({{ closed }})</span></el-button
                >
                <el-button
                  class="serviceBtn"
                  @click="choosePlaceStatus(8, 1)"
                  :class="{ active: curStatus == 8 }"
                  ><i class="foot-icon huiseIcon iconfont icon-seat2"></i
                  ><span>空闲 ({{ free }})</span></el-button
                >
              </div>
            </div>
          </div>

          <!-- 商家平面图 -->
          <el-dialog
            :visible.sync="showShopSVG"
            class="shopSVG"
            title="商家平面图"
          >
            <el-image style="width: 100%" :src="svgUrl"></el-image>
          </el-dialog>
        </div>
      </div>
    </div>
    <el-dialog
      title="暂停营业-公告"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <el-input
          type="textarea"
          v-model="noticeVal"
          placeholder="请输入暂停营业公告"
          :autosize="{ minRows: 4, maxRows: 16 }"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitBusiness">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 打开座位 -->
    <el-dialog
      title="控制台明细"
      :visible.sync="placeInfoDialog"
      :close-on-click-modal="false"
      width="70%"
    >
      <PI
        :merchant_id="merchant_id"
        :shop_id="shop_id"
        :type_id="type_id"
        :place_id="selected_place_id"
        :reserveTime="getMessage_params"
      />
    </el-dialog>
    <go-back v-if="showBack"></go-back>
  </div>
</template>

<script>
import "@/styles/theme/lightTheme/lightTheme.scss";
import "@/styles/font.css";
import filterItem from "./components/consoler/filterItem.vue";
import reserveInfo from "./components/consoler/reserveInfo.vue";
import PI from "./components/consoler/PlaceInfo";
export default {
  name: "Consoler",
  components: {
    filterItem,
    reserveInfo,
    PI,
  },
  data() {
    return {
      showBack: true,
      selected_place_id: 0,
      dialogVisible: false,
      placeInfoDialog: false,
      noticeVal: "",
      business_status: 1,
      shopInfoData: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
      msg: "控制台",
      showPlaceMutil: false, //显示多选按钮
      showOrderInfo: false, //显示订单信息
      showMutilCheckBtn: false, //多选操作确认按钮
      // showMutileOpenPlace:false,//批量开台
      // showMutileAddReserve:false,//批量添加预定
      showShopSVG: false, //查看商家平面图
      showClo: false,
      svgUrl: "",
      checkType: Number(sessionStorage.getItem("checkType")),
      reserve_days: [],
      searchDay: "",
      searchPlaceOrPhone: "",

      curReserveIndex: 0,
      curPlaceAreaIndex: 999,
      curPlaceArea: {},
      curPlaceAreaValue: "",
      curPlaceTypeIndex: 999,
      curPlaceType: {},
      curPlaceIndex: 0,
      curStatus: 9,
      placeStatus: 0,
      reserveStatus: 0,
      callingStatus: 0,

      place_type: [],
      place_area: [],
      place: [],
      reserveData: [],
      placeStatusData: [],

      placeStatusOption: [
        { value: 1, label: "空闲" },
        { value: 2, label: "消费中" },
        { value: 3, label: "故障" },
        { value: 4, label: "已结账" },
        { value: 5, label: "清洁中" },
        { value: 6, label: "锁定" },
      ],
      changeOption: 1,

      choosePlaceData: [],
      mutilPlaceData: [],
      placeId: [],
      placeArr: [],

      moreMsg: {},
      areaOffset: 0,
      typeOffset: 0,
      disableChoose: false,

      allPlace: 0, //总座位数
      reserved: 0, //已预订
      calling: 0, //呼叫
      consumpting: 0, //消费中
      cleaning: 0, //清洁中
      fault: 0, //故障
      notOpen: 0, //不开放
      closed: 0, //已结账
      free: 0, //空闲

      getMessage_params: "", //位置接口参数

      meauData: [
        {
          icon: "../assets/shop3.png",
          icon_active: "../assets/shop2.png",
          type: "",
          text: "切换店铺",
          status: false,
        },
        {
          icon: "../assets/set_up2.png",
          icon_active: "../assets/set_up.png",
          type: "",
          text: "账号管理",
          status: false,
        },
        {
          icon: "../assets/cancellation2.png",
          icon_active: "../assets/cancellation.png",
          type: "logout",
          text: "注销",
          status: false,
        },
      ],
      subMenuData: [],
      active: "",
      isShow: false,
      shopName: "",
      shopListData: [],
      switchStore: {
        merchant_id: 1,
        shop_id: 1,
        staff_id: 5,
      },
      shopSetHeight: document.documentElement.clientHeight - 135,
      shopSetWidth: document.documentElement.clientWidth,
      placeAreaWidth: 0,
      placeTypeHeight: 0,
      radio: "",
      personNum: 0,
      merchant_id: 0,
      shop_id: 0,
      type_id: 1,
      placeTypeData: [],
      isHome: 1,
      h1: 0,
      reserve_id: 0,
      isFromReserve: 0,
      kReserveData: {},
      noticeData: [],
      noticeVal: "",
      filterPlaceData: [],
      reserve_check: [],
      checkStatus: false,
      oldPlace: [],
      businessVal: "",
      businessArr: [
        {
          value: "1",
          label: "营业中",
        },
        {
          value: "0",
          label: "暂停营业",
        },
      ],
      //
      myDate: "",
      year: "", //获取年
      month: "", //获取月，默认从0开始，所以要加一
      date: "", //获取日
      hours: "", //获取小时
      minutes: "", //获取分
      seconds: "", //获取秒
      weekend: "", //获取星期几，这里获得到的是数字1-7，所以我下面自己new了一个数组把获取到的数字当下标
      weeks: [],
      day: "", //这样就是显示的星期x了
    };
  },
  created() {
    this.merchant_id = Number(this.$route.query.merchant_id);
    this.shop_id = Number(this.$route.query.shop_id);
    // console.info(this.merchant_id, this.shop_id);
    // return;
    // 当前时间
    // 当前时间
    //this.changeTime();
    //setInterval(() => {
    //  this.changeTime(); //每隔一秒运行一次
    //}, 1000);
    // 审核方式
    if (this.checkType == 0) {
      sessionStorage.setItem("checkType", this.checkType);
    }

    this.checkType = Number(sessionStorage.getItem("checkType"));

    this.shopData();
    this.getMessage();
    this.showNoticeFun();
    // this.getPlaceType()
    this.reserve_id = this.$route.query.reserve_id;
    this.isFromReserve = this.$route.query.isFromReserve;
    if (this.reserve_id) {
      this.reserveDataFun(this.reserve_id);
    }
    // this.shopListData = JSON.parse(localStorage.getItem("userInfo"));
    // let itemArr = [];
    // this.shopListData.map((item, index) => {
    //   if (index == 0) {
    //     this.shopName = item.staff_account;
    //     localStorage.setItem("shopName", this.shopName);
    //     itemArr.push({
    //       shopname: item.staff_account,
    //       merchant_id: item.merchant_id,
    //       shop_id: item.shop_id,
    //       staff_id: item.staff_id,
    //       status: true,
    //     });
    //   } else {
    //     itemArr.push({
    //       shopname: item.staff_account,
    //       merchant_id: item.merchant_id,
    //       shop_id: item.shop_id,
    //       staff_id: item.staff_id,
    //       status: false,
    //     });
    //   }
    // });
    // this.subMenuData = itemArr;
    this.moreMsg = setInterval(() => {
      this.getMessage_status("", this.getMessage_params);
    }, 5000);
  },
  destroyed() {
    clearInterval(this.moreMsg);
  },
  mounted() {
    this.h1 = this.$refs.tapp.offsetHeight;
    setTimeout(() => {
      this.h1 = this.$refs.tapp.offsetHeight;
    }, 500);
    // 头部的操作员以及时间模块的定位
    var o = document.getElementById("adminInfo");
    var w = o.clientWidth || o.offsetWidth;
    o.style.left = (this.shopSetWidth - w) / 2 + "px";
    //
    window.onresize = () => {
      this.shopSetHeight = document.documentElement.clientHeight;
      this.shopSetWidth = document.documentElement.clientWidth;
      this.h1 = this.$refs.tapp.offsetHeight;
      // 头部的操作员以及时间模块的定位
      o.style.left = (this.shopSetWidth - w) / 2 + "px";
    };
  },
  watch: {},
  methods: {
    // 获取当前时间
    changeTime() {
      (this.myDate = new Date()),
        (this.year = this.myDate.getFullYear()), //获取年
        (this.month = this.myDate.getMonth() + 1), //获取月，默认从0开始，所以要加一
        (this.date = this.myDate.getDate()), //获取日
        (this.hours = this.myDate.getHours()), //获取小时
        (this.minutes = this.myDate.getMinutes()), //获取分
        (this.seconds = this.myDate.getSeconds()), //获取秒
        (this.weekend = this.myDate.getDay()), //获取星期几，这里获得到的是数字1-7，所以我下面自己new了一个数组把获取到的数字当下标
        (this.weeks = new Array(
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        )),
        (this.day = this.weeks[this.weekend]); //这样就是显示的星期x了
      if (this.month < 10) {
        this.month = "0" + this.month;
      }
      if (this.date < 10) {
        this.date = "0" + this.date;
      }
      if (this.hours < 10) {
        this.hours = "0" + this.hours;
      }
      if (this.minutes < 10) {
        this.minutes = "0" + this.minutes;
      }
      if (this.seconds < 10) {
        this.seconds = "0" + this.seconds;
      }
    },
    //预定详情
    reserveDataFun(reserve_id) {
      let data = {
        reserve_id: reserve_id,
      };
      this.$store.dispatch("reserve/getReserveDetail", data).then((res) => {
        this.kReserveData = res.data;
      });
    },
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
      let data = {
        page: 1,
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
      data.merchant_id = this.merchant_id;
      data.shop_id = this.shop_id;
      //this.$store.dispatch("mainConsole/filterReserve", data).then((res) => {
      this.api.shop.shopMainFindReserve(data).then(({ data }) => {
        let res = data;
        sessionStorage.setItem("reserveKdata", JSON.stringify(res.data));
        sessionStorage.setItem("reserveKcount", res.count);
        //this._toRouter("/ktvReserveList");
      });
    },
    shopData() {
      let datas = {
        merchant_id: Number(this.merchant_id),
        shop_id: Number(this.shop_id),
      };
      this.api.shop.getShopDetail(datas).then(({ data }) => {
        //this.$store.dispatch("shop/getShopDetail", "").then((res) => {
        let res = data;
        this.shopInfoData = res.data;
        this.shop_id = res.data.shop_id;
        this.type_id = res.data.type_id;
        this.business_status = res.data.business_status;
        if (this.business_status == 1) {
          this.businessVal = "营业中";
        } else {
          this.businessVal = "暂停营业";
        }
        sessionStorage.setItem("shop_id", this.shop_id);
        sessionStorage.setItem("type_id", this.type_id);
      });
    },
    //获取初始信息
    getMessage() {
      const datas = {
        msg_type: "init",
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      //this.$store.dispatch("mainConsole/getMessage", data).then((res) => {
      this.api.shop.shopMainMessage(datas).then(({ data }) => {
        // console.log('5秒轮询:',res)
        let res = data;
        this.reserve_days = res.data.reserve_days;
        this.place_type = res.data.place_type;
        this.place_area = res.data.place_area;
        this.placeAreaWidth = (this.place_area.length + 1) * 110;
        this.placeTypeHeight = (this.place_type.length + 1) * 110;
        this.place = res.data.place;
        this.allPlace = res.data.place.length;

        for (let i = 0; i < this.allPlace; i++) {
          this.placeStatusData.push([0, 0, 0, 0, 0, 0, 0]);
        }
        this.place.forEach((item) => {
          item[17] = "";
          item[18] = ""; //预定数
          item[19] = ""; //待审核
          item[20] = ""; //呼叫
        });
        this.getMessage_params = res.data.reserve_days[0][0];
        this.getMessage_status("", this.getMessage_params);
      });
    },
    //获取信息状态
    getMessage_status(type, data) {
      let datas = {};
      this.getMessage_params = data;
      if (type == "day") {
        datas = { query_date: this.getMessage_params };
      } else if (type == "placeNum") {
        datas = { query_date: this.getMessage_params };
      } else {
        if (!!this.getMessage_params) {
          datas = { query_date: this.getMessage_params };
        } else {
          datas = { msg_type: this.getMessage_params };
        }
      }
      var reserved = 0;
      var calling = 0;
      var consumpting = 0;
      var cleaning = 0;
      var fault = 0;
      var notOpen = 0;
      var closed = 0;
      var free = 0;
      datas.merchant_id = this.merchant_id;
      datas.shop_id = this.shop_id;
      this.api.shop.shopMainMessage(datas).then(({ data }) => {
        //this.$store.dispatch("mainConsole/getMessage", datas).then((res) => {
        // 座位状态
        let res = data;
        this.placeStatusData = res.data.place_status;
        // 待审核订单
        if (res.data.reserve_check != "") {
          this.reserve_check = res.data.reserve_check;
          this.checkStatus = true;
        } else {
          this.checkStatus = false;
        }

        res.data.place_status.forEach((item, index) => {
          calling += parseInt(item[5]);
          switch (item && item[1]) {
            case 1:
              free += 1;
              break;
            case 2:
              consumpting += 1;
              break;
            case 3:
              fault += 1;
              break;
            case 4:
              closed += 1;
              break;
            case 5:
              cleaning += 1;
              break;
            case 6:
              notOpen += 1;
              break;
          }
          for (var k = 0; k < this.place.length; k++) {
            if (this.place[k][0] == item[0]) {
              this.place[k][13] = item[1];
              this.place[k][18] = item[6]; //预定数
              this.place[k][20] = item[5]; //呼叫
            }
          }
        });
        // 匹配待审核订单
        this.reserve_check.forEach((item2, index2) => {
          for (var k = 0; k < this.place.length; k++) {
            if (this.place[k][0] == item2[1]) {
              this.place[k][19] = 1; //值为1说明有待审核，为空没有待审核
            }
          }
        });

        this.reserved = reserved;
        this.calling = calling;
        this.consumpting = consumpting;
        this.cleaning = cleaning;
        this.fault = fault;
        this.notOpen = notOpen;
        this.closed = closed;
        this.free = free;
        // this.reserved += res.data.reserve.length
        this.reserved = res.data.reserve.length;
        // this.free = this.allPlace - (this.consumpting + this.reserved + this.fault + this.closed + this.notOpen + this.calling + this.cleaning)
        // this.reserveData += res.data.reserve
        this.reserveData = res.data.reserve;
        //匹配已预订数量
        // console.log('place:',this.place)
        // this.place.some((placeItem,index)=>{
        //     console.log('index:',index)
        //     res.data.reserve.some((reserveItem,index)=>{
        //         if(placeItem[0] == reserveItem[1]){
        //             placeItem.push({'reserve_status':reserveItem})
        //             console.log('place:',this.place)
        //             // return false
        //         }else{
        //             // placeItem.push('')
        //         }
        //         return true
        //     })
        // })

        // let reserveData = res.data.reserve
        for (let i = 0; i < this.reserveData.length; i++) {
          for (let index = 0; index < this.place.length; index++) {
            if (
              this.place[index][0] == this.reserveData[i][1] &&
              this.place[index][17] == ""
            ) {
              this.place[index][17] = { reserve_status: this.reserveData[i] };
              // return false
              break;
            } else {
              // placeItem.push('')
              // break
            }
          }
        }
      });
    },
    //根据日期获取
    changeReserve_day(index, item) {
      this.curReserveIndex = index;
      this.getMessage_status("day", item[0]);
      this.getMessage_params = item[0]; //时间年月日
    },
    //改变位置区域
    changePlaceArea(index, item) {
      this.curPlaceAreaIndex = index;
      this.curPlaceArea = item[1];
    },
    //改变位置类型
    changePlaceType(index, item) {
      // console.log(item)
      this.curPlaceTypeIndex = index;
      this.curPlaceType = item[1];
    },
    choosePlaceStatus(curstatus, placestatus) {
      this.curStatus = curstatus;
      this.placeStatus = placestatus;
      // console.log('reserve:',this.placeStatus)
    },
    //多选位置数组
    placeInfo(index, item) {
      sessionStorage.setItem("reserveData", this.reserveData);
      if (this.showMutilCheckBtn) {
        if (this.choosePlaceData.includes(index)) {
          this.choosePlaceData.splice(
            this.choosePlaceData.findIndex((indexItem) => indexItem === index),
            1
          );
        } else {
          this.choosePlaceData.push(index);
        }

        if (this.mutilPlaceData.includes(item[0])) {
          this.mutilPlaceData.splice(
            this.mutilPlaceData.findIndex(
              (palceItem) => palceItem.place_id === item[0]
            ),
            1
          );
        } else {
          // this.mutilPlaceData.push(item[3])
          this.mutilPlaceData.push({
            place_name: item[3],
            place_id: item[0],
          });
        }
        //座位ID
        if (this.placeId.includes(item[0])) {
          this.placeId.splice(
            this.placeId.findIndex((palceId) => palceId === item[0]),
            1
          );
        } else {
          this.placeId.push(item[0]);
        }

        //座位
        // if(this.placeArr.includes(item)){
        //     this.placeArr.splice(this.placeArr.findIndex(status => status === item),1)
        // }else{
        //     this.placeArr.push(item)
        // }
        // console.log('9999', this.placeArr)
      } else {
        if (this.placeStatusData) {
          for (var i = 0; i < this.placeStatusData.length; i++) {
            if (this.placeStatusData[i][0] == item[0]) {
              item[1] = this.placeStatusData[i][3];
            }
          }
        }
        sessionStorage.setItem("curPlaceInfo", item);
        if (this.isFromReserve == 1) {
          this._toRouter(
            "/kOpenPlace?reserve_id=" + this.reserve_id + "&place_id=" + item[0]
          );
        } else {
          //   this._toRouter(
          //       this.getMessage_params +
          //       "&place_id=" +
          //       item[0]
          //   );
          sessionStorage.setItem("chooseTime", this.getMessage_params);
          console.info(item);
          this.selected_place_id = item[0];
          this.placeInfoDialog = true;
        }
      }
    },
    choosePlace(item) {
      // console.log(item)
    },
    areaView(type) {
      if (
        type == 0 &&
        this.placeAreaWidth + this.areaOffset > this.shopSetWidth - 338
      ) {
        if (this.placeAreaWidth + this.areaOffset <= this.shopSetWidth - 338) {
          this.areaOffset = -(this.placeAreaWidth - (this.shopSetWidth - 338));
        } else {
          this.areaOffset -= parseInt((this.shopSetWidth - 338) / 110) * 110;
          if (this.placeAreaWidth + this.areaOffset < this.shopSetWidth - 338) {
            this.areaOffset = -(
              this.placeAreaWidth -
              (this.shopSetWidth - 338)
            );
          }
        }
      } else if (type == 1) {
        if (this.areaOffset >= 0) {
          this.disableChoose = true;
          this.areaOffset = 0;
        } else {
          this.areaOffset += this.shopSetWidth - 338;
          if (this.areaOffset >= 0) {
            this.disableChoose = true;
            this.areaOffset = 0;
          }
        }
      }
    },
    typeView(type) {
      if (
        type == 0 &&
        this.placeTypeHeight + this.typeOffset > this.shopSetWidth - 274
      ) {
        if (this.placeTypeHeight + this.typeOffset <= this.shopSetWidth - 274) {
          this.typeOffset = -(this.placeTypeHeight - (this.shopSetWidth - 274));
        } else {
          //下翻一页
          this.typeOffset -= parseInt((this.shopSetWidth - 274) / 110) * 110;
          //剩余不足一页去到页底
          if (
            this.placeTypeHeight + this.typeOffset <
            this.shopSetWidth - 274
          ) {
            this.typeOffset = -(
              this.placeTypeHeight -
              (this.shopSetWidth - 274)
            );
          }
        }
      } else if (type == 1) {
        if (this.typeOffset >= 0) {
          this.disableChoose = true;
          this.typeOffset = 0;
        } else {
          this.typeOffset += this.shopSetWidth - 274;
          if (this.typeOffset >= 0) {
            this.disableChoose = true;
            this.typeOffset = 0;
          }
        }
      }
    },
    getSvg() {
      let datas = {
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      //this.$store.dispatch("mainConsole/seeSvg").then((res) => {
      this.api.shop.shopMainSeeSVG(datas).then(({ data }) => {
        let res = data;
        this.showShopSVG = true;
        this.svgUrl = res.data.svg;
        // console.log('svg:',res)
      });
    },
    showFun() {
      this.isShow = !this.isShow;
    },
    subFun(type) {
      if (type == "logout") {
        this.$store.dispatch("user/logout").then(() => {
          location.reload();
        });
      }
      this.showFun();
    },
    // 移入
    mouseOver(index) {
      //for(var i=0; i<this.meauData.length){}
      this.meauData.forEach((item, i) => {
        if (i == index) {
          item.status = true;
        } else {
          item.status = false;
        }
        //console.log(item)
      });
    },
    // 移出
    mouseLeave(index) {
      this.meauData.forEach((item, i) => {
        if ((item.status = true)) {
          item.status = false;
        }
        //console.log(item)
      });
    },

    openMutilDialog() {
      var _this = this;
      if (this.choosePlaceData.length == 0) {
        this.$message({
          message: "请先勾选要处理的座位",
          type: "warning",
        });
      } else {
        sessionStorage.setItem("choosePlaceData", _this.choosePlaceData);
        sessionStorage.setItem(
          "mutilPlaceData",
          JSON.stringify(_this.mutilPlaceData)
        );
        sessionStorage.setItem("placeId", _this.placeId);
        // sessionStorage.setItem('placeArr',JSON.stringify(_this.placeArr))
        this._toRouter("/mutilPlace");
        // this.showMutilCheckBtn = !this.showMutilCheckBtn
        // this.showPlaceMutil=true
      }
    },
    multiUpdate() {},
    // deletePlace (item, index) {
    //   this.choosePlaceData.splice(this.choosePlaceData.findIndex(item => item === index), 1)
    //   this.mutilPlaceData.splice(this.mutilPlaceData.findIndex(items => items === item), 1)
    //   if (this.mutilPlaceData.length == 0) {
    //     this.mutilPlaceData = []
    //     this.choosePlaceData = []
    //     this.showPlaceMutil = false
    //   }
    // },
    cancleMutil() {
      this.showMutilCheckBtn = !this.showMutilCheckBtn;
      this.mutilPlaceData = [];
      this.choosePlaceData = [];
      this.placeId = [];
    },
    handleClose() {
      this.dialogVisible = false;
      this.noticeVal = "";
      if (this.business_status == 1) {
        this.businessVal = "营业中";
      } else {
        this.businessVal = "暂停营业";
      }
    },
    handleCloseOpenPlace() {
      this.mutilPlaceData = [];
      this.choosePlaceData = [];
      this.showMutileOpenPlace = false;
    },
    handleCloseAddReserve() {
      this.mutilPlaceData = [];
      this.choosePlaceData = [];
      this.showMutileAddReserve = false;
    },
    ReserveAuditFun(val) {
      sessionStorage.setItem("checkType", this.checkType);
      let datas = {
        reserve_auto_audit: this.checkType,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      //this.$store.dispatch("mainConsole/setReserveShenhe", data).then((res) => {
      this.api.shop.shopMainSetReserveAudit(datas).then(({ data }) => {
        let res = data;
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
      });
    },
    // 显示商家通知列表
    showNoticeFun() {
      //   this.$store.dispatch("mainConsole/noticeCall").then((res) => {
      //     if (res.data) {
      //       this.noticeData = res.data;
      //       this.noticeVal = this.noticeData.length;
      //       if (this.noticeVal == 0) {
      //         this.noticeVal = "";
      //       }
      //     }
      //   });
    },
    // 通过座位号或手机号过滤座位
    filterPlaceFun() {
      if (this.searchPlaceOrPhone == "") {
        this.getMessage();
        return;
      } else {
        let datas = {
          filter_str: this.searchPlaceOrPhone,
          filter_date: this.getMessage_params,
          merchant_id: this.merchant_id,
          shop_id: this.shop_id,
        };
        //this.$store.dispatch("mainConsole/filterPlaces", data).then((res) => {
        this.api.shop.shopMainFilterPlace(datas).then(({ data }) => {
          let res = data;
          this.filterPlaceData = res.data;
          if (this.filterPlaceData.length == 0) {
            this.$message({
              message: "暂无数据",
              type: "warning",
            });
          }
          var placeArr = [];
          if (this.allPlace == this.place.length) {
            this.oldPlace = this.place;
          }
          for (var i = 0; i < this.filterPlaceData.length; i++) {
            for (var j = 0; j < this.oldPlace.length; j++) {
              if (this.filterPlaceData[i].place_id == this.oldPlace[j][0]) {
                placeArr.push(this.oldPlace[j]);
              }
            }
          }
          this.place = placeArr;
          // console.log('2222', this.place)
        });
      }
    },
    // 改变营业状态
    changeBusiness(val) {
      let data = {};
      if (val == "0") {
        this.dialogVisible = true;
        return;
      } else {
        data = {
          merchant_id: Number(this.merchant_id),
          shop_id: Number(this.shop_id),
          business_status: Number(val),
        };
        if (this.business_status == Number(val)) {
          return;
        } else {
          this.$store.dispatch("shop/updateShop", data).then((res) => {
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
            this.shopData();
          });
        }
      }
    },
    // 改变营业状态
    submitBusiness() {
      let data = {};
      if (this.noticeVal != "") {
        data = {
          merchant_id: Number(this.merchant_id),
          shop_id: Number(this.shop_id),
          business_status: Number(this.businessVal),
          notice: this.noticeVal,
        };
      } else {
        this.$message({
          message: "请先输入公告内容！",
          type: "warning",
        });
        return;
      }
      this.$store.dispatch("shop/updateShop", data).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.dialogVisible = false;
        this.shopData();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.shopSet {
  // min-height: 1120px;
  .mutilPlaceName {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    li {
      position: relative;
      width: 80px;
      height: 20px;
      margin: 5px;
      text-align: left;
      text-indent: 5px;
      line-height: 22px;
      cursor: pointer;
      transition: all 0.2s linear;
      &:after {
        content: "X";
        width: 20px;
        height: 20px;
        position: absolute;
        right: 5px;
        font-size: 12px;
        transition: all 0.2s linear;
      }
      &:hover::after {
        transform: rotateZ(180deg);
      }
    }
  }
  .updataStatus {
    margin: 10px 0 10px 10px;
  }
  .content {
    padding: 20px 20px 0 20px;
  }
  .layoutTop {
    position: relative;
    width: 100%;
    height: 60px;
    background-size: auto 100px;
    .meauNav {
      position: absolute;
      top: 70px;
      right: 0;
      z-index: 10;
      .meau-box1 {
        width: 158px;
        text-align: center;
        .meau-list {
          width: 158px;
          padding: 0 36px;
          display: inline-block;
          text-align: left;
          height: 50px;
          line-height: 50px;
          position: relative;
          .t-s01 {
            font-size: 14px;
          }
          .img {
            width: 18px;
            height: 18px;
            margin: 0 10px 0 0;
            position: relative;
            top: 4px;
          }
          .layer-nav {
            position: absolute;
            top: 0;
            left: -129px;
            box-sizing: border-box;
            padding: 0 20px;
            display: none;
            .list-nav {
              .i-box {
                width: 24px;
                display: inline-block;
              }
            }
          }
          &:hover {
            .layer-nav {
              display: block;
            }
          }
        }
      }
    }
    .topLogo {
      width: 240px;
      float: left;
      font-size: 18px;
      background-color: $menuBg;
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
    .topRight {
      float: right;
      .topNav {
        .txnav {
          float: left;
          width: 36px;
          height: 36px;
          border-radius: 100%;
          text-align: center;
          margin: 0 10px 0 30px;
          .a-img {
            margin-top: 3px;
          }
        }
        .shopNameNav {
          float: left;
          margin-right: 20px;
          cursor: pointer;
          .name-span {
            line-height: 36px;
            padding: 0 5px 0 0;
            font-size: 14px;
          }
          .topIcon03 {
            font-size: 0.8rem;
          }
        }
      }
      .businessNav {
        min-width: 60px;
        max-width: 110px;
      }
    }
    .center {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .adminInfo {
      position: absolute;
      top: 0;
      height: 40px;
      padding: 0 40px;
      background: #373737;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      line-height: 40px;
      color: #eee;
      font-size: 14px;
    }
  }
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  ul {
    margin: 0;
    padding: 0;
  }

  .iconBtn {
    justify-content: center !important;
    position: absolute;
    cursor: pointer;
    i {
      transition: all 0.2s linear;
    }
  }
  .topBox {
    // height: 95px;
    padding-bottom: 10px;
    width: 100%;
    font-size: 14px;
    overflow: hidden;
    flex-flow: row wrap !important;
    .c-box {
      display: flex;
      align-items: center;
    }
    .reserve_day {
      margin: 20px 20px 10px 20px;
      padding: 0;
      height: 55px;
      border-right: none;
      li {
        transition: all 0.2s linear;
        cursor: pointer;
        width: 110px;
        height: 100%;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        position: relative;
        .days {
          padding-top: 5px;
          font-size: 12px;
        }
        .top-check {
          position: absolute;
          top: 9px;
          right: 12px;
          font-size: 12px;
        }
      }
    }
    // .checkType{
    // color: #DFDFDF;
    .mr20 {
      margin-right: 20px;
    }
    .searchSVG {
      width: 150px;
      height: 38px;
    }
    .searchSVG i {
      padding-left: 5px;
    }
    .searchDay {
      width: 153px;
      height: 38px;
    }
    .searchPlaceOrPhone {
      width: 200px;
      height: 38px;
    }
    // }
    .iconfont {
      margin-right: 5px;
    }
    .checkRadio {
      margin-left: 10px;
    }
  }
  .mainContent {
    margin-top: 20px;
    // height: 890px;
    .placeType {
      width: 44px;
      // height: 100%;
      ul {
        flex-flow: column;
        justify-content: flex-start;
        padding: 0;
        position: relative;
        height: 100%;
        overflow: hidden;
        .downIcon {
          top: 0;
          width: 44px;
          height: 44px;
          line-height: 44px;
          &:hover {
            i {
              margin-top: 5px;
            }
          }
        }
        .upIcon {
          bottom: 0;
          width: 44px;
          height: 44px;
          line-height: 44px;
          &:hover {
            i {
              margin-bottom: 5px;
            }
          }
        }
        .typeContent {
          display: flex;
          flex-flow: column;
          margin-top: 44px;
          overflow: hidden;
          width: 100%;
          .typeContentOverFlow {
            display: flex;
            flex-flow: column;
            width: 100%;
            transition: all 0.2s linear;
            display: -webkit-box;
          }
        }
        .placeTypeLi {
          justify-content: center !important;
          align-items: center;
          transition: all 0.2s linear;
          padding: 0 15px;
          height: 110px;
          width: 44px;
          cursor: pointer;
        }
      }
    }
    .placeArea {
      width: 100%;
      ul {
        position: relative;
        overflow: hidden;
        .leftIcon {
          left: 0;
          width: 34px;
          height: 44px;
          line-height: 44px;
          &:hover {
            i {
              margin-right: 5px;
            }
          }
        }
        .placeAreaRight {
          position: absolute;
          right: 0;
          top: 0;
          width: 220px;
          height: 100%;
          display: flex;
          flex-flow: row nowrap;
          justify-self: flex-start;
          align-items: center;
        }
        .rightIcon {
          width: 34px;
          height: 44px;
          position: relative;
          margin-right: 10px;
          &:hover {
            i {
              margin-left: 5px;
            }
          }
        }
        .areaContent {
          // width: 100%;
          margin-left: 34px;
          overflow: hidden;
          .areaContentOverFlow {
            transition: all 0.2s linear;
            display: -webkit-box;
            // flex-flow: row nowrap;
          }
        }
        .placeAreaLi {
          justify-content: center !important;
          transition: all 0.2s linear;
          width: 110px;
          height: 44px;
          line-height: 44px;
          cursor: pointer;
        }
        .placeAreaBtn {
          padding: 0;
          font-size: 13px;
          width: 74px;
          height: 30px;
        }
      }
    }
    .placeMain {
      height: 100%;
      width: 100%;
      display: flex;
      flex-flow: column;
      justify-content: flex-start;
      flex: 1;
      // align-items: center;
      .placeBox {
        position: relative;
        // height: 100%;
        // width: 1820px;
        .centerPlace {
          // height: 100%;
          display: flex;
          justify-content: center;
          flex-flow: row wrap;
          align-items: center;
        }
        .placeUl {
          // height: 100%;
          width: 100%;
          // flex-flow: row wrap;
          overflow-y: scroll;
          // justify-content: center;
          margin: 20px;
          .placeBoxLi {
            position: relative;
            float: left;
            cursor: pointer;
            width: 184px;
            height: 100px;
            border-radius: 6px;
            margin: 10px;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            transition: all 0.1s linear;
            .checkBox {
              position: absolute;
              right: 5px;
              top: 5px;
              width: 20px;
              height: 20px;
              border-radius: 5px;
              i {
                font-size: 12px;
              }
            }
            .placeQueue {
              margin-right: 1px;
              display: inline-block;
              width: 20px;
              height: 20px;
              i {
                font-size: 12px;
              }
            }
            .iconBox {
              position: absolute;
              left: 13px;
              top: 10px;
              .placeMenu {
                margin-right: 1px;
                display: inline-block;
                i {
                  font-size: 26px !important;
                }
              }
            }

            .placeTitle {
              text-align: center;
              border-radius: 6px 6px 0 0;
              height: 40px;
              line-height: 40px;
              width: 100%;
            }
            .orderInfo {
              display: flex;
              flex-flow: row nowrap;
              justify-content: space-around;
              align-items: center;
              height: 60px;
              width: 100%;
            }
            .icon-seat2 {
              margin-bottom: 5px;
              font-size: 26px;
            }
            &:hover {
              // margin-top: -5px;
              transform: translateY(-5px);
            }
          }
        }
        .serviceTip {
          position: fixed;
          bottom: 30px;
          margin-top: 0px;
          height: 81px;
          // width: 100%;
          display: flex;
          flex-flow: row wrap;
          justify-content: flex-start;
          align-items: center;

          .serviceBtn {
            position: relative;
            margin-left: 10px;
            border: none;
            box-sizing: border-box;
            width: 124px;
            height: 44px;
            display: block;
            &:first-child {
              margin-left: 20px;
            }
            span {
              display: inline-block;
              // display: flex;
              // flex-flow: row nowrap;
              // justify-content: center;
              // align-items: center;
            }

            i {
              position: relative;
              top: 2px;
              display: inline-block;
              width: 16px;
              height: 16px;
              margin-right: 10px;
            }
            .foot-icon {
              border: none !important;
            }
          }
        }
      }
    }
  }
  .flexRow {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    // align-items: center;
  }
  .shopSVG {
    img {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.nBox {
  display: flex;
  border-bottom: 1px dashed #eee;
  .n-span01 {
    color: #666;
  }
  .n-span02 {
    padding: 0 15px;
    color: #000;
  }
  .n-span03 {
    color: #bbb;
  }
}
</style>
<style>
.searchDay input.el-input__inner,
.searchPlaceOrPhone input.el-input__inner {
  background-color: #1f1f1f !important;
  border: none;
}
/* .el-checkbox__inner{
    background-color: transparent!important;
} */
/* .el-input__inner{
    background-color: #1F1F1F!important;
} */
</style>
