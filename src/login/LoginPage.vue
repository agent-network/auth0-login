<template>
  <div class="w-100">
    <h2 class="title">ログイン</h2>
    <div class="auth0-form">
      <alert-box></alert-box>
      <form @submit.prevent="handleSubmit">
        <div class="form-group mb-3">
          <label for="email">メールアドレス</label>
          <EmailInput v-model="email" />
        </div>
        <div class="form-group pt-1 mb-4">
          <label htmlFor="password">パスワード</label>
          <PasswordInput v-model="password" />
        </div>
        <div class="form-group d-flex justify-content-center mb-3">
          <SubmitButton :isSubmiting="status.changing" />
        </div>
      </form>
    </div>
    <div class="white-text-center d-flex justify-content-center">
      <router-link to="/login/resetpassword" class="white-text-center btn-link">
        パスワードを忘れた場合はこちら
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import alertBox from '../component/Alert';
import EmailInput from '../component/EmailInput.vue';
import PasswordInput from '../component/PasswordInput.vue';
import SubmitButton from '../component/SubmitButton.vue';

export default {
  components: {
    'alert-box': alertBox,
    EmailInput,
    PasswordInput,
    SubmitButton,
  },
  data() {
    return {
      email: '',
      password: '',
      submitted: false,
      showPassword: false,
    };
  },
  computed: {
    ...mapState('account', ['status']),
  },
  created() {
    // reset login status
    this.logout();
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    handleSubmit(e) {
      this.submitted = true;
      const { email, password } = this;
      if (email && password) {
        this.login({ email, password });
      } else {
        this.$store.dispatch(
          'alert/error',
          'メールアドレスとパスワードを入力してください',
          { root: true }
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
