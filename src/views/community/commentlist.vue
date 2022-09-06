<template>
  <div class="shopSet">
    <div class="box1">
      <div class="page-title">{{ this._getVuex("pageTitle") }}</div>
      <div v-if="threadData">
        <div class="div1">
          主题：<span class="span1">{{ threadData.title }}</span>
        </div>
        <div class="div1">
          发布者：<span class="span1">{{ threadData.user.nickname }}</span>
        </div>
        <div class="div1">
          发布时间：<span class="span1">{{ threadData.create_time }}</span>
        </div>
      </div>
    </div>
    <div class="box2">
      <div class="add-box2">
        <div class="btn-nav">
          <el-button type="primary" @click="goback">返回</el-button>
          <el-button type="primary" @click="batcDdelFun(1)">删除</el-button>
        </div>
        <div class="so-nav">
          <el-input
            class="so-ipt"
            placeholder="请输入要搜索的内容"
            clearable
            v-model="searchValue"
            @change="searchDatas"
          >
          </el-input>
          <el-button class="sosuo" type="primary" @click="searchDatas"
            >搜索</el-button
          >
        </div>
      </div>
      <el-table
        ref="multipNum"
        stripe
        :data="tableListData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectItem"
        @sort-change="sortFilterFun"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="ID" width="100" sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.comment_id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user" label="评论用户" width="200">
          <template slot-scope="scope">
            <div
              v-if="scope.row.user"
              style="display: flex; align-items: center"
              @click="userInformation(scope.row)"
            >
              <el-image
                style="width: 30px; height: 30px; border-radius: 100%"
                fit="fill"
                :src="scope.row.user.avatar"
              ></el-image>
              <div style="flex: 1; margin-left: 5px">
                {{ scope.row.user.nickname }}（<span
                  v-if="scope.row.user.gender == 1"
                  >男</span
                ><span v-else>女</span>/{{ scope.row.user.age }}岁）
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="评论内容"
          width="200"
          sortable="custom"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.content"
              placement="bottom"
              :disabled="getShow(scope.row.content)"
            >
              <div>{{ getAgent(scope.row.content) }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="reply_count" label="回复" width="100" />
        <el-table-column prop="like_count" label="点赞" width="100" />
        <el-table-column prop="create_time" label="发布时间" />
        <el-table-column fixed="right" align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="oneDel(scope.row.comment_id, 2)"
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
    </div>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息" :visible.sync="usertx" width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
    <!-- 返回上一页 -->
    <goBack v-if="showBack"></goBack>
  </div>
</template>

<script>
export default {
  name: "commentlist",
  data() {
    return {
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
      status: "",
      statusData: [
        {
          id: 0,
          name: "删除",
        },
        {
          id: 1,
          name: "正常",
        },
        {
          id: 2,
          name: "违规",
        },
        {
          id: 3,
          name: "待审核",
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
      //帖子ID
      thread_id: "",
      //帖子主题
      titleData: "",
      threadData: "",
      usertx: false,
      sortVal: "",
      sortStatus: false,
      order: "",
    };
  },
  created() {
    // 返回上一页
    this.showBack = this.$route.query.from ? true : false;
    //
    if (this.$route.query.thread_id) {
      this.thread_id = Number(this.$route.query.thread_id);
      this.threaddetailDialog(this.thread_id);
      /* 把帖子ID数据存入VUEX */
      this.$store.dispatch("updateVuex", {
        key: "merchantsData",
        value: { thread_id: this.thread_id },
      });
    } else {
      var dpID = this.$store.state.merchantsData;
      this.thread_id = Number(dpID.thread_id);
    }
    //从VUEX获取到标题
    this.titleData = this.$store.state.title;
    this.getTableList();
  },
  methods: {
    // 内容过长，鼠标移入显示全部
    getAgent(v) {
      return v.length > 20 ? v.substring(0, 20) + " ..." : v;
    },
    getShow(v) {
      return v.length > 20 ? false : true;
    },
    //table排序
    sortMethod(val) {
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
    sortFilterFun(column) {
      this.sortMethod(column.prop);
    },
    //帖子详情
    threaddetailDialog(id) {
      var data = {
        thread_id: id,
      };
      this.api.community.threaddetail(data).then((res) => {
        this.threadData = res.data.data;
      });
    },
    //跳转回复评论列表
    commentDialog(row) {
      this.$router.push({
        path: "/commentreply",
        query: {
          thread_id: this.thread_id,
          comment_id: row.comment_id,
          cursor: row.last_reply.cursor,
        },
      });
    },
    //用户详情弹框
    userInformation(row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user_id);
      }, 0);
    },
    /* 获取列表内容 */
    getTableList() {
      var data = {
        //帖子ID
        thread_id: this.thread_id,
        //评论等级1一级2二级
        comment_level: this.comment_level,
        //用户id
        user_id: this.user_id,
        //状态
        status: this.status,
        //关键词
        keyword: this.searchValue,
        // 排序
        sort: this.sortVal,
        order: this.order,
        //页码
        page: this.curPage,
      };
      this.api.community.commentlist(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 搜索 */
    searchDatas() {
      this.curPage = 1;
      this.getTableList();
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.comment_id);
        this.nameArr.push(item.comment_id);
      });
    },
    // 批量删除
    batcDdelFun(n) {
      console.log("1111", this.multipleSelection);
      if (this.multipleSelection != "") {
        this.delFun(this.multipleSelection, n);
      } else {
        this.$message({
          message: "请先勾选要删除的数据",
          type: "warning",
        });
      }
    },
    // 单个删除
    oneDel(id, n) {
      this.delFun(id, n);
    },
    delFun(id, n) {
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
    goback() {
      this.$router.push({
        path: "/threadlistList",
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
</style>
