import { SpectatorMiddleware } from './middlewares/spectator-middleware';
import { SpectatorDashboardComponent } from './components/dashboards/spectator-dashboard/spectator-dashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardAdminComponent } from './pages/admin/dashboard-admin/dashboard-admin.component';
import { GestionEquipesComponent } from './pages/admin/gestion-equipes/gestion-equipes.component';
import { GestionGamesComponent } from './pages/admin/gestion-games/gestion-games.component';
import { GestionJoueursComponent } from './pages/admin/gestion-joueurs/gestion-joueurs.component';
import { GestionRefereeComponent } from './pages/admin/gestion-referee/gestion-referee.component';
import { GestionSpectatorsComponent } from './pages/admin/gestion-spectators/gestion-spectators.component';
import { GestionStadiumComponent } from './pages/admin/gestion-stadium/gestion-stadium.component';
import { GestionStaffMembersComponent } from './pages/admin/gestion-staff-members/gestion-staff-members.component';
import { GestionToursComponent } from './pages/admin/gestion-tours/gestion-tours.component';
import { LoginComponent } from './components/login/login.component';
import { ListSpectatorsComponent } from './components/spectator/list-spectators/list-spectators.component';
import { ShowSpectatorComponent } from './components/spectator/show-spectator/show-spectator.component';
import { UpdateSpectatorComponent } from './components/spectator/update-spectator/update-spectator.component';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthMiddleware } from './middlewares/auth-middleware';
import { ListSpectatorTicketsComponent } from './components/list-spectator-tickets/list-spectator-tickets.component';
import { AllGamesComponent } from './components/all-games/all-games.component';
import { AdminMiddleware } from './middlewares/admin-middleware';
const routes: Routes = [
  {
    path : 'admin',
    canActivate : [AuthMiddleware,AdminMiddleware],
    component : AdminLayoutComponent,
    children: [
      { path: '', component: DashboardAdminComponent  },
      { path: 'team_management', component: GestionEquipesComponent },
      { path : 'player_management',component: GestionJoueursComponent },
      { path : 'staff_management',component : GestionStaffMembersComponent},
      { path : 'stadium_management', component :GestionStadiumComponent},
      { path : 'referee_management', component : GestionRefereeComponent},
      { path : 'spectator_management', component : GestionSpectatorsComponent},
      { path : 'tour_management' , component : GestionToursComponent },
      { path : 'games_management/:tourId' , component : GestionGamesComponent },
      
      
    ]
  },
  {
    path:"spectator-dashboard",
    canActivate : [AuthMiddleware,SpectatorMiddleware],
    component: SpectatorDashboardComponent,
    children: [
      { path: 'buy-ticket',component: BuyTicketComponent },
      { path: 'my-tickets',component: ListSpectatorTicketsComponent},
      { path:'all-games',component:AllGamesComponent}
    ]
  },
  { path: '',component: WelcomeComponent },
  { path: 'login',component: LoginComponent },
  { path: 'signup',component: SignupComponent },
  { path: 'spectator/all',component: ListSpectatorsComponent },
  { path: 'spectator/:id/edit',component: UpdateSpectatorComponent },
  { path: 'spectator/:id/show',component: ShowSpectatorComponent },
  { path:"games",component: AllGamesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
