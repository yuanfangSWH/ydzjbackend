<template>
  <div>
    <div class="biaotou">
      <div style="flex: 1">
        <span class="zj-title">拼桌详情</span>
        <el-button
          class="fanhuian"
          type="warning"
          @click="returnYM"
          v-if="changeAN"
          >返回</el-button
        >
        <el-button class="fanhuian" type="warning" @click="returnF" v-else
          >返回</el-button
        >
        <el-button
          v-show="ListData.delete_time == '' && ListData.status == 1"
          class="fanhuian"
          type="danger"
          @click="deleteItem"
          >关闭拼桌</el-button
        >
        <!-- <el-button
          v-if="changeAN"
          v-show="ListData.delete_time != '' && ListData.status == 1"
          class="fanhuian"
          type="success"
          @click="restoreItem"
          >打开拼桌</el-button
        > -->
      </div>
    </div>
    <div class="yonhdiv">
      <div class="huimocss">
        <el-image
          class="touximg"
          v-if="userData.avatar"
          :src="userData.avatar"
        ></el-image>
        <div class="userdiv">
          <div class="neiwz userdivdl1">
            <div
              class="nianl"
              v-if="userData.gender == 1"
              style="color: #81a0ec"
            >
              <i class="boy-icon"></i> {{ userData.age }}
            </div>
            <div class="nianl" v-else style="color: #ee81a8">
              <i class="girl-icon"></i> 女 {{ userData.age }}
            </div>
            <div class="nichenwz">{{ userData.nickname }}</div>
          </div>
          <div class="neiwz" style="color: #959595">
            ID：{{ userData.user_id }}
          </div>
        </div>
        <div class="wtmdxian"></div>
        <div class="userdiv">
          <div class="neiwz userdivdl2">
            发起时间：{{ ListData.create_time }}
          </div>
          <div class="neiwz" style="margin-top: 10px">
            活动开始时间：
            {{ ListData.dateline }}
          </div>
        </div>
        <div class="wtmdxian"></div>
        <div class="userdiv">
          <div class="neiwz userdivdl2">截止时间：{{ ListData.end_time }}</div>
          <div class="neiwz">取消时间：{{ ListData.modify_time }}</div>
        </div>
      </div>
    </div>
    <div class="xingdiv">
      <div class="dianp">
        <div class="biaotwz" style="display: flex; align-items: center">
          <div style="flex: 1; font-size: 18px; font-weight: bold">
            <SvgIcon iconClass="zjxqtb"></SvgIcon>
            拼桌详情
          </div>
          <el-button
            class="fanhuian save-btn"
            type="primary"
            @click="validation"
            >保存</el-button
          >
        </div>
        <div class="zhujxin tiembd">
          <div class="zhuiti" style="display: flex">
            <span>主题：</span
            ><el-input
              type="textarea"
              :rows="3"
              style="flex: 1; margin-right: 20px"
              placeholder="请输入主题标题"
              v-model="updateData.title"
            ></el-input>
          </div>
          <el-row>
            <el-col :span="10" class="zhuiti" style=""
              >拼桌方式：
              <span class="p-num" v-if="updateData.cf_type == 1">全部AA</span>
              <span class="p-num" v-else-if="updateData.cf_type == 2"
                >自由众筹</span
              >
              <span class="p-num" v-else-if="updateData.cf_type == 3"
                >男A女免</span
              >
              <span class="p-num" v-else-if="updateData.cf_type == 4"
                >女A男免</span
              >
              <!-- <el-radio-group v-model="updateData.cf_type" >
              <el-radio :label="1">全部AA</el-radio>
              <el-radio :label="2">自由众筹</el-radio>
              <el-radio :label="3">男A女免</el-radio>
              <el-radio :label="4">女A男免</el-radio>
            </el-radio-group>--></el-col
            >
            <el-col :span="14" class="zhuiti" style="display: flex">
              <span>人数：</span>
              <div style="flex: 1; display: flex">
                <div class="p-num">
                  <span>男</span>
                  <!-- <el-input
                  style="width: 120px"
                  placeholder="男人数"
                  type="Number"
                  v-model="updateData.male_limit"
                ></el-input> -->
                  {{ updateData.male_limit }}
                </div>
                <div class="p-num">
                  <span style="margin-left: 10px">女</span>
                  <!-- <el-input
                  style="width: 120px"
                  placeholder="女人数"
                  type="Number"
                  v-model="updateData.female_limit"
                ></el-input> -->
                  {{ updateData.female_limit }}
                </div>
                <div class="p-num">
                  <span style="margin-left: 10px">总</span>
                  <!-- <el-input
                    style="width: 120px"
                    placeholder="总人数"
                    type="Number"
                    v-model="updateData.total_people"
                  ></el-input> -->
                  {{ updateData.total_people }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" class="zhuiti">
              起拼金额：<span style="color: rgb(223, 162, 80)">{{
                updateData.min_amount
              }}</span>
              元
            </el-col>
            <el-col :span="8" class="zhuiti">
              发布者出资：<span style="color: rgb(223, 162, 80)">{{
                this.CalculateData(updateData.user_pay, "/")
              }}</span>
              元
            </el-col>
            <el-col :span="8" class="zhuiti">
              预拼金额：<span style="color: rgb(223, 162, 80)">{{
                this.CalculateData(ListData.total_amount, "/")
              }}</span>
              元
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="line01"></div>
      <div class="dianp" style="flex: 1">
        <div
          class="biaotwz"
          style="flex: 1; font-size: 18px; font-weight: bold"
        >
          <SvgIcon iconClass="dpxqtb" style="margin-right: 6px"></SvgIcon>店铺
        </div>
        <div class="zhujxin">
          <el-row>
            <el-col :span="24" class="zhuiti"
              >店铺名称：<span class="p-num">{{ shopData.name }}</span></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti"
              >店铺地址：<span class="p-num">{{
                shopData.address
              }}</span></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti"
              >营业时间：<span class="p-num"
                >{{ shopData.business_start_time }} 至
                {{ shopData.business_stop_time }}</span
              ></el-col
            >
          </el-row>
        </div>
      </div>
    </div>
    <div class="ztaidiv">
      <el-row>
        <el-col :span="2" class="zhuiti" style="margin-left: 20px"
          >状态：
          <span style="color: #589cf1" v-if="ListData.status == 0">禁用</span>
          <span style="color: #589cf1" v-else-if="ListData.status == 1"
            >报名中</span
          >
          <span style="color: #589cf1" v-else-if="ListData.status == 2"
            >取消拼桌</span
          >
          <span style="color: #589cf1" v-else-if="ListData.status == 3"
            >截止报名</span
          >
          <span style="color: #589cf1" v-else-if="ListData.status == 4"
            >活动中</span
          >
          <span style="color: #589cf1" v-else-if="ListData.status == 5"
            >超时关闭</span
          >
          <span style="color: #589cf1" v-else-if="ListData.status == 6"
            >已结束</span
          >
          <span style="color: #589cf1" v-else-if="ListData.status == 7"
            >违规</span
          >
        </el-col>
        <el-col :span="2" class="zhuiti"
          >已拼金额：
          <span style="color: #dfa250">
            ￥{{ this.CalculateData(ListData.now_amount, "/") }}
          </span>
        </el-col>
        <el-col :span="2" class="zhuiti"
          >总人数：<span style="color: #dfa250">{{
            ListData.total_people
          }}</span
          >人</el-col
        >
        <el-col :span="2" class="zhuiti"
          >已通过：<span style="color: #dfa250">{{ ListData.success_num }}</span
          >人</el-col
        >
        <el-col :span="2" class="zhuiti"
          >已取消：<span style="color: #dfa250">{{ ListData.out_num }}</span
          >人</el-col
        >
        <el-col :span="2" class="zhuiti"
          >已T除：<span style="color: #dfa250">{{ ListData.kick_num }}</span
          >人</el-col
        >
        <el-col :span="8" class="zhuiti zhuscss">
          <span style="color: #dfa250"
            >（*注释：报名列表仅展示审核通过、取消的用户）</span
          >
        </el-col>
        <el-col :span="2" class="zhuiti" style="margin-left: 60px">
          <el-button class="gengduocss save-btn" @click="moreDetail"
            >更多</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="huangun">
      <el-table
        stripe
        :data="signData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="cf_enroll_id" label="ID" />
        <el-table-column label="报名者">
          <template slot-scope="scope">
            <div class="duio muzhicss" @click="userInformation()">
              <el-image
                class="ustrimg"
                v-if="scope.row.user.avatar"
                :src="scope.row.user.avatar"
                fit="cover"
              ></el-image>
              <div>
                <div class="bjgt">
                  {{ scope.row.user.nickname }}（<span
                    v-if="scope.row.user.gender == 1"
                    >男</span
                  ><span v-else>女</span>/{{ scope.row.user.age }}岁）
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="拼桌金额" width="250">
          <template slot-scope="scope">
            <span style="color: #f4be5a"
              >￥{{ scope.row.amount }}
            </span></template
          >
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">已报名</span>
            <span v-else-if="scope.row.status == 2" style="color: #619e4d"
              >审核通过({{ scope.row.audit_time }})</span
            >
            <span v-else-if="scope.row.status == 3">审核不过</span>
            <span v-else-if="scope.row.status == 4"
              >已取消({{ scope.row.out_time }})</span
            >
            <span v-else-if="scope.row.status == 5">被T除</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="报名时间" />
      </el-table>
      <!-- <div class="lienr" v-for="(item, key) in signData" :key="key">
        <div>
          <el-image class="touximg2" :src="item.user.avatar"></el-image>
          <div
            class="nianl2"
            v-if="item.user_gender == 1"
            style="background-color: #4e9df8"
          >
            男 {{ item.user.age }}
          </div>
          <div
            class="nianl2"
            v-else-if="item.user_gender == 0"
            style="background-color: #ea67a7"
          >
            女 {{ item.user.age }}
          </div>
        </div>
        <div style="flex: 1">
          <el-row style="margin-top: 16px">
            <el-col class="chddi" :span="13">{{ item.user.nickname }}</el-col>
            <el-col class="chddi" :span="11"
              >状态：<span v-if="item.status == 1">已报名</span>
              <span v-else-if="item.status == 2">审核通过</span>
              <span v-else-if="item.status == 3">审核不过</span>
              <span v-else-if="item.status == 4">自己退出</span>
              <span v-else-if="item.status == 5">被T除</span></el-col
            >
          </el-row>
          <el-row>
            <el-col class="chddi nanywz" :span="12"
              >ID：{{ item.user.user_id }}</el-col
            >
            <el-col class="chddi nanywz" :span="12"
              >报名：{{ item.create_time }}</el-col
            >
          </el-row>
        </div>
      </div> -->
    </div>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息" :visible.sync="usertx" width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //修改的数据
      updateData: {
        //活动开始时间
        dateline: "",
        //拼桌标题
        title: "",
        //限制男人数
        male_limit: 0,
        //限制女人数
        female_limit: 0,
        //总人数
        total_people: 0,
        //拼桌方式
        cf_type: 0,
        //性别限制
        gender_limit: 0,
        //起拼金额
        min_amount: 0,
        //发布者出资
        user_pay: 0,
      },
      //报名列表
      signData: [],
      //是否有操作
      operationData: false,
      //座位数据
      placeListData: [],
      //总人数初始值
      enrollData: 0,
      //男女限制初始值
      male_limitData: 0,
      female_numData: 0,
      usertx: false,
    };
  },
  props: {
    ListData: {},
    shopData: {},
    userData: {},
    changeAN: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    //用户详情弹框
    userInformation() {
      this.usertx = true;
      var _this = this;
      setTimeout(() => {
        this.$refs.userBounced.addID(_this.userData.user_id);
      }, 0);
    },
    //返回
    returnF() {
      this.$router.go(-1);
    },
    //更多
    moreDetail() {
      this.$router.push({
        path: "/RaiseErroll",
        query: {
          cf_id: this.ListData.cf_id,
        },
      });
    },
    //验证
    validation() {
      if (this.updateData.title == "") {
        this.$message({
          message: "请填写主题标题",
          type: "warning",
        });
      } else {
        this.saveData();
      }
    },
    //拼桌方式变化(废弃)
    pingzhuo(value) {
      if (value == 3 || value == 4) {
        this.updateData.gender_limit = 1;
      } else {
        this.updateData.gender_limit = 0;
      }
    },
    //保存
    saveData() {
      // var total_people,
      //   male_limit,
      //   female_limit = "";
      // if (this.updateData.gender_limit == 0) {
      //   //总人数=输入框总人数
      //   total_people = this.updateData.total_people;
      //   //男女=初始值
      //   male_limit = this.male_limitData;
      //   female_limit = this.female_limitData;
      // } else if (this.updateData.gender_limit == 1) {
      //   //总人数=初始总人数
      //   total_people = this.enrollData;
      //   //男女=输入框值
      //   male_limit = this.updateData.male_limit;
      //   female_limit = this.updateData.female_limit;
      // }
      var data = {
        //ID
        cf_id: this.ListData.cf_id,
        // //活动开始时间
        // dateline: this.updateData.dateline,
        //拼桌标题
        title: this.updateData.title,
        // //限制男人数
        // male_limit: Number(male_limit),
        // //限制女人数
        // female_limit: Number(female_limit),
        // //总人数
        // total_people: Number(total_people),
        // //拼桌方式
        // cf_type: Number(this.updateData.cf_type),
        // //性别限制
        // gender_limit: Number(this.updateData.gender_limit),
        // //起拼金额
        // min_amount: Number(this.updateData.min_amount),
        // //发布者出资
        // user_pay: Number(this.updateData.user_pay),
      };
      this.api.raise.raiseUpdate(data).then((res) => {
        this.operationData = true;
        this.$message({
          message: "保存成功",
          type: "success",
        });
      });
    },
    //获取到父值
    concert(data) {
      this.operationData = false;
      //报名列表
      var i = { cf_id: data.cf_id, page: 1 };
      this.api.raise.raiseEnroll(i).then((res) => {
        this.signData = res.data.data;
        //计算金额
        for (var i = 0; i < this.signData.length; i++) {
          this.signData[i].amount = this.CalculateData(
            this.signData[i].amount,
            "/"
          );
        }
      });
      //拼桌详情
      this.updateData.dateline = data.dateline;
      this.updateData.title = data.title;
      this.updateData.male_limit = data.male_limit;
      this.updateData.female_limit = data.female_limit;
      this.updateData.total_people = data.total_people;
      this.updateData.cf_type = data.cf_type;
      this.updateData.min_amount = data.min_amount;
      this.updateData.user_pay = data.user_pay;
      this.updateData.gender_limit = data.gender_limit;
      //总人数初始值
      this.enrollData = data.total_people;
      //男女限制人数初始值
      this.male_limitData = data.male_limit;
      this.female_limitData = data.female_limit;
    },
    //返回
    returnYM() {
      this.$emit("returnY", this.operationData);
    },
    //关闭
    deleteItem() {
      this.$confirm("是否将该拼桌关闭", this.ListData.title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var data = {
          cf_id: this.ListData.cf_id,
        };
        this.api.raise.raiseDelete(data).then((res) => {
          this.operationData = true;
          this.$message({
            message: "已关闭拼桌",
            type: "success",
          });
        });
      });
    },
    //打开
    restoreItem() {
      this.$confirm("是否将该拼桌恢复至原来状态", this.ListData.title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var data = {
          cf_id: this.ListData.cf_id,
        };
        this.api.raise.raiseRecovery(data).then((res) => {
          this.operationData = true;
          this.$message({
            message: "已恢复拼桌",
            type: "success",
          });
        });
      });
    },
  },
};
</script>

<style scoped>
.muzhicss {
  display: flex;
  align-items: center;
}
.ustrimg {
  width: 34px;
  height: 34px;
  border-radius: 100%;
}
.boy-icon {
  width: 16px;
  height: 16px;
  background: url(../../assets/boy.png);
  background-size: 100% auto;
  display: inline-block;
}
.girl-icon {
  width: 16px;
  height: 16px;
  background: url(../../assets/girl.png);
  background-size: 100% auto;
  display: inline-block;
}
.p-num {
  color: #666;
}
.fanhuian {
  background: #0a0a0a;
  border: none;
}
.zj-title {
  font-weight: bold;
  font-size: 20px;
  margin-right: 10px;
}
.liwtbcss {
  width: 26px;
  height: 26px;
}
.wtmdxian {
  width: 1px;
  height: 80px;
  background-image: repeating-linear-gradient(
    180deg,
    #c8c8c8,
    #c8c8c8 4px,
    #fff 0,
    #fff 8px
  );
}
.biaotou {
  width: 100%;
  height: 54px;
  display: flex;
}
.yonhdiv {
  width: 100%;
  border-bottom: 1px solid rgb(207, 207, 207);
}
.huimocss {
  display: flex;
  border: 1px solid rgb(207, 207, 207);
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  padding: 20px;
  margin: 14px 0;
}
.save-btn {
  color: #fff;
  margin-right: 10px;
  background: #0a0a0a !important;
  border: none;
  height: 34px;
  line-height: 12px;
}
.touximg {
  width: 60px;
  height: 60px;
  display: block;
  border-radius: 60px;
  margin-left: 20px;
}
.userdiv {
  flex: 1;
  height: 100%;
  margin-left: 20px;
}
.userdiv .neiwz {
  font-size: 16px;
}
.userdivdl1 {
  line-height: 34px;
  display: flex;
  align-items: center;
}
.userdivdl2 {
  line-height: 34px;
  display: flex;
}
.nianl {
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-right: 10px;
}
.xingdiv {
  width: 100%;
  padding: 0 0 20px;
  display: flex;
}
.dianp {
  flex: 1;
}
.line01 {
  width: 1px;
  margin: 40px 20px 0;
  background-image: repeating-linear-gradient(
    180deg,
    #c8c8c8,
    #c8c8c8 4px,
    #fff 0,
    #fff 8px
  );
}
.zhujxin {
  width: 100%;
  height: 84%;
  padding-top: 20px;
  padding-left: 20px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f5f5f5;
  border: 1px solid #c8c8c8;
}
.biaotwz {
  width: 100%;
  height: 44px;
  text-indent: 6px;
  font-size: 24px;
  line-height: 44px;
}
.zhuiti {
  font-size: 14px;
  line-height: 40px;
}
.ztaidiv {
  width: 100%;
  height: 80px;
  border-top: 1px solid rgb(207, 207, 207);
  border-bottom: 1px solid rgb(207, 207, 207);
  padding-top: 20px;
}
.zhuscss {
  font-size: 14px;
}
.gengduocss {
  float: right;
}
.huangun {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.lienr {
  width: 500px;
  height: 110px;
  margin: 20px 10px 0px 10px;
  background-color: #e8f6ff;
  border-radius: 20px;
  display: flex;
}
.touximg2 {
  width: 60px;
  height: 60px;
  display: block;
  border-radius: 70px;
  margin-top: 10px;
  margin-left: 18px;
  margin-right: 24px;
}
.nianl2 {
  width: 64px;
  height: 24px;
  font-size: 12px;
  line-height: 24px;
  color: #fff;
  background-color: #4e9df8;
  padding-left: 18px;
  padding-right: 10px;
  border-radius: 70px;
  margin-top: 6px;
  margin-left: 16px;
}
.chddi {
  font-size: 18px;
  height: 40px;
  line-height: 40px;
}
.nanywz {
  font-size: 16px;
}
</style>
