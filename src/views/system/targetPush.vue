<template>
  <div class="">
    <div class="shopSet">
      <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
      <!-- v-if="searchOption.article_id == 0" -->
      <div class="shanxdiv">
        <div class="rucwz2">标题</div>
        <el-input
          style="width: 350px; margin-right: 10px"
          placeholder="搜索推送标题"
          v-model="searchOption.title"
          @change="screening"
          clearable
        ></el-input>
        <div class="rucwz2">推送时间</div>
        <el-date-picker
          class="datePicker"
          v-model="searchTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          value-format="yyyy-MM-dd HH:mm"
          format="yyyy-MM-dd HH:mm"
          @change="dateChange"
        ></el-date-picker>
        <el-button
          class="filter-btn"
          type="primary"
          @click="screening"
          style="margin-left: 10px"
          >筛选</el-button
        >
        <el-button class="filter-btn" type="primary" @click="resetData"
          >清空条件</el-button
        >
      </div>
      <!-- <div v-if="searchOption.article_id > 0" class="shanxdiv">
        <el-button class="filter-btn" type="primary" @click="$router.back()"
          >返回</el-button
        >
      </div> -->
    </div>
    <div class="shopSet">
      <!--  v-if="searchOption.article_id == 0" -->
      <div class="shanxdiv">
        <el-button type="primary" @click="insertData" style="margin-left: 10px"
          >发起推送</el-button
        >
      </div>
      <el-table
        ref="multipNum"
        stripe
        :data="tableListData"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading"
        @sort-change="handleDataSort"
      >
        <el-table-column prop="push_id" label="ID" width="80" sortable="true" />
        <el-table-column prop="title" label="推送标题" />
        <el-table-column prop="content" label="推送内容" />
        <el-table-column prop="url" label="链接" />
        <el-table-column prop="" label="发送到用户" width="450">
          <template slot-scope="scope">
            <span v-if="scope.row.constellation"
              >星座：{{ scope.row.constellation }}；</span
            >
            <span v-if="scope.row.zodiac">生肖：{{ scope.row.zodiac }}；</span>
            <span v-if="scope.row.user_id"
              >用户ID：{{ scope.row.user_id }}；</span
            >
            <span v-if="scope.row.platform"
              >平台：{{ scope.row.platform }}；</span
            >
            <span v-if="scope.row.gender == 1" style="margin-right: 10px"
              >性别：男用户；</span
            >
            <span v-if="scope.row.gender == 2" style="margin-right: 10px"
              >性别：女用户；</span
            >
            <span v-if="scope.row.birthday"
              >出生日期：{{ scope.row.birthday }}；</span
            >
            <span v-if="scope.row.province"
              >省份：{{ scope.row.province }}；</span
            >
            <span v-if="scope.row.city">城市：{{ scope.row.city }}；</span>
            <span v-if="scope.row.area">区域：{{ scope.row.area }}；</span>
          </template>
        </el-table-column>

        <el-table-column prop="" label="计划推送时间" sortable="true">
          <template slot-scope="scope">
            <span v-if="scope.row.send_time">{{ scope.row.send_time }}</span>
            <span v-else>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="push_time"
          label="推送时间"
          sortable="true"
        ></el-table-column>
        <el-table-column prop="create_time" label="创建时间" sortable="true" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">已删除</span>
            <span v-if="scope.row.status == 1" style="color: #67c23a"
              >已推送</span
            >
            <span v-if="scope.row.status == 2">待推送</span>
            <span v-if="scope.row.status == 3">取消推送</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          ref="pagination"
          :current-page="searchOption.page"
          :hide-on-single-page="true"
          @current-change="pageChange"
          background
          layout="prev, pager, next,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title="发起定向推送"
      :visible.sync="insertDialog"
      width="50%"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <el-form
        :model="detailsData"
        :rules="rules"
        ref="detailsData"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="推送标题：" prop="title">
          <el-input
            style="width: 80%"
            v-model="detailsData.title"
            placeholder="请填写推送标题"
            show-word-limit
            maxlength="30"
          ></el-input>
        </el-form-item>
        <el-form-item label="推送描述：" prop="content">
          <el-input
            style="width: 80%"
            type="textarea"
            v-model="detailsData.content"
            :autosize="{ minRows: 3, maxRows: 6 }"
            show-word-limit
            maxlength="150"
            placeholder="请填写推送内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="url">
          <div style="display: flex; align-items: center; width: 80%">
            <div style="flex: 1">
              <el-input
                v-model="detailsData.url"
                placeholder="请输入链接"
              ></el-input>
            </div>
            <el-tooltip
              class="item"
              effect="dark"
              placement="right"
              height="300"
            >
              <div class="tipText" slot="content">
                https://m.ddhi.cn/user/detail?user_id= 走个人主页<br />
                http://xxx H5(通用Url，走webview)<br />
                ydzj://index 首页 X<br />
                ydzj://scan 扫码<br />
                ydzj://setting 设置<br />
                ydzj://certification 实名认证<br />
                ydzj://cs 客服 //CustomerService<br />
                ydzj://help 新手指南<br />
                ydzj://invite 邀请赚钱<br />
                ydzj://coupon 红包卡券<br />
                ydzj://qr 我的二维码<br />

                ydzj://shop/search 首页待搜索页<br />
                ydzj://shop/search?keyword=搜索词 首页搜索结果页<br />
                ydzj://shop/list?type_id=商家类型ID&area_id=区域ID&sort=排序&keyword=搜索词
                商家列表页<br />
                ydzj://shop/detail?shop_id=商家ID&merchant_id=店铺ID
                店铺详情页<br />

                ydzj://thread/list?keyword=搜索词 发现 X<br />
                ydzj://thread/follower 我关注的人发的<br />
                ydzj://thread/detail?id=帖子ID 发现详情<br />
                ydzj://thread/video?id=视频ID 视频详情<br />
                ydzj://thread/issue 发现发布页<br />

                ydzj://groupparty/list?keyword=搜索词&shop_id=商家ID&merchant_id=店铺ID&type_id=商家类型ID&area_id=区域ID&sort=排序方式
                组局列表<br />
                ydzj://groupparty/detail?id=组局ID 组局详情<br />
                ydzj://groupparty/issue 发布组局<br />

                ydzj://crowdfunding/list?keyword=搜索词&shop_id=商家ID&merchant_id=店铺ID&type_id=商家类型ID&area_id=区域ID&sort=排序方式
                拼桌列表<br />
                ydzj://crowdfunding/detail?id=拼桌ID 拼桌详情<br />
                ydzj://crowdfunding/issue 发布拼桌<br />

                ydzj://article/list?type=2 夜店小助手<br />

                ydzj://message/index 消息首页<br />
                ydzj://message/system?type=业务类型&id=业务ID 系统通知列表<br />
                ydzj://message/order?type=业务类型&id=业务ID 订单消息列表<br />
                ydzj://message/interact?type=业务类型&id=业务ID 互动消息列表<br />
                ydzj://message/activity?type=业务类型&id=业务ID 活动通知列表<br />

                ydzj://my/friend 我的好友<br />
                ydzj://my/addfriend 添加好友<br />
                ydzj://my/following 我的关注<br />
                ydzj://my/fans 我的粉丝<br />
                ydzj://my/index 我的主页<br />
                ydzj://my/edit 编辑资料<br />
                ydzj://my/album 我的相册<br />
                ydzj://my/groupparty?scene=场景（1 我发布的组局 2 我参与的组局）
                我的组局<br />
                ydzj://my/crowdfunding?scene=场景(1我发布的 2我报名的)
                我的拼桌<br />
                ydzj://my/wallet 我的钱包<br />
                ydzj://my/currency 我的账单<br />
                ydzj://my/income 我的收入<br />
                ydzj://my/like 我喜欢的<br />

                ydzj://user/index?user_id=用户ID Ta的主页<br />

                ydzj://order/list 我的订单所有订单<br />
                ydzj://order/list?status=订单状态 我的订单分状态<br />

                ydzj://reserve/list // 我的所有预订<br />
                ydzj://reserve/list?type=%d // 我的预订分状态<br />
                ydzj://reserve/detail?order_no=%d //
                预订详情（101版本实现复杂，先不用）<br />

                104以后<br />
                ydzj://news/list?keyword=%s // 资讯列表<br />
                ydzj://news/list?mid=%d&keyword=%s // 资讯列表（分类、标签）<br />
                ydzj://news/detail?id=%d // 资讯详情
              </div>
              <i
                class="tip-i el-icon-info"
                style="margin-left: 10px; font-size: 20px"
              ></i>
            </el-tooltip>
          </div>
        </el-form-item>
        <el-form-item label="计划时间：">
          <el-date-picker
            v-model="detailsData.send_time"
            type="datetime"
            placeholder="设置计划推送时间"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
          >
          </el-date-picker>
          <span class="zhishi">（注：不填则立即推送）</span>
        </el-form-item>
        <el-form-item label="指定用户" prop="">
          <el-switch
            v-model="target"
            active-color="#ffbe11"
            inactive-color="#d9d9d9"
            @change="switchChange"
          >
          </el-switch>
        </el-form-item>
        <el-form-item v-show="showStatus" label="指定用户ID" prop="user_id">
          <el-input
            v-model="detailsData.user_id"
            placeholder="请填写用户ID"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!showStatus" label="指定性别：">
          <el-checkbox-group v-model="target_sex">
            <el-checkbox label="男"></el-checkbox>
            <el-checkbox label="女"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="!showStatus" label="指定系统：">
          <el-checkbox-group v-model="target_os">
            <el-checkbox label="iOS"></el-checkbox>
            <el-checkbox label="Android"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="!showStatus" label="指定省市区：">
          <citySelectex
            ref="citySelect"
            :isCancel="isCancel"
            @setCityAreaName="setCityAreaName"
          />
        </el-form-item>
        <el-form-item v-if="!showStatus" label="指定出生日期：">
          <el-date-picker
            v-model="detailsData.birthday"
            value-format="MM-dd"
            format="MM-dd"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
          <span class="zhishi">（注：指定出生日期只选月日，不用考虑年份）</span>
        </el-form-item>
        <el-form-item v-if="!showStatus" label="指定生肖：">
          <el-select v-model="detailsData.zodiac" placeholder="请选择生肖">
            <el-option
              v-for="item in zodiacArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!showStatus" label="指定星座：">
          <el-select
            v-model="detailsData.constellation"
            placeholder="请选择星座"
          >
            <el-option
              v-for="item in constellationArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertDialog = false">取消</el-button>
        <el-button type="primary" @click="handleInsertData('detailsData')"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <!-- 返回上一页 -->
    <go-back v-if="searchOption.article_id > 0"></go-back>
  </div>
</template>

<script>
import citySelectex from "@/components/citySelectEX";
export default {
  components: { citySelectex },
  name: "systemTarget",
  data() {
    return {
      isCancel: true,
      searchOption: {
        article_id: 0,
        title: "",
        sort: "",
        order: "",
        page: 1,
        start_time: "",
        end_time: "",
      },
      searchTime: ["", ""],
      detailsDialog: false, //打开详情框
      insertDialog: false, //打开新建框
      total: 1,
      tableListData: [], //页面表单的内容
      target: false,
      showStatus: false,
      detailsData: {
        title: "",
        content: "",
        image: "",
        url: "",
        gender: 0,
        platform: 0, //平台
        province_id: 0, //省份
        city_id: 0, //城市
        area_id: 0, //区域
        zodiac: "", //生肖
        constellation: "", //星座
        birthday: "",
        user_id: "",
        send_time: "", //计划推送时间
      },
      target_sex: [],
      target_os: [],
      rules: {
        title: [{ required: true, message: "请输入推送标题", trigger: "blur" }],
        // content: [
        //   { required: true, message: "请输入推送内容", trigger: "blur" },
        // ],
        url: [{ required: true, message: "请输入链接", trigger: "blur" }],
      },
      loading: false,
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
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
      zodiacArr: [
        {
          value: "",
          label: "不限",
        },
        {
          value: "Rat",
          label: "鼠",
        },
        {
          value: "Ox",
          label: "牛",
        },
        {
          value: "Tiger",
          label: "虎",
        },
        {
          value: "Rabbit",
          label: "兔",
        },
        {
          value: "Dragon",
          label: "龙",
        },
        {
          value: "Snake",
          label: "蛇",
        },
        {
          value: "Horse",
          label: "马",
        },
        {
          value: "Goat",
          label: "羊",
        },
        {
          value: "Monkey",
          label: "猴",
        },
        {
          value: "Rooster",
          label: "鸡",
        },
        {
          value: "Dog",
          label: "狗",
        },
        {
          value: "Pig",
          label: "猪",
        },
      ],
      constellationArr: [
        {
          value: "",
          label: "不限",
        },
        {
          value: "Capricorn",
          label: "魔羯座",
        },
        {
          value: "Aquarius",
          label: "水瓶座",
        },
        {
          value: "Pisces",
          label: "双鱼座",
        },
        {
          value: "Aries",
          label: "牡羊座",
        },
        {
          value: "Taurus",
          label: "金牛座",
        },
        {
          value: "Gemini",
          label: "双子座",
        },
        {
          value: "Cancer",
          label: "巨蟹座",
        },
        {
          value: "Leo",
          label: "狮子座",
        },
        {
          value: "Virgo",
          label: "处女座",
        },
        {
          value: "Libra",
          label: "天秤座",
        },
        {
          value: "Scorpio",
          label: "天蝎座",
        },
        {
          value: "Sagittarius",
          label: "射手座",
        },
      ],
    };
  },
  created() {
    this.iniPageParam();
    this.getTableList();
  },
  watch: {
    $route(to, from) {
      this.iniPageParam();
      this.getTableList();
    },
  },
  methods: {
    switchChange(e) {
      this.showStatus = e;
      if (this.showStatus) {
        this.detailsData.gender = 0;
        this.detailsData.platform = 0;
        this.detailsData.province_id = 0;
        this.detailsData.city_id = 0;
        this.detailsData.area_id = 0;
      }
    },
    // 获取子组件返回的ID
    setCityAreaName(areaName) {
      console.info(areaName);
      this.detailsData.province_id = areaName.province;
      this.detailsData.city_id = areaName.city;
      this.detailsData.area_id = areaName.area;
      // this.mapCity = String(areaName.city_name);
      // if (!this.updateDialog) {
      //   this.mapKeyword = areaName.mapKeyword;
      // }
    },
    iniPageParam() {
      this.searchOption = {
        title: this.$route.query.title
          ? decodeURIComponent(this.$route.query.title)
          : "",
        sort: this.$route.query.sort,
        order: this.$route.query.order,
        page: this.$route.query.page ? Number(this.$route.query.page) : 1,
        start_time: this.$route.query.start_time,
        end_time: this.$route.query.end_time,
      };
      this.searchTime[0] = this.$route.query.start_time
        ? this.$route.query.start_time
        : "";
      this.searchTime[1] = this.$route.query.end_time
        ? this.$route.query.end_time
        : "";
    },
    insertData() {
      this.insertDialog = true;
    },
    /* 表格的排序发生变化 */
    handleDataSort(obj) {
      //console.info(obj)
      this.searchOption.sort = obj.order ? obj.prop : "";
      this.searchOption.order = obj.order ? this.sortableList[obj.order] : "";
      this.searchOption.page = 1;
      this.pageChange();
      //this.getTableList();
    },
    handleInsertData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("确定要提交推送吗？", "提示").then(() => {
            this.insertDataOk(formName);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    insertDataOk(formName) {
      let isOk = true;
      let msg = "";
      if (this.target_sex.length == 1) {
        this.detailsData.gender = this.target_sex[0] == "男" ? 1 : 2;
      } else {
        this.detailsData.gender = 0;
      }
      if (this.target_os.length == 1) {
        this.detailsData.platform = this.target_os[0];
      } else {
        this.detailsData.platform = "";
      }
      if (isOk) {
        let datas = this.detailsData;
        if (datas.province_id == "") {
          datas.province_id = 0;
        }
        if (datas.city_id == "") {
          datas.city_id = 0;
        }
        if (datas.area_id == "") {
          datas.area_id = 0;
        }
        if (!datas.user_id) {
          delete datas.user_id;
        } else {
          datas.user_id = Number(datas.user_id);
          datas.gender = 0;
          datas.platform = "";
          datas.province_id = 0;
          datas.city_id = 0;
          datas.area_id = 0;
        }
        delete datas.push_id;
        delete datas.image;
        this.api.system.SystemTargetInsert(datas).then(({ data }) => {
          let res = data;
          this.$message({
            message: "" + res.msg,
            type: "success",
          });
          this.target = false;
          this.showStatus = false;
          this.insertDialog = false;
          this.getTableList();
          this.detailsData = {
            push_id: "",
            title: "",
            content: "",
            image: "",
            url: "",
            // target: "1",
            // target_sex: 0,
            // target_os: 0,
            // target_ver: "",
            send_time: "",
          };
        });
      } else {
        this.$message.error(msg);
      }
    },
    //日期选择
    dateChange(val) {
      if (val) {
        this.searchOption.start_time = val[0];
        this.searchOption.end_time = val[1];
      }
    },
    //重置
    resetData() {
      this.searchOption = {
        title: "",
        sort: "",
        order: "",
        page: 1,
        start_time: "",
        end_time: "",
      };
      this.searchTime = ["", ""];
      this.pageChange();
    },
    //筛选
    screening() {
      this.searchOption.page = 1;
      this.pageChange();
    },
    /* 获取列表内容 */
    getTableList() {
      var data = this.searchOption;
      // loading = true;
      this.api.system
        .systemTarget(data)
        .then((res) => {
          this.loading = false;
          this.tableListData = res.data.data;
          this.total = res.data.count ? res.data.count : 0;
          this.$refs.pagination.internalCurrentPage = this.searchOption.page;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    /* 打开详情框 */
    detailsDelDialog(data) {
      this.detailsData = data;
      this.detailsDialog = true;
    },
    /* 改变页数 */
    pageChange(p) {
      if (p) this.searchOption.page = p;
      if (!this.searchTime) {
        this.searchTime = ["", ""];
        this.searchOption.start_time = this.searchTime[0];
        this.searchOption.end_time = this.searchTime[1];
      }
      this.searchOption.title = this.searchOption.title;
      this.$router.push({
        path: "/system/target",
        query: this.searchOption,
      });

      // this.getTableList();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button--primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}

.shanxdiv {
  margin-bottom: 10px;
  display: flex;
  .rucwz2 {
    color: #0a0a0a;
  }
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
.zhishi {
  font-size: 12px;
  color: #888;
  margin-left: 10px;
}
.tipText {
  padding-right: 10px;
  max-height: 600px;
  overflow-y: scroll;
  font-size: 14px !important;
  line-height: 22px !important;
}
</style>
