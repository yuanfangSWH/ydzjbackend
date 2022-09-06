<template>
  <div>
    <div class="shopSet">
      <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
      <div class="add-box">
        <div style="display: flex">
          <div style="display: flex">
            <div class="rucwz2">用户</div>
            <el-input style="margin-right: 10px; width: 200px"
                      placeholder="搜索用户ID/昵称/手机号"
                      clearable
                      v-model="user_id"></el-input>
          </div>
          <div class="rucwz2">通知时间</div>
          <el-date-picker class="datePicker"
                          v-model="searchTime"
                          type="datetimerange"
                          :picker-options="pickerOptions"
                          range-separator="至"
                          start-placeholder="设置开始时间"
                          end-placeholder="设置结束时间"
                          align="right"
                          value-format="yyyy-MM-dd HH:mm"
                          format="yyyy-MM-dd HH:mm"
                          @change="dateChange"></el-date-picker>
        </div>
        <div style="display: flex; margin-top: 10px">
          <div class="rucwz2">通知类型</div>
          <el-select v-show="type == 'system'"
                     style="margin-right: 10px"
                     v-model="typeSystem"
                     placeholder="请选择通知类型">
            <el-option :label="'全部'"
                       :value="null"></el-option>
            <el-option v-for="item in optionSystem"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
          <el-select v-show="type == 'order'"
                     style="margin-right: 10px"
                     v-model="typeOrder"
                     placeholder="请选择类型">
            <el-option :label="'全部'"
                       :value="null"></el-option>
            <el-option v-for="item in optionOrder"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
          <el-select v-show="type == 'interact'"
                     style="margin-right: 10px"
                     v-model="typeInteract"
                     placeholder="请选择类型">
            <el-option :label="'全部'"
                       :value="null"></el-option>
            <el-option v-for="item in optionInteract"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
          <el-select v-show="type == 'activity'"
                     style="margin-right: 10px"
                     v-model="typeActivity"
                     placeholder="请选择类型">
            <el-option :label="'全部'"
                       :value="null"></el-option>
            <el-option v-for="item in optionActivity"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
          <el-button class="filter-btn"
                     type="primary"
                     @click="screening">筛选</el-button>
          <el-button class="filter-btn"
                     type="info"
                     @click="resetData">清空条件</el-button>
        </div>

        <!-- <el-button type="danger" @click="batchDelete">批量删除</el-button> -->
        <!-- <el-input
          class="searchInput"
          placeholder="请输入要搜索的内容"
          prefix-icon="el-icon-search"
          v-model="searchValue"
          @change="searchDatas"
        ></el-input> -->
      </div>
    </div>
    <!-- <div class="shanxdiv">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="系统消息通知" name="system"></el-tab-pane>
        <el-tab-pane label="订单消息通知" name="order"></el-tab-pane>
        <el-tab-pane label="互动消息通知" name="interact"></el-tab-pane>
        <el-tab-pane label="活动消息通知" name="activity"></el-tab-pane>
      </el-tabs>
    </div> -->
    <div class="shopSet">
      <div v-if="type == 'system'">
        <el-table stripe
                  :data="systemData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="selectItem">
          <el-table-column type="selection"
                           width="55" />
          <el-table-column label="ID"
                           width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.msg_id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="通知类型"
                           width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">预订</span>
              <span v-else-if="scope.row.type == 2">下单</span>
              <span v-else-if="scope.row.type == 3">充值</span>
              <span v-else-if="scope.row.type == 4">团购</span>
              <span v-else-if="scope.row.type == 5">排队</span>
              <span v-else-if="scope.row.type == 6">会员卡变动</span>
              <span v-else-if="scope.row.type == 7">账单</span>
              <span v-else-if="scope.row.type == 8">用户信息变动</span>
              <span v-else-if="scope.row.type == 9">提现</span>
              <span v-else-if="scope.row.type == 10">收益变动</span>
              <span v-else-if="scope.row.type == 11">举报相关</span>
            </template>
          </el-table-column>
          <el-table-column prop="title"
                           label="标题"
                           width="250" />
          <el-table-column prop="content"
                           label="内容"
                           width="300" />
          <el-table-column prop="url"
                           label="链接"
                           width="300" />
          <el-table-column prop="user"
                           label="发送到用户"
                           width="300">
            <template slot-scope="scope">
              <div class="duio muzhicss"
                   v-if="scope.row.user"
                   @click="userInformation(scope.row)">
                <el-image class="ustrimg"
                          :src="scope.row.user.avatar"
                          fit="cover"></el-image>
                <div>
                  <div class="nick-name">{{ scope.row.user.nickname }}</div>
                  <div class="bjgt">
                    ID:{{ scope.row.user.user_id }}
                    <span v-if="scope.row.user.gender == 0">未知</span>
                    <span v-if="scope.row.user.gender == 1">男</span>
                    <span v-if="scope.row.user.gender == 2">女</span>
                    / 年龄{{ scope.row.user.age }} 岁
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="create_time"
                           label="通知时间" />
          <el-table-column label="已读"
                           width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.is_read == 0">否</span>
              <span v-else-if="scope.row.is_read == 1">是</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="right" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="openDelDialog(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <div v-if="type == 'order'">
        <el-table stripe
                  :data="orderData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="selectItem">
          <el-table-column type="selection"
                           width="55" />
          <el-table-column label="ID"
                           width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.msg_id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="通知类型"
                           width="150">
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
          <el-table-column prop="title"
                           label="标题"
                           width="180" />
          <el-table-column prop="content"
                           label="内容"
                           width="400" />
          <el-table-column prop="url"
                           label="链接"
                           width="220" />
          <el-table-column prop="user"
                           label="发送到用户"
                           width="250">
            <template slot-scope="scope">
              <div class="duio muzhicss"
                   @click="userInformation(scope.row)">
                <el-image class="ustrimg"
                          :src="scope.row.user.avatar"
                          fit="cover"></el-image>
                <div>
                  <div class="nick-name">{{ scope.row.user.nickname }}</div>
                  <div class="bjgt">
                    ID:{{ scope.row.user.user_id }}
                    <span v-if="scope.row.user.gender == 0">未知</span>
                    <span v-if="scope.row.user.gender == 1">男</span>
                    <span v-if="scope.row.user.gender == 2">女</span>
                    / 年龄{{ scope.row.user.age }} 岁
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="order_no"
                           label="订单号"
                           width="180" />
          <el-table-column prop="create_time"
                           label="通知时间" />
          <el-table-column label="已读"
                           width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.is_read == 0">否</span>
              <span v-else-if="scope.row.is_read == 1">是</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="right" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="openDelDialog(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <div v-if="type == 'interact'">
        <el-table stripe
                  :data="interactData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="selectItem">
          <el-table-column type="selection"
                           width="55" />
          <el-table-column label="ID"
                           width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.msg_id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="通知类型"
                           width="150">
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
          <el-table-column prop="title"
                           label="标题"
                           width="300" />
          <el-table-column prop="user"
                           label="发送用户"
                           width="250">
            <template slot-scope="scope">
              <div class="duio muzhicss"
                   v-if="scope.row.user"
                   @click="userInformationFromId(scope.row.user.user_id)">
                <el-image class="ustrimg"
                          :src="scope.row.user.avatar"
                          fit="cover"></el-image>
                <div>
                  <div class="nick-name">{{ scope.row.user.nickname }}</div>
                  <div class="bjgt">
                    ID:{{ scope.row.user.user_id }}
                    <span v-if="scope.row.user.gender == 0">未知</span>
                    <span v-if="scope.row.user.gender == 1">男</span>
                    <span v-if="scope.row.user.gender == 2">女</span>
                    / 年龄{{ scope.row.user.age }} 岁
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="content"
                           label="内容"
                           width="400" />
          <el-table-column prop="url"
                           label="链接"
                           width="300" />
          <el-table-column prop="user"
                           label="发送到用户"
                           width="250">
            <template slot-scope="scope">
              <div class="duio muzhicss"
                   v-if="scope.row.received_user"
                   @click="userInformation(scope.row)">
                <el-image class="ustrimg"
                          :src="scope.row.received_user.avatar"
                          fit="cover"></el-image>
                <div>
                  <div class="nick-name">
                    {{ scope.row.received_user.nickname }}
                  </div>
                  <div class="bjgt">
                    ID:{{ scope.row.received_user.user_id }}
                    <span v-if="scope.row.received_user.gender == 0">未知</span>
                    <span v-if="scope.row.received_user.gender == 1">男</span>
                    <span v-if="scope.row.received_user.gender == 2">女</span>
                    / 年龄{{ scope.row.received_user.age }} 岁
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="thread_id"
                           label="发现"
                           width="300">
            <template slot-scope="scope">
              <el-link @click="
                  jumpTo('/threadlistList/threadDetail', {
                    thread_id: scope.row.thread_id,
                  })
                "
                       v-if="scope.row.thread_id > 0"
                       type="primary">打开帖子</el-link>
              <span v-if="scope.row.thread_id == 0">没有帖子内容</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_time"
                           label="通知时间"
                           width="250" />
          <el-table-column label="已读"
                           width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.is_read == 0">否</span>
              <span v-else-if="scope.row.is_read == 1">是</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="right" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="openDelDialog(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <div v-if="type == 'activity'">
        <el-table stripe
                  :data="activityData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="selectItem">
          <el-table-column type="selection"
                           width="55" />
          <el-table-column label="ID"
                           width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.msg_id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="通知类型"
                           width="150">
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
              <span v-else-if="scope.row.type == 11">组局邀请报名</span>
              <span v-else-if="scope.row.type == 12">拼桌邀请报名</span>
              <span v-else-if="scope.row.type == 13">到场通知</span>
            </template>
          </el-table-column>
          <el-table-column prop="title"
                           label="标题"
                           width="300" />
          <el-table-column prop="content"
                           label="内容"
                           width="400" />
          <el-table-column prop="url"
                           label="链接"
                           width="300" />
          <el-table-column prop="user"
                           label="发送到用户"
                           width="250">
            <template slot-scope="scope">
              <div class="duio muzhicss"
                   v-if="scope.row.received_user"
                   @click="userInformation(scope.row)">
                <el-image class="ustrimg"
                          :src="scope.row.received_user.avatar"
                          fit="cover"></el-image>
                <div>
                  <div class="nick-name">
                    {{ scope.row.received_user.nickname }}
                  </div>
                  <div class="bjgt">
                    ID:{{ scope.row.received_user.user_id }}
                    <span v-if="scope.row.received_user.gender == 0">未知</span>
                    <span v-if="scope.row.received_user.gender == 1">男</span>
                    <span v-if="scope.row.received_user.gender == 2">女</span>
                    / 年龄{{ scope.row.received_user.age }} 岁
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop=""
                           label="活动"
                           width="200">
            <template slot-scope="scope">
              <el-link type="primary"
                       @click="jumpTo('/RaiseCrow', { cf_id: scope.row.cf_id })"
                       v-if="scope.row.cf_id > 0">跳转到拼桌 (ID:{{ scope.row.cf_id }})</el-link>
              <el-link type="primary"
                       @click="jumpTo('/GroupEetail', { gp_id: scope.row.gp_id })"
                       v-if="scope.row.gp_id > 0">跳转到组局 (ID:{{ scope.row.gp_id }})</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="create_time"
                           label="通知时间" />
          <el-table-column label="已读"
                           width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.is_read == 0">否</span>
              <span v-else-if="scope.row.is_read == 1">是</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="right" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="openDelDialog(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination ref="pagination"
                       :current-page="curPage"
                       :hide-on-single-page="true"
                       @current-change="pageChange"
                       background
                       @size-change="handlePageSizeChange"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size.sync="page_size"
                       layout="sizes,prev, pager, next,jumper"
                       :total="total"></el-pagination>
      </div>
    </div>

    <!-- 删除单个内容 -->
    <el-dialog :title="'删除-' + deltitle"
               :visible.sync="deleteDialog"
               width="30%">
      <span>确定要删除此项吗</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteItem('one')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 批量删除 -->
    <el-dialog title="删除"
               :visible.sync="mutilDeleteDialog"
               width="50%">
      <span class="s-title">确定要删除以下内容吗?</span>
      <div class="gz-name"
           v-for="(item, index) in nameArr"
           :key="index">
        {{ item }}
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="mutilDeleteDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteItem('mutil')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息"
               :visible.sync="usertx"
               width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
export default {
  name: "UserMessage",
  props: {
    type: String,
  },
  data () {
    return {
      activeName: "system",
      //用户ID
      user_id: "",
      typeSystem: "",
      //用户详情弹框
      usertx: false,
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
        {
          id: 9,
          name: "提现",
        },
        {
          id: 10,
          name: "收益变动",
        },
        {
          id: 11,
          name: "举报相关",
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
          name: "组局邀请报名",
        },
        {
          id: 12,
          name: "拼桌邀请报名",
        },
        {
          id: 13,
          name: "到场通知",
        },
      ],
      //是否从用户信息进入查询
      MessageIs: true,
      mutilDeleteDialog: false, //打开删除框
      deleteDialog: false, //打开删除框
      curPage: 1,
      total: 1,
      page_size: 10,
      systemData: [], //系统消息通知的内容
      orderData: [], //订单消息通知的内容
      interactData: [], //互动消息通知的内容
      activityData: [], //活动消息通知的内容
      currenDeleteRow: "", //当前选中的删除行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      deltitle: "", //删除框的标题
      searchValue: "", //搜索的值
      create_time_start: "",
      create_time_end: "",
      searchTime: ["", ""],
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
    //判断是否从用户信息进入查询
    if (this.$route.query.user_id) {
      this.MessageIs = false;
      this.user_id = Number(this.$route.query.user_id);
    }
    this.iniPageParam();
    this.handleClick();
  },
  methods: {
    //日期选择
    dateChange (val) {
      if (val) {
        this.create_time_start = val[0];
        this.create_time_end = val[1];
      }
    },
    //重置
    resetData () {
      this.user_id = "";
      this.typeSystem = "";
      this.typeOrder = "";
      this.typeInteract = "";
      this.typeActivity = "";
      this.create_time_start = "";
      this.create_time_end = "";
      this.searchTime = ["", ""];
      this.curPage = 1;
      this.pageChange();
    },
    //筛选
    screening () {
      this.curPage = 1;
      //this.handleClick();
      this.pageChange();
    },
    //TAB
    handleClick () {
      if (this.type == "system") {
        this.systemList();
      } else if (this.type == "order") {
        this.orderList();
      } else if (this.type == "interact") {
        this.interactList();
      } else if (this.type == "activity") {
        this.activityList();
      }
    },
    /* 获取系统消息通知 */
    systemList () {
      var data = {
        user: this.user_id,
        type: this.typeSystem,
        is_read: this.is_read,
        content: this.searchValue,
        create_time_start: this.create_time_start,
        create_time_end: this.create_time_end,
        page: this.curPage,
        page_size: this.page_size,
      };
      this.api.user.system(data).then((res) => {
        this.systemData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;

        this.$refs.pagination.internalCurrentPage = this.curPage;
      });
    },
    /* 获取订单消息通知 */
    orderList () {
      var data = {
        user: this.user_id,
        type: this.typeOrder,
        is_read: this.is_read,
        content: this.searchValue,
        create_time_start: this.create_time_start,
        create_time_end: this.create_time_end,
        page: this.curPage,
        page_size: this.page_size,
      };
      this.api.user.order(data).then((res) => {
        this.orderData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;

        this.$refs.pagination.internalCurrentPage = this.curPage;
      });
    },
    /* 获取互动消息通知 */
    interactList () {
      var data = {
        user: this.user_id,
        type: this.typeInteract,
        is_read: this.is_read,
        content: this.searchValue,
        create_time_start: this.create_time_start,
        create_time_end: this.create_time_end,
        page: this.curPage,
        page_size: this.page_size,
      };
      this.api.user.interact(data).then((res) => {
        this.interactData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;

        this.$refs.pagination.internalCurrentPage = this.curPage;
      });
    },
    /* 获取活动消息通知 */
    activityList () {
      var data = {
        user: this.user_id,
        type: this.typeActivity,
        is_read: this.is_read,
        content: this.searchValue,
        create_time_start: this.create_time_start,
        create_time_end: this.create_time_end,
        page: this.curPage,
        page_size: this.page_size,
      };
      this.api.user.activity(data).then((res) => {
        this.activityData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
        this.$refs.pagination.internalCurrentPage = this.curPage;
      });
    },
    /* 搜索 */
    searchDatas () {
      this.curPage = 1;
      //this.handleClick();
      this.pageChange();
    },
    handlePageSizeChange (v) {
      this.pageChange();
      //this.getTableList();
    },
    /* 打开批量删除框 */
    batchDelete () {
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
    openDelDialog (data) {
      this.deltitle = data.title;
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    /* 选择表的行 */
    selectItem (val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.msg_id);
        this.nameArr.push(item.title);
      });
    },
    /* 删除选项 */
    deleteItem (type) {
      var msg_id = new Array();
      msg_id.push(this.currenDeleteRow.msg_id);
      var id = type === "one" ? msg_id : this.multipleSelection;
      var data = {
        id: id,
      };
      if (this.type == "system") {
        this.systemDelete(data);
      } else if (this.type == "order") {
        this.orderDelete(data);
      } else if (this.type == "interact") {
        this.interactDelete(data);
      } else if (this.type == "activity") {
        this.activityDelete(data);
      }
    },
    systemDelete (data) {
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
    orderDelete (data) {
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
    interactDelete (data) {
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
    activityDelete (data) {
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
    pageChange (page) {
      if (page) {
        this.curPage = page;
      }
      if (!this.searchTime) {
        this.searchTime = ["", ""];
        this.create_time_start = this.searchTime[0];
        this.create_time_end = this.searchTime[1];
      }
      //this.handleClick();
      this.$router.push({
        path: "/Notification/message/" + this.type,
        query: {
          user_id: this.user_id ? encodeURIComponent(this.user_id) : "",
          create_time_start: this.create_time_start,
          create_time_end: this.create_time_end,
          type:
            this.type == "system"
              ? this.typeSystem
              : this.type == "order"
                ? this.typeOrder
                : this.type == "interact"
                  ? this.typeInteract
                  : this.type == "activity"
                    ? this.typeActivity
                    : "0",
          searchValue: this.searchValue
            ? encodeURIComponent(this.searchValue)
            : "",
          curPage: this.curPage,
          page_size: this.page_size,
        },
      });
    },
    /* 跳转到 */
    jumpTo (path, query) {
      this.$router.push({ path: path, query: query });
    },
    //打开用户信息弹出
    userInformationFromId (user_id) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(user_id);
      }, 0);
    },
    userInformation (row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user_id);
      }, 0);
    },
    iniPageParam () {
      console.info(this.type);
      this.user_id = this.$route.query.user_id
        ? decodeURIComponent(this.$route.query.user_id)
        : "";
      this.page_size = this.$route.query.page_size
        ? Number(this.$route.query.page_size)
        : 10;
      switch (this.type) {
        case "system":
          this.typeSystem = this.$route.query.type
            ? Number(this.$route.query.type)
            : null;
        case "interact":
          this.typeInteract = this.$route.query.type
            ? Number(this.$route.query.type)
            : null;
        case "order":
          this.typeOrder = this.$route.query.type
            ? Number(this.$route.query.type)
            : null;
        case "activity":
          this.typeActivity = this.$route.query.type
            ? Number(this.$route.query.type)
            : null;
      }
      this.create_time_start = this.$route.query.create_time_start;
      this.create_time_end = this.$route.query.create_time_end;
      this.searchValue = this.$route.query.searchValue
        ? decodeURIComponent(this.$route.query.searchValue)
        : "";
      this.curPage = this.$route.query.curPage
        ? Number(this.$route.query.curPage)
        : 1;

      this.searchTime[0] = this.$route.query.create_time_start
        ? this.$route.query.create_time_start
        : "";
      this.searchTime[1] = this.$route.query.create_time_end
        ? this.$route.query.create_time_end
        : "";
    },
  },
  watch: {
    $route (to, from) {
      this.iniPageParam();
      this.handleClick();
    },
  },
};
</script>

<style lang="scss" scoped>
.nick-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px;
}
.el-button--danger {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
.el-button--primary {
  color: #000;
  background-color: #fff6df !important;
  border-color: #ffbe11;
}
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
    .filter-btn {
      background-color: #f4f4f4 !important;
      border: 1px solid #cecece;
      color: #0a0a0a;
    }
    .rucwz2 {
      color: #0a0a0a;
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
}
</style>
