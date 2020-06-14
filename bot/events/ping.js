import { Event } from '../core/event';


export class Ping extends Event
{
  start()
  {
    this.message.channel.send('The Beholder pongs back.');
  }
}
