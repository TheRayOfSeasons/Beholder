import { Command } from 'discord-utils';


module.exports = class extends Command
{
  constructor()
  {
    super();
    this.keyword = 'lyra_armored';
    this.aliases.push('la');
  }

  /** @param {import('discord-utils').Context} context*/
  action(context)
  {
    context.chat(`https://i.pinimg.com/564x/90/47/27/904727b229e6d5501260d955324069e7.jpg`);
  }
}
