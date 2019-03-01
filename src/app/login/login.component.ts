import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('login') loginData: NgForm;

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm){
    const email = form.value.email;
    console.log(email);
    const password = form.value.password;
    console.log(password);
    this.authService.signinUser(email, password);
    
  }

  // navigate(){
  //   this.router.navigateByUrl('/home');
  // }

}
