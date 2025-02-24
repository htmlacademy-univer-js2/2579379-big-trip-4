import { render } from '../framework/render.js';
import { SortView } from '../view/sort-view.js';
import { PointsListView } from '../view/points-list-view.js';
import { FilterView } from '../view/filter-view.js';
import { PointPresenter } from './point-presenter.js';
import { updatePointData } from '../utils/utils.js';

export class PointsListPresenter {
  #pointsListComponent = new PointsListView();
  #pointsContainer = document.querySelector('.trip-events');
  #filterContainer = document.querySelector('.trip-controls__filters');

  #pointsListModel = null;
  #points = null;
  #destinations = null;
  #offers = null;

  #pointPresenters = new Map();

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointUpdate = (updatedPoint) => {
    this.#points = updatePointData(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

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
    const pointPresenter = new PointPresenter({
      destinations: this.#destinations,
      offers: this.#offers,
      pointsListComponent: this.#pointsListComponent,
      changeDataOnFavorite: this.#handlePointUpdate,
      changeMode: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
