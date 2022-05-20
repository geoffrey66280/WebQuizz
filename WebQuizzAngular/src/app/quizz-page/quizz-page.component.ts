import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { CookieService } from 'ngx-cookie-service';
import { interval, Subscription } from 'rxjs';
import { Logs } from '../models/Logs.models';
import { Question } from '../models/Question.models';
import { authService } from '../services/auth.service';
import { calculsService } from '../services/calculs.service';
import { loginService } from '../services/login.service';
import { questionService } from '../services/question.service';

@Component({
  selector: 'app-quizz-page',
  templateUrl: './quizz-page.component.html',
  styleUrls: ['./quizz-page.component.scss']
})
export class QuizzPageComponent implements OnInit, AfterViewInit {

  // Subscriber for the timer
  sub$!: Subscription;

  // Subscriber to push points datas
  pushPoints$!: Subscription;

  // color of the progress spinner
  white: ThemePalette = 'primary';

  // current user points
  points: number = 0;

  // current question that is display
  currentQuestion!: Question;

  // All questions fetch from db
  allQuestions: Question[] = [];

  // global var of the user input (answer)
  userResponse: string = '';

  // answer form that correspond to the string 
  reponseForm = new FormControl({ value: '', disabled: false }, Validators.required);

  // show the quesion title onInit
  showTitle: boolean = false;

  // show the entire page on Init
  showQuizz: boolean = false;

  // show the next question button
  showSuivant: boolean = false;

  // progress spinner if allquestions are waiting for fetching
  showError: boolean = false;

  // init of the page and questions
  init: boolean = true;

  // timer value onInit
  timer: number = 20;

  // value that fetch current points of a user 
  requestPoint: Logs[] = [];

  // allow counter to increment 
  @ViewChild("oneItem") oneItem: any;
  @ViewChildren("count") count!: QueryList<any>;

  constructor(private questionservice: questionService,
    private calculservice: calculsService,
    private auth: authService,
    private cookies: CookieService,
    private loginservice: loginService) { }

  ngOnInit(): void {
    // request for all questions and affecting all values in a var
    this.questionservice.getAllQuestions().subscribe((questions) => {
      this.allQuestions = questions;
    });

    // fetch user points if an id cookie is set
    if (this.cookies.get('id')) {
      // subscribe to getPoints service that fetch current user points
      this.loginservice.getPointsById(Number(this.cookies.get('id'))).subscribe((points) => {
        this.requestPoint = points;
        this.points = this.requestPoint[0].points;
      });
      // observable that push points of the user in real timer if a user is connected
      this.pushPoints$ = interval(20000).subscribe(x => {
        this.loginservice.pushPoint(Number(this.cookies.get('id')), this.points);
      })
    } else {
      this.points = Number(sessionStorage.getItem('points'));
    }
    // autologin if cookie
    this.auth.autoLog();
  }

  start() {
    // wait for questions before starting the quizz
    if (this.allQuestions.length > 0) {

      // INIT 
      this.showSuivant = false
      this.init = false;
      this.showTitle = true;
      // INIT

      // make a random number to select a new question
      var random = this.calculservice.getRandomInt(this.allQuestions.length);
      this.currentQuestion = this.allQuestions[random];

      // show the next question after changing question
      this.showQuizz = true;

      // restarting the timer subscriber
      this.sub$ = interval(1000).subscribe(x => {

        // if timer ends then disable user input and unsubscribe timer
        if (this.timer <= 0) {
          this.reponseForm.disable();
          this.sub$.unsubscribe();
          this.showSuivant = true;
        } else {
          // else timer -1 
          this.timer = this.timer - 1;
        }
      });
    } else {
      this.showError = true;
    }
  }

  // methods that check if an answer is correct and add points
  submitResponse(reponse: string) {
    // affecting input to the global variable
    this.userResponse = reponse;
    // setting the input to 0
    this.reponseForm.setValue('');
    // if question is correct 
    if (this.userResponse === this.currentQuestion.reponse) {
      // add points of the question
      this.points += this.currentQuestion.points;
      if (!this.cookies.get('id')) {
      sessionStorage.setItem('points', this.points.toString())
      }
      // disable input
      this.reponseForm.disable();
      // unsubscribe timer
      this.sub$.unsubscribe();
      this.showSuivant = true;
    } else {
      this.reponseForm.disable();
      this.sub$.unsubscribe();
      this.showSuivant = true;
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
    current = this.points;
    step = Math.abs(Math.floor(duration / range));

    timer = setInterval(() => {
      current += 1;
      element.nativeElement.textContent = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, step);
  }

  // Destroy all subscriber on changing pages or closing tab
  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
    if (this.pushPoints$) {
      this.pushPoints$.unsubscribe();
    }

  }

  // next button -> reloading timer and input then call the start func !
  questionSuivante() {
    this.timer = 20;
    this.reponseForm.enable();
    this.start();
  }
}
