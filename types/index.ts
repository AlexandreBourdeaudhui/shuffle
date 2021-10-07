/**
 * Local Import
 */
import { ACTIONS, BLOCKS, OPTIONS_VALUES } from '../constants';

/**
 * Slack Types
 */
export interface MessageParams {
  channel: string;
  text: string;
}

export interface MembersParams {
  channel: string;
}

export interface OpenViewParams {
  trigger_id: string;
  view: IViewBlocks;
}

export type SlackRequest = MessageParams | MembersParams | OpenViewParams;

export interface IViewBlocks {
  type: string;
  title: { type: string; text: string; emoji: boolean };
  blocks: {
    type: string;
    block_id: BLOCKS;
    text: { type: string; text: string };
    accessory: {
      type: string;
      action_id: ACTIONS;
      placeholder?: { type: string; text: string };
      initial_users?: string[];
      options?: {
        text: { type: string; text: string };
        description: { type: string; text: string };
        value: OPTIONS_VALUES;
      }[];
    };
  }[];
  close: { type: string; text: string };
  submit: { type: string; text: string };
  callback_id: BLOCKS;
  private_metadata: string;
}

export interface IGetViewParams {
  channel_id: string;
  initial_users: string[];
}
