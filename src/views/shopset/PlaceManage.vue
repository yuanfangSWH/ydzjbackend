<template>
  <div class="placeManage">
    <div class="add-box">
      <el-button
        type="danger"
        @click="batchDelete"
        :disabled="!multipleSelection.length > 0"
        >删除</el-button
      >
      <el-button type="primary" @click="addPlaceDialog">新增</el-button>
      <el-button type="primary" @click="batchUpdate">批量修改</el-button>
      <el-input
        class="searchInput"
        placeholder="请输入要搜索的内容"
        v-model="searchValue"
        clearable
        @change="searchDatas"
      ></el-input>
    </div>

    <el-table
      ref="multipNum_area"
      @sort-change="sortFilterFun"
      stripe
      :data="placeListData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selectArea"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="全选/ID" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
          <span>{{ scope.row.place_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="place_name"
        label="座位名称"
        sortable="custom"
        width="120"
      />
      <el-table-column prop label="订金" sortable="custom" width="120">
        <template slot-scope="scope">{{ scope.row.deposit / 100 }}</template>
      </el-table-column>
      <el-table-column prop label="低消" sortable="custom" width="120">
        <template slot-scope="scope">{{
          scope.row.basic_price / 100
        }}</template>
      </el-table-column>
      <el-table-column prop="area_name" label="区域" />
      <el-table-column prop="type_name" label="类型" />
      <el-table-column prop="place_status" label="状态">
        <template slot-scope="scope">
          <!-- <i v-show="scope.row.place_status===1" class="el-icon-check"></i> -->
          <span v-if="scope.row.place_status == 0">禁用不显示、删除</span>
          <span v-if="scope.row.place_status == 1">启用</span>
          <span v-if="scope.row.place_status == 2">消费中</span>
          <span v-if="scope.row.place_status == 3">故障</span>
          <span v-if="scope.row.place_status == 4">故障显示消费中</span>
          <span v-if="scope.row.place_status == 5">暂时停用</span>
        </template>
      </el-table-column>
      <el-table-column prop="rule_name" label="规则名称" width="120" />
      <el-table-column align="right" label="操作">
        <!-- <template slot="header" slot-scope="scope">
          <el-input v-model="search" class="search" size="mini" placeholder="输入关键字搜索" :data-str="scope" />
        </template>-->
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              updateDialog(
                scope.$index,
                JSON.parse(JSON.stringify(scope.row)),
                'area'
              )
            "
            >修改</el-button
          >
          <el-button size="mini" type="danger" @click="openDelDialog(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :page-size="30"
        :current-page="curPage"
        :hide-on-single-page="true"
        @prev-click="prePage"
        @current-change="pageChange"
        @next-click="nextPage"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 弹窗 -->
    <el-dialog
      :title="placeDialogTitle"
      :visible.sync="placeDialog"
      @close="closeDialog"
    >
      <!-- 添加座位表单 -->
      <el-form
        v-show="showAddPlaceBox"
        ref="addArea"
        label-width="80px"
        class="addArea"
        :model="addPlaceData"
        :rules="AddPlaceRule"
      >
        <el-form-item label="座位名称" prop="place_name">
          <el-input v-model="addPlaceData.place_name" />
        </el-form-item>
        <el-form-item label="订金" prop="deposit">
          <el-input v-model="addPlaceData.deposit" />
        </el-form-item>
        <el-form-item label="低消" prop="basic_price">
          <el-input v-model="addPlaceData.basic_price" />
        </el-form-item>
        <el-form-item label="容纳人数" required>
          <div class="iptBox">
            <el-input
              v-model="addPlaceData.min_people_num"
              placeholder="最少人数"
            />
            <span>-</span>
            <el-input
              v-model="addPlaceData.max_people_num"
              placeholder="最多人数"
            />
          </div>
        </el-form-item>
        <el-form-item label="区域" required>
          <el-select v-model="addPlaceData.area_name" placeholder="请选择">
            <el-option
              v-for="item in placeAreaData"
              :key="item.area_id"
              :label="item.area_name"
              :value="item.area_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" required>
          <el-select v-model="addPlaceData.type_name" placeholder="请选择">
            <el-option
              v-for="item in placeTypeData"
              :key="item.type_id"
              :label="item.name"
              :value="item.type_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="座位规则" prop="rule_name">
          <el-select v-model="addPlaceData.rule_name" placeholder="请选择">
            <el-option
              v-for="item in placeRuleData"
              :key="item.rule_id"
              :label="item.name"
              :value="item.rule_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="place_sort">
          <el-input v-model="addPlaceData.place_sort" />
        </el-form-item>
        <el-form-item label="状态" prop="place_status">
          <el-select v-model="addPlaceData.place_status" placeholder="请选择">
            <el-option
              v-for="item in placeStatusData"
              :key="item.id"
              :label="item.name"
              :value="item.status_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="addPlace('addArea')">添加</el-button>
      </el-form>

      <!-- 修改座位表单 -->
      <el-form
        v-show="showUpdatePlaceBox"
        ref="updateArea"
        label-width="80px"
        class="updateArea"
        :model="currenPlaceItem"
        :rules="AddPlaceRule"
      >
        <el-form-item label="座位名称" prop="place_name">
          <el-input v-model="currenPlaceItem.place_name" />
        </el-form-item>
        <el-form-item label="订金" prop="deposit">
          <el-input v-model="currenPlaceItem.deposit" />
        </el-form-item>
        <el-form-item label="低消" prop="basic_price">
          <el-input v-model="currenPlaceItem.basic_price" />
        </el-form-item>
        <el-form-item label="容纳人数" required>
          <div class="iptBox">
            <el-input
              v-model="currenPlaceItem.min_people_num"
              placeholder="最少人数"
            />
            <span>-</span>
            <el-input
              v-model="currenPlaceItem.max_people_num"
              placeholder="最多人数"
            />
          </div>
        </el-form-item>
        <el-form-item label="区域" required>
          <!-- <el-input v-model="currenPlaceItem.area_name" /> -->
          <el-select v-model="currenPlaceItem.area_id" placeholder="请选择">
            <el-option
              v-for="item in placeAreaData"
              :key="item.area_id"
              :label="item.area_name"
              :value="item.area_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" required>
          <!-- <el-input v-model="currenPlaceItem.type_name" /> -->
          <el-select v-model="currenPlaceItem.type_id" placeholder="请选择">
            <el-option
              v-for="item in placeTypeData"
              :key="item.type_id"
              :label="item.name"
              :value="item.type_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="座位规则" prop="rule_name">
          <el-select v-model="currenPlaceItem.rule_name" placeholder="请选择">
            <el-option
              v-for="item in placeRuleData"
              :key="item.rule_id"
              :label="item.name"
              :value="item.rule_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="place_sort">
          <el-input v-model="currenPlaceItem.place_sort" />
        </el-form-item>
        <el-form-item label="状态">
          <!-- <el-switch v-model="currenPlaceItem.place_status" :data-str="currenPlaceItem.place_status" active-color="#13ce66" inactive-color="#ff4949"/> -->

          <el-select
            v-model="currenPlaceItem.place_status"
            placeholder="请选择"
          >
            <el-option
              v-for="item in placeStatusData"
              :key="item.id"
              :label="item.name"
              :value="item.status_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="updatePlace('updateArea')"
          >保存</el-button
        >
      </el-form>
    </el-dialog>

    <!-- 批量修改座位 -->
    <el-dialog title="批量修改" :visible.sync="mutilUpdatePlaceBox">
      <span class="s-title">已选：</span>
      <span class="gz-name" v-for="(item, index) in nameArr" :key="index"
        >{{ item }}，</span
      >

      <el-form
        ref="plupdateArea"
        :model="batchUpdateData"
        :rules="rules"
        label-width="80px"
        class="updateArea"
      >
        <el-form-item label="订金" prop="deposit">
          <el-input v-model="batchUpdateData.deposit" />
        </el-form-item>
        <el-form-item label="低消" prop="basic_price">
          <el-input v-model="batchUpdateData.basic_price" />
        </el-form-item>
        <el-form-item label="区域" prop="area_name">
          <el-select v-model="batchUpdateData.area_name" placeholder="请选择">
            <el-option
              v-for="item in placeAreaData"
              :key="item.area_id"
              :label="item.area_name"
              :value="item.area_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type_name">
          <el-select v-model="batchUpdateData.type_name" placeholder="请选择">
            <el-option
              v-for="item in placeTypeData"
              :key="item.type_id"
              :label="item.name"
              :value="item.type_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="座位规则" prop="rule_name">
          <el-select v-model="batchUpdateData.rule_name" placeholder="请选择">
            <el-option
              v-for="item in placeRuleData"
              :key="item.rule_id"
              :label="item.name"
              :value="item.rule_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="mutilUpdatePlaceBox = false">取 消</el-button>
        <el-button type="primary" @click="multiUpdate('plupdateArea')"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 删除座位 -->
    <el-dialog :title="deltitle" :visible.sync="deleteDialog" width="30%">
      <span>确定要删除此座位吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deletePlace">确定</el-button>
      </span>
    </el-dialog>
    <!-- 批量删除座位 -->
    <el-dialog title="批量删除" :visible.sync="batchdialogVisible" width="30%">
      <span class="s-title">确定要删除以下座位吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
        {{ item }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mutilUpdatePlaceBox = false">取 消</el-button>
        <el-button type="primary" @click="multiDelete">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ShopSet",
  props: {
    merchants: { shop_id: "", merchant_id: "" },
  },
  data() {
    return {
      msg: "座位管理",
      searchValue: "",
      placeDialogTitle: "",
      deltitle: "",
      curPage: 1,
      total: 0,
      showPageCount: [10, 15, 20, 30, 50],
      shopInfoData: {},
      placeAreaData: [],
      placeTypeData: [],
      placeRuleData: [],
      placeStatusData: [
        { status_id: 0, name: "禁用不显示、删除" },
        { status_id: 1, name: "启用" },
        { status_id: 2, name: "消费中" },
        { status_id: 3, name: "故障" },
        { status_id: 4, name: "故障显示消费中" },
        { status_id: 5, name: "暂时停用" },
      ],
      placeListData: [
        {
          place_id: "", // 当前下标
          place_name: "", // 当前下标
          area_name: "", // 当前行
          deposit: "", // 当前行
          basic_price: "", // 当前行
          type_name: "", // 当前行
          place_status: "", // 当前行
        },
      ], // 展示数据
      addPlaceData: {
        shop_id: "",
        merchant_id: "",
        type_id: "",
        area_id: "",
        place_name: "", // 当前下标
        min_people_num: "",
        max_people_num: "",
        area_name: "", // 当前行
        deposit: "", // 当前行
        basic_price: "", // 当前行
        rule_id: "",
        rule_name: "",
        type_name: "", // 当前行
        place_status: "", // 当前行
        place_sort: 0,
        place_desc: "",
      }, // 展示数据
      AddPlaceRule: {
        place_name: [
          { required: true, message: "请输入座位名称", trigger: "blur" },
        ],
        deposit: [{ required: true, message: "请输入订金", trigger: "blur" }],
        basic_price: [
          { required: true, message: "请输入低消金额", trigger: "blur" },
        ],
        min_people_num: [
          { required: true, message: "请输入最少人数", trigger: "blur" },
        ],
        max_people_num: [
          { required: true, message: "请输入最多人数", trigger: "blur" },
        ],
        area_name: [
          { required: true, message: "请选择座位区域", trigger: "change" },
        ],
        type_name: [
          { required: true, message: "请选择座位类型", trigger: "change" },
        ],
      },
      currenPlaceItem: {
        shop_id: "",
        merchant_id: "",
        place_id: "", // 当前下标
        type_id: "",
        area_id: "",
        place_name: "", // 当前下标
        min_people_num: "",
        max_people_num: "",
        area_name: "", // 当前行
        deposit: "", // 当前行
        basic_price: "", // 当前行
        rule_id: "",
        rule_name: "",
        type_name: "", // 当前行
        place_status: "", // 当前行
        place_sort: 0,
        place_desc: "",
      },
      //批量修改
      batchUpdateData: {
        shop_id: "",
        merchant_id: "",
        id: [], // 当前下标
        basic_price: "", // 低消
        deposit: "", // 订金
        type_id: "",
        area_id: "",
        rule_id: "",
        area_name: "",
        type_name: "",
        rule_name: "",
      },
      rules: {
        basic_price: [
          { required: true, message: "请输入低消金额", trigger: "blur" },
        ],
        // deposit: [
        //   { required: true, message: '请输入订金', trigger: 'blur' }
        // ]
      },
      multipleSelection: [],
      placeDialog: false,
      showAddPlaceBox: false,
      showUpdatePlaceBox: false,
      mutilUpdatePlaceBox: false,
      deleteDialog: false,
      batchdialogVisible: false,
      search: "",
      currenDeleteRow: {},
      nameArr: [],
    };
  },
  created() {
    this.getPlaceList(this.curPage);
    this.getPlaceAreaInfo();
    this.getPlaceTypeInfo();
    this.getPlaceRule();
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "warning-row";
      } else if (rowIndex % 2 === 0) {
        return "success-row";
      }
      return "";
    },
    openDelDialog(item) {
      this.currenDeleteRow = item;
      this.deleteDialog = true;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipNum_area.toggleRowSelection(row);
          this.$refs.multipNum_type.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipNum_area.clearSelection();
        this.$refs.multipNum_type.clearSelection();
      }
      console.log("num:", this.multipleSelection);
    },
    prePage() {
      this.curPage -= 1;
      this.getPlaceList(this.curPage);
    },
    pageChange(page) {
      this.curPage = page;
      this.getPlaceList(this.curPage);
    },
    nextPage() {
      this.curPage += 1;
      this.getPlaceList(this.curPage);
    },
    //批量删除
    batchDelete() {
      if (this.multipleSelection) {
        this.batchdialogVisible = true;
      } else {
        this.$message({
          message: "请先勾选要删除的座位",
          type: "warning",
        });
      }
    },
    //批量修改
    batchUpdate() {
      if (this.multipleSelection.length != 0) {
        this.mutilUpdatePlaceBox = true;
      } else {
        this.$message({
          message: "请先勾选要修改的座位",
          type: "warning",
        });
      }
    },
    /* 选择座位表的行 */
    selectArea(val) {
      console.log("val", val);
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.place_id);
        this.nameArr.push(item.place_name);
      });
      // console.log('1111',this.multipleSelection)
    },
    forFun() {
      for (var i = 0; i < this.placeAreaData.length; i++) {
        for (var j = 0; j < this.placeListData.length; j++) {
          if (this.placeAreaData[i].area_id == this.placeListData[j].area_id) {
            this.placeListData[j].area_name = this.placeAreaData[i].area_name;
          }
        }
      }
    },
    forTypeFun() {
      for (var i = 0; i < this.placeTypeData.length; i++) {
        for (var j = 0; j < this.placeListData.length; j++) {
          if (this.placeTypeData[i].type_id == this.placeListData[j].type_id) {
            this.placeListData[j].type_name = this.placeTypeData[i].name;
          }
        }
      }
    },
    //座位列表
    searchDatas() {
      var data = {
        place_name: this.searchValue,
        page_size: 30,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      console.info(data);
      this.api.shop.placeList(data).then((res) => {
        this.placeListData = res.data.data;
        this.forFun();
        this.forTypeFun();
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 获取座位信息 */
    getPlaceList(page) {
      let data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page: page,
        page_size: 30,
      };
      this.api.shop.placeList(data).then(({ data }) => {
        //this.$store.dispatch("shop/placeList", data).then((res) => {
        let res = data;
        this.placeListData = res.data;
        this.forFun();
        this.forTypeFun();
        this.total = res.count;
      });
    },
    //table排序
    sortMethod(val) {
      let order = "asc";
      this.sortStatus = !this.sortStatus;
      if (this.sortStatus) {
        order = "asc"; //正序
      } else {
        order = "desc"; //倒序
      }
      let data = { page: this.curPage, page_size: 30, sort: val, order: order };
      this.$store.dispatch("shop/placeList", data).then((res) => {
        this.placeListData = res.data;
        this.forFun();
        this.forTypeFun();
        this.total = res.count;
      });
    },
    //table排序
    sortFilterFun(column) {
      this.sortMethod(column.prop);
    },
    /* 获取区域信息 */
    getPlaceAreaInfo() {
      let data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.$store.dispatch("shop/getPlaceArea", data).then((res) => {
        this.placeAreaData = res.data;
      });
    },
    /* 获取类型信息 */
    getPlaceTypeInfo() {
      let data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.api.shop.getPlaceType(data).then((res) => {
        this.placeTypeData = res.data.data;
      });
    },
    /* 获取座位规则 */
    getPlaceRule() {
      let data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.$store.dispatch("shop/getPlaceList", data).then((res) => {
        this.placeRuleData = res.data;
      });
    },
    /* 添加按钮打开窗口 */
    addPlaceDialog() {
      this.placeDialog = true;
      this.showAddPlaceBox = true;
      this.showUpdatePlaceBox = false;
      this.mutilUpdatePlaceBox = false;
      this.placeDialogTitle = "新增座位";
    },
    /* 修改按钮打开窗口 */
    updateDialog(index, row) {
      this.placeDialog = true;
      this.placeDialogTitle = "编辑-" + row.place_name;
      this.currenPlaceItem = {
        place_id: row.place_id,
        place_name: row.place_name,
        area_id: row.area_id,
        deposit: row.deposit / 100,
        basic_price: row.basic_price / 100,
        type_id: row.type_id,
        type_name: row.type_name,
        min_people_num: row.min_people_num,
        max_people_num: row.max_people_num,
        rule_id: row.rule_id,
        rule_name: row.rule_name,
        place_sort: row.place_sort,
        place_desc: row.place_desc,
        place_status: row.place_status,
      };
      this.showUpdatePlaceBox = true;
      this.showAddPlaceBox = false;
    },
    /* 关闭窗口 */
    closeDialog() {
      this.showAddPlaceBox = false;
      this.showUpdatePlaceBox = false;
      this.mutilUpdatePlaceBox = false;
    },
    /* 多行删除 */
    multiDelete() {
      const data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: this.multipleSelection,
      };
      this.$store.dispatch("shop/deletePlaceList", data).then((res) => {
        // console.log(res)
        this.getPlaceList(this.curPage);
        this.batchdialogVisible = false;
      });
    },
    /* 删除单行座位 */
    deletePlace() {
      const data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        id: [this.currenDeleteRow.place_id],
      };
      this.$store.dispatch("shop/deletePlaceList", data).then((res) => {
        // console.log(res)
        this.getPlaceList(this.curPage);
        this.deleteDialog = false;
      });
    },
    /* 批量修改座位 */
    multiUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.batchUpdateData.area_id = Number(this.batchUpdateData.area_name);
          this.batchUpdateData.type_id = Number(this.batchUpdateData.type_name);
          this.batchUpdateData.rule_id = Number(this.batchUpdateData.rule_name);
          delete this.batchUpdateData.area_name;
          delete this.batchUpdateData.type_name;
          delete this.batchUpdateData.rule_name;
          this.batchUpdateData.basic_price =
            Number(this.batchUpdateData.basic_price) * 100;
          this.batchUpdateData.deposit =
            Number(this.batchUpdateData.deposit) * 100;
          this.batchUpdateData.id = this.multipleSelection;
          this.batchUpdateData.merchant_id = this.merchants.merchant_id;
          this.batchUpdateData.shop_id = this.merchants.shop_id;
          const data = this.batchUpdateData;
          this.$store
            .dispatch("shop/updatPlaceList_batch", data)
            .then((res) => {
              this.$message({
                message: "" + res.msg,
                type: "success",
              });
              this.getPlaceList(this.curPage);
              this.batchUpdateData = {
                id: [], // 当前下标
                basic_price: "", // 低消
                deposit: "", // 订金
                type_id: "",
                area_id: "",
                rule_id: "",
                area_name: "",
                type_name: "",
                rule_name: "",
              };
              this.mutilUpdatePlaceBox = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 添加座位 */
    addPlace(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addPlaceData.area_id = Number(this.addPlaceData.area_name);
          this.addPlaceData.type_id = Number(this.addPlaceData.type_name);
          this.addPlaceData.rule_id = Number(this.addPlaceData.rule_name);
          delete this.addPlaceData.area_name;
          delete this.addPlaceData.type_name;
          delete this.addPlaceData.rule_name;
          this.addPlaceData.basic_price =
            Number(this.addPlaceData.basic_price) * 100;
          this.addPlaceData.deposit = Number(this.addPlaceData.deposit) * 100;
          this.addPlaceData.place_status = Number(
            this.addPlaceData.place_status
          );
          this.addPlaceData.min_people_num = Number(
            this.addPlaceData.min_people_num
          );
          this.addPlaceData.max_people_num = Number(
            this.addPlaceData.max_people_num
          );
          this.addPlaceData.place_sort = Number(this.addPlaceData.place_sort);
          this.addPlaceData.merchant_id = this.merchants.merchant_id;
          this.addPlaceData.shop_id = this.merchants.shop_id;
          const data = this.addPlaceData;
          this.$store.dispatch("shop/addPlaceList", data).then((res) => {
            this.getPlaceList(this.curPage);
            this.showAddPlaceBox = true;
            this.showUpdatePlaceBox = false;
            this.placeDialog = false;
            this.addPlaceData = {
              // place_id: '', // 当前下标
              type_id: "",
              area_id: "",
              place_name: "", // 当前下标
              min_people_num: "",
              max_people_num: "",
              area_name: "", // 当前行
              deposit: "", // 当前行
              basic_price: "", // 当前行
              rule_id: "",
              rule_name: "",
              type_name: "", // 当前行
              place_status: "", // 当前行
              place_sort: 0,
              place_desc: "",
            }; // 展示数据
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 修改座位 */
    updatePlace(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          delete this.currenPlaceItem.area_name;
          delete this.currenPlaceItem.type_name;
          delete this.currenPlaceItem.rule_name;
          this.currenPlaceItem.basic_price =
            Number(this.currenPlaceItem.basic_price) * 100;
          this.currenPlaceItem.deposit =
            Number(this.currenPlaceItem.deposit) * 100;
          this.currenPlaceItem.place_status = Number(
            this.currenPlaceItem.place_status
          );
          this.currenPlaceItem.min_people_num = Number(
            this.currenPlaceItem.min_people_num
          );
          this.currenPlaceItem.max_people_num = Number(
            this.currenPlaceItem.max_people_num
          );
          this.currenPlaceItem.place_sort = Number(
            this.currenPlaceItem.place_sort
          );
          this.currenPlaceItem.merchant_id = this.merchants.merchant_id;
          this.currenPlaceItem.shop_id = this.merchants.shop_id;
          const datas = this.currenPlaceItem;
          this.$store.dispatch("shop/updatPlaceList", datas).then((res) => {
            this.getPlaceList(this.curPage);
            this.showAddPlaceBox = true;
            this.showUpdatePlaceBox = false;
            this.placeDialog = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.placeManage {
  .search {
    position: relative;
  }
  .warning-row {
    background: oldlace !important;
  }
  .success-row {
    background: #f0f9eb !important;
  }
  .pagination {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
  }
  .add-box {
    margin: 10px 0;
  }
  .searchInput {
    float: right;
    width: 350px;
  }
}
.gz-name {
  display: inline-block;
  margin-bottom: 10px;
}
.iptBox {
  display: flex;
  max-width: 300px;
  span {
    margin: 0 10px;
  }
}
</style>
