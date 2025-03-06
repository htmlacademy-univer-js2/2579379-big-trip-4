import Observable from '../framework/observable';
import { Filters } from '../consts/consts.js';

export default class FilterModel extends Observable {
  #filter = Filters.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
