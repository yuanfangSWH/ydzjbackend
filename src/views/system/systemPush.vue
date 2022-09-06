<template>
  <div class="">
    <div class="shopSet">
      <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
      <div v-if="searchOption.article_id == 0"
           class="shanxdiv">
        <div class="rucwz2">标题</div>
        <el-input style="width: 350px; margin-right: 10px"
                  placeholder="搜索推送标题"
                  v-model="searchOption.title"
                  @change="screening"
                  clearable></el-input>
        <div class="rucwz2">推送时间</div>
        <el-date-picker class="datePicker"
                        v-model="searchTime"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        value-format="yyyy-MM-dd HH:mm"
                        format="yyyy-MM-dd HH:mm"
                        @change="dateChange"></el-date-picker>
        <el-button class="filter-btn"
                   type="primary"
                   @click="screening"
                   style="margin-left: 10px">筛选</el-button>
        <el-button class="filter-btn"
                   type="primary"
                   @click="resetData">清空条件</el-button>
      </div>
      <div v-if="searchOption.article_id > 0"
           class="shanxdiv">
        <el-button class="filter-btn"
                   type="primary"
                   @click="$router.back()">返回</el-button>
      </div>
    </div>
    <div class="shopSet">
      <div v-if="searchOption.article_id == 0"
           class="shanxdiv">
        <el-button type="primary"
                   @click="insertData"
                   style="margin-left: 10px">发起推送</el-button>
      </div>
      <el-table ref="multipNum"
                stripe
                :data="tableListData"
                tooltip-effect="dark"
                style="width: 100%"
                v-loading="loading"
                @sort-change="handleDataSort">
        <el-table-column prop="push_id"
                         label="ID"
                         width="80"
                         sortable="true" />
        <el-table-column prop="title"
                         label="推送标题" />
        <el-table-column prop="content"
                         label="推送内容" />
        <el-table-column prop="url"
                         label="链接" />
        <el-table-column prop="target"
                         label="发送到用户">
          <template slot-scope="scope">
            <span v-if="scope.row.target == 1">全体用户</span>
            <span v-if="scope.row.target == 2 && scope.row.target_os == 0"
                  style="margin-right: 10px">不限系统</span>
            <span v-if="scope.row.target == 2 && scope.row.target_os == 1"
                  style="margin-right: 10px">iOS</span>
            <span v-if="scope.row.target == 2 && scope.row.target_os == 2"
                  style="margin-right: 10px">Android</span>
            <span v-if="scope.row.target == 2 && scope.row.target_sex == 0"
                  style="margin-right: 10px">不限性别</span>
            <span v-if="scope.row.target == 2 && scope.row.target_sex == 1"
                  style="margin-right: 10px">男用户</span>
            <span v-if="scope.row.target == 2 && scope.row.target_sex == 2"
                  style="margin-right: 10px">女用户</span>
          </template>
        </el-table-column>

        <el-table-column prop=""
                         label="计划推送时间"
                         sortable="true">
          <template slot-scope="scope">
            <span v-if="scope.row.send_time">{{ scope.row.send_time }}</span>
            <span v-else>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="push_time"
                         label="推送时间"
                         sortable="true" />
        <el-table-column prop="create_time"
                         label="创建时间"
                         sortable="true" />
        <el-table-column prop="status"
                         label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">已删除</span>
            <span v-if="scope.row.status == 1"
                  style="color: #67c23a">已推送</span>
            <span v-if="scope.row.status == 2">待推送</span>
            <span v-if="scope.row.status == 3">取消推送</span>
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
               width="50%"
               :close-on-click-modal="false"
               :destroy-on-close="true">
      <el-form :model="detailsData"
               :rules="rules"
               ref="detailsData"
               label-width="150px"
               class="demo-ruleForm">
        <el-form-item label="推送标题："
                      prop="title">
          <el-input v-model="detailsData.title"
                    placeholder="请填写推送标题"
                    show-word-limit
                    maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="推送描述："
                      prop="content">
          <el-input type="textarea"
                    v-model="detailsData.content"
                    :autosize="{ minRows: 3, maxRows: 6 }"
                    show-word-limit
                    maxlength="150"
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
                     inactive-value="2"
                     active-color="#ffbe11"
                     inactive-color="#d9d9d9">
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
    <!-- 返回上一页 -->
    <go-back v-if="searchOption.article_id > 0"></go-back>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
export default {
  name: "SystemPush",
  data () {
    return {
      searchOption: {
        article_id: 0,
        title: "",
        sort: "",
        order: "",
        page: 1,
        start_time: "",
        end_time: "",
        page_size: 10,
      },
      searchTime: ["", ""],
      detailsDialog: false, //打开详情框
      insertDialog: false, //打开新建框
      total: 1,
      tableListData: [], //页面表单的内容
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
        // content: [
        //   { required: true, message: "请输入推送内容", trigger: "blur" },
        // ],
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
        article_id: this.$route.query.article_id
          ? Number(this.$route.query.article_id)
          : 0,
        title: this.$route.query.title
          ? decodeURIComponent(this.$route.query.title)
          : "",
        user: this.$route.query.user,
        sort: this.$route.query.sort,
        order: this.$route.query.order,
        page: this.$route.query.page ? Number(this.$route.query.page) : 1,
        page_size: this.searchOption.page_size,
        start_time: this.$route.query.start_time,
        end_time: this.$route.query.end_time,
      };
      this.searchTime[0] = this.$route.query.start_time
        ? this.$route.query.start_time
        : "";
      this.searchTime[1] = this.$route.query.end_time
        ? this.$route.query.end_time
        : "";
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
          this.insertDialog = false;
          this.getTableList();
          this.detailsData = {
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
          };
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
    //重置
    resetData () {
      this.searchOption = {
        article_id:
          this.searchOption.article_id > 0 ? this.searchOption.article_id : 0,
        title: "",
        sort: "",
        order: "",
        page: 1,
        start_time: "",
        end_time: "",
      };
      this.searchTime = ["", ""];
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
      loading: true;
      this.api.system
        .SystemPush(data)
        .then((res) => {
          this.loading = false;
          if (res.data.data.length == 0 && this.searchOption.article_id > 0) {
            this.$message("没有找到推送记录，请返回查看其它数据。");
          }
          this.tableListData = res.data.data;
          this.total = res.data.count ? res.data.count : 0;
          this.$refs.pagination.internalCurrentPage = this.searchOption.page;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    /* 打开详情框 */
    detailsDelDialog (data) {
      this.detailsData = data;
      this.detailsDialog = true;
    },
    /* 改变页数 */
    pageChange (p) {
      if (p) this.searchOption.page = p;
      if (!this.searchTime) {
        this.searchTime = ["", ""];
        this.searchOption.start_time = this.searchTime[0];
        this.searchOption.end_time = this.searchTime[1];
      }
      this.searchOption.title = this.searchOption.title;
      this.$router.push({
        path: "/Notification/systemPush",
        query: this.searchOption,
      });

      // this.getTableList();
    },
    handlePageSizeChange (v) {
      this.pageChange();
      //this.getTableList();
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
