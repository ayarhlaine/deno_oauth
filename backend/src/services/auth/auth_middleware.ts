
import { Context, verify } from "../../deps.ts";
import { key } from "./auth.ts";

export const authMidleware = async (ctx: Context<any>, next: () => Promise<unknown>) => {
    const accessToken = await ctx.cookies.get('accessToken');

    if(!accessToken) {
        console.log('throw error')
        // ctx.throw(401);
    }
    
    try {
        const _payload = await verify(accessToken!, key);
        await next();
    } catch (err) {
        console.log(err)
        // ctx.throw(401);
    }
}