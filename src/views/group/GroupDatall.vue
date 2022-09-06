<template>
  <div>
    <div class="biaotou">
      <div style="flex: 1">
        <el-button class="fanhuian" type="warning" @click="returnYM"
          >返回</el-button
        >
      </div>
      <div style="width: 200px">
        <el-button class="fanhuian" type="primary" @click="validation"
          >保存</el-button
        >
        <el-button
          class="fanhuian"
          v-if="areaValue"
          type="danger"
          @click="deleteItem"
          >关闭组局</el-button
        >
        <el-button class="fanhuian" v-else type="danger">恢复组局</el-button>
      </div>
    </div>
    <div class="yonhdiv">
      <el-image class="touximg" :src="userData.avatar"></el-image>
      <div class="userdiv">
        <div class="neiwz userdivdl1">
          <div class="nichenwz">
            <span style="font-weight: bold">昵称：</span>{{ userData.nickname }}
          </div>
          <div
            class="nianl"
            v-if="userData.gender == 1"
            style="background-color: #4e9df8"
          >
            男 {{ userData.age }}
          </div>
          <div
            class="nianl"
            v-else-if="userData.gender == 0"
            style="background-color: #ea67a7"
          >
            女 {{ userData.age }}
          </div>
        </div>
        <div class="neiwz">
          <span style="font-weight: bold">ID：</span>{{ userData.user_id }}
        </div>
      </div>
      <div class="userdiv">
        <div class="neiwz userdivdl2">
          <span style="font-weight: bold">状态：</span>
           <span v-if="ListData.status == 1">已报名</span>
            <span v-else-if="ListData.status == 2">审核通过</span>
            <span v-else-if="ListData.status == 3">审核不过</span>
            <span v-else-if="ListData.status == 4">被屏蔽</span>
            <span v-else-if="ListData.status == 5">自己退出</span>
            <span v-else-if="ListData.status == 6">被T除</span>
        </div>
        <div class="neiwz">
          <span style="font-weight: bold">报名时间：</span
          >{{ ListData.create_time }}
        </div>
      </div>
      <div class="userdiv">
        <div class="neiwz userdivdl2">
          <span style="font-weight: bold">已到场：</span
          ><span v-if="ListData.arrive_status == 0">未到达</span>
            <span v-else-if="ListData.arrive_status == 1">申请到达</span>
            <span v-else-if="ListData.arrive_status == 2">确认到达</span>
        </div>
        <div class="neiwz">
          <span style="font-weight: bold">取消时间：</span
          >{{ ListData.out_time }}
        </div>
      </div>
    </div>
    <div class="xingdiv">
      <div class="zhujxin">
        <div class="biaotwz">组局详情</div>
        <el-row>
          <el-col
            :span="4"
            class="zhuiti"
            style="text-align: right; font-weight: bold"
            >主题：</el-col
          >
          <el-col :span="20" class="zhuiti"
            >{{basisData.title}}</el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="4" class="zhuiti" style="text-align: right; font-weight: bold">
            发布者：
            </el-col>
            <el-col :span="6" class="zhuiti">
            {{basisData.nickname}}</el-col
          >
          <el-col
            :span="5"
            class="zhuiti"
            style="text-align: right; font-weight: bold"
            >组局人数：</el-col
          >
          <el-col :span="5" class="zhuiti">
            {{basisData.total_people}}
            人</el-col
          >
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col
            :span="5"
            class="zhuiti"
            style="text-align: right; font-weight: bold"
          >
            包厢/座位：
          </el-col>
          <el-col :span="7" class="zhuiti">
            {{basisData.place_name}}
          </el-col>
          <el-col :span="12" class="zhuiti">
            <span style="font-weight: bold">性别：</span><span v-if="basisData.gender_limit == 0">不限</span>
            <span v-else-if="basisData.gender_limit == 1">男</span>
            <span v-else-if="basisData.gender_limit == 2">女</span>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col
            :span="6"
            class="zhuiti"
            style="text-align: right; font-weight: bold"
          >
            活动开始时间：
          </el-col>
          <el-col :span="18" class="zhuiti"
            >{{basisData.dateline}}</el-col>
        </el-row>
      </div>
      <div class="dianp" style="flex: 1">
        <div class="biaotwz">店铺信息</div>
        <el-row>
          <el-col
            :span="10"
            class="zhuiti"
            style="text-align: right; font-weight: bold"
            >店铺名称：</el-col
          >
          <el-col :span="14" class="zhuiti">{{ basisData.name }}</el-col>
        </el-row>
        <el-row style="margin-top: 30px">
          <el-col :span="24" class="zhuiti" style="text-align: center"
            ><span style="font-weight: bold">地址：</span
            >{{ basisData.address }}</el-col
          >
        </el-row>
        <el-row style="margin-top: 30px">
          <el-col
            :span="10"
            class="zhuiti"
            style="text-align: right; font-weight: bold"
            >营业时间：</el-col
          >
          <el-col :span="14" class="zhuiti"
            >{{ basisData.business_start_time }} 至
            {{ basisData.business_stop_time }}</el-col
          >
        </el-row>
      </div>
      <div class="dianp" style="flex: 1">
        <div class="biaotwz">礼物信息</div>
        <el-row>
          <el-col :span="24" class="zhuiti" style="text-align:center;"
            ><span style="font-weight: bold">可获得：</span
            >{{ ListData.average_gift_num }}</el-col
          >
        </el-row>
      </div>
    </div>
    <!-- <div class="ztaidiv">
      <el-row>
        <el-col :span="2" class="zhuiti" style="margin-left: 20px"
          ><span style="font-weight: bold">状态：</span>
          <span v-if="ListData.status == 0">禁用</span>
          <span v-else-if="ListData.status == 1">报名中</span>
          <span v-else-if="ListData.status == 2">发起者取消</span>
          <span v-else-if="ListData.status == 3">截止报名</span>
          <span v-else-if="ListData.status == 4">超时</span>
          <span v-else-if="ListData.status == 5">已完成</span>
        </el-col>
        <el-col :span="2" class="zhuiti"
          ><span style="font-weight: bold">总人数：</span
          >{{ ListData.enroll_num }}人</el-col
        >
        <el-col :span="2" class="zhuiti"
          ><span style="font-weight: bold">已到场：</span
          >{{ ListData.arrive_num }}人</el-col
        >
        <el-col :span="2" class="zhuiti"
          ><span style="font-weight: bold">已取消：</span>暂无字段</el-col
        >
        <el-col :span="12" class="zhuiti zhuscss"
          ><span style="color: #a5a7ab"
            >（*注释：报名列表仅展示审核通过、取消、已到场的用户）</span
          ></el-col
        >
        <el-col :span="3" class="zhuiti" style="margin-left: 60px"
          ><el-button class="gengduocss" @click="moreDetail"
            >更多>></el-button
          ></el-col
        >
      </el-row>
    </div> -->
    <!--<div class="huangun">
       <div class="lienr" v-for="(item, key) in signData" :key="key">
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
            <el-col class="chddi" :span="14">{{ item.user.nickname }}</el-col>
            <el-col class="chddi" :span="10"
              >状态：<span v-if="item.status == 1">已报名</span>
              <span v-else-if="item.status == 2">审核通过</span>
              <span v-else-if="item.status == 3">审核不过</span>
              <span v-else-if="item.status == 4">被屏蔽</span>
              <span v-else-if="item.status == 5">自己退出</span>
              <span v-else-if="item.status == 6">被T除</span></el-col
            >
          </el-row>
          <el-row>
            <el-col class="chddi nanywz" :span="13"
              >ID：{{ item.user.user_id }}</el-col
            >
            <el-col class="chddi nanywz" :span="11">{{
              item.create_time
            }}</el-col>
          </el-row>
        </div>
      </div> 
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //关闭OR恢复
      areaValue: true,
      //是否有操作
      operationData: false,
      //座位数据
      placeListData: [],
    };
  },
  props: {
    ListData: {},
    basisData: {},
    userData:{}
  },
  methods: {
    //验证（废弃）
    validation() {
      if (this.updateData.title == "") {
        this.$message({
          message: "请填写主题标题",
          type: "warning",
        });
      } else if (this.updateData.total_people == "") {
        this.$message({
          message: "请输入人数",
          type: "warning",
        });
      } else if (this.updateData.place_name == "") {
        this.$message({
          message: "请填写包厢/座位",
          type: "warning",
        });
      } else if (this.updateData.dateline == "") {
        this.$message({
          message: "请选择活动开始时间",
          type: "warning",
        });
      } else {
        this.saveData();
      }
    },
    //保存（废弃）
    saveData() {
      var data = {
        gp_id: this.ListData.gp_id,
        title: this.updateData.title,
        total_people: this.updateData.total_people,
        gender_limit: this.updateData.gender_limit,
        place_name: this.updateData.place_name,
        dateline: this.updateData.dateline,
      };
      this.api.group.groupUpdate(data).then((res) => {
        this.operationData = true;
        this.$message({
          message: "保存成功",
          type: "success",
        });
      });
    },
    //获取到父值（废弃）
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
      //关闭OR恢复
      if (value == 0) {
        this.areaValue = true;
      } else {
        this.areaValue = false;
      }
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
    //返回
    returnYM() {
      this.$emit("returnY", this.operationData);
    },
    //关闭
    deleteItem() {
      this.$confirm("是否将该组局关闭", this.ListData.title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var gp_id = new Array();
        gp_id.push(this.ListData.gp_id);
        var data = {
          id: gp_id,
        };
        this.api.group.groupDelete(data).then((res) => {
          this.operationData = true;
          this.areaValue = false;
          this.$message({
            message: "已关闭组局",
            type: "success",
          });
          this.areaValue = false;
        });
      });
    },
    //恢复（废弃）
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
          this.areaValue = true;
          this.$message({
            message: "已恢复组局",
            type: "success",
          });
          this.areaValue = true;
        });
      });
    },
  },
};
</script>

<style scoped>
.biaotou {
  width: 100%;
  height: 54px;
  display: flex;
}
.yonhdiv {
  width: 100%;
  height: 140px;
  border-top: 1px solid rgb(207, 207, 207);
  border-bottom: 1px solid rgb(207, 207, 207);
  display: flex;
}
.touximg {
  width: 110px;
  height: 110px;
  display: block;
  border-radius: 70px;
  margin-top: 14px;
}
.userdiv {
  flex: 1;
  height: 100%;
  margin-left: 30px;
}
.userdiv .neiwz {
  font-size: 18px;
  margin-top: 18px;
}
.userdivdl1 {
  height: 50px;
  padding-top: 4px;
  display: flex;
}
.userdivdl2 {
  height: 50px;
  padding-top: 10px;
  display: flex;
}
.nichenwz {
  padding-top: 6px;
}
.nianl {
  width: 80px;
  height: 24px;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  padding-left: 18px;
  padding-right: 18px;
  border-radius: 70px;
  margin-top: 4px;
  margin-left: 10px;
}
.xingdiv {
  width: 100%;
  height: 380px;
  display: flex;
}
.zhujxin {
  width: 600px;
  height: 100%;
}
.biaotwz {
  width: 100%;
  height: 100px;
  text-align: center;
  font-size: 24px;
  line-height: 100px;
}
.zhuiti {
  font-size: 18px;
  line-height: 40px;
}
.dianp {
  border-left: 1px solid rgb(207, 207, 207);
  margin-left: 10px;
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
  background-color: rgb(245, 245, 245);
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
