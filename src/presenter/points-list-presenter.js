import { render, RenderPosition, remove } from '../framework/render.js';
import { SortView } from '../view/sort-view.js';
import { PointsListView } from '../view/points-list-view.js';
import { PointPresenter } from './point-presenter.js';
import { Actions, UpdateType, Filters } from '../consts/consts.js';
import { filter } from '../utils/utils.js';
import EmptyListView from '../view/empty-list-view.js';

export class PointsListPresenter {
  #pointsListComponent = new PointsListView();
  #pointsContainer = document.querySelector('.trip-events');

  #pointsListModel = null;
  #destinations = null;
  #offers = null;
  #filterType = Filters.EVERYTHING;
  #filterModel = null;
  #emptiListComponent = null;

  #pointPresenters = new Map();

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointUpdate = (action, updateType, update) => {
    switch (action) {
      case Actions.UPDATE_POINT:
        this.#pointsListModel.updatePoint(updateType, update);
        break;
      case Actions.DELETE_POINT:
        this.#pointsListModel.deletePoint(updateType, update);
        break;
    }
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
      case UpdateType.MAJOR:
        this.#clearPointsList();
        this.#renderList();
        break;
    }
  };

  #clearPointsList() {
    this.#pointPresenters.forEach((point) => point.destroy());
    this.#pointPresenters.clear();

    if (this.#emptiListComponent) {
      remove(this.#emptiListComponent);
    }
  }

  #renderList() {
    render(this.#pointsListComponent, this.#pointsContainer);
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });

    const pointsLen = this.points.length;
    if(pointsLen === 0) {
      this.#renderEmptyList();
    }
  }

  #renderEmptyList() {
    this.#emptiListComponent = new EmptyListView({
      filterType: this.#filterType
    });
    render(this.#emptiListComponent, this.#pointsListComponent.element, RenderPosition.AFTERBEGIN);
  }

  constructor({pointsListModel, filterModel}) {
    this.#pointsListModel = pointsListModel;
    this.#filterModel = filterModel;
    this.#offers = this.#pointsListModel.offers;
    this.#destinations = this.#pointsListModel.destinations;

    this.#pointsListModel.addObserver(this.#handleModelPoint);
    this.#filterModel.addObserver(this.#handleModelPoint);
  }

  init() {
    render(new SortView(), this.#pointsContainer);
    this.#renderList();
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const filteredPoints = filter[this.#filterType](this.#pointsListModel.points);

    return filteredPoints;
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
