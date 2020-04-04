import Vue from "vue"
import vueRouter from "vue-router"
Vue.use(vueRouter)

const routes = [
    {
        path:"/",
        redirect:"/Login"
    },
    {
        path:'/login',
        nsme:"Login",
        component:() => import("@/components/Login")
    },
    {
        path:'/home',
        nsme:"Home",
        component:() => import("@/components/Home"),
        children:[
            {
                path:"/",
                redirect:"/welcome"
            },
            {
                path:'/welcome',
                nsme:"Welcome",
                component:() => import("@/components/Welcome")
            },
            {
                path:'/users',
                nsme:"User",
                component:() => import("@/views/user/User")
            },
            {
                path:'/rights',
                nsme:"PowerList",
                component:() => import("@/views/power/PowerList")
            },
            {
                path:'/roles',
                nsme:"PowerRoles",
                component:() => import("@/views/power/PowerRoles")
            },
            {
                path:'/categories',
                nsme:"Goods_class",
                component:() => import("@/views/goods/Goods_class")
            },
            {
                path:'/params',
                nsme:"Goods_parameter",
                component:() => import("@/views/goods/Goods_parameter")
            },
            {
                path:'/goods',
                nsme:"Goods_list",
                component:() => import("@/views/goods/Goods_list")
            },
            {
                path:'/goods/add',
                nsme:"AddGoods",
                component:() => import("@/views/goods/AddGoods")
            },
            {
                path:'/orders',
                nsme:"AddGoods",
                component:() => import("@/views/order/Order")
            },
            {
                path:'/reports',
                nsme:"Report",
                component:() => import("@/views/report/Report")
            }
        ]
    }
]
const router = new vueRouter({
    routes,
    mode:"history"
})
router.beforeEach((to,from,next) => {
    if(to.path == "/login") return next();
    const getToken = window.sessionStorage.getItem("token");
    if(getToken){
        return next();
    }else{
        next("/login");
    }
})
export default router