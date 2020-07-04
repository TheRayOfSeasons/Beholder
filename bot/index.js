import Discord from 'discord.js';
import { Context } from 'discord-utils';
import config from './config/config.json';

const bot = new Discord.Client();
const token = process.env.TOKEN;
const context = new Context(bot);
context.setModulesPath(`${__dirname}/modules`);

bot.login(token);

bot.on('ready', () =>
{
  console.log(`Logged in as ${bot.user.tag}!`);
  context.setConfig(config);
});

bot.on('message', message =>
{
  if(message.author.bot)
    return;

  context.from(message);
});
