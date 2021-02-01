<template>
  <div class="goodComment">
    <Navbar title="商品评论" />
    <comment :cid="$route.query.id" />
  </div>
</template>

<script>
export default {
  name: "GoodsComment",
  data() {
    return {};
  }
};
</script>

<style scoped>
.goodComment {
  margin-bottom: 95px;
}
</style>
