import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  username!: string;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.setInfo();
  }

  setInfo(){
    let name = sessionStorage.getItem('username');
    if(name !== null){
      this.isAuthenticated = true;
      this.username = name;
    }
  }

  logout(){
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    this.isAuthenticated = false;
    location.reload();
  }
}
