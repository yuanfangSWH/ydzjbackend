<template>
  <div class="shopSet">
    <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
    <div class="add-box">
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
        style="width: 200px"
        placeholder="请输入顾客ID"
        v-model="customer_id"
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
    >
      <el-table-column prop="customer_id" label="顾客ID" width="150" />
      <el-table-column prop="nickname" label="昵称" width="200" />
      <el-table-column prop="level" label="等级" width="150" />
      <el-table-column prop="phone" label="电话" width="250" />
      <el-table-column label="头像" width="150">
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.gender == 0">未知</span>
          <span v-else-if="scope.row.gender == 1">男</span>
          <span v-else-if="scope.row.gender == 2">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="money" label="余额" width="150" />
      <el-table-column prop="frozen_money" label="冻结的金额" width="150" />
      <el-table-column prop="point" label="用户积分" width="150" />
      <el-table-column
        prop="available_point"
        label="用户可用积分"
        width="150"
      />
      <el-table-column prop="last_time" label="上次活动时间" width="150" />
      <el-table-column prop="last_ip" label="上次活动IP" width="150" />
      <el-table-column fixed="right" align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="detailData(scope.row)"
            >顾客详情</el-button
          >
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
    <!-- 顾客详情 -->
    <el-dialog title="顾客详情" :visible.sync="detailDialog" width="30%">
      <el-form label-width="150px" class="updateArea">
        <el-form-item label="顾客id">
          {{ UserGiftShop.customer_id }}
        </el-form-item>
        <el-form-item label="昵称"> {{ UserGiftShop.nickname }} </el-form-item>
        <el-form-item label="等级"> {{ UserGiftShop.level }} </el-form-item>
        <el-form-item label="头像"
          ><el-image :src="UserGiftShop.avatar"></el-image
        ></el-form-item>
        <el-form-item label="电话"> {{ UserGiftShop.phone }} </el-form-item>
        <el-form-item label="生日"> {{ UserGiftShop.birthday }} </el-form-item>
        <el-form-item label="签名"> {{ UserGiftShop.signature }} </el-form-item>
        <el-form-item label="性别">
          <span v-if="UserGiftShop.gender == 0">未知</span>
          <span v-else-if="UserGiftShop.gender == 1">男</span>
          <span v-else-if="UserGiftShop.gender == 2">女</span>
        </el-form-item>
        <el-form-item label="微信移动应用OPENID">
          {{ UserGiftShop.app_openid }}
        </el-form-item>
        <el-form-item label="微信网站应用OPENID">
          {{ UserGiftShop.web_openid }}
        </el-form-item>
        <el-form-item label="微信公众号OPENID">
          {{ UserGiftShop.biz_openid }}
        </el-form-item>
        <el-form-item label="微信小程序OPENID">
          {{ UserGiftShop.weapp_openid }}
        </el-form-item>
        <el-form-item label="微信开放平台UNIONID">
          {{ UserGiftShop.unionid }}
        </el-form-item>
        <el-form-item label="国家"> {{ UserGiftShop.country }} </el-form-item>
        <el-form-item label="省份"> {{ UserGiftShop.province }} </el-form-item>
        <el-form-item label="城市"> {{ UserGiftShop.city }} </el-form-item>
        <el-form-item label="地区"> {{ UserGiftShop.area }} </el-form-item>
        <el-form-item label="余额"> {{ UserGiftShop.money }} </el-form-item>
        <el-form-item label="冻结的金额">
          {{ UserGiftShop.frozen_money }}
        </el-form-item>
        <el-form-item label="用户积分"> {{ UserGiftShop.point }} </el-form-item>
        <el-form-item label="用户可用积分">
          {{ UserGiftShop.available_point }}
        </el-form-item>
        <el-form-item label="注册时间">
          {{ UserGiftShop.reg_time }}
        </el-form-item>
        <el-form-item label="上次活动时间">
          {{ UserGiftShop.last_time }}
        </el-form-item>
        <el-form-item label="上次活动IP">
          {{ UserGiftShop.last_ip }}
        </el-form-item>
        <el-form-item label="验证字符串">
          {{ UserGiftShop.auth_key }}
        </el-form-item>
        <el-form-item label="最后所在经度">
          {{ UserGiftShop.longitude }}
        </el-form-item>
        <el-form-item label="最后所在纬度">
          {{ UserGiftShop.latitude }}
        </el-form-item>
        <el-form-item label="是否可见">
          <span v-if="UserGiftShop.visible == 0">隐身</span>
          <span v-else-if="UserGiftShop.visible == 1">可见</span>
        </el-form-item>
        <el-form-item label="状态">
          <span v-if="UserGiftShop.status == 0">禁用</span>
          <span v-else-if="UserGiftShop.status == 1">正常</span>
          <span v-else-if="UserGiftShop.status == 2">禁言</span>
        </el-form-item>
        <el-form-item label="注册来源">
          <span v-if="UserGiftShop.reg_source == 0">未知</span>
          <span v-else-if="UserGiftShop.reg_source == 1">APP</span>
          <span v-else-if="UserGiftShop.reg_source == 2">公众号</span>
          <span v-else-if="UserGiftShop.reg_source == 3">小程序</span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "customerList",
  data() {
    return {
      detailDialog: false,
      UserGiftShop: [],
      customer_id: "",
      //页码
      curPage: 1,
      total: 1,
      searchValue: "", //搜索的值
      tableListData: [],
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //重置
    resetData() {
      this.customer_id = "";
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
        customer_id: this.customer_id,
        //关键字
        name: this.searchValue,
        //页码
        page: this.curPage,
      };
      this.api.customer.customerData(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    /* 搜索 */
    searchDatas() {
      this.curPage = 1;
      this.getTableList();
    },
    //详情
    detailData(row) {
      this.UserGiftShop = row;
      this.detailDialog = true;
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
