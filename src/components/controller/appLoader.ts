import { ApiClientConfig, ApiEndpoint } from '../../types/api';
import Loader from './loader';

const DEFAULT_API_URL = 'https://rss-news-api.onrender.com/';
const MISSING_ENV_VALUE = 'MISSING_ENV_VAR';

function readEnvironmentValue(value: string | undefined): string | undefined {
    const normalizedValue = value?.trim();
    return normalizedValue && normalizedValue !== MISSING_ENV_VALUE ? normalizedValue : undefined;
}

class AppLoader extends Loader {
    protected readonly useMocks: boolean;

    public constructor() {
        const apiKey = readEnvironmentValue(process.env.API_KEY);
        const useMocksSetting = readEnvironmentValue(process.env.USE_MOCKS);
        const useMocks = useMocksSetting !== 'false' || !apiKey;
        const config: ApiClientConfig = {
            baseUrl: readEnvironmentValue(process.env.API_URL) || DEFAULT_API_URL,
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
