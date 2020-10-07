import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@components/Home/Home";
import Vip from "@components/Vip/Vip";
import ShopCart from "@components/Cart/ShopCart";
import Mine from "@components/Mine/Mine";
import NewList from "@components/New/NewList";
import NewsDetail from "@components/New/NewsDetail";
import PhotoList from "@components/Photo/PhotoList";
import PhotoDetail from "@components/Photo/PhotoDetail";

//应用路由
Vue.use(VueRouter);

const routes = [
  //匹配的路由规则
  {
    path: "/",
    redirect: "/home"
    // component: Home
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/vip",
    name: "vip",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Vip
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: ShopCart
  },
  {
    path: "/mine",
    name: "mine",
    component: Mine
  },
  //新闻列表
  {
    path: "/news/list",
    name: "news.list",
    component: NewList
  },
  {
    path: "/news/detail",
    name: "detail",
    component: NewsDetail
  },
  {
    path: "/photos/list/:categoryId",
    name: "photo.list",
    component: PhotoList
  },
  {
    path: "/photos/detail",
    name: "photo.detail",
    component: PhotoDetail
  }
];

const router = new VueRouter({
  // linkActiveClass: "link-active",
  routes
});

export default router;
