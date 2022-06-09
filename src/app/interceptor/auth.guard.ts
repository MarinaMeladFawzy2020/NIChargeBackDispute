import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router , private authService : AuthService) { }
  
  canActivate():boolean|Observable<boolean>{
    // var isAuthenticated = this.authService.getAuthStatus();
    // console.log(isAuthenticated);
    var token = sessionStorage.getItem('token');
    if(token)
    {
      return true
    }
    this.router.navigateByUrl("");
    return false;
   }
  
}




