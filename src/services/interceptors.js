import axios from "axios";
// import { getCookie } from "./cookie.service";
// import { TOKEN_KEY } from "@/config/constant";
// import store from "@/store";

export default function setup() {
  // console.log('setup() calling')
  axios.interceptors.request.use(
    function(config) {
	console.log("interceptors: config: ", config)
      config.headers["Content-Type"] =
        "application/x-www-form-urlencoded";
      config.headers["Accept"] = "application/json";
      config.headers["Access-Control-Allow-Origin"] = "*";
      if (localStorage.getItem("userToken")) {
        config.headers.Authorization = `TOKEN ${localStorage.getItem("userToken")}`;
      }
      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    response => {
          console.log("server response: ", response)

      if (response.status === 200 || response.status === 201) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(response);
      }
    },
    error => {
      console.log('server error', error)
      if (error && error.response && error.response.status) {
        switch (error.response.status) {
          case 403:
        //     store.dispatch("PURGE_AUTH");
            break;
        }
      }
      return Promise.reject(error.response && error.response.data ? error.response.data:  {'message': "Internal Error . Try again later"});
    }
  );
}
