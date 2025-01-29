/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from "vue-router";

export interface IRouteService {
  goTo(path: string, query?: any): void;
  goToPathName(path: string, query?: any): void;
  goBack(): void;
  getRouteUrlPath(): void;
}

export class RouteService implements IRouteService {
  private frameworkRouter: Router.Router;
  constructor(frameworkRouter: any) {
    this.frameworkRouter = frameworkRouter;
  }

  public goTo(path: string, query?: any) {
    if (this.frameworkRouter.currentRoute.value.path !== path) {
      if (query) {
        this.frameworkRouter
          .push({ path, query })
          .catch((err) => console.log(err));
        return;
      }
      this.frameworkRouter.push(path).catch((err) => console.log(err));
    } else {
      this.frameworkRouter.go(0);
    }
  }

  public goToPathName(name: string, query?: any) {
    this.frameworkRouter.push({
      name: name,
      query: query,
      params: {},
    });
  }

  public goBack() {
    this.frameworkRouter.back();
  }

  public getRouteUrlPath() {
    this.frameworkRouter.currentRoute.value.fullPath;
  }

  public getCurrentPath() {
    return this.frameworkRouter.currentRoute.value.path;
  }
}
