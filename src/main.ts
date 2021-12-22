import { createApp } from 'vue'
import App from './App.vue'
import {
  Tabbar,
  TabbarItem,
  Calendar,
  ConfigProvider,
  Icon,
  ActionSheet,
  Search,
  Toast,
  Cell,
  CellGroup,
  Button,
  Popup,
  Image,
  Divider
} from 'vant'
import routes from './router'
import 'vant/lib/index.css'
import {
  renderWithQiankun,
  qiankunWindow
} from 'vite-plugin-qiankun/dist/helper'
import { createRouter, createWebHashHistory } from 'vue-router'

let router = null
let instance = null
let history = null

instance = createApp(App)
instance.use(Tabbar)
instance.use(TabbarItem)
instance.use(Calendar)
instance.use(ConfigProvider)
instance.use(Icon)

instance.use(ActionSheet)
instance.use(Search)
instance.use(Toast)
instance.use(Cell)
instance.use(CellGroup)
instance.use(Button)
instance.use(Popup)
instance.use(Image)
instance.use(Divider)
declare global {
  interface Window {
    Explain: any
    __POWERED_BY_QIANKUN__: any
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__: any
    wx: any
  }
}

function render(props = {}) {
  const { container } = props as any
  history = createWebHashHistory(
    qiankunWindow.__POWERED_BY_QIANKUN__ ? '/calendar-mobile' : '/'
  )
  //   console.log(history,qiankunWindow.__POWERED_BY_QIANKUN__ ,"history");
  router = createRouter({
    history,
    routes
  })

  instance.use(router)
  //   instance.use(store);
  instance.mount(
    container ? container.querySelector('#app') : document.getElementById('app')
  )
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log('我正在作为子应用运行')
  }
}

// some code
renderWithQiankun({
  mount(props) {
    console.log('viteapp mount')
    render(props)
  },
  bootstrap() {
    console.log('bootstrap')
  },
  unmount(props) {
    console.log('vite被卸载了')
    instance.unmount()
    instance._container.innerHTML = ''
    history.destroy() // 不卸载  router 会导致其他应用路由失败
    router = null
    instance = null
  }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}
