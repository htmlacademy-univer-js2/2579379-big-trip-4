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

  init() {
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.pointsContainer);
    render(this.pointsListComponent, this.pointsContainer);
    render(new EditFormView(), this.pointsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.pointsListComponent.getElement());
    }
    render(new CreationFormView(), this.pointsContainer);
  }
}
