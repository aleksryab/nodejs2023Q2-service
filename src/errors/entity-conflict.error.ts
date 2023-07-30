export class EntityConflictError extends Error {
  constructor(entity: string) {
    const message = `Such ${entity.toLowerCase()} already exists`;
    super(message);
  }
}
