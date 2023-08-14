export class EntityUnprocessableError extends Error {
  constructor(entity: string) {
    const message = `${entity} does not exist`;
    super(message);
  }
}
