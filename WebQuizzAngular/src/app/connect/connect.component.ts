import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Logs } from '../models/Logs.models';
import { authService } from '../services/auth.service';
import { loginService } from '../services/login.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  passForm = new FormControl('', [Validators.email]);
  idForm = new FormControl('');
  text = 'Veuillez remplir le formulaire avec un identifiant et un mot de passe correct !';
  showText: boolean = false;
  allUsers: Logs[] = [];

  constructor(private auth: authService, private router: Router, private logservice: loginService, private cookies: CookieService) { }

  ngOnInit(): void {
    // cookie autoconnection
    this.auth.autoLog();
    // if cookie then prefill fields with user values but autlog do it instead
    if (this.cookies.get('isConnected') && this.cookies.get('mel')) {
      var decrypt = this.logservice.decrypt(this.cookies.get('isConnected'));
      this.passForm.setValue(decrypt);
      this.idForm.setValue(this.logservice.decrypt(this.cookies.get('mel')));
    }
  }

  // check if user logs are correct then redirect to menu and create a cookie
  onConnect(mail: string, pass: string) {
    this.logservice.getUsers().subscribe((users) => {
      this.allUsers = users;
      console.log(this.allUsers);
      for (let i = 0; i < this.allUsers.length; i++) {
        var passDecrypt = this.logservice.decrypt(this.allUsers[i].password);
        var mailDecrypt = this.logservice.decrypt(this.allUsers[i].email);
        if (mailDecrypt === mail && passDecrypt === pass) {
          this.cookies.set('id', this.allUsers[i].id.toString());
          this.auth.login();
          this.router.navigateByUrl('/menu');
          this.cookies.set('mel', this.allUsers[i].email, 0.1);
          this.cookies.set('isConnected', this.allUsers[i].password, 0.1);
          window.location.reload();
        } else {
          this.showText = true;
        }
      }
    })
  }

  signup() {
    this.router.navigateByUrl('/register');
  }
}
