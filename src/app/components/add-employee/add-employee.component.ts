import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Employee } from 'src/app/common/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee = new Employee;
  errorMessage : Error = new Error;
  employeeForm!: FormGroup;

  constructor(private employeeService:EmployeeService, private notifierService: NotifierService) { }

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
    });
  }

  onAddEmployee(){
    if(this.employeeForm.invalid){
      this.employeeForm.markAllAsTouched(); // hien thi loi 
      return ; // neu ko hop le thi ko thuc hien gi nua
    }
    this.employeeService.addEmployee(this.employee).subscribe(data => {
      this.notifierService.notify('success','Thêm nhân viên thành công!!');
    }, error => {
      this.errorMessage = error.error;
      this.notifierService.notify('error',this.errorMessage.message);
    });
  }
}
