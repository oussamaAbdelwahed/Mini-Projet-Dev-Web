import { ShowSpectatorComponent } from './components/spectator/show-spectator/show-spectator.component';
import { UpdateSpectatorComponent } from './components/spectator/update-spectator/update-spectator.component';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthMiddleware } from './middlewares/auth-middleware';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ListSpectatorsComponent } from './components/spectator/list-spectators/list-spectators.component';

const routes: Routes = [
  { path: '',component: WelcomeComponent },
  { path: 'login',component: LoginComponent },
  { path: 'signup',component: SignupComponent },
  { path: 'buy-ticket',component: BuyTicketComponent },
  { path:'dashboard1',canActivate : [AuthMiddleware],component: AdminDashboardComponent},
  { path: 'spectator/all',component: ListSpectatorsComponent },
  { path: 'spectator/:id/edit',component: UpdateSpectatorComponent },
  { path: 'spectator/:id/show',component: ShowSpectatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
