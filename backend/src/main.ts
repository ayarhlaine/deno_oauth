import { Application, oakCors } from "./deps.ts";
import router from "./router.ts";

const app = new Application();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ??
        "localhost"
    }:${port}`,
  );
});

const PORT = parseInt(Deno.env.toObject().PORT) || 8080

app.listen({ port: PORT });