import { Ping } from './events/ping';
import { Roll } from './events/roll';


export const commands = [
    {
        keyword: '.ping',
        event: Ping
    },
    {
        keyword: '.r ',
        event: Roll
    }
];
