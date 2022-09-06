<template>
  <div>
    <div class="shopSet">
      <div class="duio muzhicss">
        <el-image
          class="ustrimg"
          :src="threadDetail.user.avatar"
          fit="cover"
        ></el-image>
        <div>
          <div class="bjgt">{{ threadDetail.user.nickname }}</div>
          <div class="bjgt">
            ID:{{ threadDetail.user.user_id }}
            <span v-if="threadDetail.user.gender == 0">未知</span>
            <span v-if="threadDetail.user.gender == 1">男</span>
            <span v-if="threadDetail.user.gender == 2">女</span>
            / {{ threadDetail.user.gender }} 岁
          </div>
        </div>
      </div>
      <h2 style="">{{ threadDetail.title }}</h2>
      <div>{{ threadDetail.content }}</div>

      <div style="justify-content: center">
        <div
          style="padding-top: 30px; width: 150px"
          class="videoBox"
          v-for="(item, index) in threadDetail.video"
          :key="'video_' + index"
        >
          <video
            :poster="threadDetail.cover"
            width="150"
            height="150"
            :src="item.file_url"
          ></video>
          <i
            class="playIcon el-icon-video-play"
            @click="playFun(item, index)"
          ></i>
        </div>
      </div>
      <div style="padding-top: 30px">
        <span
          v-for="(item, index) in threadDetail.album"
          :key="'image_' + index"
          @click="showImglist(threadDetail.album, index)"
        >
          <el-image
            fit="fill"
            style="width: 150px; height: 150px; margin-right: 5px"
            :src="item.album_path"
          ></el-image>
        </span>
      </div>

      <div style="padding-top: 30px; color: #909399; font-size: 14px">
        日期：{{ threadDetail.create_time }} 访问量：{{
          threadDetail.view_count
        }}
      </div>
      <div style="padding-top: 10px">
        <el-button size="mini" type="primary" @click="commentDialog">
          评论 {{ threadDetail.comment_count }}</el-button
        >
        <el-button size="mini" type="">
          分享 {{ threadDetail.share_count }}</el-button
        >
        <el-button size="mini" type="">
          点赞 {{ threadDetail.like_count }}</el-button
        >
        <el-button size="mini" type="primary" @click="reportDialog">
          举报 {{ threadDetail.report_count }}</el-button
        >
      </div>
    </div>

    <el-dialog title="视频详情" :visible.sync="videoInfoDialog">
      <el-card :body-style="{ padding: '0px' }">
        <div style="text-align: center">
          <video
            v-if="videoInfoDialog"
            autoplay
            height="480"
            :src="currenVideo.file_url"
            controls
          ></video>
        </div>
      </el-card>
    </el-dialog>

    <el-dialog title="大图预览" :visible.sync="imageInfoDialog" width="50%">
      <template v-if="imageInfoDialog">
        <el-carousel
          :autoplay="false"
          indicator-position="none"
          arrow="always"
          height="600px"
          :initial-index="imgIndex"
        >
          <el-carousel-item v-for="(item, index) in currenImage" :key="index">
            <div class="imgbox">
              <el-image
                style="height: 600px; width: auto"
                fit="contain"
                :src="item.album_path"
              ></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-dialog>
    <go-back />
  </div>
</template>
  
<script>
export default {
  name: "threadlist",
  data() {
    return {
      videoInfoDialog: false, //视频播放框
      imageInfoDialog: false, //图片查看框
      currenVideo: {}, //选中的视频
      currenImage: [], //选中的图片
      imgIndex: 0, //当前展示图片
      thread_id: "",
      threadDetail: {
        thread_id: "",
        user_id: "",
        shop_id: "",
        thread_type: "",
        title: "",
        content: "",
        cover: "",
        cover_weight: "",
        cover_height: "",
        create_time: "",
        last_time: "",
        view_count: "",
        comment_count: "",
        share_count: "",
        like_count: "",
        report_count: "",
        hide_distance: "",
        distance: "",
        province: "",
        city: "",
        area: "",
        address: "",
        is_like: "",
        is_recommend: "",
        is_top: "",
        user: {
          user_id: "",
          nickname: "",
          level: "",
          avatar: "",
          age: "",
          zodiac: "",
          constellation: "",
          signature: "",
          gender: "",
          last_time: "",
          is_follow: "",
          visible: "",
        },
        album: [
          {
            album_id: "",
            album_path: "",
            weight: "",
            height: "",
            album_sort: "",
          },
        ],
      },
    };
  },
  methods: {
    showImglist(rows, index) {
      this.imageInfoDialog = true;
      this.currenImage = rows;
      this.imgIndex = index;
    },
    playFun(row, index) {
      this.currenVideo = row;
      this.videoInfoDialog = true;
    },
    getTreadDetail() {
      let data = {
        thread_id: this.thread_id,
      };
      this.api.community.threaddetail(data).then(({ data }) => {
        let res = data;
        this.threadDetail = res.data;
      });
    },
    checkImage(url) {
      let arr = [];
      arr = url.split(".");
      if (
        arr[arr.length - 1] == "mp4" ||
        arr[arr.length - 1] == "rmvb" ||
        arr[arr.length - 1] == "avi" ||
        arr[arr.length - 1] == "ts"
      ) {
        return true;
      } else {
        return false;
      }
    },
    //跳转评论列表
    commentDialog() {
      /* 把帖子标题数据存入VUEX */
      this.$store.dispatch("updateVuex", {
        key: "title",
        value: this.threadDetail.title,
      });
      this.$router.push({
        path: "/commentlist",
        query: { thread_id: this.threadDetail.thread_id, from: "threadDetail" },
      });
    },
    //跳转举报列表
    reportDialog() {
      this.$router.push({
        path: "/reportList",
        query: {
          scene: 7,
          thread_id: this.threadDetail.thread_id,
          from: "threadDetail",
        },
      });
    },
  },
  created() {
    this.thread_id = this.$route.query.thread_id;
    this.getTreadDetail();
  },
};
</script>
  
<style lang="scss" scoped>
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.videoBox {
  position: relative;
  .playIcon {
    font-size: 26px;
    position: absolute;
    left: 60px;
    top: 60px;
    color: #fff;
  }
}
.shanxdiv {
  display: flex;
}
.shopSet {
  width: 500px;
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
  .el-button--primary {
    color: #fff;
    background-color: #0a0a0a;
    border-color: #0a0a0a;
  }
}
</style>