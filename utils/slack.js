/**
 * Package Import
 */
const axios = require('axios');

/**
 *
 * @param {String} request
 * @param {Object} params
 * @returns
 */
async function api(request, params) {
  return axios.get(`https://slack.com/api/${request}`, {
    headers: { Authorization: `Bearer ${process.env.TOKEN_SLACK}` },
    params,
  });
}

/**
 * Post message
 * @api https://api.slack.com/methods/chat.postMessage
 * @param {String} channel
 * @param {String} text
 * @returns
 */
async function postMessage({ channel, text }) {
  return api('chat.postMessage', {
    channel,
    text,
  });
}

/**
 * Get the members of the channel
 * @api https://api.slack.com/methods/conversations.members
 * @param {String} channel
 * @return {Promise}
 */
async function getMembers({ channel }) {
  return api('conversations.members', {
    channel,
  });
}

/**
 * Open modal
 * @api https://api.slack.com/methods/views.open
 * @param {String} trigger_id
 * @param {Object} view
 * @return {Promise}
 */
async function openViewModal({ trigger_id, view }) {
  return api('views.open', {
    trigger_id,
    view,
  });
}

/**
 * Export
 */
module.exports = {
  getMembers,
  openViewModal,
  postMessage,
};
