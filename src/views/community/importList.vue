<template>
  <div class="">
    <div class="shopSet">
      <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
      <div class="shanxdiv">
        <!-- <div class="rucwz2">性别</div>
        <el-select v-model="searchOption.member_gender" placeholder="请选择">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
          <el-option label="忽略" :value="''"></el-option>
        </el-select> -->
        <div class="rucwz2">关键字</div>
        <el-input style="width: 250px; margin-right: 10px"
                  placeholder="输入关键字"
                  v-model="searchOption.keyword"
                  @change="screening"
                  clearable></el-input>
        <!-- <div class="rucwz2">年龄段</div>
        <el-input
          style="width: 150px; margin-right: 10px"
          placeholder="输入最小年龄"
          v-model="searchOption.min_age"
          @change="screening"
          clearable
        ></el-input>
        <el-input
          style="width: 150px; margin-right: 10px"
          placeholder="输入最大年龄"
          v-model="searchOption.max_age"
          @change="screening"
          clearable
        ></el-input>
        <div class="rucwz2">昵称</div>
        <el-input
          style="width: 150px; margin-right: 10px"
          placeholder="输入昵称"
          v-model="searchOption.nickname"
          @change="screening"
          clearable
        ></el-input>
        <div class="rucwz2">城市代码</div>
        <el-input
          style="width: 350px; margin-right: 10px"
          placeholder="输入城市代码"
          v-model="searchOption.city_code"
          @change="screening"
          clearable
        ></el-input>-->

        <el-button class="filter-btn"
                   type="primary"
                   @click="screening"
                   style="margin-left: 10px">筛选</el-button>
        <el-button class="filter-btn"
                   type="primary"
                   @click="resetData">清空条件</el-button>

        <el-popover placement="bottom-start"
                    width="400"
                    trigger="click">
          <el-input type="textarea"
                    :rows="4"
                    placeholder="请输入分享内容"
                    v-model="shareText">
          </el-input>
          <div style="text-align: right; float: right">
            <el-button type="text"
                       @click="shareText = ''">清除</el-button>
            <el-button type="text"
                       @click="handleImportVideo">导入</el-button>
          </div>
          <el-button type="primary"
                     slot="reference"
                     style="margin-left: 10px">导入</el-button>
        </el-popover>

        <!-- <el-dropdown trigger="click" style="margin-left: 10px">
          <el-button type="primary">
            分享内容提取<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" style="width: 300px; padding: 10px">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="shareText"
            >
            </el-input>
            <div style="text-align: right">
              <el-button
                type="text"
                @click="
                  shareText = '';
                  shareTextUrls = [];
                "
                >清除</el-button
              >
              <el-button type="text" @click="getShareTextUrl">提取</el-button>
            </div>
            <a
              v-for="(item, index) in shareTextUrls"
              :key="index"
              target="_blank"
              :href="item"
              style="display: block"
            >
              {{ item }}
            </a>
          </el-dropdown-menu>
        </el-dropdown> -->
      </div>
    </div>
    <div class="shopSet">
      <el-radio-group v-model="videoPlatform"
                      @change="changePlatform"
                      style="margin-bottom: 10px">
        <el-radio-button label="抖音"></el-radio-button>
        <el-radio-button label="最右"></el-radio-button>
      </el-radio-group>
      <!-- <el-button
        style="margin-bottom: 10px; margin-left: 10px"
        class="filter-btn"
        type="primary"
        @click="handleImportVideo(0)"
        :disabled="!multipleSelection.length > 0"
        >导入选中</el-button
      > -->
      <el-table ref="multipNum"
                stripe
                :data="tableListData"
                tooltip-effect="dark"
                style="width: 100%"
                v-loading="loading"
                @sort-change="handleDataSort">
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column prop="post_id"
                         label="post_id"
                         sortable="true"
                         width="100" />
        <el-table-column prop="reply_id"
                         label="reply_id"
                         sortable="true"
                         width="100" />
        <el-table-column prop="video_id"
                         label="video_id"
                         sortable="true"
                         width="110" />
        <el-table-column prop="member_name"
                         label="视频"
                         width="120">
          <template slot-scope="scope">
            <div class="img-div">
              <img class="d-img"
                   :src="getAUrl(scope.row.cover_urls, 0)"
                   alt=""
                   @mouseover="showPlayBtnId = scope.row.id"
                   @mouseleave="showPlayBtnId = ''" />
              <div @click="handleUserInfo(scope.row)"
                   class="del-icon2"
                   v-show="showPlayBtnId == scope.row.id"
                   @mouseover="showPlayBtnId = scope.row.id"
                   @mouseleave="showPlayBtnId = ''">
                <i class="el-icon-caret-right"></i>
              </div>
              <!-- <video
                class="v-img"
                :src="scope.row.urlsrc"
                :poster="getAUrl(scope.row.cover_urls, 0)"
                controls
                @mouseover="videoMouseover(index)"
                @mouseleave="videoMouseleave(index)"
              ></video> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="member_name"
                         label="会员信息">
          <template slot-scope="scope">
            <div class="duio muzhicss">
              <el-image class="ustrimg"
                        :src="scope.row.member_avatar_urls"
                        fit="cover"></el-image>
              <div>
                <div class="bjgt">
                  {{ scope.row.member_name }}（<span v-if="scope.row.member_gender == 0">未知</span>
                  <span v-else-if="scope.row.member_gender == 1">男</span>
                  <span v-else-if="scope.row.member_gender == 2">女</span>/{{
                    scope.row.member_age
                  }}岁）
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="playcnt"
                         label="播放数"
                         sortable="true"
                         width="100" />
        <el-table-column label="视频信息">
          <template slot-scope="scope">
            喜欢:{{ scope.row.likes }} 分享:{{ scope.row.share }} 评论:{{
              scope.row.reviews
            }}
          </template>
        </el-table-column>
        <el-table-column prop="content"
                         label="内容" />
        <el-table-column prop="updated"
                         label="状态"
                         sortable="true">
          <template slot-scope="scope">
            <span v-if="scope.row.updated == 0"
                  style="color: #909399">未导入</span>
            <span v-else-if="scope.row.updated == 1"
                  style="color: #409eff">已导入</span>
            <span v-else-if="scope.row.updated == 2"
                  style="color: #67c23a">已采集</span>
          </template>
        </el-table-column>

        <el-table-column label="创建时间"
                         prop="create_time"
                         sortable>
          <template slot-scope="scope">
            {{ parseTime(scope.row.create_time) }}
          </template>
        </el-table-column>

        <!-- <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleImportVideo(scope.row)"
              >导入</el-button
            >
            <el-button size="mini" @click="handleUserInfo(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
      <div class="pagination">
        <el-pagination :current-page="searchOption.page"
                       :hide-on-single-page="true"
                       @current-change="pageChange"
                       background
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size.sync="searchOption.page_size"
                       @size-change="handlePageSizeChange"
                       layout="sizes,prev, pager, next,jumper"
                       :total="total"></el-pagination>
      </div>
    </div>
    <el-dialog title="视频详情"
               :visible.sync="userInfoDialog">
      <el-card :body-style="{ padding: '0px' }">
        <div style="padding: 10px">
          <el-row>
            <el-col :span="12">
              <div class="duio muzhicss">
                <el-image class="ustrimg"
                          :src="currenItem.member_avatar_urls"
                          fit="cover"></el-image>
                <div>
                  <div class="bjgt">
                    {{ currenItem.member_name }}（<span v-if="currenItem.member_gender == 0">未知</span>
                    <span v-else-if="currenItem.member_gender == 1">男</span>
                    <span v-else-if="currenItem.member_gender == 2">女</span>/{{
                      currenItem.member_age
                    }}岁）
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="text-align: right; color: #909399">
                喜欢:{{ currenItem.likes }} 分享:{{ currenItem.share }} 评论:{{
                  currenItem.reviews
                }}
                播放:{{ currenItem.playcnt }}
              </div>
            </el-col>
          </el-row>
          <div style="margin-top: 20px">{{ currenItem.content }}</div>
        </div>
        <div style="text-align: center">
          <video v-if="userInfoDialog"
                 autoplay
                 height="480"
                 :src="currenItem.urlsrc"
                 :poster="getAUrl(currenItem.cover_urls, 0)"
                 controls></video>
        </div>
      </el-card>
    </el-dialog>
    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
import searchCity from "@/components/citySelectEX/shopSearchCity.vue";
import { parseTime } from "@/utils/index.js";
export default {
  name: "importList",
  components: {
    searchCity,
  },
  data () {
    return {
      videoPlatform: "最右",
      videoPlatformOption: {
        抖音: "/dyimportList",
        最右: "/importList",
      },
      shareText: "",
      showPlayBtnId: null,
      img_urls: [],
      cover_urls: [],
      imgUrl: "",
      imgDialogVisible: false, //是否打开图片框
      albumList: [], //相片列表
      currenItem: {},
      userInfoDialog: false,
      multipleSelection: [], //批量选中
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
      searchOption: {
        sort: "",
        order: "",
        page: 1,
        keyword: "",
        member_gender: null,
        page_size: 10,
      },
      total: 1,
      tableListData: [], //页面表单的内容
      loading: false,
      //排序枚举
      sortableList: {
        ascending: "asc",
        descending: "desc",
        asc: "ascending",
        desc: "descending",
      },
    };
  },
  created () {
    this.iniPageParam();
    this.getTableList();
  },
  watch: {
    $route (to, from) {
      this.iniPageParam();
      this.getTableList();
    },
  },
  methods: {
    parseTime (v) {
      return parseTime(v);
    },
    changePlatform (v) {
      this.$router.push({ path: this.videoPlatformOption[v] });
    },
    getAUrl (urls, index) {
      return urls ? urls.split(",")[index] : "";
    },
    showImg (imgUrl) {
      this.imgUrl = imgUrl;
      this.imgDialogVisible = true;
    },
    searchCity (city) {
      this.searchOption.province_code = city.province_id;
      this.searchOption.city_code = city.city_id;
    },

    /**
     * @description: 初始化页面
     * @return void
     */
    iniPageParam () {
      this.searchOption = {
        sort: this.$route.query.sort,
        order: this.$route.query.order,
        page: this.$route.query.page ? Number(this.$route.query.page) : 1,
        keyword: this.$route.query.keyword
          ? decodeURIComponent(this.$route.query.keyword)
          : "",
        member_gender: this.$route.query.member_gender,
        page_size: this.searchOption.page_size
      };
    },
    /* 表格的排序发生变化 */
    handleDataSort (obj) {
      //console.info(obj)
      this.searchOption.sort = obj.order ? obj.prop : "";
      this.searchOption.order = obj.order ? this.sortableList[obj.order] : "";
      this.searchOption.page = 1;
      this.pageChange();
      //this.getTableList();
    },
    handlePageSizeChange (v) {
      this.pageChange();
    },
    /* 选择表的行 */
    selectItem (val) {
      this.multipleSelection = [];
      val.forEach((item, index) => {
        this.multipleSelection.push(item.id);
      });
    },
    //重置
    resetData () {
      this.searchOption = {
        sort: "",
        order: "",
        page: 1,
        keyword: "",
        gender: null,
      };
      this.pageChange();
    },
    //筛选
    screening () {
      this.searchOption.page = 1;
      this.pageChange();
    },
    /* 获取列表内容 */
    getTableList () {
      let data = Object.assign({}, this.searchOption);
      delete data["province_code"];
      this.loading = true;
      this.api.community
        .importList(data)
        .then((res) => {
          this.loading = false;
          this.tableListData = res.data.data;
          this.total = res.data.count ? res.data.count : 0;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //点击导入按钮
    handleImportVideo (row) {
      if (this.shareText) {
        this.$confirm("确定要导入吗？", "提示")
          .then(() => {
            let datas = {
              kw: this.shareText,
            };
            this.api.community.importAdd(datas).then(({ data }) => {
              this.shareText = "";
              let res = data;
              this.getTableList();
              this.$message({
                message: "" + res.msg,
                type: "success",
              });
            });
          })
          .catch(() => { });
      } else {
        this.$message.error("请输入视频分享内容...");
      }
    },

    /* 改变页数 */
    pageChange (p) {
      if (p) this.searchOption.page = p;
      this.$router.push({
        path: "/importList",
        query: this.searchOption,
      });
    },

    //打开详情
    handleUserInfo (row) {
      this.currenItem = row;
      this.cover_urls = row.cover_urls.split(",");
      this.img_urls = row.img_urls.split(",");
      this.userInfoDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button--primary,
.el-radio-button__inner {
  background-color: #2e2e2e !important;
  border-color: #2e2e2e !important;
}
.ustrimg_big {
  width: 100px;
  height: 100px;
  border-radius: 100px;
}
.ustrimg {
  width: 34px;
  height: 34px;
  border-radius: 100%;
}
.shanxdiv {
  margin-bottom: 10px;
  display: flex;
  .rucwz2 {
    color: #0a0a0a;
  }
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

.img-div {
  width: 102px;
  display: inline-block;
  margin: 0 6px 4px 0;
  position: relative;
  z-index: 0;
  .d-img {
    width: 100px;
    height: 100px;
    display: inline-block;
    border: 1px solid #eeeeee;
    border-radius: 6px;
  }
  .v-img {
    width: 100px;
    height: 100px;
    display: inline-block;
    border: 1px solid #eeeeee;
    border-radius: 6px;
  }
  .del-icon {
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    line-height: 24px;
    text-align: center;
    background: #000;
    opacity: 0.4;
  }
  .del-icon2 {
    background-color: #dcdfe6;
    position: absolute;
    z-index: 2;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    line-height: 24px;
    text-align: center;
    .delete-i {
      font-size: 12px !important;
      color: #ffffff;
      position: relative;
      top: -2px;
      line-height: 24px !important;
    }
  }
}
.imgd-box {
  text-align: center;
}
</style>
