import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { interval } from 'rxjs';

@Component({
  selector: 'app-quizz-page',
  templateUrl: './quizz-page.component.html',
  styleUrls: ['./quizz-page.component.scss']
})
export class QuizzPageComponent implements OnInit {

  
  userResponse: string = '';
  reponseForm = new FormControl({value: '', disabled: false}, Validators.required);
  isDisabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // time of each call by the subscriber 
    const time = interval(60000);
    
  }

  submitResponse(reponse: string) {
    this.userResponse = reponse;
    this.reponseForm.setValue('');
    this.reponseForm.disable();
  }
}
