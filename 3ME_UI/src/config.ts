const config = {
  oidc: {
    issuer: `${process.env.REACT_APP_BASE_URL}`,
    clientId: `${process.env.REACT_APP_CLIENTID}`,
    scopes: ["openid", "profile", "email", "groups"],
    redirectUri: `${window.location.origin}/login/callback`,
    tokenManager: {
      storage: "sessionStorage",
    },
  },
  oidc2: {
    issuer: `${process.env.REACT_APP_INTERNAL_BASE_URL}`,
    clientId: `${process.env.REACT_APP_INTERNAL_CLIENTID}`,
    scopes: ["openid", "profile", "email", "phone", "groups"],
    redirectUri: `${window.location.origin}/login/callback`,
    tokenManager: {
      storage: "sessionStorage",
      autoRenew: true,
    },
  },

  widget: {
    issuer: `${process.env.REACT_APP_BASE_URL}`,
    clientId: `${process.env.REACT_APP_CLIENTID}`,
    redirectUri: `${window.location.origin}/login/callback`,
    scopes: ["openid", "profile", "email"],
    i18n: {
      en: {
        "error.username.required": "User Name is Required",
        "error.password.required": "Password is Required",
        "errors.E0000004":
          "User Name and/or Password do not match our records. Please try again.",
      },
    },
    logo: "okta3mlogo.svg",
    features: {
      showPasswordToggleOnSignInPage: true,
    },
  },
};

export default config;
