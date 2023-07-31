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
    return this.store.find((item) => item.id === id);
  }

  getOne(where: Partial<T>): T | undefined {
    const keys = Object.keys(where);

    return this.store.find(
      (item) => !keys.some((key) => item[key] !== where[key]),
    );
  }

  getManyByIds(ids: string[]): T[] {
    const idsSet = new Set(ids);
    return this.store.filter((item) => idsSet.has(item.id));
  }

  getMany(where: Partial<T>): T[] {
    const keys = Object.keys(where);

    return this.store.filter(
      (item) => !keys.some((key) => item[key] !== where[key]),
    );
  }

  update(id: string, dto: Partial<T>): T | null {
    const item = this.getById(id);
    if (!item) return null;
    Object.assign(item, dto);
    return item;
  }

  delete(id: string): boolean {
    const index = this.store.findIndex((item) => item.id === id);
    if (index === -1) return false;

    this.store.splice(index, 1);
    return true;
  }
}
