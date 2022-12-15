import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
// import setup from "./interceptors";
// import { API_BASE_URL } from "@/config/constant";

const API_BASE_URL = "http://192.168.1.19:8000/";
// let authorizationToken = localStorage.getItem('userToken');
// console.log("authorizationToken from the service", authorizationToken)
// process.env.API_BASE_URL;
// console.log("process.env.API_BASE_URL >>>", process.env.API_BASE_URL)
const ApiService = {

  init() {
	console.log("init() callleed: ");
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_BASE_URL;
//     setup();
  },

  get(path) {
    return Vue.axios.get(path);
  },

  post(path, params) {
    return Vue.axios.post(path, params);
  },

  put(path, data) {
    return Vue.axios.put(path, data);
  },
  patch(path, data) {
    return Vue.axios.patch(path, data);
  },

  update(path, slug, params) {
    return Vue.axios.put(`${path}/${slug}`, params);
  },

  delete(path) {
    return Vue.axios.delete(path);
  },

  // delete(path) {
  //   console.log("authorizationToken from the service", authorizationToken)
  //   return Vue.axios.delete(path, { headers: {
  //     Authorization: authorizationToken
  //   }});
  // }
};

export default ApiService;
