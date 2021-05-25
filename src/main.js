import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Field, CellGroup, Form, ActionSheet, Uploader, RadioGroup, Radio } from 'vant'
import 'vant/lib/index.css' // 全局引入样式
import 'amfe-flexible/index.js'
import { Icon } from 'vant'

const app = createApp(App)

app.use(router)

app.use(Button)
app.use(Field)
app.use(CellGroup)
app.use(Form)
app.use(ActionSheet)
app.use(Uploader)
app.use(RadioGroup)
app.use(Radio)
app.use(Icon)

app.mount('#app')
