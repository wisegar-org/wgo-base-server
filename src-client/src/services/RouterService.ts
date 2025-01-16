/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from "vue";
import { RouteLocationRaw, RouteRecordRaw, Router } from "vue-router";
import { IsNullOrUndefined } from "wgo-extensions";

const ROUTERCONST = "ROUTER-SERVICE";

export const provideRouterService = (app: any, router: any) => {
  app.provide(ROUTERCONST, new RouterService(router));
};

export const useRouterService = () => {
  return inject(ROUTERCONST) as RouterService;
};

export const getCurrentLocationHash = () => {
  return (
    !IsNullOrUndefined(window.location?.hash) ? window.location?.hash : "#"
  ).substring(1);
};

export class RouterService {
  private readonly frameworkRouter: Router;
  constructor(frameworkRouter: Router) {
    this.frameworkRouter = frameworkRouter;
  }
  public GetCurrentPage() {
    return this.frameworkRouter.currentRoute.value;
  }
  public GetCurrentPageName() {
    let routeName = "";
    if (!this.frameworkRouter.currentRoute.value) {
      routeName = (
        this.frameworkRouter.currentRoute.value as any
      ).name.toString();
    }
    return routeName;
  }
  public goToRoute<TParams>(
    route: RouteRecordRaw,
    params?: TParams,
    query?: string
  ) {
    const routeName = this.getRouteName(route);
    this.goToByName(routeName, params, query);
  }
  public getRouteName(route: RouteRecordRaw) {
    if (!route.name)
      throw "RouteService - Le rotte di quickweb devono avere un nome";
    return route.name.toString();
  }
  public goToByName(routeName: string, params?: any, query?: any) {
    if (!routeName)
      throw "RouteService - parametro invalido: non cè la routeName!!";
    const location: RouteLocationRaw = {
      params: params,
      query: query,
      name: routeName,
    };
    try {
      this.frameworkRouter.push(location);
    } catch (error: any) {
      if (
        error.name !== "NavigationDuplicated" &&
        !error.message.includes(
          "Avoided redundant navigation to current location"
        )
      ) {
        console.log(error);
      }
    }
  }
  public isActiveRoute(activeRoute: string, route: RouteRecordRaw) {
    return activeRoute === this.getRouteName(route);
  }
  public goBack() {
    this.frameworkRouter.back();
  }
}
