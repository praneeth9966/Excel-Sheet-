import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  constructor(private http: HttpClient) { }

  postData(userData: any[]) {
    return this.http.post('https://tracker-9cafc.firebaseio.com/.json', userData)
  }

  getData() {
    return this.http.get('https://tracker-9cafc.firebaseio.com/.json')
  }

  updateData(newData) {
    return this.http.put('https://tracker-9cafc.firebaseio.com/.json', newData);
  }

}
