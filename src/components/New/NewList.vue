<template>
  <div class="新闻列表">
    <Navbar title="新闻列表" />
    <div class="newList">
      <ul>
        <li v-for="newList in news" :key="newList.id">
          <router-link :to="{ name: 'detail', query: { id: newList.id } }">
            <div class="new_img">
              <img :src="newList.url" alt />
            </div>
            <div class="content">
              <p class="title">{{ newList.title }}</p>
              <div class="new-desc">
                <p class="summary">{{ newList.summary }}</p>
                <p>
                  <span class="praise">点赞数：{{ newList.praise }}</span>
                  <span class="time">
                    发表时间：{{ newList.createdAt | converTime("YYYY-MM-DD") }}
                  </span>
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mine",
  data() {
    return {
      msg: "我是新闻列表页面",
      news: []
    };
  },
  created() {
    this.$axios
      .get("api/news")
      .then(res => {
        this.news = res.data.items;
        console.log(this.news);
      })
      .catch(err => {
        console.log("新闻列表异常", err);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news {
  padding-bottom: 80px;
}
.newList {
  width: 100%;
  border-bottom: 1px solid #cccccc;
  font-size: 12px;
}
.newList ul li {
  position: relative;
}
.newList ul li a {
  display: block;
  width: 100%;
  height: 150px;
  color: #808080;
  display: flex;
  text-decoration: none;
}
.new_img {
  width: 150px;
  height: 100px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.new_img img {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  margin-left: 10px;
}
.content {
  width: 80%;
  margin-left: 40px;
}
.content .title {
  font-size: 15px;
  display: inline-block;
  color: #131f3c;
  letter-spacing: 0;
  padding-bottom: 7px;
  font-family: PingFangSC-Regular;
  margin-top: 10px;
}
.new-desc span {
  color: #ff6700;
}
.summary {
  padding: 5px 0;
}
.time {
  margin-left: 20px;
}
</style>
