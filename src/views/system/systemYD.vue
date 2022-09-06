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
                         label="ID"
                         width="80" />
        <el-table-column prop="image"
                         label="图片"
                         width="100">
          <template slot-scope="scope">
            <el-image :src="scope.row.image"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title"
                         label="标题" />
        <el-table-column prop="view_count"
                         label="浏览量" />
        <el-table-column prop="create_time"
                         label="发布时间" />
        <!-- <el-table-column prop="status" label="是否推送">
          <template slot-scope="scope">
            <span
              v-if="scope.row.status == 0"
              style="color: #f56c6c; font-weight: bold"
            >
              -
            </span>
            <span
              v-if="scope.row.status == 1"
              style="color: #409eff; font-weight: bold"
              ><i class="el-icon-check"></i
            ></span>
          </template>
        </el-table-column> -->
        <el-table-column align="center"
                         label="操作"
                         width="200"
                         fixed="right">
          <template slot-scope="scope">
            <div v-if="searchOption.is_delete == 0">
              <el-button size="mini"
                         type="text"
                         @click="handlePushArticle(scope.row)">推送</el-button>
              <el-button size="mini"
                         type="text"
                         @click="handleOpenPush(scope.row)">查看推送</el-button>
              <el-button size="mini"
                         type="text"
                         @click="handleOpenArticle(scope.row.article_id)">编辑</el-button>
              <el-button type="text"
                         size="mini"
                         @click="deleteData(scope.row.article_id)">删除</el-button>
            </div>
            <div v-if="searchOption.is_delete == 1">
              <div>
                <el-button size="mini"
                           type="text"
                           @click="recoveryData(scope.row.article_id)">还原</el-button>
                <el-button size="mini"
                           type="text"
                           @click="handleOpenPush(scope.row)">查看推送</el-button>
              </div>
              <div>
                <el-button size="mini"
                           type="text"
                           @click="handleOpenArticle(scope.row.article_id)">编辑</el-button>
                <el-button size="mini"
                           type="text"
                           @click="realDelData(scope.row.article_id)">彻底删除</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination ref="pagination"
                       :current-page="searchOption.page"
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
    <el-dialog title="发起推送"
               :visible.sync="insertDialog"
               width="50%">
      <el-form :model="detailsData"
               :rules="rules"
               ref="detailsData"
               label-width="150px"
               class="demo-ruleForm">
        <el-form-item label="推送标题："
                      prop="title">
          <el-input v-model="detailsData.title"
                    placeholder="请填写推送标题"></el-input>
        </el-form-item>
        <el-form-item label="推送内容："
                      prop="content">
          <el-input type="textarea"
                    v-model="detailsData.content"
                    :rows="3"
                    placeholder="请填写推送内容"></el-input>
        </el-form-item>
        <el-form-item label="链接"
                      prop="url">
          <el-input v-model="detailsData.url"
                    placeholder="请填写推送标题"></el-input>
        </el-form-item>
        <el-form-item label="全体推送"
                      prop="target">
          <el-switch v-model="detailsData.target"
                     active-value="1"
                     inactive-value="2">
          </el-switch>
        </el-form-item>
        <el-form-item v-if="detailsData.target == '2'"
                      label="指定性别：">
          <el-checkbox-group v-model="target_sex">
            <el-checkbox label="男"></el-checkbox>
            <el-checkbox label="女"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="detailsData.target == '2'"
                      label="指定系统：">
          <el-checkbox-group v-model="target_os">
            <el-checkbox label="iOS"></el-checkbox>
            <el-checkbox label="Android"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="计划时间：">
          <el-date-picker v-model="detailsData.send_time"
                          type="datetime"
                          placeholder="设置计划推送时间"
                          value-format="yyyy-MM-dd HH:mm"
                          format="yyyy-MM-dd HH:mm">
          </el-date-picker>
          注：不填则立即推送
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="insertDialog = false">取消</el-button>
        <el-button type="primary"
                   @click="handleInsertData('detailsData')">确定</el-button>
      </span>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "SystemYD",
  data () {
    return {
      searchOption: {
        keyword: "",
        sort: "",
        order: "",
        page: 1,
        page_size: 10,
        start_time: "",
        end_time: "",
        is_delete: 0,
      },
      multipleSelection: [],
      searchTime: ["", ""],
      detailsDialog: false, //打开推送框
      insertDialog: false, //打开新建框
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
        type: 0,
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
        article_id: 0,
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
    iniPageParam () {
      this.searchOption = {
        keyword: this.$route.query.keyword
          ? decodeURIComponent(this.$route.query.keyword)
          : "",
        user: this.$route.query.user,
        page_size: this.searchOption.page_size,
        sort: this.$route.query.sort,
        order: this.$route.query.order,
        page: this.$route.query.page ? Number(this.$route.query.page) : 1,
        start_time: this.$route.query.start_time,
        end_time: this.$route.query.end_time,
        is_delete: this.$route.query.is_delete
          ? Number(this.$route.query.is_delete)
          : 0,
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
    insertData () {
      this.insertDialog = true;
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
        path: "/Notification/systemYD/articleYD",
      });
    },
    handleOpenArticle (id) {
      this.$router.push({
        path: "/Notification/systemYD/articleYD",
        query: { id: id },
      });
    },
    handleInsertData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("确定要提交推送吗？", "提示").then(() => {
            this.insertDataOk(formName);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    insertDataOk (formName) {
      let isOk = true;
      let msg = "";
      if (this.detailsData.target == "2") {
        if (this.target_sex.length == 0) {
          isOk = false;
          msg = "必须至少指定一个性别";
        } else if (this.target_os.length == 0) {
          isOk = false;
          msg = "必须至少指定一个系统";
        } else {
          if (this.target_sex.length == 1) {
            this.detailsData.target_sex =
              this.target_sex[0] == "男" ? "1" : "2";
          } else {
            this.detailsData.target_sex = "0";
          }
          if (this.target_os.length == 1) {
            this.detailsData.target_os = this.target_os[0] == "iOS" ? "1" : "2";
          } else {
            this.detailsData.target_os = "0";
          }
        }
      }
      if (isOk) {
        let datas = this.detailsData;
        delete datas.push_id;
        delete datas.image;
        datas.target = Number(this.detailsData.target);
        datas.target_sex = Number(this.detailsData.target_sex);
        datas.target_os = Number(this.detailsData.target_os);
        this.api.system.SystemPushInsert(datas).then(({ data }) => {
          let res = data;
          this.$message({
            message: "" + res.msg,
            type: "success",
          });
          this.$router.push({
            path: "/Notification/systemYD",
          });
          this.insertDialog = false;
        });
      } else {
        this.$message.error(msg);
      }
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
      data.type = 2;
      this.loading = true;
      this.api.articleManage.articleList(data).then((res) => {
        this.loading = false;
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
        this.$refs.pagination.internalCurrentPage = this.searchOption.page;
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
    /* 改变页数 */
    pageChange (p) {
      if (p) this.searchOption.page = p;
      //let datas = _.cloneDeep(this.searchOption);
      let datas = Object.assign({}, this.searchOption); //深度拷贝
      datas.keyword = datas.keyword ? encodeURIComponent(datas.keyword) : "";
      this.$router.push({
        path: "/Notification/systemYD",
        query: datas,
      });

      // this.getTableList();
    },
    handlePageSizeChange (v) {
      this.pageChange();
      //this.getTableList();
    },
    handlePushArticle (row) {
      this.articleData = row;
      this.detailsData.title = row.title;
      this.detailsData.content = row.summary;
      this.detailsData.image = row.image;
      this.detailsData.url =
        process.env.NODE_ENV == "production"
          ? "http://m.ddhi.cn/single/article/detail?article_id=" +
          row.article_id
          : "http://mtest.ddhi.cn/single/article/detail?article_id=" +
          row.article_id;
      this.detailsData.article_id = Number(row.article_id);
      this.insertDialog = true;
    },

    //点击查看推送
    handleOpenPush (row) {
      this.$router.push({
        path: "/Notification/systemPush",
        query: {
          article_id: row.article_id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
