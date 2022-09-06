<template>
  <div class="appBox">
    <div class="page-title">{{this._getVuex('pageTitle')}}</div>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="未处理"
                   name="first"></el-tab-pane>
      <el-tab-pane label="已处理"
                   name="second"></el-tab-pane>
    </el-tabs>
    <div class="add-box">
      <div class="btn-nav"
           v-if="!isRecycle">
        <el-button v-if="status === '0'"
                   type="danger"
                   @click="moreDeleteFun(0)">处理</el-button>
        <!-- <el-button type="primary" @click="toRecycle">回收站</el-button> -->
      </div>
      <!-- <div class="btn-nav" v-else>
                <el-button type="danger" @click="moreDeleteFun(1)">还原</el-button>
                <el-button type="danger" @click="moreDeleteFun(2)">彻底删除</el-button>
                <el-button type="primary" @click="goBack">返回</el-button>
            </div> -->
      <div class="so-nav">
        <el-input class="so-ipt"
                  placeholder="反馈内容，反馈用户id、昵称、手机搜索"
                  clearable
                  v-model="soVal"
                  @change="seachFun">
        </el-input>
        <el-button class="sosuo"
                   type="primary">搜索</el-button>
      </div>
    </div>
    <div>
      <feedback-table :dataOptions="dataOptions"
                      :status="status"
                      @childrenFun="parentFun"></feedback-table>
    </div>
    <div class="pagebox">
      <el-pagination v-if="count"
                     :hide-on-single-page="value"
                     background
                     layout="prev, pager, next"
                     :total="count"
                     :current-page='page'
                     @current-change="pageChange">
      </el-pagination>
    </div>
    <!-- 删除单条 -->
    <el-dialog title="删除"
               :visible.sync="dialogVisible"
               width="30%">
      <span>确定要删除这条数据吗？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteFun">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除多个 -->
    <el-dialog title="删除"
               :visible.sync="dialogMore"
               width="30%">
      <span>确定要删除以下这数据吗？</span>
      <div style="margin-top:30px">
        <span v-for="(item,index) in nameArr"
              :key="index">{{item}}，</span>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogMore = false">取 消</el-button>
        <el-button type="primary"
                   @click="deleteFun">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息"
               :visible.sync="usertx"
               width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
  </div>
</template>

<script>
import feedbackTable from './components/feedbackTable'
export default {
  name: "buttonList",
  components: {
    feedbackTable
  },
  data () {
    return {
      soVal: '',
      dataOptions: [],
      page: 1,
      count: 0,
      value: true,
      pageSign: 0,
      filterVal: '',
      sortVal: '',
      order: '',
      id: '',
      multipleSelection: [],
      nameArr: [],
      deleteStatus: 0,
      dialogVisible: false,
      dialogMore: false,
      isRecycle: false,
      status: '0',
      usertx: false,
      activeName: 'first',
    }
  },
  created () {
    this.dataFun()
  },
  watch: {
    pageSign (newVal, oldVal) {
      this.page = 1
    }
  },
  methods: {
    //TAB
    handleClick () {
      this.page = 1
      this.soVal = ''
      if (this.activeName == "first") {
        this.status = '0';
        this.dataFun();
      } else {
        this.status = '1';
        this.dataFun();
      }
    },
    // 
    dataFun () {
      this.pageSign = 0
      let data = {
        page: this.page,
        status: this.status,
        keyword: this.soVal
      }
      this.api.appmanage.feedbackList(data).then((res) => {
        this.dataOptions = res.data.data
        this.count = res.data.count
      });
    },
    parentFun (key, value, n) {
      if (n == 1) {
        this.page = 1
        this.status = value
        if (key == 'status' && value) {
          this.filterVal = value
          this.filterGetStatusList()
        } else {
          this.dataFun()
        }
      } else if (n == 2) {
        this.sortVal = key
        this.order = value
        this.sortDataFun()
      } else if (n == 3) {//处理
        this.id = key
        this.checkFun(this.id, 'single')
      } else if (n == 4) {
        this.deleteStatus = n
        this.id = key
        this.dialogVisible = true
      } else if (n == 5) {
        this.deleteStatus = n
        this.multipleSelection = key
        this.nameArr = value
      } else if (n == 6) {
        this.deleteStatus = n
        this.huanyuanFun(key)
      } else if (n == 7) {
        this.deleteStatus = n
        this.realDeleteFun(key)
      } else if (n == 8) {
        this.userInformation(key);
      }

    },
    //用户详情弹框
    userInformation (user_id) {
      this.usertx = true;
      setTimeout(() => {
        this.$refs.userBounced.addID(user_id);
      }, 0);
    },
    checkFun (id, str) {

      let data = {}
      if (str == 'more') {
        this.dialogVisible = true
      } else {
        this.dialogMore = true
      }
    },
    // 彻底删除
    realDeleteFun (id) {
      let data = {}
      if (this.deleteStatus == 7) {
        data = {
          id: [id]
        }
      } else {
        data = {
          id: id
        }
      }
      this.api.appmanage.realDeleteButton(data).then((res) => {
        this.$message({
          message: '' + res.data.msg,
          type: 'success'
        });
        this.$router.push('/buttonList')
        this.isRecycle = true
        this.status = 0
        this.dataFun()
      });
    },
    // 还原
    huanyuanFun (id) {
      let data = {}
      if (this.deleteStatus == 6) {
        data = {
          id: [id]
        }
      } else {
        data = {
          id: id
        }
      }
      this.api.appmanage.recoveryButton(data).then((res) => {
        this.$message({
          message: '' + res.data.msg,
          type: 'success'
        });
        this.$router.push('/buttonList')
        this.isRecycle = false
        this.status = 1
        this.dataFun()
      });
    },
    //根据状态筛选
    filterGetStatusList () {
      this.pageSign = 1
      let data = { 'page': this.page, status: this.filterVal }
      this.api.appmanage.feedbackList(data).then((res) => {
        this.dataOptions = res.data.data
        this.count = res.data.count
      });
    },
    // 排序
    sortDataFun () {
      this.pageSign = 2
      let data = { page: this.page, sort: this.sortVal, order: this.order, status: this.status }
      this.api.appmanage.feedbackList(data).then((res) => {
        this.dataOptions = res.data.data
        this.count = res.data.count
      });
    },
    seachFun () {
      this.page = 1
      this.dataFun()
    },
    pageChange (val) {
      this.page = val
      if (this.pageSign == 0) {
        this.dataFun()
      } else if (this.pageSign == 1) {
        this.filterGetStatusList()
      } else if (this.pageSign == 2) {
        this.sortDataFun()
      }
    },
    moreDeleteFun (n) {
      if (this.status == 0) {//批量删除
        if (this.multipleSelection == '') {
          this.$message({
            message: '请先勾选要删除的数据',
            type: 'warning'
          });
        } else {
          this.checkFun(this.multipleSelection, 'more')
          // this.dialogMore =true
        }
      }
    },
    deleteFun () {
      let data = {}
      console.log(this.deleteStatus)
      if (this.deleteStatus == 0) {
        data = {
          id: [this.id]
        }
      } else {
        data = {
          id: this.multipleSelection
        }
      }
      this.api.appmanage.checkFeedback(data).then((res) => {
        this.dialogVisible = false
        this.dialogMore = false
        this.$message({
          message: '' + res.data.msg,
          type: 'success'
        });
        this.multipleSelection = []
        this.nameArr = []
        this.dataFun()
      });
    },
    toRecycle () {
      this.isRecycle = true
      this.status = 0
      this.dataFun()
    },
    goBack () {
      this.isRecycle = false
      this.status = 1
      this.dataFun()
    }
  }
}
</script>

<style lang="scss" scoped>
.appBox {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  margin: 15px 15px;
  padding: 15px 15px;
  .add-box {
    margin: -5px 0 10px;
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
  .pagebox {
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
  //
  .el-button--danger {
    background-color: #2e2e2e !important;
    border-color: #2e2e2e !important;
  }
  .el-button--primary {
    color: #000;
    background-color: #fff6df !important;
    border-color: #ffbe11 !important;
  }
  .appBox >>> .is-active {
    color: #000 !important;
  }
  .appBox >>> .el-button--text {
    color: #000 !important;
  }
}
</style>