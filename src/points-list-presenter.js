import { render } from './render.js';
import { SortView } from './view/sort-view.js';
import { PointsListView } from './view/points-list-view.js';
import { EditFormView } from './view/edit-form-view.js';
import { PointView } from './view/point-view.js';
import { FilterView } from './view/filter-view.js';
import { CreationFormView } from './view/creation-form-view.js';

export class PointsListPresenter {
  pointsListComponent = new PointsListView();
  pointsContainer = document.querySelector('.trip-events');
  filterContainer = document.querySelector('.trip-controls__filters');

  constructor({pointsListModel}) {
    this.pointsListModel = pointsListModel;
  }

  init() {
    this.points = this.pointsListModel.getPoints();
    this.offers = this.pointsListModel.getOffers();
    this.destinations = this.pointsListModel.getDestinations();

    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.pointsContainer);
    render(this.pointsListComponent, this.pointsContainer);
    render(new EditFormView({point: this.points[0], destinations: this.destinations, offers: this.offers}), this.pointsListComponent.getElement());

    // for (let i = 0; i < this.points.length; i++) {
    //   render(new PointView({point: this.points[i], destinations: this.destinations,
    //     offers: this.offers}), this.pointsListComponent.getElement());
    // }

    this.points.forEach((point) => {
      render(new PointView({point, destinations: this.destinations,
        offers: this.offers}), this.pointsListComponent.getElement());
    });

    render(new CreationFormView(), this.pointsListComponent.getElement());
  }
}
