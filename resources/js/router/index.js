import Vue from 'vue'
import VueRouter from 'vue-router'
/* Layouts */
import Layout1 from '../layouts/Layout1'
import list_igd from '../views/igd/list'
import AuthLayout1 from '../layouts/AuthLayouts/AuthLayout1'
import SignIn1 from '../views/AuthPages/Default/SignIn1'
import notfound from '../views/Pages/ErrorPage'
import igdpasien_dashboard from '../views/igd/Patient'
import analytics from '../views/Dashboards/Analytics'
import poli_dashboard from '../views/poli/dashboard'
import upload_pdf from '../views/upload_pdf/pdf'

// store
import store from '../store'


Vue.use(VueRouter)

function guardMyroute(to, from, next) {
    let user = store.getters['auth/user'];
    let home = [];

    let to_parent = to.name.split('.')[0];
    if (user) {
        routes.forEach(element1 => {
            console.log(element1);
            if (element1.meta.group) {

                element1.meta.group.forEach(ele => {
                    console.log('elemnt is ' + ele);
                    if (ele == user.GroupUser) {
                        home[home.length] = element1.meta.home;

                    }
                });

            }
        });
        store.dispatch('auth/update_home_user', home);

    }
    console.log('home is ' + home);

    if (!(store.getters['auth/authenticated']) && to.path != '/auth/signin') {
        next({ "name": 'auth.signin' });
    } else if ((store.getters['auth/authenticated'])) {

        if ((to.path == '/home' || to.path == '/' || to.path == '/auth/signin' || !home.includes(to_parent))) { // || !(to.name == user.GroupUser + '.home')) {
            next({ "name": home[0] + '.home' });
        } else if (home.includes(to_parent)) {

            next();

        }

    } else {
        next();
    }
};

const igdchildRoutes = (prop) => [{
        path: '',
        name: prop + '.home',
        component: list_igd,

        props: {

        },
        beforeEnter: guardMyroute,
    },
    {
        path: '/floor_stok',
        name: prop + '.floor_stok',
        component: list_igd,
        meta: {
            requiresauth: true,
            group: 'igd',
        },
        props: {

        },
        beforeEnter: guardMyroute,
    },
    {
        path: '/order_cssd',
        name: prop + '.order_cssd',
        component: list_igd,
        meta: {
            requiresauth: true,
            group: 'igd',
        },
        props: {

        },
        beforeEnter: guardMyroute,
    },
    {
        path: '/antrian_poli',
        name: prop + '.antrian_poli',
        component: poli_dashboard,
        meta: {
            requiresauth: true,
            group: 'igd',
        },
        props: {

        },
        beforeEnter: guardMyroute,
    },
    {
        path: '/arsip_kunjungan',
        name: prop + '.arsip_kunjungan',
        component: list_igd,
        meta: {
            requiresauth: true,
            group: 'igd',
        },
        props: {

        },
        beforeEnter: guardMyroute,
    },
    {
        path: '/upload_pdf',
        name: prop + '.upload_pdf',
        component: upload_pdf,
        meta: {
            requiresauth: true,
            group: 'igd',
        },
        props: {

        },
        beforeEnter: guardMyroute,
    },
    {
        path: 'dashboard/:episode',
        name: prop + '.dashboard',
        component: igdpasien_dashboard,
        meta: {
            requiresauth: true,
            pasien: true,
            group: 'igd',
        },
        beforeEnter: guardMyroute,
    },
]
const authChildRoutes = (prop) => [{
    path: 'signin',
    name: prop + '.signin',
    component: SignIn1,
    beforeEnter: guardMyroute
}, ]
const anaChildRoutes = (prop) => [{
    path: '',
    name: prop + '.home',
    component: analytics,
    beforeEnter: guardMyroute
}, ]
const poliChildRoutes = (prop) => [{
        path: '',
        name: prop + '.home',
        component: poli_dashboard,
        beforeEnter: guardMyroute
    },
    {
        path: 'dashboard',
        name: prop + '.dashboard',
        component: poli_dashboard,
        beforeEnter: guardMyroute
    },

]
const routes = [{
        path: '/',
        name: 'home',
        meta: {
            requiresauth: false,

        },
        beforeEnter: guardMyroute,
    },
    {
        path: '/igd',
        meta: {
            requiresauth: true,
            group: ['Perawat RI ICU', 'Perawat IGD', 'Dokter', 'Admin'],
            home: 'igd'
        },
        component: Layout1,
        children: igdchildRoutes('igd')
    },
    {
        path: '/poli',
        meta: {
            requiresauth: true,
            group: ['Admin', 'Perawat Poli', 'Dokter'],
            home: 'poli'
        },
        component: Layout1,
        children: poliChildRoutes('poli')
    },
    {
        path: '/analytics',
        meta: {
            requiresauth: true,

        },
        component: Layout1,
        children: anaChildRoutes('ana')
    },
    {
        path: '/auth',
        name: 'auth',
        meta: {
            requiresauth: false,

        },
        component: AuthLayout1,
        children: authChildRoutes('auth')
    },
    {
        path: '*',
        meta: {
            requiresauth: false,

        },
        name: 'notfound',
        component: notfound
    },
]
const router = new VueRouter({
    mode: 'history',
    routes
})
export default router