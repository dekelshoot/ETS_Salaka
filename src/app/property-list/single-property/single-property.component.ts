import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.scss']
})
export class SinglePropertyComponent implements OnInit {
  property!: Property;
  link= new Array
  hrefWa!:string;
  hrefSms!:string;
  hrefMail!:string;
  startSubject!: Subscription;
  start = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private propertyService:PropertyService) { }

  ngOnInit(): void {

    //gere l'asynchonisite
    this.startSubject = this.propertyService.startSubject.subscribe(
      (start:boolean) =>{
        this.start = start;
      }
    );

    //___________________
    

    this.property = new Property();
    const id = this.route.snapshot.params['id'];
    this.propertyService.getSingleProperty(+id).then(
      (property:any) =>{
        this.property = property; 
        for(let photo in this.property.photo){
          this.link.push(this.property.photo[photo]);
        }
      }
    );

  //gerer les lien de contact avec le client
     this.hrefWa = "http://wa.me/237693034689?text=j'ai%20vu%20votre%20annonce%20sur%20ETS%20Salaka%20"+window.location+"%20S'il%20vous%20plait%20,%20envoyez%20moi%20plus%20d'%20information%20à%20ce%20sujet%20";

     this.hrefSms = "sms:/* +23769034689 */&body=/* j'ai vu votre annonce sur ETS Salaka "+window.location+"S'il vous plait , envoyez moi plus d' information à ce sujet */";

     this.hrefMail = "mailto:juniortchoupe5@gmail.com?subject=Recherche de logement&body=j'ai vu votre annonce sur ETS Salaka "+window.location+" S'il vous plait , envoyez moi plus d' information à ce sujet "
  //_____________________________________________

  }
  
  onBack(){
    this.router.navigate(['/property'])
  }


}
