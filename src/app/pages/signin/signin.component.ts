import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/user';
import { AuthServiceService } from 'src/app/services/authservice/auth-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  user:User = new User();

  constructor(private authService: AuthServiceService, private router: Router, private toast: ToastrService){}

  submit() {
    this.authService.SignIn(this.user.email, this.user.password).subscribe((res) => {
      sessionStorage.setItem('token', res.token);
      this.toast.success("welcome to promoTunisie", "Signed in successfully!", {
        timeOut: 5000,
        positionClass:'toast-top-right'
      })
      const token = JSON.parse(atob(res.token.split('.')[1])) as User;
      if(token.role === 'Client'){
      this.router.navigate(['']);
      } else{
        this.router.navigate(['/dashboard/home']);
      }
    },(err) => {
      this.toast.error( "verify email or password !!", "Login Failed", {
        timeOut: 3000,
        positionClass:'toast-top-right'
      })
    })
    
    }

}
