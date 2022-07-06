import { Component, OnInit,Inject } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Employee } from 'src/app/common/employee';
import { NotifierService } from 'angular-notifier';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  errorMessage : Error = new Error;
  employee: Employee = new Employee;
  employeeForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public id: any,private employeeService:EmployeeService,private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      'id': new FormControl('',Validators.required),
      'idCard': new FormControl('',Validators.required),
      'fullName': new FormControl('',Validators.required),
      'phoneNumber': new FormControl('',Validators.required),
      'monthlySalary': new FormControl('',Validators.required),
      'dateOfBirth': new FormControl('',Validators.required),
      'address': new FormControl('',Validators.required),
      'jobLevel': new FormControl('',Validators.required),
      'seniority': new FormControl('',Validators.required),
      'position': new FormControl('',Validators.required),
      'accountId': new FormControl('',Validators.required),
    });
    this.getEmployeeByID();
  }
 
  getEmployeeByID(){
    this.employeeService.getEmployeeByID(this.id.id).subscribe(data => {
      this.employee = data;
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }

  onEditEmployee(){
    if(this.employeeForm.invalid){
      this.employeeForm.markAllAsTouched(); // hien thi loi 
      return ; // neu ko hop le thi ko thuc hien gi nua
    }
    this.employeeService.updateEmployee(this.employee).subscribe(data => {
      this.notifierService.notify('success','Cập nhật nhân viên thành công!!');
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
}
