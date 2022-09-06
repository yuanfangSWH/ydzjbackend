<template>
  <div class="appBox">
    <div class="page-title">{{this._getVuex('pageTitle')}}</div>
    <div class="add-box">
      <div class="btn-nav"
           v-if="!isRecycle">
        <el-button v-if="status != 0"
                   type="danger"
                   @click="moreDeleteFun(0)">批量删除</el-button>
        <el-button v-if="status == 0"
                   type="danger"
                   @click="moreDeleteFun(2)">批量处理</el-button>
        <!-- <el-button type="danger" @click="addFun()">新增</el-button> -->
        <!-- <el-button type="primary" @click="toRecycle">回收站</el-button> -->
      </div>
      <div class="btn-nav"
           v-else>
        <el-button type="danger"
                   @click="moreDeleteFun(1)">还原</el-button>
        <el-button type="primary"
                   @click="goBack">返回</el-button>
      </div>
      <div class="so-nav">
        <el-input class="so-ipt"
                  placeholder="请输入合作人姓名/电话"
                  clearable
                  v-model="soVal"
                  @change="seachFun">
        </el-input>
        <el-button class="sosuo"
                   type="primary">搜索</el-button>
      </div>
    </div>
    <div>
      <el-tabs v-model="activeName"
               type="card"
               @tab-click="handleClick">
        <el-tab-pane label="待审核"
                     name="first"></el-tab-pane>
        <el-tab-pane label="审核通过"
                     name="second"></el-tab-pane>
        <el-tab-pane label="未通过"
                     name="third"></el-tab-pane>
      </el-tabs>
      <el-table ref="multipleTable"
                :data="dataOptions"
                stripe
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column prop="apply_id"
                         label="ID"
                         width="60">
        </el-table-column>
        <el-table-column prop="name"
                         label="姓名"
                         width="180">
        </el-table-column>
        <el-table-column prop="phone"
                         label="联系电话"
                         width="180">
        </el-table-column>
        <el-table-column prop="location"
                         label="城市"
                         width="180">
        </el-table-column>
        <el-table-column prop="info"
                         label="意向"
                         width="350">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        v-if="scope.row.info"
                        effect="dark"
                        :content="scope.row.info"
                        placement="bottom"
                        :disabled="getShow(scope.row.info)">
              <div>{{ getAgent(scope.row.info) }}</div>
            </el-tooltip>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column prop="mark"
                         label="备注"
                         width="350">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        v-if="scope.row.mark"
                        effect="dark"
                        :content="scope.row.mark"
                        placement="bottom"
                        :disabled="getShow(scope.row.mark)">
              <div>{{ getAgent(scope.row.mark) }}</div>
            </el-tooltip>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time"
                         label="创建时间"
                         width="200">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         align='right'>
          <template slot-scope="scope">
            <el-button v-if="status == 0 || status == 2"
                       @click="editFun(scope.row)"
                       size="small">通过</el-button>
            <el-button v-if="status == 0"
                       @click="refuseFun(scope.row)"
                       type="warning"
                       size="small">拒绝</el-button>
            <el-button v-if="status != 0"
                       @click="delClick(scope.row)"
                       type="danger"
                       size="small">删除</el-button>
            <el-button @click="markFun(scope.row)"
                       size="small">备注</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagebox">
        <el-pagination v-if="count"
                       :hide-on-single-page="value"
                       background
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size.sync="page_size"
                       layout="sizes,prev, pager, next,jumper"
                       @size-change="handlePageSizeChange"
                       :total="count"
                       :current-page='page'
                       @current-change="pageChange">
        </el-pagination>
      </div>
    </div>
    <!-- 新增/编辑 -->
    <el-dialog :title="aTitle"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :visible.sync="addDialogVisible"
               destroy-on-close
               width="40%">
      <div>
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm1"
                 label-width="100px"
                 class="demo-ruleForm">

          <el-form-item label="合作人名字"
                        prop="name">
            <el-input class="ipt01"
                      v-model="ruleForm.name"
                      disabled
                      placeholder="请输入合作人名字"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="合作人电话"
                        prop="phone">
            <el-input class="ipt01"
                      v-model="ruleForm.phone"
                      disabled
                      placeholder="请输入合作人电话"
                      clearable></el-input>
          </el-form-item>
          <!-- <el-form-item label="状态" prop="status">
              <el-select v-model="ruleForm.status" placeholder="请选择">
                <el-option
                  v-for="item in statusArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item> -->
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="resetForm('ruleForm1')">取 消</el-button>
        <el-button type="primary"
                   @click="submitForm('ruleForm1')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 拒绝 -->
    <el-dialog title="拒绝确认"
               :visible.sync="ResetDialog"
               width="30%">
      <span>确定要拒绝此广告的合作吗？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="ResetDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirmReset">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除单条 -->
    <el-dialog title="删除"
               :visible.sync="dialogVisible"
               width="30%">
      <span>确定要删除“{{a_name}}”这个营销吗？</span>
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
      <span>确定要删除以下数据吗？</span>
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
    <!-- 处理多个 -->
    <el-dialog title="批量处理广告合作"
               :visible.sync="batchdialogMore"
               width="30%">
      <div>
        <el-form :model="ruleForm"
                 ref="ruleForm1"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="状态"
                        prop="status">
            <el-select v-model="ruleForm.status"
                       placeholder="请选择">
              <el-option v-for="item in statusArr"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="batchdialogMore = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitForm('batch')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 备注 -->
    <el-dialog title="备注"
               :visible.sync="markDialog"
               width="30%">
      <div>
        <el-input type="textarea"
                  :autosize="{ minRows: 4, maxRows: 8}"
                  placeholder="填写备注信息"
                  v-model="mark">
        </el-input>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="markDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="markSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
import { validPhone, validIdcard } from "@/utils/validate";
export default {
  name: 'pubs',
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    const validateIdcard = (rule, value, callback) => {
      if (!validIdcard(value)) {
        callback(new Error("请输入正确的身份证号"));
      } else {
        callback();
      }
    };
    return {
      value: true,
      soVal: '',
      pageSign: 0,
      page: 1,
      status: 0,
      shop_id: '',
      dataOptions: [],
      count: 0,
      addDialogVisible: false,
      aTitle: '',
      multipleSelection: [],
      dialogMore: false,
      deleteStatus: 1,
      isRecycle: false,
      activeName: 'first',
      statusArr: [{
        value: 1,
        label: '通过'
      }, {
        value: 2,
        label: '不通过'
      }
      ],
      ruleForm: {
        name: '',
        phone: '',
        status: 1
      },
      rules: {

      },
      shopData: [],
      a_name: '',
      dialogVisible: false,
      nameArr: [],
      id: '',
      batchdialogMore: false,
      ResetDialog: false,
      mark: '',
      markDialog: false,
      page_size: 10,
    }
  },
  created () {
    this.dataFun()
    this.shopList()
  },
  methods: {
    // 内容过长，鼠标移入显示全部
    getAgent (v) {
      return v.length > 20 ? v.substring(0, 20) + " ..." : v;
    },
    getShow (v) {
      return v.length > 20 ? false : true;
    },
    // 店铺筛选
    shopList () {
      let data = {
        page_size: 10000
      }
      this.api.cooperation.shopList(data).then((res) => {
        this.shopData = res.data.data
      });
    },
    dataFun () {
      this.pageSign = 0
      let data = {
        keyword: this.soVal,
        status: this.status,
        page: this.page,
        page_size: this.page_size,
      }
      this.api.cooperation.pubsList(data).then((res) => {
        this.dataOptions = res.data.data
        this.count = res.data.count
      });
    },
    //TAB
    handleClick () {
      this.page = 1
      this.soVal = ''
      if (this.activeName == "first") {
        this.status = 0;//未处理
      } else if (this.activeName == "second") {
        this.status = 1;//通过
      } else {
        this.status = 2;//未通过
      }
      this.dataFun();
    },
    // addFun() {
    //   this.aTitle = '添加营销'
    //   this.addDialogVisible = true
    // },
    editFun (row) {
      this.aTitle = '处理广告合作'
      this.ruleForm = row
      this.addDialogVisible = true
    },
    // 编辑逻辑处理
    submitForm (str) {
      let data = {}
      if (str == 'ruleForm1') {//处理单个
        data = {
          id: [this.ruleForm.apply_id],
          status: 1
        }
      } else {//处理多个
        data = {
          id: this.multipleSelection,
          status: Number(this.ruleForm.status)
        }
      }
      this.api.cooperation.pubsHandle(data).then((res) => {
        this.$message({
          message: '' + res.data.msg,
          type: 'success'
        });
        this.resetForm()
        this.dataFun()
      });

    },
    // 重置表单
    resetForm () {
      this.addDialogVisible = false
      this.batchdialogMore = false
      this.ruleForm = {
        name: '',
        phone: '',
        status: 0
      }
    },
    refuseFun (row) {
      this.ResetDialog = true
      this.ruleForm = row
    },
    confirmReset () {
      let data = this.ruleForm
      data.status = 2
      this.api.cooperation.pubsHandle(data).then((res) => {
        this.$message({
          message: '' + res.data.msg,
          type: 'success'
        });
        this.ResetDialog = false
        this.dataFun()
      });
    },
    handleSelectionChange (val) {
      var arr = []
      this.nameArr = []
      for (var i = 0; i < val.length; i++) {
        arr.push(val[i].apply_id)
        this.nameArr.push(val[i].name)
      }
      this.multipleSelection = arr
      this.nameArr = Array.from(new Set(this.nameArr))
    },
    moreDeleteFun (n) {
      if (n == 0) {//批量删除
        if (this.multipleSelection == '') {
          this.$message({
            message: '请先勾选要删除的数据',
            type: 'warning'
          });
        } else {
          this.dialogMore = true
          this.deleteStatus = 5
        }
      } else if (n == 2) {
        if (this.multipleSelection == '') {
          this.$message({
            message: '请先勾选要处理的数据',
            type: 'warning'
          });
        } else {
          this.batchdialogMore = true//批量处理
        }
      } else {//批量还原/彻底删除
        if (this.multipleSelection == '') {
          this.$message({
            message: '请先勾选要上架的数据',
            type: 'warning'
          });
        } else {
          // this.huanyuanFun(this.multipleSelection)//还原
        }
      }
    },
    delClick (row) {
      this.dialogVisible = true
      this.deleteStatus = 4
      this.id = row.apply_id
      this.a_name = row.name
    },
    deleteFun () {
      let data = {}
      if (this.deleteStatus == 4) {
        data = {
          id: [this.id]
        }
      } else {
        data = {
          id: this.multipleSelection
        }
      }
      this.api.cooperation.pubsDelete(data).then((res) => {
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
      this.api.cooperation.pubsHandle(data).then((res) => {
        this.$message({
          message: '' + res.data.msg,
          type: 'success'
        });
        this.isRecycle = false
        this.status = 1
        this.dataFun()
        this.multipleSelection = []
      });
    },
    seachFun () {
      this.pageSign = 3
      let data = { page: this.page, keyword: this.soVal, status: this.status }
      this.api.cooperation.pubsList(data).then((res) => {
        this.dataOptions = res.data.data
        this.count = res.data.count
      });
    },
    toRecycle () {
      this.isRecycle = true
      this.is_delete = 1
      this.status = null
      this.dataFun()
    },
    goBack () {
      this.isRecycle = false
      this.status = 1
      this.is_delete = 0
      this.activeName = "first"
      this.dataFun()
    },
    markFun (row) {
      this.id = row.apply_id
      this.markDialog = true
      this.mark = row.mark
    },
    markSubmit () {
      if (this.mark != '') {
        let data = {
          apply_id: this.id,
          mark: this.mark
        }
        this.api.cooperation.pubsMark(data).then((res) => {
          this.$message({
            message: '' + res.data.msg,
            type: 'success'
          });
          this.markDialog = false
          this.dataFun()
        });
      } else {
        this.markDialog = false
      }
    },
    pageChange (val) {
      this.page = val
      this.dataFun()
    },
    handlePageSizeChange (v) {
      this.pageChange();
    },
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
  .ipt01 {
    width: 500px;
  }
  .a-box {
    display: flex;
    margin-bottom: 30px;
    font-size: 14px;
  }
  .a-s1 {
    width: 80px;
    color: #666;
  }
  .a-s2 {
    flex: 1;
    color: #000;
  }
  .a-s3 {
    width: 50%;
    background: #f2f3f4;
    border-radius: 4px;
    padding: 10px 15px;
    color: #000;
    border: 1px solid #e4e7ec;
    line-height: 24px;
  }
}
.img1 {
  width: 120px;
  height: 120px;
}
.v01 {
  position: relative;
  width: 120px;
  height: 120px;
  text-align: center;
}
.icon01 {
  font-size: 28px;
  color: #fff;
  position: absolute;
  top: 40px;
  left: 38%;
}
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.videoHeight {
  max-height: 100%;
}
.pagebox {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
</style>