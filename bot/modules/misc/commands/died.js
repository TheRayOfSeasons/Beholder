import { Command } from 'discord-utils';


module.exports = class extends Command
{
  constructor()
  {
    super();
    this.keyword = 'died';
    this.aliases.push('d');
  }

  /** @param {import('discord-utils').Context} context*/
  action(context)
  {
    context.chat('https://media.discordapp.net/attachments/490882692792057866/741691922145476668/hqdefault.png');
  }
}