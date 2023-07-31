export class EntityNotFoundError extends Error {
  constructor(entity: string) {
    const message = `${entity} not found`;
    super(message);
  }
}
