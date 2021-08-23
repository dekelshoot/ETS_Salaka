import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

// import * as firebase from 'firebase';
import firebase from "firebase/app";
import 'firebase/storage';
import 'firebase/analytics';
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor( private router: Router) { }

  canActivate() : Observable<boolean> | Promise<boolean> | boolean{
    return new Promise(
      (resolve , reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              resolve(true);
            }else{
              this.router.navigate(['property']);
            }
          }
        );
      }   
    );
  }

}
