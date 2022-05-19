import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class calculsService {

    constructor() { }

    // random func
    getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
      }

}