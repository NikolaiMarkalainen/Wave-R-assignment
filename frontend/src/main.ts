import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles.css'
import App from './App.vue'
import router from './router'
import { create, NButton, NInput, NCard } from 'naive-ui'

const naive = create({
  components: [NButton, NInput, NCard],
})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)

app.mount('#app')
