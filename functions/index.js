/*
 * Package Import
 */
const axios = require('axios');
const queryString = require('querystring');

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
 * Get the members of the channel, which is in parameter
 * @api https://api.slack.com/methods/conversations.members
 * @param {String} channel
 * @return {Promise}
 */
async function getMembers({ channel }) {
  return axios.get('https://slack.com/api/conversations.members', {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN_SLACK}`,
    },
    params: {
      channel,
    },
  });
}

/**
 * Format the message to send on Slack
 * @param {Array} items
 * @return {String}
 */
function formatMessage(items) {
  return `Nouvelle liste : \n\n${items
    .map((item) => `* ${item.startsWith('@') ? `<${item}>` : item}\n`)
    .join('')}`;
}

/**
 * Send to Slack
 * @param {Array} items
 * @return {Object}
 */
function setSlackResponse(items, statusCode = 200) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      response_type: 'in_channel',
      text: formatMessage(items),
    }),
  };
}

/**
 * Serverless function handler
 *
 * It is launched when the `/shuffle` command is called on Slack
 * @doc https://api.slack.com/interactivity/slash-commands#getting_started
 *
 * @param {Object} event
 * @param {Object} context
 * @return
 */
exports.handler = async (event, context) => {
  // Unauthorized Request.
  if (!process.env.TOKEN_SLACK) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized Request.' }),
    };
  }

  // Not Found.
  if (!event.body) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Not Found.' }),
    };
  }

  try {
    // Data
    const payload = queryString.parse(event.body);
    const { channel_id, text } = payload;

    //
    const trimmedMessage = text.trim();
    const isEmpty = trimmedMessage === '';

    if (!isEmpty) {
      // If we have text, let's go to shuffle the elements
      const items = trimmedMessage.split(' ').filter(Boolean);
      const itemsShuffled = shuffle(items);
      return setSlackResponse(itemsShuffled);
    }

    // By default, if we don't have text, get members from channel_id
    const { data } = await getMembers({ channel: channel_id });
    const members = (data && data.members.map((member) => `@${member}`)) || [];

    // Filter members
    const membersToFilter = process.env.MEMBERS_TO_FILTER || [];
    const membersFiltered = members.filter(
      (member) => membersToFilter.indexOf(member) === -1,
    );

    // Shuffle
    const itemsShuffled = shuffle(membersFiltered);
    return setSlackResponse(itemsShuffled);
  }
  catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
