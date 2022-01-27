import auth0 from 'auth0-js';

export const authService = {
  login,
  signup,
  changePassword,
};

function initWebAuth() {
  var params = Object.assign(
    {
      domain: window['auth0Config'].auth0Domain, //removeProtocol(window['auth0Config'].authorizationServer.url),
      clientID: window['auth0Config'].clientID,
      redirectUri: window['auth0Config'].callbackURL,
      audience: window['auth0Config'].audience,
      responseType: window['auth0Config'].extraParams.response_type,
      connection: window['auth0Config'].connection,
      overrides: {
        __tenant: window['auth0Config'].auth0Tenant,
        __token_issuer: window['auth0Config'].authorizationServer.issuer,
      },
    },
    window['auth0Config'].internalOptions
  );

  return new auth0.WebAuth(params);
}

function login(username, password) {
  return new Promise((resolve, reject) => {
    try {
      initWebAuth().login(
        {
          realm: window['auth0Config'].connection,
          username: username,
          password: password,
        },
        (err) => {
          console.log(err);
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

function signup(options) {
  return new Promise((resolve, reject) => {
    try {
      initWebAuth().signup(options, (err) => {
        console.log(err);
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

function changePassword(options) {
  return new Promise((resolve, reject) => {
    try {
      initWebAuth().changePassword(options, (err, resp) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}
