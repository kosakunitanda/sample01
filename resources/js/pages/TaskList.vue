<template>
<div class="">
    <div class="mb-2">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" v-on:click="open_task_form">
            タスクの追加
        </button>
    </div>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>ID</th>
                <th>タスク内容</th>
                <th>依頼者</th>
                <th>作業者</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="task in tasks" v-show="!task.parent_task_id">
                <th>{{ task.id }}</th>
                <td>{{ task.contents }}
                    <ul>
                        <li v-for="childr_task in task.children">{{ childr_task.contents }}</li>
                    </ul>
                    <hr />
                    <ul v-if="task.comments">
                        <li v-for="comment in task.comments"><span class="badge badge-secondary">{{ comment.user.name }}</span> {{ comment.comment }} </li>
                    </ul>
                </td>
                <td>{{ task.request_user.name }}</td>
                <td>{{ task.assigned_user.name }}</td>
                <td>
                    <button type="button" class="btn btn-primary mr-2" v-on:click="open_comment_form(task.id)">
                            コメントの追加
                    </button>
                    <button type="button" class="btn btn-primary" v-on:click="open_done_form(task)">
                            タスクの完了
                    </button>
                </td>
            </tr>
        </tbody>
    </table>

    <!-- TaskModal -->
    <div class="modal fade" id="taskModal" tabindex="-1" role="dialog" aria-labelledby="taskModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="taskModalLabel">タスクの登録</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="task_form_item_1">タスク内容</label>
                            <textarea class="form-control" id="task_form_item_1" rows="3" v-model="taskForm.contents" v-bind:class="{ 'is-invalid': taskErrors && taskErrors.contents }"></textarea>
                            <div class="invalid-feedback" >
                                <ul v-if="taskErrors && taskErrors.contents">
                                    <li v-for="msg in taskErrors.contents" :key="msg">{{ msg }}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="task_form_item_2">親タスク</label>
                            <select class="form-control" id="task_form_item_2"  v-model="taskForm.parent_task_id">
                                <option></option>
                                <option v-for="task in tasks" v-bind:value="task.id">{{ task.contents }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="task_form_item_3">作業者</label>
                            <select class="form-control" id="task_form_item_3"  v-model="taskForm.assigned_user_id" required v-bind:class="{ 'is-invalid': taskErrors && taskErrors.assigned_user_id }">
                                <option v-for="user in users" v-bind:value="user.id">{{ user.name }}</option>
                            </select>
                            <div class="invalid-feedback" >
                                <ul v-if="taskErrors && taskErrors.assigned_user_id">
                                    <li v-for="msg in taskErrors.assigned_user_id" :key="msg">{{ msg }}</li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                    <button type="button" class="btn btn-primary" v-on:click="create_task">タスク登録</button>
                </div>
            </div>
        </div>
    </div>
    <!-- CommentModal -->
    <div class="modal fade" id="commentModal" tabindex="-1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="taskModalLabel">コメントの追加</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="comment_form_item_1">コメント内容</label>
                            <textarea class="form-control" id="comment_form_item_1" rows="3" v-model="commentForm.comment" v-bind:class="{ 'is-invalid': commentErrors && commentErrors.comment }"></textarea>
                            <div class="invalid-feedback" >
                                <ul v-if="taskErrors && commentErrors.comment">
                                    <li v-for="msg in commentErrors.comment" :key="msg">{{ msg }}</li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                    <button type="button" class="btn btn-primary" v-on:click="create_comment">コメント登録</button>
                </div>
            </div>
        </div>
    </div>

    <!-- doneModal -->
    <div class="modal fade" id="doneModal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="taskModalLabel">タスクの完了</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    下記タスクと小タスクを完了します。<br />
                    ID:{{ taskDoneForm.id }}<br />
                    {{ taskDoneForm.contents }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                    <button type="button" class="btn btn-primary" v-on:click="task_done">決定</button>
                </div>
            </div>
        </div>
    </div>

</div>
</template>
<script>
import {
    mapState
} from 'vuex'

export default {
    data() {
        return  {
            taskForm: {
                contents: '',
                assigned_user_id: '',
                parent_task_id: ''
            },
            commentForm: {
                comment: '',
                task_id:''
            },
            taskDoneForm: {
                contents: '',
                id:''
            },
        }
    },
    computed: {
        apiStatus() {
            return this.$store.state.task.apiStatus
        },
        taskErrors() {
            return this.$store.state.task.taskErrorMessages
        },
        commentErrors() {
            return this.$store.state.task.commentErrorMessages
        },
        tasks() {
            return this.$store.getters['task/tasks']
        },
        users() {
            return this.$store.getters['user/users']
        },
        isLogin () {
          return this.$store.getters['auth/check']
        }
    },
    created() {
        this.$store.dispatch('task/all')
        this.$store.dispatch('user/all')

    },
    methods: {
        open_task_form() {
            $('#taskModal').modal()
        },
        open_comment_form(task_id){
            this.commentForm.task_id = task_id;

            $('#commentModal').modal()
        },
        open_done_form(task) {
            this.taskDoneForm.id = task.id;
            this.taskDoneForm.contents = task.contents;
            $('#doneModal').modal()
        },
        async create_task(){
            await this.$store.dispatch('task/create', this.taskForm)

            if (this.apiStatus) {
                this.taskForm.contents = '';
                this.taskForm.assigned_user_id = '';
                this.taskForm.parent_task_id = '';
                this.$store.dispatch('task/all')
                $('#taskModal').modal('hide')
            }

        },
        async create_comment(task_id){
            await this.$store.dispatch('task/comment', this.commentForm)

            if (this.apiStatus) {
                this.commentForm.comment = '';
                this.commentForm.task_id = '';
                this.$store.dispatch('task/all')
                $('#commentModal').modal('hide')
            }

        },
        async task_done(){
            await this.$store.dispatch('task/done', this.taskDoneForm)

            if (this.apiStatus) {
                this.$store.dispatch('task/all')
                $('#doneModal').modal('hide')
            }

        }

    }
}
</script>
