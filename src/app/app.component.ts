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
  public responseKey :any = [];
  public newproduct ;
  public newproduct1 ;
  public result = {};
  // public existingUser = false;
  constructor(private dataService:DataServiceService) {}

  ngOnInit(){
  }

  onSubmit() {
    console.log(this.formSprintData);
    this.data = JSON.stringify(this.formSprintData.value);
    this.dataService.postData(this.data)
    .subscribe(
      (response) => {
      console.log(response)
      this.responseKey.push(response)
    console.log(this.responseKey);
    },
      (error) => console.log(error)
    );  
  }

  update() {
    console.log(this.updatedData['value']['Story Maturity']);
    
    this.dataService.getData().subscribe(
      (response) => {
        console.log(response);
       this.mapped = Object.keys(response).map(key => ({type: key, value: response[key]}))
       console.log(this.mapped);
       for(var i=0; i<this.mapped.length; i++) {
        this.userStory1 = this.mapped[i]['value']['User Story'];
        console.log(this.userStory1);
        if(this.existUserData.nativeElement.value===this.userStory1){
          console.log(this.updatedData);
          
          console.log(this.mapped[i]['value']['Story Maturity']);
          
          this.updateDeatails = JSON.stringify(this.updatedData.value);
          console.log(this.updateDeatails);
          
          this.mapped[i]['value']['Story Maturity']=this.updatedData['value']['Story Maturity']
          this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']
          // this.mapped[i]['value']['activity']=this.updatedData['value']['activity']

          console.log(this.mapped);

          // this.newproduct=this.normalizeArray(this.mapped[i]['value'],'type')
          // console.log(this.updatedData.value);
          // this.newproduct = Object.assign({}, ...this.mapped);
          // console.log(this.newproduct);
          // this.newproduct1=JSON.stringify(this.newproduct);

           
              for (var i=0; i<this.mapped.length; i++) {
                this.result[this.mapped[i].type] = this.mapped[i].value;
              }

            //result
            console.log(this.result);
          
          this.dataService.updateData (this.result)
          .subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
          );  
          this.newUser=false;
          // this.userStory= this.userStory1;
          
          break;
        }
       }
      }
    )


    
  }

  newUserDeatails() {
    this.newUser = true;
  }

  existingUserDeatails() {                                                                                            
    console.log(this.existUserData.nativeElement.value);
    this.dataService.getData().subscribe(
      (response) => {
        console.log(response);
       this.mapped = Object.keys(response).map(key => ({type: key, value: response[key]}))
       console.log(this.mapped);
       for(var i=0; i<this.mapped.length; i++) {
        this.userStory1 = this.mapped[i]['value']['User Story'];
        console.log(this.userStory1);
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

//    normalizeArray<T>(mapped: Array<T>, indexKey: keyof T) {
//     const normalizedObject: any = {}
//     for (let i = 0; i < this.mapped.length; i++) {
//          const key = this.mapped[i][indexKey]
//          normalizedObject[key] = this.mapped[i]
//     }
//     return normalizedObject as { [key: string]: T }
// }
  
}