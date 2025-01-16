import { ssrMiddleware } from "quasar/wrappers";

export default ssrMiddleware(({ app, resolve, render, serve }) => {
  console.log(app, resolve, render, serve);
  // we extend the custom API with the Express app
  app.get("/api", function (req, res) {
    res.send("api-extender");
  });
});
