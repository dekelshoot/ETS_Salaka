import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from '../models/property.model';

// import * as firebase from 'firebase';
import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/storage';
import 'firebase/analytics';
import "firebase/auth";
import "firebase/firestore";



@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  propertys: Property [] = [];
  location = ["","Bastos","Centre commercial","Elig-Edzoa","Djoungolo","Emana","Etoa-Meki","Mballa  ","Mfandena ","Ngoulemakong","Ngousso","Njon-essi","Nkolmesseng","Messassi","Nkolondom","Nlongkak ","Nylon ","Okolo","Olembe ","Tongolo","Manguier","Tsinga","Briqueterie","Madagascar","Nkomkana","Ntougou ","Mokolo quartier","Mokolo marché","Ekoudou","Febe","Oliga","Messa-Carrière","Azegue Messa Mezala","Messa Plateau","Angono","Doumassi","Ekoazon","Cité Verte","Etetack Abobo","Grand Messa","Messa Administratif","Ahala","Afanoya " ,"Centre administratif" ,"quartier du lac" ,"Dakar" ,"Efoulan" ,"Etoa" ,"Etoug-Ebe" ,"Mbaligi" ,"Méyo" ,"Mekoumbou" ,"Melen " ,"Messong" ,"Mvan" ,"Mvolyé" ,"Ngoa Ekélé","Nyomo","Nkol-Mbenda","Nkolmesseng","Nkolfon" ,"Nsimeyong" ,"Ntouessong" ,"Obili" ,"Obobogo" ,"Olezoa" ,"Simbock" ,"Mimboman " ,"Mvog Mbi" ,"Nkomo I" ,"Nkomo" ,"Biteng" ,"Awae " ,"Ewonkan" ,"Nkolo" ,"Odza ","Mbog Abang","Ekoumdoum","Kondengui","Ekounou","Ekie","Ndamvout","Mvan","Nkolndongo ","Mimboman ","Nkolndongo","Mfoundassi","Messamme","Ndongo" ,"Toutouli" ,"Meyo" ,"Abome" ,"Minkan" ,"Mvog-Ada" ,"Ngousso" ,"Essos" ,"Mfandana" ,"Nkolmesseng" ,"Nkoul Mekong" ,"Quartier Fouda" ,"Eleveur" ,"Ngousso-Ntem","Biyem-Assi","Mendong ","Nkolbikok ","Etoug-Ebe","Melen","Mvog-Betsi","Etoug-Ebe ","Melen","Nkolbikok","Etetak","Nnom-Nnam","Oyom Abang ","Ngoulemakong","Oyom Abang","Ndamvouth","Oyom Abang","Nkomassi","Oyom Abang ","Nkolbisson","Nkol-So","Mbog-Doum","Abobo","Ebot-Mefou"];
  category = ["","Appartement", "Maison", 'Chambre/Stuido'];
  typeExchange = ["","location","Vente"]
  start = false;

  propertySubject= new Subject<Property[]>();
  startSubject= new Subject<boolean>();
  constructor() { }

  emitPropertys(){
    this.propertySubject.next(this.propertys);
  }

  emitStart(){
    this.startSubject.next(this.start);
  }

  //sauvegarder les propriétés dans la base de donnée
  savePropertys(){
    firebase.database().ref('/property').set(this.propertys);
    
  }

  //recuperer les propriétés de la base
  getProperty(){
    firebase.database().ref('/property').on( 'value' , (data)  => {
      this.propertys = data.val() ? data.val() : [];
      this.emitPropertys();
      this.start = true;
      this.emitStart()
  });
  }


  //recuperer une propriété
  getSingleProperty(id:number){
    return new Promise(
      (resolve,reject) =>{
        firebase.database().ref('/property/' +id).once( 'value').then(
          (data) =>{
            resolve(data.val());
            this.start = true;
            this.emitStart()
          }, (error) =>{
            reject(error);
          }
        );
      }
    );
  }


  //cree une propriete
  createNewProperty(newProperty: Property){
    this.propertys.push(newProperty);
    this.savePropertys();
    this.emitPropertys();
  }

  //suprimer une propriete
  removeProperty(property:Property){
    if(property.photo){
      const storageRef = firebase.storage().refFromURL(property.photo);
      storageRef.delete().then(
        () =>{
          console.log('photo supprimé')
        }
      ).catch(
        (error) =>{
          console.log('Fichier non trouvé' +error);
        }
      );
    }
    const PropertyIndexToRemove = this.propertys.findIndex(
      (propertyEl) => {
        if(propertyEl === property){
          return true;
        }
        else return false;
      }
    );

    this.propertys.splice(PropertyIndexToRemove,1);
    this.savePropertys();
    this.emitPropertys();
  }


  //telecharger l'image
  uploadFile(file: File){
    console.log(file)
    return new Promise(
      (resolve,reject) =>{
          const almostUniqueFileName = Date.now().toString();
          const upload = firebase.storage().ref()
            .child('images/'+almostUniqueFileName +file.name)
            .put(file);
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
              () =>{
                console.log('Loading...')
              },
              (error) =>{
                console.log('Erreur de chargement: '+error);
                reject();
              },
              () =>{
                resolve(upload.snapshot.ref.getDownloadURL());
              }
        );
      }
    );
  }

}
