import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from 'src/app/models/property.model';


@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit {
  propertyForm!: FormGroup;
  loading = false;
  fileUploading = false;
  fileUploaded = false;
  fileUrl = new Array<string>();
  nomberFile = 0;
  urls = new Array<string>();
  location!:string[];
  category!:string[];
  typeExchange!:string[];
  publicationDate = new Date();
  constructor(private formBuilder: FormBuilder,
              private propertyService: PropertyService,
              private router: Router) { }

  ngOnInit(): void {
    this.propertyService.getProperty();
    this.initForm();
    this.location = this.propertyService.location;
    this.category = this.propertyService.category;
    this.typeExchange = this.propertyService.typeExchange;
  }

//initialid=ser le formulaire
  initForm(){
    this.propertyForm = this.formBuilder.group({
      title: ['', Validators.required],
      prices: ['', Validators.required],
      room: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      area: ['', Validators.required],
      photo: ['', Validators.required],
      typeExchange:  ['', Validators.required]
    })
  }


//sauvegarder les iformations dans la base donnee
  onSaveProperty(){
    const title = this.propertyForm.get('title')?.value;
    const description = this.propertyForm.get('description')?.value;
    const room = this.propertyForm.get('room')?.value;
    const category = this.propertyForm.get('category')?.value;
    const area = this.propertyForm.get('area')?.value;
    const prices = this.propertyForm.get('prices')?.value;
    const location = this.propertyForm.get('location')?.value;
    const typeExchange = this.propertyForm.get('typeExchange')?.value;


    const property = new Property();
    property.title = title;
    property.description = description;
    property.room = room;
    property.category = category;
    property.area = area;
    property.prices = prices;
    property.location = location; 
    property.typeExchange = typeExchange;
    property.publicationDate = this.publicationDate.toString();
    console.log(this.publicationDate);

    if(this.fileUrl ){
      property.photo = this.fileUrl;
    }
    console.log(property)
    this.propertyService.createNewProperty(property);
    this.loading = true;
    setTimeout(
      ()=>{
        this.router.navigate(['/property']);
        this.loading = false;
      },1000
    );
  }


//uploader les images dans la base de donnee
  onUploadFile(file: File){
    this.fileUploading= true;
    this.propertyService.uploadFile(file).then(
      (url:any)=>{
        this.fileUrl.push(url);
        this.fileUploading= false;
        this.fileUploaded = true;
      }
    )
   
  }


//detecter les images selectionnes par l'utilisateur
  detectFiles(event:any) {
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        this.onUploadFile(file);
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.nomberFile = this.urls.length;
        }
        reader.readAsDataURL(file);
      }
    }
    
  }

  

}
