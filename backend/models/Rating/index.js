const { Id, sanitize} = require('../../utils');
const ratingFactory = require('./Rating');

const makeRating = ratingFactory({Id, sanitize});

module.exports = makeRating;