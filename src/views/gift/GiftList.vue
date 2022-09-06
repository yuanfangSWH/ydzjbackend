<template>
  <div class="shopSet">
    <div class="pageTitle">礼物列表</div>
    <div class="add-box"
         style="display: flex">
      <div style="flex: 1">
        <el-button type="danger"
                   @click="batchDelete"
                   v-show="status == 1">下架</el-button>
        <el-button type="danger"
                   @click="insertItemtk"
                   v-show="status == 1">新增</el-button>
        <el-button type="primary"
                   @click="Therecyclebin"
                   v-show="status == 1">回收站</el-button>
        <el-button type="danger"
                   @click="batchDelete"
                   v-show="status == 0">上架</el-button>
        <el-button type="primary"
                   @click="Therecyclebin"
                   v-show="status == 0">返回</el-button>
      </div>
      <div>
        <el-input class="searchInput"
                  placeholder="请输入要搜索的内容"
                  prefix-icon="el-icon-search"
                  v-model="searchValue"
                  clearable
                  @change="searchDatas"></el-input>
        <el-button class="sosuo"
                   type="danger"
                   @click="searchDatas">搜索</el-button>
      </div>
    </div>
    <el-table ref="multipNum"
              stripe
              :data="tableListData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="selectItem"
              @sort-change="screeningData">
      <el-table-column type="selection"
                       width="55" />
      <el-table-column sortable="custom"
                       prop="gift_id"
                       label="全选/ID"
                       width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.gift_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="image"
                       label="礼物图片"
                       width="100">
        <template slot-scope="scope">
          <el-image :src="scope.row.image"
                    @click="showImglist(scope.row.image, scope.row.name)"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name"
                       label="礼物名称"
                       width="180" />
      <el-table-column prop="price"
                       label="价值(Y币)"
                       width="120">
        <template slot-scope="scope">
          <div style="color: #eab43f">{{ scope.row.price }}</div>
        </template>
      </el-table-column>
      <el-table-column sortable="custom"
                       prop="point"
                       label="可得积分"
                       width="140">
        <template slot-scope="scope">
          <div style="color: #559a4a">{{ scope.row.point }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="sales"
                       label="销量"
                       width="120">
        <template slot-scope="scope">
          <div class="muzhicss"
               style="color: #52a8f8"
               @click="DetailedDialog(scope.row)">
            {{ scope.row.sales }}
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable="custom"
                       prop="create_time"
                       label="上架时间"
                       width="200" />
      <el-table-column prop="delete_time"
                       label="下架时间"
                       width="300" />
      <el-table-column sortable="custom"
                       prop="sort"
                       label="排序"
                       width="200">
        <template slot-scope="scope">
          <el-input class="input_pxcss"
                    v-model="scope.row.sort"
                    ref="saveTagInput"
                    @blur="
              percentF(JSON.parse(JSON.stringify(scope.row)), scope.$index)
            "
                    v-if="scope.$index === sortingid"></el-input>
          <div class="muzhicss"
               @click="khaki(scope.$index, JSON.parse(JSON.stringify(scope.row)))"
               v-else>
            <span>{{ scope.row.sort }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="操作">
        <template slot-scope="scope">
          <div>
            <el-button size="mini"
                       type="text"
                       @click="openUpdateDialog(JSON.parse(JSON.stringify(scope.row)))">修改</el-button>
            <el-button v-show="status == 1"
                       size="mini"
                       type="text"
                       @click="openDelDialog(scope.row)">下架</el-button>
            <el-button v-show="status == 0"
                       size="mini"
                       type="text"
                       @click="openDelDialog(scope.row)">上架</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination :current-page="curPage"
                     :hide-on-single-page="true"
                     @current-change="pageChange"
                     :page-size.sync="page_size"
                     @size-change="handlePageSizeChange"
                     :page-sizes="[10, 20, 30, 40,50]"
                     background
                     layout="sizes,prev, pager, next,jumper"
                     :total="total"></el-pagination>
    </div>

    <!-- 新增内容 -->
    <el-dialog title="新增礼物"
               :visible.sync="insertDialog">
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
        <el-button @click="insertDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="validation('formName1')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改内容 -->
    <el-dialog :title="'修改-' + updateDialogTitle"
               :visible.sync="updateDialog">
      <el-form :model="currenItem"
               :rules="rules"
               ref="formName2"
               label-width="180px"
               class="updateArea">
        <el-form-item label="礼物名称"
                      prop="name">
          <el-input v-model="currenItem.name"
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
                      v-model="currenItem.price"
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
                    v-model="currenItem.point"
                    clearable />
        </el-form-item>
        <el-form-item label="排序"
                      prop="sort">
          <el-input type="Number"
                    v-model="currenItem.sort"
                    clearable />
        </el-form-item>
        <el-form-item label="状态"
                      prop="status">
          <el-select v-model="currenItem.status"
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
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="validation('formName2')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 上架OR下架单个内容 -->
    <el-dialog :title="(this.status == 0 ? '上架' : '下架') + '-' + deltitle"
               :visible.sync="deleteDialog"
               width="30%">
      <span>确定要{{ this.status == 0 ? "上架" : "下架" }}此项吗</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary"
                   v-show="status == 1"
                   @click="deleteItem('one')">确定</el-button>
        <el-button type="primary"
                   v-show="status == 0"
                   @click="recoveryItem('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量上架OR下架-->
    <el-dialog :title="this.status == 0 ? '上架' : '下架'"
               :visible.sync="mutilDeleteDialog"
               width="50%">
      <span class="s-title">确定要{{ this.status == 0 ? "上架" : "下架" }}以下内容吗?</span>
      <div class="gz-name"
           v-for="(item, index) in nameArr"
           :key="index">
        {{ item }}
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="mutilDeleteDialog = false">取 消</el-button>
        <el-button type="primary"
                   v-show="status == 1"
                   @click="deleteItem('mutil')">确定</el-button>
        <el-button type="primary"
                   v-show="status == 0"
                   @click="recoveryItem('mutil')">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="giftName"
               :visible.sync="dialogVisible"
               width="50%">
      <template v-if="dialogVisible">
        <el-carousel :autoplay="false"
                     indicator-position="none"
                     arrow="never"
                     height="600px">
          <el-carousel-item v-for="(item, index) in picData"
                            :key="index">
            <div class="imgbox">
              <el-image style="height: 600px; width: auto"
                        fit="contain"
                        :src="item"></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
import uploadFiles from "@/components/uploadFiles";
export default {
  components: {
    uploadFiles,
  },
  name: "GiftList",
  data () {
    return {
      //排序暂存值
      sortData: "",
      //排序输入框渲染值
      sortingid: "",
      rules: {
        name: [{ required: true, message: "请填写礼物名称", trigger: "blur" }],
        image: [{ required: true, message: "请上传礼物图片", trigger: "blur" }],
        price: [{ required: true, message: "请填写价值", trigger: "blur" }],
        point: [{ required: true, message: "请填写可得积分", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      //状态
      status: 1,
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      //页码
      curPage: 1,
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
      currenDeleteRow: "", //当前选中的行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      updateDialogTitle: "", //修改框的标题
      deltitle: "", //删除框的标题
      searchValue: "", //搜索的值
      //排序
      sort: "",
      order: "",
      dialogVisible: false,
      picData: [],
      imgIndex: 0,
      giftName: "",
      page_size: 10,
    };
  },
  created () {
    this.getTableList();
  },
  methods: {
    //点击显示输入框
    khaki (index, row) {
      this.sortingid = index;
      this.sortData = row.sort;
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus();
      });
    },
    //排序修改
    percentF (row, index) {
      if (this.sortData != row.sort) {
        var data = {
          id: row.gift_id,
          sort: Number(row.sort),
        };
        this.api.gift.GiftsetSort(data).then((res) => {
          if (res.data.code == 0) {
            this.sortingid = "";
            this.$message({
              message: "修改排序成功",
              type: "success",
            });
          } else {
            this.tableListData[index].sort = this.sortData;
            this.$message({
              message: "修改排序失败",
              type: "warning",
            });
          }
        });
      } else {
        this.sortingid = "";
      }
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
      this.getTableList();
    },
    //打开OR关闭回收站
    Therecyclebin () {
      this.curPage = 1;
      if (this.status == 0) {
        this.status = 1;
        this.sort = "";
        this.order = "";
      } else {
        this.status = 0;
      }
      this.getTableList();
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
    getTableList () {
      if (this.status == 0) {
        this.sort = "delete_time";
        this.order = "DESC";
      }
      var data = {
        sort: this.sort,
        order: this.order,
        status: this.status,
        name: this.searchValue,
        page: this.curPage,
        page_size: this.page_size
      };
      this.api.gift.ListData(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 搜索 */
    searchDatas () {
      this.curPage = 1;
      this.getTableList();
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
    //打开添加弹框
    insertItemtk () {
      this.insertDialog = true;
      //初始化图片
      setTimeout(() => {
        this.$refs.uploadImg.concert("");
      }, 0);
    },
    /* 新增保存 */
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
        this.getTableList();
        this.insertDialog = false;
      });
    },
    /* 打开修改窗口 */
    openUpdateDialog (row) {
      //处理图片传值
      setTimeout(() => {
        this.$refs.uploadImg.concert(row.image);
      }, 0);
      this.updateDialog = true;
      this.updateDialogTitle = row.name;
      this.currenItem = row;
    },
    /* 修改保存 */
    multiUpdate () {
      this.currenItem.price = Number(this.currenItem.price);
      this.currenItem.point = Number(this.currenItem.point);
      this.currenItem.stock = Number(this.currenItem.stock);
      this.currenItem.stock_all = Number(this.currenItem.stock_all);
      this.currenItem.sales = Number(this.currenItem.sales);
      this.currenItem.sort = Number(this.currenItem.sort);
      this.currenItem.status = Number(this.currenItem.status);
      var data = this.currenItem;
      this.api.gift.GiftUpdate(data).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getTableList();
        this.updateDialog = false;
      });
    },
    /* 打开批量上架OR下架框 */
    batchDelete () {
      if (this.multipleSelection != "") {
        this.mutilDeleteDialog = true;
      } else {
        this.$message({
          message:
            "请先勾选要" + (this.status == 0 ? "上架" : "下架") + "的数据",
          type: "warning",
        });
      }
    },
    /* 打开上架OR下架框 */
    openDelDialog (data) {
      this.deltitle = data.name;
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    /* 选择表的行 */
    selectItem (val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.gift_id);
        this.nameArr.push(item.name);
      });
    },
    /* 下架 */
    deleteItem (type) {
      var gift_id = new Array();
      gift_id.push(this.currenDeleteRow.gift_id);
      var id = type === "one" ? gift_id : this.multipleSelection;
      var data = {
        id: id,
      };
      this.api.gift.GiftDelete(data).then((res) => {
        this.$message({
          message: "下架成功",
          type: "success",
        });
        this.getTableList();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    /* 上架 */
    recoveryItem (type) {
      var gift_id = new Array();
      gift_id.push(this.currenDeleteRow.gift_id);
      var id = type === "one" ? gift_id : this.multipleSelection;
      var data = {
        id: id,
      };
      this.api.gift.GiftRecovery(data).then((res) => {
        this.$message({
          message: "上架成功",
          type: "success",
        });
        this.getTableList();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    /* 改变页数 */
    pageChange (page) {
      this.curPage = page;
      this.getTableList();
    },
    handlePageSizeChange (v) {
      this.pageChange();
    },
    showImglist (row, name) {
      this.picData = [];
      this.dialogVisible = true;
      this.picData.push(row);
      this.giftName = name;
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
      min-width: 400px !important;
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
</style>
