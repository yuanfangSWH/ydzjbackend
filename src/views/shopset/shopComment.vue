<template>
  <div class="shopSet">
    <div class="box2">
      <div class="page-title">
        {{ this.NoPass ? this.NoPass : this._getVuex("pageTitle") }}
      </div>
      <shop-comment-filter
        :keyword="searchValue"
        @filtrateFun="filterPrantFun"
      ></shop-comment-filter>
      <div class="add-box2">
        <div class="btn-nav" v-if="isPass">
          <el-button v-if="status == 3" type="danger" @click="batcDdelFun(1, 0)"
            >批量通过</el-button
          >
          <el-button type="danger" @click="batcDdelFun(0, 0)"
            >批量删除</el-button
          >
          <!-- <el-button type="primary"
                     @click="toRecycle">查看不通过</el-button> -->
        </div>
        <div v-else class="btn-nav">
          <el-button type="danger" @click="batcDdelFun(1, 0)">通过</el-button>
          <el-button type="primary" @click="toBack">返回</el-button>
        </div>
        <!-- <div class="so-nav">
          <el-input class="so-ipt"
                    placeholder="请输入内容/用户ID/手机号"
                    clearable
                    v-model="searchValue"
                    @change="searchDatas">
          </el-input>
          <el-button class="sosuo"
                     type="danger"
                     @click="searchDatas">搜索</el-button>
        </div> -->
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
            <span>{{ scope.row.eval_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="发布时间"
          sortable="custom"
        />
        <el-table-column prop="user" label="用户信息" width="200">
          <template slot-scope="scope">
            <div
              v-if="scope.row.user_info"
              style="display: flex; align-items: center"
              @click="userInformation(scope.row)"
            >
              <el-image
                style="width: 30px; height: 30px; border-radius: 100%"
                fit="fill"
                :src="scope.row.user_info.avatar"
              ></el-image>
              <div style="flex: 1; margin-left: 5px">
                {{ scope.row.user_info.nickname }}（<span
                  v-if="scope.row.user_info.gender == 1"
                  >男</span
                ><span v-else>女</span>/{{ scope.row.user_info.age }}岁）
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="评论内容" width="200">
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
        <el-table-column prop="create_time" label="评星" width="170px">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="cover" label="图片" width="400" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.album">
              <span
                v-for="(item, index) in scope.row.album"
                :key="index"
                @click="showImglist(scope.row.album, index)"
              >
                <el-image
                  fit="cover"
                  style="width: 150px; height: 150px; margin-right: 5px"
                  :src="item.path"
                ></el-image>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="shop_name" label="商家" width="120px">
          <template slot-scope="scope">
            <div @click="toShop(scope.row)" style="cursor: pointer">
              {{ scope.row.shop_name }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="status"
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
        </el-table-column> -->
        <el-table-column prop="status" label="状态" width="180" v-if="isPass">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">删除</span>
            <span v-if="scope.row.status == 1">正常</span>
            <span v-if="scope.row.status == 2">违规</span>
            <span v-if="scope.row.status == 3">待审核</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="100">
          <template slot-scope="scope">
            <div>
              <el-button
                v-if="scope.row.status == 3 || scope.row.status == 0"
                class="t01"
                size="mini"
                type="text"
                @click="openpassFun(scope.row.eval_id, 1, 1)"
                >通过</el-button
              >
              <el-button
                v-if="scope.row.status != 0"
                class="t02"
                size="mini"
                type="text"
                @click="openpassFun(scope.row.eval_id, 0, 1)"
                >删除</el-button
              >
            </div>
            <!-- <div v-if="scope.row.status == 1"
                   style="font-size:14px">
                <el-button class="t02"
                           size="mini"
                           type="text"
                           @click="delHandles(scope.row)">删除</el-button>
              </div> -->
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
        <el-pagination
          :hide-on-single-page="true"
          @size-change="handleSizeChange"
          @current-change="pageChange"
          :current-page="curPage"
          :page-sizes="[10, 20, 30]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息" :visible.sync="usertx" width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
    <!-- 返回上一页 -->
    <goBack v-if="showBack"></goBack>
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
                :src="item.path"
              ></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-dialog>
    <!-- 单条 -->
    <el-dialog
      :title="titleText"
      :visible.sync="dialogVisibleHandle"
      width="30%"
    >
      <span>确定要{{ titleText }}这条评论吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleHandle = false">取 消</el-button>
        <el-button type="primary" @click="passFun">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 批量 -->
    <el-dialog :title="titleText" :visible.sync="dialogHandleMore" width="30%">
      <div>确定要{{ titleText }}这些评论吗</div>
      <!-- <div v-for="(item, index) in nameArr" :key="index">{{item}}</div> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogHandleMore = false">取 消</el-button>
        <el-button type="primary" @click="passFun">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ShopCommentFilter from "./components/shopCommentFilter.vue";
export default {
  name: "commentlist",
  components: {
    ShopCommentFilter,
  },
  data() {
    return {
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
      status: null,
      statusData: [
        {
          value: 0,
          text: "删除",
        },
        {
          value: 1,
          text: "正常",
        },
        {
          value: 2,
          text: "违规",
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
      eval_id: "",
      //帖子主题
      titleData: "",
      threadData: "",
      usertx: false,
      sortVal: "create_time",
      sortStatus: false,
      order: "desc",
      isPass: true,
      NoPass: null,
      picData: "",
      imgIndex: 0,
      dialogVisible: false,
      ratevalue: 3.7,
      shop_id: "",
      titleText: "通过",
      dialogVisibleHandle: false,
      handleStatus: null,
      isBatch: 0,
      dialogHandleMore: false,
    };
  },
  created() {
    if (sessionStorage.getItem("shopCommetPage")) {
      this.curPage = sessionStorage.getItem("shopCommetPage");
    }
    if (this.$route.query.shop_id) {
      this.status = null;
      this.shop_id = this.$route.query.shop_id;
    }
    if (this.$route.query.eval_id) {
      this.status = null;
      this.eval_id = this.$route.query.eval_id;
    }
    // 返回上一页
    this.showBack = this.$route.query.from ? true : false;
    this.getTableList();
  },
  mounted() {},
  filters: {
    showStatusText(val) {
      const statusDatas = [
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
      ];
      return statusDatas.find((item) => item.id == val)
        ? statusDatas.find((item) => item.id == val).name
        : " ";
    },
  },
  methods: {
    delHandles(item) {
      let data = {
        comment_id: [item.comment_id],
      };
      this.api.community.delHandles(data).then((res) => {
        this.$message({
          message: "" + res.data.msg,
          type: "success",
        });
        this.getTableList();
      });
    },
    //table筛选
    filterTagTable(filters) {
      // if (!filters.status[0]) {
      //   this.status = null
      // } else {
      //   this.status = filters.status[0];
      // }
      this.status = filters.status[0];
      this.getTableList();
    },
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
      this.sortVal = column.prop;
      this.sortMethod(column.prop);
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
        //状态
        status: this.status,
        keyword: this.searchValue,
        sort: this.sortVal,
        order: this.order,
        eval_id: this.eval_id,
        start_time: this.start_time,
        end_time: this.end_time,
        shop_id: this.shop_id,
        //页码
        page: this.curPage,
        page_size: this.pagesize,
      };
      // if(data.status == null) {
      //   data.status = 3
      // }
      this.api.shop.shopEvaluateList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 搜索 */
    searchDatas() {
      this.curPage = 1;
      this.getTableList();
    },
    filterPrantFun(keyword, status, start_time, end_time) {
      this.searchValue = keyword;
      this.status = status;
      this.start_time = start_time;
      this.end_time = end_time;
      this.curPage = 1;
      this.getTableList();
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.eval_id);
        this.nameArr.push(item.content);
      });
    },
    // 批量
    batcDdelFun(n, i) {
      // console.log("1111", this.multipleSelection);
      this.handleStatus = n;
      this.isBatch = i;
      this.titleText = n ? "通过" : "删除";
      if (this.multipleSelection != "") {
        this.dialogHandleMore = true;
      } else {
        this.$message({
          message: "请先勾选要" + this.titleText + "的数据",
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
      sessionStorage.setItem("shopCommetPage", page);
    },
    openpassFun(id, n, i) {
      this.titleText = n ? "通过" : "删除";
      this.eval_id = id;
      this.handleStatus = n;
      this.isBatch = i;
      this.dialogVisibleHandle = true;
    },
    passFun() {
      var data = {};
      if (this.isBatch == 0) {
        //批量操作
        data = {
          id: this.multipleSelection,
          status: this.handleStatus,
        };
      } else {
        //单条操作
        data = {
          id: [this.eval_id],
          status: this.handleStatus,
        };
      }
      this.api.shop.evaluateHandle(data).then((res) => {
        this.$message({
          message: "" + res.data.msg,
          type: "success",
        });
        this.dialogVisibleHandle = false;
        this.dialogHandleMore = false;
        this.eval_id = ""; //与筛选的eval_id冲突，要还原，否则影响筛选。
        this.getTableList();
      });
    },
    toRecycle() {
      this.isPass = false;
      this.NoPass = "未通过评论";
      this.order = "desc";
      this.status = 0;
      this.curPage = 1;
      this.getTableList();
    },
    toBack() {
      this.isPass = true;
      this.NoPass = null;
      this.status = 2;
      this.curPage = 1;
      this.getTableList();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = Number(val);
      this.getTableList();
    },
    showImglist(row, index) {
      this.dialogVisible = true;
      this.picData = row;
      this.imgIndex = index;
    },
    toShop(row) {
      this.$router.push("/shopEdit?shop_id=" + row.shop_id + "&from=true");
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
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
</style>
