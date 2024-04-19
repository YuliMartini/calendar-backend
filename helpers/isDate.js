const { isValid } = require("date-fns");

const isDate = (value) => {
  if (!value) {
    return false;
  }

  return isValid(new Date(value)) ? true : false;
};

module.exports = { isDate };
