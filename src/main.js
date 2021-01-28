import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Vant from 'vant'
import 'element-ui/lib/theme-chalk/index.css';
import 'vant/lib/index.css';
import '@/assets/css/reset.scss'
import { Toast } from 'vant';
Vue.directive('sdc', {
    inserted(el) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true;
                setTimeout(() => {
                    el.disabled = false;
                }, 2000);
            }
        });
    }
});
Vue.use(Toast);
Vue.prototype.Toast = Toast
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
