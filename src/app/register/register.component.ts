import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('register') registerData: NgForm;
  
  public firstName;
  public Username;
  public password;
  public confirmPassword;
  public value;
  constructor() { }

  ngOnInit() {
    console.log(localStorage.getItem('Username'));
  }

  onSubmit(){
    console.log(this.registerData);
    let fn = this.registerData['value']['first_name'];
    let un = this.registerData['value']['Username'];
    let pwd = this.registerData['value']['password'];
    let cnpwd = this.registerData['value']['confirm_password'];
    let value1
    console.log(fn);
    console.log(un);
    console.log(pwd);
    console.log(cnpwd);

    localStorage.setItem('firstName', fn);
    localStorage.setItem('Username', un);
    localStorage.setItem('password', pwd);
    localStorage.setItem('confirmPassword', cnpwd);


  }
}
