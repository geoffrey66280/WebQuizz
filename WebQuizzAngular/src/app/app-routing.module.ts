import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConnectComponent } from './connect/connect.component';
import { QuizzPageComponent } from './quizz-page/quizz-page.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'connection', component: ConnectComponent },
  { path: '', component: AppComponent },
  { path: 'quizz', component: QuizzPageComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
