export type ApiStatus = 'ok' | 'error';

export interface NewsSource {
    id: string | null;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface NewsArticle {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: ApiStatus;
    sources: NewsSource[];
}

export interface NewsResponse {
    status: ApiStatus;
    totalResults: number;
    articles: NewsArticle[];
}

export interface ApiErrorResponse {
    status: 'error';
    code: string;
    message: string;
}

export type SourceListItem = Pick<NewsSource, 'id' | 'name' | 'category'>;

export type ArticleCard = Pick<
    NewsArticle,
    'source' | 'author' | 'title' | 'description' | 'url' | 'urlToImage' | 'publishedAt'
>;
