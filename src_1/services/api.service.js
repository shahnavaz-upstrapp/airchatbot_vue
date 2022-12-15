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

  // All Type API ...

  get(path,qParams={}) {
    let header = {};
    if (localStorage.getItem("userToken")) {
      header["Authorization"] = `Bearer ${localStorage.getItem("userToken")}`;
    }

    return Vue.axios.get(path, { headers: header, params: qParams });
  },

  post(path, params) {
    let header = {};
    if (localStorage.getItem("userToken")) {
      header["Authorization"] = `Bearer ${localStorage.getItem("userToken")}`;
    }
    return Vue.axios.post(path, params, { headers: header });
  },

  put(path, data) {
    let header = {};
    if (localStorage.getItem("userToken")) {
      header["Authorization"] = `Bearer ${localStorage.getItem("userToken")}`;
    }
    return Vue.axios.put(path, data, { headers: header });
  },
  patch(path, data) {
    let header = {};
    if (localStorage.getItem("userToken")) {
      header["Authorization"] = `Bearer ${localStorage.getItem("userToken")}`;
    }
    return Vue.axios.patch(path, data, { headers: header });
  },

  update(path, slug, params) {
    let header = {};
    if (localStorage.getItem("userToken")) {
      header["Authorization"] = `Bearer ${localStorage.getItem("userToken")}`;
    }
    return Vue.axios.put(`${path}/${slug}`, params, { headers: header });
  },

  delete(path) {
    let header = {};
    if (localStorage.getItem("userToken")) {
      header["Authorization"] = `Bearer ${localStorage.getItem("userToken")}`;
    }
    return Vue.axios.delete(path, { headers: header });
  },

  // delete(path) {
  //   console.log("authorizationToken from the service", authorizationToken)
  //   return Vue.axios.delete(path, { headers: {
  //     Authorization: authorizationToken
  //   }});
  // }
};

export default ApiService;
