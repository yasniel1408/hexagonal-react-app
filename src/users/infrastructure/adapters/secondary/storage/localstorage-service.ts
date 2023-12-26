import {StoragePort} from "../../../../domain/ports/secondary/storage-port.ts";

export class LocalStorageService<D> implements StoragePort<D>{
  public get(key: string): D | D[] | null {
      const data = localStorage.getItem(key)
      return data?JSON.parse(data) : null
  }

  public set(key: string, value: D | D[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public add(key:string, data:D){
      const currentData = this.get(key) as unknown as D[];
      const newData = currentData? [...currentData, data]:[data]
      this.set(key, newData);
  }
}

