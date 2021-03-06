/*
 * @Descripttion:
 * @Author: Weize
 * @Date: 2021-04-22 09:04:17
 * @LastEditors: Weize
 * @LastEditTime: 2021-05-08 22:34:45
 */
import Vue from "vue"
import App from "@/views/App"
import router from "@/router"
import store from "./store"
import "@/plugin/element"
import "normalize.css/normalize"
import "@/less/main"
import "@/icons"
import "@/permission"
console.log(process.env);

Vue.config.productionTip = false //阻止vue启动时生成生产消息
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app")
