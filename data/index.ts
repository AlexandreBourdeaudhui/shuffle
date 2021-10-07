/**
 * Local Import
 */
import { ACTIONS, BLOCKS, OPTIONS_VALUES } from '../constants';
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
    text: 'Shuffle — :game_die:',
    emoji: true,
  },
  blocks: [
    {
      type: 'section',
      block_id: BLOCKS.USERS,
      text: {
        type: 'mrkdwn',
        text: 'Pick users from the list',
      },
      /** @doc https://api.slack.com/reference/block-kit/block-elements#users_multi_select */
      accessory: {
        type: 'multi_users_select',
        action_id: ACTIONS.USERS_ID,
        placeholder: {
          type: 'plain_text',
          text: 'Select users',
        },
        initial_users,
      },
    },
    {
      type: 'section',
      block_id: BLOCKS.OPTIONS,
      text: {
        type: 'mrkdwn',
        text: '*Options*',
      },
      accessory: {
        type: 'checkboxes',
        action_id: ACTIONS.OPTIONS_ID,
        options: [
          {
            text: {
              type: 'mrkdwn',
              text: '*Unique*',
            },
            description: {
              type: 'mrkdwn',
              text: 'Choisir une personne au hasard parmis tous les membres de la liste',
            },
            value: OPTIONS_VALUES.UNIQUE_CHECKED,
          },
        ],
      },
    },
  ],
  close: {
    type: 'plain_text',
    text: 'Cancel',
  },
  submit: {
    type: 'plain_text',
    text: 'Submit',
  },
  callback_id: BLOCKS.CALLBACK_ID,
  private_metadata: channel_id,
});
