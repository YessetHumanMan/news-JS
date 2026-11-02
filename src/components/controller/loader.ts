import { ApiClientConfig, ApiRequest, ErrorCallback, HttpMethod, QueryParams, ResponseCallback } from '../../types/api';

class Loader {
    public constructor(private readonly config: ApiClientConfig) {}

    public getResponse<TResponse>(
        request: ApiRequest,
        onSuccess: ResponseCallback<TResponse>,
        onError: ErrorCallback
    ): void {
        void this.load<TResponse>(HttpMethod.Get, request, onSuccess, onError);
    }

    private ensureSuccessfulResponse(response: Response): Response {
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
        }

        return response;
    }

    private makeUrl({ endpoint, options = {} }: ApiRequest): string {
        const baseUrl = this.config.baseUrl.endsWith('/') ? this.config.baseUrl : `${this.config.baseUrl}/`;
        const url = new URL(endpoint, baseUrl);
        const query: Partial<QueryParams> = {
            ...options,
        };

        if (this.config.apiKey && !this.config.useMocks) {
            query.apiKey = this.config.apiKey;
        }

        Object.entries(query).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                url.searchParams.set(key, String(value));
            }
        });

        return url.toString();
    }

    private async load<TResponse>(
        method: HttpMethod,
        request: ApiRequest,
        onSuccess: ResponseCallback<TResponse>,
        onError: ErrorCallback
    ): Promise<void> {
        try {
            const response = await fetch(this.makeUrl(request), { method });
            const successfulResponse = this.ensureSuccessfulResponse(response);
            const data = (await successfulResponse.json()) as TResponse;
            onSuccess(data);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unknown network error occurred';
            onError(message);
        }
    }
}

export default Loader;
