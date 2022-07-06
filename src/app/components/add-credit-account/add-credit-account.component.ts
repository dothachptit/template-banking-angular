import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { CreditBank } from 'src/app/common/credit-bank';
import { BankAccountService } from 'src/app/services/bank-account.service';

@Component({
  selector: 'app-add-credit-account',
  templateUrl: './add-credit-account.component.html',
  styleUrls: ['./add-credit-account.component.css']
})
export class AddCreditAccountComponent implements OnInit {

  errorMessage : Error = new Error;
  creditBank: CreditBank = new CreditBank;
  constructor( private bankAccountService: BankAccountService,private notifierService: NotifierService) { }

  // them 
  creditAccountForm!: FormGroup;
  // 

  ngOnInit(): void {
    // them
    this.creditAccountForm = new FormGroup({
      'id': new FormControl('',Validators.required),
      'balance': new FormControl('',Validators.required),
      'interestRate': new FormControl('',Validators.required),
      'createdDate': new FormControl('',Validators.required),
      'maxLoan': new FormControl('',Validators.required),
      'expirationDate': new FormControl('',Validators.required),
      'customerId': new FormControl('',Validators.required),
      'employeeId': new FormControl('',Validators.required),
    });
    //
  }
 
  onAddCreditBank(){
    if(this.creditAccountForm.invalid){
      this.creditAccountForm.markAllAsTouched(); // hien thi loi 
      return ; // neu ko hop le thi ko thuc hien gi nua
    }
    this.bankAccountService.addCreditBankAccount(this.creditBank).subscribe(data => {
      this.notifierService.notify('success','Thêm tài khoản tín dụng thành công!!');
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
}
