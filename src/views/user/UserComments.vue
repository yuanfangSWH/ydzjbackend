<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
      <el-button type="danger" @click="batchDelete">批量审核</el-button>

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
        class="ewmsou"
        placeholder="请输入商家id"
        v-model="merchant_id"
      ></el-input>
      <el-input
        class="ewmsou"
        placeholder="请输入店铺id"
        v-model="shop_id"
      ></el-input>
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
          <span>{{ scope.row.eval_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="shop_name" label="店铺名称" width="150" />
      <el-table-column prop="user_id" label="用户ID" width="70" />
      <el-table-column
        prop="user_unionid"
        label="用户微信unionid"
        width="200"
      />
      <el-table-column prop="user_name" label="买家名称" width="150" />
      <el-table-column prop="order_no" label="支付订单号" width="100" />
      <el-table-column prop="reserve_id" label="预订ID" width="70" />
      <el-table-column prop="shopping_id" label="下单ID" width="70" />
      <el-table-column prop="tags" label="标签ID集合" width="150" />
      <el-table-column prop="content" label="评论内容" width="300" />
      <el-table-column prop="create_time" label="评价时间" width="150" />
      <el-table-column prop="staff_id" label="员工ID" width="70" />
      <el-table-column prop="reply_content" label="回复内容" width="300" />
      <el-table-column prop="reply_time" label="回复时间" width="150" />
      <el-table-column prop="service_score" label="服务评分" width="70" />
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="changek(scope.row)">审核</el-button>
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
    <!-- 审核 -->
    <el-dialog
      :title="'审核-' + deltitle"
      :visible.sync="deleteDialog"
      width="30%"
    >
      <span>确定要审核该用户吗</span>
      <div class="xialdiv">
        <el-select v-model="stateValue" placeholder="请选择状态">
          <el-option
            v-for="item in stateData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="changeData('one')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 批量审核 -->
    <el-dialog title="批量审核以下用户" :visible.sync="changetx" width="50%">
      <div class="gz-lieb">
        <div class="gz-name" v-for="(item, index) in nameArr" :key="index">
          {{ item }}、
        </div>
      </div>
      <div class="xialdiv">
        <el-select v-model="stateValue" placeholder="请选择状态">
          <el-option
            v-for="item in stateData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changetx = false">取 消</el-button>
        <el-button type="primary" @click="changeData('mutil')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserComments",
  data() {
    return {
      //用户
      user_id: "",
      //商家
      merchant_id: "",
      //店铺
      shop_id: "",
      //页码
      curPage: 1,
      //数据总数
      total: 1,
      //是否全选
      allQL: false,
      changetx: false, //打开修改框
      tableListData: [], //列表内容
      multipleSelection: [], //批量选中ID
      nameArr: [], //批量选中的名称
      deltitle: "",
      deleteDialog: false,
      currenDeleteRow: "", //当前选中的删除行
      searchValue: "", //搜索的值
      //状态的值
      stateValue: "",
      //状态的数组
      stateData: [
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
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //重置
    resetData() {
      this.user_id = "";
      this.merchant_id = "";
      this.shop_id = "";
      this.curPage = 1;
      this.getTableList();
    },
    //筛选
    screening() {
      this.curPage = 1;
      this.getTableList();
    },
    /*, 获取表单内容 */
    getTableList() {
      var data = {
        //商家id
        merchant_id: this.merchant_id,
        //店铺id
        shop_id: this.shop_id,
        //关键字
        name: this.searchValue,
        //页码
        page: this.curPage,
        //拉取数量
        page_size: 10,
      };
      this.api.user.UserEvaluate(data).then((res) => {
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
      //批量选中ID
      this.multipleSelection = [];
      //批量选中的名称
      this.nameArr = [];
      val.forEach((item) => {
        this.multipleSelection.push(item.eval_id);
        this.nameArr.push(item.user_name);
      });
    },
    // 打开批量审核框
    batchDelete() {
      if (this.multipleSelection != "") {
        this.changetx = true;
        this.stateValue = "";
      } else {
        this.$message({
          message: "请先勾选要审核的用户",
          type: "warning",
        });
      }
    },
    // 打开审核框
    changek(data) {
      this.stateValue = "";
      this.deltitle = data.user_name;
      this.currenDeleteRow = data;
      this.deleteDialog = true;
    },
    //审核
    changeData(type) {
      if (this.stateValue != "") {
        var staff_id = new Array();
        staff_id.push(this.currenDeleteRow.eval_id);
        var id = type === "one" ? staff_id : this.multipleSelection;
        var data = {
          eval_id: id,
          status: this.stateValue,
        };
        this.api.user.EvaluateHandle(data).then((res) => {
          this.getTableList();
          this.changetx = false;
        });
      } else {
        this.$message({
          message: "请选择状态",
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
.zjiang {
  font-size: 24px;
  line-height: 36px;
  color: darkgrey;
  padding-left: 4px;
  padding-right: 4px;
}
.xialdiv {
  padding-top: 30px;
  padding-bottom: 50px;
}
.gz-lieb {
  display: flex;
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
  .ewmsou {
    float: left;
    width: 300px;
    margin-right: 10px;
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
