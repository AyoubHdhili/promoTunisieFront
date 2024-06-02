import { Component } from '@angular/core';
import { User } from 'src/app/core/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user:User = new User();
  confirmPassword:string = '';

  submit() {
    console.log(this.user);
    
    }

}
