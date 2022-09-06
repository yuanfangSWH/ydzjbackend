<template>
  <div class="shopSet">
    <div class="box2">
      <div class="page-title">{{ this.NoPass ? this.NoPass : this._getVuex("pageTitle") }}</div>
      <div class="add-box2">
        <div class="btn-nav"
             v-if="isPass">
          <el-button type="danger"
                     @click="batcDdelFun(1, 0)">通过</el-button>
          <el-button type="danger"
                     @click="batcDdelFun(2, 0)">不通过</el-button>
          <el-button type="primary"
                     @click="toRecycle">查看不通过</el-button>
        </div>
        <div v-else
             class="btn-nav">
          <el-button type="danger"
                     @click="batcDdelFun(1, 0)">通过</el-button>
          <el-button type="primary"
                     @click="toBack">返回</el-button>
        </div>
        <div class="so-nav">
          <el-input class="so-ipt"
                    placeholder="请输入内容/用户ID/手机号"
                    clearable
                    v-model="searchValue"
                    @change="searchDatas">
          </el-input>
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
                @filter-change="filterTagTable"
                @sort-change="sortFilterFun">
        <el-table-column type="selection"
                         width="55" />
        <el-table-column label="ID"
                         width="100"
                         sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.comment_id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user"
                         label="评论用户"
                         width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.user"
                 style="display: flex; align-items: center"
                 @click="userInformation(scope.row)">
              <el-image style="width: 30px; height: 30px; border-radius: 100%"
                        fit="fill"
                        :src="scope.row.user.avatar"></el-image>
              <div style="flex: 1; margin-left: 5px">
                {{ scope.row.user.nickname }}（<span v-if="scope.row.user.gender == 1">男</span><span v-else>女</span>/{{ scope.row.user.age }}岁）
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="content"
                         label="评论内容"
                         width="200">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        :content="scope.row.content"
                        placement="bottom"
                        :disabled="getShow(scope.row.content)">
              <div>{{ getAgent(scope.row.content) }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="reply_count"
                         label="回复"
                         width="100" />
        <el-table-column prop="like_count"
                         label="点赞"
                         width="100" />
        <el-table-column prop="create_time"
                         label="发布时间"
                         sortable="custom" />
        <el-table-column prop="status"
                         label="状态"
                         width="180"
                         v-if="isPass"
                         :filter-multiple="false"
                         :filters="statusData"
                         filter-placement="bottom-end"
                         :filtered-value="[3]"
                         :column-key="'status'">
          <template slot-scope="scope">
            <p>{{ scope.row.status | showStatusText }}</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         align="center"
                         label="操作"
                         width="250">
          <template slot-scope="scope">
            <div v-if="isPass">
              <div v-if="scope.row.status == 3">
                <el-button class="t01"
                           size="mini"
                           style="color:#409eff"
                           type="text"
                           @click="()=>{showDetail=true;infoThread_id=scope.row.thread_id}">查看原文</el-button>
                <el-button class="t01"
                           size="mini"
                           type="text"
                           @click="passFun(scope.row.comment_id, 1, 1)">通过</el-button>
                <el-button class="t02"
                           size="mini"
                           type="text"
                           @click="passFun(scope.row.comment_id, 2, 1)">不通过</el-button>
              </div>
              <div v-if="scope.row.status == 1"
                   style="font-size:14px">
                <el-button class="t01"
                           size="mini"
                           style="color:#409eff"
                           type="text"
                           @click="()=>{showDetail=true;infoThread_id=scope.row.thread_id}">查看原文</el-button>
                <!-- 莉莉说在这里加个查看原文 -->
                <el-button class="t02"
                           size="mini"
                           type="text"
                           @click="delHandles(scope.row)">删除</el-button>
              </div>
            </div>
            <div v-else>
              <el-button class="t01"
                         size="mini"
                         style="color:#409eff"
                         type="text"
                         @click="()=>{showDetail=true;infoThread_id=scope.row.thread_id}">查看原文</el-button>
              <el-button size="mini"
                         type="text"
                         class="t01"
                         @click="passFun(scope.row.comment_id, 1, 1)">通过</el-button>
            </div>

          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <!-- <el-pagination
          :current-page="curPage"
          :hide-on-single-page="true"
          @current-change="pageChange"
          background
          layout="prev, pager, next"
          :total="total"
        ></el-pagination> -->
        <el-pagination :hide-on-single-page="true"
                       @size-change="handleSizeChange"
                       @current-change="pageChange"
                       :current-page="curPage"
                       :page-sizes="[10, 20, 30]"
                       :page-size="pagesize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息"
               :visible.sync="usertx"
               width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
    <!-- 返回上一页 -->
    <goBack v-if="showBack"></goBack>
    <el-dialog title="动态详情"
               :visible.sync="showDetail"
               width="50%">
      <template v-if="showDetail">
        <comment-Info :thread_id="infoThread_id"
                      @handleClose="handleClose">
        </comment-Info>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import commentInfo from './components/commentInfo'
export default {
  name: "commentlist",
  data () {
    return {
      showDetail: false,
      infoThread_id: null,
      pagesize: 10,
      //返回上一页
      showBack: false,
      //用户ID
      user_id: "",
      //用户信息弹框
      userDialogTK: false,
      //帖子信息弹框
      threadDialogTK: false,
      //信息数据
      UserGiftShop: "",
      //审核类型
      statusSH: "",
      //状态
      status: "3",
      statusData: [
        {
          value: 1,
          text: "已通过",
        },
        {
          value: 3,
          text: "待审核",
        },
      ],
      //评论等级
      comment_level: "",
      comment_levelData: [
        {
          id: 1,
          name: "一级",
        },
        {
          id: 2,
          name: "二级",
        },
      ],
      updateDialog: false, //打开修改框
      insertDialog: false, //打开新增框
      mutilDeleteDialog: false, //打开审核框
      deleteDialog: false, //打开审核框
      //页码
      curPage: 1,
      //总数
      total: 1,
      //页码2
      curPage2: 1,
      tableListData: [], //页面表单的内容
      //添加的内容
      addItem: {},
      //修改数据
      currenItem: {},
      currenDeleteRow: "", //当前选中的行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      updateDialogTitle: "", //修改框的标题
      deltitle: "", //审核框的标题
      searchValue: "", //搜索的值
      //评论ID
      comment_id: "",
      //帖子主题
      titleData: "",
      threadData: "",
      usertx: false,
      sortVal: "",
      sortStatus: false,
      order: "desc",
      isPass: true,
      sort: '',
      NoPass: null,
    };
  },
  components: {
    commentInfo
  },
  created () {
    if (this.$route.query.from) {
      this.status = 1;
      this.comment_id = this.$route.query.comment_id
    }
    // 返回上一页
    this.showBack = this.$route.query.from ? true : false;
    this.getTableList();
  },
  mounted () {},
  filters: {
    showStatusText (val) {
      const statusDatas = [
        {
          id: 0,
          name: "删除",
        },
        {
          id: 1,
          name: "已通过",
        },
        {
          id: 2,
          name: "违规",
        },
        {
          id: 3,
          name: "待审核",
        },
      ];
      return statusDatas.find((item) => item.id == val)
        ? statusDatas.find((item) => item.id == val).name
        : " ";
    }
  },
  methods: {
    delHandles (item) {
      let data = {
        comment_id: [item.comment_id]
      }
      this.api.community.delHandles(data).then((res) => {
        this.$message({
          message: "" + res.data.msg,
          type: "success",
        });
        this.getTableList();
      });
    },
    //table筛选
    filterTagTable (filters) {
      if (!filters.status[0]) {
        this.status = '1,3'
      } else {

        this.status = filters.status[0];
      }
      this.getTableList();
    },
    //原文返回
    handleClose (val) {
      this.showDetail = false
    },
    // 内容过长，鼠标移入显示全部
    getAgent (v) {
      return v.length > 20 ? v.substring(0, 20) + " ..." : v;
    },
    getShow (v) {
      return v.length > 20 ? false : true;
    },
    //table排序
    sortMethod (val) {
      this.sortVal = val;
      this.sortStatus = !this.sortStatus;
      if (this.sortStatus) {
        this.order = "asc"; //正序
      } else {
        this.order = "desc"; //倒序
      }
      //接口逻辑
      this.getTableList();
    },
    //table排序
    sortFilterFun (column) {
      this.sort = column.prop
      this.sortMethod(column.prop);
    },
    //用户详情弹框
    userInformation (row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user_id);
      }, 0);
    },
    /* 获取列表内容 */
    getTableList () {
      var data = {
        //状态
        status: this.status,
        keyword: this.searchValue,
        sort: this.sort,
        order: this.order,
        comment_id: this.comment_id,
        //页码
        page: this.curPage,
        page_size: this.pagesize,
      };
      this.api.community.onlyCommunity(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 搜索 */
    searchDatas () {
      this.curPage = 1;
      this.getTableList();
    },
    /* 选择表的行 */
    selectItem (val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.comment_id);
        this.nameArr.push(item.comment_id);
      });
    },
    // 批量删除
    batcDdelFun (n, i) {
      // console.log("1111", this.multipleSelection);
      if (this.multipleSelection != "") {
        this.passFun(this.multipleSelection, n, i);
      } else {
        this.$message({
          message: "请先勾选要审核的数据",
          type: "warning",
        });
      }
    },
    // 单个删除
    oneDel (id, n) {
      this.delFun(id, n);
    },
    delFun (id, n) {
      var data = {};
      if (n == 1) {
        data = {
          comment_id: id,
        };
      } else {
        data = {
          comment_id: [id],
        };
      }
      this.api.community.delHandles(data).then((res) => {
        this.$message({
          message: "" + res.data.msg,
          type: "success",
        });
        this.getTableList();
      });
    },
    goback () {
      this.$router.push({
        path: "/threadlistList",
      });
    },
    /* 改变页数 */
    pageChange (page) {
      this.curPage = page;
      this.getTableList();
    },
    passFun (id, n, i) {
      var data = {};
      if (i == 0) {
        //批量操作
        data = {
          id: id,
          status: n,
        };
      } else {
        //单条操作
        data = {
          id: [id],
          status: n,
        };
      }
      this.api.community.communityAudit(data).then((res) => {
        this.$message({
          message: "" + res.data.msg,
          type: "success",
        });
        this.getTableList();
      });
    },
    toRecycle () {
      this.isPass = false
      this.NoPass = "未通过评论"
      this.order = "desc";
      this.status = "2";
      this.curPage = 1;
      this.getTableList();
    },
    toBack () {
      this.isPass = true
      this.NoPass = null;
      this.status = "3";
      this.curPage = 1;
      this.getTableList();
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = Number(val);
      this.getTableList();
    },
  },
};
</script>

<style lang="scss" scoped>
.div1 {
  font-size: 14px;
  color: #000;
  line-height: 28px;
}
.span1 {
  font-size: 14px;
  color: #666;
}
.box1,
.box2 {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 15px 15px;
  padding: 15px 15px;
}
.add-box2 {
  display: flex;
  margin-bottom: 20px;
}
.tiendiv {
  background-color: rgb(247, 246, 230);
  padding: 10px 10px 10px 10px;
}
.shanxdiv {
  margin-bottom: 10px;
  display: flex;
}
.shopSet {
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
  .so-nav {
    width: 350px;
    display: flex;
  }
  .sosuo {
    margin-left: 10px;
  }
  .so-ipt {
    border-color: #cecece;
  }
  .el-input__suffix {
    color: #000 !important;
    font-weight: bold;
  }
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
.el-button--primary {
  background-color: #000;
  border-color: #000;
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
.t01 {
  color: #48b306;
}
.t02 {
  color: #f00;
}
.page-title {
  padding-bottom: 20px;
}
::v-deep .el-dialog__title {
  font-weight: 700;
}
</style>
