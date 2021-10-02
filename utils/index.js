/**
 * Format the message to send on Slack
 * @param {Array} items
 * @return {String}
 */
function formatMessage(items) {
  return `New list : \n\n${items
    .map((item) => `* ${item}\n`)
    .join('')}`;
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
 * Export
 */
module.exports = {
  formatMessage,
  shuffle,
};
