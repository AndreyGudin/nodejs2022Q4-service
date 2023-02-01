export interface InMemoryDatabase<T, U, O> {
  findAll(): T[];
  findOne(id: string): T;
  create(createDTO: U): T;
  delete(id: string): T;
  update(id: string, updateDTO: O): T;
}
