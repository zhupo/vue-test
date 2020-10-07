<template>
  <div class="detail">
    <Navbar title="新闻详情" />
    <div class="item">
      <p>{{ detail.title }}</p>
      <div>
        <span>{{ detail.click }}次点击</span>
        <span>分类：民生科技</span>
        <span>添加时间：{{ detail.createdAt | converTime('YYYY-MM-DD') }}</span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="detail-content">{{ detail.content }}</div>
  </div>
</template>

<script>
export default {
  name: "NewsDetail",
  data() {
    return {
      detail: {}
    }
  },
  created() {
    let id = this.$route.query.id;
    this.$axios.get(`api/news/${id}`)
    .then(res => {
      this.detail = res.data;
    })
    .catch(err => {
      console.log('新闻详情异常', err);
    })
  }

}
</script>

<style lang="css" scoped>
.detail {
  padding-bottom: 100px;
}
.item p {
  color: #66CCFF;
  font-size: 24px;
  font-weight: 600;
}
.item span {
  margin-right: 20px;
  color: #999999;
}
.divider {

}

</style>