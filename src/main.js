import { PointsListPresenter } from './points-list-presenter.js';

const pageMainContainer = document.querySelector('.page-body__page-main');
const mainContainer = pageMainContainer.querySelector('.page-body__container');

const listPresenter = new PointsListPresenter({listContainer: mainContainer});
listPresenter.init();
