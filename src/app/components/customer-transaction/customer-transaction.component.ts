import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable, ReplaySubject } from 'rxjs';
import { Customer } from 'src/app/common/customer';
import { TransactionDate } from 'src/app/common/transaction-date';
import { TransactionResponse } from 'src/app/common/transaction-response';
import { CustomerService } from 'src/app/services/customer.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-customer-transaction',
  templateUrl: './customer-transaction.component.html',
  styleUrls: ['./customer-transaction.component.css']
})
export class CustomerTransactionComponent implements OnInit {

  creditTransactions!: TransactionResponse[];
  creditTransactionDate: TransactionDate = new TransactionDate;

  depositTransactions!: TransactionResponse[];
  depositTransactionDate: TransactionDate = new TransactionDate;

  errorMessage : Error = new Error;
  customer: Customer = new Customer;

  constructor(private customerService:CustomerService,private transactionService:TransactionService,private notifierService: NotifierService) { }

  displayedColumns: string[] = ['id', 'customerId', 'customerName', 'amount','type','idBankSource','idBankTarget','transactionDate','content'];
  creditdataSource =  new TransactionDataSource(this.creditTransactions);
  depositdataSource =  new TransactionDataSource(this.depositTransactions);

  ngOnInit(): void {
    let username = sessionStorage.getItem('username') as string;
    this.customerService.getCustomerByUsername(username).subscribe(data => {
      this.customer = data;
      this.transactionService.getCreditTransactionByIDCustomer(this.customer.id).subscribe(data =>{
        this.creditTransactions = data;
        this.creditdataSource.setData(this.creditTransactions);
      }, error => {
        this.errorMessage = error.error;
        this.notifierService.notify('error',this.errorMessage.message);
      });
      this.transactionService.getDepositTransactionByIDCustomer(this.customer.id).subscribe(data =>{
        this.depositTransactions = data;
        this.depositdataSource.setData(this.depositTransactions);
      }, error => {
        this.errorMessage = error.error;
        this.notifierService.notify('error',this.errorMessage.message);
      });
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }


  onSearchCreditTransactionByTime(){
    if(this.creditTransactionDate.startDate == null || this.creditTransactionDate.endDate == null){
      this.notifierService.notify('error','Bạn phải chọn ngày bắt đầu, kết thúc muốn tra cứu giao dịch');
      return ;
    }
    this.transactionService.getCreditTransactionByIDCustomerAndTime(this.creditTransactionDate,this.customer.id).subscribe(data => {
      this.creditTransactions = data;
      this.creditdataSource.setData(this.creditTransactions);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
  onSearchDepositTransactionByTime(){
    if(this.depositTransactionDate.startDate == null || this.depositTransactionDate.endDate == null){
      this.notifierService.notify('error','Bạn phải chọn ngày bắt đầu, kết thúc muốn tra cứu giao dịch');
      return ;
    }
    this.transactionService.getDepositTransactionByIDCustomerAndTime(this.depositTransactionDate,this.customer.id).subscribe(data => {
      this.depositTransactions = data;
      this.depositdataSource.setData(this.depositTransactions);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
  getAllCreditTransactionByIDCustomer(){
    this.transactionService.getCreditTransactionByIDCustomer(this.customer.id).subscribe(data =>{
      this.creditTransactions = data;
      this.creditdataSource.setData(this.creditTransactions);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
  getAllDepositTransactionByIDCustomer(){
    this.transactionService.getDepositTransactionByIDCustomer(this.customer.id).subscribe(data =>{
      this.depositTransactions = data;
      this.depositdataSource.setData(this.depositTransactions);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
}

class TransactionDataSource extends DataSource<TransactionResponse> {
  private _dataStream = new ReplaySubject<TransactionResponse[]>();

  constructor(initialData: TransactionResponse[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<TransactionResponse[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: TransactionResponse[]) {
    this._dataStream.next(data);
  }
}

