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

  
  constructor(private loginservice: loginService,
              private cookies: CookieService) { }

  ngOnInit(): void {
    // if user have no cookies id 
    if (!this.cookies.get('id')) {
      // get all users and fetching his id to get points
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
