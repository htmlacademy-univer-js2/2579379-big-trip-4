import { testPoints, testOffers, testDestinations } from '../mock/mock-data.js';

export default class PointsListModel {
  points = [...testPoints];
  offers = [...testOffers];
  destinations = [...testDestinations];

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
