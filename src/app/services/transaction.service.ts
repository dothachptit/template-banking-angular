import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionDate } from '../common/transaction-date';
import { TransactionResponse } from '../common/transaction-response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseURL = "http://localhost:8080/bank";
  constructor(private httpClient:HttpClient, private authService: AuthService) { }

  getCreditTransactionsByTime(transactionDate: TransactionDate):Observable<TransactionResponse[]>{
    return this.httpClient.post<TransactionResponse[]>(`${this.baseURL}/transactions/credit`,transactionDate,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getCreditTransactionByID(id: string):Observable<TransactionResponse[]>{
    return this.httpClient.get<TransactionResponse[]>(`${this.baseURL}/transactions/credit/${id}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getCreditTransactionByIDCustomer(idCustomer: string):Observable<TransactionResponse[]>{
    return this.httpClient.get<TransactionResponse[]>(`${this.baseURL}/transactions/credit/customers/${idCustomer}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getDepositTransactionsByTime(transactionDate: TransactionDate):Observable<TransactionResponse[]>{
    return this.httpClient.post<TransactionResponse[]>(`${this.baseURL}/transactions/deposit`,transactionDate,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getDepositTransactionByID(id: string):Observable<TransactionResponse[]>{
    return this.httpClient.get<TransactionResponse[]>(`${this.baseURL}/transactions/deposit/${id}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getDepositTransactionByIDCustomer(idCustomer: string):Observable<TransactionResponse[]>{
    return this.httpClient.get<TransactionResponse[]>(`${this.baseURL}/transactions/deposit/customers/${idCustomer}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
  getCreditTransactionByIDCustomerAndTime(transactionDate: TransactionDate,idCustomer: string):Observable<TransactionResponse[]>{
    return this.httpClient.post<TransactionResponse[]>(`${this.baseURL}/transactions/credit/customers/${idCustomer}/time`,transactionDate,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
  getDepositTransactionByIDCustomerAndTime(transactionDate: TransactionDate,idCustomer: string):Observable<TransactionResponse[]>{
    return this.httpClient.post<TransactionResponse[]>(`${this.baseURL}/transactions/deposit/customers/${idCustomer}/time`,transactionDate,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
}
