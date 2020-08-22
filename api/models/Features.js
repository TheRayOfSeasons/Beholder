import { MultipleProperty } from './base/MultipleProperty';

class FeaturesModel extends MultipleProperty
{
  constructor()
  {
    super(
			'features',
			[
				'name',
				'description',
				'feat_id',
			],
		);
  }
}

export const Features = new FeaturesModel();
