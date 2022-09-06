<template>
  <div class="shopSet">
    <!-- <span>name: {{ msg }}</span> -->
    <div class="topSearch">
      <div class="timeInput">
        <el-date-picker
          class="setTime"
          suffix-icon="el-icon-date"
          v-model="starTime"
          type="datetime"
          placeholder="设置开始时间"
          value-format="yyyy-MM-dd HH:mm"
          format="yyyy-MM-dd HH:mm"
        ></el-date-picker>
        <span>-</span>
        <el-date-picker
          class="setTime"
          suffix-icon="el-icon-date"
          v-model="endTime"
          type="datetime"
          placeholder="设置结束时间"
          value-format="yyyy-MM-dd HH:mm"
          format="yyyy-MM-dd HH:mm"
        ></el-date-picker>
        <el-button
          type="primary"
          @click="getSearchList('time')"
          class="searchButton form_button"
          >筛选</el-button
        >
      </div>
      <div class="switchInput">
        <el-switch
          v-model="reply_time"
          @change="getSearchList('reply')"
          active-color="#13ce66"
          inactive-color="#FFBE11"
        />只查看待回复
      </div>
      <el-input
        class="searchInput"
        placeholder="请输入评论内容或用户昵称"
        v-model="searchValue"
        clearable
      ></el-input>
      <el-button
        type="primary"
        @click="getSearchList('name')"
        class="searchButton form_button"
        >搜索</el-button
      >
    </div>

    <el-table
      ref="multipNum_type"
      :data="evaluateData"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column label="评论ID" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.eval_id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="user_name" label="用户昵称" width="150" />
      <el-table-column prop="content" label="评论内容" width="200" />
      <el-table-column prop="create_time" label="评论时间" width="150" />
      <el-table-column prop="order_no" label="订单号" width="250" />
      <el-table-column prop="reply_content" label="商家回复" width="150" />
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="detailDialog(scope.$index, scope.row)"
            >查看/回复</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="curPage"
        :hide-on-single-page="true"
        @prev-click="prePage"
        @current-change="pageChange"
        @next-click="nextPage"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
export default {
  name: "ShopSet",
  data() {
    return {
      // 商家/店铺ID
      merchants: {
        shop_id: 0,
        merchant_id: 0,
      },
      msg: "店铺评论",
      loading: false,
      curPage: 1,
      total: 0,
      searchValue: "",
      user_name: "",
      content: "", //评价内容
      reply_time: false, //是否只查看待回复（ 1：是 0：否 ）
      starTime: "",
      endTime: "",
      evaluateData: [
        {
          eval_id: "",
          user_name: "",
          content: "",
          create_time: "",
          order_no: "",
          reply_content: "",
        },
      ],
    };
  },
  created() {
    if (this.$route.query.shop_id && this.$route.query.merchant_id) {
      this.merchants.shop_id = Number(this.$route.query.shop_id);
      this.merchants.merchant_id = Number(this.$route.query.merchant_id);
      /* 把店铺商家ID数据存入VUEX */
      this.$store.dispatch("updateVuex", {
        key: "merchantsData",
        value: this.merchants,
      });
    } else {
      var dpID = this.$store.state.merchantsData;
      this.merchants.shop_id = Number(dpID.shop_id);
      this.merchants.merchant_id = Number(dpID.merchant_id);
    }
    this.getevaluateInfo(1);
  },
  methods: {
    getevaluateInfo(page) {
      this.loading = true;
      const datas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page: page,
      };
      this.$store
        .dispatch("shop/evaluateList", datas)
        .then((res) => {
          this.evaluateData = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    getSearchList(type) {
      this.loading = true;
      const timeDatas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page: this.curPage,
        start_time: this.starTime,
        end_time: this.endTime,
      };
      const nameDatas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page: this.curPage,
        input_content: this.searchValue,
      };
      const replyDatas = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        page: this.curPage,
        reply_time: this.reply_time === true ? 1 : 0,
      };

      const datas =
        type === "time" ? timeDatas : type === "name" ? nameDatas : replyDatas;
      this.$store
        .dispatch("shop/evaluateList", datas)
        .then((res) => {
          this.evaluateData = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    detailDialog(index, row) {
      this.$router.push({
        path: "/evaluateShopDetail",
        query: {
          shop_id: this.merchants.shop_id,
          merchant_id: this.merchants.merchant_id,
          evalDetailId: row.eval_id,
        },
      });
    },
    prePage() {
      this.curPage -= 1;
      this.getevaluateInfo(this.curPage);
    },
    pageChange(page) {
      this.curPage = page;
      this.getevaluateInfo(this.curPage);
    },
    nextPage() {
      this.curPage += 1;
      this.getevaluateInfo(this.curPage);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang=scss scoped>
.shopSet {
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  font-size: 20px;
  padding: 15px;
  min-height: 800px;
  background: #fff;
  margin: 20px;
  .topSearch {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 10px;
    justify-content: flex-end;
    align-items: center;
    .searchInput {
      width: 250px;
    }
    .switchInput {
      margin-right: 15px;
    }
    .searchButton {
      margin: 0 15px;
      width: 90px;
      height: 38px;
      float: right;
    }
    .searchInput {
      width: 260px;
    }
    .timeInput {
      float: right;
      .setTime {
        width: 151px;
      }
    }
  }
}
</style>
