<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <el-button type="danger" @click="batchDelete">批量删除</el-button>
      <el-button type="success" @click="insertItemtk">新增</el-button>
      <el-input
        class="searchInput"
        placeholder="请输入要搜索的内容"
        prefix-icon="el-icon-search"
        v-model="searchValue"
        @change="searchDatas"
      ></el-input>
    </div>
    <el-table
      ref="multipNum"
      stripe
      :data="tableListData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selectItem"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="全选/ID" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.album_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="album_id" label="图片ID" width="200" />
      <el-table-column prop="album_path" label="图片" width="200">
        <template slot-scope="scope">
          <el-image :src="scope.row.album_path"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="album_path" label="图片地址" width="800" />
      <el-table-column prop="album_sort" label="排序值" width="200" />

      <el-table-column fixed="right" align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openUpdateDialog(JSON.parse(JSON.stringify(scope.row)))"
            >修改</el-button
          >
          <el-button size="mini" @click="openDelDialog(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="curPage"
        :hide-on-single-page="true"
        @current-change="pageChange"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 新增内容 -->
    <el-dialog title="新增" :visible.sync="insertDialog">
      <el-form label-width="90px" class="updateArea">
        <el-form-item label="图片">
          <uploadFilesEX ref="uploadImgEX" @theIMGEX="theIMGEX" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertDialog = false">取 消</el-button>
        <el-button type="primary" @click="insertItem()">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改内容 -->
    <el-dialog title="修改" :visible.sync="updateDialog">
      <el-form label-width="90px" class="updateArea">
        <el-form-item label="排序值">
          <el-input type="Number" v-model="currenItem.album_sort" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="multiUpdate()">确定</el-button>
      </span>
    </el-dialog>

    <!-- 删除单个内容 -->
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
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
import uploadFilesEX from "@/components/uploadFilesEX";
export default {
  components: {
    uploadFilesEX,
  },
  name: "groupEetail",
  data() {
    return {
      // 商家/店铺ID
      merchants: {
        shop_id: 0,
        merchant_id: 0,
      },
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开关闭框
      deleteDialog: false, //打开关闭框
      //页码
      curPage: 1,
      //总数
      total: 1,
      tableListData: [], //页面表单的内容
      //添加的内容
      addItem: { shop_id: "", merchant_id: "", data: [] },
      //修改数据
      currenItem: {},
      currenDeleteRow: "", //当前选中的行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      searchValue: "", //搜索的值
      //多图数组
      ImgData: [],
    };
  },
  created() {
    if (this.$route.query.shop_id && this.$route.query.merchant_id) {
      this.merchants.shop_id = Number(this.$route.query.shop_id);
      this.merchants.merchant_id = Number(this.$route.query.merchant_id);
      /* 把店铺商家ID数据存入VUEX */
      this.$store.dispatch("updateVuex", {
        key: "merchantsData",
        value: this.merchants,
      });
    } else {
      var dpID = this.$store.state.merchantsData;
      this.merchants.shop_id = Number(dpID.shop_id);
      this.merchants.merchant_id = Number(dpID.merchant_id);
    }
    this.getTableList();
  },
  methods: {
    /* 获取列表内容 */
    getTableList() {
      var data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        name: this.searchValue,
        page: this.curPage,
        page_size: 10,
      };
      this.api.shop.shopalbumList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 搜索 */
    searchDatas() {
      this.curPage = 1;
      this.getTableList();
    },
    //多图片上传子组件传值
    theIMGEX(data) {
      this.ImgData = [];
      this.ImgData = data;
    },
    //打开添加弹框
    insertItemtk() {
      this.insertDialog = true;
    },
    /* 新增保存 */
    insertItem() {
      if (this.ImgData != "") {
        this.addItem.merchant_id = this.merchants.merchant_id;
        this.addItem.shop_id = this.merchants.shop_id;
        this.addItem.data = [];
        for (var i = 0; i < this.ImgData.length; i++) {
          this.addItem.data.push({
            album_sort: 0,
            album_path: this.ImgData[i].url,
          });
        }
        var data = this.addItem;
        this.api.shop.PhotoInsert(data).then((res) => {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.getTableList();
          this.ImgData = [];
          this.addItem.data = [];
          //初始化图片
          setTimeout(() => {
            this.$refs.uploadImgEX.concert();
          }, 0);
          this.insertDialog = false;
        });
      } else {
        this.$message({
          message: "请选择上传的图片",
          type: "warning",
        });
      }
    },
    /* 打开修改窗口 */
    openUpdateDialog(row) {
      this.currenItem = row;
      this.updateDialog = true;
    },
    /* 修改保存 */
    multiUpdate() {
      var data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        data: [
          {
            album_id: this.currenItem.album_id,
            album_sort: Number(this.currenItem.album_sort),
            album_path: "",
          },
        ],
      };
      this.api.shop.PhotoUpdate(data).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getTableList();
        this.updateDialog = false;
      });
    },
    /* 打开批量删除框 */
    batchDelete() {
      if (this.multipleSelection != "") {
        this.mutilDeleteDialog = true;
      } else {
        this.$message({
          message: "请先勾选要删除的数据",
          type: "warning",
        });
      }
    },
    /* 打开删除框 */
    openDelDialog(data) {
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.album_id);
        this.nameArr.push(item.album_id);
      });
    },
    /* 删除 */
    deleteItem(type) {
      var album_id = new Array();
      album_id.push(this.currenDeleteRow.album_id);
      var id = type === "one" ? album_id : this.multipleSelection;
      var data = {
        id: id,
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
      };
      this.api.shop.PhotoDelete(data).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getTableList();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    /* 改变页数 */
    pageChange(page) {
      this.curPage = page;
      this.getTableList();
    },
  },
};
</script>

<style lang="scss" scoped>
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
    float: right;
    width: 350px;
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
