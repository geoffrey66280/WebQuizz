import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isSigned: boolean = false;
  cookie: any;

  constructor(private cookies: CookieService) { }

  ngOnInit(): void {
    this.cookie = this.cookies.get('isConnected');
  }

  disconnect() {
    this.cookies.deleteAll();
    window.location.reload();
  }
}
