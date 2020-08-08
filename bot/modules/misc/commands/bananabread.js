import { Command } from 'discord-utils';
import { Message } from 'discord.js';


module.exports = class extends Command
{
  constructor()
  {
    super();
    this.keyword = 'banana-bread';
    this.aliases.push('bb');
  }

  /** @param {import('discord-utils').Context} context*/
  action(context)
  {
    context.chat(':banana::bread:');
    context.chat(`https://4.bp.blogspot.com/-Vrs8Do2sALI/WIzfZZwsdGI/AAAAAAAAKSw/xtYcAxKyYDAA5bHNqfnSlPS7b6qnJBDUwCLcB/s1600/flour-less%2Bbread.jpg`);
  }
}
