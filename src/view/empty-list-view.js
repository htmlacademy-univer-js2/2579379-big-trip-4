import { EmptyListMessage } from '../consts/consts';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

function createEmptyListTemplate(filterType) {
  const message = EmptyListMessage[filterType];

  return `<p class="trip-events__msg">
          ${message}
        </p>`;
}

export default class EmptyListView extends AbstractStatefulView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
