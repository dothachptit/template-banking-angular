import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Account } from '../common/account';
import { AccountLogin } from '../common/account-login';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseURL = "http://localhost:8080/bank";
  constructor(private httpClient:HttpClient, private authService: AuthService) { }

  authentication(accountLogin: AccountLogin):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/authentication`, accountLogin);
  }

  findAll():Observable<Account[]>{
    return this.httpClient.get<Account[]>(`${this.baseURL}/accounts`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  deleteAccount(username: string):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/accounts/${username}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getAccountByUsername(username: string):Observable<Account>{
    return this.httpClient.get<Account>(`${this.baseURL}/accounts/${username}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
}
