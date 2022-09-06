<template>
  <div>
    <div class="shopSet">
      <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
      <el-form ref="searchForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="店铺名称">
              <el-input class="searchInput"
                        style="width: 80%"
                        clearable
                        placeholder="请输入名称或ID"
                        v-model="searchValue"
                        @change="screening"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="营业状态">
              <el-select v-model="business_status"
                         placeholder="选择营业状态">
                <el-option label="全部"
                           :value="null"></el-option>
                <el-option v-for="item in business_statusData"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="商家类型">
              <el-select v-model="type_id"
                         placeholder="选择商家类型">
                <el-option label="全部"
                           :value="null"></el-option>
                <el-option v-for="item in type_idData"
                           :key="item.type_id"
                           :label="item.type_name"
                           :value="item.type_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="地区">
              <searchCity ref="searchCity"
                          :returnValue="true"
                          :isAll="true"
                          :showArea="true"
                          @setCityAreaName="searchCity" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="审核状态">
              <el-select v-model="status"
                         placeholder="请选择">
                <el-option label="全部"
                           :value="null"></el-option>
                <el-option v-for="item in statusData"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="人均">
              <el-input placeholder="最低金额"
                        v-model="amount_min"
                        clearable></el-input>
              -
              <el-input placeholder="最高金额"
                        v-model="amount_max"
                        clearable></el-input>
              <el-button type="primary"
                         @click="screening"
                         style="margin-left: 10px">筛选</el-button>
              <el-button type="info"
                         @click="resetData">清空条件</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="shopSet">
      <div class="add-box">
        <!-- <el-button type="danger" @click="abc">删除</el-button> -->
        <div v-if="isDeletePage == '0'">
          <el-button type="primary"
                     @click="insertDialogtk">新增</el-button>
          <el-button type="danger"
                     @click="handleShopDelete"
                     :disabled="!multipleSelection.length > 0">删除</el-button>
          <el-button type="warning"
                     plain
                     @click="handlePageShowType(1)">回收站</el-button>
        </div>
        <div v-if="isDeletePage == '1'">
          <el-button type="primary"
                     @click="handlePageShowType(0)">返回</el-button>
          <el-button @click="handleShopRecovery"
                     :disabled="!multipleSelection.length > 0">还原</el-button>
        </div>
        <!-- <el-button type="danger" @click="bathcDelete">批量修改</el-button> -->
      </div>
      <el-table ref="multipNum"
                stripe
                :data="tableListData"
                v-loading="loading"
                tooltip-effect="dark"
                :default-sort="defaultSort"
                style="width: 100%"
                @selection-change="selectItem"
                @sort-change="handleShopSort"
                @filter-change="handleFilter">
        <el-table-column type="selection"
                         width="55" />
        <el-table-column prop="shop_id"
                         label="全选/ID"
                         width="100"
                         sortable="true">
          <template slot-scope="scope">
            <span>{{ scope.row.shop_id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="logo"
                         label="店铺图片"
                         width="80">
          <template slot-scope="scope">
            <el-image :src="scope.row.logo"
                      @click="
                showImglist(scope.row.logo.split('!logo')[0], scope.row.name)
              "></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name"
                         label="名称"
                         width="300">
          <template slot-scope="scope">
            <div @click="openShopInfo(scope.row)"
                 style="cursor: pointer">
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type_id"
                         label="类型"
                         sortable="true">
          <template slot-scope="scope">
            {{ getShopType(scope.row.type_id) }}
          </template>
        </el-table-column>
        <el-table-column label="人均"
                         prop="basic_price"
                         sortable="true">
          <template slot-scope="scope">
            <span style="color: #e6a23c">{{ scope.row.basic_price }}</span>
          </template>
        </el-table-column>

        <el-table-column label="评论"
                         prop="evaluate_count"
                         sortable="true">
          <template slot-scope="scope">
            <span style="color: #67c23a; cursor: pointer"
                  @click="toList(scope.row.shop_id, 0)">{{ scope.row.evaluate_count }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="report_count"
                         label="举报"
                         sortable="true">
          <template slot-scope="scope">
            <span style="color: #409eff; cursor: pointer"
                  @click="toList(scope.row.shop_id, 1)">{{ scope.row.report_count }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="view_count"
                         label="访问数" />
        <el-table-column prop="city"
                         label="地区"
                         sortable="true">
          <template slot-scope="scope">
            {{ scope.row.province }} {{ scope.row.city }} {{ scope.row.area }}
          </template>
        </el-table-column>
        <el-table-column label="营业时间">
          <template slot-scope="scope">
            {{ scope.row.business_format_time }}
          </template>
        </el-table-column>
        <el-table-column label="营业状态"
                         sortable="true">
          <template slot-scope="scope">
            <span :style="{
                color: scope.row.business_status == 0 ? '#F56C6C' : '#000',
              }">{{
                business_statusData[scope.row.business_status]["name"]
              }}</span>
          </template>
        </el-table-column>
        <el-table-column label="店铺状态"
                         sortable="true">
          <template slot-scope="scope">
            <span :style="{
                color:
                  scope.row.status == 0
                    ? '#F56C6C'
                    : scope.row.status == 2
                    ? '#E6A23C'
                    : '#000',
              }">{{ statusData[scope.row.status]["name"] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="vertify_remark"
                         label="审核备注"></el-table-column>
        <!-- <el-table-column
          label="审核状态"
          sortable="true"
          :filter-multiple="false"
          :filters="[
            { text: '禁用', value: 0 },
            { text: '正常显示', value: 1 },
            { text: '审核中', value: 2 },
          ]"
        >
          <template slot-scope="scope">
            <span
              :style="{
                color: scope.row.status == 0 ? '#F56C6C' : '#000',
              }"
              >{{ statusData[scope.row.status]["name"] }}</span
            >
          </template>
        </el-table-column> -->

        <el-table-column align="center"
                         label="操作"
                         width="330">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini"
                         @click="openShopInfo(scope.row)">详情</el-button>
              <el-button size="mini"
                         @click="openConsoler(scope.row)">控制台</el-button>
              <el-button v-if="isDeletePage == '0'"
                         size="mini"
                         type="danger"
                         @click="btnShopDelete(scope.row.shop_id)">删除</el-button>
              <el-button v-if="isDeletePage == '1'"
                         size="mini"
                         type="primary"
                         @click="btnShopRecovery(scope.row.shop_id)">还原</el-button>
            </el-button-group>
            <el-dropdown trigger="click"
                         style="margin-left: 10px"
                         @command="handleShopCommand">
              <el-button size="mini">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{ command: 'openAlbum', row: scope.row }">相册</el-dropdown-item>
                <el-dropdown-item :command="{ command: 'seatJump', row: scope.row }">座位</el-dropdown-item>
                <el-dropdown-item :command="{ command: 'openGoods', row: scope.row }">商品</el-dropdown-item>
                <!-- <el-dropdown-item
                  :command="{ command: 'packageJump', row: scope.row }"
                  >套餐</el-dropdown-item
                > -->
                <!-- <el-dropdown-item
                  :command="{ command: 'orderJump', row: scope.row }"
                  >订单</el-dropdown-item
                > -->
                <el-dropdown-item :command="{ command: 'employeesJump', row: scope.row }">员工</el-dropdown-item>
                <el-dropdown-item :command="{ command: 'printJump', row: scope.row }">打印机</el-dropdown-item>
                <el-dropdown-item :command="{ command: 'shopPhone', row: scope.row }">电话记录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination ref="pagination"
                       :current-page="curPage"
                       :hide-on-single-page="true"
                       @prev-click="pageChange(curPage - 1)"
                       @current-change="pageChange"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size.sync="page_size"
                       @size-change="handlePageSizeChange"
                       @next-click="pageChange(curPage + 1)"
                       background
                       layout="sizes,prev, pager, next,jumper"
                       :total="total"></el-pagination>
      </div>
    </div>
    <!-- 新增内容 -->
    <el-dialog title="新增"
               :visible.sync="insertDialog"
               destroy-on-close
               :close-on-press-escape="false"
               :close-on-click-modal="false">
      <el-form :model="addItem"
               :rules="rules"
               ref="insertItem"
               label-width="180px"
               class="updateArea"
               style="height: 60vh; overflow: auto">
        <el-form-item label="店铺名称"
                      prop="name">
          <el-input v-model="addItem.name"
                    style="width: 400px !important" />
        </el-form-item>
        <el-form-item label="店铺类型"
                      prop="type_id">
          <el-select v-model="addItem.type_id"
                     placeholder="请选择店铺类型">
            <el-option v-for="item in shopTypeList"
                       :key="item.type_id"
                       :label="item.type_name"
                       :value="item.type_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营业时间"
                      prop="business_start_time">
          <el-time-picker v-model="addItem.business_start_time"
                          clearable
                          value-format="HH:mm"
                          format="HH:mm"
                          :default-value="new Date('Mon Sep 01 2020 00:00:00 GMT+0800')"
                          :picker-options="{
              selectableRange: '00:00:00 - 23:59:00',
            }"
                          placeholder="选择开始时间"></el-time-picker>
          -
          <el-time-picker v-model="addItem.business_stop_time"
                          clearable
                          value-format="HH:mm"
                          format="HH:mm"
                          :default-value="new Date('Mon Sep 01 2020 00:00:00 GMT+0800')"
                          :picker-options="{
              selectableRange: '00:00:00 - 23:59:00',
            }"
                          placeholder="选择结束时间"></el-time-picker>
        </el-form-item>
        <!-- <el-form-item label="店铺英文简称" prop="ename">
          <el-input v-model="addItem.ename" />
        </el-form-item> -->
        <el-form-item label="省市区">
          <citySelectex ref="citySelectex"
                        @setCityAreaName="setCityAreaName" />
        </el-form-item>
        <el-form-item label="地址"
                      prop="address">
          <el-input v-model="addItem.address">
            <el-button slot="append"
                       @click="selectLocation">定位</el-button>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="描述" prop="summary">
          <el-input v-model="addItem.summary" style="width: 400px !important" />
        </el-form-item> -->
        <el-form-item label="商家电话"
                      prop="phone">
          <el-input ref="shopPhone"
                    v-model="addItem.phone"
                    style="width: 400px !important"
                    placeholder="暂无电话"
                    @keyup.native="validatePhone" />
          <div class="form-shan"
               style="color: #666">
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
          <el-input v-model="addItem.basic_price" />
        </el-form-item>
        <!-- <el-form-item label="预定自动审核" prop="reserve_auto_audit">
          <el-switch
            v-model="addItem.reserve_auto_audit"
            active-text="开启"
            inactive-text="关闭"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="点单自动审核" prop="shopping_auto_audit">
          <el-switch
            active-text="开启"
            inactive-text="关闭"
            v-model="addItem.shopping_auto_audit"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="在线支付" prop="shopping_pay_online">
          <el-switch
            active-text="开启"
            inactive-text="关闭"
            v-model="addItem.shopping_pay_online"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
        </el-form-item> -->
        <!-- <el-form-item label="评分" prop="score">
          <el-input v-model="addItem.score" />
        </el-form-item> -->
        <!-- <el-form-item label="logo图" prop="logo">
          <uploadFiles ref="uploadImg" @theIMG="theIMG" root="shop" />
        </el-form-item> -->
        <el-form-item label="店铺logo"
                      prop="logo">
          <uploadFiles class="uploadTemp"
                       ref="uploadImg1"
                       @theIMG="uploadLogo"
                       root="shop"
                       :defaltIcon="1" />
          <!-- <img class="comimg" v-if="imageUrl" :src="imageUrl" />
          <Imgcutter
            @cutDown="cutDown"
            :boxHeight="600"
            :cutWidth="500"
            :cutHeight="500"
            :sizeChange="false"
          ></Imgcutter> -->
        </el-form-item>
        <el-form-item label="营业状态"
                      prop="business_status">
          <el-radio-group v-model="addItem.business_status">
            <el-radio :label="0">暂停营业</el-radio>
            <el-radio :label="1">正常营业</el-radio>
            <el-radio :label="2">待营业</el-radio>
            <el-radio :label="3">永久停业</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="addItem.business_status == 0"
                      label="暂停营业公告">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="请输入内容"
                    v-model="addItem.notice">
          </el-input>
        </el-form-item>

        <el-form-item label="店铺状态"
                      prop="status">
          <el-radio-group v-model="addItem.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常显示</el-radio>
            <el-radio :label="2">待初审</el-radio>
            <el-radio :label="3">待复审</el-radio>
          </el-radio-group>
          <div>
            <el-input style="width: 400px"
                      type="textarea"
                      :rows="2"
                      placeholder="审核备注，仅管理人员查看。"
                      v-model="addItem.vertify_remark"></el-input>
          </div>
        </el-form-item>

        <!-- <el-form-item label="销量" prop="order_all_count">
          <el-input v-model="addItem.order_all_count" />
        </el-form-item>
        <el-form-item label="平台佣金比" prop="commission_rate">
          <el-input v-model="addItem.commission_rate" />
        </el-form-item>
        <el-form-item label="允许最大预订天数" prop="reserve_days">
          <el-input v-model="addItem.reserve_days" />
        </el-form-item> -->

        <!-- <el-form-item label="预订是否支持选位" prop="reserve_choose_place">
          <el-select
            v-model="addItem.reserve_choose_place"
            placeholder="请选择状态"
          >
            <el-option key="0" label="关闭" value="0"></el-option>
            <el-option key="1" label="开启" value="1"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="是否允许周末取酒" prop="week_take_out_wine">
          <el-select
            v-model="addItem.week_take_out_wine"
            placeholder="请选择状态"
          >
            <el-option key="0" label="不允许" value="0"></el-option>
            <el-option key="1" label="允许" value="1"></el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="是否支持VR"
                      prop="vr">
          <el-radio-group v-model="addItem.vr">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="addItem.vr == 1"
                      label="VR地址">
          <el-input placeholder="请输入VR地址"
                    v-model="addItem.vr_url">
          </el-input>
        </el-form-item>

        <el-form-item label="是否预定"
                      prop="reserve">
          <el-radio-group v-model="addItem.reserve">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否支持选座"
                      prop="choose_place">
          <el-radio-group v-model="addItem.choose_place">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否支持选择到达时间段"
                      prop="choose_time">
          <el-radio-group v-model="addItem.choose_time"
                          @change="changeChoose_time">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="addItem.choose_time == 0"
                      label="预订最晚到达时间"
                      prop="reserve_latest_arrive">
          <el-time-picker v-model="addItem.reserve_latest_arrive"
                          value-format="HH:mm"
                          format="HH:mm"
                          placeholder="选择时间"></el-time-picker>
        </el-form-item>

        <el-form-item label="是否支持退款"
                      prop="refund">
          <el-radio-group v-model="addItem.refund">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="是否支持菜单"
                      prop="menu">
          <el-radio-group v-model="addItem.menu">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- <el-form-item label="拥有套餐数量" prop="group_buy_num">
          <el-input
            placeholder="请输入数量"
            v-model.number="addItem.group_buy_num"
          >
          </el-input>
        </el-form-item> -->

        <el-form-item label="是否支持SVG"
                      prop="svg">
          <el-radio-group v-model="addItem.svg">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="addItem.svg == 1"
                      label="SVG地址">
          <el-input placeholder="请输入SVG地址"
                    v-model="addItem.svg_url">
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="insertDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="validation('insertItem')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改内容 -->

    <!-- 删除单个内容 -->
    <el-dialog :title="'删除-' + deltitle"
               :visible.sync="deleteDialog"
               width="30%">
      <!-- <span>确定要删除此项吗</span><br> -->
      <h3>删除原因：</h3>
      <el-input v-model="currenDeleteRow.status_desc" />
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteItem()">确定</el-button>
      </span>
    </el-dialog>
    <!-- 定位地图组件 -->
    <el-dialog title="位置标注"
               :visible.sync="mapForAdd.dialogVisible"
               custom-class="baidu-map"
               width="80%"
               @opened="newLocation">
      <amap ref="MapComponent"
            @chooseLocation="chooseLocation"
            :address="addItem.name"
            :city="mapCity" />
    </el-dialog>

    <el-dialog :title="openShopImages.shopName"
               :visible.sync="openShopImages.dialogVisible"
               width="50%">
      <template v-if="openShopImages.dialogVisible">
        <el-carousel :autoplay="false"
                     indicator-position="none"
                     arrow="never"
                     height="600px">
          <el-carousel-item v-for="(item, index) in openShopImages.picData"
                            :key="'openShopImages_' + index">
            <div class="imgbox">
              <el-image style="height: 600px; width: auto"
                        fit="contain"
                        :src="item"></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-dialog>
    <go-back v-if="showBack"></go-back>
    <el-backtop target=".main-container"
                :bottom="showBack ? 105 : 40"></el-backtop>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
//import baiduMaps from "@/components/BaiduMap";
import uploadFiles from "@/components/uploadFiles";
import store from "@/store";
import citySelectex from "@/components/citySelectEX";
import searchCity from "@/components/citySelectEX/shopSearchCity.vue";
import _ from "lodash";
import amap from "@/components/Amap";
export default {
  components: {
    //baiduMaps,
    uploadFiles,
    amap,
    citySelectex,
    searchCity,
  },
  name: "ShopEdit",
  data () {
    return {
      openShopImages: {
        //打开店铺图片相关设置
        shopName: "",
        dialogVisible: false,
        picData: [],
      },
      mapCity: "",
      header: {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=--------------------------AAAAA",
          AccessToken: getToken(),
        },
      },
      imageUrl: "",
      loading: false,
      isDeletePage: 0, //当前显示是否删除的记录
      amount_min: "", //筛选最低金额
      amount_max: "", //筛选最高金额
      business_start_time: "",
      business_stop_time: "",
      reserve_latest_arrive: "",
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      curPage: 1, //删除框的标题
      page_size: 10,
      total: 13, //删除框的标题
      //添加
      addItem: {
        type_id: "",
        name: "",
        ename: "",
        province_id: "",
        city_id: "",
        area_id: "",
        address: "",
        basic_price: "",
        score: "",
        logo: "",
        business_start_time: "",
        business_stop_time: "",
        summary: "",
        phone: "",
        order_all_count: "",
        commission_rate: "",
        reserve_days: "",
        reserve_auto_audit: "0",
        shopping_auto_audit: "0",
        shopping_pay_online: "0",
        business_status: 1,
        notice: "",
        reserve_choose_place: "1",
        week_take_out_wine: "1",
        reserve_latest_arrive: "",
        status: 1,
        vr: null,
        vr_url: "",
        svg: null,
        svg_url: "",
        reserve: null,
        choose_place: null,
        choose_time: null,
        refund: null,
        group_buy_num: null,
        vertify_remark: "",
        // menu:null
      },
      //默认排序
      defaultSort: {},
      //筛选省
      province_id: "",
      //筛选市
      city_id: "",
      //修改
      currenItem: {},
      rules: {
        name: [{ required: true, message: "请填写店铺名称", trigger: "blur" }],
      },
      // rules: {
      //   type_id: [
      //     { required: true, message: "请选择店铺类型", trigger: "blur" },
      //   ],
      //   name: [{ required: true, message: "请填写店铺名称", trigger: "blur" }],
      //   ename: [
      //     { required: true, message: "请填写店铺英文简称", trigger: "blur" },
      //   ],
      //   basic_price: [
      //     { required: true, message: "请填写人均消费", trigger: "blur" },
      //   ],
      //   score: [{ required: true, message: "请填写评分", trigger: "blur" }],
      //   logo: [{ required: true, message: "请上传logo", trigger: "blur" }],
      //   business_start_time: [
      //     { required: true, message: "请选择营业开始时间", trigger: "blur" },
      //   ],
      //   business_stop_time: [
      //     { required: true, message: "请选择营业结束时间", trigger: "blur" },
      //   ],
      //   summary: [{ required: true, message: "请填写描述", trigger: "blur" }],
      //   phone: [{ required: true, message: "请填电话", trigger: "blur" }],
      //   order_all_count: [
      //     { required: true, message: "请填写销量", trigger: "blur" },
      //   ],
      //   commission_rate: [
      //     { required: true, message: "请填写平台佣金比", trigger: "blur" },
      //   ],
      //   reserve_days: [
      //     {
      //       required: true,
      //       message: "请填写允许最大预订天数",
      //       trigger: "blur",
      //     },
      //   ],
      //   reserve_auto_audit: [
      //     {
      //       required: true,
      //       message: "请选择自动审核预订状态",
      //       trigger: "blur",
      //     },
      //   ],
      //   shopping_auto_audit: [
      //     {
      //       required: true,
      //       message: "请选择自动审核下单状态",
      //       trigger: "blur",
      //     },
      //   ],
      //   shopping_pay_online: [
      //     {
      //       required: true,
      //       message: "请选择下单是否开启在线支付状态",
      //       trigger: "blur",
      //     },
      //   ],
      //   reserve_choose_place: [
      //     {
      //       required: true,
      //       message: "请选择预订是否支持选位状态",
      //       trigger: "blur",
      //     },
      //   ],
      //   week_take_out_wine: [
      //     {
      //       required: true,
      //       message: "请选择是否允许周末取酒",
      //       trigger: "blur",
      //     },
      //   ],
      //   status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      // },
      tableListData: [], //页面表单的内容
      shopTypeList: [], //页面表单的内容
      businessList: [], //页面表单的内容
      //SVG数据
      batchUpdateData: {
        item: "",
      }, //批量修改
      currenDeleteRow: {
        merchant_id: "",
        shop_id: "",
        status_desc: "",
      }, //当前选中的删除行
      openTimeArea: [
        new Date(2016, 9, 10, 0, 11),
        new Date(2016, 9, 10, 23, 59),
      ], // 营业结束时间
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      updateDialogTitle: "", //修改框的标题
      deltitle: "", //删除框的标题
      searchValue: "", //搜索的值
      shopAreaName: "", // 店铺区域名称
      areaTitle: "选择店铺区域", // 店铺区域名称
      locationData: {},
      mapForAdd: {
        dialogVisible: false,
        mapHeight: 450,
        height: "80%",
        width: "85%",
        longitude: "",
        latitude: "",
        title: "选择目标位置",
      },
      //省
      province_id: "",
      //市
      city_id: "",
      //区
      area_id: "",
      //地址
      mapKeyword: "",
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
      //排序
      sort: "",
      sortData: [
        {
          value: "merchant_id",
          name: "店铺ID",
        },
        {
          value: "ename",
          name: "店铺拼音缩写",
        },
        {
          value: "desc_score",
          name: "描述分",
        },
        {
          value: "service_score",
          name: "服务分",
        },
        {
          value: "basic_price",
          name: "人均消费",
        },
        {
          value: "order_all_count",
          name: "销量",
        },
        {
          value: "report_count",
          name: "举报数",
        },
        {
          value: "city",
          name: "城市",
        },
        {
          value: "status",
          name: "状态",
        },
        {
          value: "business_status",
          name: "营业状态",
        },
        {
          value: "rank_sort",
          name: "排序评分",
        },
        {
          value: "create_time",
          name: "创建时间",
        },
        {
          value: "collect_count",
          name: "收藏数",
        },
        {
          value: "type_name",
          name: "类型",
        },
      ],
      //营业状态
      business_status: "",
      business_statusData: [
        {
          id: 0,
          name: "暂停营业",
        },
        {
          id: 1,
          name: "正常营业",
        },
        {
          id: 2,
          name: "待营业",
        },
        {
          id: 3,
          name: "永久停业",
        },
      ],
      //店铺状态
      status: "",
      statusData: [
        {
          id: 0,
          name: "禁用",
        },
        {
          id: 1,
          name: "正常显示",
        },
        {
          id: 2,
          name: "待初审",
        },
        {
          id: 3,
          name: "待复审",
        },
      ],
      //类型
      type_id: "",
      type_idData: [
        {
          id: 1,
          name: "蹦迪",
        },
        {
          id: 2,
          name: "量贩式",
        },
        {
          id: 3,
          name: "清吧",
        },
        {
          id: 4,
          name: "商务会所",
        },
      ],
      //排序方向
      order: "",
      orderData: [
        {
          value: "asc",
          name: "正序",
        },
        {
          value: "desc",
          name: "倒序",
        },
      ],
      //商家ID
      merchant_id: "",
      shop_id: null, //直接定位到某店铺，用于其他模块快速定位。
      showBack: false,
      isPhone: /^([0-9]{3,4}-)?[0-9]{7,8}$/,
      isMob: /^1[3456789]\d{9}$/,
      isError: false,
      validRule: /^\d[\d\-\;]*$/,
    };
  },
  created () {
    //this.curPage = this.$route.query.page ? Number(this.$route.query.page) : 1;
    //console.info(this._getVuex("pageTitle"), "shopEdit");
    // this.showBack = false;
    // if (this.$route.query.query != undefined) {
    //   console.info(this.$route.query.query);
    //   this.searchValue = this.$route.query.query;
    //   this.showBack = true;
    // }
    if (this.$route.query.from != undefined) {
      this.showBack = true;
    }
    this.iniPageParam();
    this.getTableList();
    //this.getBusinessList();
  },

  methods: {
    handlePageSizeChange (v) {
      this.pageChange();
      //this.getTableList();
    },
    // 校验商家电话的输入
    validatePhone () {
      this.form.phone = this.form.phone.replace(/\s+/g, "");
      if (this.addItem.phone) {
        if (this.validRule.test(this.addItem.phone)) {
          this.isError = false;
          // if (this.addItem.phone.indexOf(";") != -1) {
          //   var arr = [];
          //   arr = this.addItem.phone.split(";");
          //   arr.forEach((item) => {
          //     if (item) {
          //       if (this.isMob.test(item) || this.isPhone.test(item)) {
          //         this.isError = false;
          //       } else {
          //         this.isError = true;
          //         this.$refs["shopPhone"].focus();
          //         this.addItem.phone = "";
          //       }
          //     }
          //   });
          // } else {
          //   if (
          //     this.isMob.test(this.addItem.phone) ||
          //     this.isPhone.test(this.addItem.phone)
          //   ) {
          //     this.isError = false;
          //   } else {
          //     this.isError = true;
          //     this.$refs["shopPhone"].focus();
          //     this.addItem.phone = "";
          //   }
          // }
        } else {
          this.isError = true;
          this.$refs["shopPhone"].focus();
          this.addItem.phone = "";
          return false;
        }
      } else {
        this.isError = false;
      }
    },
    changeChoose_time (e) {
      if (e == 0) {
        this.addItem.reserve_latest_arrive = "22:00";
      } else {
        this.addItem.reserve_latest_arrive = "";
      }
    },
    uploadLogo (v) {
      this.addItem.logo = v;
    },
    //筛选审核状态
    handleFilter (filters) {
      let v = "";
      for (let i in filters) {
        v = filters[i][0];
      }
      this.status = v;
      this.pageChange();
    },
    //打开店铺图片
    showImglist (row, name) {
      this.openShopImages.picData = [];
      this.openShopImages.dialogVisible = true;
      this.openShopImages.picData.push(row);
      this.openShopImages.shopName = name;
    },
    //剪切后触发方法
    cutDown: function (img) {
      console.info(img);
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
              this.addItem.logo = res.data.data.url_path[0];
            } else {
              this.imageUrl = "";
              this.addItem.logo = "";
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
      }
    },
    //重置
    resetData () {
      this.sort = "";
      this.business_status = "";
      this.status = "";
      this.type_id = "";
      this.order = "";
      this.merchant_id = "";
      this.curPage = 1;
      this.province_id = null;
      this.city_id = null;
      this.amount_min = "";
      this.amount_max = "";
      //this.getTableList();
      this.$refs.searchCity.resetData();
      this.pageChange();
      this.$router.push("/shopEdit");
    },
    //筛选
    screening () {
      if (this.amount_min > this.amount_max) {
        this.$message({
          message: "人均最低金额不能大于人均最高金额。",
          type: "warning",
        });
        return;
      }
      this.curPage = 1;
      //this.getTableList();
      this.pageChange();
    },
    //统一验证方法
    validation (data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          if (data == "insertItem") {
            this.insertItem();
          } else if (data == "multiUpdate") {
            this.multiUpdate();
          }
        } else {
          return false;
        }
      });
    },
    //统一验证方法FQ
    validationFQ (data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          if (
            this.province_id != "" &&
            this.city_id != "" &&
            this.area_id != ""
          ) {
            if (data == "insertItem") {
              if (this.addItem.address != "") {
                this.insertItem();
              } else {
                this.$message({
                  message: "请定位详细地址",
                  type: "warning",
                });
              }
            } else if (data == "multiUpdate") {
              if (this.currenItem.address != "") {
                this.multiUpdate();
              } else {
                this.$message({
                  message: "请定位详细地址",
                  type: "warning",
                });
              }
            }
          } else {
            this.$message({
              message: "请选择省市区",
              type: "warning",
            });
          }
        } else {
          return false;
        }
      });
    },
    //图片上传子组件传值
    theIMG (url) {
      this.addItem.logo = url;
      this.currenItem.logo = url;
    },

    // 打开地图对话框
    selectLocation (e) {
      //地图搜索关键字
      //setTimeout(() => {
      //this.$refs.MapComponent.concert(this.mapKeyword);
      //}, 0);
      this.mapForAdd.dialogVisible = !this.mapForAdd.dialogVisible;
    },
    //打开地图对话框后
    newLocation () {
      this.$refs.MapComponent.newLocation(this.mapCity, this.addItem.name);
    },
    // 关闭地图
    closeMap (str) {
      this.mapForAdd.dialogVisible = str;
    },
    // 地图中选择位置
    chooseLocation (obj) {
      this.locationData = obj;
      this.addItem.latitude = obj.lat;
      this.addItem.longitude = obj.lng;
      this.addItem.address = obj.address; //obj.province + obj.city + obj.district + obj.addr;
      this.currenItem.latitude = obj.lat;
      this.currenItem.longitude = obj.lng;
      this.currenItem.address = obj.address; //obj.province + obj.city + obj.district + obj.addr;
      this.mapForAdd.dialogVisible = false;
    },
    // 获取子组件返回的ID
    setCityAreaName (areaName) {
      console.info(areaName);
      this.province_id = areaName.province;
      this.city_id = areaName.city;
      this.area_id = areaName.area;
      this.mapCity = String(areaName.city_name);
      if (!this.updateDialog) {
        this.mapKeyword = areaName.mapKeyword;
      }
    },
    /* 获取表单内容 */
    getTableList () {
      let data = {
        query: this.searchValue,
        sort: this.sort,
        business_status: this.business_status,
        status: this.status,
        type_id: this.type_id,
        order: this.order,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
        page: this.curPage,
        page_size: this.page_size,
        province_id: this.province_id,
        city_id: this.city_id,
        area_id: this.area_id,
        is_delete: this.isDeletePage,
        amount_min: this.amount_min ? Number(this.amount_min) * 100 : "",
        amount_max: this.amount_max ? Number(this.amount_max) * 100 : "",
      };
      this.loading = true;
      this.$store.dispatch("shop/getShopInfo", data).then((res) => {
        this.loading = false;
        this.tableListData = res.data;
        this.total = res.count;
        this.$refs.pagination.internalCurrentPage = this.curPage;
        if (this.tableListData) {
          //计算金额
          for (var i = 0; i < this.tableListData.length; i++) {
            this.tableListData[i].basic_price = this.CalculateData(
              this.tableListData[i].basic_price,
              "/"
            );
          }
        }
      });
    },
    /* 搜索 */
    searchDatas () {
      this.curPage = 1;
      this.pageChange(this.curPage);
      //this.getTableList();
    },
    /* 删除选项 */
    deleteItem () {
      const datas = this.currenDeleteRow;
      this.$store.dispatch("shop/deleteShop", datas).then((res) => {
        this.getTableList(this.curPage);
        this.deleteDialog = false;
      });
    },
    //处理时间格式
    ValueTime (value) {
      return value;
      if (!value && typeof value != "undefined" && value != 0) {
        return "";
      } else {
        var date = new Date(value);
        var calculate = function (value) {
          return value < 10 ? "0" + value : value;
        };
        var mergeData =
          calculate(date.getHours()) + ":" + calculate(date.getMinutes());
        return mergeData;
      }
    },
    //打开添加弹框
    insertDialogtk () {
      //初始化图片
      setTimeout(() => {
        this.$refs.citySelectex.passData(
          this.province_id,
          this.city_id,
          this.area_id
        );
      }, 500);
      this.province_id = "";
      this.city_id = "";
      this.area_id = "";
      this.$nextTick(() => { });
      //初始化时间组件
      if (typeof this.addItem.business_start_time != "undefined") {
        this.addItem.business_start_time = "";
      }
      if (typeof this.addItem.business_stop_time != "undefined") {
        this.addItem.business_stop_time = "";
      }
      if (typeof this.addItem.reserve_latest_arrive != "undefined") {
        this.addItem.reserve_latest_arrive = "";
      }
      this.insertDialog = true;
    },
    /* 新增 */
    insertItem () {
      var datas = {
        name: this.addItem.name,
        type_id: this.addItem.type_id,
        province_id: Number(this.province_id),
        city_id: Number(this.city_id),
        area_id: Number(this.area_id),
        address: this.addItem.address,
        latitude: this.addItem.latitude,
        longitude: this.addItem.longitude,
        basic_price: this.addItem.basic_price
          ? this.CalculateData(this.addItem.basic_price, "*")
          : 0,
        score: this.addItem.score ? parseInt(this.addItem.score) : 0,
        logo: this.addItem.logo,
        business_start_time: this.ValueTime(this.addItem.business_start_time),
        business_stop_time: this.ValueTime(this.addItem.business_stop_time),
        order_all_count: parseInt(this.addItem.order_all_count),
        // merchant_id: this.addItem.merchant_id,
        phone: this.addItem.phone,
        //ename: this.addItem.ename,
        commission_rate: Number(this.addItem.commission_rate),
        status: parseInt(this.addItem.status),
        reserve_days: Number(this.addItem.reserve_days),
        // reserve_max_duration: this.addItem.reserve_max_duration,
        // reserve_time_interval: this.addItem.reserve_time_interval,
        reserve_auto_audit: Number(this.addItem.reserve_auto_audit),
        shopping_auto_audit: Number(this.addItem.shopping_auto_audit),
        shopping_pay_online: Number(this.addItem.shopping_pay_online),
        business_status: Number(this.addItem.business_status),
        //reserve_choose_place: Number(this.addItem.reserve_choose_place),
        week_take_out_wine: Number(this.addItem.week_take_out_wine),
        reserve_latest_arrive:
          Number(this.addItem.choose_time) == 0
            ? this.addItem.reserve_latest_arrive
            : "",
        vr: this.addItem.vr,
        vr_url: this.addItem.vr_url,
        svg: this.addItem.svg,
        svg_url: this.addItem.svg_url,
        choose_place: Number(this.addItem.choose_place),
        choose_time: Number(this.addItem.choose_time),
        refund: Number(this.addItem.refund),
        vertify_remark: this.addItem.vertify_remark,
        // menu: Number(this.addItem.menu),
        //group_buy_num: Number(this.addItem.group_buy_num),
      };
      console.info("提交数据：", datas);
      this.$store.dispatch("shop/insertShop", datas).then((res) => {
        this.getTableList(this.curPage);
        this.$refs["insertItem"].resetFields();
        this.insertDialog = false;
      });
    },
    /* 获取店铺类型 */
    getShopTypeList () {
      let data = { page: 1 };
      this.$store.dispatch("shop/getShopType", data).then((res) => {
        this.shopTypeList = res.data;
        this.type_idData = res.data;
        this.addItem.type_id = res.data[0].type_id;
        this.type_id = this.$route.query.type_id
          ? Number(this.$route.query.type_id)
          : null;
      });
    },

    /* 打开修改窗口 */
    openUpdateDialog (index, row) {
      this.mapKeyword = row.address;
      this.updateDialog = true;
      this.updateDialogTitle = "修改-" + row.name;
      //处理图片传值
      setTimeout(() => {
        this.$refs.uploadImg.concert(row.logo);
      }, 0);
      //处理时间格式
      if (row.business_start_time != "") {
        this.business_start_time =
          "Mon Sep 01 2020 " + row.business_start_time + ":00 GMT+0800";
      }
      if (row.business_stop_time != "") {
        this.business_stop_time =
          "Mon Sep 01 2020 " + row.business_stop_time + ":00 GMT+0800";
      }
      if (row.reserve_latest_arrive != "") {
        this.reserve_latest_arrive =
          "Mon Sep 01 2020 " + row.reserve_latest_arrive + ":00 GMT+0800";
      }
      //地区ID
      this.province_id = row.province_id;
      this.city_id = row.city_id;
      this.area_id = row.area_id;
      setTimeout(() => {
        this.$refs.citySelect.passData(
          this.province_id,
          this.city_id,
          this.area_id
        );
      }, 0);
      this.currenItem = {
        shop_id: row.shop_id,
        merchant_id: row.merchant_id,
        type_id: row.type_id,
        name: row.name,
        commission_rate: row.commission_rate,
        status: row.status,
        address: row.address,
        latitude: row.latitude,
        longitude: row.longitude,
        basic_price: this.CalculateData(row.basic_price, "/"),
        score: parseInt(row.score),
        logo: row.logo,
        business_start_time: this.business_start_time,
        business_stop_time: this.business_stop_time,
        order_all_count: parseInt(row.order_all_count),
        phone: row.phone,
        ename: row.ename,
        svg: row.svg,
        reserve_days: row.reserve_days,
        // reserve_max_duration: row.reserve_max_duration,
        // reserve_time_interval: row.reserve_time_interval,
        reserve_auto_audit: String(row.reserve_auto_audit),
        shopping_auto_audit: String(row.shopping_auto_audit),
        shopping_pay_online: String(row.shopping_pay_online),
        reserve_choose_place: String(row.reserve_choose_place),
        commission_rate: row.commission_rate,
        week_take_out_wine: String(row.week_take_out_wine),
        reserve_latest_arrive: this.reserve_latest_arrive,
      };
    },
    /* 修改 */
    multiUpdate () {
      var datas = {
        shop_id: this.currenItem.shop_id,
        merchant_id: this.currenItem.merchant_id,
        name: this.currenItem.name,
        type_id: this.currenItem.type_id,
        province_id: this.province_id,
        city_id: this.city_id,
        area_id: this.area_id,
        address: this.currenItem.address,
        latitude: this.currenItem.latitude,
        longitude: this.currenItem.longitude,
        basic_price: this.CalculateData(this.currenItem.basic_price, "*"),
        score: parseInt(this.currenItem.score),
        logo: this.currenItem.logo,
        business_start_time: this.ValueTime(
          this.currenItem.business_start_time
        ),
        business_stop_time: this.ValueTime(this.currenItem.business_stop_time),
        order_all_count: parseInt(this.currenItem.order_all_count),
        phone: this.currenItem.phone,
        //ename: this.currenItem.ename,
        commission_rate: Number(this.currenItem.commission_rate),
        status: parseInt(this.currenItem.status),
        reserve_days: Number(this.currenItem.reserve_days),
        // reserve_max_duration: this.currenItem.reserve_max_duration,
        // reserve_time_interval: this.currenItem.reserve_time_interval,
        reserve_auto_audit: Number(this.currenItem.reserve_auto_audit),
        shopping_auto_audit: Number(this.currenItem.shopping_auto_audit),
        shopping_pay_online: Number(this.currenItem.shopping_pay_online),
        //reserve_choose_place: Number(this.currenItem.reserve_choose_place),
        week_take_out_wine: Number(this.currenItem.week_take_out_wine),
        reserve_latest_arrive: this.ValueTime(
          this.currenItem.reserve_latest_arrive
        ),
      };
      this.$store.dispatch("shop/updateShop", datas).then((res) => {
        this.getTableList(this.curPage);
        this.updateDialog = false;
      });
    },
    photoJump (row) {
      this.$router.push({
        path: "/PhotoList",
        query: { shop_id: row.shop_id, merchant_id: row.merchant_id },
      });
    },
    //进入部门页面
    departmentJump (row) {
      this.$router.push({
        path: "/staffDept",
        query: { shop_id: row.shop_id, merchant_id: row.merchant_id },
      });
    },
    //进入员工页面
    employeesJump (row) {
      this.$router.push({
        path: "/shopInfo",
        query: {
          shop_id: row.shop_id,
          merchant_id: row.merchant_id,
          tab: "shopStaff",
          from: "shopEdit",
        },
      });
    },
    //进入角色页面
    roleJump (row) {
      this.$router.push({
        path: "/staffRole",
        query: { shop_id: row.shop_id, merchant_id: row.merchant_id },
      });
    },
    //进入订单页面
    orderJump (row) {
      this.$router.push({
        path: "/newOrder",
        query: { shop_id: row.shop_id, merchant_id: row.merchant_id },
      });
    },
    //进入评论页面
    commentsJump (row) {
      this.$router.push({
        path: "/evaluateShopEdit",
        query: { shop_id: row.shop_id, merchant_id: row.merchant_id },
      });
    },
    //进入打印机页面
    printJump (row) {
      this.$router.push({
        path: "/shopInfo",
        query: {
          shop_id: row.shop_id,
          merchant_id: row.merchant_id,
          tab: "shopPrint",
          from: "shopEdit",
        },
      });
    },
    //进入电话记录页面
    shopPhone (row) {
      this.$router.push({
        path: "/shopInfo",
        query: {
          shop_id: row.shop_id,
          merchant_id: row.merchant_id,
          tab: "shopPhone",
          from: "shopEdit",
        },
      });
    },
    //进入相册
    openAlbum (row) {
      this.$router.push({
        path: "/shopInfo",
        query: {
          shop_id: row.shop_id,
          merchant_id: row.merchant_id,
          tab: "shopAlbum",
          from: "shopEdit",
        },
      });
    },
    //进入座位管理
    seatJump (row) {
      this.$router.push({
        path: "/shopInfo",
        query: {
          shop_id: row.shop_id,
          merchant_id: row.merchant_id,
          tab: "shopPlace",
          from: "shopEdit",
        },
      });
    },
    // 进入商品管理
    openGoods (row) {
      this.$router.push({
        path: "/shopInfo",
        query: {
          shop_id: row.shop_id,
          merchant_id: row.merchant_id,
          tab: "shopGoods",
          from: "shopEdit",
        },
      });
    },
    // 进入套餐管理
    packageJump (row) {
      this.$router.push({
        //path: "/GroupBuyindex",
        path: "/shopInfo",
        query: {
          shop_id: row.shop_id,
          merchant_id: row.merchant_id,
          tab: "shopGroups",
          from: "shopEdit",
        },
      });
    },
    /* 打开批量删除框 */
    batchDelete () {
      if (this.multipleSelection.length > 0) {
        this.mutilDeleteDialog = true;
      } else {
        this.$message({
          message: "请先勾选要删除的店铺。",
          type: "warning",
        });
      }
    },
    /*删除店铺*/
    handleShopDelete () {
      if (this.multipleSelection.length > 0) {
        this.$confirm("确定要删除选中的商铺吗？", "警告", {
          type: "warning",
        }).then(() => {
          let datas = {
            id: this.multipleSelection,
          };
          this.$store.dispatch("shop/deleteShop", datas).then((res) => {
            this.multipleSelection = [];
            this.getTableList();
          });
        });
      }
    },
    btnShopDelete (id) {
      this.multipleSelection = [];
      this.$refs.multipNum.clearSelection();
      this.multipleSelection.push(id);
      this.handleShopDelete();
    },
    /* 打开删除框 */
    openDelDialog (item) {
      this.deltitle = item.name;
      this.currenDeleteRow = {
        merchant_id: item.merchant_id,
        shop_id: item.shop_id,
        status_desc: item.status_desc,
      };
      this.deleteDialog = true;
    },
    /* 选择表的行 */
    selectItem (val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.shop_id);
        this.nameArr.push(item.name);
      });
    },
    /* 改变页数 */
    pageChange (page) {
      console.log(page, '545456465465456454564565554544564')
      //this.curPage = page;
      //this.getTableList(this.curPage);
      let query = {
        page: page,
        page_size: this.page_size,
        query: this.searchValue ? encodeURIComponent(this.searchValue) : "",
        sort: this.sort,
        order: this.order,
        business_status: this.business_status,
        status: this.status,
        type_id: this.type_id,
        merchant_id: this.merchant_id,
        shop_id: this.shop_id,
        province_id: this.province_id,
        city_id: this.city_id,
        area_id: this.area_id,
        is_delete: this.isDeletePage,
        amount_min: this.amount_min,
        amount_max: this.amount_max,
        status: this.status,
      };
      this.$router.push({
        path: "/shopEdit",
        query: query,
      });
    },

    /* 初始化页面参数*/
    iniPageParam () {
      this.page_size = this.$route.query.page_size
        ? Number(this.$route.query.page_size)
        : 10;
      this.curPage = this.$route.query.page
        ? Number(this.$route.query.page)
        : 1;
      this.order = this.$route.query.order;
      this.sort = this.$route.query.sort;
      this.searchValue = this.$route.query.query
        ? decodeURIComponent(this.$route.query.query)
        : "";
      this.business_status = this.$route.query.business_status
        ? Number(this.$route.query.business_status)
        : "";
      this.status = this.$route.query.status
        ? Number(this.$route.query.status)
        : "";
      this.type_id = this.$route.query.type_id;
      this.merchant_id = this.$route.query.merchant_id
        ? Number(this.$route.query.merchant_id)
        : 0;
      this.shop_id = this.$route.query.shop_id
        ? Number(this.$route.query.shop_id)
        : 0;
      this.province_id = this.$route.query.province_id
        ? Number(this.$route.query.province_id)
        : 0;
      this.city_id = this.$route.query.city_id
        ? Number(this.$route.query.city_id)
        : 0;
      this.area_id = this.$route.query.area_id
        ? Number(this.$route.query.area_id)
        : 0;
      this.isDeletePage = this.$route.query.is_delete
        ? this.$route.query.is_delete
        : 0;
      this.amount_min = this.$route.query.amount_min;
      this.amount_max = this.$route.query.amount_max;
      this.defaultSort = {
        prop: this.sort,
        order: this.sortableList[this.order],
      };

      this.$nextTick(() => {
        // if (this.province_id > 0) {
        //   if (this.city_id > 0) {
        //     this.$refs.searchCity.getProvince(this.province_id, this.city_id);
        //   } else {
        //     this.$refs.searchCity.getProvince(this.province_id);
        //   }
        // } else {
        //   this.$refs.searchCity.getProvince();
        // }
        this.$refs.searchCity.getProvince(
          this.province_id,
          this.city_id,
          this.area_id
        );
        this.getShopTypeList();
      });
    },

    /* 点击店铺更多菜单 */
    handleShopCommand (command) {
      let methodName = command.command;
      let row = command.row;
      eval("this." + methodName + "(row)");
    },

    /* 表格的排序发生变化 */
    handleShopSort (obj) {
      //console.info(obj)
      this.sort = obj.order ? obj.prop : "";
      this.order = obj.order ? this.sortableList[obj.order] : "";
      this.curPage = 1;
      this.pageChange(this.curPage);
      //this.getTableList();
    },
    /* 筛选了城市*/
    searchCity (city) {
      this.province_id = city.province_id;
      this.city_id = city.city_id;
      this.area_id = city.area_id;
    },

    /* 回收站和正常页面切换 */
    handlePageShowType (isDelete) {
      this.isDeletePage = isDelete;
      this.curPage = 1;
      this.$router.push({
        path: "/shopEdit",
        query: { page: 1, is_delete: this.isDeletePage },
      });
      //this.pageChange(this.curPage);
    },

    /*打开店铺详情*/
    openShopInfo (row) {
      this.$router.push({
        path: "/ShopInfo",
        query: {
          shop_id: row.shop_id,
          merchant_id: row.merchant_id,
          tab: "shopInfo",
          from: "shopEdit",
        },
      });
    },
    /**
     * @description: 打开控制台
     * @param {*} row
     * @return {*}
     */
    openConsoler (row) {
      this.$router.push({
        path: "/Consoler",
        query: {
          shop_id: row.shop_id,
          merchant_id: row.merchant_id,
          from: "shopEdit",
        },
      });
    },
    /* 处理回收站还原 */
    handleShopRecovery () {
      if (this.multipleSelection.length > 0) {
        let datas = {
          id: this.multipleSelection,
        };
        this.api.shop.shopRecovery(datas).then(({ data }) => {
          let res = data;
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.multipleSelection = [];
          this.getTableList();
        });
      } else {
        this.$message({
          message: "请勾选数据",
          type: "error",
          duration: 5 * 1000,
        });
      }
    },
    btnShopRecovery (id) {
      this.multipleSelection = [];
      this.$refs.multipNum.clearSelection();
      this.multipleSelection.push(id);
      this.handleShopRecovery();
    },

    //通过id获得类型名称
    getShopType (id) {
      let objIndex = _.findIndex(this.shopTypeList, (o) => {
        return o.type_id == id;
      });

      return objIndex >= 0 ? this.shopTypeList[objIndex]["type_name"] : "未知";
    },
    //跳转至评论/举报列表
    toList (shop_id, n) {
      switch (n) {
        case 0: //评论列表
          this.$router.push(
            "/shopset/shop/evaluate?shop_id=" + shop_id + "&from=true&scene=1"
          );
          break;
        case 1: //举报列表
          this.$router.push(
            "/reportList?shop_id=" + shop_id + "&from=true&scene=1"
          );
          break;
      }
    },
  },
  mounted () { },
  watch: {
    $route (to, from) {
      this.iniPageParam();
      this.getTableList();
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
.comimg {
  width: 150px;
  height: 150px;
}
.el-button--primary,
.btn-primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
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
  .pagination {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
  }
  .searchInput {
    width: 90% !important;
  }
  .el-form-item {
    width: 80% !important;
    .el-input {
      min-width: 200px !important;
      width: 200px !important;
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

.updateArea {
  .el-input {
    width: auto !important;
  }
  color: #fff;
}
</style>
