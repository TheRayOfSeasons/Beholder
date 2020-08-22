import { Model } from '../core/Model';
import { CharacterData } from '.';

/**
 * Character Type JSDoc
 * @typedef Character
 * 
 * @property {number} id
 * @property {string} player_id
 * @property {string} name
 * @property {string} code
 * @property {number} exp
 * @property {string} class
 * @property {number} level
 * @property {number} hp
 * @property {number} max_hp
 * @property {number} temp_hp
 * @property {number} str
 * @property {number} dex
 * @property {number} con
 * @property {number} int
 * @property {number} wis
 * @property {number} cha
 * @property {number} inspiration
 * @property {number} prof_bonus
 * @property {string} throws_profs
 * @property {string} other_prof
 * @property {number} armor_class
 * @property {number} speed
 * @property {string} hit_dice
 * @property {number} hit_dice_total
 * @property {number} death_save_success
 * @property {number} death_save_fail
 * @property {string} special_points
 * @property {number} copper
 * @property {number} silver
 * @property {number} electrum
 * @property {number} gold
 * @property {number} platinum
 * @property {string} spellcasting_class
 * @property {string} spellcasting_ability
 * @property {number} spell_dc
 * @property {number} spell_atk_bonus
 * @property {string} background
 * @property {string} race
 * @property {string} alignment
 * @property {string} languages
 */

/**
 * JSDoc BasicCharacter Type
 * @typedef BasicCharacter
 * 
 * @property {string} name
 * @property {string} code
 * @property {string} class
 * @property {number} level
 * @property {string} race
 */

class CharactersModel extends Model
{
  constructor()
  {
    super('characters');
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  /**
   * Returns a query builder instance given a Discord ID and a character code.
   * 
   * @param {string} user Discord ID of the player to get characters from.
   * @param {string} code Code of the character to find.
   */
  _find(player, code)
  {
    return this.query()
      .where(
      {
        'player_id': player,
        'code': code,
      });
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  /**
   * Gets the character/s of a player given the player's
   * Discord ID and a character code.
   * Only includes the character name, code, class, level, and race
   * of each character found.
   * 
   * @param {string} player Discord ID of the player to get a character from.
   * @param {string} code Code of characters to find.
   * @returns {Promise<BasicCharacter[]>}
   */
  find(player, code)
  {
    return this._find(player, code)
      .select([ 'name', 'code', 'class', 'level', 'race' ])
      .catch(console.error);
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  /**
   * Gets the character of a player given a player's
   * Discord ID and the character's code.
   * This only gets the first character found with the given code.
   * 
   * @param {string} player Discord ID of the player to get a character from.
   * @param {string} code Code of the character to find.
   * @returns {Promise<Character>}
   */
  findOne(player, code)
  {
    return this._find(player, code)
      .limit(1)
      .first()
      .catch(console.error);
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  
  /**
   * Get one specific data of a player's character.
   * 
   * @param {string} player Discord ID of the player to get a character from.
   * @param {string} code Code of the character to find.
   * @param {string} data Name of the data to get.
   * @returns {Promise}
   */
  async getData(player, code, data)
  {
    if(!Object.values(CharacterData).includes(data))
      throw Error('Invalid name of character data given.');
    
    let queryResult = await this
      ._find(player, code)
      .select(data)
      .catch(console.error);

    if(!queryResult)
      return;

    queryResult = queryResult.map(data => Object.values(data).shift());
    return queryResult.length === 1
      ? queryResult.shift()
      : queryResult;
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  /**
   * Retturns a query builder with a join of a table of a property of a character.
   * 
   * @param {string} player Discord ID of the player to get a character from.
   * @param {string} code Code of the character to find.
   * @param {string} property Name of the table to join.
   * @returns {Promise}
   */
  joinProperty(player, code, property)
  {
    return this
      ._find(player, code)
      .leftJoin(property, 'char_id', '=', 'characters.id');
  }
}

export const Characters = new CharactersModel();
