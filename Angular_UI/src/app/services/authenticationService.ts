import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IUser } from "../interfaces/IUser";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

    readonly APIUrl = "https://localhost:5001";

    helper = new JwtHelperService();
    currentUser: IUser = {
        id: null,
        username: null,
        email: null,
        role: null
    };

    getHttpOptions() {
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + localStorage.getItem('token')
            })
        }
        return httpOptions;
    }

    header = new HttpHeaders().set(
        "Authorization",
        localStorage.getItem("token")
    );

    constructor(private httpClient: HttpClient, private router: Router) { }

    registerUser(val: any) {
        return this.httpClient.post(this.APIUrl + '/identity/register/', val);
      }
    
      login(val: any): Observable<IUser> {
        return this.httpClient.post(this.APIUrl + '/identity/login', val).pipe(
          map((response: any) => {
            const user = response;
    
            let decodedToken = this.helper.decodeToken(response.token);
    
            if (user.result.succeeded) {
              this.currentUser.id = user.id;
              this.currentUser.username = decodedToken.given_name;
              this.currentUser.email = decodedToken.email;
              this.currentUser.role = decodedToken.role;
    
              localStorage.setItem('token', response.token);
            }
            this.router.navigate(['products']);
            return this.currentUser;
          })
        );
      }
    
      logout() {
        this.currentUser.username = null;
        this.currentUser.email = null;
        this.currentUser.role = null;
        this.currentUser.id = "";
        localStorage.removeItem('token');
        this.router.navigate(['products']);
      }
    
      loggedIn(): boolean {
        return true;
        // const token = localStorage.getItem('token');
        // return !this.helper.isTokenExpired(token);
      }
}