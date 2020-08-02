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
    const queryResult = await Characters
      .joinProperty(player, code, this.table)
      .catch(console.error);

    return queryResult.length === 1
      ? queryResult.shift()
      : queryResult;
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  /**
   * Get one specific data of a player's character.
   * 
   * @param {string} player Discord ID of the player to get a character from.
   * @param {string} code Code of the character to find.
   * @param {string} data Name of the data to get.
   */
  async getData(player, code, data)
  {
    let queryResult = await Characters
      .joinProperty(player, code, this.table)
      .select(data)
      .catch(console.error);

    if(!queryResult)
      return;

    queryResult = queryResult.map(data => Object.values(data).shift());
    return queryResult.length === 1
      ? queryResult.shift()
      : queryResult;
  }
}
