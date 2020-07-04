import { Command } from 'discord-utils';
import { Characters } from '../../../../api/models'; // TODO: Add link-module-alias

module.exports = class extends Command
{
  constructor()
  {
    super();
    this.keyword = 'character';
    this.aliases.push('c');
  }

  /** @param {import('discord-utils').Context} context */
  async action(context)
  {
    const player = context.message.author.id;

    /* Check if a character name or code was given. */
    if(!context.parameters)
      return context.send("❌  Please indicate the character's name or code.");
    
    /* The given character name or code. */
    const characterQuery = context.parameters.shift();
    this.charactersFound = await Characters.find(player, characterQuery);

    /* If the found characters is just 1, send the character info.
      If not, send a list of characters to choose from. */
    if(this.charactersFound.length === 1)
    {
      /* Get the first found character. */
      const character = this.charactersFound.shift();

      // TODO: Decide what info should be shown.
      const { name, code, level, class: characterClass } = character;
      const characterInfo = (
        `**${characterClass}** (Level ${level})`
        + '\n\nput other info here d4wg'
      );
      const embed = context
        .embed(name, characterInfo)
        .setFooter(`Code: ${code}`);

      return context.chat(embed);
    }

    // TODO: Handle multiple characters found.
    context.send('whoops too many characters found, the devs should work on this smh.')
  }
}
