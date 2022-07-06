import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { CustomerManageAccountComponent } from './components/customer-manage-account/customer-manage-account.component';
import { CustomerTransactionComponent } from './components/customer-transaction/customer-transaction.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { LoginComponent } from './components/login/login.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { ManageBankAccountComponent } from './components/manage-bank-account/manage-bank-account.component';
import { ManageCustomerComponent } from './components/manage-customer/manage-customer.component';
import { ManageEmployeeComponent } from './components/manage-employee/manage-employee.component';
import { ManageTransactionComponent } from './components/manage-transaction/manage-transaction.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminEmployeeGuard } from './services/admin-employee.guard';
import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/auth.guard';
import { CustomerGuard } from './services/customer.guard';
import { EmployeeGuard } from './services/employee.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'refreshLogin', component:LoginStatusComponent},
  {path: 'home-admin', component:AdminHomeComponent,canActivate:[AuthGuard,AdminGuard]},
  {path: 'home-employee', component:EmployeeHomeComponent,canActivate:[AuthGuard,EmployeeGuard]},
  {path: 'manage-account', component: ManageAccountComponent,canActivate:[AuthGuard,AdminEmployeeGuard]},
  {path: 'manage-customer', component: ManageCustomerComponent, canActivate:[AuthGuard,AdminEmployeeGuard]},
  {path: 'manage-bank-account', component: ManageBankAccountComponent,canActivate:[AuthGuard,AdminEmployeeGuard]},
  {path: 'manage-transaction', component: ManageTransactionComponent,canActivate:[AuthGuard,AdminEmployeeGuard]},
  {path: 'manage-employee', component:ManageEmployeeComponent,canActivate:[AuthGuard,AdminGuard]},
  {path: 'employee-details', component:EmployeeDetailsComponent,canActivate:[AuthGuard,EmployeeGuard]},
  {path: 'customer-details', component:CustomerDetailsComponent,canActivate:[AuthGuard,CustomerGuard]},
  {path: 'home-customer', component:CustomerHomeComponent,canActivate:[AuthGuard,CustomerGuard]},
  {path: 'customer-bank-account', component:CustomerManageAccountComponent,canActivate:[AuthGuard,CustomerGuard]},
  {path: 'customer-transaction', component:CustomerTransactionComponent,canActivate:[AuthGuard,CustomerGuard]},
  {path:'',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
