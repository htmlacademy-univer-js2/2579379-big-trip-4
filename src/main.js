import { PointsListPresenter } from './presenter/points-list-presenter.js';
import PointsListModel from './model/points-list-model.js';

const pointsListModel = new PointsListModel();

const listPresenter = new PointsListPresenter({pointsListModel});
listPresenter.init();
