<template>
  <div>
    <Navbar title="商品列表" />
    <div class="page-loadmore">
      <div class="page-loadmore-wrapper">
        <mt-loadmore
          :bottom-method="loadBottom"
          @bottom-status-change="handleBottomChange"
          :bottom-all-loaded="allLoaded"
          ref="loadmore"
        >
          <ul class="page-loadmore-list">
            <li v-for="(goodList, index) in goods" :key="index">
              <a href="javascript:;">
                <img src="goodList.url" alt="" />
                <div class="title">
                  {{ goodList.title | controllerShow(14) }}
                </div>
                <div class="desc">
                  <div class="sell">
                    <span>¥{{ goodList.sellPrice }}</span>
                    <s>¥{{ goodList.marketPrece }}</s>
                  </div>
                  <div class="detail">
                    <div class="hot">
                      热卖中
                    </div>
                    <div class="count">剩{{ goodList.stockQuantity }}件</div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsList",
  data() {
    return {
      page: this.$route.params.page,
      goods: [],
      allLoaded: false
    };
  },
  created() {
    this.$axios
      .get(`api/goods?page=${this.page}`)
      .then(res => {
        this.goods = res.data;
      })
      .catch(err => {
        console.log("商品列表获取失败", err);
      });
  },
  methods: {
    //上拉加载
    loadBottom() {
      console.log("上拉调用了");
      //上拉加载数据
      //通知状态发生改变
      this.$refs.loadmore.onBottomLoaded();
    },
    handleBottomChange(status) {
      console.log(status);
    }
  }
};
</script>

<style scoped>
.page-loadmore {
  margin-bottom: 95px;
}

.title {
  color: #000;
}

.page-loadmore-list {
  overflow: hidden;
  height: 100%;
}

.page-loadmore-list li {
  width: 50%;
  float: left;
}

li > a:not(.mui-btn) {
  margin: 0px;
  padding: 0px;
  border: 1px solid #cccccc;
  /* box-shadow: 0 0 4px #666; */
  width: 100%;
  display: block;
}

li > a:not(.mui-btn) img {
  width: 100%;
}

.sell > span {
  float: left;
  color: red;
  text-align: left;
}

.detail > .hot {
  float: left;
  text-align: left;
  font-size: 15px;
}

.detail > .count {
  float: rigth;
  text-align: right;
  font-size: 15px;
}

.detail {
  overflow: hidden;
}

.desc {
  color: rgba(92, 92, 92, 0.8);
  background-color: rgba(0, 0, 0, 0.2);
}

img {
  height: 200px;
}

.page-loadmoer-listitem {
  border-bottom: 1px solid #eee;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.page-loadmoer-listitem:first-child {
  border-top: 1px solid #eee;
}

.page-loadmore-wrapper {
  overflow: scroll;
}

.mint-loadmore-bottom span {
  display: inline-block;
  -webkit-transition: 2s linear;
  transition: 2s linear;
  vertical-align: middle;
}

.mint-loadmore-bottom span.is-rotate {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>
