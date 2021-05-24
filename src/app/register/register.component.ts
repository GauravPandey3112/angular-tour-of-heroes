import { Component, OnInit, Input } from '@angular/core';
import { UserInput } from '../user';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData={
    name:"",
    email:"",
    password:""
  };
  registerForm!: FormGroup;
  hide=true;

  constructor(
    private auth: AuthService,
    private router:Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      'name': [this.registerData.name, [
        Validators.required
      ]],
      'email': [this.registerData.email, [
        Validators.required,
        Validators.email
      ]],
      'password': [this.registerData.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]]
    });
  }

  registerUser(){
    this.auth.registerUser(this.registerData)
      .subscribe(
        data=> {
          localStorage.setItem('token',data.token)
          this.router.navigate(['/dashboard'])
        },
        err=> console.log(err)
        
      )
      
    
  }
}
