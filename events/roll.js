import { Event } from '../core/event';


export class Roll extends Event
{
  start()
  {
    const message = this.message;
    const text = message.content;
    const [dices, sides] = text.toLowerCase().substring(2).split('d');
    const { rolls, rollValue } = this.roll(dices, sides);
    const msg = `[${rolls}]\nRoll: ${rollValue}`;
    message.channel.send(msg);
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
    return { rolls, rollValue };
  }
}
