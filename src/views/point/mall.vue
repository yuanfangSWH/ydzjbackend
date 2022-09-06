<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="shanxdiv">
      <span class="t-s01">商品</span>
      <el-input
        style="width: 350px; margin-right: 10px"
        placeholder="关键字"
        v-model="searchOption.keyword"
        clearable
        @change="screening"
      ></el-input>
      <span class="t-s01">类型</span>
      <el-select v-model="searchOption.item_type" placeholder="请选择">
        <el-option label="全部" :value="null"></el-option>
        <el-option label="券" :value="1"></el-option>
        <el-option label="实物" :value="2"></el-option>
      </el-select>
      <span class="t-s01">积分</span>
      <el-input
        style="width: 100px; margin-right: 10px"
        placeholder="最小"
        v-model="searchOption.min_point"
        clearable
        @change="screening"
      ></el-input>
      <span class="t-s01">-</span>
      <el-input
        style="width: 100px; margin-right: 10px; margin-left: 10px"
        placeholder="最大"
        v-model="searchOption.max_point"
        clearable
        @change="screening"
      ></el-input>
      <el-button type="primary" @click="screening" style="margin-left: 10px"
        >筛选</el-button
      >
      <el-button type="info" @click="resetData">清空条件</el-button>
    </div>

    <div class="add-box">
      <div class="btn-nav">
        <el-button type="primary" @click="handleAddOpen">新增商品</el-button>
      </div>
      <div class="so-nav">
        <div class="btnBox">
          <div
            class="g-btn jia-btn"
            @click="putawayFun(1)"
            v-if="mallTabsName == '2'"
          >
            上架
          </div>
          <div
            class="g-btn jia-btn"
            @click="putawayFun(2)"
            v-if="mallTabsName == '1'"
          >
            下架
          </div>
          <div class="g-btn" @click="handleBatchDelete">删除</div>
        </div>
      </div>
    </div>
    <div class="tabsBox">
      <el-tabs
        type="border-card"
        v-model="mallTabsName"
        @tab-click="handleChangeMallTab()"
        this.searchOpion
      >
        <el-tab-pane name="1" label="已上架"
          ><mall-list
            v-if="mallTabsName == '1'"
            :loading.sync="loading"
            :mallData="tableListData"
            :status="1"
            @edit="handleUpdateData"
            @selection="handleSelectionChange"
            @sort-change="handleSortChange"
          ></mall-list
        ></el-tab-pane>
        <el-tab-pane name="2" label="已下架"
          ><mall-list
            v-if="mallTabsName == '2'"
            :loading.sync="loading"
            :mallData="tableListData"
            :status="2"
            @edit="handleUpdateData"
            @selection="handleSelectionChange"
            @sort-change="handleSortChange"
          ></mall-list
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="pagination">
      <el-pagination
        :current-page="searchOption.page"
        :hide-on-single-page="true"
        @current-change="pageChange"
        background
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="searchOption.page_size"
        @size-change="handlePageSizeChange"
        layout="sizes,prev, pager, next,jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog
      title="设置商品信息"
      :visible.sync="formDialogVisible"
      width="900px"
      @opened="handleSetData"
      destroy-on-close
    >
      <mall-form
        ref="mallForm"
        v-if="formDialogVisible"
        @cancel="formDialogVisible = false"
        @reload="getTableList"
      ></mall-form>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
import mallList from "./components/mallList";
import mallForm from "./components/mallForm";
export default {
  name: "pointMall",
  components: {
    "mall-list": mallList,
    "mall-form": mallForm,
  },
  data() {
    return {
      loading: false,
      //用户详情弹框
      mallTabsName: "2",
      formDialogVisible: false,
      multipleSelection: [],
      formData: {},
      searchOption: {
        keyword: "",
        order: "",
        sort: "",
        page: 1,
        min_point: null,
        max_point: null,
        item_type: "",
        page_size: 10,
        status: 1,
      },

      detailsDialog: false, //打开详情框
      total: 1,
      tableListData: [], //页面表单的内容

      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
    };
  },
  created() {
    this.iniPageParam();
    this.getTableList();
  },
  watch: {
    $route(to, from) {
      this.iniPageParam();
      this.getTableList();
    },
  },
  methods: {
    handleAddOpen(e) {
      console.info(e);
      this.formData = {};
      this.formDialogVisible = true;
    },
    handleBatchDelete() {
      if (this.multipleSelection.length > 0) {
        this.$confirm(
          "确定要删除" + this.multipleSelection + "条数据吗？",
          "提示"
        )
          .then(() => {
            this.loading = true;
            this.api.point
              .pointMallDelete({ item_id: this.multipleSelection })
              .then(({ data }) => {
                this.loading = false;
                this.multipleSelection = [];
                this.getTableList();
                this.$message({
                  message: data.msg,
                  type: data.code == 0 ? "success" : "warning",
                });
              });
          })
          .catch(() => {});
      } else {
        this.$message({
          message: "请选择数据",
          type: "warning",
        });
      }
    },
    putawayFun(v) {
      if (this.multipleSelection.length > 0) {
        this.loading = true;
        this.api.point
          .pointMallUpDown({ item_id: this.multipleSelection })
          .then(({ data }) => {
            this.loading = false;
            this.multipleSelection = [];
            this.getTableList();
            this.$message({
              message: data.msg,
              type: data.code == 0 ? "success" : "warning",
            });
          });
      } else {
        this.$message({
          message: "请选择数据",
          type: "warning",
        });
      }
    },
    handleChangeMallTab() {
      this.searchOption.page = 1;
      this.searchOption.status = Number(this.mallTabsName);
      this.pageChange();
    },
    handlePageSizeChange() {
      this.pageChange();
    },
    //用户详情弹框
    userInformation(row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user_id);
      }, 0);
    },
    // 内容过长，鼠标移入显示全部
    getAgent(v) {
      return v.length > 10 ? v.substring(0, 10) + " ..." : v;
    },
    getShow(v) {
      return v.length > 10 ? false : true;
    },
    iniPageParam() {
      this.searchOption = {
        keyword: this.$route.query.keyword,
        order: this.$route.query.order,
        sort: this.$route.query.sort,
        page: this.$route.query.page ? Number(this.$route.query.page) : 1,
        min_point: this.$route.query.min_point
          ? Number(this.$route.query.min_point)
          : null,
        max_point: this.$route.query.max_point
          ? Number(this.$route.query.max_point)
          : null,
        status: this.$route.query.status ? Number(this.$route.query.status) : 1,
        item_type: this.$route.query.item_type,
        page_size: this.$route.query.page_size
          ? Number(this.$route.query.page_size)
          : this.page_size,
      };
      this.mallTabsName = String(this.searchOption.status);
    },
    /* 表格的排序发生变化 */
    handleDataSort(obj) {
      this.searchOption.sort = obj.order ? obj.prop : "";
      this.searchOption.order = obj.order ? this.sortableList[obj.order] : "";
      this.searchOption.status = Number(this.mallTabsName);
      this.searchOption.page = 1;
      this.pageChange();
      //this.getTableList();
    },
    //日期选择
    dateChange(val) {
      if (val) {
        this.searchOption.start = val[0];
        this.searchOption.end = val[1];
      }
    },
    //清空条件
    resetData() {
      this.searchOption = {
        keyword: "",
        order: "",
        sort: "",
        page: 1,
        min_point: null,
        max_point: null,
        item_type: "",
        page_size: 10,
        status: Number(this.mallTabsName),
      };
      this.searchTime = ["", ""];
      //this.getTableList();
      this.pageChange();
    },
    //筛选
    screening() {
      this.searchOption.page = 1;
      this.pageChange();
    },
    /* 获取列表内容 */
    getTableList() {
      var data = this.searchOption;
      this.loading = true;
      this.api.point.pointMallList(data).then((res) => {
        this.loading = false;
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 打开详情框 */
    detailsDelDialog(data) {
      this.detailsData = data;
      this.detailsDialog = true;
    },
    /* 改变页数 */
    pageChange(p) {
      if (p) this.searchOption.page = p;
      this.$router.push({
        path: "/point/mall",
        query: this.searchOption,
      });

      // this.getTableList();
    },
    handleSetData() {
      if (this.formData.item_id != undefined)
        this.$refs.mallForm.setFormData(this.formData);
    },
    handleUpdateData(obj) {
      let o = {
        item_id: obj.item_id,
        type: obj.type,
        name: obj.name,
        remark: obj.remark,
        sub_name: obj.sub_name,
        price: this.CalculateData(obj.price, "/"),
        point: obj.point,
        start_time: obj.start_time,
        end_time: obj.end_time,
        sort: obj.sort,
        stock: obj.stock,
        stock_all: obj.stock_all,
        status: obj.status,
        image: obj.image,
        summary: obj.summary,
        //
        // city_id: obj.city_id,
        merchant_id: obj.merchant_id,
        shop_id: obj.shop_id,
        shop_name: obj.shop_name,
        expire_day: obj.expire_day,
        is_free: obj.is_free,
      };
      this.formData = o;
      this.formDialogVisible = true;
      console.info(o);
    },
    handleSelectionChange(val, doIt) {
      console.info(val);
      this.multipleSelection = val;
      if (doIt) {
        if (doIt.fun == "pointMallUpDown") {
          this.putawayFun();
        }
        if (doIt.fun == "pointMallDelete") {
          this.handleBatchDelete();
        }
      }
    },
    handleSortChange(obj) {
      console.info(obj);
      this.searchOption.sort = obj.order ? obj.prop : "";
      this.searchOption.order = obj.order ? this.sortableList[obj.order] : "";
      this.searchOption.page = 1;
      this.pageChange();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button--primary {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
.shanxdiv {
  margin-bottom: 10px;
  display: flex;
}
.btn-nav {
  flex: 1;
  display: flex;
}
.t-s01 {
  line-height: 36px;
  font-size: 15px;
  margin-right: 10px;
  padding: 0px 0px 0px 10px;
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
.tabsBox {
  position: relative;
  z-index: 0;
}

.t-s02 {
  margin-left: 20px;
}
</style>
