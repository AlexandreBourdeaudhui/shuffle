/**
 * Package Import
 */
import axios from 'axios';

/**
 *
 */
const api = async (request, params) =>
  axios.get(`https://slack.com/api/${request}`, {
    headers: { Authorization: `Bearer ${process.env.TOKEN_SLACK}` },
    params,
  });

/**
 * Post message
 * @api https://api.slack.com/methods/chat.postMessage
 * @param {String} channel
 * @param {String} text
 * @returns
 */
export const postMessage = async ({ channel, text }) =>
  api('chat.postMessage', {
    channel,
    text,
  });

/**
 * Get the members of the channel
 * @api https://api.slack.com/methods/conversations.members
 */
export const getMembers = async ({ channel }) =>
  api('conversations.members', {
    channel,
  });

/**
 * Open modal
 * @api https://api.slack.com/methods/views.open
 */
export const openViewModal = async ({ trigger_id, view }) =>
  api('views.open', {
    trigger_id,
    view,
  });
