<template>
  <div class="shopSet">
    <div class="biaotou">
      <div style="flex: 1">
        <b style="font-size: 18px; margin-right: 10px">基础信息</b>
        <el-button class="fanhuian" type="primary" @click="returnF"
          >返回</el-button
        >
      </div>
    </div>
    <div class="yonhdiv">
      <div class="huimocss">
        <div class="userdiv">
          <div class="bblayuw">
            <el-image
              class="touximg"
              v-if="user_info.avatar"
              :src="user_info.avatar"
            ></el-image>
            <div class="t-nav01">
              user
              <div class="neiwz userdivdl1">
                <div class="nichenwz">{{ user_info.nickname }}</div>
                <div class="nianl" v-if="user_info.gender == 1">
                  (男 {{ user_info.age }}岁)
                </div>
                <div class="nianl" v-else-if="user_info.gender == 2">
                  (女 {{ user_info.age }}岁)
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
              <el-col :span="12" class="zhuiti"
                ><span>手机：{{ user_info.phone }}</span></el-col
              >

              <el-col :span="12" class="zhuiti"
                ><span>等级：{{ user_info.level }}级</span></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="12" class="zhuiti"
                ><span>实名：</span
                ><span v-if="user_info.certificate == 0">未认证</span
                ><span v-else-if="user_info.certificate == 1"
                  >已认证</span
                ></el-col
              >
              <el-col :span="12" class="zhuiti"
                ><span>邀请码：{{ user_info.invite_code }}</span></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="12" class="zhuiti"
                ><span>app版本：{{ extend.app_version }}</span></el-col
              >
              <el-col :span="12" class="zhuiti"
                ><span
                  >登录方式：<span v-show="user_info.last_login_type == 1"
                    >一键登录</span
                  >
                  <span v-show="user_info.last_login_type == 2"
                    >手机号登陆</span
                  >
                  <span v-show="user_info.last_login_type == 3">微信登陆</span>
                </span></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="12" class="zhuiti">
                <span style="cursor: pointer" @click="tolistFun(5)"
                  >下级人数：{{ user_info.children_num }}</span
                >
              </el-col>
              <el-col :span="12" class="zhuiti"
                ><span>登录次数：{{ user_info.login_count }}</span></el-col
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
                >手机号归属地：{{ user_info.phone_info }}</el-col
              >
            </el-row>
          </div>
        </div>
        <div class="tiemsxian"></div>
        <div class="userdiv">
          <div class="box1">
            <el-row>
              <el-col :span="12" class="">
                <span>情感状态：</span>
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
              </el-col>
              <el-col :span="12" class=""
                ><span>星座：{{ user_info.constellation }}</span></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="12" class=""
                ><span>出生日期：{{ user_info.birthday }}</span></el-col
              >
              <el-col :span="12" class=""
                ><span>职业：{{ user_info.job }}</span></el-col
              >
            </el-row>
            <div class="neiwz userdivdl2">
              <span>标签：</span>
              <span v-show="tagsData == ''">该用户未设置任何标签</span>
              <span v-for="(item, index) in tagsData" :key="index"
                >{{ item.tag_name
                }}<span v-show="index + 1 != tagsData.length">、</span></span
              >
            </div>
            <div class="neiwz">
              <span>个性签名：</span>
              <span v-show="user_info.signature == ''">该用户未填写签名</span>
              {{ user_info.signature }}
            </div>
          </div>
        </div>
        <div class="tiemsxian"></div>
        <div class="userdiv box1">
          <div class="neiwz userdivdl2">
            <span>地址：</span>{{ user_info.country }}-{{
              user_info.province
            }}-{{ user_info.city }}-{{ user_info.area }}
          </div>
          <div class="neiwz">
            <span>经纬度：</span>
            <el-link
              type="primary"
              @click="showTheMap(user_info.longitude, user_info.latitude)"
              >{{ user_info.longitude }},{{ user_info.latitude }}</el-link
            >
          </div>
          <div class="neiwz"><span>登录ip：</span>{{ user_info.last_ip }}</div>
          <div class="neiwz"><span>下载渠道：</span>{{ extend.channel }}</div>
          <div class="neiwz">
            <span>注册时间：</span>{{ user_info.reg_time }}
          </div>
          <div class="neiwz">
            <span>注册设备标识：</span>{{ extend.registration_id }}
          </div>
          <div class="neiwz">
            <span>最后更新时间：</span>{{ user_info.last_time }}
          </div>
          <div class="neiwz">
            <span>换设备登录次数：</span>{{ extend.device_change_num }}
          </div>
          <div class="neiwz">
            <span>状态：</span>
            <el-select
              style="margin-right: 10px"
              v-model="user_info.status"
              @change="userztF"
              placeholder="选择状态"
            >
              <el-option key="0" label="禁用" :value="0"> </el-option>
              <el-option key="1" label="正常" :value="1"> </el-option>
              <el-option key="2" label="禁言" :value="2"> </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div class="xingdiv">
      <div class="dianp">
        <div class="biaotwz">
          <div class="jiezbt1">权限设置</div>
        </div>
        <div class="zhujxin tiembd">
          <el-row style="margin-top: 20px">
            <el-col :span="24" class="zhuiti">
              <div style="display: flex">
                互动通知：
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
              </div>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px">
            <el-col :span="24" class="zhuiti">
              <div style="display: flex">
                发布通知：
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
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
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
            <el-col :span="24" class="zhuiti">
              参与组局数：<span
                style="color: #d7a138; cursor: pointer"
                @click="tolistFun(0)"
                >{{ active_info.joined_group_party }}</span
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              发布组局数：<span
                style="color: #d7a138; cursor: pointer"
                @click="tolistFun(1)"
                >{{ active_info.submit_group_party }}</span
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              参与拼桌数：<span
                style="color: #d7a138; cursor: pointer"
                @click="tolistFun(2)"
                >{{ active_info.joined_crow_funding }}</span
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              发布拼桌数：<span
                style="color: #d7a138; cursor: pointer"
                @click="tolistFun(3)"
                >{{ active_info.submit_crow_funding }}</span
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              发布动态数：<span style="color: #d7a138">{{
                user_info.dynamic_count
              }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              连续签到数：<span style="color: #d7a138">{{
                user_info.extend.signin_days
              }}</span>
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
            <el-col :span="24" class="zhuiti">
              <span>可用积分：</span
              ><span style="color: #d7a138">{{
                user_info.available_point
              }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              <span>Y币：</span
              ><span style="color: #d7a138">{{ user_info.currency }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              <span>D币：</span
              ><span style="color: #d7a138">{{ user_info.income }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              <span>被举报：</span
              ><span style="color: #d7a138">{{ user_info.reported }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              <span>提现总次数：</span
              ><span
                style="color: #d7a138; cursor: pointer"
                @click="tolistFun(4)"
                >{{ extend.cash_count }}</span
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              <span>当日提现次数：</span
              ><span style="color: #d7a138">{{ extend.cash_today }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              <span>上次提现时间：</span
              ><span style="color: #d7a138">{{ extend.cash_time }}</span>
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
            <el-col :span="24" class="zhuiti">
              <span>拥有礼物数：</span
              ><span style="color: #d7a138">{{ gift_info.have_num }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              <span>冻结礼物数：</span
              ><span style="color: #d7a138">{{ gift_info.frozen_num }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              <span>赠送礼物总数：</span
              ><span style="color: #d7a138">{{
                gift_info.gift_given_num
              }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              <span>赠送礼物总价值：</span
              ><span style="color: #d7a138">{{
                gift_info.gift_given_value
              }}</span
              >Y币
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              <span>获得礼物总数：</span
              ><span style="color: #d7a138">{{
                gift_info.gift_recived_num
              }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="zhuiti">
              <span>获得礼物总价值：</span
              ><span style="color: #d7a138">{{
                gift_info.gift_recived_value
              }}</span
              >酒力
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- <div class="tadiv">
      <div class="tielak">
        <div class="tabiaowz">TA的好友</div>
        <el-table
          stripe
          :data="friends"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="uid" label="ID" />
          <el-table-column label="用户">
            <template slot-scope="scope">
              <div class="duio muzhicss">
                <el-image
                  class="ustrimg"
                  :src="scope.row.follw_user.avatar"
                  fit="cover"
                ></el-image>
                <div>
                  <div class="bjgt">{{ scope.row.follw_user.nickname }}</div>
                  <div class="bjgt">
                    <span v-if="scope.row.follw_user.gender == 0">未知</span>
                    <span v-else-if="scope.row.follw_user.gender == 1">男</span>
                    <span v-else-if="scope.row.follw_user.gender == 2">女</span
                    >/年龄:{{ scope.row.follw_user.age }}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="互粉时间" />
        </el-table>
      </div>
      <div class="tielak">
        <div class="tabiaowz">TA的粉丝</div>
        <el-table
          stripe
          :data="follows"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="uid" label="ID" />
          <el-table-column label="用户">
            <template slot-scope="scope">
              <div class="duio muzhicss">
                <el-image
                  class="ustrimg"
                  :src="scope.row.user.avatar"
                ></el-image>
                <div>
                  <div class="bjgt">{{ scope.row.user.nickname }}</div>
                  <div class="bjgt">
                    <span v-if="scope.row.user.gender == 0">未知</span>
                    <span v-else-if="scope.row.user.gender == 1">男</span>
                    <span v-else-if="scope.row.user.gender == 2">女</span
                    >/年龄:{{ scope.row.user.age }}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="关注时间" />
        </el-table>
      </div>
      <div class="tielak">
        <div class="tabiaowz">TA的关注</div>
        <el-table
          stripe
          :data="followings"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="uid" label="ID" />
          <el-table-column label="用户">
            <template slot-scope="scope">
              <div class="duio muzhicss">
                <el-image
                  class="ustrimg"
                  :src="scope.row.follw_user.avatar"
                  fit="cover"
                ></el-image>
                <div>
                  <div class="bjgt">{{ scope.row.follw_user.nickname }}</div>
                  <div class="bjgt">
                    <span v-if="scope.row.follw_user.gender == 0">未知</span>
                    <span v-else-if="scope.row.follw_user.gender == 1">男</span>
                    <span v-else-if="scope.row.follw_user.gender == 2">女</span
                    >/年龄:{{ scope.row.follw_user.age }}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="关注时间" />
        </el-table>
      </div>
    </div> -->

    <!-- 礼物背包 -->
    <el-dialog
      :title="user_info.nickname + '的背包'"
      :visible.sync="gifttx"
      width="50%"
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
    <!-- 用户相册 -->
    <el-dialog
      :title="user_info.nickname + '的相册'"
      :visible.sync="yhxctx"
      width="50%"
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
    <!-- 地图 -->
    <el-dialog
      title="位置信息"
      :visible.sync="dialogVisible"
      custom-class="baidu-map"
      width="80%"
    >
      <amap :location="locationData" />
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
      dialogVisible: false,
      locationData: [],
      yhxctx: false,
      gifttx: false,
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
    };
  },
  created() {
    this.user_id = Number(this.$route.query.user_id);
    this.getUserDetail();
  },
  methods: {
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
    //修改用户状态
    userztF() {
      var data = {
        id: [this.user_id],
        status: this.user_info.status,
      };
      this.api.user.UserHandle(data).then((res) => {
        this.$message({
          message: "已修改状态",
          type: "success",
        });
      });
    },
    //礼物记录
    DetailedDialog() {
      this.$router.push({
        path: "/UserGift",
        query: {
          user_id: this.user_id,
          from: "user",
        },
      });
    },
    //返回
    returnF() {
      this.$router.go(-1);
    },
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
      this.$router.push({
        path: "/GroupEetail",
        query: {
          user_id: this.user_id,
          from: "user",
        },
      });
    },
    //拼桌跳转
    RaiseCrow() {
      this.$router.push({
        path: "/RaiseCrow",
        query: {
          user_id: this.user_id,
          from: "user",
        },
      });
    },
    //账单
    billDetail(key) {
      if (key == 1) {
        this.$router.push({
          path: "/billY",
          query: {
            user_id: this.user_id,
            from: "user",
          },
        });
      } else {
        this.$router.push({
          path: "/billD",
          query: {
            user_id: this.user_id,
            from: "user",
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
        case 5: //下级人数
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
.el-button--primary {
  background-color: black;
  border-color: black;
}
.gaikdiv {
  margin-right: 12px;
}
.tilmwz {
  text-align: center;
  line-height: 30px;
}
.tiemsxian {
  width: 1px;
  height: 280px;
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
.t-nav01 {
  flex: 1;
}
.biaotou {
  width: 100%;
  height: 54px;
  display: flex;
}
.yonhdiv {
  width: 100%;
}
.huimocss {
  width: 100%;
  display: flex;
  background-color: #f4f4f4;
  margin-top: 14px;
  border: 1px solid #e6e6e6;
  padding-bottom: 20px;
}
.touximg {
  width: 70px;
  height: 70px;
  display: block;
  border-radius: 70px;
  border: 1px solid #d9d9d9;
  margin-right: 20px;
}
.userdiv {
  flex: 1;
  height: 100%;
  margin-left: 20px;
}
.box1 {
  line-height: 34px;
  padding-top: 20px;
}
.userdiv .neiwz {
  font-size: 16px;
  line-height: 34px;
  padding-right: 30px;
}
.cfxmyl {
  margin-top: 10px;
  background: #fff;
  border: 1px solid #e6e6e6;
  padding: 10px;
  margin-right: 20px;
  font-size: 14px;
}
.userdivdl1 {
  /* height: 50px; */
  display: flex;
  /* margin-top: 40px; */
}
.xc {
  margin-right: 20px;
}
.userdivdl2 {
  height: auto;
}
.nianl {
  color: #111;
  margin-left: 10px;
}
.xingdiv {
  width: 100%;
  margin-top: 10px;
  display: flex;
}
.dianp {
  flex: 1;
  border: 1px solid rgb(207, 207, 207);
  margin-right: 10px;
}
.dianp:last-child {
  margin-right: 0;
}
.zhujxin {
  width: 100%;
  padding: 10px 15px;
  margin-left: auto;
  margin-right: auto;
}
.biaotwz {
  width: 100%;
  height: 54px;
  font-weight: bold;
  text-indent: 6px;
  font-size: 18px;
  line-height: 54px;
  align-items: center;
  display: flex;
  border-bottom: 1px solid #d0d0d0;
}
.jiezbt1 {
  flex: 1;
}
.jiezbt2 {
  margin-right: 14px;
  cursor: pointer;
  font-weight: 100;
}
.zhuiti {
  font-size: 14px;
  line-height: 24px;
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
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
</style>