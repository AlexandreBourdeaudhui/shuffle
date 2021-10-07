/**
 * Package Import
 */
import { Handler } from '@netlify/functions';

/**
 * Local Import
 */
import { ACTIONS, BLOCKS, EVENTS, OPTIONS_VALUES } from '../constants';

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
      const { selected_users } = values[BLOCKS.USERS][ACTIONS.USERS_ID];
      const { selected_options } = values[BLOCKS.OPTIONS][ACTIONS.OPTIONS_ID];

      if (Array.isArray(selected_users) && selected_users.length > 0) {
        // Shuffle items
        const formatItems = selected_users.map((user) => `<@${user}>`);
        const itemsShuffled = shuffle(formatItems);

        // Options
        const onlyChecked = selected_options.some(
          ({ value }: { value: OPTIONS_VALUES }) =>
            value === OPTIONS_VALUES.UNIQUE_CHECKED,
        );

        // Send the shuffle items
        await postMessage({
          channel: payload.view.private_metadata,
          text: formatMessage(itemsShuffled, { onlyChecked }),
        });
      }
    }

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
