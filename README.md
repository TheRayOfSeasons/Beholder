# Beholder
An open-source discord bot for Dungeons and Dragons.

## Invite Link

Click [here](https://discord.com/oauth2/authorize?client_id=719123301951209512&permissions=2097937649&scope=bot) to invite the bot into your discord server.

Have fun, adventurers!

## Setup Guidelines

For those who are interested in deploying the bot in their own devices or servers, here are the steps set it up:

1. Install npm>=12.6.0.
2. Clone the project into desired directory.
3. Run `npm -g -i pnpm`.
4. `cd` into the project directory, then run `pnpm install`.
5. Have an account in the discord developer portal.
6. Acquire a bot token by creating an application in your developer portal.
7. In the project directory, create a `.env` file containing the following:
```bash
TOKEN = <your_bot_token>
```

## Running the bot

1. For development environments, run `npm run dev`.
2. For server environments, run `npm start`.
