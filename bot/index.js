import Discord from 'discord.js';
import { commands } from './commands';


const bot = new Discord.Client();
const token = process.env.TOKEN;

bot.login(token);

bot.on('ready', () =>
{
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', message =>
{
  const text = message.content;
  for(const command of commands)
  {
    if(!text.startsWith(command.keyword))
      continue;
    new command.event(message).start();
    break;
  }
});
