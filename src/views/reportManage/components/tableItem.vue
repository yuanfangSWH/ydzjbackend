<template>
  <div>
    <el-table ref="multipleTable"
              :data="dataOptions"
              stripe
              style="width: 100%"
              @selection-change="handleSelectionChange"
              @filter-change="filterTagTable"
              @sort-change="sortFilterFun">
      <el-table-column type="selection"
                       width="55"> </el-table-column>
      <el-table-column prop="report_id"
                       label="ID"
                       width="100"
                       sortable="custom">
      </el-table-column>
      <el-table-column prop="desc"
                       label="举报者"
                       width="180">
        <template slot-scope="scope">
          <div v-if="scope.row.user"
               style="display: flex; align-items: center"
               @click="userInformation(scope.row)">
            <el-image style="width: 30px; height: 30px; border-radius: 100%"
                      fit="fill"
                      :src="scope.row.user.avatar"></el-image>
            <div style="flex: 1; margin-left: 5px">
              {{ scope.row.user.nickname }}（<span v-if="scope.row.user.gender == 1">男</span><span v-else>女</span>/{{ scope.row.user.age }}岁）
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="scene_desc"
                       label="场景"
                       width="180"
                       :filter-multiple="false"
                       :filters="sceneArr"
                       filter-placement="bottom-end"
                       :column-key="'scene'">
      </el-table-column>
      <el-table-column prop="desc"
                       label="举报内容"
                       width="350">
        <template slot-scope="scope">
          <div style="display: flex; align-items: center">
            <div>
              <el-tooltip class="item"
                          effect="dark"
                          :content="scope.row.desc"
                          placement="bottom"
                          :disabled="getShow(scope.row.desc)">
                <div :title="getAgent(scope.row.desc)">
                  {{ getAgent(scope.row.desc) }}
                </div>
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="desc"
                       label="图片"
                       width="350">
        <template slot-scope="scope">
          <div style="display: flex; align-items: center">
            <div>
              <span v-for="(item, index) in scope.row.pics"
                    :key="index"
                    @click="showImglist(scope.row.pics_ori, index)">
                <el-image style="width: 76px; height: 76px; margin-left: 10px"
                          fit="fill"
                          :src="item.pic_path"></el-image>
              </span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="type_desc"
                       label="类型"
                       width="180"
                       :filter-multiple="false"
                       :filters="typeArr"
                       filter-placement="bottom-end"
                       :column-key="'type'">
      </el-table-column>
      <el-table-column prop="create_time"
                       label="举报时间"
                       width="180">
      </el-table-column>
      <el-table-column prop="admin.admin_name"
                       label="操作人"
                       width="180">
      </el-table-column>
      <el-table-column prop="status"
                       label="状态"
                       :filter-multiple="false"
                       :filters="statusArr"
                       filter-placement="bottom-end"
                       :column-key="'status'">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">未处理</span>
          <span v-if="scope.row.status == 1">已处理</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       width="100"
                       label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 0"
                     @click="handleClick(scope.row)"
                     type="text"
                     size="small">处理</el-button>
          <div>
            <el-button @click="delItem(scope.row)"
                       type="text"
                       size="small">删除</el-button>
          </div>
          <el-button @click="detaileClick(scope.row)"
                     type="text"
                     size="small">查看原文</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="大图预览"
               :visible.sync="dialogVisible"
               width="50%">
      <template v-if="dialogVisible">
        <el-carousel :autoplay="false"
                     indicator-position="none"
                     arrow="always"
                     height="600px"
                     :initial-index="imgIndex">
          <el-carousel-item v-for="(item, index) in picData"
                            :key="index">
            <div class="imgbox">
              <el-image style="height: 600px; width: auto"
                        fit="contain"
                        :src="item"></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    dataOptions: Array,
  },
  data () {
    return {
      showDelBox: false,
      picArr: [],
      multipleSelection: [],
      nameArr: [],
      statusArr: [
        { text: "未处理", value: "0" },
        { text: "已处理", value: "1" },
      ],
      typeArr: [
        { text: "色情暴力低俗", value: "1" },
        { text: "政治敏感", value: "2" },
        { text: "广告营销", value: "3" },
        { text: "违法犯罪", value: "4" },
        { text: "其它", value: "5" },
      ],
      sceneArr: [
        { text: "店铺", value: "1" },
        { text: "商品", value: "2" },
        { text: "用户", value: "3" },
        { text: "拼桌", value: "4" },
        { text: "组局", value: "5" },
        { text: "广播", value: "6" },
        { text: "作品", value: "7" },
        { text: "评论回复", value: "8" },
        { text: "资讯评论、回复", value: "9" },
      ],
      sortVal: "",
      sortStatus: false,
      order: "desc",
      dialogVisible: false,
      picData: [],
      imgIndex: 0,
    };
  },
  methods: {
    // 删除
    delItem (item) {
      console.log(item, 111);
      this.$emit('showDelBox', item)
    },
    // 内容过长，鼠标移入显示全部
    getAgent (v) {
      return v.length > 20 ? v.substring(0, 20) + " ..." : v;
    },
    getShow (v) {
      return v.length > 20 ? false : true;
    },
    handleSelectionChange (val) {
      // console.log('val====',val)
      var arr = [];
      this.nameArr = [];
      for (var i = 0; i < val.length; i++) {
        arr.push(val[i].report_id);
        this.nameArr.push(val[i].report_id);
      }
      this.multipleSelection = arr;
      // arr = Array.from(new Set(arr))
      this.nameArr = Array.from(new Set(this.nameArr));
      // this.multipleSelection = arr.join(',')
      this.$emit("childrenFun", this.multipleSelection, this.nameArr, 5);
    },
    //table筛选
    filterTagTable (filters) {
      // console.log(filters)
      this.filterMethod(filters);
    },
    //table筛选
    filterMethod (val) {
      var key = [];
      var value = [];
      for (var i in val) {
        key.push(i);
        value.push(val[i]);
      }
      key = key.join(",");
      value = value.join(",");
      this.$emit("childrenFun", key, value, 1);
    },
    //table排序
    sortMethod (val) {
      this.sortVal = val;
      this.sortStatus = !this.sortStatus;
      if (this.sortStatus) {
        this.order = "asc"; //正序
      } else {
        this.order = "desc"; //倒序
      }
      //接口逻辑
      this.$emit("childrenFun", this.sortVal, this.order, 2);
    },
    //table排序
    sortFilterFun (column) {
      this.sortMethod(column.prop);
    },
    handleClick (row) {
      this.$emit("childrenFun", row.report_id, row.status, 3);
    },
    detaileClick (row) {
      // console.log(row.info_id)
      switch (row.scene) {
        case 1:
          // 店铺
          this.$router.push(
            "/shopEdit?shop_id=" + row.info_id + "&from=report"
          );
          break;
        case 2:
          // 商品(卓为说没有商品的举报)
          // this.$router.push('/shopEdit')
          break;
        case 3:
          // 用户
          this.$router.push(
            "/UserInformation?user_id=" + row.info_id + "&from=report"
          );
          break;
        case 4:
          // 拼桌
          this.$router.push("/RaiseCrow?cf_id=" + row.info_id + "&from=report");
          break;
        case 5:
          // 组局
          this.$router.push(
            "/GroupEetail?gp_id=" + row.info_id + "&from=report"
          );
          break;
        case 6:
          // 广播
          this.$router.push(
            "/Notification/systemPush?article_id=" +
            row.info_id +
            "&from=report"
          );
          break;
        case 7:
          // 作品
          this.$router.push(
            "/threadPassList?thread_id=" + row.info_id + "&from=report"
          );
          break;
        case 8:
          // 评论回复
          this.$router.push(
            "/commentTemporary?comment_id=" + row.info_id + "&from=report"
          );
          break;
        case 9:
          // 资讯评论
          this.$router.push(
            "/news/comment?comment_id=" + row.info_id + "&from=report"
          );
          break;
        case 10:
          // 商家评论
          this.$router.push(
            "/shopset/shop/evaluate?eval_id=" + row.info_id + "&from=report"
          );
          break;
        default:
          break;
      }
      // this.$emit('childrenFun', row.report_id, row.scene,4)
    },
    userInformation (row) {
      this.$emit("childrenFun", row.user.user_id, "", 6);
    },
    showImglist (row, index) {
      this.dialogVisible = true;
      this.picData = row;
      this.imgIndex = index;
    },
  },
};
</script>

<style scoped>
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
</style>