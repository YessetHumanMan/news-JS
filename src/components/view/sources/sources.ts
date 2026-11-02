import { SourceListItem } from '../../../types/news';
import { cloneTemplate, queryRequired } from '../../../utils/dom';
import './sources.css';

class Sources {
    private readonly container: HTMLElement;

    public constructor() {
        this.container = queryRequired<HTMLElement>('.sources');
    }

    public draw(data: ReadonlyArray<SourceListItem>): string | null {
        const fragment = document.createDocumentFragment();

        data.forEach((source) => {
            if (!source.id) return;

            const sourceFragment = cloneTemplate('#sourceItemTemp');
            const sourceButton = queryRequired<HTMLButtonElement>('.source__item', sourceFragment);
            const sourceName = queryRequired<HTMLElement>('.source__item-name', sourceFragment);

            sourceName.textContent = source.name;
            sourceButton.dataset.sourceId = source.id;
            sourceButton.dataset.category = source.category;
            sourceButton.setAttribute('aria-pressed', 'false');
            fragment.append(sourceFragment);
        });

        this.container.replaceChildren(fragment);
        const firstSource = this.container.querySelector<HTMLButtonElement>('[data-source-id]');
        const firstSourceId = firstSource?.dataset.sourceId ?? null;

        if (firstSourceId) {
            this.select(firstSourceId);
        }

        return firstSourceId;
    }

    public getSourceId(event: MouseEvent): string | null {
        const target = event.target;
        if (!(target instanceof Element)) return null;

        const sourceButton = target.closest<HTMLButtonElement>('[data-source-id]');
        if (!sourceButton || !this.container.contains(sourceButton)) return null;

        return sourceButton.dataset.sourceId ?? null;
    }

    public select(sourceId: string): void {
        this.container.querySelectorAll<HTMLButtonElement>('[data-source-id]').forEach((button) => {
            const isSelected = button.dataset.sourceId === sourceId;
            button.classList.toggle('source__item--active', isSelected);
            button.setAttribute('aria-pressed', String(isSelected));
        });
    }
}

export default Sources;
