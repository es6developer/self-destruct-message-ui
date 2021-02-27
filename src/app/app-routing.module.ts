import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLinkMessageComponent } from './components/create-link-message/create-link-message.component';
import { ExpiryLinkMessageComponent } from './components/expiry-link-message/expiry-link-message.component';
import { ViewMessageLinkComponent } from './components/view-message-link/view-message-link.component';
import { LoginComponent } from './admin/auth/login/login.component';
import { RegisterComponent } from './admin/auth/register/register.component';
import { LogsComponent } from './admin/auth/logs/logs.component';
import { AuthGuardService as authGuard } from './auth-guard/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: CreateLinkMessageComponent },
  { path: 'view/:id', component: ViewMessageLinkComponent },
  { path: 'expiry/:id', component: ExpiryLinkMessageComponent },
  //admin
  { path: 'admin', redirectTo: "admin/logs", pathMatch: "full" },
  { path: "admin/login", component: LoginComponent },
  { path: "admin/register", component: RegisterComponent },
  { path: "admin/logs", component: LogsComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
