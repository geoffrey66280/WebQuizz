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

  userMail = new FormGroup({
    usermail: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });
  passForm = new FormControl('', [Validators.email]);
  idForm = new FormControl('');
  text = 'Veuillez remplir le formulaire avec un identifiant et un mot de passe correct !';
  showText: boolean = false;
  cookie: any;
  allUsers: Logs[] = [];
  isPresent: boolean = false;
  textMail: string = '';

  constructor(private loginservice: loginService, private cookies: CookieService, private auth: authService, private router: Router) { }

  ngOnInit(): void {
    // autoconnect to know if a cookie is set 
    if (this.cookies.get('isConnected') && this.cookies.get('mel')) {
      this.auth.autoLog();
    }

    this.loginservice.getUsers().subscribe((users) => {
      this.allUsers = users;
    })
  }

  // methods that add users logs into databse with crypted password then login into the app to create a cookie (15min) 
  // then redirect to menu and reload page to hide sign menu
  onConnect(email: string, pass: string) {
    this.isPresent = false;
    
    if (this.allUsers) {
      for (let i = 0; i < this.allUsers.length; i++) {
        if (this.userMail.get('usermail')?.value === this.loginservice.decrypt(this.allUsers[i].email)) {
          this.isPresent = true;
          this.textMail = 'Mail déjà existant';
          break;
        }
      }
      if (!this.isPresent) {
        if (!this.userMail.get('usermail')?.invalid && pass.length > 3) {
          var passw = this.loginservice.encrypt(pass);
          var mailw = this.loginservice.encrypt(this.userMail.get('usermail')?.value);
          this.loginservice.addUser(mailw, passw);
          this.passForm.setValue('');
          this.idForm.setValue('');
          this.auth.login();
          this.router.navigateByUrl('/menu');
          this.cookies.set('mel', mailw, 0.1);
          this.cookies.set('isConnected', passw, 0.1);
          window.location.reload();
        }
      }
    }
  }
} 
