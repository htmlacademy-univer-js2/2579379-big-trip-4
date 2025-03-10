import AbstractView from '../framework/view/abstract-view.js';

function createNewEventButtonTemplate() {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">
  New event</button>`;
}

export default class NewPointButtonView extends AbstractView {
  #addHandler = null;

  constructor({onButtonClick}) {
    super();
    this.#addHandler = onButtonClick;
    this.element.addEventListener('click', this.#clickButtonHandler);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  setDisabled = (isDisabled) => {
    this.element.disabled = isDisabled;
  };

  #clickButtonHandler = (evt) => {
    evt.preventDefault();
    this.#addHandler();
  };
}
