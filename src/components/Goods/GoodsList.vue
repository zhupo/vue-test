<template>
  <div>
    <Navbar title="商品列表" />
    <div class="page-loadmore">
      <div
        class="page-loadmore-wrapper"
        ref="wrapper"
        :style="{ height: wrapperHeight + 'px' }"
      >
        <mt-loadmore
          :bottom-method="loadBottom"
          @bottom-status-change="handleBottomChange"
          :bottom-all-loaded="allLoaded"
          :auto-fill="autoFill"
          ref="loadmore"
        >
          <ul class="page-loadmore-list">
            <li v-for="(goodList, index) in goods" :key="index">
              <router-link
                :to="{ name: 'good.detail', params: { id: goodList.id } }"
              >
                <img :src="hostUrl + goodList.url" alt="" />
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
              </router-link>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
/*
mt-loadmore 中的属性

1, loadBottom函数
2，机制bottomLoad :bottom-all-loaded 默认为false可以上拉，为true时禁止上拉
3，auto-fill 默认为true，自动会检测父容器，并调用loadBottom直到撑满父容器
4，pull 拉动未满足70px,drop达到70px，loading加载中
5，loadmore 组件对象的onBottomLoaded()通知结束loading进入pull状态
6，在组件中写ref在js中通过this.$refs.xxx获取的组件对象
   在普通标签写ref在js中国通过this.$refs.xxx获取的dom对象
7, 上拉加载更多公式
  进入检测机制 ==》 可视的高度 + 页面卷起的高度 = 设备的高度
 */
export default {
  name: "GoodsList",
  data() {
    return {
      page: this.$route.params.page,
      goods: [],
      allLoaded: false,
      hostUrl: "http://photo.com/",
      wrapperHeight: 0,
      autoFill: false
    };
  },
  created() {
    this.loadGoodsByPage();
  },
  mounted() {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  },
  methods: {
    //上拉加载
    loadBottom() {
      this.loadGoodsByPage();
      console.log("上拉调用了");
      //上拉加载数据

      //如果给标签绑定ref = 'xxx' 属性使用this.$refs.xxx 获取原生的js DOM对象
      //如果是给组建绑定ref属性，那么this.$refs.xxx获取的是当前的组建对象
      //通知状态发生改变
      this.$refs.loadmore.onBottomLoaded();
    },
    handleBottomChange(status) {
      console.log(status);
    },
    loadGoodsByPage() {
      this.$axios
        .get(`api/goods?page=${this.page}`)
        .then(res => {
          if (res.data.length < 1) {
            this.$toast("没有数据了.");
            //如果为true，表示所有数据的家在完成。
            this.allLoaded = true;
          }
          if (this.page == 1) {
            this.goods = res.data;
          } else {
            this.goods = this.goods.concat(res.data);
          }
          this.page++;
        })
        .catch(err => {
          console.log("商品列表获取失败", err);
        });
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
