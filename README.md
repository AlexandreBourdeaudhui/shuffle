# Shuffle

A serverless [Slack Slash Commands](https://api.slack.com/slash-commands) to shuffle randomly a list of items, using [Netlify functions](https://docs.netlify.com/functions/overview/).

## Getting Started

### Prerequisites

- Install [Netlify CLI](https://docs.netlify.com/cli/get-started/#installation)

### Netlify

#### Dev

- Make sure your project is link at Netlify
- `netlify dev --live`

#### Build

To deploy the script on Netlify Functions :

- `netlify build`
- `netlify deploy`
- {...} @ TODO

### Slack

To install the Slack Slash Commands :

- Go to https://api.slack.com/apps/
- Click on `Create New App`
- Click on `From an app manifest
- Select a workspace
- Choose `JSON` tab, and copy/paste the data from `./manifest.json`
- {...} @ TODO
