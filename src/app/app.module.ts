import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { SinglePropertyComponent } from './property-list/single-property/single-property.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PropertyService } from './services/property.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component'
import { CategoryComponent } from './category/category.component';
import { SearchComponent } from './search/search.component';
import { PropertyFormComponent } from './property-list/property-form/property-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    PropertyListComponent,
    PropertyFormComponent,
    SinglePropertyComponent,
    HeaderComponent,
    AboutComponent,
    CategoryComponent,
    SearchComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    PropertyService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
