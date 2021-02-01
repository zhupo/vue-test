import Vue from "vue";
import App from "./App";
import router from "./router";

//使用mait-ui引入全部的组件
import Mint from "mint-ui";
Vue.use(Mint);
import "mint-ui/lib/style.min.css";

//引入axios,用来调用后端接口
import Axios from "axios";

Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;

//将bus对象挂在到vue的原型上公交车对象
import EventBus from "./EventBus";
// Vue.use(EventBus);
Vue.prototype.$bus = EventBus;

//引入全局css
import "../public/css/global.css";

//注册全局的导航栏组件
import Navbar from "@components/Common/Navbar";
Vue.component(Navbar.name, Navbar);

//注册全局的评论组建
import Comment from "@components/Common/Comment";
Vue.component(Comment.name, Comment);

//注册全局的轮播图组建
import Swipe from "@components/Common/Swipe";
Vue.component(Swipe.name, Swipe);

//自定义moment全局过滤器
import Moment from "moment";
//设置中文显示
Moment.locale("zh-cn");
Vue.filter("converTime", function(date, formatStr) {
  return Moment(date).format(formatStr);
});
Vue.filter("relativeTime", function(date) {
  return Moment(date).fromNow();
});
//自定义全局字符串截取过滤器
Vue.filter("controllerShow", function(str, num) {
  if (str.length > num) {
    //如果字符串长度大于num，则截取0到num - 1位
    return str.substr(0, num - 1) + "...";
  } else {
    return str;
  }
});

//引入preview图片查看器
import VuePreview from "vue-preview";
// defalut install
//内部会运行vue.component('vue-preview', {});
Vue.use(VuePreview);

//创建一个实例化对象
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

// 添加请求拦截器
Axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    //加载提示框
    Mint.Indicator.open({
      text: "玩命加载ing..."
    });
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
Axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    //关闭提示框
    Mint.Indicator.close();
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
