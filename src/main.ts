import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElIcons from '@element-plus/icons-vue';
import router from '@/router';
import pinia from '@/store/pinia';

import '@/style/index.css';

const app = createApp(App);
for (const name in ElIcons) {
    app.component(name, (ElIcons as any)[name]);
}
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.mount('#app');
