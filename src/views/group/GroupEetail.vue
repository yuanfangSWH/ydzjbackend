<template>
  <div class="shopSet">
    <div v-show="switchTAB">
      <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
      <el-collapse-transition>
        <div v-show="conditions">
          <div class="shanxdiv">
            <div class="shiheyf">主题</div>
            <el-input style="width: 350px; margin-right: 10px"
                      placeholder="搜索主题"
                      v-model="keyword"
                      clearable></el-input>
            <div class="shiheyf">活动时间</div>
            <el-date-picker v-model="dateline_start"
                            type="datetime"
                            placeholder="选择开始时间"
                            value-format="yyyy-MM-dd HH:mm"
                            format="yyyy-MM-dd HH:mm">
            </el-date-picker>
            <div class="rucwz">-</div>
            <el-date-picker v-model="dateline_end"
                            type="datetime"
                            placeholder="选择结束时间"
                            value-format="yyyy-MM-dd HH:mm"
                            format="yyyy-MM-dd HH:mm">
            </el-date-picker>
          </div>
          <div class="shanxdiv">
            <div class="shiheyf">店铺名称</div>
            <el-input style="width: 350px; margin-right: 10px"
                      placeholder="搜索店铺ID/名称"
                      v-model="shop"
                      clearable></el-input>
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
                            value-format="yyyy-MM-dd HH:mm"
                            format="yyyy-MM-dd HH:mm">
            </el-date-picker>
          </div>
          <div class="shanxdiv">
            <div class="shiheyf">用户</div>
            <el-input style="width: 350px; margin-right: 10px"
                      placeholder="搜索发布者ID/昵称"
                      v-model="user"
                      clearable></el-input>
            <div class="shiheyf">状态</div>
            <el-select style="margin-right: 10px"
                       v-model="status"
                       placeholder="选择状态">
              <el-option v-for="item in statusData"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
            <div class="shiheyf">是否到场</div>
            <el-select style="margin-right: 10px; width: 150px"
                       v-model="is_arrive"
                       placeholder="选择是否到场">
              <el-option v-for="item in is_arriveData"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
            <div class="shiheyf">店铺类型</div>
            <el-select v-model="shop_type"
                       placeholder="请选择店铺类型">
              <el-option v-for="item in shopTypeList"
                         :key="item.type_id"
                         :label="item.type_name"
                         :value="item.type_id"></el-option>
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
        <el-table-column label="组局ID"
                         width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.gp_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发起者"
                         width="250">
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
                         label="店铺名称"
                         width="250">
          <template slot-scope="scope">
            <div class="muzhicss"
                 @click="openShopTK(scope.row.shop)">
              {{ scope.row.shop.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title"
                         label="主题"
                         width="420">
          <template slot-scope="scope">
            <div class="muzhicss"
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
        <el-table-column prop="total_people"
                         sortable="custom"
                         label="总人数"
                         width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.gender_limit == 0">不限</span>
            <span v-else-if="scope.row.gender_limit == 1">男</span>
            <span v-else-if="scope.row.gender_limit == 2">女</span>
            / {{ scope.row.total_people }}人
          </template>
        </el-table-column>
        <el-table-column label="已报名/已审核"
                         width="150">
          <template slot-scope="scope">
            {{ scope.row.enroll_num }}
            / {{ scope.row.success_num }}
          </template>
        </el-table-column>
        <el-table-column prop="place_name"
                         label="包厢/座位"
                         width="150" />
        <el-table-column sortable="custom"
                         prop="dateline"
                         label="活动时间"
                         width="150" />
        <el-table-column label="是否到达"
                         width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.is_arrive == 0">否</span>
            <span v-else-if="scope.row.is_arrive == 1">是</span>
          </template>
        </el-table-column>
        <el-table-column sortable="custom"
                         prop="create_time"
                         label="发起时间"
                         width="150" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">禁用</span>
            <span v-else-if="scope.row.status == 1">报名中</span>
            <span v-else-if="scope.row.status == 2">截止报名</span>
            <span v-else-if="scope.row.status == 3">活动中</span>
            <span v-else-if="scope.row.status == 4 || scope.row.status == 6">已完成</span>
            <span v-else-if="scope.row.status == 5">发起者取消</span>
            <span v-else-if="scope.row.status == 7">超时取消</span>
            <span v-else-if="scope.row.status == 8">违规</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right"
                         align="center"
                         label="操作"
                         width="260">
          <template slot-scope="scope">
            <div class="caozdiv"
                 style="width: 240px">
              <div class="jump1"
                   style="margin-right: 10px"
                   @click="moreDetail(scope.row)">
                查看报名
              </div>
              <div class="jump1"
                   @click="Detailed(scope.row)">查看</div>
              <div v-if="scope.row.check_status == 0 && scope.row.status != 5"
                   style="color: #ff7200; cursor: pointer"
                   @click="passAudit(scope.row)">
                通过
              </div>
              <div class="jump2"
                   v-if="scope.row.status == 1 || scope.row.status == 3"
                   @click="openDelDialog(scope.row)">
                关闭
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination :current-page="curPage"
                       :hide-on-single-page="true"
                       @current-change="pageChange"
                       background
                       layout="sizes,prev, pager, next,jumper"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size.sync="page_size"
                       @size-change="handlePageSizeChange"
                       :total="total"></el-pagination>
      </div>

      <!-- 关闭OR恢复单个内容 -->
      <el-dialog :title="'关闭-' + deltitle"
                 :visible.sync="deleteDialog"
                 width="30%">
        <span>确定要关闭此项吗</span>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="deleteDialog = false">取 消</el-button>
          <el-button type="primary"
                     @click="deleteItem('one')">确定</el-button>
        </span>
      </el-dialog>

      <!-- 批量关闭OR恢复 -->
      <el-dialog title="关闭"
                 :visible.sync="mutilDeleteDialog"
                 width="50%">
        <span class="s-title">确定要关闭以下内容吗?</span>
        <div class="gz-name"
             v-for="(item, index) in nameArr"
             :key="index">
          {{ item }}
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="mutilDeleteDialog = false">取 消</el-button>
          <el-button type="primary"
                     @click="deleteItem('mutil')">确定</el-button>
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
    <!-- 审核通过弹层 -->
    <el-dialog title="组局审核"
               :visible.sync="dialogVisible"
               width="30%">
      <div v-if="auditData">
        确定要通过“<span style="color: #ff7200">{{ auditData.title }}</span>”这个组局吗？
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="passFun">确 定</el-button>
      </span>
    </el-dialog>
    <GroupData ref="GroupData"
               v-show="!switchTAB"
               @returnY="returnY"
               :ListData="ListData"
               :shopData="shopData"
               :giftData="giftData"
               :userData="userData"
               :changeAN="changeAN"></GroupData>
    <!-- 返回上一页 -->
    <goBack v-if="showBack"></goBack>
    <el-backtop target=".main-container"
                :bottom="showBack ? 105 : 40"></el-backtop>
  </div>
</template>

<script>
import GroupData from "./GroupData";
import changeTime from "../../utils/getdate"; //获取当前时间
export default {
  name: "groupEetail",
  components: {
    GroupData,
  },
  data () {
    return {
      // 审核通过弹层
      dialogVisible: false,
      auditData: "",
      //组局ID
      gp_id: "",
      //是否显示筛选
      conditions: true,
      //发布开始时间
      create_time_start: "",
      //发布结束时间
      create_time_end: "",
      //活动开始时间
      dateline_start: "",
      //活动结束时间
      dateline_end: "",
      //切换详情
      switchTAB: true,
      //商家ID或者名称
      shop: "",
      //用户ID或者昵称
      user: "",
      //发起者是否到场
      is_arrive: "",
      //店铺类型
      shop_type: null,
      is_arriveData: [
        {
          id: 0,
          name: "否",
        },
        {
          id: 1,
          name: "是",
        },
      ],
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
          name: "截止报名",
        },
        {
          id: 3,
          name: "活动中",
        },
        {
          id: 4,
          name: "已完成",
        },
        {
          id: 5,
          name: "发起者取消",
        },
        {
          id: 6,
          name: "超时完成",
        },
        {
          id: 7,
          name: "超时取消",
        },
        {
          id: 8,
          name: "违规",
        },
      ],
      //排序
      sort: "",
      order: "",
      //主题 关键词
      keyword: "",
      mutilDeleteDialog: false, //打开关闭框
      deleteDialog: false, //打开关闭框
      //页码
      curPage: 1,
      page_size: 10,
      //总数
      total: 1,
      tableListData: [], //页面表单的内容
      currenDeleteRow: "", //当前选中的行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      deltitle: "", //关闭框的标题
      usertx: false,
      //是否是返回上一页
      changeAN: true,
      ListData: {},
      shopData: {},
      giftData: {},
      userData: {},
      //路由地址
      routerURL: "/GroupEetail",
      user_id: "",
      showBack: false,
      merchantstx: false,
      merchantstxData: [],
      shopTypeList: [],
      user_join: '',
    };
  },
  created () {
    //判断是否存储有筛选条件
    var data = this.$store.state.screeningData.GroupEetail;
    if (data) {
      if (data.Yuanfang) {
        this.user_id = data.user_id;
        this.gp_id = data.gp_id;
        this.create_time_start = data.create_time_start;
        this.create_time_end = data.create_time_end;
        this.dateline_start = data.dateline_start;
        this.dateline_end = data.dateline_end;
        this.shop = data.shop;
        this.user = data.user;
        this.is_arrive = data.is_arrive;
        this.shop_type = data.shop_type;
        this.status = data.status;
        this.keyword = data.keyword;
        this.curPage = data.curPage;
        //初始化VUEX筛选存储
        var value = this.$store.state.screeningData;
        var groupData = {
          GroupEetail: { Yuanfang: false },
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
    if (this.$route.query.gp_id) {
      this.gp_id = Number(this.$route.query.gp_id);
      this.changeAN = false;
      this.switchTAB = false;
    }
    if (this.$route.query.formHome) {
      this.create_time_start = changeTime() + " 00:00";
      this.create_time_end = changeTime() + " 23:59";
    }
    this.getTableList();
    this.getShopTypeList();
  },
  beforeDestroy () {
    if (this.usertx) {
      this.ConditionsF();
    }
  },
  methods: {
    /* 获取店铺类型 */
    getShopTypeList () {
      let data = { page: 1 };
      this.$store.dispatch("shop/getShopType", data).then((res) => {
        this.shopTypeList = res.data;
      });
    },
    // 内容过长，鼠标移入显示全部
    getAgent2 (v) {
      return v.length > 6 ? v.substring(0, 6) + " ..." : v;
    },
    getShow2 (v) {
      return v.length > 10 ? false : true;
    },
    // 内容过长，鼠标移入显示全部
    getAgent (v) {
      return v.length > 20 ? v.substring(0, 20) + " ..." : v;
    },
    getShow (v) {
      return v.length > 20 ? false : true;
    },
    /*打开店铺详情弹框*/
    openShopTK (row) {
      this.merchantstx = true;
      this.merchantstxData = row;
    },
    /*打开店铺详情(废弃)*/
    openShopInfo (row) {
      this.$router.push({
        path: "/ShopInfo",
        query: { shop_id: row.shop_id, merchant_id: row.merchant_id },
      });
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
        //组局人数
        total_people: data.total_people,
        //性别限制
        gender_limit: data.gender_limit,
        //座位
        place_name: data.place_name,
        //活动开始时间
        dateline: data.dateline,
        //店铺
        name: data.shop.name,
        //店铺地址
        address: data.shop.address,
        //营业时间开始
        business_start_time: data.shop.business_start_time,
        //营业时间结束
        business_stop_time: data.shop.business_stop_time,
        //礼物
        average_gift_num: data.average_gift_num,
      };
      this.$store.dispatch("updateVuex", {
        key: "temporaryData",
        value: basic,
      });
    },
    //详情
    Detailed (data) {
      this.$refs.GroupData.concert(data);
      this.ListData = data;
      this.shopData = data.shop;
      this.giftData = data.gift;
      this.userData = data.user;
      this.switchTAB = false;
      this.storageF(data);
      this.ConditionsF();
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
      this.storageF(row);
      this.ConditionsF();
      this.$router.push({
        path: "/GroupEnroll",
        query: {
          gp_id: row.gp_id,
        },
      });
    },
    ConditionsF () {
      var data = this.$store.state.screeningData;
      var groupData = {
        GroupEetail: {
          user_id: this.user_id,
          gp_id: this.gp_id,
          create_time_start: this.create_time_start,
          create_time_end: this.create_time_end,
          dateline_start: this.dateline_start,
          dateline_end: this.dateline_end,
          shop: this.shop,
          user: this.user,
          is_arrive: this.is_arrive,
          shop_type: this.shop_type,
          status: this.status,
          keyword: this.keyword,
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
    //重置
    resetData () {
      this.gp_id = "";
      this.is_arrive = "";
      this.shop_type = null;
      this.status = "";
      this.shop = "";
      this.user = "";
      this.sort = "";
      this.order = "";
      this.keyword = "";
      this.dateline_start = "";
      this.dateline_end = "";
      this.create_time_start = "";
      this.create_time_end = "";
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
        //组局ID
        gp_id: this.gp_id,
        //活动开始时间
        dateline_start: this.dateline_start,
        //活动结束时间
        dateline_end: this.dateline_end,
        //发布开始时间
        create_time_start: this.create_time_start,
        //发布结束时间
        create_time_end: this.create_time_end,
        //商家ID或者名称
        shop: this.shop,
        //用户模糊搜索
        user: this.user,
        //发起者是否到场
        is_arrive: this.is_arrive,
        //店铺类型
        shop_type: this.shop_type,
        //排序
        sort: this.sort,
        order: this.order,
        //状态
        status: this.status,
        //主题 关键词
        keyword: this.keyword,
        //页码
        page: this.curPage,
        user_join: this.user_join,
        page_size: this.page_size,
      };
      this.api.group.groupGroupparty(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
        // if (this.tableListData != "") {
        //   //计算金额
        //   for (
        //     var i = 0;
        //     i < this.tableListData && this.tableListData.length;
        //     i++
        //   ) {
        //     this.tableListData[i].total_amount = this.CalculateData(
        //       this.tableListData[i].total_amount,
        //       "/"
        //     );
        //   }
        // }
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
    handlePageSizeChange (v) {
      this.pageChange();
    },
    /* 打开批量关闭OR恢复框(废弃) */
    batchDelete () {
      if (this.multipleSelection != "") {
        this.mutilDeleteDialog = true;
      } else {
        this.$message({
          message: "请先勾选要关闭的数据",
          type: "warning",
        });
      }
    },
    /* 打开关闭OR恢复框 */
    openDelDialog (data) {
      this.deltitle = data.title;
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    /* 选择表的行 (废弃)*/
    selectItem (val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.gp_id);
        this.nameArr.push(item.title);
      });
    },
    /* 关闭(违规处理接口) */
    deleteItem (type) {
      // var gp_id = new Array();
      // gp_id.push(this.currenDeleteRow.gp_id);
      // var id = type === "one" ? gp_id : this.multipleSelection;
      // var data = {
      //   id: id,
      // };
      var data = {
        gp_id: this.currenDeleteRow.gp_id,
      };
      this.api.group.groupExamine(data).then((res) => {
        this.$message({
          message: "关闭成功",
          type: "success",
        });
        this.getTableList();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    /* 恢复(废弃) */
    restoreItem (type) {
      var gp_id = new Array();
      gp_id.push(this.currenDeleteRow.gp_id);
      var id = type === "one" ? gp_id : this.multipleSelection;
      var data = {
        id: id,
      };
      this.api.group.groupRecovery(data).then((res) => {
        this.$message({
          message: "恢复成功",
          type: "success",
        });
        this.getTableList();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    // 审核通过
    passAudit (row) {
      this.dialogVisible = true;
      this.auditData = row;
    },
    passFun () {
      let data = {
        id: this.auditData.gp_id,
      };
      this.api.group.EnrollAudit(data).then((res) => {
        this.$message({
          message: "审核通过",
          type: "success",
        });
        this.dialogVisible = false;
        this.getTableList();
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
