import { PointView } from '../view/point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { EditFormView } from '../view/edit-form-view.js';
import { Mode } from '../consts/consts.js';

export class PointPresenter {
  #destinstions = null;
  #offers = null;
  #point = null;
  #pointItem = null;
  #editFormItem = null;
  #pointsListComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  #escKeyHandler = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#escKeyHandler);
    }
  };

  constructor({destinations, offers, pointsListComponent, changeDataOnFavorite, changeMode}) {
    this.#destinstions = destinations;
    this.#offers = offers;
    this.#pointsListComponent = pointsListComponent;
    this.#handleDataChange = changeDataOnFavorite;
    this.#handleModeChange = changeMode;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointItem;
    const prevEditFormComponent = this.#editFormItem;

    this.#pointItem = new PointView({point: this.#point, destinations: this.#destinstions, offers: this.#offers,
      onRollButtonClick:() => {
        this.#replacePointToEditForm();
        document.removeEventListener('keydown', this.#escKeyHandler);
      },
      onFavoriteClick: () => {
        this.#addToFaivorite();
      }
    });

    this.#editFormItem = new EditFormView({point, destinations: this.#destinstions, offers: this.#offers,
      onRollButtonClick: () => {
        this.#replaceEditFormToPoint();
        document.addEventListener('keydown', this.#escKeyHandler);
      },
      onSubmitClick: () => {
        this.#replaceEditFormToPoint();
        document.removeEventListener('keydown', this.#escKeyHandler);
      }
    });

    if (prevPointComponent === null || prevEditFormComponent === null) {
      render(this.#pointItem, this.#pointsListComponent.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointItem, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editFormItem, prevEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevEditFormComponent);
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
  }

  #replacePointToEditForm() {
    replace(this.#editFormItem, this.#pointItem);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint() {
    replace(this.#pointItem, this.#editFormItem);
    this.#mode = Mode.DEFAULT;
  }

  #addToFaivorite() {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  }
}
