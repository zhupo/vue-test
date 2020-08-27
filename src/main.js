import Vue from "vue";
import App from "./App";
import router from "./router";
//使用mait-ui引入全部的组件
import Mint from "mint-ui";
Vue.use(Mint);
import 'mint-ui/lib/style.min.css';
import Axios from "axios";

Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;

import '../public/css/global.css';



new Vue({
  router,
  render: h => h(App)
}).$mount("#app");