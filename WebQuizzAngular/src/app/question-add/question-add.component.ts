import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { questionService } from '../services/question.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.scss']
})
export class QuestionAddComponent implements OnInit {

  questionForm = new FormControl('');
  reponseForm = new FormControl('');

  constructor(private questionservice: questionService) { }

  ngOnInit(): void {
  }

  addQuest(titre: string, reponse: string) {
    this.questionservice.addQuestion(titre, reponse);
    this.questionForm.setValue('');
    this.reponseForm.setValue('');
  }

}
