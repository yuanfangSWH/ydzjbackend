<template>
  <div>
    <el-tabs v-model="picactiveName" type="card" @tab-click="pichandleClick">
      <el-tab-pane label="本地上传" name="first">
        <uploadFiles
          class="uploadTemp"
          @theIMG="parentFun"
          :imageUrl="fileListActive"
          :root="root"
        />
        <div style="color: #999; font-size: 12px; margin-top: 10px">
          (建议尺寸：400x400px，清晰图片)
        </div>
      </el-tab-pane>
      <el-tab-pane label="图库选择" name="second">
        <div class="tuku-nav1">
          <div class="tk01">
            <el-input
              class="soipt"
              type="text"
              placeholder="搜索关键字"
              v-model="keyword"
              clearable
              @clear="iptClear"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchFun"
              ></el-button>
            </el-input>
          </div>
          <el-button type="warning" plain @click="toPictureStore"
            >管理图库</el-button
          >
        </div>
        <div v-if="!searchStatus">
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            @tab-click="classTabs"
          >
            <!-- @tab-remove="removeTab" -->
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.class_id"
              :label="item.name"
              :name="String(item.class_id)"
            >
              {{ item.content }}
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-else>
          <div style="color: #bfbfbf; margin-bottom: 10px">
            找到“<span style="color: #ffc069">{{ keyword }}</span
            >”的图片<span style="color: #ffc069">{{ total }}</span
            >张
          </div>
        </div>
        <div class="imgBox" v-if="total">
          <div
            class="imgNav"
            v-for="(item, index) in tableListData"
            :key="index"
            :class="{ 'link-item-hover': index == hoverIndex }"
            @mouseover="hoverIndex = index"
            @mouseout="hoverIndex = -1"
          >
            <el-image
              class="tk-img"
              fit="cover"
              :src="item.filepath"
            ></el-image>
            <div class="mcNav"></div>
            <div class="mctext">
              <span @click="chooseImg(item.media_id, item.filepath)">选用</span>
            </div>
          </div>
        </div>
        <div class="imgBox" v-else>
          <span class="nonespan">-- 暂无图片 --</span>
        </div>
        <div class="pagebox">
          <el-pagination
            v-if="total"
            :hide-on-single-page="true"
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="curPage"
            @current-change="pageChange"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import uploadFiles from "@/components/uploadFiles";
export default {
  name: "addGoodsComponent",
  components: { uploadFiles },
  props: {
    root: {
      type: String,
      default: "goods_media",
    },
  },
  data() {
    return {
      picactiveName: "first",
      editableTabs: [],
      count: 0,
      editableTabsValue: "1",
      class_id: "",
      keyword: "",
      curPage: 1,
      total: 0,
      tableListData: "",
      fileListActive: "",
      localPath: "",
      searchStatus: false,
      hoverIndex: -1,
      image: "",
    };
  },
  created() {
    this.getBumeng(1);
  },
  methods: {
    parentFun(url, n, localPath) {
      this.$emit("childImg", this.setOssUrl(url), localPath, 1);
      this.fileListActive = url;
    },
    pichandleClick(tab, event) {
      console.log(tab.name, event);
    },
    pageChange(val) {
      this.curPage = val;
      this.getTableList();
    },
    //获取图库分类数据
    getBumeng(key) {
      let data = {
        page: 1,
        page_size: 10000,
      };
      this.api.mediagoods.goodsListClass(data).then((res) => {
        this.editableTabs = res.data.data;
        this.editableTabsValue = String(res.data.data[0].class_id);
        console.log(this.editableTabsValue);
        this.class_id = res.data.data[0].class_id;
        // this.addItem.class_id = res.data.data[0].class_id;
        if (key == 1) {
          this.getTableList();
        }
      });
    },
    /* 获取列表内容 */
    getTableList() {
      var data = {
        keyword: this.keyword,
        class_id: this.class_id,
        page: this.curPage,
      };
      if (this.class_id == "") {
        delete data.class_id;
      }
      this.api.mediagoods.pictureList(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    classTabs(tab) {
      this.class_id = Number(tab.name);
      this.getTableList();
    },
    chooseImg(media_id, filepath) {
      this.$emit("childImg", filepath, "", 0);
    },
    searchFun() {
      this.curPage = 1;
      this.class_id = "";
      this.getTableList();
      this.searchStatus = true;
    },
    iptClear() {
      this.searchStatus = false;
      this.curPage = 1;
      this.class_id = this.editableTabs[0].class_id;
      this.getTableList();
    },
    toPictureStore() {
      // this.$router.push('/pictureStroe')
      let routeData = this.$router.resolve({
        path: "/pictureStroe",
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>

<style scoped>
.nonespan {
  width: 100%;
  text-align: center;
  display: inline-block;
  margin-top: 20px;
  color: #999;
}
.addPic {
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  background: #fafafa;
  cursor: pointer;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 28px;
}
.addicon {
  font-size: 28px;
  margin-top: 20px;
}
.tuku-nav1 {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.tk01 {
  flex: 1;
  margin-right: 100px;
}
.soipt {
  width: 380px;
}
.imgBox {
  width: 100%;
}
.imgNav {
  width: 120px;
  height: 120px;
  position: relative;
  float: left;
  margin: 0 8px 8px 0;
}
.tk-img {
  width: 120px;
  height: 120px;
}
.mcNav {
  display: none;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 2;
  background: rgba(255, 255, 255, 0.5);
  width: 120px;
  height: 30px;
}
.mctext {
  display: none;
  position: absolute;
  left: 0;
  bottom: 5px;
  z-index: 3;
  width: 120px;
  text-align: center;
}
.mctext span {
  cursor: pointer;
  width: 60px;
  height: 20px;
  line-height: 20px;
  background: #ffffff;
  border-radius: 2px;
  font-size: 12px;
  color: #0a0a0a;
  display: inline-block;
}
.link-item-hover .mcNav,
.link-item-hover .mctext {
  display: inline-block;
}
.pagebox {
  width: 100%;
  display: inline-block;
  text-align: center;
  margin-top: 10px;
}
</style>
