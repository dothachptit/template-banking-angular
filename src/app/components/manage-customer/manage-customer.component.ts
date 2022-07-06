import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Customer } from 'src/app/common/customer';
import {DataSource} from '@angular/cdk/collections';
import { CustomerService } from 'src/app/services/customer.service';
import { NotifierService } from 'angular-notifier';
import {MatDialog} from '@angular/material/dialog';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {

  errorMessage : Error = new Error;
  customers!: Customer[];
  newCustomer: Customer = new Customer;
  idCustomerSearching!: string;
  usernamecCustomerSearching!: string;

  customerForm!: FormGroup; 
  
  constructor(private customerService: CustomerService, private notifierService: NotifierService, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      'id': new FormControl('',Validators.required),
      'idCard': new FormControl('',Validators.required),
      'fullName': new FormControl('',Validators.required),
      'phoneNumber': new FormControl('',Validators.required),
      'dateOfBirth': new FormControl('',Validators.required),
      'address': new FormControl('',Validators.required),
    });
    this.getAllCustomer();
  }

  displayedColumns: string[] = ['id','idCard','fullName','phonenumber', 'dateOfBirth', 'address', 'accountId','action'];
  dataSource =  new CustomerDataSource(this.customers);

  getAllCustomer(){
    this.customerService.getAllCustomer().subscribe(data => {
      this.customers = data;
      this.dataSource.setData(this.customers);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onAddCustomer(){
    if(this.customerForm.invalid){
      this.customerForm.markAllAsTouched(); // hien thi loi 
      return ; // neu ko hop le thi ko thuc hien gi nua
    }
    this.customerService.addCustomer(this.newCustomer).subscribe(data => {
      this.getAllCustomer();
      this.notifierService.notify('success','Thêm khách hàng thành công!!');
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onDelete(id: string){
    this.customerService.deleteCustomer(id).subscribe(data => {
      this.customers = this.customers.filter(item => item.id !== id);
      this.dataSource.setData(this.customers);
      this.notifierService.notify('success','Xoá khách hàng thành công!!');
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  openDialogUpdateCustomer(id: string){
    // truyền vào component muốn hiển thị lên mh
    let dialogRef = this.dialog.open(EditCustomerComponent, {data: {idCustomer: id}});

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCustomer();
    });
  }

  onSearchCustomerByID(){
    if(this.idCustomerSearching === undefined || this.idCustomerSearching === ''){
      this.notifierService.notify('error','Bạn phải điền vào ID của khách hàng');
      return ;
    }
    this.customerService.getCustomerById(this.idCustomerSearching).subscribe(data => {
      this.customers.splice(0, this.customers.length);
      this.customers.push(data);
      this.dataSource.setData(this.customers);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onSearchCustomerUsername(){
    if(this.usernamecCustomerSearching === undefined || this.usernamecCustomerSearching === ''){
      this.notifierService.notify('error','Bạn phải điền vào username của khách hàng');
      return ;
    }
    this.customerService.getCustomerByUsername(this.usernamecCustomerSearching).subscribe(data => {
      this.customers.splice(0, this.customers.length);
      this.customers.push(data);
      this.dataSource.setData(this.customers);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
}

class CustomerDataSource extends DataSource<Customer> {
  private _dataStream = new ReplaySubject<Customer[]>();

  constructor(initialData: Customer[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Customer[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Customer[]) {
    this._dataStream.next(data);
  }
}
