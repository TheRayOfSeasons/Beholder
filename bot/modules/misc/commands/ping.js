import { Command } from 'discord-utils';

module.exports = class extends Command
{
  constructor()
  {
    super();
    this.keyword = 'ping';
    this.aliases.push('p', 'pong');
  }

  /** @param {import('discord-utils').Context} context*/
  action(context)
  {
    context.chat('The Beholder pongs back.');
  }
}
