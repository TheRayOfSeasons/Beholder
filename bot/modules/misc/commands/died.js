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
    context.send('You died!');
  }
}