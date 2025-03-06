import { testPoints, testOffers, testDestinations } from '../mock/mock-data.js';
import Observable from '../framework/observable.js';
import { updatePointData } from '../utils/utils.js';

export default class PointsListModel extends Observable {

  #points = [...testPoints];
  #offers = [...testOffers];
  #destinations = [...testDestinations];

  get points() {
    return this.#points;
  }

  // получение точки маршрута (по id)
  getPointById(id) {
    return this.#points.find((point) => point.id === id);
  }

  //обновление
  updatePoint(updateType, point) {
    this.#points = updatePointData(this.#points, point);
    this._notify(updateType, point);
  }

  //add
  addPoint(updatePoint, point) {
    this.#points.push(point);
    this._notify(updatePoint, point);
  }

  //del
  deletePoint(updateType, point) {
    this.#points = this.#points.filter((pointItem) => pointItem.id !== point.id);
    this._notify(updateType);
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
