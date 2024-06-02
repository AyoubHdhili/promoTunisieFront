import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/user';
import { AuthServiceService } from 'src/app/services/authservice/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user:User = new User();
  confirmPassword:string = '';
  isChecked:boolean = false;

  constructor(private authService: AuthServiceService, private router: Router, private toast: ToastrService){}

  submit() {
    this.authService.Register(this.user).subscribe((res) =>{
      if(res.success === true){
        this.toast.success("Register successfully!", "Success Message", {
          timeOut: 5000,
          positionClass:'toast-top-right'
        })
        this.router.navigate(['signin']);
      }
    },(err) =>{
      console.log(err);
      
      this.toast.error( err.error.error, "Register Failed", {
        timeOut: 3000,
        positionClass:'toast-top-right'
      })
    })
    }

}
