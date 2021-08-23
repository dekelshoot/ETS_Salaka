import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { PropertyFormComponent } from './property-list/property-form/property-form.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { SinglePropertyComponent } from './property-list/single-property/single-property.component';
import { AboutComponent } from './about/about.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'auth/signin', component: SigninComponent},
  { path: 'property', component: PropertyListComponent},
  { path: 'property/new', component: PropertyFormComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'property/view/:id', component: SinglePropertyComponent},
  { path : 'about' ,  component : AboutComponent},
  { path : '' , redirectTo: 'property', pathMatch: 'full'},
  { path : '**' , redirectTo: 'property'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
