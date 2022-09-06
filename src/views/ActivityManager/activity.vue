<template>
  <div class="appBox">
    <div class="page-title">{{this._getVuex('pageTitle')}}</div>
    <div class="shanxdiv">
      <div style="flex:1; max-width:800px">
        <div class="sxBox">
          <div class="sxNav">
            <div class="rucwz2">活动</div>
            <el-input style="width: 350px; margin-right: 10px"
                      placeholder="请输入活动名称"
                      v-model="soVal"
                      clearable></el-input>
          </div>
          <div class="sxNav">
            <div class="rucwz2">状态</div>
            <el-select v-model="status"
                       placeholder="请选择">
              <el-option v-for="item in statusArr"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="timeNav">
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
        </div>
      </div>
      <div>
        <el-button class="filter-btn"
                   type="primary"
                   @click="screening">筛选</el-button>
        <el-button class="filter-btn"
                   type="info"
                   @click="resetData">清空条件</el-button>
      </div>
    </div>
    <div class="add-box">
      <div class="btn-nav"
           v-if="!isRecycle">
        <el-button type="danger"
                   @click="moreDeleteFun(0)">删除</el-button>
        <el-button type="danger"
                   @click="addFun()">新增</el-button>
        <el-button type="primary"
                   @click="toRecycle">回收站</el-button>
      </div>
      <div class="btn-nav"
           v-else>
        <el-button type="danger"
                   @click="moreDeleteFun(1)">上架</el-button>
        <!-- <el-button type="danger" @click="moreDeleteFun(2)">彻底删除</el-button> -->
        <el-button type="primary"
                   @click="goBack">返回</el-button>
      </div>
      <!-- <div class="so-nav">
        <el-input class="so-ipt"
                  placeholder="请输入活动名称"
                  clearable
                  v-model="soVal"
                  @change="seachFun">
        </el-input>
        <el-button class="sosuo"
                   type="primary">搜索</el-button>
      </div> -->
    </div>
    <div>
      <!-- <el-tabs v-if="is_delete == 0"
               v-model="activeName"
               type="card"
               @tab-click="handleClick">
        <el-tab-pane label="进行中"
                     name="first"></el-tab-pane>
        <el-tab-pane label="已结束"
                     name="second"></el-tab-pane>
        <el-tab-pane label="未开始"
                     name="third"></el-tab-pane>
      </el-tabs> -->
      <activity-table :dataOptions="dataOptions"
                      :status="status"
                      :is_delete="is_delete"
                      @childrenFun="parentFun"></activity-table>
    </div>
    <div class="pagebox">
      <el-pagination v-if="count"
                     :hide-on-single-page="value"
                     background
                     layout="prev, pager, next"
                     :total="count"
                     :current-page='page'
                     @current-change="pageChange">
      </el-pagination>
    </div>
    <!-- 删除单条 -->
    <el-dialog title="删除"
               :visible.sync="dialogVisible"
               width="30%">
      <span>确定要删除“{{a_name}}”这个活动吗？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteFun">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除多个 -->
    <el-dialog title="删除"
               :visible.sync="dialogMore"
               width="30%">
      <span>确定要删除以下数据吗？</span>
      <div style="margin-top:30px">
        <span v-for="(item,index) in nameArr"
              :key="index">{{item}}，</span>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogMore = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteFun">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog :title="aTitle"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :visible.sync="addDialogVisible"
               destroy-on-close
               width="40%">
      <div>
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 v-if="addDialogVisible"
                 label-width="140px"
                 class="demo-ruleForm">
          <el-form-item label="活动名称"
                        prop="name">
            <el-input placeholder="请输入活动名称"
                      class="ipt01"
                      v-model="ruleForm.name"></el-input>
          </el-form-item>
          <!-- <el-form-item label="活动别名" prop="alias">
                  <el-input class="ipt01" v-model="ruleForm.alias"></el-input>
                </el-form-item> -->
          <el-form-item label="活动时间"
                        required>
            <div style="display:flex">
              <el-form-item prop="start_time">
                <el-date-picker type="datetime"
                                placeholder="选择开始时间"
                                value-format="yyyy-MM-dd HH:mm"
                                format="yyyy-MM-dd HH:mm"
                                v-model="ruleForm.start_time"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
              <span style="margin:0 10px">-</span>
              <el-form-item prop="end_time">
                <el-date-picker type="datetime"
                                placeholder="选择结束时间"
                                value-format="yyyy-MM-dd HH:mm"
                                format="yyyy-MM-dd HH:mm"
                                v-model="ruleForm.end_time"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="活动链接"
                        prop="url">
            <el-input placeholder="请输入活动链接"
                      class="ipt01"
                      v-model="ruleForm.url"></el-input>
          </el-form-item>
          <el-form-item label="指定地区可见">
            <!-- <searchCity ref="searchCity"
                        :isAll="true"
                        :returnValue="true"
                        @setCityAreaName="setCityAreaName"
                        :showArea="true" /> -->
            <searchCity ref="searchCity"
                        :returnValue="true"
                        @setCityAreaName="setCityAreaName" />
          </el-form-item>
          <el-form-item label="活动内容"
                        prop="content">
            <el-input placeholder="请输入活动内容"
                      class="ipt01"
                      type="textarea"
                      v-model="ruleForm.content"
                      :autosize="{ minRows: 4, maxRows: 14 }"></el-input>
          </el-form-item>
          <el-form-item label="封面图">
            <uploadFiles class="uploadTemp"
                         ref="uploadImg1"
                         @theIMG="uploadImages"
                         :imageUrl="ruleForm.banner"
                         root="activity/image"
                         :uploadImage="this.aTitle == '编辑活动'&&localPath2?localPath2:''"
                         :defaltIcon="2" />
          </el-form-item>
          <!-- <el-form-item label="长图介绍链接" prop="long_img">
                    <el-input class="ipt01" v-model="ruleForm.long_img"></el-input>
                </el-form-item>
                <el-form-item label="视频介绍链接" prop="video_url">
                    <el-input class="ipt01" v-model="ruleForm.video_url"></el-input>
                </el-form-item> -->
          <el-form-item label="弹框显示">
            <div style="display:flex;height: 100%;align-items:center;">
              <el-select v-model="ruleForm.layer_pos"
                         placeholder="请选择">
                <el-option v-for="item in posArr"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
              <p style="color:#bababa;line-height:  20px;margin-left: 10px;"> <i class="el-icon-warning-outline"></i> 可选择弹窗显示位置</p>
            </div>
          </el-form-item>
          <el-form-item label="弹窗类型"
                        v-show="ruleForm.layer_pos">
            <el-radio-group v-model="layer_type"
                            @change="radioChange">
              <el-radio :label="1">每日一次</el-radio>
              <el-radio :label="2">永久一次</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="弹窗图片"
                        v-show="ruleForm.layer_pos"
                        required>
            <!-- <el-image
              style="width: 100px; height: 100px"
              :src="form.logo"
              :preview-src-list="logos"
            >
            </el-image> -->
            <uploadFiles class="uploadTemp"
                         ref="uploadImg2"
                         @theIMG="uploadImages"
                         :imageUrl="ruleForm.layer_img"
                         root="activity/image"
                         :uploadImage=" this.aTitle == '编辑活动'&&localPath1?localPath1:''"
                         :defaltIcon="1" />
            <p v-if="check_layer_img"
               style="color:#F56C6C;height: 14px;margin: 0;font-size:12px">请上传弹框图片</p>
            <!-- <uploadFiles
              @childrenFun="logoUrl"
              :limit="limitOne"
              root="shop"
              class="uploadTemp"
            /> -->

            <!-- <uploadFiles
              class="uploadTemp"
              @childrenFun="logoUrl"
              :limit="limitOne"
              :TfileList="fileListOne"
              root="shop"
            /> -->
          </el-form-item>
          <el-form-item label="活动状态"
                        prop="active_status">
            <el-radio-group v-model="ruleForm.active_status">
              <el-radio :label="1">上架</el-radio>
              <el-radio :label="0">下架</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog title="活动详情"
               :visible.sync="detailVisible"
               width="50%">
      <div class="a-box">
        <span class="a-s1">活动名称</span>
        <div class="a-s2">{{activityData.name}}</div>
      </div>
      <div class="a-box">
        <span class="a-s1">活动时间</span>
        <div class="a-s2">{{activityData.start_time}} - {{activityData.end_time}}</div>
      </div>
      <div class="a-box">
        <span class="a-s1">活动链接</span>
        <div class="a-s2">{{activityData.url}}</div>
      </div>
      <div class="a-box">
        <span class="a-s1">活动内容</span>
        <div class="a-s3"
             v-if="activityData.content">{{activityData.content}}</div>
      </div>
      <div class="a-box">
        <span class="a-s1">首页弹窗图片</span>
        <div class="a-s2"
             v-if="activityData.layer_img"
             @click="showImglist(activityData.layer_img)">
          <el-image class="img1"
                    fit="cover"
                    :src="activityData.layer_img"></el-image>
        </div>
      </div>
      <div class="a-box">
        <span class="a-s1">限定地区</span>
        <div class="a-s2"
             v-if="activityData.province">
          <p>{{activityData.province?activityData.city?activityData.area?activityData.province +'-'+ activityData.city+'-'+ activityData.area:activityData.province +'-'+ activityData.city:activityData.province :'全部'}}</p>
        </div>
      </div>
      <div class="a-box">
        <span class="a-s1">长图介绍</span>
        <div class="a-s2"
             v-if="activityData.long_img"
             @click="showImglist(activityData.long_img)">
          <el-image class="img1"
                    fit="cover"
                    :src="activityData.long_img"></el-image>
        </div>
      </div>
      <div class="a-box">
        <span class="a-s1">视频介绍</span>
        <div class="a-s4 v01"
             v-if="activityData.video_url"
             @click="playFun(activityData.video_url, activityData.activity_id)">
          <video :src="activityData.video_url"
                 height="120"></video>
          <i class="icon01 el-icon-video-play"></i>
        </div>
      </div>
      <el-dialog title=""
                 :visible.sync="dialogVisibleImg"
                 width="50%"
                 append-to-body>
        <template v-if="dialogVisibleImg">
          <el-carousel :autoplay="false"
                       indicator-position='none'
                       arrow="never"
                       height="600px">
            <el-carousel-item v-for="(item, index) in picData"
                              :key="index">
              <div class="imgbox">
                <el-image style="height:600px; width:auto"
                          fit="contain"
                          :src="item"></el-image>
              </div>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-dialog>
      <el-dialog v-if="videoData"
                 title=""
                 :visible.sync="dialogVisibleVideo"
                 :before-close="handleClose"
                 width="50%"
                 append-to-body>
        <div id="v-box"
             style="width: 80%; margin: 0 auto; display: flex; align-items: center">
          <video :id="'videos' + videoIndex"
                 class="videoHeight"
                 poster=""
                 controls="controls"
                 loop="loop"
                 width="100%"
                 :src="videoData"></video>
        </div>
      </el-dialog>
    </el-dialog>

  </div>
</template>

<script>
import activityTable from './components/activityTable'
import searchCity from "@/components/citySelectEX/shopSearchCity.vue";
import uploadFiles from "@/components/uploadFiles";
export default {
  name: "buttonList",
  components: {
    activityTable,
    searchCity,
    uploadFiles
  },
  data () {
    const checkLong_img = (rule, value, callback) => {
      // console.log(rule);
      if (value === '' && this.ruleForm.layer_pos) {
        callback(new Error('请上传弹框图片'));
      } else {
        callback()
      }
    };
    return {
      check_layer_img: false,
      aTitle: '新增活动',
      addDialogVisible: false,
      soVal: '',
      end_time: '',
      start_time: '',
      dataOptions: [],
      page: 1,
      count: 0,
      pageIndex: 1,
      value: true,
      pageSign: 0,
      filterVal: '',
      sortVal: 'create_time',
      order: 'desc',
      id: '',
      multipleSelection: [],
      nameArr: [],
      deleteStatus: 0,
      dialogVisible: false,
      dialogMore: false,
      isRecycle: false,
      status: null,
      statusArr: [{
        value: null,
        label: '全部'
      }, {
        value: 1,
        label: '未开始'
      }, {
        value: 2,
        label: '进行中'
      }, {
        value: 3,
        label: '已结束'
      }],
      activeName: 'first',
      ruleForm: {
        name: '',
        alias: '',//别名
        content: '',
        start_time: '',
        end_time: '',
        url: '',
        long_img: '',
        video_url: '',
        active_status: 1,
        area_id: '',
        city_id: '',
        province_id: '',
        layer_img: '',
        banner: '',
        layer_type: 1,
        layer_pos: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        alias: [
          { required: true, message: '请输入活动别名', trigger: 'blur' }
        ],
        start_time: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        end_time: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ],
        // content: [
        //   { required: true, message: '请输入活动内容', trigger: 'change' }
        // ],
        // url: [
        //   { required: true, message: '请填写活动链接', trigger: 'blur' }
        // ],//小彭说活动链接非必填
      },
      layer_type: 1,
      is_delete: 0,
      a_name: '',
      detailVisible: false,
      activityData: {},
      picData: [],
      dialogVisibleImg: false,
      videoData: '',
      dialogVisibleVideo: false,
      videoIndex: 0,
      detailData: '',
      activity_id: '', // 活动Id
      localPath1: '',
      localPath2: '',
      posArr: [{
        value: '',
        label: '不显示弹窗'
      }, {
        value: 'index',
        label: '首页'
      }, {
        value: 'news',
        label: '发现'
      }, {
        value: 'message',
        label: '消息'
      }, {
        value: 'my',
        label: '我的'
      }],
    }
  },
  created () {
    this.dataFun()
  },
  watch: {
    pageSign (newVal, oldVal) {
      this.page = 1
    },
    page (index) {
      this.page = index
    },
    addDialogVisible (n, o) {
      if (n && this.aTitle == '新增活动') {
        this.ruleForm = {
          name: '',
          alias: '',//别名
          content: '',
          start_time: '',
          end_time: '',
          url: '',
          long_img: '',
          video_url: '',
          active_status: 1,
          area_id: '',
          city_id: '',
          province_id: '',
          layer_img: '',
          banner: '',
          layer_type: 1,
          layer_pos: ''
        },
          setTimeout(() => {
            this.$refs.searchCity.getProvince(
              this.ruleForm.province_id,
              this.ruleForm.city_id,
              // this.ruleForm.area_id
            )
          })
      } else {
        this.ruleForm.province_id = null
        this.ruleForm.city_id = null
        // this.ruleForm.area_id = null
      }

    },
    // layer_img (n, o) {
    //   if (n) {
    //     this.check_layer_img = false
    //   }
    // }
    ruleForm: {
      deep: true,
      handler (n, o) {
        if (n.layer_img) {
          this.check_layer_img = false
        }
      }
    }
  },
  methods: {
    uploadImages (v, i, localPath) {
      if (i == 1) { this.ruleForm.layer_img = v; this.localPath1 = localPath }
      if (i == 2) { this.ruleForm.banner = v; this.localPath2 = localPath }
    },
    setCityAreaName (areaName) {
      let { province_id, city_id, area_id } = areaName
      this.ruleForm.province_id = province_id;
      this.ruleForm.city_id = city_id;
      this.ruleForm.area_id = area_id;
    },
    //获得视频列表
    GetVideosUrl () {

    },
    //TAB
    handleClick () {
      this.page = 1
      this.soVal = ''
      if (this.activeName == "first") {
        this.status = 2;
        this.dataFun();
      } else if (this.activeName == "second") {
        this.status = 3;
        this.dataFun();
      } else {
        this.status = 1;
        this.dataFun();
      }
    },
    // 
    dataFun () {
      this.pageSign = 0
      if (this.is_delete && this.sortVal == "create_time") {
        this.sortVal = "modify_time"
      }
      let data = {
        keyword: this.soVal,
        start_time: this.start_time,
        end_time: this.end_time,
        page: this.page,
        status: this.status,
        sort: this.sortVal,
        order: this.order,
        is_delete: this.is_delete
      }
      this.api.activity.activityList(data).then((res) => {
        // console.log(res.data.data);
        this.dataOptions = res.data.data
        this.count = res.data.count
      });
    },
    //筛选
    screening () {
      this.page = 1;
      this.dataFun();
    },
    //重置
    resetData () {
      this.soVal = "";
      this.status = null
      this.start_time = "";
      this.end_time = "";
      this.page = 1;
      this.dataFun();
    },
    parentFun (key, value, n) {
      if (n == 1) {
        if (key == 'status' && value) {
          this.filterVal = value
          this.filterGetStatusList()
        } else {
          this.dataFun()
        }
      } else if (n == 2) {
        this.sortVal = key
        this.order = value
        this.sortDataFun()
      } else if (n == 3) {//查看
        this.id = key
        this.detailVisible = true
        this.activityDetail(this.id)
        // this.$router.push({path:'/editbutton?id='+this.id})
      } else if (n == 4) {//下架
        this.deleteStatus = n
        this.id = key
        this.a_name = value
        this.dialogVisible = true
      } else if (n == 5) {
        this.deleteStatus = n
        this.multipleSelection = key
        this.nameArr = value
      } else if (n == 6) {//上架
        this.deleteStatus = n
        this.huanyuanFun(key)
      } else if (n == 7) {//编辑
        // this.deleteStatus = n
        // this.realDeleteFun(key)
        this.aTitle = "编辑活动"
        this.id = key
        this.activityDetail(key)
        this.addDialogVisible = true
      }

    },
    // 彻底删除
    realDeleteFun (id) {
      let data = {}
      if (this.deleteStatus == 7) {
        data = {
          id: [id]
        }
      } else {
        data = {
          id: id
        }
      }
      this.api.activity.realDeleteButton(data).then((res) => {
        this.$message({
          message: '' + res.data.msg,
          type: 'success'
        });
        this.$router.push('/buttonList')
        this.isRecycle = true
        this.status = 0
        this.dataFun()
      });
    },
    // 还原
    huanyuanFun (id) {
      let data = {}
      if (this.deleteStatus == 6) {
        data = {
          id: [id]
        }
      } else {
        data = {
          id: id
        }
      }
      this.api.activity.recoveryActivity(data).then((res) => {
        this.$message({
          message: '' + res.data.msg,
          type: 'success'
        });
        this.isRecycle = false
        this.status = 2
        this.is_delete = 0
        this.dataFun()
        this.multipleSelection = []
      });
    },
    //根据状态筛选
    filterGetStatusList () {
      this.pageSign = 1
      let data = {
        'page': this.page, status: this.status, keyword: this.soVal,
        start_time: this.start_time,
        end_time: this.end_time
      }
      this.api.activity.activityList(data).then((res) => {
        this.dataOptions = res.data.data
        this.count = res.data.count
      });
    },
    // 排序
    sortDataFun () {
      this.pageSign = 2
      let data = { page: this.page, sort: this.sortVal, order: this.order, status: this.status, keyword: this.soVal, start_time: this.start_time, end_time: this.end_time, is_delete: this.is_delete }
      this.api.activity.activityList(data).then((res) => {
        this.dataOptions = res.data.data
        this.count = res.data.count
      });
    },
    seachFun () {
      this.pageSign = 3
      let data = { page: this.page, keyword: this.soVal, status: this.status, keyword: this.soVal, start_time: this.start_time, end_time: this.end_time }
      this.api.activity.activityList(data).then((res) => {
        this.dataOptions = res.data.data
        this.count = res.data.count
      });
    },
    pageChange (val) {
      this.page = val
      this.pageIndex = val
      if (this.pageSign == 0) {
        this.dataFun()
      } else if (this.pageSign == 1) {
        this.filterGetStatusList()
      } else if (this.pageSign == 2) {
        this.sortDataFun()
      } else if (this.pageSign == 3) {
        this.seachFun()
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.province_id === "") {
            this.$delete(this.ruleForm, 'province_id')
          }
          if (this.ruleForm.city_id === "") {
            this.$delete(this.ruleForm, 'city_id')
          }
          if (this.ruleForm.area_id === "") {
            this.$delete(this.ruleForm, 'area_id')
          }
          if (!this.ruleForm.layer_img && this.ruleForm.layer_pos) {
            this.check_layer_img = true
            return false
          }
          if (this.ruleForm.layer_pos == '') {
            delete this.ruleForm.layer_img
            delete this.ruleForm.layer_type
          }
          // console.log(JSON.parse(JSON.stringify(this.ruleForm)));
          let data = JSON.parse(JSON.stringify(this.ruleForm))
          if (this.aTitle == "新增活动") {
            this.api.activity.insertActivity(data).then((res) => {
              this.$message({
                message: '' + res.data.msg,
                type: 'success'
              });
              this.resetForm(formName)
              this.dataFun()
            });
          } else {
            data.activity_id = this.id
            this.api.activity.updateActivity(data).then((res) => {
              this.$message({
                message: '' + res.data.msg,
                type: 'success'
              });
              this.resetForm(formName)
              this.dataFun()
              this.ruleForm = {
                name: '',
                alias: '',//别名
                content: '',
                start_time: '',
                end_time: '',
                url: '',
                long_img: '',
                video_url: '',
                active_status: 1,
                area_id: '',
                city_id: '',
                province_id: '',
                layer_img: '',
                banner: '',
                layer_type: 1,
                layer_pos: ''
              }
            });
          }

        } else {
          if (!this.ruleForm.layer_img && this.ruleForm.layer_pos) {
            this.check_layer_img = true
          }
          return false;
        }
      });
    },
    resetForm (formName) {
      this.addDialogVisible = false
      this.$refs[formName].resetFields();
    },
    moreDeleteFun (n) {
      if (n == 0) {//批量删除
        if (this.multipleSelection == '') {
          this.$message({
            message: '请先勾选要下架的数据',
            type: 'warning'
          });
        } else {
          this.dialogMore = true
        }
      } else {//批量还原/彻底删除
        if (this.multipleSelection == '') {
          this.$message({
            message: '请先勾选要上架的数据',
            type: 'warning'
          });
        } else {
          this.huanyuanFun(this.multipleSelection)//还原
        }
      }
    },
    deleteFun () {
      let data = {}
      if (this.deleteStatus == 4) {
        data = {
          id: [this.id]
        }
      } else {
        data = {
          id: this.multipleSelection
        }
      }
      this.api.activity.delActivity(data).then((res) => {
        this.dialogVisible = false
        this.dialogMore = false
        this.$message({
          message: '' + res.data.msg,
          type: 'success'
        });
        this.multipleSelection = []
        this.nameArr = []
        this.dataFun()
      });
    },
    // 查看 获取活动信息
    activityDetail (id) {
      let data = {
        activity_id: id
      }
      this.api.activity.avtivityDetail(data).then((res) => {
        this.activityData = res.data.data
        if (this.aTitle == '新增活动') {
          // this.ruleForm = {
          //   name: '',
          //   alias: '',//别名
          //   content: '',
          //   start_time: '',
          //   end_time: '',
          //   url: '',
          //   long_img: '',
          //   video_url: '',
          //   status: 1
          // }
          this.ruleForm = {
            name: '',
            alias: '',//别名
            content: '',
            start_time: '',
            end_time: '',
            url: '',
            long_img: '',
            video_url: '',
            active_status: 1,
            area_id: '',
            city_id: '',
            province_id: '',
            layer_img: '',
            banner: '',
            layer_type: 1,
            layer_pos: ''
          }
        } else {
          const {
            name,
            alias,
            content,
            start_time,
            end_time,
            url,
            long_img,
            video_url,
            active_status,
            area_id,
            city_id,
            province_id,
            layer_img,
            banner,
            layer_type,
            layer_pos
          } = res.data.data
          this.ruleForm = {
            name,
            alias,
            content,
            start_time,
            end_time,
            url,
            long_img,
            video_url,
            active_status,
            area_id,
            city_id,
            province_id,
            layer_img,
            banner,
            layer_type,
            layer_pos
          }
          this.$refs.uploadImg1.concert(this.ruleForm.banner);
          this.$refs.uploadImg2.concert(this.ruleForm.layer_img);
          this.$refs.searchCity.getProvince(
            this.ruleForm.province_id,
            this.ruleForm.city_id,
            // this.ruleForm.area_id
          )
        }
      })
    },
    radioChange (val) {
      this.ruleForm.layer_type = val
    },
    showImglist (row) {
      this.picData = []
      this.dialogVisibleImg = true
      this.picData.push(row)
    },
    playFun (row, index) {
      this.videoIndex = index
      this.videoData = row;
      this.dialogVisibleVideo = true;
      setTimeout(() => {
        this.itemPlay(index);
      });
    },
    itemPlay (index) {
      var ele = document.getElementById(`videos${index}`);
      // ele.setAttribute("class", "videoHeight");
      var h1 = document.body.clientHeight;
      var box = document.getElementById("v-box");
      box.style.height = h1 - 400 + "px";
      ele.play();
    },
    handleClose () {
      var ele = document.getElementById(`videos${this.videoIndex}`);
      ele.pause();
      this.dialogVisibleVideo = false;
    },
    toRecycle () {
      this.isRecycle = true
      this.is_delete = 1
      this.status = null
      this.page = 1
      this.dataFun()
    },
    goBack () {
      this.isRecycle = false
      // this.status = 2
      this.page = 1;
      this.status = null
      this.is_delete = 0
      this.activeName = "first"
      this.sortVal = 'create_time'
      this.dataFun()
    },
    addFun () {
      this.aTitle = '新增活动'
      this.id = null
      this.addDialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.appBox {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 15px 15px;
  padding: 15px 15px;
  .add-box {
    margin: 10px 0;
    display: flex;
  }
  .s-title {
    font-size: 14px;
    font-weight: bold;
  }
  .gz-name {
    padding-top: 10px;
  }
  .btn-nav {
    flex: 1;
    display: flex;
  }
  .so-nav {
    width: 350px;
    display: flex;
  }
  .sosuo {
    margin-left: 10px;
  }
  .so-ipt {
    border-color: #cecece;
  }
  .el-input__suffix {
    color: #000 !important;
    font-weight: bold;
  }
  .pagebox {
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
  //
  .el-button--danger {
    background-color: #2e2e2e !important;
    border-color: #2e2e2e !important;
  }
  .el-button--primary {
    color: #000;
    background-color: #fff6df !important;
    border-color: #ffbe11 !important;
  }
  .appBox >>> .is-active {
    color: #000 !important;
  }
  .appBox >>> .el-button--text {
    color: #000 !important;
  }
  .ipt01 {
    width: 500px;
  }
  .a-box {
    display: flex;
    margin-bottom: 30px;
    font-size: 14px;
  }
  .a-s1 {
    width: 120px;
    color: #666;
  }
  .a-s2 {
    flex: 1;
    color: #000;
  }
  .a-s3 {
    width: 50%;
    background: #f2f3f4;
    border-radius: 4px;
    padding: 10px 15px;
    color: #000;
    border: 1px solid #e4e7ec;
    line-height: 24px;
  }
}
.img1 {
  width: 120px;
  height: 120px;
}
.v01 {
  position: relative;
  width: 120px;
  height: 120px;
  text-align: center;
}
.icon01 {
  font-size: 28px;
  color: #fff;
  position: absolute;
  top: 40px;
  left: 38%;
}
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.videoHeight {
  max-height: 100%;
}
.shanxdiv {
  margin-bottom: 10px;
  display: flex;
  .sxBox {
    display: flex;
  }
  .sxNav {
    display: flex;
  }
  .timeNav {
    display: flex;
    margin: 10px 0;
  }
  .filter-btn {
    float: left;
    background-color: #f4f4f4 !important;
    border: 1px solid #cecece !important;
    color: #0a0a0a;
  }
  .rucwz2 {
    color: #0a0a0a;
  }
}
</style>