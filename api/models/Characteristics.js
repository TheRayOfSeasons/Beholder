import { CharacterProperty } from './CharacterProperty';

class CharacteristicsModel extends CharacterProperty
{
  constructor()
  {
    super('characteristics');
  }
}

export const Characteristics = new CharacteristicsModel();
