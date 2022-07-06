import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { RechargeDeposit } from 'src/app/common/recharge-deposit';
import { BankAccountService } from 'src/app/services/bank-account.service';

@Component({
  selector: 'app-recharge-deposit-bank',
  templateUrl: './recharge-deposit-bank.component.html',
  styleUrls: ['./recharge-deposit-bank.component.css']
})
export class RechargeDepositBankComponent implements OnInit {

  rechargeDepositBank: RechargeDeposit = new RechargeDeposit;
  errorMessage : Error = new Error;
  rechargeDepositBankForm!: FormGroup;
  constructor(private bankAccountService: BankAccountService,private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.rechargeDepositBankForm = new FormGroup({
      'targetBankId': new FormControl('',Validators.required),
      'money': new FormControl('',Validators.required),
    });
  }

  onRechargeDepositBank(){
    if(this.rechargeDepositBankForm.invalid){
      this.rechargeDepositBankForm.markAllAsTouched(); // hien thi loi 
      return ; // neu ko hop le thi ko thuc hien gi nua
    }
    this.bankAccountService.rechargeDepositBank(this.rechargeDepositBank).subscribe(data => {
      this.notifierService.notify('success', 'Nạp tiền thành công!!');
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
}
