import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditBank } from '../common/credit-bank';
import { DepositBank } from '../common/deposit-bank';
import { PaymentCreditAccount } from '../common/payment-credit-account';
import { Purchase } from '../common/purchase';
import { RechargeDeposit } from '../common/recharge-deposit';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private baseURL = "http://localhost:8080/bank";
  constructor(private httpClient:HttpClient, private authService: AuthService) { }

  customerRegisterDeposit(depositBankAccount: DepositBank):Observable<DepositBank>{
    return this.httpClient.post<DepositBank>(`${this.baseURL}/customers/deposit/registrations`,depositBankAccount,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getAllDepositBankAccounts():Observable<DepositBank[]>{
    return this.httpClient.get<DepositBank[]>(`${this.baseURL}/deposit-bank-accounts`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getAllCreditBankAccounts():Observable<CreditBank[]>{
    return this.httpClient.get<CreditBank[]>(`${this.baseURL}/credit-bank-accounts`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  getDepositBankByID(id: string):Observable<DepositBank>{
    return this.httpClient.get<DepositBank>(`${this.baseURL}/deposit-bank-accounts/${id}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
  getDepositBankByCustomerID(idCustomer: string):Observable<DepositBank>{
    return this.httpClient.get<DepositBank>(`${this.baseURL}/deposit-bank-accounts/customer/${idCustomer}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
  getCreditBankByID(id: string):Observable<CreditBank>{
    return this.httpClient.get<CreditBank>(`${this.baseURL}/credit-bank-accounts/${id}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
  getCreditBankByCustomerID(idCustomer: string):Observable<CreditBank>{
    return this.httpClient.get<CreditBank>(`${this.baseURL}/credit-bank-accounts/customer/${idCustomer}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
  updateDepositBankAccount(depositBank: DepositBank):Observable<DepositBank>{
    return this.httpClient.put<DepositBank>(`${this.baseURL}/deposit-bank-accounts`,depositBank,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
  updateCreditBankAccount(creditBank: CreditBank):Observable<CreditBank>{
    return this.httpClient.put<CreditBank>(`${this.baseURL}/credit-bank-accounts`,creditBank,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }

  addCreditBankAccount(creditBank: CreditBank):Observable<CreditBank>{
    return this.httpClient.post<CreditBank>(`${this.baseURL}/customers/credit/registrations`,creditBank,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
  addDepositBankAccount(depositBank: DepositBank):Observable<DepositBank>{
    return this.httpClient.post<DepositBank>(`${this.baseURL}/customers/deposit/registrations`,depositBank,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
  rechargeDepositBank(rechargeDeposit: RechargeDeposit):Observable<RechargeDeposit>{
    return this.httpClient.post<RechargeDeposit>(`${this.baseURL}/customers/deposit`, rechargeDeposit, {
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
  paymentCreditBank(paymentCredit:PaymentCreditAccount):Observable<PaymentCreditAccount>{
    return this.httpClient.post<PaymentCreditAccount>(`${this.baseURL}/customers/credit/pay-loan`,paymentCredit,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
  purchase(purchaseInfo: Purchase):Observable<Purchase>{
    return this.httpClient.post<Purchase>(`${this.baseURL}/customers/purchase`,purchaseInfo,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.authService.getToken()}`
      })
    });
  }
}
