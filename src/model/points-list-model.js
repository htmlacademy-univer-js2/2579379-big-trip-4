//import { testPoints, testOffers, testDestinations } from '../mock/mock-data.js';
import Observable from '../framework/observable.js';
import { updatePointData } from '../utils/utils.js';
import { UpdateType } from '../consts/consts.js';

export default class PointsListModel extends Observable {

  #points = [];
  #offers = [];
  #destinations = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  // getPointById(id) {
  //   return this.#points.find((point) => point.id === id);
  // }

  async updatePoint(updateType, point) {
    try {
      const response = await this.#pointsApiService.updatePoint(point).then(this.#adaptToClient);
      this.#points = updatePointData(this.#points, response);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
    this._notify(updateType, point);
  }

  addPoint(updatePoint, point) {
    this.#points.push(point);
    this._notify(updatePoint, point);
  }

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

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      const destinations = await this.#pointsApiService.destinations;
      this.#destinations = destinations.map(this.#adaptDestinationsToClient);
      this.#offers = await this.#pointsApiService.offers;
    } catch(err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT, null);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      dateStart: point['date_from'] !== null ? new Date(point['date_from']) : new Date(point['date_from']),
      dateEnd: point['date_to'] !== null ? new Date(point['date_to']) : new Date(point['date_to']),
      destinationId: point['destination'],
      price: point['base_price'],
      pointOptions: point['offers'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['destination'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['offers'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  #adaptDestinationsToClient(destination) {
    const adaptedDestination = {...destination,
      destinationName: destination['name'],
      photos: destination['pictures'],
    };

    delete adaptedDestination['name'];
    delete adaptedDestination['pictures'];

    return adaptedDestination;
  }
}
