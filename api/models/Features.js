import { CharacterProperty } from './CharacterProperty';

class FeaturesModel extends CharacterProperty
{
  constructor()
  {
    super('features');
  }
}

export const Features = new FeaturesModel();
