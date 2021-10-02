/**
 * Package Import
 */
import queryString from 'querystring';

/**
 * Format the message to send on Slack
 */
export const formatMessage = (items: string[]): string =>
  `New list : \n\n${items.map((item) => `* ${item}\n`).join('')}`;

/**
 * Shuffle array with the `Fisher–Yates` algorithm
 */
export const shuffle = (items: string[]): string[] => {
  for (let index = items.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
  }

  return items;
};

/**
 * Parse the request body
 */
export const parseRequestBody = (body: string) => {
  const parsedBody = queryString.parse(body);

  if (typeof parsedBody.payload === 'string') {
    return JSON.parse(parsedBody.payload);
  }

  return parsedBody;
};
