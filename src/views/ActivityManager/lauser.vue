<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>

    <div class="shanxdiv">
      <span class="t-s01">用户：</span>
      <el-input style="width: 300px"
                placeholder="搜索用户ID/手机号"
                v-model="user"
                clearable></el-input>
      <div class="shiheyf">渠道</div>
      <el-select v-model="channel"
                 placeholder="选择状态"
                 style="width: 300px">
        <el-option v-for="item in platformData"
                   :key="item.id"
                   :label="item.name"
                   :value="item.name">
        </el-option>
      </el-select>

      <div class="rucwz2">时间</div>
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

      <el-button class="sosuo"
                 type="primary"
                 @click="screening">筛选</el-button>
      <el-button class="sosuo"
                 type="info"
                 @click="resetData">清空条件</el-button>
    </div>
    <el-table ref="multipNum"
              stripe
              :data="tableListData"
              tooltip-effect="dark"
              style="width: 100%">
      <el-table-column label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户">
        <template slot-scope="scope">
          <div class="duio muzhicss"
               v-if="scope.row.activity_user!=null"
               @click="userInformation(scope.row.new_user_id)">
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

          <div v-else
               class="duio muzhicss">
            空
          </div>

        </template>
      </el-table-column>
      <el-table-column prop="platform"
                       label="渠道" />

      <!-- <el-table-column prop="activity_use.phone"
                       label="手机" /> --> -->

      <el-table-column prop="invite_num"
                       label="邀请人数">
        <template slot-scope="scope">
          {{ scope.row.invite_num }}人
        </template>
      </el-table-column>

      <el-table-column label="上级用户">
        <template slot-scope="scope">
          <div class="duio muzhicss"
               @click="userInformation(scope.row.parent_user.user_id)"
               v-if="scope.row.parent_user">
            <el-image class="ustrimg"
                      :src="scope.row.parent_user.avatar"
                      fit="cover"></el-image>
            <div>
              <div class="bjgt">
                <el-tooltip class="item"
                            effect="dark"
                            :content="scope.row.parent_user.nickname"
                            placement="bottom"
                            :disabled="getShow(scope.row.parent_user.nickname)">
                  <div :title="getAgent(scope.row.parent_user.nickname)">
                    {{ getAgent(scope.row.parent_user.nickname) }}（<span v-if="scope.row.parent_user.gender == 0">未知</span>
                    <span v-else-if="scope.row.parent_user.gender == 1">男</span>
                    <span v-else-if="scope.row.parent_user.gender == 2">女</span>/{{ scope.row.parent_user.age }}岁）
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div v-else>该用户无上级</div>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="total_reward"
                       label="获得红包">
        <template slot-scope="scope"> {{ scope.row.total_reward }}元 </template>
      </el-table-column>
      <el-table-column prop="winning_num"
                       label="获奖次数">
        <template slot-scope="scope"> {{ scope.row.winning_num }}次 </template>
      </el-table-column> -->
      <el-table-column prop="total_reward"
                       label="注册时间">
        <template slot-scope="scope"> {{ scope.row.create_time }}</template>
      </el-table-column>

      <el-table-column fixed="right"
                       align="center"
                       label="操作">
        <template slot-scope="scope">
          <div class="jump1"
               @click="Detailed(scope.row)">查看Ta的邀请</div>
        </template>
      </el-table-column>
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
  </div>
</template>

<script>
export default {
  name: "lauser",
  data () {
    return {
      //用户详情弹框
      usertx: false,
      //页码
      curPage: 1,
      //数据总数
      total: 1,
      //用户id或者昵称
      user: "",
      tableListData: [],
      tabRow: "",
      start_time: "",//开始时间
      end_time: "",//结束时间
      platformData: [//渠道数组
        {
          id: 0,
          name: "ios",
        },
        {
          id: 1,
          name: "android",
        },
        {
          id: 2,
          name: "webapp",
        },
      ],
      channel: "",//渠道

    };
  },
  created () {
    //判断是否存储有筛选条件
    var data = this.$store.state.screeningData.lauser;
    if (data) {
      if (data.Yuanfang) {
        this.user = data.user;
        this.curPage = data.curPage;
        var value = this.$store.state.screeningData;
        var groupData = {
          lauser: { Yuanfang: false },
        };
        Object.assign(value, groupData);
        this.$store.dispatch("updateVuex", {
          key: "screeningData",
          value: value,
        });
      }
    }
    this.getTableList(this.curPage);
  },
  beforeDestroy () {
    if (this.usertx) {
      this.ConditionsF();
    }
  },
  methods: {
    // 内容过长，鼠标移入显示全部
    getAgent (v) {
      return v.length > 10 ? v.substring(0, 10) + " ..." : v;
    },
    getShow (v) {
      return v.length > 10 ? false : true;
    },
    //用户详情弹框
    userInformation (id) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(id);
      }, 0);
    },
    //详情
    Detailed (row) {
      // this.$store.dispatch("updateVuex", {
      //   key: "temporaryData",
      //   value: row,
      // });
      sessionStorage.setItem("LA_USER", JSON.stringify(row))
      this.ConditionsF();
      this.$router.push({
        path: "/lauserDetail",
        query: {
          user_id: row.new_user_id,
          from: true,
        },
      });
      console.log(row)
    },
    ConditionsF () {
      var data = this.$store.state.screeningData;
      var groupData = {
        lauser: {
          user: this.user,
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
      this.user = "";
      this.start_time = "";
      this.end_time = "";
      this.channel = "";
      this.curPage = 1
      this.getTableList(this.curPage);
    },
    //筛选
    screening () {
      this.curPage = 1
      this.getTableList(this.curPage);
    },
    /*, 获取表单内容 */
    getTableList (Page) {

      const data = {
        keyword: this.user,
        start_time: this.start_time,
        end_time: this.end_time,
        platform: this.channel,
        page: Page
      }
      this.api.lauser.activityList(data).then((res) => {
        this.tableListData = res.data.data;
        console.log(res.data.data, '-----------------------------------------')
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
