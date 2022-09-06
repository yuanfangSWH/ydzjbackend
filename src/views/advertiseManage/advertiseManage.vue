<template>
  <div class="advertiseManage">
    <div style="background: #fff">
      <p class="title">{{ title + "-" + adName }}</p>
      <div class="searchBar">
        <el-button v-if="params.status"
                   class="dartBtn"
                   @click="showDelBox"
                   type="danger">批量删除</el-button>
        <el-button v-if="params.status"
                   class="dartBtn"
                   @click="toAddAdvertise"
                   type="primary">新增</el-button>
        <el-button v-if="params.status"
                   style="margin-left: 10px"
                   type="primary"
                   class="yellowBtn"
                   @click="
            () => {
              this.params.status = 0;
              this.advertiseList();
            }
          ">回收站</el-button>
        <el-button v-if="!params.status"
                   @click="showDelBox"
                   type="danger">还原</el-button>
        <el-button v-if="!params.status"
                   style="margin-left: 10px"
                   type="primary"
                   @click="
            () => {
              this.params.status = 1;
              this.title = '广告';
              this.advertiseList();
            }
          ">返回</el-button>
        <el-button type="primary"
                   style="float: right"
                   class="dartBtn"
                   @click="search">搜索</el-button>
        <el-input :value="params.keyword"
                  v-model="params.keyword"
                  width="240"
                  :maxlength="40"
                  style="float: right"
                  placeholder="搜索广告ID/名称"
                  @keydown.enter.native="search"></el-input>
      </div>
      <el-table :data="adList"
                stripe
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @sort-change="sortFilterFun"
                @filter-change="filterTagTable">
        <el-table-column type="selection"
                         width="55"> </el-table-column>
        <el-table-column prop="ad_id"
                         label="ID"
                         width="180">
          <template slot-scope="scope">
            <div style="cursor: pointer"
                 class="oneline">
              {{ scope.row.ad_id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name"
                         label="名称"> </el-table-column>
        <el-table-column prop="name"
                         label="图片"
                         width="180">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px"
                      fit="contain"
                      :src="scope.row.content"
                      @click="showImglist(scope.row.content)">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="sort"
                         label="排序"
                         width="180"
                         sortable>
          <template slot-scope="{ row, $index }">
            <div @click="
                {
                  {
                    chengenum(row, $index);
                  }
                }
              ">
              <el-input ref="saveTagInput"
                        class="slot-ipt"
                        v-if="editable[$index]"
                        v-model.number="row.sort"
                        size="small"
                        autofocus
                        @blur="sortBlue($index, row.sort)"
                        @keyup.enter.native="$event.target.blur" />
              <span class="slotSpan"
                    v-else>{{ row.sort }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="跳转链接"
                         width="180">
          <template slot-scope="scope">
            <a class="oneline"
               :title="scope.row.href"
               :href="scope.row.href">{{
              scope.row.href
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="create_time"
                         label="创建时间"
                         width="180">
        </el-table-column>
        <el-table-column prop="start_time"
                         label="开始时间"
                         width="180">
        </el-table-column>
        <el-table-column prop="end_time"
                         label="结束时间">
          <!-- <template slot-scope="scope">
            <p class="oneline"
               :title="scope.row.end_time">{{scope.row.end_time}}</p>
          </template> -->
        </el-table-column>
        <el-table-column prop="ver"
                         label="版本"> </el-table-column>
        <!-- <el-table-column prop="status"
                         label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">禁用</span>
            <span v-if="scope.row.status == 1">启用</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作"
                         width="200"
                         align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="toWebpage(scope.row, 'edit')">编辑</el-button>
            丨
            <el-button v-if="params.status"
                       size="mini"
                       type="text"
                       @click="delAdvertise(scope.row)">删除</el-button>
            <el-button v-if="!params.status"
                       size="mini"
                       type="text"
                       @click="
                () => {
                  handleRestore({ id: [scope.row.ad_id] });
                }
              ">还原</el-button>
            <span v-if="!params.status"> | </span>
            <el-button size="mini"
                       type="text"
                       v-if="!params.status"
                       @click="
                () => {
                  handleDelete({ id: [scope.row.pos_id] });
                }
              ">彻底删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagebox">
        <el-pagination background0
                       layout="prev, pager, next"
                       :hide-on-single-page="true"
                       :total="params.count"
                       :current-page="params.page"
                       @current-change="pageChange">
        </el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="showEdit"
               width="50%"
               :close-on-click-modal="false"
               :before-close="
        () => {
          handleCloseVisible(false);
        }
      ">
      <template v-if="showEdit">
        <adEdit :ad_id="ad_id"
                @handleCloseVisible="handleCloseVisible" />
      </template>
    </el-dialog>
    <el-dialog :visible.sync="showDetail"
               width="50%"
               :before-close="
        () => {
          handleCloseDetailVisible(false);
        }
      ">
      <template v-if="showDetail">
        <adeDetail :ad_id="ad_id"
                   @handleCloseDetailVisible="handleCloseDetailVisible" />
      </template>
    </el-dialog>
    <el-dialog title="删除"
               :visible.sync="dialogVisible"
               width="30%">
      <span>确定要删除以下数据吗？</span>
      <div style="margin-top: 30px">
        <span v-for="(item, index) in nameArr"
              :key="index">{{ item.name }}
          <i v-if="index < nameArr.length - 1"> 、&nbsp;&nbsp;&nbsp; </i></span>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="MultiSelect">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title=""
               :visible.sync="dialogVisibleImg"
               width="50%">
      <template v-if="dialogVisibleImg">
        <el-carousel :autoplay="false"
                     indicator-position="none"
                     arrow="never"
                     height="600px">
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
    <!-- 返回上一页 -->
    <goBack v-if="showBack"></goBack>
  </div>
</template>
<script>
import adEdit from "./adEdit";
import adDetail from "./adDetail";
export default {
  name: "advertiseManage",
  data () {
    return {
      //返回上一页
      showBack: false,
      oldSort: 0,
      // isfocus:true,
      dataItem: {},
      editable: [],
      starttime: "",
      endtime: "",
      adList: [],
      title: "广告",
      ad_id: "", // 编辑项ID
      params: {
        keyword: "",
        sort: "",
        page: 1,
        page_size: 10,
        count: 0,
        status: 1,
        pos_id: null,
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
      adName: "",
      // showInput: false,
      sort: "",
      dialogVisibleImg: false,
      picData: [],
      imgIndex: 0,
    };
  },
  components: {
    adEdit,
    adDetail,
  },
  filters: {
    showText (val) {
      return val ? "详情" : "编辑";
    },
    showPlatformText (val) {
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
  },
  created () {
    // 返回上一页
    this.showBack = this.$route.query.from ? true : false;
    this.advertiseList();
    this.adName = this.$route.query.name ? this.$route.query.name : "";
  },
  methods: {
    chengenum (row, index) {
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
    sortBlue (row, val) {
      if (/^[0-9]*$/.test(val) === false) {
        this.$message.warning("请填写数字类型！");
        return false;
      }
      if (val == this.oldSort) {
        this.$set(this.editable, row, false);
        return false;
      } else {
        let data = {
          id: this.dataItem.ad_id,
          sort: val,
        };
        this.api.advertiseManage.handleSort(data).then((res) => {
          this.$message.success("修改成功！");
          this.advertiseList();
          this.$set(this.editable, row, false);
        });
      }
    },
    editAdvertise (params) {
      this.api.advertiseManage.editAdvertise(params).then((res) => {
        this.showInput = false;
        this.advertiseList();
      });
    },
    //搜索
    search () {
      this.params.page = 1;
      this.advertiseList();
    },
    // 重置
    reset () {
      this.params = {
        keyword: "",
        sort: "",
        page: 1,
        page_size: 10,
        count: 0,
        status: 1,
      };
      this.advertiseList();
    },
    // 获取列表
    advertiseList () {
      this.params.pos_id = this.$route.query.id;
      this.api.advertiseManage.advertiseList(this.params).then((res) => {
        this.adList = res.data.data.map((item) => {
          let obj = { ...item, showInput: false };
          return obj;
        });
        console.log(this.adList);
        // this.params.count = res.data.count
      });
    },
    // 删除
    delAdvertise (item) {
      this.$confirm("此操作将删除该广告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let data = { id: [item.ad_id] };
        this.api.advertiseManage.delAdvertise(data).then((res) => {
          this.advertiseList();
          this.$message.success("删除成功！");
        });
      });
    },
    // 分页
    pageChange (val) {
      this.params.page = val;
      this.advertiseList();
    },
    // 新增弹框
    toAddAdvertise () {
      this.showEdit = true;
      this.ad_id = null;
    },
    // 隐藏对话框
    handleCloseVisible (val, type) {
      this.showEdit = val;
      if ((type = "success")) {
        this.advertiseList();
      }
    },
    handleCloseDetailVisible () {
      this.showDetail = false;
    },
    // 编辑或详情
    toWebpage (item, type) {
      this.ad_id = item.ad_id;
      if (type == "detail") {
        // this.$router.push({ path: "/advertisePlaceDetail", query: { id: item.pos_id } })
        this.showDetail = true;
      } else {
        // this.$router.push({ path: "/advertiseEdit", query: { id: item.pos_id } })
        this.showEdit = true;
      }
    },
    //table筛选
    filterTagTable (filters) {
      this.params.status = filters.status[0];
      this.advertiseList();
    },
    //table排序
    sortFilterFun (column) {
      this.params.sort = column.prop;
      this.advertiseList();
    },
    handleSelectionChange (item) {
      this.nameArr = item;
    },
    // 多选删除
    showDelBox () {
      if (!this.nameArr.length) {
        return this.$message.info("请选择要操作的数据！");
      }
      this.dialogVisible = true;
    },
    // 多选删除或还原操作
    MultiSelect () {
      let data = this.nameArr.map((item, index) => item.ad_id);
      if (this.params.status) {
        this.api.advertiseManage.delAdvertise({ id: data }).then((res) => {
          this.dialogVisible = false;
          this.nameArr = [];
          this.advertiseList();
          this.$message.success("删除成功！");
        });
      } else {
        this.handleRestore({ id: data });
        this.dialogVisible = false;
      }
    },
    // 还原
    handleRestore (data) {
      this.api.advertiseManage.handleRestore(data).then((res) => {
        this.$message.success("还原成功");
        this.params.status = 0;
        this.advertiseList();
      });
    },
    // 彻底删除
    handleDelete (data) {
      this.api.advertiseManage.handleDelete(data).then((res) => {
        this.$message.success("删除成功");
        this.params.status = 0;
        this.adPlaceList();
      });
    },
    showImglist (row) {
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
.slotSpan {
  cursor: pointer;
}
.slot-ipt {
  width: 100px;
}
.advertiseManage {
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
.advertiseManage > div {
  // background-color: #fff;
  margin: 20px;
  padding: 20px 20px 0;
}
</style>
