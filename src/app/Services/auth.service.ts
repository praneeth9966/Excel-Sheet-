import { Injectable } from '@angular/core';
import firebase from '@firebase/app';
import '@firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router) { }

  signupUser(email:string, password:string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(
      error => console.log(error)
    )
  }

  signinUser(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          this.router.navigateByUrl('/home');
              firebase.auth().currentUser.getIdToken(
               ).then(
                  (token:string) => {
                    console.log(token)  
                    this.token = token 
                    console.log('user was found')
                    console.log(this.token)
                    localStorage.setItem('myToken', this.token)
                  }
               )
        }
      ).catch((erorr) => {
        console.log('user was not found')    
      }
    )  
  }

  isAuthenticated(){
    return this.token!=null;
  }

}