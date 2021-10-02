/**
 * Package Import
 */
import axios from 'axios';

/**
 * Local Import
 */
import {
  MessageParams,
  MembersParams,
  OpenViewParams,
  SlackRequest,
} from '../types';

/**
 *
 */
const api = async (request: string, params: SlackRequest) =>
  axios.get(`https://slack.com/api/${request}`, {
    headers: { Authorization: `Bearer ${process.env.TOKEN_SLACK}` },
    params,
  });

/**
 * Post message on the current channel
 * @api https://api.slack.com/methods/chat.postMessage
 */
export const postMessage = async ({ channel, text }: MessageParams) =>
  api('chat.postMessage', { channel, text });

/**
 * Get the members of the current channel
 * @api https://api.slack.com/methods/conversations.members
 */
export const getMembers = async ({ channel }: MembersParams) =>
  api('conversations.members', { channel });

/**
 * Open modal
 * @api https://api.slack.com/methods/views.open
 */
export const openViewModal = async ({ trigger_id, view }: OpenViewParams) =>
  api('views.open', { trigger_id, view });
