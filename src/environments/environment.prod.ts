export const environment = {
    production: true,
    api: 'https://api.finances-easy.com/',
    okta: {
        clientId: '0oa4e4x01zItFJ2dF5d6',
        issuer: 'https://dev-2225315.okta.com/oauth2/default',
        redirectUri: 'https://finances-easy.com/callback',
        scopes: ['openid', 'profile', 'email'],
        pkce: true
    }
};
