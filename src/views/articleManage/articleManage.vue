<template>
  <div class="articleManage">
    <div>
      <p class="title">{{title}}</p>
      <div class="searchBar">
        <el-input :value="params.keyword"
                  v-model="params.keyword"
                  width="240"
                  :maxlength="40"
                  placeholder="请输入文章标题"></el-input>
        <el-button style="margin-left:10px"
                   @click="getArticleList">筛选</el-button>
        <el-button style="margin-left:10px"
                   @click="getArticleList">重置</el-button>
        <el-button style="float:right"
                   @click="toArticleOperation(null)">新增文章</el-button>
      </div>
      <el-table :data="articleList"
                stripe
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @sort-change="sortFilterFun"
                @filter-change="filterTagTable">
        <el-table-column prop="title"
                         label="标题"
                         width="180">
          <template slot-scope="scope">
            <div style="cursor: pointer;"
                 class="oneline"
                 @click="toDetail(scope.row)">{{scope.row.title}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="image"
                         label="图标"
                         width="180">
          <template slot-scope="scope">
            <el-image :src="scope.row.image"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="ClassName"
                         label="类别"
                         width="180">
        </el-table-column>
        <el-table-column prop="content"
                         label="内容"
                         width="180">
          <template slot-scope="scope">
            <div class="content"
                 v-html="scope.row.content"></div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time"
                         label="创作时间"
                         sortable="custom"
                         width="180">
        </el-table-column>
        <el-table-column prop="modify_time"
                         label="修改时间"
                         width="180">
        </el-table-column>
        <el-table-column prop="url"
                         label="文章链接"
                         width="180">
          <template slot-scope="scope">
            <a class="oneline"
               :href="scope.row.url">{{scope.row.url}}</a>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="status"
                         label="状态"
                         width="180">
          <template slot-scope="scope">
            <div class="oneline">{{scope.row.status | showStatus}}</div>
          </template>
        </el-table-column> -->
        <el-table-column prop="status"
                         label="状态"
                         :filter-multiple="false"
                         :filters="statusArr"
                         filter-placement="bottom-end"
                         :column-key=" 'status' ">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">禁用</span>
            <span v-if="scope.row.status == 1">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- <template slot="header" slot-scope="scope">
          <el-input v-model="search" class="search" size="mini" placeholder="输入关键字搜索" :data-str="scope" />
        </template>-->
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="toArticleOperation(scope.row.article_id)">修改</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="delArticle(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagebox">
        <el-pagination background
                       layout="prev, pager, next"
                       :total="params.count"
                       :current-page='params.page'
                       @current-change="pageChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleManage',
  data () {
    return {
      articleList: [],
      title: '文章列表',
      params: {
        keyword: '',
        sort: '',
        page: 1,
        page_size: 10,
        count: 0,
        status: undefined
      },
      statusArr: [{ text: '禁用', value: '0' }, { text: '启用', value: '1' }],
    }
  },
  filters: {
    showStatus (val) {
      return val ? '启用' : '禁用'
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    // 重置
    reset () {
      this.params = {
        keyword: '',
        sort: '',
        page: 1,
        page_size: 10,
        count: 0,
        status: undefined
      }
      console.log(this.params);
      this.getArticleList()
    },
    // 获取列表
    getArticleList () {
      this.api.articleManage.articleList(this.params).then(res => {
        this.params.count = res.data.count
        this.articleList = JSON.parse(JSON.stringify(res.data.data))
        // JSON.parse(JSON.stringify(res.data.data)).forEach((item, index) => {
        //   this.$set(this.articleList, index, item)
        // });
      })
    },
    // 查看文章详情
    toDetail (item) {
      this.$router.push({ path: "/articleDetile", query: { id: item.article_id } })
    },
    // 删除文章
    delArticle (item) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = { id: [item.article_id] }
        this.api.articleManage.delArticle(data).then(res => {
          // console.log(res);
          this.init()
          this.$message.success('删除成功！')
        })
      })
    },
    // 分页
    pageChange (val) {
      this.params.page = val
      this.getArticleList()
    },
    // 文章操作
    toArticleOperation (id = null) {
      this.$router.push({ path: "/articleOperation", query: { id } })
    },
    // 状态筛选
    handleSelectionChange () {
      console.log(111);
    },
    //table筛选
    filterTagTable (filters) {
      console.log(filters);
      this.params.status = filters.status[0]
      this.getArticleList()
    },
    //table排序
    sortFilterFun (column) {
      console.log(column);
      this.params.sort = column.prop
      this.getArticleList()
      // this.sortMethod(column.prop)
    },
  }
}
</script>

<style lang="scss">
.articleManage {
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
}
.articleManage > div {
  background-color: #fff;
  margin: 20px;
  padding: 20px 20px 0;
}
</style>