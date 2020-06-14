import { Event } from '../core/event';


export class Roll extends Event
{
  start()
  {
    const validFormat = /^((\d+d\d+|\d+)\s*(\+|\-|\*|\/)\s*)+(\d+d\d+|\d+)$/i;

    /* Regex for getting the operators. */
    const operatorRegex = /\+|\-|\*|\//g;

    const message = this.message;
    const text = message.content
      .toLowerCase()
      .substring(2)
      .trim();

    /* Validate Input. */
    if(!validFormat.test(text))
      return message.channel.send('Invalid format.');

    /* Split the message content by any of the operators. */
    const values = text.split(operatorRegex);

    /* Get an array of the operators (to be used later to construct the operation). */
    const operators = text
      .split('')
      .filter(character => operatorRegex.test(character));

    /* Array of each roll and resolved value of each roll. */
    let rolls = [];
    for(const value of values)
    {
      /* Split the "roll string" by the 'd' (like in '1d20'). */
      const [dices, sides] = value.split('d');

      /* Perform a roll and get the rolls and the roll value. */
      const rollData = this.roll(dices, sides)
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
    const breakdown = rolls.reduce((resultString, {rolls, rollValue}, index) =>
    {
      const rawRoll = values[index];
      const rollBreakdown = rolls ? `\`[${rolls.join(', ')}]\`` : '';
      resultString += `${rawRoll.trim()} ${rollBreakdown.trim()} ${(_operators.shift() || '')}`;
      return resultString;
    }, '');

    /* Evaluate all the rolls (from the built operation string). */
    let total = eval(operation);
    total = Math.round(total);

    message.channel.send(`Breakdown: ${breakdown}\nTotal: ${total}`);
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
        rolls,
        rollValue,
      }
    );
  }
}
