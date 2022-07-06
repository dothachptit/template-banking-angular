import {Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Account } from 'src/app/common/account';
import { AccountRegistration } from 'src/app/common/account-registration';
import { AccountService } from 'src/app/services/account.service';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {DataSource} from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  accounts!: Account[];
  errorMessage : Error = new Error;
  employeeClicked = false;
  accountRegistration: AccountRegistration = new AccountRegistration;
  usernameSearching!: string; 
  accountRegistrationForm!: FormGroup;

  constructor(private accountService:AccountService, private notifierService: NotifierService, private employeeService: EmployeeService,
    private customerService:CustomerService) { }

  displayedColumns: string[] = ['id', 'username', 'role', 'email','delete-button'];
  dataSource =  new AccountDataSource(this.accounts);

  ngOnInit(): void {
    this.accountRegistrationForm = new FormGroup({
      'infoId': new FormControl('',Validators.required),
      'username': new FormControl('',Validators.required),
      'password': new FormControl('',Validators.required),
      'email': new FormControl('',Validators.required),
    });
    this.getAllAccount();
  }

  getAllAccount(){
    this.accountService.findAll().subscribe(data => {
      this.accounts = data;
      this.dataSource.setData(data);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onDelete(username: string){
    this.accountService.deleteAccount(username).subscribe(data => {
      this.accounts = this.accounts.filter(item => item.username !== username);
      this.dataSource.setData(this.accounts);
      this.notifierService.notify('success','Xoá tài khoản thành công!!');
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    })
  }

  onSubmit(){
    if(this.accountRegistrationForm.invalid){
      this.accountRegistrationForm.markAllAsTouched(); // hien thi loi 
      return ; // neu ko hop le thi ko thuc hien gi nua
    }

    if(this.employeeClicked){
      this.employeeService.registration(this.accountRegistration).subscribe(data => {
        // thong bao dang ky thanh cong
        this.getAllAccount();
        this.notifierService.notify('success','Đăng ký tài khoản thành công!!');
      },error => {
        // dang ky khong thanh cong
        this.errorMessage = error.error;
        this.notifierService.notify('error',this.errorMessage.message);
      });
    }else{
      this.customerService.registration(this.accountRegistration).subscribe(data => {
        this.getAllAccount();
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

  onSearchAccount(){
    if(this.usernameSearching === undefined || this.usernameSearching === ''){
      this.notifierService.notify('error','Bạn phải nhập vào username muốn tìm kiếm');
      return ;
    }
    this.accountService.getAccountByUsername(this.usernameSearching).subscribe(data => {
      this.accounts.splice(0,this.accounts.length);
      this.accounts.push(data);
      this.dataSource.setData(this.accounts);
    },error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

}
class AccountDataSource extends DataSource<Account> {
  private _dataStream = new ReplaySubject<Account[]>();

  constructor(initialData: Account[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Account[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Account[]) {
    this._dataStream.next(data);
  }
}
