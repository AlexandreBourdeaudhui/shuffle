/**
 * Package Import
 */
const queryString = require('querystring');

/**
 * Local Import
 */
const { BLOCKS, EVENTS } = require('../constants');

// Helpers
const { formatMessage, shuffle } = require('../utils');
const { postMessage } = require('../utils/slack');

/**
 * Serverless function handler
 * It is launched when an event is dispatch on Slack
 *
 * @param {Object} event
 * @param {Object} context
 * @param {Function} callback
 *
 */
exports.handler = async (event, context, callback) => {
  // Unauthorized Request.
  if (!process.env.TOKEN_SLACK) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized Request.' }),
    };
  }

  // Payload Not Found.
  if (!event.body) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Not Found.' }),
    };
  }

  try {
    // Data
    const body = queryString.parse(event.body);
    const payload = JSON.parse(body.payload);
    // console.log({ payload });

    //
    if (
      payload.type === EVENTS.VIEW_SUBMISSION &&
      payload.view.callback_id === BLOCKS.CALLBACK_ID
    ) {
      const values = payload.view.state.values[BLOCKS.BLOCK_ID];
      const users = values[BLOCKS.INPUT_USERS_ID].selected_users || [];

      // Shuffle items
      const formatUsers = users.map((user) => `<@${user}>`);
      const itemsShuffled = shuffle(formatUsers);

      await postMessage({
        channel: payload.view.private_metadata,
        text: formatMessage(itemsShuffled),
      });

      return callback(null, {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: null,
      });
    }

    //
    // if (
    //   payload.type === EVENTS.ACTIONS_BLOCK &&
    //   payload.view.callback_id === BLOCKS.CALLBACK_ID
    // ) {
    //   //
    //   const trimmedMessage = text.trim();
    //   const isEmpty = trimmedMessage === '';

    //   if (!isEmpty) {
    //     // If we have text, let's go to shuffle the elements
    //     const items = trimmedMessage.split(' ').filter(Boolean);
    //     const itemsShuffled = shuffle(items);
        
    //     return callback(null, {
    //       statusCode: 200,
    //       headers: { 'Content-Type': 'application/json' },
    //       body: null,
    //     });
    //   }
    // }

    return callback(null, {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: null,
    });
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
