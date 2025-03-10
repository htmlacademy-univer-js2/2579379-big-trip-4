import { Actions, UpdateType, FormType } from '../consts/consts';
import { remove, render, RenderPosition } from '../framework/render';
import { EditFormView } from '../view/edit-form-view';

export default class NewPointPresenter {
  #container = null;
  #pointNewComponent = null;

  #pointsModel = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({container, pointsModel, onDataChange, onDestroy}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if(this.#pointNewComponent !== null) {
      return;
    }

    this.#pointNewComponent = new EditFormView({
      destinations: this.#pointsModel.destinations,
      offers: this.#pointsModel.offers,
      onResetClick: this.#resetClickHandler,
      onRollButtonClick: this.#resetClickHandler,
      onSubmitClick: this.#formSubmitHandler,
      type: FormType.CREATE,
    });

    render(this.#pointNewComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = ({isCanceled = true} = {}) => {
    if (this.#pointNewComponent === null) {
      return;
    }

    remove(this.#pointNewComponent);
    this.#pointNewComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);

    this.#handleDestroy({isCanceled});
  };

  #formSubmitHandler = (point) => {
    this.#handleDataChange(
      Actions.ADD_POINT,
      UpdateType.MINOR,
      point
    );
    this.destroy({isCanceled: false});
  };

  #resetClickHandler = () => {
    this.destroy();
  };

  #escKeyDownHandler = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.destroy();
    }
  };
}
