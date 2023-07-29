interface StorageItem {
  id: string;
}

export class BaseStorage<T extends StorageItem> {
  private store: T[] = [];

  add(item: T) {
    this.store.push(item);
  }

  getAll(): T[] {
    return this.store;
  }

  getById(id: string): T | undefined {
    return this.store.find((user) => user.id === id);
  }

  delete(id: string) {
    this.store = this.store.filter((user) => user.id !== id);
  }
}
