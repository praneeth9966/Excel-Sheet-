import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { DataServiceService } from './Services/data-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ExcelService } from './Services/excel-service/excel.service';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './Services/auth.service';
import { AuthGuardService } from './Services/auth-guard.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    HttpModule,
    HttpClientModule,

  ],
  providers: [DataServiceService,ExcelService,DatePipe, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }