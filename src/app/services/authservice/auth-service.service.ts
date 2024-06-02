import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/core/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  endpoint=`${environment.baseUrl}user`;

  constructor(private http: HttpClient) { }

  Register(user:User){
    return this.http.post<{success: boolean, message: string}>(`${this.endpoint}/signup`, user);
  }

  SignIn(user: User){
    return this.http.post<{token: string}>(`${this.endpoint}/signin`, user);
  }
}
