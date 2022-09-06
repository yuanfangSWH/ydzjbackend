<template>
  <div></div>
</template>
<script>
export default {
  data () {
    return {
      user_id: "",
      url: "",
    };
  },
  created () {
    this.user_id = Number(this.$route.query.user_id);
    this.url = this.$route.query.url;
    this.jumpURL();
  },
  methods: {
    //跳转
    
    jumpURL () {
      this.$router.push({
        path: this.url,
        query: {
          user_id: this.user_id,
        },
      });
    },
  },
};
</script>

<style scoped>
</style>