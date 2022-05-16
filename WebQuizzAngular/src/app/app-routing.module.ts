import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConnectComponent } from './connect/connect.component';
import { MenuComponent } from './menu/menu.component';
import { QuizzPageComponent } from './quizz-page/quizz-page.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './connect/auth.guard';
import { QuestionAddComponent } from './question-add/question-add.component';

const routes: Routes = [
  { path: 'connection', component: ConnectComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'quizz', component: QuizzPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'addQuest', component: QuestionAddComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
