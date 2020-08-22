import { Property } from '../base/Property';
import { Characters } from '../Characters';

export class MultipleProperty extends Property
{
	/**
	 * @param {string} table Table name of the character's property.
	 * @param {string[]} fields Fields of the table to select.
	 */
	constructor(table, fields)
	{
		super(table, fields);
	}

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	/**
	 * Gets a thing of a character by name.
	 * 
	 * @param {string} player Discord ID of the player to get a character from.
	 * @param {string} code Code of the character to find.
	 * @param {string} name Name of the thing to get.
	 * @returns {Promise}
	 */
	getByName(player, code, name)
	{
		return Characters
			.joinProperty(player, code, this.table)
			.select(this.fields)
			.where({ [`${this.table}.name`]: name })
			.first()
			.catch(console.error)
	}
}
