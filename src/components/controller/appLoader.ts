import { ApiClientConfig, ApiEndpoint } from '../../types/api';
import Loader from './loader';

const DEFAULT_API_URL = 'https://rss-news-api.onrender.com/';

class AppLoader extends Loader {
    protected readonly useMocks: boolean;

    public constructor() {
        const apiKey = process.env.API_KEY?.trim();
        const useMocks = process.env.USE_MOCKS !== 'false' || !apiKey;
        const config: ApiClientConfig = {
            baseUrl: process.env.API_URL?.trim() || DEFAULT_API_URL,
            apiKey: apiKey || undefined,
            useMocks,
        };

        super(config);
        this.useMocks = useMocks;
    }

    protected get sourcesEndpoint(): ApiEndpoint {
        return this.useMocks ? ApiEndpoint.MockSources : ApiEndpoint.Sources;
    }

    protected get newsEndpoint(): ApiEndpoint {
        return this.useMocks ? ApiEndpoint.MockEverything : ApiEndpoint.Everything;
    }
}

export default AppLoader;
