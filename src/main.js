import { PointsListPresenter } from './presenter/points-list-presenter.js';
import PointsListModel from './model/points-list-model.js';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';

const header = document.querySelector('.page-header');
const newPointButtonContainer = header.querySelector('.trip-main');

const newPointButtonPresenter = new NewPointButtonPresenter({
  container: newPointButtonContainer
});

const pointsListModel = new PointsListModel();
const filterModel = new FilterModel();

const listPresenter = new PointsListPresenter({pointsListModel, filterModel,
  newPointButtonPresenter: newPointButtonPresenter});
const filterContainer = document.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter({filterContainer, filterModel, pointsListModel});

newPointButtonPresenter.init({
  onButtonClick: listPresenter.newPointButtonClickHandler
});

listPresenter.init();
filterPresenter.init();
