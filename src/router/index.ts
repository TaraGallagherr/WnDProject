import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Catalogue from "../components/Catalogue.vue";
import ProductDetail from "../components/ProductDetail.vue";
import Home from "../components/Home.vue";
import Cart from "../components/Cart.vue";


const routes: Array<RouteRecordRaw> = [

    {
        path: '/',
        name: 'HomeView',
        component: Home,
        props:true
    },

{
    path: '/Catalogue',
    name: 'Catalogue',
    component: Catalogue,
    props:true,

    //children: [{ path: '', name: 'user', component:  }],
},

{
    path: '/product/:id',
    name: 'ProductView',
    component: ProductDetail,
    props:true
},

    {
        path: '/cart',
        name: 'CartView',
        component: Cart,
        props:true
    },

]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes                  // so router aware of routes being used
})

export default router
