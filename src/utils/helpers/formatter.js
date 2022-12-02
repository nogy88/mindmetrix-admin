import moment from "moment";

export const formatDate = (date, format = "YYYY.MM.DD") => {
  if (
    moment(date).format(format) === moment("0001-01-01").format(format) ||
    !date
  ) {
    return "-";
  }
  return moment(date).format(format);
};

export const formatDateTime = (date, format = "YYYY.MM.DD HH:mm:ss") => {
  return date ? moment(date).format(format) : date;
};

export const formatCurrency = (amount) => {
  return amount ? amount.toLocaleString() : 0;
};
