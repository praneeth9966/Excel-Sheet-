import { Component, ViewChild, OnInit, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from './Services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'my-assignment';
  defaultActivity = ""
  defaultStoryMaturity = ""

  @ViewChild('sprintData') formSprintData: NgForm;
  @ViewChild('existUser') existUserData: ElementRef;
  @ViewChild('newdata') updatedData: NgForm;
  @Input() editable: boolean = false;
  butDisabled: boolean = true;
  public data: any = [];
  public mapped;
  public userStory;
  public userStory1;
  public newUser = true;
  public existDeatails: any = [];
  public updateDeatails: any = [];
  public responseKey: any = [];
  public result = {};
  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
  }

  newUserDeatails() {
    this.newUser = true;
  }

  refresh(): void {
    window.location.reload();
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
        this.mapped = Object.keys(response).map(key => ({ type: key, value: response[key] }))
        console.log(this.mapped);
        for (var i = 0; i < this.mapped.length; i++) {
          this.userStory1 = this.mapped[i]['value']['User Story'];
          console.log(this.userStory1);
          if (this.existUserData.nativeElement.value === this.userStory1) {
            console.log(this.updatedData);
            console.log(this.mapped[i]['value']['Story Maturity']);
            this.updateDeatails = JSON.stringify(this.updatedData.value);
            console.log(this.updateDeatails);
            this.mapped[i]['value']['Start Date'] = this.updatedData['value']['Start Date']
            this.mapped[i]['value']['End Date'] = this.updatedData['value']['End Date']
            this.mapped[i]['value']['Planned Bandwidth'] = this.updatedData['value']['Planned Bandwidth']
            this.mapped[i]['value']['Actual Bandwidth'] = this.updatedData['value']['Actual Bandwidth']
            this.mapped[i]['value']['User Story'] = this.updatedData['value']['User Story']
            this.mapped[i]['value']['Story Type'] = this.updatedData['value']['Story Type']
            this.mapped[i]['value']['Story Status'] = this.updatedData['value']['Story Status']
            this.mapped[i]['value']['activity'] = this.updatedData['value']['activity']
            this.mapped[i]['value']['Activity Status'] = this.updatedData['value']['Activity Status']
            this.mapped[i]['value']['Date'] = this.updatedData['value']['Date']
            this.mapped[i]['value']['Planned Story Point'] = this.updatedData['value']['Planned Story Point']
            this.mapped[i]['value']['Actual Story Point'] = this.updatedData['value']['Actual Story Point']
            this.mapped[i]['value']['Consumed SP'] = this.updatedData['value']['Consumed SP']
            this.mapped[i]['value']['variance'] = this.updatedData['value']['variance']
            this.mapped[i]['value']['Story Maturity'] = this.updatedData['value']['Story Maturity']
            this.mapped[i]['value']['Activity Start Date'] = this.updatedData['value']['Activity Start Date']
            this.mapped[i]['value']['Activity End Date'] = this.updatedData['value']['Activity End Date']
            this.mapped[i]['value']['Resource'] = this.updatedData['value']['Resource']
            this.mapped[i]['value']['Percentage Completion'] = this.updatedData['value']['Percentage Completion']
            this.mapped[i]['value']['Accountable Hour'] = this.updatedData['value']['Accountable Hour']
            this.mapped[i]['value']['Reason of Variance'] = this.updatedData['value']['Reason of Variance']
            this.mapped[i]['value']['Corrective Measures'] = this.updatedData['value']['Corrective Measures']
            this.mapped[i]['value']['Risk If Any'] = this.updatedData['value']['Risk If Any']
            console.log(this.mapped);
            for (var i = 0; i < this.mapped.length; i++) {
              this.result[this.mapped[i].type] = this.mapped[i].value;
            }
            console.log(this.result);
            this.dataService.updateData(this.result)
              .subscribe(
                (response) => console.log(response),
                (error) => console.log(error)
              );
            this.newUser = false;
            break;
          }
        }
      }
    )
  }

  existingUserDeatails() {
    console.log(this.existUserData.nativeElement.value);
    this.dataService.getData().subscribe(
      (response) => {
        console.log(response);
        this.mapped = Object.keys(response).map(key => ({ type: key, value: response[key] }))
        console.log(this.mapped);
        this.existDeatails = [];
        for (var i = this.mapped.length - 1; i >= 0; i--) {
          this.userStory1 = this.mapped[i]['value']['User Story'];
          console.log(this.userStory1);
          if (this.existUserData.nativeElement.value === this.userStory1) {
            this.newUser = false;
            this.userStory = this.userStory1;
            this.existDeatails.push(this.mapped[i]);
            console.log(this.existDeatails);
            break;
          }
        }
        if (this.existDeatails.length == 0) {
          alert("Please enter Valid User Story");
        }
      }
    )
  }

}