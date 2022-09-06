<template>
  <div class="">
    <div class="shopSet">
      <div class="pageTitle">{{ this._getVuex("pageTitle") }}</div>
      <div class="shanxdiv">
        <div class="rucwz2">性别</div>
        <el-select v-model="searchOption.gender"
                   placeholder="请选择">
          <el-option label="男"
                     :value="1"></el-option>
          <el-option label="女"
                     :value="2"></el-option>
          <el-option label="忽略"
                     :value="''"></el-option>
        </el-select>
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
        <div class="rucwz2">城市</div>
        <searchCity ref="searchCity"
                    @setCityAreaName="searchCity" />

        <el-button class="filter-btn"
                   type="primary"
                   @click="screening"
                   style="margin-left: 10px">筛选</el-button>
        <el-button class="filter-btn"
                   type="primary"
                   @click="resetData">清空条件</el-button>
      </div>
    </div>
    <div class="shopSet">
      <el-button style="margin-bottom: 10px"
                 class="filter-btn"
                 type="primary"
                 @click="handleImportUser(0)"
                 :disabled="!multipleSelection.length > 0">导入选中</el-button>
      <el-table ref="multipNum"
                stripe
                :data="tableListData"
                tooltip-effect="dark"
                style="width: 100%"
                v-loading="loading"
                @sort-change="handleDataSort"
                @selection-change="selectItem">
        <el-table-column type="selection"
                         width="55" />
        <el-table-column prop="id"
                         label="ID"
                         sortable="true"
                         width="100" />
        <el-table-column prop="nickname"
                         label="用户"
                         width="220">
          <template slot-scope="scope">
            <div class="duio muzhicss"
                 @click="handleUserInfo(scope.row)">
              <el-image class="ustrimg"
                        :src="scope.row.avatar"
                        fit="cover"></el-image>
              <div>
                <div class="bjgt">
                  {{ scope.row.nickname }}（<span v-if="scope.row.gender == 0">未知</span>
                  <span v-else-if="scope.row.gender == 1">男</span>
                  <span v-else-if="scope.row.gender == 2">女</span>/{{
                    scope.row.age
                  }}岁）
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sign"
                         label="签名" />
        <el-table-column prop="tag"
                         label="标签" />
        <el-table-column prop="category"
                         label="类别" />
        <el-table-column prop="province"
                         label="省" />
        <el-table-column prop="city"
                         label="城市"
                         sortable="true">
          <template slot-scope="scope">
            {{ scope.row.city }}
          </template>
        </el-table-column>
        <el-table-column prop="area"
                         label="区域"
                         sortable="true">
          <template slot-scope="scope">
            {{ scope.row.area }}
          </template>
        </el-table-column>
        <el-table-column prop="album_num"
                         label="照片数"
                         sortable="true" />
        <el-table-column prop="updated"
                         label="状态"
                         width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.updated == 0"
                  style="color: #909399">未导入</span>
            <span v-if="scope.row.updated == 1"
                  style="color: #409eff">已导入</span>
            <span v-if="scope.row.updated == 2"
                  style="color: #67c23a">已采集</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         fixed="right">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleImportUser(scope.row)">导入</el-button>
            <el-button size="mini"
                       @click="handleUserInfo(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination :current-page="searchOption.page"
                       :hide-on-single-page="true"
                       @current-change="pageChange"
                       background
                       layout="prev, pager, next"
                       :total="total"></el-pagination>
      </div>
    </div>
    <el-dialog title="用户详情"
               :visible.sync="userInfoDialog">
      <el-form :model="currenItem"
               ref="multiUpdate"
               label-width="240px"
               class="updateArea">
        <el-image class="ustrimg_big"
                  :src="currenItem.avatar"
                  style="position: absolute"></el-image>
        <el-form-item label="昵称">
          <span>{{ currenItem.nickname }}</span>
        </el-form-item>
        <el-form-item label="性别">
          <span v-if="currenItem.gender == 0">未知</span>
          <span v-if="currenItem.gender == 1">男</span>
          <span v-if="currenItem.gender == 2">女</span>
        </el-form-item>
        <el-form-item label="年龄">
          <span>{{ currenItem.age }}</span>
        </el-form-item>
        <el-form-item label="所在地区">
          <span>{{ currenItem.province }}</span>
          <span>{{ currenItem.city }}</span>
          <span>{{ currenItem.area }}</span>
        </el-form-item>
        <el-form-item label="生日">
          <span>{{ currenItem.birthday }}</span>
        </el-form-item>
        <el-form-item label="签名">
          <span>{{ currenItem.sign }}</span>
        </el-form-item>
        <el-form-item label="标签">
          <span>{{ currenItem.tag }}</span>
        </el-form-item>
        <!-- <el-form-item label="喜欢">
          <span>{{ currenItem.love }}</span>
        </el-form-item>
        <el-form-item label="讨厌">
          <span>{{ currenItem.hate }}</span>
        </el-form-item> -->
        <el-form-item label="照片">
          <div>照片数：{{ currenItem.album_num }}</div>
          <div>
            <div class="img-div"
                 v-for="(item, index) in albumList"
                 :key="index">
              <el-image :src="item"
                        class="d-img"
                        @click="showImg(item)"></el-image>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="位置">
          <div>经度：{{ currenItem.lng }} 纬度：{{ currenItem.lat }}</div>
          <el-image :src="
              'https://restapi.amap.com/v3/staticmap?location=' +
              currenItem.lng +
              ',' +
              currenItem.lat +
              '&zoom=11&size=750*320&markers=mid,,:' +
              currenItem.lng +
              ',' +
              currenItem.lat +
              '&key=ec089479f41e213eb5167410a7be396e'
            ">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="图片预览"
               :visible.sync="imgDialogVisible"
               width="50%">
      <div class="imgd-box">
        <el-image style="height: 50%"
                  :src="imgUrl"
                  fit="contain"></el-image>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="imgDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="imgDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import searchCity from "@/components/citySelectEX/shopSearchCity.vue";
export default {
  name: "UserImport",
  components: {
    searchCity,
  },
  data () {
    return {
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
        //article_id: 0,
        sort: "",
        order: "",
        page: 1,
        city_code: "",
        province_code: "",
        //nicknam: "",
        gender: null,
        //min_age: null,
        //max_age: null,
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
    showImg (imgUrl) {
      this.imgUrl = imgUrl;
      this.imgDialogVisible = true;
    },
    searchCity (city) {
      this.searchOption.province_code = city.province_id;
      this.searchOption.city_code = city.city_id;
    },
    iniPageParam () {
      this.searchOption = {
        sort: this.$route.query.sort,
        order: this.$route.query.order,
        page: this.$route.query.page ? Number(this.$route.query.page) : 1,
        province_code: this.$route.query.province_code,
        city_code: this.$route.query.city_code,

        // nickname: this.$route.query.nickname
        //   ? decodeURIComponent(this.$route.query.nickname)
        //   : "",
        //min_age: this.$route.query.min_age,
        //max_age: this.$route.query.max_age,
        gender: this.$route.query.gender,
      };
      setTimeout(() => {
        this.$refs.searchCity.getProvince(
          this.searchOption.province_code,
          this.searchOption.city_code
        );
      });
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
        //article_id: 0,
        sort: "",
        order: "",
        page: 1,
        city_code: "",
        province_code: "",
        //nicknam: "",
        gender: null,
        //min_age: null,
        //max_age: null,
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
      this.api.user
        .UserImportList(data)
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
    handleImportUser (row) {
      let datas = {
        id: [],
        updated: 1,
      };
      if (row == 0) {
        datas.id = this.multipleSelection;
      } else {
        let obj = Object.assign({}, row);
        datas.id = [obj.id];
      }
      this.$confirm("确定要导入吗？", "提示")
        .then(() => {
          this.api.user.UserImportAdd(datas).then(({ data }) => {
            let res = data;
            this.multipleSelection = [];
            this.$refs["multipNum"].clearSelection();
            this.getTableList();
            this.$message({
              message: "" + res.msg,
              type: "success",
            });
          });
        })
        .catch(() => { });
    },

    /* 改变页数 */
    pageChange (p) {
      if (p) this.searchOption.page = p;
      this.$router.push({
        path: "/UserImport",
        query: this.searchOption,
      });
    },

    //打开详情
    handleUserInfo (row) {
      this.currenItem = row;
      this.albumList = row.album.split(",");
      this.userInfoDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button--primary {
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
