import { db } from '../database';

export class Model
{
  constructor(table)
  {
    this.table = table;
    this.query = () => db(table);
  }
}
