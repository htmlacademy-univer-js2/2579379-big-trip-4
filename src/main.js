import { PointsListPresenter } from './presenter/points-list-presenter.js';
import PointsListModel from './model/points-list-model.js';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic v2a14a3i8a7t0rr';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const header = document.querySelector('.page-header');
const newPointButtonContainer = header.querySelector('.trip-main');

const newPointButtonPresenter = new NewPointButtonPresenter({
  container: newPointButtonContainer
});

const pointsListModel = new PointsListModel({pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)});
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
pointsListModel.init();
