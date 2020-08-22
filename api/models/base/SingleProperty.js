import { Property } from '../base/Property';
import { Characters } from '../Characters';

export class SingleProperty extends Property
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
	 * Get a property of a character.
	 *
	 * @param {string} player Discord ID of the player to get a character from.
	 * @param {string} code Code of the character to find.
	 * @returns {Promise}
	 */
	ofCharacter(player, code)
	{
		return super.ofCharacter(player, code)
			.then(result => result.shift())
			.catch(console.error);
	}

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

	/**
	 * Get one specific data of a player's character.
	 * 
	 * @param {string} player Discord ID of the player to get a character from.
	 * @param {string} code Code of the character to find.
	 * @param {string} data Name of the data to get.
	 * @returns {Promise}
	 */
	async getData(player, code, data)
	{
    if(this.fields.every(field => field.split('.').pop() !== data))
			throw Error('Invalid name of data given.');
			
		let queryResult = await Characters
			.joinProperty(player, code, this.table)
			.select(data)
			.catch(console.error);

		if(!queryResult)
			return;
			
		queryResult = queryResult.map(data => Object.values(data).shift());
		return queryResult.length === 1
			? queryResult.shift()
			: queryResult;
	}
}
