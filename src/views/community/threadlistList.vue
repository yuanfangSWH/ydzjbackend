<template>
  <div class="shopSet">
    <!-- <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div> -->
    <div class="pageTitle" v-if="status == '1,3'">动态审核</div>
    <div class="pageTitle" v-else>未通过动态列表</div>
    <div class="add-box">
      <div class="btn-nav">
        <div v-if="status == '1,3'">
          <el-button type="danger" @click="batchPass(1)">通过</el-button>
          <el-button type="danger" @click="batchPass(2)">不通过</el-button>
          <el-button type="primary" @click="toRecycle">查看不通过</el-button>
        </div>
        <div v-else>
          <el-button type="danger" @click="toBack">返回</el-button>
          <el-button type="danger" @click="batchPass(1)">通过</el-button>
          <!-- <el-button type="primary" @click="deleteFun">彻底删除</el-button> -->
        </div>
      </div>
      <div class="so-nav">
        <el-input
          class="so-ipt"
          placeholder="请输入用户ID/手机/标题/内容"
          clearable
          v-model="searchValue"
          @change="searchDatas"
        >
        </el-input>
        <el-button class="sosuo" type="danger" @click="searchDatas"
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
      @filter-change="filterTagTable"
      @sort-change="sortFilterFun"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="ID" width="100" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.thread_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="user.nickname" label="用户" width="200">
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
              <div>
                {{ scope.row.user.nickname }}（<span
                  v-if="scope.row.user.gender == 1"
                  >男</span
                ><span v-else>女</span>/{{ scope.row.user.age }}岁）
              </div>
              <div>ID：{{ scope.row.user.user_id }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="cover"
        label="图片/视频"
        width="500"
        :filter-multiple="false"
        :filters="threadTypeArr"
        filter-placement="bottom-end"
        :column-key="'cover'"
      >
        <template slot-scope="scope">
          <div
            class="videoBox"
            v-if="scope.row.video"
            @click="playFun(scope.row, scope.$index)"
          >
            <video
              :poster="scope.row.cover"
              width="150"
              height="150"
              :src="scope.row.video[0].file_url"
            ></video>
            <i class="playIcon el-icon-video-play"></i>
          </div>
          <div v-if="scope.row.album">
            <span
              v-for="(item, index) in scope.row.album"
              :key="index"
              @click="showImglist(scope.row.album_ori, index)"
            >
              <el-image
                fit="cover"
                style="width: 150px; height: 150px; margin-right: 5px"
                :src="item.album_path"
              ></el-image>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" width="200">
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
      <el-table-column
        prop="view_count"
        label="访问量"
        sortable="custom"
        width="100"
      />
      <el-table-column
        prop="comment_count"
        label="评论"
        sortable="custom"
        width="100"
      >
        <template slot-scope="scope">
          <div style="cursor: pointer" @click="commentDialog(scope.row)">
            {{ scope.row.comment_count }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="like_count"
        label="点赞"
        sortable="custom"
        width="100"
      />
      <el-table-column
        prop="share_count"
        label="分享"
        sortable="custom"
        width="100"
      />
      <el-table-column
        prop="report_count"
        label="举报"
        sortable="custom"
        width="100"
      >
        <template slot-scope="scope">
          <div style="cursor: pointer" @click="reportDialog(scope.row)">
            {{ scope.row.report_count }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="发布时间" sortable="custom" />
      <el-table-column fixed="right" align="center" label="操作" width="120">
        <template slot-scope="scope">
          <div style="margin-bottom: 10px" v-if="status == '1,3'">
            <!-- <el-button
              size="mini"
              type="text"
              @click="handleThreadDetail(scope.row.thread_id)"
              >详情</el-button
            > -->
            <div>
              <el-button
                size="mini"
                type="text"
                style="color: #41b300"
                @click="onePassAudit(scope.row.thread_id, 1)"
                >通过</el-button
              >
              <el-button
                size="mini"
                type="text"
                style="color: #f00"
                @click="onePassAudit(scope.row.thread_id, 2)"
                >不通过</el-button
              >
            </div>
            <!-- <div v-if="scope.row.status == 1">
              <span style="color: #dda100">已审核通过</span>
            </div> -->
          </div>
          <div v-else>
            <el-button
              size="mini"
              type="text"
              style="color: #41b300"
              @click="onePassAudit(scope.row.thread_id, 1)"
              >通过</el-button
            >
          </div>
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
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息" :visible.sync="usertx" width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
    <!-- 视频弹窗 -->
    <el-dialog
      v-if="videoData"
      :title="videoData.title"
      :visible.sync="dialogVisibleVideo"
      :before-close="handleClose"
      width="50%"
    >
      <div
        id="v-box"
        style="width: 80%; margin: 0 auto; display: flex; align-items: center"
      >
        <video
          :id="'videos' + videoIndex"
          class="videoHeight"
          :poster="videoData.cover"
          width="100%"
          :src="videoData.video[0].file_url"
          controls="controls"
          loop="loop"
        ></video>
      </div>
    </el-dialog>
    <el-dialog title="大图预览" :visible.sync="dialogVisible" width="50%">
      <template v-if="dialogVisible">
        <el-carousel
          :autoplay="false"
          indicator-position="none"
          arrow="always"
          height="600px"
          :initial-index="imgIndex"
        >
          <el-carousel-item v-for="(item, index) in picData" :key="index">
            <div class="imgbox">
              <el-image
                style="height: 600px; width: auto"
                fit="contain"
                :src="item"
              ></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-dialog>
    <!-- 返回上一页 -->
    <go-back v-if="showBack"></go-back>
  </div>
</template>
<script>
export default {
  name: "threadlist",
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
      //店铺信息弹框
      shopDialogTK: false,
      //信息数据
      UserGiftShop: "",
      //审核类型
      statusSH: "",
      //是否推荐
      is_recommend: "",
      //是否置顶
      is_top: "",
      //类型
      status: "1,3",
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
      //状态
      video: "",
      videoData: [
        {
          id: 0,
          name: "全部",
        },
        {
          id: 1,
          name: "视频",
        },
      ],
      //排序
      sort: "",
      sortData: [
        {
          id: 1,
          name: "浏览数",
        },
        {
          id: 2,
          name: "评论数",
        },
        {
          id: 3,
          name: "分享数",
        },
        {
          id: 4,
          name: "被举报数",
        },
        {
          id: 5,
          name: "最后回复时间",
        },
      ],
      //设置推荐
      tuijieValue: "",
      tuijieData: [
        {
          id: 0,
          name: "不推荐",
        },
        {
          id: 1,
          name: "推荐",
        },
      ],
      deleteDialog: false, //打开审核框
      mutilDeleteDialog: false, //打开批量审核框
      mutilTuijieDialog: false, //打开批量推荐框
      //页码
      curPage: 1,
      //总数
      total: 0,
      //页码2
      curPage2: 1,
      tableListData: [], //页面表单的内容
      currenDeleteRow: "", //当前选中的行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      deltitle: "", //审核框的标题
      searchValue: "", //搜索的值
      usertx: false,
      sortVal: "",
      sortStatus: false,
      order: "desc",
      threadTypeArr: [
        { text: "纯文字", value: "0" },
        { text: "图片", value: "1" },
        { text: "视频", value: "2" },
      ],
      isViedo: false,
      thread_id: "",
      dialogVisibleVideo: false,
      videoData: "",
      videoIndex: 0,
      dialogVisible: false,
      picData: [],
      imgIndex: 0,
      activeName: "first",
    };
  },
  created() {
    // 返回上一页
    this.showBack = this.$route.query.from ? true : false;
    //
    if (sessionStorage.getItem("curPage")) {
      this.curPage = parseInt(sessionStorage.getItem("curPage"));
    }
    // 存储上一页的页码// 小艳专属维护
    if (this.$route.query.page) {
      sessionStorage.setItem("pages", this.$route.query.page);
    }
    if (this.$route.query.thread_id) {
      this.thread_id = this.$route.query.thread_id;
    }
    this.getTableList();
  },
  methods: {
    playFun(row, index) {
      this.videoData = row;
      this.videoIndex = index;
      this.dialogVisibleVideo = true;
      setTimeout(() => {
        this.itemPlay(index);
      });
    },
    itemPlay(index) {
      var ele = document.getElementById(`videos${index}`);
      // ele.setAttribute("class", "videoHeight");
      var h1 = document.body.clientHeight;
      var box = document.getElementById("v-box");
      box.style.height = h1 - 400 + "px";
      ele.play();
    },
    handleClose() {
      var ele = document.getElementById(`videos${this.videoIndex}`);
      ele.pause();
      this.dialogVisibleVideo = false;
    },
    // 内容过长，鼠标移入显示全部
    getAgent(v) {
      return v.length > 20 ? v.substring(0, 20) + " ..." : v;
    },
    getShow(v) {
      return v.length > 20 ? false : true;
    },
    //table筛选
    filterTagTable(filters) {
      // console.log(filters)
      this.filterMethod(filters);
    },
    //table筛选
    filterMethod(val) {
      var key = [];
      var value = [];
      for (var i in val) {
        key.push(i);
        value.push(val[i]);
      }
      key = key.join(",");
      value = value.join(",");
      this.video = value;
      this.getTableList();
      // this.$emit('childrenFun', key, value,1)
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
      // this.$emit('childrenFun', this.sortVal, this.order,2)
    },
    //table排序
    sortFilterFun(column) {
      this.sortMethod(column.prop);
    },
    //用户详情弹框
    userInformation(row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user_id);
      }, 0);
    },
    //帖子详情
    threaddetailDialog(id) {
      var data = {
        thread_id: id,
      };
      this.api.community.threaddetail(data).then((res) => {
        this.UserGiftShop = res.data.data;
        this.threadDialogTK = true;
      });
    },
    //跳转评论列表
    commentDialog(row) {
      /* 把帖子标题数据存入VUEX */
      this.$store.dispatch("updateVuex", {
        key: "title",
        value: row.title,
      });
      this.$router.push({
        path: "/commentlist",
        query: { thread_id: row.thread_id, from: "thread" },
      });
    },
    //跳转举报列表
    reportDialog(row) {
      this.$router.push({
        path: "/reportList",
        query: { scene: 7, thread_id: row.thread_id, from: "thread" },
      });
    },
    //打开用户信息弹框
    userDialog(data) {
      this.UserGiftShop = data;
      this.userDialogTK = true;
    },
    //打开店铺信息弹框
    shopDialog(data) {
      this.UserGiftShop = data;
      this.shopDialogTK = true;
    },
    //重置
    resetData() {
      this.sort = "";
      this.video = "";
      this.status = "";
      this.curPage = 1;
      this.getTableList();
    },
    //筛选
    screening() {
      this.curPage = 1;
      this.getTableList();
    },
    /* 获取列表内容 */
    getTableList() {
      var data = {};
      if (this.status == "2") {
        data = {
          //排序
          sort: this.sortVal,
          order: this.order,
          //类型
          thread_type: this.video,
          check_status: 1,
          //状态
          status: this.status,
          //关键词
          keyword: this.searchValue,
          thread_id: this.thread_id,
          //页码
          page: this.curPage,
        };
      } else {
        data = {
          //排序
          sort: this.sortVal,
          order: this.order,
          //类型
          thread_type: this.video,
          check_status: 0,
          //状态
          status: this.status,
          //关键词
          keyword: this.searchValue,
          thread_id: this.thread_id,
          //页码
          page: this.curPage,
        };
      }
      this.api.community.threadlist(data).then((res) => {
        this.tableListData = res.data.data.thread_list;
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
        this.multipleSelection.push(item.thread_id);
        this.nameArr.push(item.title);
      });
    },
    /* 批量审核 */
    batchPass(n) {
      if (this.multipleSelection != "") {
        // this.mutilDeleteDialog = true;
        this.passAudit(this.multipleSelection, n);
      } else {
        this.$message({
          message: "请先勾选要审核的数据",
          type: "warning",
        });
      }
    },
    // 单个审核通过
    onePassAudit(thread_id, n) {
      this.passAudit([thread_id], n);
    },
    passAudit(id, n) {
      var data = {
        thread_id: id,
        status: n,
      };
      this.api.community.GiftInsert(data).then((res) => {
        this.$message({
          message: "" + res.data.msg,
          type: "success",
        });
        this.getTableList();
      });
    },

    toRecycle() {
      this.status = "2";
      this.curPage = 1;
      this.getTableList();
    },
    toBack() {
      this.status = "1,3";
      this.curPage = 1;
      this.getTableList();
    },
    //彻底删除
    deleteFun() {
      if (this.multipleSelection == "") {
        this.$message({
          message: "请先勾选要删除的数据",
          type: "warning",
        });
      } else {
        this.deleteSubFun(this.multipleSelection);
      }
    },
    //删除方法
    deleteSubFun(id) {
      let data = {};
      if (typeof id == "number") {
        data = {
          thread_id: [id],
        };
      } else {
        data = {
          thread_id: id,
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
    checkImage(url) {
      let arr = [];
      arr = url.split(".");
      if (
        arr[arr.length - 1] == "mp4" ||
        arr[arr.length - 1] == "rmvb" ||
        arr[arr.length - 1] == "avi" ||
        arr[arr.length - 1] == "ts"
      ) {
        return true;
      } else {
        return false;
      }
    },
    /* 改变页数 */
    pageChange(page) {
      this.curPage = page;
      this.getTableList();
      sessionStorage.setItem("curPage", page);
    },
    handleThreadDetail(id) {
      this.$router.push({
        path: "/threadlistList/threadDetail",
        query: { thread_id: id },
      });
    },
    showImglist(row, index) {
      this.dialogVisible = true;
      this.picData = row;
      this.imgIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.videoHeight {
  max-height: 100%;
}
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.videoBox {
  position: relative;
  .playIcon {
    font-size: 26px;
    position: absolute;
    left: 60px;
    top: 60px;
    color: #fff;
  }
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
  .el-button--danger {
    background-color: #2e2e2e !important;
    border-color: #2e2e2e !important;
  }
  .el-button--primary {
    color: #000;
    background-color: #fff6df !important;
    border-color: #ffbe11 !important;
  }
}
</style>
