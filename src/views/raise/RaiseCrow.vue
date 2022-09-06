<template>
  <div class="shopSet">
    <div v-show="switchTAB">
      <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
      <el-collapse-transition>
        <div v-show="conditions">
          <div class="shanxdiv">
            <div class="shiheyf">主题</div>
            <el-input style="width: 470px; margin-right: 10px"
                      placeholder="搜索主题"
                      v-model="title"
                      clearable></el-input>
            <div class="shiheyf">拼桌金额</div>
            <el-input style="width: 160px"
                      placeholder="输入最低金额"
                      type="Number"
                      v-model="amount_min"
                      clearable></el-input>
            <div class="rucwz">-</div>
            <el-input style="width: 160px"
                      placeholder="输入最高金额"
                      type="Number"
                      v-model="amount_max"
                      clearable></el-input>
          </div>
          <div class="shanxdiv">
            <div class="shiheyf">店铺名称</div>
            <el-input style="width: 470px; margin-right: 10px"
                      placeholder="搜索店铺ID或名称"
                      v-model="shop"
                      clearable></el-input>
            <div class="shiheyf">人数</div>
            <el-input style="width: 160px"
                      placeholder="输入最少人数"
                      type="Number"
                      v-model="total_people_min"
                      clearable></el-input>
            <div class="rucwz">-</div>
            <el-input style="width: 160px"
                      placeholder="输入最多人数"
                      type="Number"
                      v-model="total_people_max"
                      clearable></el-input>
          </div>
          <div class="shanxdiv">
            <div class="shiheyf">发起时间</div>
            <el-date-picker v-model="create_time_start"
                            type="datetime"
                            placeholder="选择开始时间"
                            value-format="yyyy-MM-dd HH:mm"
                            format="yyyy-MM-dd HH:mm">
            </el-date-picker>
            <div class="rucwz">-</div>
            <el-date-picker v-model="create_time_end"
                            type="datetime"
                            placeholder="选择结束时间"
                            style="margin-right: 14px"
                            value-format="yyyy-MM-dd HH:mm"
                            format="yyyy-MM-dd HH:mm">
            </el-date-picker>
            <div class="shiheyf">状态</div>
            <el-select v-model="status"
                       placeholder="选择状态"
                       style="width: 350px">
              <el-option v-for="item in statusData"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="shanxdiv">
            <div class="shiheyf">活动时间</div>
            <el-date-picker v-model="dateline_time_start"
                            type="datetime"
                            placeholder="选择开始时间"
                            value-format="yyyy-MM-dd HH:mm"
                            format="yyyy-MM-dd HH:mm">
            </el-date-picker>
            <div class="rucwz">-</div>
            <el-date-picker v-model="dateline_time_end"
                            type="datetime"
                            placeholder="选择结束时间"
                            style="margin-right: 14px"
                            value-format="yyyy-MM-dd HH:mm"
                            format="yyyy-MM-dd HH:mm">
            </el-date-picker>
            <div class="shiheyf">拼桌方式</div>
            <el-select style="margin-right: 10px; width: 350px"
                       v-model="cf_type"
                       placeholder="选择方式">
              <el-option v-for="item in cf_typeData"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="shanxdiv">
            <div class="shiheyf">用户</div>
            <el-input style="width: 470px; margin-right: 10px"
                      placeholder="搜索发布者或报名者ID/昵称"
                      v-model="user"
                      clearable></el-input>
            <div class="shiheyf">商家类型</div>
            <el-select style="margin-right: 10px; width: 350px"
                       v-model="merchant_type"
                       placeholder="选择商家类型">
              <el-option v-for="item in merchant_typeData"
                         :key="item.type_id"
                         :label="item.type_name"
                         :value="item.type_id">
              </el-option>
            </el-select>
            <el-button class="sosuo"
                       type="primary"
                       @click="screening">筛选</el-button>
            <el-button class="sosuo"
                       type="info"
                       @click="resetData">清空条件</el-button>
          </div>
        </div>
      </el-collapse-transition>
      <div style="width: 100%">
        <div class="huaib"
             type="warning"
             @click="transitionF">
          <i class="el-icon-arrow-up temtub"
             v-show="conditions"></i>
          <i class="el-icon-arrow-down temtub"
             v-show="!conditions"></i>
        </div>
      </div>
      <el-table ref="multipNum"
                stripe
                :data="tableListData"
                tooltip-effect="dark"
                style="width: 100%"
                @sort-change="screeningData">
        <el-table-column label="ID"
                         width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.cf_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布者"
                         width="270">
          <template slot-scope="scope">
            <div class="duio muzhicss"
                 @click="userInformation(scope.row)">
              <el-image class="ustrimg"
                        v-if="scope.row.user.avatar"
                        :src="scope.row.user.avatar"
                        fit="cover"></el-image>
              <div>
                <div class="bjgt">
                  <el-tooltip class="item"
                              effect="dark"
                              :content="scope.row.user.nickname"
                              placement="bottom"
                              :disabled="getShow2(scope.row.user.nickname)">
                    <div :title="getAgent2(scope.row.user.nickname)">
                      {{ getAgent2(scope.row.user.nickname) }}（<span v-if="scope.row.user.gender == 0">未知</span>
                      <span v-else-if="scope.row.user.gender == 1">男</span>
                      <span v-else-if="scope.row.user.gender == 2">女</span>/{{
                        scope.row.user.age
                      }}岁）
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="shop.name"
                         label="店铺"
                         width="220">
          <template slot-scope="scope">
            <div class="muzhicss"
                 @click="openShopTK(scope.row.shop)">
              {{ scope.row.shop.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title"
                         label="主题"
                         width="300">
          <template slot-scope="scope">
            <div class="muzhicss2"
                 @click="Detailed(scope.row)">
              <el-tooltip class="item"
                          effect="dark"
                          :content="scope.row.title"
                          placement="bottom"
                          :disabled="getShow(scope.row.title)">
                <div :title="getAgent(scope.row.title)">
                  {{ getAgent(scope.row.title) }}
                </div>
              </el-tooltip>
              <!-- {{ scope.row.title }} -->
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="total_people"
                         sortable="custom"
                         label="总人数"
                         width="100" />
        <el-table-column align="center"
                         prop="success_num"
                         label="已报名/已审核"
                         width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.enroll_num }}/{{ scope.row.success_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="拼桌方式"
                         width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.cf_type == 1">全部AA</span>
            <span v-else-if="scope.row.cf_type == 2">自由众筹</span>
            <span v-else-if="scope.row.cf_type == 3">男A女免</span>
            <span v-else-if="scope.row.cf_type == 4">女A男免</span>
          </template>
        </el-table-column>
        <el-table-column prop="dateline"
                         sortable="custom"
                         label="活动时间"
                         width="150" />
        <el-table-column prop="min_amount"
                         label="起拼金额"
                         width="100">
          <template slot-scope="scope">
            <span style="color: rgb(223, 162, 80)">￥{{ scope.row.min_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time"
                         sortable="custom"
                         label="发起时间"
                         width="150" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">禁用</span>
            <span v-else-if="scope.row.status == 1">报名中</span>
            <span v-else-if="scope.row.status == 2">取消拼桌</span>
            <span v-else-if="scope.row.status == 3">截止报名</span>
            <span v-else-if="scope.row.status == 4">活动中</span>
            <span v-else-if="scope.row.status == 5">超时关闭</span>
            <span v-else-if="scope.row.status == 6">已结束</span>
            <span v-else-if="scope.row.status == 7">违规</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         align="center"
                         label="操作"
                         width="340">
          <template slot-scope="scope">
            <div style="display: flex">
              <div class="jump1"
                   @click="moreDetail(scope.row)">查看报名</div>
              <div class="jump1"
                   @click="lookGroupChat(scope.row)">
                查看群聊
              </div>
              <div class="jump1"
                   @click="Detailed(scope.row)">详情</div>
              <div class="jump2"
                   v-show="scope.row.delete_time == ''">
                <div v-show="
                    scope.row.status == 1 ||
                    scope.row.status == 3 ||
                    scope.row.status == 4
                  "
                     @click="openDelDialog(scope.row, 1)">
                  关闭
                </div>
              </div>
              <!-- <div class="jump2" v-show="scope.row.delete_time != ''">
                <div
                  style="color: #11d169"
                  v-show="scope.row.status == 1 || scope.row.status == 3"
                  @click="openDelDialog(scope.row, 2)"
                >
                  打开
                </div>
              </div> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination :current-page="curPage"
                       :hide-on-single-page="true"
                       @current-change="pageChange"
                       background
                       :page-size.sync="page_size"
                       :page-sizes="[10, 20, 50, 100]"
                       layout="sizes,prev, pager, next,jumper"
                       @size-change="handlePageSizeChange"
                       :total="total"></el-pagination>
      </div>

      <!-- 关闭单个内容 -->
      <el-dialog :title="'关闭-' + deltitle"
                 :visible.sync="deleteDialog"
                 width="30%">
        <span style="color: #cb301f; font-weight: bold; font-size: 20px">注意：如果拼桌活动时间已开始，关闭后将不能再次打开！</span>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="deleteDialog = false">取 消</el-button>
          <el-button type="primary"
                     @click="deleteItem()">确定</el-button>
        </span>
      </el-dialog>
      <!-- 打开单个内容 -->
      <el-dialog :title="'打开-' + deltitle"
                 :visible.sync="huifuDialog"
                 width="30%">
        <span>确定要打开此项吗</span>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="huifuDialog = false">取 消</el-button>
          <el-button type="primary"
                     @click="restoreItem()">确定</el-button>
        </span>
      </el-dialog>
      <!-- 用户详情弹框 -->
      <el-dialog title="用户信息"
                 :visible.sync="usertx"
                 width="70%">
        <userBounced ref="userBounced"
                     :routerURL="routerURL"></userBounced>
      </el-dialog>
      <!-- 店铺详情弹框 -->
      <el-dialog title="商家简介"
                 :visible.sync="merchantstx"
                 width="26%">
        <div class="nlwsb">简介：{{ merchantstxData.name }}</div>
        <div class="nlwsb">地址：{{ merchantstxData.address }}</div>
        <div class="nlwsb">电话：{{ merchantstxData.phone }}</div>
        <div class="nlwsb">
          营业时间：{{ merchantstxData.business_start_time }}-{{
            merchantstxData.business_stop_time
          }}
        </div>
        <div class="shenhai"
             @click="merchantstx = false">确认</div>
      </el-dialog>
    </div>
    <RaiseData ref="GroupData"
               v-show="!switchTAB"
               @returnY="returnY"
               :ListData="ListData"
               :shopData="shopData"
               :userData="userData"
               :changeAN="changeAN"></RaiseData>
    <!-- 返回上一页 -->
    <goBack v-if="showBack"></goBack>
    <el-backtop target=".main-container"
                :bottom="showBack ? 105 : 40"></el-backtop>
  </div>
</template>

<script>
import RaiseData from "./RaiseData";
import changeTime from "../../utils/getdate"; //获取当前时间
export default {
  name: "raiseEetail",
  components: {
    RaiseData,
  },
  data () {
    return {
      cf_id: "",
      //是否显示筛选
      conditions: true,
      //主题搜索
      title: "",
      //店铺搜索
      shop: "",
      //用户搜索
      user: "",
      //活动开始时间段
      dateline_time_start: "",
      //活动结束时间段
      dateline_time_end: "",
      //发布开始时间段
      create_time_start: "",
      //发布结束时间段
      create_time_end: "",
      //总金额开始
      amount_max: "",
      //总金额结束
      amount_min: "",
      //总人数开始
      total_people_max: "",
      //总人数结束
      total_people_min: "",
      //排序
      sort: "",
      order: "",
      page_size: 10,
      //状态
      status: "",
      statusData: [
        {
          id: 0,
          name: "禁用",
        },
        {
          id: 1,
          name: "报名中",
        },
        {
          id: 2,
          name: "取消拼桌",
        },
        {
          id: 3,
          name: "截止报名",
        },
        {
          id: 4,
          name: "活动中",
        },
        {
          id: 5,
          name: "超时关闭",
        },
        {
          id: 6,
          name: "已结束",
        },
        {
          id: 7,
          name: "违规",
        },
      ],
      //拼桌方式
      cf_type: "",
      cf_typeData: [
        {
          id: 1,
          name: "全部AA",
        },
        {
          id: 2,
          name: "自由众筹",
        },
        {
          id: 3,
          name: "男A女免",
        },
        {
          id: 4,
          name: "女A男免",
        },
      ],
      //商家类型
      merchant_type: "",
      merchant_typeData: [],
      //切换详情
      switchTAB: true,
      deleteDialog: false, //打开关闭框
      huifuDialog: false, //打开恢复框
      //页码
      curPage: 1,
      //总数
      total: 1,
      tableListData: [], //页面表单的内容
      deltitle: "", //关闭框的标题
      usertx: false,
      //是否是返回上一页
      changeAN: true,
      ListData: {},
      shopData: {},
      userData: {},
      //路由地址
      routerURL: "/RaiseCrow",
      user_id: "",
      showBack: false,
      merchantstx: false,
      merchantstxData: [],
      user_join: ''
    };
  },
  created () {
    //判断是否存储有筛选条件
    var data = this.$store.state.screeningData.RaiseCrow;
    if (data) {
      if (data.Yuanfang) {
        this.cf_id = data.cf_id;
        this.title = data.title;
        this.shop = data.shop;
        this.user = data.user;
        this.dateline_time_start = data.dateline_time_start;
        this.dateline_time_end = data.dateline_time_end;
        this.create_time_start = data.create_time_start;
        this.create_time_end = data.create_time_end;
        this.amount_max = data.amount_max;
        this.amount_min = data.amount_min;
        this.total_people_max = data.total_people_max;
        this.total_people_min = data.total_people_min;
        this.status = data.status;
        this.cf_type = data.cf_type;
        this.merchant_type = data.merchant_type;
        this.curPage = data.curPage;
        //初始化VUEX筛选存储
        var value = this.$store.state.screeningData;
        var groupData = {
          RaiseCrow: { Yuanfang: false },
        };
        Object.assign(value, groupData);
        this.$store.dispatch("updateVuex", {
          key: "screeningData",
          value: value,
        });
      }
    }
    this.showBack = this.$route.query.from ? true : false;
    if (this.$route.query.user_id) {
      this.user_id = Number(this.$route.query.user_id);
    }
    if (this.$route.query.user_join) {
      this.user_join = Number(this.$route.query.user_join);
    }
    if (this.$route.query.cf_id) {
      this.cf_id = Number(this.$route.query.cf_id);
      this.changeAN = false;
      this.switchTAB = false;
    }
    if (this.$route.query.formHome) {
      this.create_time_start = changeTime() + " 00:00";
      this.create_time_end = changeTime() + " 23:59";
    }
    this.getTableList();
    this.shopType();
  },
  beforeDestroy () {
    if (this.usertx) {
      this.ConditionsF();
    }
  },
  methods: {
    // 内容过长，鼠标移入显示全部
    getAgent2 (v) {
      return v.length > 6 ? v.substring(0, 6) + " ..." : v;
    },
    getShow2 (v) {
      return v.length > 10 ? false : true;
    },
    // 内容过长，鼠标移入显示全部
    getAgent (v) {
      return v && v.length > 20 ? v.substring(0, 20) + " ..." : v;
    },
    getShow (v) {
      return v && v.length > 20 ? false : true;
    },
    // 商家类型
    shopType () {
      var data = {
        page_size: 10000,
      };
      this.api.shop.getShopType(data).then((res) => {
        this.merchant_typeData = res.data.data;
      });
    },
    /*打开店铺详情弹框*/
    openShopTK (row) {
      this.merchantstx = true;
      this.merchantstxData = row;
    },
    //用户详情弹框
    userInformation (row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user.user_id);
      }, 0);
    },
    //展开隐藏
    transitionF () {
      if (this.conditions) {
        this.conditions = false;
      } else {
        this.conditions = true;
      }
    },
    //显示组局列表
    returnY (operationData) {
      this.switchTAB = true;
      if (operationData) {
        this.getTableList();
      }
    },
    //查看报名列表
    moreDetail (row) {
      this.ConditionsF();
      this.storageF(row);
      this.$router.push({
        path: "/RaiseErroll",
        query: {
          cf_id: row.cf_id,
        },
      });
    },
    ConditionsF () {
      var data = this.$store.state.screeningData;
      var groupData = {
        RaiseCrow: {
          cf_id: this.cf_id,
          title: this.title,
          shop: this.shop,
          user: this.user,
          dateline_time_start: this.dateline_time_start,
          dateline_time_end: this.dateline_time_end,
          create_time_start: this.create_time_start,
          create_time_end: this.create_time_end,
          amount_max: this.amount_max,
          amount_min: this.amount_min,
          total_people_max: this.total_people_max,
          total_people_min: this.total_people_min,
          status: this.status,
          cf_type: this.cf_type,
          merchant_type: this.merchant_type,
          curPage: this.curPage,
          Yuanfang: true,
        },
      };
      Object.assign(data, groupData);
      //将筛选条件存储到VUEX
      this.$store.dispatch("updateVuex", {
        key: "screeningData",
        value: data,
      });
    },
    //详情
    Detailed (data) {
      this.$refs.GroupData.concert(data);
      this.ListData = data;
      this.shopData = data.shop;
      this.userData = data.user;
      this.switchTAB = false;
      this.storageF(data);
      this.ConditionsF();
    },
    //TAB筛选
    screeningData (column) {
      if (column.order) {
        this.sort = column.prop;
        this.order = column.order == "ascending" ? "ASC" : "DESC";
      } else {
        this.sort = "";
        this.order = "";
      }
      this.getTableList();
    },
    //把基础信息存入VUEX
    storageF (data) {
      var basic = {
        //主题
        title: data.title,
        //发布者
        nickname: data.user.nickname,
        //店铺
        name: data.shop.name,
        //性别限制
        gender_limit: data.gender_limit,
      };
      this.$store.dispatch("updateVuex", {
        key: "temporaryData",
        value: basic,
      });
    },
    //重置
    resetData () {
      //主题搜索
      this.title = "";
      //店铺搜索
      this.shop = "";
      //用户搜索
      this.user = "";
      //活动开始时间段
      this.dateline_time_start = "";
      //活动结束时间段
      this.dateline_time_end = "";
      //发布开始时间段
      this.create_time_start = "";
      //发布结束时间段
      this.create_time_end = "";
      //总金额开始
      this.amount_max = "";
      //总金额结束
      this.amount_min = "";
      //总人数开始
      this.total_people_max = "";
      //总人数结束
      this.total_people_min = "";
      //排序
      this.sort = "";
      this.order = "";
      //状态
      this.status = "";
      //拼桌方式
      this.cf_type = "";
      //商家类型
      this.merchant_type = "";
      this.curPage = 1;
      this.getTableList();
    },
    //筛选
    screening () {
      this.curPage = 1;
      this.getTableList();
    },
    /* 获取列表内容 */
    getTableList () {
      var data = {
        //用户ID
        user_id: this.user_id,
        //主题搜索
        title: this.title,
        //店铺搜索
        shop: this.shop,
        //用户模糊搜索
        user: this.user,
        //活动开始时间段
        dateline_time_start: this.dateline_time_start,
        //活动结束时间段
        dateline_time_end: this.dateline_time_end,
        //发布开始时间段
        create_time_start: this.create_time_start,
        //发布结束时间段
        create_time_end: this.create_time_end,
        //总金额结束
        amount_max: this.amount_max
          ? this.CalculateData(this.amount_max, "*")
          : "",
        //总金额开始
        amount_min: this.amount_min
          ? this.CalculateData(this.amount_min, "*")
          : "",
        //总人数结束
        total_people_max: this.total_people_max,
        //总人数开始
        total_people_min: this.total_people_min,
        //排序
        sort: this.sort,
        order: this.order,
        //状态
        status: this.status,
        //拼桌方式
        cf_type: this.cf_type,
        //商家类型
        merchant_type: this.merchant_type,
        //页码
        page: this.curPage,
        cf_id: this.cf_id,
        user_join: this.user_join,
        page_size: this.page_size,
      };
      this.api.raise.raiseList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
        if (this.tableListData != "") {
          //计算金额
          for (var i = 0; i < this.tableListData.length; i++) {
            this.tableListData[i].min_amount = this.CalculateData(
              this.tableListData[i].min_amount,
              "/"
            );
          }
        }
        if (!this.changeAN) {
          this.Detailed(this.tableListData[0]);
        }
      });
    },
    /* 改变页数 */
    pageChange (page) {
      this.curPage = page;
      this.getTableList();
    },
    handlePageSizeChange () {
      this.pageChange()
    },
    /* 打开关闭OR恢复框 */
    openDelDialog (data, key) {
      this.deltitle = data.title;
      this.currenDeleteRow = data;
      if (key == 1) {
        this.deleteDialog = true;
      } else {
        this.huifuDialog = true;
      }
    },
    /* 关闭 */
    deleteItem () {
      var data = {
        cf_id: this.currenDeleteRow.cf_id,
      };
      this.api.raise.raiseDelete(data).then((res) => {
        this.$message({
          message: "关闭成功",
          type: "success",
        });
        this.getTableList();
        this.deleteDialog = false;
      });
    },
    /* 打开 */
    restoreItem () {
      var data = {
        cf_id: this.currenDeleteRow.cf_id,
      };
      this.api.raise.raiseRecovery(data).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "恢复成功",
            type: "success",
          });
          this.getTableList();
          this.huifuDialog = false;
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
        }
      });
    },
    //查看群聊
    lookGroupChat (row) {
      this.ConditionsF();
      this.$router.push({
        path: "/GroupChat",
        query: {
          cf_id: row.cf_id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.muzhicss {
  display: flex;
  align-items: center;
}
.ustrimg {
  width: 34px;
  height: 34px;
  border-radius: 100%;
}
.sosuo {
  margin-left: 10px;
  float: left;
  background-color: #f4f4f4 !important;
  border: 1px solid #cecece;
  color: #0a0a0a;
  width: 90px;
}
.shopSet {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 15px 15px;
  padding: 15px 15px;
  .pageTitle {
    margin: 10px 0 20px 0;
    font-size: 24px;
    color: #0a0a0a;
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
  .el-form-item {
    width: 50% !important;
    .el-input {
      min-width: 400px !important;
      width: 50% !important;
    }
    .el-textarea {
      min-width: 200px !important;
      width: 280px !important;
    }
    .el-form-item__label {
      width: 120px !important;
    }
    .el-form-item__content {
      margin-left: 120px !important;
    }
    .el-select,
    .el-textarea,
    .el-cascader,
    .el-date-editor--timerange.el-input__inner {
      min-width: 200px !important;
      width: 50% !important;
    }
  }
}
</style>
