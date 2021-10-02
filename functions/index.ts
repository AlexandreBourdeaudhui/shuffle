/**
 * Package Import
 */
import { Handler } from '@netlify/functions';

/**
 * Local Import
 */
import { getView } from '../data';
import { parseRequestBody } from '../utils';
import { openViewModal, getMembers } from '../utils/slack';

/**
 * Serverless function handler
 * It is launched when the `/shuffle` command is called on Slack
 *
 * @doc https://api.slack.com/surfaces/modals/using
 * @doc https://api.slack.com/interactivity/slash-commands#getting_started
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
    const { channel_id, trigger_id } = payload;

    // By default, if we don't have text, get members from channel_id
    const { data } = await getMembers({ channel: channel_id });
    const members = (data && data.members.map((member) => member)) || [];

    // Filter members (like the Bot in private channel)
    const membersToFilter = process.env.MEMBERS_TO_FILTER || [];
    const membersFiltered = members.filter(
      (member) => membersToFilter.indexOf(member) === -1,
    );

    // Open Slack Modal
    await openViewModal({
      trigger_id,
      view: getView({ channel_id, initial_users: membersFiltered }),
    });

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
