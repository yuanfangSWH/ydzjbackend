<template>
  <div class="shopSet">
    <div class="biaotou">
      <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
      <el-button @click="returnF"
                 style="    background:#000000;    margin-left: 10px;"
                 type="primary">返回</el-button>
    </div>

    <div class="shanxdiv2"
         style="margin-top: 10px;">
      <div class="xiandiv">
        <div class="biaoqian litwg">用户信息：</div>
        <div class="zgnri">
          <div class="duio muzhicss">
            <el-image class="ustrimg"
                      :src="userData.activity_user.avatar"
                      fit="cover"></el-image>
            <div>
              <div class="bjgt">
                <el-tooltip class="item"
                            effect="dark"
                            :content="userData.activity_user.nickname"
                            placement="bottom"
                            :disabled="getShow(userData.activity_user.nickname)">
                  <div :title="getAgent(userData.activity_user.nickname)">
                    {{ getAgent(userData.activity_user.nickname) }}（<span v-if="userData.activity_user.gender == 0">未知</span>
                    <span v-else-if="userData.activity_user.gender == 1">男</span>
                    <span v-else-if="userData.activity_user.gender == 2">女</span>/{{
                      userData.activity_user.age
                    }}岁）
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="xiandiv">
        <div class="biaoqian">手机：</div>
        <div class="zgnri">{{ userData.activity_user.phone }}</div>
      </div> -->
      <div class="xiandiv">
        <div class="biaoqian">邀请人数：{{userData.invite_num}}</div>
        <!-- <div class="zgnri">{{ userData.invite_num }}人</div> -->
      </div>
      <!-- <div class="xiandiv">
        <div class="biaoqian">获得抽奖码：</div>
        <div class="zgnri">{{ userData.activity_user.phone }}个</div>
      </div> -->
      <!-- <div class="xiandiv">
        <div class="biaoqian">获得红包：</div>
        <div class="zgnri">{{ userData.activity_user.phone }}元</div>
      </div> -->
      <!-- <div class="xiandiv">
        <div class="biaoqian">获奖次数：</div>
        <div class="zgnri">{{ userData.activity_user.phone }}次</div>
      </div> -->
    </div>
    <div class="shanxdiv">
      <div class="litbtao">Ta邀请的用户</div>
    </div>
    <el-table ref="multipNum"
              stripe
              :data="tableListData"
              tooltip-effect="dark"
              style="width: 100%">
      <el-table-column label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户">
        <template slot-scope="scope">
          <div class="duio muzhicss"
               @click="userInformation(scope.row.activity_user)">
            <el-image class="ustrimg"
                      :src="scope.row.activity_user.avatar"
                      fit="cover"></el-image>
            <div>
              <div class="bjgt">
                <el-tooltip class="item"
                            effect="dark"
                            :content="scope.row.activity_user.nickname"
                            placement="bottom"
                            :disabled="getShow(scope.row.activity_user.nickname)">
                  <div :title="getAgent(scope.row.activity_user.nickname)">
                    {{ getAgent(scope.row.activity_user.nickname) }}（<span v-if="scope.row.activity_user.gender == 0">未知</span>
                    <span v-else-if="scope.row.activity_user.gender == 1">男</span>
                    <span v-else-if="scope.row.activity_user.gender == 2">女</span>/{{
                      scope.row.activity_user.age
                    }}岁）
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="phone"
                       label="手机" /> -->
      <el-table-column prop="platform"
                       label="渠道">
        <template slot-scope="scope">
          {{scope.row.platform}}
        </template>
      </el-table-column>

      <el-table-column prop="invite_num "
                       label="邀请人数">
        <template slot-scope="scope">
          {{scope.row.invite_num}}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="lottery_code_num"
                       label="获得抽奖码">
        <template slot-scope="scope">
          {{ scope.row.lottery_code_num }}个
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="total_reward"
                       label="获得红包">
        <template slot-scope="scope"> {{ scope.row.total_reward }}元 </template>
      </el-table-column> -->
      <el-table-column prop="create_time"
                       label="注册时间">
        <template slot-scope="scope"> {{scope.row.create_time }} </template>
      </el-table-column>

      <!-- <el-table-column fixed="right"
                       align="center"
                       label="操作">
        <template slot-scope="scope">
          <div class="jump1">查看Ta的邀请</div>
        </template>
      </el-table-column> -->

    </el-table>
    <div class="pagination">
      <el-pagination :current-page="curPage"
                     :hide-on-single-page="true"
                     @current-change="pageChange"
                     background
                     layout="prev, pager, next"
                     :total="total"></el-pagination>
    </div>

    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息"
               :visible.sync="usertx"
               width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
    <!-- 返回上一页 -->
    <go-back v-if="showBack"></go-back>
  </div>
</template>

<script>
export default {
  name: "lauserDetail",
  data () {
    return {
      //返回上一页
      showBack: false,
      //用户详情弹框
      usertx: false,
      //页码
      curPage: 1,
      //数据总数
      total: 1,
      user_id: "",
      tableListData: [],
      userData: {},
    };
  },
  created () {
    // 返回上一页
    this.showBack = this.$route.query.from ? true : false;
    this.user_id = this.$route.query.user_id;
    // this.userData = this.$store.state.temporaryData;
    this.userData = JSON.parse(sessionStorage.getItem("LA_USER"))
    this.getTableList();
  },
  methods: {
    //返回
    returnF () {
      this.$router.go(-1);
    },
    // 内容过长，鼠标移入显示全部
    getAgent (v) {
      return v.length > 10 ? v.substring(0, 10) + " ..." : v;
    },
    getShow (v) {
      return v.length > 10 ? false : true;
    },
    //用户详情弹框
    userInformation (row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user_id);
      }, 0);
    },
    /*, 获取表单内容 */
    getTableList () {
      var data = {
        //user_id
        new_user_id: this.user_id,
        //页码
        page: this.curPage,
        //拉取数量
        page_size: 10,
      };
      this.api.lauser.invitationDetail(data).then((res) => {
        console.log(res)
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 改变页数 */
    pageChange (page) {
      this.curPage = page
      this.getTableList(page);
    },
  },
};
</script>

<style lang="scss" scoped>
.biaotou {
  width: 100%;
  height: 37px;
  display: flex;
}
.xiandiv {
  display: flex;
  margin-bottom: 20px;
}
.biaoqian {
  // width: 120px;
  text-align: left;
}
.litwg {
  line-height: 34px;
}
.zgnri {
  flex: 1;
}
.litbtao {
  font-size: 24px;
}
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
.ustrimg {
  width: 34px;
  height: 34px;
  border-radius: 100%;
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
