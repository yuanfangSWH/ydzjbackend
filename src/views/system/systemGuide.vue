<template>
  <div class="">
    <div class="shopSet">
      <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
      <div class="shanxdiv">
        <div style="flex: 1">
          <div v-if="searchOption.is_delete == 0">
            <el-button type="danger"
                       @click="deleteData(0)"
                       style="margin-left: 10px"
                       :disabled="!multipleSelection.length > 0">删除</el-button>
            <el-button type="danger"
                       @click="handleNewArticle"
                       style="margin-left: 10px">新增</el-button>
            <el-button type="primary"
                       @click="handleDataDelete(1)"
                       style="margin-left: 10px">回收站</el-button>
          </div>
          <div v-if="searchOption.is_delete == 1">
            <el-button type="danger"
                       @click="handleDataDelete(0)"
                       style="margin-left: 10px">返回</el-button>
            <el-button type="danger"
                       @click="recoveryData(0)"
                       style="margin-left: 10px"
                       :disabled="!multipleSelection.length > 0">还原</el-button>
            <el-button type="danger"
                       @click="realDelData(0)"
                       style="margin-left: 10px"
                       :disabled="!multipleSelection.length > 0">彻底删除</el-button>
          </div>
        </div>
        <div class="">
          <el-input style="width: 350px; margin-right: 10px"
                    placeholder="搜索推送标题"
                    v-model="searchOption.keyword"
                    @change="screening"
                    clearable></el-input>
          <el-button type="danger"
                     @click="screening"
                     style="margin-left: 10px">搜索</el-button>
        </div>
      </div>
      <el-table ref="multipNum"
                stripe
                :data="tableListData"
                tooltip-effect="dark"
                style="width: 100%"
                v-loading="loading"
                @selection-change="selectItem"
                @sort-change="handleDataSort">
        <el-table-column type="selection"
                         width="55" />
        <el-table-column prop="article_id"
                         label="ID" />

        <el-table-column prop="title"
                         label="标题" />
        <el-table-column prop="create_time"
                         label="更新时间" />
        <el-table-column prop="sort"
                         label="排序">
          <template slot-scope="scope">
            <el-input class="input_pxcss"
                      v-model="scope.row.sort"
                      ref="saveTagInput"
                      @blur="
                percentF(JSON.parse(JSON.stringify(scope.row)), scope.$index)
              "
                      v-if="scope.$index === sortingid"></el-input>
            <div class="muzhicss"
                 @click="
                khaki(scope.$index, JSON.parse(JSON.stringify(scope.row)))
              "
                 v-else>
              <span>{{ scope.row.sort }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="操作">
          <template slot-scope="scope">
            <div v-if="searchOption.is_delete == 0">
              <el-button size="mini"
                         type="text"
                         @click="handleOpenArticle(scope.row.article_id)">编辑</el-button>
              <el-button type="text"
                         size="mini"
                         @click="deleteData(scope.row.article_id)">删除</el-button>
            </div>
            <div v-if="searchOption.is_delete == 1">
              <el-button size="mini"
                         type="text"
                         @click="recoveryData(scope.row.article_id)">还原</el-button>
              <el-button size="mini"
                         type="text"
                         @click="handleOpenArticle(scope.row.article_id)">编辑</el-button>
              <el-button size="mini"
                         type="text"
                         @click="realDelData(scope.row.article_id)">彻底删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination :current-page="searchOption.page"
                       :hide-on-single-page="true"
                       @current-change="pageChange"
                       background
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size.sync="searchOption.page_size"
                       @size-change="handlePageSizeChange"
                       layout="sizes,prev, pager, next,jumper"
                       :total="total"></el-pagination>
      </div>
    </div>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "SystemYD",
  data () {
    return {
      // oldSort:0,
      // dataItem:{},
      // editable: [],
      //排序暂存值
      sortData: "",
      //排序输入框渲染值
      sortingid: "",
      searchOption: {
        type: 3,
        keyword: "",
        sort: "",
        order: "",
        page: 1,
        start_time: "",
        end_time: "",
        is_delete: 0,
        page_size: 10,
      },
      multipleSelection: [],
      searchTime: ["", ""],
      total: 1,
      tableListData: [], //页面表单的内容
      articleData: {
        article_id: 0,
        class_id: 0,
        class_name: "",
        content: "",
        create_time: "",
        delete_time: "",
        image: "",
        modify_time: "",
        status: 0,
        summary: "",
        title: "",
        type: 3,
        url: "",
        view_count: 0,
      },
      detailsData: {
        push_id: "",
        title: "",
        content: "",
        image: "",
        url: "",
        target: "1",
        target_sex: 0,
        target_os: 0,
        target_ver: "",
        send_time: "",
      },
      target_sex: [],
      target_os: [],
      rules: {
        title: [{ required: true, message: "请输入推送标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入推送内容", trigger: "blur" },
        ],
        url: [{ required: true, message: "请输入链接", trigger: "blur" }],
      },
      loading: false,
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  created () {
    this.iniPageParam();
    this.getTableList();
  },
  watch: {
    $route (to, from) {
      this.iniPageParam();
      this.getTableList();
    },
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
        var data = row;
        data.sort = Number(data.sort);
        this.api.articleManage.editArticle(data).then((res) => {
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
    iniPageParam () {
      this.searchOption = {
        type: 3,
        keyword: this.$route.query.keyword
          ? decodeURIComponent(this.$route.query.keyword)
          : "",
        user: this.$route.query.user,
        sort: this.$route.query.sort,
        order: this.$route.query.order,
        page: this.$route.query.page ? Number(this.$route.query.page) : 1,
        start_time: this.$route.query.start_time,
        end_time: this.$route.query.end_time,
        is_delete: this.$route.query.is_delete
          ? Number(this.$route.query.is_delete)
          : 0,
        page_size: this.searchOption.page_size,
      };
      this.searchTime[0] = this.$route.query.start_time
        ? this.$route.query.start_time
        : "";
      this.searchTime[1] = this.$route.query.end_time
        ? this.$route.query.end_time
        : "";
    },
    /* 选择表的行 */
    selectItem (val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.article_id);
        this.nameArr.push(item.name);
      });
    },
    /* 表格的排序发生变化 */
    handleDataSort (obj) {
      //console.info(obj)
      this.searchOption.sort = obj.order ? obj.prop : "";
      this.searchOption.order = obj.order ? this.sortableList[obj.order] : "";
      this.searchOption.page = 1;
      this.pageChange();
      //this.getTableList();
    },
    handleNewArticle () {
      //点击新建文章
      this.$router.push({
        path: "/articleGuide",
      });
    },
    handleOpenArticle (id) {
      this.$router.push({
        path: "/articleGuide",
        query: { id: id },
      });
    },
    //日期选择
    dateChange (val) {
      if (val) {
        this.searchOption.start_time = val[0];
        this.searchOption.end_time = val[1];
      }
    },
    //查看回收站
    handleDataDelete (v) {
      this.searchOption = {
        type: 3,
        keyword: "",
        sort: "",
        order: "",
        page: 1,
        start_time: "",
        end_time: "",
        is_delete: v,
      };
      this.searchTime = [];
      this.pageChange();
    },
    //重置
    resetData () {
      this.searchOption = {
        keyword: "",
        sort: "",
        order: "",
        page: 1,
        start_time: "",
        end_time: "",
        is_delete: 0,
      };
      this.searchTime = [];
      this.pageChange();
    },
    //筛选
    screening () {
      this.searchOption.page = 1;
      this.pageChange();
    },
    /* 获取列表内容 */
    getTableList () {
      var data = this.searchOption;
      this.loading = true;
      this.api.articleManage.articleList(data).then((res) => {
        this.loading = false;
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 删除数据 */
    deleteData (v) {
      if (Number(v) > 0) {
        this.multipleSelection = [];
        this.multipleSelection.push(v);
        this.$refs.multipNum.clearSelection();
      }
      if (this.multipleSelection.length > 0) {
        this.deleteConfirm();
      } else {
        this.$message.error("请勾选数据");
      }
    },
    /* 删除确认 */
    deleteConfirm () {
      if (this.multipleSelection.length > 0) {
        this.$confirm("确定要删除吗？", "提示")
          .then(() => {
            let data = { id: this.multipleSelection };
            this.api.articleManage.delArticle(data).then(({ data }) => {
              let rec = data;
              this.getTableList();
            });
          })
          .catch(() => { });
      }
    },
    /* 还原数据 */
    recoveryData (v) {
      if (Number(v) > 0) {
        this.multipleSelection = [];
        this.multipleSelection.push(v);
        this.$refs.multipNum.clearSelection();
      }
      if (this.multipleSelection.length > 0) {
        this.recoveryDataConfirm();
      } else {
        this.$message.error("请勾选数据");
      }
    },
    recoveryDataConfirm () {
      if (this.multipleSelection.length > 0) {
        this.$confirm("确定要还原吗？", "提示")
          .then(() => {
            let data = { id: this.multipleSelection };
            this.api.articleManage.recoveryArticle(data).then(({ data }) => {
              let rec = data;
              this.getTableList();
            });
          })
          .catch(() => { });
      }
    },
    /* 彻底删除数据 */
    realDelData (v) {
      if (Number(v) > 0) {
        this.multipleSelection = [];
        this.multipleSelection.push(v);
        this.$refs.multipNum.clearSelection();
      }
      if (this.multipleSelection.length > 0) {
        this.realDelDataConfirm();
      } else {
        this.$message.error("请勾选数据");
      }
    },
    realDelDataConfirm () {
      if (this.multipleSelection.length > 0) {
        this.$confirm("确定要彻底删除吗？", "提示")
          .then(() => {
            let data = { id: this.multipleSelection };
            this.api.articleManage.realDelArticle(data).then(({ data }) => {
              let rec = data;
              this.getTableList();
            });
          })
          .catch(() => { });
      }
    },
    handlePageSizeChange (v) {
      this.pageChange();
    },

    /* 改变页数 */
    pageChange (p) {
      if (p) this.searchOption.page = p;
      //let datas = _.cloneDeep(this.searchOption);
      let datas = Object.assign({}, this.searchOption); //深度拷贝
      datas.keyword = datas.keyword ? encodeURIComponent(datas.keyword) : "";
      this.$router.push({
        path: "/article/set",
        query: datas,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.slotSpan {
  cursor: pointer;
}
.slot-ipt {
  width: 100px;
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
