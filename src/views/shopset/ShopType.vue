<template>
  <div class="shopSet">
    <div class="pageTitle">{{ pageTitle }}</div>
    <div class="add-box">
      <div class="btn-nav">
        <el-button type="primary" @click="insertTK">新增</el-button>
        <el-button
          type="danger"
          @click="batchDelete"
          :disabled="!multipleSelection.length > 0"
          >删除</el-button
        >
      </div>
      <!-- <el-button type="danger" @click="batchDelete">批量修改</el-button> -->
      <div class="so-nav">
        <el-input
          class="searchInput"
          placeholder="请输入要搜索的内容"
          prefix-icon="el-icon-search"
          v-model="searchValue"
          @change="searchDatas"
        ></el-input>
        <el-button type="primary" @click="searchDatas">搜索</el-button>
      </div>
    </div>

    <el-table
      ref="multipNum"
      stripe
      v-loading="loading"
      :data="tableListData"
      :default-sort="defaultSort"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selectItem"
      @sort-change="handleShopSort"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        prop="type_id"
        label="全选/ID"
        width="120"
        sortable="true"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.type_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型图片" width="80">
        <template slot-scope="scope">
          <el-image :src="scope.row.type_icon" fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="type_name" label="类型名称" width="200" />
      <el-table-column
        prop="refund_rate"
        label="退款手续费比率"
        sortable="true"
      >
        <template slot-scope="scope">
          <span style="color: #e6a23c">{{ scope.row.refund_rate }} %</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="refund_platform_commission"
        label="退款手续费平台抽成"
        sortable="true"
      >
        <template slot-scope="scope">
          <span style="color: #67c23a"
            >{{ scope.row.refund_platform_commission }} %</span
          >
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <span
            v-if="scope.row.type_status == 0"
            style="color: #f56c6c; font-weight: bold"
            ><i class="el-icon-close"></i
          ></span>
          <span
            v-if="scope.row.type_status == 1"
            style="color: #409eff; font-weight: bold"
            ><i class="el-icon-check"></i
          ></span>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              openUpdateDialog(
                scope.$index,
                JSON.parse(JSON.stringify(scope.row)),
                'type'
              )
            "
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="openDelDialog(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="curPage"
        :hide-on-single-page="true"
        @prev-click="pageChange(curPage - 1)"
        @current-change="pageChange"
        @next-click="pageChange(curPage + 1)"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 新增内容 -->
    <el-dialog title="新增" :visible.sync="insertDialog">
      <el-form
        :model="addItem"
        ref="addItemForm"
        label-width="200px"
        class="updateArea"
        :rules="rulesForm"
      >
        <el-form-item label="类型名称" prop="type_name">
          <el-input v-model="addItem.type_name" class="inputap" />
        </el-form-item>
        <el-form-item label="图标" prop="type_icon">
          <uploadFiles
            root="shop"
            ref="uploadImg"
            @theIMG="theIMG"
            :image-url="addItem.type_icon"
          />
        </el-form-item>
        <el-form-item label="退款手续费比率" prop="refund_rate">
          <el-input v-model="addItem.refund_rate" class="inputap" />
        </el-form-item>
        <el-form-item
          label="退款手续费平台抽成"
          prop="refund_platform_commission"
        >
          <el-input
            v-model="addItem.refund_platform_commission"
            class="inputap"
          />
          %
        </el-form-item>
        <el-form-item label="排序" prop="type_displayorder">
          <el-input
            type="Number"
            v-model="addItem.type_displayorder"
            class="inputap"
          />
          %
        </el-form-item>
        <el-form-item label="状态" prop="type_status">
          <el-select v-model="addItem.type_status" placeholder="请选择状态">
            <el-option key="0" label="禁用" value="0"></el-option>
            <el-option key="1" label="正常" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="insertDialog = false">取 消</el-button>
        <el-button type="primary" @click="insertItem">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改内容 -->
    <el-dialog :title="updateDialogTitle" :visible.sync="updateDialog">
      <el-form
        ref="updateItemForm"
        label-width="200px"
        class="updateArea"
        destroy-on-close
        :rules="rulesForm"
        :model="currenItem"
      >
        <el-form-item label="类型名称" prop="type_name">
          <el-input v-model="currenItem.type_name" class="inputap" />
        </el-form-item>
        <el-form-item label="图标" prop="type_icon">
          <uploadFiles root="shop" ref="uploadImg" @theIMG="theIMG" />
        </el-form-item>
        <el-form-item label="退款手续费比率" prop="type_refund_rate">
          <el-input v-model="currenItem.type_refund_rate" class="inputap" /> %
        </el-form-item>
        <el-form-item
          label="退款手续费平台抽成"
          prop="type_refund_platform_commission"
        >
          <el-input
            v-model="currenItem.type_refund_platform_commission"
            class="inputap"
          />
          %
        </el-form-item>
        <el-form-item label="排序">
          <el-input
            type="Number"
            v-model="currenItem.type_displayorder"
            class="inputap"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="currenItem.type_status" placeholder="请选择状态">
            <el-option key="0" label="禁用" value="0"></el-option>
            <el-option key="1" label="正常" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="multiUpdate">确定</el-button>
      </span>
    </el-dialog>

    <!-- 删除单个内容 -->
    <el-dialog
      :title="'删除-' + deltitle"
      :visible.sync="deleteDialog"
      width="30%"
    >
      <span>确定要删除此项吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量删除 -->
    <el-dialog title="删除" :visible.sync="mutilDeleteDialog" width="50%">
      <span class="s-title">确定要删除以下内容吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
        {{ item }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mutilDeleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem('mutil')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uploadFiles from "@/components/uploadFiles";
export default {
  name: "ShopType",
  data() {
    return {
      loading: false,
      order: "",
      sort: "",
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
      /* 默认排序设置 */
      defaultSort: {},
      fileList: [{ name: "01.jpeg", url: "" }],
      mutilUpdateDialog: false, //打开批量修改框
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      curPage: 1, //删除框的标题
      total: 13, //删除框的标题
      rulesForm: {
        type_name: [
          { required: true, message: "请输入名称", trigger: "change" },
        ],
        type_icon: [
          { required: true, message: "请设置logo", trigger: "change" },
        ],
        type_refund_rate: [
          {
            required: true,
            message: "请输入退款手续费比例",
            trigger: "change",
          },
        ],
        refund_rate: [
          {
            required: true,
            message: "请输入退款手续费比例",
            trigger: "change",
          },
        ],
        type_refund_platform_commission: [
          { required: true, message: "退款手续费平台抽成", trigger: "change" },
        ],
        refund_platform_commission: [
          { required: true, message: "退款手续费平台抽成", trigger: "change" },
        ],
      },
      tableListData: [], //页面表单的内容
      addItem: {
        type_name: "",
        type_icon: "",
        type_displayorder: 0,
        type_status: "1",
        refund_rate: "",
        refund_platform_commission: "",
      }, //当前选中的项
      currenItem: {
        type_id: 1,
        type_name: "hahah",
        type_icon: "hahah",
        type_displayorder: 0,
        type_status: "1",
      }, //当前选中的项
      currenDeleteRow: "", //当前选中的删除行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      updateDialogTitle: "", //修改框的标题
      deltitle: "", //删除框的标题
      searchValue: "", //搜索的值
    };
  },
  components: {
    uploadFiles,
  },
  created() {
    this.iniPageParam();
    this.getTableList(this.curPage);
  },
  watch: {
    $route(to, from) {
      this.iniPageParam();
      this.getTableList(this.curPage);
    },
  },
  computed: {
    pageTitle() {
      return this._getVuex("pageTitle");
    },
  },
  methods: {
    /* 初始化页面参数 */
    iniPageParam() {
      this.curPage = this.$route.query.page
        ? Number(this.$route.query.page)
        : 1;
      this.order = this.$route.query.order;
      this.sort = this.$route.query.sort;
      this.searchValue = this.$route.query.query
        ? decodeURIComponent(this.$route.query.query)
        : "";
      this.defaultSort = {
        prop: this.sort,
        order: this.sortableList[this.order],
      };
    },
    /* 表格的排序发生变化 */
    handleShopSort(obj) {
      //console.info(obj)
      this.sort = obj.order ? obj.prop : "";
      this.order = obj.order ? this.sortableList[obj.order] : "";
      this.curPage = 1;
      this.pageChange(this.curPage);
      //this.getTableList();
    },
    /* 获取表单内容 */
    getTableList(page) {
      this.loading = true;
      let data = { page: page, name: this.searchValue };
      this.$store.dispatch("shop/getShopType", data).then((res) => {
        // console.log(res)
        this.loading = false;
        this.tableListData = res.data;
        this.total = res.count;
      });
    },
    /* 搜索 */
    searchDatas() {
      let data = { name: this.searchValue };
      this.loading = true;
      this.$store.dispatch("shop/getShopType", data).then((res) => {
        console.log(res);
        this.loading = false;
        this.tableListData = res.data;
        this.total = res.count;
      });
    },
    /* 删除选项 */
    deleteItem(type) {
      const datas =
        type === "one"
          ? { id: [this.currenDeleteRow.type_id] }
          : { id: this.multipleSelection };
      this.loading = true;
      this.$store.dispatch("shop/deleteShopType", datas).then((res) => {
        this.loading = false;
        this.getTableList(this.curPage);
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    //打开添加窗口
    insertTK() {
      var _this = this;
      //初始化图片;
      setTimeout(function () {
        _this.$refs.uploadImg.concert("");
      }, 0);
      this.addItem.type_status = "1";
      this.insertDialog = true;
    },
    /* 新增 */
    insertItem() {
      this.$refs["addItemForm"].validate((valid) => {
        if (valid) {
          const datas = {
            refund_rate: Number(this.addItem.refund_rate),
            refund_platform_commission: Number(
              this.addItem.refund_platform_commission
            ),
            type_name: this.addItem.type_name,
            type_icon: this.addItem.type_icon,
            type_displayorder: parseInt(this.addItem.type_displayorder),
            type_status: Number(this.addItem.type_status),
          };
          this.loading = true;
          this.$store.dispatch("shop/insertShopType", datas).then((res) => {
            this.loading = false;
            this.$refs["addItemForm"].resetFields();
            this.getTableList(this.curPage);
            this.insertDialog = false;
          });
        }
      });
    },
    /* 修改 */
    multiUpdate() {
      this.$refs["updateItemForm"].validate((valid) => {
        if (valid) {
          const datas = {
            refund_rate: Number(this.currenItem.type_refund_rate),
            refund_platform_commission: Number(
              this.currenItem.type_refund_platform_commission
            ),
            type_id: this.currenItem.type_id,
            type_name: this.currenItem.type_name,
            type_icon: this.GetImageUrl(this.currenItem.type_icon),
            type_displayorder: parseInt(this.currenItem.type_displayorder),
            type_status: Number(this.currenItem.type_status),
          };
          console.info("提交数据", datas);
          //return false;
          this.$store.dispatch("shop/updateShopType", datas).then((res) => {
            this.getTableList(this.curPage);
            this.updateDialog = false;
          });
        }
      });
    },
    /* 打开批量删除框 */
    batchDelete() {
      if (this.multipleSelection.length > 0) {
        this.mutilDeleteDialog = true;
      } else {
        this.$message({
          message: "请先勾选要删除的类型",
          type: "warning",
        });
      }
    },
    /* 打开删除框 */
    openDelDialog(item) {
      this.deltitle = item.type_name;
      this.currenDeleteRow = item;
      this.deleteDialog = true;
    },
    /* 打开修改窗口 */
    openUpdateDialog(index, row) {
      this.updateDialog = true;
      this.$nextTick(() => {
        this.updateDialogTitle = "修改-" + row.type_name;
        var _this = this;
        setTimeout(function () {
          _this.$refs.uploadImg.concert(row.type_icon);
        }, 0);
        this.currenItem = {
          type_id: row.type_id,
          type_name: row.type_name,
          type_icon: row.type_icon,
          type_displayorder: row.type_displayorder,
          type_refund_rate: row.refund_rate,
          type_refund_platform_commission: row.refund_platform_commission,
          type_status: String(row.type_status),
        };
      });
    },

    //图片上传子组件传值
    theIMG(url) {
      //this.addItem.type_icon = "https://files.ddhi.cn" + url;
      //this.currenItem.type_icon = "https://files.ddhi.cn" + url;
      this.addItem.type_icon = url;
      this.currenItem.type_icon = url;
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.type_id);
        this.nameArr.push(item.type_name);
      });
    },
    /* 改变页数 */
    pageChange(page) {
      this.curPage = page;
      //this.getTableList(this.curPage);
      this.$router.push({
        path: "/shopType",
        query: {
          page: page,
          query: this.searchValue ? encodeURIComponent(this.searchValue) : "",
          sort: this.sort,
          order: this.order,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button--primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
.inputap {
  width: 300px;
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
    margin: 0 0 14px;
    display: flex;
  }
  .btn-nav {
    flex: 1;
    display: flex;
  }
  .so-nav {
    width: 350px;
    display: flex;
  }
  .pagination {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
  }
  .searchInput {
    float: right;
    width: 350px;
  }
}
</style>
