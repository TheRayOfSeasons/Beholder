import { Event } from '../core/event';


export class Roll extends Event
{
  start()
  {
    const validFormat = (
      /^((\d+d\d+|\d+)\s*(\+|\-|\*|\/)\s*)*(\d+d\d+|\d+)+(\s+(adv|dis))*\s*$/i);

    /* Regex for getting the operators. */
    const operatorRegex = /\+|\-|\*|\//g;
    const operationModifierRegex = /\s+adv|\s+dis/g;

    const message = this.message;
    const text = message.content
      .toLowerCase()
      .substring(2)
      .trim();

    /* Validate Input. */
    if(!validFormat.test(text))
      return message.channel.send('Invalid format.');

    /* Split the message content by any of the operators. */
    const values = text.replace(operationModifierRegex, '').split(operatorRegex);

    /* Get an array of the operators
     * (to be used later to construct the operation). */
    const operators = text
      .split('')
      .filter(character => operatorRegex.test(character));

    const operatorModifiers = operationModifierRegex.exec(text);
    const [modifier, ...modiferExtras] = (
      operatorModifiers ? Object.entries(operatorModifiers) : Array(2));

    /* Array of each roll and resolved value of each roll. */
    let rolls = [];
    for(const value of values)
    {
      /* Split the "roll string" by the 'd' (like in '1d20'). */
      const [dices, sides] = value.split('d');

      /* Perform a roll and get the rolls and the roll value. */
      const rollData = this.handleRoll(dices, sides, modifier);
      rolls.push(rollData);
    }

    /* Create copy of `operators` to build the operation string. */
    let _operators = [ ...operators ];

    /* Build the operation string. */
    const operation = rolls.reduce((operation, roll) =>
      operation + roll.rollValue + (_operators.shift() || ''), '');
    // FIXME: operation is undefined
    console.log(operation);
    /* Create new copy of the operators array (for building the breakdown). */
    _operators = [ ...operators ]
      .map(operator =>
        operator === '*' ?
          '×' :
        operator === '/' ?
          '÷' : operator.trim()
      );

    /* Build the breakdown of all the rolls. */
    const breakdown = rolls.reduce((resultString, {resolved, dropped}, index) =>
    {
      const rawRoll = values[index];
      const {rolls: resolvedRolls, rollValue: resolvedValue} = resolved;
      const {rolls: droppedRolls, rollValue: droppedValue} = dropped;
      const resolvedRollBreakdown = (
        resolvedRolls ? `\`Resolved: [${resolvedRolls.join(', ')}]\`` : ''
      );
      const droppedRollBreakdown = (
        droppedRolls ? `\`Dropped: [${droppedRolls.join(', ')}]\`` : ''
      );
      const operatorString = _operators.shift();
      resultString += [
        `${rawRoll.trim()}\n`,
        `${resolvedRollBreakdown.trim()}\n`,
        `${droppedRollBreakdown.trim()}\n`,
        `${(operatorString || '')}`
      ].join('');
      return resultString;
    }, '');

    /* Evaluate all the rolls (from the built operation string). */
    let total = eval(operation);
    total = Math.round(total);

    message.channel.send(`Breakdown: ${breakdown}\nTotal: ${total}`);
  }

  getSpecialRolls()
  {
    const vantage = (favorHighest=true) =>
    {
      const resolveRollPair = (first, second, reversed=false) =>
      {
        return reversed ?
          favorHighest ? [second, first] : [first, second]
          : favorHighest ? [first, second] : [second, first]
      }
      return (dices, sides) =>
      {
        const [firstRoll, secondRoll] = (
          Array(2).fill().map(() => roll(dices, sides))
        );
        const [resolved, dropped] = resolveRollPair(firstRoll, secondRoll);
        return (
          {
            resolved,
            dropped
          }
        );
      }
    }

    return [
      {
        keyword: 'adv',
        action: vantage(true)
      },
      {
        keyword: 'dis',
        action: vantage(false)
      }
    ]
  }

  handleRoll(dices, sides, modifier=undefined)
  {
    if(!sides)
      return { rollValue: dices };

    if(!modifier)
      return this.classicRoll(dices, sides);

    /* Remove empty spaces from string to conform with keyword. */
    modifier = modifier.replace(/\s+/g, '');

    for(const {keyword, action} of this.getSpecialRolls())
    {
      if(modifier === keyword)
        return action(dices, sides);
    }

    return this.classicRoll(dices, sides);
  }

  classicRoll(dices, sides)
  {
    return {
      resolved: this.roll(dices, sides),
      dropped: {
        rolls: undefined,
        rollValue: undefined
      }
    };
  }

  roll(dices, sides)
  {
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
