
import { msal } from "../../deps.ts";

const REDIRECT_URI = Deno.env.get("MS_APP_REDIRECT_URI")!;
const FRONT_END_URI = Deno.env.get("MS_APP_FRONT_END_URI")!;
const POST_LOGOUT_REDIRECT_URI = Deno.env.get("MS_APP_POST_LOGOUT_REDIRECT_URI")!;
const GRAPH_ME_ENDPOINT = Deno.env.get("MS_GRAPH_API_ENDPOINT")! + "v1.0/me";

export interface IdTokenClaims {
    name: string;
    oid: string;
    email: string;
}

const msalConfig: msal.Configuration = {
    auth: {
        clientId: Deno.env.get("MS_APP_CLIENT_ID")!, // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: Deno.env.get("MS_APP_CLOUD_INSTANCE")! + Deno.env.get("MS_APP_TENANT_ID"), // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
        clientSecret: Deno.env.get("MS_APP_CLIENT_SECRET") // Client secret generated from the app registration in Azure portal
    },
    system: {
        loggerOptions: {
            loggerCallback(_loglevel, message, _containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Info,
        }
    }
}

export {
    REDIRECT_URI,
    FRONT_END_URI,
    POST_LOGOUT_REDIRECT_URI,
    GRAPH_ME_ENDPOINT,
    msalConfig
}