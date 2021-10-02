/**
 * Package Import
 */
const queryString = require('querystring');

/**
 * Format the message to send on Slack
 * @param {Array} items
 * @return {String}
 */
function formatMessage(items) {
  return `New list : \n\n${items.map((item) => `* ${item}\n`).join('')}`;
}

/**
 * Shuffle array with the `Fisher–Yates` algorithm
 * @param {Array} items
 * @return {Array}
 */
function shuffle(items) {
  for (let index = items.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
  }

  return items;
}

/**
 * Parse the request body
 * @param {String} body
 * @return {Object}
 */
function parseRequestBody(body) {
  const parsedBody = queryString.parse(body);

  if (typeof parsedBody.payload === 'string') {
    return JSON.parse(parsedBody.payload);
  }

  return parsedBody;
}

/**
 * Export
 */
module.exports = {
  formatMessage,
  parseRequestBody,
  shuffle,
};
