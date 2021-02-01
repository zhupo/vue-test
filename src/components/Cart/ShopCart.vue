<template>
  <div>
    <div class="pay-detail">
      <ul>
        <li v-for="(shopCart, index) in shopCarts" :key="index" class="p-list">
          <mt-switch v-model="shopCart.isSelected"></mt-switch>
          <img :src="hostUrl + shopCart.thumbPath" />
          <div class="pay-calc">
            <p>{{ shopCart.title }}</p>
            <div class="calc">
              <span>¥{{ shopCart.sellPrice }}</span>
              <span>-</span>
              <span>{{ shopCart.num }}</span>
              <span>+</span>
              <a href="javascript:;">删除</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="show-price">
      <div class="show-1">
        <p>总计(不含运费):</p>
        <span>已选择商品1件，总价¥888元</span>
      </div>
      <div class="show-2">
        <mt-button type="danger" size="large">去结算</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsTool from "@/GoodsTool";
export default {
  name: "ShopCart",
  data() {
    return {
      shopCarts: [],
      hostUrl: "http://photo.com/"
    };
  },
  created() {
    let goodsList = GoodsTool.getGoodsList();
    let goodIds = Object.keys(goodsList).join(",");
    if (goodIds) {
      //发起请求 获取用户购物商品的列表
      this.$axios
        .get(`/api/carts?goodIds=${goodIds}`)
        .then(res => {
          this.shopCarts = res.data;
          for (var i = 0; i < this.shopCarts.length; i++) {
            let shop = this.shopCarts[i];
            let num = goodsList[shop.id];

            if (num) {
              shop.num = num;
              shop.isSelected = true;
            }
          }
        })
        .catch(err => {
          console.log("购物车未找到商品" + err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pay-detail ul li {
  list-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 3px;
}
.pay-detail ul {
  padding-left: 5px;
  margin-top: 5px;
}
.pay-detail ul li img {
  width: 80px;
  height: 80px;
  display: inline-block;
  vertical-align: top;
  margin-top: 10px;
}
.pay-detail ul li > :nth-child(1),
.pay-detail ul li > :nth-child(3) {
  display: inline-block;
}
.pay-calc p {
  display: inline-block;
  width: 250px;
  overflow: hidden;
  color: blue;
  font-size: 15px;
  margin-bottom: 10px;
}
.pay-detail ul li > :nth-child(1) {
  line-height: 80px;
}
.calc:nth-child(1) {
  color: red;
  font-size: 20px;
}
.calc span:not(:nth-child(1)) {
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: inline-block;
  width: 20px;
  text-align: center;
}
.calc a {
  margin-left: 20px;
}
.show-1,
.show-2 {
  display: inline-block;
  margin-left: 30px;
}
.show-price {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
