import { Injectable } from '@angular/core';

// import * as firebase from 'firebase';
import firebase from "firebase/app";
import 'firebase/storage';
import 'firebase/analytics';
import "firebase/auth";
import "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signInUser( email: string , password : string){
    return new Promise<void>(
      (resolve , reject) => {
        firebase.auth().signInWithEmailAndPassword(email , password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser(){
    firebase.auth().signOut();
  }


}


