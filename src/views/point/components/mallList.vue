<!--
 * @Author: your name
 * @Date: 2021-04-02 14:36:34
 * @LastEditTime: 2021-04-13 17:42:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\views\point\components\mallList.vue
-->
<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="dataList"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="handlesortFilterFun"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="item_id" label="全选/ID" width="150" sortable="custom">
      </el-table-column>
      <el-table-column prop="name" label="图片" width="80">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.type == 2"
            :src="scope.row.image.split(',')[0]"
            @click="showImglist(scope.row.image.split(',')[0], scope.row.name)"
          ></el-image>
          <span v-else style="color: #909399">无</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品" width="280"></el-table-column>
      <el-table-column prop="shop_name" label="指定商家" width="280"> </el-table-column>
      <el-table-column prop="goods_class.is_combo" label="类型" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">券</span>
          <span v-if="scope.row.type == 2">实物</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="市场价">
        <template slot-scope="scope">
          {{ scope.row.price / 100 }}
        </template>
      </el-table-column>
      <el-table-column prop="point" label="兑换积分"></el-table-column>
      <el-table-column prop="sort" label="排序">
        <template slot-scope="scope">
          <el-input
            class="input_pxcss"
            v-model="scope.row.sort"
            :ref="'saveTagInput_' + scope.$index"
            @blur="percentF(scope.row, scope.$index)"
            v-if="scope.$index === sortingid"
          ></el-input>
          <div class="muzhicss" @click="khaki(scope.$index, scope.row)" v-else>
            <span>{{ scope.row.sort }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="start_time" label="有效时间">
        <template slot-scope="scope">
          {{ scope.row.start_time }} ~ {{ scope.row.end_time }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="有效地区">
        <template slot-scope="scope">
          {{ scope.row.province }}-{{ scope.row.city }}
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看/编辑</el-button
          >
          <el-button
            v-if="status == 1"
            @click="handleStatus(scope.row)"
            type="text"
            size="small"
            >下架</el-button
          >
          <el-button
            v-if="status == 2"
            @click="handleStatus(scope.row)"
            type="text"
            size="small"
            >上架</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="openShopImages.shopName"
      :visible.sync="openShopImages.dialogVisible"
      width="50%"
      :modal="false"
    >
      <template v-if="openShopImages.dialogVisible">
        <el-carousel
          :autoplay="false"
          indicator-position="none"
          arrow="never"
          height="600px"
        >
          <el-carousel-item
            v-for="(item, index) in openShopImages.picData"
            :key="'openShopImages_' + index"
          >
            <div class="imgbox">
              <el-image
                style="height: 600px; width: auto"
                fit="contain"
                :src="item"
              ></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "mailList",
  components: {},
  props: {
    status: {
      type: Number,
      default: 1,
    },
    mallData: {
      type: Array,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sortingid: "",
      dataList: [],
      multipleSelection: [],
      openShopImages: {
        //打开图片相关设置
        shopName: "",
        dialogVisible: false,
        picData: [],
      },
    };
  },
  methods: {
    khaki(index, row) {
      this.sortingid = index;
      this.sortData = Number(row.sort);
      this.$nextTick(() => {
        this.$refs["saveTagInput_" + index].focus();
      });
    },
    //打开图片
    showImglist(row, name) {
      this.openShopImages.picData = [];
      this.openShopImages.dialogVisible = true;
      this.openShopImages.picData.push(row);
      this.openShopImages.shopName = name;
    },
    //排序修改
    percentF(row, index) {
      if (this.sortData != row.sort) {
        var datas = {
          item_id: row.item_id,
          sort: Number(row.sort),
        };
        this.api.point.pointMallUpdate(datas).then((res) => {
          if (res.data.code == 0) {
            this.sortingid = "";
            this.$message({
              message: "修改排序成功",
              type: "success",
            });
          } else {
            this.tableListData[index].sort = this.sortData;
            this.$message({
              message: "修改排序失败",
              type: "warning",
            });
          }
        });
      } else {
        this.sortingid = "";
      }
    },
    handleStatus(obj) {
      this.multipleSelection = [obj.item_id];
      this.$emit("selection", this.multipleSelection, {
        fun: "pointMallUpDown",
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.item_id);
      });
      this.$emit("selection", this.multipleSelection, null);
    },
    handlesortFilterFun(e) {
      this.$emit("sort-change", e);
    },
    handleClick(obj) {
      this.$emit("edit", obj);
    },
  },
  watch: {
    mallData: {
      immediate: true,
      handler(val) {
        //console.info(val);
        this.dataList = Object.assign([], val);
      },
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
</style>
