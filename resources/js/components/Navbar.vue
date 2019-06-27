<template>
<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
    <h5 class="my-0 font-weight-normal">タスク管理アプリ</h5>
    <nav class="my-2 my-md-0 mr-md-3">

        <RouterLink class="p-2" to="/" v-if="isLogin">
            タスク一覧
        </RouterLink>
        <RouterLink class="p-2" to="/users" v-if="role == 'admin'">
            ユーザー一覧
        </RouterLink>
    </nav>
    <h5 class="my-0 mr-md-auto font-weight-normal"></h5>

    <span v-if="isLogin" class="mr-md-2">
        {{ username }}でログイン中
    </span>
    <button v-if="isLogin" class="btn btn-outline-primary" @click="logout">
        ログアウト
    </button>
</div>
</template>
<script>
import {
    mapState,
    mapGetters
} from 'vuex'

export default {
    computed: {
        isLogin() {
            return this.$store.getters['auth/check']
        },
        username() {
            return this.$store.getters['auth/username']
        },
        role() {
            return this.$store.getters['auth/role']
        },
        ...mapState({
            apiStatus: state => state.auth.apiStatus
        }),
    },
    methods:{
        async logout() {
            await this.$store.dispatch('auth/logout')

            if (this.apiStatus) {
                this.$router.push('/login')
            }
        }
    }
}
</script>
