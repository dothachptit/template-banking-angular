import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  canActivate(){
    let Role = sessionStorage.getItem("role");
    if(Role == "CUSTOMER"){
      return true;
    }
    return false;
  }
}
