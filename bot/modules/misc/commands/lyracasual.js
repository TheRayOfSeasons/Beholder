import { Command } from 'discord-utils';


module.exports = class extends Command
{
  constructor()
  {
    super();
    this.keyword = 'lyra_casual';
    this.aliases.push('lc');
  }

  /** @param {import('discord-utils').Context} context*/
  action(context)
  {
    context.chat(`https://i.pinimg.com/564x/0a/ea/67/0aea67d55a5665d1fbb7a1990432bcf8.jpg`);
  }
}
