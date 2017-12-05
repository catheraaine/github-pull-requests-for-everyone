module.exports.register = function(Handlebars, options) {
  Handlebars.registerHelper("ifFutureDate", function(date, options) {
    if (date === void 0 || Date.parse(date) >= new Date()) {
      return options.fn(this);
    }
  });
  Handlebars.registerHelper("toFromDate", function(start, end, options) {
    var endDate, endMonth, monthNames, startDate, startMonth;
    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    debugger;
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
  return Handlebars.registerHelper("createId", function(str) {
    str = str.toLowerCase();
    return str.replace(/\s/gi, "_");
  });
};
