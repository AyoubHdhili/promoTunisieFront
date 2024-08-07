import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  endpoint = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  Register(user:User){
    return this.http.post<{success: boolean, message: string}>(`${this.endpoint}/signup`, user);
  }

  SignIn(email:string, password: string){
    return this.http.post<{token: string}>(`${this.endpoint}/signin`, {email: email, password: password});
  }
}
