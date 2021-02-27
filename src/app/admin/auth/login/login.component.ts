import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.initLoginForm();
  }
  initLoginForm = () => {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  loginUser = () => {
    if (this.loginForm.valid) {
      this.apiService._post('admin/login', this.loginForm.value).subscribe((response) => {
        console.log("response", response);

        if (response.status) {
          let token = btoa(response.data);
          this.authService.setUserToken(token);
          this.toastr.success("Login successfull");
          this.router.navigateByUrl("admin/logs");
        } else {
          this.toastr.error(response.message);
        }
      }, error => {
        console.log("error", error);

        this.toastr.error("Something went wrong!, Please try again")
      })
    } else {
      this.toastr.warning("Login form is invalid");
    }
  }

}
