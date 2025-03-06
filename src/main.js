import { PointsListPresenter } from './presenter/points-list-presenter.js';
import PointsListModel from './model/points-list-model.js';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';

const pointsListModel = new PointsListModel();
const filterModel = new FilterModel();
const listPresenter = new PointsListPresenter({pointsListModel, filterModel});
const filterContainer = document.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter({filterContainer, filterModel, pointsListModel});

listPresenter.init();
filterPresenter.init();
