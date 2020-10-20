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

//引入全局css
import "../public/css/global.css";

//注册全局的导航栏组件
import Navbar from "@components/Common/Navbar";
Vue.component(Navbar.name, Navbar);

//注册全局的评论组建
import Comment from "@components/Common/Comment";
Vue.component(Comment.name, Comment);

//自定义moment全局过滤器
import Moment from "moment";
Vue.filter("converTime", function(date, formatStr) {
  return Moment(date).format(formatStr);
});

//引入preview图片查看器
import VuePreview from 'vue-preview'
// defalut install
//内部会运行vue.component('vue-preview', {});
Vue.use(VuePreview)

//创建一个实例化对象
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
