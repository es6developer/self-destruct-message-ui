import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { ApiService } from './core/services/api.service';
import { LoginComponent } from './admin/auth/login/login.component';
import { RegisterComponent } from './admin/auth/register/register.component';
import { LogsComponent } from './admin/auth/logs/logs.component';
import { CreateLinkMessageComponent } from './components/create-link-message/create-link-message.component';
import { ExpiryLinkMessageComponent } from './components/expiry-link-message/expiry-link-message.component';
import { ViewMessageLinkComponent } from './components/view-message-link/view-message-link.component';
import { AuthService } from './core/services/auth.service';
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { ExpiryTimePipe } from './pipes/expiryTime.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogsComponent,
    CreateLinkMessageComponent,
    ExpiryLinkMessageComponent,
    ViewMessageLinkComponent,
    ExpiryTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxDatatableModule,
    BrowserAnimationsModule,


  ],
  providers: [ApiService, AuthService, AuthGuardService, ExpiryTimePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
