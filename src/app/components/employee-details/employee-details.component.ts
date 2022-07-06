import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Observable, ReplaySubject } from 'rxjs';
import { Employee } from 'src/app/common/employee';
import { Paycheck } from 'src/app/common/paycheck';
import { EmployeeService } from 'src/app/services/employee.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  errorMessage : Error = new Error;
  employee: Employee = new Employee;
  username!: string;

  month!: Number;
  year!: Number;
  paychecks!: Paycheck[];

  constructor(private employeeService:EmployeeService, private notifierService: NotifierService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getEmployeeByUsername();
  }

  displayedPaycheck: string[] = ['paycheckId','employeeId','employeeName','amount', 'monthlySalary', 'createdDate', 'month','year'];
  paycheckDataSource =  new PaycheckDataSource(this.paychecks);

  getEmployeeByUsername(){
    this.username = sessionStorage.getItem("username") as string;
    this.employeeService.getEmployeeByUsername(this.username).subscribe(data => {
      this.employee = data;
      this.employeeService.getPaycheckByEmployeeID(this.employee.id).subscribe(data => {
        this.paychecks = data;
        this.paycheckDataSource.setData(this.paychecks);
      }, error => {
        this.errorMessage = error.error;
        this.notifierService.notify('error',this.errorMessage.message);
      });
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  searchPaycheckByTimeAndEmployeeID(){
    if(this.month == null || this.year == null){
      this.notifierService.notify('error','Bạn cần nhập vào tháng, năm muốn xuất phiếu lương');
      return ;
    }
    this.employeeService.getPaycheckByTimeAndEmployeeID(this.month,this.year,this.employee.id).subscribe(data => {
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
      this.getEmployeeByUsername();
    });
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
