<template>
  <div>
    <div class="biaotou">
      <div style="flex: 1">
        <span class="zj-title">组局详情</span>
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
        <el-button class="fanhuian" type="danger" @click="deleteItem"
          >关闭活动</el-button
        >
      </div>
      <!-- <div style="width: 200px" v-if="changeAN">
        <el-button class="fanhuian" type="primary" @click="validation">保存</el-button>
      </div> -->
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
            是否到场：<span v-if="ListData.is_arrive == 0">否</span
            ><span v-else-if="ListData.is_arrive == 1">是</span>
          </div>
          <div class="neiwz">到场时间：{{ ListData.arrive_time }}</div>
        </div>
        <div class="wtmdxian"></div>
        <div class="userdiv">
          <div class="neiwz userdivdl2">
            发起时间：{{ ListData.create_time }}
          </div>
          <div class="neiwz">截止时间：{{ ListData.end_time }}</div>
        </div>
      </div>
    </div>
    <div class="xingdiv">
      <div class="dianp">
        <div class="biaotwz" style="display: flex; align-items: center">
          <div style="flex: 1; font-size: 18px; font-weight: bold">
            <SvgIcon iconClass="zjxqtb"></SvgIcon>
            组局详情
          </div>
          <el-button
            class="fanhuian save-btn"
            type="primary"
            @click="validation"
            >保存</el-button
          >
        </div>
        <div class="zhujxin tiembd">
          <el-row>
            <el-col :span="3" class="zhuiti" style="text-align: left"
              >主题：</el-col
            >
            <el-col :span="18" class="zhuiti"
              ><el-input
                type="textarea"
                :rows="3"
                style="width: 100%"
                placeholder="请输入主题标题"
                v-model="updateData.title"
                v-if="changeAN"
              ></el-input>
              <span v-else>{{ updateData.title }}</span></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="7" class="zhuiti" style="text-align: left">
              组局人数：<span>{{ updateData.total_people }} 人</span>
            </el-col>
            <el-col :span="8" class="zhuiti"
              >性别限制：
              <span v-if="updateData.gender_limit == 0">不限</span>
              <span v-else-if="updateData.gender_limit == 1">男</span>
              <span v-else-if="updateData.gender_limit == 2">女</span>
              <!-- <el-radio-group v-model="updateData.gender_limit">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="0">不限</el-radio>
            </el-radio-group> -->
            </el-col>
            <el-col :span="9" class="zhuiti" style="text-align: left"
              >包厢/桌号：<span>
                {{ updateData.place_name }}
                <!-- <el-input
                style="width: 300px"
                placeholder="请输入包厢/座位"
                v-model="updateData.place_name"
              ></el-input> -->
                <!-- <el-select
                style="margin-right: 10px"
                v-model="updateData.place_name"
                placeholder="座位"
              >
                <el-option
                  v-for="(item, key) in placeListData"
                  :key="key"
                  :label="item.place_name"
                  :value="item.place_name"
                >
                </el-option>
              </el-select> -->
              </span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7" class="zhuiti" style="text-align: left">
              状态：
              <span v-if="updateData.status == 0">禁用</span>
              <span v-if="updateData.status == 1">报名中</span>
              <span v-if="updateData.status == 2">截止报名</span>
              <span v-if="updateData.status == 3">活动中</span>
              <span v-if="updateData.status == 4">已完成</span>
              <span v-if="updateData.status == 5">发起者取消</span>
              <span v-if="updateData.status == 6">超时完成</span>
              <span v-if="updateData.status == 7">超时取消</span>
              <span v-if="updateData.status == 8">违规</span>
            </el-col>
            <el-col :span="17" class="zhuiti" style="text-align: left">
              活动时间：{{ updateData.dateline }}
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="line01"></div>
      <div class="dianp">
        <div
          class="biaotwz"
          style="flex: 1; font-size: 18px; font-weight: bold"
        >
          <SvgIcon iconClass="dpxqtb" style="margin-right: 6px"></SvgIcon>店铺
        </div>
        <div class="zhujxin">
          <div class="zhuiti">店铺名称：{{ shopData.name }}</div>
          <div class="zhuiti">店铺地址：{{ shopData.address }}</div>
          <div class="zhuiti">
            营业时间：{{ shopData.business_start_time }} 至
            {{ shopData.business_stop_time }}
          </div>
        </div>
      </div>
      <div class="line01"></div>
      <div class="dianp">
        <div
          class="biaotwz"
          style="flex: 1; font-size: 18px; font-weight: bold"
        >
          <SvgIcon iconClass="liwxqtb" style="margin-right: 6px"></SvgIcon>礼物
        </div>
        <div class="zhujxin">
          <el-row>
            <el-col :span="10" class="zhuiti" style="text-align: left"
              >礼物总数：<el-image
                class="liwtbcss"
                v-if="giftData.image"
                :src="giftData.image"
              ></el-image
              ><span style="color: #dfa250"
                >x{{ ListData.gift_num }}</span
              ></el-col
            >
            <el-col :span="12" class="zhuiti"
              >礼物总价值：<SvgIcon
                iconClass="ymoney"
                style="margin-right: 2px"
              ></SvgIcon
              ><span style="color: #6093c8">{{
                ListData.total_gift_value
              }}</span
              >Y币</el-col
            >
          </el-row>
          <el-row>
            <el-col :span="10" class="zhuiti" style="text-align: left"
              >人均获得：<el-image
                class="liwtbcss"
                v-if="giftData.image"
                :src="giftData.image"
              ></el-image
              ><span style="color: #dfa250"
                >x{{ ListData.average_gift_num }}</span
              ></el-col
            >
            <el-col :span="12" class="zhuiti"
              >人均礼物价值：<SvgIcon
                iconClass="ymoney"
                style="margin-right: 2px"
              ></SvgIcon
              ><span style="color: #6093c8">{{
                ListData.average_gift_value
              }}</span
              >Y币</el-col
            >
          </el-row>
          <el-row>
            <el-col :span="10" class="zhuiti" style="text-align: left"
              >已赠送礼物：<el-image
                class="liwtbcss"
                v-if="giftData.image"
                :src="giftData.image"
              ></el-image
              ><span style="color: #dfa250"
                >x{{ ListData.given_num }}</span
              ></el-col
            >
            <el-col :span="12" class="zhuiti"
              >退回礼物数：<el-image
                class="liwtbcss"
                v-if="giftData.image"
                :src="giftData.image"
              ></el-image
              ><span style="color: #dfa250"
                >x{{ ListData.back_num }}</span
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
            >截止报名</span
          >
          <span style="color: #589cf1" v-else-if="ListData.status == 3"
            >活动中</span
          >
          <span style="color: #589cf1" v-else-if="ListData.status == 4"
            >已完成</span
          >
          <span style="color: #589cf1" v-else-if="ListData.status == 5"
            >发起者取消</span
          >
          <span style="color: #589cf1" v-else-if="ListData.status == 6"
            >超时完成</span
          >
          <span style="color: #589cf1" v-else-if="ListData.status == 7"
            >超时取消</span
          >
          <span style="color: #589cf1" v-else-if="ListData.status == 8"
            >违规</span
          >
        </el-col>
        <el-col :span="2" class="zhuiti"
          >总人数：<span style="color: #dfa250">{{ ListData.enroll_num }}</span
          >人</el-col
        >
        <el-col :span="2" class="zhuiti"
          >已到场：<span style="color: #dfa250">{{ ListData.arrive_num }}</span
          >人</el-col
        >
        <el-col :span="2" class="zhuiti"
          >已取消：<span style="color: #dfa250">{{ ListData.out_num }}</span
          >人</el-col
        >
        <el-col :span="12" class="zhuiti zhuscss"
          ><span style="color: #dfa250"
            >（*注释：报名列表仅展示审核通过、取消、已到场的用户）</span
          ></el-col
        >
        <el-col :span="2" class="zhuiti" style="margin-left: 60px"
          ><el-button class="gengduocss save-btn" @click="moreDetail"
            >更多</el-button
          ></el-col
        >
      </el-row>
    </div>
    <div class="huangun">
      <el-table
        stripe
        :data="signData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="gp_enroll_id" label="ID" />
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
                <div class="bjgt">{{ scope.row.user.nickname }}</div>
                <div class="bjgt">ID:{{ scope.row.user.user_id }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">已报名</span>
            <span v-else-if="scope.row.status == 2">审核通过</span>
            <span v-else-if="scope.row.status == 3">审核不过</span>
            <span v-else-if="scope.row.status == 4">自己退出</span>
            <span v-else-if="scope.row.status == 5">申请到达</span>
            <span v-else-if="scope.row.status == 6">已到达</span>
          </template>
        </el-table-column>
        <el-table-column prop="arrive_time" label="到场时间" />
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
              <span v-else-if="item.status == 5">申请到达</span>
              <span v-else-if="item.status == 6">已到达</span></el-col
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
        //组局标题
        title: "",
        //人数
        total_people: 0,
        //性别
        gender_limit: 0,
        //座位
        place_name: "",
        //活动开始时间
        dateline: "",
        status: "",
      },
      //报名列表
      signData: [],
      //是否有操作
      operationData: false,
      //座位数据
      placeListData: [],
      usertx: false,
    };
  },
  props: {
    ListData: {},
    shopData: {},
    giftData: {},
    userData: {},
    changeAN: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    //返回
    returnF() {
      this.$router.go(-1);
    },
    //更多
    moreDetail() {
      this.$router.push({
        path: "/GroupEnroll",
        query: {
          gp_id: this.ListData.gp_id,
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
    //保存
    saveData() {
      var data = {
        gp_id: this.ListData.gp_id,
        title: this.updateData.title,
        // total_people: this.updateData.total_people,
        // gender_limit: this.updateData.gender_limit,
        // place_name: this.updateData.place_name,
        // dateline: this.updateData.dateline,
      };
      this.api.group.groupUpdate(data).then((res) => {
        this.operationData = true;
        this.$message({
          message: "保存成功",
          type: "success",
        });
      });
    },
    //获取到父值
    concert(data, value) {
      this.operationData = false;
      //报名列表
      var i = { gp_id: data.gp_id, page: 1 };
      this.api.group.groupEnroll(i).then((res) => {
        this.signData = res.data.data;
      });
      //组局详情
      this.updateData.title = data.title;
      this.updateData.total_people = data.total_people;
      this.updateData.gender_limit = data.gender_limit;
      this.updateData.place_name = data.place_name;
      this.updateData.dateline = data.dateline;
      this.updateData.status = data.status;
      //this.searchDatas(data.merchant_id,data.shop_id);
    },
    //座位列表(废弃)
    searchDatas(merchant_id, shop_id) {
      var data = {
        merchant_id: merchant_id,
        shop_id: shop_id,
      };
      this.api.shop.placeList(data).then((res) => {
        this.placeListData = res.data.data;
      });
    },
    //用户详情弹框
    userInformation() {
      this.usertx = true;
      var _this = this;
      setTimeout(() => {
        this.$refs.userBounced.addID(_this.userData.user_id);
      }, 0);
    },
    //返回
    returnYM() {
      this.$emit("returnY", this.operationData);
    },
    /* 关闭(违规处理接口) */
    deleteItem() {
      this.$confirm("是否将该组局关闭", this.ListData.title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var data = {
          gp_id: this.ListData.gp_id,
        };
        this.api.group.groupExamine(data).then((res) => {
          this.operationData = true;
          this.$message({
            message: "已关闭组局",
            type: "success",
          });
        });
      });
    },
    //恢复(废弃)
    restoreItem() {
      this.$confirm("是否将该组局恢复至原来状态", this.ListData.title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var gp_id = new Array();
        gp_id.push(this.ListData.gp_id);
        var data = {
          id: gp_id,
        };
        this.api.group.groupRecovery(data).then((res) => {
          this.operationData = true;
          this.$message({
            message: "已恢复组局",
            type: "success",
          });
        });
      });
    },
  },
};
</script>

<style scoped>
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
.fanhuian {
  background: #0a0a0a;
  border: none;
}
.zj-title {
  font-weight: bold;
  font-size: 20px;
  margin-right: 10px;
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
