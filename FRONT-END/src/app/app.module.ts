import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { FooterComponent } from './partials/footer/footer.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { GestionEquipesComponent } from './pages/admin/gestion-equipes/gestion-equipes.component';
import { DashboardAdminComponent } from './pages/admin/dashboard-admin/dashboard-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminService } from './services/admin.service';
import { GestionJoueursComponent } from './pages/admin/gestion-joueurs/gestion-joueurs.component';
import { GestionStaffMembersComponent } from './pages/admin/gestion-staff-members/gestion-staff-members.component';
import { GestionStadiumComponent } from './pages/admin/gestion-stadium/gestion-stadium.component';
import { GestionRefereeComponent } from './pages/admin/gestion-referee/gestion-referee.component';
import { GestionSpectatorsComponent } from './pages/admin/gestion-spectators/gestion-spectators.component';
import { GestionToursComponent } from './pages/admin/gestion-tours/gestion-tours.component';
import { GestionGamesComponent } from './pages/admin/gestion-games/gestion-games.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { SpectatorDashboardComponent } from './components/dashboards/spectator-dashboard/spectator-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { SpectatorNavbarComponent } from './partials/spectator-navbar/spectator-navbar.component';
import { SpectatorSidebarComponent } from './partials/spectator-sidebar/spectator-sidebar.component';
import { ListSpectatorTicketsComponent } from './components/list-spectator-tickets/list-spectator-tickets.component';
import { AllGamesComponent } from './components/all-games/all-games.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    AdminLayoutComponent,
    GestionEquipesComponent,
    DashboardAdminComponent,
    GestionJoueursComponent,
    GestionStaffMembersComponent,
    GestionStadiumComponent,
    GestionRefereeComponent,
    GestionSpectatorsComponent,
    GestionToursComponent,
    GestionGamesComponent,
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
    SpectatorNavbarComponent,
    SpectatorSidebarComponent,
    ListSpectatorTicketsComponent,
    AllGamesComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
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
  providers: [AdminService,
  { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
