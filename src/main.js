import { FilterView } from './view/filter-view.js';
import { render } from './render.js';
import { ListPresenter } from './list-presenter.js';

const pageHeader = document.querySelector('.page-header');
const filtersContaineer = pageHeader.querySelector('.trip-controls__filters');

const pageMainContainer = document.querySelector('.page-body__page-main');
const mainContainer = pageMainContainer.querySelector('.page-body__container');

render(new FilterView(), filtersContaineer);

const listPresenter = new ListPresenter({listContainer: mainContainer});
listPresenter.init();
