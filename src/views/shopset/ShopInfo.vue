<template>
  <div class="shopSet shopInfo">
    <h2 style="margin: 15px 15px 15px 15px; font-size: 24px">
      {{ form.name }}
      <el-button type="text"
                 style="margin-left: 20px"
                 @click="handleOpenOrder">查看店铺订单</el-button>
      <el-button type="text"
                 style="margin-left: 20px"
                 @click="
          $router.push({
            path: '/Consoler',
            query: { merchant_id: merchant_id, shop_id: shop_id },
          })
        ">店铺控制台</el-button>
    </h2>
    <el-tabs type="border-card"
             v-model="activeName"
             @tab-click="tabsFun">
      <el-tab-pane name="shopInfo">
        <span slot="label"><i class="el-icon-date" /> 基本信息</span>
        <el-form ref="formShop"
                 :model="form"
                 :rules="rules"
                 label-width="180px"
                 class="basicInfo">
          <el-form-item label="商家名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <!-- <el-form-item label="商家英文简称">
            <el-input v-model="form.ename" disabled="" />
          </el-form-item> -->

          <el-form-item label="店铺类型"
                        prop="type_id">
            <el-select v-model="form.type_id"
                       placeholder="请选择店铺类型">
              <el-option v-for="item in shopTypeList"
                         :key="item.type_id"
                         :label="item.type_name"
                         :value="item.type_id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="营业时间"
                        required>
            <div style="display: flex; width: 200px">
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
            </div>
          </el-form-item>

          <el-form-item label="省市区"
                        required>
            <searchCity ref="searchCity"
                        @setCityAreaName="setCityAreaName"
                        :showArea="true"
                        :returnValue="true" />
            <!-- <el-input v-model="shopAreaName" @focus="openCitySelect" />
            <citySelect :title="areaTitle" @setArea="setCityAreaName" /> -->
          </el-form-item>

          <el-form-item label="商家地址"
                        prop="address">
            <el-input v-model="form.address">
              <el-button @click="selectLocation"
                         slot="append">定位</el-button>
            </el-input>
            <br />
            <i class="iconfont icon-dingwei" />经度：{{
              form.longitude
            }}
            纬度：{{ form.latitude }}
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
          </el-form-item>

          <el-form-item label="商家电话"
                        prop="phone">
            <el-input ref="shopPhone"
                      v-model="form.phone"
                      @keyup.native="validatePhone"
                      placeholder="暂无电话" />
            <div class="form-shan"
                 style="line-height: 20px">
              (多个电话用英文半角分号分隔。如：0772-2663398;0772-5051498)
            </div>
            <div class="form-shan"
                 style="color: #f00; line-height: 20px"
                 v-if="isError">
              输入的电话号码不正确，请重新输入
            </div>
          </el-form-item>

          <el-form-item label="人均消费"
                        prop="basic_price">
            <el-input v-model.number="form.basic_price" />
          </el-form-item>

          <!-- <el-form-item label="预定自动审核"
                        prop="reserve_auto_audit">
            <el-checkbox v-model="form.reserve_auto_audit">预定自动审核</el-checkbox>
          </el-form-item>
          <el-form-item label="点单自动审核"
                        prop="shopping_auto_audit">
            <el-checkbox v-model="form.shopping_auto_audit">点单自动审核</el-checkbox>
          </el-form-item>

          <el-form-item label="支付类型"
                        prop="shopping_pay_online">
            <el-checkbox v-model="form.shopping_pay_online">在线支付</el-checkbox>
          </el-form-item> -->

          <!-- <el-form-item label="预订最大时长" prop="reserve_max_duration">
            <el-input
              v-model="form.reserve_max_duration"
              placeholder="预订最大的时间时长"
            />
            <span class="form-shan">(单位：小时)</span>
            <el-tooltip
              class="item"
              effect="dark"
              content="可消费最长时间，如KTV包厢最长7小时，时长越长翻台率越低，可预订次数越少"
              placement="right"
            >
              <i class="tip-i el-icon-info"></i>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="间隔时长" prop="reserve_time_interval">
            <el-input
              v-model="form.reserve_time_interval"
              placeholder="预订最大的时间间隔"
            />
            <span class="form-shan">(单位：小时)</span>
            <el-tooltip
              class="item"
              effect="dark"
              content="间隔时长越小，翻台率越高（时长太短容易造成预订失败），例如：7点营业，间隔时长2小时，可预订时间最晚9点"
              placement="right"
            >
              <i class="tip-i el-icon-info"></i>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="预定最迟到达时间" prop="reserve_latest_arrive">
            <el-time-picker
              v-model="form.reserve_latest_arrive"
              value-format="HH:mm"
              format="HH:mm"
              placeholder="选择时间"
            >
            </el-time-picker>
          </el-form-item>

          <el-form-item label="预订是否支持选位" prop="reserve_choose_place">
            <el-radio-group v-model="form.reserve_choose_place">
              <el-radio :label="0">不支持</el-radio>
              <el-radio :label="1">支持</el-radio>
            </el-radio-group>
          </el-form-item> -->

          <el-form-item label="店铺logo"
                        required>
            <!-- <el-image
              style="width: 100px; height: 100px"
              :src="form.logo"
              :preview-src-list="logos"
            >
            </el-image> -->
            <uploadFiles class="uploadTemp"
                         ref="uploadImg1"
                         @theIMG="uploadLogo"
                         :imageUrl="logos"
                         root="shop"
                         :defaltIcon="1" />
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
            <span class="form-shan">(请上传100px * 100px的图片尺寸，不得超过2M)</span>
          </el-form-item>
          <!-- <el-form-item label="店铺logo"
                        prop="logo">
            <img class="comimg"
                 v-if="imageUrl"
                 :src="imageUrl" />
            <Imgcutter @cutDown="cutDown"
                       :boxHeight="600"
                       :cutWidth="500"
                       :cutHeight="500"
                       :sizeChange="true"></Imgcutter>
            <span class="form-shan">(推荐上传图片尺寸500px * 500px，不得超过2M)</span>
          </el-form-item> -->
          <el-form-item label="营业状态"
                        prop="business_status">
            <el-radio-group v-model="form.business_status">
              <el-radio :label="0">暂停营业</el-radio>
              <el-radio :label="1">正常营业</el-radio>
              <el-radio :label="2">待营业</el-radio>
              <el-radio :label="3">永久停业</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="form.business_status == 0"
                        prop="notice"
                        label="暂停营业公告">
            <el-input type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      placeholder="请输入内容"
                      v-model="form.notice">
            </el-input>
          </el-form-item>

          <el-form-item label="店铺状态"
                        prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">正常显示</el-radio>
              <el-radio :label="2">待初审</el-radio>
              <el-radio :label="3">待复审</el-radio>
            </el-radio-group>
            <div>
              <el-input type="textarea"
                        :rows="2"
                        placeholder="审核备注，仅管理人员查看。"
                        v-model="form.vertify_remark"></el-input>
            </div>
          </el-form-item>

          <el-form-item label="是否支持VR"
                        prop="vr">
            <el-radio-group v-model="form.vr">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="form.vr == 1"
                        label="VR地址"
                        prop="vr_url">
            <el-input placeholder="请输入VR地址"
                      v-model="form.vr_url">
            </el-input>
          </el-form-item>

          <el-form-item label="是否预定"
                        prop="reserve">
            <el-radio-group v-model="form.reserve">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="是否支持选座"
                        prop="choose_place">
            <el-radio-group v-model="form.choose_place">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="是否支持选择到达时间段"
                        prop="choose_time">
            <el-radio-group v-model="form.choose_time"
                            @change="changeChoose_time">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="form.choose_time == 0"
                        label="预定最迟到达时间"
                        prop="reserve_latest_arrive">
            <el-time-picker v-model="form.reserve_latest_arrive"
                            value-format="HH:mm"
                            format="HH:mm"
                            placeholder="选择时间">
            </el-time-picker>
          </el-form-item>

          <el-form-item label="是否支持退款"
                        prop="refund">
            <el-radio-group v-model="form.refund">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="是否支持菜单"
                      prop="menu">
          <el-radio-group v-model="form.menu">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
          </el-form-item> -->
          <!-- <el-form-item label="拥有套餐数量" prop="group_buy_num">
            <el-input
              placeholder="请输入数量"
              v-model.number="form.group_buy_num"
            >
            </el-input>
          </el-form-item> -->

          <el-form-item label="是否支持SVG"
                        prop="svg">
            <el-radio-group v-model="form.svg">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- <el-form-item v-if="form.svg == 1" label="SVG地址">
            <el-input placeholder="请输入SVG地址" v-model="form.svg_url">
            </el-input>
          </el-form-item> -->
          <el-form-item label="SVG图">
            <uploadSvg :currenItem="{
                merchant_id: Number(merchant_id),
                shop_id: Number(shop_id),
              }"
                       @theSVG="theSVG"></uploadSvg>
            <embed v-if="svg_url"
                   :src="svg_url"
                   style="width: 700px; height: 500px"
                   type="image/svg+xml" />
          </el-form-item>

          <el-form-item label="是否支持菜单"
                        prop="menu">
            <el-radio-group v-model="form.menu">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <!-- <el-button @click="resetForm('formShop')">取消</el-button> -->
            <el-button @click="$router.back()">取消</el-button>
            <el-button type="primary"
                       @click="updatedShop('info', 'formShop')"
                       :disabled="isNothing">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商家标签"
                   name="shopTag">
        <tag-item :shop_id="Number(shop_id)"
                  :merchant_id="Number(merchant_id)"></tag-item>
      </el-tab-pane>
      <el-tab-pane label="商家相册"
                   name="shopAlbum">
        <!-- <div class="photosTab">
          <img v-for="(item,index) in dialogImageUrl" :key="index" width="100%" :src="imgUrl+item.album_path" alt="">
        </div>
        <uploadFiles class="uploadTemp"  @childrenFun="photosTabUrl"/> -->
        <div class="videoBox ShopInfoImage">
          <div class="photo-title">视频列表</div>
          <draggable class="list-group"
                     v-model="videoList"
                     :options="{ animation: 20 }"
                     @change="draggableChangeVideo">
            <div class="img-div"
                 v-for="(item, index) in videoList"
                 :key="index">
              <video preload="none"
                     class="v-img"
                     :src="item.file_url"
                     :poster="item.cover_url"
                     controls
                     @mouseover="videoMouseover(index)"
                     @mouseleave="videoMouseleave(index)"></video>
              <div class="del-icon"
                   v-show="item.status"></div>
              <div class="del-icon2"
                   v-show="item.status"
                   @click="deleteVideoFun(item.video_id)"
                   @mouseover="videoMouseover(index)"
                   @mouseleave="videoMouseleave(index)">
                <i class="delete-i el-icon-delete"></i>
              </div>
            </div>
            <div>
              <el-alert v-show="videoList.length >= video_limit"
                        :title="'视频数已经到达限制数。 请删掉一些视频后才能上传。'"
                        type="warning"
                        :closable="false">
              </el-alert>
              <uploadVideo v-show="videoList.length < video_limit"
                           :limit="video_limit"
                           ref="uploadVideo"
                           class="uploadTemp"
                           @childrenFun="GetVideosUrl"
                           :shop="isShop"
                           root="shopvideo" />
            </div>
          </draggable>
        </div>

        <!-- <div class="imgBox">
          <div>
            <div class="photo-title">相册列表</div>
            <draggable
              class="list-group"
              v-model="fileList"
              :options="{ animation: 20 }"
              @change="draggableChangeFile"
            >
              <div
                class="img-div"
                v-for="(item, index) in fileList"
                :key="index"
              >
                <img
                  class="d-img"
                  :src="item.album_path"
                  alt=""
                  @mouseover="picMouseover(index)"
                  @mouseleave="picMouseleave(index)"
                  @click="showImg(item.album_path, index)"
                />
                <div class="del-icon" v-show="item.status"></div>
                <div
                  class="del-icon2"
                  v-show="item.status"
                  @click="deletePotoFun(item.album_id)"
                  @mouseover="picMouseover(index)"
                  @mouseleave="picMouseleave(index)"
                >
                  <i class="delete-i el-icon-delete"></i>
                </div>
              </div>
            </draggable>
          </div> -->

        <!-- 对上传数量有限制 -->
        <!-- <div v-if="photo_limit > 0">
            <el-alert
              v-show="fileList.length >= photo_limit"
              :title="'图片数已经到达限制数。 请删掉一些图片后才能上传。'"
              type="warning"
              :closable="false"
            >
            </el-alert> -->
        <!-- <Imgcutter
              v-show="fileList.length < photo_limit"
              @cutDown="cutDown2"
              :boxHeight="600"
              :cutWidth="684"
              :cutHeight="388"
              :sizeChange="true"
            ></Imgcutter> -->
        <!-- <Imgcutter
              v-show="fileList.length < photo_limit"
              @cutDown="cutDown2"
              :boxWidth="1280"
              :boxHeight="800"
              :cutWidth="1024"
              :cutHeight="580"
              :sizeChange="true"
            ></Imgcutter>
            <P style="font-size: 14px; color: #8c939d"
              >请保证图片格式正确，且不超过2M。数量不能超过
              {{ photo_limit }} 张图片。</P
            >
          </div> -->
        <!-- 对上传数量无限制 -->
        <!-- <div v-if="photo_limit == 0"> -->
        <!-- <Imgcutter
              @cutDown="cutDown2"
              :boxHeight="600"
              :cutWidth="684"
              :cutHeight="388"
              :sizeChange="true"
            ></Imgcutter> -->
        <!-- <Imgcutter
              @cutDown="cutDown2"
              :boxWidth="1280"
              :boxHeight="800"
              :cutWidth="1024"
              :cutHeight="580"
              :sizeChange="true"
            ></Imgcutter>
            <P style="font-size: 14px; color: #8c939d"
              >请保证图片格式正确，且不超过2M。</P
            >
          </div>
        </div> -->
        <div class="imgBox">
          <div>
            <div class="photo-title">相册列表</div>
            <draggable class="list-group"
                       v-model="fileList"
                       :options="{ animation: 20 }"
                       @change="draggableChangeFile">
              <div class="img-div"
                   v-for="(item, index) in fileList"
                   :key="index">
                <img class="d-img"
                     :src="item.album_path"
                     alt=""
                     @mouseover="picMouseover(index)"
                     @mouseleave="picMouseleave(index)"
                     @click="showImg(item.album_path, index)" />
                <div class="del-icon"
                     v-show="item.status"></div>
                <div class="del-icon2"
                     v-show="item.status"
                     @click="deletePotoFun(item.album_id)"
                     @mouseover="picMouseover(index)"
                     @mouseleave="picMouseleave(index)">
                  <i class="delete-i el-icon-delete"></i>
                </div>
              </div>
            </draggable>
          </div>
          <div>
            <uploadFile class="uploadTemp"
                        @childrenFun="oldPhotosTabUrl"
                        :limit="limit"
                        :shop="isShop"
                        :root="'shop'" />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="座位"
                   class="summary"
                   name="shopPlace">
        <place-main :enable="showPanle.shopPlace"
                    :merchants="{ merchant_id: merchant_id, shop_id: shop_id }" />
      </el-tab-pane>
      <el-tab-pane label="商品"
                   class="summary"
                   name="shopGoods">
        <goods :enable="showPanle.shopGoods"
               :merchants="{ merchant_id: merchant_id, shop_id: shop_id }" />
      </el-tab-pane>
      <!-- <el-tab-pane label="套餐" class="summary" name="shopGroups">
        <group
          ref="shopGroupComponent"
          :enable="showPanle.shopGroups"
          :merchants="{ merchant_id: merchant_id, shop_id: shop_id }"
        />
      </el-tab-pane> -->

      <el-tab-pane label="员工"
                   name="shopStaff">
        <staff-main :enable="showPanle.shopStaff"
                    :merchants="{ merchant_id: merchant_id, shop_id: shop_id }" />
      </el-tab-pane>
      <el-tab-pane label="打印机"
                   name="shopPrint">
        <print-manage :enable="showPanle.shopPrint"
                      :merchants="{ merchant_id: merchant_id, shop_id: shop_id }" />
      </el-tab-pane>
      <el-tab-pane label="电话记录"
                   name="shopPhone">
        <shop-phone :enable="showPanle.shopPhone"
                    :shop_id="Number(shop_id)" />
      </el-tab-pane>

      <!-- <el-tab-pane label="营业执照">
        <div class="photosTab">
          <img width="100%" :src="shopDatas.svg" alt="">
        </div>
        <uploadFiles class="uploadTemp" />
      </el-tab-pane> -->
    </el-tabs>

    <el-dialog title="位置标注"
               :visible.sync="mapForAdd.dialogVisible"
               custom-class="baidu-map"
               width="80%"
               @opened="showShopMap">
      <amap v-if="mapForAdd.dialogVisible"
            ref="aMap"
            @chooseLocation="chooseLocation"
            :address="form.name" />
    </el-dialog>

    <el-dialog title="大图预览"
               :visible.sync="imgDialogVisible"
               width="50%">
      <el-carousel :autoplay="false"
                   indicator-position="none"
                   arrow="always"
                   height="600px"
                   :initial-index="imgIndex"
                   v-if="imgDialogVisible">
        <el-carousel-item v-for="(item, index) in fileList"
                          :key="index">
          <div class="imgbox">
            <el-image style="height: 600px; width: auto"
                      fit="contain"
                      :src="item.album_path.split('!')[0]"></el-image>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>

    <!-- 返回上一页 -->
    <go-back v-if="showBack"></go-back>
    <el-backtop target=".main-container"
                :bottom="showBack ? 105 : 40"></el-backtop>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
//import baiduMaps from "@/components/BaiduMap";
import uploadFiles from "@/components/uploadFiles";
import uploadVideo from "@/components/uploadFiles/videoUpload";
import citySelect from "@/components/citySelect";
import searchCity from "@/components/citySelectEX/shopSearchCity.vue";
//import draggable from "vuedraggable";
import store from "@/store";
import goods from "@/views/goods/components/goods.vue";
import group from "@/views/goods/components/group.vue";
import PlaceMain from "@/views/shopset/components/PlaceMain.vue";
import staffMain from "@/views/staff/components/staffMain.vue";
import printManage from "@/views/shopset/components/printManage.vue";
import shopPhone from "@/views/shopset/ShopPhone.vue";
import amap from "@/components/Amap";
import uploadSvg from "@/components/uploadSvg";
import uploadFile from "@/components/uploadFile";
import tagItem from "./components/tagItem";
export default {
  name: "shopInfo",
  components: {
    citySelect,
    searchCity,
    //baiduMaps,
    uploadFiles,
    uploadVideo,
    //draggable,
    goods,
    group,
    PlaceMain,
    staffMain,
    printManage,
    amap,
    uploadSvg,
    shopPhone,
    uploadFile,
    tagItem,
  },
  data () {
    return {
      showBack: false,
      video_limit: 3, //视频数量限制
      photo_limit: 0, //图片数量限制，0为不限制
      imgIndex: 0, //图片轮播起始位置
      svg_url: "",
      header: {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=--------------------------AAAAA",
          AccessToken: getToken(),
        },
      },
      imageUrl: "",
      showPanle: {
        shopTag: false,
        shopAlbum: false,
        shopGoods: false,
        shopGroups: false,
        shopPlace: false,
        shopStaff: false,
        shopPrint: false,
        shopPhone: false,
      },
      activeName: "shopInfo",
      shop_id: "",
      merchant_id: "",

      isNothing: false, //是否没有找到数据
      imgDialogVisible: false,
      imgUrl: "",
      msg: "商家设置",
      shopInfoData: {},
      logos: [],
      form: {
        type_id: "", // 店铺类型ID
        type_name: "", // 店铺类型名称 *
        name: "", // 商家名称 *
        ename: "", // 商家英文名称 *
        phone: "", // 店铺电话 *
        province_id: "", // 店铺省份ID *
        city_id: "", // 店铺城市ID *
        area_id: "", // 店铺区域ID *
        address: "", // 店铺地址 *
        summary: "", // 简介
        longitude: "", // 经度
        latitude: "", // 纬度
        logo: "", // 店铺logo *
        notice: "", // 店铺公告
        basic_price: null, // 低消,人均 *
        business_start_time: "", // 营业开始时间 *
        business_stop_time: "", // 营业结束时间 *
        reserve_max_duration: "", // 预订最大的时间时长（秒） *
        reserve_time_interval: "", // 预订最大的时间间隔（秒） *
        reserve_auto_audit: "", // 自动审核预订 *
        shopping_auto_audit: "", // 自动审核下单 *
        shopping_pay_online: "", // 单是否开启在线支付 *
        reserve_latest_arrive: "", //预定最迟到达时间
        reserve_choose_place: 0,
        business_status: 1, //1营业中，0暂停营业
        status_desc: "",
        status: null, //审核状态
        vr: null,
        vr_url: "",
        svg: null,
        svg_url: "",
        choose_place: null, //是否支持选座
        choose_time: null, //是否支持选座到达时间段
        group_buy_num: null, //拥有套餐数量
        refund: null, //是否支持退款
        menu: null,
        vertify_remark: "",
      },
      rules: {
        business_start_time: [
          { required: true, message: "请选择营业开始时间", trigger: "change" },
        ],
        business_stop_time: [
          { required: true, message: "请选择营业结束时间", trigger: "change" },
        ],
        address: [{ required: true, message: "请填写地址", trigger: "blur" }],
        // phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        reserve_max_duration: [
          {
            required: true,
            message: "请输入预订最大的时间时长",
            trigger: "blur",
          },
        ],
        reserve_time_interval: [
          {
            required: true,
            message: "请输入预订最大的时间间隔",
            trigger: "blur",
          },
        ],
        basic_price: [
          { required: true, message: "请输入人均消费", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        reserve_latest_arrive: [
          {
            required: true,
            message: "请输入预定最迟到达时间",
            trigger: "blur",
          },
        ],
        reserve_auto_audit: [
          { required: true, message: "请勾选自动审核预订", trigger: "change" },
        ],
        shopping_auto_audit: [
          { required: true, message: "请勾选自动审核下单", trigger: "change" },
        ],
        shopping_pay_online: [
          {
            required: true,
            message: "请选择下单是否开启在线支付",
            trigger: "change",
          },
        ],
        reserve_choose_place: [
          {
            required: true,
            message: "请选择预订是否支持选位",
            trigger: "change",
          },
        ],
        business_status: [
          { required: true, message: "请设置营业状态", trigger: "change" },
        ],
        notice: [
          { required: true, message: "请输入暂停营业公告", trigger: "change" },
        ],
        status: [
          { required: true, message: "请设置审核状态", trigger: "change" },
        ],
        vr_url: [
          { required: true, message: "请设置VR链接", trigger: "change" },
        ],
        //group_buy_num: [{ type: "number", message: "必须为数字值" }],
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
      openTimeArea: [
        new Date(2016, 9, 10, 0, 11),
        new Date(2016, 9, 10, 23, 59),
      ], // 营业结束时间
      shopTypeList: [],
      shopAlbumSort: {
        fileList: [],
        videoList: [],
      },
      uploadData: {},
      locationData: {},
      areaTitle: "选择店铺区域", // 店铺区域名称
      shopAreaName: "", // 店铺区域名称
      value: "",
      shopDatas: "",
      imgUrl: "",
      dialogImgVisible: true,
      dialogImageUrl: [],
      drawer: false,
      fileList: [],
      fileListOne: [],
      videoList: [],
      limit: 100,
      limitOne: 1,
      isShop: true,
      isPhone: /^([0-9]{3,4}-)?[0-9]{7,8}$/,
      isMob: /^1[3456789]\d{9}$/,
      isError: false,
      validRule: /^\d[\d\-\;]*$/,
    };
  },
  mounted () { },
  created () {
    console.info("svg");
    // this.imgUrl = window.location.host
    //console.info(process.env.VUE_APP_BASE_API);
    this.showBack = this.$route.query.from ? true : false;
    this.imgUrl = "http://ddhi.oss-cn-hangzhou.aliyuncs.com";
    // console.log(this.imgUrl)
    this.shop_id = this.$route.query.shop_id;
    this.merchant_id = this.$route.query.merchant_id;
    this.activeName = this.$route.query.tab
      ? this.$route.query.tab
      : "shopInfo";
    this.showPanle[this.activeName] = true;
    this.getShopDetail();
    this.getShopType();
  },
  methods: {
    // 校验商家电话的输入
    validatePhone () {
      this.form.phone = this.form.phone.replace(/\s+/g, "");
      if (this.form.phone) {
        if (this.validRule.test(this.form.phone)) {
          this.isError = false;
        } else {
          this.isError = true;
          this.$refs["shopPhone"].focus();
          this.form.phone = "";
          return false;
        }
      } else {
        this.isError = false;
      }
    },
    changeChoose_time (e) {
      if (e == 0) {
        this.form.reserve_latest_arrive = "22:00";
      } else {
        this.form.reserve_latest_arrive = "";
      }
    },
    uploadLogo (v) {
      console.log(v);
      this.form.logo = v;
    },
    //获取子组件传回的SVG地址
    theSVG (val) {
      //this.form.svg = 1;
      //this.form.svg_url = val;
      this.svg_url = this.GetImageOssUrl() + val;
    },
    //剪切后触发方法
    cutDown: function (img) {
      const isLt2M = img.file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message({
          message: "上传失败，图片不能大于2M，请重新选择图片",
          type: "warning",
        });
      } else {
        var formData = new FormData();
        formData.append("file[]", img.file);
        formData.append("root", "shop");
        this.$ajax
          .post("/api/file/uploads", formData, this.header)
          .then((res) => {
            if (res.data.code == 0) {
              this.imageUrl = img.dataURL;
              this.form.logo = res.data.data.url_path[0];
            } else {
              this.imageUrl = "";
              this.form.logo = "";
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
      }
    },
    //拖拽排序
    draggableChangeFile (e) {
      console.info(e);
      for (let i = 0; i < this.fileList.length; i++) {
        this.fileList[i]["album_sort"] = i; //this.shopAlbumSort.fileList[i];
      }
      console.log(this.fileList)
      let dataArr = {
        merchant_id: Number(this.merchant_id),
        shop_id: Number(this.shop_id),
        album: this.fileList,
      };
      console.info(dataArr);

      this.api.shop.PhotoSort(dataArr).then((res) => {
        if (res.code == 0) {
          console.log(res, '拖拽之后--------------------------')
          this.GetPhotosUrl();
        }
      });
    },
    draggableChangeVideo (e) {
      console.info(e);
      let videoIds = [];
      for (let i = 0; i < this.videoList.length; i++) {
        this.videoList[i]["sort"] = i; //this.shopAlbumSort.videoList[i];
        videoIds.push({
          video_id: this.videoList[i]["video_id"],
          sort: this.videoList[i]["sort"],
        });
      }
      let dataArr = {
        merchant_id: Number(this.merchant_id),
        shop_id: Number(this.shop_id),
        video: videoIds,
      };
      console.info(dataArr);

      this.api.shop.VideoSort(dataArr).then((res) => {
        //this.$store.dispatch("shop/updatePic", data).then((res) => {
        this.GetVideosUrl();
      });
    },
    tabsFun (e) {
      if (e.index == "2") {
        this.GetPhotosUrl();
        this.GetVideosUrl();
      } else if (e.index == "1") {
        // 标签逻辑
      } else if (e.index == "3" && this.showPanle["shopGroups"]) {
        this.$refs.shopGroupComponent.reloadData();
      }
      this.showPanle[e.name] = true;
    },
    /* 获取店铺详情 */
    getShopDetail () {
      this.fileListOne = [];
      let datas = { merchant_id: this.merchant_id, shop_id: this.shop_id };

      //this.$store.dispatch('shop/getShopDetail', data).then((res) => {
      this.api.shop.getShopDetail(datas).then(
        ({ data }) => {
          // sessionStorage.setItem('shopDetail', JSON.stringify(res.data))
          let res = data;
          this.shopDatas = res.data;
          this.dialogImageUrl = res.data.album;
          var img = res.data.logo;
          this.imageUrl = res.data.logo;
          this.logos = [res.data.logo];
          this.$refs.uploadImg1.concert(this.imageUrl);
          var imgArr = img.split(",");
          imgArr.forEach((item) => {
            let obj = new Object();
            obj.url = item;
            this.fileListOne.push(obj);
          });
          // console.log('shopDatas:', this.shopDatas)
          this.form = {
            type_id: this.shopDatas.type_id, // 店铺类型ID
            type_name: this.shopDatas.type_name, // 店铺类型名称
            name: this.shopDatas.name, // 商家名称
            ename: this.shopDatas.ename, // 商家名称
            phone: this.shopDatas.phone, // 店铺电话
            province_id: this.shopDatas.province_id, // 店铺省份ID
            city_id: this.shopDatas.city_id, // 店铺城市ID
            area_id: this.shopDatas.area_id, // 店铺区域ID
            address: this.shopDatas.address, // 店铺地址
            summary: this.shopDatas.summary, // 简介
            longitude: this.shopDatas.longitude, // 经度
            latitude: this.shopDatas.latitude, // 纬度
            logo: this.shopDatas.logo, // 店铺logo
            notice: this.shopDatas.notice, // 店铺公告
            basic_price: this.shopDatas.basic_price / 100, // 低消,人均
            reserve_max_duration: this.shopDatas.reserve_max_duration / 3600, // 预订最大的时间时长（秒）
            reserve_time_interval: this.shopDatas.reserve_time_interval / 3600, // 预订最大的时间间隔（秒）
            reserve_auto_audit: this.shopDatas.reserve_auto_audit === 1, // 自动审核预订
            shopping_auto_audit: this.shopDatas.shopping_auto_audit === 1, // 自动审核下单
            shopping_pay_online: this.shopDatas.shopping_pay_online === 1, // 单是否开启在线支付
            business_start_time: this.shopDatas.business_start_time, // 营业开始时间
            business_stop_time: this.shopDatas.business_stop_time, // 营业结束时间
            business_status: this.shopDatas.business_status, // 营业状态
            reserve_choose_place: this.shopDatas.reserve_choose_place,
            reserve_latest_arrive: this.shopDatas.reserve_latest_arrive,
            status_desc: this.shopDatas.status_desc,
            status: this.shopDatas.status,
            vr: this.shopDatas.vr,
            vr_url: this.shopDatas.vr_url,
            svg: this.shopDatas.svg,
            svg_url: this.shopDatas.svg_url,
            reserve: this.shopDatas.reserve,
            choose_place: this.shopDatas.choose_place,
            choose_time: this.shopDatas.choose_time,
            group_buy_num: this.shopDatas.group_buy_num,
            refund: this.shopDatas.refund,
            menu: this.shopDatas.menu,
            vertify_remark: this.shopDatas.vertify_remark,
          };
          this.svg_url = this.shopDatas.svg_url;
          this.locationData = {
            lng: this.form.longitude,
            lat: this.form.latitude,
            name: this.form.name,
            position: [this.form.longitude, this.form.latitude],
            address: this.form.address,
          };

          this.shopAreaName =
            this.shopDatas.province + this.shopDatas.city + this.shopDatas.area;
          if (this.activeName == "shopAlbum") {
            this.GetPhotosUrl();
            this.GetVideosUrl();
          }

          //设置视频上传必要数据和一些异步操作。
          this.$nextTick(() => {
            this.$refs.uploadVideo.setUploadInfo({
              merchant_id: this.merchant_id,
              shop_id: this.shop_id,
              title: this.form.name,
            });

            this.$refs.searchCity.getProvince(
              this.shopDatas.province_id,
              this.shopDatas.city_id,
              this.shopDatas.area_id
            );
          });
        },
        (error) => {
          this.isNothing = true;
        }
      );
    },

    // 获取城市列表
    openCitySelect () {
      this._setVuex("showCitySelectBox", true);
    },
    // 获取子组件返回的区域名称
    setCityAreaName (areaName) {
      console.info(areaName);
      // this.shopAreaName =
      //   areaName.province.name + areaName.city.name + areaName.area.name;
      this.form.province_id = areaName.province_id;
      this.form.city_id = areaName.city_id;
      this.form.area_id = areaName.area_id;
    },
    // 获取店铺类型
    getShopType () {
      this.$store.dispatch("shop/getShopType").then((res) => {
        sessionStorage.setItem("shopType", JSON.stringify(res.data));
        this.shopTypeList = res.data;
      });
    },
    /* 设置店铺类型 */
    setShopType (item) {
      this.form.type_id = item.type_id;
      // console.log(this.form)
      // this.form.type_name = item.name
    },
    /* 修改店铺信息 */
    updatedShop (type, formName) {
      const formDatas = this.form;
      const infoDatas = {
        type_id: formDatas.type_id, // 店铺类型ID
        type_name: formDatas.type_name, // 店铺类型名称
        name: formDatas.name, // 商家名称
        ename: formDatas.ename, // 商家英文名称
        phone: formDatas.phone, // 店铺电话
        province_id: Number(formDatas.province_id), // 店铺省份ID
        city_id: Number(formDatas.city_id), // 店铺城市ID
        area_id: Number(formDatas.area_id), // 店铺区域ID
        address: formDatas.address, // 店铺地址
        summary: formDatas.summary, // 简介
        longitude: formDatas.longitude, // 经度
        latitude: formDatas.latitude, // 纬度
        logo: this.GetImageUrl(formDatas.logo), // 店铺logo
        notice: formDatas.notice, // 店铺公告
        basic_price: formDatas.basic_price * 100, // 低消,人均
        reserve_max_duration: Number(formDatas.reserve_max_duration) * 3600, // 预订最大的时间时长（秒）
        reserve_time_interval: Number(formDatas.reserve_time_interval) * 3600, // 预订最大的时间间隔（秒）
        reserve_auto_audit: formDatas.reserve_auto_audit ? 1 : 0, // 自动审核预订
        shopping_auto_audit: formDatas.shopping_auto_audit ? 1 : 0, // 自动审核下单
        shopping_pay_online: formDatas.shopping_pay_online ? 1 : 0, // 单是否开启在线支付
        business_start_time: formDatas.business_start_time, // 营业开始时间
        business_stop_time: formDatas.business_stop_time, // 营业结束时间
        business_status: formDatas.business_status, // 营业状态
        choose_time: formDatas.choose_time,
        reserve_latest_arrive:
          formDatas.choose_time == 0 ? formDatas.reserve_latest_arrive : "",
        reserve_choose_place: formDatas.reserve_choose_place,
        merchant_id: this.merchant_id,
        shop_id: this.merchant_id,
        status_desc: formDatas.status_desc,
        status: formDatas.status,
        vr: formDatas.vr,
        vr_url: formDatas.vr_url,
        svg: formDatas.svg,
        svg_url: formDatas.svg_url,
        reserve: formDatas.reserve,
        choose_place: formDatas.choose_place,
        //group_buy_num: formDatas.group_buy_num,
        refund: formDatas.refund,
        menu: formDatas.menu,
        vertify_remark: formDatas.vertify_remark,
      };

      const summaryDatas = {
        summary: formDatas.summary,
        merchant_id: this.merchant_id,
        shop_id: this.merchant_id,
      };

      const noticeyDatas = {
        notice: formDatas.notice,
        merchant_id: this.merchant_id,
        shop_id: this.merchant_id,
      };

      const datas =
        type === "info"
          ? infoDatas
          : type === "summary"
            ? summaryDatas
            : noticeyDatas;
      // console.info("提交数据", datas);
      // return false;
      if (type === "info") {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log('kkk', datas)
            this.$store.dispatch("shop/updateShop", datas).then((res) => {
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.getShopDetail();
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$store.dispatch("shop/updateShop", datas).then((res) => {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getShopDetail();
        });
      }
    },
    // 打开地图
    selectLocation (e) {
      this.mapForAdd.dialogVisible = !this.mapForAdd.dialogVisible;
    },
    //打开地图对话框后回调，调用组件方法设置店铺地址信息
    showShopMap () {
      this.$refs.aMap.setLocation({
        position: [this.form.longitude, this.form.latitude],
        address: this.form.address,
        name: this.form.name,
        lat: this.form.latitude,
        lng: this.form.longitude,
        city: this.form.city_id,
      });
    },
    // 关闭地图
    closeMaps (str) {
      this.mapForAdd.dialogVisible = str;
    },
    // 地图组件返回url
    logoUrl (url) {
      // console.log('url1111',url)
      this.form.logo = url;
    },
    //剪切后触发方法
    cutDown2: function (img) {
      const isLt2M = img.file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message({
          message: "上传失败，图片不能大于2M，请重新选择图片",
          type: "warning",
        });
      } else {
        var formData = new FormData();
        formData.append("file[]", img.file);
        formData.append("root", "shop");
        this.$ajax
          .post("/api/file/uploads", formData, this.header)
          .then((res) => {
            if (res.data.code == 0) {
              this.photosTabUrl(res.data.data.url_path[0], 0);
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
      }
    },
    // 组件返回url
    photosTabUrl (url, types) {
      let type = Number(types);
      let data = [];
      if (type == 0) {
        // console.log('232323')
        data = {
          merchant_id: this.merchant_id,
          shop_id: this.shop_id,
          data: [
            {
              album_path: url,
              album_sort: this.fileList.length,
              album_type: 0, //0图片
            },
          ],
        };
      } else {
        data = {
          merchant_id: this.merchant_id,
          shop_id: this.shop_id,
          data: [
            {
              album_path: url[url.length - 1].toString(),
              album_sort: this.videoList.length,
              album_type: 1, //1视频
            },
          ],
        };
      }
      this.api.shop.PhotoInsert(data).then((result) => {
        let res = result.data;
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.GetPhotosUrl();
      });
    },
    //获取图片列表
    GetPhotosUrl (url) {
      this.fileList = [];
      const data = {
        page_size: 10000,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      //获得照片列表
      this.api.shop.shopalbumList(data).then((result) => {
        //this.$store.dispatch("shop/getShopImg", data).then((res) => {
        // console.log('getPhotos:',res)
        this.shopAlbumSort.fileList = [];
        let res = result.data;
        let arr = res.data;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].album_type == 0) {
            let obj = new Object();
            obj = arr[i];
            obj.status = false;
            this.fileList.push(obj);
            this.shopAlbumSort["fileList"].push(obj.album_sort);
          }
        }

        //this.shopAlbumSort{}
      });
    },
    //获得视频列表
    GetVideosUrl () {
      this.videoList = [];
      const data = {
        page_size: 10000,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
      };
      this.api.shop.shopVideoList(data).then((result) => {
        this.shopAlbumSort.videoList = [];
        let res = result.data;
        if (res.data) {
          let arr = res.data;
          for (var i = 0; i < arr.length; i++) {
            this.videoList.push(arr[i]);
            this.shopAlbumSort.videoList.push(arr[i].sort);
          }
        }
      });
    },
    videoMouseover (index) {
      for (var i = 0; i < this.videoList.length; i++) {
        if (i == index) {
          this.videoList[i].status = true;
        }
      }
    },
    videoMouseleave (index) {
      for (var i = 0; i < this.videoList.length; i++) {
        if (i == index) {
          this.videoList[i].status = false;
        }
      }
    },
    picMouseover (index) {
      for (var i = 0; i < this.fileList.length; i++) {
        if (i == index) {
          this.fileList[i].status = true;
        }
      }
    },
    picMouseleave (index) {
      for (var i = 0; i < this.fileList.length; i++) {
        if (i == index) {
          this.fileList[i].status = false;
        }
      }
    },
    deleteVideoFun (id) {
      this.$confirm("确定要删除吗？", "提示")
        .then(() => {
          var idArr = [];
          idArr.push(id);
          var data = {
            video_id: idArr,
            shop_id: this.shop_id,
          };
          this.api.shop.shopVideoDelete(data).then((result) => {
            let res = result.data;
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
            this.GetVideosUrl();
          });
        })
        .catch(() => { });
    },
    deletePotoFun (id) {
      this.$confirm("确定要删除吗？", "提示")
        .then(() => {
          var idArr = [];
          idArr.push(id);
          var data = {
            id: idArr,
            merchant_id: this.merchant_id,
            shop_id: this.shop_id,
          };
          this.api.shop.PhotoDelete(data).then((result) => {
            let res = result.data;
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
            this.GetPhotosUrl();
          });
        })
        .catch(() => { });
    },
    showImg (imgUrl, i) {
      console.info(i);
      this.imgIndex = i;
      this.imgUrl = imgUrl;
      this.imgDialogVisible = true;
    },
    // 地图中选择位置
    chooseLocation (obj) {
      this.locationData = obj;
      this.form.latitude = obj.lat;
      this.form.longitude = obj.lng;
      //this.form.address = obj.province + obj.city + obj.district + obj.addr;
      this.form.address = obj.address;
      this.mapForAdd.dialogVisible = false;
    },

    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    handleOpenOrder () {
      //this.$message.warning("尚未开通...");
      this.$router.push({
        path: "/bookingList",
        query: {
          merchant_id: this.merchant_id,
          shop_id: this.shop_id,
          from: "shopInfo",
        },
      });
    },
    // 组件返回url
    oldPhotosTabUrl (url, types) {
      // console.log(url);
      this.photosTabUrl(url[url.length - 1], 0);
      // let type = Number(types)
      // let data = []
      // if (type == 1) {
      //   var upData = new FormData()
      //   upData.append('upload', url, url.name)
      //   upData.append('is_confirmed', true)
      //   this.$store.dispatch('shop/uploadPlaceSvg', upData).then((res) => {
      //     this.$message({
      //       message: '' + res.msg,
      //       type: 'success'
      //     });
      //     this.fileListSvg = []
      //     this.getShopDetail()
      //   })
      // } else {
      //   if (type == 0) {
      //     // console.log('232323')
      //     data = [{
      //       album_path: url[url.length - 1].toString(),
      //       album_sort: this.fileList.length,
      //       album_type: 0//0图片，1视频
      //     }]
      //   } else {
      //     data = [{
      //       album_path: url[url.length - 1].toString(),
      //       album_sort: this.videoList.length,
      //       album_type: 1//0图片，1视频
      //     }]
      //   }
      //   this.$store.dispatch('shop/insertShopImg', data).then((res) => {
      //     this.$message({
      //       message: '' + res.msg,
      //       type: 'success'
      //     });
      //     this.GetPhotosUrl()
      //   })
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-upload-list--picture-card .el-upload-list__item-actions,
.el-upload-list--picture-card,
.el-upload-list__item {
  display: none !important;
}
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.comimg {
  width: 150px;
  height: 150px;
}
.el-button--primary,
.btn-primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
.shopSet {
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  font-size: 20px;
  margin: 15px;
  min-height: 800px;
  background: #fff;
  .photosTab {
    display: flex;
    flex-flow: row wrap;
    img {
      width: 400px;
      border: 1px solid #eee;
    }
  }
  .el-tabs--border-card {
    border-bottom: none !important;
    box-shadow: none !important;
  }
  .el-form {
    .updateNotice {
      margin-top: 20px;
    }
  }
  .basicInfo {
    .el-form-item {
      width: 50% !important;
      .el-input {
        min-width: 200px !important;
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
      .uploadTemp {
        width: 50%;
      }
      .form-shan {
        margin-left: 10px;
        font-size: 14px;
        color: rgb(170, 170, 170);
      }
      .tip-i {
        font-size: 20px;
        margin-left: 8px;
        position: relative;
        top: 2px;
      }
    }
  }
  .photo-title {
    margin: 0 0 10px 0;
  }
  .img-div {
    width: 148px;
    display: inline-block;
    margin: 0 6px 4px 0;
    position: relative;
    z-index: 0;
    .d-img {
      width: 146px;
      height: 146px;
      display: inline-block;
      border: 1px solid #eeeeee;
      border-radius: 6px;
    }
    .v-img {
      width: 146px;
      height: 146px;
      display: inline-block;
      border: 1px solid #eeeeee;
      border-radius: 6px;
    }
    .del-icon {
      position: absolute;
      z-index: 1;
      top: 10px;
      right: 10px;
      width: 24px;
      height: 24px;
      border-radius: 100%;
      line-height: 24px;
      text-align: center;
      background: #000;
      opacity: 0.4;
    }
    .del-icon2 {
      position: absolute;
      z-index: 2;
      top: 10px;
      right: 10px;
      width: 24px;
      height: 24px;
      border-radius: 100%;
      line-height: 24px;
      text-align: center;
      .delete-i {
        font-size: 12px !important;
        color: #ffffff;
        position: relative;
        top: -2px;
        line-height: 24px !important;
      }
    }
  }
  .videoBox {
    margin-bottom: 50px;
  }
  .imgd-box {
    text-align: center;
  }
}
</style>
