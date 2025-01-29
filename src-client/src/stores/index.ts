import { store } from "quasar/wrappers";
import { createPinia } from "pinia";
import { getApiServiceOptions } from "../api/ApiOptions";
import { ApiService } from "src/services/ApiService";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((arg /* { ssrContext } */) => {
  const pinia = createPinia();
  console.debug("Pinia arguments", arg);

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)
  const apiServiceOptions = getApiServiceOptions(pinia);
  ApiService.GetInstance(apiServiceOptions);
  return pinia;
});
