import Vue from 'vue'
import App from './App'
import 'lib-flexible'
import FastClick from 'fastclick'


if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}
import Vconsole from 'vconsole'
Vue.use(new Vconsole())

if (process.env.NODE_ENV === 'development') {

}

new Vue({
  render: h => h(App)
}).$mount('#app') 