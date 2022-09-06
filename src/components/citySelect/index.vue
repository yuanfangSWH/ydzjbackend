<template>
  <div class="citySelect">
    <el-dialog
      :title="title"
      :visible.sync="showCitySelect"
      width="30%"
      :before-close="handleClose"
    >
      <el-card class="box-card ">
        <div class="selectBox">
          <span>省份：</span><el-select ref="city1" v-model="getcity1" focus filterable placeholder="请选择" class="text item">
            <el-option
              v-for="item in level1City"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
              <div @click="getCity(item,1)">{{ item.name }}</div>
            </el-option>
          </el-select>
        </div>
        <div class="selectBox">
          <span>城市：</span><el-select ref="city2" v-model="getcity2" filterable placeholder="请选择" class="text item">
            <el-option
              v-for="item in level2City"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
              <div @click="getCity(item,2)">{{ item.name }}</div>
            </el-option>
          </el-select>
        </div>
        <div class="selectBox">
          <span>区域：</span><el-select ref="city3" v-model="getcity3" filterable placeholder="请选择" class="text item">
            <el-option
              v-for="item in level3City"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
              <div @click="getCity(item,3)">{{ item.name }}</div>
            </el-option>
          </el-select>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '城市选择'
    }
  },
  data() {
    return {
      curtitle: this.title,
      direction: 'btt',
      defaultData: {
        id: '00000',
        name: ''
      },
      level1City: [],
      level2City: [],
      level3City: [],
      getcity1: '',
      getcity2: '',
      getcity3: '',
      city1: '',
      city2: '',
      city3: ''
    }
  },
  computed: {
    showCitySelect() {
      return this._getVuex('showCitySelectBox')
    }
  },
  created() {
    this.getCity(this.defaultData, 0)
  },
  methods: {
    handleClose(done) {
      this._setVuex('showCitySelectBox', false)
    },
    // 获取一级城市列表
    getCity(item, type) {
      const params = item.id
      if (type !== 3) {
        this.$store.dispatch('shop/getCitySelectList', params).then((res) => {
          if (type === 0) {
            this.level1City = res.data
            this.level2City = []
          } else if (type === 1) {
            this.level2City = res.data
            this.level3City = []
            this.city1 = item
            this.$refs.city2.focus()
          } else if (type === 2) {
            this.level3City = res.data
            this.city2 = item
            this.$refs.city3.focus()
          }
        })
      } else {
        this.city3 = item
        // const cityArea = this.city1 + this.city2 + this.city3
        const cityArea = {
          province: this.city1,
          city: this.city2,
          area: this.city3
        }
        this.$emit('setArea', cityArea)
        this._setVuex('showCitySelectBox', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .citySelect{
        width: 100%;
    }
</style>
