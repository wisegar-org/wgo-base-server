export enum Environment {
  Development = "development",
  Staging = "staging",
  Production = "production",
}
export interface IApiSettings {
  API_BASE: string;
  API_GRAPHQL: string;
  DEFAULT_USER_PROFILE: string;
  VERSION: string;
}

export const getSettings = (): IApiSettings => {
  if (process.env.NODE_ENV === Environment.Development) {
    return {
      API_BASE: process.env.API_BASE,
      API_GRAPHQL: process.env.API_GRAPHQL,
      VERSION: process.env.VERSION,
      DEFAULT_USER_PROFILE: "icons/profile-user.svg",
    };
  }
  
  return {
    API_BASE: window.location.origin,
    API_GRAPHQL: `${window.location.origin}/graphql`,
    VERSION: process.env.VERSION,
    DEFAULT_USER_PROFILE: "icons/profile-user.svg",
  };
};
