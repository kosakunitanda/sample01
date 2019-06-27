import {
    OK,
    CREATED,
    UNPROCESSABLE_ENTITY
} from '../util'

const state = {
  users: [],
  apiStatus: null,
  userCreateErrorMessages: null,
  userEditErrorMessages: null,
}

const getters = {
  users: state => state.users ? state.users : [],
}

const mutations = {
  setUsers (state, users) {
    state.users = users
},
setApiStatus(state, status) {
    state.apiStatus = status
},
setUserCreateErrorMessages(state, messages) {
    state.userCreateErrorMessages = messages
},
setUserEditErrorMessages(state, messages) {
    state.userEditErrorMessages = messages
},
}

const actions = {
  // ログインユーザーチェック
  async all (context) {
    const response = await axios.get('/api/users')
    const users = response.data || []

      context.commit('setUsers', users)
      return false

  },
  // タスク登録
  async create(context, data) {
      context.commit('setApiStatus', null)

      const response = await axios.post('/api/user/create', data)

      if (response.status === OK) {
          context.commit('setApiStatus', true)
          return false
      }

      if (response.status === UNPROCESSABLE_ENTITY) {
          context.commit('setUserCreateErrorMessages', response.data.errors)
      } else {
          context.commit('error/setCode', response.status, {
              root: true
          })
      }
  },
  // タスク登録
  async edit(context, data) {
      context.commit('setApiStatus', null)

      const response = await axios.post('/api/user/edit', data)

      if (response.status === OK) {
          console.log(response.status,state.apiStatus);
          context.commit('setApiStatus', true)
          return false
      }

      if (response.status === UNPROCESSABLE_ENTITY) {
          context.commit('setUserEditErrorMessages', response.data.errors)
      } else {
          context.commit('error/setCode', response.status, {
              root: true
          })
      }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
