/**
 * Local Import
 */
const { BLOCKS, EVENTS } = require('../constants');

// Helpers
const { postMessage } = require('../utils/slack');
const { formatMessage, parseRequestBody, shuffle } = require('../utils');

/**
 * Serverless function handler
 * It is launched when an event is dispatch on Slack
 */
exports.handler = async (event) => {
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
    const payload = parseRequestBody(event.body)
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

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: '',
      };
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
        
    //     return {
    //       statusCode: 200,
    //       headers: { 'Content-Type': 'application/json' },
    //       body: '',
    //     };
    //   }
    // }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: '',
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
