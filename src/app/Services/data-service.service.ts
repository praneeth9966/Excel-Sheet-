import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  postData(userData: any[]) {
    return this.http.post('https://tracker-9cafc.firebaseio.com/.json', userData)
  }

  getData() {
    const token = localStorage.getItem('myToken');
    console.log(token);
    return this.http.get('https://tracker-9cafc.firebaseio.com/.json?auth=' + token)
  }

  updateData(newData) {
    const token = localStorage.getItem('myToken');
    console.log(token);
    return this.http.put('https://tracker-9cafc.firebaseio.com/.json?auth=' + token, newData);
  }

  postUserData(userData: any[]){
    return this.http.post('https://userdetails-a02c9.firebaseio.com/.json', userData)
  }

  getUserData(){
    return this.http.get('https://userdetails-a02c9.firebaseio.com/.json')
  }
  postAdminData(adminData : any[]){
    return this.http.post('https://admindetails-2f829.firebaseio.com/.json',adminData)
  }
  getAdminData(){
    return this.http.get('https://admindetails-2f829.firebaseio.com/.json')
  }

}
