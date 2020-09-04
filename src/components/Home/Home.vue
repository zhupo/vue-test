<template>
  <div class="home" id="home">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000" class="mt-swipe">
      <mt-swipe-item v-for="(item, index) in images" :key="index">
        <img :src="item.url" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 九宫格 -->
    <div class="list">
      <ul>
        <li v-for="(grid, index) in grids" :key="index">
          <router-link :to="grid.router">
            <img :src="grid.src" alt />
            <p>{{ grid.title }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import src1 from "../../assets/联系我们.png";
import src2 from "../../assets/商品.png";
import src3 from "../../assets/发送.png";
import src4 from "../../assets/留言.png";
import src5 from "../../assets/新闻.png";
import src6 from "../../assets/关于我们.png";
import src7 from "../../assets/优惠.png";
import src8 from "../../assets/新人专享.png";
import src9 from "../../assets/研发体系补贴.png";

var grids = [
  { id: 1, src: src1, title: "联系我们", router: { name: "news.list" } },
  { id: 2, src: src2, title: "商品展示", router: { name: "news.list" } },
  { id: 3, src: src3, title: "图文分享", router: { name: "news.list" } },
  { id: 4, src: src4, title: "留言反馈", router: { name: "news.list" } },
  { id: 5, src: src5, title: "新闻资讯", router: { name: "news.list" } },
  { id: 6, src: src6, title: "关于我们", router: { name: "news.list" } },
  { id: 7, src: src7, title: "优惠区", router: { name: "news.list" } },
  { id: 8, src: src8, title: "新人专享", router: { name: "news.list" } },
  { id: 9, src: src9, title: "百亿补贴", router: { name: "news.list" } }
];

export default {
  name: "Home",
  data() {
    return {
      images: [
        {
          url: require("../../assets/carousel-01.jpg")
        },
        {
          url: require("../../assets/carousel-02.jpg")
        }
      ],
      baseUrl: location.origin,
      grids: grids
    };
  },
  components: {
    // HelloWorld
  },
  created() {
    this.$axios
      .get("/api/images")
      .then(res => {
        console.log(res.data.items);
        // this.images = res.data.items
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.mt-swipe {
  width: 100%;
  height: 200px;
}
.mt-swipe img {
  width: 100%;
  height: 100%;
}
.list {
  width: 100%;
  padding-top: 25px;
}
.list ul {
  display: flex;
  flex-wrap: wrap;
}
.list ul li {
  width: 33%;
  height: 100px;
  text-align: center;
  font-size: 12px;
  padding-top: 15px;
}
.list ul li a {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  color: black;
}
.list ul li a img {
  width: 45px;
  height: 45px;
}
.list ul li a p {
  padding-top: 5px;
}
</style>
