import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  onConnect(email: string, pass: string) {

  }

}