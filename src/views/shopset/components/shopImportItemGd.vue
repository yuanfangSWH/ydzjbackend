<!--
 * @Author:朱强
 * @Date: 2021-01-18 17:06:38
 * @LastEditTime: 2021-02-20 15:08:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\shopset\components\shopImportItem.vue
-->
<template>
  <div>
    <el-table
      ref="multipNum"
      stripe
      :data="tableListData"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
      @sort-change="handleDataSort"
      @selection-change="selectItem"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" sortable="true" />
      <el-table-column prop="name" label="店铺名" sortable="true" />
      <el-table-column prop="tel" label="电话" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="province_name" label="省" />
      <el-table-column prop="city_code" label="城市" sortable="true">
        <template slot-scope="scope">
          {{ scope.row.city_name }}
        </template>
      </el-table-column>
      <el-table-column prop="area_code" label="区域" sortable="true">
        <template slot-scope="scope">
          {{ scope.row.area_name }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="店铺地址" sortable="true" />
      <el-table-column prop="cost" label="人均消费" />
      <el-table-column prop="rating" label="评分" />
      <el-table-column prop="logo" label="店铺图片">
        <template slot-scope="scope" style="">
          <div v-if="scope.row.photos != ''">
            <el-image
              v-for="(item, imgIndex) in scope.row.photos.split(',')"
              :key="'img_' + imgIndex"
              style="float: left; width: 80px; margin: 5px"
              :src="item"
              @click="showImglist(scope.row.photos, imgIndex)"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleImportShop(scope.row)"
            >导入</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="大图预览" :visible.sync="imgDialogVisible" width="50%">
      <el-carousel
        :autoplay="false"
        indicator-position="none"
        arrow="always"
        height="600px"
        :initial-index="imageIndex"
        v-if="imgDialogVisible"
      >
        <el-carousel-item v-for="(item, index) in fileList" :key="index">
          <div class="imgbox">
            <el-image
              style="height: 600px; width: auto"
              fit="contain"
              :src="item.split('!')[0]"
            ></el-image>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "shopImportItemGd",
  props: {
    shopData: { type: Array },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imgDialogVisible: false,
      multipleSelection: [], //批量选中
      fileList: [],
      imageIndex: 0,
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
      searchOption: {
        //article_id: 0,
        sort: "",
        order: "",
        page: 1,
        keyword: "",
      },
      total: 1,
      tableListData: [], //页面表单的内容
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
    };
  },
  watch: {
    shopData(v) {
      this.tableListData = v;
      this.$emit("update:loading", false);
    },
  },
  methods: {
    handleDataSort(obj) {
      this.$emit("handleDataSort", obj);
    },
    selectItem(val) {
      this.$emit("selectItem", val);
    },
    handleImportShop(obj) {
      this.$emit("handleImportShop", obj);
    },
    clearSelect() {
      this.$refs["multipNum"].clearSelection();
    },
    showImglist(photos, i) {
      this.imageIndex = i;
      this.fileList = photos.split(",");
      this.imgDialogVisible = true;
    },
  },
  created() {},
};
</script>
<style scoped>
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
</style>