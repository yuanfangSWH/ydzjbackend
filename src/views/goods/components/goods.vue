<template>
  <div class="shopSet">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card>
          <div class="goods-class-list-left" @click="addGoodsClassOpen">
            <i class="el-icon-plus">新建分类</i>
          </div>
        </el-card>

        <el-card :shadow="class_id == 0 ? 'never' : 'always'">
          <div
            :class="
              'goods-class-list-left' +
              (class_id == 0 ? ' goods-class-list-selected' : '')
            "
            @click="tabFun(0)"
          >
            <i class="el-icon-folder-opened">
              <span style="padding-right: 10px">显示全部</span>
              <!-- （{{count > 0 ? count : ''}}） -->
            </i>
          </div>
        </el-card>

        <draggable
          class="list-group"
          v-model="GoodsClass"
          :options="{ animation: 120 }"
          @change="draggableChangeClass"
        >
          <el-card
            v-for="(item, index) in GoodsClass"
            :key="'class' + index"
            :shadow="class_id == item.class_id ? 'never' : 'always'"
          >
            <div
              @click="tabFun(item.class_id)"
              :class="
                'goods-class-list-left' +
                (class_id == item.class_id
                  ? ' goods-class-list-selected'
                  : '') +
                (item.status != 1 ? ' shixiao' : '')
              "
            >
              <span>{{ item.class_name }}</span>
              <span v-if="item.class_count > 0">({{ item.class_count }})</span>
            </div>
            <i
              class="el-icon-edit"
              style="float: right; color: #dda100; cursor: pointer"
              v-if="class_id == item.class_id"
              @click="editClass(item)"
            ></i>
            <!-- <span class="goods-class-list-right">
              <el-button type="warning"
                         size="mini"
                         @click="editClass(item)">编辑</el-button>
              <el-button type="danger"
                         size="mini"
                         v-if="item.status == 1"
                         @click="changeStatusClass(item, false)">禁用</el-button>
              <el-button type="success"
                         size="mini"
                         v-if="item.status == 0"
                         @click="changeStatusClass(item, true)">启用</el-button>
            </span> -->
            <!-- <span class="goods-class-list-right"
                  v-if="item.status == 0">
              <el-button type=""
                         size="mini"
                         @click="editClass(item)">编辑</el-button>
              <el-button type=""
                         size="mini"
                         @click="changeStatusClass(item, true)">启用</el-button>
            </span> -->
          </el-card>
        </draggable>
      </el-col>
      <el-col :span="20">
        <div class="add-box">
          <div class="btn-nav">
            <el-button type="primary" @click="addOpen">新增商品</el-button>
            <el-button type="primary" @click="addGroupOpen">新增套餐</el-button>
          </div>
          <div class="so-nav">
            <div class="btnBox">
              <div class="g-btn jia-btn" @click="putawayFun(1)">上架</div>
              <div class="g-btn jia-btn" @click="putawayFun(2)">下架</div>
              <div class="g-btn" @click="batchDelete">删除</div>
            </div>
            <el-input
              class="so-ipt"
              placeholder="请输入商品名称"
              suffix-icon="el-icon-search"
              v-model="soVal"
              @change="seachFun"
            >
            </el-input>
            <el-button class="sosuo" type="primary" @click="seachFun" clearable
              >搜索</el-button
            >
          </div>
        </div>
        <div class="tabsBox">
          <el-tabs
            type="border-card"
            v-model="tabStatus"
            @tab-click="oneTabFun"
          >
            <el-tab-pane label="已上架">
              <goods-item
                :merchants="merchants"
                :options="options"
                @childFun="parentFun"
                @edit="editOpen"
              ></goods-item>
            </el-tab-pane>
            <el-tab-pane label="已下架">
              <goods-item
                :merchants="merchants"
                :options="options"
                @childFun="parentFun"
                @edit="editOpen"
              ></goods-item>
            </el-tab-pane>
          </el-tabs>
          <div class="picStroe" @click="toPictureStore">商品图库</div>
        </div>

        <div class="pagination">
          <el-pagination
            ref="pagination"
            :current-page="page"
            :hide-on-single-page="true"
            @current-change="pageChange"
            background
            layout="prev, pager, next,jumper"
            :total="count"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="30%"
    >
      <el-form
        :model="classForm"
        :rules="rules"
        ref="classForm"
        label-width="150px"
        class="demo-classForm"
      >
        <el-form-item label="分类名称" prop="class_name">
          <el-input v-model="classForm.class_name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="class_sort">
          <el-input v-model="classForm.class_sort"></el-input>
        </el-form-item>
        <el-form-item label="启用状态" prop="status">
          <el-switch v-model="classForm.status"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="delClass(classForm.class_id, classForm.class_name)"
            type="danger"
            >删除分类</el-button
          >
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm('classForm')"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增分类 -->
    <el-dialog
      title="新增商品分类"
      :visible.sync="dialogVisibleAdd"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="30%"
    >
      <el-form
        :model="classFormAdd"
        :rules="rules"
        ref="classFormAdd"
        label-width="150px"
        class="demo-classForm"
      >
        <el-form-item label="分类名称" prop="class_name">
          <el-input v-model="classFormAdd.class_name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="class_sort">
          <el-input v-model="classFormAdd.class_sort"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="classFormAdd.status"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisibleAdd = false">取消</el-button>
          <!-- <el-button @click="resetForm('classFormAdd')">重置</el-button> -->
          <el-button type="primary" @click="submitFormAdd('classFormAdd')"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 删除分类 -->
    <el-dialog
      :title="delClasstitle"
      :visible.sync="deldialogClass"
      width="30%"
    >
      <span>确定要删除此分类吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deldialogClass = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelClassFun">确定</el-button>
      </span>
    </el-dialog>

    <!--添加商品-->
    <el-dialog
      title="添加商品"
      :visible.sync="addGoodsDialog"
      destroy-on-close
      :close-on-click-modal="false"
      width="70%"
    >
      <add-goods
        :merchants="{
          merchant_id: merchants.merchant_id,
          shop_id: merchants.shop_id,
        }"
        :classId="class_id"
        :goods-class="GoodsClass"
        @close="addOpen"
        @reload="
          getGoodsList();
          getGoodsClass();
        "
        @addNewGoodsClass="addGoodsClassOpen"
      />
    </el-dialog>

    <!--编辑商品-->
    <el-dialog
      title="编辑商品"
      :visible.sync="editGoodsDialog"
      destroy-on-close
      :close-on-click-modal="false"
      @opened="showEditGoods"
      width="70%"
    >
      <edit-goods
        ref="editGoodsRef"
        :merchants="{
          merchant_id: merchants.merchant_id,
          shop_id: merchants.shop_id,
          goods_id: goods_id,
        }"
        :goods-class="GoodsClass"
        @close="editOpen"
        @reload="getGoodsList"
        @addNewGoodsClass="addGoodsClassOpen"
      />
    </el-dialog>

    <!--添加商品套餐-->
    <el-dialog
      title="添加商品套餐"
      :visible.sync="addGroupDialog"
      destroy-on-close
      :close-on-click-modal="false"
      width="70%"
    >
      <add-group
        :merchants="{
          merchant_id: merchants.merchant_id,
          shop_id: merchants.shop_id,
        }"
        :classId="class_id"
        :goods-class="GoodsClass"
        @close="addGroupOpen"
        @reload="
          getGoodsList();
          getGoodsClass();
        "
        @addNewGoodsClass="addGoodsClassOpen"
      />
    </el-dialog>

    <!--编辑商品套餐-->
    <el-dialog
      title="编辑商品套餐"
      :visible.sync="editGroupDialog"
      destroy-on-close
      :close-on-click-modal="false"
      width="70%"
      @opened="showEditGroup"
    >
      <edit-group
        ref="editGroupRef"
        :merchants="{
          merchant_id: merchants.merchant_id,
          shop_id: merchants.shop_id,
          goods_id: goods_id,
        }"
        :goods-class="GoodsClass"
        @close="editOpen"
        @reload="getGoodsList"
        @addNewGoodsClass="addGoodsClassOpen"
      />
    </el-dialog>

    <!-- 删除商品 -->
    <el-dialog :title="deltitle" :visible.sync="deldialogVisible" width="30%">
      <span>确定要删除此商品吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deldialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelFun">确定</el-button>
      </span>
    </el-dialog>
    <!-- 批量删除 -->
    <el-dialog title="批量删除" :visible.sync="batchdialogVisible" width="30%">
      <span class="s-title">确定要删除以下商品吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
        {{ item }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelbatch">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import goodsItem from "./goodsItem";
import addGoods from "./addGoods";
import editGoods from "./editGoods";
import addGroup from "./addGroupGoods";
import editGroup from "./editGroupGoods";
import _ from "lodash";
export default {
  name: "Goods",
  components: {
    goodsItem,
    addGoods,
    editGoods,
    addGroup,
    editGroup,
  },
  props: {
    enable: { type: Boolean, default: false },
    merchants: {
      type: Object,
    },
  },
  data() {
    return {
      addGoodsDialog: false, //添加商品弹窗是否弹出
      editGoodsDialog: false, //编辑商品弹窗是否弹出
      addGroupDialog: false, //添加套餐弹窗是否弹出
      editGroupDialog: false, //编辑套餐弹窗是否弹出
      goodsData: {}, //需要编辑的商品数据
      pageSign: 0,
      soVal: "",
      options: [],
      multipleSelection: "",
      value: true,
      page: 1,
      count: 0,
      detaileData: [],
      dialogVisible: false,
      title: "",
      goods_id: 0,
      sortStatus: false,
      f_status: 1,
      dataForm: {
        goods_id: 0,
        name: "",
        price: 0,
        vip_price: 0,
        unit: "",
        image: "",
        images: "", //商品是否多图 0否 1是
        status: 0,
      },
      rules: {
        class_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      classFormAdd: {
        class_name: "",
        class_sort: 0,
        status: true,
      },
      classForm: {
        class_id: 0,
        class_name: "",
        class_sort: 0,
        status: false,
      },
      deldialogVisible: false,
      deldialogClass: false,
      delClasstitle: "",
      deltitle: "",
      dialogVisibleAdd: false,
      dataFormAdd: {
        name: "",
        price: 0,
        vip_price: 0,
        unit: "",
        image: "",
        images: "", //商品是否多图 0否 1是
        status: 0,
      },
      batchdialogVisible: false,
      nameArr: [],
      statusArr: [
        { text: "下架", value: "0" },
        { text: "售完", value: "1" },
        { text: "正常", value: "2" },
        { text: "删除", value: "3" },
      ],
      order: "desc",
      sortVal: "create_time",
      GoodsClass: [],
      class_id: 0,
      editableTabsValue: "52",
      tabStatus: "0",
      goods_status: 1,
    };
  },
  watch: {
    enable: {
      immediate: true,
      handler(val) {
        if (val) {
          this.reloadData();
        }
      },
    },
  },
  created() {},
  methods: {
    draggableChangeClass(obj) {
      let classSort = [];
      for (let i in this.GoodsClass) {
        this.GoodsClass[i].class_sort = this.GoodsClass.length - 1 - i;
        classSort.push({
          class_id: this.GoodsClass[i].class_id,
          class_sort: Number(this.GoodsClass[i].class_sort),
        });
      }
      let datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        class: classSort,
      };
      this.api.goods.goodsClassSetSort(datas).then(({ data }) => {
        let res = data.data;
        this.getGoodsClass();
      });
    },

    /**
     * @description: 重新加载数据，先获得商品类型后，回得商品列表默认数据
     * @return void
     */
    reloadData() {
      this.getGoodsClass(() => {
        this.getGoodsList();
      });
    },
    parentFun(Val, order, key, n) {
      if (n == 1) {
        //排序
        this.sortVal = Val;
        this.order = order;
        this.sortDataFun();
      } else if (n == 2) {
        //筛选
        this.f_status = Val;
        if (key == "status" && Val) {
          this.filterGetGoodsList();
        } else {
          this.getGoodsList();
        }
      } else if (n == 3) {
        //删除单个商品
        this.deldialogVisible = true;
        this.goods_id = Val;
        this.deltitle = key;
        // this.getGoodsClass()
      } else if (n == 4) {
        //删除单个商品
        if (Val.length == 0) {
          this.multipleSelection = "";
          this.nameArr = [];
        } else {
          this.multipleSelection = Val;
          this.nameArr = key;
        }
        this.getGoodsClass();
      }
    },

    filterGetGoodsList() {
      this.pageSign = 2;
      let data = {
        page: this.page,
        status: this.f_status,
        class_id: this.class_id,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.$store.dispatch("goods/getGoodsList", data).then((res) => {
        this.setOptions(res.data);

        this.count = res.count;
      });
    },
    setOptions(data) {
      this.options = [];
      for (let i in data) {
        this.options[i] = data[i];
        this.options[i]["sortIsEdit"] = false;
      }
    },

    sortDataFun() {
      this.pageSign = 3;
      let data = {
        page: this.page,
        status: this.goods_status,
        sort: this.sortVal,
        order: this.order,
        class_id: this.class_id,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      if (this.class_id == 0) {
        delete datas.class_id;
      }
      this.$store.dispatch("goods/getGoodsList", data).then((res) => {
        this.setOptions(res.data);

        this.count = res.count;
      });
    },
    tabFun(class_id) {
      this.page = 1;
      this.class_id = Number(class_id);
      if (this.tabStatus == "1") {
        // 已下架
        this.getSoldOutList();
      } else {
        // 全部商品
        this.getGoodsList();
      }
    },

    oneTabFun(val) {
      if (val.index == "1") {
        // 已下架
        this.getSoldOutList();
      } else {
        // 全部商品
        this.getGoodsList();
      }
    },
    // 获取商品列表
    getGoodsList() {
      this.addGoodsDialog = false;
      this.editGoodsDialog = false;
      this.addGroupDialog = false;
      this.editGroupDialog = false;
      this.goods_status = 1;
      this.pageSign = 0;
      const datas = {
        page: this.page,
        class_id: this.class_id,
        status: this.goods_status,
        sort: this.sortVal,
        order: this.order,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      if (this.class_id == 0) {
        delete datas.class_id;
      }
      this.$store.dispatch("goods/getGoodsList", datas).then((res) => {
        this.setOptions(res.data);

        this.count = res.count;
        this.$refs.pagination.internalCurrentPage = this.page;
      });
    },
    // 获取已下架商品列表
    getSoldOutList() {
      this.goods_status = 2;
      this.pageSign = 4;
      const datas = {
        page: this.page,
        class_id: this.class_id,
        status: this.goods_status,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      if (this.class_id == 0) {
        delete datas.class_id;
      }
      this.$store.dispatch("goods/getGoodsList", datas).then((res) => {
        this.setOptions(res.data);
        this.count = res.count;
        this.$refs.pagination.internalCurrentPage = this.page;
      });
    },

    /**
     * @description: 弹出新增商品对话框，也可以用于对话框关闭后调用。
     * @param {Boolean} isReload 是否重新加载商品列表，用于关闭对话框调用。
     * @return void
     */
    addOpen(isReload) {
      if (!this.addGoodsDialog && this.GoodsClass.length == 0) {
        this.$confirm("尚未设置商品分类，请先新建商品分类...", "提示", {
          confirmButtonText: "新建商品分类",
        })
          .then(() => {
            this.addGoodsClassOpen();
          })
          .catch((e) => {
            console.log(e);
          });
        return;
      }
      this.addGoodsDialog = !this.addGoodsDialog;
      if (isReload === true) {
        this.getGoodsList();
      }
    },

    /**
     * @description: 弹出新增商品套餐对话框，也可以用于对话框关闭后调用。
     * @param {Boolean} isReload 是否重新加载商品列表，用于关闭对话框调用。
     * @return void
     */
    addGroupOpen(isReload) {
      if (!this.addGoodsDialog && this.GoodsClass.length == 0) {
        this.$message({
          message: "尚未设置商品分类，请先新建商品分类...",
          type: "warning",
          duration: 0,
          showClose: true,
        });
        return;
      }
      this.addGroupDialog = !this.addGroupDialog;
      if (isReload === true) {
        this.getGoodsList();
      }
    },

    /**
     * @description: 编辑商品对话框渲染完成后设置编辑数据
     * @return void
     */
    showEditGoods() {
      const datas = {
        id: this.goodsData.goods_id,
        merchant_id: this.goodsData.merchant_id,
        shop_id: this.goodsData.shop_id,
      };
      this.$refs["editGoodsRef"].getGoodsDetaile(datas);
    },

    /**
     * @description: 编辑套餐对话框渲染完成后设置编辑数据
     * @return void
     */
    showEditGroup() {
      const datas = {
        id: this.goodsData.goods_id,
        merchant_id: this.goodsData.merchant_id,
        shop_id: this.goodsData.shop_id,
      };
      this.$refs["editGroupRef"].getGoodsDetaile(datas);
    },

    /**
     * @description: 弹出编辑商品对话框，也可用于对话框关闭后调用
     * @param {Object} row 被编辑即商品数据
     * @param {Boolean} isReload 是否重新加载商品列表，用于关闭对话框调用。
     * @return void
     */
    editOpen(row, isReload) {
      //console.info(row);
      this.goodsData = row;
      if (row.is_combo == 0) this.editGoodsDialog = !this.editGoodsDialog;
      if (row.is_combo == 1) this.editGroupDialog = !this.editGroupDialog;
      if (isReload) {
        this.getGoodsList();
      }
    },

    /**
     * @description: 重置表单数据
     * @param {String} formName 表单名称，即ref名称
     * @return void
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**
     * @description: 确认删除单个商品,用于当用户点击确认删除提示框后调用。
     * @return void
     */
    confirmDelFun() {
      let arr = [];
      arr.push(this.goods_id);
      const datas = {
        id: arr,

        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.$store.dispatch("goods/deleteGoods", datas).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.getGoodsList();
        this.getGoodsClass();
        this.deldialogVisible = false;
      });
    },

    /**
     * @description: 点击了批量删除商品按钮进行删除操作前的判断处理
     * @return void
     */
    batchDelete() {
      if (this.multipleSelection) {
        this.batchdialogVisible = true;
      } else {
        this.$message({
          message: "请先勾选要删除的商品",
          type: "warning",
        });
      }
    },

    /**
     * @description: 确认批量删除，用于用户点击确认批量删除提示框后调用
     * @return void
     */
    confirmDelbatch() {
      // console.log('23',this.multipleSelection)
      const datas = {
        id: this.multipleSelection,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.$store.dispatch("goods/deleteGoods", datas).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.getGoodsList();
        this.batchdialogVisible = false;
      });
    },
    // 批量上下架
    putawayFun(n) {
      let k = n;
      if (this.multipleSelection) {
        const datas = {
          id: this.multipleSelection,
          status: Number(n),
          merchant_id: this.merchants.merchant_id,
          shop_id: this.merchants.shop_id,
        };
        this.$store.dispatch("goods/goodsUpDown", datas).then((res) => {
          this.$message({
            message: "" + res.msg,
            type: "success",
          });
          if (k == 1) {
            this.tabStatus = "0";
          }
          this.getGoodsList();
          this.batchdialogVisible = false;
        });
      } else {
        this.$message({
          message: "请先勾选要操作的商品",
          type: "warning",
        });
      }
    },

    // handleSelectionChange(val) {
    //   var arr=[]
    //   for(var i=0; i<val.length; i++){
    //     arr.push(val[i].goods_id)
    //     this.nameArr.push(val[i].name)
    //   }
    //   this.multipleSelection = arr
    //   // arr = Array.from(new Set(arr))
    //   this.nameArr = Array.from(new Set(this.nameArr))
    //   // this.multipleSelection = arr.join(',')
    // },

    /**
     * @description: 改变商品列表页码
     * @param {Number} val 页码
     * @return {*}
     */
    pageChange(val) {
      this.page = val;
      if (this.pageSign == 0) {
        this.getGoodsList();
      } else if (this.pageSign == 1) {
        this.seachFun();
      } else if (this.pageSign == 2) {
        this.filterGetGoodsList();
      } else if (this.pageSign == 3) {
        this.sortDataFun();
      } else if (this.pageSign == 4) {
        this.getSoldOutList();
      }
    },
    seachFun() {
      this.pageSign = 1;
      this.page = 1;
      const datas = {
        page: this.page,
        name: this.soVal,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        class_id: this.class_id,
      };
      if (this.class_id == 0) {
        delete datas.class_id;
      }
      this.$store.dispatch("goods/getGoodsList", datas).then((res) => {
        this.setOptions(res.data);
        this.count = res.count;
      });
    },
    // 获取分类列表
    getGoodsClass(fun) {
      const datas = {
        page_size: 10000,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      console.log(datas);
      this.$store.dispatch("goods/getGoodsClass", datas).then((res) => {
        this.GoodsClass = res.data;
        console.log(this.GoodsClass);
        // this.GoodsClass.forEach((item, index) => {
        //   if (index == 0) {
        //     this.class_id = item.class_id;
        //     this.editableTabsValue = item.class_id + "";
        //   }
        //   item.class_id = item.class_id;
        //   // let obj = item;
        //   // obj.name = index + 1 + "";
        // });
        if (fun) fun();
      });
    },
    //查看、修改商品分类
    editClass(row) {
      this.classForm = Object.assign({}, row);
      if (this.classForm.status == 1) {
        this.classForm.status = true;
      } else {
        this.classForm.status = false;
      }
      this.dialogVisible = true;
      this.title = "编辑-" + this.classForm.class_name;
    },
    //禁用分类
    changeStatusClass(row, status) {
      let apiPath = "";
      let datas = {};
      this.class_id = row.class_id;
      if (status) {
        this.classForm = Object.assign({}, row);
        this.classForm.status = status;

        datas = Object.assign({}, this.classForm);
        datas.status = status ? 1 : 0;
        datas.merchant_id = Number(this.merchants.merchant_id);
        datas.shop_id = Number(this.merchants.shop_id);
        datas.class_sort = Number(datas.class_sort);
        datas.class_id = Number(datas.class_id);

        delete datas.class_name;
        delete datas.class_count;
        delete datas.delete_time;
        apiPath = "goods/updateGoodsClass";
      } else {
        datas = {
          id: String(row.class_id),
          merchant_id: Number(this.merchants.merchant_id),
          shop_id: Number(this.merchants.shop_id),
        };
        apiPath = "goods/deleteGoodsClass";
      }
      this.$store.dispatch(apiPath, datas).then((res) => {
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.getGoodsClass(() => {
          this.getGoodsList();
        });
      });
    },
    //修改提交商品分类
    submitForm(formName) {
      //this.dialogVisible = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const datas = Object.assign({}, this.classForm);
          if (datas.status == true) {
            datas.status = 1;
          } else {
            datas.status = 0;
          }
          datas.merchant_id = Number(this.merchants.merchant_id);
          datas.shop_id = Number(this.merchants.shop_id);
          datas.class_sort = Number(datas.class_sort);
          datas.class_id = Number(datas.class_id);

          delete datas.class_count;
          delete datas.delete_time;
          this.$store.dispatch("goods/updateGoodsClass", datas).then((res) => {
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
            this.getGoodsClass(() => {
              this.getGoodsList();
            });
            this.dialogVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增商品分类弹框
    addGoodsClassOpen() {
      this.classFormAdd = {
        class_name: "",
        class_sort: 0,
        status: true,
      };
      this.dialogVisibleAdd = true;
    },
    //新增商品分类
    submitFormAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //this.classFormAdd.allow_special_date = this.classFormAdd.allow_special_date.join(',')
          let datas = Object.assign({}, this.classFormAdd);

          datas.class_sort = Number(datas.class_sort);
          if (datas.status == true) {
            datas.status = 1;
          } else {
            datas.status = 0;
          }
          datas.merchant_id = Number(this.merchants.merchant_id);
          datas.shop_id = Number(this.merchants.shop_id);

          this.$store.dispatch("goods/addGoodsClass", datas).then((res) => {
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
            this.getGoodsClass();
            this.dialogVisibleAdd = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除分类
    delClass(class_id, name) {
      this.deldialogClass = true;
      this.class_id = class_id;
      this.delClasstitle = name;
    },
    //确认删除分类
    confirmDelClassFun() {
      const datas = {
        id: String(this.class_id),
        merchant_id: Number(this.merchants.merchant_id),
        shop_id: Number(this.merchants.shop_id),
      };
      //this.$store.dispatch("goods/deleteGoodsClass", datas).then((res) => {
      this.api.goods.goodsClassRealDelete(datas).then(({ data }) => {
        let res = data;
        this.$message({
          message: "" + res.msg,
          type: "success",
        });
        this.getGoodsClass();
        this.deldialogClass = false;
        this.dialogVisible = false;
      });
    },
    toPictureStore() {
      this.$router.push("/pictureStroe");
    },
  },
};
</script>

<style scoped>
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
  cursor: pointer;
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
.shixiao {
  color: #ccc !important;
}
.tabsBox {
  position: relative;
  z-index: 0;
}
.picStroe {
  color: #e6a23c;
  border: 1px solid #e6a23c;
  background: #ffffff;
  padding: 0 8px;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  right: 10px;
  top: 8px;
  line-height: 23px;
  font-size: 14px;
}
</style>
