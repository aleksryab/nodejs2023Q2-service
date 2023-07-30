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

  update(id: string, dto: Partial<T>): T | null {
    const item = this.getById(id);
    if (!item) return null;
    Object.assign(item, dto);
    return item;
  }

  delete(id: string) {
    this.store = this.store.filter((user) => user.id !== id);
  }
}
