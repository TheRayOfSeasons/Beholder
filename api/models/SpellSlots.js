import { CharacterProperty } from './CharacterProperty';

class SpellSlotsModel extends CharacterProperty
{
  constructor()
  {
    super('spell_slots');
  }
}

export const SpellSlots = new SpellSlotsModel();
