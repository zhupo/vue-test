<template>
  <div id="app">
    <!-- 顶部栏区域 -->
    <mt-header :fixed="fixed" title="信息管理系统">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!-- 路由组件的出口 -->
    <router-view />

    <!-- 底部栏 -->
    <mt-tabbar v-model="selected" :fixed="fixed">
      <mt-tab-item id="home">
        <img slot="icon" src="./assets/index.png" />
        首页
      </mt-tab-item>
      <mt-tab-item id="vip">
        <img slot="icon" src="./assets/member.png" />
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img slot="icon" src="./assets/shopping-cart.png" />
        购物车
      </mt-tab-item>
      <mt-tab-item id="mine">
        <img slot="icon" src="./assets/mine.png" />
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      selected: "",
      fixed: true
    };
  },
  watch: {
    selected: function() {
      // console.log(oldV, newV);
      this.$router.push({ name: this.selected });
    }
  }
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
</style>
