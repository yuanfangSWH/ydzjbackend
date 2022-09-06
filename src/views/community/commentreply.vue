<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <el-button type="danger" @click="batchDelete">批量审核</el-button>
      <!-- <el-button type="success" @click="insertItemtk">新增</el-button> -->
      <el-input
        class="searchInput"
        placeholder="请输入要搜索的内容"
        prefix-icon="el-icon-search"
        v-model="searchValue"
        @change="searchDatas"
      ></el-input>
    </div>
    <div class="shanxdiv">
      <el-input
        style="width: 150px; margin-right: 10px"
        placeholder="用户ID"
        v-model="user_id"
      ></el-input>
      <el-select
        style="margin-right: 10px"
        v-model="comment_level"
        placeholder="评论等级"
      >
        <el-option
          v-for="item in comment_levelData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>

      <el-select
        style="margin-right: 10px"
        v-model="status"
        placeholder="请选择状态"
      >
        <el-option
          v-for="item in statusData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button type="primary" @click="screening">筛选</el-button>
      <el-button type="info" @click="resetData">重置</el-button>
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
      <el-table-column label="全选/评论ID" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.comment_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主题标题" width="300">
        {{ titleData }}
      </el-table-column>
      <el-table-column prop="user.nickname" label="用户昵称" width="200" />
      <el-table-column label="评论等级" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.comment_level == 1">一级</span>
          <span v-else-if="scope.row.comment_level == 2">二级</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="评论内容" width="400" />
      <el-table-column prop="like_count" label="喜欢数" width="150" />
      <el-table-column prop="reply_count" label="回复数" width="150" />
      <el-table-column prop="create_time" label="发布时间" width="150" />
      <el-table-column label="是否喜欢" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.is_like == 0">不喜欢</span>
          <span v-else-if="scope.row.is_like == 1">喜欢</span>
        </template>
      </el-table-column>
      <el-table-column label="是否作者" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.is_author == 0">否</span>
          <span v-else-if="scope.row.is_author == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label="是否置顶" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.is_top == 0">否</span>
          <span v-else-if="scope.row.is_top == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">删除</span>
          <span v-else-if="scope.row.status == 1">正常</span>
          <span v-else-if="scope.row.status == 2">违规</span>
          <span v-else-if="scope.row.status == 3">待审核</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="300">
        <template slot-scope="scope">
          <div style="margin-bottom: 10px">
            <el-button size="mini" @click="userDialog(scope.row.user)"
              >用户信息</el-button
            >
            <el-button
              size="mini"
              v-if="scope.row.last_reply"
              @click="threadDialog(scope.row.last_reply)"
              >帖子信息</el-button
            >
          </div>
          <div>
            <el-button size="mini" @click="openDelDialog(scope.row)"
              >审核回复</el-button
            >
            <el-button
              v-if="scope.row.last_reply"
              size="mini"
              @click="commentDialog(scope.row.last_reply)"
              >回复列表</el-button
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

    <!-- 新增内容 -->
    <el-dialog title="新增" :visible.sync="insertDialog">
      <el-form
        :model="addItem"
        ref="formName1"
        label-width="90px"
        class="updateArea"
      >
        <el-form-item label="员工名称" prop="staff_name">
          <el-input v-model="addItem.staff_name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertDialog = false">取 消</el-button>
        <el-button type="primary" @click="validation('formName1')"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 修改内容 -->
    <el-dialog
      :title="'修改-' + updateDialogTitle"
      :visible.sync="updateDialog"
    >
      <el-form
        :model="currenItem"
        ref="formName2"
        label-width="90px"
        class="updateArea"
      >
        <el-form-item label="员工名称" prop="staff_name">
          <el-input v-model="currenItem.staff_name" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="validation('formName2')"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <!-- 审核单个内容 -->
    <el-dialog
      :title="'审核-' + deltitle"
      :visible.sync="deleteDialog"
      width="30%"
    >
      <span>确定要审核此项吗</span>
      <div style="padding-top: 20px">
        <el-select v-model="statusSH" placeholder="请选择状态">
          <el-option
            v-for="item in statusData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量审核 -->
    <el-dialog title="审核" :visible.sync="mutilDeleteDialog" width="50%">
      <span class="s-title">确定要审核以下内容吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
        {{ item }}
      </div>
      <div style="padding-top: 20px">
        <el-select v-model="statusSH" placeholder="请选择状态">
          <el-option
            v-for="item in statusData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mutilDeleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem('mutil')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 用户信息弹框 -->
    <el-dialog title="" :visible.sync="userDialogTK" width="30%">
      <el-form label-width="150px" class="updateArea">
        <el-form-item label="用户id"> {{ UserGiftShop.user_id }} </el-form-item>
        <el-form-item label="昵称"> {{ UserGiftShop.nickname }} </el-form-item>
        <el-form-item label="等级"> {{ UserGiftShop.level }} </el-form-item>
        <el-form-item label="头像"
          ><el-image :src="UserGiftShop.avatar"></el-image
        ></el-form-item>
        <el-form-item label="年龄"> {{ UserGiftShop.age }} </el-form-item>
        <el-form-item label="生肖"> {{ UserGiftShop.zodiac }} </el-form-item>
        <el-form-item label="星座">
          {{ UserGiftShop.constellation }}
        </el-form-item>
        <el-form-item label="签名"> {{ UserGiftShop.signature }} </el-form-item>
        <el-form-item label="性别">
          <span v-if="UserGiftShop.gender == 0">女</span>
          <span v-else-if="UserGiftShop.gender == 1">男</span>
        </el-form-item>
        <el-form-item label="车辆"> {{ UserGiftShop.car }} </el-form-item>
        <el-form-item label="最后活动时间">
          {{ UserGiftShop.last_time }}
        </el-form-item>
        <el-form-item label="是否可见">
          <span v-if="UserGiftShop.visible == 0">隐身</span>
          <span v-else-if="UserGiftShop.visible == 1">可见</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 帖子信息弹框 -->
    <el-dialog title="" :visible.sync="threadDialogTK" width="30%">
      <el-form label-width="150px" class="updateArea">
        <el-form-item label="评论ID">
          {{ UserGiftShop.comment_id }}
        </el-form-item>
        <el-form-item label="主题ID">
          {{ UserGiftShop.thread_id }}
        </el-form-item>
        <el-form-item label="用户ID">
          {{ UserGiftShop.user_id }}
        </el-form-item>
        <el-form-item label="顶级评论id">
          {{ UserGiftShop.root_id }}
        </el-form-item>
        <el-form-item label="上级评论id">
          {{ UserGiftShop.parent_id }}
        </el-form-item>
        <el-form-item label="评论等级">
          <span v-if="UserGiftShop.comment_level == 1">一级</span>
          <span v-else-if="UserGiftShop.comment_level == 2">二级</span>
        </el-form-item>
        <el-form-item label="评论内容">
          {{ UserGiftShop.content }}
        </el-form-item>
        <el-form-item label="喜欢数">
          {{ UserGiftShop.like_count }}
        </el-form-item>
        <el-form-item label="回复数">
          {{ UserGiftShop.reply_count }}
        </el-form-item>
        <el-form-item label="是否喜欢">
          <span v-if="UserGiftShop.is_like == 0">否</span>
          <span v-else-if="UserGiftShop.is_like == 1">是</span>
        </el-form-item>
        <el-form-item label="是否作者">
          <span v-if="UserGiftShop.is_author == 0">否</span>
          <span v-else-if="UserGiftShop.is_author == 1">是</span>
        </el-form-item>
        <el-form-item label="发布时间">
          {{ UserGiftShop.create_time }}
        </el-form-item>
        <el-form-item label="是否置顶">
          <span v-if="UserGiftShop.is_top == 0">否</span>
          <span v-else-if="UserGiftShop.is_top == 1">是</span>
        </el-form-item>
      </el-form>
      <div class="tiendiv" v-if="UserGiftShop.user">
        <el-form label-width="150px" class="updateArea">
          <el-form-item label="用户id">
            {{ UserGiftShop.user.user_id }}
          </el-form-item>
          <el-form-item label="昵称">
            {{ UserGiftShop.user.nickname }}
          </el-form-item>
          <el-form-item label="等级">
            {{ UserGiftShop.user.level }}
          </el-form-item>
          <el-form-item label="头像"
            ><el-image :src="UserGiftShop.user.avatar"></el-image
          ></el-form-item>
          <el-form-item label="年龄">
            {{ UserGiftShop.user.age }}
          </el-form-item>
          <el-form-item label="生肖">
            {{ UserGiftShop.user.zodiac }}
          </el-form-item>
          <el-form-item label="星座">
            {{ UserGiftShop.user.constellation }}
          </el-form-item>
          <el-form-item label="签名">
            {{ UserGiftShop.user.signature }}
          </el-form-item>
          <el-form-item label="性别">
            <span v-if="UserGiftShop.user.gender == 0">女</span>
            <span v-else-if="UserGiftShop.user.gender == 1">男</span>
          </el-form-item>
          <el-form-item label="车辆">
            {{ UserGiftShop.user.car }}
          </el-form-item>
          <el-form-item label="最后活动时间">
            {{ UserGiftShop.user.last_time }}
          </el-form-item>
          <el-form-item label="是否可见">
            <span v-if="UserGiftShop.user.visible == 0">隐身</span>
            <span v-else-if="UserGiftShop.user.visible == 1">可见</span>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "commentlist",
  data() {
    return {
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
      //回复ID
      comment_id: "",
      //last_reply.cursor
      cursor: "",
      //帖子主题
      titleData: "",
    };
  },
  created() {
    this.thread_id = Number(this.$route.query.thread_id);
    this.comment_id = Number(this.$route.query.comment_id);
    this.cursor = Number(this.$route.query.cursor);
    //从VUEX获取到标题
    this.titleData = this.$store.state.title;
    this.getTableList();
  },
  methods: {
    //查询回复列表
    commentDialog(data) {
      this.comment_level = "";
      this.user_id = "";
      this.status = "";
      this.curPage = 1;
      this.cursor = data.cursor;
      this.getTableList();
    },
    //打开用户信息弹框
    userDialog(data) {
      this.UserGiftShop = data;
      this.userDialogTK = true;
    },
    //打开帖子信息弹框
    threadDialog(data) {
      this.UserGiftShop = data;
      this.threadDialogTK = true;
    },
    //重置
    resetData() {
      this.comment_level = "";
      this.user_id = "";
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
      var data = {
        //帖子ID
        thread_id: this.thread_id,
        //回复ID
        comment_id: this.comment_id,
        //last_reply.cursor
        cursor: this.cursor,
        //评论等级1一级2二级
        comment_level: this.comment_level,
        //用户id
        user_id: this.user_id,
        //状态
        status: this.status,
        //关键词
        keyword: this.searchValue,
        //页码
        page: this.curPage,
      };
      this.api.community.commentreply(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 搜索 */
    searchDatas() {
      this.curPage = 1;
      this.getTableList();
    },
    //统一验证方法
    validation(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          if (data == "formName1") {
            this.insertItem();
          } else {
            this.multiUpdate();
          }
        } else {
          return false;
        }
      });
    },
    //打开添加弹框
    insertItemtk() {
      this.insertDialog = true;
    },
    /* 新增保存 */
    insertItem() {
      // this.addItem.staff_commission = Number(this.addItem.staff_commission);
      // this.addItem.staff_gift_amount = Number(this.addItem.staff_gift_amount);
      // var data = this.addItem;
      // this.api.group.userInsert(data).then((res) => {
      //   this.$refs["formName1"].resetFields();
      //   this.$message({
      //     message: "添加成功",
      //     type: "success",
      //   });
      //   this.getTableList();
      //   this.insertDialog = false;
      // });
    },
    /* 打开修改窗口 */
    openUpdateDialog(row) {
      this.updateDialog = true;
      this.updateDialogTitle = row.staff_name;
    },
    /* 修改保存 */
    multiUpdate() {
      // this.currenItem.staff_commission = Number(this.addItem.staff_commission);
      // this.currenItem.staff_gift_amount = Number(
      //   this.addItem.staff_gift_amount
      // );
      // var data = this.currenItem;
      // this.api.group.userUpdate(data).then((res) => {
      //   this.$message({
      //     message: "修改成功",
      //     type: "success",
      //   });
      //   this.getTableList();
      //   this.updateDialog = false;
      // });
    },
    /* 打开批量审核框 */
    batchDelete() {
      if (this.multipleSelection != "") {
        this.mutilDeleteDialog = true;
      } else {
        this.$message({
          message: "请先勾选要审核的数据",
          type: "warning",
        });
      }
    },
    /* 打开审核框 */
    openDelDialog(data) {
      this.deltitle = data.content;
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.comment_id);
        this.nameArr.push(item.content);
      });
    },
    /* 审核 */
    deleteItem(type) {
      if (this.statusSH != "") {
        var comment_id = new Array();
        comment_id.push(this.currenDeleteRow.comment_id);
        var id = type === "one" ? comment_id : this.multipleSelection;
        var data = {
          comment_id: id,
          status: this.statusSH,
        };
        this.api.community.GiftInsert(data).then((res) => {
          this.$message({
            message: "审核成功",
            type: "success",
          });
          this.getTableList();
          this.statusSH = "";
          this.mutilDeleteDialog = false;
          this.deleteDialog = false;
        });
      } else {
        this.$message({
          message: "请选择要改变的状态",
          type: "warning",
        });
      }
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
