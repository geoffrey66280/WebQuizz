import { Injectable, EventEmitter } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Logs } from '../models/Logs.models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';



@Injectable({
    providedIn: 'root',
})
export class loginService {
    secretKey = 'FraiseEtCitroncafé';
    constructor(private http: HttpClient) { }

    encrypt(value: string): string {
            return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
        }
    

    decrypt(textToDecrypt: string) {
        return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    }
    addUser(name: string, pass: string) {
        const myheader = new HttpHeaders().append('Content-Type', 'application/json; charset=utf-8');
        const param = new HttpParams().append('email', name).append('password', pass);
        this.http.post('http://localhost:8000/users/add/', JSON.stringify(param), {
            headers: myheader
    }).subscribe();
    }

    getUsers() {
        let users : EventEmitter<Logs[]> = new EventEmitter<Logs[]>();
        
        this.http.get<Logs[]>('http://localhost:8000/getUsers').subscribe(
          (usersList) => {
            users.emit(usersList);
        }, (error) => {
          console.log(error);
        });
        
        return users;
    
      }
}