import './bootstrap'
// import 'animate.css'
import Vue from 'vue'
import router from './router'
import './plugins/bootstrap-vue'
import '@babel/polyfill'
import 'mutationobserver-shim'
import App from './components/App.vue'
import { VuejsDatatableFactory } from 'vuejs-datatable'
import WOW from 'wowjs'
import store from './store'
import _ from 'lodash'
import HighchartsVue from 'highcharts-vue'
import Raphael from 'raphael/raphael'
import VueScrollProgressBar from '@guillaumebriday/vue-scroll-progress-bar'
import axios from 'axios'
import moment from "moment";

require('./store/subscriber')
    // import jquery from 'jquery'
    // import magnific from './assets/js/jquery.magnific-popup.min.js'

// import select from './assets/js/select2.min.js'

// import counterup from './assets/js/jquery.counterup.min.js'
// import waypoint from './assets/js/waypoints.min.js'

// import custom from './assets/js/custom.js'
axios.defaults.baseURL = 'http://localhost:8080/api'
    // axios.defaults.baseURL = 'http://103.140.109.26:81/api'
axios.defaults.headers.common['content-type'] = 'application/json'

// axios.defaults.headers.common['crossorigin'] = 'true'

axios.interceptors.request.use((config) => {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    store.dispatch('updateLoader', true);
    return config;
});
axios.interceptors.response.use((config) => {
    store.dispatch('updateLoader', false);
    return config;
});
global.Raphael = Raphael

const components = require.context('./components/sofbox')
_.forEach(components.keys(), (fileName) => {
    const componentConfig = components(fileName)
    const componentName = fileName.split('/').pop().split('.')[0]
    Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.filter('reverse', function(value) {
    // slice to make a copy of array, then reverse the copy
    return value.slice().reverse()
})
Vue.use(HighchartsVue)
    // Vue.use(jquery)
    // Vue.use(select)

// Vue.use(magnific)
Vue.use(WOW)

Vue.use(VueScrollProgressBar)
    // Vue.use(waypoint)
    // Vue.use(counterup)

// Vue.use(custom)


Vue.config.productionTip = false

Vue.use(VuejsDatatableFactory)


// custome filters

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('-');
};
Vue.filter('currency', function(value) {
    // if (typeof value !== "number") {
    //     return value;
    // }
    var formatter = new Intl.NumberFormat('id-ID', {
        // style: 'currency',
        // currency: '',
        // minimumFractionDigits: 0
    });
    return "Rp" + formatter.format(value);
});
Vue.filter("formatDate", function(value) {
    if (value) {
        // return moment(String(value)).format('MMM Do YYYY')
        return moment(String(value)).format("D-MMM`YY");
    }
});

Vue.filter("date_to_age", function(value) {
    if (value) {
        // return moment(String(value)).format('MMM Do YYYY')
        let fromTime = moment(String(value)).diff(moment(), "milliseconds");
        let duration = moment.duration(fromTime);
        let timeString =
            duration.years() / -1 + "th " + duration.months() / -1 + "bln";

        return timeString; //moment(String(value)).format('D-MMM`YY')
    }
});


store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
    const vm = new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App)
    });
})