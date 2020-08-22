import { Model } from '../../core/Model';
import { Characters } from '../Characters';

export class Property extends Model
{
  /**
   * @param {string} table Table name of the character's property.
   * @param {string[]} fields Fields of the table to select.
   */
  constructor(table, fields)
  {
    super(table);

    this.fields = fields.map(field => `${table}.${field}`);
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  /**
   * Get a property of a character.
   *
   * @param {string} player Discord ID of the player to get a character from.
   * @param {string} code Code of the character to find.
   * @returns {Promise}
   */
  ofCharacter(player, code)
  {
    return Characters
      .joinProperty(player, code, this.table)
      .select(this.fields)
      .catch(console.error);
  }
}
