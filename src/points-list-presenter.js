import { render, replace } from './framework/render.js';
import { SortView } from './view/sort-view.js';
import { PointsListView } from './view/points-list-view.js';
import { EditFormView } from './view/edit-form-view.js';
import { PointView } from './view/point-view.js';
import { FilterView } from './view/filter-view.js';

export class PointsListPresenter {
  #pointsListComponent = new PointsListView();
  #pointsContainer = document.querySelector('.trip-events');
  #filterContainer = document.querySelector('.trip-controls__filters');

  #pointsListModel = null;
  #points = null;
  #destinations = null;
  #offers = null;

  constructor({pointsListModel}) {
    this.#pointsListModel = pointsListModel;
  }

  init() {
    this.#points = this.#pointsListModel.points;
    this.#offers = this.#pointsListModel.offers;
    this.#destinations = this.#pointsListModel.destinations;

    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#pointsContainer);
    render(this.#pointsListComponent, this.#pointsContainer);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const escKeyHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyHandler);
      }
    };

    const editForm = new EditFormView({point, destinations: this.#destinations, offers: this.#offers,
      onSubmitClick: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyHandler);
      },
      onRollButtonClick: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyHandler);
      }
    });

    const pointItem = new PointView({point, destinations: this.#destinations, offers: this.#offers,
      onRollButtonClick: () => {
        replacePointToEditForm();
        document.addEventListener('keydown', escKeyHandler);
      }
    });

    function replacePointToEditForm() {
      replace(editForm, pointItem);
    }

    function replaceEditFormToPoint() {
      replace(pointItem, editForm);
    }

    render(pointItem, this.#pointsListComponent.element);
  }
}
