import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@components/Home/Home";
import Vip from "@components/Vip/Vip";
import ShopCart from "@components/Cart/ShopCart";
import Mine from "@components/Mine/Mine";
import NewList from "@components/New/NewList";

Vue.use(VueRouter);

const routes = [
  //匹配的路由规则
  {
    path: "/",
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
  {
    path: "/new-list",
    name: "news.list",
    component: NewList
  }
];

const router = new VueRouter({
  routes
});

export default router;
