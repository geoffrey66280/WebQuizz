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

    // simply encrypt a value with CryptoJS
    encrypt(value: string): string {
        return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
    }

    // Decrypt a value encrypted
    decrypt(textToDecrypt: string) {
        return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    }

    // add a user with post 
    addUser(name: string, pass: string) {
        const myheader = new HttpHeaders().append('Content-Type', 'application/json; charset=utf-8');
        const param = new HttpParams().append('email', name).append('password', pass);
        this.http.post('http://localhost:8000/users/add/', JSON.stringify(param), {
            headers: myheader
        }).subscribe();
    }

    // get All users
    getUsers() {
        let users: EventEmitter<Logs[]> = new EventEmitter<Logs[]>();

        this.http.get<Logs[]>('http://localhost:8000/getUsers').subscribe(
            (usersList) => {
                users.emit(usersList);
            }, (error) => {
                console.log(error);
            });

        return users;

    }

    // get points of a user by his id
    getPointsById(id: number) {
        let users: EventEmitter<Logs[]> = new EventEmitter<Logs[]>();

        this.http.get<Logs[]>('http://localhost:8000/getPoints/' + id).subscribe(
            (usersList) => {
                users.emit(usersList);
            }, (error) => {
                console.log(error);
            });

        return users;

    }

    // push points from the quizz corresponding to a user
    pushPoint(id: number, points: number) {
        let users: EventEmitter<Logs[]> = new EventEmitter<Logs[]>();

        this.http.get<Logs[]>('http://localhost:8000/pushPoint/' + id + '/' + points).subscribe(
            (usersList) => {
                users.emit(usersList);
            }, (error) => {
                console.log(error);
            });

        return users;

    }
}