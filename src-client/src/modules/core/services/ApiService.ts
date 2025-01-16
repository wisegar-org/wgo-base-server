import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloLink, from } from "apollo-link";
import { onError } from "apollo-link-error";
import fetch from "cross-fetch";

export interface IApiServiceOptions {
  onTokenRefresh: (headers: any) => void;
  onGenericErrorHandler: (message: any) => void;
  onGenericErrorHandlerIndex?: (message: any, index: number) => void;
  onNetworkErrorHandler: (message: any) => void;
  onGetAuthToken: () => string;
  onHeadersSetup: (headers: any) => void;
  onGetBaseUrl: () => string;
}
export class ApiService {
  private options: IApiServiceOptions;
  private apolloClient!: ApolloClient<NormalizedCacheObject>;
  private static instance: ApiService;

  public mutate(options: any): Promise<any> {
    return this.apolloClient.mutate(options);
  }
  public query(options: any): Promise<any> {
    return this.apolloClient.query(options);
  }

  private constructor(options: IApiServiceOptions) {
    this.options = options;
    this.apolloClient = new ApolloClient<NormalizedCacheObject>(
      this.getApolloClientOptions(options)
    );
  }
  GetInstance(options?: IApiServiceOptions): ApiService {
    throw new Error("Method not implemented.");
  }

  private getApolloClientOptions(options: IApiServiceOptions) {
    const authMiddleware = new ApolloLink((operation: any, forward: any) => {
      const headers: any = {};
      if (options.onGetAuthToken) {
        headers.authorization = options.onGetAuthToken();
      }
      if (options.onHeadersSetup) {
        options.onHeadersSetup(headers);
      }
      const context = {
        headers: headers,
      };
      operation.setContext(context);
      return forward(operation);
    });

    const httpLink = createUploadLink({
      uri: options.onGetBaseUrl(),
      fetch,
      fetchOptions: {
        // agent: new Agent({ rejectUnauthorized: false }),
      },
    });

    const afterwareLink = new ApolloLink((operation, forward) => {
      return forward(operation).map((response) => {
        const context = operation.getContext();
        const {
          response: { headers },
        } = context;
        console.info("Response apollo link logger: ", response);
        options.onTokenRefresh(context);

        return response;
      });
    });
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }, index) => {
          if (options.onGenericErrorHandlerIndex)
            options.onGenericErrorHandlerIndex(message, index);
          options.onGenericErrorHandler(message);
        });
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        options.onNetworkErrorHandler(networkError);
      }
    });

    return {
      link: from([authMiddleware, afterwareLink, errorLink, httpLink as any]),
      cache: new InMemoryCache(),
    };
  }

  public static GetInstance(options?: IApiServiceOptions): ApiService {
    if (!ApiService.instance && options) {
      ApiService.instance = new ApiService(options);
    }
    if (!ApiService.instance && !options) {
      throw Error("Options param not found!");
    }
    return ApiService.instance;
  }

  public static isDefineInstance() {
    return !!ApiService.instance;
  }
}
