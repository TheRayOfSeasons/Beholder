import { Model } from '../core/Model';
import { Characters } from './Characters';

export class CharacterProperty extends Model
{
  /**
   * @param {string} property Table name of the character's property.
   */
  constructor(property)
  {
    super(property);
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  /**
   * Get a property of a character.
   *
   * @param {string} player Discord ID of the player to get a character from.
   * @param {string} code Code of the character to find.
   * @returns {Promise<>}
   */
  async ofCharacter(player, code)
  {
    const character = await Characters.findOne(player, code);
    return this.query()
      .where('char_id', character.id)
      .limit(1)
      .first()
      .catch(console.error);
  }
}
