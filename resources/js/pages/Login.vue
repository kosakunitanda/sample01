<template>
<div class="">
    <form class="form" @submit.prevent="login">
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" v-model="loginForm.email" v-bind:class="{ 'is-invalid': loginErrors && loginErrors.email }">
        <div class="invalid-feedback" >
            <ul v-if="loginErrors && loginErrors.email">
                <li v-for="msg in loginErrors.email" :key="msg">{{ msg }}</li>
            </ul>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">パスワード</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder=""  v-model="loginForm.password" v-bind:class="{ 'is-invalid': loginErrors && loginErrors.password }">
        <div class="invalid-feedback" >
            <ul v-if="loginErrors && loginErrors.password">
                <li v-for="msg in loginErrors.password" :key="msg">{{ msg }}</li>
            </ul>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">ログイン</button>
    </form>

</div>
</template>

<script>
import {
    mapState
} from 'vuex'

export default {
    data() {
        return {
            loginForm: {
                email: '',
                password: ''
            },
            registerForm: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
        }
    },
    computed: {
        apiStatus() {
            return this.$store.state.auth.apiStatus
        },
        loginErrors() {
            return this.$store.state.auth.loginErrorMessages
        },
        registerErrors() {
            return this.$store.state.auth.registerErrorMessages
        }
    },
    created() {
        this.clearError()
    },
    methods: {
        async login() {
            // authストアのloginアクションを呼び出す
            await this.$store.dispatch('auth/login', this.loginForm)

            if (this.apiStatus) {
                // トップページに移動する
                this.$router.push('/')
            }
        },
        async register() {
            // authストアのresigterアクションを呼び出す
            await this.$store.dispatch('auth/register', this.registerForm)

            if (this.apiStatus) {
                // トップページに移動する
                this.$router.push('/')
            }
        },
        clearError() {
            this.$store.commit('auth/setLoginErrorMessages', null)
            this.$store.commit('auth/setRegisterErrorMessages', null)
        }
    }
}
</script>
