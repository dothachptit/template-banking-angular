import { Component, OnInit } from '@angular/core';
import { AccountLogin } from 'src/app/common/account-login';
import { AccountService } from 'src/app/services/account.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { Account } from 'src/app/common/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  accountLogin: AccountLogin = new AccountLogin; 
  account: Account = new Account;
  constructor(private accountService: AccountService, private notifierService: NotifierService, private router:Router) { }
  
  ngOnInit(): void {
  }

  async authentication(){ 
    await this.accountService.authentication(this.accountLogin).subscribe(data => {
      let token = Object.values(data);
      sessionStorage.setItem('jwtToken',token[0]);
      sessionStorage.setItem('username',this.accountLogin.username);

      this.accountService.getAccountByUsername(this.accountLogin.username).subscribe(data => {
        this.account = data;
        sessionStorage.setItem('role',this.account.role);
        if("ADMIN" === this.account.role){
          this.router.navigate(['/home-admin']);
        }else if("EMPLOYEE" === this.account.role){
          this.router.navigate(['/home-employee']);
        }else{
          this.router.navigate(['/home-customer']);
        }
      });
      this.notifierService.notify('success','Đăng nhập thành công!!');
      setTimeout(() => location.reload(), 800);
    },
    error => {
      console.log(error);
      this.notifierService.notify('error','Thông tin tài khoản hoặc mật khẩu không chính xác!!');
    });
  }

  onSubmit(){
    if(this.accountLogin.password === undefined || this.accountLogin.password === '' || this.accountLogin.username === undefined || this.accountLogin.username === ''){
      this.notifierService.notify('error','Bạn phải điền đầy đủ cả tên tài khoản và mật khẩu!!');
      return ;
    }
    this.authentication();
  }
}
