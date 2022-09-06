<template>
  <div class="shopSet">
    <div v-show="switchTAB">
      <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
      <div class="shanxdiv-nav">
        <div class="liwz">
          <span class="spwz">主 题：</span
          ><span class="spwz2">{{ basisData.title }}</span>
        </div>
        <div class="liwz">
          <span class="spwz">发布者：</span
          ><span class="spwz2">{{ basisData.nickname }}</span>
        </div>
        <div class="liwz">
          <span class="spwz">店 铺：</span
          ><span class="spwz2">{{ basisData.name }}</span>
        </div>
      </div>
      <div class="shanxdiv_bg">
        <div class="shanxdiv">
          <div class="shiheyf">报名者</div>
          <el-input
            style="width: 350px; margin-right: 10px"
            placeholder="搜索报名者ID/昵称"
            v-model="user"
          ></el-input>
          <div class="shiheyf">报名时间</div>
          <el-date-picker
            v-model="enroll_time_start"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
          >
          </el-date-picker>
          <div class="rucwz">-</div>
          <el-date-picker
            v-model="enroll_time_end"
            type="datetime"
            placeholder="选择结束时间"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
          >
          </el-date-picker>
        </div>
        <div class="shanxdiv">
          <div class="shiheyf">取消时间</div>
          <el-date-picker
            v-model="cancel_time_start"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
          >
          </el-date-picker>
          <div class="rucwz">-</div>
          <el-date-picker
            v-model="cancel_time_end"
            type="datetime"
            placeholder="选择结束时间"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
          >
          </el-date-picker>
          <div class="shiheyf">状态</div>
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
          <el-button class="sosuo" type="primary" @click="screening"
            >筛选</el-button
          >
          <el-button class="sosuo" type="info" @click="resetData"
            >清空条件</el-button
          >
          <!-- <el-button type="danger" @click="batchDelete">批量T除</el-button> -->
        </div>
      </div>

      <el-table
        ref="multipNum"
        stripe
        :data="tableListData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectItem"
        @sort-change="screeningData"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="ID" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.gp_enroll_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报名者" width="300">
          <template slot-scope="scope">
            <div class="duio muzhicss" @click="userInformation(scope.row)">
              <el-image
                class="ustrimg"
                v-if="scope.row.user.avatar"
                :src="scope.row.user.avatar"
                fit="cover"
              ></el-image>
              <div>
                <div class="bjgt">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="scope.row.user.nickname"
                    placement="bottom"
                    :disabled="getShow(scope.row.user.nickname)"
                  >
                    <div :title="getAgent(scope.row.user.nickname)">
                      {{ getAgent(scope.row.user.nickname) }}（<span
                        v-if="scope.row.user.gender == 0"
                        >未知</span
                      >
                      <span v-else-if="scope.row.user.gender == 1">男</span>
                      <span v-else-if="scope.row.user.gender == 2">女</span>/{{
                        scope.row.user.age
                      }}岁）
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" label="礼物" width="200">
          <template>
            {{ basisData.average_gift_num }}
          </template>
        </el-table-column>
        <el-table-column
          sortable="custom"
          prop="create_time"
          label="报名时间"
          width="200"
        />
        <el-table-column
          sortable="custom"
          prop="audit_time"
          label="审核时间"
          width="200"
        />
        <el-table-column
          sortable="custom"
          prop="out_time"
          label="取消时间"
          width="200"
        />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">已报名</span>
            <span v-else-if="scope.row.status == 2">审核通过</span>
            <span v-else-if="scope.row.status == 3">审核不过</span>
            <span v-else-if="scope.row.status == 4">自己退出</span>
            <span v-else-if="scope.row.status == 5"
              >申请到达({{ scope.row.apply_arrive_time }})</span
            >
            <span v-else-if="scope.row.status == 6">已到达</span>
            <span v-else-if="scope.row.status == 7">拒绝到场</span>
          </template>
        </el-table-column>
        <!-- <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <div class="caozdiv">
              <div class="jump1" @click="Detailed(scope.row)">查看</div>
              | 
              <div class="jump2" @click="openDelDialog(scope.row)">T除</div>
            </div>
          </template>
        </el-table-column> -->
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

      <!-- T除单个内容 -->
      <el-dialog title="T除报名者" :visible.sync="deleteDialog" width="30%">
        <span>确定要T除"{{ nicknameBM }}"吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteDialog = false">取 消</el-button>
          <el-button type="primary" @click="deleteItem('one')">确定</el-button>
        </span>
      </el-dialog>

      <!-- 批量T除 -->
      <el-dialog
        title="T除报名者"
        :visible.sync="mutilDeleteDialog"
        width="50%"
      >
        <span class="s-title">确定要T除以下人员吗?</span>
        <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
          {{ item }}
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="mutilDeleteDialog = false">取 消</el-button>
          <el-button type="primary" @click="deleteItem('mutil')"
            >确定</el-button
          >
        </span>
      </el-dialog>
      <!-- 用户详情弹框 -->
      <el-dialog title="用户信息" :visible.sync="usertx" width="70%">
        <userBounced ref="userBounced"></userBounced>
      </el-dialog>
    </div>
    <GroupDatall
      ref="GroupDatail"
      :ListData="ListData"
      :basisData="basisData"
      :userData="userData"
      v-show="!switchTAB"
      @returnY="returnY"
    ></GroupDatall>
    <!-- 返回上一页 -->
    <goBack></goBack>
  </div>
</template>

<script>
import GroupDatall from "./GroupDatall";
export default {
  name: "groupEnroll",
  components: {
    GroupDatall,
  },
  data() {
    return {
      //关闭OR恢复
      is_delete: 0,
      //切换详情
      switchTAB: true,
      //报名开始时间
      enroll_time_start: "",
      //报名结束时间
      enroll_time_end: "",
      //取消开始时间
      cancel_time_start: "",
      //取消结束时间
      cancel_time_end: "",
      //报名者id或昵称
      user: "",
      //组局ID
      gp_id: "",
      //排序
      sort: "",
      order: "",
      //状态
      status: "",
      statusData: [
        {
          id: 1,
          name: "已报名",
        },
        {
          id: 2,
          name: "审核通过",
        },
        {
          id: 3,
          name: "审核不过",
        },
        {
          id: 4,
          name: "自己退出",
        },
        {
          id: 5,
          name: "申请到达",
        },
        {
          id: 6,
          name: "已到达",
        },
      ],
      mutilDeleteDialog: false, //打开T除框
      deleteDialog: false, //打开T除框
      curPage: 1,
      total: 13,
      rulesForm: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      tableListData: [], //页面表单的内容
      currenDeleteRow: "", //当前选中的T除行
      multipleSelection: [], //批量选中
      nameArr: [], //批量选中的名称
      usertx: false,
      nicknameBM: "",
      //基础信息
      basisData: {},
      ListData: {},
      userData: {},
    };
  },
  created() {
    // var abc = this.$store.state.screeningData;
    this.basisData = this.$store.state.temporaryData;
    this.gp_id = Number(this.$route.query.gp_id);
    this.getTableList();
  },
  methods: {
    // 内容过长，鼠标移入显示全部
    getAgent(v) {
      return v.length > 10 ? v.substring(0, 10) + " ..." : v;
    },
    getShow(v) {
      return v.length > 10 ? false : true;
    },
    //用户详情弹框
    userInformation(row) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(row.user.user_id);
      }, 0);
    },
    //TAB筛选
    screeningData(column) {
      if (column.order) {
        this.sort = column.prop;
        this.order = column.order == "ascending" ? "ASC" : "DESC";
      } else {
        this.sort = "";
        this.order = "";
      }
      this.getTableList();
    },
    //详情
    Detailed(data) {
      this.userData = data.user;
      this.ListData = data;
      this.switchTAB = false;
    },
    //显示报名列表
    returnY(operationData) {
      this.switchTAB = true;
      if (operationData) {
        this.getTableList();
      }
    },
    //重置
    resetData() {
      this.user = "";
      this.status = "";
      this.sort = "";
      this.order = "";
      this.cancel_time_end = "";
      this.cancel_time_start = "";
      this.enroll_time_start = "";
      this.enroll_time_end = "";
      this.curPage = 1;
      this.getTableList();
    },
    //筛选
    screening() {
      this.curPage = 1;
      this.getTableList();
    },
    /* 获取表单内容 */
    getTableList() {
      let data = {
        enroll_time_start: this.enroll_time_start,
        enroll_time_end: this.enroll_time_end,
        cancel_time_start: this.cancel_time_start,
        cancel_time_end: this.cancel_time_end,
        user: this.user,
        gp_id: this.gp_id,
        sort: this.sort,
        order: this.order,
        status: this.status == "" ? 0 : this.status,
        page: this.curPage,
      };
      this.api.group.groupEnroll(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 打开批量T除框 */
    batchDelete() {
      if (this.multipleSelection != "") {
        this.mutilDeleteDialog = true;
      } else {
        this.$message({
          message: "请先勾选要T除的数据",
          type: "warning",
        });
      }
    },
    /* 打开T除框 */
    openDelDialog(row) {
      this.currenDeleteRow = row;
      this.nicknameBM = row.user.nickname;
      this.deleteDialog = true;
    },
    /* T除选项 */
    deleteItem(type) {
      var id = [];
      if (type == "one") {
        id[0] = this.currenDeleteRow.gp_enroll_id;
      } else if (type == "mutil") {
        id = this.multipleSelection;
      }
      var data = {
        id: id,
      };
      this.api.group.EnrollDelete(data).then((res) => {
        this.getTableList();
        this.mutilDeleteDialog = false;
        this.deleteDialog = false;
      });
    },
    /* 选择表的行 */
    selectItem(val) {
      this.multipleSelection = [];
      this.nameArr = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.gp_enroll_id);
        this.nameArr.push(item.user.nickname);
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
.shanxdiv-nav {
  margin: 10px 0 0;
  line-height: 28px;
  font-size: 15px;
  .liwz {
    display: flex;
  }
  .spwz {
    margin-right: 8px;
    width: 60px;
    text-align: right;
  }
  .spwz2 {
    flex: 1;
  }
}
.sosuo {
  margin-left: 10px;
  float: left;
  background-color: #0a0a0a !important;
  border: 1px solid #0a0a0a;
  color: #ffffff;
  width: 90px;
}
.shanxdiv_bg {
  margin: 20px 0;
  background: #f8f8f8;
  border: 1px solid #e6e6e6;
  padding: 20px 0 10px;
}
.muzhicss {
  display: flex;
  align-items: center;
  .ustrimg {
    height: 34px;
    width: 34px;
    border-radius: 100%;
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
    height: 40px;
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
