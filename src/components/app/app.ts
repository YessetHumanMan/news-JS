import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourceContainer = document.querySelector<HTMLElement>('.sources');
        if (!sourceContainer) {
            this.view.showError('The source list could not be initialized.');
            return;
        }

        sourceContainer.addEventListener('click', (event: MouseEvent) => {
            const sourceId = this.view.getSelectedSource(event);
            if (!sourceId || sourceContainer.dataset.selectedSource === sourceId) return;

            sourceContainer.dataset.selectedSource = sourceId;
            this.view.selectSource(sourceId);
            this.loadNews(sourceId);
        });

        this.view.showLoading('Loading news sources…');
        this.controller.getSources(
            (data) => {
                const firstSourceId = this.view.drawSources(data);
                if (!firstSourceId) {
                    this.view.showError('No news sources are currently available.');
                    return;
                }

                sourceContainer.dataset.selectedSource = firstSourceId;
                this.loadNews(firstSourceId);
            },
            (message) => this.view.showError(`Unable to load sources. ${message}`)
        );
    }

    private loadNews(sourceId: string): void {
        this.view.showLoading();
        this.controller.getNews(
            sourceId,
            (data) => this.view.drawNews(data),
            (message) => this.view.showError(`Unable to load articles. ${message}`)
        );
    }
}

export default App;
