import { SingleProperty } from './base/SingleProperty';
import { CharacteristicData } from '.';

class CharacteristicsModel extends SingleProperty
{
  constructor()
  {
    super(
			'characteristics',
			[
				'traits',
				'ideals',
				'bonds',
				'flaws',
				'age',
				'height',
				'weight',
				'eyes',
				'skin',
				'hair',
				'appearance',
				'org_name',
				'org_symbol',
				'org_description',
				'backstory',
				'treasure',
			],
		);
  }
}

export const Characteristics = new CharacteristicsModel();
