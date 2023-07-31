export class IdStorage<T> {
  private store: T[] = [];

  add(id: T) {
    this.store.push(id);
  }

  getAll() {
    return this.store;
  }

  has(id: T) {
    return this.store.includes(id);
  }

  delete(id: T) {
    const index = this.store.findIndex((item) => item === id);
    if (index === -1) return false;
    this.store.splice(index, 1);
    return true;
  }
}
