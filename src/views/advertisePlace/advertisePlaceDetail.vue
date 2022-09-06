<template>
  <div class="advertisePlaceDetail">
    <p style="padding: 20px;">
      <span style="font-size:24px">详情</span>
      <el-button style="float:right;width: 120px;"
                 type="primary"
                 @click="()=>{this.$emit('handleCloseDetailVisible')}">返回</el-button>
    </p>
    <ul>
      <li><span>广告名称</span><span>{{adPlaceInfo.name}}</span></li>
      <li><span>别名</span><span>{{adPlaceInfo.name}}</span></li>
      <li style="overflow: hidden;width: 248px;"><span>示例图</span>
        <el-image style="width:148px;height:148px;float:right"
                  :src="adPlaceInfo.example_image"></el-image>
      </li>
      <li><span>投放平台</span><span>{{adPlaceInfo.platform | showPlatformText}}</span></li>
      <li><span>描述</span><span>{{adPlaceInfo.description}}</span></li>
      <li><span>状态</span><span>{{adPlaceInfo.status | showstatusText}}</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'advertisePlaceDetail',
  data () {
    return {
      adPlaceInfo: {},
    }
  },
  created () {
    this.getAdPlaceDetail()
  },
  props: {
    id: {
      required: true
    }
  },
  filters: {
    showPlatformText (val) {
      const platformList = [
        { label: '全平台', value: 0 },
        { label: 'android', value: 1 },
        { label: 'ios', value: 2 },
        { label: '小程序', value: 3 },
      ]
      return platformList.find((item) => item.value == val) ? platformList.find((item) => item.value == val).label : '无'
    },
    showstatusText (val) {
      const statusList = [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
      return statusList.find((item) => item.value == val) ? statusList.find((item) => item.value == val).label : '无'
    }
  },
  methods: {
    getAdPlaceDetail () {
      this.api.advertisePlace.adPlaceDetail({ pos_id: this.id }).then(res => {
        this.adPlaceInfo = res.data.data
      })
    }
  }
}
</script>

<style lang="scss">
.advertisePlaceDetail {
  background-color: #fff;
  margin: 20px;
  padding-bottom: 20px;
  ul {
    li {
      span:first-child {
        display: inline-block;
        width: 80px;
        text-align: right;
        margin-right: 20px;
      }
    }
    li:nth-child(n + 1) {
      margin-top: 30px;
    }
  }
}
</style>