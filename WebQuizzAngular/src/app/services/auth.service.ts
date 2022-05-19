import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
    providedIn: 'root'
})
export class authService {
    private token!: string;

    constructor(private cookies: CookieService, private router: Router) { }

    // log a user 
    login() {
        this.token = 'test';
    }

    getToken(): string {
        return this.token;
    }

    // autolog to avoid connecting every minutes
    autoLog() {
        if (this.cookies.get('isConnected') && this.cookies.get('mel')) {
            this.login();
   
            if (this.router.url !== '/menu' && this.router.url === '/connection' || this.router.url === '/register') {
                this.router.navigateByUrl('/menu');
                //window.location.reload();
            } else {
            }
        }
    }

}