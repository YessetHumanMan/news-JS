export enum ApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
    MockSources = 'mocks/sources',
    MockEverything = 'mocks/everything',
}

export enum HttpMethod {
    Get = 'GET',
}

export type QueryValue = string | number | boolean;
export type QueryParams = Record<string, QueryValue | null | undefined>;

export interface ApiRequest {
    endpoint: ApiEndpoint;
    options?: Partial<QueryParams>;
}

export type ResponseCallback<TResponse> = (data: TResponse) => void;
export type ErrorCallback = (message: string) => void;

export type ApiClientConfig = Readonly<{
    baseUrl: string;
    apiKey?: string;
    useMocks: boolean;
}>;
