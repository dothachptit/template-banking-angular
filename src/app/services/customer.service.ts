import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountRegistration } from '../common/account-registration';
import { Observable } from 'rxjs';
import { Customer } from '../common/customer';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseURL = "http://localhost:8080/bank";
  constructor(private httpClient:HttpClient, private authService: AuthService) { }

  registration(accountRegistration: AccountRegistration):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/customers/registration`,accountRegistration);
  }

  getAllCustomer():Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.baseURL}/customers`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getCustomerByUsername(username: string):Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseURL}/customers/${username}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  addCustomer(customer: Customer): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/customers`,customer,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getCustomerById(id: string):Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseURL}/customers/get-by-id/${id}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  updateCustomer(customer: Customer):Observable<Customer>{
    return this.httpClient.put<Customer>(`${this.baseURL}/customers`,customer,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  deleteCustomer(id: string):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/customers/${id}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
}
