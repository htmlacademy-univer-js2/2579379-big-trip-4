import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import {
  getDestinationBydI,
  getOfferOptionsByType,
  convertDate,
} from '../utils/utils.js';
import { Formats } from '../consts/consts.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const FLATPICKR_CONFIG = {
  dateFormat: 'd/m/y H:i',
  enableTime: true,
  locale: {
    firstDayOfWeek: 1,
  },
  'time_24hr': true,
};

function createOfferTemplate(option, pointOptions) {
  const {title, price, id} = option;
  const isOptionChecked = pointOptions.includes(id);
  const optionId = `event-offer-${id}-1`;

  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="${optionId}" type="checkbox" name="event-offer-${id}" value="${id}" ${isOptionChecked ? 'checked' : ''}>
            <label class="event__offer-label" for="${optionId}">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`;
}

function createEditFormTemplate(state, destinations, offers) {
  const {type: pointType, dateStart, dateEnd, price, destinationId: pointDestination, pointOptions: pointOptions} = state.point;
  const pointTypeIsChecked = (type) => type === pointType ? 'checked' : '';
  const startDate = convertDate(dateStart, Formats.FULL_DATE);
  const endDate = convertDate(dateEnd, Formats.FULL_DATE);
  const offersOptions = getOfferOptionsByType(pointType, offers);
  const destination = getDestinationBydI(pointDestination, destinations);
  const isDestinationValid = destination !== undefined && destination.photos !== undefined && destination.description !== undefined;

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${pointTypeIsChecked('taxi')}>
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${pointTypeIsChecked('bus')}>
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${pointTypeIsChecked('train')}>
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${pointTypeIsChecked('ship')}>
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${pointTypeIsChecked('drive')}>
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${pointTypeIsChecked('flight')}>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${pointTypeIsChecked('check-in')}>
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${pointTypeIsChecked('sightseeinf')}>
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${pointTypeIsChecked('restaurant')}>
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${pointType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${isDestinationValid ? destination.destinationName : ''}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinations.map((dest) => `<option value="${dest.id}">${dest.destinationName}</option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                ${(offersOptions !== undefined && offersOptions.length !== 0) ? `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                      ${offersOptions.map((option) => createOfferTemplate(option, pointOptions)).join('')}
                    </div>
                  </section>` : ''}
                  
                  ${isDestinationValid ? `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${isDestinationValid ? destination.description : ''}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${isDestinationValid ? destination.photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.alt}">`).join('') : ''}
                      </div>
                    </div>
                  </section>` : ''}
                </section>
              </form>
            </li>`;
}
export class EditFormView extends AbstractStatefulView {

  #destinations = null;
  #offers = null;
  #clickHandler = null;
  #submitHandler = null;
  #datepickerStart = null;
  #datepickerEnd = null;
  #prev = null;

  constructor({point, destinations, offers, onRollButtonClick, onSubmitClick}) {
    super();

    this._setState({point});
    this.#destinations = destinations;
    this.#offers = offers;
    this.#clickHandler = onRollButtonClick;
    this.#submitHandler = onSubmitClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditFormTemplate(this._state, this.#destinations, this.#offers);
  }

  reset = (point) => this.updateElement({point});

  #formSubmitHandler = (event) => {
    event.preventDefault();
    this.#submitHandler(this.#parseStateToPoint());
  };

  #changePointType = (event) => {
    this.updateElement({
      point: {
        ...this._state.point,
        type: event.target.value,
        pointOptions: [],
      }
    });
  };

  #rollButtonHandler = (event) => {
    event.preventDefault();
    this.#clickHandler();
  };

  #changePriceHandler = (event) => {
    event.preventDefault();
    this._setState({
      point: {
        ...this._state.point,
        price: event.target.value,
      }
    });
  };

  #changeDestinationHandler = (event) => {
    const selectedDestination = this.#destinations.find((pointDestination) =>
      pointDestination.id === event.target.value
    );
    const selectedDestinationId = selectedDestination ? selectedDestination.id : null;

    this.updateElement({
      point: {
        ...this._state.point,
        destinationId: selectedDestinationId,
      }
    });
  };

  #offersChangeHandler = (event) => {
    event.preventDefault();
    const options = this._state.point.pointOptions;
    const checkedOffers = options.includes(event.target.value) ? options.filter((item) =>
      item !== event.target.value) : [...options, event.target.value];

    this._setState({
      point: {
        ...this._state.point,
        pointOptions: checkedOffers,
      }
    });
  };

  #closeDateStartHandler = ([date]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateStart: date,
      }
    });
    this.#datepickerEnd.set('minDate', this._state.point.dateStart);
  };

  #closeDateEndHandler = ([date]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateEnd: date,
      }
    });
    this.#datepickerStart.set('maxDate', this._state.point.dateEnd);
  };

  #setDatepickers = () => {
    const [dateStartElement, dateEndElement] = this.element.querySelectorAll('.event__input--time');

    this.#datepickerStart = flatpickr(dateStartElement, {
      ...FLATPICKR_CONFIG,
      defaultDate: this._state.point.dateStart,
      onClose: this.#closeDateStartHandler,
      maxDate: this._state.point.dateEnd,
    });

    this.#datepickerEnd = flatpickr(dateEndElement, {
      ...FLATPICKR_CONFIG,
      defaultDate: this._state.point.dateEnd,
      onClose: this.#closeDateEndHandler,
      minDate: this._state.point.dateStart,
    });
  };

  removeElement = () => {
    super.removeElement();

    if(this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }
    if(this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  };

  #formValidation = (event) => {
    const formNode = event.target?.form || event.target;
    if (!formNode) {
      return;
    }
    const destValue = this.element.querySelector('.event__input--destination')?.value || '';
    const priceValue = this.element.querySelector('.event__input--price')?.value || '';
    const dateFrom = this.element.querySelector('[name="event-start-time"]')?.value || '';
    const dateTo = this.element.querySelector('[name="event-end-time"]')?.value || '';
    const isDurationValid = dateFrom && dateTo;

    const isValid = priceValue && Number(priceValue) > 0 && destValue && isDurationValid;

    const saveButton = formNode.querySelector('.event__save-btn');
    if (saveButton) {
      saveButton.disabled = !isValid;
    }
  };

  _restoreHandlers = () => {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollButtonHandler);
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event--edit').addEventListener('input', this.#formValidation);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changePointType);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePriceHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((element) =>
      element.addEventListener('change', this.#offersChangeHandler));
    this.#setDatepickers();

    if (this.element) {
      const form = this.element.querySelector('.event--edit');
      if (form) {
        this.#formValidation({ target: form });
      }
    }
  };

  #parseStateToPoint = () => this._state.point;
}
