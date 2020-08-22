import { MultipleProperty } from './base/MultipleProperty';

class SpellsModel extends MultipleProperty
{
  constructor()
  {
    super(
			'spells',
			[
				'level',
				'name',
				'description',
				'is_cantrip',
				'spell_id',
			],
		);
  }
}

export const Spells = new SpellsModel();
