import Vue from 'vue';
import App from './App';
import './uni.promisify.adaptor';

// 引入全局ht-view
import htView from 'ht-view';
Vue.use(htView);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
