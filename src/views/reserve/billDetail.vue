<template>
  <div class="shopSet" v-if="!loading">
    <div class="box1">
      <div v-if="i == 1">
        <el-steps :active="stepNum" align-left :space="200">
          <el-step
            v-for="item in groupBuyOrderData.progress"
            :key="item.status"
            :title="item.status_desc"
            :description="item.status_time"
          ></el-step>
        </el-steps>
      </div>
      <div class="order-nav01">
        <div class="nav01-1" v-if="groupBuyOrderData.order_info">
          <div class="n-title">订单信息</div>
          <div>
            <div class="info-nav">
              <div>订单号码：{{groupBuyOrderData.order_info.order_no}}</div>
              <div>支付时间： {{groupBuyOrderData.order_info.pay_time}}</div>
            </div>
            <div class="info-nav">
              <div v-if="groupBuyOrderData.order_info.pay_type == 0">支付方式： 未支付</div>
              <div v-if="groupBuyOrderData.order_info.pay_type == 1">支付方式： 支付宝</div>
              <div v-if="groupBuyOrderData.order_info.pay_type == 2">支付方式： 微信</div>
              <div v-if="groupBuyOrderData.order_info.pay_type == 3">支付方式： 银行卡</div>
              <div v-if="groupBuyOrderData.order_info.pay_type == 4">支付方式： 信用卡</div>
              <div v-if="groupBuyOrderData.order_info.pay_type == 5">支付方式： 现金</div>
              <div v-if="groupBuyOrderData.order_info.pay_type == 6">支付方式： APP用户余额</div>
              <div v-if="groupBuyOrderData.order_info.pay_type == 7">支付方式： 商家签单</div>
              <div v-if="groupBuyOrderData.order_info.pay_type == 8">支付方式： 先消费后结算</div>
              <div v-if="groupBuyOrderData.order_info.pay_type == 9">支付方式： 苹果支付</div>
              <div>支付账户： {{groupBuyOrderData.order_info.order_trade_no}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box1">
      <div class="n-title">点单明细</div>
      <template>
        <el-table
          :data="groupBuyOrderData.shopping_info"
          border
          :summary-method="getSummaries"
          show-summary
          sum-text="小计"
          style="width: 100%"
        >
          <el-table-column prop="goods_name" label="商品名称"></el-table-column>
          <el-table-column label="商品图片" prop="goods_image">
            <template slot-scope="scope">
              <el-image class="shop-img" :src="scope.row.goods_image">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="价格" prop="goods_price">
            <template slot-scope="scope">￥ {{scope.row.goods_price/100}}</template>
          </el-table-column>
          <el-table-column label="规格" prop="goods_unit"></el-table-column>
          <el-table-column label="数量" prop="goods_num"></el-table-column>
        </el-table>
      </template>
    </div>
    <div class="box1" v-if="groupBuyOrderData.group_buy_info">
      <div class="gbBox">
        <div class="n-title2">已选套餐</div>
        <div class="gbName">（ 雪花8度 x12厅欢唱套餐 ）</div>
      </div>
      <template>
        <el-table
          :data="groupBuyOrderData.group_buy_info"
          border
          :summary-method="getSummaries"
          show-summary
          sum-text="小计"
          style="width: 100%"
        >
          <el-table-column prop="goods_name" label="商品名称"></el-table-column>
          <el-table-column label="规格" prop="goods_unit"></el-table-column>
          <el-table-column label="数量" prop="goods_num"></el-table-column>
          <el-table-column label="价格" prop="goods_price">
            <template slot-scope="scope">￥ {{scope.row.goods_price/100}}</template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="box1">
      <div class="n-title">预订信息</div>
      <div class="b-box">
        <span class="sub-title">线上预订</span>
        <div class>
          <el-button class="order-btn">审核通过</el-button>
          <el-button class="order-btn-2">取消预定</el-button>
        </div>
      </div>
      <div class="nav-box">
        <div class="info-nav">
          <div>到店时间：{{groupBuyOrderData.reserve.reserve_time}}</div>
          <div>给商家留言：{{groupBuyOrderData.reserve.remark}}</div>
        </div>
        <div class="info-nav">
          <div>
            姓 名：{{groupBuyOrderData.reserve.name}}
            <span>
              <i class="el-icon-edit"></i>
            </span>
          </div>
          <div>
            手 机：{{groupBuyOrderData.reserve.phone}}
            <span>
              <i class="el-icon-edit"></i>
            </span>
          </div>
        </div>
        <div class="info-nav">
          <div>下单时间： {{groupBuyOrderData.reserve.reserve_time}}</div>
          <div>送达位置： {{groupBuyOrderData.reserve.place_name}}</div>
        </div>
        <div class="info-nav">
          <div>
            备 注：等待后台添加
            <span>
              <i class="el-icon-edit"></i>
            </span>
          </div>
          <div>操 作 人：{{groupBuyOrderData.reserve.staff_name}}</div>
        </div>
      </div>
      <div class="n-title">预定座位</div>
      <template>
        <el-table
          :data="placeArr"
          border
          :summary-method="getSumPlace"
          show-summary
          sum-text="小计"
          style="width: 100%"
        >
          <el-table-column prop="place_name" label="桌号"></el-table-column>
          <el-table-column label="类型" prop="place_type_name"></el-table-column>
          <el-table-column label="低消" prop="basic_price">
            <template slot-scope="scope">￥ {{scope.row.basic_price/100}}</template>
          </el-table-column>
          <el-table-column label="预定金额" prop="total_deposit">
            <template slot-scope="scope">￥ {{scope.row.total_deposit/100}}</template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="box1">
      <div class="heji">
        <div class="jine-t">总金额</div>
        <div class="jin-e">￥{{totalPrice}}</div>
      </div>
    </div>
    <div class="box1" v-if="groupBuyOrderData.evaluate">
      <div class="box2">
        <div class="pl-box1">
          <div class="n-title">用户评论</div>
          <div class="left-box">
            <div class="pl-1-nav1">
              <el-image class="tx-img" :src="groupBuyOrderData.evaluate.user_avatar">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <div class="i-box">
                <div class="info-box">
                  <i v-if="groupBuyOrderData.reserve.gender == 1" class="el-icon-male sex-i2"></i>
                  <i v-else class="el-icon-female sex-i"></i>
                  <span class="s1">{{groupBuyOrderData.evaluate.user_name}}</span>
                  <span>
                    <el-rate v-model="value" disabled text-color="#ff9900"></el-rate>
                  </span>
                </div>
                <div class="pl-con">{{groupBuyOrderData.evaluate.content}}</div>
              </div>
              <div class="info-time">
                <i class="el-icon-time"></i>
                {{groupBuyOrderData.evaluate.create_time}}
              </div>
            </div>
            <div class="imgbox" v-if="groupBuyOrderData.evaluate.has_image">
              <el-image
                class="imglist"
                style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList"
              ></el-image>
            </div>
          </div>
        </div>
        <div class="pl-box2">
          <div class="n-title">商家回复</div>
          <div class="right-box">
            <el-input type="textarea" :rows="2" placeholder="请输入回复内容..." v-model="textarea"></el-input>
          </div>
        </div>
      </div>
      <div class="tj-box">
        <el-button class="tijiao">提交回复</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "billDetail",
  components: {},
  data() {
    return {
      // steptArr:[
      //     {'title':'提交订单', 'description':''},
      //     {'title':'代付款', 'description':''},
      //     {'title':'已预订', 'description':''},
      //     {'title':'提交订单', 'description':''}
      // ],
      tableData: [],
      value: 3.7,
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
      textarea: "",
      loading: false,
      groupBuyOrderData: {},
      i: "",
      bill_id: "",
      reserve_time: "",
      stepNum: 0,
      placeArr: [],
      diandan: 0,
      yuding: 0,
      totalPrice: 0,
      // 商家/店铺ID
      merchants: {
        shop_id: Number,
        merchant_id: Number,
      },
    };
  },
  created() {
    this.merchants.shop_id = Number(this.$route.query.shop_id);
    this.merchants.merchant_id = Number(this.$route.query.merchant_id);
    this.bill_id = this.$route.query.bill_id;
    if (this.bill_id) {
      this.billDetaile();
    }
  },
  methods: {
    //预定订单详情
    billDetaile() {
      this.loading = true;
      let data = {
        merchant_id: this.merchants.merchant_id,
        shop_id: this.merchants.shop_id,
        bill_id: this.bill_id,
      };
      this.api.reserve.getBillDetail(data).then((res) => {
        this.loading = false;
        this.groupBuyOrderData = res.data.data;
      });
    },
    getSum(total, num) {
      return total + num;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "小计";
          return;
        }
        let arr = [];
        let jishu = 0;
        const values = data.map((item) => {
          jishu = (item.goods_num * item.goods_price) / 100;
          arr.push(jishu);
        });
        this.diandan = arr.reduce(this.getSum); //小计
        if (index === 2 || index === 3) {
          sums[index] = "";
        } else if (index === 4) {
          sums[index] = this.diandan + " 元";
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    getSumPlace(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "小计";
          return;
        }
        let arr = [];
        let jishu = 0;
        const values = data.map((item) => {
          jishu = item.total_deposit / 100;
          arr.push(jishu);
        });
        this.yuding = arr.reduce(this.getSum); //小计
        if (index === 1 || index === 2) {
          sums[index] = "";
        } else if (index === 3) {
          sums[index] = this.yuding + " 元";
        } else {
          sums[index] = "";
        }
      });
      this.totalPrice = this.diandan + this.yuding; //总金额
      return sums;
    },
  },
};
</script>
<style scoped>
.shopSet {
  /* background: #fff;
    border: 1px solid #DCDFE6;
    box-shadow: 0 2px 4px 0 rgba(7, 7, 7, 0.12), 0 0 6px 0 rgba(0,0,0,.04); */
  margin: 15px 15px;
  padding: 15px 15px;
  position: relative;
}
.box1 {
  background: #ffffff;
  border: 1px solid #dfdfdf;
  padding: 20px;
  margin-bottom: 20px;
}
.shopSet >>> .el-step__icon {
  background: #dfdfdf;
  border: 10px solid #ffffff;
  box-sizing: content-box;
  position: relative;
  top: -10px;
}
.shopSet >>> .el-step__head.is-finish {
  border-color: #ffbe11;
}
.shopSet >>> .el-step__head.is-finish .is-text {
  background: #ffbe11;
  color: #0a0a0a;
}
.shopSet >>> .el-step__title.is-finish {
  color: #2e2e2e;
}
.shopSet >>> .el-step__description.is-finish {
  color: #2e2e2e;
}
.order-nav01 {
  width: 100%;
  padding: 18px;
  background: #f8f8f8;
  margin-top: 30px;
  border: 1px solid #cecece;
  display: flex;
}
.nav01-2 {
  flex: 1;
}
.n-title {
  font-size: 17px;
  color: #0a0a0a;
  margin-bottom: 10px;
  font-weight: bold;
}
.info-nav {
  float: left;
  margin-right: 5rem;
  line-height: 22px;
  font-size: 14px;
  color: #2e2e2e;
}
.order-btn {
  background: #0a0a0a;
  color: #ffffff;
}
.order-btn-2 {
  background: #f1f1f1;
  color: #0a0a0a;
}
.b-box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.sub-title {
  flex: 1;
}
.nav-box {
  background: #f8f8f8;
  border: 1px dashed #cecece;
  padding: 18px;
  margin-bottom: 20px;
  display: inline-block;
  width: 100%;
}
.pl-box1 {
  margin-right: 20px;
  flex: 1;
}
.left-box {
  min-height: 180px;
  padding: 20px;
  background: #f8f8f8;
  border: 1px dashed #cecece;
}
.pl-1-nav1 {
  display: flex;
}
.tx-img {
  width: 36px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  border-radius: 100%;
}
.box2 {
  width: 100%;
  display: flex;
}
.sex-i {
  font-weight: bold;
  color: #ee81a8;
}
.sex-i2 {
  font-weight: bold;
  color: #81a0ec;
}
.s1 {
  font-size: 15px;
  color: #777777;
  margin: 0 10px;
}
.info-box {
  display: flex;
  align-items: center;
}
.i-box {
  margin-left: 10px;
  flex: 1;
}
.pl-con {
  font-size: 15px;
  color: #0a0a0a;
  line-height: 24px;
}
.info-time {
  font-size: 13px;
  color: #8c8c8c;
}
.imgbox {
  width: 100%;
  margin-top: 10px;
}
.imglist {
  width: 80px !important;
  height: 80px !important;
  margin-right: 10px;
}
.pl-box2 {
  flex: 1;
}
.right-box {
  min-height: 180px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #cecece;
}
.right-box >>> .el-textarea__inner {
  border: none !important;
  padding: 0 !important;
  height: 138px;
}
.tj-box {
  text-align: right;
  margin-top: 20px;
}
.tijiao {
  background: #ffbe11;
  box-shadow: 0px 4px 4px rgba(255, 190, 17, 0.5);
  border-radius: 3px;
  border: none;
}
.heji {
  text-align: right;
}
.jine-t {
  font-size: 20px;
  color: #0a0a0a;
  font-weight: bold;
  margin-bottom: 5px;
}
.jin-e {
  font-weight: bold;
  color: #da0202;
  font-size: 24px;
}
.shop-img {
  width: 50px;
  height: 50px;
  background: #eee;
  text-align: center;
  line-height: 50px;
}
.gbBox {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.gbName {
  font-size: 16px;
  color: #2e2e2e;
}
.n-title2 {
  font-size: 17px;
  color: #0a0a0a;
  font-weight: bold;
}
</style>