import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { DepositBank } from 'src/app/common/deposit-bank';
import { BankAccountService } from 'src/app/services/bank-account.service';

@Component({
  selector: 'app-add-deposit-account',
  templateUrl: './add-deposit-account.component.html',
  styleUrls: ['./add-deposit-account.component.css']
})
export class AddDepositAccountComponent implements OnInit {
  errorMessage : Error = new Error;
  depositBank: DepositBank = new DepositBank;
  depositAccountForm!: FormGroup;
  constructor(private bankAccountService: BankAccountService,private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.depositAccountForm = new FormGroup({
      'id': new FormControl('',Validators.required),
      'balance': new FormControl('',Validators.required),
      'interestRate': new FormControl('',Validators.required),
      'createdDate': new FormControl('',Validators.required),
      'minBalance': new FormControl('',Validators.required),
      'firstRecharge': new FormControl(),
      'firstDepositDate': new FormControl(),
      'customerId': new FormControl('',Validators.required),
      'employeeId': new FormControl('',Validators.required),
    });
  }

  onAddDepositBank(){
    if(this.depositAccountForm.invalid){
      this.depositAccountForm.markAllAsTouched(); // hien thi loi 
      return ; // neu ko hop le thi ko thuc hien gi nua
    }
    this.bankAccountService.addDepositBankAccount(this.depositBank).subscribe(data => {
      this.notifierService.notify('success','Thêm tài khoản tín dụng thành công!!');
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
}
