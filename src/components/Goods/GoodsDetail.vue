<template>
  <div class="detail">
    <Navbar title="商品详情" />
    <div class="outer-swiper">
      <Swipe class="swiper" :url="url" myHeight="250px" />
    </div>
    <div class="product-desc">
      <ul>
        <li>
          <span class="produt-desc-span">
            {{ good.title }}
          </span>
        </li>
        <li class="price-li">
          市场价: <s>¥{{ good.marketPrice }}</s
          >销售价: <span style="font-size:18px;">¥{{ good.sellPrice }}</span>
        </li>
        <li class="number-li">
          购买数量:
          <span @click="substract">-</span>
          <span>{{ pickNum }}</span
          ><span @click="add">+</span>
        </li>
        <li>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="ballHandler">
            加入购物车
          </mt-button>
        </li>
      </ul>
    </div>
    <transition name="ball" @after-enter="afterEnter">
      <div class="ball" v-if="isExist"></div>
    </transition>
    <div class="product-props">
      <ul>
        <li>商品参数: 512G内存 8核 16G运行内存</li>
        <li>商品货号: {{ good.number }}</li>
        <li>库存情况: {{ good.stockQuantity }}件</li>
        <li>上架时间: {{ good.createdAt }}</li>
      </ul>
    </div>
    <div class="product-info">
      <ul>
        <li>
          <mt-button
            type="primary"
            size="large"
            plain
            @click.native="showShopInfo"
            >图文介绍</mt-button
          >
        </li>
        <li>
          <mt-button
            type="danger"
            size="large"
            plain
            @click.native="showComment"
            >商品评论</mt-button
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import GoodsTool from "@/GoodsTool";
export default {
  name: "GoodsDetail",
  data() {
    return {
      url: `/api/goods/images?id=${this.$route.params.id}`,
      good: {},
      pickNum: 1,
      isExist: false //默认小球是隐藏
    };
  },
  created() {
    this.$axios
      .get(`api/goods/${this.$route.params.id}`)
      .then(res => {
        this.good = res.data;
      })
      .catch(err => {
        console.log("未找到该商品", err);
      });
  },
  methods: {
    showShopInfo() {
      //通过动态路由进行路由跳转
      this.$router.push({
        name: "photo.info",
        query: {
          id: this.$route.params.id
        }
      });
    },
    showComment() {
      //通过动态路由进行跳转
      this.$router.push({
        name: "good.comment",
        query: {
          id: this.$route.params.id
        }
      });
    },
    substract() {
      if (this.pickNum > 1) {
        this.pickNum--;
      }
    },
    add() {
      if (this.pickNum < this.good.stockQuantity) {
        this.pickNum++;
      }
    },
    ballHandler() {
      this.isExist = true; //让小球显示
    },
    afterEnter() {
      //让小球隐藏,事件进入后
      this.isExist = false;
      //触发bus对象绑定的事件
      this.$bus.$emit("sendPickNum", this.pickNum);
      //将添加到购物车的数据，保存到本地存储对象中
      GoodsTool.add({
        id: this.good.id,
        num: this.pickNum
      });
    }
  }
};
</script>

<style scoped>
.detail {
  padding-bottom: 65px;
}
.ball-enter-active {
  /**给1秒的事件小球进入动画效果 */
  animation: bounce-in 1s;
}
.ball-leave {
  /** 元素进入以后,透明度0，整个动画都是0 */
  /** 元素离开默认是1,所以会闪一下，设置为0 */
  opacity: 0;
}
@keyframes bounce-in {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(140px, -50px, 0);
  }
  75% {
    transform: translate3d(160px, 0px, 0);
  }
  100% {
    transform: translate3d(140px, 300px, 0);
  }
}
.swiper {
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 8px;
  width: 95%;
  border-radius: 15px;
}
.outer-swiper,
.product-desc,
.product-props,
.product-info {
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 3px;
}

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
  padding: 0;
}
.product-desc ul li,
.product-props ul li,
.product-info ul li {
  list-style: none;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 8px;
}
.product-desc ul > :nth-child(1) span {
  color: blue;
  font-size: 18px;
  font-weight: bold;
}
.product-desc ul > :nth-child(1) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
.product-desc ul,
.product-info ul,
.product-props ul {
  padding-left: 10px;
}
.price-li span {
  color: red;
  font-size: 25px;
}
.price-li s {
  margin-right: 16px;
}
.number-li span {
  display: inline-block;
  border: 2px solid rgba(0, 0, 0, 0.1);
  width: 25px;
}
.product-props ul > :nth-child(1) {
  text-align: left;
}
.product-props ul:not(:nth-child(1)) {
  margin-left: 40px;
}
.product-info ul {
  margin-bottom: 70px;
  padding: 0 5;
}
.number-li span {
  text-align: center;
}
.number-li > :nth-child(2) {
  width: 40px;
}
.ball {
  border-radius: 50%;
  background-color: red;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 440px;
  left: 120px;
  display: inline-block;
  z-index: 9999;
}
</style>
