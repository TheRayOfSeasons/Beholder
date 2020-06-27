import { Model } from '../core/Model';

/**
 * JSDoc Character Type
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
   * Returns a query builder instance given
   * a Discord ID and a character name or code.
   * 
   * @param {string} user Discord ID of the player to get characters from.
   * @param {string} nameOrCode Name or code of the character to find.
   */
  _find(player, nameOrCode)
  {
    return this.query()
      .where(`${this.table}.player_id`, player)
      .andWhere(query =>
      {
        query
          .where(`${this.table}.name`, 'like', `%${nameOrCode}%`)
          .orWhere(`${this.table}.code`, 'like', `%${nameOrCode}%`)
      });
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  /**
   * Gets the character/s of a player given the player's
   * Discord ID and a character name or code.
   * Only includes the character name, code, class, level, and race
   * of each character found.
   * 
   * @param {string} player Discord ID of the player to get a character from.
   * @param {string} nameOrCode Name or code of characters to find.
   * @returns {Promise<BasicCharacter[]>}
   */
  find(player, nameOrCode)
  {
    return this._find(player, nameOrCode)
      .select([ 'name', 'code', 'class', 'level', 'race' ])
      .catch(console.error);
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  /**
   * Gets the character of a player given a player's
   * Discord ID and the character's name or code.
   * This only gets the first character found with the given name or code.
   * 
   * @param {string} player Discord ID of the player to get a character from.
   * @param {string} nameOrCode Name or code of the character to find.
   * @returns {Promise<Character>}
   */
  findOne(player, nameOrCode)
  {
    return this._find(player, nameOrCode)
      .limit(1)
      .first()
      .catch(console.error);
  }
}

export const Characters = new CharactersModel();
