import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  constructor(private http: HttpClient) { }

  postData (userData : any[]) {
      return this.http.post('https://myassignment-617b7.firebaseio.com/.json', userData)
  }

  getData () {
    return this.http.get('https://myassignment-617b7.firebaseio.com/.json')
  }

  updateData(newData : any[]){
    return  this.http.put('https://myassignment-617b7.firebaseio.com/.json',newData);
  }

}
