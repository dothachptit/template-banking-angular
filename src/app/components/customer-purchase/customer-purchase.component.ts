import { Component, OnInit,Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Purchase } from 'src/app/common/purchase';
import { BankAccountService } from 'src/app/services/bank-account.service';

@Component({
  selector: 'app-customer-purchase',
  templateUrl: './customer-purchase.component.html',
  styleUrls: ['./customer-purchase.component.css']
})
export class CustomerPurchaseComponent implements OnInit {

  errorMessage : Error = new Error;
  purchase: Purchase = new Purchase;
  purchaseForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public id: any,private bankAccountService: BankAccountService,private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.purchaseForm = new FormGroup({
      'sourceBankId': new FormControl('',Validators.required),
      'targetBankId': new FormControl('',Validators.required),
      'money': new FormControl('',Validators.required),
      'content': new FormControl(),
    });
    if(this.id != null){
      this.purchase.sourceBankId = this.id.id;
    }
  }

  onPurchase(){
    if(this.purchaseForm.invalid){
      this.purchaseForm.markAllAsTouched(); // hien thi loi 
      return ;
    }
    this.bankAccountService.purchase(this.purchase).subscribe(data => {
      this.notifierService.notify('success', 'Thanh toán thành công!!');
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
}
