
import { MsalAuthProvider, LoginType } from 'react-aad-msal';

const config = {
    auth: {
    authority: 'https://login.microsoftonline.com/directory id goes here',
    clientId: 'Your client id goes here',
    postLogoutRedirectUri: window.location.origin,
    redirectUri: window.location.origin,
    validateAuthority: true,
    navigateToLoginRequestUrl: true
    },
    cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
    }
};
// Authentication Parameters
export const authenticationParameters = {
    scopes: [
    `client id goes here/.default`
    ]
}
export const authenticationParametersGraph = {
    scopes: [
    'openid'
    ]
}
// Options
export const options = {
loginType: LoginType.Redirect,
tokenRefreshUri: window.location.origin
}
export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)