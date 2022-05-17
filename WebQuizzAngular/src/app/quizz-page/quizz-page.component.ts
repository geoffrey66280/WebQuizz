import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { interval, Observable, Subscription } from 'rxjs';
import { Question } from '../models/Question.models';
import { authService } from '../services/auth.service';
import { calculsService } from '../services/calculs.service';
import { questionService } from '../services/question.service';

@Component({
  selector: 'app-quizz-page',
  templateUrl: './quizz-page.component.html',
  styleUrls: ['./quizz-page.component.scss']
})
export class QuizzPageComponent implements OnInit, AfterViewInit {
  sub$!: Subscription;
  white: ThemePalette = 'primary';
  points: number = 0;
  currentQuestion!: Question;
  allQuestions: Question[] = [];
  userResponse: string = '';
  reponseForm = new FormControl({ value: '', disabled: false }, Validators.required);
  isDisabled: boolean = false;
  showTitle: boolean = false;
  showQuizz: boolean = false;
  showSuivant: boolean = false;
  init: boolean = true;
  timer: number = 20;
  pointVal: number = 100;
  @ViewChild("oneItem") oneItem: any;
  @ViewChildren("count") count!: QueryList<any>;

  constructor(private questionservice: questionService, private calculservice: calculsService, private elRef: ElementRef, private auth: authService) { }

  ngOnInit(): void {
    this.questionservice.getAllQuestions().subscribe((questions) => {
      this.allQuestions = questions;
    });
    // autocookie connection
    this.auth.autoLog();
    // time of each call by the subscriber 
  }

  start() {
     this.showSuivant = false
      this.init = false;
      this.showTitle = true;
      this.currentQuestion = this.allQuestions[this.calculservice.getRandomInt(this.allQuestions.length)];
      this.showQuizz = true;
      this.sub$ = interval(1000).subscribe(x => {

        if (this.timer <= 0) {
          this.reponseForm.disable();
          this.sub$.unsubscribe();
          this.showSuivant = true;
        } else {
          this.timer = this.timer - 1;
          this.pointVal - 5;
          console.log(this.timer);
        }

      });
   

  }

  // methods that check if an answer is correct and add 100 points 
  submitResponse(reponse: string) {
    this.userResponse = reponse;
    this.reponseForm.setValue('');
    if (this.userResponse === this.currentQuestion.reponse) {
      this.points += this.currentQuestion.points;
      this.reponseForm.disable();
      this.sub$.unsubscribe();
      this.showSuivant = true;
    } else {
      this.currentQuestion = this.allQuestions[this.calculservice.getRandomInt(this.allQuestions.length)]
    }
  }

  // reload the view to display points value in real time
  ngAfterViewInit() {
    this.animateCount();
  }

  // counter 
  animateCount() {
    let _this = this;

    let single = this.oneItem.nativeElement.innerHTML;

    this.counterFunc(single, this.oneItem, 7000);

    this.count.forEach(item => {
      _this.counterFunc(item.nativeElement.innerHTML, item, 2000);
    });
  }

  counterFunc(end: number, element: any, duration: number) {
    let range, current: number, step, timer: any;

    range = end - 0;
    current = 0;
    step = Math.abs(Math.floor(duration / range));

    timer = setInterval(() => {
      current += 1;
      element.nativeElement.textContent = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, step);
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  questionSuivante() {
    this.timer = 20;
    this.pointVal = 100;
    this.reponseForm.enable();
    this.start();
  }
}
