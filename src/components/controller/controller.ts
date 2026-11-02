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

    public getNews(event: MouseEvent, onSuccess: ResponseCallback<NewsResponse>, onError: ErrorCallback): void {
        const target = event.target;
        const sourceContainer = event.currentTarget;

        if (!(target instanceof Element) || !(sourceContainer instanceof HTMLElement)) {
            return;
        }

        const sourceButton = target.closest<HTMLElement>('[data-source-id]');
        if (!sourceButton || !sourceContainer.contains(sourceButton)) {
            return;
        }

        const sourceId = sourceButton.dataset.sourceId;
        if (!sourceId || sourceContainer.dataset.selectedSource === sourceId) {
            return;
        }

        sourceContainer.dataset.selectedSource = sourceId;
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
