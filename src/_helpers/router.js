import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage';
import LoginPage from '../login/LoginPage';
import PasswordPage from '../login/PasswordPage';
import RegisterPage from '../register/RegisterPage';
import LoReset from '../login/LoReset';
import EmailSentPage from '../login/EmailSentPage';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/login/resetpassword', component: PasswordPage },
    { path: '/register', component: RegisterPage },
    { path: '/email-sent', component: EmailSentPage },
    { path: '/lo/reset', component: LoReset },

    // otherwise redirect to home
    { path: '*', redirect: '/' },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [
    '/login',
    '/register',
    '/login/resetpassword',
    '/lo/reset',
    '/email-sent',
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (to.path === '/login') {
    localStorage.setItem('callbackURL', window.auth0Config.callbackURL);
  }

  if (authRequired && !loggedIn) {
    // HINT ここのパスを切り替えることで開発環境でページを出し分けできます
    return next('/login');
  }

  next();
});
