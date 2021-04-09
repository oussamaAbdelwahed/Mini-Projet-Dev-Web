import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { SpectatorDashboardComponent } from './components/dashboards/spectator-dashboard/spectator-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './interceptors/app.interceptor';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SignupComponent } from './components/signup/signup.component';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';
import { ModalComponent } from './ui-extras/modal/modal.component';
import { UnauthNavbarComponent } from './components/unauth-navbar/unauth-navbar.component';
import { ListSpectatorsComponent } from './components/spectator/list-spectators/list-spectators.component';
import { UpdateSpectatorComponent } from './components/spectator/update-spectator/update-spectator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ShowSpectatorComponent } from './components/spectator/show-spectator/show-spectator.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    SpectatorDashboardComponent,
    WelcomeComponent,
    SignupComponent,
    BuyTicketComponent,
    ModalComponent,
    UnauthNavbarComponent,
    ListSpectatorsComponent,
    UpdateSpectatorComponent,
    ShowSpectatorComponent,
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule

     

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true } 



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
