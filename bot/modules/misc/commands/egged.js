import { Command } from 'discord-utils';


module.exports = class extends Command
{
  constructor()
  {
    super();
    this.keyword = 'egged';
  }

  /** @param {import('discord-utils').Context} context*/
  action(context)
  {
    context.chat(`https://thumbs.dreamstime.com/b/yolk-dropping-cracked-raw-egg-divided-dripping-falling-black-background-falling-frozen-air-89015058.jpg`);
  }
}
