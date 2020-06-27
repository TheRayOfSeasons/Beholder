import { CharacterProperty } from './CharacterProperty';

class AttacksModel extends CharacterProperty
{
  constructor()
  {
    super('attacks');
  }
}

export const Attacks = new AttacksModel();
