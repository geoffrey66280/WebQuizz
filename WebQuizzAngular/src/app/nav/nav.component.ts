import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { loginService } from '../services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  // current cookie
  cookie: any;

  // user mail 
  currentMail!: string;

  constructor(private cookies: CookieService,
              private loginservice: loginService) { }

  ngOnInit(): void {
    // fetch cookies (username and password)
    this.cookie = this.cookies.get('isConnected');
    this.currentMail = this.loginservice.decrypt(this.cookies.get('mel'));
  }

  // disconnect the user on killing cookies
  disconnect() {
    this.cookies.deleteAll();
    window.location.reload();
  }
}
