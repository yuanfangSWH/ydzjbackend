<template>
  <div>
    <div class="yonhdiv">
      <div class="huimocss">
        <div class="userdiv">
          <div class="bblayuw">
            <el-image
              class="touximg"
              v-if="user_info.avatar"
              :src="user_info.avatar"
              fit="cover"
            ></el-image>
            <div style="flex: 1">
              <div class="neiwz userdivdl1">
                <div class="nichenwz">{{ user_info.nickname }}</div>
                <div class="nianl" v-if="user_info.gender == 1">
                  (男 {{ user_info.age }})
                </div>
                <div class="nianl" v-else-if="user_info.gender == 2">
                  (女 {{ user_info.age }})
                </div>
              </div>
              <div class="neiwz" style="color: #589cf1">
                <span>ID：</span>{{ user_info.user_id }}
              </div>
            </div>
            <div class="xc">
              <el-button class="fanhuian" type="primary" @click="yhxctxF"
                >TA的相册</el-button
              >
            </div>
          </div>
          <div class="cfxmyl">
            <el-row>
              <el-col :span="12" class="zhuiti" style="text-align: left">
                <span class="">手机：{{ user_info.phone }}</span>
              </el-col>
              <el-col :span="12" class="zhuiti">
                <span class="">等级：{{ user_info.level }}级</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="zhuiti" style="text-align: left">
                <span class="">实名：</span>
                <span v-if="user_info.certificate == 0">未认证</span
                ><span v-else-if="user_info.certificate == 1">已认证</span>
              </el-col>
              <el-col :span="12" class="zhuiti"
                ><span class="t-s01"
                  >邀请码：{{ user_info.invite_code }}</span
                ></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="12" class="t-s01"
                ><span>app版本：{{ extend.app_version }}</span></el-col
              >
              <el-col :span="12" class="t-s01">
                <div>
                  登录方式：
                  <span v-show="user_info.last_login_type == 1">一键登录</span>
                  <span v-show="user_info.last_login_type == 2"
                    >手机号登陆</span
                  >
                  <span v-show="user_info.last_login_type == 3">微信登陆</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="zhuiti" style="text-align: left"
                ><span
                  class="t-s01"
                  style="cursor: pointer"
                  @click="tolistFun(5)"
                  >下级人数：{{ user_info.children_num }}</span
                ></el-col
              >
              <el-col :span="12" class="zhuiti"
                ><span class="t-s01"
                  >登录次数：{{ user_info.login_count }}</span
                ></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="12" class="zhuiti"
                ><span>手机品牌：{{ extend.device_brand }}</span></el-col
              >
              <el-col :span="12" class="zhuiti"
                ><span>手机系统：{{ extend.os }}</span></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="24" class="zhuiti"
                ><span>手机号归属地：{{ user_info.phone_info }}</span></el-col
              >
            </el-row>
          </div>
        </div>
        <div class="tiemsxian"></div>
        <div class="userdiv">
          <div style="margin-top: 20px; line-height: 34px">
            <div class="neiwz">
              <span class="t-s01">情感状态：</span>
              <span v-if="user_info.emotional_state == 0">保密</span>
              <span v-else-if="user_info.emotional_state == 1">单身</span>
              <span v-else-if="user_info.emotional_state == 2">恋爱中</span>
              <span v-else-if="user_info.emotional_state == 3">已订婚</span>
              <span v-else-if="user_info.emotional_state == 4">已婚</span>
              <span v-else-if="user_info.emotional_state == 5">丧偶</span>
              <span v-else-if="user_info.emotional_state == 6">分居</span>
              <span v-else-if="user_info.emotional_state == 7">离异</span>
              <span v-else-if="user_info.emotional_state == 8">未婚同居</span>
              <span v-else-if="user_info.emotional_state == 9">同性恋爱</span>
            </div>
            <div class="neiwz">
              <span class="t-s01">出生日期：</span>{{ user_info.birthday }}
            </div>
            <div class="neiwz">
              <span class="t-s01">星座：</span
              ><span v-show="user_info.constellation == ''"
                >该用户未填写星座</span
              >{{ user_info.constellation }}
            </div>
            <div class="neiwz userdivdl2">
              <span class="t-s01">标签：</span
              ><span v-show="tagsData == ''">该用户未设置任何标签</span>
              <span v-for="(item, index) in tagsData" :key="index"
                >{{ item.tag_name
                }}<span v-show="index + 1 != tagsData.length">、</span></span
              >
            </div>
            <div class="neiwz">
              <span class="t-s01">个性签名：</span
              ><span v-show="user_info.signature == ''">该用户未填写签名</span
              >{{ user_info.signature }}
            </div>
          </div>
        </div>
        <div class="tiemsxian"></div>
        <div class="userdiv" style="margin-top: 20px; line-height: 34px">
          <div class="neiwz">
            <span class="t-s01">职业：</span
            ><span v-show="user_info.job == ''">该用户未填写职业</span
            >{{ user_info.job }}
          </div>
          <div class="neiwz userdivdl2">
            <span class="t-s01">地址：</span>{{ user_info.country }}-{{
              user_info.province
            }}-{{ user_info.city }}-{{ user_info.area }}
          </div>
          <div class="neiwz">
            <span class="t-s01">经纬度：</span>
            <el-link
              type="primary"
              @click="showTheMap(user_info.longitude, user_info.latitude)"
              >{{ user_info.longitude }},{{ user_info.latitude }}</el-link
            >
          </div>
          <div class="neiwz">
            <span class="t-s01">登录ip：</span>{{ user_info.last_ip }}
          </div>
          <div class="neiwz">
            <span class="t-s01">下载渠道：</span>{{ extend.channel }}
          </div>
          <div class="neiwz">
            <span class="t-s01">注册时间：</span>{{ user_info.reg_time }}
          </div>
          <div class="neiwz">
            <span class="t-s01">注册设备标识：</span
            >{{ extend.registration_id }}
          </div>
          <div class="neiwz">
            <span class="t-s01">最后更新时间：</span>{{ user_info.last_time }}
          </div>
          <div class="neiwz">
            <span class="t-s01">换设备登录次数：</span
            >{{ extend.device_change_num }}
          </div>
          <div class="neiwz">
            <span class="t-s01">状态：</span
            ><span v-if="user_info.status == 0">禁用</span>
            <span v-else-if="user_info.status == 1">正常</span>
            <span v-else-if="user_info.status == 2">禁言</span>
          </div>
        </div>
      </div>
    </div>
    <div class="xingdiv">
      <!-- <div class="dianp">
        <div class="biaotwz">
          <div class="jiezbt1">权限设置</div>
        </div>
        <div class="zhujxin tiembd">
          <el-row style="margin-top: 20px">
            <el-col
              :span="6"
              class="zhuiti"
              style="text-align: right; font-weight: bold"
            >
              互动通知：
            </el-col>
            <el-col :span="18" class="zhuiti">
              <div class="gaikdiv">
                <el-switch
                  style="margin-right: 10px"
                  v-model="power1"
                  active-color="#13ce66"
                  inactive-color="#cecece"
                  disabled
                >
                </el-switch
                >赞
              </div>
              <div class="gaikdiv">
                <el-switch
                  style="margin-right: 10px"
                  v-model="power2"
                  active-color="#13ce66"
                  inactive-color="#cecece"
                  disabled
                >
                </el-switch
                >评论
              </div>
              <div class="gaikdiv">
                <el-switch
                  style="margin-right: 10px"
                  v-model="power3"
                  active-color="#13ce66"
                  inactive-color="#cecece"
                  disabled
                >
                </el-switch
                >关注
              </div>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px">
            <el-col
              :span="6"
              class="zhuiti"
              style="text-align: right; font-weight: bold"
            >
              发布通知：
            </el-col>
            <el-col :span="18" class="zhuiti">
              <div class="gaikdiv">
                <el-switch
                  style="margin-right: 10px"
                  v-model="power4"
                  active-color="#13ce66"
                  inactive-color="#cecece"
                  disabled
                >
                </el-switch
                >关注人的作品
              </div></el-col
            >
          </el-row>
        </div>
      </div> -->
      <div class="dianp">
        <div class="biaotwz">
          <div class="jiezbt1">活动信息</div>
          <div class="jiezbt2">
            <el-button-group>
              <el-button size="medium" @click="GroupEetail">组局</el-button>
              <el-button size="medium" @click="RaiseCrow">拼桌</el-button>
            </el-button-group>
          </div>
        </div>
        <div class="zhujxin tiembd">
          <el-row>
            <el-col :span="6" class="zhuiti"> 参与组局数： </el-col>
            <el-col
              :span="16"
              class="zhuiti"
              style="color: #d7a138; cursor: pointer"
              @click.native="tolistFun(0)"
            >
              {{ active_info.joined_group_party }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="zhuiti"> 发布组局数： </el-col>
            <el-col
              :span="16"
              class="zhuiti"
              style="color: #d7a138; cursor: pointer"
              @click.native="tolistFun(1)"
            >
              {{ active_info.submit_group_party }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="zhuiti"> 参与拼桌数： </el-col>
            <el-col
              :span="16"
              class="zhuiti"
              style="color: #d7a138; cursor: pointer"
              @click.native="tolistFun(2)"
            >
              {{ active_info.joined_crow_funding }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="zhuiti"> 发布拼桌数： </el-col>
            <el-col
              :span="16"
              class="zhuiti"
              style="color: #d7a138; cursor: pointer"
              @click.native="tolistFun(3)"
            >
              {{ active_info.submit_crow_funding }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="zhuiti"> 发布动态数： </el-col>
            <el-col :span="16" class="zhuiti" style="color: #d7a138">
              {{ user_info.dynamic_count }}
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="dianp">
        <div class="biaotwz">
          <div class="jiezbt1">账号信息</div>
          <div class="jiezbt2">
            <el-button-group>
              <el-button size="medium" @click="billDetail(1)">Y币</el-button>
              <el-button size="medium" @click="billDetail(2)">酒力</el-button>
            </el-button-group>
          </div>
        </div>
        <div class="zhujxin tiembd">
          <el-row>
            <el-col :span="20" class="zhuiti">
              <span class="zhuiti">可用积分：</span
              ><span style="color: #d7a138">{{
                user_info.available_point
              }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="zhuiti">
              <span class="zhuiti">Y币：</span
              ><span style="color: #d7a138">{{ user_info.currency }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="zhuiti">
              <span class="zhuiti">D币：</span
              ><span style="color: #d7a138">{{ user_info.income }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="zhuiti">
              <span class="zhuiti">被举报：</span
              ><span style="color: #d7a138">{{ user_info.reported }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="zhuiti">
              <span>提现总次数：</span
              ><span
                style="color: #d7a138; cursor: pointer"
                @click="tolistFun(4)"
                >{{ extend.cash_count }}</span
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="zhuiti">
              <span>当日提现次数：</span
              ><span style="color: #d7a138">{{ extend.cash_today }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="zhuiti">
              <span>上次提现时间：</span
              ><span style="color: #d7a138">{{ extend.cash_time }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="zhuiti">
              <span>连续签到：</span
              ><span style="color: #d7a138">{{ extend.signin_days }} 天</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="dianp">
        <div class="biaotwz">
          <div class="jiezbt1">礼物信息</div>
          <div class="jiezbt2">
            <el-button-group>
              <el-button size="medium" @click="gifttxF">背包</el-button>
              <el-button size="medium" @click="DetailedDialog">记录</el-button>
            </el-button-group>
          </div>
        </div>
        <div class="zhujxin tiembd">
          <el-row>
            <el-col :span="20" class="zhuiti">
              <span class="zhuiti">拥有礼物数：</span
              ><span style="color: #d7a138">{{ gift_info.have_num }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="zhuiti">
              <span class="zhuiti">冻结礼物数：</span
              ><span style="color: #d7a138">{{ gift_info.frozen_num }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="zhuiti">
              <span class="zhuiti">赠送礼物总数：</span
              ><span style="color: #d7a138">{{
                gift_info.gift_given_num
              }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="zhuiti">
              <span class="zhuiti">赠送礼物总价值：</span
              ><span style="color: #d7a138"
                >{{ gift_info.gift_given_value }} Y币</span
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="zhuiti">
              <span class="zhuiti">获得礼物总数：</span
              ><span style="color: #d7a138">{{
                gift_info.gift_recived_num
              }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="zhuiti">
              <span class="zhuiti">获得礼物总价值：</span
              ><span style="color: #d7a138"
                >{{ gift_info.gift_recived_value }} 酒力</span
              >
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 礼物背包 -->
    <el-dialog
      :title="user_info.nickname + '的背包'"
      :visible.sync="gifttx"
      width="50%"
      append-to-body
    >
      <div class="tadshiqu">
        <div class="lievyt" v-for="(item, index) in temporaryData" :key="index">
          <div class="neibtiaoq">
            <el-image class="chengimg" :src="item.image"></el-image>
          </div>
          <div class="tilmwz">
            {{ item.name
            }}<span style="color: #d7a138">X{{ item.gift_num }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 地图 -->
    <el-dialog
      title="位置信息"
      :visible.sync="dialogVisible"
      custom-class="baidu-map"
      width="80%"
      append-to-body
    >
      <amap :location="locationData" />
    </el-dialog>
    <!-- 用户相册 -->
    <el-dialog
      :title="user_info.nickname + '的相册'"
      :visible.sync="yhxctx"
      width="50%"
      append-to-body
    >
      <!-- 内层弹框 -->
      <el-dialog
        title="相册预览"
        :visible.sync="dialogVisibleImg"
        width="40%"
        append-to-body
      >
        <template v-if="dialogVisibleImg">
          <el-carousel
            :autoplay="false"
            indicator-position="none"
            arrow="always"
            height="600px"
            :initial-index="imgIndex"
          >
            <el-carousel-item v-for="(item, index) in albumData" :key="index">
              <div class="imgbox">
                <el-image
                  style="height: 600px; width: auto"
                  fit="contain"
                  :src="item.path"
                ></el-image>
              </div>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-dialog>
      <div class="tadshiqu">
        <div
          class="lievyt"
          v-for="(item, index) in albumData"
          :key="index"
          @click="showImglist(index)"
        >
          <div class="neibtiaoq">
            <el-image class="chengimg" fit="cover" :src="item.path"></el-image>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import amap from "@/components/Amap/showMap.vue";
export default {
  components: {
    amap,
  },
  data() {
    return {
      dialogVisibleImg: false,
      imgIndex: 0,
      yhxctx: false,
      dialogVisible: false,
      locationData: [],
      //用户ID
      user_id: "",
      //用户数据1
      user_info: [],
      //用户数据2
      extend: [],
      //组局
      active_info: [],
      //礼物
      gift_info: [],
      //好友
      friends: [],
      //粉丝
      follows: [],
      //关注
      followings: [],
      //礼物背包数据
      temporaryData: [],
      //用户相册
      albumData: [],
      //标签数据
      tagsData: [],
      //权限
      power1: false,
      power2: false,
      power3: false,
      power4: false,
      //背包弹框
      gifttx: false,
    };
  },
  props: {
    routerURL: "",
    fromPath: {
      required: false,
      type: String,
      default: function () {
        return "true";
      },
    },
  },
  watch: {
    fromPath(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
  },
  created() {},
  methods: {
    //用户相册
    yhxctxF() {
      if (this.albumData) {
        this.yhxctx = true;
      } else {
        this.$message({
          message: "该用户相册未上传任何图片",
          type: "warning",
        });
      }
    },
    // 预览用户相册
    showImglist(index) {
      this.dialogVisibleImg = true;
      this.imgIndex = index;
    },
    //打开地图
    showTheMap(lng, lat, icon) {
      this.locationData = {
        lng: lng,
        lat: lat,
        address: "",
        position: [lng, lat],
      };
      this.dialogVisible = !this.dialogVisible;
    },
    //礼物背包
    gifttxF() {
      this.gifttx = true;
      var data = {
        //用户ID
        user_id: this.user_id,
        //拉取数量
        page_size: 0,
      };
      this.api.user.GiftList(data).then((res) => {
        this.temporaryData = res.data.data.gift_info;
      });
    },
    //礼物记录
    DetailedDialog() {
      let obj = {
        user_id: this.user_id,
      };
      if (this.fromPath) {
        obj.from = this.fromPath;
      }
      this.$router.push({
        path: "/UserGift",
        query: {
          ...obj,
        },
      });
    },
    //添加ID
    addID(id) {
      this.user_id = id;
      this.getUserDetail();
    },
    //礼物背包
    gifttxF() {
      var data = {
        //用户ID
        user_id: this.user_id,
        //拉取数量
        page_size: 0,
      };
      this.api.user.GiftList(data).then((res) => {
        this.temporaryData = res.data.data.gift_info;
        if (
          !this.temporaryData &&
          typeof this.temporaryData != "undefined" &&
          this.temporaryData != 0
        ) {
          this.$message({
            message: "该用户未收到任何礼物",
            type: "warning",
          });
        } else {
          this.gifttx = true;
        }
      });
    },
    //用户详情
    getUserDetail() {
      var data = {
        user_id: this.user_id,
      };
      this.api.user.UserDetail(data).then((res) => {
        this.user_info = res.data.data.user_info;
        this.extend = res.data.data.user_info.extend;
        this.albumData = res.data.data.user_info.album;
        //3个标签数据合并
        var tagsData = [];
        if (res.data.data.user_info.character_tags) {
          tagsData = tagsData.concat(res.data.data.user_info.character_tags);
        }
        if (res.data.data.user_info.interest_tags) {
          tagsData = tagsData.concat(res.data.data.user_info.interest_tags);
        }
        if (res.data.data.user_info.introduce_tags) {
          tagsData = tagsData.concat(res.data.data.user_info.introduce_tags);
        }
        this.tagsData = tagsData;
        //合并结束
        this.active_info = res.data.data.active_info;
        this.gift_info = res.data.data.gift_info;
        this.friends = res.data.data.friends;
        this.follows = res.data.data.follows;
        this.followings = res.data.data.followings;
        this.power1 =
          res.data.data.user_info.extend.receive_push_praise == 1
            ? true
            : false;
        this.power2 =
          res.data.data.user_info.extend.receive_push_comment == 1
            ? true
            : false;
        this.power3 =
          res.data.data.user_info.extend.receive_push_follow == 1
            ? true
            : false;
        this.power4 =
          res.data.data.user_info.extend.receive_push_new_content == 1
            ? true
            : false;
      });
    },
    //组局跳转
    GroupEetail() {
      if (this.routerURL == "/GroupEetail") {
        let obj = {
          user_id: this.user_id,
          url: "/GroupEetail",
        };
        obj.from = this.fromPath;

        this.$router.push({
          path: "/blank",
          query: {
            ...obj,
          },
        });
      } else {
        let obj = {
          user_id: this.user_id,
        };
        obj.from = this.fromPath;

        this.$router.push({
          path: "/GroupEetail",
          query: {
            ...obj,
          },
        });
      }
    },
    //拼桌跳转
    RaiseCrow() {
      if (this.routerURL == "/RaiseCrow") {
        let obj = {
          user_id: this.user_id,
          url: "/RaiseCrow",
        };
        if (this.fromPath) {
          obj.from = this.fromPath;
        }
        this.$router.push({
          path: "/blank",
          query: {
            ...obj,
          },
        });
      } else {
        let obj = {
          user_id: this.user_id,
          url: "/RaiseCrow",
        };
        if (this.fromPath) {
          obj.from = this.fromPath;
        }
        this.$router.push({
          path: "/RaiseCrow",
          query: {
            ...obj,
          },
        });
      }
    },
    //账单
    billDetail(key) {
      let obj = {
        user_id: this.user_id,
        url: "/RaiseCrow",
      };
      if (this.fromPath) {
        obj.from = this.fromPath;
      }
      if (key == 1) {
        this.$router.push({
          path: "/billY",
          query: {
            ...obj,
          },
        });
      } else {
        this.$router.push({
          path: "/billD",
          query: {
            ...obj,
          },
        });
      }
    },
    tolistFun(n) {
      switch (n) {
        case 0: //参与组局数
          this.$router.push(
            "/GroupEetail?user_join=" + this.user_id + "&from=true"
          );
          break;
        case 1: //发布组局数
          this.$router.push(
            "/GroupEetail?user_id=" + this.user_id + "&from=true"
          );
          break;
        case 2: //参与拼桌数
          this.$router.push(
            "/RaiseCrow?user_join=" + this.user_id + "&from=true"
          );
          break;
        case 3: //发布拼桌数
          this.$router.push(
            "/RaiseCrow?user_id=" + this.user_id + "&from=true"
          );
          break;
        case 4: //提现总次数：
          this.$router.push(
            "/withdrawal?user_id=" + this.user_id + "&from=true"
          );
          break;
        case 5: //下级人数：
          this.$emit("fatherMethod", this.user_id);
          this.$router.push(
            "/UserInformation?user_id=" + this.user_id + "&from=true"
          );
          break;
      }
    },
  },
};
</script>

<style scoped>
.tilmwz {
  text-align: center;
  line-height: 30px;
}
.tiemsxian {
  width: 1px;
  height: 310px;
  background-image: repeating-linear-gradient(
    180deg,
    #c4c4c4,
    #c4c4c4 4px,
    #fff 0,
    #fff 8px
  );
  margin-top: 36px;
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
.tabiaowz {
  width: 100%;
  height: 50px;
  font-weight: bold;
  text-indent: 16px;
  font-size: 24px;
  line-height: 50px;
}
.tadiv {
  width: 100%;
  height: auto;
  display: flex;
  border-top: 1px solid rgb(207, 207, 207);
  padding-top: 10px;
}
.tielak {
  flex: 1;
  margin-right: 10px;
  border: 1px solid rgb(207, 207, 207);
}
.bblayuw {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.biaotou {
  width: 100%;
  height: 54px;
  display: flex;
}
.yonhdiv {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
}
.huimocss {
  width: 100%;
  /* height: 330px; */
  display: flex;
  border: 1px solid #d9d9d9;
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
.touximg {
  width: 70px;
  height: 70px;
  border: 1px solid #d9d9d9;
  display: block;
  border-radius: 70px;
  margin-right: 20px;
}
.userdiv {
  flex: 1;
  height: 100%;
  margin-left: 20px;
}
.userdiv .neiwz {
  font-size: 16px;
}
.cfxmyl {
  background: #fff;
  border: 1px solid #d9d9d9;
  padding: 10px;
  margin: 15px 20px 0 0;
}
.userdivdl1 {
  display: flex;
  margin-bottom: 10px;
}
.userdivdl2 {
  height: auto;
}
.nichenwz {
  padding-top: 6px;
  font-weight: bold;
  line-height: 24px;
  max-width: 72%;
  margin-right: 5px;
}
.nianl {
  height: 24px;
  font-size: 16px;
  line-height: 24px;
  padding-right: 18px;
  margin-top: 4px;
  font-weight: bold;
}
.xingdiv {
  width: 100%;
  /* height: 380px; */
  display: flex;
}
.dianp {
  flex: 1;
  border: 1px solid#dbdbdb;
  margin-right: 30px;
  padding-bottom: 10px;
}
.dianp:last-child {
  margin-right: 0 !important;
}
.zhujxin {
  width: 96%;
  margin-left: auto;
  margin-right: auto;
}
.tiembd {
  margin-top: 20px;
  padding: 0 10px;
}
.biaotwz {
  width: 100%;
  font-weight: bold;
  text-indent: 6px;
  font-size: 20px;
  padding: 10px 0;
  display: flex;
  border-bottom: 1px solid #dbdbdb;
}
.jiezbt1 {
  flex: 1;
  margin-left: 10px;
  color: #0a0a00;
  line-height: 38px;
}
.jiezbt2 {
  margin-right: 14px;
  cursor: pointer;
  font-weight: 100;
  color: #0a0a00;
}
.jiezbt2 >>> .el-button {
  font-size: 16px;
  color: #0a0a00;
}
.t-s01 {
  color: #0a0a00;
  font-size: 16px;
}
.zhuiti {
  font-size: 16px;
  line-height: 28px;
  color: #0a0a0a;
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
.shopSet {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 15px 15px;
  padding: 15px 15px;
}
.xc {
  margin-right: 20px;
}
.el-button--primary {
  background-color: black;
  border-color: black;
}

.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
</style>