import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { authService } from '../services/auth.service';
import { loginService } from '../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  
  constructor(private auth: authService, private loginservice: loginService, private cookies: CookieService) { }

  ngOnInit(): void {
    if (!this.cookies.get('id')) {
      this.loginservice.getUsers().subscribe((users) =>{
        for (let i = 0; i < users.length ; i++) {
          if (this.loginservice.decrypt(users[i].email) === this.loginservice.decrypt(this.cookies.get('mel'))) {
            this.cookies.set('id', users[i].id.toString());
          }
        }
      })
    }
    
    
  }

}
