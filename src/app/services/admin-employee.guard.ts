import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminEmployeeGuard implements CanActivate {
  canActivate(){
    let Role = sessionStorage.getItem("role");
    if(Role == "ADMIN" || Role == "EMPLOYEE"){
      return true;
    }
    return false;
  }
  
}
