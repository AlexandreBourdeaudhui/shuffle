# Shuffle

A serverless [Slack Slash Commands](https://api.slack.com/slash-commands) to shuffle randomly a list of items, using [Netlify functions](https://docs.netlify.com/functions/overview/).

## Getting Started

### ⚙️ Prerequisites

- Install [Netlify CLI](https://docs.netlify.com/cli/get-started/#installation)

### Netlify

#### 🔬 Dev

- Make sure your project is link at Netlify
- `$ netlify init` and follow instructions
- `$ netlify dev --live`
- Follow the Slack steps below
- Create an `.env` file and fill it with the properties of the `.env.example` file.

#### ⚡️ Build

To deploy the script on Netlify Functions :

- `$ netlify init` and follow instructions
- `$ netlify build`
- `$ netlify deploy`

### Slack

To install the Slack Slash Commands :

- Go to https://api.slack.com/apps/
- Click on `Create New App`
- Click on `From an app manifest, and select your workspace
- Choose `JSON` tab, and copy/paste the data from `./manifest.json`
- Get URL from Netlify (dev/prod) and replace URL in `Slash Commands` and `Interactivity & Shortcuts`
- Click on `OAuth & Permissions`, view and copy the token (`xoxb-XXXX`) to a temporary place. You'll need it later.
