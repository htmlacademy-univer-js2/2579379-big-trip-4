import dayjs from 'dayjs';
import { HOURS_PER_DAY, MINUTES_PER_HOUR } from '../consts/consts.js';

function getDestination(id, destinations) {
  return destinations.find((dest) => dest.id === id);
}

function getOfferOptions(type, offers) {
  return offers.find((o) => o.type === type)?.options;
}

function getOption(id, options) {
  return options.find((o) => o.id === id);
}

function convertDate(date, newFormat) {
  return dayjs(date).format(newFormat);
}

function getDuration(dateFrom, dateTo) {
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);

  const duration = [];

  const totalMinutes = to.diff(from, 'minute');
  const minutesRemaining = totalMinutes % (HOURS_PER_DAY * MINUTES_PER_HOUR);

  const days = Math.floor(totalMinutes / (HOURS_PER_DAY * MINUTES_PER_HOUR));
  const hours = Math.floor(minutesRemaining / MINUTES_PER_HOUR);
  const finalMinutes = minutesRemaining % MINUTES_PER_HOUR;

  if (days > 0) {
    return duration.push(`${days}D`);
  }

  if (hours > 0) {
    duration.push(`${hours}H`);
  }

  if (finalMinutes > 0) {
    duration.push(`${finalMinutes}M`);
  }

  return duration.join(' ');
}

export { getDestination, getOfferOptions, getOption, convertDate, getDuration };
