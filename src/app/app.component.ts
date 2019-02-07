import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from './Services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-assignment';
  defaultActivity = ""
  defaultStoryMaturity = ""
  
  @ViewChild('sprintData') formSprintData : NgForm;
  public data :any = [];

  constructor(private dataService:DataServiceService) {}

  onSubmit() {
    console.log(this.formSprintData.value);
    this.data = JSON.stringify(this.formSprintData.value);
    this.dataService.postData(this.data)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );  
  }
  
}