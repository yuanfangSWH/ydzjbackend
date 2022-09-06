<template>
  <div>
    <el-tabs v-model="picactiveName" type="card" @tab-click="pichandleClick">
      <el-tab-pane label="本地上传" name="first">
        <div v-if="list_shape == 1">
          <uploadFiles
            class="uploadTemp"
            ref="uploadImg"
            @theIMG="parentFun"
            :imageUrl="fileListActive"
            :root="root"
          />
          <div style="color: #999; font-size: 12px; margin-top: 10px">
            (建议尺寸：400x400px，清晰图片)
          </div>
        </div>

        <uploadVideo
          :limit="1"
          @childrenFun="videoFun"
          root="root"
          v-if="list_shape == 2"
        />
      </el-tab-pane>
      <el-tab-pane label="图片库选择" name="second" v-if="list_shape == 1">
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
          <el-button type="warning" plain @click="toPictureStore('pic')"
            >管理图片库</el-button
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
              v-for="item in editableTabs"
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
              fit="contain"
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
      <el-tab-pane label="视频库选择" name="video" v-if="list_shape == 2">
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
          <el-button type="warning" plain @click="toPictureStore('video')"
            >管理视频库</el-button
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
              v-for="item in editableTabs"
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
            >”的视频<span style="color: #ffc069">{{ total }}</span
            >个
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
              fit="contain"
              :src="item.filepath"
            ></el-image>
            <div class="mcNav"></div>
            <div class="mctext">
              <span
                @click="
                  chooseVideo(item.video_id, item.video_url, item.filepath)
                "
                >选用</span
              >
            </div>
          </div>
        </div>
        <div class="imgBox" v-else>
          <span class="nonespan">-- 暂无视频 --</span>
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
import uploadVideo from "@/components/uploadFiles/mediaVideoUpload";
export default {
  name: "addGoodsComponent",
  components: { uploadFiles, uploadVideo },
  props: {
    root: {
      type: String,
      default: "news",
    },
  },
  data() {
    return {
      picactiveName: "first",
      editableTabs: [{ class_id: "", name: "全部" }],
      count: 0,
      editableTabsValue: "",
      class_id: "",
      keyword: "",
      curPage: 1,
      total: 0,
      tableListData: [],
      fileListActive: "",
      localPath: "",
      searchStatus: false,
      hoverIndex: -1,
      image: "",
      type: 1,
      list_shape: 1,
    };
  },
  created() {
    this.getBumeng(1);
  },
  methods: {
    concert(data) {
      this.picactiveName = "first";
      this.list_shape = data;
      if (data == 1) {
        //初始化图片
        setTimeout(() => {
          this.$refs.uploadImg.concert("");
        }, 0);
      }
    },
    parentFun(url, n, localPath, file, imageInfo) {
      this.$emit(
        "childImg",
        this.setOssUrl(url),
        localPath,
        1,
        file,
        imageInfo
      );
      this.fileListActive = url;
    },
    videoFun(obj) {
      this.$message({
        message: "视频上传完成，请到视频列表中选取视频。",
        type: "success",
      });
    },
    pichandleClick(tab) {
      switch (tab.name) {
        case "first":
          this.type = 1;
          break;
        case "second":
          this.type = 1;
          this.getTableList();
          break;
        case "video":
          this.type = 2;
          this.getTableList();
          break;
      }
    },
    pageChange(val) {
      this.curPage = val;
      this.getTableList();
      // this.dataFun()
    },
    //获取图库分类数据
    getBumeng(key) {
      this.api.zhixun.Listclass().then((res) => {
        this.editableTabs = this.editableTabs.concat(res.data.data);
        //this.class_id = res.data.data[0].class_id;
        // this.addItem.class_id = res.data.data[0].class_id;
        if (key == 1) {
          this.getTableList();
        }
      });
    },
    /* 获取列表内容 */
    getTableList() {
      var data = {
        //关键字
        keyword: this.keyword,
        //分类ID
        class_id: this.class_id,
        //1图片 2视频
        type: this.type,
        //分页
        page: this.curPage,
      };
      if (this.class_id == "") {
        delete data.class_id;
      }
      this.api.zhixun.Listmedia(data).then((res) => {
        this.tableListData = res.data.data;
        this.total = res.data.count ? res.data.count : 0;
      });
    },
    classTabs(tab) {
      this.class_id = Number(tab.name);
      this.getTableList();
    },
    chooseImg(id, filepath) {
      this.$emit("childImg", filepath, "", 0, "", id);
    },
    chooseVideo(id, url, filepath) {
      this.$emit("childImg", url, filepath, id);
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
    toPictureStore(t) {
      // this.$router.push('/pictureStroe')
      let routeData = this.$router.resolve({
        path: "/news/mediaStroe",
        query: { type: t },
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
