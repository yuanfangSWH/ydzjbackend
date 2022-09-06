<template>
  <div>
    <div class="shopSet"
         v-if="!showRuleBox && !showGroupBox">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-card>
            <div class="goods-class-list-left"
                 @click="addNewPlaceType">
              <i class="el-icon-plus">新建分类</i>
            </div>
          </el-card>

          <el-card :shadow="type_id == 0 ? 'never' : 'always'">
            <div :class="
                'goods-class-list-left' +
                (type_id == 0 ? ' goods-class-list-selected' : '')
              "
                 @click="tabFun(0)">
              <i class="el-icon-folder-opened"><span style="padding-right: 10px">显示全部</span></i>
            </div>
          </el-card>

          <draggable class="list-group"
                     v-model="placeTypeData"
                     :options="{ animation: 20 }"
                     @change="draggableChangeClass">
            <el-card v-for="(item, index) in placeTypeData"
                     :key="'class' + index"
                     :shadow="type_id == item.type_id ? 'never' : 'always'">
              <div @click="tabFun(item.type_id)"
                   :class="
                  'goods-class-list-left' +
                  (type_id == item.type_id ? ' goods-class-list-selected' : '')
                ">
                <span style="padding-right: 10px"
                      :style="{ color: item.status == 0 ? '#ccc' : '' }">{{ item.name }}</span>
                <span v-if="item.place_count"
                      :style="{ color: item.status == 0 ? '#ccc' : '' }">({{ item.place_count }})</span>
              </div>
              <i class="el-icon-edit"
                 style="float: right; color: #dda100; cursor: pointer"
                 v-if="type_id == item.type_id"
                 @click="editClass(item)"></i>
              <!-- <span class="goods-class-list-right" v-if="item.status == 1">
                <el-popover placement="right" width="500" trigger="click">
                  <place-type-view :type-form="item" />
                  <i
                    class="el-icon-folder-opened"
                    style="margin-right: 10px"
                    slot="reference"
                  ></i>
                </el-popover>
                <el-button
                  type="warning"
                  size="mini"
                  @click="changeStatusClass(item, false)"
                  >禁用</el-button
                >
              </span>
              <span class="goods-class-list-right" v-if="item.status == 0">
                <el-button type="" size="mini" @click="editClass(item)"
                  >编辑</el-button
                >
                <el-button
                  type=""
                  size="mini"
                  @click="changeStatusClass(item, true)"
                  >启用</el-button
                >
              </span> -->
              <!-- <span class="goods-class-list-right">
                <el-popover placement="right"
                            width="500"
                            trigger="click">
                  <place-type-view :type-form="item" /> -->
              <!-- <i
                    class="el-icon-folder-opened"
                    style="margin-right: 10px"
                    slot="reference"
                  ></i> -->
              <!-- <el-button type=""
                             style="margin-right: 10px"
                             slot="reference"
                             size="mini">查看</el-button>
                </el-popover>
                <el-button type="info"
                           size="mini"
                           @click="editClass(item)">编辑</el-button>
                <el-button v-if="item.status == 1"
                           type="danger"
                           size="mini"
                           @click="changeStatusClass(item, false)">禁用</el-button>
                <el-button v-if="item.status == 0"
                           type="success"
                           size="mini"
                           @click="changeStatusClass(item, true)">启用</el-button>
              </span> -->
            </el-card>
          </draggable>
        </el-col>
        <el-col :span="20">
          <div class="add-box">
            <div v-if="!is_delete"
                 class="btn-nav">
              <el-button type="primary"
                         v-if="!showEditBtn"
                         @click="handleNewPlace">新增座位</el-button>
              <el-button type="primary"
                         v-if="showEditBtn"
                         :disabled="!multipleSelection.length > 0"
                         @click="handleDeletePlace">批量删除</el-button>
              <el-button type="primary"
                         v-if="showEditBtn"
                         :disabled="!multipleSelection.length > 0"
                         @click="handleMultiPlace">批量修改</el-button>
              <el-button v-if="showEditBtn"
                         class="y-btn"
                         type="warning"
                         @click="toggleSelection">取消勾选</el-button>
              <!-- <el-dropdown style="margin-left: 10px; margin-right: 10px"
                           @command="handleMultType"
                           trigger="click">
                <el-button type="primary">
                  批量修改座位类型<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item, index) in placeTypeData"
                                    :key="'type_key_' + index"
                                    :command="item.type_id">{{ item.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown style="margin-right: 10px"
                           @command="handleMultArea"
                           trigger="click">
                <el-button type="primary">
                  批量修改座位区域<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button> 
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item, index) in placeAreaData"
                                    :key="'area_key_' + index"
                                    :command="item.area_id">{{ item.area_name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
              <el-button type="warning"
                         v-if="!showEditBtn"
                         @click="handleDeleteBox(true)"
                         plain>回收站</el-button>
            </div>
            <div v-if="is_delete"
                 class="btn-nav">
              <el-button type="primary"
                         @click="handleRecoveryPlace"
                         :disabled="!multipleSelection.length > 0">还原</el-button>
              <el-button type="warning"
                         plain
                         @click="handleDeleteBox(false)">返回</el-button>
            </div>
            <div class="so-nav">
              <el-button type="warning"
                         plain
                         style="float: right"
                         @click="handleGroupBox">座位套餐</el-button>
              <el-button type="warning"
                         plain
                         style="float: right"
                         @click="handleRuleBox">座位规则</el-button>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>
              <Place-Area ref="placeAreaComponent"
                          :merchants="merchants"
                          @selectedArea="selectedArea"
                          @getPlaceAreaData="getPlaceAreaData" />
            </div>
            <div class="so-nav">
              <el-input class="so-ipt"
                        placeholder="请输入座位名称"
                        suffix-icon="el-icon-search"
                        v-model="soVal"
                        :clearable="true"
                        @change="getAllPlace(1)">
              </el-input>
              <el-button class="sosuo"
                         type="primary"
                         style="height: 40px"
                         @click="getAllPlace(1)">搜索</el-button>
            </div>
          </div>
          <Place-Item :merchants="merchants"
                      ref="multipleTable"
                      :options="placListData"
                      :is-delete="is_delete"
                      @editPlace="handleEditPlace"
                      @deleteFun="deletePlace"
                      @recoveryFun="recoveryPlace"
                      @sortFun="sortPlace" />
          <div class="pagebox">
            <el-pagination ref="pagination"
                           :hide-on-single-page="false"
                           @size-change="handleSizeChange"
                           background
                           layout="sizes,prev, pager, next,jumper"
                           :page-size="page_size"
                           :page-sizes="[10, 20, 30, 40]"
                           :total="count"
                           @current-change="pageChange">
            </el-pagination>
          </div>
        </el-col>
      </el-row>

      <el-dialog title="批量修改"
                 :visible.sync="placePlaceMultiDialog"
                 destroy-on-close
                 :close-on-click-modal="false">
        <el-form label-width="80px">
          <el-form-item label="分类">
            <el-select style="width: 240px"
                       v-model="placeMultiData.type_id.value"
                       @change="
                placeMultiData.type_id.value
                  ? (placeMultiData.type_id.isDef = false)
                  : null
              "
                       placeholder="请选择">
              <el-option label="选择后才修改"
                         :value="null"></el-option>
              <el-option v-for="(item, index) in placeTypeData"
                         :key="'type_key_' + index"
                         :label="item.name"
                         :value="item.type_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区域">
            <el-select style="width: 240px"
                       v-model="placeMultiData.area_id.value"
                       @change="
                placeMultiData.area_id.value
                  ? (placeMultiData.area_id.isDef = false)
                  : null
              "
                       placeholder="请选择">
              <el-option label="选择后才修改"
                         :value="null"></el-option>
              <el-option v-for="(item, index) in placeAreaData"
                         :key="'area_key_' + index"
                         :label="item.area_name"
                         :value="item.area_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最少人数">
            <el-input v-model.number="placeMultiData.min_people_num.value"
                      @change="placeMultiData.min_people_num.isDef = false">
              <el-select style="width: 130px"
                         v-model="placeMultiData.min_people_num.isDef"
                         slot="prepend"
                         placeholder="请选择"
                         @change="
                  placeMultiData.min_people_num.isDef
                    ? (placeMultiData.min_people_num.value = null)
                    : null
                ">
                <el-option label="不修改"
                           :value="true"></el-option>
                <el-option label="设定值"
                           :value="false"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="最多人数">
            <el-input v-model.number="placeMultiData.max_people_num.value"
                      @change="placeMultiData.max_people_num.isDef = false">
              <el-select style="width: 130px"
                         v-model="placeMultiData.max_people_num.isDef"
                         slot="prepend"
                         placeholder="请选择"
                         @change="
                  placeMultiData.max_people_num.isDef
                    ? (placeMultiData.max_people_num.value = null)
                    : null
                ">
                <el-option label="不修改"
                           :value="true"></el-option>
                <el-option label="设定值"
                           :value="false"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="低消">
            <el-input v-model.number="placeMultiData.basic_price.value"
                      @change="placeMultiData.basic_price.isDef = false">
              <el-select style="width: 130px"
                         v-model="placeMultiData.basic_price.isDef"
                         slot="prepend"
                         placeholder="请选择"
                         @change="
                  placeMultiData.basic_price.isDef
                    ? (placeMultiData.basic_price.value = null)
                    : null
                ">
                <el-option label="不修改"
                           :value="true"></el-option>
                <el-option label="设定值"
                           :value="false"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="订金">
            <el-input v-model.number="placeMultiData.deposit.value"
                      @change="placeMultiData.deposit.isDef = false">
              <el-select style="width: 130px"
                         v-model="placeMultiData.deposit.isDef"
                         slot="prepend"
                         placeholder="请选择"
                         @change="
                  placeMultiData.deposit.isDef
                    ? (placeMultiData.deposit.value = null)
                    : null
                ">
                <el-option label="不修改"
                           :value="true"></el-option>
                <el-option label="设定值"
                           :value="false"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="规则">
            <el-select v-model="placeMultiData.rule_id.value"
                       placeholder="请选择"
                       @change="
                placeMultiData.rule_id.value
                  ? (placeMultiData.rule_id.isDef = false)
                  : (placeMultiData.rule_id.isDef = true)
              ">
              <el-option label="不修改"
                         :value="null"></el-option>
              <el-option v-for="item in placeRuleData"
                         :key="item.rule_id"
                         :label="item.name"
                         :value="item.rule_id">
              </el-option>
            </el-select>
            <el-button @click="addNewPlaceRule"
                       icon="el-icon-plus"></el-button>
          </el-form-item>

          <el-form-item label="是否启用">
            <el-switch v-model="placeMultiData.place_status.value"
                       active-color="#ffbe11"
                       inactive-color="#d9d9d9">
            </el-switch>
          </el-form-item>
        </el-form>
        <div style="text-align: right">
          <el-button type=""
                     @click="
              placePlaceMultiDialog = false;
              isLoading = false;
            ">取消</el-button>
          <el-button type="primary"
                     @click="submitMultiPlace"
                     :loading="isLoading">保存</el-button>
        </div>
      </el-dialog>

      <el-dialog :title="placeForm.place_id == 0 ? '新建座位' : '编辑座位'"
                 :visible.sync="placePlaceDialog"
                 destroy-on-close
                 :close-on-click-modal="false">
        <el-form :model="placeForm"
                 ref="placeForm"
                 label-width="80px"
                 class="addType"
                 :rules="placeRules">
          <el-form-item label="名称"
                        prop="place_name">
            <el-input v-model="placeForm.place_name" />
          </el-form-item>
          <el-form-item label="分类"
                        prop="type_id">
            <el-select v-model="placeForm.type_id"
                       placeholder="请选择">
              <el-option v-for="item in placeTypeData"
                         :key="item.type_id"
                         :label="item.name"
                         :value="item.type_id">
              </el-option>
            </el-select>
            <el-button @click="addNewPlaceType"
                       icon="el-icon-plus"></el-button>
          </el-form-item>
          <el-form-item label="区域"
                        prop="area_id">
            <el-select v-model="placeForm.area_id"
                       placeholder="请选择">
              <el-option v-for="item in placeAreaData"
                         :key="item.area_id"
                         :label="item.area_name"
                         :value="item.area_id">
              </el-option>
            </el-select>
            <el-button @click="addNewPlaceArea"
                       icon="el-icon-plus"></el-button>
          </el-form-item>
          <el-form-item label="最少人数"
                        prop="min_people_num">
            <el-input v-model.number="placeForm.min_people_num" />
          </el-form-item>
          <el-form-item label="最多人数"
                        prop="max_people_num">
            <el-input v-model.number="placeForm.max_people_num" />
          </el-form-item>
          <el-form-item label="低消"
                        prop="basic_price">
            <el-input v-model.number="placeForm.basic_price" />
            <div>注：若座位单独设置低消，一座位低消为准。</div>
          </el-form-item>
          <el-form-item label="订金"
                        prop="deposit">
            <el-input v-model.number="placeForm.deposit" />
            <div>注：若座位单独设置订金，一座位订金为准。</div>
          </el-form-item>

          <el-form-item label="规则"
                        prop="rule_id">
            <el-select v-model="placeForm.rule_id"
                       placeholder="请选择">
              <el-option v-for="item in placeRuleData"
                         :key="item.rule_id"
                         :label="item.name"
                         :value="item.rule_id">
              </el-option>
            </el-select>
            <el-button @click="addNewPlaceRule"
                       icon="el-icon-plus"></el-button>
          </el-form-item>
          <el-form-item label="排序"
                        prop="sort">
            <el-input v-model.number="placeForm.place_sort" />
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch v-model="placeForm.place_status"
                       :active-value="1"
                       :inactive-value="0">
            </el-switch>
          </el-form-item>
          <div style="text-align: right">
            <el-button type=""
                       @click="placePlaceDialog = false">取消</el-button>
            <el-button type="primary"
                       @click="submitPlace"
                       :loading="isLoading">保存</el-button>
          </div>
        </el-form>
      </el-dialog>

      <el-dialog title="新建规则"
                 :visible.sync="placeRuleDialog"
                 destroy-on-close
                 :close-on-click-modal="false">
        <place-rule-editor :form-data="{
            merchant_id: merchants.merchant_id,
            shop_id: merchants.shop_id,
            status: true,
            allow_week_days: [],
          }"
                           @submit-ok="
            placeRuleDialog = false;
            getAllRule();
          "
                           @submit-cancel="placeRuleDialog = false" />
      </el-dialog>

      <el-dialog :title="typeForm.type_id == 0 ? '新建分类' : '编辑分类'"
                 :visible.sync="placeDialog"
                 :close-on-click-modal="false">
        <el-tabs v-model="activeName"
                 type="card"
                 @tab-click="tabsChange">
          <el-tab-pane label="基础信息"
                       name="information">
            <el-form :model="typeForm"
                     ref="typeForm"
                     v-if="placeDialog"
                     label-width="80px"
                     class="addType"
                     :rules="typeRules">
              <el-form-item label="类型名称"
                            prop="name">
                <el-input v-model="typeForm.name" />
              </el-form-item>
              <el-form-item label="最少人数"
                            prop="min_people_num">
                <el-input v-model.number="typeForm.min_people_num" />
              </el-form-item>
              <el-form-item label="最多人数"
                            prop="max_people_num">
                <el-input v-model.number="typeForm.max_people_num" />
              </el-form-item>
              <el-form-item label="低消"
                            prop="basic_price">
                <el-input v-model.number="typeForm.basic_price" />
              </el-form-item>
              <el-form-item label="订金"
                            prop="deposit">
                <el-input v-model.number="typeForm.deposit" />
              </el-form-item>
              <el-form-item label="排序"
                            prop="sort">
                <el-input v-model.number="typeForm.sort" />
              </el-form-item>

              <el-form-item label="图标"
                            prop="type_icon">
                <uploadFiles root="place"
                             ref="uploadImg"
                             @theIMG="theIMG"
                             :image-url="typeForm.icon" />
              </el-form-item>

              <el-form-item label="是否启用">
                <el-switch v-model="typeForm.status"
                           :active-value="1"
                           :inactive-value="0">
                </el-switch>
              </el-form-item>
              <div style="text-align: right">
                <!-- <el-button v-if="typeForm.status == 1"
                            type="danger"
                            @click="changeStatusClass(typeForm, false)">禁用</el-button>
                  <el-button v-if="typeForm.status == 0"
                            type="success"
                            @click="changeStatusClass(typeForm, true)">启用</el-button> -->
                <el-button v-if="typeForm.type_id > 0"
                           type="danger"
                           @click="deleteType">删除</el-button>
                <el-button @click="placeDialog = false">取消</el-button>
                <el-button type="primary"
                           @click="submitType"
                           :loading="isLoading">保存</el-button>
              </div>
            </el-form>
          </el-tab-pane>
          <!-- 相册 -->
          <el-tab-pane label="分类相册"
                       name="album"
                       v-if="this.typeForm.type_id!=0">
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
                         :src="item.path"
                         alt=""
                         @mouseover="picMouseover(index)"
                         @mouseleave="picMouseleave(index)"
                         @click="showImg(item.path, index)" />
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
                            :root="'place'"
                            :shop="isShop" />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>

      <el-dialog title="大图预览"
                 :visible.sync="imgDialogVisible"
                 width="20%">
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
                        :src="item.path.split('!')[0]"></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </div>
    <placeRule :merchants="merchants"
               v-if="showRuleBox && enable"
               @handleRuleBox="handleRuleBox"></placeRule>
    <my-group v-if="showGroupBox && enable"
              :merchants="merchants"
              :enable="enable"
              @handleGroupBox="handleGroupBox"></my-group>
  </div>
</template>
<script>
import PlaceArea from "./PlaceArea.vue";
import PlaceItem from "./placeItem.vue";
import placeTypeView from "./placeTypeView";
import placeRuleEditor from "./placeRuleEditor";
import placeRule from "@/views/shopset/PlaceRuleindex";
import group from "@/views/goods/components/group";
import uploadFiles from "@/components/uploadFiles";
import uploadFile from "@/components/uploadFile";

import _ from "lodash";
export default {
  name: "PlaceMain",
  components: {
    PlaceArea,
    PlaceItem,
    placeRule,
    placeTypeView,
    placeRuleEditor,
    uploadFiles,
    "my-group": group,
    uploadFile,
  },
  props: {
    merchants: Object,
    enable: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      activeName: "information",
      page_size: 10,
      showEditBtn: false,
      isLoading: false,
      placeDialog: false,
      placePlaceMultiDialog: false,
      placePlaceDialog: false,
      placeRuleDialog: false,
      showRuleBox: false,
      showGroupBox: false,
      soVal: "",
      options: [],
      multipleSelection: [],
      value: true,
      page: 1,
      count: 0,
      detaileData: [],
      title: "",
      gb_id: 0,
      placeFormType: "",
      placeFormArea: "",
      placeFormRule: "",
      placeAreaData: [],
      is_delete: false,
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
      order: "",
      sort: "",
      typeRules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        min_people_num: [
          { required: true, message: "请输入最少人数", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        max_people_num: [
          { required: true, message: "请输入最大人数", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        basic_price: [
          { required: true, message: "必须设置抵消数", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        deposit: [
          { required: true, message: "必须设置订金数", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        sort: [
          { required: true, message: "必须排序", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
      },
      placeRules: {
        place_name: [
          { required: true, message: "请输入名称", trigger: "blur" },
        ],
        type_id: [{ required: true, message: "请选择分类", trigger: "blur" }],
        area_id: [{ required: true, message: "请选择区域", trigger: "blur" }],
        min_people_num: [
          { required: true, message: "请输入最少人数", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        max_people_num: [
          { required: true, message: "请输入最大人数", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        basic_price: [
          { required: true, message: "必须设置抵消数", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
        deposit: [
          { required: true, message: "必须设置订金数", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
      },
      placeRuleData: [],
      placeForm: {
        place_id: 0,
        merchant_id: 0,
        shop_id: 0,
        type_id: null,
        area_id: null,
        place_name: "",
        place_desc: "",
        min_people_num: null,
        max_people_num: null,
        basic_price: null,
        deposit: null,
        rule_id: null,
        place_sort: 0,
        place_status: 1,
        place_desc: "",
      },
      placeMultiData: {
        basic_price: { isDef: true, value: null },
        deposit: { isDef: true, value: null },
        rule_id: { isDef: true, value: null },
        min_people_num: { isDef: true, value: null },
        max_people_num: { isDef: true, value: null },
        type_id: { isDef: true, value: null },
        area_id: { isDef: true, value: null },
        place_status: { isDef: true, value: null },
      },
      placListData: [
        {
          place_id: 0,
          merchant_id: 0,
          shop_id: 0,
          type_id: 0,
          type_name: "",
          area_id: 0,
          area_name: "",
          place_name: "",
          place_desc: "",
          min_people_num: 0,
          max_people_num: 0,
          basic_price: 0,
          deposit: 0,
          rule_id: 0,
          rule_name: "",
          place_sort: 0,
          place_status: 0,
          place_desc: "",
        },
      ],
      placeTypeData: [
        {
          type_id: "",
          name: "",
          sort: 0,
          min_people_num: "",
          max_people_num: "",
          basic_price: "",
          deposit: "",
          icon: "",
        },
      ],
      type_id: 0,
      area_id: "",
      editableTabsValue: "0",
      tabStatus: "0",
      typeForm: {
        type_id: 0,
        name: "",
        ename: "",
        min_people_num: "",
        max_people_num: "",
        basic_price: "",
        deposit: "",
        sort: 0,
        status: 1,
      },
      fileList: [],
      limit: 100,
      isShop: true,
      shopAlbumSort: {
        fileList: [],
        videoList: [],
      },
      imgDialogVisible: false,
      imgIndex: 0,
    };
  },
  methods: {
    //返回url
    oldPhotosTabUrl (url, types) {
      this.photosTabUrl(url[url.length - 1], 0);
    },
    //上传
    photosTabUrl (url, types) {
      let type = Number(types);
      let data = [];
      if (type == 0) {
        data = {
          merchant_id: Number(this.merchants.merchant_id),
          shop_id: Number(this.merchants.shop_id),
          place_type_id: this.type_id,
          data: [
            {
              album_path: url,
              album_sort: this.fileList.length,
              width: 100,
              height: 100,
            },
          ],
        };
      }
      console.log(data, "url");
      this.api.shop.PhotoInsertOne(data).then((result) => {
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
        page: 1,
        page_size: 10000,
        merchant_id: Number(this.merchants.merchant_id),
        shop_id: Number(this.merchants.shop_id),
        // sort: "",
        // order: "",
        place_type_id: this.type_id, //座位类型ID
      };
      console.log(data)
      //获得照片列表
      this.api.shop.shopalbumListTwo(data).then((result) => {
        this.shopAlbumSort.fileList = [];
        let res = result.data;
        let arr = res.data;
        for (var i = 0; i < arr.length; i++) {
          let obj = new Object();
          obj = arr[i];
          obj.status = false;
          this.fileList.push(obj);
          this.shopAlbumSort["fileList"].push(obj.album_sort);
        }
      });
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

    //拖拽排序
    draggableChangeFile (e) {
      for (let i = 0; i < this.fileList.length; i++) {
        this.fileList[i]["album_sort"] = i;
      }
      let dataArr = {
        merchant_id: Number(this.merchants.merchant_id),
        shop_id: Number(this.merchants.shop_id),
        place_type_id: this.type_id,
        album: this.fileList,
      };
      this.api.shop.PhotoSortOne(dataArr).then((res) => {
        console.log(res, "拖拽之后的相册-------------");
        this.GetPhotosUrl();
      });
    },
    showImg (imgUrl, i) {
      this.imgIndex = i;
      this.imgUrl = imgUrl;
      this.imgDialogVisible = true;
    },
    //删除图片
    deletePotoFun (id) {
      console.log(id, "==========");
      this.$confirm("确定要删除吗？", "提示")
        .then(() => {
          var idArr = [];
          idArr.push(id);
          var data = {
            id: idArr,
            merchant_id: Number(this.merchants.merchant_id),
            shop_id: Number(this.merchants.shop_id),
            place_type_id: this.type_id,
          };
          this.api.shop.PhotoDeleteTwo(data).then((result) => {
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
    tabsChange (val, e) {
      console.log(val.label)
      if (val.index == 1) {
        this.GetPhotosUrl();
      }
    },
    // 设置分页条数
    handleSizeChange (val) {
      this.page_size = val;
      this.getAllPlace(1);
    },
    //批量修改座位信息
    handleMultiPlace () {
      if (this.multipleSelection.length > 0) {
        for (let i in this.placeMultiData) {
          if (this.placeMultiData[i]) {
            this.placeMultiData[i].isDef = true;
            this.placeMultiData[i].value = null;
          }
        }
        this.placePlaceMultiDialog = true;
      } else {
        this.$message({
          message: "请选择座位",
          type: "warning",
        });
      }
    },
    //批量修改分类
    handleMultType (com) {
      if (this.multipleSelection.length > 0) {
        this.$confirm("确定将选择座位绑定到指定分类？", "提示")
          .then(() => {
            let datas = {
              merchant_id: Number(this.merchants.merchant_id),
              shop_id: Number(this.merchants.shop_id),
              place_id: this.multipleSelection,
              type_id: Number(com),
            };
            this.api.shop.shopPlaceBindType(datas).then(({ data }) => {
              let res = data;
              this.$message({
                message: res.msg,
                type: res.code == 0 ? "success" : "error",
              });
              this.reloadData();
              this.multipleSelection = [];
            });
          })
          .catch(() => { });
      } else {
        this.$message({
          message: "请选择座位",
          type: "warning",
        });
      }
    },
    toggleSelection () {
      this.$refs.multipleTable.toggleSelection();
    },
    //批量修改区域
    handleMultArea (com) {
      if (this.multipleSelection.length > 0) {
        this.$confirm("确定将选择座位绑定到指定区域？", "提示")
          .then(() => {
            let datas = {
              merchant_id: Number(this.merchants.merchant_id),
              shop_id: Number(this.merchants.shop_id),
              place_id: this.multipleSelection,
              area_id: Number(com),
            };
            // console.info(datas);
            this.api.shop.shopPlaceBindArea(datas).then(({ data }) => {
              let res = data;
              this.$message({
                message: res.msg,
                type: res.code == 0 ? "success" : "error",
              });
              this.reloadData();
              this.multipleSelection = [];
            });
          })
          .catch(() => { });
      } else {
        this.$message({
          message: "请选择座位",
          type: "warning",
        });
      }
    },
    //图片上传子组件传值
    theIMG (url) {
      //this.addItem.type_icon = "https://files.ddhi.cn" + url;
      //this.currenItem.type_icon = "https://files.ddhi.cn" + url;
      this.typeForm.icon = url;
    },
    draggableChangeClass (obj) {
      let classSort = [];
      for (let i in this.placeTypeData) {
        this.placeTypeData[i].sort = this.placeTypeData.length - 1 - i;
        classSort.push({
          type_id: this.placeTypeData[i].type_id,
          sort: Number(this.placeTypeData[i].sort),
        });
      }
      // console.log(this.placeTypeData);
      let datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        place_type: classSort,
      };
      this.api.shop.placetypeSetSort(datas).then(({ data }) => {
        let res = data.data;
        this.getPlaceType();
      });
    },
    handleNewPlace () {
      if (this.placeTypeData.length <= 0) {
        this.$confirm("尚未设置座位分类，请先新建座位分类...", "提示", {
          confirmButtonText: "新建座位分类",
        })
          .then(() => {
            this.addNewPlaceType();
          })
          .catch((e) => {
            console.log(e);
          });
        return;
      }
      this.placeForm = {
        place_id: 0,
        merchant_id: 0,
        shop_id: 0,
        type_id: null,
        area_id: null,
        place_name: "",
        place_desc: "",
        min_people_num: null,
        max_people_num: null,
        basic_price: null,
        deposit: null,
        rule_id: null,
        place_sort: 0,
        place_status: 1,
        place_desc: "",
      };
      this.isLoading = false;

      this.placePlaceDialog = true;
    },
    handleEditPlace (row) {
      // console.info(row);

      this.placeForm = row;
      this.placeForm.type_id = row.type_id;
      this.isLoading = false;
      this.placePlaceDialog = true;
    },
    //打开座位套餐界面
    handleGroupBox () {
      this.showGroupBox = !this.showGroupBox;
    },
    //打开规则界面
    handleRuleBox () {
      this.showRuleBox = !this.showRuleBox;
    },
    changePlaceType (v) {
      this.placeFormType = v;
    },
    changePlaceArea (v) {
      this.placeFormArea = v;
    },
    changePlaceRule (v) {
      this.placeFormRule = v;
    },
    editClass (obj) {
      this.isLoading = false;
      this.typeForm = Object.assign({}, obj);
      //delete this.typeForm.icon;
      delete this.typeForm.place_count;
      // this.typeForm.basic_price = this.CalculateData(
      //   this.typeForm.basic_price,
      //   "/"
      // );
      // this.typeForm.deposit = this.CalculateData(this.typeForm.deposit, "/");
      // console.info(this.typeForm);
      this.placeDialog = true;
      this.$nextTick(() => {
        this.$refs.uploadImg.concert(this.typeForm.icon);
      });
    },
    selectedArea (obj) {
      this.area_id = Number(obj.area_id);
      this.getAllPlace();
    },
    tabFun (type_id) {
      this.activeName = "information"
      this.page = 1;
      this.type_id = Number(type_id);
      console.log(this.type_id);
      this.getAllPlace();
    },
    addNewPlaceType () {
      this.placeTypeData.icon = "";
      this.placeDialog = true;
      (this.typeForm = {
        type_id: 0,
        name: "",
        ename: "",
        min_people_num: "",
        max_people_num: "",
        basic_price: "",
        deposit: "",
        sort: 0,
        status: 1,
      }),
        this.$nextTick(() => {
          this.$refs.uploadImg.concert("");
          this.activeName = "information"
        });
    },
    addNewPlaceArea () {
      this.$refs.placeAreaComponent.handleSelectedArea("newArea");
    },
    addNewPlaceRule () {
      this.placeRuleDialog = true;
    },
    getAllPlace (p) {
      if (Number(p) > 0) {
        this.page = p;
      }
      const datas = {
        page: this.page,
        page_size: this.page_size,
        type_id: this.type_id,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        area_id: this.area_id,
        sort: this.sort,
        order: this.order,
        place_name: this.soVal,
      };
      if (Number(this.type_id) == 0) {
        delete datas.type_id;
      }
      if (Number(this.area_id) == 0) {
        delete datas.area_id;
      }
      if (this.is_delete) {
        datas.is_delete = 1;
      } else {
        delete datas.is_delete;
      }
      this.api.shop.placeList(datas).then(({ data }) => {
        let res = data;
        this.placListData = res.data;
        this.count = res.count;
        this.$refs.pagination.internalCurrentPage = this.page;
        if (this.placListData) {
          //计算金额
          for (var i = 0; i < this.placListData.length; i++) {
            this.placListData[i].basic_price = this.CalculateData(
              this.placListData[i].basic_price,
              "/"
            );
            this.placListData[i].deposit = this.CalculateData(
              this.placListData[i].deposit,
              "/"
            );
          }
        }
      });
    },
    // 获取座位类型列表
    getPlaceType (fun) {
      const datas = {
        page_size: 10000,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.api.shop.getPlaceType(datas).then(({ data }) => {
        let res = data;
        this.placeTypeData = res.data;
        for (var i = 0; i < this.placeTypeData.length; i++) {
          this.placeTypeData[i].basic_price = this.CalculateData(
            this.placeTypeData[i].basic_price,
            "/"
          );
          this.placeTypeData[i].deposit = this.CalculateData(
            this.placeTypeData[i].deposit,
            "/"
          );
        }
        console.log(this.placeTypeData, "123");
        // this.placeTypeData.forEach((item, index) => {
        //   if (index == 0) {
        //     this.type_id = item.type_id;
        //     this.editableTabsValue = item.type_id + "";
        //   }
        //   item.type_id = String(item.type_id);
        //   // let obj = item
        //   // obj.name = index + 1 + ''
        // });
        if (fun) fun();
      });
    },
    //批量修改座位信息
    submitMultiPlace () {
      if (this.multipleSelection.length > 0) {
        this.$confirm(
          "确定批量修改 [" + this.multipleSelection.length + "] 条座位信息吗？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            let isCheck = true;
            let isHasValue = false;
            let datas = {};
            for (let i in this.placeMultiData) {
              let obj = this.placeMultiData[i];
              if (obj.value != undefined) {
                this.placeMultiData[i].isDef = false;
                if (isNaN(obj.value)) {
                  isCheck = false;
                  break;
                } else {
                  isHasValue = true;
                  if (i == "deposit" || i == "basic_price") {
                    datas[i] = this.CalculateData(obj.value, "*");
                  } else if (i == "place_status") {
                    datas[i] = obj.value ? 1 : 0;
                  } else {
                    datas[i] = obj.value;
                  }
                }
              } else {
                this.placeMultiData[i].isDef = true;
              }
            }
            if (isCheck) {
              if (isHasValue) {
                datas["id"] = this.multipleSelection;
                datas["merchant_id"] = Number(this.merchants.merchant_id);
                datas["shop_id"] = Number(this.merchants.shop_id);
                // console.info("提交数据", datas);
                this.isLoading = true;
                this.$store
                  .dispatch("shop/updatPlaceList_batch", datas)
                  .then((res) => {
                    this.$message({
                      message: res.msg,
                      type: res.code == 0 ? "success" : "error",
                    });
                    this.isLoading = false;
                    this.placePlaceMultiDialog = false;
                    this.reloadData();
                  });
              }
            } else {
              this.$message({
                message: "请设置正确的数据",
                type: "warning",
              });
            }
          })
          .catch((err) => { });
      } else {
        this.$message({
          message: "请选择座位",
          type: "warning",
        });
      }
    },
    //提交座位
    submitPlace () {
      this.$refs["placeForm"].validate((valid) => {
        if (valid) {
          let datas = _.cloneDeep(this.placeForm);
          delete datas.operator_id;
          delete datas.type_name;
          delete datas.area_name;
          delete datas.rule_name;
          datas.type_id = Number(this.placeForm.type_id);
          datas.min_people_num = Number(datas.min_people_num);
          datas.max_people_num = Number(datas.max_people_num);
          datas.basic_price = this.CalculateData(datas.basic_price, "*");
          datas.deposit = this.CalculateData(datas.deposit, "*");
          datas.merchant_id = Number(this.merchants.merchant_id);
          datas.shop_id = Number(this.merchants.shop_id);
          // console.info(datas);
          this.isLoading = true;
          if (datas.place_id == 0) {
            delete datas.place_id;
            this.$store
              .dispatch("shop/addPlaceList", datas)
              .then((res) => {
                this.$message({
                  message: res.msg,
                  type: res.code == 0 ? "success" : "error",
                });
                this.placeForm.place_name = "";
                this.isLoading = false;
                this.reloadData();
                this.typeForm = {
                  type_id: 0,
                  name: "",
                  ename: "",
                  min_people_num: "",
                  max_people_num: "",
                  basic_price: "",
                  deposit: "",
                  sort: 0,
                  status: 1,
                };
              })
              .catch((e) => {
                console.error(e);
                this.isLoading = false;
              });
          } else {
            this.$store
              .dispatch("shop/updatPlaceList", datas)
              .then((res) => {
                this.$message({
                  message: res.msg,
                  type: res.code == 0 ? "success" : "error",
                });
                this.isLoading = false;
                this.placePlaceDialog = false;
                this.reloadData();
                this.typeForm = {
                  type_id: 0,
                  name: "",
                  ename: "",
                  min_people_num: "",
                  max_people_num: "",
                  basic_price: "",
                  deposit: "",
                  sort: 0,
                  status: 1,
                };
              })
              .catch((e) => {
                console.error(e);
                this.isLoading = false;
              });
          }
        }
      });
    },
    changeStatusClass (row, status) {
      //this.tabFun(row.type_id);
      this.type_id = row.type_id;
      let datas = {
        shop_id: Number(this.merchants.shop_id),
        merchant_id: Number(this.merchants.merchant_id),
        type_id: this.type_id,
        status: status ? 1 : 0,
      };
      this.isLoading = true;
      this.$store
        .dispatch("shop/updatePlaceType", datas)
        .then((res) => {
          this.isLoading = false;
          this.$message({
            message: res.msg,
            type: res.code == 0 ? "success" : "error",
          });
          this.reloadData();
          this.placeDialog = false;
        })
        .catch((e) => {
          this.isLoading = false;
        });
    },
    //提交分类
    submitType () {
      this.$refs["typeForm"].validate((valid) => {
        if (valid) {
          this.typeForm.type_id = Number(this.typeForm.type_id);
          let datas = _.cloneDeep(this.typeForm);
          //datas.min_people_num = this.CalculateData(datas.min_people_num, "*");
          //datas.max_people_num = this.CalculateData(datas.max_people_num, "*");
          datas.basic_price = this.CalculateData(datas.basic_price, "*");
          datas.deposit = this.CalculateData(datas.deposit, "*");
          datas.shop_id = Number(this.merchants.shop_id);
          datas.merchant_id = Number(this.merchants.merchant_id);
          //datas.ename = datas.name;
          this.isLoading = true;
          if (datas.type_id == 0) {
            //新建
            delete datas.type_id;
            this.$store
              .dispatch("shop/createPlaceType", datas)
              .then((res) => {
                this.$message({
                  message: res.msg,
                  type: res.code == 0 ? "success" : "error",
                });
                this.isLoading = false;
                this.placeDialog = false;
                this.typeForm = {
                  type_id: 0,
                  name: "",
                  ename: "",
                  min_people_num: "",
                  max_people_num: "",
                  basic_price: "",
                  deposit: "",
                  sort: 0,
                  status: 1,
                };
                this.reloadData();
              })
              .catch((e) => {
                console.error(e);
                this.isLoading = false;
              });
          } else {
            this.$store
              .dispatch("shop/updatePlaceType", datas)
              .then((res) => {
                this.$message({
                  message: res.msg,
                  type: res.code == 0 ? "success" : "error",
                });
                this.isLoading = false;
                this.placeDialog = false;
                this.reloadData();
                this.typeForm = {
                  type_id: 0,
                  name: "",
                  ename: "",
                  min_people_num: "",
                  max_people_num: "",
                  basic_price: "",
                  deposit: "",
                  sort: 0,
                  status: 1,
                };
              })
              .catch((e) => {
                console.error(e);
                this.isLoading = false;
              });
          }
        }
      });
    },
    //删除分类
    deleteType () {
      if (Number(this.typeForm.type_id) > 0) {
        this.$confirm("确定要删除吗？", "提示", {
          type: "warning",
        }).then(() => {
          let datas = {
            id: [Number(this.typeForm.type_id)],
            merchant_id: Number(this.merchants.merchant_id),
            shop_id: Number(this.merchants.shop_id),
          };
          this.$store.dispatch("shop/deletePlaceType", datas).then((res) => {
            this.$message({
              message: res.msg,
              type: res.code == 0 ? "success" : "error",
            });
            this.placeDialog = false;
            this.reloadData();
          });
        });
      }
    },
    //获得所有规则
    getAllRule () {
      let datas = {
        page_size: 1000000,
        merchant_id: Number(this.merchants.merchant_id),
        shop_id: Number(this.merchants.shop_id),
        status: 1,
      };
      this.$store.dispatch("shop/getPlaceRule", datas).then((res) => {
        this.placeRuleData = res.data;
      });
    },
    //翻页
    pageChange (val) {
      this.page = val;
      this.getAllPlace();
    },
    //重载规则数据
    reloadRule () {
      this.getAllRule();
    },
    //重载数据
    reloadData () {
      this.getPlaceType(() => {
        this.getAllPlace();
        this.getAllRule();
      });
    },
    getPlaceAreaData (data) {
      this.placeAreaData = data;
      console.log(this.placeAreaData);
    },
    //切换回收站
    handleDeleteBox (v) {
      this.is_delete = v;
      this.reloadData();
    },
    deletePlace (items) {
      if (items.list.length) {
        this.showEditBtn = true;
      } else {
        this.showEditBtn = false;
      }
      this.multipleSelection = items.list;
      if (items.isDelete) {
        this.handleDeletePlace();
      }
    },
    handleDeletePlace () {
      if (this.multipleSelection.length > 0) {
        this.$confirm("确定删除吗？", "提示").then(() => {
          let datas = {
            id: this.multipleSelection,
            merchant_id: Number(this.merchants.merchant_id),
            shop_id: Number(this.merchants.shop_id),
          };
          this.$store.dispatch("shop/deletePlaceList", datas).then((res) => {
            this.multipleSelection = [];
            this.getAllPlace();
          });
        });
      }
    },

    recoveryPlace (items) {
      this.multipleSelection = items.list;
      if (items.isRecovery) {
        this.handleRecoveryPlace();
      }
    },
    handleRecoveryPlace () {
      if (this.multipleSelection.length > 0) {
        this.$confirm("确定还原吗？", "提示").then(() => {
          let datas = {
            id: this.multipleSelection,
            merchant_id: Number(this.merchants.merchant_id),
            shop_id: Number(this.merchants.shop_id),
          };
          this.$store.dispatch("shop/recoveryPlaceList", datas).then((res) => {
            this.multipleSelection = [];
            this.getAllPlace();
          });
        });
      }
    },
    sortPlace (obj) {
      this.sort = obj.order ? obj.prop : "";
      this.order = obj.order ? this.sortableList[obj.order] : "";
      this.page = 1;
      this.getAllPlace();
    },
  },
  watch: {
    enable: {
      immediate: true,
      handler (val) {
        if (val) {
          this.reloadData();
        }
      },
    },
  },
  created () {
    // this.GetPhotosUrl()
  },
};
</script>

<style lang="scss" scoped>
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
.el-button--primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
.shopSet {
  margin: 15px;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #dfdfdf;
}
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
.btnBox {
  display: flex;
  border: 1px solid #dfdfdf;
  background: #f8f8f8;
  height: 40px;
  line-height: 38px;
  border-radius: 3px;
}
.g-btn {
  font-size: 14px;
  color: #2e2e2e;
  float: left;
  width: 70px;
  height: 38px;
  text-align: center;
  cursor: pointer;
}
.jia-btn {
  border-right: 1px solid #dfdfdf;
}
.so-nav {
  display: flex;
}
.sosuo {
  margin-left: 10px;
}
.so-ipt {
  border-color: #cecece;
  margin-left: 10px;
}
.el-input__suffix {
  color: #000 !important;
  font-weight: bold;
}
.pagination {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
}
.el-button--text {
  color: #0a0a0a;
}
.addClassBtn {
  margin-left: 22px;
  width: 104px;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: #dda100;
  margin-bottom: 10px;
  text-align: center;
  border-radius: 25px;
  background: #fff6df;
  border: 1px solid #ffbe11;
}
.shopSet >>> .el-tabs__item.is-active {
  color: #0a0a0a;
}
.shopSet >>> .el-tabs__item:hover {
  color: #0a0a0a;
}
.edit-icon {
  margin-left: 6px;
  color: #dda100;
}
.shopSet >>> .el-tabs--left .el-tabs__header.is-left {
  width: 150px;
}
.shopSet >>> .el-tabs--left.el-tabs--card .el-tabs__nav {
  border-bottom: none;
}
.pagebox {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
.goods-class-list,
.goods-class-list-left,
.goods-class-list-right {
  cursor: pointer;
  height: 40px;
  font-size: 16px;
}
.goods-class-list-left {
  float: left;
  min-width: 50%;
}
.goods-class-list-right {
  float: right;
  font-size: 14px;
  color: #909399;
}
.goods-class-list-selected {
  color: #e6a23c;
  font-weight: bold;
}
.y-btn {
  background-color: #fff6df !important;
  border: 1px solid #ffcf4d;
  color: #000;
}
</style>
