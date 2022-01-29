# Auth0 Vuejs

[Auth0](https://auth0.com) custom login page using vue

## Running locally

To run it locally:

- Populate the auth0Config object in index.html

```bash
    window.auth0Config = {
        auth0Domain: '{tenant}.{region}.auth0.com',
        clientID: '{client_id',
        callbackURL: location.href,
        audience: 'https://{tenant}.{region}.auth0.com/userinfo',
        scope: 'openid',
        authorizationServer: {
            url: '',
            issuer: '',
        },
        extraParams: {
            response_type: 'token id_token'
        },
    }
```

```bash
$ npm start
```

## Deploy to Auth0 Universal Login Pages

1. Run `yarn build` , a dist folder will be created with `index.html, main.js` files
2. create a new release on github repository
3. change the version here js file version here https://manage.auth0.com/dashboard/jp/shin-caritore-dev/login_page
