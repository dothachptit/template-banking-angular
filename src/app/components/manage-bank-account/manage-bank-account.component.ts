import { Component, OnInit } from '@angular/core';
import { DepositBank } from 'src/app/common/deposit-bank';
import {DataSource} from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material/dialog';
import { CreditBank } from 'src/app/common/credit-bank';
import { EditDepositAccountComponent } from '../edit-deposit-account/edit-deposit-account.component';
import { EditCreditAccountComponent } from '../edit-credit-account/edit-credit-account.component';
import { AddCreditAccountComponent } from '../add-credit-account/add-credit-account.component';
import { AddDepositAccountComponent } from '../add-deposit-account/add-deposit-account.component';
import { RechargeDepositBankComponent } from '../recharge-deposit-bank/recharge-deposit-bank.component';
import { PaymentCreditAccountComponent } from '../payment-credit-account/payment-credit-account.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-bank-account',
  templateUrl: './manage-bank-account.component.html',
  styleUrls: ['./manage-bank-account.component.css']
})
export class ManageBankAccountComponent implements OnInit {

  errorMessage : Error = new Error;
  depositBanks!: DepositBank[];
  creditBanks!: CreditBank[];
  idDepositBankSearching!: string;
  idCustomerDepositBankSearching!: string;
  idCreditBankSearching!: string;
  idCustomerCreditBankSearching!: string;

  constructor(private bankAccountService: BankAccountService, private notifierService: NotifierService, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllDepositBankAccounts();
    this.getAllCreditBankAccounts();
  }

  displayedDepositBanks: string[] = ['id','balance','interestRate','createdDate', 'minBalance', 'firstRecharge', 'firstDepositDate','employeeId','customerId','action'];
  depositBankDataSource =  new DepositBankDataSource(this.depositBanks);

  displayedCreditBanks: string[] = ['id','balance','interestRate','createdDate', 'maxLoan', 'expirationDate','employeeId','customerId','action'];
  creditBankDataSource =  new CreditBankDataSource(this.creditBanks);

  getAllDepositBankAccounts(){
    this.bankAccountService.getAllDepositBankAccounts().subscribe(data => {
      this.depositBanks = data;
      this.depositBankDataSource.setData(this.depositBanks);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
  
  getAllCreditBankAccounts(){
    this.bankAccountService.getAllCreditBankAccounts().subscribe(data => {
      this.creditBanks = data;
      this.creditBankDataSource.setData(this.creditBanks);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
 
  onSearchDepositBankByID(){
    if(this.idDepositBankSearching === '' || this.idDepositBankSearching === undefined){
      this.notifierService.notify('error','Bạn cần điền vào ID tài khoản gửi tiền muốn tìm!');
      return ;
    }
    this.bankAccountService.getDepositBankByID(this.idDepositBankSearching).subscribe(data => {
      this.depositBanks.splice(0, this.depositBanks.length);
      this.depositBanks.push(data);
      this.depositBankDataSource.setData(this.depositBanks);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onSearchDepositBankByCustomerID(){
    if(this.idCustomerDepositBankSearching === '' || this.idCustomerDepositBankSearching === undefined){
      this.notifierService.notify('error','Bạn cần điền vào ID khách hàng muốn tìm!');
      return ;
    }
    this.bankAccountService.getDepositBankByCustomerID(this.idCustomerDepositBankSearching).subscribe(data => {
      this.depositBanks.splice(0, this.depositBanks.length);
      this.depositBanks.push(data);
      this.depositBankDataSource.setData(this.depositBanks);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onSearchCreditBankByID(){
    console.log(this.idCreditBankSearching);
    if(this.idCreditBankSearching === '' || this.idCreditBankSearching === undefined){
      this.notifierService.notify('error','Bạn cần điền vào ID tài khoản tín dụng muốn tìm!');
      return ;
    }
    this.bankAccountService.getCreditBankByID(this.idCreditBankSearching).subscribe(data => {
      this.creditBanks.splice(0, this.creditBanks.length);
      this.creditBanks.push(data);
      this.creditBankDataSource.setData(this.creditBanks);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onSearchCreditBankByCustomerID(){
    if(this.idCustomerCreditBankSearching === '' || this.idCustomerCreditBankSearching === undefined){
      this.notifierService.notify('error','Bạn cần điền vào ID khách hàng muốn tìm!');
      return ;
    }
    this.bankAccountService.getCreditBankByCustomerID(this.idCustomerCreditBankSearching).subscribe(data => {
      this.creditBanks.splice(0, this.creditBanks.length);
      this.creditBanks.push(data);
      this.creditBankDataSource.setData(this.creditBanks);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  openDialogUpdateDepositBank(id: string){
    let dialogRef = this.dialog.open(EditDepositAccountComponent, {data: {id: id}});

    dialogRef.afterClosed().subscribe(result => {
      this.getAllDepositBankAccounts();
    });
  }

  openDialogUpdateCreditBank(id: string){
    let dialogRef = this.dialog.open(EditCreditAccountComponent, {data: {id: id}});

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCreditBankAccounts();
    });
  }

  openDialogAddCreditBank(){
    let dialogRef = this.dialog.open(AddCreditAccountComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCreditBankAccounts();
    });
  }

  openDialogAddDepositBank(){
    let dialogRef = this.dialog.open(AddDepositAccountComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getAllDepositBankAccounts();
    });
  }
  openDialogRechargeDepositBank(){
    let dialogRef = this.dialog.open(RechargeDepositBankComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getAllDepositBankAccounts();
    });
  }
  openDialogPaymentCreditBank(){
    let dialogRef = this.dialog.open(PaymentCreditAccountComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCreditBankAccounts();
    });
  }
}

class DepositBankDataSource extends DataSource<DepositBank> {
  private _dataStream = new ReplaySubject<DepositBank[]>();

  constructor(initialData: DepositBank[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<DepositBank[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: DepositBank[]) {
    this._dataStream.next(data);
  }
}

class CreditBankDataSource extends DataSource<CreditBank> {
  private _dataStream = new ReplaySubject<CreditBank[]>();

  constructor(initialData: CreditBank[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<CreditBank[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: CreditBank[]) {
    this._dataStream.next(data);
  }
}
