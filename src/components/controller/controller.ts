import { ErrorCallback, ResponseCallback } from '../../types/api';
import { NewsResponse, SourcesResponse } from '../../types/news';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(onSuccess: ResponseCallback<SourcesResponse>, onError: ErrorCallback): void {
        this.getResponse<SourcesResponse>(
            {
                endpoint: this.sourcesEndpoint,
            },
            onSuccess,
            onError
        );
    }

    public getNews(sourceId: string, onSuccess: ResponseCallback<NewsResponse>, onError: ErrorCallback): void {
        this.getResponse<NewsResponse>(
            {
                endpoint: this.newsEndpoint,
                options: {
                    sources: sourceId,
                },
            },
            onSuccess,
            onError
        );
    }
}

export default AppController;
