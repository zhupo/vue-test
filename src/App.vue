<template>
  <div id="app">
    <!-- 顶部栏区域 -->
    <div id="header">
      <mt-header :fixed="fixed" title="信息管理系统">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>

    <!-- 路由组件的出口 -->
    <router-view />

    <!-- 底部栏 -->
    <div class="tabBar" :fixed="fixed">
      <ul>
        <li v-for="(tab, index) in tabs" :key="tab.id">
          <router-link :to="tab.routerName" exact @click.native="changeHash(index)" :class='{"link-active": index == currentIndex}'>
            <img :src="tab.imgSrc" alt="">
            <p>{{tab.title}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- <mt-tabbar v-model="selected" :fixed="fixed">
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
    </mt-tabbar> -->
  </div>
</template>
<script>

import index from "@assets/index.png";
import vip from "@assets/member.png";
import shopcart from "@assets/shopping-cart.png";
import mine from "@assets/mine.png";
let tabs = [
  {
    id: 1,
    title: "首页",
    imgSrc: index,
    routerName: {name: "home" }
  },
  {
    id: 2,
    title: "会员",
    imgSrc: vip,
    routerName: {name: "vip" }
  },{
    id: 3,
    title: "购物车",
    imgSrc: shopcart,
    routerName: {name: "shopcart" }
  },{
    id: 4,
    title: "我的",
    imgSrc: mine,
    routerName: {name: "mine" }
  }
];

export default {
  name: "App",
  data() {
    return {
      selected: "",
      fixed: true,
      tabs: tabs,
      currentIndex: 0
    };
  },
  methods: {
    changeHash(index) {
      // console.log(index);
      this.currentIndex = index;
    }
  },
  watch: {
    selected: function() {
      // console.log(oldV, newV);
      this.$router.push({ name: this.selected });
    }
  }
};
</script>
<style scoped>
.tabBar {
  width: 100%;
  height: 55px;
  background-color:#cccccc;
  position: absolute;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(180deg, #d9d9d9,#d9d9d9 50%, transparent 50%);
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: top left;
  background-color: #fafafa;
}
.tabBar ul {
  width: 100%;
  overflow: hidden;
}
.tabBar ul li {
  float: left;
  width: 25%;
  height: 55px;
  text-align: center;
}
.tabBar ul li a {
  display: inline-block;
  width:100%;
  height: 100%;
  padding-top: 10px;
}
.tabBar ul li a.link-active {
  background-color: #CCFF66;
}
.tabBar ul li p {
  font-size: 12px;
}
.tabBar ul li a img {
  width: 22px;
}
</style>
