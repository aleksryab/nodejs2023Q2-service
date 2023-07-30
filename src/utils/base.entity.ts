import { v4 as uuidv4 } from 'uuid';

export class BaseEntity {
  readonly id: string;

  constructor() {
    this.id = uuidv4();
  }
}
