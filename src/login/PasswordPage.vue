<template>
    <div class="w-100">
        <h2 class="title">パスワードをリセット</h2>
        <div class="description">登録したメールアドレスを入力してください。入力したメールアドレスへご連絡いたします。</div>
        <div class="auth0-form">
            <form @submit.prevent="handleSubmit">
                <div class="form-group mb-4">
                    <label for="email">メールアドレス</label>
                    <input type="email" v-model="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && !email }" placeholder="メールアドレスを入力" />
                    <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
                </div>
                <div class="form-group d-flex justify-content-center">
                    <button class="btn btn-primary btn-block">送信</button>
                </div>
            </form>
        </div>
        <div class="white-text-center d-flex justify-content-center">
            <router-link to="/login" class="white-text-center btn-link">ログインに戻る</router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            email: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        // reset login status
        this.connection = window['auth0Config'].connection;
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout', 'changePassword']),
        handleSubmit (e) {
            this.submitted = true;
            const { email } = this;
            if (email) {
                this.changePassword({ email, connection: this.connection  })
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.description {
    font-weight: normal;
    font-size: 14px;
    line-height: 140%;
    text-align: left;
    margin-bottom: 32px;
}
</style>