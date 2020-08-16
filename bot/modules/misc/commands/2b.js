import { Command } from 'discord-utils';


module.exports = class extends Command
{
  constructor()
  {
    super();
    this.keyword = '2b';
  }

  /** @param {import('discord-utils').Context} context*/
  action(context)
  {
    context.chat(`https://vignette.wikia.nocookie.net/nier/images/3/38/YoRHa_No.2_Type_B.png/revision/latest/scale-to-width-down/234?cb=20170322051325`);
  }
}
