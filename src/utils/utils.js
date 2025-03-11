import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { Filters } from '../consts/consts';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function getDestinationBydI(id, destinations) {
  return destinations.find((dest) => dest.id === id);
}

function getOfferOptionsByType(type, offers) {
  return offers.find((offer) => offer.type === type)?.options;
}

function getOptionById(id, options) {
  return options.find((offer) => offer.id === id);
}

function convertDate(date, newFormat) {
  return dayjs(date).format(newFormat);
}

function getDuration(dateFrom, dateTo) {
  dayjs.extend(duration);

  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);

  const totalDuration = dayjs.duration(to.diff(from));
  const finalDurtion = [];

  if (totalDuration.$d.days > 0) {
    finalDurtion.push(`${totalDuration.$d.days}D`);
  }

  if (totalDuration.$d.hours > 0) {
    finalDurtion.push(`${totalDuration.$d.hours}H`);
  }

  if (totalDuration.$d.minutes > 0) {
    finalDurtion.push(`${totalDuration.$d.minutes}M`);
  }

  return finalDurtion.join(' ');
}

function updatePointData(points, updatedPointData) {
  return points.map((point) => point.id === updatedPointData.id ? updatedPointData : point);
}

function isFuturePoint(date) {
  return dayjs(date).isAfter(new Date(),'day');
}

function isPastPoint(date) {
  return dayjs(date).isBefore(new Date(),'day');
}

function isPresentPoint(dateFrom, dateTo) {
  return dayjs(dateFrom).isSameOrBefore(new Date(),'day') && dayjs(dateTo).isSameOrAfter(new Date(),'day');
}

function isSameDay(date1, date2) {
  return dayjs(date1).isSame(date2, 'd');
}

const filter = {
  [Filters.EVERYTHING]: (points) => points,
  [Filters.FUTURE]: (points) => points.filter((point) => isFuturePoint(point.dateStart)),
  [Filters.PRESENT]: (points) => points.filter((point) => isPresentPoint(point.dateStart, point.dateEnd)),
  [Filters.PAST]: (points) => points.filter((point) => isPastPoint(point.dateEnd)),
};

export { getDestinationBydI, getOfferOptionsByType, getOptionById, convertDate, getDuration, updatePointData,
  isFuturePoint, isPastPoint, isPresentPoint, isSameDay, filter};
