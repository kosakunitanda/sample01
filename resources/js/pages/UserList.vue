<template>
<div class="">
    <div class="mb-2">
        <button type="button" class="btn btn-primary" v-on:click="open_user_create_form">
            ユーザーの追加
        </button>
    </div>
    <table class="table table-hover">
        <thead>
            <tr>
                <th>ID</th>
                <th>ユーザー名</th>
                <th>role</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users">
                <th>{{ user.id }}</th>
                <td>{{ user.name }}</td>
                <td>{{ user.role }}</td>
                <td>
                    <button type="button" class="btn btn-primary mr-1" v-on:click="open_edit_form(user)">
                        編集
                    </button>
                    <button type="button" class="btn btn-danger" v-on:click="open_delete_form(user)">
                        削除
                    </button>
                </td>
            </tr>
        </tbody>
    </table>


        <!-- userCreateModal -->
        <div class="modal fade" id="userCreateModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="userCreateModal">ユーザーの追加</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="tuser_create_form_item_1">名前</label>
                                <input type="text" class="form-control" id="tuser_create_form_item_1" v-model="userForm.name" v-bind:class="{ 'is-invalid': createErrors && createErrors.name }" />
                                <div class="invalid-feedback" >
                                    <ul v-if="createErrors && createErrors.name">
                                        <li v-for="msg in createErrors.name" :key="msg">{{ msg }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tuser_create_form_item_2">権限</label>
                                <select class="form-control" id="tuser_create_form_item_2" v-model="userForm.role" v-bind:class="{ 'is-invalid': createErrors && createErrors.role }" >
                                    <option v-for="role in ['admin','user']" v-bind:value="role">{{ role }}</option>
                                </select>
                                <div class="invalid-feedback" >
                                    <ul v-if="createErrors && createErrors.role">
                                        <li v-for="msg in createErrors.role" :key="msg">{{ msg }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tuser_create_form_item_3">メールアドレス</label>
                                <input type="email" class="form-control" id="tuser_create_form_item_3" v-model="userForm.email" v-bind:class="{ 'is-invalid': createErrors && createErrors.email }" />
                                <div class="invalid-feedback" >
                                    <ul v-if="createErrors && createErrors.email">
                                        <li v-for="msg in createErrors.email" :key="msg">{{ msg }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tuser_create_form_item_4">パスワード</label>
                                <input type="password" class="form-control" id="tuser_create_form_item_4" v-model="userForm.password"v-bind:class="{ 'is-invalid': createErrors && createErrors.password }"  />
                                <div class="invalid-feedback" >
                                    <ul v-if="createErrors && createErrors.password">
                                        <li v-for="msg in createErrors.password" :key="msg">{{ msg }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tuser_create_form_item_5">パスワード(確認)</label>
                                <input type="password" class="form-control" id="tuser_create_form_item_5" v-model="userForm.password_confirmation" v-bind:class="{ 'is-invalid': createErrors && createErrors.password_confirmation }" />
                                <div class="invalid-feedback" >
                                    <ul v-if="createErrors && createErrors.password_confirmation">
                                        <li v-for="msg in createErrors.password_confirmation" :key="msg">{{ msg }}</li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                        <button type="button" class="btn btn-primary" v-on:click="create_user">登録</button>
                    </div>
                </div>
            </div>
        </div>


            <!-- userEditModal -->
            <div class="modal fade" id="userEditModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="userEditModal">ユーザーの編集</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="edit_item_1">名前</label>
                                    <input type="text" class="form-control" id="edit_item_1" v-model="userEditForm.name" v-bind:class="{ 'is-invalid': editErrors && editErrors.name }" />
                                    <div class="invalid-feedback" >
                                        <ul v-if="editErrors && editErrors.name">
                                            <li v-for="msg in editErrors.name" :key="msg">{{ msg }}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="edit_item_12">権限</label>
                                    <select class="form-control" id="edit_item_12" v-model="userEditForm.role" v-bind:class="{ 'is-invalid': editErrors && editErrors.name }">
                                        <option v-for="role in ['admin','user']" v-bind:value="role">{{ role }}</option>
                                    </select>
                                    <div class="invalid-feedback" >
                                        <ul v-if="editErrors && editErrors.role">
                                            <li v-for="msg in editErrors.role" :key="msg">{{ msg }}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="edit_item_13">メールアドレス</label>
                                    <input type="email" class="form-control" id="edit_item_13" v-model="userEditForm.email" v-bind:class="{ 'is-invalid': editErrors && editErrors.email }" />
                                    <div class="invalid-feedback" >
                                        <ul v-if="editErrors && editErrors.email">
                                            <li v-for="msg in editErrors.email" :key="msg">{{ msg }}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="edit_item_14">パスワード</label>
                                    <input type="password" class="form-control" id="edit_item_14" v-model="userEditForm.password" v-bind:class="{ 'is-invalid': editErrors && editErrors.password }" />
                                    <div class="invalid-feedback" >
                                        <ul v-if="editErrors && editErrors.password">
                                            <li v-for="msg in editErrors.password" :key="msg">{{ msg }}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="edit_item_15">パスワード(確認)</label>
                                    <input type="password" class="form-control" id="edit_item_15" v-model="userEditForm.password_confirmation" v-bind:class="{ 'is-invalid': editErrors && editErrors.password_confirmation }" />
                                    <div class="invalid-feedback" >
                                        <ul v-if="editErrors && editErrors.password_confirmation">
                                            <li v-for="msg in editErrors.password_confirmation" :key="msg">{{ msg }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                            <button type="button" class="btn btn-primary" v-on:click="edit_user">編集</button>
                        </div>
                    </div>
                </div>
                </div>

    <!-- userDeleteModal -->
    <div class="modal fade" id="userDeleteModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="userEditModal">ユーザーの削除</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ID:{{ userDeleteForm.id }}<br />
                    {{ userDeleteForm.name }}<br />
                    を削除します。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                    <button type="button" class="btn btn-danger" v-on:click="delete_user">削除</button>
                </div>
            </div>
        </div>
    </div>

</div>
</template>
<script>
export default {
    data() {
        return {
            userForm: {
                name: '',
                email: '',
                role: '',
                password: '',
                password_confirmation: ''
            },
            userEditForm: {
                id: '',
                name: '',
                email: '',
                role: '',
                password: '',
                password_confirmation: ''
            },
            userDeleteForm: {
                id: '',
                name: ''
            },
        }
    },
    computed: {
        apiStatus() {
            return this.$store.state.user.apiStatus
        },
        createErrors() {
            return this.$store.state.user.userCreateErrorMessages
        },
        editErrors() {
            return this.$store.state.user.userEditErrorMessages
        },
        users() {
            return this.$store.getters['user/users']
        },
    },
    created() {
        this.$store.dispatch('user/all')
    },
    methods: {
        open_user_create_form() {
            $('#userCreateModal').modal()
        },
        open_edit_form(user){
            this.userEditForm.id = user.id;
            this.userEditForm.name = user.name;
            this.userEditForm.email = user.email;
            this.userEditForm.role = user.role;
            $('#userEditModal').modal()
        },
        open_delete_form(user){
            this.userDeleteForm.id = user.id;
            this.userDeleteForm.name = user.name;
            $('#userDeleteModal').modal()
        },
        async create_user() {
            await this.$store.dispatch('user/create', this.userForm)

            if (this.apiStatus) {
                this.userForm.name = '';
                this.userForm.email = '';
                this.userForm.role = '';
                this.userForm.password = '';
                this.userForm.password_confirmation = '';
                this.$store.dispatch('user/all')
                $('#userCreateModal').modal('hide')
            }

        },
        async edit_user() {
            await this.$store.dispatch('user/edit', this.userEditForm)
            if (this.apiStatus) {
                this.userEditForm.id = "";
                this.userEditForm.name = "";
                this.userEditForm.email = "";
                this.userEditForm.role = "";
                this.$store.dispatch('user/all')
                $('#userEditModal').modal('hide')
            }

        },
        async delete_user() {
            // authストアのresigterアクションを呼び出す
            const response = await axios.post('/api/user/delete', this.userDeleteForm)
            this.$store.dispatch('user/all')

            $('#userDeleteModal').modal('hide')
        }
    }
}
</script>
