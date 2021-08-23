import { Component } from '@angular/core';


// import * as firebase from 'firebase';
import firebase from "firebase/app";
import 'firebase/storage';
import 'firebase/analytics';
import "firebase/auth";
import "firebase/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETS-Salaka';

  constructor(){

    var firebaseConfig = {
      apiKey: "AIzaSyDdYfb8CgFZiZa9yCJTQcT9dAJMsIU3kDI",
      authDomain: "ets-salaka-13dba.firebaseapp.com",
      projectId: "ets-salaka-13dba",
      storageBucket: "ets-salaka-13dba.appspot.com",
      messagingSenderId: "518098484673",
      appId: "1:518098484673:web:ce8b8badb722a638168340",
      measurementId: "G-BMH3RQKP47"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

  }
}
