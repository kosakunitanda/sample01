import {
    OK,
    CREATED,
    UNPROCESSABLE_ENTITY
} from '../util'

const state = {
    tasks: [],
    apiStatus: null,
    taskErrorMessages: null,
    commentErrorMessages: null,
}

const getters = {
    tasks: state => state.tasks ? state.tasks : [],
}

const mutations = {
    setTasks(state, tasks) {
        state.tasks = tasks
    },
    setApiStatus(state, status) {
        state.apiStatus = status
    },
    setTaskErrorMessages(state, messages) {
        state.taskErrorMessages = messages
    },
    setCommentErrorMessages(state, messages) {
        state.taskErrorMessages = messages
    },
}

const actions = {
    async all(context) {
        context.commit('setApiStatus', null)
        const response = await axios.get('/api/tasks')
        const tasks = response.data || []

        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setTasks', tasks)
            return false
        }

        context.commit('setApiStatus', false)
        if (response.status === UNPROCESSABLE_ENTITY) {
            // context.commit('taskErrorMessages', response.data.errors)
        } else {
            context.commit('error/setCode', response.status, {
                root: true
            })
        }


    },
    // タスク登録
    async create(context, data) {
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/task/create', data)

        if (response.status === OK) {
            console.log(response.status,state.apiStatus);
            context.commit('setApiStatus', true)
            return false
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit('setTaskErrorMessages', response.data.errors)
        } else {
            context.commit('error/setCode', response.status, {
                root: true
            })
        }
    },
    async comment(context, data) {

        context.commit('setApiStatus', null)
        const response = await axios.post('/api/task/comment', data)

        if (response.status === OK) {
            console.log(response.status,state.apiStatus);
            context.commit('setApiStatus', true)
            return false
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit('setCommentErrorMessages', response.data.errors)
        } else {
            context.commit('error/setCode', response.status, {
                root: true
            })
        }

    },
    async done(context, data) {

        context.commit('setApiStatus', null)
        const response = await axios.post('/api/task/done', data)

        if (response.status === OK) {
            console.log(response.status,state.apiStatus);
            context.commit('setApiStatus', true)
            return false
        }

        if (response.status === UNPROCESSABLE_ENTITY) {
            // context.commit('setCommentErrorMessages', response.data.errors)
        } else {
            context.commit('error/setCode', response.status, {
                root: true
            })
        }

    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
