import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Customer } from 'src/app/common/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  errorMessage : Error = new Error;
  customer: Customer = new Customer;

  constructor(private customerService:CustomerService, private notifierService: NotifierService, public dialog:MatDialog ) { }

  ngOnInit(): void {
    this.getCustomerByUsername();
  }

  getCustomerByUsername(){
    let username = sessionStorage.getItem("username") as string;
    this.customerService.getCustomerByUsername(username).subscribe(data => {
      this.customer = data;
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  openDialogUpdateCustomer(id: string){
    let dialogRef = this.dialog.open(EditCustomerComponent, {data: {idCustomer: id}});
    dialogRef.afterClosed().subscribe(result => {
      this.getCustomerByUsername();
    });
  }
}
