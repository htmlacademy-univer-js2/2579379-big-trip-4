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
  MAJOR: 'MAJOR',
};

const Filters = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST'
};

const EmptyListMessage = {
  [Filters.EVERYTHING]: 'Click New Event to create your first point',
  [Filters.PAST]: 'There are no past events now',
  [Filters.PRESENT]: 'There are no present events now',
  [Filters.FUTURE]: 'There are no future events now'
};

export { Formats, Mode, Actions, UpdateType, Filters, EmptyListMessage };
