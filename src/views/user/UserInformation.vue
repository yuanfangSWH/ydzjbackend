<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <span class="t-s01">用户：</span>
      <el-input
        style="width: 300px"
        placeholder="用户ID或者昵称"
        v-model="user"
        clearable
      ></el-input>
      <span class="t-s01 t-s02">注册时间：</span>
      <el-date-picker
        v-model="reg_time_start"
        type="datetime"
        placeholder="选择注册开始时间"
        value-format="yyyy-MM-dd HH:mm"
        format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
      <div class="rucwz">-</div>
      <el-date-picker
        v-model="reg_time_end"
        type="datetime"
        placeholder="选择注册结束时间"
        value-format="yyyy-MM-dd HH:mm"
        format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
    </div>
    <div class="shanxdiv">
      <span class="t-s01">手机号：</span>
      <el-input
        style="width: 300px; margin-right: 10px"
        placeholder="手机号"
        v-model="phone"
        clearable
      ></el-input>
      <span class="t-s01 t-s02">状态：</span>
      <el-select
        style="margin-right: 10px"
        v-model="status"
        placeholder="选择状态"
      >
        <el-option
          v-for="item in stateData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span class="t-s01 t-s02">城市：</span>
      <citySelectex ref="citySelect" @setCityAreaName="setCityAreaName" />
      <el-button class="sosuo" type="primary" @click="screening"
        >筛选</el-button
      >
      <el-button class="sosuo" type="info" @click="resetData"
        >清空条件</el-button
      >
    </div>
    <div class="add-box">
      <el-button class="editBtn" type="danger" @click="batchDelete"
        >批量修改用户状态</el-button
      >
    </div>
    <el-table
      ref="multipNum"
      stripe
      :data="tableListData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selectItem"
      @sort-change="screeningData"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="ID" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户" width="300">
        <template slot-scope="scope">
          <div class="duio muzhicss" @click="userInformation(scope.row)">
            <el-image
              class="ustrimg"
              :src="scope.row.avatar"
              fit="cover"
            ></el-image>
            <div>
              <div class="bjgt">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.nickname"
                  placement="bottom"
                  :disabled="getShow(scope.row.nickname)"
                >
                  <div :title="getAgent(scope.row.nickname)">
                    {{ getAgent(scope.row.nickname) }}（<span
                      v-if="scope.row.gender == 0"
                      >未知</span
                    >
                    <span v-else-if="scope.row.gender == 1">男</span>
                    <span v-else-if="scope.row.gender == 2">女</span>/{{
                      scope.row.age
                    }}岁）
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="coupon_num" label="优惠券" width="160">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="
              ConditionsF();
              $router.push({
                path: '/UserCoupon',
                query: { keyword: scope.row.user_id, from: 'UserInfomation' },
              });
            "
          >
            {{ scope.row.coupon_num }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="point" label="积分" width="160">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="
              ConditionsF();
              $router.push({
                path: '/point/log',
                query: { keyword: scope.row.user_id, from: 'UserInfomation' },
              });
            "
          >
            {{ scope.row.point }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="160" />
      <el-table-column prop="income" sortable="custom" label="D币" width="150">
        <template slot-scope="scope">
          <div style="color: #daa138">{{ scope.row.income }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="currency"
        sortable="custom"
        label="Y币"
        width="150"
      >
        <template slot-scope="scope">
          <div style="color: #559a44">{{ scope.row.currency }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="certificate"
        sortable="custom"
        label="实名"
        width="150"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.certificate == 0">否</span>
          <span v-else-if="scope.row.certificate == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column prop="city" label="城市" width="200" />
      <el-table-column
        prop="reg_time"
        sortable="custom"
        label="注册时间"
        width="200"
      />
      <el-table-column prop="last_time" label="登录时间" width="200" />
      <el-table-column label="状态" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">禁用</span>
          <span v-else-if="scope.row.status == 1">正常</span>
          <span v-else-if="scope.row.status == 2">禁言</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <div class="jump1" @click="Detailed(scope.row)">查看</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="curPage"
        :hide-on-single-page="true"
        :page-sizes="[10, 20, 50, 100]"
        @current-change="pageChange"
        background
        :page-size.sync="page_size"
        @size-change="handlePageSizeChange"
        layout="sizes,prev, pager, next,jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 批量修改状态 -->
    <el-dialog
      title="批量修改以下用户的状态"
      :visible.sync="changetx"
      width="50%"
    >
      <div class="gz-lieb">
        <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
          {{ item }}、
        </div>
      </div>
      <div class="xialdiv">
        <el-select v-model="status" placeholder="请选择修改的状态">
          <el-option
            v-for="item in stateData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changetx = false">取 消</el-button>
        <el-button type="primary" @click="changeData()">确定</el-button>
      </span>
    </el-dialog>
    <!-- 礼物背包 -->
    <el-dialog :title="nickname + '的背包'" :visible.sync="gifttx" width="50%">
      <div class="tadshiqu">
        <div class="lievyt" v-for="(item, index) in temporaryData" :key="index">
          <div class="neibtiaoq">
            <el-image class="chengimg" :src="item.gift.image"></el-image>
          </div>
          <div class="tilmwz">
            {{ item.gift.name
            }}<span style="color: #d7a138">X{{ item.gift_num }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息" :visible.sync="usertx" width="70%">
      <userBounced
        ref="userBounced"
        fromPath="UserInformation"
        @fatherMethod="fatherMethods"
      ></userBounced>
    </el-dialog>
    <!-- 返回上一页 -->
    <go-back
      v-if="showBack"
      :isFromUser="true"
      @chFun="backParentFun"
    ></go-back>
    <el-backtop
      target=".main-container"
      :bottom="showBack ? 105 : 40"
    ></el-backtop>
  </div>
</template>

<script>
import citySelectex from "@/components/citySelectEX";
import changeTime from "../../utils/getdate"; //获取当前时间
export default {
  name: "UserInformation",
  components: {
    citySelectex,
  },
  data() {
    return {
      //返回上一页
      showBack: false,
      //用户详情弹框
      usertx: false,
      nickname: "",
      temporaryData: [],
      gifttx: false,
      //页码
      curPage: 1,
      //数据总数
      total: 1,
      changetx: false, //打开修改框
      tableListData: [], //列表内容
      multipleSelection: [], //批量选中ID
      nameArr: [], //批量选中的名称
      //状态的值
      status: "",
      //状态的数组
      stateData: [
        {
          id: 0,
          name: "禁用",
        },
        {
          id: 1,
          name: "正常",
        },
        {
          id: 2,
          name: "禁言",
        },
      ],
      //省份
      province_id: "",
      //城市
      city_id: "",
      //区域
      area_id: "",
      //手机
      phone: "",
      //用户id或者昵称
      user: "",
      //注册开始时间
      reg_time_start: "",
      //注册结束时间
      reg_time_end: "",
      //排序
      sort: "",
      order: "",
      parent_id: 0,
      page_size: 10,
    };
  },
  created() {
    // 返回上一页
    this.showBack = this.$route.query.from ? true : false;
    //判断是否存储有筛选条件
    var data = this.$store.state.screeningData.UserInformation;
    if (data) {
      if (data.Yuanfang) {
        this.reg_time_start = data.reg_time_start;
        this.reg_time_end = data.reg_time_end;
        this.user = data.user;
        this.phone = data.phone;
        this.status = data.status;
        this.province_id = data.province_id;
        this.city_id = data.city_id;
        this.area_id = data.area_id;
        this.curPage = data.curPage;
        this.page_size = data.page_size;
        var _this = this;
        setTimeout(() => {
          this.$refs.citySelect.passData(
            _this.province_id,
            _this.city_id,
            _this.area_id
          );
        }, 0);
        var value = this.$store.state.screeningData;
        var groupData = {
          UserInformation: { Yuanfang: false },
        };
        Object.assign(value, groupData);
        this.$store.dispatch("updateVuex", {
          key: "screeningData",
          value: value,
        });
      }
    }
    if (this.$route.query.formHome == 0) {
      this.reg_time_start = changeTime() + " 00:00";
      this.reg_time_end = changeTime() + " 23:59";
    }
    //
    if (this.$route.query.user_id) {
      this.user = this.$route.query.user_id;
      this.parent_id = this.$route.query.user_id;
      this.curPage = 1;
    }
    this.getTableList();
  },
  beforeDestroy() {
    if (this.usertx) {
      this.ConditionsF();
    }
  },
  methods: {
    handlePageSizeChange() {
      this.screening();
    },
    backParentFun() {
      this.parent_id = 0;
      this.curPage = 1;
      this.getTableList();
      this.showBack = false;
    },
    fatherMethods(id) {
      this.usertx = false;
      this.parent_id = id;
      this.curPage = 1;
      this.getTableList();
      this.showBack = true;
    },
    // 内容过长，鼠标移入显示全部
    getAgent(v) {
      return v.length > 10 ? v.substring(0, 10) + " ..." : v;
    },
    getShow(v) {
      return v.length > 10 ? false : true;
    },
    //用户详情弹框
    userInformation(row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user_id);
      }, 0);
    },
    //TAB筛选
    screeningData(column) {
      if (column.order) {
        this.sort = column.prop;
        this.order = column.order == "ascending" ? "ASC" : "DESC";
      } else {
        this.sort = "";
        this.order = "";
      }
      this.getTableList();
    },
    //礼物背包(废弃)
    gifttxF(row) {
      this.gifttx = true;
      this.nickname = row.nickname;
      var data = {
        //用户ID
        user_id: row.user_id,
        //拉取数量
        page_size: 0,
      };
      this.api.user.GiftList(data).then((res) => {
        this.temporaryData = res.data.data.gift_info;
      });
    },
    //详情
    Detailed(row) {
      this.ConditionsF();
      this.$router.push({
        path: "/UserDetails",
        query: {
          user_id: row.user_id,
        },
      });
    },
    ConditionsF() {
      var data = this.$store.state.screeningData;
      var groupData = {
        UserInformation: {
          reg_time_start: this.reg_time_start,
          reg_time_end: this.reg_time_end,
          user: this.user,
          phone: this.phone,
          status: this.status,
          province_id: this.province_id,
          city_id: this.city_id,
          area_id: this.area_id,
          curPage: this.curPage,
          page_size: this.page_size,
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
    // 获取子组件返回的ID
    setCityAreaName(areaName) {
      this.province_id = areaName.province;
      this.city_id = areaName.city;
      this.area_id = areaName.area;
    },
    //重置
    resetData() {
      this.reg_time_start = "";
      this.reg_time_end = "";
      this.user = "";
      this.phone = "";
      this.status = "";
      this.province_id = "";
      this.city_id = "";
      this.area_id = "";
      this.curPage = 1;
      this.getTableList();
      this.$refs.citySelect.resetData();
    },
    //筛选
    screening() {
      this.curPage = 1;
      this.getTableList();
    },
    /*, 获取表单内容 */
    getTableList() {
      var data = {};
      if (this.parent_id) {
        data = {
          sort: this.sort,
          order: this.order,
          reg_time_start: this.reg_time_start,
          reg_time_end: this.reg_time_end,
          phone: this.phone,
          status: this.status,
          //省份id
          province_id: this.province_id,
          //城市id
          city_id: this.city_id,
          //地区id
          area_id: this.area_id,
          //页码
          page: this.curPage,
          //拉取数量
          page_size: this.page_size,
          parent_id: this.parent_id,
        };
      } else {
        data = {
          sort: this.sort,
          order: this.order,
          reg_time_start: this.reg_time_start,
          reg_time_end: this.reg_time_end,
          user: this.user,
          phone: this.phone,
          status: this.status,
          //省份id
          province_id: this.province_id,
          //城市id
          city_id: this.city_id,
          //地区id
          area_id: this.area_id,
          //页码
          page: this.curPage,
          //拉取数量
          page_size: this.page_size,
        };
      }
      this.api.user.getUser(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    //获取行业/职业数据(废弃)
    professional(type) {
      var data = {
        //类型
        type: type,
        page_size: 0,
      };
      this.api.user.Professional(data).then((res) => {
        if (type == 0) {
          this.hanyData = res.data.data;
          this.professional(1);
        } else {
          this.zhiyData = res.data.data;
        }
      });
    },
    //礼物(废弃)
    GiftDetail(row) {
      this.$router.push({
        path: "/UserGift",
        query: {
          user_id: row.user_id,
        },
      });
    },
    //预订(废弃)
    reserveDetail(row) {
      this.$router.push({
        path: "/UserReserve",
        query: {
          user_id: row.user_id,
        },
      });
    },
    //退款(废弃)
    refundDetail(row) {
      this.$router.push({
        path: "/UserRefund",
        query: {
          user_id: row.user_id,
        },
      });
    },
    //账单(废弃)
    billDetail(row) {
      this.$router.push({
        path: "/UserBill",
        query: {
          user_id: row.user_id,
        },
      });
    },
    //通知(废弃)
    noticeDetail(row) {
      this.$router.push({
        path: "/UserMessage",
        query: {
          user_id: row.user_id,
        },
      });
    },
    //详情(废弃)
    checkDetail(data, row) {
      if (data == "wx") {
        if (this.wxUnionid != "") {
          this.$router.push({
            path: "/UserDetails",
            query: {
              wxUnionid: this.wxUnionid,
            },
          });
        } else {
          this.$message({
            message: "请输入微信开放平台UNIONID",
            type: "warning",
          });
        }
      } else if (data == "id") {
        this.$router.push({
          path: "/UserDetails",
          query: {
            user_id: row.user_id,
          },
        });
      }
    },
    /* 选择表的行 */
    selectItem(val) {
      //批量选中ID
      this.multipleSelection = [];
      //批量选中的名称
      this.nameArr = [];
      val.forEach((item) => {
        this.multipleSelection.push(item.user_id);
        this.nameArr.push(item.nickname);
      });
    },
    // 打开修改状态框
    batchDelete() {
      if (this.multipleSelection != "") {
        this.changetx = true;
        this.status = "";
      } else {
        this.$message({
          message: "请先勾选要改变状态的用户",
          type: "warning",
        });
      }
    },
    //修改状态
    changeData() {
      if (this.status != "") {
        var data = {
          id: this.multipleSelection,
          status: this.status,
        };
        this.api.user.UserHandle(data).then((res) => {
          this.getTableList();
          this.changetx = false;
        });
      } else {
        this.$message({
          message: "请选择修改的状态",
          type: "warning",
        });
      }
    },
    /* 改变页数 */
    pageChange(page) {
      this.curPage = page;
      this.getTableList();
    },
  },
};
</script>

<style lang="scss" scoped>
.editBtn {
  margin: 20px 0 10px;
  float: left;
  background-color: #0a0a0a !important;
  border: 1px solid #0a0a0a;
  color: #ffffff;
}
.sosuo {
  margin-left: 10px;
  float: left;
  background-color: #f4f4f4 !important;
  border: 1px solid #cecece;
  color: #0a0a0a;
  width: 90px;
}
.t-s01 {
  line-height: 34px;
  font-size: 15px;
}
.t-s02 {
  margin-left: 20px;
}
.tadshiqu {
  width: 98%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;
}
.lievyt {
  width: 160px;
  height: 200px;
  margin-right: 12px;
  margin-bottom: 12px;
}
.neibtiaoq {
  width: 100%;
  height: 160px;
  border: 1px solid rgb(170, 170, 170);
}
.chengimg {
  width: 100px;
  height: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
  margin-top: -50px;
}
.tilmwz {
  font-size: 16px;
  color: #000;
  text-align: center;
  line-height: 40px;
}

.zjiang {
  font-size: 24px;
  line-height: 36px;
  color: darkgrey;
  padding-left: 4px;
  padding-right: 4px;
}
.xialdiv {
  padding-top: 30px;
  padding-bottom: 50px;
}
.gz-lieb {
  display: flex;
}
.shanxdiv {
  margin-bottom: 10px;
  display: flex;
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
  .ewmsou {
    float: left;
    width: 300px;
    margin-right: 10px;
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
