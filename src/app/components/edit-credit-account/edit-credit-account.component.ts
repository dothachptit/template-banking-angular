import { Component, OnInit, Inject} from '@angular/core';
import { CreditBank } from 'src/app/common/credit-bank';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-credit-account',
  templateUrl: './edit-credit-account.component.html',
  styleUrls: ['./edit-credit-account.component.css']
})
export class EditCreditAccountComponent implements OnInit {
  errorMessage : Error = new Error;
  creditBank: CreditBank = new CreditBank;
  creditAccountForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public id: any, private bankAccountService: BankAccountService,private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.creditAccountForm = new FormGroup({
      'id': new FormControl(),
      'balance': new FormControl(),
      'interestRate': new FormControl('',Validators.required),
      'createdDate': new FormControl('',Validators.required),
      'maxLoan': new FormControl('',Validators.required),
      'expirationDate': new FormControl('',Validators.required),
      'customerId': new FormControl(),
      'employeeId': new FormControl(),
    });
    this.getCreditBankByID();
  }

  getCreditBankByID(){
    this.bankAccountService.getCreditBankByID(this.id.id).subscribe(data => {
      this.creditBank = data;
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onEditCreditBank(){
    if(this.creditAccountForm.invalid){
      this.creditAccountForm.markAllAsTouched(); // hien thi loi 
      return ; // neu ko hop le thi ko thuc hien gi nua
    }
    this.bankAccountService.updateCreditBankAccount(this.creditBank).subscribe(data => {
      this.notifierService.notify('success','Cập nhật thành công!!');
    },error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
}
