import { render } from '../framework/render.js';
import { SortView } from '../view/sort-view.js';
import { PointsListView } from '../view/points-list-view.js';
import { FilterView } from '../view/filter-view.js';
import { PointPresenter } from './point-presenter.js';
//import { updatePointData } from '../utils/utils.js';
import { Actions, UpdateType } from '../consts/consts.js';

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

  //#filterType, #filterModel

  #handlePointUpdate = (action, updateType, update) => {
    switch (action) {
      case Actions.UPDATE_POINT:
        this.#pointsListModel.updatePoint(updateType, update);
        break;
      case Actions.DELETE_POINT:
        this.#pointsListModel.deletePoint(updateType, update);
        break;
      case Actions.ADD_POINT:
        this.#pointsListModel.addPoint(updateType, update);
        break;
    }
    // this.#points = updatePointData(this.#points, updatedPoint);
    // this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModelPoint = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderList();
        break;
    }
  };

  #clearPointsList() {
    this.#pointPresenters.forEach((point) => point.destroy());
    this.#pointPresenters.clear();
  }

  #renderList() {
    render(this.#pointsListComponent, this.#pointsContainer);
  }

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

    this.#pointsListModel.addObserver(this.#handleModelPoint);

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
