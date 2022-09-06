<template>
  <div class="advertisePlace">
    <div>
      <p class="title">{{ title }}</p>
      <div class="searchBar">
        <el-button
          v-if="params.status"
          class="dartBtn"
          @click="showDelBox"
          type="danger"
          >删除</el-button
        >
        <el-button
          v-if="params.status"
          class="dartBtn"
          @click="toAddAdvertise"
          type="primary"
          >新增</el-button
        >
        <el-button
          v-if="params.status"
          style="margin-left: 10px"
          type="primary"
          class="yellowBtn"
          @click="
            () => {
              this.params.status = 0;
              this.title = '回收站';
              this.adPlaceList();
            }
          "
          >回收站</el-button
        >
        <el-button v-if="!params.status" @click="showDelBox" type="danger"
          >还原</el-button
        >
        <el-button
          v-if="!params.status"
          style="margin-left: 10px"
          type="primary"
          @click="
            () => {
              this.params.status = 1;
              this.title = '广告列表';
              this.adPlaceList();
            }
          "
          >返回</el-button
        >
        <el-button
          type="danger"
          style="float: right"
          class="dartBtn"
          @click="search"
          >搜索</el-button
        >
        <el-input
          :value="params.keyword"
          v-model="params.keyword"
          width="240"
          :maxlength="40"
          style="float: right"
          placeholder="搜索广告ID/名称"
          @keydown.enter.native="search"
        ></el-input>
      </div>
      <el-table
        :data="adList"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="sortFilterFun"
        @filter-change="filterTagTable"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="pos_id" label="ID" width="180">
          <template slot-scope="scope">
            <div style="cursor: pointer" class="oneline">
              {{ scope.row.pos_id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="广告名称" width="180">
          <template slot-scope="scope">
            <div
              style="cursor: pointer; color: #409eff"
              class="oneline"
              @click="toWebpage(scope.row, 'manage')"
            >
              <!-- @click="toWebpage(scope.row, 'detail')" -->
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="platform"
          label="平台"
          width="180"
          :filter-multiple="false"
          :filters="platformList"
          filter-placement="bottom-end"
          :column-key="'platform'"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.platform | showPlatformText }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="alias" label="广告别名" width="180">
          <template slot-scope="scope">
            <p class="oneline" :href="scope.row.href">{{ scope.row.alias }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" sortable width="180">
          <template slot-scope="{ row, $index }">
            <div
              @click="
                {
                  {
                    chengenum(row, $index);
                  }
                }
              "
            >
              <el-input
                ref="saveTagInput"
                class="slot-ipt"
                v-if="editable[$index]"
                v-model.number="row.sort"
                size="small"
                autofocus
                @blur="sortBlue($index, row.sort)"
                @keyup.enter.native="$event.target.blur"
              />
              <span class="slotSpan" v-else>{{ row.sort }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="example_image" label="示例图" width="180">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.example_image"
              @click="showImglist(scope.row.example_image)"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="地区" width="180">
          <template slot-scope="scope">
            <p>
              {{
                scope.row.province
                  ? scope.row.city
                    ? scope.row.area
                      ? scope.row.province +
                        "-" +
                        scope.row.city +
                        "-" +
                        scope.row.area
                      : scope.row.province + "-" + scope.row.city
                    : scope.row.province
                  : "全部"
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          :filters="genderList"
          :filter-multiple="false"
          :column-key="'gender'"
          width="180"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.gender | farmatGender }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述">
          <template slot-scope="scope">
            <p class="oneline" :title="scope.row.description">
              {{ scope.row.description }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="180"
        ></el-table-column>
        <!-- <el-table-column prop="status"
                         label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">禁用</span>
            <span v-if="scope.row.status == 1">启用</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="220" align="center">
          <!-- <template slot="header" slot-scope="scope">
          <el-input v-model="search" class="search" size="mini" placeholder="输入关键字搜索" :data-str="scope" />
        </template>-->
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="toWebpage(scope.row, 'manage')"
              >广告列表</el-button
            >
            |
            <el-button
              size="mini"
              type="text"
              @click="toWebpage(scope.row, 'edit')"
              >编辑</el-button
            >
            |
            <el-button
              v-if="params.status"
              size="mini"
              type="text"
              @click="delAdPlace(scope.row)"
              >删除</el-button
            >
            <el-button
              v-if="!params.status"
              size="mini"
              type="text"
              @click="
                () => {
                  handleRestore({ id: [scope.row.pos_id] });
                }
              "
              >还原</el-button
            >
            <span v-if="!params.status"> | </span>
            <el-button
              size="mini"
              type="text"
              v-if="!params.status"
              @click="
                () => {
                  handleDelete({ id: [scope.row.pos_id] });
                }
              "
              >彻底删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagebox">
        <el-pagination
          background0
          layout="prev, pager, next"
          :hide-on-single-page="true"
          :total="params.count"
          :current-page="params.page"
          @current-change="pageChange"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :visible.sync="showEdit"
      width="60%"
      :close-on-click-modal="false"
      :before-close="
        () => {
          handleCloseVisible(false);
        }
      "
    >
      <template v-if="showEdit">
        <advertiseEdit :id="pos_id" @handleCloseVisible="handleCloseVisible" />
      </template>
    </el-dialog>
    <el-dialog
      :visible.sync="showDetail"
      width="30%"
      :before-close="handleCloseDetailVisible"
    >
      <template v-if="showDetail">
        <advertisePlaceDetail
          :id="pos_id"
          @handleCloseDetailVisible="handleCloseDetailVisible"
        />
      </template>
    </el-dialog>
    <el-dialog
      :title="params.status == 1 ? '删除' : '还原'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>确定要{{ params.status == 1 ? "删除" : "还原" }}以下数据吗？</span>
      <div style="margin-top: 30px">
        <span v-for="(item, index) in nameArr" :key="index"
          >{{ item.name }}
          <i v-if="index < nameArr.length - 1"> 、&nbsp;&nbsp;&nbsp; </i></span
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="MultiSelect">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="" :visible.sync="dialogVisibleImg" width="80%">
      <template v-if="dialogVisibleImg">
        <el-carousel
          :autoplay="false"
          indicator-position="none"
          arrow="never"
          height="600px"
        >
          <el-carousel-item v-for="(item, index) in picData" :key="index">
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
import advertiseEdit from "./advertiseEdit";
import advertisePlaceDetail from "./advertisePlaceDetail";
export default {
  name: "advertisePlace",
  data() {
    return {
      genderList: [
        { text: "不限", value: 0 },
        { text: "男", value: 1 },
        { text: "女", value: 2 },
      ],
      oldSort: 0,
      // isfocus:true,
      dataItem: {},
      editable: [],
      starttime: "",
      endtime: "",
      adList: [],
      title: "广告位",
      pos_id: "", // 编辑项ID
      params: {
        keyword: "",
        sort: "",
        page: 1,
        page_size: 10,
        count: 0,
        status: 1,
      },
      statusArr: [
        { text: "禁用", value: "0" },
        { text: "启用", value: "1" },
      ],
      dialogVisible: false,
      dialogMore: false,
      nameArr: [],
      showEdit: false,
      showDetail: false,
      platformList: [
        { text: "全平台", value: 0 },
        { text: "android", value: 1 },
        { text: "ios", value: 2 },
        { text: "小程序", value: 3 },
      ],
      dialogVisibleImg: false,
      picData: [],
    };
  },
  components: {
    advertiseEdit,
    advertisePlaceDetail,
  },
  filters: {
    showText(val) {
      return val ? "详情" : "编辑";
    },
    showPlatformText(val) {
      const platformList = [
        { label: "全平台", value: 0 },
        { label: "android", value: 1 },
        { label: "ios", value: 2 },
        { label: "小程序", value: 3 },
      ];
      return platformList.find((item) => item.value == val)
        ? platformList.find((item) => item.value == val).label
        : "无";
    },
    farmatGender(val) {
      let gender = null;
      val == 2
        ? (gender = "女")
        : val == 1
        ? (gender = "男")
        : (gender = "不限");
      return gender;
    },
  },
  created() {
    this.adPlaceList();
  },
  methods: {
    chengenum(row, index) {
      // this.isfocus = true
      this.dataItem = row;
      this.oldSort = row.sort;
      this.editable[index] = true;
      this.$set(this.editable, index, true);
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus();
      });
    },
    // 失焦 完成
    sortBlue(row, val) {
      if (/^[0-9]*$/.test(val) === false) {
        this.$message.warning("请填写数字类型！");
        return false;
      }
      if (val == this.oldSort) {
        this.$set(this.editable, row, false);
        return false;
      } else {
        let data = {
          id: this.dataItem.pos_id,
          sort: val,
        };
        this.api.advertiseManage.advPlaceSort(data).then((res) => {
          this.$message.success("修改成功！");
          this.adPlaceList();
          this.$set(this.editable, row, false);
        });
      }
    },
    //搜索
    search() {
      this.params.page = 1;
      this.adPlaceList();
    },
    // 重置
    reset() {
      this.params = {
        keyword: "",
        sort: "",
        page: 1,
        page_size: 10,
        count: 0,
        status: 1,
      };
      this.adPlaceList();
    },
    // 获取列表
    adPlaceList() {
      this.api.advertisePlace.adPlaceList(this.params).then((res) => {
        this.adList = res.data.data;
        this.params.count = res.data.count;
        // this.params.count = this.adList.filter(item => item.status == 1).length
      });
    },
    // 删除
    delAdPlace(item) {
      this.$confirm("是否将此广告放入回收站?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let data = { id: [item.pos_id] };
        this.api.advertisePlace.delAdPlace(data).then((res) => {
          this.adPlaceList();
          this.$message.success("删除成功！");
        });
      });
    },
    // 分页
    pageChange(val) {
      this.params.page = val;
      this.adPlaceList();
    },
    // 新增弹框
    toAddAdvertise() {
      this.showEdit = true;
      this.pos_id = null;
    },
    // 隐藏对话框
    handleCloseVisible(val, type) {
      this.showEdit = val;
      if ((type = "success")) {
        this.adPlaceList();
      }
    },
    handleCloseDetailVisible() {
      this.showDetail = false;
    },
    // 编辑或详情
    toWebpage(item, type) {
      this.pos_id = item.pos_id;
      if (type == "detail") {
        this.showDetail = true;
      } else if (type == "manage") {
        this.$router.push({
          path: "/advertiseList",
          query: { id: item.pos_id, name: item.name, from: "advertise" },
        });
      } else {
        this.showEdit = true;
      }
    },
    //table筛选
    filterTagTable(filters) {
      if (filters.platform) {
        this.params.platform = filters.platform[0];
      } else if (filters.gender) {
        this.params.gender = filters.gender[0];
      }

      this.adPlaceList();
    },
    //table排序
    sortFilterFun(column) {
      this.params.sort = column.prop;
      this.adPlaceList();
    },
    handleSelectionChange(item) {
      this.nameArr = item;
    },
    // 多选删除
    showDelBox() {
      if (!this.nameArr.length) {
        return this.$message.info("请选择要操作的数据！");
      }
      this.dialogVisible = true;
    },
    // 多选删除或还原操作
    MultiSelect() {
      let data = this.nameArr.map((item, index) => item.pos_id);
      if (this.params.status) {
        this.api.advertisePlace.delAdPlace({ id: data }).then((res) => {
          this.dialogVisible = false;
          this.nameArr = [];
          this.adPlaceList();
          this.$message.success("删除成功！");
        });
      } else {
        this.handleRestore({ id: data });
        this.dialogVisible = false;
      }
    },
    // 还原
    handleRestore(data) {
      this.api.advertisePlace.handleRestore(data).then((res) => {
        this.$message.success("还原成功");
        this.params.status = 0;
        this.adPlaceList();
      });
    },
    // 彻底删除
    handleDelete(data) {
      this.api.advertisePlace.handleDelete(data).then((res) => {
        this.$message.success("删除成功");
        this.params.status = 0;
        this.adPlaceList();
      });
    },
    showImglist(row) {
      this.picData = [];
      this.dialogVisibleImg = true;
      this.picData.push(row);
    },
  },
};
</script>

<style lang="scss">
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.advertisePlace {
  color: #000;
  background-color: #f1f1f1;
  .title {
    font-size: 24px;
    margin: 0px;
    color: #0a0a0a;
  }
  .oneline {
    overflow: hidden; /*超出部分隐藏*/
    text-overflow: ellipsis; /* 超出部分显示省略号 */
    white-space: nowrap; /*规定段落中的文本不进行换行 */
    width: 100%; /*需要配合宽度来使用*/
  }
  .searchBar {
    margin: 20px 0;
    li {
      span {
        display: inline-block;
        width: 80px;
        text-align: right;
        margin-right: 20px;
      }
    }
    li:nth-child(n + 1) {
      margin-top: 10px;
    }
    .el-button {
      width: 100px;
      // span {
      //   color: #000;
      // }
    }
    .el-input {
      width: 240px;
    }
  }
  .content {
    p {
      margin: 0;
      font-size: 12px !important;
    }
  }
  .pagebox {
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
  .el-dialog__wrapper {
    background-color: rgba(255, 255, 255, 0.3);
  }
  .cell {
    .el-button {
      margin-left: 0;
    }
  }
  .dartBtn {
    background-color: #000000;
    color: #fff;
    border: 1px solid #000;
  }
  .yellowBtn {
    background-color: #fff6df;
    color: #000;
    border: 1px solid #ffbe11;
  }
}
.advertisePlace > div {
  background-color: #fff;
  margin: 20px;
  padding: 20px 20px 0;
}
</style>