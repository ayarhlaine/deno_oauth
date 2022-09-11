
import { Context, verify } from "../../deps.ts";
import { key } from "./auth.ts";

export const authMidleware = async (ctx: Context<any>, next: () => Promise<unknown>) => {
    const accessToken = await ctx.cookies.get('accessToken');

    if(!accessToken) {
        ctx.response.body = {
            message: 'Unthorized Access!',
            status: 401,
        }
        ctx.response.status = 401;
    }
    
    try {
        const _payload = await verify(accessToken!, key);
        await next();
    } catch (err) {
        console.log(err)
        ctx.response.body = {
            message: 'Unthorized Access!',
            status: 401,
        }
        ctx.response.status = 401;
    }
}