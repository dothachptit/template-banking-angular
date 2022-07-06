import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend-ltw';
  role: string = "NONE";

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role') as string;
  }
}
