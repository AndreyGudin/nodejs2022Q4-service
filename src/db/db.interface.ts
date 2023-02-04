export interface InMemoryDatabase<T, U, O> {
  findAll(): T[];
  findOne(id: string): T;
  create(createDTO: U): T;
  delete(id: string): T | undefined;
  update(id: string, updateDTO: O): T | string;
}
