<template>
  <div class="backBox">
    <img
      @click="
        () => {
          this.$router.go(-1);
          if(isFromUser){
            this.$emit('chFun')
          }
        }
      "
      src="../../assets/back.png"
    />
  </div>
</template>

<script>
export default {
  name: "goback",
  props: {
    isFromUser:Boolean
  },
};
</script>

<style scoped>
.backBox {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 99999;
  cursor: pointer;
}
.backBox img {
  width: 80px;
  height: 80px;
}
</style>