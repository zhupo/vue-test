<template>
  <div>
    <Navbar title="图文详情" />
    <div class="photo-title">
      <p>{{ imgInfo.title }}</p>
      <span>{{ imgInfo.createdAt | converTime("YYYY-MM-DD") }}</span>
      <span>{{ imgInfo.praise }}次浏览</span>
      <span>分类: 民生经济</span>

      <!-- <ul>
      <li v-for="(thumImg, index) in thumImgages" :key="index">
        <a href="javascript:void(0)">
          <img :src="thumImg.src" alt="">
        </a>
      </li>
      </ul>-->

      <vue-preview :slides="thumImgages"></vue-preview>

      <!-- 内容部分 -->
      <div class="photo-desc">
        <p v-html="imgInfo.content"></p>
      </div>

      <!-- 评论部分 -->
      <Comment :cid="$route.query.id" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoDetail",
  data() {
    return {
      imgInfo: {},
      thumImgages: []
    };
  },
  created() {
    let id = this.$route.query.id;
    var getImageInfo = () => {
      //如果使用普通函数申明，当前this为undefined，建议使用箭头函数改变当前this的指向
      return this.$axios.get(`api/photos/${id}`);
    };
    var getThumImages = () => {
      return this.$axios.get(`api/photos/${id}/thumbnail`);
    };
    this.$axios.all([getImageInfo(), getThumImages()]).then(
      this.$axios.spread((acct, perms) => {
        //两个请求都执行
        this.imgInfo = acct.data;
        this.thumImgages = perms.data;
      })
    );
    this.$axios.all([getImageInfo(), getThumImages()]).then(
      this.$axios.spread((acct, perms) => {
        //两个请求都执行
        this.imgInfo = acct.data;
        this.thumImgages = perms.data;

        // this.thumImgages.forEach((item) => {
        //   item.msrc = item.src;
        //   item.w = 500;
        //   item.h = 400;
        // })
      })
    );
  }
};
</script>

<style lang="css" scoped>
.photo-title p {
  font-size: 20px;
  font-weight: 600;
  color: #0f80ff;
  margin: 15px 0;
}

.photo-title span {
  padding: 10px 5px;
}

.photo-desc p {
  font-size: 18px;
  color: #333333;
}
</style>
