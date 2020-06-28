import { CharacterProperty } from './CharacterProperty';

class SpellsModel extends CharacterProperty
{
  constructor()
  {
    super('spells');
  }
}

export const Spells = new SpellsModel();
