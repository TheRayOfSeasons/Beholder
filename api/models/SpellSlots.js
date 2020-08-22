import { SingleProperty } from './base/SingleProperty';
import { SpellSlotData } from '.';

class SpellSlotsModel extends SingleProperty
{
  constructor()
  {
    super(
			'spell_slots',
			[
				'lvl_one',
				'lvl_one_max',
				'lvl_two',
				'lvl_two_max',
				'lvl_three',
				'lvl_three_max',
				'lvl_four',
				'lvl_four_max',
				'lvl_five',
				'lvl_five_max',
				'lvl_six',
				'lvl_six_max',
				'lvl_seven',
				'lvl_seven_max',
				'lvl_eight',
				'lvl_eight_max',
				'lvl_nine',
				'lvl_nine_max',
			],
		);
  }
}

export const SpellSlots = new SpellSlotsModel();
