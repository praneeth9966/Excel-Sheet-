import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { DataServiceService } from '../Services/data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('login') loginData: NgForm;
  public userDataArray: any = [];
  constructor(private authService: AuthService, private router: Router, private dataService: DataServiceService) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    console.log(form.value);
    if (form.value.role === "User") {
      this.dataService.getUserData().subscribe(
        (response) => {
          console.log(response);
          this.userDataArray = Object.keys(response).map(key => ({ type: key, value: response[key] }))
          console.log(this.userDataArray);
          console.log(form.value.userName);
          console.log(this.userDataArray[0]['value']['userName']);

          for (var i = 0; i < this.userDataArray.length; i++) {
            if (form.value.userName === this.userDataArray[i]['value']['userName'] && form.value.password === this.userDataArray[i]['value']['password']) {

              this.router.navigateByUrl('/home');
            }
            else {
              alert('UserName/Password incorrect')
            }
            break;
          }

        }
      )
      // this.authService.signinUser(email, password);

    }
    else if (form.value.role === "Admin") {
      this.dataService.getAdminData().subscribe(
        (response) => {
          console.log(response);
          this.userDataArray = Object.keys(response).map(key => ({ type: key, value: response[key] }))
          console.log(this.userDataArray);
          console.log(form.value.userName);
          console.log(this.userDataArray[0]['value']['userName']);

          for (var i = 0; i < this.userDataArray.length; i++) {
            if (form.value.userName === this.userDataArray[i]['value']['userName'] && form.value.password === this.userDataArray[i]['value']['password']) {

              this.router.navigateByUrl('/home');
            }
            else {
              alert('UserName/Password incorrect')
            }
            break;
          }

        }
      )
      // this.authService.signinUser(email, password);

    }
    // navigate(){
    //   this.router.navigateByUrl('/home');
    // }

  }
}