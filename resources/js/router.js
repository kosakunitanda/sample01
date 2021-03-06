import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import TaskList from './pages/TaskList.vue'
import UserList from './pages/UserList.vue'
import Login from './pages/Login.vue'
import SystemError from './pages/errors/System.vue'

import store from './store'

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [{
        path: '/',
        component: TaskList,
        beforeEnter(to, from, next) {
            if (store.getters['auth/check']) {
                next()
            } else {
                next('/login')
            }
        }
    }, {
        path: '/users',
        component: UserList,
        beforeEnter(to, from, next) {
            if (store.getters['auth/check']) {
                next()
            } else {
                next('/login')
            }
        }
    },

    {
        meta: {
            title: 'ログイン',
            desc: ''
        },
        path: '/login',
        component: Login,
        beforeEnter(to, from, next) {
            if (store.getters['auth/check']) {
                next('/')
            } else {
                next()
            }
        }
    },
    {
        path: '/500',
        component: SystemError
    }
]

// VueRouterインスタンスを作成する
const router = new VueRouter({
    mode: 'history',
    routes
})

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router
