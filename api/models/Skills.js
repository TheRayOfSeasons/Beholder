import { CharacterProperty } from './CharacterProperty';

class SkillsModel extends CharacterProperty
{
  constructor()
  {
    super('skills');
  }
}

export const Skills = new SkillsModel();
