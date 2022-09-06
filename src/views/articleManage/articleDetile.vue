<template>
  <div class="articleDetile">
    <div class="title">
      <el-image style="width: 100px; height: 100px"
                :src="articleDetile.image"></el-image>
      <div class="titleName">
        <p>{{articleDetile.title}}</p>
        <p><span>{{articleDetile.create_time}}</span><span>{{articleDetile.ClassName}}</span></p>
      </div>
    </div>
    <div class="content">
      <!-- {{articleDetile.content}} -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleDetile',
  data () {
    return {
      articleDetile: {}
    }
  },
  created () {
    let id = this.$route.query.id;
    this.getArticleDetile(id);
  },
  methods: {
    getArticleDetile (id) {
      this.api.articleManage.articleDetail({ id }).then(res => {
        this.articleDetile = res.data.data
        document.getElementsByClassName('content')[0].innerHTML = this.articleDetile.content
      })
    }
  }
}
</script>

<style lang="scss">
.articleDetile {
  background-color: #fff;
  margin: 20px;
  padding: 20px 20px 40px;
  height: 100%;
  .title {
    display: flex;
    font-size: 24px;
    .titleName {
      margin-left: 20px;
      p {
        margin: 0;
      }
      p:first-child {
        margin-top: 12px;
      }
      p:last-child {
        color: #bbb;
        font-size: 15px;
        margin-top: 30px;
      }
    }
  }
  .content {
    margin-top: 20px;
    background-color: #eee;
    padding-top: 10px;
    height: 300px;
    p {
      margin: 0;
    }
  }
}
</style>