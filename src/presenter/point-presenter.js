import { PointView } from '../view/point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { EditFormView } from '../view/edit-form-view.js';
import { Mode, Actions, UpdateType } from '../consts/consts.js';
import { isSameDay } from '../utils/utils.js';
export class PointPresenter {
  #destinations = null;
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
      this.#editFormItem.reset(this.#point);
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#escKeyHandler);
    }
  };

  constructor({destinations, offers, pointsListComponent, changeDataOnFavorite, changeMode}) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#pointsListComponent = pointsListComponent;
    this.#handleDataChange = changeDataOnFavorite;
    this.#handleModeChange = changeMode;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointItem;
    const prevEditFormComponent = this.#editFormItem;

    this.#pointItem = new PointView({point: this.#point, destinations: this.#destinations, offers: this.#offers,
      onRollButtonClick:() => {
        this.#replacePointToEditForm();
      },
      onFavoriteClick: () => {
        this.#addToFaivorite();
      }
    });

    this.#editFormItem = new EditFormView({point: this.#point, destinations: this.#destinations, offers: this.#offers,
      onRollButtonClick: () => {
        this.#editFormItem.reset(this.#point);
        this.#replaceEditFormToPoint();
      },
      onSubmitClick: async (value) => {
        const isMinor = !isSameDay(value.dateStart, this.#point.dateStart) ||
        !isSameDay(value.dateEnd, this.#point.dateEnd);
        await this.#handleDataChange(Actions.UPDATE_POINT, isMinor ? UpdateType.MINOR : UpdateType.PATCH, value);
        this.#replaceEditFormToPoint();
      },
      deleteHandler: async (value) => {
        await this.#handleDataChange(Actions.DELETE_POINT, UpdateType.MINOR, value);
      },
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

  destroy() {
    remove(this.#pointItem);
    remove(this.#editFormItem);
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#editFormItem.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  }

  #replacePointToEditForm() {
    replace(this.#editFormItem, this.#pointItem);
    document.addEventListener('keydown', this.#escKeyHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint() {
    replace(this.#pointItem, this.#editFormItem);
    document.removeEventListener('keydown', this.#escKeyHandler);
    this.#mode = Mode.DEFAULT;
  }

  #addToFaivorite() {
    this.#handleDataChange(Actions.UPDATE_POINT, UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  }
}
