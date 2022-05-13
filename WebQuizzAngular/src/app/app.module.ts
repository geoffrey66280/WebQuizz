import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizzPageComponent } from './quizz-page/quizz-page.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { Animations } from './animations/animations.component';
import { ConnectComponent } from './connect/connect.component';
import { calculsService } from './services/calculs.service';
import { questionService } from './services/question.service';

@NgModule({
  declarations: [
    AppComponent,
    QuizzPageComponent,
    NavComponent,
    Animations,
    ConnectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [calculsService, questionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
