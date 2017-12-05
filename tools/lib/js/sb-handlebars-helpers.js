'use strict';

const moment = require('moment');

module.exports.register = function(Handlebars, options) {

  Handlebars.registerHelper("ifFutureDate", (date, options) => {
    if (date === void 0 || Date.parse(date) >= new Date()) {
      return options.fn(this);
    }
  });

  Handlebars.registerHelper("toFromDate", (start, end, options) => {
    var endDate, endMonth, monthNames, startDate, startMonth;
    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    startDate = new Date(start);
    endDate = new Date(end);
    startMonth = startDate.getMonth();
    endMonth = endDate.getMonth();
    if (startMonth === endMonth) {
      if (startDate.getDate() === endDate.getDate()) {
        return new Handlebars.SafeString("" + monthNames[startMonth] + " " + (startDate.getDate()) + ", " + (startDate.getFullYear()));
      } else {
        return new Handlebars.SafeString("" + monthNames[startMonth] + " " + (startDate.getDate()) + "-" + (endDate.getDate()) + ", " + (startDate.getFullYear()));
      }
    } else {
      return new Handlebars.SafeString("" + (monthNames[startMonth].substring(0, 3)) + " " + (startDate.getDate()) + "- " + (monthNames[endMonth].substring(0, 3)) + " " + (endDate.getDate()) + ", " + (endDate.getFullYear()));
    }
  });

  Handlebars.registerHelper("createId", (str) => str.toLowerCase().replace(/\s/gi, "_"));

  Handlebars.registerHelper("now", (format) => moment().format(format) );

  Handlebars.registerHelper("join", (arr, glue) => arr.join(glue) );

  Handlebars.registerHelper("is", function(a, b, options) {
    if (arguments.length === 2) {
      options = b;
      b = options.hash.compare;
    }
    if (a === b) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  Handlebars.registerHelper("isnt", function(a, b, options) {
    if (arguments.length === 2) {
      options = b;
      b = options.hash.compare;
    }
    if (a !== b) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  Handlebars.registerHelper("markdown", require('helper-markdown'));

};
