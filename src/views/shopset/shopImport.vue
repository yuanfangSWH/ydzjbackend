<template>
  <div class="">
    <div class="shopSet">
      <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
      <div class="shanxdiv">
        <div class="rucwz2">关键字</div>
        <el-input
          style="width: 350px; margin-right: 10px"
          placeholder="输入搜索关键字"
          v-model="searchOption.keyword"
          @change="screening"
          clearable
        ></el-input>
        <div class="rucwz2">城市</div>
        <searchCity
          ref="searchCity"
          @setCityAreaName="searchCity"
          :show-area="true"
          :return-value="true"
        />
        <el-button
          class="filter-btn"
          type="primary"
          @click="screening"
          style="margin-left: 10px"
          >筛选</el-button
        >
        <el-button class="filter-btn" type="primary" @click="resetData"
          >清空条件</el-button
        >
      </div>
    </div>
    <div class="shopSet">
      <el-button
        style="margin-bottom: 10px"
        class="filter-btn"
        type="primary"
        @click="handleImportShop(0)"
        :disabled="!multipleSelection.length > 0"
        >导入选中</el-button
      >
      <!-- <el-table
        ref="multipNum"
        stripe
        :data="tableListData"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading"
        @sort-change="handleDataSort"
        @selection-change="selectItem"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" sortable="true" />
        <el-table-column prop="title" label="店铺名" sortable="true" />
        <el-table-column prop="tel" label="电话" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="category" label="类别" />
        <el-table-column prop="province_name" label="省" />
        <el-table-column prop="city_code" label="城市" sortable="true">
          <template slot-scope="scope">
            {{ scope.row.city_name }}
          </template>
        </el-table-column>
        <el-table-column prop="area_code" label="区域" sortable="true">
          <template slot-scope="scope">
            {{ scope.row.area_name }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="店铺地址" sortable="true" />
        <el-table-column prop="status" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleImportShop(scope.row)"
              >导入</el-button
            >
          </template>
        </el-table-column>
      </el-table> -->
      <el-tabs
        v-model="importPlatform"
        type="border-card"
        @tab-click="tabChange"
      >
        <el-tab-pane label="腾讯导入" name="tx">
          <div v-if="importPlatform === 'tx'">
            <shop-import-item-tx
              ref="shop-import-item-tx"
              :shopData="tableListData"
              :loading.sync="loading"
              @handleDataSort="handleDataSort"
              @selectItem="selectItem"
              @handleImportShop="handleImportShop"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="高德导入" name="gd">
          <div v-if="importPlatform === 'gd'">
            <shop-import-item-gd
              ref="shop-import-item-gd"
              :shopData="tableListData"
              :loading.sync="loading"
              @handleDataSort="handleDataSort"
              @selectItem="selectItem"
              @handleImportShop="handleImportShop"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="pagination">
        <el-pagination
          ref="pagination"
          :current-page="searchOption.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="searchOption.page_size"
          :hide-on-single-page="true"
          @current-change="pageChange"
          @size-change="handlePageSizeChange"
          background
          layout="sizes,prev, pager, next,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
import shopImportItemTx from "./components/shopImportItemTx";
import shopImportItemGd from "./components/shopImportItemGd";
import searchCity from "@/components/citySelectEX/shopSearchCity.vue";
export default {
  name: "shopImport",
  components: {
    shopImportItemTx,
    shopImportItemGd,
    searchCity,
  },
  data() {
    return {
      importPlatform: "tx", //默认显示高德平台
      multipleSelection: [], //批量选中
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
      searchOption: {
        //article_id: 0,
        sort: "",
        order: "",
        page: 1,
        keyword: "",
        province_id: "",
        city_id: "",
        area_id: "",
        page_size: 10,
      },
      total: 1,
      tableListData: [], //页面表单的内容
      loading: false,
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
    searchCity(obj) {
      console.info(obj);
      this.searchOption.province_id = obj.province_id;
      this.searchOption.city_id = obj.city_id;
      this.searchOption.area_id = obj.area_id;
      this.searchOption.page = 1;
      this.pageChange();
    },
    tabChange(e) {
      this.searchOption = {
        sort: "",
        order: "",
        page: 1,
        keyword: "",
        province_id: "",
        city_id: "",
        area_id: "",
      };
      this.$refs.searchCity.resetData();
      this.getTableList();
    },
    iniPageParam() {
      this.searchOption = {
        sort: this.$route.query.sort,
        order: this.$route.query.order,
        page: this.$route.query.page ? Number(this.$route.query.page) : 1,
        page_size: this.$route.query.page_size
          ? Number(this.$route.query.page_size)
          : 10,
        province_id: this.$route.query.province_id,
        city_id: this.$route.query.city_id,
        area_id: this.$route.query.area_id,
        keyword: this.$route.query.keyword
          ? decodeURIComponent(this.$route.query.keyword)
          : "",
      };
      setTimeout(() => {
        this.$refs.searchCity.getProvince();
      });
    },
    /* 表格的排序发生变化 */
    handleDataSort(obj) {
      //console.info(obj)
      this.searchOption.sort = obj.order ? obj.prop : "";
      this.searchOption.order = obj.order ? this.sortableList[obj.order] : "";
      this.searchOption.page = 1;
      this.pageChange();
      //this.getTableList();
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = val;
    },
    //重置
    resetData() {
      this.searchOption = {
        sort: "",
        order: "",
        province_id: "",
        city_id: "",
        area_id: "",
        page: 1,
        keyword: "",
        page_size: 10,
      };
      this.$refs.searchCity.resetData();
      this.pageChange();
    },
    handlePageSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.searchOption.page_size = Number(val);
      //this.getTableList();
      this.pageChange();
    },
    //筛选
    screening() {
      this.searchOption.page = 1;
      console.info(this.searchOption);
      this.pageChange();
    },
    /* 获取列表内容 */
    getTableList() {
      var data = this.searchOption;
      this.loading = true;
      this.api.shop[
        this.importPlatform == "gd" ? "shopImportGdList" : "shopImportList"
      ](data)
        .then((res) => {
          this.loading = false;
          this.$refs.pagination.internalCurrentPage = this.searchOption.page;
          this.tableListData = res.data.data;
          this.total = res.data.count ? res.data.count : 0;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //点击导入按钮
    handleImportShop(row) {
      let datas = [];
      if (row == 0) {
        datas = this.multipleSelection;
      } else {
        let obj = Object.assign({}, row);
        datas = [obj];
        console.info(datas);
      }
      this.$confirm(
        "确定要导入 [ " +
          (row
            ? (this.importPlatform == "gd" ? row.name : row.title) + " ] 吗？"
            : datas[0][this.importPlatform == "gd" ? "name" : "title"] +
              " ] 等记录吗？"),
        "提示"
      )
        .then(() => {
          let api =
            this.importPlatform == "gd" ? "shopImportGdAdd" : "shopImportAdd";
          this.api.shop[api](datas).then(({ data }) => {
            let res = data;
            this.multipleSelection = [];
            this.$refs["shop-import-item-" + this.importPlatform].clearSelect();
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
          });
        })
        .catch(() => {});
    },

    /* 改变页数 */
    pageChange(p) {
      if (p) this.searchOption.page = p;
      this.searchOption.t = Date.parse(new Date());
      this.searchOption.title = this.searchOption.title
        ? encodeURIComponent(this.searchOption.title)
        : "";
      this.$router.push({
        path: "/shopImport",
        query: this.searchOption,
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

.shanxdiv {
  margin-bottom: 10px;
  display: flex;
  .rucwz2 {
    color: #0a0a0a;
  }
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
