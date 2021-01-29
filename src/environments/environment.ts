// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';

export const environment = {
    production: false,
    api: 'http://localhost:8089/',
    okta: {
        clientId: '0oa4e4x01zItFJ2dF5d6',
        issuer: 'https://dev-2225315.okta.com/oauth2/default',
        redirectUri: 'http://localhost:4200/callback',
        scopes: ['openid', 'profile', 'email'],
        pkce: true
    }
}; // Included with Angular CLI.
