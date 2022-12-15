import Vue from 'vue'
import App from './App.vue'
// import { init } from "@/core/Firebase.ts";

import axios from 'axios'
import VueAxios from 'vue-axios'
import ApiService from "./services/api.service";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios)

// init();
ApiService.init();

new Vue({
  render: h => h(App),
}).$mount('#app');
