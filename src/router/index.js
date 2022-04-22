import VueRouter from 'vue-router'

import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'
import Page1 from '@/views/Home/PageOne.vue'
import Page2 from '@/views/Home/PageTwo.vue'
import Test from '@/views/TestComponent/index.vue'

const router = new VueRouter({
    routes: [
    {
        path: '/',
        redirect: '/login'
        // redirect: '/test'
    }, 
    {
        name: "Test",
        path: "/test",
        component: Test
    },
    {
        name: "Home",
        path: '/home',
        component: Home,
        children: [{
            name: "Page1",
            path: 'page1',
            component: Page1,
            }, 
            {
            name: "Page2",
            path: 'page2',
            component: Page2  },
        { path: "", redirect: "page1" }]
    },
    {
        name: "Login",
        path: '/login',
        component: Login
    }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.path == "/login" || to.path == "/") return next();
    const minitoken = sessionStorage.getItem("minitoken");
    if (!minitoken) {
        alert("请先登录");
        return next("/login");
    }
    next();
})
export default router