import moment from 'moment';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * Get formatted date time of specified date or today
 * @param date
 * @returns string (Date)
 */
export const getDateTime = (date?: string | Date) =>
  date
    ? moment(date).format(DATE_TIME_FORMAT)
    : moment().format(DATE_TIME_FORMAT);
