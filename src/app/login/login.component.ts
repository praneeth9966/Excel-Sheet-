import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('login') loginData: NgForm;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.loginData.value);
  }

  // navigate(){
  //   this.router.navigateByUrl('/home');
  // }

}
