import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }
  initRegisterForm = () => {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  registerUser = () => {
    if (this.registerForm.valid) {
      this.apiService._post('admin', this.registerForm.value).subscribe((response) => {
        if (response.status) {
          this.toastr.success("Admin user has been created, Please login")
          this.router.navigateByUrl("admin/login")
        }
      }, error => {
        this.toastr.error("Something went wrong!, Please try again")
      })
    } else {
      this.toastr.warning("register form is invalid");
    }
  }


}
