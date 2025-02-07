import { render } from './render.js';
import { SortView } from './view/sort-view.js';
import { ListView } from './view/list-view.js';
import { EditFormView } from './view/edit-form-view.js';
import { MainContentSectionView } from './view/main-content-section-view.js';
import { PointView } from './view/point-view.js';

export class ListPresenter {
  listComponent = new ListView();
  mainContentSectionView = new MainContentSectionView();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render(new SortView(), this.mainContentSectionView.getElement());
    render(this.listComponent, this.mainContentSectionView.getElement());
    render(new EditFormView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listComponent.getElement());
    }
  }
}
