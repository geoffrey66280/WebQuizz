import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConnectComponent } from './connect/connect.component';
import { QuizzPageComponent } from './quizz-page/quizz-page.component';

const routes: Routes = [
  { path: 'connection', component: ConnectComponent },
  { path: '', component: AppComponent },
  { path: 'quizz', component: QuizzPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
