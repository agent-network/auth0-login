<template>
  <div class="w-100">
    <h2 class="title">ログイン</h2>
    <div class="auth0-form">
      <alert-box></alert-box>
      <form @submit.prevent="handleSubmit">
        <ValidationObserver v-slot="{ invalid }">
          <div class="form-group mb-3">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <label>メールアドレス</label>
              <EmailInput v-model="email" :isInvalid="!!errors.length" />
              <ValidationError :error="errors[0]" />
            </ValidationProvider>
          </div>
          <div class="form-group pt-1 mb-4">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <label>パスワード</label>
              <PasswordInput v-model="password" :isInvalid="!!errors.length" />
              <ValidationError :error="errors[0]" />
            </ValidationProvider>
          </div>
          <div class="form-group d-flex justify-content-center mb-3">
            <SubmitButton
              :isSubmiting="status.changing"
              :isDisabled="invalid"
            />
          </div>
        </ValidationObserver>
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
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import alertBox from '../component/Alert';
import EmailInput from '../component/EmailInput.vue';
import PasswordInput from '../component/PasswordInput.vue';
import SubmitButton from '../component/SubmitButton.vue';
import ValidationError from '../component/ValidationError.vue';

export default {
  components: {
    'alert-box': alertBox,
    ValidationObserver,
    ValidationProvider,
    ValidationError,
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
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
