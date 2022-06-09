import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL : string = apiURL;

  constructor(private http: HttpClient) {}
  login(_f:any) { 
    console.log(_f);
     return this.http.post<any>(this.URL+"/checklogin" , _f )
    .pipe(map(response=> {
      console.log("response");
      console.log(response);
      sessionStorage.setItem('token',response.userConfirmToken)
      sessionStorage.setItem('userName',_f.userName)
      sessionStorage.setItem('userId',response.userId)
      sessionStorage.setItem('function',response.function)
      return response;
  }));
}






logoutUser() {
  return this.http.get<any>(this.URL+"CheckLogout" )
    .pipe(map(response=> {
      console.log("response");
      console.log(response);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('function');
      return response;
  }));
}

getToken(): string {
return sessionStorage.getItem('token') || '';
}



getTokenExpirationDate(token: string): any {
  token = this.getToken()
  const decoded: any = jwt_decode(token);

  if (decoded.exp === undefined) return null;

  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
}

isTokenExpired(token?: string): boolean {
 //debugger;
  if (!token) token = this.getToken();
 // console.log(token);
  if (!token || token == "undefined") return false;

  const date = this.getTokenExpirationDate(token);
  if (date === undefined) return false;
  const d = date.valueOf();
  const nd = new Date().valueOf();
  const r = !(date.valueOf() > new Date().valueOf());
  return !(date.valueOf() > new Date().valueOf());
}




getAuthStatus(): boolean {
  if(sessionStorage.getItem('token')){
    console.log("token");
    return true ;
  }else{
    return false;
  }
}
}
















   


    // getUserScopes(){
    //   //const token = this.getToken();
    //   //const decodedToken: string[] = jwt_decode(token?.split(" ")[1] || '');
    //   //let scopesStored = sessionStorage.getItem("scopes");
    //   //let scopes = JSON.parse(scopesStored? scopesStored : "");
    //   let permissionsStored = sessionStorage.getItem("permissions");
    //   return JSON.parse(permissionsStored? permissionsStored : "");;
    // }


  
    // public checkAuth(actionPermission: string){
    //   //const token = sessionStorage.getItem("token");
    //   //const decodedToken: string[] = jwt_decode(token?.split(" ")[1] || '');
    //   //return decodedToken["roles"].includes(actionPermission) ?  true : false;
    //   let permissionsStored = sessionStorage.getItem("permissions");
    //   let permissions = JSON.parse(permissionsStored? permissionsStored : "");
    //   //console.log("permi ", permissions);
    //   return permissions.includes(actionPermission) ?  true : false;
    // }

