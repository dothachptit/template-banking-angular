import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { CreditBank } from 'src/app/common/credit-bank';
import { Customer } from 'src/app/common/customer';
import { DepositBank } from 'src/app/common/deposit-bank';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerPurchaseComponent } from '../customer-purchase/customer-purchase.component';
import { PaymentCreditAccountComponent } from '../payment-credit-account/payment-credit-account.component';

@Component({
  selector: 'app-customer-manage-account',
  templateUrl: './customer-manage-account.component.html',
  styleUrls: ['./customer-manage-account.component.css']
})
export class CustomerManageAccountComponent implements OnInit {

  creditBank: CreditBank = new CreditBank;
  depositBank: DepositBank = new DepositBank;
  customer: Customer = new Customer;
  errorMessage : Error = new Error;

  constructor(private bankAccountService:BankAccountService,private customerService: CustomerService, private notifierService: NotifierService, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getCustomerByUsername();
  }

  getCreditBankByCustomerID(){
    this.bankAccountService.getCreditBankByCustomerID(this.customer.id).subscribe(data => {
      this.creditBank = data;
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  getDepositBankByCustomerID(){
    this.bankAccountService.getDepositBankByCustomerID(this.customer.id).subscribe(data => {
      this.depositBank = data;
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
  
  getCustomerByUsername(){
    let username = sessionStorage.getItem("username") as string;
    this.customerService.getCustomerByUsername(username).subscribe(data => {
      this.customer = data;
      this.getDepositBankByCustomerID();
      this.getCreditBankByCustomerID();
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  openDialogPaymentCreditBank(){
    let id = this.depositBank.id as string;
    let dialogRef = this.dialog.open(PaymentCreditAccountComponent,{data: {id: id}});
    dialogRef.afterClosed().subscribe(result => {
      this.getCreditBankByCustomerID();
    });
  }

  openDialogPaymentDepositBank(){
    let id = this.creditBank.id as string;
    let dialogRef = this.dialog.open(CustomerPurchaseComponent,{data: {id: id}});
    dialogRef.afterClosed().subscribe(result => {
      this.getCreditBankByCustomerID();
    });
  }
}
