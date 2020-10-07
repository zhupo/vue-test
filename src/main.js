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
import Navbar from "@components/Common/Navbar"
Vue.component(Navbar.name, Navbar)

//自定义moment全局过滤器
import Moment from "moment" 
Vue.filter('converTime', function(date, formatStr) {
  return Moment(date).format(formatStr);
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
