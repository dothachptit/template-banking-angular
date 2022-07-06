import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountRegistration } from '../common/account-registration';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Employee } from '../common/employee';
import { Paycheck } from '../common/paycheck';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseURL = "http://localhost:8080/bank";
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  registration(accountRegistration: AccountRegistration):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/employees/registration`,accountRegistration);
  }

  getAllEmployees():Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}/employees`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getEmployeeByUsername(username: string):Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/employees/${username}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getEmployeeByID(id: string):Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/employees/get-by-id/${id}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  addEmployee(employee: Employee):Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.baseURL}/employees`,employee,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  updateEmployee(employee: Employee):Observable<Employee>{
    return this.httpClient.put<Employee>(`${this.baseURL}/employees`,employee,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getPaycheckByTime(month:Number, year:Number):Observable<Paycheck[]>{
    return this.httpClient.get<Paycheck[]>(`${this.baseURL}/employees/paycheck/${month}/${year}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getPaycheckByEmployeeID(employeeID:string):Observable<Paycheck[]>{
    return this.httpClient.get<Paycheck[]>(`${this.baseURL}/employees/paycheck/${employeeID}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getPaycheckByTimeAndEmployeeID(month:Number,year:Number,employeeID:string):Observable<Paycheck[]>{
    return this.httpClient.get<Paycheck[]>(`${this.baseURL}/employees/paycheck/${month}/${year}/${employeeID}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
}
