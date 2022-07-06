import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Customer } from 'src/app/common/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customer: Customer = new Customer;
  errorMessage : Error = new Error;
  customerForm!: FormGroup; 

  constructor(@Inject(MAT_DIALOG_DATA) public id: any, private customerService: CustomerService,private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      'id': new FormControl('',Validators.required),
      'idCard': new FormControl('',Validators.required),
      'fullName': new FormControl('',Validators.required),
      'phoneNumber': new FormControl('',Validators.required),
      'dateOfBirth': new FormControl('',Validators.required),
      'address': new FormControl('',Validators.required),
    });
    this.getCustomerById();
  }

  getCustomerById(){
    this.customerService.getCustomerById(this.id.idCustomer).subscribe(data => {
      this.customer = data;
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onEditCustomer(){
    if(this.customerForm.invalid){
      this.customerForm.markAllAsTouched(); // hien thi loi 
      return ; // neu ko hop le thi ko thuc hien gi nua
    }
    this.customerService.updateCustomer(this.customer).subscribe(data => {
      this.notifierService.notify('success','Sửa khách hàng thành công!!');
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
}
