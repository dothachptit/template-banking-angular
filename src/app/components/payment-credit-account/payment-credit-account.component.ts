import { Component, OnInit,Inject } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PaymentCreditAccount } from 'src/app/common/payment-credit-account';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-credit-account',
  templateUrl: './payment-credit-account.component.html',
  styleUrls: ['./payment-credit-account.component.css']
})
export class PaymentCreditAccountComponent implements OnInit {

  paymentCreditAccount: PaymentCreditAccount = new PaymentCreditAccount;
  errorMessage : Error = new Error;
  paymentCreditAccountForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public id: any,private bankAccountService: BankAccountService,private notifierService: NotifierService) { } 

  ngOnInit(): void {
    this.paymentCreditAccountForm = new FormGroup({
      'depositAccountId': new FormControl('',Validators.required),
      'creditAccountId': new FormControl('',Validators.required),
      'money': new FormControl('',Validators.required),
      'content': new FormControl(),
    });
    if(this.id != null){
      this.paymentCreditAccount.depositAccountId = this.id.id;
    }
  } 

  onPaymentCreditBank(){
    if(this.paymentCreditAccountForm.invalid){
      this.paymentCreditAccountForm.markAllAsTouched(); // hien thi loi 
      return ; // neu ko hop le thi ko thuc hien gi nua
    }
    this.bankAccountService.paymentCreditBank(this.paymentCreditAccount).subscribe(data => {
      this.notifierService.notify('success', 'Trả nợ tín dụng thành công!!');
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
}
