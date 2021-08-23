import { Component, OnInit } from '@angular/core';

// import * as firebase from 'firebase';
import firebase from "firebase/app";
import 'firebase/storage';
import 'firebase/analytics';
import "firebase/auth";
import "firebase/firestore";
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth = false;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) =>{
        if(user){
          this.isAuth = true;
          console.log("connexion réussie");
        }else{
          this.isAuth = false;
          console.log("déconnexion réussie");
        }
      }
    );
  }

  onSignOut(){
    this.authService.signOutUser();
  }

}
