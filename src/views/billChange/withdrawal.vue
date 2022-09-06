<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <span class="t-s01">用户：</span>
      <el-input style="width: 350px; margin-right: 10px"
                placeholder="搜索用户id、昵称、手机"
                v-model="user"
                clearable></el-input>
      <span class="t-s01 t-s02">时间：</span>
      <el-date-picker v-model="start_time"
                      type="datetime"
                      placeholder="设置开始时间"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm">
      </el-date-picker>
      <div class="rucwz">-</div>
      <el-date-picker style="margin-right: 10px"
                      v-model="end_time"
                      type="datetime"
                      placeholder="设置结束时间"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm">
      </el-date-picker>
    </div>
    <div class="shanxdiv">
      <span class="t-s01">订单号：</span>
      <el-input style="width: 350px; margin-right: 10px"
                placeholder="搜索订单号"
                v-model="keyword"
                clearable></el-input>
      <span class="t-s01 t-s02">状态：</span>
      <el-select style="margin-right: 10px"
                 v-model="status"
                 placeholder="选择状态">
        <el-option v-for="item in statusData"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
      <span class="t-s01 t-s02">提现方式：</span>
      <el-select style="margin-right: 10px"
                 v-model="type"
                 placeholder="选择方式">
        <el-option label="微信"
                   :value="1"></el-option>
        <el-option label="支付宝"
                   :value="2"></el-option>
      </el-select>
      <el-button class="sosuo"
                 type="primary"
                 @click="screening">筛选</el-button>
      <el-button class="sosuo"
                 type="info"
                 @click="resetData">清空条件</el-button>
    </div>
    <div class="shanxdiv">
      <transition name="el-zoom-in-top">
        <div class="tidiv"
             v-show="latesttx">
          <div style="flex: 1; display: flex; align-items: center">
            <div class="laoldiv t-ban">
              同意放款
              <i class="sanjiao"></i>
            </div>
            <div class="laoldiv">提现人：</div>
            <div class="duio"
                 style="display: flex; align-items: center"
                 @click="userInformation(latestData)">
              <el-image class="ustrimg1"
                        v-if="latestDataUser.avatar"
                        :src="latestDataUser.avatar"></el-image>
              <div class="bjgt1">{{ latestDataUser.nickname }}</div>
              <div class="bjgt1">{{ latestDataUser.phone }}</div>
            </div>
            <div class="laoldiv">
              放款金额：{{ latestData.income }}酒力={{
                latestData.income / 10
              }}元
            </div>
            <div class="laoldiv">提现时间：{{ latestData.create_time }}</div>
            <div class="laoldiv">审核时间：{{ latestData.audit_time }}</div>
          </div>
          <div class="laoldivad">
            <i class="el-icon-circle-close guancss"
               @click="latesttx = false"></i>
          </div>
        </div>
      </transition>
    </div>
    <el-table ref="multipNum"
              stripe
              :data="tableListData"
              tooltip-effect="dark"
              style="width: 100%"
              @sort-change="screeningData">
      <el-table-column prop="order_no"
                       label="订单号"
                       width="200" />
      <el-table-column sortable="custom"
                       prop="create_time"
                       label="提现时间"
                       width="200" />
      <el-table-column sortable="custom"
                       prop="audit_time"
                       label="审核时间"
                       width="200" />
      <el-table-column label="用户"
                       width="300">
        <template slot-scope="scope">
          <div class="duio muzhicss"
               @click="userInformation(scope.row)">
            <el-image class="ustrimg"
                      v-if="scope.row.user.avatar"
                      :src="scope.row.user.avatar"
                      fit="cover"></el-image>
            <div>
              <div class="bjgt">{{ scope.row.user.nickname }}</div>
              <div class="bjgt">{{ scope.row.user.phone }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="title"
                       label="设备信息"
                       width="200">
        <template slot-scope="scope">
          <div class="muzhicss">
            <dl>{{ scope.row.ipaddress }}</dl>
            <dl>{{ scope.row.address }}</dl>
            <el-tooltip effect="dark"
                        placement="bottom">
              <div slot="content">
                手机品牌：{{ scope.row.device_brand }}<br />手机型号：{{
                  scope.row.device_type
                }}<br />
                操作系统：{{ scope.row.os }}<br />请求版本：{{
                  scope.row.version
                }}<br />
                极光设备号：{{ scope.row.registration_id }}<br />经纬度：{{
                  scope.row.latitude
                }}、{{ scope.row.longitude }}<br />
              </div>
              <div style="width: 60px">更多信息</div>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="income"
                       label="提现酒力"
                       width="220">
        <template slot-scope="scope">
          <div>
            <span style="color: #6fbe44">-{{ scope.row.income }}</span>酒力={{ scope.row.income / 10 }}元
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="income_after"
                       label="酒力余额"
                       width="200" />
      <el-table-column label="提现方式"
                       width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">微信</span>
          <span v-else-if="scope.row.type == 2">支付宝</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1"
                style="color: #6fbe44">机器审核</span>
          <span v-else-if="scope.row.status == 2"
                style="color: #eab154">人工审核中</span>
          <div class="muzhicss"
               v-else-if="scope.row.status == 3">
            <el-tooltip effect="dark"
                        :content="scope.row.audit_reason"
                        placement="bottom">
              <span style="color: #e26b66">审核被拒绝</span>
            </el-tooltip>
          </div>
          <span v-else-if="scope.row.status == 4"
                style="color: #4e9df8">人工审核通过</span>
          <span v-else-if="scope.row.status == 5"
                style="color: #4e9df8">提现成功</span>
          <div class="muzhicss"
               v-else-if="scope.row.status == 6">
            <el-tooltip effect="dark"
                        :content="whyF(scope.row)"
                        placement="bottom">
              <span style="color: #4e9df8">提现失败</span>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       align="center"
                       label="操作"
                       width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 2"
                     type="warning"
                     @click="auditDialog(scope.row)">审核</el-button>
          <el-button v-else
                     type="text"
                     disabled>已审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination :current-page="curPage"
                     :hide-on-single-page="true"
                     @current-change="pageChange"
                     background
                     :page-size.sync="page_size"
                     @size-change="handlePageSizeChange"
                     :page-sizes="[10, 20, 50, 100]"
                     layout="sizes,prev, pager, next,jumper"
                     :total="total"></el-pagination>
    </div>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息"
               :visible.sync="usertx"
               width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
    <!-- 审核放款 -->
    <el-dialog title="审核放款"
               :visible.sync="audittx"
               width="40%">
      <el-form label-width="120px"
               class="updateArea">
        <el-form-item label="提现人：">
          <div class="duio">
            <el-image class="ustrimg"
                      style="width: 40px; height: 40px; border-radius: 100%"
                      :src="currenItemUser.avatar"
                      fit="cover"></el-image>
            <div>
              <div class="bjgt"
                   style="line-height: 22px">
                {{ currenItemUser.nickname }}
              </div>
              <div class="bjgt"
                   style="line-height: 22px">
                {{ currenItemUser.phone }}
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="提现金额：">{{ currenItem.income }}酒力={{
            currenItem.income / 10
          }}元</el-form-item>
        <el-form-item label="提现时间：">{{
          currenItem.create_time
        }}</el-form-item>
        <el-input style="width: 90%; margin-left: 26px"
                  type="textarea"
                  :rows="2"
                  placeholder="拒绝理由（拒绝时必填）"
                  v-model="audit_reason">
        </el-input>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="confirmF(1)">同意放款</el-button>
        <el-button @click="confirmF(2)">拒绝放款</el-button>
      </span>
    </el-dialog>
    <!-- 返回上一页 -->
    <goBack v-if="showBack"></goBack>
  </div>
</template>

<script>
import changeTime from "../../utils/getdate"; //获取当前时间
export default {
  name: "GiftDetailed",
  data () {
    return {
      audittx: false,
      usertx: false,
      //页码
      curPage: 1,
      page_size: 10,
      //总数
      total: 1,
      tableListData: [], //页面表单的内容
      //用户ID搜索
      user: "",
      user_id: "",
      start_time: "",
      end_time: "",
      //排序
      sort: "",
      order: "",
      keyword: "",
      status: "",
      statusData: [
        {
          id: 1,
          name: "机器审核",
        },
        {
          id: 2,
          name: "人工审核中",
        },
        {
          id: 3,
          name: "审核被拒绝",
        },
        {
          id: 4,
          name: "人工审核通过",
        },
        {
          id: 5,
          name: "提现成功",
        },
        {
          id: 6,
          name: "提现失败",
        },
      ],

      type: "",
      currenItem: [],
      currenItemUser: [],
      //拒绝理由
      audit_reason: "",
      //顶部信息显示
      latesttx: false,
      //顶部显示数据
      latestData: [],
      latestDataUser: [],
      showBack: false
    };
  },
  created () {
    // 返回上一页
    this.showBack = this.$route.query.from ? true : false;
    if (this.$route.query.formHome) {
      this.start_time = changeTime() + " 00:00";
      this.end_time = changeTime() + " 23:59";
      this.status = 5;
    }
    if (this.$route.query.user_id) {
      this.user_id = this.$route.query.user_id
      this.status = '';
    }
    this.getTableList();
  },
  methods: {
    // 判断用那个当原因
    whyF (row) {
      if (JSON.stringify(row.wxpay) == "null") {
        if (row.alipay.resp_sub_msg != "") {
          return row.alipay.resp_sub_msg;
        } else {
          return row.alipay.resp_msg;
        }
      } else if (JSON.stringify(row.alipay) == "null") {
        return row.wxpay.resp_err_code_des;
      }
    },
    /* 打开审核弹框 */
    auditDialog (row) {
      this.audittx = true;
      this.currenItem = row;
      this.currenItemUser = row.user;
      this.latestData = row;
      this.latestDataUser = row.user;
    },
    //确认弹框
    confirmF (key) {
      if (key == 2 && this.audit_reason == "") {
        this.$message({
          message: "请填写拒绝理由",
          type: "warning",
        });
      } else {
        this.$confirm(key == 1 ? "确定放款吗？" : "确定拒绝吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.auditPost(key);
          })
          .catch(() => { });
      }
    },
    //审核放款
    auditPost (status) {
      var data = {
        cash_id: this.currenItem.cash_id,
        status: status == 1 ? 4 : 3,
        audit_reason: this.audit_reason,
      };
      this.api.billChange.cashMention(data).then((res) => {
        this.audittx = false;
        if (status == 1) {
          this.latesttx = true;
        }
        this.latestData.audit_time = res.data.data.audit_time;
        this.audit_reason = "";
        this.getTableList();
      });
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
    //用户详情弹框
    userInformation (row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user.user_id);
      }, 0);
    },
    //重置
    resetData () {
      this.type = "";
      this.user = "";
      this.keyword = "";
      this.status = "";
      this.start_time = "";
      this.end_time = "";
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
        sort: this.sort,
        order: this.order,
        user: this.user,
        user_id: this.user_id,
        keyword: this.keyword,
        status: this.status,
        start_time: this.start_time,
        end_time: this.end_time,
        type: this.type,
        page: this.curPage,
        page_size: this.page_size
      };
      this.api.billChange.cashList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
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
  },
};
</script>

<style lang="scss" scoped>
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
.guancss {
  font-size: 20px;
  cursor: pointer;
  color: #dda100;
}
.tidiv {
  width: 100%;
  padding: 0 10px 0 0;
  border: 1px solid #ffcc44;
  background: #fff6df;
  border-radius: 4px;
  font-size: 15px;
  display: flex;
  align-items: center;
}
.laoldiv {
  margin-left: 40px;
}
.t-ban {
  margin-left: 0 !important;
  padding: 14px;
  background: #ffbe11;
  display: flex;
  align-items: center;
  position: relative;
}
.sanjiao {
  position: absolute;
  right: -8px;
  top: 18px;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-left: 8px solid #ffbe11;
  border-bottom: 6px solid transparent;
}
.ustrimg1 {
  width: 34px;
  height: 34px;
  border-radius: 100%;
  margin-right: 6px;
}
.bjgt1 {
  font-size: 15px;
}
// 结束
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
  .duio {
    display: flex;
    align-items: center;
  }
}
</style>
