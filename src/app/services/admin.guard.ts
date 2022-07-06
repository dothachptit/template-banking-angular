import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  // them vao nhu auth
  canActivate(){
    let Role = sessionStorage.getItem("role");
    if(Role == "ADMIN"){
      return true;
    }
    return false;
  }
  
}
