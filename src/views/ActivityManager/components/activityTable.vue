<template>
  <div>
    <!-- @filter-change="filterTagTable" -->
    <el-table ref="multipleTable"
              :data="dataOptions"
              stripe
              style="width: 100%"
              @selection-change="handleSelectionChange"
              @sort-change="sortFilterFun">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column prop="activity_id"
                       label="ID"
                       width="60"
                       sortable="custom">
      </el-table-column>
      <el-table-column prop="name"
                       label="活动名称"
                       width="180">
      </el-table-column>
      <el-table-column prop=""
                       label="活动时间"
                       width="180">
        <template slot-scope="scope">
          <!-- <el-image :src="scope.row.icon_active"></el-image> -->
          <p>{{scope.row.start_time}}-{{scope.row.end_time}}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="is_delete==0"
                       prop="layer_pos"
                       label="弹窗位置"
                       width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.layer_pos == 'index'">首页</span>
          <span v-if="scope.row.layer_pos == 'news'">发现</span>
          <span v-if="scope.row.layer_pos == 'message'">消息</span>
          <span v-if="scope.row.layer_pos == 'my'">我的</span>
        </template>
      </el-table-column>
      <el-table-column prop="example_image"
                       :label="is_delete==0?'弹窗图片':'首页弹窗位置'"
                       width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.layer_img">
            <el-image style="width: 100px; height: 100px"
                      :src="scope.row.layer_img"
                      @click="showImglist(scope.row.layer_img)">
            </el-image>
          </template>
          <template v-else>
            <p style="text-align: center;width: 100px;">——</p>
          </template>
        </template>
      </el-table-column>
      <!-- <el-table-column
                prop="create_time"
                label="创建时间"
                width="200"
                sortable="custom">
            </el-table-column>
            <el-table-column
                prop="end_time"
                label="结束时间"
                width="200"
                sortable="custom">
            </el-table-column> -->
      <!-- <el-table-column
                prop="content"
                label="活动介绍"
                width="200">
            </el-table-column> -->
      <!-- <el-table-column
                prop=""
                label="活动奖励"
                width="120"
                sortable="custom">
                <template slot-scope="scope">
                    2000元免单金额
                </template>
            </el-table-column> -->
      <el-table-column prop="url"
                       label="限定地区"
                       width="180">
        <template slot-scope="scope">
          <p>{{scope.row.province?scope.row.city?scope.row.area?scope.row.province +'-'+ scope.row.city+'-'+ scope.row.area:scope.row.province +'-'+ scope.row.city:scope.row.province :'全部'}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="url"
                       label="活动链接"
                       width="180">
        <template slot-scope="scope">
          <!-- <el-image :src="scope.row.icon_active"></el-image> -->
          <a :href="scope.row.url"
             target="_blank">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <!-- <el-table-column
                prop="long_img"
                label="长图介绍"
                width="120">
                <template slot-scope="scope">
                    <div style="display: flex; align-items: center" v-if="scope.row.long_img">
                        <div>
                        <span @click="showImglist(scope.row.long_img)">
                            <el-image style="width: 76px; height: 76px; margin-left: 10px"
                                    fit="cover"
                                    :src="scope.row.long_img"></el-image>
                        </span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="video_url"
                label="视频介绍"
                width="120">
                <template slot-scope="scope">
                    <div class="videoBox"
                        v-if="scope.row.video_url"
                        @click="playFun(scope.row, scope.$index)">
                      <video
                            width="150"
                            height="150"
                            :src="scope.row.video_url"></video>
                      <i class="playIcon el-icon-video-play"></i>
                    </div>
                </template> -->
      </el-table-column>
      <el-table-column v-if="is_delete==0"
                       prop="status"
                       label="状态">
        <!-- :filter-multiple="false"
                :filters="statusArr"
                filter-placement="bottom-end"
                :column-key=" 'status' " -->
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">未开始</span>
          <span v-if="scope.row.status == 2">进行中</span>
          <span v-if="scope.row.status == 3">已结束</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       align='right'>
        <template slot-scope="scope">
          <el-button v-if="is_delete != 1 && scope.row.status != 1"
                     @click="handleClick(scope.row)"
                     type="text"
                     size="small">编辑</el-button>
          <el-button v-if="scope.row.status == 2||scope.row.status == 3&&is_delete!=1"
                     @click="delClick(scope.row)"
                     type="text"
                     size="small">删除</el-button>

          <el-button v-if="is_delete == 1"
                     @click="restoreFun(scope.row)"
                     type="text"
                     size="small">上架</el-button>
          <el-button v-if="is_delete == 1 || scope.row.status == 1"
                     @click="editFun(scope.row)"
                     type="text"
                     size="small">编辑</el-button>
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
                     height="600px">
          <el-carousel-item>
            <div class="imgbox">
              <el-image style="height: 600px; width: auto"
                        fit="contain"
                        :src="picData"></el-image>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-dialog>
    <el-dialog v-if="videoData"
               :title="videoData.name"
               :visible.sync="dialogVisibleVideo"
               :before-close="handleClose"
               width="50%">
      <div id="v-box"
           style="width: 80%; margin: 0 auto; display: flex; align-items: center">
        <video :id="'videos' + videoIndex"
               class="videoHeight"
               :poster="videoData.cover"
               controls="controls"
               loop="loop"
               width="100%"
               :src="videoData.video_url"></video>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    dataOptions: Array,
    status: Number,
    is_delete: Number,
  },
  data () {
    return {
      multipleSelection: [],
      nameArr: [],
      statusArr: [{ text: '隐藏', value: '0' }, { text: '显示', value: '1' }],
      sortVal: '',
      sortStatus: false,
      order: 'desc',
      dialogVisible: false,
      imgIndex: 0,
      picData: '',
      dialogVisibleVideo: false,
      videoData: "",
      videoIndex: 0,
    }
  },
  methods: {
    showImglist (row) {
      this.picData = row
      this.dialogVisible = true
    },
    playFun (row, index) {
      console.log(index);
      this.videoData = row;
      this.videoIndex = index;
      this.dialogVisibleVideo = true;
      setTimeout(() => {
        this.itemPlay(index);
      });
    },
    itemPlay (index) {
      var ele = document.getElementById(`videos${index}`);
      // ele.setAttribute("class", "videoHeight");
      var h1 = document.body.clientHeight;
      var box = document.getElementById("v-box");
      box.style.height = h1 - 400 + "px";
      ele.play();
    },
    handleClose () {
      var ele = document.getElementById(`videos${this.videoIndex}`);
      ele.pause();
      this.dialogVisibleVideo = false;
    },
    showImglist (row, index) {
      this.dialogVisible = true;
      this.picData = row;
    },
    handleSelectionChange (val) {
      var arr = []
      this.nameArr = []
      for (var i = 0; i < val.length; i++) {
        arr.push(val[i].activity_id)
        this.nameArr.push(val[i].name)
      }
      this.multipleSelection = arr
      // arr = Array.from(new Set(arr))
      this.nameArr = Array.from(new Set(this.nameArr))
      // this.multipleSelection = arr.join(',')
      this.$emit('childrenFun', this.multipleSelection, this.nameArr, 5)
    },
    //table筛选
    filterTagTable (filters) {
      // console.log(filters)
      this.filterMethod(filters)
    },
    //table筛选
    filterMethod (val) {
      var key = []
      var value = []
      for (var i in val) {
        key.push(i)
        value.push(val[i])
      }
      key = key.join(',')
      value = value.join(',')
      this.$emit('childrenFun', key, value, 1)
    },
    //table排序
    sortMethod (val) {
      this.sortVal = val
      this.sortStatus = !this.sortStatus
      if (this.sortStatus) {
        this.order = 'asc'//正序
      } else {
        this.order = 'desc'//倒序
      }
      //接口逻辑
      this.$emit('childrenFun', this.sortVal, this.order, 2)
    },
    //table排序
    sortFilterFun (column) {
      this.sortMethod(column.prop)
    },
    handleClick (row) {
      this.$emit('childrenFun', row.activity_id, '', 7)
    },
    delClick (row) {
      this.$emit('childrenFun', row.activity_id, row.name, 4)
    },
    restoreFun (row) {
      this.$emit('childrenFun', row.activity_id, '', 6)
    },
    editFun (row) {
      this.$emit('childrenFun', row.activity_id, '', 7)
    }
  }
}
</script>

<style scoped>
.imgbox {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.videoHeight {
  max-height: 100%;
}
.videoBox {
  position: relative;
}
.playIcon {
  font-size: 26px;
  position: absolute;
  left: 60px;
  top: 60px;
  color: #fff;
}
</style>