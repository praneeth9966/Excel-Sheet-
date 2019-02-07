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
}
