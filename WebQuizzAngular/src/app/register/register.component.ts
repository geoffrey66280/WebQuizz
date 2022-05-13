import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { loginService } from '../services/login.service';
import { questionService } from '../services/question.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  passForm = new FormControl('', [Validators.email]);
  idForm = new FormControl('');
  text = 'Veuillez remplir le formulaire avec un identifiant et un mot de passe correct !';
  showText: boolean = false;

  constructor(private loginservice: loginService, private questionservice: questionService) { }

  ngOnInit(): void {
  }

  onConnect(email: string, pass: string) {
    var passw = this.loginservice.encrypt(pass);
    this.loginservice.addUser(email, passw);
    this.passForm.setValue('');
    this.idForm.setValue('');
  }
}
