import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import { Tabbar, TabbarItem, Calendar, ConfigProvider, Icon } from 'vant'
import routes from './router'
import 'vant/lib/index.css'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { createRouter, createWebHistory } from 'vue-router';


let router = null;
let instance = null;
let history = null;

instance = createApp(App);
instance.use(Tabbar);
instance.use(TabbarItem);
instance.use(Calendar);
instance.use(ConfigProvider);
instance.use(Icon);


function render(props = {}) {
  const { container } = props;
  history = createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/calendar-mobile' : '/');
  //   console.log(history,qiankunWindow.__POWERED_BY_QIANKUN__ ,"history");
  router = createRouter({
    history,
    routes,
  });


  instance.use(router);
  //   instance.use(store);
  instance.mount(container ? container.querySelector('#app') : document.getElementById("app"));
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log('我正在作为子应用运行')
  }
}

// some code
renderWithQiankun({
  mount(props) {
    console.log("viteapp mount");
    render(props);
  },
  bootstrap() {
    console.log('bootstrap');
  },
  unmount(props) {
    console.log("vite被卸载了");
    instance.unmount();
    instance._container.innerHTML = '';
    history.destroy();// 不卸载  router 会导致其他应用路由失败
    router = null;
    instance = null;
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}
