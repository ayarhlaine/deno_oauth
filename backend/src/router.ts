import { Router } from "./deps.ts";
import { getAuthCode, getAccessToken } from "./services/auth/auth.ts"
import { FRONT_END_URI } from "./services/auth/auth_config.ts";
import { authMidleware } from "./services/auth/auth_middleware.ts";

const router = new Router();

router.get("/auth/signin", async (ctx) => {
  const authCodeResponse = await getAuthCode();
  ctx.response.redirect(authCodeResponse);
});

router.get("/auth/redirect", async (ctx) => {
  
  const authCode = ctx.request.url.searchParams.get("code");
  const { user, accessToken } = await getAccessToken(authCode!)!;

  ctx.cookies.set('accessToken', accessToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }); // 24 hr 
  ctx.app.state = { user };

  ctx.response.redirect(FRONT_END_URI);
});

router.post("/auth/logout", (ctx) => {
  ctx.cookies.delete('accessToken');
  ctx.app.state = { user: null };
  ctx.response.status = 200;
});

router.get("/", async (ctx, next) => {
  try {
    await ctx.send({
      root: `${Deno.cwd()}/backend/static`,
      index: "index.html",
    });
  } catch(err) {
    console.log("Error in serving static ui");
    console.log(err)
    await next();
  }
});


// router.use(authMidleware);

router.get("/auth", (ctx) => {
  ctx.response.body = ctx.app.state.user
});

export default router;