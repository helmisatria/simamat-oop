const Handlebars = require('handlebars');

Handlebars.registerHelper('ifCond', function (v1, v2, options) {
  if (v1 === v2) return options.fn(this)
  return options.inverse(this)
})

Handlebars.registerHelper('ifOr', function (v1, v2, options) {
  if (v1 || v2) return options.fn(this)
  return options.inverse(this)
})

Handlebars.registerHelper('ifNot2', function (v1, v2, options) {
  if (!(v1 || v2)) return options.fn(this)
  return options.inverse(this)
})


module.exports = Handlebars.helpers;