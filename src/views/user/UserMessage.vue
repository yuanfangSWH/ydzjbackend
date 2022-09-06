<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <el-input
        v-show="MessageIs"
        style="margin-right: 10px; width: 200px"
        placeholder="输入用户ID"
        v-model="user_id"
      ></el-input>
      <el-select
        v-show="activeName == 'system'"
        style="margin-right: 10px"
        v-model="typeSystem"
        placeholder="请选择类型"
      >
        <el-option
          v-for="item in optionSystem"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-select
        v-show="activeName == 'order'"
        style="margin-right: 10px"
        v-model="typeOrder"
        placeholder="请选择类型"
      >
        <el-option
          v-for="item in optionOrder"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option
        >-
      </el-select>
      <el-select
        v-show="activeName == 'interact'"
        style="margin-right: 10px"
        v-model="typeInteract"
        placeholder="请选择类型"
      >
        <el-option
          v-for="item in optionInteract"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-select
        v-show="activeName == 'activity'"
        style="margin-right: 10px"
        v-model="typeActivity"
        placeholder="请选择类型"
      >
        <el-option
          v-for="item in optionActivity"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button type="primary" @click="screening">筛选</el-button>
      <el-button type="info" @click="resetData">重置</el-button>
      <el-button type="danger" @click="batchDelete">批量删除</el-button>
      <el-input
        class="searchInput"
        placeholder="请输入要搜索的内容"
        prefix-icon="el-icon-search"
        v-model="searchValue"
        @change="searchDatas"
      ></el-input>
    </div>
    <div class="shanxdiv">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="系统消息通知" name="system"></el-tab-pane>
        <el-tab-pane label="订单消息通知" name="order"></el-tab-pane>
        <el-tab-pane label="互动消息通知" name="interact"></el-tab-pane>
        <el-tab-pane label="活动消息通知" name="activity"></el-tab-pane>
      </el-tabs>
    </div>
    <div v-show="activeName == 'system'">
      <el-table
        stripe
        :data="systemData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectItem"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="全选/消息ID" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.msg_id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user_id" label="用户ID" width="100" />
        <el-table-column prop="from_user_id" label="来自用户ID" width="100" />
        <el-table-column label="类型" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">预订</span>
            <span v-else-if="scope.row.type == 2">下单</span>
            <span v-else-if="scope.row.type == 3">充值</span>
            <span v-else-if="scope.row.type == 4">团购</span>
            <span v-else-if="scope.row.type == 5">排队</span>
            <span v-else-if="scope.row.type == 6">会员卡变动</span>
            <span v-else-if="scope.row.type == 7">账单</span>
            <span v-else-if="scope.row.type == 8">用户信息变动</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="300" />
        <el-table-column prop="content" label="内容" width="400" />
        <el-table-column prop="url" label="链接" width="300" />
        <el-table-column prop="info_id" label="业务ID" width="100" />
        <el-table-column prop="create_time" label="消息时间" width="250" />
        <el-table-column label="是否已读" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.is_read == 0">否</span>
            <span v-else-if="scope.row.is_read == 1">是</span>
          </template>
        </el-table-column>
        <el-table-column align="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="openDelDialog(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="activeName == 'order'">
      <el-table
        stripe
        :data="orderData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectItem"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="全选/消息ID" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.msg_id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user_id" label="用户ID" width="100" />
        <el-table-column prop="from_user_id" label="来自用户ID" width="100" />
        <el-table-column label="类型" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">预订</span>
            <span v-else-if="scope.row.type == 2">下单</span>
            <span v-else-if="scope.row.type == 3">充值</span>
            <span v-else-if="scope.row.type == 4">团购</span>
            <span v-else-if="scope.row.type == 5">排队</span>
            <span v-else-if="scope.row.type == 6">会员卡变动</span>
            <span v-else-if="scope.row.type == 7">账单</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="300" />
        <el-table-column prop="content" label="内容" width="400" />
        <el-table-column prop="url" label="链接" width="300" />
        <el-table-column prop="order_no" label="订单号" width="100" />
        <el-table-column prop="info_id" label="业务ID" width="100" />
        <el-table-column prop="create_time" label="消息时间" width="250" />
        <el-table-column label="是否已读" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.is_read == 0">否</span>
            <span v-else-if="scope.row.is_read == 1">是</span>
          </template>
        </el-table-column>
        <el-table-column align="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="openDelDialog(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="activeName == 'interact'">
      <el-table
        stripe
        :data="interactData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectItem"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="全选/消息ID" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.msg_id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user_id" label="用户ID" width="100" />
        <el-table-column prop="from_user_id" label="来自用户ID" width="100" />
        <el-table-column label="类型" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">点赞主题</span>
            <span v-else-if="scope.row.type == 2">点赞评论</span>
            <span v-else-if="scope.row.type == 3">主题评论</span>
            <span v-else-if="scope.row.type == 4">评论回复</span>
            <span v-else-if="scope.row.type == 5">@我</span>
            <span v-else-if="scope.row.type == 6">关注</span>
            <span v-else-if="scope.row.type == 7">点赞广播</span>
            <span v-else-if="scope.row.type == 8">打招呼</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="300" />
        <el-table-column prop="content" label="内容" width="400" />
        <el-table-column prop="url" label="链接" width="300" />
        <el-table-column prop="thread_id" label="帖子ID" width="100" />
        <el-table-column prop="comment_id" label="评论ID" width="100" />
        <el-table-column prop="create_time" label="消息时间" width="250" />
        <el-table-column label="是否已读" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.is_read == 0">否</span>
            <span v-else-if="scope.row.is_read == 1">是</span>
          </template>
        </el-table-column>
        <el-table-column align="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="openDelDialog(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="activeName == 'activity'">
      <el-table
        stripe
        :data="activityData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectItem"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="全选/消息ID" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.msg_id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user_id" label="用户ID" width="100" />
        <el-table-column prop="from_user_id" label="来自用户ID" width="100" />
        <el-table-column label="类型" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">有人报名拼桌</span>
            <span v-else-if="scope.row.type == 2">拼桌报名审核通过</span>
            <span v-else-if="scope.row.type == 3">拼桌报名审核不通过</span>
            <span v-else-if="scope.row.type == 4">拼桌成功</span>
            <span v-else-if="scope.row.type == 5">拼桌取消</span>
            <span v-else-if="scope.row.type == 6">有人报名组局</span>
            <span v-else-if="scope.row.type == 7">组局审核通过</span>
            <span v-else-if="scope.row.type == 8">组局报名审核不通过</span>
            <span v-else-if="scope.row.type == 9">组局成功</span>
            <span v-else-if="scope.row.type == 10">组局取消</span>
            <span v-else-if="scope.row.type == 11">邀请报名</span>
            <span v-else-if="scope.row.type == 12">邀请组局</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="300" />
        <el-table-column prop="content" label="内容" width="400" />
        <el-table-column prop="url" label="链接" width="300" />
        <el-table-column prop="cf_id" label="拼桌ID" width="100" />
        <el-table-column prop="gp_id" label="组局ID" width="100" />
        <el-table-column prop="create_time" label="消息时间" width="250" />
        <el-table-column label="是否已读" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.is_read == 0">否</span>
            <span v-else-if="scope.row.is_read == 1">是</span>
          </template>
        </el-table-column>
        <el-table-column align="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="openDelDialog(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
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

    <!-- 删除单个内容 -->
    <el-dialog
      :title="'删除-' + deltitle"
      :visible.sync="deleteDialog"
      width="30%"
    >
      <span>确定要删除此项吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量删除 -->
    <el-dialog title="删除" :visible.sync="mutilDeleteDialog" width="50%">
      <span class="s-title">确定要删除以下内容吗?</span>
      <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
        {{ item }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mutilDeleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem('mutil')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserMessage",
  data() {
    return {
      activeName: "system",
      //用户ID
      user_id: "",
      typeSystem: "",
      optionSystem: [
        {
          id: 1,
          name: "预订",
        },
        {
          id: 2,
          name: "下单",
        },
        {
          id: 3,
          name: "充值",
        },
        {
          id: 4,
          name: "团购",
        },
        {
          id: 5,
          name: "排队",
        },
        {
          id: 6,
          name: "会员卡变动",
        },
        {
          id: 7,
          name: "账单",
        },
        {
          id: 8,
          name: "用户信息变动",
        },
      ],
      typeOrder: "",
      optionOrder: [
        {
          id: 1,
          name: "预订",
        },
        {
          id: 2,
          name: "下单",
        },
        {
          id: 3,
          name: "充值",
        },
        {
          id: 4,
          name: "团购",
        },
        {
          id: 5,
          name: "排队",
        },
        {
          id: 6,
          name: "会员卡变动",
        },
        {
          id: 7,
          name: "账单",
        },
      ],
      typeInteract: "",
      optionInteract: [
        {
          id: 1,
          name: "点赞主题",
        },
        {
          id: 2,
          name: "点赞评论",
        },
        {
          id: 3,
          name: "主题评论",
        },
        {
          id: 4,
          name: "评论回复",
        },
        {
          id: 5,
          name: "@我",
        },
        {
          id: 6,
          name: "关注",
        },
        {
          id: 7,
          name: "点赞广播",
        },
        {
          id: 8,
          name: "打招呼",
        },
      ],
      typeActivity: "",
      optionActivity: [
        {
          id: 1,
          name: "有人报名拼桌",
        },
        {
          id: 2,
          name: "拼桌报名审核通过",
        },
        {
          id: 3,
          name: "拼桌报名审核不通过",
        },
        {
          id: 4,
          name: "拼桌成功",
        },
        {
          id: 5,
          name: "拼桌取消",
        },
        {
          id: 6,
          name: "有人报名组局",
        },
        {
          id: 7,
          name: "组局审核通过",
        },
        {
          id: 8,
          name: "组局报名审核不通过",
        },
        {
          id: 9,
          name: "组局成功",
        },
        {
          id: 10,
          name: "组局取消",
        },
        {
          id: 11,
          name: "邀请报名",
        },
        {
          id: 12,
          name: "邀请组局",
        },
      ],
      //是否从用户信息进入查询
      MessageIs: true,
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      curPage: 1,
      total: 1,
      systemData: [], //系统消息通知的内容
      orderData: [], //订单消息通知的内容
      interactData: [], //互动消息通知的内容
      activityData: [], //活动消息通知的内容
      currenDeleteRow: "", //当前选中的删除行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      deltitle: "", //删除框的标题
      searchValue: "", //搜索的值
    };
  },
  created() {
    //判断是否从用户信息进入查询
    if (this.$route.query.user_id) {
      this.MessageIs = false;
      this.user_id = Number(this.$route.query.user_id);
    }
    this.systemList();
  },
  methods: {
    //重置
    resetData() {
      if (this.MessageIs) {
        this.user_id = "";
      }
      this.typeSystem = "";
      this.typeOrder = "";
      this.typeInteract = "";
      this.typeActivity = "";
      this.curPage = 1;
      this.handleClick();
    },
    //筛选
    screening() {
      this.curPage = 1;
      this.handleClick();
    },
    //TAB
    handleClick() {
      if (this.activeName == "system") {
        this.systemList();
      } else if (this.activeName == "order") {
        this.orderList();
      } else if (this.activeName == "interact") {
        this.interactList();
      } else if (this.activeName == "activity") {
        this.activityList();
      }
    },
    /* 获取系统消息通知 */
    systemList() {
      var data = {
        user_id: this.user_id,
        type: this.typeSystem,
        is_read: this.is_read,
        content: this.searchValue,
        page: this.curPage,
      };
      this.api.user.system(data).then((res) => {
        this.systemData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 获取订单消息通知 */
    orderList() {
      var data = {
        user_id: this.user_id,
        type: this.typeOrder,
        is_read: this.is_read,
        content: this.searchValue,
        page: this.curPage,
      };
      this.api.user.order(data).then((res) => {
        this.orderData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 获取互动消息通知 */
    interactList() {
      var data = {
        user_id: this.user_id,
        type: this.typeInteract,
        is_read: this.is_read,
        content: this.searchValue,
        page: this.curPage,
      };
      this.api.user.interact(data).then((res) => {
        this.interactData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 获取活动消息通知 */
    activityList() {
      var data = {
        user_id: this.user_id,
        type: this.typeActivity,
        is_read: this.is_read,
        content: this.searchValue,
        page: this.curPage,
      };
      this.api.user.activity(data).then((res) => {
        this.activityData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 搜索 */
    searchDatas() {
      this.curPage = 1;
      this.handleClick();
    },
    /* 打开批量删除框 */
    batchDelete() {
      if (this.multipleSelection != "") {
        this.mutilDeleteDialog = true;
      } else {
        this.$message({
          message: "请先勾选要删除的数据",
          type: "warning",
        });
      }
    },
    /* 打开删除框 */
    openDelDialog(data) {
      this.deltitle = data.title;
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.msg_id);
        this.nameArr.push(item.title);
      });
    },
    /* 删除选项 */
    deleteItem(type) {
      var msg_id = new Array();
      msg_id.push(this.currenDeleteRow.msg_id);
      var id = type === "one" ? msg_id : this.multipleSelection;
      var data = {
        id: id,
      };
      if (this.activeName == "system") {
        this.systemDelete(data);
      } else if (this.activeName == "order") {
        this.orderDelete(data);
      } else if (this.activeName == "interact") {
        this.interactDelete(data);
      } else if (this.activeName == "activity") {
        this.activityDelete(data);
      }
    },
    systemDelete(data) {
      this.api.user.systemDelete(data).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.handleClick();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    orderDelete(data) {
      this.api.user.systemDelete(data).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.handleClick();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    interactDelete(data) {
      this.api.user.systemDelete(data).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.handleClick();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    activityDelete(data) {
      this.api.user.systemDelete(data).then((res) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.handleClick();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    /* 改变页数 */
    pageChange(page) {
      this.curPage = page;
      this.handleClick();
    },
  },
};
</script>

<style lang="scss" scoped>
.shanxdiv {
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
