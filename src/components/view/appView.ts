import { NewsResponse, SourcesResponse } from '../../types/news';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsResponse): void {
        this.news.draw(data.articles ?? []);
    }

    public drawSources(data: SourcesResponse): string | null {
        return this.sources.draw(data.sources ?? []);
    }

    public getSelectedSource(event: MouseEvent): string | null {
        return this.sources.getSourceId(event);
    }

    public selectSource(sourceId: string): void {
        this.sources.select(sourceId);
    }

    public showLoading(message = 'Loading the latest stories…'): void {
        this.news.showStatus(message, 'loading');
    }

    public showError(message: string): void {
        this.news.showStatus(message, 'error');
    }
}

export default AppView;
