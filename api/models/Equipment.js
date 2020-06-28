import { CharacterProperty } from './CharacterProperty';

class EquipmentModel extends CharacterProperty
{
  constructor()
  {
    super('equipment');
  }
}

export const Equipment = new EquipmentModel();
