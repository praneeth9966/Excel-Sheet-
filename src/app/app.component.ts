import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from './Services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'my-assignment';
  defaultActivity = ""
  defaultStoryMaturity = ""
  
  @ViewChild('sprintData') formSprintData : NgForm;
  @ViewChild('existUser')  existUserData: ElementRef;
  @ViewChild('newdata')  updatedData: NgForm;

  public data :any = [];
  public mapped ;
  public userStory;
  public userStory1;
  public newUser = true;
  public existDeatails : any =[];
  public updateDeatails : any =[];
  // public existingUser = false;
  constructor(private dataService:DataServiceService) {}

  ngOnInit(){
  }

  onSubmit() {
    console.log(this.formSprintData.value);
    this.data = JSON.stringify(this.formSprintData.value);
    this.dataService.postData(this.data)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );  
  }

  update() {
    console.log(this.updatedData.value);
    this.data = JSON.stringify(this.updatedData.value);
    this.dataService.updateData (this.updateDeatails)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );  
  }

  newUserDeatails() {
    this.newUser = true;
  }

  existingUserDeatails() {
    console.log(this.existUserData.nativeElement.value);
    this.dataService.getData().subscribe(
      (response) => {
      // console.log(response['-LY5i5cR9HciW81_aYsq']['User Story'])
      // console.log(response),
       this.mapped = Object.keys(response).map(key => ({type: key, value: response[key]}))
      //  this.userStory = this.mapped[0]['value']['User Story'];
      // console.log(this.userStory);
      
       for(var i=0; i<this.mapped.length; i++) {
        this.userStory1 = this.mapped[i]['value']['User Story'];
        console.log(this.userStory);
        if(this.existUserData.nativeElement.value===this.userStory1){
          this.newUser=false;
          this.userStory= this.userStory1;
          this.existDeatails.push(this.mapped[i]);
          console.log(this.existDeatails);
          break;
        }
       }
      
      }
    )
  }
  
}