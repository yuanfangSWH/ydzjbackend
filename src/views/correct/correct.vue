<template>
  <div class="shopSet">
    <div class="pageTitle">商家纠错</div>
    <div class="shanxdiv">
      <div class="rucwz2">用户</div>
      <el-input style="width: 350px; margin-right: 10px"
                placeholder="搜索用户ID/昵称/手机号"
                v-model="searchValue"
                clearable></el-input>
      <div class="shiheyf">商家类型</div>
      <el-select style="margin-right: 10px"
                 v-model="type_id"
                 placeholder="请选择商家类型">
        <el-option v-for="item in shopTypeList"
                   :key="item.type_id"
                   :label="item.type_name"
                   :value="item.type_id">
        </el-option>
      </el-select>
    </div>
    <div class="shanxdiv">
      <div class="rucwz2">举报时间</div>
      <el-date-picker v-model="create_time_start"
                      type="datetime"
                      placeholder="设置开始时间"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm">
      </el-date-picker>

      <div class="rucwz">-</div>
      <el-date-picker style="margin-right: 10px"
                      v-model="create_time_end"
                      type="datetime"
                      placeholder="设置结束时间"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm">
      </el-date-picker>
      <div class="shiheyf">状态</div>
      <el-select style="margin-right: 10px"
                 v-model="status"
                 placeholder="请选择状态">
        <el-option v-for="item in statusData"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
      <el-button class="filter-btn"
                 type="primary"
                 @click="screening">筛选</el-button>
      <el-button class="filter-btn"
                 type="info"
                 @click="resetData">清空条件</el-button>
    </div>
    <el-button type="danger"
               @click="batchDelete"
               :disabled="!multipleSelection.length > 0">处理</el-button>
    <div class="add-box"
         style="display: flex">
      <div style="flex: 1">
        <el-button type="danger"
                   @click="insertItemtk"
                   v-show="status == 1">处理</el-button>
      </div>

    </div>
    <el-table ref="multipNum"
              stripe
              :data="tableListData"
              tooltip-effect="dark"
              style="width: 100%"
              @sort-change="screeningData"
              @filter-change="filterTagTable"
              @selection-change="selectItem">
      <!-- ID -->
      <el-table-column type="selection"
                       width="55" />

      <el-table-column sortable="custom"
                       prop="correct_id"
                       label="ID"
                       width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.correct_id }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="shop_info.name"
                       label="被纠错商家"
                       width="180" />

      <el-table-column column-key="status"
                       :filters="subtypeData"
                       :filter-multiple="false"
                       width="180"
                       label="纠错类型">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     @click="OpenCorrect(scope.row)">{{ scope.row.sub_type|showStatusText}}</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="user_info.nickname"
                       label="纠错用户"
                       width="180">
        <template slot-scope="scope">
          <div style="display: flex; align-items: center"
               v-if="scope.row.user_info.avatar"
               @click="userInformation(scope.row)">
            <el-image style="width: 30px; height: 30px; border-radius: 100%"
                      fit="fill"
                      :src="scope.row.user_info.avatar"></el-image>
            <div style="flex: 1; margin-left: 5px">
              {{ scope.row.user_info.nickname}}（<span v-if="scope.row.user_info.gender == 1">男</span><span v-else>女</span>/{{ scope.row.user_info.age }}岁）
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="additional_remark "
                       label="举证内容"
                       width="180">
        <template slot-scope="scope">
          <!-- info-title-->
          <el-tooltip class="item"
                      effect="dark"
                      :content="scope.row.additional_remark"
                      placement="bottom">
            <div>{{ scope.row.additional_remark!=''?getAgent(scope.row.additional_remark):""}}</div>
          </el-tooltip>

          <div v-if="scope.row.album">
            <span v-for="(src,i) in   scope.row.album"
                  :key="i"
                  @click="showImglist(scope.row.album, i)">
              <el-image fit="cover"
                        style="width: 60px; height: 60px; margin-right: 5px"
                        :src="src.path"></el-image>
            </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column sortable="custom"
                       prop="type"
                       label="纠正内容"
                       width="140">
        <template slot-scope="scope">

          <el-tooltip v-if="scope.row.sub_type==11"
                      class="item"
                      effect="dark"
                      :content="scope.row.new_address"
                      placement="bottom">
            <div>{{ scope.row.new_address!=''?getAgent(scope.row.new_address):""}}</div>
          </el-tooltip>

          <el-tooltip v-if="scope.row.sub_type==12"
                      class="item"
                      effect="dark"
                      :content="scope.row.new_tel "
                      placement="bottom">
            <div>{{ scope.row.new_tel !=''?getAgent(scope.row.new_tel ):""}}</div>
          </el-tooltip>

          <el-tooltip v-if="scope.row.sub_type==13"
                      class="item"
                      effect="dark"
                      :content="scope.row.new_name"
                      placement="bottom">
            <div>{{ scope.row.new_name!=''?getAgent(scope.row.new_name):""}}</div>
          </el-tooltip>

          <el-tooltip v-if="scope.row.sub_type==14"
                      class="item"
                      effect="dark"
                      :content=" scope.row.new_business_time"
                      placement="bottom">
            <div>{{  scope.row.new_business_time !=''?getAgent( scope.row.new_business_time):""}}</div>
          </el-tooltip>

          <div v-if="scope.row.sub_type==15">{{scope.row.new_type_id !=''?getAgent(scope.row.new_type_id):""}}</div>

          <div v-if="scope.row.sub_type==51||scope.row.sub_type==0"
               style="color: #559a4a">其它</div>

        </template>
      </el-table-column>

      <el-table-column sortable="custom"
                       prop="create_time"
                       label="举报时间"
                       width="200" />

      <el-table-column sortable="custom"
                       prop="status"
                       label="状态"
                       width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">未处理</span>
          <span v-if="scope.row.status==1">已受理</span>
          <span v-if="scope.row.status==2">无视</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="操作">
        <template slot-scope="scope">
          <div>
            <el-button size="mini"
                       type="text"
                       @click="OpenCorrect(scope.row)">处理</el-button>
            <el-button size="mini"
                       type="text"
                       @click="openDelDialog(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination :current-page="curPage"
                     :hide-on-single-page="true"
                     @current-change="pageChange"
                     background
                     :page-sizes="[10, 20, 50, 100]"
                     :page-size.sync="page_size"
                     @size-change="handlePageSizeChange"
                     layout="sizes,prev, pager, next,jumper"
                     :total="total"></el-pagination>
    </div>

    <!-- 新增内容 -->
    <el-dialog title="11111"
               :visible.sync="solveDialog1">
      <el-form :model="addItem"
               :rules="rules"
               ref="formName1"
               label-width="180px"
               class="updateArea">
        <el-form-item label="礼物名称"
                      prop="name">
          <el-input v-model="addItem.name"
                    clearable />
        </el-form-item>
        <el-form-item label="价值"
                      prop="price">
          <div style="display: flex">
            <el-input style="
                flex: 1;
                width: 300px !important;
                min-width: 200px !important;
              "
                      type="Number"
                      v-model="addItem.price"
                      clearable />
            <span style="margin-left: 10px">Y币</span>
          </div>
        </el-form-item>
        <el-form-item label="礼物图片"
                      prop="image">
          <uploadFiles ref="uploadImg"
                       @theIMG="theIMG"
                       root="gift" />
        </el-form-item>
        <el-form-item label="可得积分"
                      prop="point">
          <el-input type="Number"
                    v-model="addItem.point"
                    clearable />
        </el-form-item>
        <el-form-item label="排序"
                      prop="sort">
          <el-input type="Number"
                    v-model="addItem.sort"
                    clearable />
        </el-form-item>
        <el-form-item label="状态"
                      prop="status">
          <el-select v-model="addItem.status"
                     placeholder="请选择">
            <el-option :key="0"
                       label="下架"
                       :value="0"> </el-option>
            <el-option :key="1"
                       label="正常"
                       :value="1"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="solveDialog1 = false">取 消</el-button>
        <el-button type="primary"
                   @click="validation('formName1')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 图片放大镜 -->
    <el-dialog :title="giftName"
               :visible.sync="dialogVisible"
               width="25%">
      <template v-if="dialogVisible">
        <el-carousel :autoplay="false"
                     indicator-position="none"
                     arrow="always"
                     height="600px"
                     :initial-index="imgIndex">
          <el-carousel-item v-for="(item, index) in picData"
                            :key="index">
            <div class="imgbox">
              <el-image style="height: 600px; width: auto"
                        fit="contain"
                        :src="item.path"></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-dialog>
    <!-- 删除单个内容 -->
    <el-dialog :title="'删除-' + deltitle"
               :visible.sync="deleteDialog"
               width="30%">
      <span>确定要删除此项吗</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteItem('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量删除 -->
    <el-dialog title="删除"
               :visible.sync="mutilDeleteDialog"
               width="50%">
      <span class="s-title">确定要删除以下内容吗?</span>
      <div class="gz-name"
           v-for="(item, index) in nameArr"
           :key="index">
        {{ item }}
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="mutilDeleteDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteItem('mutil')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 纠错类型弹框 Listupdate -->
    <el-dialog :title="deltitle"
               :visible.sync="ishowType"
               width="25%">

      <el-form ref="form"
               :model="form"
               label-width="80px"
               v-if="Listupdate.length!=0">
        <el-form-item label="活动名称">
          <span>{{Listupdate.shop_info.name}}</span>
        </el-form-item>

        <el-form-item label="举证补充">
          <span>{{additional_remark}}</span>
          <div v-if="Listupdate.album">
            <span v-for="(src,i) in   Listupdate.album"
                  :key="i"
                  @click="showImglist(Listupdate.album, i)">
              <el-image fit="cover"
                        style="width: 60px; height: 60px; margin-right: 5px"
                        :src="src.path"></el-image>
            </span>
          </div>
        </el-form-item>

        <!-- 纠错电话 -->
        <div v-if="Listupdate.sub_type==12">
          <el-form-item label="原电话">
            <span>{{Listupdate.shop_info.phone}}</span>
          </el-form-item>
          <el-form-item label="纠正电话">
            <el-input style="width: 150px !important;color: #DCDFE6 !important;"
                      v-model="form.phone"
                      :maxlength="11"
                      :clearable="true"></el-input>
          </el-form-item>
        </div>

        <!-- 纠错类型 -->
        <div v-if="Listupdate.sub_type==15">
          <el-form-item label="原类型">
            <span>{{Listupdate.shop_info.type_name}}</span>
          </el-form-item>

          <el-form-item label="纠正类型">
            <el-select v-model="form.type_id"
                       placeholder="请选择类型">
              <!-- <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option> -->
              <el-option v-for="item in shopTypeList"
                         :key="item.type_id"
                         :label="item.type_name"
                         :value="item.type_id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- 纠错用户名 -->
        <div v-if="Listupdate.sub_type==13">
          <el-form-item label="纠正名称">
            <el-input :clearable="true"
                      v-model="form.new_name"
                      style="width: 150px !important;"></el-input>
          </el-form-item>
        </div>
        <!-- 纠错营业时间 -->
        <div v-if="Listupdate.sub_type==14"
             style="white-space:nowrap">
          <el-form-item label="原营业时间"
                        required>
            <el-time-picker v-model="business_start_time"
                            value-format="HH:mm"
                            format="HH:mm"
                            placeholder="开始时间">
            </el-time-picker>
            <span style="margin: 0 5px">-</span>
            <el-time-picker v-model="business_stop_time"
                            value-format="HH:mm"
                            format="HH:mm"
                            placeholder="结束时间">
            </el-time-picker>
          </el-form-item>
          </el-form-item>
          <!-- 纠正营业时间 -->
          <el-form-item label="纠正时间"
                        required>
            <el-time-picker v-model="form.business_start_time"
                            value-format="HH:mm"
                            format="HH:mm"
                            placeholder="开始时间">
            </el-time-picker>
            <span style="margin: 0 5px">-</span>
            <el-time-picker v-model="form.business_stop_time"
                            value-format="HH:mm"
                            format="HH:mm"
                            placeholder="结束时间">
            </el-time-picker>
          </el-form-item>
          </el-form-item>
        </div>

        <div style="white-space:nowrap">
          <el-form-item>
            <el-button type="primary"
                       @click="getbtu()">{{Listupdate.sub_type==51?'标记处理':'提交'}}</el-button>

            <el-button @click="getPerfect(Listupdate)">去完善更多</el-button>
            <el-button @click="getcancel()">取消</el-button>
          </el-form-item>
        </div>

      </el-form>
    </el-dialog>

    <!-- 错误位置 -->
    <el-dialog :title="deltitle"
               :visible.sync="ishowType1"
               width="50%">
      <!-- 纠错位置表单 -->
      <el-form ref="form"
               :model="form"
               label-width="80px"
               v-if="Listupdate.length!=0">
        <el-form-item label="活动名称">
          <span>{{Listupdate.shop_info.name}}</span>
        </el-form-item>

        <el-form-item label="举证补充">
          <span>{{additional_remark}}</span>
          <div v-if="Listupdate.album">
            <span v-for="(src,i) in   Listupdate.album"
                  :key="i"
                  @click="showImglist(Listupdate.album, i)">
              <el-image fit="cover"
                        style="width: 60px; height: 60px; margin-right: 5px"
                        :src="src.path"></el-image>
            </span>
          </div>
        </el-form-item>

        <el-form-item label="原地址">
          <span>{{address1}}</span>
          <div>
            <el-image @click="selectLocation"
                      :src="
                  'https://restapi.amap.com/v3/staticmap?location=' +
                  form.longitude +
                  ',' +
                  form.latitude +
                  '&zoom=16&size=700*300&markers=mid,,:' +
                  form.longitude +
                  ',' +
                  form.latitude +
                  '&key=ec089479f41e213eb5167410a7be396e'
                ">
              <div slot="placeholder"
                   class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
            <i class="iconfont icon-dingwei" />经度：{{
              form.longitude
            }}
            纬度：{{ form.latitude }}
          </div>
        </el-form-item>

        <el-form-item label="省市区"
                      required>
          <searchCity ref="searchCity"
                      :showArea="true"
                      :returnValue="true"
                      @setCityAreaName="setCityAreaName" />
        </el-form-item>
        </br>
        <!-- 地图 -->
        <el-form-item label="商家地址"
                      prop="address">
          <el-input v-model="form.address">
            <el-button @click="selectLocation"
                       slot="append">定位</el-button>
          </el-input>
          <br />

          <div>
            <el-image @click="selectLocation"
                      :src="
                  'https://restapi.amap.com/v3/staticmap?location=' +
                  form.longitude +
                  ',' +
                  form.latitude +
                  '&zoom=16&size=700*300&markers=mid,,:' +
                  form.longitude +
                  ',' +
                  form.latitude +
                  '&key=ec089479f41e213eb5167410a7be396e'
                ">
              <div slot="placeholder"
                   class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </div>
          <i class="iconfont icon-dingwei" />经度：{{
              form.longitude
            }}
          纬度：{{ form.latitude }}
        </el-form-item>

        <div style="white-space:nowrap">
          <el-form-item>
            <el-button type="primary"
                       @click="getbtu()">提交</el-button>
            <el-button @click="getPerfect(Listupdate)">去完善更多</el-button>
            <el-button @click="getcancel()">取消</el-button>
          </el-form-item>
        </div>

      </el-form>
    </el-dialog>

    <!-- 地图位置 -->
    <el-dialog title="位置标注"
               :visible.sync="mapForAdd.dialogVisible"
               custom-class="baidu-map"
               width="80%"
               @opened="showShopMap">
      <amap ref="aMap"
            @chooseLocation="chooseLocation"
            :address="form.name" />
    </el-dialog>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息"
               :visible.sync="usertx"
               width="70%">
      <userBounced ref="correct_ref"
                   :routerURL="routerURL"></userBounced>
    </el-dialog>

    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
import uploadFiles from "@/components/uploadFiles";
import searchCity from "@/components/citySelectEX/shopSearchCity.vue";
import amap from "@/components/Amap";
export default {
  components: {
    uploadFiles,
    searchCity,
    amap,
  },
  name: "GiftList",
  data () {
    return {
      usertx: false,
      routerURL: "/correct",
      //状态
      status: "",
      statusData: [
        {
          id: 0,
          name: "未处理",
        },
        {
          id: 1,
          name: "已受理",
        },
        {
          id: 2,
          name: "无视",
        },
      ],
      subtypeData: [
        {
          value: 11,
          text: "位置错误",
        },
        {
          value: 12,
          text: "电话错误",
        },
        {
          value: 13,
          text: "名称错误",
        },
        {
          value: 14,
          text: "营业时间错误",
        },
        {
          value: 15,
          text: "类型错误",
        },
        {
          value: 21,
          text: "正常营业",
        },
      ],
      sc_type: "",//用户名
      type_id: "",//商家类型
      shopTypeList: [],
      rules: {
        name: [{ required: true, message: "请填写礼物名称", trigger: "blur" }],
        image: [{ required: true, message: "请上传礼物图片", trigger: "blur" }],
        price: [{ required: true, message: "请填写价值", trigger: "blur" }],
        point: [{ required: true, message: "请填写可得积分", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      // //状态
      // status: 1,
      solveDialog1: false, //纠错位置
      solveDialog2: false, //纠错电话
      solveDialog3: false, //纠错类型
      solveDialog4: false, //纠错商户名
      solveDialog5: false, //纠错营业时间
      solveDialog6: false, //纠错其他
      //页码
      curPage: 1,
      page_size: 10,
      //总数
      total: 1,
      tableListData: [], //页面表单的内容
      //添加的内容
      addItem: {
        status: 1,
      },
      //修改数据
      currenItem: {
        status: 1,
      },
      searchValue: "", //搜索的值
      //排序
      sort: "",
      order: "",
      //图片放大镜
      dialogVisible: false,
      picData: [],
      imgIndex: 0,
      giftName: "",
      user: "user",
      create_time_start: '',
      create_time_end: '',
      deleteDialog: false, //打开删除框
      mutilDeleteDialog: false, //打开批量删除框
      deltitle: "", //删除框的标题
      nameArr: [], //批量选中的id
      multipleSelection: [], //批量选中
      currenDeleteRow: "", //当前选中的删除行
      Listupdate: [],//弹框数据更新
      ishowType: false,//纠错类型弹框
      ishowType1: false,
      deltitle: "",//弹框标题
      business_start_time: ":08:20",//默认原始开始时间
      business_stop_time: "08:30",//默认原始结束时间
      additional_remark: "",
      form: {
        region: '',
        phone: '',
        business_start_time: "", // 营业开始时间 *
        business_stop_time: "", // 营业结束时间 *
        type_id: "",//类型ID
        new_name: "",//纠正名称
        province_id: "", // 省份ID *
        city_id: "", // 城市ID *
        area_id: "", // 店铺区域ID *
        address: "", // 店铺地址 *
        address1: "",
        longitude: "", // 经度
        latitude: "", // 纬度
        new_tel: "",//纠正电话
      },
      mapForAdd: {
        dialogVisible: false,
        mapHeight: 450,
        height: "80%",
        width: "85%",
        longitude: "",
        latitude: "",
        title: "选择目标位置",
      },
    };
  },
  filters: {
    showStatusText (val) {
      const statusDatas = [
        {
          id: 11,
          name: "位置错误",
        },
        {
          id: 12,
          name: "电话错误",
        },
        {
          id: 13,
          name: "名称错误",
        },
        {
          id: 14,
          name: "营业时间错误",
        },
        {
          id: 15,
          name: "类型错误",
        },
        {
          id: 21,
          name: "正常营业",
        },

      ];
      return statusDatas.find((item) => item.id == val)
        ? statusDatas.find((item) => item.id == val).name
        : " 其它";
    }
  },
  created () {
    this.getTableList(this.curPage);
    this.getShopType();//商家类型
  },
  methods: {
    getAgent (v) {
      return v.length > 10 ? v.substring(0, 10) + " ..." : v;
    },
    // 省份
    setCityAreaName (obj) {
      this.form.province_id = obj.province_id
      this.form.city_id = obj.city_id
      this.form.area_id = obj.area_id
    },

    getbtu () {
      const datas = {
        new_tel: this.form.phone,//纠错电话
        new_type_id: this.form.type_id,
        new_name: this.form.new_name,//纠错名称
        correct_id: this.Listupdate.correct_id,
        shop_id: this.Listupdate.shop_id,
        type: this.Listupdate.sub_type,//纠错类型
        status: 1,//状态
        new_business_time_start: this.form.business_start_time,//开始时间
        new_business_time_end: this.form.business_stop_time,//结束时间

        new_province_id: this.form.province_id,//新省份
        new_city_id: this.form.city_id,//新城市
        new_area_id: this.form.area_id,//新区域
        new_longtitude: this.form.longitude,// 经度
        new_latidude: this.form.latitude, // 纬度
        new_address: this.form.address,
      }
      // if (this.form.phone == "" || this.form.new_name == "" || this.Listupdate.sub_type == "" || this.form.business_start_time == "" || this.form.business_stop_time == "") {
      //   this.$message.error("纠正内容不能为空")
      //   return false
      // }
      this.api.gift.gethandling(datas).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getTableList(this.curPage);
        this.ishowType = false;
        this.ishowType1 = false
      });
    },
    // 取消按钮
    getcancel () {
      this.ishowType1 = false;
      this.ishowType = false;
    },
    // 打开地图
    selectLocation (e) {
      this.mapForAdd.dialogVisible = !this.mapForAdd.dialogVisible;
    },
    showShopMap () {
      this.$refs.aMap.setLocation({
        position: [this.form.longitude, this.form.latitude],
        address: this.form.address,
        name: this.form.address,
        lat: this.form.latitude,
        lng: this.form.longitude,
        city: this.form.city_id,
      });
    },
    // 地图中选择位置
    chooseLocation (obj) {
      console.log(obj)
      // this.locationData = obj;
      this.form.latitude = obj.lat;
      this.form.longitude = obj.lng;
      this.form.address = obj.address;
      this.mapForAdd.dialogVisible = false;
    },

    // 去完善更多
    getPerfect (data) {
      this.$router.push({
        path: "/ShopInfo",
        query: {
          shop_id: data.shop_id,
          merchant_id: data.shop_id,
          tab: "shopInfo",
          from: "correct",
        }
      });
      console.log(data)
    },
    //纠错类型弹框 Listupdate
    OpenCorrect (row) {
      this.Listupdate = row
      this.address1 = row.shop_info.address
      switch (row.sub_type) {
        case 11:
          console.log(row)
          this.deltitle = "位置错误"
          this.additional_remark = row.additional_remark
          this.ishowType1 = true
          // this.address1 = row.shop_info.address
          this.form = {
            address: row.shop_info.address, // 店铺地址
            longitude: row.longitude, // 经度
            latitude: row.latitude, // 纬度
          };
          this.$nextTick(() => {
            this.$refs.searchCity.getProvince(
              this.province_id,
              this.city_id,
              this.area_id,
            );
          });
          break;
        case 12:
          this.deltitle = "电话错误"
          this.additional_remark = row.additional_remark
          this.form.phone = row.new_tel
          this.ishowType = true
          break;
        case 13:
          this.deltitle = "名称错误"
          this.additional_remark = row.additional_remark
          this.form.new_name = row.new_name
          this.ishowType = true
          break;
        case 14:
          this.deltitle = "营业时间错误"
          this.additional_remark = row.additional_remark
          this.business_start_time = this.Listupdate.shop_info.business_start_time
          this.business_stop_time = this.Listupdate.shop_info.business_stop_time
          if (row.new_business_time != "") {
            this.form.business_start_time = row.new_business_time.substring(0, 5)//截取开始时间
            this.form.business_stop_time = row.new_business_time.substring(6)//截取借宿时间
          }
          this.ishowType = true
          break;
        case 15:
          this.deltitle = "类型错误"
          this.additional_remark = row.additional_remark
          this.form.type_id = row.new_type_id
          this.ishowType = true
          console.log(row)
          break;
        case 21:
          this.deltitle = "纠错营业时间"
          this.additional_remark = row.additional_remark
          this.ishowType = true

          break;
        default:
          this.deltitle = "纠错其他"
          this.additional_remark = row.additional_remark
          this.ishowType = true
          break;
      }

    },
    //删除列表
    openDelDialog (item) {
      this.deltitle = "删除标题";
      this.currenDeleteRow = item;
      this.deleteDialog = true;
    },
    deleteItem (type) {
      const datas =
        this.multipleSelection.length > 0 ? { id: this.multipleSelection } : { id: [this.currenDeleteRow.correct_id] };
      this.api.gift.deletedshopCorrect(datas).then((res) => {
        this.getTableList(this.curPage);
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
        this.$message({
          message: "删除成功",
          type: "success",
        });
      });
    },
    batchDelete () {
      this.deleteDialog = true;
    },
    //用户详情弹框
    userInformation (row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.correct_ref.addID(row.user_info.user_id);
      }, 0);
      console.log(row)
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
      this.getTableList(this.curPage);
      // console.log(column.order)
    },
    //下拉筛选
    filterTagTable (filters) {
      if (filters.status[0] == undefined) {
        // this.status = ""
        this.sc_type = ""
      } else {
        this.sc_type = filters.status[0]
        // this.status = filters.status[0];
      }
      this.getTableList(this.curPage);
    },
    /* 选择表的行 */
    selectItem (val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.correct_id);
        // this.nameArr.push(item.merchant_name);
      });
    },
    // 商家类型
    getShopType () {
      this.$store.dispatch("shop/getShopType").then((res) => {
        if (res.code == 0) {
          this.shopTypeList = res.data;
          console.log(this.shopTypeList)
        }
      });
    },
    screening () {
      this.curPage = 1
      this.getTableList(this.curPage);
    },
    //清空条件
    resetData () {
      this.searchValue = "";
      this.type_id = "";
      this.create_time_start = "";
      this.create_time_end = "";
      this.status = "";
      this.curPage = 1
      this.getTableList(this.curPage);
    },
    //跳转礼物变动记录
    DetailedDialog (row) {
      this.$router.push({
        path: "/GiftDetailed",
        query: { gift_id: row.gift_id },
      });
    },
    //图片上传子组件传值
    theIMG (url) {
      this.addItem.image = url;
      this.currenItem.image = url;
    },
    /* 获取列表内容 */
    getTableList (page) {
      var data = {
        keyword: this.searchValue,//用户搜索
        start_time: this.create_time_start,//开始时间
        end_time: this.create_time_end,//结束时间
        page: page,
        status: this.status,
        order: "ASC",
        sc_type: this.sc_type,//纠错类型
        shop_type: this.type_id,//商家类型
        sort: this.sort,
        order: this.order,
        page_size: this.page_size,

      }
      this.api.gift.getshopCorrect(data).then((res) => {
        let array = res.data.data
        this.tableListData = array;
        this.total = res.data.count ? res.data.count : 0;
        //遍历更新存放弹框的数据
        for (let index = 0; index < array.length; index++) {
          if (this.Listupdate.length != 0) {
            if (array[index].correct_id == this.Listupdate.correct_id) {
              this.Listupdate = array[index]
              this.business_start_time = array[index].shop_info.business_start_time
              this.business_stop_time = array[index].shop_info.business_stop_time
            }
          }
        }
      });
    },
    /* 搜索 */
    searchDatas () {
      this.curPage = 1
      this.getTableList(this.curPage);
    },

    //统一验证方法
    validation (data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          if (data == "formName1") {
            this.insertItem();
          } else {
            this.multiUpdate();
          }
        } else {
          return false;
        }
      });
    },
    //打开纠错位置
    insertItemtk () {
      this.solveDialog1 = true;
      //初始化图片
      setTimeout(() => {
        this.$refs.uploadImg.concert("");
      }, 0);
    },
    /* 提交 */
    insertItem () {
      this.addItem.price = Number(this.addItem.price);
      this.addItem.point = Number(this.addItem.point);
      this.addItem.stock = Number(this.addItem.stock);
      this.addItem.stock_all = Number(this.addItem.stock_all);
      this.addItem.sales = Number(this.addItem.sales);
      this.addItem.sort = Number(this.addItem.sort);
      this.addItem.status = Number(this.addItem.status);
      var data = this.addItem;
      this.api.gift.GiftInsert(data).then((res) => {
        this.$refs["formName1"].resetFields();
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.getTableList(this.curPage);
      });
    },
    /* 改变页数 */
    pageChange (v) {
      this.curPage = v
      this.getTableList(v);
    },
    handlePageSizeChange (v) {
      this.pageChange();
    },
    //放大镜
    showImglist (row, index) {
      this.picData = [];
      this.dialogVisible = true;
      this.giftName = "举证图片";
      this.picData = row;
      this.imgIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.el-button--danger {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
.el-button--primary {
  color: #000;
  background-color: #fff6df !important;
  border-color: #ffbe11 !important;
}
.shanxdiv {
  margin-bottom: 10px;
  display: flex;
}
.info-title {
  color: #19d3ea;
  font-size: 18px;
  width: 100%; /*一定要设置宽度，或者元素内含的百分比*/
  overflow: hidden; /*溢出的部分隐藏*/
  white-space: nowrap; /*文本不换行*/
  text-overflow: ellipsis; /*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
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
  .sosuo {
    margin-left: 10px;
  }
  .pagination {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
  }
  .searchInput {
    // float: right;
    width: 300px;
  }
  .el-form-item {
    width: 50% !important;
    .el-input {
      min-width: 100px !important;
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
.infocyt {
  display: flex;
}
.conter-min {
  width: 100%;
  height: 100%;
  // border: 1px solid red;
  .min {
    display: flex;
    width: 100%;
    height: 40px;
    .min-name1 {
      line-height: 40px;
    }
    .min-name2 {
      margin-left: 46px;
      line-height: 40px;
    }
  }
  .min1 {
    display: flex;
    width: 100%;
    // height: 40px;
    .min1-left {
      line-height: 40px;
    }
    .min1-right {
      margin-left: 46px;
      line-height: 40px;
      .IMG {
        img {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
  .main2 {
    display: flex;
    width: 100%;
    .main2-left {
      line-height: 40px;
    }
    .main2-right {
      margin-left: 55px;
      line-height: 40px;
    }
  }
  .main3-from {
    width: 100%;
  }
}
</style>
