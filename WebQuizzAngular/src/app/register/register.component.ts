import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { retry } from 'rxjs';
import { Logs } from '../models/Logs.models';
import { authService } from '../services/auth.service';
import { loginService } from '../services/login.service';
import { questionService } from '../services/question.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // input of the user password
  passForm = new FormControl('', [Validators.email]);

  // input of the username
  idForm = new FormControl('');

  // string that signals that form values are incorrect
  text = 'Veuillez remplir le formulaire avec un identifiant et un mot de passe correct !';

  // show the error text if form is incorrect
  showText: boolean = false;

  // current cookie
  cookie: any;

  // list of all Users
  allUsers: Logs[] = [];

  constructor(private loginservice: loginService,
              private cookies: CookieService,
              private auth: authService,
              private router: Router) { }

  ngOnInit(): void {
    // autoconnect to know if a cookie is set 
    if (this.cookies.get('isConnected') && this.cookies.get('mel')) {
      this.auth.autoLog();
    }

    // get all users
    this.loginservice.getUsers().subscribe((users) => {
      this.allUsers = users;
    })
  }

  // methods that add users logs into databse with crypted password then login into the app to create a cookie (15min) 
  // then redirect to menu and reload page to hide sign menu
  onConnect(email: string, pass: string) {
    
    if (this.allUsers) {
        if (pass.length > 3) {
          // encrypt all user datas
          var passw = this.loginservice.encrypt(pass);
          var mailw = this.loginservice.encrypt(email);
          // push the user
          this.loginservice.addUser(mailw, passw);
          // reset input values
          this.passForm.setValue('');
          this.idForm.setValue('');
          // login the new user
          this.auth.login();
          // go to menu
          this.router.navigateByUrl('/menu');
          // set cookies of the new user
          this.cookies.set('mel', mailw, 0.1);
          this.cookies.set('isConnected', passw, 0.1);
          // restarting to set all new datas
          window.location.reload();
        }
    }
  }
} 
