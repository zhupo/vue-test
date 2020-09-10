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
            <img :src="grid.url" alt />
            <p>{{ grid.title }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      images: [],
      baseUrl: location.origin,
      grids: []
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
        this.images = res.data.items;
      })
      .catch(err => {
        console.log(err);
      });

    this.$axios
      .get("/api/images/show-off")
      .then(res => {
        this.grids = res.data.items;
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
