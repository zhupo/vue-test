<template>
  <mt-swipe :auto="4000" :style="{ height: myHeight }" class="mt-swipe">
    <mt-swipe-item v-for="(item, index) in images" :key="index">
      <img :src="hostUrl + item.url" alt="" />
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  name: "Swipe",
  data() {
    return {
      hostUrl: "http://photo.com/",
      images: []
    };
  },
  props: ["url", "myHeight"],
  created() {
    this.$axios
      .get(this.url)
      .then(res => {
        this.images = res.data.items;
        console.log(this.images);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="css" scoped>
.mt-swipe {
  /* width: 100%; */
  height: 200px;
}
.mt-swipe img {
  width: 100%;
  height: 100%;
}
</style>
