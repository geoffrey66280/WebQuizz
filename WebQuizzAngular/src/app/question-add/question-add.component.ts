import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { questionService } from '../services/question.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.scss']
})
export class QuestionAddComponent implements OnInit {

  // all input
  questionForm = new FormControl('');
  reponseForm = new FormControl('');
  pointsForm = new FormControl('');

  constructor(private questionservice: questionService) { }

  ngOnInit(): void {
  }

  // method to add questions
  addQuest(titre: string, reponse: string, points: number) {
    // directly add the question corresponding to inputs
    this.questionservice.addQuestion(titre, reponse, points);
    // reset inputs
    this.questionForm.setValue('');
    this.reponseForm.setValue('');
    this.pointsForm.setValue('');
  }

}
