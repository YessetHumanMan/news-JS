export function queryRequired<TElement extends Element>(selector: string, parent: ParentNode = document): TElement {
    const element = parent.querySelector<TElement>(selector);

    if (!element) {
        throw new Error(`Required element was not found: ${selector}`);
    }

    return element;
}

export function cloneTemplate(templateSelector: string): DocumentFragment {
    const template = queryRequired<HTMLTemplateElement>(templateSelector);
    return template.content.cloneNode(true) as DocumentFragment;
}
