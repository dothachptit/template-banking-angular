import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { AccountRegistration } from 'src/app/common/account-registration';
import { Error } from 'src/app/common/error';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  accountRegistration: AccountRegistration = new AccountRegistration; 
  errorMessage : Error = new Error;
  employeeClicked = false;

  constructor(private employeeService:EmployeeService,private notifierService: NotifierService,private customerService:CustomerService) { }

  ngOnInit(): void {    
  }

  onSubmit(){
    if(this.accountRegistration.password === undefined || this.accountRegistration.password === '' ||
      this.accountRegistration.username === undefined || this.accountRegistration.username === '' ||
      this.accountRegistration.infoId === undefined || this.accountRegistration.infoId === ''||
      this.accountRegistration.email === undefined || this.accountRegistration.email === ''){
        this.notifierService.notify('error','Bạn cần điền đầy đủ thông tin');
        return ;
    }
    console.log(this.accountRegistration);
    if(this.employeeClicked){
      this.employeeService.registration(this.accountRegistration).subscribe(data => {
        // thong bao dang ky thanh cong
        this.notifierService.notify('success','Đăng ký tài khoản thành công!!');
      },error => {
        // dang ky khong thanh cong
        this.errorMessage = error.error;
        this.notifierService.notify('error',this.errorMessage.message);
      });
    }else{
      this.customerService.registration(this.accountRegistration).subscribe(data => {
        this.notifierService.notify('success','Đăng ký tài khoản thành công!!');
      }, error => {
        this.errorMessage = error.error;
        this.notifierService.notify('error',this.errorMessage.message);
      });
    }
  }

  onEmployeeClick(){
    this.employeeClicked = true;
  }

  onCustomerClick(){
    this.employeeClicked = false;
  }
}
