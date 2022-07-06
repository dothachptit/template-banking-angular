import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Observable, ReplaySubject } from 'rxjs';
import { Employee } from 'src/app/common/employee';
import { Paycheck } from 'src/app/common/paycheck';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {

  errorMessage : Error = new Error;
  employees!: Employee[];
  idEmployeeSearching!: string;
  usernameEmployeeSearching!: string;

  idEmployeeSearchSalary!: string;
  month!: Number;
  year!: Number;
  paychecks!: Paycheck[];

  constructor(private employeeService:EmployeeService,private notifierService: NotifierService, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  displayedEmployee: string[] = ['id','idCard','fullName','phoneNumber', 'monthlySalary', 'dateOfBirth', 'address','jobLevel','seniority','position','accountId','action'];
  employeeDataSource =  new EmployeeDataSource(this.employees);

  displayedPaycheck: string[] = ['paycheckId','employeeId','employeeName','amount', 'monthlySalary', 'createdDate', 'month','year'];
  paycheckDataSource =  new PaycheckDataSource(this.paychecks);

  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
      this.employeeDataSource.setData(this.employees);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  getEmployeesByID(){
    if(this.idEmployeeSearching === undefined || this.idEmployeeSearching === ''){
      this.notifierService.notify('error','Bạn phải nhập vào ID của nhân viên');
      return ;
    }
    this.employeeService.getEmployeeByID(this.idEmployeeSearching).subscribe(data => {
      this.employees.splice(0,this.employees.length);
      this.employees.push(data);
      this.employeeDataSource.setData(this.employees);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  getEmployeesByUsername(){
    if(this.usernameEmployeeSearching === undefined || this.usernameEmployeeSearching === ''){
      this.notifierService.notify('error','Bạn phải nhập vào username của nhân viên');
      return ;
    }
    this.employeeService.getEmployeeByUsername(this.usernameEmployeeSearching).subscribe(data => {
      this.employees.splice(0,this.employees.length);
      this.employees.push(data);
      this.employeeDataSource.setData(this.employees);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onSearchSalaryByEmployeeID(){
    if(this.idEmployeeSearchSalary === undefined || this.idEmployeeSearchSalary === ''){
      this.notifierService.notify('error','Bạn phải nhập vào ID nhân viên');
      return ;
    }
    this.employeeService.getPaycheckByEmployeeID(this.idEmployeeSearchSalary).subscribe(data => {
      this.paychecks = data;
      this.paycheckDataSource.setData(this.paychecks);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onGeneratePaycheckByTime(){
    if(this.month == null || this.year == null){
      this.notifierService.notify('error','Bạn phải nhập cả tháng và năm muốn xuất phiếu lương');
      return ;
    } 
    this.employeeService.getPaycheckByTime(this.month, this.year).subscribe(data => {
      this.paychecks = data;
      this.paycheckDataSource.setData(this.paychecks);
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  openDialogUpdateEmployee(id: string){
    let dialogRef = this.dialog.open(EditEmployeeComponent, {data: {id: id}});

    dialogRef.afterClosed().subscribe(result => {
      this.getAllEmployees();
    });
  }
  openDialogAddEmployee(){
    let dialogRef = this.dialog.open(AddEmployeeComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getAllEmployees();
    });
  }
}

class EmployeeDataSource extends DataSource<Employee> {
  private _dataStream = new ReplaySubject<Employee[]>();

  constructor(initialData: Employee[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Employee[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Employee[]) {
    this._dataStream.next(data);
  }
}

class PaycheckDataSource extends DataSource<Paycheck> {
  private _dataStream = new ReplaySubject<Paycheck[]>();

  constructor(initialData: Paycheck[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Paycheck[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Paycheck[]) {
    this._dataStream.next(data);
  }
}

