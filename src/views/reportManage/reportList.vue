<template>
  <div class="appBox">
    <div class="box1">
      <div class="page-title">{{ this._getVuex("pageTitle") }}</div>
      <div class="add-box"
           v-show="!this.showBack">
        <filter-item :user="user_id"
                     :type="type"
                     @filtrateFun="filtrateParent"></filter-item>
      </div>
    </div>
    <div class="box2">
      <div class="add-box2">
        <div class="btn-nav">
          <!-- <el-button type="danger" @click="moredetaileFun">删除</el-button> -->
          <el-button type="primary"
                     @click="tochuli">处理</el-button>
        </div>
        <div class="so-nav"
             v-show="!this.showBack">
          <el-input class="so-ipt"
                    placeholder="请输入举报内容"
                    clearable
                    v-model="soVal"
                    @change="seachFun">
          </el-input>
          <el-button class="sosuo"
                     type="primary"
                     @click="seachFun">搜索</el-button>
        </div>
      </div>
      <div>
        <table-item :dataOptions="dataOptions"
                    @childrenFun="parentFun"
                    @showDelBox="showDelBox"></table-item>
      </div>
      <div class="pagebox">
        <el-pagination :hide-on-single-page="value"
                       background
                       :page-sizes="[10, 20, 50, 100]"
                       layout="sizes,prev, pager, next,jumper"
                       :page-size.sync="page_size"
                       :total="count"
                       :current-page="page"
                       @size-change="handlePageSizeChange"
                       @current-change="pageChange">
        </el-pagination>
      </div>
    </div>

    <!-- 查看举报 -->
    <el-dialog title="查看举报"
               :visible.sync="dialogVisible"
               width="60%">
      <div v-if="dataItem">
        <div class="d-nav">
          <span class="d-span1">场景：</span><span class="d-span2">{{ dataItem.report.scene_desc }}</span>
        </div>
        <div class="d-nav">
          <span class="d-span1">举报者：</span>
          <div class="d-span2">
            <div v-if="dataItem.report.user"
                 style="display: flex; align-items: center">
              <el-image style="width: 30px; height: 30px; border-radius: 100%"
                        fit="fill"
                        :src="dataItem.report.user.avatar"></el-image>
              <div style="flex: 1; margin-left: 5px">
                {{ dataItem.report.user.nickname }}（<span v-if="dataItem.report.user.gender == 1">男</span><span v-else>女</span>/{{ dataItem.report.user.age }}岁）
              </div>
            </div>
          </div>
        </div>
        <div class="d-nav">
          <span class="d-span1">内容：</span>
          <div class="d-span2">
            <div>{{ dataItem.report.desc }}</div>
            <div v-if="dataItem.pic != ''">
              <span style=""
                    v-for="(item, index) in dataItem.pic"
                    :key="index">
                <el-image style="width: 76px; height: 76px; margin-right: 10px"
                          :src="item.pic_path"
                          fit="fill"
                          :preview-src-list="[item.pic_path]"></el-image>
              </span>
            </div>
          </div>
        </div>
        <div class="d-nav">
          <span class="d-span1">举报类型：</span><span class="d-span2">{{ dataItem.report.type_desc }}</span>
        </div>
        <div class="d-nav">
          <span class="d-span1">是否处理：</span>
          <span class="d-span2">
            <el-switch v-model="statueValue"
                       active-color="#ffbe11"
                       inactive-color="#d9d9d9"
                       :disabled="statueValue"
                       @change="
                auditFun(dataItem.report.report_id, dataItem.report.status)
              ">
            </el-switch>
          </span>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 用户详情弹框 -->
    <el-dialog title="用户信息"
               :visible.sync="usertx"
               width="70%">
      <userBounced ref="userBounced"></userBounced>
    </el-dialog>
    <el-dialog title="提示"
               :visible.sync="isDelItem"
               width="30%">
      <span>确定要删除该数据吗？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="isDelItem = false">取 消</el-button>
        <el-button type="primary"
                   @click="delItem">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 返回上一页 -->
    <go-back v-if="showBack"></go-back>
    <el-backtop target=".main-container"
                :bottom="showBack ? 105 : 40"></el-backtop>
  </div>
</template>

<script>
import tableItem from "./components/tableItem";
import filterItem from "./components/filterItem";
export default {
  name: "planList",
  components: {
    tableItem,
    filterItem,
  },
  data () {
    return {
      // 删除
      isDelItem: false,
      delItmeData: {},
      //返回上一页
      showBack: false,
      //用户详情弹框
      usertx: false,
      statueValue: false,
      soVal: "",
      dataOptions: [],
      page: 1,
      count: 0,
      page_size: 10,
      value: true,
      pageSign: 0,
      filterVal: "",
      sortVal: "",
      order: "",
      id: "",
      dialogVisible: false,
      dataItem: "",
      multipleSelection: [],
      nameArr: [],
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
      type: 0,
      user_id: "",
      info_id: "",
      start_time: "",
      end_time: "",
      status: "",
    };
  },
  created () {
    // 返回上一页
    this.showBack = this.$route.query.from ? true : false;
    //
    if (sessionStorage.getItem("curPage")) {
      this.page = parseInt(sessionStorage.getItem("curPage"));
    }
    if (this.$route.query.scene) {
      this.type = Number(this.$route.query.scene);
      // this.user_id = String(this.$route.query.user_id)
      this.info_id = Number(this.$route.query.thread_id);
    }
    if (this.$route.query.shop_id) {
      this.info_id = Number(this.$route.query.shop_id);
    }
    this.dataFun();
  },
  watch: {
    pageSign (newVal, oldVal) {
      this.page = 1;
    },
  },
  methods: {
    //
    showDelBox (item) {
      this.isDelItem = true;
      this.delItmeData = { ...item }
    },
    delItem () {
      this.api.report.delReport({ id: [this.delItmeData.report_id] }).then((res) => {
        console.log(res.data.code);
        if (res.data.code == 0) {
          this.isDelItem = false;
          this.dataFun();
          this.$message.success('删除成功！')
        }
      });
    },
    dataFun () {
      this.pageSign = 0;
      let data = {
        page: this.page,
        page_size: 15,
        scene: this.type,
        user: this.user_id,
        status: this.status,
        start_time: this.start_time,
        end_time: this.end_time,
        info_id: this.info_id,
        page_size: this.page_size,
      };
      if (!data.scene) {
        delete data.scene;
      }
      this.api.report.reportList(data).then((res) => {
        this.dataOptions = res.data.data;
        this.count = res.data.count;
      });
    },
    parentFun (key, value, n) {
      if (n == 1) {
        if (key == "status" && value) {
          this.filterVal = value;
          this.pageSign = 1;
          let data = { page: this.page, page_size: 15, status: this.filterVal };
          this.filterGetStatusList(data);
        } else if (key == "type" && value) {
          this.filterVal = value;
          this.pageSign = 6;
          let data = { page: this.page, page_size: 15, type: this.filterVal };
          this.filterGetStatusList(data);
        } else if (key == "scene" && value) {
          this.filterVal = value;
          this.pageSign = 5;
          let data = { page: this.page, page_size: 15, scene: this.filterVal };
          this.filterGetStatusList(data);
        } else {
          this.dataFun();
        }
      } else if (n == 2) {
        this.sortVal = key;
        this.order = value;
        this.sortDataFun();
      } else if (n == 3) {
        this.auditFun(key, value);
      } else if (n == 4) {
        this.dialogVisible = true;
        this.detaileFun(key, value);
      } else if (n == 5) {
        // this.deleteStatus = n
        this.multipleSelection = key;
        this.nameArr = value;
      } else if (n == 6) {
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
    //根据状态筛选
    filterGetStatusList (data) {
      // let data = {'page': this.page,page_size:15, status: this.filterVal}
      this.api.report.reportList(data).then((res) => {
        this.dataOptions = res.data.data;
        this.count = res.data.count;
      });
    },
    //筛选
    filtrateParent (user, type, status, start_time, end_time, n) {
      if (n == 2) {
        (this.info_id = "");
      }
      this.page = 1
      this.type = type;
      this.user_id = user;
      this.start_time = start_time;
      this.end_time = end_time;
      this.status = status;
      this.dataFun();
    },
    // 排序
    sortDataFun () {
      this.pageSign = 2;
      let data = {
        page: this.page,
        page_size: 15,
        sort: this.sortVal,
        order: this.order,
      };
      this.api.report.reportList(data).then((res) => {
        this.dataOptions = res.data.data;
        this.count = res.data.count;
      });
    },
    detaileFun (id, scene) {
      let data = { report_id: id, scene: scene };
      this.api.report.reportDetail(data).then((res) => {
        this.dataItem = res.data.data;
        if (this.dataItem.report.status == 0) {
          this.statueValue = false;
        } else {
          this.statueValue = true;
        }
      });
    },
    auditFun (id, status) {
      let data = {};
      if (typeof id == "number") {
        data = { report_id: [id], status: 1 };
      } else {
        data = { report_id: id, status: 1 };
      }
      this.api.report.auditReport(data).then((res) => {
        this.$message({
          message: "" + res.data.msg,
          type: "success",
        });
        this.dataFun();
      });
    },
    // 批量处理
    tochuli () {
      if (this.multipleSelection == "") {
        this.$message({
          message: "请先勾选要操作的数据",
          type: "warning",
        });
      } else {
        this.auditFun(this.multipleSelection, "");
      }
    },
    seachFun () {
      this.pageSign = 3;
      if (this.soVal) {
        let data = { page: this.page, page_size: 15, keyword: this.soVal };
        this.api.report.reportList(data).then((res) => {
          this.dataOptions = res.data.data;
          this.count = res.data.count;
        });
      } else {
        this.dataFun();
      }
    },
    pageChange (val) {
      this.page = val;
      sessionStorage.setItem("curPage", val);
      if (this.pageSign == 0) {
        this.dataFun();
      } else if (
        this.pageSign == 1 ||
        this.pageSign == 6 ||
        this.pageSign == 5
      ) {
        this.filterGetStatusList();
      } else if (this.pageSign == 2) {
        this.sortDataFun();
      } else if (this.pageSign == 3) {
        this.seachFun();
      }
    },
    handlePageSizeChange (v) {
      this.pageChange();
    },
  },
};
</script>

<style lang="scss" scoped>
.appBox {
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
.d-nav {
  margin-top: 15px;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  .d-span1 {
    color: #999;
    width: 80px;
    text-align: right;
    margin-right: 6px;
  }
  .d-span2 {
    color: #000;
    border: 1px solid #c2c6cd;
    width: 400px;
    border-radius: 4px;
    padding: 5px 10px;
    background-color: #f8f8f8;
  }
}
.el-button--primary {
  background-color: #000;
  border-color: #000;
}
.el-icon-circle-close {
  color: #ffffff;
}
</style>