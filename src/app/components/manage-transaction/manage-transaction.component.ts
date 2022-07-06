import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { TransactionResponse } from 'src/app/common/transaction-response';
import { TransactionService } from 'src/app/services/transaction.service';
import {DataSource} from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { TransactionDate } from 'src/app/common/transaction-date';

@Component({
  selector: 'app-manage-transaction',
  templateUrl: './manage-transaction.component.html',
  styleUrls: ['./manage-transaction.component.css']
})
export class ManageTransactionComponent implements OnInit {

  errorMessage : Error = new Error;

  creditTransactions!: TransactionResponse[];
  creditTransactionDate: TransactionDate = new TransactionDate;
  idCreditTransaction!: string;
  idCreditCustomer!: string;

  depositTransactions!: TransactionResponse[];
  depositTransactionDate: TransactionDate = new TransactionDate;
  idDepositTransaction!: string;
  idDepositCustomer!: string;

  constructor(private transactionService:TransactionService,private notifierService: NotifierService) { }

  displayedColumns: string[] = ['id', 'customerId', 'customerName', 'amount','type','idBankSource','idBankTarget','transactionDate','content'];
  creditdataSource =  new TransactionDataSource(this.creditTransactions);
  depositdataSource =  new TransactionDataSource(this.depositTransactions);

  ngOnInit(): void {
  }
 
  onSearchCreditTransactionByTime(){
    if(this.creditTransactionDate.endDate == null || this.creditTransactionDate.startDate == null){
      this.notifierService.notify('error','Bạn phải điền đầy đủ ngày bắt đầu và kết thúc');
      return ;
    }
    this.transactionService.getCreditTransactionsByTime(this.creditTransactionDate).subscribe(data => {
      this.creditTransactions = data;
      this.creditdataSource.setData(this.creditTransactions);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onSearchCreditTransactionByID(){
    if(this.idCreditTransaction === '' || this.idCreditTransaction === undefined){
      this.notifierService.notify('error','Bạn phải nhập vào ID giao dịch muốn tìm');
      return ;
    }
    this.transactionService.getCreditTransactionByID(this.idCreditTransaction).subscribe(data => {
      this.creditTransactions = data;
      this.creditdataSource.setData(this.creditTransactions);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onSearchCreditTransactionByIDCustomer(){
    if(this.idCreditCustomer === '' || this.idCreditCustomer === undefined){
      this.notifierService.notify('error','Bạn phải nhập vào ID khách hàng muốn tìm');
      return ;
    }
    this.transactionService.getCreditTransactionByIDCustomer(this.idCreditCustomer).subscribe(data => {
      this.creditTransactions = data;
      this.creditdataSource.setData(this.creditTransactions);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onSearchDepositTransactionByTime(){
    if(this.depositTransactionDate.endDate == null || this.depositTransactionDate.startDate == null){
      this.notifierService.notify('error','Bạn phải điền đầy đủ ngày bắt đầu và kết thúc');
      return ;
    }
    this.transactionService.getDepositTransactionsByTime(this.depositTransactionDate).subscribe(data => {
      this.depositTransactions = data;
      this.depositdataSource.setData(this.depositTransactions);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onSearchDepositTransactionByID(){
    if(this.idDepositTransaction === '' || this.idDepositTransaction === undefined){
      this.notifierService.notify('error','Bạn phải nhập vào ID giao dịch muốn tìm');
      return ;
    }
    this.transactionService.getDepositTransactionByID(this.idDepositTransaction).subscribe(data => {
      this.depositTransactions = data;
      this.depositdataSource.setData(this.depositTransactions);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onSearchDepositTransactionByIDCustomer(){
    if(this.idDepositCustomer === '' || this.idDepositCustomer === undefined){
      this.notifierService.notify('error','Bạn phải nhập vào ID khách hàng muốn tìm');
      return ;
    }
    this.transactionService.getDepositTransactionByIDCustomer(this.idDepositCustomer).subscribe(data => {
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
