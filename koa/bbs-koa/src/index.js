const Koa = require("koa");
const router = require("koa-router")();
const app = new Koa();
require("./cors")(app); // 配置跨域支持
require("./routes")(router);

// x-response-time

app
  .use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
  })

  // logger
  .use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
  })
  // 接口 router
  .use(router.routes())
  .use(router.allowedMethods())

  // response
  // .use(async ctx => {
  //     ctx.body = { info: "is json data ?" };
  // });

  // 错误处理
  .on("error", (err, ctx) => {
    console.error("server error", err, ctx);
  })

  .listen(3000, (err) => {
    if (err) throw new Error(err);
    console.log("服务器已启动：http://localhost:3000");
  });
