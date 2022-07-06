import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ManageEmployeeComponent } from './components/manage-employee/manage-employee.component';
import { ManageCustomerComponent } from './components/manage-customer/manage-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { ManageBankAccountComponent } from './components/manage-bank-account/manage-bank-account.component';
import { EditDepositAccountComponent } from './components/edit-deposit-account/edit-deposit-account.component';
import { EditCreditAccountComponent } from './components/edit-credit-account/edit-credit-account.component';
import { AddDepositAccountComponent } from './components/add-deposit-account/add-deposit-account.component';
import { AddCreditAccountComponent } from './components/add-credit-account/add-credit-account.component';
import { RechargeDepositBankComponent } from './components/recharge-deposit-bank/recharge-deposit-bank.component';
import { PaymentCreditAccountComponent } from './components/payment-credit-account/payment-credit-account.component';
import { ManageTransactionComponent } from './components/manage-transaction/manage-transaction.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerManageAccountComponent } from './components/customer-manage-account/customer-manage-account.component';
import { CustomerPurchaseComponent } from './components/customer-purchase/customer-purchase.component';
import { CustomerTransactionComponent } from './components/customer-transaction/customer-transaction.component';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 100,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginStatusComponent,
    RegistrationComponent,
    AdminHomeComponent,
    ManageAccountComponent,
    ManageEmployeeComponent,
    ManageCustomerComponent,
    EditCustomerComponent,
    ManageBankAccountComponent,
    EditDepositAccountComponent,
    EditCreditAccountComponent,
    AddDepositAccountComponent,
    AddCreditAccountComponent,
    RechargeDepositBankComponent,
    PaymentCreditAccountComponent,
    ManageTransactionComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    EmployeeHomeComponent,
    EmployeeDetailsComponent,
    CustomerHomeComponent,
    CustomerDetailsComponent,
    CustomerManageAccountComponent,
    CustomerPurchaseComponent,
    CustomerTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
