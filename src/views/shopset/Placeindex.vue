<template>
  <div class="placeindex">
    <el-tabs type="border-card">
      <el-tab-pane label="类型管理">
        <placeType :merchants="merchants"></placeType>
      </el-tab-pane>
      <el-tab-pane label="区域管理">
        <placeArea :merchants="merchants"></placeArea>
      </el-tab-pane>
      <el-tab-pane label="座位规则">
        <placeRule :merchants="merchants"></placeRule>
      </el-tab-pane>
      <el-tab-pane label="座位管理">
        <placeManage :merchants="merchants"></placeManage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import placeType from "@/views/shopset/PlaceTypeindex";
import placeArea from "@/views/shopset/PlaceAreaindex";
import placeRule from "@/views/shopset/PlaceRuleindex";
import placeManage from "@/views/shopset/PlaceManage";
export default {
  name: "ShopSet",
  data() {
    return {
      msg: "座位区域设置",
      // 商家/店铺ID
      merchants: {
        shop_id: 0,
        merchant_id: 0,
      },
    };
  },
  components: {
    placeRule,
    placeArea,
    placeType,
    placeManage,
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
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
</style>
      