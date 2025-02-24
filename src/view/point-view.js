import AbstractView from '../framework/view/abstract-view.js';
import {
  getDestinationBydI,
  getOfferOptionsByType,
  getOptionById,
  convertDate,
  getDuration
} from '../utils/utils.js';
import { Formats } from '../consts/consts.js';

function createOfferTemplate(optionId, offeTtype, options) {
  const pointOptions = getOfferOptionsByType(offeTtype, options);
  const {title, price} = getOptionById(optionId, pointOptions);

  return `<li class="event__offer">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>`;
}

function createPointTemplate(point, destinations, offers) {
  const {type, dateStart, dateEnd, price, destinationId: pointDestination, pointOptions: pointOptions, isFavorite} = point;

  const day = convertDate(dateStart, Formats.DAY);
  const dayValue = convertDate(dateStart, Formats.TIME_TAG_VALUE);

  const destination = getDestinationBydI(pointDestination, destinations);

  const timeStart = convertDate(dateStart, Formats.DURATION);
  const timeEnd = convertDate(dateEnd, Formats.DURATION);
  const duration = getDuration(dateStart, dateEnd);

  const isFav = isFavorite ? 'event__favorite-btn--active' : '';

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dayValue}">${day}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination.destinationName}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateStart.toISOString()}">${timeStart}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateEnd.toISOString()}">${timeEnd}</time>
                  </p>
                  <p class="event__duration">${duration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${pointOptions.map((id) => createOfferTemplate(id, type, offers)).join('')}
                </ul>
                <button class="event__favorite-btn ${isFav}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export class PointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;

  constructor({point, destinations, offers, onRollButtonClick, onFavoriteClick}) {
    super();

    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', (event) => {
      event.preventDefault();
      onRollButtonClick();
    });
    this.element.querySelector('.event__favorite-btn').addEventListener('click', (event) => {
      event.preventDefault();
      onFavoriteClick();
    });
  }

  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#offers);
  }
}
