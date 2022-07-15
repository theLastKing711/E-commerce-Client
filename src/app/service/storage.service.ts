import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private itemExist(key: string) {
    return localStorage.getItem(key) !== null
  }

  private getItem(key: string) {
    return localStorage.getItem(key)
  }


  addToStorage(key: string, value: any): void {

    if(! this.itemExist(key)) {

      if(typeof value === "string") {
        localStorage.setItem(key, value)
      }

      if(typeof value !== "string") {
        const jsonValue = JSON.stringify(value)
        localStorage.setItem(key, jsonValue)
      }

    }
  }

  getFromStroage<T>(key: string): T | null {

    let item = this.getItem(key)

    if(item != null) {
      return JSON.parse(item) as T
    }


    return null;

  }

  removeFromStorage(key: string): void {

    if(this.itemExist(key)) {
      localStorage.removeItem(key)
    }
  }

  isAuthenticated() {
    return this.getFromStroage("access_token") !== null;
  }

  constructor() { }


}
