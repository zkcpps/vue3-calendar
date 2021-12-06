import { createApp } from 'vue'
import App from './App.vue'
import { Tabbar, TabbarItem, Calendar, ConfigProvider, Icon  } from 'vant'
import router from './router'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(Tabbar);
app.use(router);
app.use(TabbarItem);
app.use(Calendar);
app.use(ConfigProvider);
app.use(Icon);

app.mount('#app')
