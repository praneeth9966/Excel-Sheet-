import { Component, OnInit} from '@angular/core';
import firebase from '@firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'my-assignment';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCdEZfKV0HGzkhI7o-49SVWm2X16lO6FYI",
      authDomain: "tracker-9cafc.firebaseapp.com",
    });
  }

}