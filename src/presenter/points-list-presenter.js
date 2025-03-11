import { render, RenderPosition, remove } from '../framework/render.js';
import { SortView } from '../view/sort-view.js';
import { PointsListView } from '../view/points-list-view.js';
import { PointPresenter } from './point-presenter.js';
import { Actions, UpdateType, Filters } from '../consts/consts.js';
import { filter } from '../utils/utils.js';
import EmptyListView from '../view/empty-list-view.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';

export class PointsListPresenter {
  #pointsListComponent = new PointsListView();
  #pointsContainer = document.querySelector('.trip-events');

  #pointsListModel = null;
  // #destinations = null;
  // #offers = null;
  #filterType = Filters.EVERYTHING;
  #filterModel = null;
  #emptiListComponent = null;
  #loadingComponent = new LoadingView();
  #isLoading = true;

  #isCreating = false;
  #newPointButtonPresenter = null;
  #newPointPresenter = null;

  #pointPresenters = new Map();

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    this.#newPointPresenter.destroy();
  };

  #handlePointUpdate = async (action, updateType, update) => {
    switch (action) {
      case Actions.UPDATE_POINT:
        await this.#pointsListModel.updatePoint(updateType, update);
        break;
      case Actions.DELETE_POINT:
        this.#pointsListModel.deletePoint(updateType, update);
        break;
      case Actions.ADD_POINT:
        this.#pointsListModel.addPoint(updateType, update);
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderList();
        break;
    }
  };

  #clearPointsList() {
    this.#pointPresenters.forEach((point) => point.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();

    if (this.#emptiListComponent) {
      remove(this.#emptiListComponent);
      remove(this.#loadingComponent);
    }
  }

  newPointButtonClickHandler = () => {
    this.#isCreating = true;
    this.#filterModel.setFilter(UpdateType.MINOR, Filters.EVERYTHING);
    this.#newPointButtonPresenter.disableButton();
    this.#newPointPresenter.init();
  };

  #renderList() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if(!this.#pointsListModel.points.length) {
      return;
    }
    render(this.#pointsListComponent, this.#pointsContainer);
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });

    const pointsLen = this.points.length;
    if(pointsLen === 0) {
      this.#renderEmptyList();
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#pointsContainer, RenderPosition.BEFOREEND);
  }

  #renderEmptyList() {
    this.#emptiListComponent = new EmptyListView({
      filterType: this.#filterType
    });
    render(this.#emptiListComponent, this.#pointsListComponent.element, RenderPosition.AFTERBEGIN);
  }

  constructor({pointsListModel, filterModel, newPointButtonPresenter}) {
    this.#pointsListModel = pointsListModel;
    this.#filterModel = filterModel;
    // this.#offers = this.#pointsListModel.offers;
    // this.#destinations = this.#pointsListModel.destinations;
    this.#newPointButtonPresenter = newPointButtonPresenter;

    this.#pointsListModel.addObserver(this.#handleModelPoint);
    this.#filterModel.addObserver(this.#handleModelPoint);

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#pointsListComponent.element,
      pointsModel: this.#pointsListModel,
      onDataChange: this.#handlePointUpdate,
      onDestroy: this.#newPointDestroyHandler,
    });
  }

  #newPointDestroyHandler = ({isCanceled}) => {
    this.#isCreating = false;
    this.#newPointButtonPresenter.enableButton();
    if(this.points.length === 0 && isCanceled) {
      this.#clearPointsList();
      this.#renderList();
    }
  };

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
      destinations: this.#pointsListModel.destinations,
      offers: this.#pointsListModel.offers,
      pointsListComponent: this.#pointsListComponent,
      changeDataOnFavorite: this.#handlePointUpdate,
      changeMode: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
