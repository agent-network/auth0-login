<template>
    <div class="w-100">
      <div  v-if="!submitted||!success" class="w-100">
        <h2 class="title">パスワードを設定してください</h2>
        <div class="auth0-form">
            <alert-box></alert-box>
            <form @submit.prevent="handleSubmit" >
                <div class="form-group mb-4">
                    <label htmlFor="newPassword">新しいパスワード</label>
                    <div class="form-input-password">
                        <input :type="showNewPassword ? 'text' : 'password'" v-model="newPassword" name="newPassword" class="form-control" :class="{ 'is-invalid': submitted && newPasswordError }" placeholder="半角英数で入力" />
                        <div class="toggle-btn" :class="{show: showNewPassword}" @click="showNewPassword = !showNewPassword">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-hide">
                            <path d="M7.70475 4.06155C7.9677 4.02125 8.23335 4.0012 8.49936 4.00158C10.8832 4.00158 13.1246 5.71824 14.4289 8.49936C14.2294 8.9226 14.0041 9.33317 13.7543 9.72875C13.6749 9.85155 13.6332 9.99486 13.6343 10.141C13.636 10.3046 13.6911 10.4632 13.7913 10.5925C13.8915 10.7219 14.0313 10.8149 14.1893 10.8573C14.3473 10.8998 14.5149 10.8894 14.6664 10.8278C14.8179 10.7661 14.9452 10.6566 15.0286 10.5159C15.3779 9.96708 15.6813 9.39041 15.9357 8.79172C15.9759 8.69818 15.9966 8.59743 15.9966 8.49561C15.9966 8.3938 15.9759 8.29305 15.9357 8.19951C14.4214 4.68375 11.5728 2.50233 8.49936 2.50233C8.14753 2.50055 7.79627 2.53066 7.44988 2.59228C7.35144 2.60902 7.25725 2.64498 7.17271 2.69811C7.08816 2.75125 7.01491 2.82051 6.95714 2.90195C6.89936 2.9834 6.85819 3.07542 6.83598 3.17278C6.81377 3.27013 6.81095 3.3709 6.82769 3.46935C6.84442 3.56779 6.88038 3.66197 6.93352 3.74652C6.98665 3.83106 7.05592 3.90431 7.13736 3.96209C7.2188 4.01987 7.31083 4.06103 7.40818 4.08325C7.50554 4.10546 7.60631 4.10828 7.70475 4.09154V4.06155ZM2.28493 1.22046C2.21504 1.15057 2.13206 1.09512 2.04074 1.0573C1.94942 1.01947 1.85154 1 1.7527 1C1.65385 1 1.55597 1.01947 1.46465 1.0573C1.37333 1.09512 1.29035 1.15057 1.22046 1.22046C1.0793 1.36162 1 1.55307 1 1.7527C1 1.95232 1.0793 2.14378 1.22046 2.28493L3.54431 4.60129C2.48401 5.62193 1.64014 6.84567 1.06304 8.19951C1.02176 8.29409 1.00045 8.39617 1.00045 8.49936C1.00045 8.60255 1.02176 8.70463 1.06304 8.79921C2.57729 12.315 5.42588 14.4964 8.49936 14.4964C9.84652 14.4871 11.1619 14.086 12.285 13.342L14.7138 15.7783C14.7835 15.8485 14.8664 15.9043 14.9577 15.9423C15.0491 15.9804 15.1471 16 15.246 16C15.345 16 15.443 15.9804 15.5343 15.9423C15.6257 15.9043 15.7086 15.8485 15.7783 15.7783C15.8485 15.7086 15.9043 15.6257 15.9423 15.5343C15.9804 15.443 16 15.345 16 15.246C16 15.1471 15.9804 15.0491 15.9423 14.9577C15.9043 14.8664 15.8485 14.7835 15.7783 14.7138L2.28493 1.22046ZM7.05258 8.10955L8.88917 9.94615C8.76247 9.98248 8.63116 10.0002 8.49936 9.99862C8.10173 9.99862 7.72039 9.84066 7.43922 9.5595C7.15806 9.27833 7.0001 8.89699 7.0001 8.49936C6.99857 8.36757 7.01624 8.23625 7.05258 8.10955ZM8.49936 12.9971C6.11554 12.9971 3.87415 11.2805 2.57729 8.49936C3.06162 7.4302 3.74901 6.4653 4.60129 5.65827L5.92813 7.0001C5.61647 7.56892 5.49765 8.22345 5.58949 8.86552C5.68134 9.50759 5.97889 10.1026 6.43752 10.5612C6.89616 11.0198 7.49113 11.3174 8.1332 11.4092C8.77527 11.5011 9.4298 11.3822 9.99862 11.0706L11.1905 12.2475C10.3743 12.7279 9.44646 12.9864 8.49936 12.9971Z" fill="#9E9E9E"/>
                            </svg>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-show">
                            <path d="M7.70475 4.06155C7.9677 4.02125 8.23335 4.0012 8.49936 4.00158C10.8832 4.00158 13.1246 5.71824 14.4289 8.49936C14.2294 8.9226 14.0041 9.33317 13.7543 9.72875C13.6749 9.85155 13.6332 9.99486 13.6343 10.141C13.636 10.3046 13.6911 10.4632 13.7913 10.5925C13.8915 10.7219 14.0313 10.8149 14.1893 10.8573C14.3473 10.8998 14.5149 10.8894 14.6664 10.8278C14.8179 10.7661 14.9452 10.6566 15.0286 10.5159C15.3779 9.96708 15.6813 9.39041 15.9357 8.79172C15.9759 8.69818 15.9966 8.59743 15.9966 8.49561C15.9966 8.3938 15.9759 8.29305 15.9357 8.19951C14.4214 4.68375 11.5728 2.50233 8.49936 2.50233C8.14753 2.50055 7.79627 2.53066 7.44988 2.59228C7.35144 2.60902 7.25725 2.64498 7.17271 2.69811C7.08816 2.75125 7.01491 2.82051 6.95714 2.90195C6.89936 2.9834 6.85819 3.07542 6.83598 3.17278C6.81377 3.27013 6.81095 3.3709 6.82769 3.46935C6.84442 3.56779 6.88038 3.66197 6.93352 3.74652C6.98665 3.83106 7.05592 3.90431 7.13736 3.96209C7.2188 4.01987 7.31083 4.06103 7.40818 4.08325C7.50554 4.10546 7.60631 4.10828 7.70475 4.09154V4.06155ZM2.28493 1.22046C2.21504 1.15057 2.13206 1.09512 2.04074 1.0573C1.94942 1.01947 1.85154 1 1.7527 1C1.65385 1 1.55597 1.01947 1.46465 1.0573C1.37333 1.09512 1.29035 1.15057 1.22046 1.22046C1.0793 1.36162 1 1.55307 1 1.7527C1 1.95232 1.0793 2.14378 1.22046 2.28493L3.54431 4.60129C2.48401 5.62193 1.64014 6.84567 1.06304 8.19951C1.02176 8.29409 1.00045 8.39617 1.00045 8.49936C1.00045 8.60255 1.02176 8.70463 1.06304 8.79921C2.57729 12.315 5.42588 14.4964 8.49936 14.4964C9.84652 14.4871 11.1619 14.086 12.285 13.342L14.7138 15.7783C14.7835 15.8485 14.8664 15.9043 14.9577 15.9423C15.0491 15.9804 15.1471 16 15.246 16C15.345 16 15.443 15.9804 15.5343 15.9423C15.6257 15.9043 15.7086 15.8485 15.7783 15.7783C15.8485 15.7086 15.9043 15.6257 15.9423 15.5343C15.9804 15.443 16 15.345 16 15.246C16 15.1471 15.9804 15.0491 15.9423 14.9577C15.9043 14.8664 15.8485 14.7835 15.7783 14.7138L2.28493 1.22046ZM7.05258 8.10955L8.88917 9.94615C8.76247 9.98248 8.63116 10.0002 8.49936 9.99862C8.10173 9.99862 7.72039 9.84066 7.43922 9.5595C7.15806 9.27833 7.0001 8.89699 7.0001 8.49936C6.99857 8.36757 7.01624 8.23625 7.05258 8.10955ZM8.49936 12.9971C6.11554 12.9971 3.87415 11.2805 2.57729 8.49936C3.06162 7.4302 3.74901 6.4653 4.60129 5.65827L5.92813 7.0001C5.61647 7.56892 5.49765 8.22345 5.58949 8.86552C5.68134 9.50759 5.97889 10.1026 6.43752 10.5612C6.89616 11.0198 7.49113 11.3174 8.1332 11.4092C8.77527 11.5011 9.4298 11.3822 9.99862 11.0706L11.1905 12.2475C10.3743 12.7279 9.44646 12.9864 8.49936 12.9971Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                    <div v-show="submitted && newPasswordError" class="invalid-feedback">{{ newPasswordError }}</div>
                </div>
                <div class="form-group mb-4">
                    <label htmlFor="password-confirm">パスワードを再入力</label>
                    <div class="form-input-password">
                        <input :type="showConfirmNewPassword ? 'text' : 'password'" v-model="confirmNewPassword" name="confirmNewPassword" class="form-control" :class="{ 'is-invalid': submitted && confirmNewPasswordError }" placeholder="半角英数で入力" />
                        <div class="toggle-btn" :class="{show: showConfirmNewPassword}" @click="showConfirmNewPassword = !showConfirmNewPassword">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-hide">
                            <path d="M7.70475 4.06155C7.9677 4.02125 8.23335 4.0012 8.49936 4.00158C10.8832 4.00158 13.1246 5.71824 14.4289 8.49936C14.2294 8.9226 14.0041 9.33317 13.7543 9.72875C13.6749 9.85155 13.6332 9.99486 13.6343 10.141C13.636 10.3046 13.6911 10.4632 13.7913 10.5925C13.8915 10.7219 14.0313 10.8149 14.1893 10.8573C14.3473 10.8998 14.5149 10.8894 14.6664 10.8278C14.8179 10.7661 14.9452 10.6566 15.0286 10.5159C15.3779 9.96708 15.6813 9.39041 15.9357 8.79172C15.9759 8.69818 15.9966 8.59743 15.9966 8.49561C15.9966 8.3938 15.9759 8.29305 15.9357 8.19951C14.4214 4.68375 11.5728 2.50233 8.49936 2.50233C8.14753 2.50055 7.79627 2.53066 7.44988 2.59228C7.35144 2.60902 7.25725 2.64498 7.17271 2.69811C7.08816 2.75125 7.01491 2.82051 6.95714 2.90195C6.89936 2.9834 6.85819 3.07542 6.83598 3.17278C6.81377 3.27013 6.81095 3.3709 6.82769 3.46935C6.84442 3.56779 6.88038 3.66197 6.93352 3.74652C6.98665 3.83106 7.05592 3.90431 7.13736 3.96209C7.2188 4.01987 7.31083 4.06103 7.40818 4.08325C7.50554 4.10546 7.60631 4.10828 7.70475 4.09154V4.06155ZM2.28493 1.22046C2.21504 1.15057 2.13206 1.09512 2.04074 1.0573C1.94942 1.01947 1.85154 1 1.7527 1C1.65385 1 1.55597 1.01947 1.46465 1.0573C1.37333 1.09512 1.29035 1.15057 1.22046 1.22046C1.0793 1.36162 1 1.55307 1 1.7527C1 1.95232 1.0793 2.14378 1.22046 2.28493L3.54431 4.60129C2.48401 5.62193 1.64014 6.84567 1.06304 8.19951C1.02176 8.29409 1.00045 8.39617 1.00045 8.49936C1.00045 8.60255 1.02176 8.70463 1.06304 8.79921C2.57729 12.315 5.42588 14.4964 8.49936 14.4964C9.84652 14.4871 11.1619 14.086 12.285 13.342L14.7138 15.7783C14.7835 15.8485 14.8664 15.9043 14.9577 15.9423C15.0491 15.9804 15.1471 16 15.246 16C15.345 16 15.443 15.9804 15.5343 15.9423C15.6257 15.9043 15.7086 15.8485 15.7783 15.7783C15.8485 15.7086 15.9043 15.6257 15.9423 15.5343C15.9804 15.443 16 15.345 16 15.246C16 15.1471 15.9804 15.0491 15.9423 14.9577C15.9043 14.8664 15.8485 14.7835 15.7783 14.7138L2.28493 1.22046ZM7.05258 8.10955L8.88917 9.94615C8.76247 9.98248 8.63116 10.0002 8.49936 9.99862C8.10173 9.99862 7.72039 9.84066 7.43922 9.5595C7.15806 9.27833 7.0001 8.89699 7.0001 8.49936C6.99857 8.36757 7.01624 8.23625 7.05258 8.10955ZM8.49936 12.9971C6.11554 12.9971 3.87415 11.2805 2.57729 8.49936C3.06162 7.4302 3.74901 6.4653 4.60129 5.65827L5.92813 7.0001C5.61647 7.56892 5.49765 8.22345 5.58949 8.86552C5.68134 9.50759 5.97889 10.1026 6.43752 10.5612C6.89616 11.0198 7.49113 11.3174 8.1332 11.4092C8.77527 11.5011 9.4298 11.3822 9.99862 11.0706L11.1905 12.2475C10.3743 12.7279 9.44646 12.9864 8.49936 12.9971Z" fill="#9E9E9E"/>
                            </svg>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-show">
                            <path d="M7.70475 4.06155C7.9677 4.02125 8.23335 4.0012 8.49936 4.00158C10.8832 4.00158 13.1246 5.71824 14.4289 8.49936C14.2294 8.9226 14.0041 9.33317 13.7543 9.72875C13.6749 9.85155 13.6332 9.99486 13.6343 10.141C13.636 10.3046 13.6911 10.4632 13.7913 10.5925C13.8915 10.7219 14.0313 10.8149 14.1893 10.8573C14.3473 10.8998 14.5149 10.8894 14.6664 10.8278C14.8179 10.7661 14.9452 10.6566 15.0286 10.5159C15.3779 9.96708 15.6813 9.39041 15.9357 8.79172C15.9759 8.69818 15.9966 8.59743 15.9966 8.49561C15.9966 8.3938 15.9759 8.29305 15.9357 8.19951C14.4214 4.68375 11.5728 2.50233 8.49936 2.50233C8.14753 2.50055 7.79627 2.53066 7.44988 2.59228C7.35144 2.60902 7.25725 2.64498 7.17271 2.69811C7.08816 2.75125 7.01491 2.82051 6.95714 2.90195C6.89936 2.9834 6.85819 3.07542 6.83598 3.17278C6.81377 3.27013 6.81095 3.3709 6.82769 3.46935C6.84442 3.56779 6.88038 3.66197 6.93352 3.74652C6.98665 3.83106 7.05592 3.90431 7.13736 3.96209C7.2188 4.01987 7.31083 4.06103 7.40818 4.08325C7.50554 4.10546 7.60631 4.10828 7.70475 4.09154V4.06155ZM2.28493 1.22046C2.21504 1.15057 2.13206 1.09512 2.04074 1.0573C1.94942 1.01947 1.85154 1 1.7527 1C1.65385 1 1.55597 1.01947 1.46465 1.0573C1.37333 1.09512 1.29035 1.15057 1.22046 1.22046C1.0793 1.36162 1 1.55307 1 1.7527C1 1.95232 1.0793 2.14378 1.22046 2.28493L3.54431 4.60129C2.48401 5.62193 1.64014 6.84567 1.06304 8.19951C1.02176 8.29409 1.00045 8.39617 1.00045 8.49936C1.00045 8.60255 1.02176 8.70463 1.06304 8.79921C2.57729 12.315 5.42588 14.4964 8.49936 14.4964C9.84652 14.4871 11.1619 14.086 12.285 13.342L14.7138 15.7783C14.7835 15.8485 14.8664 15.9043 14.9577 15.9423C15.0491 15.9804 15.1471 16 15.246 16C15.345 16 15.443 15.9804 15.5343 15.9423C15.6257 15.9043 15.7086 15.8485 15.7783 15.7783C15.8485 15.7086 15.9043 15.6257 15.9423 15.5343C15.9804 15.443 16 15.345 16 15.246C16 15.1471 15.9804 15.0491 15.9423 14.9577C15.9043 14.8664 15.8485 14.7835 15.7783 14.7138L2.28493 1.22046ZM7.05258 8.10955L8.88917 9.94615C8.76247 9.98248 8.63116 10.0002 8.49936 9.99862C8.10173 9.99862 7.72039 9.84066 7.43922 9.5595C7.15806 9.27833 7.0001 8.89699 7.0001 8.49936C6.99857 8.36757 7.01624 8.23625 7.05258 8.10955ZM8.49936 12.9971C6.11554 12.9971 3.87415 11.2805 2.57729 8.49936C3.06162 7.4302 3.74901 6.4653 4.60129 5.65827L5.92813 7.0001C5.61647 7.56892 5.49765 8.22345 5.58949 8.86552C5.68134 9.50759 5.97889 10.1026 6.43752 10.5612C6.89616 11.0198 7.49113 11.3174 8.1332 11.4092C8.77527 11.5011 9.4298 11.3822 9.99862 11.0706L11.1905 12.2475C10.3743 12.7279 9.44646 12.9864 8.49936 12.9971Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                    <div v-show="submitted && confirmNewPasswordError" class="invalid-feedback">{{ confirmNewPasswordError }}</div>
                </div>
                <div class="form-group d-flex justify-content-center">
                    <button class="btn btn-primary btn-block" :disabled="status.changing">
                        送信
                        <img v-show="status.changing" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    </button>
                </div>
            </form>

        </div>
      </div>
      <div v-else>
        <h2 class="title">パスワード再設定完了</h2>
        <div class="description alignC mb-4">パスワードの再設定が完了しました。</div>
        <div class="form-group d-flex justify-content-center pt-2">
            <a ref="loginButton" class="btn btn-primary btn-block" :href="redirectUrl">
                ログイン
            </a>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import alertBox from '../component/Alert';

export default {
    data () {
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
            redirectUrl: ''
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        // reset login status
        // this.logout();
    },
    methods: {
        ...mapActions('account', ['reset']),
        handleSubmit (e) {
          console.log('submit')
            this.submitted = true;
            const { newPassword, confirmNewPassword } = this;
            this.confirmNewPasswordError = '';
            if (newPassword !== confirmNewPassword) {
              this.submitted = true;
              this.confirmNewPasswordError = 'パスワードは一致する必要があります。'
              return
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
              })
            }).then(res => {
              if (res.status >= 200 && res.status < 300) {
                this.success = true
                if (res.body && typeof res.body.request_url === 'string') {
                  return window.location.replace(res.body.request_url)
                } else {
                  this.redirectUrl = localStorage.getItem('callbackURL')
                }
              } else {
                let getErrorFunc = !!res ? this.getResponseError : this.getNetworkError
                let error = getErrorFunc(res)
                this.$store.dispatch('alert/error', '半角英数字8文字以上16文字以下で入力してください', { root: true });

                this.globalError = error
              }

            })
            .catch(res => {
              let getErrorFunc = !!res ? this.getResponseError : this.getNetworkError
              let error = getErrorFunc(res)
              // this.$refs.loginButton.setAttribute('href', localStorage.getItem('callbackURL'))
              this.globalError = error
            })
        },

        getResponseError(res) {
          let body, text = res;

          if (!body || typeof body !== "object") {
            body = {};
          }

          let passwordErrors = {
            PasswordStrengthError: "weakPasswordError",
            PasswordHistoryError: "passwordHistoryError",
            PasswordDictionaryError: "passwordDictError",
            PasswordNoUserInfoError: "passwordNoUserInfoError"
          };

          let error = passwordErrors[body.name] || "serverError";

          return error;
        },

        getNetworkError(res) {
          var didTimeout = !!err.timeout;
          var error = didTimeout ? "timedoutError" : "networkError";

          return error;
        },

    },
    components: {'alert-box': alertBox}
};
</script>