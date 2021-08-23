import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Property } from '../models/property.model';
import { PropertyService } from '../services/property.service';



@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  propertys! : Property[];
  propretySubscription! : Subscription;
  startSubject!: Subscription;
  urlss="../../assets/photo.jpg";
  start = false;
  constructor(private propertyService: PropertyService,
              private router: Router) { }

  ngOnInit(): void {

    this.propretySubscription = this.propertyService.propertySubject.subscribe(
      (proprety: Property[]) =>{
        this.propertys = proprety;
      }
    );

    this.startSubject = this.propertyService.startSubject.subscribe(
      (start:boolean) =>{
        this.start = start

      }
    );

    this.propertyService.getProperty();
    this.propertyService.emitPropertys();
    this.propertyService.emitStart();
  }

  onNewProperty(){
    this.router.navigate(['/property', 'new']);
  }

  onDeleteProperty(property: Property){
    this.propertyService.removeProperty(property)
  }

  onViewProperty(id:number){
    this.router.navigate( ['/property','view', id]);
  }

  ngOnDestroy(): void {
    this.propretySubscription.unsubscribe();
  }

}
