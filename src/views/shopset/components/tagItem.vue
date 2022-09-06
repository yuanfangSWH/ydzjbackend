<template>
  <div>
    <div class="tagBox">
        <div class="tagNav" v-for="(item1, index1) in allTagData" :key="index1" v-if="item1.tags && item1.status == 1">
          <div class="tagleft">{{item1.name}}</div>
          <div class="tagright">
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="(item2, index2) in item1.tags" :key="index2" class="checkBox" :label="item2.tag_id" :checked="item2.checked ? true:false" v-if="item2.status">{{item2.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="btnBox">
        <el-button type="primary" style="background:#ffbe11; border-color:#ffbe11; color:#000" @click="submitTags">保存</el-button> <el-button type="warning" style="background:#eeeeee; border-color:#eeeeee; color:#000; margin-left:30px" @click="resetTags">重置</el-button>
      </div>
  </div>
</template>

<script>
export default {
  name:"",
  props: {
    shop_id: {
      type: Number,
      default: 1
    },
    merchant_id: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      checkList: [],
      allTagData:[]
    }
  },
  created () {
    this.getAllTag()
  },
  methods:{
    //获取标签分类数据
    getAllTag() {
      let data = {
        shop_id: Number(this.shop_id)
      };
      this.api.shop.shopTagAll(data).then((res) => {
        this.allTagData = res.data.data;
        // this.group_id = res.data.data[0].group_id;
      });
    },
    submitTags() {
      let data = {
        merchant_id: Number(this.merchant_id),
        shop_id:Number(this.shop_id),
        tag_ids: this.checkList
      }
      this.api.shop.tagSetShop(data).then((res) => {
        this.$message({
          message: ""+res.data.msg,
          type: "success",
        });
        this.getAllTag()
      });
    },
    resetTags() {
      this.checkList = []
      this.submitTags()
    }
  }
}
</script>

<style scoped>
.tagBox{ display: inline-block; width: 100%;}
.tagNav{ display: flex; align-items: center; border-bottom: 1px dashed #ccc; padding:10px 0 20px;}
.tagleft{ font-weight: bold; font-size: 14px;}
.tagright{ flex: 1; margin-left: 30px;}
.checkBox{ margin: 7px 20px 7px 0;}
.btnBox{ display: flex; margin-top: 40px; text-align: center; justify-content: center;}
</style>