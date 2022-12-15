import Vue from 'vue'
import App from './App.vue'
// import { init } from "@/core/Firebase.ts";
import VueToast from 'vue-toast-notification';

import axios from 'axios'
import VueAxios from 'vue-axios'
import ApiService from "./services/api.service";
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios)
Vue.use(VueToast);

let instance = Vue.$toast.open('You did it!');
instance.dismiss();
Vue.$toast.clear();

// init();
ApiService.init();

new Vue({
  render: h => h(App),
}).$mount('#app');
