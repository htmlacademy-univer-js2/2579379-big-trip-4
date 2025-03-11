import { FilterView } from '../view/filter-view.js';
import { Filters, UpdateType } from '../consts/consts.js';
import {remove, render, replace} from '../framework/render';


export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #filterComponent = null;

  #changeFilterHandler = (filterType) => {
    if(this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MINOR, filterType);
  };

  #modelPointHandler = () => {
    this.init();
  };

  constructor({filterContainer, filterModel, pointsListModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsListModel;

    this.#pointsModel.addObserver(this.#modelPointHandler);
    this.#filterModel.addObserver(this.#modelPointHandler);
  }

  get filters() {
    return Object.values(Filters).map((type) => ({
      id: type,
      name: type,
    }));
  }

  init() {
    const prevFilterComponent = this.#filterComponent;
    const filters = this.filters;

    this.#filterComponent = new FilterView({
      filters,
      currentFilter: this.#filterModel.filter,
      onChangeFilterType: this.#changeFilterHandler
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }
}
