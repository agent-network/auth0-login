<template>
  <div class="w-100">
    <div v-if="!submitted || !success" class="w-100">
      <h2 class="title">パスワードを設定してください</h2>
      <div class="auth0-form">
        <alert-box></alert-box>
        <form @submit.prevent="handleSubmit">
          <ValidationObserver v-slot="{ invalid }">
            <div class="form-group mb-4">
              <ValidationProvider
                vid="password"
                rules="required|min:8|password-number|password-spchar|password-invalid"
                v-slot="{ errors }"
              >
                <label htmlFor="password">パスワード</label>
                <PasswordInput
                  v-model="newPassword"
                  :isInvalid="!!errors.length"
                />
                <ValidationError :error="errors[0]" />
              </ValidationProvider>
            </div>
            <div class="form-group mb-4">
              <ValidationProvider
                rules="required|confirmed:password"
                v-slot="{ errors }"
              >
                <label htmlFor="password-confirm">パスワードを再入力</label>
                <PasswordInput
                  v-model="confirmNewPassword"
                  :isInvalid="!!errors.length"
                />
                <ValidationError :error="errors[0]" />
              </ValidationProvider>
            </div>
            <div class="form-group d-flex justify-content-center">
              <SubmitButton
                :isSubmiting="status.changing"
                :isDisabled="invalid"
              />
            </div>
          </ValidationObserver>
        </form>
      </div>
    </div>
    <div v-else>
      <h2 class="title">パスワード再設定完了</h2>
      <div class="description alignC mb-4">
        パスワードの再設定が完了しました。
      </div>
      <div class="form-group d-flex justify-content-center pt-2">
        <a
          ref="loginButton"
          class="btn btn-primary btn-block"
          :href="redirectUrl"
        >
          ログイン
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import alertBox from '../component/Alert';
import ValidationError from '../component/ValidationError.vue';
import PasswordInput from '../component/PasswordInput.vue';
import SubmitButton from '../component/SubmitButton.vue';

export default {
  components: {
    'alert-box': alertBox,
    ValidationObserver,
    ValidationProvider,
    ValidationError,
    PasswordInput,
    SubmitButton,
  },
  data() {
    return {
      email: '',
      newPassword: '',
      confirmNewPassword: '',
      submitted: false,
      success: false,
      showNewPassword: false,
      showConfirmNewPassword: false,
      newPasswordError: '',
      confirmNewPasswordError: '',
      globalError: '',
      redirectUrl: '',
    };
  },
  computed: {
    ...mapState('account', ['status']),
  },
  created() {
    // reset login status
    // this.logout();
  },
  methods: {
    ...mapActions('account', ['reset']),
    handleSubmit(e) {
      console.log('submit');
      this.submitted = true;
      const { newPassword, confirmNewPassword } = this;
      this.confirmNewPasswordError = '';
      if (newPassword !== confirmNewPassword) {
        this.submitted = true;
        this.confirmNewPasswordError = 'パスワードは一致する必要があります。';
        return;
      }

      fetch('/lo/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _csrf: window.LoResetConfig.csrf_token,
          ticket: window.LoResetConfig.ticket,
          email: window.LoResetConfig.email,
          newPassword,
          confirmNewPassword,
        }),
      })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            this.success = true;
            if (res.body && typeof res.body.request_url === 'string') {
              return window.location.replace(res.body.request_url);
            } else {
              this.redirectUrl = localStorage.getItem('callbackURL');
            }
          } else {
            let getErrorFunc = !!res
              ? this.getResponseError
              : this.getNetworkError;
            let error = getErrorFunc(res);
            this.globalError = error;
          }
        })
        .catch((res) => {
          let getErrorFunc = !!res
            ? this.getResponseError
            : this.getNetworkError;
          let error = getErrorFunc(res);
          // this.$refs.loginButton.setAttribute('href', localStorage.getItem('callbackURL'))
          this.globalError = error;
        });
    },

    getResponseError(res) {
      let body,
        text = res;

      if (!body || typeof body !== 'object') {
        body = {};
      }

      let passwordErrors = {
        PasswordStrengthError: 'weakPasswordError',
        PasswordHistoryError: 'passwordHistoryError',
        PasswordDictionaryError: 'passwordDictError',
        PasswordNoUserInfoError: 'passwordNoUserInfoError',
      };

      let error = passwordErrors[body.name] || 'serverError';

      return error;
    },

    getNetworkError(res) {
      var didTimeout = !!err.timeout;
      var error = didTimeout ? 'timedoutError' : 'networkError';

      return error;
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 480px) {
  .card {
    .title {
      font-size: 16px;
    }
  }
}
</style>
