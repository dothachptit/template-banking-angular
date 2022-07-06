import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { DepositBank } from 'src/app/common/deposit-bank';
import { BankAccountService } from 'src/app/services/bank-account.service';
@Component({
  selector: 'app-edit-deposit-account',
  templateUrl: './edit-deposit-account.component.html',
  styleUrls: ['./edit-deposit-account.component.css']
})
export class EditDepositAccountComponent implements OnInit {

  errorMessage : Error = new Error;
  depositBank: DepositBank = new DepositBank;
  depositAccountForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public id: any, private bankAccountService: BankAccountService,private notifierService: NotifierService) { }

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
    this.getDepositBankById();
  }

  getDepositBankById(){
    this.bankAccountService.getDepositBankByID(this.id.id).subscribe(data => {
      this.depositBank = data;
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onEditDepositBank(){
    if(this.depositAccountForm.invalid){
      this.depositAccountForm.markAllAsTouched(); // hien thi loi 
      return ; // neu ko hop le thi ko thuc hien gi nua
    }
    this.bankAccountService.updateDepositBankAccount(this.depositBank).subscribe(data => {
      this.notifierService.notify('success','Cập nhật thành công!!');
    },error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
}
