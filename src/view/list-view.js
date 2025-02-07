import { createElement } from '../render';

function createListView() {
  return `<ul class="trip-events__list">
  </ul>`;
}

export class ListView {
  getTemplate() {
    return createListView();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  deleteElement() {
    this.element = null;
  }
}
