import { ArticleCard } from '../../../types/news';
import { cloneTemplate, queryRequired } from '../../../utils/dom';
import './news.css';

const MAX_ARTICLES = 12;
const dateFormatter = new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
});

class News {
    private readonly container: HTMLElement;

    public constructor() {
        this.container = queryRequired<HTMLElement>('.news');
    }

    public draw(data: ReadonlyArray<ArticleCard>): void {
        this.container.setAttribute('aria-busy', 'false');
        this.container.replaceChildren();

        if (data.length === 0) {
            this.showStatus('No articles were found for this source.', 'empty');
            return;
        }

        const fragment = document.createDocumentFragment();
        data.slice(0, MAX_ARTICLES).forEach((article) => {
            fragment.append(this.createArticle(article));
        });

        this.container.append(fragment);
    }

    public showStatus(message: string, status: 'loading' | 'error' | 'empty'): void {
        this.container.setAttribute('aria-busy', String(status === 'loading'));
        const statusElement = document.createElement('p');
        statusElement.className = `news-status news-status--${status}`;
        statusElement.textContent = message;
        this.container.replaceChildren(statusElement);
    }

    private createArticle(article: ArticleCard): DocumentFragment {
        const articleFragment = cloneTemplate('#newsItemTemp');
        const articleElement = queryRequired<HTMLElement>('.news__item', articleFragment);
        const photo = queryRequired<HTMLElement>('.news__meta-photo', articleFragment);
        const author = queryRequired<HTMLElement>('.news__meta-author', articleFragment);
        const date = queryRequired<HTMLElement>('.news__meta-date', articleFragment);
        const title = queryRequired<HTMLElement>('.news__description-title', articleFragment);
        const source = queryRequired<HTMLElement>('.news__description-source', articleFragment);
        const description = queryRequired<HTMLElement>('.news__description-content', articleFragment);
        const link = queryRequired<HTMLAnchorElement>('.news__read-more', articleFragment);

        photo.setAttribute('aria-label', article.title);
        if (article.urlToImage) {
            photo.style.backgroundImage = `url(${JSON.stringify(article.urlToImage)})`;
        } else {
            photo.classList.add('news__meta-photo--placeholder');
        }

        author.textContent = article.author || article.source.name;
        date.textContent = this.formatDate(article.publishedAt);
        title.textContent = article.title;
        source.textContent = article.source.name;
        description.textContent = article.description || 'Open the article to read the full story.';
        link.href = article.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', `Read the full article: ${article.title}`);
        articleElement.dataset.source = article.source.id || article.source.name;

        return articleFragment;
    }

    private formatDate(value: string): string {
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? 'Date unavailable' : dateFormatter.format(date);
    }
}

export default News;
