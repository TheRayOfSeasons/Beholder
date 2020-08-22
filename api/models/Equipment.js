import { MultipleProperty } from './base/MultipleProperty';

/**
 * Equipment Type JSDoc
 * @typedef Equpment
 * 
 * @property {string} name
 * @property {string} description
 * @property {number} item_id
 */

class EquipmentModel extends MultipleProperty
{
  constructor()
  {
    super(
			'equipment',
			[
				'name',
				'description',
				'item_id',
			],
		);
  }
}

export const Equipment = new EquipmentModel();
