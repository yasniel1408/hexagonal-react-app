export interface StoragePort<D> {
    get(key: string): D | D[] | null;

    set(key: string, value: D | D[]): void;

    remove(key: string): void

    add(key:string, data:D):void
}
