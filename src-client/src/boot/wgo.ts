import { boot } from "quasar/wrappers";
import { provideRouterService } from "src/services/RouterService";

export default boot(({ app, router, store }) => {
  console.log(app, router, store);
  provideRouterService(app, router);
});
