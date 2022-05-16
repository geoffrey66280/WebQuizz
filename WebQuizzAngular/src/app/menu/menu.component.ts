import { Component, OnInit } from '@angular/core';
import { authService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  
  constructor(private auth: authService) { }

  ngOnInit(): void {
    
    
  }

}
