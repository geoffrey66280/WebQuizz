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
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { CookieService } from 'ngx-cookie-service';
import { authService } from './services/auth.service';
import { QuestionAddComponent } from './question-add/question-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AppComponent,
    QuizzPageComponent,
    NavComponent,
    Animations,
    ConnectComponent,
    RegisterComponent,
    MenuComponent,
    QuestionAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [calculsService, questionService, CookieService, authService],
  bootstrap: [AppComponent]
})
export class AppModule { }
