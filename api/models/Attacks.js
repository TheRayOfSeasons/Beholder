import { MultipleProperty } from './base/MultipleProperty';

/**
 * Attack Type JSDoc 
 * @typedef Attack
 * 
 * @property {string} name
 * @property {number} atk_bonus
 * @property {number} damage
 * @property {string} damage_type
 */

class AttacksModel extends MultipleProperty
{
  constructor()
  {
    super(
			'attacks',
			[
				'name',
				'atk_bonus',
				'damage',
				'damage_type',
			],
		);
  }
}

export const Attacks = new AttacksModel();
