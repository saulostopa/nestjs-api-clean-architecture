export interface UnitOfWork {
  run<T>(work: (trx: unknown) => Promise<T>): Promise<T>;
}

export const UNIT_OF_WORK = Symbol('UNIT_OF_WORK');