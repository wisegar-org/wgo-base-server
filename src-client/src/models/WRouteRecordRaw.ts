import { RouteRecordRaw } from "vue-router";

export type WRouteRecordRaw = RouteRecordRaw & { label: string; name: string };
