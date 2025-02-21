import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

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

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { getDestinationBydI, getOfferOptionsByType, getOptionById, convertDate, getDuration, updateItem };
