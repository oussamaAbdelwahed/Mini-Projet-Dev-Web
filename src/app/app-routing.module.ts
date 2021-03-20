import { AuthMiddleware } from './middlewares/auth-middleware';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '',component: LoginComponent },
  {path:'dashboard1',canActivate : [AuthMiddleware],component: AdminDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
