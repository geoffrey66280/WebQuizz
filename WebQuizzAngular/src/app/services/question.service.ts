import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Question } from '../models/Question.models';

@Injectable({
    providedIn: 'root'
})
export class questionService {

    constructor(private http: HttpClient) { }

    // Service to fetch all questions from database
    getAllQuestions() {
        let questions : EventEmitter<Question[]> = new EventEmitter<Question[]>();
        
        this.http.get<Question[]>('http://localhost:8000/getQuestions').subscribe(
          (questionList) => {
            questions.emit(questionList);
        }, (error) => {
          console.log(error);
        });
        
        return questions;
    
      }


      addQuestion(titre: string, reponse: string, points: number) {
        const myheader = new HttpHeaders().append('Content-Type', 'application/json; charset=utf-8');
        const param = new HttpParams().append('titre', titre).append('reponse', reponse).append('points', points);
        this.http.post('http://localhost:8000/question/add/', JSON.stringify(param), {
            headers: myheader
    }).subscribe((response => {
      console.log(reponse);
    }),
    error => {
      console.log(error);
    });
  }
}