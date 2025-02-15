import { testPoints, testOffers, testDestinations } from '../mock/mock-data.js';

export default class PointsListModel {

  get points() {
    return [...testPoints];
  }

  get offers() {
    return [...testOffers];
  }

  get destinations() {
    return [...testDestinations];
  }
}
