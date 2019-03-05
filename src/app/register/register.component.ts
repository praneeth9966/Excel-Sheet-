import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { DataServiceService } from '../Services/data-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // @ViewChild('register') registerData: NgForm;
  defaultrole = "Choose a Role";
  public firstName;
  public Username;
  public password;
  public confirmPassword;
  public value;
  public data: any = [];
  constructor(private authService: AuthService, private dataService: DataServiceService) { }

  ngOnInit() {
    console.log(localStorage.getItem('Username'));
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(form.value.role);

    // this.authService.signupUser(email, password);

    this.data = JSON.stringify(form.value);
    if (form.value.role === 'User') {
      this.dataService.postUserData(this.data)
        .subscribe(
          (response) => {
            console.log(response)
          },
          (error) => console.log(error)
        );
    }
    else if (form.value.role === 'Admin') {
      this.dataService.postAdminData(this.data)
        .subscribe((response) => {
          console.log(response);
        },
          (error) => console.log(error)
        )
    }
  }
}
