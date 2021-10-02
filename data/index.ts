/**
 * Local Import
 */
import { BLOCKS } from '../constants';
import { IViewBlocks, IGetViewParams } from '../types';

/**
 * Get view modal
 * @doc https://api.slack.com/reference/surfaces/views
 */
export const getView = ({
  channel_id,
  initial_users = [],
}: IGetViewParams): IViewBlocks => ({
  type: 'modal',
  title: {
    type: 'plain_text',
    text: 'Shuffle your items',
  },
  blocks: [
    {
      type: 'section',
      block_id: BLOCKS.BLOCK_ID,
      text: {
        type: 'mrkdwn',
        text: 'Pick users from the list',
      },
      /** @doc https://api.slack.com/reference/block-kit/block-elements#users_multi_select */
      accessory: {
        type: 'multi_users_select',
        action_id: BLOCKS.INPUT_USERS_ID,
        placeholder: {
          type: 'plain_text',
          text: 'Select users',
        },
        initial_users,
      },
    },
  ],
  close: {
    type: 'plain_text',
    text: 'Cancel',
  },
  submit: {
    type: 'plain_text',
    text: 'Go',
  },
  callback_id: BLOCKS.CALLBACK_ID,
  private_metadata: channel_id,
});
