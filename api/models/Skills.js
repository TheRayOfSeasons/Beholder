import { SingleProperty } from './base/SingleProperty';
import { SkillData } from '.';

class SkillsModel extends SingleProperty
{
  constructor()
  {
    super(
			'skills',
			[
				'proficiencies',
				'acrobatics',
				'animal_handling',
				'arcana',
				'athletics',
				'deception',
				'history',
				'insight',
				'intimidation',
				'investigation',
				'medicine',
				'nature',
				'perception',
				'performance',
				'persuasion',
				'religion',
				'sleight_of_hand',
				'stealth',
				'survival',
			],
		);
  }
}

export const Skills = new SkillsModel();
