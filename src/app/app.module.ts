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
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    HttpModule,
    HttpClientModule,

  ],
  providers: [DataServiceService,ExcelService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }