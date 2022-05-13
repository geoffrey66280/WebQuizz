import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { Question } from '../models/Question.models';
import { calculsService } from '../services/calculs.service';
import { questionService } from '../services/question.service';

@Component({
  selector: 'app-quizz-page',
  templateUrl: './quizz-page.component.html',
  styleUrls: ['./quizz-page.component.scss']
})
export class QuizzPageComponent implements OnInit {

  currentQuestion!: Question;
  allQuestions: Question[] = [];
  userResponse: string = '';
  reponseForm = new FormControl({value: '', disabled: false}, Validators.required);
  isDisabled: boolean = false;
  showTitle: boolean = false;

  constructor(private questionservice: questionService, private calculservice: calculsService) { }

  ngOnInit(): void {
    // time of each call by the subscriber 
    const time = interval(60000);
    this.questionservice.getAllQuestions().subscribe((questions) => {
      this.allQuestions = questions;
      this.showTitle = true;
      this.currentQuestion = this.allQuestions[this.calculservice.getRandomInt(this.allQuestions.length - 1)];
    });
  }

  submitResponse(reponse: string) {
    this.userResponse = reponse;
    this.reponseForm.setValue('');
    this.reponseForm.disable();
  }
}
