import { msal, create, getNumericDate, Payload, Header } from "../../deps.ts";
import { UserSchema } from "../../models/User.ts";
import userService from "../user/user.service.ts";
import { IdTokenClaims, msalConfig, REDIRECT_URI } from "./auth_config.ts";

const msalCca= new msal.ConfidentialClientApplication(msalConfig);

const authCodeUrlParameters: msal.AuthorizationUrlRequest = {
    scopes: ['User.read', 'email'],
    redirectUri: REDIRECT_URI,
};

export const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
);

export const header: Header = {
    alg: "HS512",
    typ: "JWT",
}

export const getAuthCode = async () => {
    return await msalCca.getAuthCodeUrl(authCodeUrlParameters);
}

export const getAccessToken = async (code: string) => {

    const tokenRequest = {
      code,
      scopes: authCodeUrlParameters.scopes,
      redirectUri: authCodeUrlParameters.redirectUri,
    };

    const authResult = await msalCca.acquireTokenByCode(tokenRequest);

    const user = await userService.findUserByOidOrRegister(authResult?.account?.idTokenClaims as IdTokenClaims);

    if(!user) {
        return {
            user: null,
            accessToken: null
        };
    }

    const accessToken = await generateAccessToken(user);
    return {
        user,
        accessToken
    }

}

const generateAccessToken = async (user: UserSchema) => {

    const payload: Payload = {
        name: user.name,
        ms_oid: user.ms_oid,
        email: user.email,
        exp: getNumericDate(60),
    };

    const jwt = await create(header, payload, key);
    return jwt;
}