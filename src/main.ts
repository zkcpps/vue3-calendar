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

const app = createApp(App)

app.use(Tabbar)
app.use(router)
app.use(TabbarItem)
app.use(Calendar)
app.use(ConfigProvider)
app.use(Icon)
app.use(ActionSheet)
app.use(Search)
app.use(Toast)
app.use(Cell)
app.use(Button)
app.use(CellGroup)
app.use(Image)
app.use(Popup)

app.mount('#app')
