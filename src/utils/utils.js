import Cookies from 'js-cookie'
export default {
  install(Vue, options) {
    // 清除cookie
    Vue.prototype.clearCookie = function (name) {
      this.setCookie(name, '', -1)
    }

    Vue.prototype._getToken = function () {
      return Cookies.get('x_token')
    }

    Vue.prototype._setToken = function (token) {
      return Cookies.set('x_token', token)
    }

    Vue.prototype._removeToken = function () {
      return Cookies.remove('x_token')
    }


    Vue.prototype._toRouter = function (path) {
        this.$router.push(path)
      },

      Vue.prototype.showMessage = function (message, time, a) {
        this.$message({
          message: message,
          type: a === 2 ? 'warning' : 'success',
          center: true,
          duration: time ? time : 1500
        })
      }

    /* 更新VUEX值 */
    Vue.prototype._setVuex = function (key, value) {
      this.$store.dispatch('updateVuex', {
        key,
        value
      })
    }

    /* 获取VUEX值 */
    Vue.prototype._getVuex = function (key) {
      return this.$store.getters[key]
    }

    /* 获取URL参数 */
    Vue.prototype._urlKey = function () {
      var url = window.location.search
      if (url) {
        return url.replace('?', '')
      }
    }

    /* 获取URL参数 */
    Vue.prototype._ajax = function (method, url, data, headers) {
      var xml = new XMLHttpRequest()
      xml.open(method, url, true)
      xml.setRequestHeader('content-type', 'multipart/form-data; boundary=--------------------------')

      xml.onreadystatechange = function () {
        if (this.readyState === 4) {
          console.log('responseText:', this.responseText)
        }
      }

      xml.send(data)
    }

    // 图片转换base64
    Vue.prototype.imageToBase64 = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // 返回base64的图片链接
        console.log('file 转 base64结果：' + reader.result)
        return reader.result
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    }

    // json对象转数组对象
    Vue.prototype._jsonToArry = function (json) {
      var arr = []
      for (var i in json) {
        arr.push(json[i]) // 属性
        // arr.push(object[i]); //值
      }
      return arr
    }

    // json对象转数组对象并按照指定属性排序 升序
    Vue.prototype._jASort = function (json, pro) {
      var arr = []
      pro = pro || 'id'
      for (var i in json) {
        arr.push(json[i]) // 属性
        // arr.push(object[i]); //值
      }
      return arr.sort(function (a, b) {
        return a[pro] - b[pro]
      })
    }

    /* 金额转换计算 */
    Vue.prototype.CalculateData = function (data, key) {
      if (isNaN(data)) return 0;
      if (Number(data) <= 0) {
        return Number(data)
      } else {
        var value = 0;
        if (key == '/') {
          value = data / 100
        } else if (key == '*') {
          value = data * 100
        }
        return value
      }
    }

    /* 转换图片路径，用于更新图片 */
    Vue.prototype.GetImageUrl = function (data) {
      let obj = JSON.parse(localStorage.getItem("userInfoBackend"));
      let ossurl = obj.oss_url;
      let result = data;
      if (data.indexOf(ossurl) >= 0) {
        //包含全路径
        let u = data.split(ossurl)[1]; //忽略OSS域名
        result = u.split('!')[0]; //忽略后缀
      }
      return result;
    }

    Vue.prototype.setOssUrl = function (data) {
      let obj = JSON.parse(localStorage.getItem("userInfoBackend"));
      let ossurl = obj.oss_url;
      let result = data;
      if (data.indexOf(ossurl) >= 0) {
        //包含全路径
        result = data; //data.split(ossurl)[1];
      } else {
        result = ossurl + data;
      }
      return result;
    }

    /* 获得oss_url */
    Vue.prototype.GetImageOssUrl = function (data) {
      let obj = JSON.parse(localStorage.getItem("userInfoBackend"));
      let ossurl = obj.oss_url;
      return ossurl;
    }


    /**
     * @description: 获得文本中的url
     * @param {String} s 带url的字符串
     * @return {Array} 所有Url列表数组
     */
    Vue.prototype.HttpString = function (s) {
      var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
      var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
      s = s.match(reg);
      return (s)
    }




  }
}
