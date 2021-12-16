import Vue from 'vue'
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
  Image
} from 'vant'
import router from './router'
import 'vant/lib/index.css'

// let router;
let instance: Vue.App<Element>

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: string
  }
}

interface IRenderProps {
  container: Element | string
}

function render(props: IRenderProps) {
  const { container } = props
  instance = createApp(App)
  instance
    .use(Tabbar)
    .use(router)
    .use(TabbarItem)
    .use(Calendar)
    .use(ConfigProvider)
    .use(Icon)
    .use(ActionSheet)
    .use(Search)
    .use(Toast)
    .use(Cell)
    .use(Button)
    .use(CellGroup)
    .use(Image)
    .use(Popup)
    .mount(
      container instanceof Element
        ? (container.querySelector('#app') as Element)
        : (container as string)
    )
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render({ container: '#app' })
}
//暴露主应用生命周期钩子
export async function bootstrap() {
  console.log('subapp bootstraped')
}

export async function mount(props: any) {
  console.log('mount subapp')
  render(props)
}

export async function unmount() {
  console.log('unmount college app')
  instance.unmount()
}

// const app = createApp(App)

// app.mount('#app')
