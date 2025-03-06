const Formats = {
  DURATION: 'HH:mm',
  TIME_TAG_VALUE: 'YYYY-MM-DD',
  DAY: 'MMM D',
  FULL_DATE: 'D/MM/YY HH:mm',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const Actions = {
  UPDATE_POINT: 'UPDATE_POINT',
  DELETE_POINT: 'DELETE_POINT',
  ADD_TASK: 'ADD_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
};

export { Formats, Mode, Actions, UpdateType };
