/**
 * Package Import
 */
import { Handler } from '@netlify/functions';

/**
 * Local Import
 */
import { BLOCKS, EVENTS } from '../constants';

// Helpers
import { postMessage } from '../utils/slack';
import { formatMessage, parseRequestBody, shuffle } from '../utils';

/**
 * Serverless function handler
 * It is launched when an event is dispatch on Slack
 */
export const handler: Handler = async (event) => {
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
    const payload = parseRequestBody(event.body);
    // console.log({ payload });

    //
    if (
      payload.type === EVENTS.VIEW_SUBMISSION &&
      payload.view.callback_id === BLOCKS.CALLBACK_ID
    ) {
      const { values } = payload.view.state;
      const { selected_users } = values[BLOCKS.BLOCK_ID][BLOCKS.INPUT_USERS_ID];

      if (Array.isArray(selected_users) && selected_users.length > 0) {
        // Shuffle items
        const formatUsers = selected_users.map((user) => `<@${user}>`);
        const itemsShuffled = shuffle(formatUsers);

        // Send the shuffle items on Slack
        await postMessage({
          channel: payload.view.private_metadata,
          text: formatMessage(itemsShuffled),
        });
      }

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
