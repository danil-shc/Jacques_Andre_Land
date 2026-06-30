import { createApp } from "vue";
import VueLazyload from "vue3-lazyload";
import loadingImage from "./assets/images/placeholder-loading.svg";
import errorImage from "./assets/images/placeholder-error.svg";
import "./style.css";
import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(router)
  .use(VueLazyload, {
    loading: loadingImage,
    error: errorImage,
  })
  .mount("#app");
