import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}