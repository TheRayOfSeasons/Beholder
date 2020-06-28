import { Command } from 'discord-utils';


module.exports = class extends Command
{
  constructor()
  {
    super();
    this.keyword = 'roll';
    this.aliases.push('r');
  }

  /** @param {import('discord-utils').Context} context*/
  action(context)
  {
    const rollFormatRegex = (
      /((\d+d\d+|\d+)\s*(\+|\-|\*|\/)\s*)*(\d+d\d+|\d+)+(\s+(adv|dis))*\s*/i);
    const validFormat = (
      /^((\d+d\d+|\d+)\s*(\+|\-|\*|\/)\s*)*(\d+d\d+|\d+)+(\s+(adv|dis))*(\s*|\s+.*)$/i);

    const hasText = /[^-\s]/g;

    /* Regex for getting the operators. */
    const operatorRegex = /\+|\-|\*|\//g;
    const operationModifierRegex = /\s+adv\s*|\s+dis\s*/g;
    const advantageRegex = /\s+adv\s*/g;
    const disadvantageRegex = /\s+dis\s*/g;

    const rawText = context.raw_parameters.trim();
    const text = context.raw_parameters
      .toLowerCase()
      .trim();

    /* Validate Input. */
    if(!validFormat.test(text))
      return context.chat('Invalid format.');

    let label = rawText.replace(rollFormatRegex, '');
    const labelRegexValue = label
      .toLowerCase()
      .split('')
      .map(letter => {
        const escapables = [
          '.', '^', '$', '*', '+', '?', '(', ')', '[', '{', '\\', '|'
        ];
        return escapables.indexOf(letter) !== -1 ? `\\${letter}` : letter
      })
      .join('');
    const labelRegex = new RegExp(`${labelRegexValue}`);

    /* Split the message content by any of the operators. */
    const values = text
      .replace(operationModifierRegex, '')
      .replace(labelRegex, '')
      .split(operatorRegex);

    /* Get an array of the operators (to be used later to construct the operation). */
    const operators = text
      .replace(operationModifierRegex, '')
      .replace(labelRegex, '')
      .split('')
      .filter(character => operatorRegex.test(character));

    let adv = false;
    let dis = false;
    if(advantageRegex.test(text))
      adv = true;
    else if(disadvantageRegex.test(text))
      dis = true;

    /* Array of each roll and resolved value of each roll. */
    let rolls = [];
    for(const value of values)
    {
      /* Split the "roll string" by the 'd' (like in '1d20'). */
      const [dices, sides] = value.split('d');

      /* Perform a roll and get the rolls and the roll value. */
      let rollData;
      if(adv)
        rollData = this.advantageRoll(dices, sides);
      else if(dis)
        rollData = this.disadvantageRoll(dices, sides);
      else
        rollData = this.roll(dices, sides);
      rolls.push(rollData);
    }

    /* Create copy of `operators` to build the operation string. */
    let _operators = [ ...operators ];

    /* Build the operation string. */
    const operation = rolls.reduce((operation, roll) =>
      operation + roll.rollValue + (_operators.shift() || ''), '');

    /* Create new copy of the operators array (for building the breakdown). */
    _operators = [ ...operators ]
      .map(operator =>
        operator === '*' ?
          '×' :
        operator === '/' ?
          '÷' : operator.trim()
      );

    /* Build the breakdown of all the rolls. */
    const breakdown = rolls.reduce((resultString, {disposed, rolls, rollValue}, index) =>
    {
      const rawRoll = values[index];
      const rollsText = rolls ? `[${rolls.join(', ')}]` : '';
      const disposedRollsText = disposed ? ` ~~[${disposed.rolls.join(', ')}]~~` : '';
      const rollBreakdown = rolls ? `${rollsText}${disposedRollsText}` : '';
      resultString += `${rawRoll.trim()} ${rollBreakdown.trim()} ${(_operators.shift() || '')}`;
      return resultString;
    }, '');

    /* Evaluate all the rolls (from the built operation string). */
    let total = eval(operation);
    total = Math.round(total);

    label = hasText.test(label) ? label : 'Result';
    context.chat(`Breakdown: ${breakdown}\n**${label}**: **\`${total}\`**`);
  }

  roll(dices, sides)
  {
    if(!sides)
      return { rollValue: dices };

    const rolls = [];
    for(let i = 0; i < dices; i++)
    {
      const roll = Math.round(Math.random() * (sides - 1) + 1);
      rolls.push(roll);
    }

    const rollValue = rolls.reduce((sum, roll) => sum + roll, 0);
    return (
      {
        disposed: undefined,
        rolls,
        rollValue,
      }
    );
  }

  advantageRoll(dices, sides)
  {
    if(!sides)
      return { rollValue: dices };

    const firstRoll = this.roll(dices, sides);
    const secondRoll = this.roll(dices, sides);
    const [takenRoll, disposedRoll] =
      firstRoll.rollValue > secondRoll.rollValue
        ? [firstRoll, secondRoll]
        : [secondRoll, firstRoll];
    return (
      {
        disposed: disposedRoll,
        rolls: takenRoll.rolls,
        rollValue: takenRoll.rollValue,
      }
    )
  }

  disadvantageRoll(dices, sides)
  {
    if(!sides)
      return { rollValue: dices };

    const firstRoll = this.roll(dices, sides);
    const secondRoll = this.roll(dices, sides);
    const [takenRoll, disposedRoll] =
      firstRoll.rollValue < secondRoll.rollValue
        ? [firstRoll, secondRoll]
        : [secondRoll, firstRoll];
    return (
      {
        disposed: disposedRoll,
        rolls: takenRoll.rolls,
        rollValue: takenRoll.rollValue,
      }
    )
  }
}
